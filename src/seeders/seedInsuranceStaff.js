import bcrypt from "bcrypt";
import prisma from "../utils/prisma.js";

async function main() {
  const providerOrgCode = process.env.INSURANCE_SEED_ORG_CODE;
  const email = process.env.INSURANCE_SEED_EMAIL;
  const password = process.env.INSURANCE_SEED_PASSWORD;

  if (!providerOrgCode) {
    console.error("INSURANCE_SEED_ORG_CODE is not set (the Organization.code linked to the InsuranceProvider).");
    process.exit(1);
  }

  if (!email) {
    console.error("INSURANCE_SEED_EMAIL is not set.");
    process.exit(1);
  }

  if (!password) {
    console.error("INSURANCE_SEED_PASSWORD is not set.");
    process.exit(1);
  }

  const organization = await prisma.organization.findUnique({
    where: { code: providerOrgCode }
  });

  if (!organization) {
    console.error(`No organization found with code "${providerOrgCode}".`);
    process.exit(1);
  }

  const provider = await prisma.insuranceProvider.findUnique({
    where: { organizationId: organization.id }
  });

  if (!provider) {
    console.error(`Organization "${providerOrgCode}" is not registered as an insurance provider yet. Create it via the platform app first.`);
    process.exit(1);
  }

  const existing = await prisma.insuranceStaff.findUnique({ where: { email } });

  if (existing) {
    console.log("Insurance staff with this email already exists.");
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // Updated with your specific parameters
  const staff = await prisma.insuranceStaff.create({
    data: {
      insuranceProviderId: "cms22b0hh0004vx3c7xgl1ige",
      firstName: "James",
      lastName: "Adeoye",
      email,
      password: hashedPassword,
      role: "MANAGER",
      isActive: true
    }
  });

  console.log("");
  console.log("====================================");
  console.log("INSURANCE MANAGER CREATED");
  console.log("====================================");
  console.log("Name:", `${staff.firstName} ${staff.lastName}`);
  console.log("Email:", staff.email);
  console.log("====================================");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });