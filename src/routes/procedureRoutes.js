import express from "express";

import prisma from "../utils/prisma.js";

import {

    updateProcedureRequest,
    cancelProcedureRequest

} from "../utils/procedureEngine.js";

import { createMedicalRecordService } from "../utils/serviceEngine.js";

import { saveProcedureResult } from "../utils/procedureResultsEngine.js";

import { createAuditLog } from "../utils/auditService.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import { authorizePermission } from "../middleware/permissionMiddleware.js";

const router = express.Router();


async function getScopedProcedureRequest(id, hospitalId) {

    return prisma.procedureRequest.findFirst({

        where: {

            id,

            OR: [

                { visit: { patient: { hospitalId } } },

                { medicalRecordService: { medicalRecord: { patient: { hospitalId } } } }

            ]

        }

    });

}


/*
==================================================
ORDER PROCEDURE (mid-visit, ad hoc)
==================================================
*/

router.post(

    "/",

    protect,

    authorize("DOCTOR", "ADMIN"),

    authorizePermission("ORDER_PROCEDURE"),

    async (req, res) => {

        try {

            const {

                visitId,

                hospitalServiceId,

                notes

            } = req.body;

          // AFTER
const visit = await prisma.visit.findFirst({

  where: {
    id: visitId,
    patient: { hospitalId: req.user.hospitalId }
  }

});

if (!visit)
  throw new Error("Visit not found.");

const medicalRecord = await prisma.medicalRecord.findUnique({
  where: { visitId: visit.id }
});

if (!medicalRecord)
  throw new Error("Medical record must exist before ordering a procedure.");

const medicalRecordService =
  await prisma.$transaction(async (tx) => {

    return createMedicalRecordService({

      tx,

      medicalRecordId: medicalRecord.id,

      visitId: visit.id,

      patientId: visit.patientId,

      hospitalId: req.user.hospitalId,

      hospitalServiceId,

      orderedById: req.user.id,

      notes

    });

  });

            const result =
                await prisma.medicalRecordService.findUnique({

                    where: {
                        id: medicalRecordService.id
                    },

                    include: {

                        hospitalService: {

                            include: {

                                service: {

                                    include: {

                                        cpt: true

                                    }

                                }

                            }

                        },

                        procedureRequest: true

                    }

                });

            await createAuditLog({

                hospitalId:
                    req.user.hospitalId,

                staffId:
                    req.user.id,

                action:
                    "ORDER_PROCEDURE",

                entity:
                    "PROCEDURE",

                entityId:
                    medicalRecordService.id,

                details:
                    result.hospitalService.service.name

            });

            res.json(result);

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
==================================================
UPDATE PROCEDURE (notes only)
==================================================
*/

router.patch(

    "/:id",

    protect,

    authorize("DOCTOR", "ADMIN"),

    authorizePermission("EDIT_PROCEDURE"),

    async (req, res) => {

        try {

            const existing =
                await getScopedProcedureRequest(req.params.id, req.user.hospitalId);

            if (!existing) {

                return res.status(404).json({
                    error: "Procedure not found"
                });

            }

            const procedure =
                await updateProcedureRequest({

                    procedureId:
                        req.params.id,

                    updates: {
                        notes: req.body.notes
                    }

                });

            res.json(procedure);

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
==================================================
SAVE PROCEDURE RESULT
==================================================
*/

router.post(

  "/:id/result",

  protect,

  authorize(

    "LAB_TECH",

    "RADIOLOGY",

    "ADMIN"

  ),

  authorizePermission("SAVE_PROCEDURE_RESULT"),

  async (req, res) => {

    try {

      const existing =
        await getScopedProcedureRequest(req.params.id, req.user.hospitalId);

      if (!existing) {

        return res.status(404).json({
          error: "Procedure not found"
        });

      }

      const result =
        await saveProcedureResult({

          procedureRequestId:
            req.params.id,

          results:
            req.body.results,

          notes:
            req.body.notes,

          performedById:
            req.user.id

        });

      res.json(result);

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
==================================================
CANCEL PROCEDURE
==================================================
*/

router.patch(

    "/:id/cancel",

    protect,

    authorize("DOCTOR", "ADMIN"),

    authorizePermission("CANCEL_PROCEDURE"),

    async (req, res) => {

        try {

            const existing =
                await getScopedProcedureRequest(req.params.id, req.user.hospitalId);

            if (!existing) {

                return res.status(404).json({
                    error: "Procedure not found"
                });

            }

            if (existing.status === "CANCELLED") {

                return res.status(400).json({
                    error: "Procedure already cancelled"
                });

            }

            if (existing.status === "COMPLETED") {

                return res.status(400).json({
                    error: "Cannot cancel a completed procedure"
                });

            }

            const procedure =
                await cancelProcedureRequest({

                    procedureId:
                        req.params.id,

                    cancelledById:
                        req.user.id

                });

            res.json(procedure);

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
==================================================
PENDING PROCEDURES (lab/radiology queue)
==================================================
*/

router.get(

    "/pending",

    protect,

    authorize("LAB_TECH", "RADIOLOGY", "ADMIN"),

    authorizePermission("VIEW_PROCEDURES"),

    async (req, res) => {

        try {

            const procedures =
                await prisma.procedureRequest.findMany({

                    where: {

                        status: "PENDING",

                        medicalRecordService: {

                            medicalRecord: {

                                patient: {
                                    hospitalId: req.user.hospitalId
                                }

                            }

                        }

                    },

                    include: {

                        medicalRecordService: {

                            include: {

                                hospitalService: {

                                    include: {

                                        service: {

                                            include: {

                                                cpt: true

                                            }

                                        }

                                    }

                                },

                                medicalRecord: {

                                    include: {

                                        patient: true

                                    }

                                }

                            }

                        }

                    },

                    orderBy: {

                        createdAt: "asc"

                    }

                });

            res.json(procedures);

        }

        catch (err) {

            console.log(err);

            res.status(500).json({

                error: "Failed to fetch pending procedures"

            });

        }

    }

);

/*
==================================================
COMPLETED PROCEDURES (lab/radiology history)
==================================================
*/

router.get(

    "/completed",

    protect,

    authorize("LAB_TECH", "RADIOLOGY", "ADMIN"),

    authorizePermission("VIEW_PROCEDURES"),

    async (req, res) => {

        try {

            const procedures =
                await prisma.procedureRequest.findMany({

                    where: {

                        status: "COMPLETED",

                        medicalRecordService: {

                            medicalRecord: {

                                patient: {
                                    hospitalId: req.user.hospitalId
                                }

                            }

                        }

                    },

                    include: {

                        medicalRecordService: {

                            include: {

                                hospitalService: {

                                    include: {

                                        service: {

                                            include: {

                                                cpt: true

                                            }

                                        }

                                    }

                                },

                                medicalRecord: {

                                    include: {

                                        patient: true

                                    }

                                }

                            }

                        },

                        procedureResult: {

                            include: {

                                performedBy: {

                                    select: {
                                        firstName: true,
                                        lastName: true
                                    }

                                }

                            }

                        },

                        labResult: true

                    },

                    orderBy: {

                        createdAt: "desc"

                    },

                    take: 100

                });

            res.json(procedures);

        }

        catch (err) {

            console.log(err);

            res.status(500).json({

                error: "Failed to fetch completed procedures"

            });

        }

    }

);


/*
==================================================
LIST PROCEDURES FOR VISIT
==================================================
*/

router.get(

    "/visit/:visitId",

    protect,

    authorize(

        "DOCTOR",

        "NURSE",

        "LAB_TECH",

        "RADIOLOGY",

        "ADMIN"

    ),

    authorizePermission("VIEW_PROCEDURES"),

    async (req, res) => {

        try {

            const procedures =
                await prisma.procedureRequest.findMany({

                    where: {

                        visitId:
                            req.params.visitId,

                        visit: {
                            patient: {
                                hospitalId: req.user.hospitalId
                            }
                        }

                    },

                   include: {

        medicalRecordService: {

            include: {

                hospitalService: {

                    include: {

                        service: {

                            include: {

                                cpt: true

                            }

                        }

                    }

                }
            }
        },

        procedureResult: true

    },
                    orderBy: {

                        createdAt: "asc"

                    }

                });

            res.json(procedures);

        }

        catch (err) {

            console.log(err);

            res.status(500).json({

                error: "Failed to fetch procedures"

            });

        }

    }

);

export default router;