import prisma from "./prisma.js";

export async function validateClaimRules(claimId) {

  const claim =
    await prisma.claim.findUnique({

      where: { id: claimId },

      include: {

        insurance: true,

        invoice: {
          include: {
            visit: {
              include: {
                medicalRecord: true
              }
            },
            charges: {
              include: {
                service: { include: { cpt: true } },
                hospitalService: { include: { service: { include: { cpt: true } } } }
              }
            }
          }
        }

      }

    });

  if (!claim) {
    throw new Error("Claim not found");
  }

  const results = [];

  const serviceDate =
    claim.invoice.serviceDate ??
    claim.invoice.visit?.startedAt ??
    claim.invoice.createdAt;


  //----------------------------------
  // 1. POLICY ACTIVE
  //----------------------------------

  const policy = claim.insurance;

    const plan = policy.planId
    ? await prisma.insurancePlan.findUnique({ where: { id: policy.planId } })
    : null;

  const effectiveCoveragePercent = plan?.coveragePercent ?? policy.coveragePercent;
  const effectiveAuthRequired = plan ? plan.authorizationRequired : policy.authorizationRequired;
  const effectiveMaxClaimAmount = plan?.maxClaimAmount ?? null;

  const startOk = !policy.startDate || new Date(policy.startDate) <= new Date(serviceDate);
  const endOk = !policy.endDate || new Date(policy.endDate) >= new Date(serviceDate);

  results.push({
    rule: "POLICY_ACTIVE",
    label: "Policy Active on Service Date",
    passed: startOk && endOk,
    message:
      startOk && endOk
        ? "Policy was active on the date of service."
        : !startOk
        ? `Policy start date (${new Date(policy.startDate).toLocaleDateString()}) is after the service date.`
        : `Policy end date (${new Date(policy.endDate).toLocaleDateString()}) is before the service date.`
  });

  //----------------------------------
  // 2. AUTHORIZATION
  //----------------------------------

  if (effectiveAuthRequired) {

    const authorization =
      claim.invoice.visitId
        ? await prisma.authorizationRequest.findFirst({
            where: {
              patientInsuranceId: policy.id,
              visitId: claim.invoice.visitId,
              status: "APPROVED"
            }
          })
        : null;

    results.push({
      rule: "AUTHORIZATION",
      label: "Prior Authorization",
      passed: !!authorization,
      message:
        authorization
          ? "An approved prior authorization is on file for this visit."
          : "This plan requires prior authorization, but no approved authorization was found for this visit."
    });

  } else {

    results.push({
      rule: "AUTHORIZATION",
      label: "Prior Authorization",
      passed: true,
      message: "This plan does not require prior authorization."
    });

  }

  //----------------------------------
  // 3. COVERAGE / CO-PAY MATH
  //----------------------------------

 // AFTER
  if (effectiveCoveragePercent != null) {

    const expectedInsuranceAmount =
      Math.round(claim.invoice.subtotal * (effectiveCoveragePercent / 100) * 100) / 100;

    const claimedAmount = claim.totalAmount;

    const tolerance = 1;

    const withinTolerance =
      Math.abs(expectedInsuranceAmount - claimedAmount) <= tolerance;

    results.push({
      rule: "COVERAGE_MATH",
      label: "Coverage / Co-Pay Calculation",
      passed: withinTolerance,
      message:
        withinTolerance
          ? `Claimed amount matches expected coverage of ${effectiveCoveragePercent}%.`
          : `At ${effectiveCoveragePercent}% coverage, expected claim amount is ₦${expectedInsuranceAmount.toLocaleString()}, but ₦${claimedAmount.toLocaleString()} was claimed.`
    });

  } else {

    results.push({
      rule: "COVERAGE_MATH",
      label: "Coverage / Co-Pay Calculation",
      passed: true,
      message: "No coverage percentage on file — skipped."
    });

  }

  //----------------------------------
  // 4. DUPLICATE CLAIM
  //----------------------------------

  const duplicate =
    await prisma.claim.findFirst({
      where: {
        invoiceId: claim.invoiceId,
        id: { not: claim.id },
        status: { notIn: ["REJECTED", "DRAFT"] }
      }
    });

 // AFTER
  results.push({
    rule: "DUPLICATE_CLAIM",
    label: "Duplicate Claim Check",
    passed: !duplicate,
    message:
      duplicate
        ? `Another active claim (${duplicate.claimNumber ?? duplicate.id}) already exists for this invoice.`
        : "No duplicate claims found for this invoice."
  });

  //----------------------------------
  // 5. MAX CLAIM AMOUNT (plan-level cap)
  //----------------------------------

  if (effectiveMaxClaimAmount != null) {

    const withinCap = claim.totalAmount <= effectiveMaxClaimAmount;

    results.push({
      rule: "MAX_CLAIM_AMOUNT",
      label: "Plan Claim Limit",
      passed: withinCap,
      message:
        withinCap
          ? `Claim is within the plan's ₦${effectiveMaxClaimAmount.toLocaleString()} limit.`
          : `Claim amount ₦${claim.totalAmount.toLocaleString()} exceeds the plan's ₦${effectiveMaxClaimAmount.toLocaleString()} limit.`
    });

  }

//----------------------------------
  // 6. PLAN COVERAGE
  //----------------------------------

  if (plan) {

    const coverageRules = await prisma.insurancePlanCoverageRule.findMany({
      where: { planId: plan.id }
    });

    const cptRules = new Map(coverageRules.filter(r => r.cptCodeId).map(r => [r.cptCodeId, r]));
    const icd10RuleForDiagnosis = claim.invoice.visit?.medicalRecord?.icd10Id
      ? coverageRules.find(r => r.icd10Id === claim.invoice.visit.medicalRecord.icd10Id)
      : null;

    const uncoveredCharges = [];
    const authRequiredCharges = [];

    for (const charge of claim.invoice.charges) {

      const cptId = charge.service?.cptId ?? charge.hospitalService?.service?.cptId;
      const rule = cptId ? cptRules.get(cptId) : null;

      const isCovered =
        rule
          ? rule.covered
          : plan.scope === "GENERAL"; // no rule → covered under GENERAL, uncovered under CONDITION_SPECIFIC

      if (!isCovered) {
        uncoveredCharges.push(charge.description);
      }

      if (rule?.requiresAuthorization) {
        authRequiredCharges.push(charge.description);
      }

    }

    if (icd10RuleForDiagnosis?.requiresAuthorization) {
      authRequiredCharges.push("Diagnosis: " + (claim.invoice.visit.medicalRecord.diagnosis ?? "on file"));
    }

    if (plan.scope === "CONDITION_SPECIFIC" && icd10RuleForDiagnosis?.covered === false) {
      uncoveredCharges.push("Diagnosis not covered under this condition-specific plan");
    }

    results.push({
      rule: "PLAN_COVERAGE",
      label: "Plan Coverage",
      passed: uncoveredCharges.length === 0,
      message:
        uncoveredCharges.length === 0
          ? "All claimed items are covered under this plan."
          : `Not covered under this plan: ${uncoveredCharges.join(", ")}.`
    });

    if (authRequiredCharges.length > 0) {

      const hasAuth = await prisma.authorizationRequest.findFirst({
        where: {
          patientInsuranceId: policy.id,
          visitId: claim.invoice.visitId,
          status: "APPROVED"
        }
      });

      results.push({
        rule: "SERVICE_LEVEL_AUTH",
        label: "Service-Level Prior Authorization",
        passed: !!hasAuth,
        message:
          hasAuth
            ? "An approved authorization covers the services requiring pre-authorization."
            : `The following require prior authorization under this plan: ${authRequiredCharges.join(", ")}.`
      });

    }

  }

  const allPassed = results.every(r => r.passed);

  return {
    allPassed,
    checkedAt: new Date(),
    results
  };

}
