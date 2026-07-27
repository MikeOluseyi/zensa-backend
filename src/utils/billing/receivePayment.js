import prisma from "../../utils/prisma.js";

import { recalculateInvoice } from "./recalculateInvoice.js";

export async function receivePayment({

  invoiceId,

  amount,

  method,

  reference = null,

  notes = null,

  receivedById

}) {

  if (!invoiceId)
    throw new Error("Invoice is required.");

  if (!amount || Number(amount) <= 0)
    throw new Error("Payment amount must be greater than zero.");

  const invoice =
    await prisma.invoice.findUnique({

      where: {id: invoiceId},
       select: {
    id: true,
    hospitalId: true,
    balance: true,
    status: true,
  },

    });

  if (!invoice)
    throw new Error("Invoice not found.");

  if (invoice.status === "PAID")
    throw new Error("Invoice has already been fully paid.");

  // Optional:
  // Prevent overpayment.
  // Remove this block later if you decide to support patient credits.

  if (Number(amount) > invoice.balance)
    throw new Error("Payment exceeds invoice balance.");
  
  return await prisma.$transaction(async (tx) => {

    const payment =
        await tx.payment.create({

            data: {

                invoiceId,

                 hospitalId: invoice.hospitalId,

                amount: Number(amount),

                method,

                reference,

                notes,

                receivedById

            }

        });

    await recalculateInvoice({

        tx,

        invoiceId

    });

    return payment;

});

}