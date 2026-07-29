-- CreateTable
CREATE TABLE "StaffLoginLog" (
    "id" TEXT NOT NULL,
    "staffId" TEXT NOT NULL,
    "hospitalId" TEXT NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StaffLoginLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StaffLoginLog" ADD CONSTRAINT "StaffLoginLog_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
