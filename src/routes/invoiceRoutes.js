import express from "express";
import prisma from "../utils/prisma.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorizePermission } from "../middleware/permissionMiddleware.js";
import { postCharge } from "../utils/billing/index.js";
import { receivePayment } from "../utils/billing/index.js";

const router = express.Router();


// GET ALL INVOICES

router.get(
  "/",
  protect,
  authorizePermission("VIEW_BILLING"),
  async (req, res) => {

    try {

      const {

        patientId,

        status,

        from,

        to

      } = req.query;

      const invoices =
        await prisma.invoice.findMany({

          where: {

            hospitalId: req.user.hospitalId,

            ...(patientId && {

              patientId

            }),

            ...(status && {

              status

            }),

            ...(from || to
              ? {

                  createdAt: {

                    ...(from && {

                      gte: new Date(from)

                    }),

                    ...(to && {

                      lte: new Date(to)

                    })

                  }

                }
              : {})

          },

          include: {

            patient: true,

            visit: true

          },

          orderBy: {

            createdAt: "desc"

          }

        });

      res.json(invoices);

    }

    catch (err) {

      console.log(err);

      res.status(500).json({

        error: "Failed to fetch invoices."

      });

    }

  }

);


// BILLING SUMMARY

router.get(
  "/summary",
  protect,
  authorizePermission("VIEW_BILLING"),
  async (req, res) => {

    try {

      const hospitalId = req.user.hospitalId;

      const [
        invoices,
        outstanding,
        paidToday,
        paymentsToday
      ] = await Promise.all([

        prisma.invoice.aggregate({

          where: {
            hospitalId
          },

          _sum: {
            subtotal: true,
            paidAmount: true,
            balance: true
          },

          _count: true

        }),

        prisma.invoice.count({

          where: {
            hospitalId,
            balance: {
              gt: 0
            }
          }

        }),

        prisma.payment.aggregate({

          where: {

            invoice: {
              hospitalId
            },

            createdAt: {

              gte: new Date(
                new Date().setHours(0,0,0,0)
              )

            }

          },

          _sum: {
            amount: true
          }

        }),

        prisma.payment.count({

          where: {

            invoice: {
              hospitalId
            },

            createdAt: {

              gte: new Date(
                new Date().setHours(0,0,0,0)
              )

            }

          }

        })

      ]);

     res.json({

    totalInvoices:
        invoices._count,

    totalBilled:
        invoices._sum.subtotal ?? 0,

    totalPaid:
        invoices._sum.paidAmount ?? 0,

    outstandingAmount:
        invoices._sum.balance ?? 0,

    outstandingInvoices:
        outstanding,

    paymentsToday,

    amountCollectedToday:
        paidToday._sum.amount ?? 0

});

    }

    catch(err){

      console.log(err);

      res.status(500).json({

        error:"Failed to fetch summary."

      });

    }

  }
);

// OUTSTANDING

router.get(
  "/outstanding",
  protect,
  authorizePermission("VIEW_BILLING"),
  async (req, res) => {

    try {

      const invoices =
        await prisma.invoice.findMany({

          where: {

            hospitalId: req.user.hospitalId,

            balance: {

              gt: 0

            }

          },

          include: {

            patient: true

          },

          orderBy: {

            balance: "desc"

          }

        });

      res.json(invoices);

    }

    catch (err) {

      console.log(err);

      res.status(500).json({

        error: "Failed."

      });

    }

  }

);


// CASH SUMMARY

router.get(
  "/cash-summary",
  protect,
  authorizePermission("VIEW_BILLING"),
  async (req, res) => {

    try {

      const start = new Date();

      start.setHours(0,0,0,0);

      const end = new Date();

      end.setHours(23,59,59,999);

      const payments =
        await prisma.payment.findMany({

          where: {

            createdAt: {

              gte: start,

              lte: end

            }

          }

        });

      const total =
        payments.reduce(

          (sum,p)=>sum+p.amount,

          0

        );

      res.json({

        total,

        count: payments.length,

        payments

      });

    }

    catch(err){

      console.log(err);

      res.status(500).json({

        error:"Failed."

      });

    }

  }

);

// PATIENT LEDGER

router.get(
  "/ledger/:patientId",
  protect,
  authorizePermission("VIEW_BILLING"),
  async (req,res)=>{

    try{

      const charges =
        await prisma.charge.findMany({

          where:{

            patientId:req.params.patientId,

            status:"POSTED"

          }

        });

      const payments =
        await prisma.payment.findMany({

          where:{

            invoice:{

              patientId:req.params.patientId

            }

          }

        });

      const ledger=[

        ...charges.map(c=>({

          type:"CHARGE",

          date:c.createdAt,

          amount:c.totalPrice,

          description:c.description

        })),

        ...payments.map(p=>({

          type:"PAYMENT",

          date:p.createdAt,

          amount:p.amount,

          description:p.method

        }))

      ].sort(

        (a,b)=>new Date(a.date)-new Date(b.date)

      );

      res.json(ledger);

    }

    catch(err){

      console.log(err);

      res.status(500).json({

        error:"Failed."

      });

    }

});

// GET SINGLE INVOICE

router.get(
  "/:id",
  protect,
  authorizePermission("VIEW_BILLING"),
  async (req, res) => {

    try {

      const invoice =
       await prisma.invoice.findUnique({

    where: {
        id: req.params.id
    },

    include: {

        patient: true,

        visit: true,

        insurance: {
            include: {
                provider: true
            }
        },

        charges: {
            orderBy: {
                createdAt: "asc"
            }
        },

        payments: {
            orderBy: {
                createdAt: "asc"
            }
        },

        claims: true,

        createdBy: {
            select: {
                firstName: true,
                lastName: true
            }
        }

    }

});

      if (!invoice)

        return res.status(404).json({

          error: "Invoice not found."

        });

      res.json(invoice);

    }

    catch (err) {

      console.log(err);

      res.status(500).json({

        error: "Failed to fetch invoice."

      });

    }

  }

);

export default router;