-- DropForeignKey
ALTER TABLE "AuthorizationRequest" DROP CONSTRAINT "AuthorizationRequest_visitId_fkey";

-- AlterTable
ALTER TABLE "AuthorizationRequest" ADD COLUMN     "cptCodeId" TEXT,
ADD COLUMN     "icd10Id" TEXT,
ALTER COLUMN "visitId" DROP NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'PENDING';

-- AddForeignKey
ALTER TABLE "AuthorizationRequest" ADD CONSTRAINT "AuthorizationRequest_visitId_fkey" FOREIGN KEY ("visitId") REFERENCES "Visit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthorizationRequest" ADD CONSTRAINT "AuthorizationRequest_cptCodeId_fkey" FOREIGN KEY ("cptCodeId") REFERENCES "CPTCode"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthorizationRequest" ADD CONSTRAINT "AuthorizationRequest_icd10Id_fkey" FOREIGN KEY ("icd10Id") REFERENCES "ICD10Code"("id") ON DELETE SET NULL ON UPDATE CASCADE;
