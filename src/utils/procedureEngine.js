import prisma from "./prisma.js";
import { recalculateInvoice } from "./billing/recalculateInvoice.js";

export async function createProcedureRequest({

    tx,

    medicalRecordServiceId,

    visitId,

    notes

}) {

    return tx.procedureRequest.create({

        data: {

            medicalRecordServiceId,

            visitId,

            notes

        },

        include: {

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

}



export async function updateProcedureRequest({

    procedureId,

    updates

}) {

    return prisma.procedureRequest.update({

        where: {

            id: procedureId

        },

        data: updates

    });

}



export async function cancelProcedureRequest({

    procedureId,

    cancelledById

}) {

    return prisma.$transaction(async (tx) => {

        const procedure =
            await tx.procedureRequest.update({

                where: {

                    id: procedureId

                },

                data: {

                    status: "CANCELLED"

                }

            });

        const medicalRecordServiceId =
            procedure.medicalRecordServiceId;

        if (medicalRecordServiceId) {

            const charge =
                await tx.charge.findFirst({

                    where: {

                        medicalRecordServiceId

                    }

                });

            if (charge && charge.status !== "CANCELLED") {

                await tx.charge.update({

                    where: {

                        id: charge.id

                    },

                    data: {

                        status: "CANCELLED",

                        cancelledAt: new Date(),

                        cancelledById,

                        cancellationReason:
                            "Procedure cancelled"

                    }

                });

                if (charge.invoiceId) {

                    await recalculateInvoice({

                        tx,

                        invoiceId: charge.invoiceId

                    });

                }

            }

            await tx.medicalRecordService.update({

                where: {

                    id: medicalRecordServiceId

                },

                data: {

                    status: "CANCELLED"

                }

            });

        }

        return procedure;

    });

}