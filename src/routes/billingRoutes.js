import express from "express";

import prisma from "../utils/prisma.js";

import { protect } from "../middleware/authMiddleware.js";

import { authorizePermission } from "../middleware/permissionMiddleware.js";

import { receivePayment }
from "../utils/billing/receivePayment.js";

import { cancelCharge }
from "../utils/billing/cancelCharge.js";

import { postCharge }
from "../utils/billing/postCharge.js";

import { updateCharge }
from "../utils/billing/updateCharge.js";

const router = express.Router();


// RECEIVE PAYMENT

router.post(

  "/payment",

  protect,

  authorizePermission("RECEIVE_PAYMENT"),

  async (req,res)=>{

    try{

      const payment=
        await receivePayment({

          ...req.body,

          receivedById:req.user.id

        });

      res.json(payment);

    }

    catch(err){

      console.log(err);

      res.status(500).json({

        error:err.message

      });

    }

  }

);


// CANCEL CHARGE

router.post(

  "/cancel-charge",

  protect,

  authorizePermission("CANCEL_CHARGE"),

  async(req,res)=>{

    try{

      await cancelCharge({

        chargeId:req.body.chargeId,

        cancelledById:req.user.id,

        reason:req.body.reason

      });

      res.json({

        success:true

      });

    }

    catch(err){

      console.log(err);

      res.status(500).json({

        error:err.message

      });

    }

  }

);


// LIST PAYMENTS

router.get(

  "/payments",

  protect,

  authorizePermission("VIEW_BILLING"),

  async(req,res)=>{

    try{

      const payments=
        await prisma.payment.findMany({

          where:{

            invoice:{

              hospitalId:req.user.hospitalId

            }

          },

          include:{

            invoice:true,

            receivedBy:true

          },

          orderBy:{

            createdAt:"desc"

          }

        });

      res.json(payments);

    }

    catch(err){

      console.log(err);

      res.status(500).json({

        error:"Failed to fetch payments."

      });

    }

  }

);

router.post(

    "/post-charge",

    protect,

    authorizePermission("POST_CHARGE"),

    async(req,res)=>{

        try{

            const charge =
                await postCharge({

                    chargeId:req.body.chargeId,

                    postedById:req.user.id

                });

            res.json(charge);

        }

        catch(err){

            console.log(err);

            res.status(500).json({

                error:err.message

            });

        }

    }

);

router.patch(

    "/charge/:id",

    protect,

    authorizePermission("EDIT_CHARGE"),

    async (req,res)=>{

        try{

            const charge =
                await updateCharge({

                    chargeId:req.params.id,

                    ...req.body

                });

            res.json(charge);

        }catch(err){

            res.status(500).json({

                error:err.message

            });

        }

    }

);

export default router;