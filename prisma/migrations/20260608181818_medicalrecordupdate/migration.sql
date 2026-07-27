/*
  Warnings:

  - A unique constraint covering the columns `[appointmentId]` on the table `MedicalRecord` will be added. If there are existing duplicate values, this will fail.
  - Made the column `appointmentId` on table `MedicalRecord` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "MedicalRecordStatus" AS ENUM ('DRAFT', 'FINAL');

-- DropForeignKey
ALTER TABLE "MedicalRecord" DROP CONSTRAINT "MedicalRecord_appointmentId_fkey";

-- AlterTable
ALTER TABLE "MedicalRecord" ADD COLUMN     "status" "MedicalRecordStatus" NOT NULL DEFAULT 'DRAFT',
ALTER COLUMN "appointmentId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "MedicalRecord_appointmentId_key" ON "MedicalRecord"("appointmentId");

-- AddForeignKey
ALTER TABLE "MedicalRecord" ADD CONSTRAINT "MedicalRecord_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "Appointment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
