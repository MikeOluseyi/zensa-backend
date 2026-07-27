import prisma from "../utils/prisma.js";

export const getPatients = async (req, res) => {
  try {
    const patients = await prisma.patient.findMany({
      orderBy: {
        createdAt: "desc"
      }
    });

    res.json(patients);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const createPatient = async (req, res) => {
  try {
    const patient = await prisma.patient.create({
      data: req.body
    });

    res.json(patient);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};