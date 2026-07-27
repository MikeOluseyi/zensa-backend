import express from "express";
import prisma from "../utils/prisma.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();


// CREATE NURSING NOTE
router.post(
  "/",
  protect,
  authorize("NURSE", "ADMIN"),
  async (req, res) => {

    try {

      const {
        admissionId,
        note
      } = req.body;

      const admission =
  await prisma.admission.findUnique({

    where: {
      id: admissionId
    },

    select: {

      id: true,

      visitId: true,

      patient: {

        select: {
          hospitalId: true
        }

      }

    }

});

if (!admission) {

    return res.status(404).json({
        error: "Admission not found"
    });

}

if (
    admission.patient.hospitalId !==
    req.user.hospitalId
) {

    return res.status(403).json({
        error: "Unauthorized"
    });

}

      const nursingNote =
        await prisma.nursingNote.create({

          data: {

            admissionId,

             visitId: admission?.visitId,

            nurseId:
              req.user.id,

            note

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


      res.json(nursingNote);


    } catch(err) {

      console.log(err);

      res.status(500).json({
        error:
          "Failed to create nursing note"
      });

    }

  }
);


// GET NOTES FOR AN ADMISSION

router.get(
  "/:admissionId",
  protect,
  async (req,res) => {

    try {

      const notes =
        await prisma.nursingNote.findMany({

          where: {

            admissionId:
              req.params.admissionId,

            admission: {

              patient: {

                hospitalId:
                  req.user.hospitalId

              }

            }

          },

          include: {

            nurse: {

              select: {

                firstName:true,
                lastName:true

              }

            }

          },

          orderBy: {

            createdAt:"desc"

          }

        });

      res.json(notes);

    } catch(err) {

      console.log(err);

      res.status(500).json({

        error:
          "Failed to fetch nursing notes"

      });

    }

  }

);


export default router;