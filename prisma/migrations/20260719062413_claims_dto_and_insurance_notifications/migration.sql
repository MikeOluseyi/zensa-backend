-- CreateEnum
CREATE TYPE "IntegrationMode" AS ENUM ('ZENSA', 'EXTERNAL');

-- AlterTable
ALTER TABLE "Claim" ADD COLUMN     "currency" TEXT NOT NULL DEFAULT 'NGN',
ADD COLUMN     "paidAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "ClaimAttachment" ADD COLUMN     "mimeType" TEXT;

-- AlterTable
ALTER TABLE "Hospital" ADD COLUMN     "facilityCode" TEXT,
ADD COLUMN     "taxId" TEXT;

-- AlterTable
ALTER TABLE "InsuranceProvider" ADD COLUMN     "integrationMode" "IntegrationMode" NOT NULL DEFAULT 'EXTERNAL';

-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "discount" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "insuranceAmount" DOUBLE PRECISION,
ADD COLUMN     "patientAmount" DOUBLE PRECISION,
ADD COLUMN     "serviceDate" TIMESTAMP(3),
ADD COLUMN     "tax" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "insuranceStaffId" TEXT;

-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "middleName" TEXT,
ADD COLUMN     "nationalId" TEXT;

-- AlterTable
ALTER TABLE "PatientInsurance" ADD COLUMN     "authorizationNumber" TEXT,
ADD COLUMN     "memberId" TEXT;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_insuranceStaffId_fkey" FOREIGN KEY ("insuranceStaffId") REFERENCES "InsuranceStaff"("id") ON DELETE SET NULL ON UPDATE CASCADE;
