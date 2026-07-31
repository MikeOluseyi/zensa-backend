import express from "express";
import prisma from "../utils/prisma.js";

import { protect } from "../middleware/authMiddleware.js";
import { uploadClaimAttachment } from "../middleware/uploadMiddleware.js";


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

router.post("/:id", protect, (req, res) => {

  uploadClaimAttachment(req, res, async (err) => {

    if (err) {
      return res.status(400).json({ error: err.message });
    }

    try {

      const claim = await getScopedClaim(req.params.id, req.user.hospitalId);

      if (!claim) {

        if (req.file) fs.unlinkSync(req.file.path);

        return res.status(404).json({ error: "Claim not found" });

      }

      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const attachment =
        await prisma.claimAttachment.create({

          data: {

            claimId: req.params.id,

            fileName: req.file.originalname,

            fileUrl: `/uploads/claims/${req.file.filename}`,

            mimeType: req.file.mimetype,

            type: req.body.type ?? "OTHER",

            attachedByStaffId: req.user.id

          }

        });

      res.json(attachment);

    } catch (dbErr) {

      console.log(dbErr);

      if (req.file) fs.unlinkSync(req.file.path);

      res.status(500).json({ error: "Failed to attach file" });

    }

  });

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