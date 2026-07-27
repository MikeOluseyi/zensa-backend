import prisma from "./prisma.js";

export const createAuditLog = async ({
  hospitalId,
  staffId,
  action,
  entity,
  entityId,
  details
}) => {

  return prisma.auditLog.create({

    data: {
      hospitalId,
      staffId,
      action,
      entity,
      entityId,
      details
    }
  });
};