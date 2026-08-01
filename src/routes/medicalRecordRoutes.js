import express from "express";
import prisma from "../utils/prisma.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizePermission } from "../middleware/permissionMiddleware.js";

import {

  createOrUpdateMedicalRecord,
  getMedicalRecords,
  getMedicalRecord,
  getPatientMedicalRecords,
  getAppointmentMedicalRecord,
  updateMedicalRecord,
  deleteMedicalRecord

} from "../utils/medicalRecordEngine.js";

const router = express.Router();


// ======================================================
// CREATE OR UPDATE
// ======================================================

router.post(
  "/",
  protect,
  authorizePermission("CREATE_CONSULTATION"),
  async (req, res) => {

    try {

      const record =
        await createOrUpdateMedicalRecord({

          ...req.body,

          doctorId: req.user.id,

          hospitalId: req.user.hospitalId

        });

      res.json(record);

    }

    catch (err) {

      console.log(err);

      res.status(500).json({

        error: err.message

      });

    }

  }

);


// ======================================================
// GET ALL
// ======================================================

router.get(
  "/",
  protect,
  authorizePermission("VIEW_MEDICAL_RECORD"),
  async (req, res) => {

    try {

      const records =
        await getMedicalRecords(

          req.user.hospitalId

        );

      res.json(records);

    }

    catch (err) {

      console.log(err);

      res.status(500).json({

        error: err.message

      });

    }

  }

);

// ======================================================
// CLINICAL ANALYTICS
// ======================================================

router.get(
  "/analytics",
  protect,
  authorizePermission("VIEW_MEDICAL_RECORD"),
  async (req, res) => {

    try {

      const { from, to, doctorId, icd10Id, departmentId } = req.query;

      const where = {

        patient: { hospitalId: req.user.hospitalId },

        ...((from || to) && {
          createdAt: {
            ...(from && { gte: new Date(from) }),
            ...(to && { lte: new Date(to) })
          }
        }),

        ...(doctorId && { doctorId }),
        ...(icd10Id && { icd10Id }),
        ...(departmentId && { doctor: { departmentId } })

      };

      const records = await prisma.medicalRecord.findMany({

        where,

        select: {
          createdAt: true,
          icd10: { select: { code: true, description: true } },
          doctor: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              department: { select: { id: true, name: true } }
            }
          },
          services: {
            select: {
              hospitalService: {
                select: { service: { select: { name: true } } }
              }
            }
          },
          prescriptions: {
            select: { medication: true }
          }
        }

      });

      const diagnosisMap = new Map();
      const doctorMap = new Map();
      const departmentMap = new Map();
      const procedureMap = new Map();
      const prescriptionMap = new Map();
      const trendMap = new Map();

      for (const r of records) {

        if (r.icd10) {
          const existing = diagnosisMap.get(r.icd10.code) || { code: r.icd10.code, description: r.icd10.description, count: 0 };
          existing.count++;
          diagnosisMap.set(r.icd10.code, existing);
        }

        if (r.doctor) {

          const existing = doctorMap.get(r.doctor.id) || { id: r.doctor.id, name: `${r.doctor.firstName} ${r.doctor.lastName}`, count: 0 };
          existing.count++;
          doctorMap.set(r.doctor.id, existing);

          if (r.doctor.department) {
            const dExisting = departmentMap.get(r.doctor.department.id) || { id: r.doctor.department.id, name: r.doctor.department.name, count: 0 };
            dExisting.count++;
            departmentMap.set(r.doctor.department.id, dExisting);
          }

        }

        for (const s of r.services) {
          const name = s.hospitalService?.service?.name;
          if (!name) continue;
          const existing = procedureMap.get(name) || { name, count: 0 };
          existing.count++;
          procedureMap.set(name, existing);
        }

        for (const p of r.prescriptions) {
          const existing = prescriptionMap.get(p.medication) || { medication: p.medication, count: 0 };
          existing.count++;
          prescriptionMap.set(p.medication, existing);
        }

        const day = r.createdAt.toISOString().slice(0, 10);
        trendMap.set(day, (trendMap.get(day) || 0) + 1);

      }

      const sortDesc = (arr) => arr.sort((a, b) => b.count - a.count);

      res.json({

        totalConsultations: records.length,

        byDiagnosis: sortDesc([...diagnosisMap.values()]).slice(0, 15),
        byDoctor: sortDesc([...doctorMap.values()]).slice(0, 15),
        byDepartment: sortDesc([...departmentMap.values()]),
        byProcedure: sortDesc([...procedureMap.values()]).slice(0, 15),
        byPrescription: sortDesc([...prescriptionMap.values()]).slice(0, 15),

        trend: [...trendMap.entries()]
          .map(([date, count]) => ({ date, count }))
          .sort((a, b) => a.date.localeCompare(b.date))

      });

    } catch (err) {

      console.log(err);
      res.status(500).json({ error: "Failed to build analytics" });

    }

  }

);


// ======================================================
// GET ONE
// ======================================================

router.get(
  "/:id",
  protect,
  authorizePermission("VIEW_MEDICAL_RECORD"),
  async (req, res) => {

    try {

      const record =
        await getMedicalRecord(

          req.params.id,

          req.user.hospitalId

        );

      res.json(record);

    }

    catch (err) {

      console.log(err);

      res.status(404).json({

        error: err.message

      });

    }

  }

);


// ======================================================
// GET PATIENT RECORDS
// ======================================================

router.get(
  "/patient/:patientId",
  protect,
  authorizePermission("VIEW_MEDICAL_RECORD"),
  async (req, res) => {

    try {

      const records =
        await getPatientMedicalRecords(

          req.params.patientId,

          req.user.hospitalId

        );

      res.json(records);

    }

    catch (err) {

      console.log(err);

      res.status(500).json({

        error: err.message

      });

    }

  }

);


// ======================================================
// GET APPOINTMENT RECORD
// ======================================================

router.get(
  "/appointment/:appointmentId",
  protect,
  authorizePermission("VIEW_MEDICAL_RECORD"),
  async (req, res) => {

    try {

      const record =
        await getAppointmentMedicalRecord(

          req.params.appointmentId,

          req.user.hospitalId

        );

      res.json(record);

    }

    catch (err) {

      console.log(err);

      res.status(404).json({

        error: err.message

      });

    }

  }

);


// ======================================================
// UPDATE
// ======================================================

router.patch(
  "/:id",
  protect,
  authorizePermission("UPDATE_MEDICAL_RECORD"),
  async (req, res) => {

    try {

      const record =
        await updateMedicalRecord(

          req.params.id,

          req.body,

          req.user.hospitalId

        );

      res.json(record);

    }

    catch (err) {

      console.log(err);

      res.status(500).json({

        error: err.message

      });

    }

  }

);


// ======================================================
// DELETE
// ======================================================

router.delete(
  "/:id",
  protect,
  authorizePermission("DELETE_MEDICAL_RECORD"),
  async (req, res) => {

    try {

      await deleteMedicalRecord(

        req.params.id,

        req.user.hospitalId

      );

      res.json({

        success: true

      });

    }

    catch (err) {

      console.log(err);

      res.status(500).json({

        error: err.message

      });

    }

  }

);

export default router;