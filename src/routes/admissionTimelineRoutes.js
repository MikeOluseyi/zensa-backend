import express from "express";
import prisma from "../utils/prisma.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


// GET ADMISSION TIMELINE
router.get(
  "/:admissionId",
  protect,
  async (req, res) => {

    try {

      const admission =
        await prisma.admission.findFirst({

          where: {
            id: req.params.admissionId,

            patient: {
              hospitalId:
                req.user.hospitalId
            }
          }
        });


      if (!admission) {

        return res.status(404).json({
          error: "Admission not found"
        });

      }


      // DOCTOR NOTES
      const doctorNotes =
        await prisma.admissionDoctorNote.findMany({

          where: {
            visitId: admission.visitId
          },

          include: {

            doctor: {

              select: {
                firstName: true,
                lastName: true
              }
            }
          }
        });


      // NURSING NOTES
      const nursingNotes =
        await prisma.nursingNote.findMany({

          where: {
            visitId: admission.visitId
          },

          include: {

            nurse: {

              select: {
                firstName: true,
                lastName: true
              }
            }
          }
        });


      // VITALS
      const vitals =
  await prisma.vitalRecord.findMany({

    where: {
      visitId: admission.visitId
    },

    include: {

      recordedBy: {

        select: {
          firstName: true,
          lastName: true
        }

      }

    }

  });


      // MEDICATIONS
      const medications =
        await prisma.admissionMedicationOrder.findMany({

          where: {
            visitId: admission.visitId
          },

          include: {

            doctor: {

              select: {
                firstName: true,
                lastName: true
              }
            }
          }
        });


     // BED TRANSFERS
      const transfers =
        await prisma.admissionTransfer.findMany({

          where: {
            admissionId: admission.id
          },

          include: {

            fromBed: true,

            toBed: true,

            transferredBy: {

              select: {
                firstName: true,
                lastName: true
              }
            }
          }
        });


      // COMBINE EVERYTHING
      const timeline = [

        ...doctorNotes.map(item => ({
          type: "DOCTOR_NOTE",
          createdAt: item.createdAt,
          data: item
        })),

        ...nursingNotes.map(item => ({
          type: "NURSING_NOTE",
          createdAt: item.createdAt,
          data: item
        })),

        ...vitals.map(item => ({
  type: "VITALS",
  createdAt: item.createdAt,
  data: {
    ...item,
    nurse: item.recordedBy
  }
})),

        ...medications.map(item => ({
          type: "MEDICATION",
          createdAt: item.createdAt,
          data: item
        })),

        ...transfers.map(item => ({
          type: "TRANSFER",
          createdAt: item.transferredAt,
          data: item
        }))

      ];


      // SORT NEWEST FIRST
      timeline.sort(
        (a, b) =>
          new Date(b.createdAt) -
          new Date(a.createdAt)
      );


      res.json(timeline);


    } catch(err) {


      console.log(err);


      res.status(500).json({

        error:
          "Failed to fetch admission timeline"

      });

    }

  }
);


export default router;