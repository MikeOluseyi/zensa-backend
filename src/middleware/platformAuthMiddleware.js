import jwt from "jsonwebtoken";
import prisma from "../utils/prisma.js";

export const protectPlatform = async (req, res, next) => {
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

    if (decoded.scope !== "platform") {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const staff = await prisma.platformStaff.findUnique({

      where: { id: decoded.id },

      select: {
        id: true,
        role: true,
        isActive: true
      }

    });

    if (!staff || !staff.isActive) {
      return res.status(401).json({ message: "Account is inactive or no longer exists" });
    }

    req.platformUser = {
      id: staff.id,
      role: staff.role
    };

    next();

  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export const authorizePlatformPermission = (...requiredPermissions) => {
  return async (req, res, next) => {

    try {

      if (!req.platformUser) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const rolePermissions =
        await prisma.platformRolePermission.findMany({

          where: {
            role: req.platformUser.role
          },

          include: {
            permission: true
          }

        });

      const userPermissions =
        rolePermissions.map(rp => rp.permission.action);

      const hasPermission =
        requiredPermissions.every(p => userPermissions.includes(p));

      if (!hasPermission) {
        return res.status(403).json({ error: "Access denied" });
      }

      next();

    } catch (err) {

      console.log(err);

      res.status(500).json({ error: "Permission check failed" });

    }

  };
};