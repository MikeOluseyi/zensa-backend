import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../utils/prisma.js";
import { staffSafeSelect } from "../utils/selectors.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import { authorizePermission } from "../middleware/permissionMiddleware.js";
import { protectPlatform, authorizePlatformPermission } from "../middleware/platformAuthMiddleware.js";

const router = express.Router();

router.post(
  "/register",
  protect,
  authorize("ADMIN"),
  async (req, res) => {

    try {

      const {
        firstName,
        lastName,
        email,
        password,
        role,
        phone
      } = req.body;

      // Force hospital from logged-in user
      const hospitalId = req.user.hospitalId;

      // DEBUG CHECK
      const hospitalCheck =
        await prisma.hospital.findUnique({

          where: {
            id: hospitalId
          }
        });

      console.log("HOSPITAL CHECK:");
      console.log(hospitalCheck);

      const existing =
        await prisma.staff.findUnique({

          where: {
            email
          }
        });

      if (existing) {

        return res.status(400).json({
          error: "Email already exists"
        });
      }

      const hashedPassword =
        await bcrypt.hash(password, 10);

      const staff =
        await prisma.staff.create({

          data: {
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role,
            phone,
            hospitalId
          },

          select: staffSafeSelect
        });

      res.json(staff);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error: "Registration failed"
      });
    }
  }
);

// LOGIN
// LOGIN MUST NOT USE protect
router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    const staff = await prisma.staff.findUnique({
      where: {
        email
      }
    });

    if (!staff) {

      return res.status(401).json({
        error: "Invalid credentials"
      });
    }

    if (!staff.isActive) {

      return res.status(401).json({
        error: "Invalid credentials"
      });
    }

    const valid = await bcrypt.compare(
      password,
      staff.password
    );

    if (!valid) {

      return res.status(401).json({
        error: "Invalid credentials"
      });
    }

    await prisma.staffLoginLog.create({

      data: {

        staffId: staff.id,

        hospitalId: staff.hospitalId,

        ipAddress: req.ip,

        userAgent: req.headers["user-agent"] ?? null

      }

    });

    const token = jwt.sign(
      {
        id: staff.id,
        role: staff.role,
        hospitalId: staff.hospitalId,
        departmentId: staff.departmentId,
        scope: "hospital"
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    res.json({
      token,

      user: {
        id: staff.id,
        firstName: staff.firstName,
        lastName: staff.lastName,
        email: staff.email,
        role: staff.role,
        hospitalId: staff.hospitalId,
        departmentId: staff.departmentId
      }
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: "Login failed"
    });

  }
});

router.get(
  "/profile",
  protect,
  async (req, res) => {

    try {

      const staff =
        await prisma.staff.findUnique({

          where: {
            id: req.user.id
          },

          select: staffSafeSelect
        });

      res.json(staff);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error:
          "Failed to fetch profile"
      });
    }
  }
);

router.patch(
  "/profile",
  protect,
  async (req, res) => {

    try {

      const {
        phone,
        address,
        maritalStatus,
        nextOfKin,
        nextOfKinPhone,
        specialization,
        licenseNumber
      } = req.body;

      const updated =
        await prisma.staff.update({

          where: {
            id: req.user.id
          },

          data: {
            phone,
            address,
            maritalStatus,
            nextOfKin,
            nextOfKinPhone,
            specialization,
            licenseNumber
          },

          select: staffSafeSelect
        });

      res.json(updated);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error:
          "Failed to update profile"
      });
    }
  }
);

// GET ALL STAFF
router.get(
  "/",
  protect,
  async (req, res) => {

    try {

      const where = {
  hospitalId: req.user.hospitalId
};

if (req.query.role) {
  where.role = req.query.role;
}

const staff =
  await prisma.staff.findMany({

          where,

          select: staffSafeSelect,

          orderBy: {
            firstName: "asc"
          }
        });

      res.json(staff);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error: "Failed to fetch staff"
      });
    }
  }
);

// GET DOCTORS ONLY
router.get(
  "/doctors",
  protect,
  async (req, res) => {

    try {

      const doctors =
        await prisma.staff.findMany({

          where: {
            hospitalId: req.user.hospitalId,
            role: "DOCTOR"
          },

          select: staffSafeSelect
        });

      res.json(doctors);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error: "Failed to fetch doctors"
      });
    }
  }
);

const STAFF_UPDATABLE_FIELDS = [
  "firstName", "lastName", "phone", "address",
  "maritalStatus", "nextOfKinName", "nextOfKinPhone",
  "specialization", "licenseNumber"
];

function pickStaffUpdateFields(body = {}) {

  const data = {};

  for (const field of STAFF_UPDATABLE_FIELDS) {

    if (body[field] !== undefined) {
      data[field] = body[field];
    }

  }

  return data;

}

// UPDATE STAFF
router.patch(
  "/:id",
  protect,
  authorize("ADMIN"),
  async (req, res) => {

    try {

      const existing =
        await prisma.staff.findFirst({

          where: {
            id: req.params.id,
            hospitalId: req.user.hospitalId
          }

        });

      if (!existing) {

        return res.status(404).json({
          error: "Staff not found"
        });

      }

      const data = pickStaffUpdateFields(req.body);

      const updated =
        await prisma.staff.update({

          where: {
            id: req.params.id
          },

          data,

          select: staffSafeSelect
        });

      res.json(updated);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error: "Failed to update staff"
      });
    }
  }
);

// LOGIN / SESSION HISTORY
router.get(
  "/login-logs",
  protect,
  authorize("ADMIN"),
  async (req, res) => {

    try {

      const { staffId } = req.query;

      const logs = await prisma.staffLoginLog.findMany({

        where: {

          hospitalId: req.user.hospitalId,

          ...(staffId && { staffId })

        },

        include: {

          staff: {
            select: {
              firstName: true,
              lastName: true,
              role: true,
              email: true
            }
          }

        },

        orderBy: {
          createdAt: "desc"
        },

        take: 200

      });

      res.json(logs);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error: "Failed to fetch login logs"
      });

    }

  }
);

router.get(
  "/:id",
  protect,
  async (req, res) => {

    try {

      const staff =
        await prisma.staff.findFirst({

          where: {
            id: req.params.id,
            hospitalId:
              req.user.hospitalId
          },

          select:
            staffSafeSelect
        });

      if (!staff) {

        return res.status(404).json({
          error: "Staff not found"
        });
      }

      res.json(staff);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error:
          "Failed to fetch staff"
      });
    }
  }
);

router.patch(
  "/:id/department",
  protect,
  authorize("ADMIN"),
  async (req, res) => {

    try {

      const { departmentId } = req.body;

      const existing =
        await prisma.staff.findFirst({

          where: {
            id: req.params.id,
            hospitalId: req.user.hospitalId
          }

        });

      if (!existing) {

        return res.status(404).json({
          error: "Staff not found"
        });

      }

      if (
        existing.departmentId &&
        existing.departmentId !== departmentId &&
        existing.role !== "ADMIN"
      ) {

        return res.status(400).json({
          error: "Staff already belongs to another department"
        });

      }

      if (departmentId) {

        const department =
          await prisma.department.findFirst({

            where: {
              id: departmentId,
              hospitalId: req.user.hospitalId
            }

          });

        if (!department) {

          return res.status(404).json({
            error: "Department not found"
          });

        }

      }

      const staff =
        await prisma.staff.update({

          where: {

            id: req.params.id

          },

          data: {

            departmentId,

            wardId: null

          },

          select: staffSafeSelect

        });

      res.json(staff);

    } catch (err) {

      console.log(err);

      res.status(500).json({

        error: "Failed to assign department"

      });

    }

  }
);

router.patch(
  "/:id/remove-department",
  protect,
  authorize("ADMIN"),
  async (req, res) => {

    try {

      const existing =
        await prisma.staff.findFirst({

          where: {
            id: req.params.id,
            hospitalId: req.user.hospitalId
          }

        });

      if (!existing) {

        return res.status(404).json({
          error: "Staff not found"
        });

      }

      const staff =
        await prisma.staff.update({

          where: {

            id: req.params.id

          },

          data: {

            departmentId: null,

            wardId: null

          },

          select: staffSafeSelect

        });

      res.json(staff);

    } catch (err) {

      console.log(err);

      res.status(500).json({

        error: "Failed to remove department"

      });

    }

  }
);

// PLATFORM-ONLY: BOOTSTRAP FIRST ADMIN FOR A HOSPITAL
router.post(
  "/platform/bootstrap-admin",
  protectPlatform,
  authorizePlatformPermission("CREATE_ORGANIZATION"),
  async (req, res) => {

    try {

      const {
        hospitalId,
        firstName,
        lastName,
        email,
        password,
        phone
      } = req.body;

      const hospital = await prisma.hospital.findUnique({
        where: { id: hospitalId }
      });

      if (!hospital) {
        return res.status(404).json({ error: "Hospital not found" });
      }

      const existing = await prisma.staff.findUnique({
        where: { email }
      });

      if (existing) {
        return res.status(400).json({ error: "Email already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const staff = await prisma.staff.create({

        data: {
          firstName,
          lastName,
          email,
          password: hashedPassword,
          role: "ADMIN",
          phone,
          hospitalId,
          isActive: true
        },

        select: staffSafeSelect

      });

      res.json(staff);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error: "Failed to create hospital admin"
      });

    }

  }
);

export default router;