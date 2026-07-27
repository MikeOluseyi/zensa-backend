import prisma from "../utils/prisma.js";

const cptCodes = [
  // ==========================================
  // EVALUATION AND MANAGEMENT (E/M) - GENERAL
  // ==========================================
  
  // New Patient Office Visits
  { code: "99202", name: "Office/outpatient visit, new patient, 15-29 mins", serviceType: "GENERAL" },
  { code: "99203", name: "Office/outpatient visit, new patient, 30-44 mins", serviceType: "GENERAL" },
  { code: "99204", name: "Office/outpatient visit, new patient, 45-59 mins", serviceType: "GENERAL" },
  { code: "99205", name: "Office/outpatient visit, new patient, 60-74 mins", serviceType: "GENERAL" },
  
  // Established Patient Office Visits
  { code: "99211", name: "Office/outpatient visit, est patient, 5-9 mins", serviceType: "GENERAL" },
  { code: "99212", name: "Office/outpatient visit, est patient, 10-19 mins", serviceType: "GENERAL" },
  { code: "99213", name: "Office/outpatient visit, est patient, 20-29 mins", serviceType: "GENERAL" },
  { code: "99214", name: "Office/outpatient visit, est patient, 30-39 mins", serviceType: "GENERAL" },
  { code: "99215", name: "Office/outpatient visit, est patient, 40-54 mins", serviceType: "GENERAL" },
  
  // Initial Hospital Care
  { code: "99221", name: "Initial hospital care, low complexity", serviceType: "GENERAL" },
  { code: "99222", name: "Initial hospital care, moderate complexity", serviceType: "GENERAL" },
  { code: "99223", name: "Initial hospital care, high complexity", serviceType: "GENERAL" },
  
  // Subsequent Hospital Care
  { code: "99231", name: "Subsequent hospital care, low complexity", serviceType: "GENERAL" },
  { code: "99232", name: "Subsequent hospital care, moderate complexity", serviceType: "GENERAL" },
  { code: "99233", name: "Subsequent hospital care, high complexity", serviceType: "GENERAL" },
  
  // Hospital Discharge
  { code: "99238", name: "Hospital discharge day management, <= 30 mins", serviceType: "GENERAL" },
  { code: "99239", name: "Hospital discharge day management, > 30 mins", serviceType: "GENERAL" },
  
  // Emergency Department
  { code: "99281", name: "Emergency dept visit, straightforward", serviceType: "GENERAL" },
  { code: "99282", name: "Emergency dept visit, low complexity", serviceType: "GENERAL" },
  { code: "99283", name: "Emergency dept visit, moderate complexity", serviceType: "GENERAL" },
  { code: "99284", name: "Emergency dept visit, high complexity", serviceType: "GENERAL" },
  { code: "99285", name: "Emergency dept visit, highly complex/critical", serviceType: "GENERAL" },
  
  // Critical Care
  { code: "99291", name: "Critical care, first 30-74 mins", serviceType: "GENERAL" },
  { code: "99292", name: "Critical care, each additional 30 mins", serviceType: "GENERAL" },
  
  // Nursing Facility Care
  { code: "99304", name: "Initial nursing facility care, low", serviceType: "GENERAL" },
  { code: "99305", name: "Initial nursing facility care, moderate", serviceType: "GENERAL" },
  { code: "99306", name: "Initial nursing facility care, high", serviceType: "GENERAL" },
  { code: "99307", name: "Subsequent nursing facility care, straightforward", serviceType: "GENERAL" },
  { code: "99308", name: "Subsequent nursing facility care, low", serviceType: "GENERAL" },
  { code: "99309", name: "Subsequent nursing facility care, moderate", serviceType: "GENERAL" },
  { code: "99310", name: "Subsequent nursing facility care, high", serviceType: "GENERAL" },
  
  // Preventive Medicine - New Patient
  { code: "99381", name: "Preventive visit, new patient, infant <1 yr", serviceType: "GENERAL" },
  { code: "99382", name: "Preventive visit, new patient, ages 1-4", serviceType: "GENERAL" },
  { code: "99383", name: "Preventive visit, new patient, ages 5-11", serviceType: "GENERAL" },
  { code: "99384", name: "Preventive visit, new patient, ages 12-17", serviceType: "GENERAL" },
  { code: "99385", name: "Preventive visit, new patient, ages 18-39", serviceType: "GENERAL" },
  { code: "99386", name: "Preventive visit, new patient, ages 40-64", serviceType: "GENERAL" },
  { code: "99387", name: "Preventive visit, new patient, 65+ yrs", serviceType: "GENERAL" },
  
  // Preventive Medicine - Established Patient
  { code: "99391", name: "Preventive visit, est patient, infant <1 yr", serviceType: "GENERAL" },
  { code: "99392", name: "Preventive visit, est patient, ages 1-4", serviceType: "GENERAL" },
  { code: "99393", name: "Preventive visit, est patient, ages 5-11", serviceType: "GENERAL" },
  { code: "99394", name: "Preventive visit, est patient, ages 12-17", serviceType: "GENERAL" },
  { code: "99395", name: "Preventive visit, est patient, ages 18-39", serviceType: "GENERAL" },
  { code: "99396", name: "Preventive visit, est patient, ages 40-64", serviceType: "GENERAL" },
  { code: "99397", name: "Preventive visit, est patient, 65+ yrs", serviceType: "GENERAL" },

  // Transitional & Chronic Care
  { code: "99490", name: "Chronic care management services, 20 mins", serviceType: "GENERAL" },
  { code: "99495", name: "Transitional care management, 14-day", serviceType: "GENERAL" },
  { code: "99496", name: "Transitional care management, 7-day", serviceType: "GENERAL" },

  // ==========================================
  // SURGERY & PROCEDURES - SPECIALIST
  // ==========================================
  
  // Integumentary (Skin/Breast)
  { code: "10060", name: "Incision and drainage of abscess, simple", serviceType: "SPECIALIST" },
  { code: "10061", name: "Incision and drainage of abscess, complex", serviceType: "SPECIALIST" },
  { code: "10120", name: "Incision and removal of foreign body, simple", serviceType: "SPECIALIST" },
  { code: "11102", name: "Tangential biopsy of skin, single lesion", serviceType: "SPECIALIST" },
  { code: "11104", name: "Punch biopsy of skin, single lesion", serviceType: "SPECIALIST" },
  { code: "11200", name: "Removal of skin tags, up to 15 lesions", serviceType: "SPECIALIST" },
  { code: "11400", name: "Excision of benign lesion, up to 0.5 cm", serviceType: "SPECIALIST" },
  { code: "11401", name: "Excision of benign lesion, 0.6 to 1.0 cm", serviceType: "SPECIALIST" },
  { code: "11600", name: "Excision of malignant lesion, up to 0.5 cm", serviceType: "SPECIALIST" },
  { code: "11730", name: "Avulsion of nail plate, partial or complete", serviceType: "SPECIALIST" },
  { code: "12001", name: "Simple repair of superficial wound, up to 2.5 cm", serviceType: "SPECIALIST" },
  { code: "12002", name: "Simple repair of superficial wound, 2.6-7.5 cm", serviceType: "SPECIALIST" },
  { code: "17000", name: "Destruction of premalignant lesion, first lesion", serviceType: "SPECIALIST" },
  { code: "17110", name: "Destruction of benign lesions, up to 14", serviceType: "SPECIALIST" },
  { code: "19120", name: "Excision of breast cyst or mass", serviceType: "SPECIALIST" },
  
  // Musculoskeletal
  { code: "20552", name: "Injection(s), single or multiple trigger points", serviceType: "SPECIALIST" },
  { code: "20600", name: "Drainage/injection of small joint/bursa", serviceType: "SPECIALIST" },
  { code: "20605", name: "Drainage/injection of intermediate joint/bursa", serviceType: "SPECIALIST" },
  { code: "20610", name: "Drainage/injection of major joint/bursa", serviceType: "SPECIALIST" },
  { code: "29065", name: "Application of cast, shoulder to hand", serviceType: "SPECIALIST" },
  { code: "29345", name: "Application of long leg cast", serviceType: "SPECIALIST" },
  { code: "29827", name: "Arthroscopy, shoulder, rotator cuff repair", serviceType: "SPECIALIST" },
  { code: "29881", name: "Arthroscopy, knee, with meniscectomy", serviceType: "SPECIALIST" },
  
  // Respiratory
  { code: "30140", name: "Submucous resection of inferior turbinate", serviceType: "SPECIALIST" },
  { code: "30520", name: "Repair of nasal septum (Septoplasty)", serviceType: "SPECIALIST" },
  { code: "31231", name: "Nasal endoscopy, diagnostic", serviceType: "SPECIALIST" },
  { code: "31622", name: "Bronchoscopy, diagnostic", serviceType: "SPECIALIST" },
  
  // Cardiovascular
  { code: "33208", name: "Insertion of new permanent pacemaker", serviceType: "SPECIALIST" },
  { code: "36415", name: "Routine venipuncture (blood draw)", serviceType: "SPECIALIST" },
  { code: "36620", name: "Arterial catheterization", serviceType: "SPECIALIST" },
  
  // Digestive
  { code: "43239", name: "Upper GI endoscopy with biopsy", serviceType: "SPECIALIST" },
  { code: "43249", name: "Upper GI endoscopy with balloon dilation", serviceType: "SPECIALIST" },
  { code: "44140", name: "Partial removal of colon", serviceType: "SPECIALIST" },
  { code: "44970", name: "Laparoscopic appendectomy", serviceType: "SPECIALIST" },
  { code: "45378", name: "Diagnostic colonoscopy", serviceType: "SPECIALIST" },
  { code: "45380", name: "Colonoscopy with biopsy", serviceType: "SPECIALIST" },
  { code: "45385", name: "Colonoscopy with lesion removal (snare)", serviceType: "SPECIALIST" },
  { code: "47562", name: "Laparoscopic cholecystectomy (gallbladder)", serviceType: "SPECIALIST" },
  { code: "49505", name: "Repair of inguinal hernia", serviceType: "SPECIALIST" },
  
  // Urinary & Reproductive
  { code: "52000", name: "Cystourethroscopy (diagnostic)", serviceType: "SPECIALIST" },
  { code: "52332", name: "Cystourethroscopy with stent insertion", serviceType: "SPECIALIST" },
  { code: "54050", name: "Destruction of penile lesion", serviceType: "SPECIALIST" },
  { code: "58150", name: "Total hysterectomy", serviceType: "SPECIALIST" },
  { code: "58558", name: "Hysteroscopy with biopsy", serviceType: "SPECIALIST" },
  { code: "59400", name: "Routine obstetric care including delivery", serviceType: "SPECIALIST" },
  { code: "59510", name: "Cesarean delivery with routine OB care", serviceType: "SPECIALIST" },
  
  // Nervous System, Eye, and Ear
  { code: "62322", name: "Epidural injection, lumbar or sacral", serviceType: "SPECIALIST" },
  { code: "63030", name: "Lumbar microdiscectomy", serviceType: "SPECIALIST" },
  { code: "64721", name: "Carpal tunnel release", serviceType: "SPECIALIST" },
  { code: "66984", name: "Cataract surgery with intraocular lens", serviceType: "SPECIALIST" },
  { code: "69436", name: "Tympanostomy (ear tubes) with general anesthesia", serviceType: "SPECIALIST" },

  // ==========================================
  // RADIOLOGY - SPECIALIST
  // ==========================================
  
  // CT / MRI scans
  { code: "70450", name: "CT scan, head or brain, without contrast", serviceType: "SPECIALIST" },
  { code: "70486", name: "CT scan, maxillofacial area, without contrast", serviceType: "SPECIALIST" },
  { code: "70551", name: "MRI, brain, without contrast", serviceType: "SPECIALIST" },
  { code: "72148", name: "MRI, lumbar spine, without contrast", serviceType: "SPECIALIST" },
  { code: "74176", name: "CT scan, abdomen and pelvis, without contrast", serviceType: "SPECIALIST" },
  { code: "74177", name: "CT scan, abdomen and pelvis, with contrast", serviceType: "SPECIALIST" },
  
  // X-Rays
  { code: "71045", name: "X-ray of chest, 1 view", serviceType: "SPECIALIST" },
  { code: "71046", name: "X-ray of chest, 2 views", serviceType: "SPECIALIST" },
  { code: "72100", name: "X-ray of lower/lumbar spine, 2-3 views", serviceType: "SPECIALIST" },
  { code: "73030", name: "X-ray of shoulder, minimum of 2 views", serviceType: "SPECIALIST" },
  { code: "73120", name: "X-ray of hand, minimum of 2 views", serviceType: "SPECIALIST" },
  { code: "73600", name: "X-ray of ankle, 2 views", serviceType: "SPECIALIST" },
  { code: "73630", name: "X-ray of foot, minimum of 3 views", serviceType: "SPECIALIST" },
  { code: "74018", name: "X-ray of abdomen, 1 view", serviceType: "SPECIALIST" },
  
  // Ultrasounds & Mammography
  { code: "76536", name: "Ultrasound of neck or thyroid", serviceType: "SPECIALIST" },
  { code: "76700", name: "Ultrasound of abdomen, complete", serviceType: "SPECIALIST" },
  { code: "76801", name: "Ultrasound of pregnant uterus, first trimester", serviceType: "SPECIALIST" },
  { code: "76815", name: "Ultrasound of pregnant uterus, limited", serviceType: "SPECIALIST" },
  { code: "76830", name: "Transvaginal ultrasound", serviceType: "SPECIALIST" },
  { code: "77067", name: "Screening mammography, bilateral", serviceType: "SPECIALIST" },

  // ==========================================
  // PATHOLOGY & LABORATORY - SPECIALIST
  // ==========================================
  
  // Panels
  { code: "80048", name: "Basic metabolic panel (BMP)", serviceType: "SPECIALIST" },
  { code: "80050", name: "General health panel", serviceType: "SPECIALIST" },
  { code: "80053", name: "Comprehensive metabolic panel (CMP)", serviceType: "SPECIALIST" },
  { code: "80061", name: "Lipid panel", serviceType: "SPECIALIST" },
  { code: "80076", name: "Hepatic function panel", serviceType: "SPECIALIST" },
  
  // Urinalysis & Chemistry
  { code: "81000", name: "Urinalysis, non-automated, with microscopy", serviceType: "SPECIALIST" },
  { code: "81002", name: "Urinalysis, non-automated, without microscopy", serviceType: "SPECIALIST" },
  { code: "81025", name: "Urine pregnancy test", serviceType: "SPECIALIST" },
  { code: "82040", name: "Albumin blood test", serviceType: "SPECIALIST" },
  { code: "82310", name: "Calcium blood test", serviceType: "SPECIALIST" },
  { code: "82565", name: "Creatinine blood test", serviceType: "SPECIALIST" },
  { code: "82947", name: "Glucose blood test (quantitative)", serviceType: "SPECIALIST" },
  { code: "83036", name: "Hemoglobin A1C test", serviceType: "SPECIALIST" },
  { code: "84153", name: "PSA (Prostate specific antigen) test", serviceType: "SPECIALIST" },
  { code: "84439", name: "Thyroxine (T4) test", serviceType: "SPECIALIST" },
  { code: "84443", name: "TSH (Thyroid stimulating hormone) test", serviceType: "SPECIALIST" },
  
  // Hematology & Microbiology
  { code: "85025", name: "Complete blood count (CBC) with automated differential", serviceType: "SPECIALIST" },
  { code: "85027", name: "Complete blood count (CBC) without differential", serviceType: "SPECIALIST" },
  { code: "85610", name: "Prothrombin time (PT) test", serviceType: "SPECIALIST" },
  { code: "86140", name: "C-reactive protein (CRP) test", serviceType: "SPECIALIST" },
  { code: "87086", name: "Urine culture, quantitative", serviceType: "SPECIALIST" },
  { code: "87804", name: "Influenza rapid test", serviceType: "SPECIALIST" },
  { code: "87880", name: "Strep A rapid test", serviceType: "SPECIALIST" },
  
  // Surgical Pathology
  { code: "88304", name: "Surgical pathology, level III", serviceType: "SPECIALIST" },
  { code: "88305", name: "Surgical pathology, level IV", serviceType: "SPECIALIST" },

  // ==========================================
  // MEDICINE & IMMUNIZATIONS - SPECIALIST
  // ==========================================
  
  // Vaccines & Administration
  { code: "90460", name: "Immunization admin through 18 yrs, first component", serviceType: "SPECIALIST" },
  { code: "90471", name: "Immunization admin, one vaccine (injection)", serviceType: "SPECIALIST" },
  { code: "90632", name: "Hepatitis A vaccine, adult", serviceType: "SPECIALIST" },
  { code: "90658", name: "Flu vaccine, 3 yrs and older", serviceType: "SPECIALIST" },
  { code: "90686", name: "Flu vaccine, quadrivalent, 3 yrs and older", serviceType: "SPECIALIST" },
  { code: "90715", name: "Tdap vaccine, 7 yrs and older", serviceType: "SPECIALIST" },
  
  // Psychiatry
  { code: "90832", name: "Psychotherapy, 30 minutes", serviceType: "SPECIALIST" },
  { code: "90834", name: "Psychotherapy, 45 minutes", serviceType: "SPECIALIST" },
  { code: "90837", name: "Psychotherapy, 60 minutes", serviceType: "SPECIALIST" },
  
  // Ophthalmology
  { code: "92004", name: "Eye exam, new patient, comprehensive", serviceType: "SPECIALIST" },
  { code: "92014", name: "Eye exam, est patient, comprehensive", serviceType: "SPECIALIST" },
  
  // Cardiology
  { code: "93000", name: "Electrocardiogram (ECG/EKG), complete", serviceType: "SPECIALIST" },
  { code: "93010", name: "Electrocardiogram (ECG/EKG), interpretation only", serviceType: "SPECIALIST" },
  { code: "93306", name: "Echocardiogram, complete", serviceType: "SPECIALIST" },
  
  // Pulmonary
  { code: "94640", name: "Inhalation treatment for airway obstruction", serviceType: "SPECIALIST" },
  
  // Physical Medicine & Rehab
  { code: "97110", name: "Therapeutic exercises, 15 minutes", serviceType: "SPECIALIST" },
  { code: "97112", name: "Neuromuscular reeducation, 15 minutes", serviceType: "SPECIALIST" },
  { code: "97140", name: "Manual therapy techniques, 15 minutes", serviceType: "SPECIALIST" },
  { code: "97530", name: "Therapeutic activities, 15 minutes", serviceType: "SPECIALIST" },

  // ==========================================
  // EVALUATION AND MANAGEMENT (E/M) - GENERAL
  // ==========================================
  
  // Office & Outpatient Consultations
  { code: "99242", name: "Office consultation, straightforward", serviceType: "GENERAL" },
  { code: "99243", name: "Office consultation, low complexity", serviceType: "GENERAL" },
  { code: "99244", name: "Office consultation, moderate complexity", serviceType: "GENERAL" },
  { code: "99245", name: "Office consultation, high complexity", serviceType: "GENERAL" },
  
  // Inpatient Consultations
  { code: "99252", name: "Inpatient consultation, straightforward", serviceType: "GENERAL" },
  { code: "99253", name: "Inpatient consultation, low complexity", serviceType: "GENERAL" },
  { code: "99254", name: "Inpatient consultation, moderate complexity", serviceType: "GENERAL" },
  { code: "99255", name: "Inpatient consultation, high complexity", serviceType: "GENERAL" },
  
  // Home or Residence Services
  { code: "99341", name: "Home visit, new patient, straightforward", serviceType: "GENERAL" },
  { code: "99342", name: "Home visit, new patient, low complexity", serviceType: "GENERAL" },
  { code: "99344", name: "Home visit, new patient, moderate complexity", serviceType: "GENERAL" },
  { code: "99345", name: "Home visit, new patient, high complexity", serviceType: "GENERAL" },
  { code: "99347", name: "Home visit, est patient, straightforward", serviceType: "GENERAL" },
  { code: "99348", name: "Home visit, est patient, low complexity", serviceType: "GENERAL" },
  { code: "99349", name: "Home visit, est patient, moderate complexity", serviceType: "GENERAL" },
  { code: "99350", name: "Home visit, est patient, high complexity", serviceType: "GENERAL" },
  
  // Preventive Counseling & Care Planning
  { code: "99401", name: "Preventive medicine counseling, ~15 mins", serviceType: "GENERAL" },
  { code: "99402", name: "Preventive medicine counseling, ~30 mins", serviceType: "GENERAL" },
  { code: "99497", name: "Advance care planning, first 30 mins", serviceType: "GENERAL" },
  { code: "99498", name: "Advance care planning, additional 30 mins", serviceType: "GENERAL" },
  
  // Prolonged Services
  { code: "99417", name: "Prolonged office/outpatient E/M service, each 15 mins", serviceType: "GENERAL" },

  // ==========================================
  // SURGERY & PROCEDURES - SPECIALIST
  // ==========================================
  
  // Integumentary (Wounds & Skin)
  { code: "11042", name: "Debridement, subcutaneous tissue, 20 sq cm or less", serviceType: "SPECIALIST" },
  { code: "11043", name: "Debridement, muscle and/or fascia, 20 sq cm or less", serviceType: "SPECIALIST" },
  { code: "13100", name: "Repair, complex, trunk, 1.1 cm to 2.5 cm", serviceType: "SPECIALIST" },
  { code: "15002", name: "Surgical preparation of wound for graft, trunk/arms/legs", serviceType: "SPECIALIST" },
  { code: "17311", name: "Mohs micrographic surgery, head/neck/hands/feet, stage 1", serviceType: "SPECIALIST" },
  
  // Musculoskeletal (Bones & Joints)
  { code: "21315", name: "Closed treatment of nasal bone fracture", serviceType: "SPECIALIST" },
  { code: "22551", name: "Anterior cervical spinal fusion (C-spine)", serviceType: "SPECIALIST" },
  { code: "27130", name: "Total hip arthroplasty (replacement)", serviceType: "SPECIALIST" },
  { code: "27447", name: "Total knee arthroplasty (replacement)", serviceType: "SPECIALIST" },
  { code: "29822", name: "Arthroscopy, shoulder, limited debridement", serviceType: "SPECIALIST" },
  
  // Respiratory & Cardiovascular
  { code: "31500", name: "Intubation, endotracheal, emergency procedure", serviceType: "SPECIALIST" },
  { code: "32408", name: "Core needle biopsy, lung or mediastinum", serviceType: "SPECIALIST" },
  { code: "33405", name: "Replacement, aortic valve, with cardiopulmonary bypass", serviceType: "SPECIALIST" },
  { code: "33510", name: "Coronary artery bypass (CABG), single arterial graft", serviceType: "SPECIALIST" },
  { code: "36245", name: "Catheter placement in abdominal/pelvic artery", serviceType: "SPECIALIST" },
  
  // Digestive System
  { code: "42820", name: "Tonsillectomy and adenoidectomy, <12 years", serviceType: "SPECIALIST" },
  { code: "43235", name: "Upper GI endoscopy (EGD), diagnostic", serviceType: "SPECIALIST" },
  { code: "47600", name: "Cholecystectomy (gallbladder removal), open", serviceType: "SPECIALIST" },
  { code: "49585", name: "Repair of umbilical hernia", serviceType: "SPECIALIST" },
  
  // Urinary, Genital & Endocrine
  { code: "52005", name: "Cystourethroscopy with ureteral catheterization", serviceType: "SPECIALIST" },
  { code: "55866", name: "Laparoscopy, surgical prostatectomy", serviceType: "SPECIALIST" },
  { code: "58260", name: "Vaginal hysterectomy, for uterus 250g or less", serviceType: "SPECIALIST" },
  { code: "58300", name: "Insertion of intrauterine device (IUD)", serviceType: "SPECIALIST" },
  { code: "60220", name: "Total thyroid lobectomy, unilateral", serviceType: "SPECIALIST" },
  
  // Nervous System
  { code: "63047", name: "Laminectomy, lumbar, single interspace", serviceType: "SPECIALIST" },
  { code: "64450", name: "Injection, anesthetic agent, other peripheral nerve", serviceType: "SPECIALIST" },

  // ==========================================
  // RADIOLOGY - SPECIALIST
  // ==========================================
  
  // MRI / CT / PET Scans
  { code: "70470", name: "CT scan, head or brain, without/with contrast", serviceType: "SPECIALIST" },
  { code: "72141", name: "MRI, cervical spine, without contrast", serviceType: "SPECIALIST" },
  { code: "73221", name: "MRI, upper extremity joint (e.g., shoulder, knee)", serviceType: "SPECIALIST" },
  { code: "74150", name: "CT scan, abdomen, without contrast", serviceType: "SPECIALIST" },
  { code: "78815", name: "PET scan, skull base to mid-thigh", serviceType: "SPECIALIST" },
  
  // Specialized Ultrasounds & Nuclear
  { code: "76811", name: "Ultrasound, pregnant uterus, detailed fetal anatomic exam", serviceType: "SPECIALIST" },
  { code: "76817", name: "Ultrasound, pregnant uterus, transvaginal", serviceType: "SPECIALIST" },
  { code: "77412", name: "Radiation treatment delivery, high energy", serviceType: "SPECIALIST" },
  { code: "78306", name: "Bone/joint imaging, whole body", serviceType: "SPECIALIST" },

  // ==========================================
  // PATHOLOGY & LABORATORY - SPECIALIST
  // ==========================================
  
  // Specialty Panels & Genetics
  { code: "80074", name: "Acute hepatitis panel", serviceType: "SPECIALIST" },
  { code: "80305", name: "Drug test, presumptive, any number of drug classes", serviceType: "SPECIALIST" },
  { code: "81220", name: "CFTR (cystic fibrosis) gene analysis, common variants", serviceType: "SPECIALIST" },
  
  // Chemistry (Individual Tests)
  { code: "82042", name: "Albumin, urine (microalbumin), quantitative", serviceType: "SPECIALIST" },
  { code: "82607", name: "Vitamin B-12 level", serviceType: "SPECIALIST" },
  { code: "82728", name: "Ferritin test", serviceType: "SPECIALIST" },
  { code: "83540", name: "Iron test", serviceType: "SPECIALIST" },
  { code: "83735", name: "Magnesium level", serviceType: "SPECIALIST" },
  { code: "84450", name: "Transferase, aspartate amino (AST/SGOT)", serviceType: "SPECIALIST" },
  { code: "84460", name: "Transferase, alanine amino (ALT/SGPT)", serviceType: "SPECIALIST" },
  
  // Hematology
  { code: "85018", name: "Hemoglobin level", serviceType: "SPECIALIST" },
  { code: "85652", name: "Sedimentation rate (ESR), automated", serviceType: "SPECIALIST" },
  { code: "86038", name: "Antinuclear antibodies (ANA) test", serviceType: "SPECIALIST" },

  // ==========================================
  // MEDICINE & DIAGNOSTICS - SPECIALIST
  // ==========================================
  
  // Additional Vaccines
  { code: "90472", name: "Immunization admin, each additional vaccine (injection)", serviceType: "SPECIALIST" },
  { code: "90636", name: "Hepatitis A and Hepatitis B vaccine, adult", serviceType: "SPECIALIST" },
  { code: "90700", name: "DTaP vaccine, under 7 yrs", serviceType: "SPECIALIST" },
  { code: "90714", name: "Td vaccine, preservative free, 7 yrs or older", serviceType: "SPECIALIST" },
  
  // Cardiology & Pulmonary Testing
  { code: "93015", name: "Cardiovascular stress test, complete", serviceType: "SPECIALIST" },
  { code: "93224", name: "Holter monitor (ECG recording), up to 48 hours", serviceType: "SPECIALIST" },
  { code: "93970", name: "Duplex scan of extremity veins, complete (Doppler)", serviceType: "SPECIALIST" },
  { code: "94010", name: "Spirometry (lung function test)", serviceType: "SPECIALIST" },
  
  // Allergy, Neuro & Vision Testing
  { code: "92083", name: "Visual field examination, extended", serviceType: "SPECIALIST" },
  { code: "92557", name: "Comprehensive audiometry threshold eval and speech", serviceType: "SPECIALIST" },
  { code: "95004", name: "Allergy skin prick testing, per test", serviceType: "SPECIALIST" },
  { code: "95812", name: "Electroencephalogram (EEG), 41-60 mins", serviceType: "SPECIALIST" },
  { code: "95925", name: "Somatosensory testing, upper limbs", serviceType: "SPECIALIST" },
  
  // Sedation
  { code: "99152", name: "Moderate sedation by same physician, first 15 mins", serviceType: "SPECIALIST" },

  { code: "87040", name: "Blood Culture and Sensitivity (bacterial, aerobic)", serviceType: "SPECIALIST" },
  { code: "87045", name: "Stool Culture and Sensitivity (bacterial, aerobic)", serviceType: "SPECIALIST" },
  { code: "85025", name: "Full Blood Count (FBC / CBC) with automated differential", serviceType: "SPECIALIST" },
  { code: "86000", name: "Widal Test (Febrile agglutinins, Salmonella)", serviceType: "SPECIALIST" },
  { code: "87899", name:  "Malaria Parasite (MP) Rapid Diagnostic Test (RDT) Infectious agent antigen detection by immunoassay with direct optical observation", serviceType: "SPECIALIST"},
  { code: "87207", name: "Smear, primary source with interpretation; special stain for inclusion bodies or parasites (eg, malaria, kala azar, protozoa)", serviceType: "SPECIALIST"},

  // ==========================================
  // EVALUATION AND MANAGEMENT (E/M) - GENERAL
  // ==========================================
  { code: "99421", name: "Online digital evaluation and management service, 5-10 mins", serviceType: "GENERAL" },
  { code: "99422", name: "Online digital evaluation and management service, 11-20 mins", serviceType: "GENERAL" },
  { code: "99423", name: "Online digital evaluation and management service, 21+ mins", serviceType: "GENERAL" },
  { code: "99441", name: "Telephone evaluation and management service, 5-10 mins", serviceType: "GENERAL" },
  { code: "99442", name: "Telephone evaluation and management service, 11-20 mins", serviceType: "GENERAL" },
  { code: "99443", name: "Telephone evaluation and management service, 21-30 mins", serviceType: "GENERAL" },
  { code: "99460", name: "Initial hospital or birthing center care, normal newborn infant", serviceType: "GENERAL" },
  { code: "99461", name: "Initial care, normal newborn infant, seen in other setting", serviceType: "GENERAL" },
  { code: "99462", name: "Subsequent hospital care, normal newborn infant, per day", serviceType: "GENERAL" },
  { code: "99477", name: "Initial hospital care, intensive care services, neonate", serviceType: "GENERAL" },
  { code: "99478", name: "Subsequent intensive care, neonate, weight less than 1500g", serviceType: "GENERAL" },
  { code: "99479", name: "Subsequent intensive care, neonate, weight 1500-2500g", serviceType: "GENERAL" },
  { code: "99480", name: "Subsequent intensive care, infant, weight 2501-5000g", serviceType: "GENERAL" },
  { code: "99315", name: "Nursing facility discharge day management, 30 mins or less", serviceType: "GENERAL" },
  { code: "99316", name: "Nursing facility discharge day management, more than 30 mins", serviceType: "GENERAL" },
  { code: "99453", name: "Remote physiologic monitoring setup and patient education", serviceType: "GENERAL" },
  { code: "99454", name: "Remote physiologic monitoring device supply and daily tracking", serviceType: "GENERAL" },

  // ==========================================
  // PATHOLOGY & LABORATORY - SPECIALIST
  // ==========================================
  { code: "80051", name: "Electrolyte panel (Sodium, Potassium, Chloride, CO2)", serviceType: "SPECIALIST" },
  { code: "80069", name: "Renal function panel (Albumin, BUN, Creatinine, Electrolytes)", serviceType: "SPECIALIST" },
  { code: "80156", name: "Carbamazepine total drug assay", serviceType: "SPECIALIST" },
  { code: "80162", name: "Digoxin total drug assay", serviceType: "SPECIALIST" },
  { code: "80164", name: "Valproic acid total drug assay", serviceType: "SPECIALIST" },
  { code: "81001", name: "Urinalysis, automated with microscopy", serviceType: "SPECIALIST" },
  { code: "81003", name: "Urinalysis, automated without microscopy", serviceType: "SPECIALIST" },
  { code: "82150", name: "Amylase blood test", serviceType: "SPECIALIST" },
  { code: "82247", name: "Bilirubin, total, blood test", serviceType: "SPECIALIST" },
  { code: "82248", name: "Bilirubin, direct, blood test", serviceType: "SPECIALIST" },
  { code: "82378", name: "Carcinoembryonic antigen (CEA) tumor marker test", serviceType: "SPECIALIST" },
  { code: "82465", name: "Cholesterol, serum or whole blood test", serviceType: "SPECIALIST" },
  { code: "82550", name: "Creatine kinase (CK / CPK) total enzyme assay", serviceType: "SPECIALIST" },
  { code: "82962", name: "Glucose, blood test by monitoring device (fingerstick)", serviceType: "SPECIALIST" },
  { code: "83690", name: "Lipase blood test", serviceType: "SPECIALIST" },
  { code: "84100", name: "Phosphorus, inorganic, blood test", serviceType: "SPECIALIST" },
  { code: "84132", name: "Potassium, serum, blood test", serviceType: "SPECIALIST" },
  { code: "84295", name: "Sodium, serum, blood test", serviceType: "SPECIALIST" },
  { code: "84520", name: "Urea nitrogen (BUN), blood test", serviceType: "SPECIALIST" },
  { code: "84550", name: "Uric acid, blood test", serviceType: "SPECIALIST" },
  { code: "85004", name: "Automated differential white blood cell count", serviceType: "SPECIALIST" },
  { code: "85014", name: "Hematocrit (Hct) blood count", serviceType: "SPECIALIST" },
  { code: "85041", name: "Red blood cell (RBC) automated count", serviceType: "SPECIALIST" },
  { code: "85048", name: "White blood cell (WBC) automated count", serviceType: "SPECIALIST" },
  { code: "85049", name: "Platelet automated count", serviceType: "SPECIALIST" },
  { code: "85730", name: "Thromboplastin time, partial (aPTT), plasma", serviceType: "SPECIALIST" },
  { code: "86039", name: "Antinuclear antibodies (ANA) titer test", serviceType: "SPECIALIST" },
  { code: "86060", name: "Antistreptolysin O (ASO) titer test", serviceType: "SPECIALIST" },
  { code: "86308", name: "Heterophile antibodies, screening (Monospot test)", serviceType: "SPECIALIST" },
  { code: "86580", name: "Tuberculosis intradermal skin test (PPD)", serviceType: "SPECIALIST" },
  { code: "86701", name: "HIV-1 antibody screening test", serviceType: "SPECIALIST" },
  { code: "86703", name: "HIV-1 and HIV-2 single result antibody assay", serviceType: "SPECIALIST" },
  { code: "86704", name: "Hepatitis B core antibody (HBcAb), total", serviceType: "SPECIALIST" },
  { code: "86706", name: "Hepatitis B surface antibody (HBsAb) titer", serviceType: "SPECIALIST" },
  { code: "87070", name: "Culture, bacterial; isolation from any other source", serviceType: "SPECIALIST" },
  { code: "87081", name: "Culture, bacterial; single organism screening", serviceType: "SPECIALIST" },
  { code: "87110", name: "Culture, chlamydia, any source", serviceType: "SPECIALIST" },
  { code: "87186", name: "Antimicrobial susceptibility studies, microdilution", serviceType: "SPECIALIST" },
  { code: "87210", name: "Smear, primary infectious agent, wet mount with interpretation", serviceType: "SPECIALIST" },
  { code: "87340", name: "Hepatitis B surface antigen (HBsAg) immunoassay", serviceType: "SPECIALIST" },
  { code: "87389", name: "HIV-1 antigen with HIV-1/HIV-2 antibodies, immunoassay", serviceType: "SPECIALIST" },
  { code: "87491", name: "Chlamydia trachomatis, DNA, amplified probe technique", serviceType: "SPECIALIST" },
  { code: "87591", name: "Neisseria gonorrhoeae, DNA, amplified probe technique", serviceType: "SPECIALIST" },
  { code: "87651", name: "Streptococcus, group A, DNA, amplified probe technique", serviceType: "SPECIALIST" },
  { code: "88141", name: "Cytopathology, cervical or vaginal (Pap smear) interpretation", serviceType: "SPECIALIST" },
  { code: "88302", name: "Surgical pathology, gross examination only (Level II)", serviceType: "SPECIALIST" },
  { code: "88307", name: "Surgical pathology, gross and microscopic exam (Level V)", serviceType: "SPECIALIST" },

  // ==========================================
  // RADIOLOGY - SPECIALIST
  // ==========================================
  { code: "70460", name: "CT scan, head or brain, with contrast material", serviceType: "SPECIALIST" },
  { code: "70480", name: "CT scan, orbit, sella, or posterior fossa, without contrast", serviceType: "SPECIALIST" },
  { code: "70490", name: "CT scan, soft tissue neck, without contrast material", serviceType: "SPECIALIST" },
  { code: "70544", name: "MR Angiography, head, without contrast material", serviceType: "SPECIALIST" },
  { code: "70553", name: "MRI, brain, without contrast, followed by contrast", serviceType: "SPECIALIST" },
  { code: "72040", name: "X-ray examination, cervical spine, 2 or 3 views", serviceType: "SPECIALIST" },
  { code: "72070", name: "X-ray examination, thoracic spine, 2 views", serviceType: "SPECIALIST" },
  { code: "72110", name: "X-ray examination, lumbosacral spine, 4 or more views", serviceType: "SPECIALIST" },
  { code: "72125", name: "CT scan, cervical spine, without contrast material", serviceType: "SPECIALIST" },
  { code: "72146", name: "MRI, thoracic spine, without contrast material", serviceType: "SPECIALIST" },
  { code: "73060", name: "X-ray examination, humerus, 2 or more views", serviceType: "SPECIALIST" },
  { code: "73080", name: "X-ray examination, elbow, 3 or more views", serviceType: "SPECIALIST" },
  { code: "73090", name: "X-ray examination, forearm, 2 views", serviceType: "SPECIALIST" },
  { code: "73100", name: "X-ray examination, wrist, 2 views", serviceType: "SPECIALIST" },
  { code: "73110", name: "X-ray examination, wrist, 3 or more views", serviceType: "SPECIALIST" },
  { code: "73130", name: "X-ray examination, hand, 3 or more views", serviceType: "SPECIALIST" },
  { code: "73140", name: "X-ray examination, finger(s), 2 or more views", serviceType: "SPECIALIST" },
  { code: "73502", name: "X-ray examination, hip, unilateral, 2 or 3 views", serviceType: "SPECIALIST" },
  { code: "73521", name: "X-ray examination, hips, bilateral, 2 views", serviceType: "SPECIALIST" },
  { code: "73560", name: "X-ray examination, knee, 1 or 2 views", serviceType: "SPECIALIST" },
  { code: "73562", name: "X-ray examination, knee, 3 views", serviceType: "SPECIALIST" },
  { code: "73564", name: "X-ray examination, knee, 4 or more views", serviceType: "SPECIALIST" },
  { code: "74022", name: "X-ray examination, abdomen, complete acute series", serviceType: "SPECIALIST" },
  { code: "74160", name: "CT scan, abdomen, with contrast material", serviceType: "SPECIALIST" },
  { code: "74220", name: "Radiologic examination, esophagus (Barium swallow)", serviceType: "SPECIALIST" },
  { code: "75630", name: "Aortography, abdominal, plus bilateral extremity injection", serviceType: "SPECIALIST" },
  { code: "76641", name: "Ultrasound, breast, complete diagnostic evaluation", serviceType: "SPECIALIST" },
  { code: "76705", name: "Ultrasound, abdomen, limited or single organ focus", serviceType: "SPECIALIST" },
  { code: "76770", name: "Ultrasound, retroperitoneal (Renal/Kidneys), complete", serviceType: "SPECIALIST" },
  { code: "76831", name: "Hysterosonography, pelvic ultrasound mapping", serviceType: "SPECIALIST" },
  { code: "76856", name: "Ultrasound, pelvic, non-obstetric, complete diagnostic", serviceType: "SPECIALIST" },
  { code: "76870", name: "Ultrasound, scrotum and contents", serviceType: "SPECIALIST" },
  { code: "77065", name: "Diagnostic mammography, unilateral", serviceType: "SPECIALIST" },
  { code: "77066", name: "Diagnostic mammography, bilateral", serviceType: "SPECIALIST" },
  { code: "77080", name: "DEXA bone density scan, central axial skeleton", serviceType: "SPECIALIST" },

  // ==========================================
  // SURGERY & AMBULATORY PROCEDURES - SPECIALIST
  // ==========================================
  { code: "10140", name: "Incision and drainage of hematoma, seroma or fluid collection", serviceType: "SPECIALIST" },
  { code: "11000", name: "Debridement of extensive eczematous skin, initial 10%", serviceType: "SPECIALIST" },
  { code: "11720", name: "Debridement of nail(s) by any method, 1 to 5 nails", serviceType: "SPECIALIST" },
  { code: "11721", name: "Debridement of nail(s) by any method, 6 or more nails", serviceType: "SPECIALIST" },
  { code: "11740", name: "Evacuation of subungual hematoma (blood under nail)", serviceType: "SPECIALIST" },
  { code: "11900", name: "Injection, intralesional, up to and including 7 lesions", serviceType: "SPECIALIST" },
  { code: "12004", name: "Simple repair of superficial wound, 7.6 cm to 12.5 cm", serviceType: "SPECIALIST" },
  { code: "12011", name: "Simple repair of superficial wound, face/ears/lips up to 2.5 cm", serviceType: "SPECIALIST" },
  { code: "12031", name: "Layered closure of wounds, trunk/extremities up to 2.5 cm", serviceType: "SPECIALIST" },
  { code: "13121", name: "Repair, complex, scalp, arms, and/or legs, 2.6cm to 7.5cm", serviceType: "SPECIALIST" },
  { code: "15100", name: "Split-thickness skin graft, trunk/arms/legs, first 100 sq cm", serviceType: "SPECIALIST" },
  { code: "16020", name: "Dressings or debridement of partial-thickness burns, small", serviceType: "SPECIALIST" },
  { code: "17111", name: "Destruction of benign lesions other than skin tags, 15 or more", serviceType: "SPECIALIST" },
  { code: "20550", name: "Injection, single tendon sheath or ligament aponeurosis", serviceType: "SPECIALIST" },
  { code: "20553", name: "Injection(s), single or multiple trigger points, 3+ muscles", serviceType: "SPECIALIST" },
  { code: "21453", name: "Closed treatment of mandibular fracture with interdental fixation", serviceType: "SPECIALIST" },
  { code: "23412", name: "Repair of ruptured rotator cuff tendon, chronic state", serviceType: "SPECIALIST" },
  { code: "25500", name: "Closed treatment of radial shaft fracture, without manipulation", serviceType: "SPECIALIST" },
  { code: "25600", name: "Closed treatment of distal radial fracture, without manipulation", serviceType: "SPECIALIST" },
  { code: "26055", name: "Tendon sheath incision for trigger finger release", serviceType: "SPECIALIST" },
  { code: "27244", name: "Treatment of intertrochanteric hip fracture with plate/screws", serviceType: "SPECIALIST" },
  { code: "27506", name: "Open treatment of femoral shaft fracture, with fixation", serviceType: "SPECIALIST" },
  { code: "27814", name: "Open treatment of bimalleolar ankle fracture, with fixation", serviceType: "SPECIALIST" },
  { code: "28470", name: "Closed treatment of metatarsal fracture, without manipulation", serviceType: "SPECIALIST" },
  { code: "29105", name: "Application of long arm splint, shoulder to hand", serviceType: "SPECIALIST" },
  { code: "29125", name: "Application of short arm splint, forearm to hand", serviceType: "SPECIALIST" },
  { code: "29130", name: "Application of finger splint, static design", serviceType: "SPECIALIST" },
  { code: "29505", name: "Application of long leg splint, thigh to ankle", serviceType: "SPECIALIST" },
  { code: "29515", name: "Application of short leg splint, calf to foot", serviceType: "SPECIALIST" },
  { code: "29806", name: "Arthroscopy, shoulder, surgical capsulorrhaphy structural", serviceType: "SPECIALIST" },
  { code: "29823", name: "Arthroscopy, shoulder, surgical extensive debridement", serviceType: "SPECIALIST" },
  { code: "29877", name: "Arthroscopy, knee, surgical debridement/shaving of cartilage", serviceType: "SPECIALIST" },
  { code: "29880", name: "Arthroscopy, knee, surgical meniscectomy medial AND lateral", serviceType: "SPECIALIST" },
  { code: "30300", name: "Removal of foreign body from nose, clinic office procedure", serviceType: "SPECIALIST" },
  { code: "31575", name: "Laryngoscopy, flexible fiberoptic, diagnostic evaluation", serviceType: "SPECIALIST" },
  { code: "32551", name: "Tube thoracostomy, includes water seal integration", serviceType: "SPECIALIST" },
  { code: "36410", name: "Venipuncture, age 3+, necessitating advanced physician skill", serviceType: "SPECIALIST" },
  { code: "36591", name: "Collection of blood specimen from implantable access device", serviceType: "SPECIALIST" },
  { code: "38220", name: "Diagnostic bone marrow aspiration mapping", serviceType: "SPECIALIST" },
  { code: "38221", name: "Diagnostic bone marrow core needle biopsy", serviceType: "SPECIALIST" },
  { code: "40490", name: "Biopsy evaluation of the lip structure", serviceType: "SPECIALIST" },
  { code: "41100", name: "Biopsy of tongue, anterior two-thirds area", serviceType: "SPECIALIST" },
  { code: "42415", name: "Excision of parotid tumor or sublateral salivary gland", serviceType: "SPECIALIST" },
  { code: "43200", name: "Esophagoscopy, flexible diagnostic routing", serviceType: "SPECIALIST" },
  { code: "44950", name: "Appendectomy, open abdominal approach", serviceType: "SPECIALIST" },
  { code: "45300", name: "Proctosigmoidoscopy, rigid instrumentation, diagnostic", serviceType: "SPECIALIST" },
  { code: "46221", name: "Hemorrhoidectomy, internal complex, by simple ligature", serviceType: "SPECIALIST" },
  { code: "46255", name: "Hemorrhoidectomy, internal and external, single column profile", serviceType: "SPECIALIST" },
  { code: "46924", name: "Destruction of anal lesion(s), extensive surgical approach", serviceType: "SPECIALIST" },
  { code: "49560", name: "Repair of initial incisional ventral hernia", serviceType: "SPECIALIST" },
  { code: "51701", name: "Insertion of non-indwelling straight bladder catheter", serviceType: "SPECIALIST" },
  { code: "51702", name: "Insertion of temporary indwelling bladder Foley catheter", serviceType: "SPECIALIST" },
  { code: "52204", name: "Cystourethroscopy with transurethral biopsy", serviceType: "SPECIALIST" },
  { code: "53600", name: "Dilation of urethral stricture by passage of sound, male patient", serviceType: "SPECIALIST" },
  { code: "54060", name: "Surgical destruction of extensive condyloma, penis", serviceType: "SPECIALIST" },
  { code: "54150", name: "Circumcision, using clamp or protective device, newborn", serviceType: "SPECIALIST" },
  { code: "54161", name: "Circumcision, surgical excision method, older than newborn", serviceType: "SPECIALIST" },
  { code: "56405", name: "Incision and drainage of vulva or perineal deep abscess", serviceType: "SPECIALIST" },
  { code: "56605", name: "Biopsy of vulva or perineum surface, single lesion site", serviceType: "SPECIALIST" },
  { code: "57420", name: "Colposcopy of the entire vaginal vault corridor", serviceType: "SPECIALIST" },
  { code: "57454", name: "Colposcopy of the cervix with directed endocervical biopsy", serviceType: "SPECIALIST" },
  { code: "57500", name: "Biopsy of the external cervix, single or multiple sites", serviceType: "SPECIALIST" },
  { code: "58120", name: "Dilation and curettage (D&C), diagnostic/therapeutic", serviceType: "SPECIALIST" },
  { code: "58563", name: "Hysteroscopy with thermal endometrial ablation", serviceType: "SPECIALIST" },
  { code: "59025", name: "Fetal non-stress test monitoring (NST)", serviceType: "SPECIALIST" },
  { code: "64447", name: "Injection, anesthetic agent block; femoral nerve single", serviceType: "SPECIALIST" },
  { code: "64479", name: "Injection, transforaminal epidural anesthetic, cervical site", serviceType: "SPECIALIST" },
  { code: "65205", name: "Removal of foreign body, external eye; conjunctival superficial", serviceType: "SPECIALIST" },
  { code: "65222", name: "Removal of foreign body, external eye; corneal with slit lamp", serviceType: "SPECIALIST" },
  { code: "69200", name: "Removal of foreign body from ear canal, without anesthesia", serviceType: "SPECIALIST" },
  { code: "69210", name: "Removal of impacted cerumen (earwax extraction), unilateral", serviceType: "SPECIALIST" },

  // ==========================================
  // MEDICINE & NON-INVASIVE THERAPY - SPECIALIST
  // ==========================================
  { code: "90651", name: "Human Papillomavirus (HPV) vaccine, 9-valent, IM injection", serviceType: "SPECIALIST" },
  { code: "90670", name: "Pneumococcal conjugate vaccine, 13-valent (Prevnar), IM", serviceType: "SPECIALIST" },
  { code: "90707", name: "Measles, Mumps, and Rubella (MMR) vaccine, SC injection", serviceType: "SPECIALIST" },
  { code: "90716", name: "Varicella (chickenpox) live virus vaccine, SC injection", serviceType: "SPECIALIST" },
  { code: "90732", name: "Pneumococcal polysaccharide vaccine, 23-valent, IM/SC", serviceType: "SPECIALIST" },
  { code: "90734", name: "Meningococcal conjugate vaccine, types A, C, Y, W-135, IM", serviceType: "SPECIALIST" },
  { code: "90746", name: "Hepatitis B vaccine, adult use, 3-dose schedule injection", serviceType: "SPECIALIST" },
  { code: "91035", name: "Gastroesophageal reflux pH test with telemetry mucosal electrode", serviceType: "SPECIALIST" },
  { code: "92002", name: "Eye examination and evaluation, new patient, intermediate level", serviceType: "SPECIALIST" },
  { code: "92012", name: "Eye examination and evaluation, est patient, intermediate level", serviceType: "SPECIALIST" },
  { code: "92225", name: "Ophthalmoscopy, extended diagnostic mapping, initial baseline", serviceType: "SPECIALIST" },
  { code: "92250", name: "Fundus photography with diagnostic interpretation", serviceType: "SPECIALIST" },
  { code: "92507", name: "Treatment of speech, language, or voice communication disorder", serviceType: "SPECIALIST" },
  { code: "92552", name: "Pure tone audiometry screening; air conduction tracking only", serviceType: "SPECIALIST" },
  { code: "93005", name: "Electrocardiogram (ECG/EKG), tracing only without report", serviceType: "SPECIALIST" },
  { code: "93307", name: "Echocardiogram, transthoracic real-time 2D monitoring, complete", serviceType: "SPECIALIST" },
  { code: "93880", name: "Duplex scan of extracranial arteries (Carotid Doppler flow)", serviceType: "SPECIALIST" },
  { code: "94375", name: "Respiratory assessment via flow volume loop configuration", serviceType: "SPECIALIST" },
  { code: "94664", name: "Demonstration and clinical evaluation of nebulizer utilization", serviceType: "SPECIALIST" },
  { code: "95024", name: "Intracutaneous allergy skin prick tests, allergen focus", serviceType: "SPECIALIST" },
  { code: "95806", name: "Sleep study assessment, unattended setup monitoring", serviceType: "SPECIALIST" },
  { code: "95819", name: "Electroencephalogram (EEG), awake and asleep states recorded", serviceType: "SPECIALIST" },
  { code: "95910", name: "Nerve conduction diagnostic studies, 7 to 8 specific pathways", serviceType: "SPECIALIST" },
  { code: "96116", name: "Neurobehavioral status exam by physician, per hour assessment", serviceType: "SPECIALIST" },
  { code: "96360", name: "Intravenous infusion, therapeutic hydration; first full hour", serviceType: "SPECIALIST" },
  { code: "96361", name: "Intravenous infusion, therapeutic hydration; each extra hour", serviceType: "SPECIALIST" },
  { code: "96372", name: "Therapeutic, prophylactic, or diagnostic injection; SC or IM", serviceType: "SPECIALIST" },
  { code: "96413", name: "Chemotherapy administration, intravenous infusion; first hour", serviceType: "SPECIALIST" },
  { code: "97010", name: "Application of a physical modality; hot or cold packs, 1+ areas", serviceType: "SPECIALIST" },
  { code: "97014", name: "Application of a physical modality; electrical stimulation therapy", serviceType: "SPECIALIST" },
  { code: "97116", name: "Physical therapy gait training evaluation, 15 minutes", serviceType: "SPECIALIST" },
  { code: "97597", name: "Debridement, open wound management, initial 20 sq cm", serviceType: "SPECIALIST" },
  { code: "98925", name: "Osteopathic manipulative treatment (OMT); 1 to 2 body regions", serviceType: "SPECIALIST" },
  { code: "98940", name: "Chiropractic manipulative treatment (CMT); spinal, 1-2 regions", serviceType: "SPECIALIST" },
  { code: "99173", name: "Screening test of visual acuity, quantitative scale tracking", serviceType: "SPECIALIST" },
];


async function seed() {

  for (const item of cptCodes) {

    await prisma.cPTCode.upsert({

      where: {
        code: item.code
      },

      update: {},

      create: item
    });
  }

  console.log("CPT seeded");
}

seed()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });