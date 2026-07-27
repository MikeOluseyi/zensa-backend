-- CreateEnum
CREATE TYPE "ServiceCategory" AS ENUM ('ADMISSION', 'LAB', 'RADIOLOGY', 'CONSULTATION', 'PHARMACY', 'NURSING', 'PROCEDURE', 'SURGERY', 'BED', 'ICU', 'DELIVERY', 'DIALYSIS', 'PHYSIOTHERAPY', 'OTHER');

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" "ServiceCategory" NOT NULL,
    "description" TEXT,
    "unit" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HospitalServicePrice" (
    "id" TEXT NOT NULL,
    "hospitalId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HospitalServicePrice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HospitalServicePrice_hospitalId_serviceId_key" ON "HospitalServicePrice"("hospitalId", "serviceId");

-- AddForeignKey
ALTER TABLE "HospitalServicePrice" ADD CONSTRAINT "HospitalServicePrice_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HospitalServicePrice" ADD CONSTRAINT "HospitalServicePrice_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
