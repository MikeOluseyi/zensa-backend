/*
  Warnings:

  - You are about to drop the column `total` on the `Charge` table. All the data in the column will be lost.
  - You are about to drop the `InvoiceItem` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `hospitalId` to the `Charge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPrice` to the `Charge` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "InvoiceItem" DROP CONSTRAINT "InvoiceItem_chargeId_fkey";

-- DropForeignKey
ALTER TABLE "InvoiceItem" DROP CONSTRAINT "InvoiceItem_invoiceId_fkey";

-- AlterTable
ALTER TABLE "Charge" DROP COLUMN "total",
ADD COLUMN     "hospitalId" TEXT NOT NULL,
ADD COLUMN     "totalPrice" DOUBLE PRECISION NOT NULL;

-- DropTable
DROP TABLE "InvoiceItem";

-- AddForeignKey
ALTER TABLE "Charge" ADD CONSTRAINT "Charge_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
