-- CreateEnum
CREATE TYPE "ReconciliationStatus" AS ENUM ('MATCHED', 'UNDERPAID', 'OVERPAID', 'MISSING', 'FAILED');

-- CreateEnum
CREATE TYPE "ClaimExportStatus" AS ENUM ('PENDING', 'EXPORTED', 'SENT', 'PAID', 'REJECTED');

-- AlterTable
ALTER TABLE "Claim" ADD COLUMN     "exportBatch" TEXT,
ADD COLUMN     "exportStatus" "ClaimExportStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "exportedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "InventoryItem" ADD COLUMN     "lowStockThreshold" INTEGER NOT NULL DEFAULT 10;

-- CreateTable
CREATE TABLE "Receipt" (
    "id" TEXT NOT NULL,
    "paymentId" TEXT NOT NULL,
    "receiptNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Receipt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReconciliationLog" (
    "id" TEXT NOT NULL,
    "invoiceId" TEXT,
    "paymentId" TEXT,
    "expectedAmount" DECIMAL(65,30) NOT NULL,
    "receivedAmount" DECIMAL(65,30) NOT NULL,
    "status" "ReconciliationStatus" NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReconciliationLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PasswordResetToken" (
    "id" TEXT NOT NULL,
    "staffId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PasswordResetToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Receipt_paymentId_key" ON "Receipt"("paymentId");

-- CreateIndex
CREATE UNIQUE INDEX "Receipt_receiptNumber_key" ON "Receipt"("receiptNumber");

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetToken_token_key" ON "PasswordResetToken"("token");

-- AddForeignKey
ALTER TABLE "Receipt" ADD CONSTRAINT "Receipt_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReconciliationLog" ADD CONSTRAINT "ReconciliationLog_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReconciliationLog" ADD CONSTRAINT "ReconciliationLog_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PasswordResetToken" ADD CONSTRAINT "PasswordResetToken_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
