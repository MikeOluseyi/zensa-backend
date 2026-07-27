import prisma from "../utils/prisma.js";

export async function transferConsultation({

    visitId,

    fromDoctorId,

    toDepartmentId,

    reason

}){

    return prisma.$transaction(async(tx)=>{

        const visit =
            await tx.visit.findUnique({

                where:{
                    id:visitId
                },

                include:{
                    appointment:true
                }

            });

        if(!visit)
            throw new Error("Visit not found.");

        const doctor =
            await tx.staff.findUnique({

                where:{
                    id:fromDoctorId
                }

            });

        const transfer =
            await tx.consultationTransfer.create({

                data:{

                    visitId,

                    fromDoctorId,

                    fromDepartmentId:
                        doctor.departmentId,

                    toDepartmentId,

                    reason

                }

            });

        await tx.visit.update({

            where:{
                id:visit.id
            },

            data:{

                status:"TRANSFERRED"

            }

        });

        await tx.appointment.update({

            where:{
                id:visit.appointmentId
            },

            data:{

                status:"TRANSFERRED"

            }

        });

        return transfer;

    });

}

export async function acceptTransfer({

    transferId,

    doctorId

}){

    return prisma.$transaction(async(tx)=>{

        const transfer =
            await tx.consultationTransfer.findUnique({

                where:{
                    id:transferId
                },

                include:{
                    visit:true
                }

            });

        if(!transfer)
            throw new Error("Transfer not found.");

        await tx.consultationTransfer.update({

            where:{
                id:transfer.id
            },

            data:{

                status:"ACCEPTED",

                acceptedAt:new Date(),

                toDoctorId:doctorId

            }

        });

        await tx.visit.update({

            where:{
                id:transfer.visitId
            },

            data:{

                attendingDoctorId:doctorId,

                status:"IN_CONSULTATION"

            }

        });

        await tx.appointment.update({

            where:{
                id:transfer.visit.appointmentId
            },

            data:{

                doctorId,

                status:"IN_PROGRESS"

            }

        });

        return transfer;

    });

}