import prisma from "./prisma.js";
import { createCharge } from "../utils/billing/index.js";
import { createNotification } from "./notificationService.js";
import { createAuditLog } from "./auditService.js";
import { getConsultationHospitalService } from "../utils/serviceEngine.js";
import { createMedicationOrder } from "./admissionMedicationEngine.js";

/*
|--------------------------------------------------------------------------
| HELPERS
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| CREATE ADMISSION REQUEST
|--------------------------------------------------------------------------
*/

export async function createAdmissionRequest({
  visitId,
  requestedById,
  reason,
  notes,
  hospitalId,
  evaluationHospitalServiceId,
  medicationDecisions = []
}) {

  return prisma.$transaction(async (tx) => {

    const visit = await tx.visit.findUnique({
      where: {
        id: visitId,
      },
      include: {
        patient: true,
        admissionRequest: true,
      },
    });

    if (!visit) {
      throw new Error("VISIT_NOT_FOUND");
    }

    if (visit.admissionRequest) {
      throw new Error("ADMISSION_REQUEST_ALREADY_EXISTS");
    }

    // Validate up front — catches a bad/disabled service selection
    // immediately, instead of at approval time.
    await getConsultationHospitalService(

      tx,

      hospitalId,

      evaluationHospitalServiceId,

      "INPATIENT"

    );

    const request = await tx.admissionRequest.create({
      data: {
        visitId,
        patientId: visit.patientId,
        requestedById,
        reason,
        notes,
        evaluationHospitalServiceId,
      },
    });

    if (medicationDecisions.length) {

      await tx.admissionRequestMedication.createMany({

        data: medicationDecisions.map((med) => ({
          admissionRequestId: request.id,
          sourcePrescriptionId: med.prescriptionId,
          orderType: med.orderType,
          quantityLimit: med.quantityLimit ?? null,
          dosage: med.dosage,
          frequency: med.frequency,
          duration: med.duration,
          route: med.route,
          scheduledTimes: med.orderType === "SCHEDULED" ? med.scheduledTimes : null
        }))

      });

    }

    await tx.visit.update({
      where: { id: visit.id },
      data: { status: "ADMISSION_REQUESTED" },
    });

    if (visit.appointmentId) {

      await tx.appointment.update({
        where: { id: visit.appointmentId },
        data: { status: "ADMISSION_REQUESTED" },
      });

    }

    return request;

  });

}

/*
|--------------------------------------------------------------------------
| ADMIT PATIENT (core logic, callable inside any tx)
|--------------------------------------------------------------------------
*/

async function admitPatientCore(tx, {

  visitId,

  attendingDoctorId,

  bedId,

  reason,

  requestUser

}) {

  //----------------------------------
  // LOAD VISIT
  //----------------------------------

  const visit =
    await tx.visit.findUnique({

      where: {
        id: visitId
      },

      include: {

        patient: true,

        appointment: true,

        medicalRecord: {

          include: {

            prescriptions: true

          }

        },

        admission: true

      }

    });

  if (!visit)
    throw new Error("VISIT_NOT_FOUND");

  if (visit.admission)
    throw new Error("PATIENT_ALREADY_ADMITTED");

  //----------------------------------
  // VERIFY + ATOMICALLY CLAIM BED
  //----------------------------------

  const bed =
    await tx.bed.findUnique({

      where: {
        id: bedId
      },

      include: {
        ward: true
      }

    });

  if (!bed)
    throw new Error("BED_NOT_FOUND");

  if (bed.ward.hospitalId !== requestUser.hospitalId)
    throw new Error("BED_NOT_FOUND");

  const bedClaim =
    await tx.bed.updateMany({

      where: {
        id: bedId,
        status: "AVAILABLE"
      },

      data: {
        status: "OCCUPIED"
      }

    });

  if (bedClaim.count === 0)
    throw new Error("BED_NOT_AVAILABLE");

  //----------------------------------
  // VERIFY DOCTOR
  //----------------------------------

  const doctor =
    await tx.staff.findFirst({

      where: {

        id: attendingDoctorId,

        role: "DOCTOR",

        hospitalId: requestUser.hospitalId,

        isActive: true

      }

    });

  if (!doctor)
    throw new Error("DOCTOR_NOT_FOUND");

  //----------------------------------
  // CREATE ADMISSION
  //----------------------------------

  const admission =
    await tx.admission.create({

      data: {

        patientId: visit.patientId,

        visitId: visit.id,

        appointmentId: visit.appointmentId,

        medicalRecordId: visit.medicalRecord?.id ?? null,

        attendingDoctorId,

        admittedById: requestUser.id,

        bedId,

        reason

      },

      include: {

        patient: true,

        bed: {

          include: {

            ward: true

          }

        }

      }

    });

  //----------------------------------
  // UPDATE VISIT / APPOINTMENT / PATIENT
  //----------------------------------

  await tx.visit.update({
    where: { id: visit.id },
    data: { status: "ADMITTED" }
  });

  if (visit.appointmentId) {

    await tx.appointment.update({
      where: { id: visit.appointmentId },
      data: { status: "ADMITTED" }
    });

  }

  await tx.patient.update({
    where: { id: visit.patientId },
    data: { status: "ADMITTED" }
  });

  //----------------------------------
  // AUDIT
  //----------------------------------

  await tx.auditLog.create({

    data: {

      hospitalId: requestUser.hospitalId,

      staffId: requestUser.id,

      action: "ADMIT_PATIENT",

      entity: "ADMISSION",

      entityId: admission.id,

      details: "Patient admitted"

    }

  });

  return admission;

}

/*
|--------------------------------------------------------------------------
| ADMIT PATIENT (standalone entry point — direct/emergency admission)
|--------------------------------------------------------------------------
*/

export async function admitPatient(args) {

  const admission =
    await prisma.$transaction(async (tx) => {
      return admitPatientCore(tx, args);
    });

  try {

    await createNotification({

      hospitalId: args.requestUser.hospitalId,

      patientId: admission.patientId,

      type: "ADMISSION",

      title: "Patient Admitted",

      message:
        `You have been admitted to ${admission.bed.ward.name}`

    });

  } catch (err) {

    console.log("Failed to send admission notification:", err);

  }

  return admission;

}

/*
|--------------------------------------------------------------------------
| DISCHARGE / TRANSFER / CHANGE DOCTOR — unchanged
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| ORDER DISCHARGE (doctor) — records intent + instructions, doesn't finalize
|--------------------------------------------------------------------------
*/

export async function orderDischarge({

  admissionId,
  instructions,
  requestUser

}) {

  const admission =
    await prisma.admission.findFirst({
      where: { id: admissionId, patient: { hospitalId: requestUser.hospitalId } }
    });

  if (!admission) throw new Error("ADMISSION_NOT_FOUND");

  if (admission.status !== "ADMITTED") {
    throw new Error("DISCHARGE_ALREADY_IN_PROGRESS");
  }

  return prisma.admission.update({

    where: { id: admissionId },

    data: {
      status: "DISCHARGE_ORDERED",
      dischargeInstructions: instructions,
      dischargeOrderedById: requestUser.id,
      dischargeOrderedAt: new Date()
    }

  });

}

/*
|--------------------------------------------------------------------------
| CONFIRM DISCHARGE (nurse) — finalizes: bed billing, statuses, bed release
|--------------------------------------------------------------------------
*/

export async function confirmDischarge({

  admissionId,
  requestUser

}) {

  return prisma.$transaction(async (tx) => {

    const admission =
      await tx.admission.findFirst({
        where: { id: admissionId, patient: { hospitalId: requestUser.hospitalId } },
        include: {
          bed: { include: { ward: true } },
          transfers: { orderBy: { transferredAt: "asc" } }
        }
      });

    if (!admission) throw new Error("ADMISSION_NOT_FOUND");

    if (admission.status !== "DISCHARGE_ORDERED") {
      throw new Error("DISCHARGE_NOT_ORDERED");
    }

    const dischargedAt = new Date();

    // --- bed billing across all bed segments, unchanged from before ---
    const firstBedId = admission.transfers.length
      ? admission.transfers[0].fromBedId
      : admission.bedId;

    const segments = [];
    let cursorBedId = firstBedId;
    let cursorStart = admission.admittedAt;

    for (const transfer of admission.transfers) {
      segments.push({ bedId: cursorBedId, start: cursorStart, end: transfer.transferredAt });
      cursorBedId = transfer.toBedId;
      cursorStart = transfer.transferredAt;
    }
    segments.push({ bedId: cursorBedId, start: cursorStart, end: dischargedAt });

    const bedIds = [...new Set(segments.map((s) => s.bedId))];
    const beds = await tx.bed.findMany({ where: { id: { in: bedIds } }, include: { ward: true } });
    const bedMap = new Map(beds.map((b) => [b.id, b]));

    for (const segment of segments) {

      const bed = bedMap.get(segment.bedId);
      if (!bed || bed.dailyRate == null) continue;

      const nights = Math.max(
        1,
        Math.ceil((segment.end.getTime() - segment.start.getTime()) / (1000 * 60 * 60 * 24))
      );

      await createCharge({
        tx,
        patientId: admission.patientId,
        visitId: admission.visitId,
        hospitalId: requestUser.hospitalId,
        hospitalServiceId: null,
        unitPrice: bed.dailyRate,
        quantity: nights,
        description: `${bed.ward.name} Bed ${bed.bedNumber} — ${nights} night${nights !== 1 ? "s" : ""}`,
        sourceType: "BED",
        sourceId: admission.id,
        createdById: requestUser.id
      });

    }

    const updated =
      await tx.admission.update({
        where: { id: admission.id },
        data: { status: "DISCHARGED", dischargedAt }
      });

    if (admission.visitId) {
      await tx.visit.update({
        where: { id: admission.visitId },
        data: { status: "COMPLETED", completedAt: dischargedAt }
      });
    }

    await tx.patient.update({ where: { id: admission.patientId }, data: { status: "ACTIVE" } });
    await tx.bed.update({ where: { id: admission.bedId }, data: { status: "AVAILABLE" } });

    return updated;

  });

}

export async function transferPatient({

  admissionId,
  newBedId,
  reason,
  notes,
  requestUser

}) {

  const admission =
    await prisma.admission.findUnique({

      where: {
        id: admissionId
      }

    });

  if (!admission)
    throw new Error("ADMISSION_NOT_FOUND");

  const newBed =
    await prisma.bed.findUnique({

      where: {
        id: newBedId
      }

    });

  if (!newBed)
    throw new Error("BED_NOT_FOUND");

  await prisma.admissionTransfer.create({

    data: {

      admissionId,

      fromBedId:
        admission.bedId,

      toBedId:
        newBedId,

      reason,

      notes,

      transferredById:
        requestUser.id

    }

  });

  await prisma.bed.update({

    where: {
      id: admission.bedId
    },

    data: {
      status: "AVAILABLE"
    }

  });

  await prisma.bed.update({

    where: {
      id: newBedId
    },

    data: {
      status: "OCCUPIED"
    }

  });

  return prisma.admission.update({

    where: {
      id: admissionId
    },

    data: {
      bedId: newBedId
    }

  });

}

export async function changeAttendingDoctor({

  admissionId,
  doctorId

}) {

  return prisma.admission.update({

    where: {
      id: admissionId
    },

    data: {
      attendingDoctorId: doctorId
    }

  });

}

export async function getAdmissions({

  hospitalId

}) {

  return prisma.admission.findMany({

    where: {

      patient: {
        hospitalId
      }

    },

    include: {

      patient: true,

      bed: {

        include: {
          ward: true
        }

      },

      attendingDoctor: {

        select: {
          firstName: true,
          lastName: true
        }

      }

    }

  });

}

export async function getAdmission({

  admissionId,
  hospitalId

}) {

  return prisma.admission.findFirst({

    where: {
      id: admissionId,
      patient: {
        hospitalId
      }
    },

    include: {

      patient: true,

      bed: {

        include: {
          ward: true
        }

      },

      attendingDoctor: {

        select: {
          id: true,
          firstName: true,
          lastName: true,
          specialization: true
        }

      }

    }

  });

}

export async function getDoctorPatients({

  doctorId,
  hospitalId

}) {

  return prisma.admission.findMany({

    where: {

      attendingDoctorId: doctorId,

      status: { in: ["ADMITTED", "DISCHARGE_ORDERED"] },

      patient: {
        hospitalId
      }

    },

    include: {

      patient: true,

      bed: {

        include: {
          ward: true
        }

      }

    }

  });

}

// AFTER
export async function getWardPatients({ departmentId, hospitalId }) {
  return prisma.admission.findMany({
    where: {
      status: { in: ["ADMITTED", "DISCHARGE_ORDERED"] },
      patient: { hospitalId },
      bed: { ward: { departmentId } }
    },

    include: {

      patient: true,

      bed: {

        include: {
          ward: true
        }
      },
        attendingDoctor: {

        select: {
          firstName: true,
          lastName: true
        }

      }

    }

  });

}

/*
|--------------------------------------------------------------------------
| APPROVE ADMISSION REQUEST
|--------------------------------------------------------------------------
*/

export async function approveAdmissionRequest({

  requestId,
  bedId,
  attendingDoctorId,
  approvedById,
  hospitalId,
  
}) {

  return prisma.$transaction(async (tx) => {

    const request =
      await tx.admissionRequest.findFirst({

        where: {
          id: requestId,
          patient: {
            hospitalId
          }
        },

        include: {
          visit: {
            include: {
              appointment: true
            }
          },
          medicationDecisions: { include: { sourcePrescription: true } }
        }

      });

    if (!request)
      throw new Error("REQUEST_NOT_FOUND");

    if (request.status !== "PENDING")
      throw new Error("REQUEST_ALREADY_PROCESSED");

    if (!request.evaluationHospitalServiceId) {
      throw new Error(
        "This request has no evaluation service on file. Ask the requesting doctor to resubmit the admission request."
      );
    }

    const staff = await tx.staff.findFirst({
      where: {
        id: approvedById,
        hospitalId,
        isActive: true,
      },
    });

    if (!staff) {
      throw new Error("APPROVER_NOT_FOUND");
    }

    const evaluationService =
      await getConsultationHospitalService(

        tx,

        hospitalId,

        request.evaluationHospitalServiceId,

        "INPATIENT"

      );

    const appointmentId = request.visit.appointmentId;

    if (!appointmentId) {
      throw new Error("Admission request is not linked to an appointment.");
    }

    //----------------------------------
    // FINALIZE MEDICAL RECORD
    // (uses whatever the doctor already saved — nurse doesn't re-enter anything)
    //----------------------------------

    const existingRecord =
      await tx.medicalRecord.findUnique({
        where: {
          appointmentId
        }
      });

    if (!existingRecord) {
      throw new Error(
        "The requesting doctor hasn't saved consultation notes for this visit yet. Ask them to save a draft before this can be approved."
      );
    }

    const medicalRecord =
      await tx.medicalRecord.update({

        where: {
          appointmentId
        },

        data: {
          status: "FINAL"
        }

      });

    await tx.visit.update({

      where: {
        id: request.visitId
      },

      data: {
        medicalRecord: {
          connect: { id: medicalRecord.id }
        }
      }

    });

    //----------------------------------
    // ADMIT (creates admission + bed charge)
    //----------------------------------

    const admission = await admitPatientCore(tx, {
      visitId: request.visitId,
      bedId,
      attendingDoctorId,
      reason: request.reason,
      requestUser: {
        id: approvedById,
        hospitalId,
      },
    });

    for (const decision of request.medicationDecisions) {

      await createMedicationOrder({
        tx,
        admissionId: admission.id,
        visitId: request.visitId,
        doctorId: attendingDoctorId,
        medicationName: decision.sourcePrescription.medication,
        dosage: decision.dosage,
        frequency: decision.frequency,
        duration: decision.duration,
        route: decision.route,
        inventoryItemId: decision.sourcePrescription.inventoryItemId,
        orderType: decision.orderType,
        quantityLimit: decision.quantityLimit,
        scheduledTimes: decision.scheduledTimes ?? [],
        sourcePrescriptionId: decision.sourcePrescriptionId
      });

    }

    //----------------------------------
    // INPATIENT EVALUATION CHARGE
    //----------------------------------

    await createCharge({

      tx,

      patientId: request.patientId,

      visitId: request.visitId,

      hospitalId,

      serviceId: evaluationService.serviceId,

      hospitalServiceId: evaluationService.id,

      quantity: 1,

      unitPrice: evaluationService.price,

      description: evaluationService.service.name,

      sourceType: "CONSULTATION",

      sourceId: medicalRecord.id,

      createdById: approvedById

    });

    //----------------------------------
    // MARK REQUEST APPROVED
    //----------------------------------

    await tx.admissionRequest.update({
      where: {
        id: requestId,
      },
      data: {
        status: "APPROVED",
        approvedById,
      },
    });

    return admission;

  });

}

/*
|--------------------------------------------------------------------------
| REJECT ADMISSION REQUEST
|--------------------------------------------------------------------------
*/

export async function rejectAdmissionRequest({

  requestId,
  rejectedById,
  rejectionReason,
  hospitalId

}) {

  return prisma.$transaction(async (tx) => {

    const request =
      await tx.admissionRequest.findFirst({

        where: {
          id: requestId,
          patient: {
            hospitalId
          }
        },

        include: {
          visit: true
        }

      });

    if (!request)
      throw new Error("REQUEST_NOT_FOUND");

    if (request.status !== "PENDING")
      throw new Error("REQUEST_ALREADY_PROCESSED");

    const updated =
      await tx.admissionRequest.update({

        where: {
          id: requestId
        },

        data: {
          status: "REJECTED",
          approvedById: rejectedById,
          rejectionReason
        }

      });

    // Hand the visit back to the doctor — same status
    // saveProcedureResult already uses to signal "come back to this."
    await tx.visit.update({

      where: {
        id: request.visitId
      },

      data: {
        status: "READY_FOR_REVIEW"
      }

    });

    if (request.visit.appointmentId) {

      await tx.appointment.update({

        where: {
          id: request.visit.appointmentId
        },

        data: {
          status: "READY_FOR_REVIEW"
        }

      });

    }

    return updated;

  });

}