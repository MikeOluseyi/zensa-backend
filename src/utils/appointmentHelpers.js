import prisma from "./prisma.js";

export async function verifyDoctorOwnership(
  appointmentId,
  user
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
    user.role === "DOCTOR" &&
    appointment.doctorId !== user.id
  ) {

    throw new Error(
      "Not your appointment"
    );
  }

  return appointment;
}