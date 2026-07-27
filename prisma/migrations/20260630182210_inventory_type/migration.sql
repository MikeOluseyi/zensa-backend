/*
  Warnings:

  - Added the required column `type` to the `InventoryItem` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "InventoryType" AS ENUM ('MEDICATION', 'SUPPLY', 'EQUIPMENT', 'CONSUMABLE');

-- AlterTable
ALTER TABLE "InventoryItem" ADD COLUMN     "type" "InventoryType" NOT NULL;
