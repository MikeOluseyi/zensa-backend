import express from "express";
import prisma from "../utils/prisma.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

const ROLES = [
  "ADMIN", "DOCTOR", "NURSE", "PHARMACIST", "LAB_TECH",
  "RECEPTIONIST", "ACCOUNTANT", "INSURANCE_OFFICER", "RADIOLOGY"
];

// GET ALL PERMISSIONS + CURRENT ROLE MAPPINGS
router.get(
  "/",
  protect,
  authorize("ADMIN"),
  async (req, res) => {

    try {

      const permissions = await prisma.permission.findMany({
        orderBy: { name: "asc" }
      });

      const mappings = await prisma.rolePermission.findMany({
        include: { permission: true }
      });

      const grid = {};

      for (const role of ROLES) {
        grid[role] = mappings
          .filter(m => m.role === role)
          .map(m => m.permission.action);
      }

      res.json({
        permissions,
        roles: ROLES,
        grid
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error: "Failed to fetch permission grid"
      });

    }

  }
);

// GRANT A PERMISSION TO A ROLE
router.post(
  "/grant",
  protect,
  authorize("ADMIN"),
  async (req, res) => {

    try {

      const { role, action } = req.body;

      if (!ROLES.includes(role)) {
        return res.status(400).json({ error: "Invalid role" });
      }

      const permission = await prisma.permission.findUnique({
        where: { action }
      });

      if (!permission) {
        return res.status(404).json({ error: "Permission not found" });
      }

      await prisma.rolePermission.upsert({

        where: {
          role_permissionId: {
            role,
            permissionId: permission.id
          }
        },

        update: {},

        create: {
          role,
          permissionId: permission.id
        }

      });

      res.json({ success: true });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error: "Failed to grant permission"
      });

    }

  }
);

// REVOKE A PERMISSION FROM A ROLE
router.post(
  "/revoke",
  protect,
  authorize("ADMIN"),
  async (req, res) => {

    try {

      const { role, action } = req.body;

      if (role === "ADMIN") {
        return res.status(400).json({
          error: "ADMIN permissions cannot be revoked to prevent accidental lockout."
        });
      }

      const permission = await prisma.permission.findUnique({
        where: { action }
      });

      if (!permission) {
        return res.status(404).json({ error: "Permission not found" });
      }

      await prisma.rolePermission.deleteMany({

        where: {
          role,
          permissionId: permission.id
        }

      });

      res.json({ success: true });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error: "Failed to revoke permission"
      });

    }

  }
);

export default router;