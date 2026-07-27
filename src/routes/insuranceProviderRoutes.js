import express from "express";
import prisma from "../utils/prisma.js";
import { protect } from "../middleware/authMiddleware.js";
import { protectPlatform, authorizePlatform } from "../middleware/platformAuthMiddleware.js";

const router = express.Router();

// CREATE INSURANCE PROVIDER (platform only — links an existing Organization as an insurer)
router.post(
  "/",
  protectPlatform,
  authorizePlatform("SUPER_ADMIN", "OPS"),
  async (req, res) => {
    try {
      const { organizationId, claimsEmail, claimsPortalUrl, integrationMode } = req.body;

      if (!organizationId) {
        return res.status(400).json({ error: "organizationId is required" });
      }

      const organization = await prisma.organization.findUnique({ where: { id: organizationId } });

      if (!organization) {
        return res.status(404).json({ error: "Organization not found" });
      }

      const existing = await prisma.insuranceProvider.findUnique({ where: { organizationId } });

      if (existing) {
        return res.status(400).json({ error: "This organization is already registered as an insurance provider" });
      }

      const provider = await prisma.insuranceProvider.create({
        data: {
          organizationId,
          claimsEmail,
          claimsPortalUrl,
          integrationMode: integrationMode || "EXTERNAL",
        },
        include: { organization: true }
      });

      res.json(provider);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Failed to create insurance provider" });
    }
  }
);

// GET ALL INSURERS (hospital-facing — populates the insurance-selection dropdown)
router.get("/", protect, async (req, res) => {
  try {
    const providers = await prisma.insuranceProvider.findMany({
      include: {
        organization: {
          select: { id: true, name: true, code: true, email: true, phone: true }
        }
      },
      orderBy: { createdAt: "desc" }
    });

    res.json(providers);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch insurance providers" });
  }
});

export default router;