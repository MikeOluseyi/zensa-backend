import express from "express";

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