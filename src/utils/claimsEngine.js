import prisma from "./prisma.js";

/*
==========================================
HOSPITAL
==========================================
*/

export async function createClaimDraft({

  insuranceId,
  invoiceId,
  createdById,
  hospitalId

}) {

  const invoice = await prisma.invoice.findFirst({

    where: {
      id: invoiceId,
      hospitalId
    },

    include: {
      charges: true
    }

  });

  if (!invoice)
    throw new Error("Invoice not found");

  const insurance = await prisma.patientInsurance.findFirst({

    where: {
      id: insuranceId,
      patientId: invoice.patientId
    }

  });

  if (!insurance)
    throw new Error("Insurance record not found for this patient");

  const claimNumber =
    `CLM-${Date.now()}`;

  return prisma.claim.create({

    data: {

      claimNumber,

      patientId: invoice.patientId,

      insuranceId,

      invoiceId,

      submittedById: createdById,

      totalAmount: invoice.subtotal,

      status: "DRAFT"

    }

  });

}



export async function updateClaimDraft({

  claimId,

  updates

}) {

  const claim =
    await prisma.claim.findUnique({

      where: {
        id: claimId
      }

    });

  if (!claim)
    throw new Error("Claim not found");

  if (claim.status !== "DRAFT")
    throw new Error("Only draft claims can be edited");

  return prisma.claim.update({

    where: {
      id: claimId
    },

    data: updates

  });

}



export async function submitClaim({

  claimId,

  submittedById

}) {

  const claim =
    await prisma.claim.findUnique({

      where: {
        id: claimId
      }

    });

  if (!claim)
    throw new Error("Claim not found");

  if (claim.status !== "DRAFT")
    throw new Error("Only draft claims can be submitted");

  return prisma.claim.update({

    where: {
      id: claimId
    },

    data: {

      submittedById,

      submittedAt: new Date(),

      status: "SUBMITTED"

    }

  });

}



export async function markExported({

  claimId,

  exportType,

  exportBatch,

  insurerReference

}) {

  const claim =
    await prisma.claim.findUnique({

      where: {
        id: claimId
      }

    });

  if (!claim)
    throw new Error("Claim not found");

  if (claim.status !== "SUBMITTED")
    throw new Error("Only submitted claims can be marked as exported");

  return prisma.claim.update({

    where: {
      id: claimId
    },

    data: {

      exportStatus: "EXPORTED",

      exportedAt: new Date(),

      exportBatch,

      insurerReference

    }

  });

}



/*
==========================================
INSURANCE
==========================================
*/

export async function reviewClaim({

  claimId,

  reviewerId

}) {

  const claim =
    await prisma.claim.findUnique({

      where: {
        id: claimId
      }

    });

  if (!claim)
    throw new Error("Claim not found");

  if (claim.status !== "SUBMITTED")
    throw new Error("Claim must be submitted");

  return prisma.claim.update({

    where: {
      id: claimId
    },

    data: {

      processedByInsuranceStaffId:
        reviewerId,

      processedAt:
        new Date(),

      status:
        "UNDER_REVIEW"

    }

  });

}



export async function approveClaim({

  claimId,

  approvedAmount,

  processedByInsuranceStaffId

}) {

  const claim =
    await prisma.claim.findUnique({

      where: {
        id: claimId
      }

    });

  if (!claim)
    throw new Error("Claim not found");

  if (!["SUBMITTED", "UNDER_REVIEW"].includes(claim.status))
    throw new Error("Claim must be submitted or under review to be approved");

  let status = "APPROVED";

  if (

    approvedAmount != null &&

    approvedAmount < claim.totalAmount

  ) {

    status = "PARTIALLY_APPROVED";

  }

  return prisma.claim.update({

    where: {
      id: claimId
    },

    data: {

      approvedAmount,

      processedByInsuranceStaffId,

      processedAt: new Date(),

      status

    }

  });

}



export async function rejectClaim({

  claimId,

  rejectionReason,

  processedByInsuranceStaffId

}) {

  const claim =
    await prisma.claim.findUnique({

      where: {
        id: claimId
      }

    });

  if (!claim)
    throw new Error("Claim not found");

  if (!["SUBMITTED", "UNDER_REVIEW"].includes(claim.status))
    throw new Error("Claim must be submitted or under review to be rejected");

  return prisma.claim.update({

    where: {
      id: claimId
    },

    data: {

      rejectionReason,

      processedByInsuranceStaffId,

      processedAt: new Date(),

      status: "REJECTED"

    }

  });

}



export async function markPaid({

  claimId

}) {

  const claim =
    await prisma.claim.findUnique({

      where: {
        id: claimId
      }

    });

  if (!claim)
    throw new Error("Claim not found");

  if (!["APPROVED", "PARTIALLY_APPROVED"].includes(claim.status))
    throw new Error("Only approved claims can be marked as paid");

  return prisma.claim.update({

    where: {
      id: claimId
    },

    data: {

      status: "PAID",

      paidAt: new Date()

    }

  });

}