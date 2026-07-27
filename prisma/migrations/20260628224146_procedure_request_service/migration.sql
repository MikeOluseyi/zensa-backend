/*
  Warnings:

  - Added the required column `serviceId` to the `ProcedureRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProcedureRequest" ADD COLUMN     "serviceId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ProcedureRequest" ADD CONSTRAINT "ProcedureRequest_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
