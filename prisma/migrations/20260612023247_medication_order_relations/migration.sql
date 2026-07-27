/*
  Warnings:

  - You are about to drop the column `staffId` on the `AdmissionMedicationOrder` table. All the data in the column will be lost.
  - Changed the type of `route` on the `AdmissionMedicationOrder` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "AdmissionMedicationOrder" DROP CONSTRAINT "AdmissionMedicationOrder_staffId_fkey";

-- AlterTable
ALTER TABLE "AdmissionMedicationOrder" DROP COLUMN "staffId",
DROP COLUMN "route",
ADD COLUMN     "route" "MedicationRoute" NOT NULL;

-- AddForeignKey
ALTER TABLE "AdmissionMedicationOrder" ADD CONSTRAINT "AdmissionMedicationOrder_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
