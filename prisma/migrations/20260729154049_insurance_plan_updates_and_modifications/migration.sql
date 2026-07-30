-- CreateEnum
CREATE TYPE "PlanScope" AS ENUM ('GENERAL', 'CONDITION_SPECIFIC');

-- AlterTable
ALTER TABLE "InsurancePlan" ADD COLUMN     "scope" "PlanScope" NOT NULL DEFAULT 'GENERAL';

-- CreateTable
CREATE TABLE "InsurancePlanCoverageRule" (
    "id" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "cptCodeId" TEXT,
    "icd10Id" TEXT,
    "covered" BOOLEAN NOT NULL DEFAULT true,
    "requiresAuthorization" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InsurancePlanCoverageRule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InsurancePlanCoverageRule_planId_cptCodeId_icd10Id_key" ON "InsurancePlanCoverageRule"("planId", "cptCodeId", "icd10Id");

-- AddForeignKey
ALTER TABLE "InsurancePlanCoverageRule" ADD CONSTRAINT "InsurancePlanCoverageRule_planId_fkey" FOREIGN KEY ("planId") REFERENCES "InsurancePlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InsurancePlanCoverageRule" ADD CONSTRAINT "InsurancePlanCoverageRule_cptCodeId_fkey" FOREIGN KEY ("cptCodeId") REFERENCES "CPTCode"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InsurancePlanCoverageRule" ADD CONSTRAINT "InsurancePlanCoverageRule_icd10Id_fkey" FOREIGN KEY ("icd10Id") REFERENCES "ICD10Code"("id") ON DELETE SET NULL ON UPDATE CASCADE;
