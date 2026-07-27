import express from "express";
import prisma from "../utils/prisma.js";

import { protect }
from "../middleware/authMiddleware.js";

import { authorize }
from "../middleware/roleMiddleware.js";

const router = express.Router();


/*
 CREATE DOCTOR NOTE
*/
router.post(
  "/",
  protect,
  authorize("DOCTOR"),
  async (req, res) => {

    try {

      const {
        admissionId,
        subjective,
        objective,
        assessment,
        plan
      } = req.body;


      // VERIFY ADMISSION BELONGS TO HOSPITAL
      const admission =
        await prisma.admission.findFirst({

          where: {

            id: admissionId,

            patient: { hospitalId: req.user.hospitalId }
            },

            select: {
      id: true,
      visitId: true
    }
        });


      if (!admission) {

        return res.status(404).json({

          error:
            "Admission not found"

        });

      }

      const note =
  await prisma.admissionDoctorNote.create({

    data: {

      visitId: admission.visitId,

      admissionId,

      doctorId: req.user.id,

      subjective,

      objective,

      assessment,

      plan

    },

    include: {

      doctor: {

        select: {

          id: true,

          firstName: true,

          lastName: true,

          specialization: true

        }

      }

    }

});

      res.json(note);


    } catch(err) {


      console.log(err);


      res.status(500).json({

        error:
          "Failed to create doctor note"

      });


    }

  }

);


/*
 GET ALL DOCTOR NOTES FOR ADMISSION
*/
router.get(
  "/:admissionId",
  protect,
  async (req, res) => {


    try {


      const notes =
        await prisma.admissionDoctorNote.findMany({

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

            doctor: {

              select: {

                id: true,

                firstName: true,

                lastName: true,

                specialization: true

              }

            }

          },


          orderBy: {

            createdAt:
              "desc"

          }

        });


      res.json(notes);


    } catch(err) {


      console.log(err);


      res.status(500).json({

        error:
          "Failed to fetch doctor notes"

      });


    }


  }

);


export default router;