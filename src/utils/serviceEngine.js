import prisma from "./prisma.js";

import { createCharge } from "./billing/createCharge.js";

import {

    createProcedureRequest

} from "./procedureEngine.js";

// AFTER
function determineWorkflow(category) {

    switch (category) {

        case "CONSULTATION":

            return "IMMEDIATE";

        case "SPECIALIST":

            return "RESULT_REQUIRED";

        default:

            throw new Error(

                `Unknown service category ${category}`

            );

    }

}

export async function getConsultationHospitalService(tx, hospitalId, hospitalServiceId, expectedVisitSetting) {

  if (!hospitalServiceId) {
    throw new Error("A service must be selected.");
  }

  const service = await tx.hospitalService.findFirst({
    where: { id: hospitalServiceId, hospitalId, active: true },
    include: { service: { include: { cpt: true } } }
  });

  if (!service) {
    throw new Error("Invalid service.");
  }

  if (service.service.category !== "CONSULTATION") {
    throw new Error("Selected service is not a consultation service.");
  }

  if (expectedVisitSetting && service.service.visitSetting !== expectedVisitSetting) {
    throw new Error(
      expectedVisitSetting === "INPATIENT"
        ? "Selected service is not configured for inpatient evaluations."
        : "Selected service is not configured for outpatient consultations."
    );
  }

  if (service.price == null) {
    throw new Error(`${service.service.name} has no price configured.`);
  }

  return service;

}

export async function createMedicalRecordService({

    tx,

    medicalRecordId,

    visitId,

    patientId,

    hospitalId,

    hospitalServiceId,

    orderedById,

    notes

}) {

        const hospitalService =
            await tx.hospitalService.findFirst({

                where: {

                    id: hospitalServiceId,

                    hospitalId,

                    active: true

                },

                include: {

                    service: {

                        include: {

                            cpt: true

                        }

                    }

                }

            });

        if (!hospitalService)

            throw new Error(

                "Hospital service not found."

            );

        const workflow =
            determineWorkflow(

                hospitalService.service.category

            );

        const medicalRecordService =
            await tx.medicalRecordService.create({

                data: {

                    medicalRecordId,

                    hospitalServiceId,

                    orderedById,

                    workflow,

                    notes

                }

            });

            const chargeSourceType =
            hospitalService.service.category === "CONSULTATION"
                ? "CONSULTATION"
                : "PROCEDURE";

        await createCharge({

    tx,

    patientId,

    visitId,

    hospitalId,

    serviceId:
        hospitalService.serviceId,

    quantity: 1,

    unitPrice:
        hospitalService.price,

    description:
        hospitalService.service.name,

    sourceType:
        chargeSourceType,

    sourceId:
        medicalRecordService.id,

    createdById:
        orderedById

});

        switch (workflow) {

            case "IMMEDIATE":

                await tx.medicalRecordService.update({

                    where: {

                        id: medicalRecordService.id

                    },

                    data: {

                        status: "COMPLETED"

                    }

                });

                break;

           case "RESULT_REQUIRED":

                await createProcedureRequest({

                    tx,

                    medicalRecordServiceId:
                        medicalRecordService.id,

                    visitId,

                    notes

                });

                break;

            case "ADMISSION":

                // Admission engine later

                break;

        }

        return medicalRecordService;


}