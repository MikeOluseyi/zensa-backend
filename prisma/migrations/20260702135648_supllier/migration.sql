/*
  Warnings:

  - You are about to drop the column `suplliers` on the `InventoryItem` table. All the data in the column will be lost.
  - Added the required column `supllier` to the `InventoryItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "InventoryItem" DROP COLUMN "suplliers",
ADD COLUMN     "supllier" TEXT NOT NULL;
