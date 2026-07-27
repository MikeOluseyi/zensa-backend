import prisma from "../utils/prisma.js";

import { createCharge } from "../utils/billing/createCharge.js";

import { createPrescription } from "./prescriptionEngine.js";

import { createMedicalRecordService, getConsultationHospitalService }
from "../utils/serviceEngine.js";

/*
|--------------------------------------------------------------------------
| PRIVATE HELPERS
|--------------------------------------------------------------------------
*/

async function getAppointment(tx, appointmentId, hospitalId) {

  const appointment =
    await tx.appointment.findFirst({

      where: {
        id: appointmentId,
        hospitalId
      }

    });

  if (!appointment) {
    throw new Error("Appointment not found.");
  }

  return appointment;

}

async function getVisit(tx, appointmentId) {

  const visit =
    await tx.visit.findFirst({

      where: {
        appointmentId
      }

    });

  if (!visit) {
    throw new Error("Visit not found.");
  }

  return visit;

}

async function verifyDoctorOwnership(
  appointment,
  user
) {

  if (
    user.role === "DOCTOR" &&
    appointment.doctorId !== user.id
  ) {

    throw new Error(
      "This appointment belongs to another doctor."
    );

  }

}

async function verifyICD10(
  tx,
  icd10Id
) {

  if (!icd10Id) return;

  const icd =
    await tx.iCD10Code.findUnique({

      where: { id: icd10Id }

    });

  if (!icd)
    throw new Error(
      "Invalid ICD10."
    );

}

async function updateAppointmentStatus(

  tx,

  appointmentId,

  status

) {

  return tx.appointment.update({

    where: {
      id: appointmentId
    },

    data: {
      status
    }

  });

}

async function updateVisitStatus(

  tx,

  visitId,

  status

) {

  const data = {
    status
  };

  if (status === "COMPLETED") {
    data.completedAt = new Date();
  }

  return tx.visit.update({

    where: {
      id: visitId
    },

    data

  });

}

/*
|--------------------------------------------------------------------------
| START CONSULTATION
|--------------------------------------------------------------------------
*/

export async function startConsultation({

  appointmentId,

  user

}) {

  return prisma.$transaction(

    async (tx) => {

      const appointment =
        await getAppointment(

          tx,

          appointmentId,

          user.hospitalId

        );

      if (
        appointment.status !== "QUEUED"
      ) {

        throw new Error(
          "Patient is not in queue."
        );

      }

      await verifyDoctorOwnership(

        appointment,

        user

      );

      const visit =
        await getVisit(

          tx,

          appointment.id

        );

      

     const updatedAppointment =
  await updateAppointmentStatus(

    tx,

    appointment.id,

    "IN_PROGRESS"

  );

const updatedVisit =
  await updateVisitStatus(

    tx,

    visit.id,

    "IN_CONSULTATION"

  );

      

      await tx.auditLog.create({

        data: {

          hospitalId: user.hospitalId,

          staffId: user.id,

          action: "START_CONSULTATION",

          entity: "APPOINTMENT",

          entityId: appointment.id,

          details: `Started consultation ${appointment.id}`

        }

      });

      return {

  appointment: updatedAppointment,

  visit: updatedVisit,

};

    }

  );

}

// ==========================================
// COMPLETE CONSULTATION
// ==========================================

export async function completeConsultation({

  appointmentId,

  user,

  consultationHospitalServiceId,

  chiefComplaint,

  historyOfComplaint,

  diagnosis,

  icd10Id,

  treatment,

  notes,

  prescriptions = [],

  procedures = []

}) {

  const completedById = user.id;

  return await prisma.$transaction(async (tx) => {

    // AFTER
const appointment =
  await getAppointment(
    tx,
    appointmentId,
    user.hospitalId
  );

   if (appointment.status === "ADMISSION_REQUESTED") {
  throw new Error("Admission was requested for this visit — the consultation is already closed.");
}

    if (appointment.status !== "IN_PROGRESS") {
      throw new Error("Consultation has not started.");
    }

    if (
      user.role === "DOCTOR" &&
      appointment.doctorId !== user.id
    ) {

      throw new Error(
        "This appointment belongs to another doctor."
      );

    }

    await verifyICD10(
      tx,
      icd10Id
    );

    await verifyICD10(
      tx,
      icd10Id
    );

    const visit =
  await tx.visit.findFirst({

    where: {

      appointmentId

    }

  });

if (!visit) {

  throw new Error("Visit not found.");

}

const medicalRecord =
  await tx.medicalRecord.upsert({

    where: {

      appointmentId

    },

    update: {

      visitId: visit.id,

      chiefComplaint,

      historyOfComplaint,

      diagnosis,

      icd10Id,

      treatment,

      notes,

      status: "FINAL"

    },

    create: {

      appointmentId,

      patientId: appointment.patientId,

      visitId: visit.id,

      doctorId: appointment.doctorId,

      chiefComplaint,

      historyOfComplaint,

      diagnosis,

      icd10Id,

      treatment,

      notes,

      status: "FINAL"

    }

  });

await tx.visit.update({

  where: {

    id: visit.id

  },

  data: {

   medicalRecord: {

            connect: {

                id: medicalRecord.id

            }
   }
  }

});

const consultationHospitalService =
    await getConsultationHospitalService(

        tx,

        appointment.hospitalId,
        
        consultationHospitalServiceId,
        
        "OUTPATIENT"

    );

await createCharge({

    tx,

    patientId: appointment.patientId,

    visitId: visit.id,

    hospitalId: appointment.hospitalId,

    serviceId: consultationHospitalService.serviceId,

    hospitalServiceId: consultationHospitalService.id,

    quantity: 1,

    unitPrice: consultationHospitalService.price,

    description: consultationHospitalService.service.name,

    sourceType: "CONSULTATION",

    sourceId: medicalRecord.id,

    createdById: completedById

});

//--------------------------------------------------
// Create Prescriptions
//--------------------------------------------------

for (const prescription of prescriptions) {

  console.log(
    "Prescriptions received:",
    prescriptions
);

console.log("Medical Record ID:", medicalRecord.id);
console.log("Medical Record:", medicalRecord);

const createdPrescription = await createPrescription({
    tx,
  
    medicalRecordId: medicalRecord.id,

    visitId: visit.id,

    patientId: appointment.patientId,

    hospitalId: appointment.hospitalId,

    inventoryItemId: prescription.inventoryItemId,

    dosage: prescription.dosage,

    frequency: prescription.frequency,

    duration: prescription.duration,

    quantity: prescription.quantity,

    instructions: prescription.instructions,

    prescribedById: completedById

});

if (createdPrescription.inventoryItem.sellingPrice == null) {

    throw new Error(
        `${createdPrescription.inventoryItem.name} has no selling price configured.`
    );

}

await createCharge({
    tx,

    patientId: appointment.patientId,

    visitId: visit.id,

    hospitalId: appointment.hospitalId,

    serviceId: null,

    hospitalServiceId: null,

    quantity: prescription.quantity,

    unitPrice: createdPrescription.inventoryItem.sellingPrice,

    description: createdPrescription.inventoryItem.name,

    sourceType: "MEDICATION",

    sourceId: createdPrescription.prescription.id,

    createdById: completedById
});
}

//--------------------------------------------------
// Create Medical Record Services
//--------------------------------------------------

for (const procedure of procedures) {

  console.log(
    "Procedures received:",
    procedures
);

    await createMedicalRecordService({

      tx,

        medicalRecordId:
            medicalRecord.id,

        visitId:
            visit.id,

        patientId:
            appointment.patientId,

        hospitalId:
            appointment.hospitalId,

        hospitalServiceId:
            procedure.hospitalServiceId,

        orderedById:
            completedById,

        notes:
            procedure.notes

    });

}

 const pendingServices =
await tx.medicalRecordService.count({

    where:{

        medicalRecordId: medicalRecord.id,

        workflow:"RESULT_REQUIRED",

        status:{
            in:[
                "PENDING",
                "IN_PROGRESS"
            ]
        }

    }

});

await tx.auditLog.create({

  data: {

    hospitalId: appointment.hospitalId,

    staffId: completedById,

    action: "SAVE_MEDICAL_RECORD",

    entity: "MEDICAL_RECORD",

    entityId: medicalRecord.id,

    details:
      `Medical record saved for appointment ${appointment.id}`

  }

});

    const updatedAppointment =
  await tx.appointment.update({

    where: {
      id: appointment.id
    },

    data: {

      status:

        pendingServices > 0

          ? "AWAITING_RESULTS"

          : "COMPLETED"

    }

  });

      await tx.visit.update({

  where: {
    id: visit.id
  },

  data: {

    status:

      pendingServices > 0

        ? "AWAITING_RESULTS"

        : "COMPLETED",

    completedAt:

      pendingServices > 0

        ? null

        : new Date()

  }

});

    await tx.auditLog.create({

      data: {

        hospitalId: appointment.hospitalId,

        staffId: completedById,

        action: "COMPLETE_CONSULTATION",

        entity: "APPOINTMENT",

        entityId: appointment.id,

        details: `Completed consultation for appointment ${appointment.id}`

      }

    });

    return updatedAppointment;

  });

}
