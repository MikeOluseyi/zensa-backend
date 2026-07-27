import express from "express";

import prisma from "../utils/prisma.js";

import { protect } from "../middleware/authMiddleware.js";

import { authorize } from "../middleware/roleMiddleware.js";

// AFTER
import {
  createAdmissionRequest,
  approveAdmissionRequest,
  rejectAdmissionRequest,
} from "../utils/admissionServices.js";

const router = express.Router();

router.post(
  "/",
  protect,
  authorize("DOCTOR", "ADMIN"),
  async (req, res) => {
    try {
      const visit = await prisma.visit.findFirst({
        where: {
          appointmentId: req.body.appointmentId,
          hospitalId: req.user.hospitalId,
        },
      });

      if (!visit) {
        return res.status(404).json({
          error: "Visit not found",
        });
      }

      const request = await createAdmissionRequest({
        visitId: visit.id,
        requestedById: req.user.id,
        reason: req.body.reason,
        notes: req.body.notes,
        hospitalId: req.user.hospitalId,
        evaluationHospitalServiceId: req.body.evaluationHospitalServiceId,
        medicationDecisions: req.body.medicationDecisions ?? []
      });

      res.status(201).json(request);
    } catch (err) {
      console.error(err);

      res.status(500).json({
        error: err.message,
      });
    }
  }
);

router.get(
  "/",
  protect,
  authorize(
    "NURSE",
    "DOCTOR",
    "ADMIN"
  ),
  async (req, res) => {

    try {

      const requests =
        await prisma.admissionRequest.findMany({

          where: {

            patient: {

              hospitalId: req.user.hospitalId

            },

            status: "PENDING"

          },

          include: {

            patient: true,

            visit: {

              select: {

                appointmentId: true

              }

            },

            requestedBy: {

              select: {

                firstName: true,
                lastName: true

              }

            },

            evaluationHospitalService: {

              include: {

                service: {

                  include: {

                    cpt: true

                  }

                }

              }

            }

          },

          orderBy: {

            createdAt: "desc"

          }

        });

      res.json(requests);

    } catch (err) {

      console.log(err);

      res.status(500).json({

        error: "Failed to load admission requests"

      });

    }

  }
);

// AFTER
router.patch(
  "/:id/reject",
  protect,
  authorize("NURSE", "ADMIN", "DOCTOR"),
  async (req, res) => {

    try {

      const request =
        await rejectAdmissionRequest({

          requestId: req.params.id,

          rejectedById: req.user.id,

          rejectionReason: req.body.rejectionReason,

          hospitalId: req.user.hospitalId

        });

      res.json(request);

    } catch (err) {

      console.log(err);

      const status =
        err.message === "REQUEST_NOT_FOUND" ? 404 :
        err.message === "REQUEST_ALREADY_PROCESSED" ? 400 :
        500;

      res.status(status).json({

        error:
          err.message === "REQUEST_NOT_FOUND" ? "Admission request not found" :
          err.message === "REQUEST_ALREADY_PROCESSED" ? "Only pending requests can be rejected" :
          "Failed to reject admission request"

      });

    }

  }
);

router.patch(
  "/:id/approve",
  protect,
  authorize(
    "DOCTOR",
    "ADMIN",
    "NURSE"
  ),
  async (req, res) => {

    try {

      const admission =
        await approveAdmissionRequest({

          requestId:
            req.params.id,

          bedId:
            req.body.bedId,

          attendingDoctorId:
            req.body.attendingDoctorId,

          approvedById:
            req.user.id,

          hospitalId:
            req.user.hospitalId

        });

      res.json(admission);

    } catch (err) {

      console.log(err);

      res.status(500).json({

        error:
          err.message || "Failed to approve admission"

      });

    }

  }
);

export default router;