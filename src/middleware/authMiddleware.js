import jwt from "jsonwebtoken";
import prisma from "../utils/prisma.js";

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "No token provided"
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Invalid token format"
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.scope === "platform") {
      return res.status(401).json({
        message: "Unauthorized"
      });
    }

    const staff = await prisma.staff.findUnique({

      where: {
        id: decoded.id
      },

      select: {
        id: true,
        role: true,
        hospitalId: true,
        departmentId: true,
        isActive: true
      }

    });

    if (!staff || !staff.isActive) {
      return res.status(401).json({
        message: "Account is inactive or no longer exists"
      });
    }

    req.user = {
      id: staff.id,
      role: staff.role,
      hospitalId: staff.hospitalId,
      departmentId: staff.departmentId
    };

    next();

  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized"
    });
  }
};