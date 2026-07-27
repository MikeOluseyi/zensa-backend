import prisma from "./prisma.js";

export const createNotification = async ({
  hospitalId,
  patientId,
  staffId,
  type,
  title,
  message,
  channel = "SYSTEM"
}) => {

  return prisma.notification.create({

    data: {
      hospitalId,
      patientId,
      staffId,
      type,
      title,
      message,
      channel
    }
  });
};