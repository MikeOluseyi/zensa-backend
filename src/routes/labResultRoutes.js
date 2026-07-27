import express from "express";
import prisma from "../utils/prisma.js";
import { saveLabResult } from "../utils/labResultEngine.js";
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

router.post(
  "/",
  protect,
  authorize("LAB_TECH", "RADIOLOGY", "ADMIN"),
  authorizePermission("SAVE_PROCEDURE_RESULT"),
  async (req, res) => {

    try {

      const { orderId, results } = req.body;

      const existing =
        await getScopedProcedureRequest(orderId, req.user.hospitalId);

      if (!existing) {
        return res.status(404).json({ error: "Procedure request not found" });
      }

      const labResult =
        await saveLabResult({
          procedureRequestId: orderId,
          data: results,
          performedById: req.user.id
        });

      res.json(labResult);

    } catch (err) {

      console.log(err);

      const map = {
        PROCEDURE_REQUEST_NOT_FOUND: [404, "Procedure request not found"],
        NO_CPT_CODE_CONFIGURED: [400, "This service has no CPT code configured — cannot save structured results."]
      };

      const [status, message] = map[err.message] || [500, err.message || "Failed to save lab result"];

      res.status(status).json({ error: message });

    }

  }
);

export default router;