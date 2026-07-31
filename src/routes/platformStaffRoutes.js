import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../utils/prisma.js";

import { protectPlatform, authorizePlatformPermission } from "../middleware/platformAuthMiddleware.js";

const router = express.Router();

router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    const staff = await prisma.platformStaff.findUnique({
      where: { email }
    });

    if (!staff || !staff.isActive) {

      return res.status(401).json({
        error: "Invalid credentials"
      });

    }

    const valid = await bcrypt.compare(password, staff.password);

    if (!valid) {

      return res.status(401).json({
        error: "Invalid credentials"
      });

    }

    const token = jwt.sign(

      {
        id: staff.id,
        role: staff.role,
        scope: "platform"
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "12h"
      }

    );

    res.json({

      token,

      user: {
        id: staff.id,
        firstName: staff.firstName,
        lastName: staff.lastName,
        email: staff.email,
        role: staff.role
      }

    });

  } catch (err) {

    console.log(err);

    res.status(500).json({ error: "Login failed" });

  }

});

// CREATE PLATFORM STAFF — only an existing SUPER_ADMIN can create more
router.post(
  "/",
  protectPlatform,
  authorizePlatformPermission("CREATE_PLATFORM_STAFF"),
  async (req, res) => {

    try {

      const { firstName, lastName, email, password, role } = req.body;

      if (!firstName || !lastName || !email || !password || !role) {
        return res.status(400).json({ error: "All fields are required." });
      }

      const existing = await prisma.platformStaff.findUnique({ where: { email } });

      if (existing) {
        return res.status(400).json({ error: "Email already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const staff = await prisma.platformStaff.create({

        data: { firstName, lastName, email, password: hashedPassword, role },

        select: {
          id: true, firstName: true, lastName: true, email: true, role: true, isActive: true
        }

      });

      res.json(staff);

    } catch (err) {

      console.log(err);

      res.status(500).json({ error: "Failed to create platform staff" });

    }

  }

);

router.get(
  "/",
  protectPlatform,
  authorizePlatformPermission("VIEW_PLATFORM_STAFF"),
  async (req, res) => {

    try {

      const staff = await prisma.platformStaff.findMany({

        select: {
          id: true, firstName: true, lastName: true, email: true, role: true, isActive: true, createdAt: true
        },

        orderBy: { createdAt: "asc" }

      });

      res.json(staff);

    } catch (err) {

      console.log(err);

      res.status(500).json({ error: "Failed to fetch platform staff" });

    }

  }
);

export default router;