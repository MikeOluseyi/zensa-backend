-- AlterTable
ALTER TABLE "Charge" ADD COLUMN     "cancelleationReason" TEXT,
ADD COLUMN     "cancelledAt" TIMESTAMP(3),
ADD COLUMN     "cancelledById" TEXT;

-- AddForeignKey
ALTER TABLE "Charge" ADD CONSTRAINT "Charge_cancelledById_fkey" FOREIGN KEY ("cancelledById") REFERENCES "Staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;
