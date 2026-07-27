import prisma from "../utils/prisma.js";
import {
  canTransition
}
from "../utils/appointmentWorkflow.js";

export async function transitionAppointment(
  appointmentId,
  newStatus
) {

  const appointment =
    await prisma.appointment.findUnique({
      where: {
        id: appointmentId
      }
    });

  if (!appointment) {
    throw new Error(
      "Appointment not found"
    );
  }

  if (
    !canTransition(
      appointment.status,
      newStatus
    )
  ) {

    throw new Error(
      `Cannot move from ${appointment.status} to ${newStatus}`
    );
  }

  return prisma.appointment.update({

    where: {
      id: appointmentId
    },

    data: {
      status: newStatus
    }
  });
}