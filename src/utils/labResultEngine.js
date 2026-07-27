import prisma from "./prisma.js";
import { completeProcedureRequest } from "./procedureResultsEngine.js";

export async function saveLabResult({

  procedureRequestId,

  data,

  performedById

}) {

  return prisma.$transaction(async (tx) => {

    const request =
      await tx.procedureRequest.findUnique({

        where: {
          id: procedureRequestId
        },

        include: {

          visit: true,

          medicalRecordService: {
            include: {
              hospitalService: {
                include: {
                  service: {
                    include: {
                      cpt: true
                    }
                  }
                }
              }
            }
          }

        }

      });

    if (!request)
      throw new Error("PROCEDURE_REQUEST_NOT_FOUND");

    // Derive the CPT code server-side from the actual ordered service —
    // never trust a cptCode the client sends, since this data eventually
    // feeds structured insurer claims.
    const cptCode =
      request.medicalRecordService?.hospitalService?.service?.cpt?.code;

    if (!cptCode) {
      throw new Error("NO_CPT_CODE_CONFIGURED");
    }

    const labResult =
      await tx.labResult.upsert({

        where: {
          procedureRequestId
        },

        update: {
          cptCode,
          data
        },

        create: {
          procedureRequestId,
          cptCode,
          data
        }

      });

    // Mirror a human-readable summary into ProcedureResult too, so anything
    // already reading generic results (e.g. GET /procedure-Results/request/:id)
    // still shows something meaningful without needing to know about
    // structured lab data specifically.
    const summary =
      Object.entries(data)
        .map(([key, value]) => `${key}: ${value}`)
        .join(", ");

    await tx.procedureResult.upsert({

      where: {
        procedureRequestId
      },

      update: {
        results: summary,
        performedById
      },

      create: {
        procedureRequestId,
        visitId: request.visitId,
        results: summary,
        performedById
      }

    });

    await completeProcedureRequest(tx, { procedureRequestId });

    return labResult;

  });

}