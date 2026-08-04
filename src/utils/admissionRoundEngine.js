import prisma from "./prisma.js";
import { createCharge } from "./billing/index.js";
import { getConsultationHospitalService } from "./serviceEngine.js";

function startOfDay(date = new Date()) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function isSameDay(a, b) {
  return startOfDay(a).getTime() === startOfDay(new Date(b)).getTime();
}

/*
|--------------------------------------------------------------------------
| Auto-records today's round using the hospital default if one exists.
| Day of admission itself needs nothing — already covered by the
| one-time evaluation charge at approval.
| Throws ROUND_SERVICE_REQUIRED if no default is configured and none
| was explicitly provided — caller should prompt the doctor to pick one.
|--------------------------------------------------------------------------
*/

export async function ensureDailyRound({ admissionId, hospitalId, staffId, hospitalServiceId = null }) {

  return prisma.$transaction(async (tx) => {

    const admission =
      await tx.admission.findFirst({
        where: { id: admissionId, patient: { hospitalId } }
      });

    if (!admission) throw new Error("ADMISSION_NOT_FOUND");

    if (isSameDay(admission.admittedAt, new Date())) {
      return null; // covered by the evaluation charge already
    }

    const today = startOfDay();

    const existing =
      await tx.admissionDailyRound.findUnique({
        where: { admissionId_roundDate: { admissionId, roundDate: today } }
      });

    if (existing) return existing;

    let resolvedServiceId = hospitalServiceId;

    if (!resolvedServiceId) {

      const hospital =
        await tx.hospital.findUnique({
          where: { id: hospitalId },
          select: { defaultDailyRoundServiceId: true }
        });

      resolvedServiceId = hospital?.defaultDailyRoundServiceId ?? null;

    }

    if (!resolvedServiceId) {
      throw new Error("ROUND_SERVICE_REQUIRED");
    }

    const service =
      await getConsultationHospitalService(tx, hospitalId, resolvedServiceId, "INPATIENT");

    const charge =
      await createCharge({
        tx,
        patientId: admission.patientId,
        visitId: admission.visitId,
        hospitalId,
        serviceId: service.serviceId,
        hospitalServiceId: service.id,
        quantity: 1,
        unitPrice: service.price,
        description: `${service.service.name} — Daily Round (${today.toISOString().slice(0, 10)})`,
        sourceType: "CONSULTATION",
        sourceId: admission.id,
        createdById: staffId
      });

    return tx.admissionDailyRound.create({
      data: {
        admissionId,
        roundDate: today,
        hospitalServiceId: resolvedServiceId,
        recordedById: staffId,
        chargeId: charge.id
      }
    });

  });

}

export async function getTodayRoundStatus({ admissionId, hospitalId }) {

  const admission =
    await prisma.admission.findFirst({ where: { id: admissionId, patient: { hospitalId } } });

  if (!admission) throw new Error("ADMISSION_NOT_FOUND");

  if (isSameDay(admission.admittedAt, new Date())) {
    return { required: false, coveredByAdmissionDay: true, round: null };
  }

  const today = startOfDay();

  const round =
    await prisma.admissionDailyRound.findUnique({
      where: { admissionId_roundDate: { admissionId, roundDate: today } },
      include: { hospitalService: { include: { service: true } }, recordedBy: { select: { firstName: true, lastName: true } } }
    });

  return { required: !round, coveredByAdmissionDay: false, round };

}