import prisma from "../utils/prisma.js";

const permissions = [

  // PATIENTS
  {
    name: "Create Patient",
    action: "CREATE_PATIENT",
    description: "Register new patients"
  },
  {
    name: "Edit Patient",
    action: "EDIT_PATIENT",
    description: "Update patient information"
  },
  {
    name: "View Patient",
    action: "VIEW_PATIENT",
    description: "View patient records"
  },
  {
    name: "Delete Patient",
    action: "DELETE_PATIENT",
    description: "Delete patient records"
  },

  // APPOINTMENTS
  {
    name: "Create Appointment",
    action: "CREATE_APPOINTMENT",
    description: "Schedule appointments"
  },
  {
    name: "Edit Appointment",
    action: "EDIT_APPOINTMENT",
    description: "Modify appointments"
  },
  {
    name: "View Appointment",
    action: "VIEW_APPOINTMENT",
    description: "View appointments"
  },

  // TRIAGE
  {
    name: "Perform Triage",
    action: "PERFORM_TRIAGE",
    description: "Record vital signs"
  },

  // CONSULTATION
  {
    name: "Create Consultation",
    action: "CREATE_CONSULTATION",
    description: "Perform consultations"
  },
  {
    name: "Start Consultation",
    action: "START_CONSULTATION",
    description: "Start consultation"
  },
  {
    name: "Complete Consultation",
    action: "COMPLETE_CONSULTATION",
    description: "Complete consultation"
  },
  {
    name: "View Medical Record",
    action: "VIEW_MEDICAL_RECORD",
    description: "View medical records"
  },
  {
    name: "Update Medical Record",
    action: "UPDATE_MEDICAL_RECORD",
    description: "Update medical records"
  },

  // ADMISSION
  {
    name: "Admit Patient",
    action: "ADMIT_PATIENT",
    description: "Admit patient"
  },
  {
    name: "Discharge Patient",
    action: "DISCHARGE_PATIENT",
    description: "Discharge patient"
  },

  // WARDS & BEDS
  {
    name: "Manage Wards",
    action: "MANAGE_WARDS",
    description: "Create and manage wards"
  },
  {
    name: "Manage Beds",
    action: "MANAGE_BEDS",
    description: "Create and manage beds"
  },

  // PHARMACY
  {
    name: "Dispense Medication",
    action: "DISPENSE_MEDICATION",
    description: "Dispense medications"
  },
  {
    name: "Manage Pharmacy",
    action: "MANAGE_PHARMACY",
    description: "Manage pharmacy"
  },

  // INVENTORY
  {
    name: "Manage Inventory",
    action: "MANAGE_INVENTORY",
    description: "Manage inventory"
  },

  // LAB
  {
    name: "Request Lab Test",
    action: "REQUEST_LAB_TEST",
    description: "Request laboratory tests"
  },
  {
    name: "Record Lab Result",
    action: "RECORD_LAB_RESULT",
    description: "Enter laboratory results"
  },

  // RADIOLOGY
  {
    name: "Request Radiology",
    action: "REQUEST_RADIOLOGY",
    description: "Request radiology studies"
  },
  {
    name: "Record Radiology Result",
    action: "RECORD_RADIOLOGY_RESULT",
    description: "Upload radiology reports"
  },

  // LAB
  {
    name: "Request Lab Test",
    action: "REQUEST_LAB_TEST",
    description: "Request laboratory tests"
  },
  {
    name: "Record Lab Result",
    action: "RECORD_LAB_RESULT",
    description: "Enter laboratory results"
  },

  // RADIOLOGY
  {
    name: "Request Radiology",
    action: "REQUEST_RADIOLOGY",
    description: "Request radiology studies"
  },
  {
    name: "Record Radiology Result",
    action: "RECORD_RADIOLOGY_RESULT",
    description: "Upload radiology reports"
  },

  // PROCEDURES (lab / radiology / general orderable services)
  {
    name: "Order Procedure",
    action: "ORDER_PROCEDURE",
    description: "Order a lab, radiology, or other procedure"
  },
  {
    name: "Edit Procedure",
    action: "EDIT_PROCEDURE",
    description: "Modify a procedure request"
  },
  {
    name: "Cancel Procedure",
    action: "CANCEL_PROCEDURE",
    description: "Cancel a procedure request"
  },
  {
    name: "View Procedures",
    action: "VIEW_PROCEDURES",
    description: "View procedure requests for a visit"
  },
  {
    name: "Perform Procedure",
    action: "PERFORM_PROCEDURE",
    description: "Mark a procedure as performed/completed"
  },
  {
    name: "Save Procedure Result",
    action: "SAVE_PROCEDURE_RESULT",
    description: "Enter results for a completed procedure"
  },
  {
    name: "Edit Procedure Result",
    action: "EDIT_PROCEDURE_RESULT",
    description: "Edit a previously saved procedure result"
  },

  // BILLING
  {
    name: "View Billing",
    action: "VIEW_BILLING",
    description: "View billing"
  },
  {
    name: "Create Invoice",
    action: "CREATE_INVOICE",
    description: "Create invoices"
  },
  {
    name: "View Invoice",
    action: "VIEW_INVOICE",
    description: "View invoices"
  },
  {
    name: "Record Payment",
    action: "RECORD_PAYMENT",
    description: "Record payments"
  },
  {
    name: "Receive Payment",
    action: "RECEIVE_PAYMENT",
    description: "Receive payments"
  },
  {
    name: "Issue Refund",
    action: "ISSUE_REFUND",
    description: "Issue refunds"
  },
  {
    name: "View Charges",
    action: "VIEW_CHARGES",
    description: "View charges"
  },
  {
    name: "Edit Charge",
    action: "EDIT_CHARGE",
    description: "Edit charge"
  },
  {
    name: "Post Charge",
    action: "POST_CHARGE",
    description: "Post charge"
  },
  {
    name: "Cancel Charge",
    action: "CANCEL_CHARGE",
    description: "Cancel charge"
  },

 // INSURANCE - HOSPITAL SIDE

{
  name: "Create Claim",
  action: "CREATE_CLAIM",
  description: "Generate insurance claims"
},
{
  name: "Submit Claim",
  action: "SUBMIT_CLAIM",
  description: "Submit claims to insurers"
},
{
  name: "View Claims",
  action: "VIEW_CLAIMS",
  description: "View insurance claims"
},
{
  name: "Export Claims",
  action: "EXPORT_CLAIMS",
  description: "Export claims for external insurers"
},
{
  name: "Receive Claim Payment",
  action: "RECEIVE_CLAIM_PAYMENT",
  description: "Record insurer payment"
},
{
  name: "Manage Insurance Providers",
  action: "MANAGE_INSURANCE",
  description: "Manage insurance providers"
},


// INSURANCE COMPANY SIDE

{
  name: "Review Claims",
  action: "REVIEW_CLAIMS",
  description: "Review submitted claims"
},
{
  name: "Approve Claims",
  action: "APPROVE_CLAIMS",
  description: "Approve claims"
},
{
  name: "Reject Claims",
  action: "REJECT_CLAIMS",
  description: "Reject claims"
},
{
  name: "Pay Claims",
  action: "PAY_CLAIMS",
  description: "Record claim payment"
},
{
  name: "View Authorization Requests",
  action: "VIEW_AUTH_REQUESTS",
  description: "View authorization requests"
},
{
  name: "Approve Authorization Request",
  action: "APPROVE_AUTH_REQUESTS",
  description: "Approve authorization requests"
},
{
  name: "Reject Authorization Request",
  action: "REJECT_AUTH_REQUESTS",
  description: "Reject authorization requests"
},
{
  name: "Mark Claim Paid",
  action: "MARK_CLAIM_PAID",
  description: "Mark claim paid"
},

{
  name: "Manage Plans",
  action: "MANAGE_PLANS",
  description: "Create and edit insurance plans"
},

  // STAFF
  {
    name: "Create Staff",
    action: "CREATE_STAFF",
    description: "Create staff accounts"
  },
  {
    name: "View Staff",
    action: "VIEW_STAFF",
    description: "View staff records"
  },
  {
    name: "Edit Staff",
    action: "EDIT_STAFF",
    description: "Edit staff records"
  },
  {
    name: "Disable Staff",
    action: "DISABLE_STAFF",
    description: "Disable staff accounts"
  },

  // ROLES & PERMISSIONS
  {
    name: "Manage Role",
    action: "MANAGE_ROLE",
    description: "Manage roles"
  },
  {
    name: "Manage Permission",
    action: "MANAGE_PERMISSION",
    description: "Manage permissions"
  },

  // REPORTS
  {
    name: "View Reports",
    action: "VIEW_REPORTS",
    description: "Access reports"
  },

  // FINANCE
  {
    name: "View Finance",
    action: "VIEW_FINANCE",
    description: "Access financial reports"
  },

  // SETTINGS
  {
    name: "Manage Hospital Settings",
    action: "MANAGE_SETTINGS",
    description: "Manage hospital settings"
  }
];

async function seedPermissions() {
  for (const permission of permissions) {
    await prisma.permission.upsert({
      where: {
        action: permission.action
      },
      update: {
        name: permission.name,
        description: permission.description
      },
      create: permission
    });
  }

  console.log("Permissions seeded");
}

seedPermissions()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });