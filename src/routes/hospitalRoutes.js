import express from "express";
import prisma from "../utils/prisma.js";
import { hospitalSafeSelect } from "../utils/selectors.js";
import { protectPlatform, authorizePlatformPermission } from "../middleware/platformAuthMiddleware.js";

const router = express.Router();


// CREATE HOSPITAL
router.post(
  "/",
  protectPlatform,
  authorizePlatformPermission("CREATE_HOSPITAL"),
  async (req, res) => {
    try {
      const {
        name,
        code,
        email,
        phone,
        address,
        organizationId
      } = req.body;

      if (!organizationId) {
        return res.status(400).json({ error: "organizationId is required" });
      }

      const org = await prisma.organization.findUnique({ where: { id: organizationId } });

      if (!org) {
        return res.status(404).json({ error: "Organization not found" });
      }

      const existing = await prisma.hospital.findFirst({
        where: { code }
      });

      if (existing) {
        return res.status(400).json({
          error: "Hospital code already exists"
        });
      }

      const hospital = await prisma.hospital.create({
        data: {
          name,
          code,
          email,
          phone,
          address,
          organizationId
        }
      });

      res.json(hospital);

    } catch (err) {
      console.log(err);

      res.status(500).json({
        error: "Failed to create hospital"
      });
    }
  }
);


// GET ALL HOSPITALS (platform overview)
router.get("/", protectPlatform, async (req, res) => {
  try {
    const hospitals = await prisma.hospital.findMany({
      select: hospitalSafeSelect,
      orderBy: {
        createdAt: "desc"
      }
    });

    res.json(hospitals);

  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: "Failed to fetch hospitals"
    });
  }
});

export default router;