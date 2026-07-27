import prisma from "../prisma.js";

function staffName(staff) {
  if (!staff) return null;
  return `${staff.firstName} ${staff.lastName}`;
}

function buildEncounterTimeline(visit) {

  if (!visit) return [];

  const events = [];

  //----------------------------------
  // VITALS
  //----------------------------------

  for (const vital of visit.vitalRecords ?? []) {

    const parts = [];

    if (vital.systolicBP && vital.diastolicBP) parts.push(`BP ${vital.systolicBP}/${vital.diastolicBP}`);
    if (vital.temperature != null) parts.push(`Temp ${vital.temperature}°C`);
    if (vital.weight != null) parts.push(`Weight ${vital.weight}kg`);
    if (vital.pulse != null) parts.push(`Pulse ${vital.pulse}bpm`);
    if (vital.oxygenSaturation != null) parts.push(`SpO₂ ${vital.oxygenSaturation}%`);

    events.push({
      type: "VITALS",
      time: vital.createdAt,
      actor: staffName(vital.recordedBy),
      actorRole: "Nurse",
      description: `Vitals logged: ${parts.join(", ") || "recorded"}`
    });

  }

  //----------------------------------
  // CONSULTATION / MEDICAL RECORD
  //----------------------------------

  if (visit.medicalRecord) {

    const record = visit.medicalRecord;

    if (record.chiefComplaint) {

      events.push({
        type: "CONSULTATION",
        time: record.createdAt,
        actor: staffName(record.doctor),
        actorRole: "Doctor",
        description: `Consultation: ${record.chiefComplaint}`
      });

    }

    if (record.diagnosis) {

      events.push({
        type: "DIAGNOSIS",
        time: record.updatedAt ?? record.createdAt,
        actor: staffName(record.doctor),
        actorRole: "Doctor",
        description: `Diagnosis confirmed: ${record.diagnosis}${record.icd10 ? ` (ICD-10: ${record.icd10.code})` : ""}`
      });

    }

  }

  //----------------------------------
  // PROCEDURES / LAB & RADIOLOGY
  //----------------------------------

  for (const request of visit.procedureRequests ?? []) {

    const serviceName =
      request.medicalRecordService?.hospitalService?.service?.name ?? "Procedure";

    events.push({
      type: "PROCEDURE_ORDER",
      time: request.createdAt,
      actor: staffName(request.medicalRecordService?.orderedBy),
      actorRole: "Doctor",
      description: `Order created: ${serviceName}`
    });

    if (request.procedureResult) {

      events.push({
        type: "PROCEDURE_RESULT",
        time: request.procedureResult.createdAt,
        actor: staffName(request.procedureResult.performedBy),
        actorRole: "Lab/Radiology",
        description: `Result: ${serviceName} — ${request.procedureResult.results}`
      });

    }

  }

  //----------------------------------
  // PRESCRIPTIONS
  //----------------------------------

  for (const prescription of visit.prescriptions ?? []) {

    events.push({
      type: "PRESCRIPTION",
      time: prescription.createdAt,
      actor: staffName(prescription.prescribedBy),
      actorRole: "Doctor",
      description: `Prescribed: ${prescription.medication} — ${prescription.dosage}, ${prescription.frequency}`
    });

    if (prescription.dispensedAt) {

      events.push({
        type: "DISPENSED",
        time: prescription.dispensedAt,
        actor: staffName(prescription.dispensedBy),
        actorRole: "Pharmacist",
        description: `Dispensed: ${prescription.medication}`
      });

    }

  }

  //----------------------------------
  // ADMISSION
  //----------------------------------

  if (visit.admission) {

    const admission = visit.admission;

    events.push({
      type: "ADMISSION",
      time: admission.admittedAt,
      actor: staffName(admission.attendingDoctor),
      actorRole: "Doctor",
      description: `Admitted to ${admission.bed.ward.name}, Bed ${admission.bed.bedNumber}${admission.reason ? ` — ${admission.reason}` : ""}`
    });

    for (const note of admission.doctorNotes ?? []) {

      const summary = [note.subjective, note.assessment].filter(Boolean).join(" — ");

      events.push({
        type: "DOCTOR_REVIEW",
        time: note.createdAt,
        actor: staffName(note.doctor),
        actorRole: "Doctor",
        description: `Doctor review${summary ? `: ${summary}` : ""}`
      });

    }

    for (const note of admission.nursingNotes ?? []) {

      events.push({
        type: "NURSING_NOTE",
        time: note.createdAt,
        actor: staffName(note.nurse),
        actorRole: "Nurse",
        description: `Nursing note: ${note.note}`
      });

    }

    for (const order of admission.medicationOrders ?? []) {

      events.push({
        type: "MEDICATION_ORDER",
        time: order.createdAt,
        actor: staffName(order.doctor),
        actorRole: "Doctor",
        description: `Inpatient order: ${order.medicationName} — ${order.dosage}, ${order.route}`
      });

      for (const dose of order.administrations ?? []) {

        if (dose.status === "PENDING") continue;

        events.push({
          type: "MEDICATION_ADMINISTERED",
          time: dose.administeredAt ?? dose.scheduledAt,
          actor: staffName(dose.administeredBy),
          actorRole: "Nurse",
          description: `${order.medicationName} — ${dose.status.toLowerCase()}`
        });

      }

    }

    if (admission.dischargedAt) {

      events.push({
        type: "DISCHARGE",
        time: admission.dischargedAt,
        actor: null,
        actorRole: "",
        description: `Discharged from ${admission.bed.ward.name}, Bed ${admission.bed.bedNumber}`
      });

    }

  }

  events.sort((a, b) => new Date(a.time) - new Date(b.time));

  return events;

}

export async function buildClaimDTO(claimId) {

  const claim = await prisma.claim.findUnique({

    where: {
      id: claimId
    },

    include: {

      patient: true,

      insurance: {

        include: {

          provider: {
            include: {
              organization: true
            }
          }

        }

      },

      invoice: {

        include: {

          hospital: true,

          charges: {

            include: {

              service: {
                include: { cpt: true }
              },

              hospitalService: {
                include: {
                  service: { include: { cpt: true } }
                }
              }

            }

          },

          visit: {

            include: {

              vitalRecords: {

                include: {
                  recordedBy: {
                    select: { firstName: true, lastName: true }
                  }
                },

                orderBy: { createdAt: "asc" }

              },

              medicalRecord: {

                include: {
                  doctor: { select: { firstName: true, lastName: true } },
                  icd10: true
                }

              },

              prescriptions: {

                include: {
                  prescribedBy: { select: { firstName: true, lastName: true } },
                  dispensedBy: { select: { firstName: true, lastName: true } }
                },

                orderBy: { createdAt: "asc" }

              },

              procedureRequests: {

                include: {

                  medicalRecordService: {

                    include: {

                      hospitalService: {
                        include: {
                          service: { include: { cpt: true } }
                        }
                      },

                      orderedBy: { select: { firstName: true, lastName: true } }

                    }

                  },

                  procedureResult: {
                    include: {
                      performedBy: { select: { firstName: true, lastName: true } }
                    }
                  }

                },

                orderBy: { createdAt: "asc" }

              },

              admission: {

                include: {

                  bed: { include: { ward: true } },

                  attendingDoctor: { select: { firstName: true, lastName: true } },

                  doctorNotes: {
                    include: { doctor: { select: { firstName: true, lastName: true } } },
                    orderBy: { createdAt: "asc" }
                  },

                  nursingNotes: {
                    include: { nurse: { select: { firstName: true, lastName: true } } },
                    orderBy: { createdAt: "asc" }
                  },

                  medicationOrders: {
                    include: {
                      doctor: { select: { firstName: true, lastName: true } },
                      administrations: {
                        include: { administeredBy: { select: { firstName: true, lastName: true } } },
                        orderBy: { scheduledAt: "asc" }
                      }
                    }
                  }

                }

              }

            }

          }

        }

      },

      attachments: true

    }

  });

  if (!claim) {
    throw new Error("Claim not found");
  }

  const total =
    claim.invoice.subtotal -
    claim.invoice.discount +
    claim.invoice.tax;

  const diagnosis =
    claim.invoice.visit?.medicalRecord?.diagnosis ?? null;

  const diagnosisCode =
    claim.invoice.visit?.medicalRecord?.icd10?.code ?? null;

  const timeline = buildEncounterTimeline(claim.invoice.visit);

  const medicationCharges =
    claim.invoice.charges.filter(c => c.sourceType === "MEDICATION" && c.sourceId);

  const medicationSourceIds = medicationCharges.map(c => c.sourceId);

  const [prescriptionSources, orderSources] = await Promise.all([

    prisma.prescription.findMany({
      where: { id: { in: medicationSourceIds } },
      include: { inventoryItem: { select: { sku: true } } }
    }),

    prisma.admissionMedicationOrder.findMany({
      where: { id: { in: medicationSourceIds } },
      include: { inventoryItem: { select: { sku: true } } }
    })

  ]);

  const skuMap = new Map();

  for (const p of prescriptionSources) {
    if (p.inventoryItem?.sku) skuMap.set(p.id, p.inventoryItem.sku);
  }

  for (const o of orderSources) {
    if (o.inventoryItem?.sku) skuMap.set(o.id, o.inventoryItem.sku);
  }

  return {

    version: 2,

    claim: {

      id: claim.id,

      claimNumber: claim.claimNumber,

      status: claim.status,

      createdAt: claim.createdAt,

      submittedAt: claim.submittedAt,

      processedAt: claim.processedAt,

      paidAt: claim.paidAt,

      totalAmount: claim.totalAmount,

      approvedAmount: claim.approvedAmount,

      rejectionReason: claim.rejectionReason,

      currency: claim.currency

    },

    hospital: {

      id: claim.invoice.hospital.id,

      name: claim.invoice.hospital.name,

      facilityCode: claim.invoice.hospital.facilityCode ?? null,

      address: claim.invoice.hospital.address ?? null,

      phone: claim.invoice.hospital.phone ?? null,

      email: claim.invoice.hospital.email ?? null,

      taxId: claim.invoice.hospital.taxId ?? null

    },

    patient: {

      id: claim.patient.id,

      hospitalId: claim.patient.hospitalId,

      patientNumber: claim.patient.patientNumber,

      firstName: claim.patient.firstName,

      middleName: claim.patient.middleName ?? null,

      lastName: claim.patient.lastName,

      gender: claim.patient.gender,

      dateOfBirth: claim.patient.dateOfBirth,

      phone: claim.patient.phone ?? null,

      email: claim.patient.email ?? null,

      address: claim.patient.address ?? null,

      nationalId: claim.patient.nationalId ?? null

    },

    insurance: {

      providerId: claim.insurance.provider.id,

      providerName: claim.insurance.provider.organization.name,

      integrationMode: claim.insurance.provider.integrationMode,

      policyNumber: claim.insurance.policyNumber,

      memberId: claim.insurance.memberId ?? null,

      authorizationNumber: claim.insurance.authorizationNumber ?? null,

      coveragePercent: claim.insurance.coveragePercent ?? null

    },

    encounter: {

      checkIn: claim.invoice.visit?.startedAt ?? null,

      checkOut: claim.invoice.visit?.completedAt ?? null

    },

    timeline,

    invoice: {

      id: claim.invoice.id,

      invoiceNumber: claim.invoice.invoiceNumber,

      invoiceDate: claim.invoice.createdAt,

      subtotal: claim.invoice.subtotal,

      discount: claim.invoice.discount,

      tax: claim.invoice.tax,

      total,

      insuranceAmount: claim.invoice.insuranceAmount ?? claim.totalAmount,

      patientAmount: claim.invoice.patientAmount ?? 0,

      serviceDate: claim.invoice.serviceDate ?? claim.invoice.createdAt,

      diagnosis,

      diagnosisCode,

      charges: claim.invoice.charges.map(c => {

        const cpt =
          c.service?.cpt ??
          c.hospitalService?.service?.cpt ??
          null;

        const sku =
          c.sourceType === "MEDICATION"
            ? skuMap.get(c.sourceId) ?? null
            : null;

        return {

          id: c.id,

          itemType: cpt ? "SERVICE" : sku ? "DRUG" : "OTHER",

          code: cpt?.code ?? null,

          sku,

          department: c.hospitalService?.department?.name ?? null,

          description: c.description,

          quantity: c.quantity,

          unitPrice: c.unitPrice,

          total: c.totalPrice

        };

      })
    },

    attachments: claim.attachments.map(a => ({

      id: a.id,

      type: a.type,

      fileName: a.fileName,

      fileUrl: a.fileUrl,

      mimeType: a.mimeType ?? null

    }))

  };

}