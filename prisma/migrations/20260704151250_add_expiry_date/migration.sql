/*
  Warnings:

  - You are about to drop the column `processedById` on the `Claim` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `InsuranceProvider` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `InsuranceProvider` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `InsuranceProvider` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[organizationId]` on the table `InsuranceProvider` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `organizationId` to the `InsuranceProvider` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "InsuranceRole" AS ENUM ('ADMIN', 'CLAIMS_OFFICER', 'REVIEWER', 'FINANCE');

-- CreateEnum
CREATE TYPE "AttachmentType" AS ENUM ('CLAIM', 'AUTHORIZATION', 'OTHER');

-- CreateEnum
CREATE TYPE "ClaimSender" AS ENUM ('HOSPITAL', 'INSURER');

-- CreateEnum
CREATE TYPE "AuthorizationStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'CANCELLED');

-- DropForeignKey
ALTER TABLE "Claim" DROP CONSTRAINT "Claim_processedById_fkey";

-- DropIndex
DROP INDEX "InsuranceProvider_name_key";

-- AlterTable
ALTER TABLE "Claim" DROP COLUMN "processedById",
ADD COLUMN     "processedByInsuranceStaffId" TEXT;

-- AlterTable
ALTER TABLE "InsuranceProvider" DROP COLUMN "email",
DROP COLUMN "name",
DROP COLUMN "phone",
ADD COLUMN     "organizationId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "InventoryItem" ADD COLUMN     "expiryDate" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "InsuranceStaff" (
    "id" TEXT NOT NULL,
    "insuranceProviderId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "InsuranceRole" NOT NULL,
    "permissions" JSONB,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InsuranceStaff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClaimAttachment" (
    "id" TEXT NOT NULL,
    "claimId" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "type" "AttachmentType" NOT NULL,
    "attachedByStaffId" TEXT,
    "attachedByInsuranceStaffId" TEXT,
    "attachedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ClaimAttachment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClaimMessage" (
    "id" TEXT NOT NULL,
    "claimId" TEXT NOT NULL,
    "senderType" "ClaimSender" NOT NULL,
    "staffId" TEXT,
    "insuranceStaffId" TEXT,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ClaimMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuthorizationRequest" (
    "id" TEXT NOT NULL,
    "patientInsuranceId" TEXT NOT NULL,
    "visitId" TEXT NOT NULL,
    "hospitalId" TEXT NOT NULL,
    "insuranceProviderId" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "requestedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "AuthorizationStatus" NOT NULL,
    "approvedByInsuranceStaffId" TEXT,

    CONSTRAINT "AuthorizationRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClaimPayment" (
    "id" TEXT NOT NULL,
    "claimId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "reference" TEXT NOT NULL,
    "paidAt" TIMESTAMP(3) NOT NULL,
    "receivedById" TEXT,

    CONSTRAINT "ClaimPayment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InsuranceStaff_email_key" ON "InsuranceStaff"("email");

-- CreateIndex
CREATE UNIQUE INDEX "InsuranceProvider_organizationId_key" ON "InsuranceProvider"("organizationId");

-- AddForeignKey
ALTER TABLE "InsuranceProvider" ADD CONSTRAINT "InsuranceProvider_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InsuranceStaff" ADD CONSTRAINT "InsuranceStaff_insuranceProviderId_fkey" FOREIGN KEY ("insuranceProviderId") REFERENCES "InsuranceProvider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Claim" ADD CONSTRAINT "Claim_processedByInsuranceStaffId_fkey" FOREIGN KEY ("processedByInsuranceStaffId") REFERENCES "InsuranceStaff"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClaimAttachment" ADD CONSTRAINT "ClaimAttachment_claimId_fkey" FOREIGN KEY ("claimId") REFERENCES "Claim"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClaimAttachment" ADD CONSTRAINT "ClaimAttachment_attachedByStaffId_fkey" FOREIGN KEY ("attachedByStaffId") REFERENCES "Staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClaimAttachment" ADD CONSTRAINT "ClaimAttachment_attachedByInsuranceStaffId_fkey" FOREIGN KEY ("attachedByInsuranceStaffId") REFERENCES "InsuranceStaff"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClaimMessage" ADD CONSTRAINT "ClaimMessage_claimId_fkey" FOREIGN KEY ("claimId") REFERENCES "Claim"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClaimMessage" ADD CONSTRAINT "ClaimMessage_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClaimMessage" ADD CONSTRAINT "ClaimMessage_insuranceStaffId_fkey" FOREIGN KEY ("insuranceStaffId") REFERENCES "InsuranceStaff"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthorizationRequest" ADD CONSTRAINT "AuthorizationRequest_patientInsuranceId_fkey" FOREIGN KEY ("patientInsuranceId") REFERENCES "PatientInsurance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthorizationRequest" ADD CONSTRAINT "AuthorizationRequest_visitId_fkey" FOREIGN KEY ("visitId") REFERENCES "Visit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthorizationRequest" ADD CONSTRAINT "AuthorizationRequest_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthorizationRequest" ADD CONSTRAINT "AuthorizationRequest_insuranceProviderId_fkey" FOREIGN KEY ("insuranceProviderId") REFERENCES "InsuranceProvider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthorizationRequest" ADD CONSTRAINT "AuthorizationRequest_approvedByInsuranceStaffId_fkey" FOREIGN KEY ("approvedByInsuranceStaffId") REFERENCES "InsuranceStaff"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClaimPayment" ADD CONSTRAINT "ClaimPayment_claimId_fkey" FOREIGN KEY ("claimId") REFERENCES "Claim"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClaimPayment" ADD CONSTRAINT "ClaimPayment_receivedById_fkey" FOREIGN KEY ("receivedById") REFERENCES "Staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;
