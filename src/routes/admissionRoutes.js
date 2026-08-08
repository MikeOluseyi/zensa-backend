import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import prisma from "../utils/prisma.js";
import { authorizePermission } from "../middleware/permissionMiddleware.js";
import {
    admitPatient,
    orderDischarge,
    confirmDischarge,
    transferPatient,
    changeAttendingDoctor,
    getAdmission,
    getAdmissions,
    getWardPatients,
    getDoctorPatients
} from "../utils/admissionServices.js";
import { ensureDailyRound, getTodayRoundStatus } from "../utils/admissionRoundEngine.js";
import { createCharge, postCharge } from "../utils/billing/index.js";
import { createMedicalRecordService } from "../utils/serviceEngine.js";

const router = express.Router();

router.post(
    "/",
    protect,
    authorize("DOCTOR","ADMIN","NURSE"),
    async (req,res)=>{

        try{

            const { patientId, bedId, attendingDoctorId, reason } = req.body;

            const patient = await prisma.patient.findFirst({
                where: { id: patientId, hospitalId: req.user.hospitalId }
            });

            if (!patient) {
                return res.status(404).json({ error: "Patient not found" });
            }

            const visit = await prisma.visit.create({
                data: {
                    hospitalId: req.user.hospitalId,
                    patientId,
                    status: "ADMITTED"
                }
            });

            const admission =
                await admitPatient({

                    visitId: visit.id,

                    bedId,

                    attendingDoctorId,

                    reason,

                    requestUser: {
                        id: req.user.id,
                        hospitalId: req.user.hospitalId
                    }

                });

            res.json(admission);


        }catch(err){

            console.log(err);

            res.status(500).json({

                error:
                    err.message || "Admission failed"

            });

        }

    }
);

router.post(
    "/",
    protect,
    authorize("DOCTOR","ADMIN","NURSE"),
    async (req,res)=>{

        try{

            const admission =
                await admitPatient({

                    ...req.body,

                    hospitalId:
                        req.user.hospitalId,

                    admittedById:
                        req.user.id

                });

            res.json(admission);


        }catch(err){

            console.log(err);

            res.status(500).json({

                error:
                    err.message || "Admission failed"

            });

        }

    }
);

router.get(
    "/",
    protect,
    authorize("ADMIN"),
    async(req,res)=>{

        try{

            const admissions =
                await getAdmissions({

                    hospitalId: req.user.hospitalId

                });

            res.json(admissions);

        }catch(err){

            console.log(err);

            res.status(500).json({

                error:
                    "Failed to fetch admissions"

            });

        }

    }
);

// AFTER
router.get(
    "/my-patients",
    protect,
    authorize("DOCTOR"),
    async(req,res)=>{

        try{

            const admissions =
                await getDoctorPatients({

                    doctorId: req.user.id,
                    hospitalId: req.user.hospitalId

                });

            res.json(admissions);

        }catch(err){

            console.log(err);

            res.status(500).json({

                error:
                    "Failed to fetch patients"

            });

        }

    }
);

router.get(
    "/ward-patients",
    protect,
    authorize("NURSE","ADMIN"),
    async(req,res)=>{

        try{

            const admissions =
                await getWardPatients({

                    departmentId: req.user.departmentId,
                    hospitalId: req.user.hospitalId

        });

            res.json(admissions);

        }catch(err){

            console.log(err);

            res.status(500).json({

                error:
                    "Failed to fetch ward patients"

            });

        }

    }
);

router.post(
  "/:id/daily-round",
  protect,
  authorize("DOCTOR", "ADMIN"),
  async (req, res) => {
    try {
      const round = await ensureDailyRound({
        admissionId: req.params.id,
        hospitalId: req.user.hospitalId,
        staffId: req.user.id,
        hospitalServiceId: req.body.hospitalServiceId || null
      });
      res.json(round);
    } catch (err) {
      console.log(err);
      const status = err.message === "ROUND_SERVICE_REQUIRED" ? 400 : err.message === "ADMISSION_NOT_FOUND" ? 404 : 500;
      res.status(status).json({ error: err.message, code: err.message });
    }
  }
);

router.get(
  "/:id/daily-round-status",
  protect,
  async (req, res) => {
    try {
      const status = await getTodayRoundStatus({
        admissionId: req.params.id,
        hospitalId: req.user.hospitalId
      });
      res.json(status);
    } catch (err) {
      console.log(err);
      res.status(err.message === "ADMISSION_NOT_FOUND" ? 404 : 500).json({ error: err.message });
    }
  }
);

// AFTER
router.get(
    "/:id",
    protect,
    async (req, res) => {

        try {

            const admission =
                await getAdmission({
                    admissionId: req.params.id,
                    hospitalId: req.user.hospitalId
                });

            if (!admission) {

                return res.status(404).json({
                    error: "Admission not found"
                });

            }

            const isAdmin = req.user.role === "ADMIN";

            const isAttendingDoctor =
                req.user.role === "DOCTOR" &&
                admission.attendingDoctor?.id === req.user.id;

            // A doctor with no attending doctor yet can still view it,
            // so they can pick it up via the assign-doctor flow.
            const isUnassignedAdmission =
                req.user.role === "DOCTOR" &&
                !admission.attendingDoctor;

            const isDepartmentNurse =
                req.user.role === "NURSE" &&
                req.user.departmentId &&
                req.user.departmentId === admission.bed?.ward?.departmentId;

            const hasAccess =
                isAdmin ||
                isAttendingDoctor ||
                isUnassignedAdmission ||
                isDepartmentNurse;

            if (!hasAccess) {

                return res.status(403).json({
                    error: "You do not have access to this admission."
                });

            }

            res.json(admission);

        } catch (err) {

            console.log(err);

            res.status(500).json({

                error:
                    "Failed to fetch admission"

            });

        }

    }
);

router.patch(
    "/:id/transfer",
    protect,
    authorize("DOCTOR","ADMIN","NURSE"),
    async(req,res)=>{

        try{

            const admission =
                await transferPatient({

                    admissionId:
                        req.params.id,

                    hospitalId:
                        req.user.hospitalId,

                    transferredById:
                        req.user.id,

                    ...req.body

                });

            res.json(admission);

        }catch(err){

            console.log(err);

            res.status(500).json({

                error:
                    err.message

            });

        }

    }
);

router.patch(
    "/:id/change-doctor",
    protect,
    authorize("DOCTOR","ADMIN", "NURSE"),
    async(req,res)=>{

        try{

            const admission =
                await changeAttendingDoctor({

                    admissionId:
                        req.params.id,

                    hospitalId:
                        req.user.hospitalId,

                    changedById:
                        req.user.id,

                    ...req.body

                });

            res.json(admission);

        }catch(err){

            console.log(err);

            res.status(500).json({

                error:
                    err.message

            });

        }

    }
);


// AFTER
router.patch(
    "/:id/order-discharge",
    protect,
    authorize("DOCTOR","ADMIN"),
    async(req,res)=>{

        try{

            const admission =
                await orderDischarge({

                    admissionId: req.params.id,

                    instructions: req.body.instructions,

                    requestUser: {
                        id: req.user.id,
                        hospitalId: req.user.hospitalId
                    }

                });

            res.json(admission);

        }catch(err){

            console.log(err);

            const status =
                err.message === "ADMISSION_NOT_FOUND" ? 404 :
                err.message === "DISCHARGE_ALREADY_IN_PROGRESS" ? 400 :
                500;

            res.status(status).json({

                error:
                    err.message === "ADMISSION_NOT_FOUND" ? "Admission not found" :
                    err.message === "DISCHARGE_ALREADY_IN_PROGRESS" ? "Discharge has already been ordered or completed for this admission." :
                    "Failed to order discharge"

            });

        }

    }
);

router.patch(
    "/:id/confirm-discharge",
    protect,
    authorize("NURSE","ADMIN"),
    async(req,res)=>{

        try{

            const admission =
                await confirmDischarge({

                    admissionId: req.params.id,

                    requestUser: {
                        id: req.user.id,
                        hospitalId: req.user.hospitalId
                    }

                });

            res.json(admission);

        }catch(err){

            console.log(err);

            const status =
                err.message === "ADMISSION_NOT_FOUND" ? 404 :
                err.message === "DISCHARGE_NOT_ORDERED" ? 400 :
                500;

            res.status(status).json({

                error:
                    err.message === "ADMISSION_NOT_FOUND" ? "Admission not found" :
                    err.message === "DISCHARGE_NOT_ORDERED" ? "A discharge must be ordered by a doctor before it can be confirmed." :
                    "Failed to confirm discharge"

            });

        }

    }
);

router.post(
  "/:id/discharge-medications",
  protect,
  authorize("DOCTOR"),
  async (req, res) => {
    try {

      const { inventoryItemId, dosage, frequency, duration, quantity, instructions } = req.body;

      const admission = await prisma.admission.findFirst({
        where: { id: req.params.id, patient: { hospitalId: req.user.hospitalId } }
      });

      if (!admission) return res.status(404).json({ error: "Admission not found" });

      const prescription = await prisma.$transaction(async (tx) => {

        let medicalRecordId = admission.medicalRecordId;

        if (!medicalRecordId) {
          const record = await tx.medicalRecord.create({
            data: { patientId: admission.patientId, visitId: admission.visitId, doctorId: req.user.id, status: "FINAL" }
          });
          medicalRecordId = record.id;
          await tx.admission.update({ where: { id: admission.id }, data: { medicalRecordId } });
        }

        const inventoryItem = await tx.inventoryItem.findFirst({
          where: { id: inventoryItemId, hospitalId: req.user.hospitalId }
        });

        if (!inventoryItem) throw new Error("MEDICATION_NOT_FOUND");
        if (inventoryItem.sellingPrice == null) throw new Error(`${inventoryItem.name} has no selling price configured.`);

        const created = await tx.prescription.create({
          data: {
            medicalRecordId,
            visitId: admission.visitId,
            medication: inventoryItem.name,
            dosage, frequency, duration,
            quantity: Number(quantity),
            saleUnit: inventoryItem.saleUnit,
            inventoryItemId,
            instructions,
            prescribedById: req.user.id
          }
        });

        await createCharge({
          tx,
          patientId: admission.patientId,
          visitId: admission.visitId,
          hospitalId: req.user.hospitalId,
          hospitalServiceId: null,
          serviceId: null,
          quantity: Number(quantity),
          unitPrice: inventoryItem.sellingPrice,
          description: `${inventoryItem.name} (Discharge Rx)`,
          sourceType: "MEDICATION",
          sourceId: created.id,
          createdById: req.user.id
        });

        return created;

      });

      res.json(prescription);

    } catch (err) {
      console.log(err);
      const status = err.message === "MEDICATION_NOT_FOUND" ? 404 : 400;
      res.status(status).json({ error: err.message || "Failed to prescribe discharge medication" });
    }
  }
);

router.get(
  "/:id/discharge-medications",
  protect,
  async (req, res) => {
    try {
      const admission = await prisma.admission.findFirst({
        where: { id: req.params.id, patient: { hospitalId: req.user.hospitalId } }
      });
      if (!admission || !admission.medicalRecordId) return res.json([]);

      const prescriptions = await prisma.prescription.findMany({
        where: { medicalRecordId: admission.medicalRecordId },
        include: { inventoryItem: true, prescribedBy: { select: { firstName: true, lastName: true } } },
        orderBy: { createdAt: "desc" }
      });
      res.json(prescriptions);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Failed to fetch discharge medications" });
    }
  }
);

export default router;