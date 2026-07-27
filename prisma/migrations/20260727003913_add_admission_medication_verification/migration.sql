-- CreateEnum
CREATE TYPE "MedicationVerificationStatus" AS ENUM ('PENDING_VERIFICATION', 'VERIFIED', 'REJECTED');

-- AlterTable
ALTER TABLE "AdmissionMedicationOrder" ADD COLUMN     "rejectionReason" TEXT,
ADD COLUMN     "verificationStatus" "MedicationVerificationStatus" NOT NULL DEFAULT 'PENDING_VERIFICATION',
ADD COLUMN     "verifiedAt" TIMESTAMP(3),
ADD COLUMN     "verifiedById" TEXT;

-- AddForeignKey
ALTER TABLE "AdmissionMedicationOrder" ADD CONSTRAINT "AdmissionMedicationOrder_verifiedById_fkey" FOREIGN KEY ("verifiedById") REFERENCES "Staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;
