-- AlterEnum
ALTER TYPE "AdmissionStatus" ADD VALUE 'DISCHARGE_ORDERED';

-- AlterTable
ALTER TABLE "Admission" ADD COLUMN     "dischargeInstructions" TEXT,
ADD COLUMN     "dischargeOrderedAt" TIMESTAMP(3),
ADD COLUMN     "dischargeOrderedById" TEXT;

-- AddForeignKey
ALTER TABLE "Admission" ADD CONSTRAINT "Admission_dischargeOrderedById_fkey" FOREIGN KEY ("dischargeOrderedById") REFERENCES "Staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;
