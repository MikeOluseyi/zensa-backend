-- AlterTable
ALTER TABLE "AdmissionMedicationOrder" ADD COLUMN     "inventoryItemId" TEXT;

-- AddForeignKey
ALTER TABLE "AdmissionMedicationOrder" ADD CONSTRAINT "AdmissionMedicationOrder_inventoryItemId_fkey" FOREIGN KEY ("inventoryItemId") REFERENCES "InventoryItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;
