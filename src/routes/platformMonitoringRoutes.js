import express from "express";
import prisma from "../utils/prisma.js";

import { protectPlatform, authorizePlatformPermission } from "../middleware/platformAuthMiddleware.js";

const router = express.Router();

const ACTIVE_WINDOW_MS = 5 * 60 * 1000; // 5 minutes

function isActiveNow(lastActiveAt) {
  if (!lastActiveAt) return false;
  return Date.now() - new Date(lastActiveAt).getTime() <= ACTIVE_WINDOW_MS;
}

/*
====================================================
PLATFORM OVERVIEW — per-organization summary
====================================================
*/

router.get(
  "/overview",
  protectPlatform,
  authorizePlatformPermission("VIEW_HOSPITAL_ACTIVITY"),
  async (req, res) => {

    try {

      const organizations = await prisma.organization.findMany({

        include: {

          hospitals: {
            include: {
              staff: {
                select: { id: true, lastActiveAt: true, isActive: true }
              }
            }
          },

          wallet: true

        },

        orderBy: { name: "asc" }

      });

      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);

      const overview = await Promise.all(

        organizations.map(async (org) => {

          const allStaff = org.hospitals.flatMap(h => h.staff);

          const activeStaff = allStaff.filter(s => s.isActive);
          const onlineNow = activeStaff.filter(s => isActiveNow(s.lastActiveAt));

          const loginsToday = await prisma.staffLoginLog.count({

            where: {
              hospitalId: { in: org.hospitals.map(h => h.id) },
              createdAt: { gte: startOfDay }
            }

          });

          return {

            id: org.id,

            name: org.name,

            code: org.code,

            isActive: org.isActive,

            hospitalCount: org.hospitals.length,

            staffCount: activeStaff.length,

            onlineNow: onlineNow.length,

            loginsToday,

            walletBalance: org.wallet?.balance ?? 0

          };

        })

      );

      res.json(overview);

    } catch (err) {

      console.log(err);

      res.status(500).json({ error: "Failed to fetch platform overview" });

    }

  }
);

/*
====================================================
ORGANIZATION DETAIL — activity summary
====================================================
*/

router.get(
  "/organizations/:id",
  protectPlatform,
  authorizePlatformPermission("VIEW_HOSPITAL_ACTIVITY"),
  async (req, res) => {

    try {

      const organization = await prisma.organization.findUnique({

        where: { id: req.params.id },

        include: {
          hospitals: true,
          wallet: true
        }

      });

      if (!organization) {
        return res.status(404).json({ error: "Organization not found" });
      }

      const hospitalIds = organization.hospitals.map(h => h.id);

      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);

      const [staff, appointmentsToday, admissionsToday, revenueToday, loginsToday] = await Promise.all([

        prisma.staff.findMany({
          where: { hospitalId: { in: hospitalIds }, isActive: true },
          select: {
            id: true, firstName: true, lastName: true, role: true,
            hospitalId: true, lastActiveAt: true
          }
        }),

        prisma.appointment.count({
          where: { hospitalId: { in: hospitalIds }, createdAt: { gte: startOfDay } }
        }),

        prisma.admission.count({
          where: { patient: { hospitalId: { in: hospitalIds } }, createdAt: { gte: startOfDay } }
        }),

        prisma.charge.aggregate({
          where: {
            hospitalId: { in: hospitalIds },
            status: "POSTED",
            postedAt: { gte: startOfDay }
          },
          _sum: { totalPrice: true }
        }),

        prisma.staffLoginLog.count({
          where: { hospitalId: { in: hospitalIds }, createdAt: { gte: startOfDay } }
        })

      ]);

      const hospitalSummaries = organization.hospitals.map(h => {

        const hospitalStaff = staff.filter(s => s.hospitalId === h.id);
        const onlineNow = hospitalStaff.filter(s => isActiveNow(s.lastActiveAt));

        return {

          id: h.id,

          name: h.name,

          code: h.code,

          staffCount: hospitalStaff.length,

          onlineNow: onlineNow.length

        };

      });

      res.json({

        organization: {
          id: organization.id,
          name: organization.name,
          code: organization.code,
          isActive: organization.isActive,
          walletBalance: organization.wallet?.balance ?? 0
        },

        summary: {

          hospitalCount: organization.hospitals.length,

          staffCount: staff.length,

          onlineNow: staff.filter(s => isActiveNow(s.lastActiveAt)).length,

          loginsToday,

          appointmentsToday,

          admissionsToday,

          revenueToday: revenueToday._sum.totalPrice ?? 0

        },

        hospitals: hospitalSummaries,

        staff: staff.map(s => ({

          id: s.id,

          name: `${s.firstName} ${s.lastName}`,

          role: s.role,

          hospitalId: s.hospitalId,

          online: isActiveNow(s.lastActiveAt),

          lastActiveAt: s.lastActiveAt

        }))

      });

    } catch (err) {

      console.log(err);

      res.status(500).json({ error: "Failed to fetch organization activity" });

    }

  }
);

/*
====================================================
HOSPITAL DETAIL — activity summary
====================================================
*/

router.get(
  "/hospitals/:id",
  protectPlatform,
  authorizePlatformPermission("VIEW_HOSPITAL_ACTIVITY"),
  async (req, res) => {

    try {

      const hospital = await prisma.hospital.findUnique({
        where: { id: req.params.id }
      });

      if (!hospital) {
        return res.status(404).json({ error: "Hospital not found" });
      }

      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);

      const [staff, appointmentsToday, admissionsToday, revenueToday, lowStockCount] = await Promise.all([

        prisma.staff.findMany({
          where: { hospitalId: hospital.id, isActive: true },
          select: { id: true, firstName: true, lastName: true, role: true, lastActiveAt: true }
        }),

        prisma.appointment.count({
          where: { hospitalId: hospital.id, createdAt: { gte: startOfDay } }
        }),

        prisma.admission.count({
          where: { patient: { hospitalId: hospital.id }, createdAt: { gte: startOfDay } }
        }),

        prisma.charge.aggregate({
          where: { hospitalId: hospital.id, status: "POSTED", postedAt: { gte: startOfDay } },
          _sum: { totalPrice: true }
        }),

        prisma.inventoryItem.count({
          where: { hospitalId: hospital.id, isActive: true }
        })

      ]);

      res.json({

        hospital: {
          id: hospital.id,
          name: hospital.name,
          code: hospital.code
        },

        summary: {

          staffCount: staff.length,

          onlineNow: staff.filter(s => isActiveNow(s.lastActiveAt)).length,

          appointmentsToday,

          admissionsToday,

          revenueToday: revenueToday._sum.totalPrice ?? 0

        },

        staff: staff.map(s => ({

          id: s.id,

          name: `${s.firstName} ${s.lastName}`,

          role: s.role,

          online: isActiveNow(s.lastActiveAt),

          lastActiveAt: s.lastActiveAt

        }))

      });

    } catch (err) {

      console.log(err);

      res.status(500).json({ error: "Failed to fetch hospital activity" });

    }

  }
);

export default router;