import prisma from "../../utils/prisma.js";
import { generateInvoiceNumber } from "./billingHelpers.js";

export async function generateInvoice({

    visitId,
    hospitalId,
    createdById

}) {

    // Find every charge not yet invoiced

    const charges =
        await prisma.charge.findMany({

            where: {

                visitId,

                hospitalId,

                invoiceId: null

            }

        });

    if (!charges.length) {

        throw new Error("No billable charges found.");

    }

    // Calculate invoice total

    const total = charges.reduce(

        (sum, charge) =>

            sum +
            (charge.quantity * charge.unitPrice),

        0

    );

    // Patient comes from first charge

    const patientId = charges[0].patientId;

    // Create invoice

    const invoice =
        await prisma.invoice.create({

            data: {

                invoiceNumber:
                    generateInvoiceNumber(),

                patientId,

                visitId,

                hospitalId,

                totalAmount: total,

                balance: total,

                createdById

            }

        });

    // Attach charges

    await prisma.charge.updateMany({

        where: {

            id: {

                in: charges.map(c => c.id)

            }

        },

        data: {

            invoiceId: invoice.id

        }

    });

    return await prisma.invoice.findUnique({

        where: {

            id: invoice.id

        },

        include: {

            charges: true,

            patient: true,

            payments: true

        }

    });

}