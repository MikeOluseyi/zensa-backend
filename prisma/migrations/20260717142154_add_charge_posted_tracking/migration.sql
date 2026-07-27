-- AlterTable
ALTER TABLE "Charge" ADD COLUMN     "postedAt" TIMESTAMP(3),
ADD COLUMN     "postedById" TEXT;

-- CreateTable
CREATE TABLE "ChargeStatusHistory" (
    "id" TEXT NOT NULL,
    "chargeId" TEXT NOT NULL,
    "fromStatus" "ChargeStatus",
    "toStatus" "ChargeStatus" NOT NULL,
    "changedById" TEXT,
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChargeStatusHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Charge" ADD CONSTRAINT "Charge_postedById_fkey" FOREIGN KEY ("postedById") REFERENCES "Staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChargeStatusHistory" ADD CONSTRAINT "ChargeStatusHistory_chargeId_fkey" FOREIGN KEY ("chargeId") REFERENCES "Charge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChargeStatusHistory" ADD CONSTRAINT "ChargeStatusHistory_changedById_fkey" FOREIGN KEY ("changedById") REFERENCES "Staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;
