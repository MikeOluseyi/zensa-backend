import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import prisma from "../utils/prisma.js";

import { protectInsurance, authorizeInsurance } from "../middleware/insuranceAuthMiddleware.js";

const router = express.Router();

/*
========================================
LOGIN
========================================
*/

router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    const staff = await prisma.insuranceStaff.findUnique({
      where: { email }
    });

    if (!staff || !staff.isActive) {

      return res.status(401).json({
        error: "Invalid credentials"
      });

    }

    const valid = await bcrypt.compare(password, staff.password);

    if (!valid) {

      return res.status(401).json({
        error: "Invalid credentials"
      });

    }

    const token = jwt.sign(

      {
        id: staff.id,
        role: staff.role,
        scope: "insurance"
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d"
      }

    );

    const provider = await prisma.insuranceProvider.findUnique({

      where: { id: staff.insuranceProviderId },

      include: {
        organization: { select: { name: true } }
      }

    });

    res.json({

      token,

      user: {
        id: staff.id,
        firstName: staff.firstName,
        lastName: staff.lastName,
        email: staff.email,
        role: staff.role,
        insuranceProviderId: staff.insuranceProviderId,
        insuranceProviderName: provider?.organization?.name ?? null
      }

    });

  } catch (err) {

    console.log(err);

    res.status(500).json({ error: "Login failed" });

  }

});

/*
========================================
CREATE INSURANCE STAFF
========================================
*/

router.post(
  "/",
  protectInsurance,
  authorizeInsurance("MANAGER"),

  async (req,res)=>{

    try{

      const{

        firstName,
        lastName,
        email,
        password,
        role

      }=req.body;

      const hashedPassword=
        await bcrypt.hash(password,10);

      const staff=
        await prisma.insuranceStaff.create({

          data:{

            insuranceProviderId:
              req.insuranceProvider.id,

            firstName,

            lastName,

            email,

            password:
              hashedPassword,

            role

          }

        });

      res.json(staff);

    }

    catch(err){

      console.log(err);

      res.status(500).json({

        error:"Unable to create staff"

      });

    }

  }

);



/*
========================================
ALL STAFF
========================================
*/

router.get(

  "/",

  protectInsurance,

  authorizeInsurance("MANAGER"),

  async(req,res)=>{

    try {

      const staff=

        await prisma.insuranceStaff.findMany({

          where:{

            insuranceProviderId:

              req.insuranceProvider.id

          },

          orderBy:{

            firstName:"asc"

          }

        });

      res.json(staff);

    } catch (err) {

      console.log(err);

      res.status(500).json({ error: "Failed to fetch staff" });

    }

  }

);



/*
========================================
DISABLE STAFF
========================================
*/

router.patch(

  "/:id/disable",

  protectInsurance,

  authorizeInsurance("MANAGER"),

  async(req,res)=>{

    try {

      const existing = await prisma.insuranceStaff.findFirst({

        where: {
          id: req.params.id,
          insuranceProviderId: req.insuranceProvider.id
        }

      });

      if (!existing) {
        return res.status(404).json({ error: "Staff not found" });
      }

      const staff=

        await prisma.insuranceStaff.update({

          where:{

            id:req.params.id

          },

          data:{

            isActive:false

          }

        });

      res.json(staff);

    } catch (err) {

      console.log(err);

      res.status(500).json({ error: "Failed to disable staff" });

    }

  }

);

export default router;