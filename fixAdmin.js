import prisma from "./src/utils/prisma.js";
import bcrypt from "bcrypt";

const hash = await bcrypt.hash(
  "password123",
  10
);

await prisma.staff.update({
  where: {
    email: "admin@zensa.com"
  },
  data: {
    password: hash
  }
});

console.log("Admin password updated");
process.exit();