import prisma from "../prisma.js";
import { recalculateInvoice } from "./recalculateInvoice.js";
import { deductServiceFee } from "../walletService.js";

export async function postCharge({
    chargeId,
    postedById
}) {

    const charge = await prisma.charge.findUnique({
        where: {
            id: chargeId
        },
        include: {
            invoice: true
        }
    });

    if (!charge)
        throw new Error("Charge not found.");

    if (charge.status === "POSTED")
        throw new Error("Charge already posted.");

    if (charge.status === "CANCELLED")
        throw new Error("Charge cancelled.");

    if (!charge.invoiceId)
        throw new Error("Charge has no invoice to post against.");

    const updatedCharge = await prisma.$transaction(async (tx) => {

        const updated = await tx.charge.update({
            where: {
                id: charge.id
            },
            data: {
                status: "POSTED",
                postedById,
                postedAt: new Date(),
            }
        });

        await recalculateInvoice({
            tx,
            invoiceId: charge.invoiceId
        });

        await tx.chargeStatusHistory.create({

            data: {
                chargeId: charge.id,
                fromStatus: charge.status,
                toStatus: "POSTED",
                changedById: postedById
            }

        });

        try {

            await deductServiceFee(tx, {
                hospitalId: charge.hospitalId,
                chargeAmount: updated.totalPrice,
                sourceId: updated.id
            });

        } catch (err) {

            if (
                err.message === "WALLET_INSUFFICIENT_BALANCE" ||
                err.message === "WALLET_OVERDRAFT_CAP_EXCEEDED"
            ) {
                throw new Error("This charge cannot be posted: wallet balance cannot cover the service fee.");
            }

            throw err;

        }

        return updated;

    });

    return updatedCharge;

}