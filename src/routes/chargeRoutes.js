import express from "express";
import prisma from "../utils/prisma.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorizePermission } from "../middleware/permissionMiddleware.js";

const router = express.Router();


router.get(
    "/",
    protect,
    authorizePermission("VIEW_CHARGES"),
    async (req,res)=>{

        const charges =
            await prisma.charge.findMany({

                where:{
                     patient: {
                    hospitalId:req.user.hospitalId
                     }
                },

                include:{

                    patient: {
    select: {
        id: true,
        patientNumber: true,
        firstName: true,
        lastName: true
    }
},

                    invoice: {
  select: {
    id: true,
    subtotal: true,
    paidAmount: true,
    balance: true,
    status: true
  }
},

                    service:true

                },

                orderBy:{
                    createdAt:"desc"
                }

            });

        res.json(charges);

    }
);

export default router;