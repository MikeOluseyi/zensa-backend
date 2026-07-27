-- CreateEnum
CREATE TYPE "ServiceVisitSetting" AS ENUM ('OUTPATIENT', 'INPATIENT');

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "visitSetting" "ServiceVisitSetting";
