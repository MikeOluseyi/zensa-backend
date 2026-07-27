import express from "express";
import crypto from "crypto";
import bcrypt from "bcrypt";

import prisma from "../utils/prisma.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


// FORGOT PASSWORD
router.post("/forgot-password", async (req, res) => {

  try {

    const { email } = req.body;

    const user =
      await prisma.staff.findUnique({
        where: { email }
      });

    if (!user) {

      return res.status(404).json({
        error: "User not found"
      });
    }

    const token =
      crypto.randomBytes(32).toString("hex");

    const expiresAt =
      new Date(Date.now() + 1000 * 60 * 30);

    await prisma.passwordResetToken.create({

      data: {
        token,
        staffId: user.id,
        expiresAt
      }
    });

    // TODO:
    // send email here

    console.log(
      `RESET TOKEN: ${token}`
    );

    res.json({
      message:
        "Password reset token generated"
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: "Failed to generate reset token"
    });
  }
});


// RESET PASSWORD
router.post("/reset-password", async (req, res) => {

  try {

    const {
      token,
      password
    } = req.body;

    const resetToken =
      await prisma.passwordResetToken.findUnique({

        where: {
          token
        }
      });

    if (!resetToken) {

      return res.status(404).json({
        error: "Invalid token"
      });
    }

    if (
      new Date() > resetToken.expiresAt
    ) {

      return res.status(400).json({
        error: "Token expired"
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    await prisma.staff.update({

      where: {
        id: resetToken.staffId
      },

      data: {
        password: hashedPassword
      }
    });

    await prisma.passwordResetToken.delete({

      where: {
        id: resetToken.id
      }
    });

    res.json({
      message:
        "Password reset successful"
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: "Failed to reset password"
    });
  }
});


// CHANGE PASSWORD
router.patch(
  "/change-password",
  protect,
  async (req, res) => {

    try {

      const {
        currentPassword,
        newPassword
      } = req.body;

      const user =
        await prisma.staff.findUnique({

          where: {
            id: req.user.id
          }
        });

      const valid =
        await bcrypt.compare(
          currentPassword,
          user.password
        );

      if (!valid) {

        return res.status(401).json({
          error:
            "Current password incorrect"
        });
      }

      const hashedPassword =
        await bcrypt.hash(newPassword, 10);

      await prisma.staff.update({

        where: {
          id: req.user.id
        },

        data: {
          password: hashedPassword
        }
      });

      res.json({
        message:
          "Password changed successfully"
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error: "Failed to change password"
      });
    }
  }
);

export default router;