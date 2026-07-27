-- CreateTable
CREATE TABLE "LabResult" (
    "id" TEXT NOT NULL,
    "procedureRequestId" TEXT NOT NULL,
    "cptCode" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LabResult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LabResult_procedureRequestId_key" ON "LabResult"("procedureRequestId");

-- AddForeignKey
ALTER TABLE "LabResult" ADD CONSTRAINT "LabResult_procedureRequestId_fkey" FOREIGN KEY ("procedureRequestId") REFERENCES "ProcedureRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
