import prisma from "../utils/prisma.js";

async function seedPlatformRolePermissions() {

  const permissions = await prisma.platformPermission.findMany();

  const getPermissionId = (action) =>
    permissions.find(p => p.action === action)?.id;

  const mappings = [

    // SUPER_ADMIN — everything
    {
      role: "SUPER_ADMIN",
      permissions: permissions.map(p => p.action)
    },

    // OPS — onboarding + monitoring, no wallet/financial control
    {
      role: "OPS",
      permissions: [
        "CREATE_ORGANIZATION",
        "VIEW_ORGANIZATIONS",
        "EDIT_ORGANIZATION",
        "CREATE_HOSPITAL",
        "VIEW_HOSPITALS",
        "CREATE_INSURANCE_PROVIDER",
        "VIEW_INSURANCE_PROVIDERS",
        "VIEW_WALLETS",
        "VIEW_HOSPITAL_ACTIVITY",
        "VIEW_SUBSCRIPTIONS"
      ]
    },

    // SUPPORT — read-only visibility, for troubleshooting client issues
    {
      role: "SUPPORT",
      permissions: [
        "VIEW_ORGANIZATIONS",
        "VIEW_HOSPITALS",
        "VIEW_INSURANCE_PROVIDERS",
        "VIEW_WALLETS",
        "VIEW_HOSPITAL_ACTIVITY",
        "VIEW_SUBSCRIPTIONS"
      ]
    },

    // FINANCE — wallet/billing focused
    {
      role: "FINANCE",
      permissions: [
        "VIEW_ORGANIZATIONS",
        "VIEW_HOSPITALS",
        "VIEW_WALLETS",
        "TOP_UP_WALLET",
        "VIEW_SUBSCRIPTIONS"
      ]
    }

  ];

  for (const mapping of mappings) {

    for (const action of mapping.permissions) {

      const permissionId = getPermissionId(action);

      if (!permissionId) continue;

      await prisma.platformRolePermission.upsert({

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

  console.log("Platform role permissions seeded");

}

seedPlatformRolePermissions()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });