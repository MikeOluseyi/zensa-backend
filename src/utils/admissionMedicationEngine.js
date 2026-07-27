import prisma from "./prisma.js";
import { createCharge } from "./billing/index.js";

/*
|--------------------------------------------------------------------------
| CREATE ORDER (optionally seeded with initial scheduled doses)
|--------------------------------------------------------------------------
*/

export async function createMedicationOrder({

  tx,
  admissionId,
  visitId,
  doctorId,
  medicationName,
  dosage,
  frequency,
  duration,
  route,
  inventoryItemId = null,
  orderType = "SCHEDULED",
  quantityLimit = null,
  scheduledTimes = [],     // array of ISO datetimes, SCHEDULED orders only
  sourcePrescriptionId = null

}) {

  const order =
    await tx.admissionMedicationOrder.create({

      data: {
        admissionId,
        visitId,
        doctorId,
        medicationName,
        dosage,
        frequency,
        duration,
        route,
        inventoryItemId,
        orderType,
        quantityLimit,
        sourcePrescriptionId
      }

    });

  if (orderType === "SCHEDULED" && scheduledTimes.length) {

    await tx.medicationAdministration.createMany({

      data: scheduledTimes.map((scheduledAt) => ({
        orderId: order.id,
        scheduledAt: new Date(scheduledAt)
      }))

    });

  }

  return order;

}

/*
|--------------------------------------------------------------------------
| VERIFY / REJECT ORDER (pharmacist)
|--------------------------------------------------------------------------
*/

export async function verifyMedicationOrder({ orderId, verifiedById, hospitalId }) {

  const order =
    await prisma.admissionMedicationOrder.findFirst({
      where: { id: orderId, admission: { patient: { hospitalId } } }
    });

  if (!order) throw new Error("ORDER_NOT_FOUND");

  if (order.verificationStatus !== "PENDING_VERIFICATION") {
    throw new Error("ALREADY_PROCESSED");
  }

  return prisma.admissionMedicationOrder.update({
    where: { id: orderId },
    data: {
      verificationStatus: "VERIFIED",
      verifiedById,
      verifiedAt: new Date()
    }
  });

}

export async function rejectMedicationOrder({ orderId, verifiedById, rejectionReason, hospitalId }) {

  const order =
    await prisma.admissionMedicationOrder.findFirst({
      where: { id: orderId, admission: { patient: { hospitalId } } }
    });

  if (!order) throw new Error("ORDER_NOT_FOUND");

  if (order.verificationStatus !== "PENDING_VERIFICATION") {
    throw new Error("ALREADY_PROCESSED");
  }

  return prisma.admissionMedicationOrder.update({
    where: { id: orderId },
    data: {
      verificationStatus: "REJECTED",
      verifiedById,
      verifiedAt: new Date(),
      rejectionReason
    }
  });

}

/*
|--------------------------------------------------------------------------
| ADD A LATER SCHEDULED DOSE
| (for open-ended schedules — "then daily until oral tolerance")
|--------------------------------------------------------------------------
*/

export async function addScheduledDose({ orderId, scheduledAt }) {

  const order =
    await prisma.admissionMedicationOrder.findUnique({
      where: { id: orderId }
    });

  if (!order) throw new Error("ORDER_NOT_FOUND");

  if (order.orderType !== "SCHEDULED") {
    throw new Error("Only scheduled orders can have doses added.");
  }

  return prisma.medicationAdministration.create({
    data: {
      orderId,
      scheduledAt: new Date(scheduledAt)
    }
  });

}

/*
|--------------------------------------------------------------------------
| ADMINISTER A DOSE
| SCHEDULED: administrationId required, must be an existing PENDING slot.
| PRN: administrationId is null — a new row is created on the spot,
|      checked against quantityLimit.
|--------------------------------------------------------------------------
*/

export async function administerDose({

  orderId,
  administrationId = null,
  status,
  administeredById,
  notes,
  hospitalId

}) {

  return prisma.$transaction(async (tx) => {

    // AFTER
    const order =
      await tx.admissionMedicationOrder.findFirst({
        where: {
          id: orderId,
          admission: { patient: { hospitalId } }
        }
      });

    if (!order) throw new Error("ORDER_NOT_FOUND");

    if (order.verificationStatus === "PENDING_VERIFICATION") {
      throw new Error("NOT_VERIFIED");
    }

    if (order.verificationStatus === "REJECTED") {
      throw new Error("ORDER_REJECTED");
    }

    let administration;

    if (order.orderType === "SCHEDULED") {

      if (!administrationId) {
        throw new Error("An administration slot must be specified for scheduled orders.");
      }

      const existing =
        await tx.medicationAdministration.findFirst({
          where: { id: administrationId, orderId: order.id }
        });

      if (!existing) throw new Error("ADMINISTRATION_NOT_FOUND");

      if (existing.status !== "PENDING") {
        throw new Error("This dose has already been recorded.");
      }

      administration =
        await tx.medicationAdministration.update({
          where: { id: administrationId },
          data: {
            status,
            notes,
            administeredById: status === "GIVEN" ? administeredById : null,
            administeredAt: status === "GIVEN" ? new Date() : null
          }
        });

    } else {

      // PRN — enforce the total-dose cap before allowing another GIVEN
      if (status === "GIVEN" && order.quantityLimit != null) {

        const givenCount =
          await tx.medicationAdministration.count({
            where: { orderId: order.id, status: "GIVEN" }
          });

        if (givenCount >= order.quantityLimit) {
          throw new Error("QUANTITY_LIMIT_REACHED");
        }

      }

      administration =
        await tx.medicationAdministration.create({
          data: {
            orderId: order.id,
            status,
            notes,
            administeredById: status === "GIVEN" ? administeredById : null,
            administeredAt: status === "GIVEN" ? new Date() : null
          }
        });

    }

    if (status === "GIVEN" && order.inventoryItemId) {

      const claimed =
        await tx.inventoryItem.updateMany({
          where: { id: order.inventoryItemId, quantity: { gte: 1 } },
          data: { quantity: { decrement: 1 } }
        });

      if (claimed.count === 0) {
        throw new Error("INSUFFICIENT_STOCK");
      }

      await tx.stockMovement.create({
        data: {
          inventoryItemId: order.inventoryItemId,
          type: "OUT",
          quantity: 1,
          notes: `Administered — ${order.medicationName} (order ${order.id})`,
          createdById: administeredById
        }
      });

    }

    return administration;

  });

}