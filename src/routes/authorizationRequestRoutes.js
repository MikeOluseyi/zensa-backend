import express from "express";
import prisma from "../utils/prisma.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  authorize("DOCTOR", "ADMIN", "ACCOUNTANT"),
  async (req, res) => {
    try {
      const { patientInsuranceId, visitId, cptCodeId, icd10Id, reason } = req.body;

      if (!cptCodeId && !icd10Id && !reason?.trim()) {
        return res.status(400).json({ error: "Select a service or diagnosis, or provide a reason." });
      }

      const insurance = await prisma.patientInsurance.findFirst({
        where: { id: patientInsuranceId, patient: { hospitalId: req.user.hospitalId } },
        include: { provider: true }
      });

      if (!insurance) return res.status(404).json({ error: "Patient insurance not found" });

      if (cptCodeId) {

        const enabled = await prisma.hospitalService.findFirst({
          where: { hospitalId: req.user.hospitalId, service: { cptId: cptCodeId }, active: true }
        });

        if (!enabled) {
          return res.status(400).json({ error: "Selected service is not enabled at your hospital." });
        }

      }

      const request = await prisma.authorizationRequest.create({
        data: {
          patientInsurance: { connect: { id: patientInsuranceId } },
          ...(visitId && { visit: { connect: { id: visitId } } }),
          hospital: { connect: { id: req.user.hospitalId } },
          insuranceProvider: { connect: { id: insurance.providerId } },
          ...(cptCodeId && { cptCode: { connect: { id: cptCodeId } } }),
          ...(icd10Id && { icd10: { connect: { id: icd10Id } } }),
          reason: reason?.trim() || "",
          status: "PENDING"
        }
      });

      res.json(request);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Failed to create authorization request" });
    }
  }
);

router.get(
  "/",
  protect,
  async (req, res) => {
    try {
      const requests = await prisma.authorizationRequest.findMany({
        where: { hospitalId: req.user.hospitalId },
        include: {
          patientInsurance: { include: { patient: true, provider: { include: { organization: true } } } },
          approvedByInsuranceStaff: { select: { firstName: true, lastName: true } },
          cptCode: true,
          icd10: true
        },
        orderBy: { requestedAt: "desc" }
      });
      res.json(requests);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Failed to fetch authorization requests" });
    }
  }
);

router.get(
  "/lookup/services",
  protect,
  async (req, res) => {
    try {
      const search = req.query.search || "";

      const services = await prisma.hospitalService.findMany({
        where: {
          hospitalId: req.user.hospitalId,
          active: true,
          service: {
            cpt: {
              OR: [
                { code: { contains: search, mode: "insensitive" } },
                { name: { contains: search, mode: "insensitive" } }
              ]
            }
          }
        },
        include: { service: { include: { cpt: true } } },
        take: 20
      });

      res.json(services);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Failed to search services" });
    }
  }
);

router.get(
  "/lookup/icd10",
  protect,
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

export default router;