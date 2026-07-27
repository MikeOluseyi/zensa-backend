/*
  Warnings:

  - You are about to drop the column `administeredAt` on the `AdmissionMedicationOrder` table. All the data in the column will be lost.
  - You are about to drop the column `administeredById` on the `AdmissionMedicationOrder` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `AdmissionMedicationOrder` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sourcePrescriptionId]` on the table `AdmissionMedicationOrder` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "MedicationOrderType" AS ENUM ('SCHEDULED', 'PRN');

-- CreateEnum
CREATE TYPE "MedicationOrderStatus" AS ENUM ('ACTIVE', 'COMPLETED', 'DISCONTINUED');

-- DropForeignKey
ALTER TABLE "AdmissionMedicationOrder" DROP CONSTRAINT "AdmissionMedicationOrder_administeredById_fkey";

-- AlterTable
ALTER TABLE "AdmissionMedicationOrder" DROP COLUMN "administeredAt",
DROP COLUMN "administeredById",
DROP COLUMN "status",
ADD COLUMN     "orderStatus" "MedicationOrderStatus" NOT NULL DEFAULT 'ACTIVE',
ADD COLUMN     "orderType" "MedicationOrderType" NOT NULL DEFAULT 'SCHEDULED',
ADD COLUMN     "quantityLimit" INTEGER,
ADD COLUMN     "sourcePrescriptionId" TEXT;

-- CreateTable
CREATE TABLE "MedicationAdministration" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "scheduledAt" TIMESTAMP(3),
    "status" "MedicationStatus" NOT NULL DEFAULT 'PENDING',
    "administeredAt" TIMESTAMP(3),
    "administeredById" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MedicationAdministration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdmissionMedicationOrder_sourcePrescriptionId_key" ON "AdmissionMedicationOrder"("sourcePrescriptionId");

-- AddForeignKey
ALTER TABLE "MedicationAdministration" ADD CONSTRAINT "MedicationAdministration_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "AdmissionMedicationOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicationAdministration" ADD CONSTRAINT "MedicationAdministration_administeredById_fkey" FOREIGN KEY ("administeredById") REFERENCES "Staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdmissionMedicationOrder" ADD CONSTRAINT "AdmissionMedicationOrder_sourcePrescriptionId_fkey" FOREIGN KEY ("sourcePrescriptionId") REFERENCES "Prescription"("id") ON DELETE SET NULL ON UPDATE CASCADE;
