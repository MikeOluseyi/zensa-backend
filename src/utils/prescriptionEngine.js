import prisma from "./prisma.js";

export async function createPrescription({
    tx,
    medicalRecordId,
    visitId,
    patientId,
    hospitalId,

    inventoryItemId,

    dosage,
    frequency,
    duration,
    quantity,
    instructions,

    prescribedById

}) {

    const inventoryItem =
    await tx.inventoryItem.findFirst({

        where: {

            id: inventoryItemId,

            hospitalId

        }

    });

    if (!inventoryItem)
        throw new Error("Medication not found.");

    //--------------------------------------------------
// Ensure Medical Record exists
//--------------------------------------------------

const medicalRecord =
    await tx.medicalRecord.findUnique({

        where: {

            id: medicalRecordId

        }

    });

if (!medicalRecord) {

    throw new Error(
        "Medical record not found."
    );

}

    const prescription =
    await tx.prescription.create({

        data: {
            medicalRecordId,
            visitId,
            inventoryItemId,
            medication: inventoryItem.name,
            dosage,
            frequency,
            duration,
            quantity,
            saleUnit: inventoryItem.saleUnit,
            instructions,
            prescribedById
        }

    });

return { prescription, inventoryItem };

}



const PRESCRIPTION_UPDATABLE_FIELDS = [
  "dosage", "frequency", "duration", "quantity", "instructions"
];

export async function updatePrescription({

    prescriptionId,

    updates

}) {

    const existing =
        await prisma.prescription.findUnique({

            where: {
                id: prescriptionId
            }

        });

    if (!existing)
        throw new Error("Prescription not found.");

    if (existing.status === "DISPENSED")
        throw new Error("Cannot edit a prescription that has already been dispensed.");

    const data = {};

    for (const field of PRESCRIPTION_UPDATABLE_FIELDS) {

        if (updates[field] !== undefined) {
            data[field] = updates[field];
        }

    }

    return prisma.prescription.update({

        where: {

            id: prescriptionId

        },

        data

    });

}



export async function deletePrescription(

    prescriptionId

) {

    const existing =
        await prisma.prescription.findUnique({

            where: {
                id: prescriptionId
            }

        });

    if (!existing)
        throw new Error("Prescription not found.");

    if (existing.status === "DISPENSED")
        throw new Error("Cannot delete a prescription that has already been dispensed.");

    return prisma.prescription.delete({

        where: {

            id: prescriptionId

        }

    });

}