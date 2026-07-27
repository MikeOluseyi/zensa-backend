/*
  Warnings:

  - You are about to drop the column `description` on the `CPTCode` table. All the data in the column will be lost.
  - You are about to drop the column `medicalRecordId` on the `ProcedureRequest` table. All the data in the column will be lost.
  - Added the required column `name` to the `CPTCode` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serviceType` to the `CPTCode` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "AppointmentStatus" ADD VALUE 'AWAITING_RESULTS';

-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'RADIOLOGY';

-- DropForeignKey
ALTER TABLE "ProcedureRequest" DROP CONSTRAINT "ProcedureRequest_medicalRecordId_fkey";

-- AlterTable
ALTER TABLE "CPTCode" DROP COLUMN "description",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "serviceType" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ProcedureRequest" DROP COLUMN "medicalRecordId";
