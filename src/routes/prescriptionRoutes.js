import express from "express";

import prisma from "../utils/prisma.js";

import {

    createPrescription,
    updatePrescription,
    deletePrescription

} from "../utils/prescriptionEngine.js";

import { createAuditLog } from "../utils/auditService.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import { authorizePermission } from "../middleware/permissionMiddleware.js";

const router = express.Router();



/*
========================================
CREATE
========================================
*/

router.post(

    "/",

    protect,

    authorize("DOCTOR", "ADMIN"),

    authorizePermission("CREATE_PRESCRIPTION"),

    async (req, res) => {

        try {

            const {

                visitId,

                inventoryItemId,

                dosage,

                frequency,

                duration,

                quantity,

                instructions

            } = req.body;

           const visit =
    await prisma.visit.findUnique({

        where: {

            id: visitId

        },

        include: {

            medicalRecord: true,

            patient: true

        }

    });

            if (!visit)
                throw new Error("Visit not found.");

            if (!visit.medicalRecordId) {

    throw new Error(

        "Medical record must exist before prescribing."

    );

}

            const prescription =
                await createPrescription({

                    medicalRecordId:
                        visit.medicalRecord?.id,

                    visitId,

                    patientId:
                        visit.patientId,

                    hospitalId:
                        req.user.hospitalId,

                    inventoryItemId,

                    dosage,

                    frequency,

                    duration,

                    quantity,

                    instructions,

                    prescribedById:
                        req.user.id

                });

            await createAuditLog({

                hospitalId:
                    req.user.hospitalId,

                staffId:
                    req.user.id,

                action:
                    "CREATE_PRESCRIPTION",

                entity:
                    "PRESCRIPTION",

                entityId:
                    prescription.id,

                details:
                    prescription.medication

            });

            res.json(prescription);

        }

        catch (err) {

            console.log(err);

            res.status(500).json({

                error: err.message

            });

        }

    }

);



/*
========================================
UPDATE
========================================
*/

router.patch(

    "/:id",

    protect,

    authorize("DOCTOR", "ADMIN"),

    authorizePermission("EDIT_PRESCRIPTION"),

    async (req, res) => {

        try {

            const prescription =
                await updatePrescription({

                    prescriptionId:
                        req.params.id,

                    updates:
                        req.body

                });

            res.json(prescription);

        } catch (err) {

            console.log(err);

            res.status(400).json({

                error: err.message

            });

        }

    }

);



router.delete(

    "/:id",

    protect,

    authorize("DOCTOR", "ADMIN"),

    authorizePermission("DELETE_PRESCRIPTION"),

    async (req, res) => {

        try {

            await deletePrescription(

                req.params.id

            );

            res.json({

                message:
                    "Deleted"

            });

        } catch (err) {

            console.log(err);

            res.status(400).json({

                error: err.message

            });

        }

    }

);

/*
========================================
LIST PRESCRIPTIONS FOR VISIT
========================================
*/

router.get(

    "/visit/:visitId",

    protect,

    async (req, res) => {

        try {

            const prescriptions =
                await prisma.prescription.findMany({

                    where: {

                        visitId:
                            req.params.visitId

                    },

                    include: {

                        inventoryItem: true,

                        prescribedBy: {

                            select: {

                                firstName: true,

                                lastName: true

                            }

                        }

                    },

                    orderBy: {

                        createdAt: "asc"

                    }

                });

            res.json(prescriptions);

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
