import express from "express";
import prisma from "../utils/prisma.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import { authorizePermission }
from "../middleware/permissionMiddleware.js";

const router = express.Router();


// CREATE MEDICATION PRICE
router.post(
  "/",
  protect,
  authorize("ADMIN", "ACCOUNTANT", "PHARMACIST"),
  async (req, res) => {

    try {

      const {
        medicationName,
        price
      } = req.body;

      const medicationPrice =
        await prisma.medicationPrice.create({

          data: {
            hospitalId: req.user.hospitalId,
            medicationName,
            price
          }
        });

      res.json(medicationPrice);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error: "Failed to create medication price"
      });

    }
  }
);


// GET ALL MEDICATION PRICES
router.get(
  "/",
  protect,
  async (req, res) => {

    try {

      const prices =
        await prisma.medicationPrice.findMany({

          where: {
            hospitalId: req.user.hospitalId
          },

          orderBy: {
            medicationName: "asc"
          }
        });

      res.json(prices);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error: "Failed to fetch medication prices"
      });

    }
  }
);

export default router;