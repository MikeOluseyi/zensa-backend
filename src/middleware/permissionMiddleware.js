import prisma from "../utils/prisma.js";

export const authorizePermission =
  (...requiredPermissions) => {

    return async (req, res, next) => {

      try {

        // USER MUST EXIST
        if (!req.user) {

          return res.status(401).json({
            error: "Unauthorized"
          });
        }

        // SUPER ADMIN BYPASS
        if (req.user.role === "SUPER_ADMIN") {
          return next();
        }

        // GET USER ROLE PERMISSIONS
        const rolePermissions =
          await prisma.rolePermission.findMany({

            where: {
              role: req.user.role
            },

            include: {
              permission: true
            }
          });

        const userPermissions =
          rolePermissions.map(
            rp => rp.permission.action
          );
          
          console.log(req.user.role);
console.log(userPermissions);
console.log(requiredPermissions);

        // CHECK REQUIRED PERMISSIONS
        const hasPermission =
          requiredPermissions.every(
            permission =>
              userPermissions.includes(permission)
          );

        if (!hasPermission) {

          return res.status(403).json({
            error: "Access denied"
          });
        }

        next();

      } catch (err) {

        console.log(err);

        res.status(500).json({
          error: "Permission check failed"
        });
      }
    };
  };

  export const authorizeInsurancePermission =
  (...requiredPermissions) => {

    return async (req, res, next) => {

      try {

    
        if (!req.user) {
          return res.status(401).json({ error: "Unauthorized" });
        }

        const rolePermissions =
          await prisma.insuranceRolePermission.findMany({

            where: {
              role: req.user.role
            },

            include: {
              permission: true
            }
          });


        const userPermissions =
          rolePermissions.map(
            rp => rp.permission.action
          );

        const hasPermission =
          requiredPermissions.every(
            permission =>
              userPermissions.includes(permission)
          );


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