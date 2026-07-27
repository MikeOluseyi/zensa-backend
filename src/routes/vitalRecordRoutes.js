import express from "express";
import prisma from "../utils/prisma.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();


// RECORD VITALS

router.post(
  "/",
  protect,
  authorize("NURSE","ADMIN"),
  async(req,res)=>{

    try{

      const{

        visitId,

        temperature,
        pulse,
        respiratoryRate,
        systolicBP,
        diastolicBP,
        oxygenSaturation,
        weight,
        height,
        bloodSugar,
        painScore,
        bmi,
        headCircumference,
        notes

      }=req.body;

      const visit=
        await prisma.visit.findFirst({

          where:{

            id:visitId,

            patient:{
              hospitalId:req.user.hospitalId
            }

          }

        });

      if(!visit){

        return res.status(404).json({
          error:"Visit not found"
        });

      }

      const vital=
        await prisma.vitalRecord.create({

          data:{

            visitId,

            recordedById:req.user.id,

            temperature,
            pulse,
            respiratoryRate,

            systolicBP,
            diastolicBP,

            oxygenSaturation,

            weight,

            height,

            bloodSugar,

            painScore,

            bmi,

            headCircumference,

            notes

          },

          include:{

            recordedBy:{

              select:{

                firstName:true,
                lastName:true

              }

            }

          }

        });

      res.json(vital);

    }catch(err){

      console.log(err);

      res.status(500).json({

        error:"Failed to record vitals"

      });

    }

  }

);


// GET VITAL HISTORY

router.get(
  "/visit/:visitId",
  protect,
  async(req,res)=>{

    try{

      const vitals=
        await prisma.vitalRecord.findMany({

          where:{

            visitId:req.params.visitId,

            visit:{

              patient:{

                hospitalId:req.user.hospitalId

              }

            }

          },

          include:{

            recordedBy:{

              select:{

                firstName:true,
                lastName:true

              }

            }

          },

          orderBy:{

            createdAt:"desc"

          }

        });

      res.json(vitals);

    }catch(err){

      console.log(err);

      res.status(500).json({

        error:"Failed to fetch vitals"

      });

    }

  }

);

// GET VITALS FOR AN ADMISSION

router.get(
  "/admission/:admissionId",
  protect,
  async (req, res) => {

    try {

      const admission =
        await prisma.admission.findFirst({

          where: {
            id: req.params.admissionId,
            patient: {
              hospitalId: req.user.hospitalId
            }
          }

        });

      if (!admission) {

        return res.status(404).json({
          error: "Admission not found"
        });

      }

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

          },

          orderBy: {
            createdAt: "desc"
          }

        });

      res.json(vitals);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error: "Failed to fetch vitals"
      });

    }

  }

);


// RECORD VITALS FOR AN ADMISSION
// (resolves visitId server-side so the client only needs to know the admissionId)

router.post(
  "/admission/:admissionId",
  protect,
  authorize("NURSE", "ADMIN"),
  async (req, res) => {

    try {

      const admission =
        await prisma.admission.findFirst({

          where: {
            id: req.params.admissionId,
            patient: {
              hospitalId: req.user.hospitalId
            }
          }

        });

      if (!admission) {

        return res.status(404).json({
          error: "Admission not found"
        });

      }

      if (!admission.visitId) {

        return res.status(400).json({
          error: "This admission has no linked visit."
        });

      }

      const {

        temperature,
        pulse,
        respiratoryRate,
        systolicBP,
        diastolicBP,
        oxygenSaturation,
        weight,
        height,
        bloodSugar,
        painScore,
        bmi,
        headCircumference,
        notes

      } = req.body;

      const vital =
        await prisma.vitalRecord.create({

          data: {

            visitId: admission.visitId,

            recordedById: req.user.id,

            temperature,
            pulse,
            respiratoryRate,

            systolicBP,
            diastolicBP,

            oxygenSaturation,

            weight,

            height,

            bloodSugar,

            painScore,

            bmi,

            headCircumference,

            notes

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

      res.json(vital);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error: "Failed to record vitals"
      });

    }

  }

);

export default router;