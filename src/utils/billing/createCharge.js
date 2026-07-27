import prisma from "../../utils/prisma.js";

import { getOrCreateInvoice } from "./getOrCreateInvoice.js";
import { recalculateInvoice } from "./recalculateInvoice.js";

export async function createCharge({

  tx,

  patientId,

  visitId = null,

  hospitalId,

  serviceId = null,

  hospitalServiceId = null,

  quantity = 1,

  unitPrice,

  description,

  sourceType,

  sourceId = null,

  createdById = null

}) {

  if (!patientId)
    throw new Error("Patient is required.");

  if (!hospitalId)
    throw new Error("Hospital is required.");

  if (quantity <= 0)
    throw new Error("Quantity must be greater than zero.");

  if (unitPrice < 0)
    throw new Error("Invalid price.");

  const invoice =
    await getOrCreateInvoice({

      tx,

      patientId,

      hospitalId,

      visitId

    });

  const charge =
    await tx.charge.create({

      data: {

        patientId,

        visitId,

        invoiceId: invoice.id,

        hospitalId,

        serviceId,

        hospitalServiceId,

        quantity,

        unitPrice,

        totalPrice: quantity * unitPrice,

        description,

        sourceType,

        sourceId,

        createdById

      }

    });

    await recalculateInvoice({tx, invoiceId: invoice.id});

  return charge;

}