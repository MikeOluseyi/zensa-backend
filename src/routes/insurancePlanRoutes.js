// routes/insurancePlanRoutes.js
import express from "express";
import prisma from "../utils/prisma.js";
import { protectInsurance } from "../middleware/insuranceAuthMiddleware.js";
import { authorizeInsurancePermission } from "../middleware/permissionMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protectInsurance,
  authorizeInsurancePermission("MANAGE_PLANS"),
  async (req, res) => {

    try {

      const { name, coveragePercent, authorizationRequired, maxClaimAmount, scope } = req.body;

      if (!name || coveragePercent == null) {
        return res.status(400).json({ error: "Name and coverage percent are required." });
      }

      const plan = await prisma.insurancePlan.create({
        data: {
          providerId: req.insuranceProvider.id,
          name,
          coveragePercent,
          authorizationRequired: !!authorizationRequired,
          maxClaimAmount: maxClaimAmount ?? null,
          scope: scope || "GENERAL"
        }
      });

      res.json(plan);

    } catch (err) {

      console.log(err);

      if (err.code === "P2002") {
        return res.status(400).json({ error: "A plan with this name already exists." });
      }

      res.status(500).json({ error: "Failed to create plan" });

    }

  }
);

router.get(
  "/",
  protectInsurance,
  authorizeInsurancePermission("VIEW_CLAIMS"),
  async (req, res) => {

    try {

      const plans = await prisma.insurancePlan.findMany({
        where: { providerId: req.insuranceProvider.id },
        orderBy: { createdAt: "desc" }
      });

      res.json(plans);

    } catch (err) {

      console.log(err);
      res.status(500).json({ error: "Failed to fetch plans" });

    }

  }
);

router.patch(
  "/:id",
  protectInsurance,
  authorizeInsurancePermission("MANAGE_PLANS"),
  async (req, res) => {

    try {

      const existing = await prisma.insurancePlan.findFirst({
        where: { id: req.params.id, providerId: req.insuranceProvider.id }
      });

      if (!existing) {
        return res.status(404).json({ error: "Plan not found" });
      }

      const { name, coveragePercent, authorizationRequired, maxClaimAmount, scope, active } = req.body;

      const plan = await prisma.insurancePlan.update({
        where: { id: req.params.id },
        data: {
          ...(name !== undefined && { name }),
          ...(coveragePercent !== undefined && { coveragePercent }),
          ...(authorizationRequired !== undefined && { authorizationRequired }),
          ...(maxClaimAmount !== undefined && { maxClaimAmount }),
          ...(scope !== undefined && { scope }),
          ...(active !== undefined && { active })
        }
      });

      res.json(plan);

    } catch (err) {

      console.log(err);
      res.status(500).json({ error: "Failed to update plan" });

    }

  }
);

// insurancePlanRoutes.js or a new insurancePatientRoutes.js
router.get(
  "/patients",
  protectInsurance,
  authorizeInsurancePermission("VIEW_CLAIMS"),
  async (req, res) => {

    try {

      const enrollments = await prisma.patientInsurance.findMany({
        where: { providerId: req.insuranceProvider.id },
        include: {
          patient: { select: { firstName: true, lastName: true, patientNumber: true, gender: true } },
          plan: { select: { name: true, scope: true } }
        },
        orderBy: { createdAt: "desc" }
      });

      res.json(enrollments);

    } catch (err) {

      console.log(err);
      res.status(500).json({ error: "Failed to fetch patients" });

    }

  }
);

/*
==========================================
LOOKUP — CPT / ICD-10 (for building rules)
==========================================
*/

router.get(
  "/lookup/cpt",
  protectInsurance,
  authorizeInsurancePermission("MANAGE_PLANS"),
  async (req, res) => {
    try {
      const search = req.query.search || "";
      const codes = await prisma.cPTCode.findMany({
        where: {
          OR: [
            { code: { contains: search, mode: "insensitive" } },
            { name: { contains: search, mode: "insensitive" } }
          ]
        },
        take: 20
      });
      res.json(codes);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Failed to search CPT codes" });
    }
  }
);

router.get(
  "/lookup/icd10",
  protectInsurance,
  authorizeInsurancePermission("MANAGE_PLANS"),
  async (req, res) => {
    try {
      const search = req.query.search || "";
      const codes = await prisma.iCD10Code.findMany({
        where: {
          OR: [
            { code: { contains: search, mode: "insensitive" } },
            { description: { contains: search, mode: "insensitive" } }
          ]
        },
        take: 20
      });
      res.json(codes);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Failed to search ICD-10 codes" });
    }
  }
);

/*
==========================================
COVERAGE RULES
==========================================
*/

router.get(
  "/:id/rules",
  protectInsurance,
  authorizeInsurancePermission("VIEW_CLAIMS"),
  async (req, res) => {
    try {
      const plan = await prisma.insurancePlan.findFirst({
        where: { id: req.params.id, providerId: req.insuranceProvider.id }
      });

      if (!plan) return res.status(404).json({ error: "Plan not found" });

      const rules = await prisma.insurancePlanCoverageRule.findMany({
        where: { planId: req.params.id },
        include: { cptCode: true, icd10: true },
        orderBy: { createdAt: "desc" }
      });

      res.json(rules);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Failed to fetch coverage rules" });
    }
  }
);

router.post(
  "/:id/rules",
  protectInsurance,
  authorizeInsurancePermission("MANAGE_PLANS"),
  async (req, res) => {
    try {
      const plan = await prisma.insurancePlan.findFirst({
        where: { id: req.params.id, providerId: req.insuranceProvider.id }
      });

      if (!plan) return res.status(404).json({ error: "Plan not found" });

      const { cptCodeId, icd10Id, covered, requiresAuthorization } = req.body;

      if (!cptCodeId && !icd10Id) {
        return res.status(400).json({ error: "A CPT code or ICD-10 code is required." });
      }

      if (cptCodeId && icd10Id) {
        return res.status(400).json({ error: "A rule can target a CPT code or an ICD-10 code, not both." });
      }

      const rule = await prisma.insurancePlanCoverageRule.create({
        data: {
          planId: req.params.id,
          cptCodeId: cptCodeId || null,
          icd10Id: icd10Id || null,
          covered: covered !== false,
          requiresAuthorization: !!requiresAuthorization
        },
        include: { cptCode: true, icd10: true }
      });

      res.json(rule);
    } catch (err) {
      console.log(err);
      if (err.code === "P2002") {
        return res.status(400).json({ error: "A rule for this code already exists on this plan." });
      }
      res.status(500).json({ error: "Failed to add coverage rule" });
    }
  }
);

router.delete(
  "/rules/:ruleId",
  protectInsurance,
  authorizeInsurancePermission("MANAGE_PLANS"),
  async (req, res) => {
    try {
      const rule = await prisma.insurancePlanCoverageRule.findFirst({
        where: { id: req.params.ruleId },
        include: { plan: true }
      });

      if (!rule || rule.plan.providerId !== req.insuranceProvider.id) {
        return res.status(404).json({ error: "Rule not found" });
      }

      await prisma.insurancePlanCoverageRule.delete({ where: { id: req.params.ruleId } });

      res.json({ success: true });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Failed to delete rule" });
    }
  }
);

export default router;