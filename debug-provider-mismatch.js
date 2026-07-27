// debug-provider-mismatch.js
import prisma from "./src/utils/prisma.js";

async function main() {

  const claim = await prisma.claim.findFirst({
    where: { claimNumber: "CLM-1785142137727" }, // the one from your screenshot
    include: {
      insurance: {
        include: {
          provider: { include: { organization: true } }
        }
      }
    }
  });

  console.log("Claim's linked provider:", claim.insurance.provider.id, claim.insurance.provider.organization.name);

  const managerStaff = await prisma.insuranceStaff.findUnique({
    where: { email: "jamesoye@fal.com" }, // whatever email you logged in with
    include: {
      insuranceProvider: { include: { organization: true } }
    }
  });

  console.log("Manager's own provider:", managerStaff.insuranceProviderId, managerStaff.insuranceProvider.organization.name);

  const allProviders = await prisma.insuranceProvider.findMany({
    include: { organization: true }
  });

  console.log("All providers in the system:");
  allProviders.forEach(p => console.log(`  ${p.id} — ${p.organization.name} (org code: ${p.organization.code})`));

}

main().finally(() => prisma.$disconnect());