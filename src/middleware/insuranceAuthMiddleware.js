import jwt from "jsonwebtoken";
import prisma from "../utils/prisma.js";

export const protectInsurance = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Invalid token format" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.scope !== "insurance") {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const staff = await prisma.insuranceStaff.findUnique({

      where: { id: decoded.id },

      select: {
        id: true,
        role: true,
        isActive: true,
        insuranceProviderId: true
      }

    });

    if (!staff || !staff.isActive) {
      return res.status(401).json({ message: "Account is inactive or no longer exists" });
    }

    req.user = {
      id: staff.id,
      role: staff.role,
      insuranceProviderId: staff.insuranceProviderId
    };

    req.insuranceProvider = { id: staff.insuranceProviderId };

    next();

  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export const authorizeInsurance = (...roles) => {
  return (req, res, next) => {

    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Access denied" });
    }

    next();
  };
};