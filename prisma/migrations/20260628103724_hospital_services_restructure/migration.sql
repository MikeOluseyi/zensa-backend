/*
  Warnings:

  - You are about to drop the `HospitalServicePrice` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `cptId` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "HospitalServicePrice" DROP CONSTRAINT "HospitalServicePrice_cptId_fkey";

-- DropForeignKey
ALTER TABLE "HospitalServicePrice" DROP CONSTRAINT "HospitalServicePrice_hospitalId_fkey";

-- DropForeignKey
ALTER TABLE "HospitalServicePrice" DROP CONSTRAINT "HospitalServicePrice_serviceId_fkey";

-- DropIndex
DROP INDEX "Service_name_key";

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "cptId" TEXT NOT NULL;

-- DropTable
DROP TABLE "HospitalServicePrice";

-- CreateTable
CREATE TABLE "HospitalService" (
    "id" TEXT NOT NULL,
    "hospitalId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "departmentId" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HospitalService_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HospitalService_hospitalId_serviceId_key" ON "HospitalService"("hospitalId", "serviceId");

-- AddForeignKey
ALTER TABLE "HospitalService" ADD CONSTRAINT "HospitalService_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HospitalService" ADD CONSTRAINT "HospitalService_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HospitalService" ADD CONSTRAINT "HospitalService_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_cptId_fkey" FOREIGN KEY ("cptId") REFERENCES "CPTCode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
