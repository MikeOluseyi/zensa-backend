/*
  Warnings:

  - A unique constraint covering the columns `[medicalRecordServiceId]` on the table `Charge` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[medicalRecordServiceId]` on the table `ProcedureRequest` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "ServiceWorkflow" AS ENUM ('IMMEDIATE', 'RESULT_REQUIRED', 'ADMISSION');

-- CreateEnum
CREATE TYPE "MedicalRecordServiceStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- AlterTable
ALTER TABLE "Charge" ADD COLUMN     "medicalRecordServiceId" TEXT;

-- AlterTable
ALTER TABLE "ProcedureRequest" ADD COLUMN     "medicalRecordServiceId" TEXT;

-- CreateTable
CREATE TABLE "MedicalRecordService" (
    "id" TEXT NOT NULL,
    "medicalRecordId" TEXT NOT NULL,
    "hospitalServiceId" TEXT NOT NULL,
    "workflow" "ServiceWorkflow" NOT NULL,
    "status" "MedicalRecordServiceStatus" NOT NULL DEFAULT 'PENDING',
    "orderedById" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MedicalRecordService_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Charge_medicalRecordServiceId_key" ON "Charge"("medicalRecordServiceId");

-- CreateIndex
CREATE UNIQUE INDEX "ProcedureRequest_medicalRecordServiceId_key" ON "ProcedureRequest"("medicalRecordServiceId");

-- AddForeignKey
ALTER TABLE "MedicalRecordService" ADD CONSTRAINT "MedicalRecordService_medicalRecordId_fkey" FOREIGN KEY ("medicalRecordId") REFERENCES "MedicalRecord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalRecordService" ADD CONSTRAINT "MedicalRecordService_hospitalServiceId_fkey" FOREIGN KEY ("hospitalServiceId") REFERENCES "HospitalService"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalRecordService" ADD CONSTRAINT "MedicalRecordService_orderedById_fkey" FOREIGN KEY ("orderedById") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProcedureRequest" ADD CONSTRAINT "ProcedureRequest_medicalRecordServiceId_fkey" FOREIGN KEY ("medicalRecordServiceId") REFERENCES "MedicalRecordService"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Charge" ADD CONSTRAINT "Charge_medicalRecordServiceId_fkey" FOREIGN KEY ("medicalRecordServiceId") REFERENCES "MedicalRecordService"("id") ON DELETE SET NULL ON UPDATE CASCADE;
