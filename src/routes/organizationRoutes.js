import express from "express";
import prisma from "../utils/prisma.js";

import { protect } from "../middleware/authMiddleware.js";
import { protectPlatform, authorizePlatformPermission } from "../middleware/platformAuthMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();


// CREATE ORGANIZATION
router.post(
  "/",
  protectPlatform,
  authorizePlatformPermission("CREATE_ORGANIZATION"),
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

// organizationRoutes.js — add below the existing POST / route
// GET ALL ORGANIZATIONS (platform overview)
router.get(
  "/platform/all",
  protectPlatform,
  authorizePlatformPermission("VIEW_ORGANIZATIONS"),
  async (req, res) => {

    try {

      const organizations = await prisma.organization.findMany({
        include: {
          hospitals: true,
          wallet: true
        },
        orderBy: { createdAt: "desc" }
      });

      res.json(organizations);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error: "Failed to fetch organizations"
      });

    }

  }
);


// GET MY ORGANIZATION
router.get(
  "/",
  protectPlatform,

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
  authorizePlatformPermission("EDIT_ORGANIZATION"),
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

// TOGGLE ORGANIZATION ACTIVE STATUS (platform only)
router.patch(
  "/platform/:id/status",
  protectPlatform,
  authorizePlatformPermission("EDIT_ORGANIZATION"),
  async (req, res) => {

    try {

      const { isActive } = req.body;

      if (typeof isActive !== "boolean") {
        return res.status(400).json({ error: "isActive must be true or false" });
      }

      const existing = await prisma.organization.findUnique({ where: { id: req.params.id } });

      if (!existing) {
        return res.status(404).json({ error: "Organization not found" });
      }

      const organization = await prisma.organization.update({

        where: { id: req.params.id },

        data: { isActive },

        include: { wallet: true, hospitals: true }

      });

      res.json(organization);

    } catch (err) {

      console.log(err);

      res.status(500).json({ error: "Failed to update organization status" });

    }

  }
);

export default router;