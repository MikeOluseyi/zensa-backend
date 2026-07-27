/*
  Warnings:

  - Added the required column `suplliers` to the `InventoryItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Claim" ADD COLUMN     "claimNumber" TEXT,
ADD COLUMN     "insurerReference" TEXT;

-- AlterTable
ALTER TABLE "InsuranceProvider" ADD COLUMN     "claimsEmail" TEXT,
ADD COLUMN     "claimsPortalUrl" TEXT;

-- AlterTable
ALTER TABLE "InventoryItem" ADD COLUMN     "suplliers" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "insuranceId" TEXT;

-- AlterTable
ALTER TABLE "PatientInsurance" ADD COLUMN     "authorizationRequired" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "coveragePercent" DOUBLE PRECISION,
ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "planName" TEXT,
ADD COLUMN     "startDate" TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_insuranceId_fkey" FOREIGN KEY ("insuranceId") REFERENCES "PatientInsurance"("id") ON DELETE SET NULL ON UPDATE CASCADE;
