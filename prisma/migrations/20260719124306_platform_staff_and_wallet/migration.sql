-- CreateEnum
CREATE TYPE "PlatformRole" AS ENUM ('SUPER_ADMIN', 'OPS', 'SUPPORT', 'FINANCE');

-- CreateEnum
CREATE TYPE "WalletMode" AS ENUM ('ORGANIZATION', 'HOSPITAL');

-- CreateEnum
CREATE TYPE "WalletOverdraftPolicy" AS ENUM ('BLOCK', 'ALLOW_NEGATIVE', 'CAPPED');

-- CreateEnum
CREATE TYPE "WalletTransactionType" AS ENUM ('TOPUP', 'SERVICE_FEE', 'ADJUSTMENT', 'REFUND');

-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "walletMode" "WalletMode" NOT NULL DEFAULT 'ORGANIZATION',
ADD COLUMN     "walletOverdraftCap" DOUBLE PRECISION,
ADD COLUMN     "walletOverdraftPolicy" "WalletOverdraftPolicy" NOT NULL DEFAULT 'BLOCK';

-- CreateTable
CREATE TABLE "PlatformStaff" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "PlatformRole" NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PlatformStaff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wallet" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT,
    "hospitalId" TEXT,
    "balance" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Wallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WalletTransaction" (
    "id" TEXT NOT NULL,
    "walletId" TEXT NOT NULL,
    "type" "WalletTransactionType" NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "balanceAfter" DOUBLE PRECISION NOT NULL,
    "description" TEXT,
    "sourceType" TEXT,
    "sourceId" TEXT,
    "performedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WalletTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PlatformStaff_email_key" ON "PlatformStaff"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_organizationId_key" ON "Wallet"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_hospitalId_key" ON "Wallet"("hospitalId");

-- AddForeignKey
ALTER TABLE "Wallet" ADD CONSTRAINT "Wallet_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wallet" ADD CONSTRAINT "Wallet_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WalletTransaction" ADD CONSTRAINT "WalletTransaction_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WalletTransaction" ADD CONSTRAINT "WalletTransaction_performedById_fkey" FOREIGN KEY ("performedById") REFERENCES "PlatformStaff"("id") ON DELETE SET NULL ON UPDATE CASCADE;
