import express from "express";
import prisma from "../utils/prisma.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/*
 TRIAGE QUEUE
*/
router.get(
  "/triage-queue",
  protect,
  async (req, res) => {

    try {

      const visits =
        await prisma.visit.findMany({

          where: {

            hospitalId: req.user.hospitalId,

            status: "CHECKED_IN"

          },

          include: {

            patient: {

              select: {

                id: true,
                firstName: true,
                lastName: true,
                patientNumber: true,
                gender: true,
                dateOfBirth: true

              }

            },

            appointment: {
              select: {
                reason: true
              }

            }

          },

          orderBy: {

            createdAt: "asc"

          }

        });

      res.json(visits);

    } catch (err) {

      console.log(err);

      res.status(500).json({

        error: "Failed to load triage queue"

      });

    }

  }
);

router.patch(
  "/:id/triage",
  protect,
  async (req, res) => {

    try {

      const {

        bloodPressure,
        temperature,
        pulse,
        spo2,
        weight,
        height,

        respiratoryRate,
        painScore,
        bloodSugar,
        bmi,
        headCircumference,
        triageNotes

      } = req.body;

      const visit =
        await prisma.visit.findFirst({

          where: {

            id: req.params.id,

            hospitalId:
              req.user.hospitalId

          }

        });

      if (!visit) {

        return res.status(404).json({

          error: "Visit not found"

        });

      }

      const updatedVisit =
        await prisma.visit.update({

          where: {
            id: visit.id
          },

          data: {
  systolicBP:
    bloodPressure
      ? Number(bloodPressure.split("/")[0])
      : null,

  diastolicBP:
    bloodPressure
      ? Number(bloodPressure.split("/")[1])
      : null,

            temperature:
              temperature != null
                ? Number(temperature)
                : null,

            pulse:
              pulse != null
                ? Number(pulse)
                : null,

            spo2:
              spo2 != null
                ? Number(spo2)
                : null,

            weight:
              weight != null
                ? Number(weight)
                : null,

            height:
              height != null
                ? Number(height)
                : null,

            respiratoryRate:
              respiratoryRate != null
                ? Number(respiratoryRate)
                : null,

            painScore:
              painScore != null
                ? Number(painScore)
                : null,

            bloodSugar:
              bloodSugar != null
                ? Number(bloodSugar)
                : null,

            bmi:
              bmi != null
                ? Number(bmi)
                : null,

            headCircumference:
              headCircumference != null
                ? Number(headCircumference)
                : null,

            triageNotes,

            triagedById:
              req.user.id,

            triagedAt:
              new Date(),

            status:
              "TRIAGED"

          }

        });

      if (visit.appointmentId) {

        await prisma.appointment.update({

          where: {
            id: visit.appointmentId
          },

          data: {
            status: "TRIAGED"
          }

        });

      }

      res.json(updatedVisit);

    } catch (err) {

      console.log(err);

      res.status(500).json({

        error:
          "Failed to save triage"

      });

    }

  }
);

router.get(
  "/by-appointment/:appointmentId",
  protect,
  async (req, res) => {

    const visit =
      await prisma.visit.findFirst({

        where: {

          appointmentId: req.params.appointmentId,

          hospitalId: req.user.hospitalId

        }

      });

    if (!visit) {

      return res.status(404).json({
        error: "Visit not found"
      });

    }

    res.json(visit);

  }
);

export default router;