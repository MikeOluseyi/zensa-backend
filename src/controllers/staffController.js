import prisma from "../utils/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// REGISTER STAFF
export const registerStaff = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      role,
      password
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const staff = await prisma.staff.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        role,
        password: hashedPassword
      }
    });

    res.json(staff);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Registration failed" });
  }
};

// LOGIN
export const loginStaff = async (req, res) => {
  try {
    const { email, password } = req.body;

    const staff = await prisma.staff.findUnique({
      where: { email }
    });

    if (!staff) {
      return res.status(401).json({
        error: "Invalid credentials"
      });
    }

    const valid = await bcrypt.compare(
      password,
      staff.password
    );

    if (!valid) {
      return res.status(401).json({
        error: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      {
        id: staff.id,
        role: staff.role,
        hospitalId: staff.hospitalId
},
process.env.JWT_SECRET,
{
        expiresIn: "7d"
      }
    );

    res.json({
      token,
      user: {
        id: staff.id,
        firstName: staff.firstName,
        lastName: staff.lastName,
        role: staff.role
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed" });
  }
};