/*
  Warnings:

  - The values [ADMIN] on the enum `InsuranceRole` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "InsuranceRole_new" AS ENUM ('MANAGER', 'CLAIMS_OFFICER', 'REVIEWER', 'FINANCE');
ALTER TABLE "InsuranceStaff" ALTER COLUMN "role" TYPE "InsuranceRole_new" USING ("role"::text::"InsuranceRole_new");
ALTER TYPE "InsuranceRole" RENAME TO "InsuranceRole_old";
ALTER TYPE "InsuranceRole_new" RENAME TO "InsuranceRole";
DROP TYPE "public"."InsuranceRole_old";
COMMIT;
