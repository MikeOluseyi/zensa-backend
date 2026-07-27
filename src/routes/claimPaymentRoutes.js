import express from "express";
import prisma from "../utils/prisma.js";

import { protect } from "../middleware/authMiddleware.js";

import {

markPaid

}

from "../utils/claimsEngine.js";

const router = express.Router();

async function getScopedClaim(claimId, hospitalId) {

  return prisma.claim.findFirst({

    where: {
      id: claimId,
      patient: {
        hospitalId
      }
    }

  });

}

router.post("/:id", protect, async (req, res) => {

  try {

    const claim = await getScopedClaim(req.params.id, req.user.hospitalId);

    if (!claim) {
      return res.status(404).json({ error: "Claim not found" });
    }

    const payment =
      await prisma.claimPayment.create({

        data: {

          claimId:
            req.params.id,

          amount:
            req.body.amount,

          reference:
            req.body.paymentReference,

          paidAt:
            new Date(),

          receivedById:
            req.user.id

        }

      });

    await markPaid({

      claimId:
        req.params.id

    });

    res.json(payment);

  } catch (err) {

    console.log(err);

    res.status(500).json({ error: "Failed to record claim payment" });

  }

});

router.get("/:id", protect, async (req, res) => {

  try {

    const claim = await getScopedClaim(req.params.id, req.user.hospitalId);

    if (!claim) {
      return res.status(404).json({ error: "Claim not found" });
    }

    const payments =
      await prisma.claimPayment.findMany({

        where: {

          claimId:
            req.params.id

        },

        include: {

          receivedBy: true

        }

      });

    res.json(payments);

  } catch (err) {

    console.log(err);

    res.status(500).json({ error: "Failed to fetch claim payments" });

  }

});

export default router;