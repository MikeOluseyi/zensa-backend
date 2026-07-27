/*
  Warnings:

  - You are about to drop the column `supllier` on the `InventoryItem` table. All the data in the column will be lost.
  - Added the required column `supplier` to the `InventoryItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "InventoryItem" DROP COLUMN "supllier",
ADD COLUMN     "supplier" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "balance" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "createdById" TEXT,
ADD COLUMN     "paidAmount" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;
