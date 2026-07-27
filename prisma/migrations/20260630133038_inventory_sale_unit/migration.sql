/*
  Warnings:

  - You are about to drop the column `unit` on the `InventoryItem` table. All the data in the column will be lost.
  - Added the required column `baseUnit` to the `InventoryItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `saleUnit` to the `InventoryItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "InventoryItem" DROP COLUMN "unit",
ADD COLUMN     "baseUnit" TEXT NOT NULL,
ADD COLUMN     "saleUnit" TEXT NOT NULL,
ADD COLUMN     "unitsPerSaleUnit" DOUBLE PRECISION NOT NULL DEFAULT 1;
