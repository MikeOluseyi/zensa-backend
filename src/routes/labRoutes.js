import express from "express";
import prisma from "../utils/prisma.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import { authorizePermission }
from "../middleware/permissionMiddleware.js";
import { createCharge } from "../utils/billing/createCharge.js";

const router = express.Router();


// GET PENDING PROCEDURES
router.get(
  "/pending",
  protect,
  authorize("LAB_TECH", "ADMIN"),
  async (req, res) => {

    try {

      const procedures =
        await prisma.procedureRequest.findMany({

          where: {
            status: "PENDING"
          },

          include: {
            cpt: true,

            medicalRecord: {
              include: {
                patient: true
              }
            }
          }
        });

      res.json(procedures);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error: "Failed to fetch procedures"
      });

    }
  }
);


// COMPLETE PROCEDURE
router.patch(
  "/:id/complete",
  protect,
  authorize("LAB_TECH", "ADMIN"),
  async (req, res) => {

    try {

      const {
        results,
        notes
      } = req.body;

      const procedure =
        await prisma.procedureRequest.update({

          where: {
            id: req.params.id
          },

          data: {
            status: "COMPLETED"
          }
        });

      await prisma.procedureResult.create({

        data: {
          procedureRequestId: req.params.id,
          results,
          notes,
          performedById: req.user.id
        }
      });

      res.json(procedure);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error: "Failed to complete procedure"
      });

    }
  }
);

export default router;