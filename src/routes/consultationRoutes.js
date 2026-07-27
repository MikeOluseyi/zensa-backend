import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import { authorizePermission } from "../middleware/permissionMiddleware.js";
import prisma from "../utils/prisma.js";

import {

  startConsultation,

  completeConsultation

} from "../utils/consultationEngine.js";

const router = express.Router();

/*
==================================================
START CONSULTATION
==================================================
*/

router.patch(
  "/:id/start",
  protect,
  authorize("DOCTOR", "ADMIN"),
  authorizePermission("START_CONSULTATION"),
  async (req, res) => {

    try {

      const result =
        await startConsultation({

          appointmentId: req.params.id,

          user: req.user

        });

      res.json(result);

    } catch (err) {

      console.log(err);

      res.status(500).json({

        error:
          err.message ||
          "Failed to start consultation"

      });

    }

  }
);

/*
==================================================
RESUME CONSULTATION
==================================================
*/

router.patch(
  "/:id/resume",
  protect,
  authorize("DOCTOR", "ADMIN"),
  authorizePermission("START_CONSULTATION"),
  async (req, res) => {

    try {

      const appointment =
        await prisma.appointment.findFirst({

          where: {

            id: req.params.id,

            hospitalId: req.user.hospitalId

          }

        });

      if (!appointment)
        throw new Error("Appointment not found.");

      if (
        req.user.role === "DOCTOR" &&
        appointment.doctorId !== req.user.id
      ) {

        throw new Error("This appointment belongs to another doctor.");

      }

      if (
        appointment.status !==
        "READY_FOR_REVIEW"
      ) {

        throw new Error(
          "Patient is not awaiting review."
        );

      }

      const visit =
        await prisma.visit.findFirst({

          where: {

            appointmentId:
              appointment.id

          }

        });

      if (!visit) {
        throw new Error("Visit not found.");
      }

      await prisma.visit.update({

        where: {

          id: visit.id

        },

        data: {

          status:
            "IN_CONSULTATION"

        }

      });

      const updated =
        await prisma.appointment.update({

          where: {

            id: appointment.id

          },

          data: {

            status:
              "IN_PROGRESS"

          }

        });

      res.json(updated);

    }

    catch (err) {

      res.status(500).json({

        error: err.message

      });

    }

  }

);

/*
==================================================
CONSULTATION WORKSPACE
==================================================
*/

router.get(
  "/:id",
  protect,
  authorize("DOCTOR", "ADMIN"),
  async (req, res) => {

    try {

      const appointment =
        await prisma.appointment.findFirst({

          where: {

            id: req.params.id,

            hospitalId: req.user.hospitalId

          },

          include: {

            patient: true,

            doctor: true,

            visit: {

              include: {

                medicalRecord: true,

                procedureRequests: {

                 include: {

    medicalRecordService: {

        include: {

            hospitalService: {

                include: {

                    service: {

                        include: {

                            cpt: true

                        }

                    }

                }

            }

        }

    },

    procedureResult: true,

    labResult: true

},

                  orderBy: {

                    createdAt: "asc"

                  }

                },

                prescriptions: true,

                admissionRequest: true

              }

            }

          }

        });

      if (!appointment) {

        return res.status(404).json({

          error: "Appointment not found"

        });

      }

      res.json(appointment);

    }

    catch (err) {

      console.log(err);

      res.status(500).json({

        error: err.message

      });

    }

  }

);

/*
==================================================
COMPLETE CONSULTATION
==================================================
*/

router.patch(
  "/:id/complete",
  protect,
  authorize("DOCTOR", "ADMIN"),
  authorizePermission("COMPLETE_CONSULTATION"),
  async (req, res) => {

    try {

    const result =
await completeConsultation({

    appointmentId:req.params.id,

    user: req.user,

    consultationHospitalServiceId:req.body.consultationHospitalServiceId,

    chiefComplaint:req.body.chiefComplaint,

    historyOfComplaint:req.body.historyOfComplaint,

    diagnosis:req.body.diagnosis,

    icd10Id:req.body.icd10Id,

    treatment:req.body.treatment,

    notes:req.body.notes,

    prescriptions: req.body.prescriptions,

    procedures: req.body.procedures

});

      res.json(result);

    } catch (err) {

      console.log(err);

      res.status(500).json({

        error:
          err.message ||
          "Failed to complete consultation"

      });

    }

  }
);

export default router;