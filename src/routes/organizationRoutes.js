import express from "express";
import prisma from "../utils/prisma.js";

import { protect } from "../middleware/authMiddleware.js";
import { protectPlatform, authorizePlatform } from "../middleware/platformAuthMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();


// CREATE ORGANIZATION
router.post(
  "/",
  protect,
  authorize("ADMIN"),
  async (req, res) => {

    try {

      const {
        name,
        code,
        email,
        phone
      } = req.body;

      if (!name || !code) {

        return res.status(400).json({
          error: "Name and code are required"
        });
      }

      const organization =
        await prisma.organization.create({

          data: {
            name,
            code,
            email,
            phone
          }
        });

      res.json(organization);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error: "Failed to create organization"
      });
    }
  }
);


// GET MY ORGANIZATION
router.get(
  "/",
  protect,

  async (req, res) => {

    try {

      const hospital =
        await prisma.hospital.findUnique({

          where: {
            id: req.user.hospitalId
          },

          select: {
            organizationId: true
          }

        });

      if (!hospital?.organizationId) {

        return res.status(404).json({
          error: "No organization found for this hospital"
        });

      }

      const organization =
        await prisma.organization.findUnique({

          where: {
            id: hospital.organizationId
          },

          include: {
            hospitals: true
          }

        });

      res.json(organization);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error: "Failed to fetch organization"
      });

    }
  }
);

// UPDATE ORGANIZATION WALLET SETTINGS (platform only)
router.patch(
  "/platform/:id",
  protectPlatform,
  authorizePlatform("SUPER_ADMIN", "FINANCE"),
  async (req, res) => {

    try {

      const { walletMode, walletOverdraftPolicy, walletOverdraftCap, name, email, phone } = req.body;

      const existing = await prisma.organization.findUnique({ where: { id: req.params.id } });

      if (!existing) {
        return res.status(404).json({ error: "Organization not found" });
      }

      const organization = await prisma.organization.update({

        where: { id: req.params.id },

        data: {
          ...(name !== undefined && { name }),
          ...(email !== undefined && { email }),
          ...(phone !== undefined && { phone }),
          ...(walletMode !== undefined && { walletMode }),
          ...(walletOverdraftPolicy !== undefined && { walletOverdraftPolicy }),
          ...(walletOverdraftCap !== undefined && { walletOverdraftCap })
        },

        include: { wallet: true, hospitals: true }

      });

      res.json(organization);

    } catch (err) {

      console.log(err);

      res.status(500).json({ error: "Failed to update organization" });

    }

  }
);

export default router;