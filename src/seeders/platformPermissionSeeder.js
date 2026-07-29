import prisma from "../utils/prisma.js";

const permissions = [

  // ORGANIZATIONS
  { name: "Create Organization", action: "CREATE_ORGANIZATION", description: "Onboard new client organizations" },
  { name: "View Organizations", action: "VIEW_ORGANIZATIONS", description: "View all client organizations" },
  { name: "Edit Organization", action: "EDIT_ORGANIZATION", description: "Update organization settings including wallet policy" },

  // HOSPITALS
  { name: "Create Hospital", action: "CREATE_HOSPITAL", description: "Onboard new hospitals" },
  { name: "View Hospitals", action: "VIEW_HOSPITALS", description: "View all hospitals" },

  // INSURANCE PROVIDERS
  { name: "Create Insurance Provider", action: "CREATE_INSURANCE_PROVIDER", description: "Register organizations as insurance providers" },
  { name: "View Insurance Providers", action: "VIEW_INSURANCE_PROVIDERS", description: "View all insurance providers" },

  // WALLETS
  { name: "View Wallets", action: "VIEW_WALLETS", description: "View all client wallets and transaction history" },
  { name: "Top Up Wallet", action: "TOP_UP_WALLET", description: "Add funds to a client wallet" },

  // PLATFORM STAFF
  { name: "Create Platform Staff", action: "CREATE_PLATFORM_STAFF", description: "Add new platform team members" },
  { name: "View Platform Staff", action: "VIEW_PLATFORM_STAFF", description: "View platform team members" },

  // MONITORING / AUDIT (for the hospital-management work coming next)
  { name: "View Hospital Activity", action: "VIEW_HOSPITAL_ACTIVITY", description: "View audit logs and usage activity across client hospitals" },
  { name: "View Subscription Status", action: "VIEW_SUBSCRIPTIONS", description: "View client subscription/billing status" },

];

async function seedPlatformPermissions() {

  for (const permission of permissions) {

    await prisma.platformPermission.upsert({
      where: { action: permission.action },
      update: { name: permission.name, description: permission.description },
      create: permission
    });

  }

  console.log("Platform permissions seeded");

}

seedPlatformPermissions()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });