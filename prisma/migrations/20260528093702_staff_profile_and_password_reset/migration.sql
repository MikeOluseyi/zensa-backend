/*
  Warnings:

  - You are about to drop the column `used` on the `PasswordResetToken` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PasswordResetToken" DROP COLUMN "used";

-- AlterTable
ALTER TABLE "Staff" ADD COLUMN     "licenseNumber" TEXT,
ADD COLUMN     "specialization" TEXT;
