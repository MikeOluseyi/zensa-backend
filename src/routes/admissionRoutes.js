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

import { postCharge } from "../utils/billing/index.js";
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

router.get(
    "/my-patients",
    protect,
    authorize("DOCTOR"),
    async(req,res)=>{

        try{

            const admissions =
                await getDoctorPatients(

                    req.user.id,
                    req.user.hospitalId

                );

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
    authorize("DOCTOR","ADMIN"),
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

export default router;