import bcrypt from "bcrypt";
import prisma from "../utils/prisma.js";

async function main() {

  const password = process.env.PLATFORM_ADMIN_SEED_PASSWORD;

  if (!password) {
    console.error("PLATFORM_ADMIN_SEED_PASSWORD is not set. Refusing to seed.");
    process.exit(1);
  }

  const email = process.env.PLATFORM_ADMIN_SEED_EMAIL;

  if (!email) {
    console.error("PLATFORM_ADMIN_SEED_EMAIL is not set. Refusing to seed.");
    process.exit(1);
  }

  const existing = await prisma.platformStaff.findUnique({ where: { email } });

  if (existing) {
    console.log("Platform admin already exists.");
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await prisma.platformStaff.create({

    data: {
      firstName: "Michael",
      lastName: "Oluseyi",
      email,
      password: hashedPassword,
      role: "SUPER_ADMIN",
      isActive: true
    }

  });

  console.log("Platform admin created:", admin.email);

}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });