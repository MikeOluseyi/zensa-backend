import express from "express";
import prisma from "../utils/prisma.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/providers", protect, async (req, res) => {
  try {

    const provider = await prisma.insuranceProvider.create({
      data: req.body
    });

    res.json(provider);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Failed to create provider"
    });
  }
});

// AFTER
router.post("/assign", protect, async (req, res) => {
  try {

    const patient = await prisma.patient.findFirst({
      where: {
        id: req.body.patientId,
        hospitalId: req.user.hospitalId
      }
    });

    if (!patient) {
      return res.status(404).json({
        error: "Patient not found"
      });
    }

    const {
      patientId,
      providerId,
      policyNumber,
      memberId,
      authorizationNumber,
      planId,
      planName,
      coveragePercent,
      isPrimary,
      authorizationRequired,
      startDate,
      endDate
    } = req.body;

    let resolvedPlanName = planName;
    let resolvedCoveragePercent = coveragePercent != null ? Number(coveragePercent) : null;
    let resolvedAuthRequired = authorizationRequired;

    if (planId) {

      const plan = await prisma.insurancePlan.findFirst({
        where: { id: planId, providerId, active: true }
      });

      if (!plan) {
        return res.status(400).json({ error: "Selected plan not found or inactive for this provider." });
      }

      // Snapshot the plan's terms onto this enrollment at assignment time —
      // PatientInsurance keeps its own copy so later plan edits don't
      // retroactively change what a patient already agreed to.
      resolvedPlanName = plan.name;
      resolvedCoveragePercent = plan.coveragePercent;
      resolvedAuthRequired = plan.authorizationRequired;

    }

    const insurance = await prisma.patientInsurance.create({
      data: {
        patientId,
        providerId,
        planId: planId ?? null,
        policyNumber,
        memberId,
        authorizationNumber,
        planName: resolvedPlanName,
        coveragePercent: resolvedCoveragePercent,
        isPrimary,
        authorizationRequired: resolvedAuthRequired,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null
      }
    });

    res.json(insurance);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Failed to assign insurance"
    });
  }
});

router.get("/patient/:patientId", protect, async (req, res) => {
  try {

    const patient = await prisma.patient.findFirst({
      where: { id: req.params.patientId, hospitalId: req.user.hospitalId }
    });

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    const insurance = await prisma.patientInsurance.findMany({
      where: {
        patientId: req.params.patientId
      },
      include: {
        provider: {
          include: {
            organization: { select: { id: true, name: true, code: true } }
          }
        }
      }
    });

    res.json(insurance);

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch insurance" });
  }
});

export default router;