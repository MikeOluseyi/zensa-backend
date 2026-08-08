import express from "express";
import prisma from "../utils/prisma.js";
import { protectInsurance } from "../middleware/insuranceAuthMiddleware.js";
import { authorizeInsurancePermission } from "../middleware/permissionMiddleware.js";

const router = express.Router();

router.get(
  "/",
  protectInsurance,
  authorizeInsurancePermission("VIEW_AUTH_REQUESTS"),
  async (req, res) => {
    try {
      const requests = await prisma.authorizationRequest.findMany({
        where: { insuranceProviderId: req.insuranceProvider.id, status: "PENDING" },
        include: {
          patientInsurance: { include: { patient: true } },
          hospital: { select: { name: true } },
          cptCode: true,
          icd10: true
        },
        orderBy: { requestedAt: "asc" }
      });
      res.json(requests);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Failed to fetch authorization requests" });
    }
  }
);

router.patch(
  "/:id/approve",
  protectInsurance,
  authorizeInsurancePermission("APPROVE_AUTH_REQUESTS"),
  async (req, res) => {
    try {
      const existing = await prisma.authorizationRequest.findFirst({
        where: { id: req.params.id, insuranceProviderId: req.insuranceProvider.id }
      });
      if (!existing) return res.status(404).json({ error: "Request not found" });
      if (existing.status !== "PENDING") return res.status(400).json({ error: "Already processed" });

      const updated = await prisma.authorizationRequest.update({
        where: { id: req.params.id },
        data: { status: "APPROVED", approvedByInsuranceStaffId: req.user.id }
      });
      res.json(updated);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Failed to approve request" });
    }
  }
);

router.patch(
  "/:id/reject",
  protectInsurance,
  authorizeInsurancePermission("REJECT_AUTH_REQUESTS"),
  async (req, res) => {
    try {
      const existing = await prisma.authorizationRequest.findFirst({
        where: { id: req.params.id, insuranceProviderId: req.insuranceProvider.id }
      });
      if (!existing) return res.status(404).json({ error: "Request not found" });
      if (existing.status !== "PENDING") return res.status(400).json({ error: "Already processed" });

      const updated = await prisma.authorizationRequest.update({
        where: { id: req.params.id },
        data: {
          status: "REJECTED",
          approvedByInsuranceStaffId: req.user.id,
          rejectionReason: req.body.rejectionReason
        }
      });
      res.json(updated);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Failed to reject request" });
    }
  }
);

export default router;