import prisma from "../utils/prisma.js";

async function seedInsuranceRolePermissions() {

  const permissions =
    await prisma.permission.findMany();

  const getPermissionId = (action) =>
    permissions.find(
      p => p.action === action
    )?.id;

  const mappings = [

    // ==========================
    // MANAGER
    // ==========================

    // AFTER
    {
      role: "MANAGER",

      permissions: [

        "VIEW_CLAIMS",
        "PROCESS_CLAIMS",
        "REVIEW_CLAIMS",
        "APPROVE_CLAIMS",
        "REJECT_CLAIMS",
        "VIEW_AUTH_REQUESTS",
        "APPROVE_AUTH_REQUESTS",
        "REJECT_AUTH_REQUESTS",
        "VIEW_REPORTS",
        "VIEW_FINANCE",
        "MARK_CLAIM_PAID",
        "MANAGE_PLANS"

      ]

    },

    // ==========================
    // CLAIMS OFFICER
    // ==========================

    {
      role: "CLAIMS_OFFICER",

      permissions: [

        "VIEW_CLAIMS",
        "PROCESS_CLAIMS",
        "VIEW_AUTH_REQUESTS"

      ]

    },

    // ==========================
    // REVIEWER
    // ==========================

    {
      role: "REVIEWER",

      permissions: [

        "VIEW_CLAIMS",
        "APPROVE_CLAIMS",
        "REJECT_CLAIMS",
        "VIEW_AUTH_REQUESTS",
        "APPROVE_AUTH_REQUESTS",
        "REJECT_AUTH_REQUESTS"

      ]

    },

    // ==========================
    // FINANCE
    // ==========================

    {
      role: "FINANCE",

      permissions: [

        "VIEW_CLAIMS",
        "MARK_CLAIM_PAID",
        "VIEW_FINANCE"

      ]

    }

  ];

  for (const mapping of mappings) {

    for (const action of mapping.permissions) {

      const permissionId =
        getPermissionId(action);

      if (!permissionId) continue;

      await prisma.insuranceRolePermission.upsert({

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
    "Insurance role permissions seeded."
  );

  process.exit();

}

seedInsuranceRolePermissions()
  .catch(console.error)
  .finally(async () => {

    await prisma.$disconnect();

  });