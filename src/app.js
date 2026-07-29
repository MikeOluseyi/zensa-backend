import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import staffRoutes from "./routes/staffRoutes.js";
import hospitalRoutes from "./routes/hospitalRoutes.js";
import departmentRoutes from "./routes/departmentRoutes.js";
import patientRoutes from "./routes/patientRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import medicalRecordRoutes from "./routes/medicalRecordRoutes.js";
import invoiceRoutes from "./routes/invoiceRoutes.js";
import insuranceRoutes from "./routes/insuranceRoutes.js";
import pharmacyRoutes from "./routes/pharmacyRoutes.js";
import medicationPriceRoutes from "./routes/medicationPriceRoutes.js";
import labRoutes from "./routes/labRoutes.js";
import admissionRoutes from "./routes/admissionRoutes.js";
import wardRoutes from "./routes/wardRoutes.js";
import bedRoutes from "./routes/bedRoutes.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";
import billingRoutes from "./routes/billingRoutes.js";
import claimRoutes from "./routes/claimRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import auditRoutes from "./routes/auditRoutes.js";
import organizationRoutes from "./routes/organizationRoutes.js";
import passwordRoutes from "./routes/passwordRoutes.js";
import icd10Routes from "./routes/icd10Routes.js";
import cptRoutes from "./routes/cptRoutes.js";
import servicesRoutes from "./routes/servicesRoutes.js";
import admissionRequestRoutes from "./routes/admissionRequestRoutes.js";
import admissionDoctorNoteRoutes from "./routes/admissionDoctorNoteRoutes.js";
import admissionMedicationRoutes from "./routes/admissionMedicationRoutes.js";
import nursingNoteRoutes from "./routes/nursingNoteRoutes.js";
import vitalRecordRoutes from "./routes/vitalRecordRoutes.js";
import admissionTimelineRoutes from "./routes/admissionTimelineRoutes.js";
import visitRoutes from "./routes/visitRoutes.js";
import chargeRoutes from "./routes/chargeRoutes.js";
import procedureResultsRoutes from "./routes/procedureResultsRoutes.js";
import procedureRoutes from "./routes/procedureRoutes.js";
import labResultRoutes from "./routes/labResultRoutes.js";
import prescriptionRoutes from "./routes/prescriptionRoutes.js";
import claimAttachmentRoutes from "./routes/claimAttachmentRoutes.js";
import claimMessageRoutes from "./routes/claimMessageRoutes.js";
import claimPaymentRoutes from "./routes/claimPaymentRoutes.js";
import insuranceProviderRoutes from "./routes/insuranceProviderRoutes.js";
import insuranceStaffRoutes from "./routes/insuranceStaffRoutes.js";
import insuranceClaimRoutes from "./routes/insuranceClaimRoutes.js";
import insurancePlanRoutes from "./routes/insurancePlanRoutes.js";
import doctorNoteRoutes from "./routes/doctorNoteRoutes.js";
import consultationsRoutes from "./routes/consultationRoutes.js";
import platformStaffRoutes from "./routes/platformStaffRoutes.js";
import walletRoutes from "./routes/walletRoutes.js";
import rbacRoutes from "./routes/rbacRoutes.js";
import { protect } from "./middleware/authMiddleware.js";
import { authorize } from "./middleware/roleMiddleware.js";


const app = express();

app.use(cors());
app.use(express.json());


// ROUTES
app.use("/api/staff", staffRoutes);
app.use("/api/hospitals", hospitalRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/medical-records", medicalRecordRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/insurance", insuranceRoutes);
app.use("/api/pharmacy", pharmacyRoutes);
app.use("/api/medication-prices", medicationPriceRoutes);
app.use("/api/lab", labRoutes);
app.use("/api/admissions", admissionRoutes);
app.use("/api/wards", wardRoutes);
app.use("/api/beds", bedRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/billing", billingRoutes);
app.use("/api/claims", claimRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/audit-logs", auditRoutes);
app.use("/api/organizations", organizationRoutes);
app.use("/api/password", passwordRoutes);
app.use("/api/icd10", icd10Routes);
app.use("/api/cpt", cptRoutes);
app.use("/api/services", servicesRoutes);
app.use("/api/admission-requests", admissionRequestRoutes);
app.use("/api/admission-doctor-notes", admissionDoctorNoteRoutes);
app.use("/api/admission-medications", admissionMedicationRoutes);
app.use("/api/nursing-notes", nursingNoteRoutes);
app.use("/api/vitals", vitalRecordRoutes);
app.use("/api/admission-timeline", admissionTimelineRoutes);
app.use("/api/visits", visitRoutes);
app.use("/api/charges", chargeRoutes);
app.use("/api/procedure-Results", procedureResultsRoutes);
app.use("/api/procedure", procedureRoutes);
app.use("/api/lab-results", labResultRoutes);
app.use("/api/prescription", prescriptionRoutes);
app.use("/api/claim-Attachment", claimAttachmentRoutes);
app.use("/api/claim-Message", claimMessageRoutes);
app.use("/api/claim-Payment", claimPaymentRoutes);
app.use("/api/insurance-Claim", insuranceClaimRoutes);
app.use("/api/insurance-Plan", insurancePlanRoutes);
app.use("/api/insurance-Provider", insuranceProviderRoutes);
app.use("/api/insurance-staff", insuranceStaffRoutes);
app.use("/api/doctor-notes", doctorNoteRoutes);
app.use("/api/consultations", consultationsRoutes);
app.use("/api/platform-staff", platformStaffRoutes);
app.use("/api/wallets", walletRoutes);
app.use("/api/rbac", rbacRoutes);

app.get("/", (req, res) => {
  res.send("Zensa Backend Running");
});

const PORT = process.env.PORT || 5000;

app.get("/api/test/admin",
  protect,
   authorize("ADMIN"),
  (req, res) => {
    res.json({
      message: "Welcome Admin",
      user: req.user
    });
  }
);

app.get("/api/test/doctor",
  protect,
   authorize("DOCTOR", "ADMIN"),
  (req, res) => {
    res.json({
      message: "Doctor Access Granted",
      user: req.user
    });
  }
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});