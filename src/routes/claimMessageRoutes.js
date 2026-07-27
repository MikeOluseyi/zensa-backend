import express from "express";
import prisma from "../utils/prisma.js";

import { protect } from "../middleware/authMiddleware.js";

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

    const message =
      await prisma.claimMessage.create({

        data: {

          claimId:
            req.params.id,

          message:
            req.body.message,

          senderType: "HOSPITAL",

          staffId:
            req.user.id

        }

      });

    res.json(message);

  } catch (err) {

    console.log(err);

    res.status(500).json({ error: "Failed to send message" });

  }

});

router.get("/:id", protect, async (req, res) => {

  try {

    const claim = await getScopedClaim(req.params.id, req.user.hospitalId);

    if (!claim) {
      return res.status(404).json({ error: "Claim not found" });
    }

    const messages =
      await prisma.claimMessage.findMany({

        where: {

          claimId:
            req.params.id

        },

        include: {

          staff: true,

          insuranceStaff: true

        },

        orderBy: {

          createdAt: "asc"

        }

      });

    res.json(messages);

  } catch (err) {

    console.log(err);

    res.status(500).json({ error: "Failed to fetch messages" });

  }

});

export default router;