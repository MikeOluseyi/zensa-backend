import express from "express";
import prisma from "../utils/prisma.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import { authorizePermission }
from "../middleware/permissionMiddleware.js";

const router = express.Router();


// CREATE BED
router.post(
  "/",
  protect,
  authorize("ADMIN"),
  async (req, res) => {

    try {

      const {
        wardId,
        bedNumber,
        dailyRate
      } = req.body;

      const ward = await prisma.ward.findFirst({
        where: {
          id: wardId,
          hospitalId: req.user.hospitalId
        }
      });

      if (!ward) {
        return res.status(404).json({
          error: "Ward not found"
        });
      }

      const bed = await prisma.bed.create({

        data: {
          bedNumber,
          wardId,
          dailyRate
        }
      });

      res.json(bed);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error: "Failed to create bed"
      });

    }
  }
);


// GET ALL BEDS
router.get(
  "/",
  protect,
  async (req, res) => {

    try {

      const beds = await prisma.bed.findMany({

        where: {
          ward: {
            hospitalId: req.user.hospitalId
          }
        },

        include: {
          ward: true
        }
      });

      res.json(beds);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error: "Failed to fetch beds"
      });

    }
  }
);


// AVAILABLE BEDS
router.get(
  "/available",
  protect,
  async (req, res) => {

    try {

      const beds = await prisma.bed.findMany({

        where: {
          status: "AVAILABLE",

          ward: {
            hospitalId: req.user.hospitalId
          }
        },

        include: {
          ward: true
        }
      });

      res.json(beds);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error: "Failed to fetch available beds"
      });

    }
  }
);

// bedRoutes.js — add
router.patch(
  "/:id",
  protect,
  authorize("ADMIN"),
  async (req, res) => {
    try {
      const { bedNumber, dailyRate, status } = req.body;

      const bed = await prisma.bed.findFirst({
        where: { id: req.params.id, ward: { hospitalId: req.user.hospitalId } }
      });

      if (!bed) {
        return res.status(404).json({ error: "Bed not found" });
      }

      if (status === "OCCUPIED" && bed.status !== "OCCUPIED") {
        return res.status(400).json({
          error: "Bed status becomes OCCUPIED automatically on admission — it cannot be set manually."
        });
      }

      const updated = await prisma.bed.update({
        where: { id: req.params.id },
        data: {
          ...(bedNumber !== undefined && { bedNumber }),
          ...(dailyRate !== undefined && { dailyRate: dailyRate === "" ? null : Number(dailyRate) }),
          ...(status !== undefined && bed.status !== "OCCUPIED" && { status })
        },
        include: { ward: true }
      });

      res.json(updated);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Failed to update bed" });
    }
  }
);

export default router;