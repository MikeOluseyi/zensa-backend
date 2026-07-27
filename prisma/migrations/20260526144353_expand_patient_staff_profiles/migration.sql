/*
  Warnings:

  - You are about to drop the column `emergencyContactName` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `emergencyContactPhone` on the `Patient` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "emergencyContactName",
DROP COLUMN "emergencyContactPhone",
ADD COLUMN     "localGovernmentOfOrigin" TEXT,
ADD COLUMN     "maritalStatus" TEXT,
ADD COLUMN     "nextOfKinAddress" TEXT,
ADD COLUMN     "nextOfKinEmail" TEXT,
ADD COLUMN     "nextOfKinName" TEXT,
ADD COLUMN     "nextOfKinPhone" TEXT,
ADD COLUMN     "nextOfKinRelationship" TEXT,
ADD COLUMN     "numberOfChildren" INTEGER,
ADD COLUMN     "photoUrl" TEXT,
ADD COLUMN     "stateOfOrigin" TEXT;

-- AlterTable
ALTER TABLE "Staff" ADD COLUMN     "address" TEXT,
ADD COLUMN     "maritalStatus" TEXT,
ADD COLUMN     "nextOfKinName" TEXT,
ADD COLUMN     "nextOfKinPhone" TEXT,
ADD COLUMN     "nextOfKinRelationship" TEXT,
ADD COLUMN     "photoUrl" TEXT;
