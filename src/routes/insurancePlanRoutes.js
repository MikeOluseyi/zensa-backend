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

      const { name, coveragePercent, authorizationRequired, maxClaimAmount } = req.body;

      if (!name || coveragePercent == null) {
        return res.status(400).json({ error: "Name and coverage percent are required." });
      }

      const plan = await prisma.insurancePlan.create({
        data: {
          providerId: req.insuranceProvider.id,
          name,
          coveragePercent,
          authorizationRequired: !!authorizationRequired,
          maxClaimAmount: maxClaimAmount ?? null
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

      const { name, coveragePercent, authorizationRequired, maxClaimAmount, active } = req.body;

      const plan = await prisma.insurancePlan.update({
        where: { id: req.params.id },
        data: {
          ...(name !== undefined && { name }),
          ...(coveragePercent !== undefined && { coveragePercent }),
          ...(authorizationRequired !== undefined && { authorizationRequired }),
          ...(maxClaimAmount !== undefined && { maxClaimAmount }),
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

export default router;