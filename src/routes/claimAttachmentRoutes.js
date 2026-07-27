import express from "express";
import prisma from "../utils/prisma.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

async function getScopedClaim(claimId, hospitalId) {

  const claim = await prisma.claim.findFirst({

    where: {
      id: claimId,
      patient: {
        hospitalId
      }
    }

  });

  return claim;

}

router.post("/:id", protect, async (req, res) => {

  try {

    const claim = await getScopedClaim(req.params.id, req.user.hospitalId);

    if (!claim) {
      return res.status(404).json({ error: "Claim not found" });
    }

    const attachment =
      await prisma.claimAttachment.create({

        data: {

          claimId: req.params.id,

          fileName: req.body.fileName,

          fileUrl: req.body.fileUrl,

          type: req.body.type ?? "OTHER",

          attachedByStaffId: req.user.id

        }

      });

    res.json(attachment);

  } catch (err) {

    console.log(err);

    res.status(500).json({ error: "Failed to attach file" });

  }

});

router.get("/:id", protect, async (req, res) => {

  try {

    const claim = await getScopedClaim(req.params.id, req.user.hospitalId);

    if (!claim) {
      return res.status(404).json({ error: "Claim not found" });
    }

    const attachments =
      await prisma.claimAttachment.findMany({

        where: {

          claimId: req.params.id

        }

      });

    res.json(attachments);

  } catch (err) {

    console.log(err);

    res.status(500).json({ error: "Failed to fetch attachments" });

  }

});

export default router;