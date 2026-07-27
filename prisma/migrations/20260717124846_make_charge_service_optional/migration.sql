-- DropForeignKey
ALTER TABLE "Charge" DROP CONSTRAINT "Charge_hospitalServiceId_fkey";

-- DropForeignKey
ALTER TABLE "Charge" DROP CONSTRAINT "Charge_serviceId_fkey";

-- AlterTable
ALTER TABLE "Charge" ALTER COLUMN "serviceId" DROP NOT NULL,
ALTER COLUMN "hospitalServiceId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Charge" ADD CONSTRAINT "Charge_hospitalServiceId_fkey" FOREIGN KEY ("hospitalServiceId") REFERENCES "HospitalService"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Charge" ADD CONSTRAINT "Charge_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;
