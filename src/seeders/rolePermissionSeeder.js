import prisma from "../utils/prisma.js";

async function seedRolePermissions() {

  const permissions =
    await prisma.permission.findMany();

  const getPermissionId = (action) =>
    permissions.find(
      p => p.action === action
    )?.id;

  const mappings = [

    // ADMIN
    {
      role: "ADMIN",
      permissions: permissions.map(
        p => p.action
      )
    },

    // RECEPTIONIST
    {
      role: "RECEPTIONIST",
      permissions: [
        "CREATE_PATIENT",
        "EDIT_PATIENT",
        "VIEW_PATIENT",
        "CREATE_APPOINTMENT",
        "EDIT_APPOINTMENT",
        "VIEW_APPOINTMENT",
        "VIEW_BILLING",
        "RECEIVE_PAYMENT"
      ]
    },

    // DOCTOR
    {
      role: "DOCTOR",
      permissions: [
        "VIEW_PATIENT",
        "EDIT_PATIENT",
        "VIEW_APPOINTMENT",
        "START_CONSULTATION",
        "EDIT_APPOINTMENT",
        "CREATE_CONSULTATION",
        "COMPLETE_CONSULTATION",
        "VIEW_MEDICAL_RECORD",
        "UPDATE_MEDICAL_RECORD",
        "REQUEST_LAB_TEST",
        "REQUEST_RADIOLOGY",
        "ADMIT_PATIENT",
        "DISCHARGE_PATIENT",
        "ORDER_PROCEDURE",
        "EDIT_PROCEDURE",
        "CANCEL_PROCEDURE",
        "VIEW_PROCEDURES"
      ]
    },

    // NURSE
    {
      role: "NURSE",
      permissions: [
        "VIEW_PATIENT",
        "VIEW_APPOINTMENT",
        "PERFORM_TRIAGE",
        "ADMIT_PATIENT",
        "DISCHARGE_PATIENT",
        "EDIT_APPOINTMENT",
        "CREATE_PATIENT",
        "EDIT_PATIENT",
        "MANAGE_WARDS",
        "VIEW_PROCEDURES"
      ]
    },

    // PHARMACIST
    {
      role: "PHARMACIST",
      permissions: [
        "VIEW_PATIENT",
        "DISPENSE_MEDICATION",
        "MANAGE_PHARMACY",
        "MANAGE_INVENTORY"
      ]
    },

    // LAB TECH
    {
      role: "LAB_TECH",
      permissions: [
        "REQUEST_LAB_TEST",
        "RECORD_LAB_RESULT",
        "VIEW_PROCEDURES",
        "PERFORM_PROCEDURE",
        "SAVE_PROCEDURE_RESULT",
        "EDIT_PROCEDURE_RESULT"
      ]
    },

    // RADIOLOGY
    {
      role: "RADIOLOGY",
      permissions: [
        "REQUEST_RADIOLOGY",
        "RECORD_RADIOLOGY_RESULT",
        "VIEW_PROCEDURES",
        "PERFORM_PROCEDURE",
        "SAVE_PROCEDURE_RESULT",
        "EDIT_PROCEDURE_RESULT"
      ]
    },

     // ACCOUNTANT
    {
      role: "ACCOUNTANT",
      permissions: [
"CREATE_INVOICE",
"VIEW_INVOICE",
"RECORD_PAYMENT",
"ISSUE_REFUND",
"VIEW_FINANCE",
"VIEW_CHARGES",
"EDIT_CHARGE",
"CANCEL_CHARGE",
"VIEW_BILLING",
"RECEIVE_PAYMENT",
"POST_CHARGE",

"CREATE_CLAIM",
"SUBMIT_CLAIM",
"VIEW_CLAIMS",
"EXPORT_CLAIMS",
"RECEIVE_CLAIM_PAYMENT"
]
    },

    // INSURANCE HOSPITAL
    {
      role: "INSURANCE_OFFICER",
      permissions: [
"CREATE_CLAIM",
"SUBMIT_CLAIM",
"VIEW_CLAIMS",
"EXPORT_CLAIMS",
"MANAGE_INSURANCE"
]
    }

  ];

  for (const mapping of mappings) {

    for (const permissionAction of mapping.permissions) {

      const permissionId =
        getPermissionId(permissionAction);

      if (!permissionId) continue;

      await prisma.rolePermission.upsert({

        where: {
          role_permissionId: {
            role: mapping.role,
            permissionId
          }
        },

        update: {},

        create: {
          role: mapping.role,
          permissionId
        }
      });
    }
  }

  console.log(
    "Role permissions seeded"
  );

  process.exit();
}

seedRolePermissions();