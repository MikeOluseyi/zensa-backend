import prisma from "../../utils/prisma.js";
import { recalculateInvoice } from "./recalculateInvoice.js";

export async function updateCharge({

    chargeId,

    quantity,

    unitPrice,

    description

}) {

    if (quantity != null && quantity <= 0)
        throw new Error("Quantity must be greater than zero.");

    if (unitPrice != null && unitPrice < 0)
        throw new Error("Invalid price.");

    return prisma.$transaction(async (tx) => {

        const charge =
            await tx.charge.findUnique({

                where: {

                    id: chargeId

                }

            });

        if (!charge)
            throw new Error("Charge not found.");

        if (charge.status !== "PENDING")
            throw new Error(
                "Only pending charges can be edited."
            );

        const nextQuantity =
            quantity ?? charge.quantity;

        const nextUnitPrice =
            unitPrice ?? charge.unitPrice;

        const updated =
            await tx.charge.update({

                where: {

                    id: chargeId

                },

                data: {

                    quantity: nextQuantity,

                    unitPrice: nextUnitPrice,

                    totalPrice:
                        nextQuantity * nextUnitPrice,

                    description

                }

            });

        if (updated.invoiceId) {

            await recalculateInvoice({

                tx,

                invoiceId: updated.invoiceId

            });

        }

        return updated;

    });

}