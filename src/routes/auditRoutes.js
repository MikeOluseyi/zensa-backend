import express from "express";
import prisma from "../utils/prisma.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import { authorizePermission }
from "../middleware/permissionMiddleware.js";

const router = express.Router();


// GET ALL AUDIT LOGS
router.get(
  "/",
  protect,
  authorize("ADMIN"),

  async (req, res) => {

    try {

      const logs =
        await prisma.auditLog.findMany({

          where: {
            hospitalId: req.user.hospitalId
          },

          include: {
            staff: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                role: true
              }
            }
          },

          orderBy: {
            createdAt: "desc"
          }
        });

      res.json(logs);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error: "Failed to fetch audit logs"
      });

    }
  }
);

export default router;