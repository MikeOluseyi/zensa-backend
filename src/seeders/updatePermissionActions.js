import prisma from "../utils/prisma.js";

async function updatePermissions() {

  const mappings = [

    {
      name: "Create Patient",
      action: "CREATE_PATIENT"
    },

    {
      name: "Edit Patient",
      action: "EDIT_PATIENT"
    },

    {
      name: "Dispense Medication",
      action: "DISPENSE_MEDICATION"
    },

    {
      name: "Approve Claims",
      action: "APPROVE_CLAIMS"
    },

    {
      name: "View Finance",
      action: "VIEW_FINANCE"
    },

    {
      name: "Manage Inventory",
      action: "MANAGE_INVENTORY"
    },

    {
      name: "Create Invoice",
      action: "CREATE_INVOICE"
    },

    {
      name: "Issue Refund",
      action: "ISSUE_REFUND"
    },

    {
      name: "Create Appointment",
      action: "CREATE_APPOINTMENT"
    },

    {
      name: "Edit Appointment",
      action: "EDIT_APPOINTMENT"
    }
  ];

  for (const item of mappings) {

    await prisma.permission.updateMany({

      where: {
        name: item.name
      },

      data: {
        action: item.action
      }
    });
  }

  console.log(
    "Permission actions updated"
  );

  process.exit();
}

updatePermissions();