/*
  Warnings:

  - The values [ADMISSION,NURSING,ICU,DELIVERY,DIALYSIS,PHYSIOTHERAPY,DISCHARGE,OTHER] on the enum `ServiceCategory` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "AppointmentStatus" ADD VALUE 'READY_FOR_REVIEW';
ALTER TYPE "AppointmentStatus" ADD VALUE 'TRANSFERRED';

-- AlterEnum
BEGIN;
CREATE TYPE "ServiceCategory_new" AS ENUM ('CONSULTATION', 'SPECIALIST');
ALTER TABLE "Service" ALTER COLUMN "category" TYPE "ServiceCategory_new" USING ("category"::text::"ServiceCategory_new");
ALTER TYPE "ServiceCategory" RENAME TO "ServiceCategory_old";
ALTER TYPE "ServiceCategory_new" RENAME TO "ServiceCategory";
DROP TYPE "public"."ServiceCategory_old";
COMMIT;

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "VisitStatus" ADD VALUE 'AWAITING_RESULTS';
ALTER TYPE "VisitStatus" ADD VALUE 'READY_FOR_REVIEW';
ALTER TYPE "VisitStatus" ADD VALUE 'TRANSFERRED';
