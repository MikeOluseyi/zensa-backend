/*
  Warnings:

  - Added the required column `prescribedById` to the `Prescription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Prescription" ADD COLUMN     "prescribedById" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Prescription" ADD CONSTRAINT "Prescription_prescribedById_fkey" FOREIGN KEY ("prescribedById") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
