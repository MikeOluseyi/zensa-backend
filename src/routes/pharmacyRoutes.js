import express from "express";
import prisma from "../utils/prisma.js";
import { createCharge } from "../utils/billing/index.js";
import { postCharge } from "../utils/billing/index.js";
import { createNotification } from "../utils/notificationService.js";
import { createAuditLog } from "../utils/auditService.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import { authorizePermission } from "../middleware/permissionMiddleware.js";
import { dispenseMedication } from "../utils/pharmacy/dispenseMedication.js";

const router = express.Router();


// PENDING PRESCRIPTIONS
router.get(
  "/pending",
  protect,
  authorize("PHARMACIST", "ADMIN"),
  async (req, res) => {

    try {

      const prescriptions =
        await prisma.prescription.findMany({

          where: {
            status: "PENDING",

            medicalRecord: {
              patient: {
                hospitalId: req.user.hospitalId
              }
            }
          },

          include: {
            medicalRecord: {
              include: {
                patient: true
              }
            }
          },

          orderBy: {
            createdAt: "asc"
          }
        });

      res.json(prescriptions);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error: "Failed to fetch prescriptions"
      });

    }
  }
);

// DISPENSE MEDICATION
router.patch(
  "/dispense/:id",
  protect,
  authorizePermission("DISPENSE_MEDICATION"),
  async (req, res) => {

    try {

     const prescription =
    await dispenseMedication({

        prescriptionId:
            req.params.id,

        pharmacistId:
            req.user.id,

        hospitalId:
            req.user.hospitalId

    });

await createNotification({

    hospitalId:
        req.user.hospitalId,

    patientId:
        prescription.medicalRecord.patientId,

    type:"PHARMACY",

    title:"Medication Dispensed",

    message:
        `${prescription.medication} has been dispensed`

});

await createAuditLog({

    hospitalId:
        req.user.hospitalId,

    staffId:
        req.user.id,

    action:"DISPENSE_MEDICATION",

    entity:"PRESCRIPTION",

    entityId:
        prescription.id,

    details:
        `Dispensed ${prescription.medication}`

});

res.json(prescription);
    } catch (err) {

      console.log(err);

      res.status(500).json({
        error: "Failed to dispense medication"
      });

    }
  }
);

router.get(

    "/queue",

    protect,

    async(req,res)=>{

        const prescriptions =
            await prisma.prescription.findMany({

                where:{

                    status:"PENDING",

                    medicalRecord:{

                        patient:{

                            hospitalId:req.user.hospitalId

                        }

                    }

                },

                include:{

                    inventoryItem:true,

                    medicalRecord:{
                        include:{
                            patient:true
                        }
                    }

                },

                orderBy:{
                    createdAt:"asc"
                }

            });

        res.json(prescriptions);

    }

);

/*
========================================
DISPENSED TODAY
========================================
*/

router.get(

    "/dispensed",

    protect,

    authorize("PHARMACIST","ADMIN"),

    async(req,res)=>{

        const prescriptions =
            await prisma.prescription.findMany({

                where:{

                    status:"DISPENSED",

                    medicalRecord:{

                        patient:{

                            hospitalId:req.user.hospitalId

                        }

                    }

                },

                include:{

                    inventoryItem:true,

                    dispensedBy:true,

                    medicalRecord:{

                        include:{

                            patient:true

                        }

                    }

                },

                orderBy:{

                    dispensedAt:"desc"

                }

            });

        res.json(prescriptions);

    }

);

export default router;