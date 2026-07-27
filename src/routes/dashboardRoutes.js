import express from "express";
import prisma from "../utils/prisma.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


// DASHBOARD SUMMARY
router.get(
  "/summary",
  protect,
  async (req, res) => {

    try {

      const hospitalId = req.user.hospitalId;
      console.log("dashboard user");
      console.log(req.user);

      // TODAY RANGE
      const start = new Date();
      start.setHours(0, 0, 0, 0);

      const end = new Date();
      end.setHours(23, 59, 59, 999);

      // TODAY APPOINTMENTS
      const todayAppointments =
        await prisma.appointment.count({

          where: {
            hospitalId,

            appointmentDate: {
              gte: start,
              lte: end
            }
          }
        });

      // TODAY REVENUE
      const todayPayments =
        await prisma.payment.aggregate({

          _sum: {
            amount: true
          },

          where: {
            createdAt: {
              gte: start,
              lte: end
            },

            invoice: {
              hospitalId
            }
          }
        });

      // TOTAL PATIENTS
      const totalPatients =
        await prisma.patient.count({

          where: {
            hospitalId
          }
        });

      // ACTIVE ADMISSIONS
      const activeAdmissions =
        await prisma.admission.count({

          where: {
            status: "ADMITTED",

            patient: {
              hospitalId
            }
          }
        });

      // OCCUPIED BEDS
      const occupiedBeds =
        await prisma.bed.count({

          where: {
            status: "OCCUPIED",

            ward: {
              hospitalId
            }
          }
        });

      // AVAILABLE BEDS
      const availableBeds =
        await prisma.bed.count({

          where: {
            status: "AVAILABLE",

            ward: {
              hospitalId
            }
          }
        });

      // PENDING INVOICES
      const pendingInvoices =
        await prisma.invoice.count({

          where: {
            hospitalId,

            status: {
              in: [
                "PENDING",
                "PARTIALLY_PAID"
              ]
            }
          }
        });

      // PENDING PRESCRIPTIONS
      const pendingPrescriptions =
        await prisma.prescription.count({

          where: {
            status: "PENDING",

            medicalRecord: {
              patient: {
                hospitalId
              }
            }
          }
        });

      // PENDING LAB REQUESTS
      const pendingLabRequests =
        await prisma.procedureRequest.count({

         where: {

  status: "PENDING",

  visit: {

    patient: {

      hospitalId: req.user.hospitalId

    }

  }

}
        });

      // LOW STOCK ITEMS
      const allInventory =
        await prisma.inventoryItem.findMany({

          where: {
            hospitalId,
            isActive: true
          }

        });

      const lowStockItems =
        allInventory
          .filter(item => item.quantity <= item.reorderLevel)
          .slice(0, 5);

      // ACTIVE CONSULTATIONS
      const activeConsultations =
        await prisma.appointment.count({

          where: {
            hospitalId,
            status: "IN_PROGRESS"
          }
        });

      // TRIAGED WAITING
      const waitingPatients =
        await prisma.appointment.count({

          where: {
            hospitalId,

            status: {
              in: [
                "CHECKED_IN",
                "TRIAGED"
              ]
            }
          }
        });

      res.json({

        todayAppointments,

        todayRevenue:
          todayPayments._sum.amount || 0,

        totalPatients,

        activeAdmissions,

        occupiedBeds,

        availableBeds,

        pendingInvoices,

        pendingPrescriptions,

        pendingLabRequests,

        activeConsultations,

        waitingPatients,

        lowStockItems
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error: "Failed to load dashboard"
      });

    }
  }
);

export default router;