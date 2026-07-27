import prisma from "../src/utils/prisma.js";

async function main() {

  const services = [

    {
      name: "General Admission",
      category: "ADMISSION",
      unit: "Per Night"
    },

    {
      name: "ICU Admission",
      category: "ICU",
      unit: "Per Night"
    },

    {
      name: "Blood Test",
      category: "LAB",
      unit: "Per Test"
    },

    {
      name: "X-Ray",
      category: "RADIOLOGY",
      unit: "Per Scan"
    },

    {
      name: "MRI Scan",
      category: "RADIOLOGY",
      unit: "Per Scan"
    },

    {
      name: "General Consultation",
      category: "CONSULTATION",
      unit: "Per Visit"
    },

    {
      name: "Delivery Package",
      category: "DELIVERY",
      unit: "Per Delivery"
    }
  ];

  for (const service of services) {

    await prisma.service.upsert({

      where: {
        name: service.name
      },

      update: {},

      create: service
    });
  }

  console.log("Services seeded");
}

main();