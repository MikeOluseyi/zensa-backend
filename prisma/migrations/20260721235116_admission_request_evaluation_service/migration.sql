-- AlterTable
ALTER TABLE "AdmissionRequest" ADD COLUMN     "evaluationHospitalServiceId" TEXT;

-- AddForeignKey
ALTER TABLE "AdmissionRequest" ADD CONSTRAINT "AdmissionRequest_evaluationHospitalServiceId_fkey" FOREIGN KEY ("evaluationHospitalServiceId") REFERENCES "HospitalService"("id") ON DELETE SET NULL ON UPDATE CASCADE;
