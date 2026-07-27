import prisma from "./prisma.js";

async function getOrCreateInvoice(patientId, hospitalId) {

  let invoice =
    await prisma.invoice.findFirst({

      where: {

        patientId,

        hospitalId,

        status: "PENDING"

      }

    });

  if (!invoice) {

    invoice =
      await prisma.invoice.create({

        data: {

          patientId,

          hospitalId,

          subtotal: 0

        }

      });

  }

  return invoice;

}

async function recalculateInvoice(invoiceId) {

  const charges =
    await prisma.charge.findMany({

      where: {

        invoiceId,

        status: {

          not: "CANCELLED"

        }

      }

    });

  const subtotal =
    charges.reduce(

      (sum, charge) =>

        sum + Number(charge.totalPrice),

      0

    );

  await prisma.invoice.update({

    where: {

      id: invoiceId

    },

    data: {

      subtotal

    }

  });

}

export async function createCharge({

  patientId,

  visitId = null,

  hospitalId,

  serviceId,

  quantity = 1,

  unitPrice,

  description,

  sourceType,

  sourceId = null,

  createdById = null

}) {

  const invoice =
    await getOrCreateInvoice(

      patientId,

      hospitalId

    );

  const charge =
    await prisma.charge.create({

      data: {

        patientId,

        visitId,

        invoiceId: invoice.id,

        serviceId,

        quantity,

        unitPrice,

        totalPrice:

          quantity * unitPrice,

        description,

        sourceType,

        sourceId,

        createdById

      }

    });

  await recalculateInvoice(invoice.id);

  return charge;

}

export async function cancelCharge(chargeId) {

  const charge =
    await prisma.charge.update({

      where: {

        id: chargeId

      },

      data: {

        status: "CANCELLED"

      }

    });

  if (charge.invoiceId) {

    await recalculateInvoice(

      charge.invoiceId

    );

  }

  return charge;

}

export async function postCharge(chargeId) {

  return prisma.charge.update({

    where: {

      id: chargeId

    },

    data: {

      status: "POSTED"

    }

  });

}