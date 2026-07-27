import prisma from "../utils/prisma.js";

/*
|--------------------------------------------------------------------------
| SHARED: mark a procedure request completed and cascade visit/appointment
| status if this was the last one pending. Used by both the free-text
| result path and the new structured lab-result path.
|--------------------------------------------------------------------------
*/

export async function completeProcedureRequest(tx, { procedureRequestId }) {

  const request =
    await tx.procedureRequest.findUnique({
      where: {
        id: procedureRequestId
      },
      include: {
        visit: true
      }
    });

  if (!request)
    throw new Error("Procedure request not found.");

  await tx.procedureRequest.update({
    where: {
      id: request.id
    },
    data: {
      status: "COMPLETED"
    }
  });

  if (!request.visitId) return;

  const pending =
    await tx.procedureRequest.count({
      where: {
        visitId: request.visitId,
        status: {
          in: ["PENDING", "IN_PROGRESS"]
        }
      }
    });

  if (pending === 0) {

    const visit =
      await tx.visit.update({
        where: {
          id: request.visitId
        },
        data: {
          status: "READY_FOR_REVIEW"
        }
      });

    if (visit.appointmentId) {

      await tx.appointment.update({
        where: {
          id: visit.appointmentId
        },
        data: {
          status: "READY_FOR_REVIEW"
        }
      });

    }

  }

}

/*
|--------------------------------------------------------------------------
| SAVE FREE-TEXT PROCEDURE RESULT
|--------------------------------------------------------------------------
*/

export async function saveProcedureResult({

  procedureRequestId,

  results,

  notes,

  performedById

}) {

  return prisma.$transaction(async (tx) => {

    const request =
      await tx.procedureRequest.findUnique({

        where: {
          id: procedureRequestId
        },

        include: {
          visit: true
        }

      });

    if (!request)
      throw new Error(
        "Procedure request not found."
      );

    const result =
      await tx.procedureResult.upsert({

        where: {
          procedureRequestId
        },

        update: {
          results,
          notes,
          performedById
        },

        create: {
          procedureRequestId,
          visitId: request.visitId,
          results,
          notes,
          performedById
        }

      });

    await completeProcedureRequest(tx, { procedureRequestId });

    return result;

  });

}