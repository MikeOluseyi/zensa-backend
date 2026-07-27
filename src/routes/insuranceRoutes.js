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
      planName,
      coveragePercent,
      isPrimary,
      authorizationRequired,
      startDate,
      endDate
    } = req.body;

    const insurance = await prisma.patientInsurance.create({
      data: {
        patientId,
        providerId,
        policyNumber,
        memberId,
        authorizationNumber,
        planName,
        coveragePercent:
          coveragePercent != null ? Number(coveragePercent) : null,
        isPrimary,
        authorizationRequired,
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