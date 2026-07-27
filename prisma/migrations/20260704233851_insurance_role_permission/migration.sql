-- CreateTable
CREATE TABLE "InsuranceRolePermission" (
    "id" TEXT NOT NULL,
    "role" "InsuranceRole" NOT NULL,
    "permissionId" TEXT NOT NULL,

    CONSTRAINT "InsuranceRolePermission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InsuranceRolePermission_role_permissionId_key" ON "InsuranceRolePermission"("role", "permissionId");

-- AddForeignKey
ALTER TABLE "InsuranceRolePermission" ADD CONSTRAINT "InsuranceRolePermission_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "Permission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
