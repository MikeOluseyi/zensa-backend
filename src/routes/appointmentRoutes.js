import express from "express";
import prisma from "../utils/prisma.js";

import {
  staffSafeSelect,
  patientSafeSelect,
  hospitalSafeSelect
} from "../utils/selectors.js";
import { createNotification } from "../utils/notificationService.js";
import { getVisitByAppointment } from "../utils/visitHelpers.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

import {
  authorizePermission
} from "../middleware/permissionMiddleware.js";

const router = express.Router();


// CREATE APPOINTMENT
router.post(
  "/",
  protect,
  authorizePermission("CREATE_APPOINTMENT"),
  async (req, res) => {
    try {

      const {
        patientId,
        departmentId,
        doctorId,
        appointmentDate,
        reason,
        notes
      } = req.body;

      // VERIFY PATIENT
      const patient = await prisma.patient.findFirst({
        where: {
          id: patientId,
          hospitalId: req.user.hospitalId
        }
      });

      if (!patient) {
        return res.status(404).json({
          error: "Patient not found in your hospital"
        });
      }

      // VERIFY DOCTOR
      const doctor = await prisma.staff.findFirst({
        where: {
          id: doctorId,
          hospitalId: req.user.hospitalId,
          role: "DOCTOR"
        }
      });

      if (!doctor) {
        return res.status(404).json({
          error: "Doctor not found in your hospital"
        });
      }

      // VERIFY DEPARTMENT
      let department = null;

if (departmentId) {

  department =
    await prisma.department.findUnique({
      where: {
        id: departmentId
      }
    });

  if (!department) {

    return res.status(404).json({
      error: "Department not found"
    });
  }
}

      const existingAppointment =
  await prisma.appointment.findFirst({

    where: {
      doctorId,
      appointmentDate: new Date(appointmentDate)
    }
  });

if (existingAppointment) {

  return res.status(400).json({
    error: "Doctor already has an appointment at this time"
  });
}

      const appointment = await prisma.appointment.create({
        data: {
          patientId,
          hospitalId: req.user.hospitalId,
          departmentId: departmentId || null,
          doctorId,
          appointmentDate: new Date(appointmentDate),
          reason,
          notes
        },

        include: {
          patient: {
            select: patientSafeSelect
          },

          doctor: {
            select: staffSafeSelect
          },

          department: true
        }
      });
          await createNotification({

  hospitalId: req.user.hospitalId,

  patientId,

  type: "APPOINTMENT",

  title: "Appointment Scheduled",

  message:
    `Your appointment is scheduled for ${appointmentDate}`
});
      res.json(appointment);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error: "Failed to create appointment"
      });

    }
  }
);


// GET ALL APPOINTMENTS
router.get(
  "/",
  protect,
  async (req, res) => {
    try {

      const whereClause = {
        hospitalId: req.user.hospitalId
      };

      if (req.user.role === "DOCTOR") {
        whereClause.doctorId = req.user.id;
      }

      const appointments =
        await prisma.appointment.findMany({

          where: whereClause,

          include: {
            patient: {
              select: patientSafeSelect
            },

            doctor: {
              select: staffSafeSelect
            },

            department: true,

            hospital: {
              select: hospitalSafeSelect
            }
          },

          orderBy: {
            appointmentDate: "desc"
          }
        });

      res.json(appointments);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error: "Failed to fetch appointments"
      });

    }
  }
);

// TODAY QUEUE
router.get(
  "/queue/today",
  protect,
  async (req, res) => {
    try {

      const start = new Date();
      start.setHours(0, 0, 0, 0);

      const end = new Date();
      end.setHours(23, 59, 59, 999);

      const appointments =
        await prisma.appointment.findMany({

          where: {
            hospitalId: req.user.hospitalId,

            appointmentDate: {
              gte: start,
              lte: end
            },

            status: {
   in: [
      "CHECKED_IN",
      "TRIAGED",
      "QUEUED",
      "IN_PROGRESS"
   ]
}
          },

          include: {
            patient: {
              select: patientSafeSelect
            },

            doctor: {
              select: staffSafeSelect
            },

            department: true
          },

          orderBy: {
            appointmentDate: "asc"
          }
        });

      res.json(appointments);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error: "Failed to fetch queue"
      });

    }
  }
);

// MY DOCTOR QUEUE
router.get(
  "/doctor-queue",
  protect,
  authorize("DOCTOR", "ADMIN"),
  async (req, res) => {

    try {

      const whereClause = {
        hospitalId: req.user.hospitalId,

        status: {
          in: [
            "QUEUED",
            "IN_PROGRESS"
          ]
        }
      };

      if (req.user.role === "DOCTOR") {
        whereClause.doctorId = req.user.id;
      }

      const appointments =
        await prisma.appointment.findMany({

          where: whereClause,

          include: {
            patient: {
              select: patientSafeSelect
            }
          },

          orderBy: {
            appointmentDate: "asc"
          }
        });

      res.json(appointments);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error: "Failed to fetch queue"
      });

    }
  }
);

// MY ONGOING CONSULTATIONS (in-progress or awaiting doctor review)
router.get(
  "/my-consultations",
  protect,
  authorize("DOCTOR", "ADMIN"),
  async (req, res) => {

    try {

      const whereClause = {
        hospitalId: req.user.hospitalId,

        status: {
          in: [
            "IN_PROGRESS",
            "READY_FOR_REVIEW"
          ]
        }
      };

      if (req.user.role === "DOCTOR") {
        whereClause.doctorId = req.user.id;
      }

      const appointments =
        await prisma.appointment.findMany({

          where: whereClause,

          include: {
            patient: {
              select: patientSafeSelect
            }
          },

          orderBy: {
            appointmentDate: "asc"
          }
        });

      res.json(appointments);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error: "Failed to fetch ongoing consultations"
      });

    }

  }
);

// GET APPOINTMENTS BY PATIENT
router.get(
  "/patient/:patientId",
  protect,
  async (req, res) => {
    try {

      const appointments =
        await prisma.appointment.findMany({

          where: {
            patientId: req.params.patientId,
            hospitalId: req.user.hospitalId
          },

          include: {
            doctor: {
              select: staffSafeSelect
            },

            department: true
          },

          orderBy: {
            appointmentDate: "desc"
          }
        });

      res.json(appointments);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error: "Failed to fetch patient appointments"
      });

    }
  }
);

// GET APPOINTMENTS BY DOCTOR
router.get(
  "/doctor/:doctorId",
  protect,
  async (req, res) => {
    try {

      const appointments =
        await prisma.appointment.findMany({

          where: {
            doctorId: req.params.doctorId,
            hospitalId: req.user.hospitalId
          },

          include: {
            patient: {
              select: patientSafeSelect
            },

            department: true
          },

          orderBy: {
            appointmentDate: "desc"
          }
        });

      res.json(appointments);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error: "Failed to fetch doctor appointments"
      });

    }
  }
);

// GET SINGLE APPOINTMENT
router.get(
  "/:id",
  protect,
  async (req, res) => {
    try {

      const appointment =
        await prisma.appointment.findFirst({

          where: {
            id: req.params.id,
            hospitalId: req.user.hospitalId
          },

          include: {

  patient: {
    select: patientSafeSelect
  },

  doctor: {
    select: staffSafeSelect
  },

  department: true,

  visit: true
}
        });

      if (!appointment) {
        return res.status(404).json({
          error: "Appointment not found"
        });
      }

      res.json(appointment);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error: "Failed to fetch appointment"
      });

    }
  }
);


router.patch(
  "/:id/checkin",
  protect,
  authorize(
    "RECEPTIONIST",
    "ADMIN",
    "NURSE"
  ),
  async (req, res) => {

    try {

      const appointment =
        await prisma.appointment.findFirst({

          where: {
            id: req.params.id,
            hospitalId: req.user.hospitalId
          }

        });

      if (!appointment) {

        return res.status(404).json({
          error: "Appointment not found"
        });

      }

      let visit =
        await prisma.visit.findFirst({
          where: {
            appointmentId: appointment.id
          }
        });

      if (!visit) {

        visit =
          await prisma.visit.create({

            data: {

              hospitalId: req.user.hospitalId,

              patientId: appointment.patientId,

              appointmentId: appointment.id,

              status: "CHECKED_IN"

            }

          });
      } else {

        visit =
          await prisma.visit.update({

            where: {
              id: visit.id
            },

            data: {
              status: "CHECKED_IN"
            }

          });

      }

      const updatedAppointment =
        await prisma.appointment.update({

          where: {
            id: appointment.id
          },

          data: {
            status: "CHECKED_IN"
          }

        });

      res.json({

        appointment: updatedAppointment,

        visit

      });

    } catch (err) {

      console.log(err);

      res.status(500).json({

        error: "Check-in failed"

      });

    }

  }

);

// TRIAGE UPDATE
router.patch(
  "/:id/triage",
  protect,
  authorizePermission("EDIT_APPOINTMENT"),
  async (req, res) => {

    try {

      const appointment =
        await prisma.appointment.findFirst({

          where: {
            id: req.params.id,
            hospitalId: req.user.hospitalId
          }

        });

      if (!appointment) {

        return res.status(404).json({
          error: "Appointment not found"
        });

      }

      const {

        bloodPressure,
        temperature,
        pulse,
        spo2,
        weight,
        height,

        respiratoryRate,
        painScore,
        bloodSugar,
        bmi,
        headCircumference,
        triageNotes

      } = req.body;

      const visit =
        await prisma.visit.findFirst({

          where: {
            appointmentId: appointment.id
          }

        });

      if (!visit) {

        return res.status(404).json({
          error: "Visit not found"
        });

      }

      const updatedVisit =
        await prisma.visit.update({

          where: {
            id: visit.id
          },

          data: {

            systolicBP:
              bloodPressure
                ? Number(bloodPressure.split("/")[0])
                : null,

            diastolicBP:
              bloodPressure
                ? Number(bloodPressure.split("/")[1])
                : null,

            temperature:
              temperature != null
                ? Number(temperature)
                : null,

            pulse:
              pulse != null
                ? Number(pulse)
                : null,

            spo2:
              spo2 != null
                ? Number(spo2)
                : null,

            weight:
              weight != null
                ? Number(weight)
                : null,

            height:
              height != null
                ? Number(height)
                : null,

            respiratoryRate:
              respiratoryRate != null
                ? Number(respiratoryRate)
                : null,

            painScore:
              painScore != null
                ? Number(painScore)
                : null,

            bloodSugar:
              bloodSugar != null
                ? Number(bloodSugar)
                : null,

            bmi:
              bmi != null
                ? Number(bmi)
                : null,

            headCircumference:
              headCircumference != null
                ? Number(headCircumference)
                : null,

            triageNotes,

            triagedById:
              req.user.id,

            triagedAt:
              new Date(),

            status:
              "TRIAGED"

          }

        });

      await prisma.appointment.update({

        where: {
          id: appointment.id
        },

        data: {

          status:
            "TRIAGED"

        }

      });

      res.json(updatedVisit);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error: "Failed to update triage"
      });

    }

  }
);

router.patch(
  "/:id/queue",
  protect,
  authorize("NURSE", "ADMIN"),
  async (req, res) => {

    try {

      const appointment =
        await prisma.appointment.findFirst({

          where: {
            id: req.params.id,
            hospitalId: req.user.hospitalId
          }

        });

      if (!appointment) {

        return res.status(404).json({
          error: "Appointment not found"
        });

      }

      const visit =
        await getVisitByAppointment(
          appointment.id
        );

      if (visit.status !== "TRIAGED") {

        return res.status(400).json({
          error: "Patient has not been triaged."
        });

      }

      await prisma.visit.update({

        where: {
          id: visit.id
        },

        data: {
          status: "WAITING"
        }

      });

      const updatedAppointment =
        await prisma.appointment.update({

          where: {
            id: appointment.id
          },

          data: {
            status: "QUEUED"
          }

        });

      res.json(updatedAppointment);

    } catch (err) {

      console.log(err);

      res.status(500).json({

        error: "Failed to queue patient"

      });

    }

  }
);

export default router;
