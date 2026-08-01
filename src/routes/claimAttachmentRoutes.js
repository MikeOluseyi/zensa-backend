import express from "express";
import prisma from "../utils/prisma.js";

import { protect } from "../middleware/authMiddleware.js";
import { uploadClaimAttachment } from "../middleware/uploadMiddleware.js";

import path from "path";
import fs from "fs";


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

const UPLOAD_DIR = path.join(process.cwd(), "uploads", "claims");

router.get("/download/:attachmentId", protect, async (req, res) => {

  try {

    const attachment = await prisma.claimAttachment.findFirst({

      where: {
        id: req.params.attachmentId,
        claim: {
          patient: {
            hospitalId: req.user.hospitalId
          }
        }
      }

    });

    if (!attachment) {
      return res.status(404).json({ error: "Attachment not found" });
    }

    const filePath = path.join(UPLOAD_DIR, path.basename(attachment.fileUrl));

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "File no longer exists on server" });
    }

    res.download(filePath, attachment.fileName);

  } catch (err) {

    console.log(err);

    res.status(500).json({ error: "Failed to download attachment" });

  }

});

export default router;