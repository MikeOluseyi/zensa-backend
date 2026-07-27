import express from "express";
import prisma from "../utils/prisma.js";

import { protect } from "../middleware/authMiddleware.js";

import { authorize } from "../middleware/roleMiddleware.js";

import {

transferConsultation, acceptTransfer

} from "../utils/consultationsTransferEngine.js";

const router = express.Router();

router.post(

"/",

protect,

authorize("DOCTOR","ADMIN"),

async(req,res)=>{

try{

const transfer =
await transferConsultation({

visitId:req.body.visitId,

fromDoctorId:req.user.id,

toDepartmentId:req.body.toDepartmentId,

reason:req.body.reason

});

res.json(transfer);

}catch(err){

console.log(err);

res.status(500).json({

error:err.message

});

}

}

);

/*
==================================================
PENDING TRANSFERS FOR MY DEPARTMENT
==================================================
*/

router.get(

    "/pending",

    protect,

    authorize("DOCTOR","ADMIN"),

    async(req,res)=>{

        try{

            const transfers =
                await prisma.consultationTransfer.findMany({

                    where:{

                        status:"PENDING",

                        toDepartmentId:
                            req.user.departmentId

                    },

                    include:{

                        visit:{
                            include:{

                                patient:true,

                                appointment:true

                            }

                        },

                        fromDoctor:{

                            select:{

                                firstName:true,

                                lastName:true

                            }

                        },

                        fromDepartment:true,

                        toDepartment:true

                    },

                    orderBy:{

                        createdAt:"asc"

                    }

                });

            res.json(transfers);

        }

        catch(err){

            console.log(err);

            res.status(500).json({

                error:
                    err.message

            });

        }

    }

);

/*
==================================================
ACCEPT TRANSFER
==================================================
*/

router.patch(

    "/:id/accept",

    protect,

    authorize("DOCTOR","ADMIN"),

    async(req,res)=>{

        try{

            const transfer =
                await acceptTransfer({

                    transferId:
                        req.params.id,

                    doctorId:
                        req.user.id

                });

            res.json(transfer);

        }

        catch(err){

            console.log(err);

            res.status(500).json({

                error:
                    err.message

            });

        }

    }

);

export default router;