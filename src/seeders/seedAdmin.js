import bcrypt from "bcrypt";
import prisma from "../utils/prisma.js";

async function main() {

  const existing =
    await prisma.staff.findUnique({

      where: {
        email: "admin@zensa.com"
      }

    });

  if (existing) {

    console.log("Admin already exists.");

    return;

  }

  const hashedPassword =
    await bcrypt.hash(
      "password123",
      10
    );

  const admin =
    await prisma.staff.create({

      data: {

        firstName: "Benjamin",

        lastName: "Adekunle",

        email: "admin@sjmc.com",

        password: hashedPassword,

        phone: "07037985674",

        role: "ADMIN",

        hospitalId: "cms21zzal0002vx3c79e2hz94",

        isActive: true

      }

    });

  console.log("");
  console.log("====================================");
  console.log("ADMIN CREATED SUCCESSFULLY");
  console.log("====================================");
  console.log("Email:", admin.email);
  console.log("Password: password123");
  console.log("Staff ID:", admin.id);
  console.log("====================================");

}

main()
  .catch((err) => {

    console.error(err);

  })
  .finally(async () => {

    await prisma.$disconnect();

  });