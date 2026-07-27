/*
  Warnings:

  - You are about to drop the column `cancelleationReason` on the `Charge` table. All the data in the column will be lost.
  - You are about to drop the `ConsultationPrice` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MedicationPrice` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[reference]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `Service` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ConsultationPrice" DROP CONSTRAINT "ConsultationPrice_hospitalId_fkey";

-- DropForeignKey
ALTER TABLE "MedicationPrice" DROP CONSTRAINT "MedicationPrice_hospitalId_fkey";

-- AlterTable
ALTER TABLE "Charge" DROP COLUMN "cancelleationReason",
ADD COLUMN     "cancellationReason" TEXT;

-- AlterTable
ALTER TABLE "Claim" ADD COLUMN     "processedById" TEXT,
ADD COLUMN     "submittedById" TEXT;

-- AlterTable
ALTER TABLE "ReconciliationLog" ADD COLUMN     "performedById" TEXT;

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "code" TEXT NOT NULL;

-- DropTable
DROP TABLE "ConsultationPrice";

-- DropTable
DROP TABLE "MedicationPrice";

-- CreateIndex
CREATE UNIQUE INDEX "Payment_reference_key" ON "Payment"("reference");

-- CreateIndex
CREATE UNIQUE INDEX "Service_code_key" ON "Service"("code");

-- AddForeignKey
ALTER TABLE "Claim" ADD CONSTRAINT "Claim_submittedById_fkey" FOREIGN KEY ("submittedById") REFERENCES "Staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Claim" ADD CONSTRAINT "Claim_processedById_fkey" FOREIGN KEY ("processedById") REFERENCES "Staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReconciliationLog" ADD CONSTRAINT "ReconciliationLog_performedById_fkey" FOREIGN KEY ("performedById") REFERENCES "Staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;
