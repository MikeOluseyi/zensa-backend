import express from "express";
import prisma from "../utils/prisma.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import { authorizePermission }
from "../middleware/permissionMiddleware.js";

const router = express.Router();


// CREATE WARD
router.post(
  "/",
  protect,
  authorize("ADMIN"),
  async (req, res) => {
    try {

      const {
        name,
        type,
        departmentId
      } = req.body;

      const ward =
        await prisma.ward.create({

          data: {

            name,

            type,

            departmentId,

            hospitalId: req.user.hospitalId

          }

        });

      res.json(ward);

    } catch (err) {

      console.log(err);

      res.status(500).json({

        error: "Failed to create ward"

      });

    }

  }
);

// CREATE BED
router.post(
  "/:wardId/beds",
  protect,
  authorize("ADMIN"),
  async (req, res) => {

    try {

      const ward =
        await prisma.ward.findFirst({

          where: {
            id: req.params.wardId,
            hospitalId: req.user.hospitalId
          }

        });

      if (!ward) {

        return res.status(404).json({
          error: "Ward not found"
        });

      }

      const bed =
        await prisma.bed.create({

          data: {

            bedNumber: req.body.bedNumber,

            dailyRate:
              req.body.dailyRate
                ? Number(req.body.dailyRate)
                : null,

            wardId: req.params.wardId

          }

        });

      res.json(bed);

    } catch (err) {

      console.log(err);

      res.status(500).json({

        error: "Failed to create bed"

      });

    }

  }
);


// GET ALL WARDS
router.get(
  "/",
  protect,
  async (req, res) => {

    try {

      const wards = await prisma.ward.findMany({

        where: {
          hospitalId: req.user.hospitalId
        },

        include: {
          beds: true,
          department: true
        },

        orderBy: {
          createdAt: "desc"
        }
      });

      res.json(wards);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error: "Failed to fetch wards"
      });

    }
  }
);

router.get(
  "/:id",
  protect,
  async (req, res) => {

    try {

      const ward =
        await prisma.ward.findFirst({

          where: {

            id: req.params.id,

            hospitalId: req.user.hospitalId

          },

          include: {

            department: true,

           beds: {
  include: {
    admissions: {
      where: {
        status: "ADMITTED"
      },
      include: {
        patient: true,
        attendingDoctor: {
          select: {
            firstName: true,
            lastName: true
          }
        }
      },
      take: 1
    }
  }
}

          }

        });

      if (!ward) {

        return res.status(404).json({

          error: "Ward not found"

        });

      }

      res.json(ward);

    } catch (err) {

      console.log(err);

      res.status(500).json({

        error: "Failed to fetch ward"

      });

    }

  }
);

router.patch(
  "/:id",
  protect,
  authorize("ADMIN"),
  async (req,res)=>{

    try{

      const existing =
        await prisma.ward.findFirst({

          where: {
            id: req.params.id,
            hospitalId: req.user.hospitalId
          }

        });

      if (!existing) {

        return res.status(404).json({
          error: "Ward not found"
        });

      }

      const ward =
      await prisma.ward.update({

        where:{
          id:req.params.id
        },

        data:{

          name:req.body.name,

          type:req.body.type,

          departmentId:req.body.departmentId

        }

      });

      res.json(ward);

    }catch(err){

      console.log(err);

      res.status(500).json({

        error:"Failed to update ward"

      });

    }

});

router.delete(
  "/:id",
  protect,
  authorize("ADMIN"),
  async(req,res)=>{

    try{

      const existing =
        await prisma.ward.findFirst({

          where: {
            id: req.params.id,
            hospitalId: req.user.hospitalId
          }

        });

      if (!existing) {

        return res.status(404).json({
          error: "Ward not found"
        });

      }

      const beds =
      await prisma.bed.count({

        where:{
          wardId:req.params.id
        }

      });

      if(beds>0){

        return res.status(400).json({

          error:"Ward still has beds"

        });

      }

      await prisma.ward.delete({

        where:{
          id:req.params.id
        }

      });

      res.json({

        success:true

      });

    }catch(err){

      console.log(err);

      res.status(500).json({

        error:"Failed to delete ward"

      });

    }

});

router.patch(
  "/:id/department",
  protect,
  authorize("ADMIN"),
  async (req, res) => {
    try {

      const existing =
        await prisma.ward.findFirst({

          where: {
            id: req.params.id,
            hospitalId: req.user.hospitalId
          }

        });

      if (!existing) {

        return res.status(404).json({
          error: "Ward not found"
        });

      }

      const ward = await prisma.ward.update({

        where: {
          id: req.params.id
        },

        data: {

          departmentId: req.body.departmentId

        }

      });

      res.json(ward);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error: "Failed to assign department"
      });

    }
  }
);

export default router;