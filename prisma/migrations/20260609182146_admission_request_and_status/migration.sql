-- CreateEnum
CREATE TYPE "PatientStatus" AS ENUM ('ACTIVE', 'ADMITTED', 'DISCHARGED', 'DECEASED');

-- CreateEnum
CREATE TYPE "AdmissionRequestStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'ADMITTED');

-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "status" "PatientStatus" NOT NULL DEFAULT 'ACTIVE';

-- CreateTable
CREATE TABLE "AdmissionRequest" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "appointmentId" TEXT,
    "medicalRecordId" TEXT,
    "requestedById" TEXT NOT NULL,
    "approvedById" TEXT,
    "reason" TEXT NOT NULL,
    "status" "AdmissionRequestStatus" NOT NULL DEFAULT 'PENDING',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdmissionRequest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AdmissionRequest" ADD CONSTRAINT "AdmissionRequest_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdmissionRequest" ADD CONSTRAINT "AdmissionRequest_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "Appointment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdmissionRequest" ADD CONSTRAINT "AdmissionRequest_medicalRecordId_fkey" FOREIGN KEY ("medicalRecordId") REFERENCES "MedicalRecord"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdmissionRequest" ADD CONSTRAINT "AdmissionRequest_requestedById_fkey" FOREIGN KEY ("requestedById") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdmissionRequest" ADD CONSTRAINT "AdmissionRequest_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "Staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;
