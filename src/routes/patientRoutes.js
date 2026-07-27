import express from "express";
import prisma from "../utils/prisma.js";
import {
  patientSafeSelect,
  hospitalSafeSelect,
  staffSafeSelect
} from "../utils/selectors.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

import {
  authorizePermission
} from "../middleware/permissionMiddleware.js";

const router = express.Router();


// CREATE PATIENT
router.post(
  "/",
  protect,
  authorizePermission("CREATE_PATIENT"),
  async (req, res) => {
    try {
      const {
        patientNumber,
        firstName,
        middleName,
        lastName,
        dateOfBirth,
        gender,
        phone,
        email,
        address,
        bloodGroup,
        genotype,
        stateOfOrigin,
        localGovernmentOfOrigin,
        maritalStatus,
        numberOfChildren,
        nextOfKinName,
        nextOfKinRelationship,
        nextOfKinAddress,
        nextOfKinPhone,
        nextOfKinEmail,
        photoUrl
      } = req.body;

      if (
        !patientNumber ||
        !firstName ||
        !lastName ||
        !dateOfBirth ||
        !gender
      ) {
        return res.status(400).json({
          error: "Missing required fields"
        });
      }

      const existingPatient = await prisma.patient.findFirst({
        where: {
          patientNumber
        }
      });

      if (existingPatient) {
        return res.status(400).json({
          error: "Patient number already exists"
        });
      }

      // ✅ Validate numberOfChildren
      let children = null;

      if (
        numberOfChildren !== undefined &&
        numberOfChildren !== null &&
        numberOfChildren !== ""
      ) {
        children = Number(numberOfChildren);

        if (Number.isNaN(children)) {
          return res.status(400).json({
            error: "Number of children must be a valid number."
          });
        }
      }

      const patient = await prisma.patient.create({
        data: {
          patientNumber,
          firstName,
          middleName,
          lastName,
          dateOfBirth: new Date(dateOfBirth),
          gender,
          phone,
          email,
          address,
          bloodGroup,
          genotype,
          stateOfOrigin,
          localGovernmentOfOrigin,
          maritalStatus,

          numberOfChildren: children,

          nextOfKinName,
          nextOfKinRelationship,
          nextOfKinAddress,
          nextOfKinPhone,
          nextOfKinEmail,
          photoUrl,
          hospitalId: req.user.hospitalId
        },
        select: patientSafeSelect
      });

      res.json(patient);
    } catch (err) {
      console.log(err);

      res.status(500).json({
        error: "Failed to create patient"
      });
    }
  }
);


// GET ALL PATIENTS
router.get("/", protect, async (req, res) => {
  try {

    const patients = await prisma.patient.findMany({
  where: {
    hospitalId: req.user.hospitalId
  },

  include: {
    hospital: {
      select: hospitalSafeSelect
    }
  },

  orderBy: {
    createdAt: "desc"
  }
});

    res.json(patients);

  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: "Failed to fetch patients"
    });
  }
});


// GET SINGLE PATIENT
router.get("/:id", protect, async (req, res) => {
  try {

    const patient = await prisma.patient.findFirst({

      where: {

        id: req.params.id,

        hospitalId: req.user.hospitalId

      },

      include: {

        hospital: {

          select: hospitalSafeSelect

        },

        visits: {

          orderBy: {

            startedAt: "desc"

          },

          include: {

            appointment: true,

            medicalRecord: {

              include: {

                doctor: {

                  select: staffSafeSelect

                },

                icd10: true,

                prescriptions: {

                  include: {

                     inventoryItem: true

              }

              }

              }

            },

             procedureRequests: {

    include: {

        medicalRecordService: {

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

        },

        procedureResult: true,

        labResult: true

    }

},

            vitalRecords: {

              orderBy: {

                createdAt: "asc"

              }

            },

            admission: {

              include: {

                bed: { include: { ward: true } },
                medicationOrders: {

                  include: {

                    administrations: true

                  }

                }
                  

              }

            }

          }

        },

        insurance: {
  include: {
    provider: {
      include: {
        organization: {
          select: { id: true, name: true, code: true }
        }
      }
    }
  }
},

      }

    });

    if (!patient) {

      return res.status(404).json({

        error: "Patient not found"

      });

    }

    res.json(patient);

  } catch (err) {

    console.log(err);

    res.status(500).json({

      error: "Failed to fetch patient"

    });

  }

});

const PATIENT_UPDATABLE_FIELDS = [
  "firstName", "middleName", "lastName", "dateOfBirth", "gender",
  "phone", "email", "address", "bloodGroup", "genotype",
  "stateOfOrigin", "localGovernmentOfOrigin", "maritalStatus",
  "numberOfChildren", "nextOfKinName", "nextOfKinRelationship",
  "nextOfKinAddress", "nextOfKinPhone", "nextOfKinEmail", "photoUrl"
];

function pickPatientUpdateFields(body = {}) {

  const data = {};

  for (const field of PATIENT_UPDATABLE_FIELDS) {

    if (body[field] !== undefined) {
      data[field] = body[field];
    }

  }

  if (data.dateOfBirth) {
    data.dateOfBirth = new Date(data.dateOfBirth);
  }

  if (data.numberOfChildren !== undefined && data.numberOfChildren !== null) {

    const children = Number(data.numberOfChildren);

    if (Number.isNaN(children)) {
      throw new Error("Number of children must be a valid number.");
    }

    data.numberOfChildren = children;

  }

  return data;

}

// UPDATE PATIENT
router.patch(
  "/:id",
  protect,
  async (req, res) => {

    try {

      const existing =
        await prisma.patient.findFirst({

          where: {
            id: req.params.id,
            hospitalId: req.user.hospitalId
          }

        });

      if (!existing) {

        return res.status(404).json({
          error: "Patient not found"
        });

      }

      const data = pickPatientUpdateFields(req.body);

      const patient =
        await prisma.patient.update({

          where: {
            id: req.params.id
          },

          data,

          select: patientSafeSelect
        });

      res.json(patient);

    } catch (err) {

      console.log(err);

      res.status(400).json({
        error: err.message || "Failed to update patient"
      });
    }
  }
);

export default router;