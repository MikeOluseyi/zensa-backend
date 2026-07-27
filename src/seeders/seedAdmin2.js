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

        firstName: "Elisa",

        lastName: "Oluronmbi",

        email: "admin@smh.com",

        password: hashedPassword,

        phone: "07037944675",

        role: "ADMIN",

        hospitalId: "cms2210zb0003vx3cz4dq4bl2",

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