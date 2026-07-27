import prisma from "../../utils/prisma.js";
import { generateInvoiceNumber } from "./billingHelpers.js";

export async function getOrCreateInvoice({

  tx,

  patientId,

  hospitalId,

  visitId

}) {

  let invoice =
    await tx.invoice.findFirst({

      where: {

        patientId,

        hospitalId,

        visitId,

        status:  {
    in: ["PENDING","PARTIALLY_PAID"]
}

      }

    });

  if (invoice)
    return invoice;

  invoice =
    await tx.invoice.create({

      data: {

         invoiceNumber: generateInvoiceNumber(),

        patientId,

        hospitalId,

        visitId,

        status: "PENDING",

        subtotal: 0,

        paidAmount: 0, 

        balance: 0

      }

    });

  return invoice;

}