-- AlterTable
ALTER TABLE "Hospital" ADD COLUMN     "defaultDailyRoundServiceId" TEXT;

-- CreateTable
CREATE TABLE "AdmissionDailyRound" (
    "id" TEXT NOT NULL,
    "admissionId" TEXT NOT NULL,
    "roundDate" TIMESTAMP(3) NOT NULL,
    "hospitalServiceId" TEXT NOT NULL,
    "recordedById" TEXT NOT NULL,
    "chargeId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdmissionDailyRound_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdmissionDailyRound_chargeId_key" ON "AdmissionDailyRound"("chargeId");

-- CreateIndex
CREATE UNIQUE INDEX "AdmissionDailyRound_admissionId_roundDate_key" ON "AdmissionDailyRound"("admissionId", "roundDate");

-- AddForeignKey
ALTER TABLE "Hospital" ADD CONSTRAINT "Hospital_defaultDailyRoundServiceId_fkey" FOREIGN KEY ("defaultDailyRoundServiceId") REFERENCES "HospitalService"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdmissionDailyRound" ADD CONSTRAINT "AdmissionDailyRound_admissionId_fkey" FOREIGN KEY ("admissionId") REFERENCES "Admission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdmissionDailyRound" ADD CONSTRAINT "AdmissionDailyRound_hospitalServiceId_fkey" FOREIGN KEY ("hospitalServiceId") REFERENCES "HospitalService"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdmissionDailyRound" ADD CONSTRAINT "AdmissionDailyRound_recordedById_fkey" FOREIGN KEY ("recordedById") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdmissionDailyRound" ADD CONSTRAINT "AdmissionDailyRound_chargeId_fkey" FOREIGN KEY ("chargeId") REFERENCES "Charge"("id") ON DELETE SET NULL ON UPDATE CASCADE;
