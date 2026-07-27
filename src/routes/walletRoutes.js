import express from "express";
import prisma from "../utils/prisma.js";

import { protect } from "../middleware/authMiddleware.js";
import { protectPlatform, authorizePlatform } from "../middleware/platformAuthMiddleware.js";
import { topUpWallet } from "../utils/walletService.js";

const router = express.Router();


// ================= HOSPITAL-SIDE (own wallet only) =================

router.get("/mine", protect, async (req, res) => {

  try {

    const hospital = await prisma.hospital.findUnique({
      where: { id: req.user.hospitalId },
      select: { organizationId: true }
    });

    if (!hospital?.organizationId) {
      return res.status(404).json({ error: "No organization linked to this hospital." });
    }

    const org = await prisma.organization.findUnique({
      where: { id: hospital.organizationId },
      select: { walletMode: true }
    });

    const wallet = org.walletMode === "ORGANIZATION"
      ? await prisma.wallet.findUnique({ where: { organizationId: hospital.organizationId } })
      : await prisma.wallet.findUnique({ where: { hospitalId: req.user.hospitalId } });

    if (!wallet) {
      return res.json({ balance: 0, transactions: [] });
    }

    const transactions = await prisma.walletTransaction.findMany({
      where: { walletId: wallet.id },
      orderBy: { createdAt: "desc" },
      take: 50
    });

    res.json({ balance: wallet.balance, transactions });

  } catch (err) {

    console.log(err);

    res.status(500).json({ error: "Failed to fetch wallet" });

  }

});


// ================= PLATFORM-SIDE =================

router.get("/", protectPlatform, async (req, res) => {

  try {

    const wallets = await prisma.wallet.findMany({
      include: { organization: true, hospital: true },
      orderBy: { updatedAt: "desc" }
    });

    res.json(wallets);

  } catch (err) {

    console.log(err);

    res.status(500).json({ error: "Failed to fetch wallets" });

  }

});

router.get("/:id", protectPlatform, async (req, res) => {

  try {

    const wallet = await prisma.wallet.findUnique({
      where: { id: req.params.id },
      include: { organization: true, hospital: true }
    });

    if (!wallet) {
      return res.status(404).json({ error: "Wallet not found" });
    }

    const transactions = await prisma.walletTransaction.findMany({
      where: { walletId: wallet.id },
      orderBy: { createdAt: "desc" }
    });

    res.json({ ...wallet, transactions });

  } catch (err) {

    console.log(err);

    res.status(500).json({ error: "Failed to fetch wallet" });

  }

});

router.post(
  "/:id/top-up",
  protectPlatform,
  authorizePlatform("SUPER_ADMIN", "FINANCE"),
  async (req, res) => {

    try {

      const wallet = await topUpWallet({
        walletId: req.params.id,
        amount: req.body.amount,
        performedById: req.platformUser.id,
        description: req.body.description
      });

      res.json(wallet);

    } catch (err) {

      console.log(err);

      res.status(400).json({ error: err.message });

    }

  }

);

export default router;