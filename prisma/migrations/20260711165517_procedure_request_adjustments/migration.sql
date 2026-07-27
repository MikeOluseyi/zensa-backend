/*
  Warnings:

  - You are about to drop the column `cptId` on the `ProcedureRequest` table. All the data in the column will be lost.
  - You are about to drop the column `serviceId` on the `ProcedureRequest` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProcedureRequest" DROP CONSTRAINT "ProcedureRequest_cptId_fkey";

-- DropForeignKey
ALTER TABLE "ProcedureRequest" DROP CONSTRAINT "ProcedureRequest_serviceId_fkey";

-- AlterTable
ALTER TABLE "ProcedureRequest" DROP COLUMN "cptId",
DROP COLUMN "serviceId";
