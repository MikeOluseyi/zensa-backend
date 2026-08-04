import express from "express";
import prisma from "../utils/prisma.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();


/*
==================================================
MASTER SERVICES
==================================================
*/

router.get(
  "/catalog",
  protect,
  async (req, res) => {

    try {

      const search = req.query.search || "";
      const type = req.query.type;

      const services = await prisma.service.findMany({
  where: {
    ...(type && {
      category: type,
    }),

    OR: [
      {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        cpt: {
          code: {
            contains: search,
          },
        },
      },
      {
        cpt: {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
      },
    ],
  },

  include: {
    cpt: true,
  },
});

      res.json(services);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error: "Failed to fetch services"
      });

    }

  }
);



/*
==================================================
HOSPITAL SERVICES
==================================================
*/

// AFTER
router.get(
  "/",
  protect,
  async (req, res) => {
    try {
      const category = req.query.category;
      const visitSetting = req.query.visitSetting;

      const services =
        await prisma.hospitalService.findMany({
          where: {
            hospitalId: req.user.hospitalId,
            ...((category || visitSetting) && {
              service: {
                ...(category && { category }),
                ...(visitSetting && { visitSetting })
              }
            })
          },
          include: { service: { include: { cpt: true } }, department: true },
          orderBy: { createdAt: "desc" }
        });

      res.json(services);
    } catch (err) {

      console.log(err);

      res.status(500).json({

        error:
          "Failed to fetch hospital services"

      });

    }

  }
);



/*
==================================================
ENABLE SERVICE
==================================================
*/

router.post(
  "/",
  protect,
  authorize("ADMIN"),
  async (req, res) => {

    try {

      const {

        serviceId,
        departmentId,
        price

      } = req.body;

      const exists =
        await prisma.hospitalService.findFirst({

          where: {

            hospitalId:
              req.user.hospitalId,

            serviceId

          }

        });

      if (exists) {

        return res.status(400).json({

          error:
            "Service already enabled"

        });

      }

      const masterService =
  await prisma.service.findUnique({

    where: {
      id: serviceId
    }

  });

if (!masterService) {

  return res.status(404).json({

    error: "Service not found"

  });

}

let assignedDepartment = departmentId;

if (masterService.category === "CONSULTATION") {

  assignedDepartment = null;

}

      const service =
        await prisma.hospitalService.create({

          data: {

            hospitalId:
              req.user.hospitalId,

            serviceId,

          departmentId:
  assignedDepartment,

              price

          },

          include: {

            service: {

              include: {

                cpt: true

              }

            },

            department: true

          }

        });

      res.json(service);

    } catch (err) {

      console.log(err);

      res.status(500).json({

        error:
          "Failed to enable service"

      });

    }

  }
);

router.patch(
  "/default-daily-round",
  protect,
  authorize("ADMIN"),
  async (req, res) => {
    try {
      const { hospitalServiceId } = req.body;
      await prisma.hospital.update({
        where: { id: req.user.hospitalId },
        data: { defaultDailyRoundServiceId: hospitalServiceId || null }
      });
      res.json({ success: true });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Failed to set default daily round service" });
    }
  }
);

router.patch(
  "/:id/price",
  protect,
  authorize("ADMIN"),
  async (req, res) => {

    try {

      const service =
        await prisma.hospitalService.update({

          where: {
            id: req.params.id
          },

          data: {
            price: Number(req.body.price)
          },

          include: {

            service: {

              include: {

                cpt: true

              }

            },

            department: true

          }

        });

      res.json(service);

    } catch (err) {

      console.log(err);

      res.status(500).json({

        error: "Failed to update price"

      });

    }

  }
);



/*
==================================================
ASSIGN / CHANGE DEPARTMENT
==================================================
*/

router.patch(
  "/:id/department",
  protect,
  authorize("ADMIN"),
  async (req, res) => {

    try {

      const { departmentId } = req.body;

     const hospitalService =
  await prisma.hospitalService.findFirst({

    where: {
      id: req.params.id,
      hospitalId: req.user.hospitalId
    },

    include: {

      service: true

    }

  });

if (!hospitalService) {

  return res.status(404).json({

    error: "Hospital service not found"

  });

}

if (

  hospitalService.service.category ===
  "CONSULTATION"

) {

  return res.status(400).json({

    error:
      "Consultation services cannot belong to a department."

  });

}

      const service =
        await prisma.hospitalService.update({

          where: {

            id: req.params.id

          },

          data: {

            departmentId

          },

          include: {

            service: {

              include: {

                cpt: true

              }

            },

            department: true

          }

        });

      res.json(service);

    } catch (err) {

      console.log(err);

      res.status(500).json({

        error:
          "Failed to assign department"

      });

    }

  }
);



/*
==================================================
DISABLE SERVICE
==================================================
*/

router.delete(
  "/:id",
  protect,
  authorize("ADMIN"),
  async (req, res) => {

    try {

      await prisma.hospitalService.delete({

        where: {

          id: req.params.id

        }

      });

      res.json({

        success: true

      });

    } catch (err) {

      console.log(err);

      res.status(500).json({

        error:
          "Failed to disable service"

      });

    }

  }
);

export default router;