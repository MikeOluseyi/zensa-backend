import express from "express";

import prisma from "../utils/prisma.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import { authorizePermission } from "../middleware/permissionMiddleware.js";

import {

  saveProcedureResult

} from "../utils/procedureResultsEngine.js";

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
SAVE PROCEDURE RESULT
==================================================
*/

router.post(
  "/",
  protect,
  authorize(
    "LAB_TECH",
    "RADIOLOGY",
    "ADMIN"
  ),
  authorizePermission("SAVE_PROCEDURE_RESULT"),
  async (req, res) => {

    try {

      const {

        procedureRequestId,

        results,

        notes

      } = req.body;

      const existing =
        await getScopedProcedureRequest(procedureRequestId, req.user.hospitalId);

      if (!existing) {

        return res.status(404).json({

          error: "Procedure request not found"

        });

      }

      const result =
        await saveProcedureResult({

          procedureRequestId,

          results,

          notes,

          performedById:
            req.user.id

        });

      res.json(result);

    } catch (err) {

      console.log(err);

      res.status(500).json({

        error:
          err.message ||
          "Failed to save procedure result"

      });

    }

  }
);

/*
==================================================
GET RESULT
==================================================
*/

router.get(
  "/request/:procedureRequestId",
  protect,
  async (req, res) => {

    try {

      const existing =
        await getScopedProcedureRequest(req.params.procedureRequestId, req.user.hospitalId);

      if (!existing) {

        return res.status(404).json({

          error: "Procedure request not found"

        });

      }

      const result =
        await prisma.procedureResult.findUnique({

          where: {

            procedureRequestId:
              req.params.procedureRequestId

          },

          include: {

            procedureRequest: {

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

                visit: {

                  include: {

                    patient: true,

                    appointment: true

                  }

                }

              }

            },

            performedBy: {

              select: {

                id: true,

                firstName: true,

                lastName: true

              }

            }

          }

        });

      if (!result) {

        return res.status(404).json({

          error:
            "Result not found"

        });

      }

      res.json(result);

    } catch (err) {

      console.log(err);

      res.status(500).json({

        error:
          err.message

      });

    }

  }
);

/*
==================================================
UPDATE RESULT
==================================================
*/

router.patch(
  "/:id",
  protect,
  authorize(
    "LAB_TECH",
    "RADIOLOGY",
    "ADMIN"
  ),
  authorizePermission("EDIT_PROCEDURE_RESULT"),
  async (req, res) => {

    try {

      const existing =
        await prisma.procedureResult.findFirst({

          where: {

            id: req.params.id,

            OR: [

              { visit: { patient: { hospitalId: req.user.hospitalId } } },

              { procedureRequest: { medicalRecordService: { medicalRecord: { patient: { hospitalId: req.user.hospitalId } } } } }

            ]

          }

        });

      if (!existing) {

        return res.status(404).json({

          error: "Result not found"

        });

      }

      const result =
        await prisma.procedureResult.update({

          where: {

            id: req.params.id

          },

          data: {

            results: req.body.results,

            notes: req.body.notes

          }

        });

      res.json(result);

    } catch (err) {

      console.log(err);

      res.status(500).json({

        error:
          err.message

      });

    }

  }
);

export default router;