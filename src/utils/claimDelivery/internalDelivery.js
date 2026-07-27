import prisma from "../prisma.js";

import { createNotification } from "../notificationService.js";

import { createAuditLog } from "../auditService.js";

export async function deliverInternally({

  claimId,

  dto,

  performedById

}) {

  //----------------------------------------------------
  // Ensure insurer is on Zensa
  //----------------------------------------------------

  const insurer = await prisma.insuranceProvider.findUnique({

    where: {

      id: dto.insurance.providerId

    }

  });

  if (!insurer) {

    throw new Error("Insurance provider not found");

  }

  if (insurer.integrationMode !== "ZENSA") {

    throw new Error("Insurance provider is not connected to Zensa");

  }

  return prisma.$transaction(async (tx) => {

    //----------------------------------------------------
    // Submit claim
    //----------------------------------------------------

    const existing = await tx.claim.findUnique({
      where: { id: claimId }
    });

    if (!existing) {
      throw new Error("Claim not found");
    }

    if (existing.status !== "DRAFT") {
      throw new Error("Only draft claims can be submitted.");
    }

    const claim = await tx.claim.update({

      where: {

        id: claimId

      },

      data: {

        status: "SUBMITTED",

        submittedAt: new Date()

      }

    });

    //----------------------------------------------------
    // Notify insurer
    //----------------------------------------------------

    const insuranceUsers =
      await tx.insuranceStaff.findMany({

        where: {

          insuranceProviderId: insurer.id,

          isActive: true

        }

      });

    for (const staff of insuranceUsers) {

      await tx.notification.create({

        data: {

          hospitalId: dto.patient.hospitalId,

          insuranceStaffId: staff.id,

          type: "CLAIM",

          title: "New Claim",

          message:
            `Claim ${claim.claimNumber} has been submitted.`,

          channel: "IN_APP"

        }

      });

    }

    //----------------------------------------------------
    // Audit
    //----------------------------------------------------

    await tx.auditLog.create({

      data: {

        hospitalId: dto.patient.hospitalId,

        staffId: performedById,

        action: "SUBMIT_CLAIM",

        entity: "CLAIM",

        entityId: claim.id,

        details:
          `Submitted claim ${claim.claimNumber} to ${insurer.name}`

      }

    });

    //----------------------------------------------------

    return claim;

  });

}