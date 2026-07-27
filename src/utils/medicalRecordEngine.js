import prisma from "../utils/prisma.js";

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

async function verifyICD10(tx, icd10Id) {

  if (!icd10Id) return;

  const icd =
    await tx.iCD10Code.findUnique({

      where: {
        id: icd10Id
      }

    });

  if (!icd) {
    throw new Error("Invalid ICD10 code.");
  }

}

const MEDICAL_RECORD_INCLUDE = {

  patient: true,

  doctor: {
    select: {
      id: true,
      firstName: true,
      lastName: true,
      specialization: true
    }
  },

  icd10: true,

  appointment: true,

  visit: true,

  prescriptions: {
    include: {
      inventoryItem: true
    }
  },

  services: {
    include: {
      hospitalService: {
        include: {
          service: {
            include: {
              cpt: true
            }
          }
        }
      }
    }
  }

};

// Fields a caller is allowed to modify directly.
// Deliberately excludes patientId, doctorId, appointmentId, visitId, status
// so a client can't reassign a record to a different patient/visit via update.
const UPDATABLE_FIELDS = [
  "chiefComplaint",
  "historyOfComplaint",
  "diagnosis",
  "icd10Id",
  "treatment",
  "notes"
];

function pickUpdatableFields(body = {}) {

  const data = {};

  for (const field of UPDATABLE_FIELDS) {

    if (body[field] !== undefined) {
      data[field] = body[field];
    }

  }

  return data;

}

/*
|--------------------------------------------------------------------------
| CREATE OR UPDATE MEDICAL RECORD
|--------------------------------------------------------------------------
*/

export async function createOrUpdateMedicalRecord({

  appointmentId,

  hospitalId,

  doctorId,

  chiefComplaint,

  historyOfComplaint,

  diagnosis,

  icd10Id,

  treatment,

  notes,

  prescriptions = []

}) {

  return prisma.$transaction(async (tx) => {

    const appointment =
      await getAppointment(

        tx,

        appointmentId,

        hospitalId

      );

    const visit =
      await getVisit(

        tx,

        appointment.id

      );

    await verifyICD10(

      tx,

      icd10Id

    );

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

          patientId:
            appointment.patientId,

          visitId:
            visit.id,

          doctorId,

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

     for (const p of prescriptions) {

      if (p.id) {

        await tx.prescription.update({
          where: { id: p.id },
          data: {
            dosage: p.dosage, frequency: p.frequency, duration: p.duration,
            quantity: p.quantity, instructions: p.instructions,
            inventoryItemId: p.inventoryItemId, saleUnit: p.saleUnit, route: p.route
          }
        });

      } else {

        await tx.prescription.create({
          data: {
            medicalRecordId: medicalRecord.id,
            medication: p.medication,
            dosage: p.dosage, frequency: p.frequency, duration: p.duration,
            quantity: p.quantity, instructions: p.instructions,
            inventoryItemId: p.inventoryItemId, saleUnit: p.saleUnit,
            prescribedById: doctorId, route: p.route
          }
        });

      }

    }

    await tx.auditLog.create({

      data: {

        hospitalId,

        staffId:
          doctorId,

        action:
          "SAVE_MEDICAL_RECORD",

        entity:
          "MEDICAL_RECORD",

        entityId:
          medicalRecord.id,

        details:
          `Saved medical record for appointment ${appointmentId}`

      }

    });

    return medicalRecord;

  });

}

/*
|--------------------------------------------------------------------------
| GET ALL MEDICAL RECORDS FOR A HOSPITAL
|--------------------------------------------------------------------------
*/

export async function getMedicalRecords(hospitalId) {

  return prisma.medicalRecord.findMany({

    where: {
      patient: {
        hospitalId
      }
    },

    include: MEDICAL_RECORD_INCLUDE,

    orderBy: {
      createdAt: "desc"
    }

  });

}

/*
|--------------------------------------------------------------------------
| GET ONE MEDICAL RECORD
|--------------------------------------------------------------------------
*/

export async function getMedicalRecord(id, hospitalId) {

  const record =
    await prisma.medicalRecord.findFirst({

      where: {
        id,
        patient: {
          hospitalId
        }
      },

      include: MEDICAL_RECORD_INCLUDE

    });

  if (!record) {
    throw new Error("Medical record not found.");
  }

  return record;

}

/*
|--------------------------------------------------------------------------
| GET MEDICAL RECORDS FOR A PATIENT
|--------------------------------------------------------------------------
*/

export async function getPatientMedicalRecords(patientId, hospitalId) {

  return prisma.medicalRecord.findMany({

    where: {
      patientId,
      patient: {
        hospitalId
      }
    },

    include: MEDICAL_RECORD_INCLUDE,

    orderBy: {
      createdAt: "desc"
    }

  });

}

/*
|--------------------------------------------------------------------------
| GET MEDICAL RECORD FOR AN APPOINTMENT
|--------------------------------------------------------------------------
*/

export async function getAppointmentMedicalRecord(appointmentId, hospitalId) {

  const record =
    await prisma.medicalRecord.findFirst({

      where: {
        appointmentId,
        patient: {
          hospitalId
        }
      },

      include: MEDICAL_RECORD_INCLUDE

    });

  if (!record) {
    throw new Error("Medical record not found for this appointment.");
  }

  return record;

}

/*
|--------------------------------------------------------------------------
| UPDATE MEDICAL RECORD
|--------------------------------------------------------------------------
*/

export async function updateMedicalRecord(id, body, hospitalId) {

  const existing =
    await prisma.medicalRecord.findFirst({

      where: {
        id,
        patient: {
          hospitalId
        }
      }

    });

  if (!existing) {
    throw new Error("Medical record not found.");
  }

  const data = pickUpdatableFields(body);

  if (data.icd10Id !== undefined) {
    await verifyICD10(prisma, data.icd10Id);
  }

  return prisma.medicalRecord.update({

    where: {
      id
    },

    data,

    include: MEDICAL_RECORD_INCLUDE

  });

}

/*
|--------------------------------------------------------------------------
| DELETE MEDICAL RECORD
|--------------------------------------------------------------------------
*/

export async function deleteMedicalRecord(id, hospitalId) {

  const existing =
    await prisma.medicalRecord.findFirst({

      where: {
        id,
        patient: {
          hospitalId
        }
      }

    });

  if (!existing) {
    throw new Error("Medical record not found.");
  }

  await prisma.medicalRecord.delete({

    where: {
      id
    }

  });

}