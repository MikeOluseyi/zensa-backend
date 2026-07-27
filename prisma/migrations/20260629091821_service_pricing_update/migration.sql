/*
  Warnings:

  - You are about to drop the `HospitalProcedurePrice` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `hospitalServiceId` to the `Charge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `HospitalService` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "HospitalProcedurePrice" DROP CONSTRAINT "HospitalProcedurePrice_cptId_fkey";

-- DropForeignKey
ALTER TABLE "HospitalProcedurePrice" DROP CONSTRAINT "HospitalProcedurePrice_hospitalId_fkey";

-- AlterTable
ALTER TABLE "Charge" ADD COLUMN     "hospitalServiceId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "HospitalService" ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;

-- DropTable
DROP TABLE "HospitalProcedurePrice";

-- AddForeignKey
ALTER TABLE "Charge" ADD CONSTRAINT "Charge_hospitalServiceId_fkey" FOREIGN KEY ("hospitalServiceId") REFERENCES "HospitalService"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
