/*
  Warnings:

  - The values [LAB,RADIOLOGY,PHARMACY,PROCEDURE,SURGERY,BED] on the enum `ServiceCategory` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `staffId` on the `Admission` table. All the data in the column will be lost.
  - You are about to drop the column `amount` on the `Invoice` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[visitId]` on the table `Admission` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[medicalRecordId]` on the table `Admission` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[hospitalId,cptId]` on the table `HospitalServicePrice` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[visitId]` on the table `MedicalRecord` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `chargeId` to the `InvoiceItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `InvoiceItem` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DischargeDisposition" AS ENUM ('HOME', 'TRANSFERRED', 'REFERRED', 'LEFT_AGAINST_MEDICAL_ADVICE', 'ABSCONDED', 'DECEASED');

-- CreateEnum
CREATE TYPE "VisitType" AS ENUM ('OPD', 'EMERGENCY', 'ADMISSION');

-- CreateEnum
CREATE TYPE "VisitStatus" AS ENUM ('CHECKED_IN', 'TRIAGED', 'WAITING', 'IN_CONSULTATION', 'ADMISSION_REQUESTED', 'ADMITTED', 'DISCHARGED', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "VisitOutcome" AS ENUM ('ONGOING', 'DISCHARGED', 'REFERRED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "ShiftType" AS ENUM ('MORNING', 'AFTERNOON', 'NIGHT');

-- CreateEnum
CREATE TYPE "ChargeStatus" AS ENUM ('PENDING', 'POSTED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "ChargeSourceType" AS ENUM ('CONSULTATION', 'ADMISSION', 'BED', 'LAB', 'RADIOLOGY', 'PROCEDURE', 'SURGERY', 'MEDICATION', 'ICU', 'NURSING', 'DELIVERY', 'DIALYSIS', 'MANUAL');

-- AlterEnum
BEGIN;
CREATE TYPE "ServiceCategory_new" AS ENUM ('CONSULTATION', 'ADMISSION', 'NURSING', 'ICU', 'DELIVERY', 'DIALYSIS', 'PHYSIOTHERAPY', 'DISCHARGE', 'OTHER');
ALTER TABLE "InvoiceItem" ALTER COLUMN "category" TYPE "ServiceCategory_new" USING ("category"::text::"ServiceCategory_new");
ALTER TABLE "Service" ALTER COLUMN "category" TYPE "ServiceCategory_new" USING ("category"::text::"ServiceCategory_new");
ALTER TYPE "ServiceCategory" RENAME TO "ServiceCategory_old";
ALTER TYPE "ServiceCategory_new" RENAME TO "ServiceCategory";
DROP TYPE "public"."ServiceCategory_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Admission" DROP CONSTRAINT "Admission_staffId_fkey";

-- DropForeignKey
ALTER TABLE "HospitalServicePrice" DROP CONSTRAINT "HospitalServicePrice_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "MedicalRecord" DROP CONSTRAINT "MedicalRecord_appointmentId_fkey";

-- AlterTable
ALTER TABLE "Admission" DROP COLUMN "staffId",
ADD COLUMN     "dischargeDisposition" "DischargeDisposition",
ADD COLUMN     "dischargeReason" TEXT,
ADD COLUMN     "expectedDischarge" TIMESTAMP(3),
ADD COLUMN     "medicalRecordId" TEXT,
ADD COLUMN     "visitId" TEXT;

-- AlterTable
ALTER TABLE "AdmissionDoctorNote" ADD COLUMN     "visitId" TEXT;

-- AlterTable
ALTER TABLE "AdmissionMedicationOrder" ADD COLUMN     "administeredAt" TIMESTAMP(3),
ADD COLUMN     "administeredById" TEXT,
ADD COLUMN     "visitId" TEXT;

-- AlterTable
ALTER TABLE "HospitalServicePrice" ADD COLUMN     "cptId" TEXT,
ADD COLUMN     "effectiveFrom" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "effectiveTo" TIMESTAMP(3),
ALTER COLUMN "serviceId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "amount",
ADD COLUMN     "subtotal" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "visitId" TEXT;

-- AlterTable
ALTER TABLE "InvoiceItem" ADD COLUMN     "chargeId" TEXT NOT NULL,
DROP COLUMN "category",
ADD COLUMN     "category" "ServiceCategory" NOT NULL;

-- AlterTable
ALTER TABLE "MedicalRecord" ADD COLUMN     "visitId" TEXT,
ALTER COLUMN "appointmentId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "NursingNote" ADD COLUMN     "shift" "ShiftType",
ADD COLUMN     "title" TEXT,
ADD COLUMN     "visitId" TEXT;

-- AlterTable
ALTER TABLE "ProcedureRequest" ADD COLUMN     "visitId" TEXT;

-- AlterTable
ALTER TABLE "ProcedureResult" ADD COLUMN     "visitId" TEXT;

-- AlterTable
ALTER TABLE "VitalRecord" ADD COLUMN     "medicalRecordId" TEXT,
ADD COLUMN     "visitId" TEXT;

-- CreateTable
CREATE TABLE "Visit" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "hospitalId" TEXT,
    "appointmentId" TEXT,
    "status" "VisitStatus" NOT NULL DEFAULT 'CHECKED_IN',
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Visit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Charge" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "visitId" TEXT,
    "invoiceId" TEXT,
    "serviceId" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "unitPrice" DOUBLE PRECISION NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "description" TEXT,
    "sourceType" "ChargeSourceType" NOT NULL,
    "sourceId" TEXT,
    "status" "ChargeStatus" NOT NULL DEFAULT 'PENDING',
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Charge_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Visit_appointmentId_key" ON "Visit"("appointmentId");

-- CreateIndex
CREATE UNIQUE INDEX "Admission_visitId_key" ON "Admission"("visitId");

-- CreateIndex
CREATE UNIQUE INDEX "Admission_medicalRecordId_key" ON "Admission"("medicalRecordId");

-- CreateIndex
CREATE UNIQUE INDEX "HospitalServicePrice_hospitalId_cptId_key" ON "HospitalServicePrice"("hospitalId", "cptId");

-- CreateIndex
CREATE UNIQUE INDEX "MedicalRecord_visitId_key" ON "MedicalRecord"("visitId");

-- AddForeignKey
ALTER TABLE "MedicalRecord" ADD CONSTRAINT "MedicalRecord_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "Appointment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalRecord" ADD CONSTRAINT "MedicalRecord_visitId_fkey" FOREIGN KEY ("visitId") REFERENCES "Visit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProcedureRequest" ADD CONSTRAINT "ProcedureRequest_visitId_fkey" FOREIGN KEY ("visitId") REFERENCES "Visit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProcedureResult" ADD CONSTRAINT "ProcedureResult_visitId_fkey" FOREIGN KEY ("visitId") REFERENCES "Visit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "Appointment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_visitId_fkey" FOREIGN KEY ("visitId") REFERENCES "Visit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceItem" ADD CONSTRAINT "InvoiceItem_chargeId_fkey" FOREIGN KEY ("chargeId") REFERENCES "Charge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admission" ADD CONSTRAINT "Admission_visitId_fkey" FOREIGN KEY ("visitId") REFERENCES "Visit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admission" ADD CONSTRAINT "Admission_medicalRecordId_fkey" FOREIGN KEY ("medicalRecordId") REFERENCES "MedicalRecord"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HospitalServicePrice" ADD CONSTRAINT "HospitalServicePrice_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HospitalServicePrice" ADD CONSTRAINT "HospitalServicePrice_cptId_fkey" FOREIGN KEY ("cptId") REFERENCES "CPTCode"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdmissionDoctorNote" ADD CONSTRAINT "AdmissionDoctorNote_visitId_fkey" FOREIGN KEY ("visitId") REFERENCES "Visit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NursingNote" ADD CONSTRAINT "NursingNote_visitId_fkey" FOREIGN KEY ("visitId") REFERENCES "Visit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VitalRecord" ADD CONSTRAINT "VitalRecord_visitId_fkey" FOREIGN KEY ("visitId") REFERENCES "Visit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VitalRecord" ADD CONSTRAINT "VitalRecord_medicalRecordId_fkey" FOREIGN KEY ("medicalRecordId") REFERENCES "MedicalRecord"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdmissionMedicationOrder" ADD CONSTRAINT "AdmissionMedicationOrder_visitId_fkey" FOREIGN KEY ("visitId") REFERENCES "Visit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdmissionMedicationOrder" ADD CONSTRAINT "AdmissionMedicationOrder_administeredById_fkey" FOREIGN KEY ("administeredById") REFERENCES "Staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Charge" ADD CONSTRAINT "Charge_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Charge" ADD CONSTRAINT "Charge_visitId_fkey" FOREIGN KEY ("visitId") REFERENCES "Visit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Charge" ADD CONSTRAINT "Charge_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Charge" ADD CONSTRAINT "Charge_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Charge" ADD CONSTRAINT "Charge_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;
