import prisma from "../../utils/prisma.js";

import { recalculateInvoice } from "./recalculateInvoice.js";
import { refundServiceFee } from "../walletService.js";

export async function cancelCharge({

  chargeId,

  cancelledById,

  reason = null

}) {

  return prisma.$transaction(async (tx) => {

    const charge =
      await tx.charge.findUnique({

        where: {

          id: chargeId

        }

      });

    if (!charge)
      throw new Error("Charge not found.");

    if (charge.status === "CANCELLED")
      throw new Error("Charge has already been cancelled.");

    const wasPosted = charge.status === "POSTED";

    const updated =
      await tx.charge.update({

        where: {

          id: charge.id

        },

        data: {

          status: "CANCELLED",

          cancelledAt: new Date(),

          cancelledById,

          cancellationReason: reason

        }

      });

    if (charge.invoiceId) {

      await recalculateInvoice({

        tx,

        invoiceId: charge.invoiceId

      });

    }

    if (wasPosted) {

      await refundServiceFee(tx, {
        hospitalId: charge.hospitalId,
        sourceId: charge.id
      });

    }

    return updated;

  });

}