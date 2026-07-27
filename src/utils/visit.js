import prisma from "../utils/prisma.js";

export async function getOrCreateVisit({

    patientId,

    hospitalId,

    appointmentId = null,

    medicalRecordId = null,

    admissionId = null,

    visitType = "OPD"

}) {

    let visit = await prisma.visit.findFirst({

        where:{

            OR:[

                appointmentId
                    ? { appointmentId }
                    : undefined,

                admissionId
                    ? { admissionId }
                    : undefined

            ].filter(Boolean)

        }

    });

    if(visit) return visit;

    return prisma.visit.create({

        data:{

            patientId,

            hospitalId,

            appointmentId,

            medicalRecordId,

            admissionId,

            visitType

        }

    });

}