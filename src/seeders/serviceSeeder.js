import prisma from "../utils/prisma.js";

function determineVisitSetting(code) {

  const outpatientRanges = [
    [99202, 99215], // new/established outpatient office visits
    [99242, 99245], // outpatient consultations
    [99341, 99350], // home visits
    [99381, 99397], // preventive medicine
    [99401, 99402], // preventive counseling
  ];

  const inpatientRanges = [
    [99221, 99239], // initial/subsequent hospital care, discharge
    [99252, 99255], // inpatient consultations
    [99304, 99310], // nursing facility care
  ];

  const numeric = parseInt(code, 10);

  if (Number.isNaN(numeric)) return null;

  for (const [start, end] of outpatientRanges) {
    if (numeric >= start && numeric <= end) return "OUTPATIENT";
  }

  for (const [start, end] of inpatientRanges) {
    if (numeric >= start && numeric <= end) return "INPATIENT";
  }

  return null;

}

async function seedServices() {

  console.log("Creating/updating Services...");

  const cpts = await prisma.cPTCode.findMany();

  let created = 0;
  let updated = 0;

  for (const cpt of cpts) {

    const category =
      cpt.serviceType === "GENERAL"
        ? "CONSULTATION"
        : "SPECIALIST";

    const visitSetting = determineVisitSetting(cpt.code);

    const existing = await prisma.service.findFirst({
      where: { cptId: cpt.id }
    });

    if (existing) {

      await prisma.service.update({
        where: { id: existing.id },
        data: { category, visitSetting }
      });

      updated++;
      continue;

    }

    await prisma.service.create({

      data: {

        code: cpt.code,

        name: cpt.name,

        description: cpt.name,

        category,

        visitSetting,

        cptId: cpt.id,

        unit: "Procedure"

      }

    });

    created++;

  }

  console.log(`Created ${created} services, backfilled ${updated} existing services.`);
}

seedServices()
  .then(async () => {

    await prisma.$disconnect();

    process.exit(0);

  })
  .catch(async (err) => {

    console.error(err);

    await prisma.$disconnect();

    process.exit(1);

  });