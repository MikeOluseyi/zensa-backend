
export async function recalculateInvoice({

  tx,

  invoiceId

}) {

  const invoice = await tx.invoice.findUnique({

    where: { id: invoiceId },

    include: {
      charges: true,
      payments: true
    }

  });

  if (!invoice)
    throw new Error("Invoice not found.");

  const subtotal =
    invoice.charges
      .filter(c => c.status === "POSTED")
      .reduce(
        (sum, c) => sum + Number(c.totalPrice),
        0
      );

  const paidAmount =
    invoice.payments.reduce(
      (sum, p) => sum + Number(p.amount),
      0
    );

  const balance = subtotal - paidAmount;

  let status = "PENDING";

  if (subtotal === 0)
    status = "PENDING";

  else if (balance <= 0)
    status = "PAID";

  else if (paidAmount > 0)
    status = "PARTIALLY_PAID";

  await tx.invoice.update({

    where: { id: invoiceId },

    data: {

      subtotal,

      paidAmount,

      balance,

      status

    }

  });

}