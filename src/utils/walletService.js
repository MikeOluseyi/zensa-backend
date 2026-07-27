import prisma from "./prisma.js";

const SERVICE_FEE_RATE = 0.015;

function round2(n) {
  return Math.round(n * 100) / 100;
}

export async function resolveWalletContext(tx, hospitalId) {

  const hospital =
    await tx.hospital.findUnique({

      where: { id: hospitalId },

      select: {

        id: true,

        organizationId: true,

        organization: {

          select: {
            id: true,
            walletMode: true,
            walletOverdraftPolicy: true,
            walletOverdraftCap: true
          }

        }

      }

    });

  if (!hospital) {
    throw new Error("Hospital not found for wallet resolution.");
  }

  if (!hospital.organization) {
    throw new Error("Hospital is not linked to an organization; wallet cannot be resolved.");
  }

  const { walletMode, walletOverdraftPolicy, walletOverdraftCap } = hospital.organization;

  let wallet;

  if (walletMode === "ORGANIZATION") {

    wallet = await tx.wallet.findUnique({
      where: { organizationId: hospital.organization.id }
    });

    if (!wallet) {
      wallet = await tx.wallet.create({
        data: { organizationId: hospital.organization.id, balance: 0 }
      });
    }

  } else {

    wallet = await tx.wallet.findUnique({
      where: { hospitalId: hospital.id }
    });

    if (!wallet) {
      wallet = await tx.wallet.create({
        data: { hospitalId: hospital.id, balance: 0 }
      });
    }

  }

  return { wallet, walletOverdraftPolicy, walletOverdraftCap };

}

export async function deductServiceFee(tx, { hospitalId, chargeAmount, sourceId }) {

  const feeAmount = round2(chargeAmount * SERVICE_FEE_RATE);

  if (feeAmount <= 0) return null;

  const { wallet, walletOverdraftPolicy, walletOverdraftCap } =
    await resolveWalletContext(tx, hospitalId);

  const projectedBalance = round2(wallet.balance - feeAmount);

  if (projectedBalance < 0) {

    if (walletOverdraftPolicy === "BLOCK") {
      throw new Error("WALLET_INSUFFICIENT_BALANCE");
    }

    if (walletOverdraftPolicy === "CAPPED") {

      const cap = walletOverdraftCap ?? 0;

      if (Math.abs(projectedBalance) > cap) {
        throw new Error("WALLET_OVERDRAFT_CAP_EXCEEDED");
      }

    }

    // ALLOW_NEGATIVE: proceed regardless

  }

  const updatedWallet =
    await tx.wallet.update({

      where: { id: wallet.id },

      data: { balance: projectedBalance }

    });

  await tx.walletTransaction.create({

    data: {

      walletId: wallet.id,

      type: "SERVICE_FEE",

      amount: -feeAmount,

      balanceAfter: updatedWallet.balance,

      description: "1.5% service fee on posted charge",

      sourceType: "CHARGE",

      sourceId

    }

  });

  return updatedWallet;

}

export async function refundServiceFee(tx, { hospitalId, sourceId }) {

  const feeTransaction =
    await tx.walletTransaction.findFirst({

      where: {
        sourceType: "CHARGE",
        sourceId,
        type: "SERVICE_FEE"
      },

      orderBy: {
        createdAt: "desc"
      }

    });

  if (!feeTransaction) return null;

  const { wallet } = await resolveWalletContext(tx, hospitalId);

  const refundAmount = Math.abs(feeTransaction.amount);

  const updatedWallet =
    await tx.wallet.update({

      where: { id: wallet.id },

      data: { balance: { increment: refundAmount } }

    });

  await tx.walletTransaction.create({

    data: {

      walletId: wallet.id,

      type: "REFUND",

      amount: refundAmount,

      balanceAfter: updatedWallet.balance,

      description: "Service fee refund for cancelled charge",

      sourceType: "CHARGE",

      sourceId

    }

  });

  return updatedWallet;

}

export async function topUpWallet({ walletId, amount, performedById, description = null }) {

  if (!amount || Number(amount) <= 0) {
    throw new Error("Top-up amount must be greater than zero.");
  }

  return prisma.$transaction(async (tx) => {

    const wallet = await tx.wallet.findUnique({ where: { id: walletId } });

    if (!wallet) {
      throw new Error("Wallet not found.");
    }

    const updatedWallet =
      await tx.wallet.update({

        where: { id: walletId },

        data: { balance: { increment: Number(amount) } }

      });

    await tx.walletTransaction.create({

      data: {

        walletId,

        type: "TOPUP",

        amount: Number(amount),

        balanceAfter: updatedWallet.balance,

        description: description ?? "Wallet top-up",

        performedById

      }

    });

    return updatedWallet;

  });

}