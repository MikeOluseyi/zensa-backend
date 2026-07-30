// utils/preAuthCheck.js
import prisma from "./prisma.js";
import { createNotification } from "./notificationService.js";

export async function checkPreAuthRequired({ patientId, hospitalId, visitId, cptCodeId }) {

  const insurance = await prisma.patientInsurance.findFirst({
    where: { patientId, isPrimary: true },
    include: { plan: true }
  });

  if (!insurance?.planId) return;

  const rule = await prisma.insurancePlanCoverageRule.findFirst({
    where: { planId: insurance.planId, cptCodeId, requiresAuthorization: true }
  });

  if (!rule) return;

  const existingAuth = await prisma.authorizationRequest.findFirst({
    where: { patientInsuranceId: insurance.id, visitId, status: "APPROVED" }
  });

  if (existingAuth) return;

  const staffToNotify = await prisma.staff.findMany({
    where: { hospitalId, role: { in: ["ADMIN", "ACCOUNTANT"] }, isActive: true }
  });

  for (const staff of staffToNotify) {

    await createNotification({
      hospitalId,
      staffId: staff.id,
      type: "PRE_AUTH_REQUIRED",
      title: "Prior Authorization Required",
      message: `A service requiring prior authorization was ordered for a patient but no approved authorization is on file.`,
      channel: "IN_APP"
    });

  }

}