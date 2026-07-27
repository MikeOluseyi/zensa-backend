import prisma from "./prisma.js";

export async function getVisitByAppointment(appointmentId) {

  const visit =
    await prisma.visit.findFirst({

      where: {
        appointmentId
      }

    });

  if (!visit) {

    throw new Error("VISIT_NOT_FOUND");

  }

  return visit;

}