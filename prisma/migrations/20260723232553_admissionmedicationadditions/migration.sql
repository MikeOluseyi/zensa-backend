-- CreateTable
CREATE TABLE "AdmissionRequestMedication" (
    "id" TEXT NOT NULL,
    "admissionRequestId" TEXT NOT NULL,
    "sourcePrescriptionId" TEXT NOT NULL,
    "orderType" "MedicationOrderType" NOT NULL,
    "quantityLimit" INTEGER,
    "dosage" TEXT NOT NULL,
    "frequency" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "route" "MedicationRoute" NOT NULL,
    "scheduledTimes" JSONB,

    CONSTRAINT "AdmissionRequestMedication_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AdmissionRequestMedication" ADD CONSTRAINT "AdmissionRequestMedication_admissionRequestId_fkey" FOREIGN KEY ("admissionRequestId") REFERENCES "AdmissionRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdmissionRequestMedication" ADD CONSTRAINT "AdmissionRequestMedication_sourcePrescriptionId_fkey" FOREIGN KEY ("sourcePrescriptionId") REFERENCES "Prescription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
