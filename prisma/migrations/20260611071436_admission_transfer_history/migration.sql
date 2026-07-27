-- CreateEnum
CREATE TYPE "AdmissionTransferReason" AS ENUM ('MEDICAL', 'UPGRADE', 'DOWNGRADE', 'ISOLATION', 'BED_AVAILABILITY', 'OTHER');

-- CreateTable
CREATE TABLE "AdmissionTransfer" (
    "id" TEXT NOT NULL,
    "admissionId" TEXT NOT NULL,
    "fromBedId" TEXT NOT NULL,
    "toBedId" TEXT NOT NULL,
    "reason" "AdmissionTransferReason",
    "transferredById" TEXT NOT NULL,
    "notes" TEXT,
    "transferredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdmissionTransfer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AdmissionTransfer" ADD CONSTRAINT "AdmissionTransfer_admissionId_fkey" FOREIGN KEY ("admissionId") REFERENCES "Admission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdmissionTransfer" ADD CONSTRAINT "AdmissionTransfer_fromBedId_fkey" FOREIGN KEY ("fromBedId") REFERENCES "Bed"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdmissionTransfer" ADD CONSTRAINT "AdmissionTransfer_toBedId_fkey" FOREIGN KEY ("toBedId") REFERENCES "Bed"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdmissionTransfer" ADD CONSTRAINT "AdmissionTransfer_transferredById_fkey" FOREIGN KEY ("transferredById") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
