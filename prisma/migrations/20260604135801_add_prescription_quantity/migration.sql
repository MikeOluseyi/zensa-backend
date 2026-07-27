/*
  Warnings:

  - You are about to alter the column `quantity` on the `Prescription` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - Made the column `quantity` on table `Prescription` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Prescription" ADD COLUMN     "quantityUnit" TEXT NOT NULL DEFAULT 'TABLET',
ALTER COLUMN "quantity" SET NOT NULL,
ALTER COLUMN "quantity" SET DEFAULT 0,
ALTER COLUMN "quantity" SET DATA TYPE INTEGER;
