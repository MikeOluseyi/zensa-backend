import prisma from "../utils/prisma.js";

async function main() {

  const hospitalCode = process.env.WALLET_SEED_HOSPITAL_CODE="SJMC";
  const amount = Number(process.env.WALLET_SEED_AMOUNT="550000");

  if (!hospitalCode) {
    console.error("WALLET_SEED_HOSPITAL_CODE is not set.");
    process.exit(1);
  }

  if (!amount || amount <= 0) {
    console.error("WALLET_SEED_AMOUNT must be set to a positive number.");
    process.exit(1);
  }

  const hospital = await prisma.hospital.findUnique({

    where: {
      code: hospitalCode
    },

    include: {
      organization: true
    }

  });

  if (!hospital) {
    console.error(`No hospital found with code "${hospitalCode}".`);
    process.exit(1);
  }

  if (!hospital.organizationId || !hospital.organization) {
    console.error("Hospital is not linked to an organization; cannot resolve wallet mode.");
    process.exit(1);
  }

  const walletMode = hospital.organization.walletMode;

  let wallet;

  if (walletMode === "ORGANIZATION") {

    wallet = await prisma.wallet.findUnique({
      where: { organizationId: hospital.organizationId }
    });

    if (!wallet) {
      wallet = await prisma.wallet.create({
        data: { organizationId: hospital.organizationId, balance: 0 }
      });
    }

  } else {

    wallet = await prisma.wallet.findUnique({
      where: { hospitalId: hospital.id }
    });

    if (!wallet) {
      wallet = await prisma.wallet.create({
        data: { hospitalId: hospital.id, balance: 0 }
      });
    }

  }

  const updated = await prisma.$transaction(async (tx) => {

    const w = await tx.wallet.update({
      where: { id: wallet.id },
      data: { balance: { increment: amount } }
    });

    await tx.walletTransaction.create({
      data: {
        walletId: wallet.id,
        type: "TOPUP",
        amount,
        balanceAfter: w.balance,
        description: "Seed top-up (dev/onboarding)"
      }
    });

    return w;

  });

  console.log(`Wallet for ${hospital.name} (${walletMode.toLowerCase()}-scoped) topped up by ₦${amount.toLocaleString()}.`);
  console.log(`New balance: ₦${updated.balance.toLocaleString()}`);

}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });