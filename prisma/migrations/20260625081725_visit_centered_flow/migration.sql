/*
  Warnings:

  - You are about to drop the column `bloodPressure` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `height` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `pulse` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `spo2` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `temperature` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `admissionId` on the `VitalRecord` table. All the data in the column will be lost.
  - You are about to drop the column `medicalRecordId` on the `VitalRecord` table. All the data in the column will be lost.
  - You are about to drop the column `nurseId` on the `VitalRecord` table. All the data in the column will be lost.
  - You are about to alter the column `oxygenSaturation` on the `VitalRecord` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - Added the required column `recordedById` to the `VitalRecord` table without a default value. This is not possible if the table is not empty.
  - Made the column `visitId` on table `VitalRecord` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "VitalRecord" DROP CONSTRAINT "VitalRecord_admissionId_fkey";

-- DropForeignKey
ALTER TABLE "VitalRecord" DROP CONSTRAINT "VitalRecord_medicalRecordId_fkey";

-- DropForeignKey
ALTER TABLE "VitalRecord" DROP CONSTRAINT "VitalRecord_nurseId_fkey";

-- DropForeignKey
ALTER TABLE "VitalRecord" DROP CONSTRAINT "VitalRecord_visitId_fkey";

-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "bloodPressure",
DROP COLUMN "height",
DROP COLUMN "pulse",
DROP COLUMN "spo2",
DROP COLUMN "temperature",
DROP COLUMN "weight";

-- AlterTable
ALTER TABLE "Visit" ADD COLUMN     "bloodSugar" DOUBLE PRECISION,
ADD COLUMN     "bmi" DOUBLE PRECISION,
ADD COLUMN     "diastolicBP" INTEGER,
ADD COLUMN     "headCircumference" DOUBLE PRECISION,
ADD COLUMN     "height" DOUBLE PRECISION,
ADD COLUMN     "painScore" INTEGER,
ADD COLUMN     "pulse" INTEGER,
ADD COLUMN     "respiratoryRate" INTEGER,
ADD COLUMN     "spo2" INTEGER,
ADD COLUMN     "systolicBP" INTEGER,
ADD COLUMN     "temperature" DOUBLE PRECISION,
ADD COLUMN     "triageNotes" TEXT,
ADD COLUMN     "triagedAt" TIMESTAMP(3),
ADD COLUMN     "triagedById" TEXT,
ADD COLUMN     "weight" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "VitalRecord" DROP COLUMN "admissionId",
DROP COLUMN "medicalRecordId",
DROP COLUMN "nurseId",
ADD COLUMN     "bloodSugar" DOUBLE PRECISION,
ADD COLUMN     "bmi" DOUBLE PRECISION,
ADD COLUMN     "headCircumference" DOUBLE PRECISION,
ADD COLUMN     "height" DOUBLE PRECISION,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "painScore" INTEGER,
ADD COLUMN     "recordedById" TEXT NOT NULL,
ALTER COLUMN "oxygenSaturation" SET DATA TYPE INTEGER,
ALTER COLUMN "visitId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_triagedById_fkey" FOREIGN KEY ("triagedById") REFERENCES "Staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VitalRecord" ADD CONSTRAINT "VitalRecord_visitId_fkey" FOREIGN KEY ("visitId") REFERENCES "Visit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VitalRecord" ADD CONSTRAINT "VitalRecord_recordedById_fkey" FOREIGN KEY ("recordedById") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
