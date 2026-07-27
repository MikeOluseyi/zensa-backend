/*
  Warnings:

  - You are about to drop the column `quantityUnit` on the `Prescription` table. All the data in the column will be lost.
  - Added the required column `saleUnit` to the `Prescription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Prescription" DROP COLUMN "quantityUnit",
ADD COLUMN     "inventoryItemId" TEXT,
ADD COLUMN     "saleUnit" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Prescription" ADD CONSTRAINT "Prescription_inventoryItemId_fkey" FOREIGN KEY ("inventoryItemId") REFERENCES "InventoryItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;
