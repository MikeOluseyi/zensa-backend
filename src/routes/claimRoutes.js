import express from "express";
import prisma from "../utils/prisma.js";

import {
  createClaimDraft,
  updateClaimDraft,
  submitClaim,
  markExported
} from "../utils/claimsEngine.js";

import { deliverClaim } from "../utils/claimDelivery/deliveryEngine.js";

import { createAuditLog } from "../utils/auditService.js";

import { buildClaimDTO } from "../utils/claimDelivery/buildClaimDTO.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import { authorizePermission } from "../middleware/permissionMiddleware.js";

const router = express.Router();

/*
====================================================
GET CLAIM ENCOUNTER / TIMELINE
====================================================
*/

router.get(
  "/:id/timeline",
  protect,
  authorize("ADMIN", "ACCOUNTANT"),
  authorizePermission("VIEW_CLAIMS"),
  async (req, res) => {

    try {

      const claim =
        await prisma.claim.findFirst({

          where: {
            id: req.params.id,
            patient: {
              hospitalId: req.user.hospitalId
            }
          }

        });

      if (!claim) {
        return res.status(404).json({ error: "Claim not found" });
      }

      const dto = await buildClaimDTO(claim.id);

      res.json({
        encounter: dto.encounter,
        timeline: dto.timeline
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error: err.message || "Failed to fetch claim timeline"
      });

    }

  }
);

/*
====================================================
CREATE DRAFT
====================================================
*/

router.post(
  "/",
  protect,
  authorize("ADMIN", "ACCOUNTANT"),
  authorizePermission("CREATE_CLAIM"),
  async (req, res) => {

    try {

      const {

        insuranceId,
        invoiceId

      } = req.body;

      const claim =
        await createClaimDraft({

          insuranceId,

          invoiceId,

          createdById: req.user.id,

          hospitalId: req.user.hospitalId

        });

      await createAuditLog({

        hospitalId: req.user.hospitalId,

        staffId: req.user.id,

        action: "CREATE_CLAIM",

        entity: "CLAIM",

        entityId: claim.id,

        details:
          `Created Draft ${claim.claimNumber}`

      });

      res.json(claim);

    }

    catch (err) {

      console.log(err);

      res.status(500).json({

        error: err.message

      });

    }

  }

);



/*
====================================================
ALL CLAIMS
====================================================
*/

router.get(
  "/",
  protect,
  authorize("ADMIN", "ACCOUNTANT"),
  authorizePermission("VIEW_CLAIMS"),
  async (req, res) => {

    const claims =
      await prisma.claim.findMany({

        where: {

          patient: {

            hospitalId:
              req.user.hospitalId

          }

        },

        include: {

          patient: true,

          insurance: {
  include: {
    provider: {
      include: {
        organization: true
      }
    }
  }
},

          invoice: {

            include: {

              charges: true

            }

          }

        },

        orderBy: {

          createdAt: "desc"

        }

      });

    res.json(claims);

  }

);

router.get(
  "/:id/full",
  protect,
  authorize("ADMIN", "ACCOUNTANT"),
  authorizePermission("VIEW_CLAIMS"),
  async (req, res) => {

    try {

      const claim =
        await prisma.claim.findFirst({

          where: {
            id: req.params.id,
            patient: {
              hospitalId: req.user.hospitalId
            }
          }

        });

      if (!claim) {
        return res.status(404).json({ error: "Claim not found" });
      }

      const dto = await buildClaimDTO(claim.id);

      res.json(dto);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error: err.message || "Failed to fetch claim details"
      });

    }

  }
);

/*
====================================================
GET SINGLE CLAIM
====================================================
*/

router.get(
  "/:id",
  protect,
  authorize("ADMIN", "ACCOUNTANT"),
  authorizePermission("VIEW_CLAIMS"),
  async (req, res) => {

    const claim =
      await prisma.claim.findFirst({

        where: {

          id: req.params.id,

          patient: {

            hospitalId:
              req.user.hospitalId

          }

        },

        include: {

          patient: true,

         insurance: {
  include: {
    provider: {
      include: {
        organization: true
      }
    }
  }
},

          invoice: {

            include: {

              charges: true

            }

          },

          attachments: true,

          messages: true,

          payments: true

        }

      });

    if (!claim)

      return res.status(404).json({

        error: "Claim not found"

      });

    res.json(claim);

  }

);



/*
====================================================
UPDATE DRAFT
====================================================
*/

router.patch(
  "/:id",
  protect,
  authorize("ADMIN", "ACCOUNTANT"),
  authorizePermission("EDIT_CLAIM"),
  async (req, res) => {

    try {

      const claim =
        await updateClaimDraft({

          claimId: req.params.id,

          updates: req.body

        });

      await createAuditLog({

        hospitalId: req.user.hospitalId,

        staffId: req.user.id,

        action: "UPDATE_CLAIM",

        entity: "CLAIM",

        entityId: claim.id,

        details:
          `Updated Draft ${claim.claimNumber}`

      });

      res.json(claim);

    }

    catch (err) {

      res.status(500).json({

        error: err.message

      });

    }

  }

);



/*
====================================================
SUBMIT CLAIM
====================================================
*/

router.patch(
  "/:id/submit",
  protect,
  authorize("ADMIN", "ACCOUNTANT"),
  authorizePermission("SUBMIT_CLAIM"),
  async (req, res) => {

    try {

      const claim =
        await submitClaim({

          claimId: req.params.id,

          submittedById:
            req.user.id

        });

      await createAuditLog({

        hospitalId: req.user.hospitalId,

        staffId: req.user.id,

        action: "SUBMIT_CLAIM",

        entity: "CLAIM",

        entityId: claim.id,

        details:
          `Submitted ${claim.claimNumber}`

      });

      res.json(claim);

    }

    catch (err) {

      res.status(500).json({

        error: err.message

      });

    }

  }

);



/*
====================================================
MARK EXPORTED
====================================================
*/

router.patch(
  "/:id/export",
  protect,
  authorize("ADMIN", "ACCOUNTANT"),
  authorizePermission("EXPORT_CLAIMS"),
  async (req, res) => {

    try {

      const {

        exportType,

        exportBatch,

        insurerReference

      } = req.body;

      const claim =
        await markExported({

          claimId: req.params.id,

          exportType,

          exportBatch,

          insurerReference

        });

      await createAuditLog({

        hospitalId: req.user.hospitalId,

        staffId: req.user.id,

        action: "EXPORT_CLAIMS",

        entity: "CLAIM",

        entityId: claim.id,

        details:
          `Exported ${claim.claimNumber}`

      });

      res.json(claim);

    }

    catch (err) {

      res.status(500).json({

        error: err.message

      });

    }

  }

);

/*
====================================================
DELIVER CLAIM
(ZENSA insurer → submits internally; external insurer → generates & returns a file)
====================================================
*/

router.post(
  "/:id/deliver",
  protect,
  authorize("ADMIN", "ACCOUNTANT"),
  authorizePermission("EXPORT_CLAIMS"),
  async (req, res) => {

    try {

      const claim =
        await prisma.claim.findFirst({

          where: {
            id: req.params.id,
            patient: {
              hospitalId: req.user.hospitalId
            }
          }

        });

      if (!claim) {
        return res.status(404).json({ error: "Claim not found" });
      }

      const { format } = req.body;

      const result = await deliverClaim({
        claimId: claim.id,
        format,
        performedById: req.user.id
      });

      if (result.type === "EXPORT") {

        const file = result.result;

        res.setHeader("Content-Type", file.mimeType);
        res.setHeader("Content-Disposition", `attachment; filename="${file.fileName}"`);
        return res.send(file.buffer);

      }

      res.json(result.result);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error: err.message || "Failed to deliver claim"
      });

    }

  }
);

/*
====================================================
DELETE DRAFT
====================================================
*/

router.delete(
  "/:id",
  protect,
  authorize("ADMIN", "ACCOUNTANT"),
  authorizePermission("DELETE_CLAIM"),
  async (req, res) => {

    const claim =
      await prisma.claim.findFirst({

        where: {

          id: req.params.id,

          patient: {
            hospitalId: req.user.hospitalId
          }

        }

      });

    if (!claim)

      return res.status(404).json({

        error: "Claim not found"

      });

    if (claim.status !== "DRAFT")

      return res.status(400).json({

        error:
          "Only draft claims can be deleted"

      });

    await prisma.claim.delete({

      where: {

        id: req.params.id

      }

    });

    await createAuditLog({

      hospitalId: req.user.hospitalId,

      staffId: req.user.id,

      action: "DELETE_CLAIM",

      entity: "CLAIM",

      entityId: claim.id,

      details:
        `Deleted Draft ${claim.claimNumber}`

    });

    res.json({

      message:
        "Draft deleted"

    });

  }

);

export default router;