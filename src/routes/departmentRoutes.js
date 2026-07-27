import express from "express";
import prisma from "../utils/prisma.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


// CREATE DEPARTMENT
router.post("/", protect, async (req, res) => {
  try {
    const {
      name,
      description,
      hospitalId
    } = req.body;

    const department = await prisma.department.create({
      data: {
        name,
        description,
        hospitalId: req.user.hospitalId
      }
    });

    res.json(department);

  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: "Failed to create department"
    });
  }
});


// GET ALL DEPARTMENTS
router.get("/", protect, async (req, res) => {
  try {
    const departments = await prisma.department.findMany({
      where: {
  hospitalId: req.user.hospitalId
},
      include:{

_count:{

select:{

wards:true,

staff:true

}

}

},
      orderBy: {
        createdAt: "desc"
      }
    });

    res.json(departments);

  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: "Failed to fetch departments"
    });
  }
});

router.get("/:id/available-staff", protect, async (req, res) => {

  try {

    const staff = await prisma.staff.findMany({

      where: {

        hospitalId: req.user.hospitalId,

        departmentId: null

      },

      orderBy: {

        firstName: "asc"

      }

    });

    res.json(staff);

  } catch (err) {

    console.log(err);

    res.status(500).json({

      error: "Failed to fetch available staff"

    });

  }

});

router.patch("/:id/assign-staff", protect, async (req, res) => {

  try {

    const { staffId } = req.body;

    const department =
      await prisma.department.findFirst({

        where: {
          id: req.params.id,
          hospitalId: req.user.hospitalId
        }

      });

    if (!department) {

      return res.status(404).json({
        error: "Department not found"
      });

    }

    const targetStaff =
      await prisma.staff.findFirst({

        where: {
          id: staffId,
          hospitalId: req.user.hospitalId
        }

      });

    if (!targetStaff) {

      return res.status(404).json({
        error: "Staff not found"
      });

    }

    const staff = await prisma.staff.update({

      where: {

        id: staffId

      },

      data: {

        departmentId: req.params.id

      }

    });

    res.json(staff);

  } catch (err) {

    console.log(err);

    res.status(500).json({

      error: "Failed to assign staff"

    });

  }

});

router.patch("/:id/remove-staff", protect, async (req, res) => {

  try {

    const { staffId } = req.body;

    const targetStaff =
      await prisma.staff.findFirst({

        where: {
          id: staffId,
          hospitalId: req.user.hospitalId
        }

      });

    if (!targetStaff) {

      return res.status(404).json({
        error: "Staff not found"
      });

    }

    const staff = await prisma.staff.update({

      where: {

        id: staffId

      },

      data: {

        departmentId: null,

        wardId: null

      }

    });

    res.json(staff);

  } catch (err) {

    console.log(err);

    res.status(500).json({

      error: "Failed to remove staff"

    });

  }

});

router.get("/:id", protect, async (req, res) => {
  try {

    const department =
      await prisma.department.findFirst({

        where: {
          id: req.params.id,
          hospitalId: req.user.hospitalId
        },

        include: {

          wards: {

            include: {

              beds: true

            }

          },

          staff: true

        }

      });

    if (!department) {

      return res.status(404).json({
        error: "Department not found"
      });

    }

    res.json(department);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: "Failed to fetch department"
    });

  }
});

router.get("/:id", protect, async (req, res) => {

  try {

    const department = await prisma.department.findFirst({

      where: {

        id: req.params.id,

        hospitalId: req.user.hospitalId

      },

      include: {

        wards: true,

        staff: true

      }

    });

    if (!department) {

      return res.status(404).json({
        error: "Department not found"
      });

    }

    res.json(department);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: "Failed to fetch department"
    });

  }

});

router.patch("/:id", protect, async (req,res)=>{

    try{

        const department =
        await prisma.department.update({

            where:{
                id:req.params.id
            },

            data:{

                name:req.body.name,

                description:req.body.description

            }

        });

        res.json(department);

    }catch(err){

        console.log(err);

        res.status(500).json({

            error:"Failed to update department"

        });

    }

});

router.delete("/:id", protect, async(req,res)=>{

    try{

        const wards =
        await prisma.ward.count({

            where:{

                departmentId:req.params.id

            }

        });

        if(wards>0){

            return res.status(400).json({

                error:"Department still has wards"

            });

        }

        await prisma.department.delete({

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

            error:"Failed to delete department"

        });

    }

});


export default router;