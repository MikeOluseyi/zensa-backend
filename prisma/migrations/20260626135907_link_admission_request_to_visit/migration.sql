/*
  Warnings:

  - You are about to drop the column `appointmentId` on the `AdmissionRequest` table. All the data in the column will be lost.
  - You are about to drop the column `medicalRecordId` on the `AdmissionRequest` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[visitId]` on the table `AdmissionRequest` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `visitId` to the `AdmissionRequest` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AdmissionRequest" DROP CONSTRAINT "AdmissionRequest_appointmentId_fkey";

-- DropForeignKey
ALTER TABLE "AdmissionRequest" DROP CONSTRAINT "AdmissionRequest_medicalRecordId_fkey";

-- AlterTable
ALTER TABLE "AdmissionRequest" DROP COLUMN "appointmentId",
DROP COLUMN "medicalRecordId",
ADD COLUMN     "visitId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "AdmissionRequest_visitId_key" ON "AdmissionRequest"("visitId");

-- AddForeignKey
ALTER TABLE "AdmissionRequest" ADD CONSTRAINT "AdmissionRequest_visitId_fkey" FOREIGN KEY ("visitId") REFERENCES "Visit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
