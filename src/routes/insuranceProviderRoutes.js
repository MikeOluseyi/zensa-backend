import express from "express";
import prisma from "../utils/prisma.js";
import { protect } from "../middleware/authMiddleware.js";
import { protectPlatform, authorizePlatformPermission } from "../middleware/platformAuthMiddleware.js";

const router = express.Router();

// CREATE INSURANCE PROVIDER (platform only — links an existing Organization as an insurer)
router.post(
  "/",
  protectPlatform,
  authorizePlatformPermission("CREATE_INSURANCE_PROVIDER"),
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

// insuranceProviderRoutes.js — add below the existing routes

// QUICK-ADD EXTERNAL INSURER (hospital-facing — for insurers with no Zensa presence)
router.post(
  "/quick-add",
  protect,
  async (req, res) => {

    try {

      const { name, claimsEmail, claimsPortalUrl } = req.body;

      if (!name || !name.trim()) {
        return res.status(400).json({ error: "Insurer name is required." });
      }

      const code =
        name.trim().toUpperCase().replace(/[^A-Z0-9]+/g, "-").slice(0, 30) +
        "-" + Date.now().toString(36).toUpperCase();

      const provider = await prisma.$transaction(async (tx) => {

        const organization = await tx.organization.create({
          data: {
            name: name.trim(),
            code,
            email: claimsEmail || null
          }
        });

        return tx.insuranceProvider.create({
          data: {
            organizationId: organization.id,
            claimsEmail: claimsEmail || null,
            claimsPortalUrl: claimsPortalUrl || null,
            integrationMode: "EXTERNAL"
          },
          include: { organization: true }
        });

      });

      res.json(provider);

    } catch (err) {

      console.log(err);
      res.status(500).json({ error: "Failed to add insurer" });

    }

  }
);

// GET ALL INSURERS (platform-facing — for platform management screens)
router.get(
  "/platform/all",
  protectPlatform,
  authorizePlatformPermission("VIEW_INSURANCE_PROVIDERS"),
  async (req, res) => {

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

  }
);

// insuranceProviderRoutes.js — hospital-facing plan lookup for a given provider
router.get(
  "/:id/plans",
  protect,
  async (req, res) => {

    try {

      const plans = await prisma.insurancePlan.findMany({
        where: { providerId: req.params.id, active: true },
        orderBy: { name: "asc" }
      });

      res.json(plans);

    } catch (err) {

      console.log(err);
      res.status(500).json({ error: "Failed to fetch plans" });

    }

  }
);

export default router;