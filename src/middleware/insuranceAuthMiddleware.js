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
        insuranceProviderId: true,
        lastActiveAt: true,
        insuranceProvider: {
          select: {
            organization: {
              select: { isActive: true }
            }
          }
        }
      }

    });

    if (!staff || !staff.isActive) {
      return res.status(401).json({ message: "Account is inactive or no longer exists" });
    }

    if (staff.insuranceProvider?.organization?.isActive === false) {
      return res.status(403).json({
        message: "Access has been suspended for this organization. Contact Zensa support."
      });
    }

    req.user = {
      id: staff.id,
      role: staff.role,
      insuranceProviderId: staff.insuranceProviderId
    };

    req.insuranceProvider = { id: staff.insuranceProviderId };

    const now = Date.now();
    const staleThreshold = 2 * 60 * 1000;

    if (!staff.lastActiveAt || now - new Date(staff.lastActiveAt).getTime() > staleThreshold) {

      prisma.insuranceStaff.update({
        where: { id: staff.id },
        data: { lastActiveAt: new Date() }
      }).catch(() => {});

    }

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