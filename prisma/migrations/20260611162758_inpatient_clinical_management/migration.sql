-- CreateEnum
CREATE TYPE "MedicationStatus" AS ENUM ('PENDING', 'GIVEN', 'MISSED', 'REFUSED');

-- CreateEnum
CREATE TYPE "AdmissionNoteType" AS ENUM ('DOCTOR', 'NURSE', 'HANDOVER', 'GENERAL');

-- CreateEnum
CREATE TYPE "MedicationRoute" AS ENUM ('ORAL', 'IV', 'IM', 'SUBCUTANEOUS', 'TOPICAL', 'INHALATION');

-- CreateEnum
CREATE TYPE "VitalType" AS ENUM ('TEMPERATURE', 'BLOOD_PRESSURE', 'HEART_RATE', 'RESPIRATORY_RATE', 'OXYGEN_SATURATION', 'PAIN_SCORE');

-- AlterTable
ALTER TABLE "Admission" ADD COLUMN     "attendingDoctorId" TEXT,
ADD COLUMN     "staffId" TEXT;

-- CreateTable
CREATE TABLE "AdmissionDoctorNote" (
    "id" TEXT NOT NULL,
    "admissionId" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,
    "subjective" TEXT,
    "objective" TEXT,
    "assessment" TEXT,
    "plan" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdmissionDoctorNote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NursingNote" (
    "id" TEXT NOT NULL,
    "admissionId" TEXT NOT NULL,
    "nurseId" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NursingNote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VitalRecord" (
    "id" TEXT NOT NULL,
    "admissionId" TEXT NOT NULL,
    "nurseId" TEXT NOT NULL,
    "temperature" DOUBLE PRECISION,
    "pulse" INTEGER,
    "respiratoryRate" INTEGER,
    "systolicBP" INTEGER,
    "diastolicBP" INTEGER,
    "oxygenSaturation" DOUBLE PRECISION,
    "weight" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VitalRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdmissionMedicationOrder" (
    "id" TEXT NOT NULL,
    "admissionId" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,
    "medicationName" TEXT NOT NULL,
    "dosage" TEXT NOT NULL,
    "frequency" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "route" TEXT NOT NULL,
    "status" "MedicationStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "staffId" TEXT,

    CONSTRAINT "AdmissionMedicationOrder_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Admission" ADD CONSTRAINT "Admission_attendingDoctorId_fkey" FOREIGN KEY ("attendingDoctorId") REFERENCES "Staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admission" ADD CONSTRAINT "Admission_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdmissionDoctorNote" ADD CONSTRAINT "AdmissionDoctorNote_admissionId_fkey" FOREIGN KEY ("admissionId") REFERENCES "Admission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdmissionDoctorNote" ADD CONSTRAINT "AdmissionDoctorNote_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NursingNote" ADD CONSTRAINT "NursingNote_admissionId_fkey" FOREIGN KEY ("admissionId") REFERENCES "Admission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NursingNote" ADD CONSTRAINT "NursingNote_nurseId_fkey" FOREIGN KEY ("nurseId") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VitalRecord" ADD CONSTRAINT "VitalRecord_admissionId_fkey" FOREIGN KEY ("admissionId") REFERENCES "Admission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VitalRecord" ADD CONSTRAINT "VitalRecord_nurseId_fkey" FOREIGN KEY ("nurseId") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdmissionMedicationOrder" ADD CONSTRAINT "AdmissionMedicationOrder_admissionId_fkey" FOREIGN KEY ("admissionId") REFERENCES "Admission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdmissionMedicationOrder" ADD CONSTRAINT "AdmissionMedicationOrder_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;
