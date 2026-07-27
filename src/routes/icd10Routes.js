import express from "express";
import prisma from "../utils/prisma.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


// SEARCH ICD10
router.get(
  "/search",
  protect,
  async (req, res) => {

    try {

      const q = req.query.q || "";

      const codes =
        await prisma.iCD10Code.findMany({

          where: {
            OR: [

              {
                code: {
                  contains: q,
                  mode: "insensitive"
                }
              },

              {
                description: {
                  contains: q,
                  mode: "insensitive"
                }
              }
            ]
          },

          take: 20,

          orderBy: {
            code: "asc"
          }
        });

      res.json(codes);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error: "Failed to search ICD10 codes"
      });
    }
  }
);

export default router;