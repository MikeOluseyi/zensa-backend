-- CreateTable
CREATE TABLE "ConsultationTransfer" (
    "id" TEXT NOT NULL,
    "visitId" TEXT NOT NULL,
    "fromDoctorId" TEXT,
    "toDoctorId" TEXT,
    "fromDepartmentId" TEXT,
    "toDepartmentId" TEXT NOT NULL,
    "reason" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "acceptedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ConsultationTransfer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ConsultationTransfer" ADD CONSTRAINT "ConsultationTransfer_visitId_fkey" FOREIGN KEY ("visitId") REFERENCES "Visit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsultationTransfer" ADD CONSTRAINT "ConsultationTransfer_fromDoctorId_fkey" FOREIGN KEY ("fromDoctorId") REFERENCES "Staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsultationTransfer" ADD CONSTRAINT "ConsultationTransfer_toDoctorId_fkey" FOREIGN KEY ("toDoctorId") REFERENCES "Staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsultationTransfer" ADD CONSTRAINT "ConsultationTransfer_fromDepartmentId_fkey" FOREIGN KEY ("fromDepartmentId") REFERENCES "Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsultationTransfer" ADD CONSTRAINT "ConsultationTransfer_toDepartmentId_fkey" FOREIGN KEY ("toDepartmentId") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
