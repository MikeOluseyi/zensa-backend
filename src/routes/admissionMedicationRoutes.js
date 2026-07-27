import express from "express";
import prisma from "../utils/prisma.js";
import { createCharge } from "../utils/billing/index.js";
import { createMedicationOrder, addScheduledDose, verifyMedicationOrder, rejectMedicationOrder } from "../utils/admissionMedicationEngine.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

/*
 CREATE MEDICATION ORDER
 Doctor only
*/

router.post(
  "/",
  protect,
  authorize("DOCTOR"),
  async (req, res) => {
    try {

      const {
        admissionId,
        medicationName,
        dosage,
        frequency,
        duration,
        route,
        inventoryItemId,
        orderType,
        quantityLimit,
        scheduledTimes
      } = req.body;

      const order = await prisma.$transaction(async (tx) => {

        const admission =
          await tx.admission.findFirst({

            where: {
              id: admissionId,
              patient: {
                hospitalId: req.user.hospitalId
              }
            },

            include: {
              visit: true
            }

          });

        if (!admission) {
          throw new Error("ADMISSION_NOT_FOUND");
        }

        let inventoryItem = null;

        if (inventoryItemId) {

          inventoryItem =
            await tx.inventoryItem.findFirst({

              where: {
                id: inventoryItemId,
                hospitalId: req.user.hospitalId
              }

            });

          if (!inventoryItem) {
            throw new Error("MEDICATION_NOT_FOUND");
          }

          if (inventoryItem.quantity <= 0) {
            throw new Error("MEDICATION_OUT_OF_STOCK");
          }

          if (inventoryItem.sellingPrice == null) {
            throw new Error(`${inventoryItem.name} has no selling price configured.`);
          }

        }

        const createdOrder = 
        await createMedicationOrder({
            tx, 

            admissionId, 

            visitId: admission.visitId, 

            doctorId: req.user.id,

            medicationName, 

            dosage, 

            frequency, 

            duration, 

            route,

            inventoryItemId,

            orderType,

            quantityLimit,

            scheduledTimes
            });

        if (inventoryItem) {

          await createCharge({

            tx,

            patientId: admission.patientId,

            visitId: admission.visitId,

            hospitalId: req.user.hospitalId,

            hospitalServiceId: null,

            serviceId: null,

            quantity: 1,

            unitPrice: inventoryItem.sellingPrice,

            description: inventoryItem.name,

            sourceType: "MEDICATION",

            sourceId: createdOrder.id,

            createdById: req.user.id

          });

        }

        return createdOrder;

      });

      res.json(order);

    } catch (err) {

      console.log(err);

      if (err.message === "ADMISSION_NOT_FOUND") {
        return res.status(404).json({ error: "Admission not found" });
      }

      if (err.message === "MEDICATION_NOT_FOUND") {
        return res.status(404).json({ error: "Medication not found" });
      }

      if (err.message === "MEDICATION_OUT_OF_STOCK") {
        return res.status(400).json({ error: "Medication out of stock" });
      }

      res.status(500).json({
        error: err.message || "Failed to create medication order"
      });

    }

  }
);

/*
 GET MEDICATION CHART
 Doctor and Nurse
*/

router.get(
  "/:admissionId",
  protect,
  async (req, res) => {


    try {


      const medications =
  await prisma.admissionMedicationOrder.findMany({

    where: {

      admissionId:
        req.params.admissionId,

      admission: {

        patient: {

          hospitalId:
            req.user.hospitalId

        }

      }

    },

    include: {

      doctor: {

        select: {

          firstName: true,

          lastName: true

        }

      },

      inventoryItem: {
  select: {
    id: true,
    name: true,
    quantity: true,
    saleUnit: true,
    baseUnit: true,
    sellingPrice: true
  }
},

administrations: { orderBy: { scheduledAt: "asc" } }

    },

    orderBy: {

      createdAt: "desc"

    }

  });

      res.json(medications);


    } catch(err) {


      console.log(err);


      res.status(500).json({

        error:
          "Failed to fetch medications"

      });


    }

  }

);

/*
==================================================
PENDING VERIFICATION (pharmacist queue)
==================================================
*/

router.get(
  "/pending-verification",
  protect,
  authorize("PHARMACIST", "ADMIN"),
  async (req, res) => {
    try {

      const orders =
        await prisma.admissionMedicationOrder.findMany({
          where: {
            verificationStatus: "PENDING_VERIFICATION",
            admission: { patient: { hospitalId: req.user.hospitalId } }
          },
          include: {
            doctor: { select: { firstName: true, lastName: true } },
            inventoryItem: { select: { id: true, name: true, quantity: true, sellingPrice: true } },
            admission: {
              include: {
                patient: { select: { firstName: true, lastName: true, patientNumber: true } },
                bed: { include: { ward: true } }
              }
            }
          },
          orderBy: { createdAt: "asc" }
        });

      res.json(orders);

    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Failed to fetch pending verification orders" });
    }
  }
);

/*
==================================================
VERIFY ORDER
==================================================
*/

router.patch(
  "/:orderId/verify",
  protect,
  authorize("PHARMACIST", "ADMIN"),
  async (req, res) => {
    try {

      const order = await verifyMedicationOrder({
        orderId: req.params.orderId,
        verifiedById: req.user.id,
        hospitalId: req.user.hospitalId
      });

      res.json(order);

    } catch (err) {
      console.log(err);
      const map = {
        ORDER_NOT_FOUND: [404, "Order not found"],
        ALREADY_PROCESSED: [400, "This order has already been verified or rejected."]
      };
      const [status, message] = map[err.message] || [500, err.message || "Failed to verify order"];
      res.status(status).json({ error: message });
    }
  }
);

/*
==================================================
REJECT ORDER
==================================================
*/

router.patch(
  "/:orderId/reject",
  protect,
  authorize("PHARMACIST", "ADMIN"),
  async (req, res) => {
    try {

      const order = await rejectMedicationOrder({
        orderId: req.params.orderId,
        verifiedById: req.user.id,
        rejectionReason: req.body.rejectionReason,
        hospitalId: req.user.hospitalId
      });

      res.json(order);

    } catch (err) {
      console.log(err);
      const map = {
        ORDER_NOT_FOUND: [404, "Order not found"],
        ALREADY_PROCESSED: [400, "This order has already been verified or rejected."]
      };
      const [status, message] = map[err.message] || [500, err.message || "Failed to reject order"];
      res.status(status).json({ error: message });
    }
  }
);

/*
 Nurse administers medication
*/

// Log/record a dose
router.post(
  "/:orderId/administer",
  protect,
  authorize("NURSE"),
  async (req, res) => {
    try {
      const administration = await administerDose({
        orderId: req.params.orderId,
        administrationId: req.body.administrationId ?? null,
        status: req.body.status,
        administeredById: req.user.id,
        notes: req.body.notes,
        hospitalId: req.user.hospitalId
      });
      res.json(administration);
    } catch (err) {
      console.log(err);
      // In the /administer route's catch block, extend the error map
      if (err.message === "NOT_VERIFIED") {
        return res.status(400).json({ error: "This medication order hasn't been verified by pharmacy yet." });
      }

      if (err.message === "ORDER_REJECTED") {
        return res.status(400).json({ error: "This medication order was rejected by pharmacy and cannot be administered." });
      }
      const map = {
        QUANTITY_LIMIT_REACHED: [400, "This medication has already reached its prescribed quantity limit."],
        INSUFFICIENT_STOCK: [400, "Insufficient stock to administer this medication."],
        ORDER_NOT_FOUND: [404, "Order not found"],
        ADMINISTRATION_NOT_FOUND: [404, "Dose not found"]
      };
      const [status, message] = map[err.message] || [500, err.message || "Failed to record administration"];
      res.status(status).json({ error: message });
    }
  }
);

// Add near the other routes in this file
router.post(
  "/:orderId/schedule",
  protect,
  authorize("DOCTOR", "ADMIN"),
  async (req, res) => {
    try {

      const order = await prisma.admissionMedicationOrder.findFirst({
        where: {
          id: req.params.orderId,
          admission: { patient: { hospitalId: req.user.hospitalId } }
        }
      });

      if (!order) {
        return res.status(404).json({ error: "Medication order not found" });
      }

      const dose = await addScheduledDose({
        orderId: req.params.orderId,
        scheduledAt: req.body.scheduledAt,
      });

      res.json(dose);

    } catch (err) {

      console.log(err);

      res.status(err.message === "ORDER_NOT_FOUND" ? 404 : 500).json({
        error: err.message === "ORDER_NOT_FOUND" ? "Medication order not found" : (err.message || "Failed to add dose time")
      });

    }
  }
);

export default router;