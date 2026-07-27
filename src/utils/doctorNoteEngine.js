import prisma from "./prisma.js";

export async function createDoctorNote({

    visitId,

    doctorId,

    note,

    type = "PROGRESS"

}){

    return prisma.doctorNote.create({

        data:{

            visitId,

            doctorId,

            note,

            type

        },

        include:{

            doctor:{

                select:{

                    firstName:true,

                    lastName:true

                }

            }

        }

    });

}

export async function updateDoctorNote({

    noteId,

    doctorId,

    note

}){

    const existing =
        await prisma.doctorNote.findUnique({

            where:{
                id:noteId
            }

        });

    if(!existing)
        throw new Error("Doctor note not found.");

    if(existing.doctorId!==doctorId)
        throw new Error("You can only edit your own notes.");

    return prisma.doctorNote.update({

        where:{
            id:noteId
        },

        data:{
            note
        }

    });

}

export async function deleteDoctorNote({

    noteId,

    doctorId

}){

    const existing =
        await prisma.doctorNote.findUnique({

            where:{
                id:noteId
            }

        });

    if(!existing)
        throw new Error("Doctor note not found.");

    if(existing.doctorId!==doctorId)
        throw new Error("You can only delete your own notes.");

    return prisma.doctorNote.delete({

        where:{
            id:noteId
        }

    });

}