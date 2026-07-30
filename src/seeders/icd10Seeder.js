import prisma from "../utils/prisma.js";

const icd10Codes = [

  {
    "code": "B50",
    "description": "Severe Malaria"
  },
  {
    "code": "J18",
    "description": "Pneumonia"
  },
  {
    "code": "I10",
    "description": "Essential Hypertension"
  },
  {
    "code": "E11",
    "description": "Type 2 Diabetes Mellitus"
  },
  {
    "code": "A09",
    "description": "Gastroenteritis"
  },
  {
    "code": "F32",
    "description": "Major Depressive Disorder"
  },
  {
    "code": "F41",
    "description": "Generalized Anxiety Disorder"
  },
  {
    "code": "J45",
    "description": "Asthma"
  },
  {
    "code": "N39",
    "description": "Urinary Tract Infection"
  },
  {
    "code": "M54",
    "description": "Low Back Pain"
  },
  {
    "code": "R05",
    "description": "Cough"
  },
  {
    "code": "R50",
    "description": "Fever"
  },
  {
    "code": "E03",
    "description": "Hypothyroidism"
  },
  {
    "code": "E66",
    "description": "Obesity"
  },
  {
    "code": "G43",
    "description": "Migraine"
  },
  {
    "code": "G47",
    "description": "Insomnia"
  },
  {
    "code": "K21",
    "description": "Gastro-esophageal Reflux Disease (GERD)"
  },
  {
    "code": "I25",
    "description": "Chronic Ischemic Heart Disease"
  },
  {
    "code": "I48",
    "description": "Atrial Fibrillation"
  },
  {
    "code": "J06",
    "description": "Acute Upper Respiratory Infection"
  },
  {
    "code": "J20",
    "description": "Acute Bronchitis"
  },
  {
    "code": "K58",
    "description": "Irritable Bowel Syndrome"
  },
  {
    "code": "R07",
    "description": "Chest Pain"
  },
  {
    "code": "R51",
    "description": "Headache"
  },
  {
    "code": "D64",
    "description": "Anemia"
  },
  {
    "code": "N18",
    "description": "Chronic Kidney Disease"
  },
  {
    "code": "M25",
    "description": "Joint Pain"
  },
  {
    "code": "L20",
    "description": "Atopic Dermatitis"
  },
  {
    "code": "H10",
    "description": "Conjunctivitis"
  },
  {
    "code": "B34",
    "description": "Viral Infection"
  },
  {
    "code": "C34",
    "description": "Lung Cancer"
  },
  {
    "code": "M17",
    "description": "Osteoarthritis of Knee"
  },
  {
    "code": "Z00",
    "description": "General Medical Examination"
  },
  {
    "code": "A06",
    "description": "Amebiasis"
  },
  {
    "code": "B15",
    "description": "Acute Hepatitis A"
  },
  {
    "code": "B20",
    "description": "Human Immunodeficiency Virus (HIV) Disease"
  },
  {
    "code": "C50",
    "description": "Breast Cancer"
  },
  {
    "code": "D50",
    "description": "Iron Deficiency Anemia"
  },
  {
    "code": "E78",
    "description": "Pure Hypercholesterolemia"
  },
  {
    "code": "G40",
    "description": "Epilepsy"
  },
  {
    "code": "I63",
    "description": "Cerebral Infarction (Stroke)"
  },
  {
    "code": "J30",
    "description": "Allergic Rhinitis"
  },
  {
    "code": "K25",
    "description": "Gastric Ulcer"
  },
  {
    "code": "L25",
    "description": "Unspecified Contact Dermatitis"
  },
  {
    "code": "M10",
    "description": "Gout"
  },
  {
    "code": "N20",
    "description": "Kidney Stones"
  },
  {
    "code": "O80",
    "description": "Single Spontaneous Delivery"
  },
  {
    "code": "R53",
    "description": "Malaise and Fatigue"
  },
  {
    "code": "S06",
    "description": "Concussion"
  },
  {
    "code": "T14",
    "description": "Injury of Unspecified Body Region"
  },

  {
    "code": "A00",
    "description": "Cholera"
  },
  {
    "code": "A01",
    "description": "Typhoid and paratyphoid fevers"
  },
  {
    "code": "A03",
    "description": "Shigellosis"
  },
  {
    "code": "A20",
    "description": "Plague"
  },
  {
    "code": "A23",
    "description": "Brucellosis"
  },
  {
    "code": "A27",
    "description": "Leptospirosis"
  },
  {
    "code": "A30",
    "description": "Leprosy (Hansen's disease)"
  },
  {
    "code": "A31",
    "description": "Infection due to other mycobacteria (e.g., Buruli ulcer)"
  },
  {
    "code": "A35",
    "description": "Other tetanus"
  },
  {
    "code": "A39",
    "description": "Meningococcal infection"
  },
  {
    "code": "A71",
    "description": "Trachoma"
  },
  {
    "code": "A82",
    "description": "Rabies"
  },
  {
    "code": "A90",
    "description": "Dengue fever (classical dengue)"
  },
  {
    "code": "A95",
    "description": "Yellow fever"
  },
  {
    "code": "A96",
    "description": "Arenaviral hemorrhagic fever (includes Lassa fever)"
  },
  {
    "code": "B04",
    "description": "Mpox (Monkeypox)"
  },
  {
    "code": "B16",
    "description": "Acute hepatitis B"
  },
  {
    "code": "B18",
    "description": "Chronic viral hepatitis"
  },
  {
    "code": "B37",
    "description": "Candidiasis"
  },
  {
    "code": "B45",
    "description": "Cryptococcosis"
  },
  {
    "code": "B54",
    "description": "Unspecified malaria"
  },
  {
    "code": "B55",
    "description": "Leishmaniasis"
  },
  {
    "code": "B56",
    "description": "African trypanosomiasis (Sleeping sickness)"
  },
  {
    "code": "B58",
    "description": "Toxoplasmosis"
  },
  {
    "code": "B65",
    "description": "Schistosomiasis (bilharziasis)"
  },
  {
    "code": "B67",
    "description": "Echinococcosis"
  },
  {
    "code": "B68",
    "description": "Taeniasis"
  },
  {
    "code": "B72",
    "description": "Dracunculiasis (Guinea-worm disease)"
  },
  {
    "code": "B73",
    "description": "Onchocerciasis (River blindness)"
  },
  {
    "code": "B74",
    "description": "Filariasis"
  },
  {
    "code": "B76",
    "description": "Hookworm diseases"
  },
  {
    "code": "B77",
    "description": "Ascariasis"
  },
  {
    "code": "B86",
    "description": "Scabies"
  },
  {
    "code": "B87",
    "description": "Myiasis"
  },
  {
    "code": "C22",
    "description": "Malignant neoplasm of liver and intrahepatic bile ducts"
  },
  {
    "code": "C46",
    "description": "Kaposi's sarcoma"
  },
  {
    "code": "C53",
    "description": "Malignant neoplasm of cervix uteri"
  },
  {
    "code": "D57",
    "description": "Sickle-cell disorders"
  },
  {
    "code": "E40",
    "description": "Kwashiorkor"
  },
  {
    "code": "E41",
    "description": "Nutritional marasmus"
  },
  {
    "code": "E43",
    "description": "Unspecified severe protein-calorie malnutrition"
  },
  {
    "code": "E50",
    "description": "Vitamin A deficiency"
  },
  {
    "code": "I00",
    "description": "Rheumatic fever without heart involvement"
  },
  {
    "code": "I05",
    "description": "Rheumatic mitral valve diseases"
  },
  {
    "code": "N82",
    "description": "Fistulae involving female genital tract"
  },
  {
    "code": "O15",
    "description": "Eclampsia"
  },
  {
    "code": "O72",
    "description": "Postpartum hemorrhage"
  },
  {
    "code": "P21",
    "description": "Birth asphyxia"
  },
  {
    "code": "P36",
    "description": "Bacterial sepsis of newborn"
  },
  {
    "code": "P59",
    "description": "Neonatal jaundice from other and unspecified causes"
  },

  {
    "code": "A02",
    "description": "Salmonella enteritis"
  },
  {
    "code": "A04",
    "description": "Other bacterial intestinal infections (e.g., pathogenic E. coli)"
  },
  {
    "code": "A08",
    "description": "Rotaviral enteritis"
  },
  {
    "code": "A36",
    "description": "Diphtheria"
  },
  {
    "code": "A50",
    "description": "Congenital syphilis"
  },
  {
    "code": "A51",
    "description": "Early syphilis"
  },
  {
    "code": "A56",
    "description": "Chlamydial infection of lower genitourinary tract"
  },
  {
    "code": "A92",
    "description": "Other mosquito-borne viral fevers (e.g., Chikungunya, O'nyong-nyong)"
  },
  {
    "code": "B02",
    "description": "Herpes zoster (Shingles)"
  },
  {
    "code": "B06",
    "description": "Rubella (German measles)"
  },
  {
    "code": "B26",
    "description": "Mumps"
  },
  {
    "code": "B27",
    "description": "Infectious mononucleosis"
  },
  {
    "code": "B35",
    "description": "Dermatophytosis (Tinea / Ringworm)"
  },
  {
    "code": "B82",
    "description": "Unspecified intestinal parasitism"
  },
  {
    "code": "B85",
    "description": "Pediculosis and phthiriasis (Lice infestation)"
  },
  {
    "code": "C83",
    "description": "Non-follicular lymphoma (includes Burkitt lymphoma)"
  },
  {
    "code": "D53",
    "description": "Other nutritional anemias"
  },
  {
    "code": "D55",
    "description": "Anemia due to glucose-6-phosphate dehydrogenase (G6PD) deficiency"
  },
  {
    "code": "E01",
    "description": "Iodine-deficiency related thyroid disorders and allied conditions"
  },
  {
    "code": "E55",
    "description": "Vitamin D deficiency rickets"
  },
  {
    "code": "E61",
    "description": "Deficiency of other nutrient elements (e.g., Zinc deficiency)"
  },
  {
    "code": "F10",
    "description": "Mental and behavioral disorders due to use of alcohol"
  },
  {
    "code": "F19",
    "description": "Mental and behavioral disorders due to multiple drug use and use of other psychoactive substances"
  },
  {
    "code": "G00",
    "description": "Bacterial meningitis"
  },
  {
    "code": "G04",
    "description": "Encephalitis, myelitis and encephalomyelitis"
  },
  {
    "code": "G44",
    "description": "Other headache syndromes"
  },
  {
    "code": "H16",
    "description": "Keratitis (Corneal ulceration and inflammation)"
  },
  {
    "code": "I11",
    "description": "Hypertensive heart disease"
  },
  {
    "code": "I26",
    "description": "Pulmonary embolism"
  },
  {
    "code": "I61",
    "description": "Intracerebral hemorrhage (Hemorrhagic stroke)"
  },
  {
    "code": "J44",
    "description": "Other chronic obstructive pulmonary disease (COPD from biomass smoke)"
  },
  {
    "code": "K40",
    "description": "Inguinal hernia"
  },
  {
    "code": "K41",
    "description": "Femoral hernia"
  },
  {
    "code": "K74",
    "description": "Fibrosis and cirrhosis of liver"
  },
  {
    "code": "L02",
    "description": "Cutaneous abscess, furuncle and carbuncle (Boils)"
  },
  {
    "code": "L03",
    "description": "Cellulitis"
  },
  {
    "code": "L08",
    "description": "Other local infections of skin and subcutaneous tissue (Pyoderma)"
  },
  {
    "code": "L50",
    "description": "Urticaria"
  },
  {
    "code": "L73",
    "description": "Other follicular disorders (includes Pseudofolliculitis barbae / Razor bumps)"
  },
  {
    "code": "M86",
    "description": "Osteomyelitis"
  },
  {
    "code": "N30",
    "description": "Cystitis"
  },
  {
    "code": "O00",
    "description": "Ectopic pregnancy"
  },
  {
    "code": "O03",
    "description": "Spontaneous abortion"
  },
  {
    "code": "O42",
    "description": "Premature rupture of membranes"
  },
  {
    "code": "O64",
    "description": "Obstructed labor due to malposition and malpresentation of fetus"
  },
  {
    "code": "O70",
    "description": "Perineal laceration during delivery"
  },
  {
    "code": "O86",
    "description": "Other puerperal infections (Postpartum sepsis)"
  },
  {
    "code": "P05",
    "description": "Slow fetal growth and fetal malnutrition"
  },
  {
    "code": "P24",
    "description": "Neonatal aspiration syndromes"
  },
  {
    "code": "R11",
    "description": "Nausea and vomiting"
  },

  {
    "code": "A05",
    "description": "Other bacterial foodborne intoxications"
  },
  {
    "code": "A07",
    "description": "Other protozoal intestinal diseases"
  },
  {
    "code": "A17",
    "description": "Tuberculosis of nervous system"
  },
  {
    "code": "A18",
    "description": "Tuberculosis of other organs"
  },
  {
    "code": "A21",
    "description": "Tularemia"
  },
  {
    "code": "A22",
    "description": "Anthrax"
  },
  {
    "code": "A24",
    "description": "Glanders and melioidosis"
  },
  {
    "code": "A25",
    "description": "Rat-bite fevers"
  },
  {
    "code": "A26",
    "description": "Erysipeloid"
  },
  {
    "code": "A32",
    "description": "Listeriosis"
  },
  {
    "code": "A38",
    "description": "Scarlet fever"
  },
  {
    "code": "A40",
    "description": "Streptococcal sepsis"
  },
  {
    "code": "A41",
    "description": "Other sepsis"
  },
  {
    "code": "A42",
    "description": "Actinomycosis"
  },
  {
    "code": "A48",
    "description": "Other bacterial diseases (including Legionnaires' disease)"
  },
  {
    "code": "A52",
    "description": "Late syphilis"
  },
  {
    "code": "A53",
    "description": "Other and unspecified syphilis"
  },
  {
    "code": "A59",
    "description": "Trichomoniasis"
  },
  {
    "code": "A60",
    "description": "Anogenital herpesviral infection"
  },
  {
    "code": "A63",
    "description": "Other predominantly sexually transmitted diseases"
  },
  {
    "code": "A69",
    "description": "Other spirochetal infections (including Lyme disease)"
  },
  {
    "code": "B00",
    "description": "Herpesviral infections (Herpes simplex)"
  },
  {
    "code": "B03",
    "description": "Smallpox"
  },
  {
    "code": "B07",
    "description": "Viral warts"
  },
  {
    "code": "B08",
    "description": "Other viral infections with skin lesions (including Hand, foot and mouth disease)"
  },
  {
    "code": "B25",
    "description": "Cytomegalovirus disease"
  },
  {
    "code": "C15",
    "description": "Malignant neoplasm of esophagus"
  },
  {
    "code": "C16",
    "description": "Malignant neoplasm of stomach"
  },
  {
    "code": "C25",
    "description": "Malignant neoplasm of pancreas"
  },
  {
    "code": "C32",
    "description": "Malignant neoplasm of larynx"
  },
  {
    "code": "C44",
    "description": "Other malignant neoplasms of skin (including Basal cell carcinoma)"
  },
  {
    "code": "C54",
    "description": "Malignant neoplasm of corpus uteri"
  },
  {
    "code": "C56",
    "description": "Malignant neoplasm of ovary"
  },
  {
    "code": "C64",
    "description": "Malignant neoplasm of kidney, except renal pelvis"
  },
  {
    "code": "C67",
    "description": "Malignant neoplasm of bladder"
  },
  {
    "code": "C71",
    "description": "Malignant neoplasm of brain"
  },
  {
    "code": "C81",
    "description": "Hodgkin lymphoma"
  },
  {
    "code": "C91",
    "description": "Lymphoid leukemia"
  },
  {
    "code": "C92",
    "description": "Myeloid leukemia"
  },
  {
    "code": "D12",
    "description": "Benign neoplasm of colon, rectum, anus and anal canal"
  },
  {
    "code": "D25",
    "description": "Leiomyoma of uterus (Uterine fibroids)"
  },
  {
    "code": "D51",
    "description": "Vitamin B12 deficiency anemia"
  },
  {
    "code": "D52",
    "description": "Folate deficiency anemia"
  },
  {
    "code": "D56",
    "description": "Thalassemia"
  },
  {
    "code": "D69",
    "description": "Purpura and other hemorrhagic conditions (including Thrombocytopenia)"
  },
  {
    "code": "E04",
    "description": "Other nontoxic goiter"
  },
  {
    "code": "E06",
    "description": "Thyroiditis"
  },
  {
    "code": "E13",
    "description": "Other specified diabetes mellitus"
  },
  {
    "code": "E22",
    "description": "Hyperfunction of pituitary gland (including Acromegaly)"
  },
  {
    "code": "E23",
    "description": "Hypofunction and other disorders of pituitary gland (including Diabetes insipidus)"
  },
  {
    "code": "E27",
    "description": "Other disorders of adrenal gland (including Addison's disease)"
  },
  {
    "code": "E74",
    "description": "Other disorders of carbohydrate metabolism (including Glycogen storage disease)"
  },
  {
    "code": "E80",
    "description": "Disorders of porphyrin and bilirubin metabolism (including Gilbert's syndrome)"
  },
  {
    "code": "F03",
    "description": "Unspecified dementia"
  },
  {
    "code": "F11",
    "description": "Mental and behavioral disorders due to use of opioids"
  },
  {
    "code": "F12",
    "description": "Mental and behavioral disorders due to use of cannabinoids"
  },
  {
    "code": "F17",
    "description": "Mental and behavioral disorders due to use of tobacco"
  },
  {
    "code": "F31",
    "description": "Bipolar affective disorder"
  },
  {
    "code": "F33",
    "description": "Recurrent depressive disorder"
  },
  {
    "code": "F40",
    "description": "Phobic anxiety disorders"
  },
  {
    "code": "F42",
    "description": "Obsessive-compulsive disorder"
  },
  {
    "code": "F50",
    "description": "Eating disorders (including Anorexia and Bulimia)"
  },
  {
    "code": "G25",
    "description": "Other extrapyramidal and movement disorders (including Essential tremor)"
  },
  {
    "code": "G35",
    "description": "Multiple sclerosis"
  },
  {
    "code": "G51",
    "description": "Facial nerve disorders (including Bell's palsy)"
  },
  {
    "code": "G56",
    "description": "Mononeuropathies of upper limb (including Carpal tunnel syndrome)"
  },
  {
    "code": "G62",
    "description": "Other polyneuropathies (including Diabetic polyneuropathy)"
  },
  {
    "code": "H02",
    "description": "Other disorders of eyelid (including Ectropion and Entropion)"
  },
  {
    "code": "H15",
    "description": "Disorders of sclera"
  },
  {
    "code": "H26",
    "description": "Other cataract"
  },
  {
    "code": "H35",
    "description": "Other retinal disorders (including Retinopathy)"
  },
  {
    "code": "H52",
    "description": "Disorders of refraction and accommodation (including Myopia and Hypermetropia)"
  },
  {
    "code": "H60",
    "description": "Otitis externa"
  },
  {
    "code": "H66",
    "description": "Suppurative and unspecified otitis media"
  },
  {
    "code": "H81",
    "description": "Disorders of vestibular function (including Vertigo and Meniere's disease)"
  },
  {
    "code": "I21",
    "description": "Acute myocardial infarction"
  },
  {
    "code": "I34",
    "description": "Nonrheumatic mitral valve disorders (including Mitral valve prolapse)"
  },
  {
    "code": "I42",
    "description": "Cardiomyopathy"
  },
  {
    "code": "I70",
    "description": "Atherosclerosis"
  },
  {
    "code": "I73",
    "description": "Other peripheral vascular diseases (including Raynaud's syndrome)"
  },
  {
    "code": "I80",
    "description": "Phlebitis and thrombophlebitis"
  },
  {
    "code": "I83",
    "description": "Varicose veins of lower extremities"
  },
  {
    "code": "I87",
    "description": "Other disorders of veins (including Chronic venous insufficiency)"
  },
  {
    "code": "J03",
    "description": "Acute tonsillitis"
  },
  {
    "code": "J04",
    "description": "Acute laryngitis and tracheitis"
  },
  {
    "code": "J32",
    "description": "Chronic sinusitis"
  },
  {
    "code": "J33",
    "description": "Nasal polyp"
  },
  {
    "code": "J41",
    "description": "Simple and mucopurulent chronic bronchitis"
  },
  {
    "code": "J42",
    "description": "Unspecified chronic bronchitis"
  },
  {
    "code": "J43",
    "description": "Emphysema"
  },
  {
    "code": "J47",
    "description": "Bronchiectasis"
  },
  {
    "code": "K20",
    "description": "Esophagitis"
  },
  {
    "code": "K27",
    "description": "Peptic ulcer, site unspecified"
  },
  {
    "code": "K31",
    "description": "Other diseases of stomach and duodenum"
  },
  {
    "code": "K52",
    "description": "Other noninfective gastroenteritis and colitis"
  },
  {
    "code": "K56",
    "description": "Paralytic ileus and intestinal obstruction without hernia"
  },
  {
    "code": "K57",
    "description": "Diverticular disease of intestine"
  },
  {
    "code": "K60",
    "description": "Fissure and fistula of anal and rectal regions"
  },
  {
    "code": "K61",
    "description": "Abscess of anal and rectal regions"
  },
  {
    "code": "K81",
    "description": "Cholecystitis"
  },
  {
    "code": "L21",
    "description": "Seborrheic dermatitis"
  },
  {
    "code": "L23",
    "description": "Allergic contact dermatitis"
  },
  {
    "code": "L57",
    "description": "Skin changes due to chronic exposure to nonionizing radiation (including Actinic keratosis)"
  },
  {
    "code": "L60",
    "description": "Nail disorders (including Ingrown nail)"
  },
  {
    "code": "L63",
    "description": "Alopecia areata"
  },
  {
    "code": "M16",
    "description": "Osteoarthritis of hip"
  },
  {
    "code": "M20",
    "description": "Acquired deformities of fingers and toes (including Hallux valgus / Bunions)"
  },
  {
    "code": "M32",
    "description": "Systemic lupus erythematosus"
  },
  {
    "code": "M48",
    "description": "Other spondylopathies (including Spinal stenosis)"
  },
  {
    "code": "M51",
    "description": "Other intervertebral disc disorders (including Thoracic, thoracolumbar, and lumbosacral disc disorders)"
  },
  {
    "code": "N10",
    "description": "Acute tubulo-interstitial nephritis"
  },
  {
    "code": "N32",
    "description": "Other disorders of bladder (including Neurogenic bladder)"
  },
  {
    "code": "N60",
    "description": "Benign mammary dysplasia (including Fibrocystic breast disease)"
  },
  {
    "code": "N70",
    "description": "Salpingitis and oophoritis"
  },
  {
    "code": "N91",
    "description": "Absent, scanty and rare menstruation (including Amenorrhea)"
  },
  {
    "code": "O24",
    "description": "Diabetes mellitus in pregnancy"
  },
  {
    "code": "O30",
    "description": "Multiple gestation (including Twins and Triplets)"
  },
  {
    "code": "O60",
    "description": "Preterm labor"
  },
  {
    "code": "P22",
    "description": "Respiratory distress of newborn"
  },
  {
    "code": "Q90",
    "description": "Down syndrome"
  },
  {
    "code": "R04",
    "description": "Hemorrhage from respiratory passages (including Epistaxis / Nosebleed)"
  },
  {
    "code": "R31",
    "description": "Unspecified hematuria"
  },
  {
    "code": "R32",
    "description": "Unspecified urinary incontinence"
  },
  {
    "code": "S02",
    "description": "Fracture of skull and facial bones"
  },
  {
    "code": "S52",
    "description": "Fracture of forearm"
  },
  {
    "code": "S82",
    "description": "Fracture of lower leg, including ankle"
  },
  {
    "code": "S93",
    "description": "Dislocation, sprain and strain of joints and ligaments at ankle and foot level"
  },
  {
    "code": "T30",
    "description": "Burn and corrosion, body region unspecified"
  },
  {
    "code": "T78",
    "description": "Adverse effects, not elsewhere classified (including Anaphylactic shock)"
  },
  {
    "code": "Z23",
    "description": "Encounter for immunization"
  },
  {
    "code": "M62.82",
    "description": "Rhabdomyolysis"
  },
  {
    "code": "A16",
    "description": "Respiratory tuberculosis, not confirmed bacteriologically or histologically"
  },
  {
    "code": "A46",
    "description": "Erysipelas"
  },
  {
    "code": "A49",
    "description": "Bacterial infection of unspecified site"
  },
  {
    "code": "A80",
    "description": "Acute poliomyelitis"
  },
  {
    "code": "A84",
    "description": "Tick-borne viral encephalitis"
  },
  {
    "code": "B10",
    "description": "Other human herpesviruses"
  },
  {
    "code": "B21",
    "description": "Human immunodeficiency virus [HIV] disease resulting in malignant neoplasms"
  },
  {
    "code": "B22",
    "description": "Human immunodeficiency virus [HIV] disease resulting in other specified diseases"
  },
  {
    "code": "B24",
    "description": "Unspecified human immunodeficiency virus [HIV] disease"
  },
  {
    "code": "B30",
    "description": "Viral conjunctivitis"
  },
  {
    "code": "B33",
    "description": "Other viral diseases, not elsewhere classified"
  },
  {
    "code": "B81",
    "description": "Other intestinal helminthiases"
  },
  {
    "code": "C00",
    "description": "Malignant neoplasm of lip"
  },
  {
    "code": "C01",
    "description": "Malignant neoplasm of base of tongue"
  },
  {
    "code": "C06",
    "description": "Malignant neoplasm of other and unspecified parts of mouth"
  },
  {
    "code": "C07",
    "description": "Malignant neoplasm of parotid gland"
  },
  {
    "code": "C08",
    "description": "Malignant neoplasm of other and unspecified major salivary glands"
  },
  {
    "code": "C09",
    "description": "Malignant neoplasm of tonsil"
  },
  {
    "code": "C10",
    "description": "Malignant neoplasm of oropharynx"
  },
  {
    "code": "C11",
    "description": "Malignant neoplasm of nasopharynx"
  },
  {
    "code": "C12",
    "description": "Malignant neoplasm of pyriform sinus"
  },
  {
    "code": "C13",
    "description": "Malignant neoplasm of hypopharynx"
  },
  {
    "code": "C14",
    "description": "Malignant neoplasm of other and ill-defined sites in lip, oral cavity and pharynx"
  },
  {
    "code": "C17",
    "description": "Malignant neoplasm of small intestine"
  },
  {
    "code": "C19",
    "description": "Malignant neoplasm of rectosigmoid junction"
  },
  {
    "code": "C20",
    "description": "Malignant neoplasm of rectum"
  },
  {
    "code": "C21",
    "description": "Malignant neoplasm of anus and anal canal"
  },
  {
    "code": "C23",
    "description": "Malignant neoplasm of gallbladder"
  },
  {
    "code": "C24",
    "description": "Malignant neoplasm of other and unspecified parts of biliary tract"
  },
  {
    "code": "C26",
    "description": "Malignant neoplasm of other and ill-defined digestive organs"
  },
  {
    "code": "C30",
    "description": "Malignant neoplasm of nasal cavity and middle ear"
  },
  {
    "code": "C31",
    "description": "Malignant neoplasm of accessory sinuses"
  },
  {
    "code": "C33",
    "description": "Malignant neoplasm of trachea"
  },
  {
    "code": "C37",
    "description": "Malignant neoplasm of thymus"
  },
  {
    "code": "C38",
    "description": "Malignant neoplasm of heart, mediastinum and pleura"
  },
  {
    "code": "C39",
    "description": "Malignant neoplasm of other and ill-defined sites in respiratory system and intrathoracic organs"
  },
  {
    "code": "C40",
    "description": "Malignant neoplasm of bone and articular cartilage of limbs"
  },
  {
    "code": "C41",
    "description": "Malignant neoplasm of bone and articular cartilage of other and unspecified sites"
  },
  {
    "code": "C45",
    "description": "Mesothelioma"
  },
  {
    "code": "C47",
    "description": "Malignant neoplasm of peripheral nerves and autonomic nervous system"
  },
  {
    "code": "C48",
    "description": "Malignant neoplasm of retroperitoneum and peritoneum"
  },
  {
    "code": "C49",
    "description": "Malignant neoplasm of other connective and soft tissue"
  },
  {
    "code": "C51",
    "description": "Malignant neoplasm of vulva"
  },
  {
    "code": "C52",
    "description": "Malignant neoplasm of vagina"
  },
  {
    "code": "C55",
    "description": "Malignant neoplasm of uterus, part unspecified"
  },
  {
    "code": "C57",
    "description": "Malignant neoplasm of other and unspecified female genital organs"
  },
  {
    "code": "C58",
    "description": "Malignant neoplasm of placenta"
  },
  {
    "code": "C60",
    "description": "Malignant neoplasm of penis"
  },
  {
    "code": "C62",
    "description": "Malignant neoplasm of testis"
  },
  {
    "code": "C63",
    "description": "Malignant neoplasm of other and unspecified male genital organs"
  },
  {
    "code": "C65",
    "description": "Malignant neoplasm of renal pelvis"
  },
  {
    "code": "C66",
    "description": "Malignant neoplasm of ureter"
  },
  {
    "code": "C68",
    "description": "Malignant neoplasm of other and unspecified urinary organs"
  },
  {
    "code": "C69",
    "description": "Malignant neoplasm of eye and adnexa"
  },
  {
    "code": "C70",
    "description": "Malignant neoplasm of meninges"
  },
  {
    "code": "C72",
    "description": "Malignant neoplasm of spinal cord, cranial nerves and other parts of central nervous system"
  },
  {
    "code": "C73",
    "description": "Malignant neoplasm of thyroid gland"
  },
  {
    "code": "C74",
    "description": "Malignant neoplasm of adrenal gland"
  },
  {
    "code": "C75",
    "description": "Malignant neoplasm of other endocrine glands and related structures"
  },
  {
    "code": "C80",
    "description": "Malignant neoplasm without specification of site"
  },
  {
    "code": "C82",
    "description": "Follicular lymphoma"
  },
  {
    "code": "C84",
    "description": "Mature T/NK-cell lymphomas"
  },
  {
    "code": "C85",
    "description": "Other and unspecified types of non-Hodgkin lymphoma"
  },
  {
    "code": "C90",
    "description": "Multiple myeloma and malignant plasma cell neoplasms"
  },
  {
    "code": "D00",
    "description": "Carcinoma in situ of oral cavity, esophagus and stomach"
  },
  {
    "code": "D01",
    "description": "Carcinoma in situ of other and unspecified digestive organs"
  },
  {
    "code": "D02",
    "description": "Carcinoma in situ of middle ear and respiratory system"
  },
  {
    "code": "D03",
    "description": "Melanoma in situ"
  },
  {
    "code": "D04",
    "description": "Carcinoma in situ of skin"
  },
  {
    "code": "D05",
    "description": "Carcinoma in situ of breast"
  },
  {
    "code": "D06",
    "description": "Carcinoma in situ of cervix uteri"
  },
  {
    "code": "D07",
    "description": "Carcinoma in situ of other and unspecified genital organs"
  },
  {
    "code": "D10",
    "description": "Benign neoplasm of mouth and pharynx"
  },
  {
    "code": "D11",
    "description": "Benign neoplasm of major salivary glands"
  },
  {
    "code": "D13",
    "description": "Benign neoplasm of other and ill-defined parts of digestive system"
  },
  {
    "code": "D14",
    "description": "Benign neoplasm of middle ear and respiratory system"
  },
  {
    "code": "D15",
    "description": "Benign neoplasm of other and unspecified intrathoracic organs"
  },
  {
    "code": "D16",
    "description": "Benign neoplasm of bone and articular cartilage"
  },
  {
    "code": "D17",
    "description": "Benign lipomatous neoplasm"
  },
  {
    "code": "D18",
    "description": "Hemangioma and lymphangioma, any site"
  },
  {
    "code": "D19",
    "description": "Benign neoplasm of mesothelial tissue"
  },
  {
    "code": "D20",
    "description": "Benign neoplasm of soft tissue of retroperitoneum and peritoneum"
  },
  {
    "code": "D21",
    "description": "Other benign neoplasms of connective and other soft tissue"
  },
  {
    "code": "D22",
    "description": "Melanocytic nevi"
  },
  {
    "code": "D23",
    "description": "Other benign neoplasms of skin"
  },
  {
    "code": "D24",
    "description": "Benign neoplasm of breast"
  },
  {
    "code": "D26",
    "description": "Other benign neoplasms of uterus"
  },
  {
    "code": "D27",
    "description": "Benign neoplasm of ovary"
  },
  {
    "code": "D28",
    "description": "Benign neoplasm of other and unspecified female genital organs"
  },
  {
    "code": "D29",
    "description": "Benign neoplasm of male genital organs"
  },
  {
    "code": "D30",
    "description": "Benign neoplasm of urinary organs"
  },
  {
    "code": "D31",
    "description": "Benign neoplasm of eye and adnexa"
  },
  {
    "code": "D32",
    "description": "Benign neoplasm of meninges"
  },
  {
    "code": "D33",
    "description": "Benign neoplasm of brain and other parts of central nervous system"
  },
  {
    "code": "D34",
    "description": "Benign neoplasm of thyroid gland"
  },
  {
    "code": "D35",
    "description": "Benign neoplasm of other and unspecified endocrine glands"
  },
  {
    "code": "D36",
    "description": "Benign neoplasm of other and unspecified sites"
  },
  {
    "code": "D40",
    "description": "Neoplasm of uncertain behavior of male genital organs"
  },
  {
    "code": "D41",
    "description": "Neoplasm of uncertain behavior of urinary organs"
  },
  {
    "code": "D42",
    "description": "Neoplasm of uncertain behavior of meninges"
  },
  {
    "code": "D43",
    "description": "Neoplasm of uncertain behavior of brain and central nervous system"
  },
  {
    "code": "D44",
    "description": "Neoplasm of uncertain behavior of endocrine glands"
  },
  {
    "code": "D45",
    "description": "Polycythemia vera"
  },
  {
    "code": "D46",
    "description": "Myelodysplastic syndromes"
  },
  {
    "code": "D58",
    "description": "Other hereditary hemolytic anemias"
  },
  {
    "code": "D59",
    "description": "Acquired hemolytic anemia"
  },
  {
    "code": "D60",
    "description": "Acquired pure red cell aplasia"
  },
  {
    "code": "D62",
    "description": "Acute posthemorrhagic anemia"
  },
  {
    "code": "D65",
    "description": "Disseminated intravascular coagulation"
  },
  {
    "code": "D66",
    "description": "Hereditary factor VIII deficiency"
  },
  {
    "code": "D68",
    "description": "Other coagulation defects"
  },
  {
    "code": "D70",
    "description": "Neutropenia"
  },
  {
    "code": "D71",
    "description": "Functional disorders of polymorphonuclear neutrophils"
  },
  {
    "code": "D80",
    "description": "Immunodeficiency with predominantly antibody defects"
  },
  {
    "code": "D81",
    "description": "Combined immunodeficiencies"
  },
  {
    "code": "D84",
    "description": "Other immunodeficiencies"
  },
  {
    "code": "D86",
    "description": "Sarcoidosis"
  },
  {
    "code": "E00",
    "description": "Congenital iodine-deficiency syndrome"
  },
  {
    "code": "E02",
    "description": "Subclinical iodine-deficiency hypothyroidism"
  },
  {
    "code": "E07",
    "description": "Other disorders of thyroid"
  },
  {
    "code": "E12",
    "description": "Malnutrition-related diabetes mellitus"
  },
  {
    "code": "E14",
    "description": "Unspecified diabetes mellitus"
  },
  {
    "code": "E15",
    "description": "Nondiabetic hypoglycemic coma"
  },
  {
    "code": "E16",
    "description": "Other disorders of pancreatic internal secretion"
  },
  {
    "code": "E20",
    "description": "Hypoparathyroidism"
  },
  {
    "code": "E21",
    "description": "Hyperparathyroidism and other disorders of parathyroid gland"
  },
  {
    "code": "E24",
    "description": "Cushing's syndrome"
  },
  {
    "code": "E25",
    "description": "Adrenogenital disorders"
  },
  {
    "code": "E28",
    "description": "Ovarian dysfunction"
  },
  {
    "code": "E29",
    "description": "Testicular dysfunction"
  },
  {
    "code": "E30",
    "description": "Disorders of puberty, not elsewhere classified"
  },
  {
    "code": "E31",
    "description": "Polyglandular dysfunction"
  },
  {
    "code": "E34",
    "description": "Other endocrine disorders"
  },
  {
    "code": "E42",
    "description": "Marasmic kwashiorkor"
  },
  {
    "code": "E44",
    "description": "Protein-calorie malnutrition of moderate and mild degree"
  },
  {
    "code": "E51",
    "description": "Thiamine deficiency"
  },
  {
    "code": "E52",
    "description": "Niacin deficiency"
  },
  {
    "code": "E53",
    "description": "Deficiency of other B group vitamins"
  },
  {
    "code": "E54",
    "description": "Ascorbic acid deficiency"
  },
  {
    "code": "E56",
    "description": "Other vitamin deficiencies"
  },
  {
    "code": "E60",
    "description": "Dietary zinc deficiency"
  },
  {
    "code": "E63",
    "description": "Other nutritional deficiencies"
  },
  {
    "code": "E64",
    "description": "Sequelae of malnutrition and other nutritional deficiencies"
  },
  {
    "code": "E65",
    "description": "Localized adiposity"
  },
  {
    "code": "E68",
    "description": "Sequelae of hyperalimentation"
  },
  {
    "code": "E70",
    "description": "Disorders of aromatic amino-acid metabolism"
  },
  {
    "code": "E71",
    "description": "Disorders of branched-chain amino-acid metabolism and fatty-acid metabolism"
  },
  {
    "code": "E72",
    "description": "Other disorders of amino-acid metabolism"
  },
  {
    "code": "E73",
    "description": "Lactose intolerance"
  },
  {
    "code": "E75",
    "description": "Disorders of sphingolipid metabolism and other lipid storage disorders"
  },
  {
    "code": "E76",
    "description": "Disorders of glycosaminoglycan metabolism"
  },
  {
    "code": "E83",
    "description": "Disorders of mineral metabolism"
  },
  {
    "code": "E84",
    "description": "Cystic fibrosis"
  },
  {
    "code": "E85",
    "description": "Amyloidosis"
  },
  {
    "code": "E87",
    "description": "Other disorders of fluid, electrolyte and acid-base balance"
  },
  {
    "code": "E88",
    "description": "Other metabolic disorders"
  },
  {
    "code": "F00",
    "description": "Dementia in Alzheimer's disease"
  },
  {
    "code": "F01",
    "description": "Vascular dementia"
  },
  {
    "code": "F05",
    "description": "Delirium, not induced by alcohol and other psychoactive substances"
  },
  {
    "code": "F06",
    "description": "Other mental disorders due to brain damage and dysfunction and to physical disease"
  },
  {
    "code": "F13",
    "description": "Mental and behavioral disorders due to use of sedatives or hypnotics"
  },
  {
    "code": "F14",
    "description": "Mental and behavioral disorders due to use of cocaine"
  },
  {
    "code": "F15",
    "description": "Mental and behavioral disorders due to use of other stimulants, including caffeine"
  },
  {
    "code": "F16",
    "description": "Mental and behavioral disorders due to use of hallucinogens"
  },
  {
    "code": "F21",
    "description": "Schizotypal disorder"
  },
  {
    "code": "F22",
    "description": "Persistent delusional disorders"
  },
  {
    "code": "F23",
    "description": "Acute and transient psychotic disorders"
  },
  {
    "code": "F25",
    "description": "Schizoaffective disorders"
  },
  {
    "code": "F34",
    "description": "Persistent mood [affective] disorders"
  },
  {
    "code": "F44",
    "description": "Dissociative [conversion] disorders"
  },
  {
    "code": "F45",
    "description": "Somatoform disorders"
  },
  {
    "code": "F51",
    "description": "Nonorganic sleep disorders"
  },
  {
    "code": "F52",
    "description": "Sexual dysfunction, not caused by organic disorder or disease"
  },
  {
    "code": "F60",
    "description": "Specific personality disorders"
  },
  {
    "code": "F63",
    "description": "Habit and impulse disorders"
  },
  {
    "code": "F64",
    "description": "Gender identity disorders"
  },
  {
    "code": "F65",
    "description": "Disorders of sexual preference"
  },
  {
    "code": "F70",
    "description": "Mild mental retardation"
  },
  {
    "code": "F71",
    "description": "Moderate mental retardation"
  },
  {
    "code": "F72",
    "description": "Severe mental retardation"
  },
  {
    "code": "F73",
    "description": "Profound mental retardation"
  },
  {
    "code": "F80",
    "description": "Specific developmental disorders of speech and language"
  },
  {
    "code": "F81",
    "description": "Specific developmental disorders of scholastic skills"
  },
  {
    "code": "F84",
    "description": "Pervasive developmental disorders"
  },
  {
    "code": "F90",
    "description": "Hyperkinetic disorders"
  },
  {
    "code": "F91",
    "description": "Conduct disorders"
  },
  {
    "code": "F95",
    "description": "Tic disorders"
  },
  {
    "code": "G03",
    "description": "Meningitis due to other and unspecified causes"
  },
  {
    "code": "G10",
    "description": "Huntington's disease"
  },
  {
    "code": "G11",
    "description": "Hereditary ataxia"
  },
  {
    "code": "G12",
    "description": "Spinal muscular atrophy and related syndromes"
  },
  {
    "code": "G21",
    "description": "Secondary parkinsonism"
  },
  {
    "code": "G24",
    "description": "Dystonia"
  },
  {
    "code": "G31",
    "description": "Other degenerative diseases of nervous system, not elsewhere classified"
  },
  {
    "code": "G45",
    "description": "Transient cerebral ischemic attacks and related syndromes"
  },
  {
    "code": "G46",
    "description": "Vascular syndromes of brain in cerebrovascular diseases"
  },
  {
    "code": "G50",
    "description": "Disorders of trigeminal nerve"
  },
  {
    "code": "G61",
    "description": "Inflammatory polyneuropathy"
  },
  {
    "code": "G70",
    "description": "Myasthenia gravis and other myoneural disorders"
  },
  {
    "code": "G71",
    "description": "Primary disorders of muscles"
  },
  {
    "code": "G80",
    "description": "Cerebral palsy"
  },
  {
    "code": "G82",
    "description": "Paraplegia and tetraplegia"
  },
  {
    "code": "G90",
    "description": "Disorders of autonomic nervous system"
  },
  {
    "code": "G91",
    "description": "Hydrocephalus"
  },
  {
    "code": "G93",
    "description": "Other disorders of brain"
  },
  {
    "code": "H04",
    "description": "Disorders of lacrimal system"
  },
  {
    "code": "H05",
    "description": "Disorders of orbit"
  },
  {
    "code": "H11",
    "description": "Other disorders of conjunctiva"
  },
  {
    "code": "H18",
    "description": "Other disorders of cornea"
  },
  {
    "code": "H20",
    "description": "Iridocyclitis"
  },
  {
    "code": "H21",
    "description": "Other disorders of iris and ciliary body"
  },
  {
    "code": "H33",
    "description": "Retinal detachments and breaks"
  },
  {
    "code": "H34",
    "description": "Retinal vascular occlusions"
  },
  {
    "code": "H43",
    "description": "Disorders of vitreous body"
  },
  {
    "code": "H44",
    "description": "Disorders of globe"
  },
  {
    "code": "H47",
    "description": "Other disorders of optic nerve and visual pathways"
  },
  {
    "code": "H49",
    "description": "Paralytic strabismus"
  },
  {
    "code": "H50",
    "description": "Other strabismus"
  },
  {
    "code": "H53",
    "description": "Visual disturbances"
  },
  {
    "code": "H54",
    "description": "Blindness and low vision"
  },
  {
    "code": "H61",
    "description": "Other disorders of external ear"
  },
  {
    "code": "H70",
    "description": "Mastoiditis and related conditions"
  },
  {
    "code": "H71",
    "description": "Cholesteatoma of middle ear"
  },
  {
    "code": "H72",
    "description": "Perforation of tympanic membrane"
  },
  {
    "code": "H73",
    "description": "Other disorders of tympanic membrane"
  },
  {
    "code": "H83",
    "description": "Other diseases of inner ear"
  },
  {
    "code": "H91",
    "description": "Other hearing loss"
  },
  {
    "code": "H92",
    "description": "Otalgia and effusion of ear"
  },
  {
    "code": "H93",
    "description": "Other disorders of ear, not elsewhere classified"
  },
  {
    "code": "I01",
    "description": "Rheumatic fever with heart involvement"
  },
  {
    "code": "I06",
    "description": "Rheumatic aortic valve diseases"
  },
  {
    "code": "I07",
    "description": "Rheumatic tricuspid valve diseases"
  },
  {
    "code": "I08",
    "description": "Multiple valve diseases"
  },
  {
    "code": "I09",
    "description": "Other rheumatic heart diseases"
  },
  {
    "code": "I12",
    "description": "Hypertensive chronic kidney disease"
  },
  {
    "code": "I13",
    "description": "Hypertensive heart and chronic kidney disease"
  },
  {
    "code": "I15",
    "description": "Secondary hypertension"
  },
  {
    "code": "I22",
    "description": "Subsequent ST elevation (STEMI) and non-ST elevation (NSTEMI) myocardial infarction"
  },
  {
    "code": "I24",
    "description": "Other acute ischemic heart diseases"
  },
  {
    "code": "I27",
    "description": "Other pulmonary heart diseases"
  },
  {
    "code": "I30",
    "description": "Acute pericarditis"
  },
  {
    "code": "I31",
    "description": "Other diseases of pericardium"
  },
  {
    "code": "I35",
    "description": "Nonrheumatic aortic valve disorders"
  },
  {
    "code": "I36",
    "description": "Nonrheumatic tricuspid valve disorders"
  },
  {
    "code": "I37",
    "description": "Nonrheumatic pulmonary valve disorders"
  },
  {
    "code": "I40",
    "description": "Acute myocarditis"
  },
  {
    "code": "I44",
    "description": "Atrioventricular and left bundle-branch block"
  },
  {
    "code": "I45",
    "description": "Other conduction disorders"
  },
  {
    "code": "I46",
    "description": "Cardiac arrest"
  },
  {
    "code": "I47",
    "description": "Paroxysmal tachycardia"
  },
  {
    "code": "I49",
    "description": "Other cardiac arrhythmias"
  },
  {
    "code": "I51",
    "description": "Complications and ill-defined descriptions of heart disease"
  },
  {
    "code": "I60",
    "description": "Subarachnoid hemorrhage"
  },
  {
    "code": "I62",
    "description": "Other nontraumatic intracranial hemorrhage"
  },
  {
    "code": "I64",
    "description": "Stroke, not specified as hemorrhage or infarction"
  },
  {
    "code": "I65",
    "description": "Occlusion and stenosis of precerebral arteries, not resulting in cerebral infarction"
  },
  {
    "code": "I67",
    "description": "Other cerebrovascular diseases"
  },
  {
    "code": "I69",
    "description": "Sequelae of cerebrovascular disease"
  },
  {
    "code": "I71",
    "description": "Aortic aneurysm and dissection"
  },
  {
    "code": "I74",
    "description": "Arterial embolism and thrombosis"
  },
  {
    "code": "I77",
    "description": "Other disorders of arteries and arterioles"
  },
  {
    "code": "I82",
    "description": "Other venous embolism and thrombosis"
  },
  {
    "code": "I84",
    "description": "Hemorrhoids"
  },
  {
    "code": "I85",
    "description": "Esophageal varices"
  },
  {
    "code": "I86",
    "description": "Varicose veins of other sites"
  },
  {
    "code": "I88",
    "description": "Nonspecific lymphadenitis"
  },
  {
    "code": "I89",
    "description": "Other noninfective disorders of lymphatic vessels and lymph nodes"
  },
  {
    "code": "I95",
    "description": "Hypotension"
  },
  {
    "code": "J00",
    "description": "Acute nasopharyngitis [common cold]"
  },
  {
    "code": "J05",
    "description": "Acute obstructive laryngitis [croup] and epiglottitis"
  },
  {
    "code": "J12",
    "description": "Viral pneumonia, not elsewhere classified"
  },
  {
    "code": "J13",
    "description": "Pneumonia due to Streptococcus pneumoniae"
  },
  {
    "code": "J14",
    "description": "Pneumonia due to Hemophilus influenzae"
  },
  {
    "code": "J15",
    "description": "Bacterial pneumonia, not elsewhere classified"
  },
  {
    "code": "J21",
    "description": "Acute bronchiolitis"
  },
  {
    "code": "J34",
    "description": "Other disorders of nose and nasal sinuses"
  },
  {
    "code": "J35",
    "description": "Chronic diseases of tonsils and adenoids"
  },
  {
    "code": "J36",
    "description": "Peritonsillar abscess"
  },
  {
    "code": "J37",
    "description": "Chronic laryngitis and laryngotracheitis"
  },
  {
    "code": "J38",
    "description": "Diseases of vocal cords and larynx, not elsewhere classified"
  },
  {
    "code": "J39",
    "description": "Other diseases of upper respiratory tract"
  },
  {
    "code": "J40",
    "description": "Bronchitis, not specified as acute or chronic"
  },
  {
    "code": "J60",
    "description": "Coalworker's pneumoconiosis"
  },
  {
    "code": "J61",
    "description": "Pneumoconiosis due to asbestos and other mineral fibers"
  },
  {
    "code": "J62",
    "description": "Pneumoconiosis due to dust containing silica"
  },
  {
    "code": "J68",
    "description": "Respiratory conditions due to inhalation of chemicals, gases, fumes and vapors"
  },
  {
    "code": "J69",
    "description": "Pneumonitis due to solids and liquids"
  },
  {
    "code": "J80",
    "description": "Adult respiratory distress syndrome"
  },
  {
    "code": "J81",
    "description": "Pulmonary edema"
  },
  {
    "code": "J84",
    "description": "Other interstitial pulmonary diseases"
  },
  {
    "code": "J85",
    "description": "Abscess of lung and mediastinum"
  },
  {
    "code": "J86",
    "description": "Pyothorax"
  },
  {
    "code": "J90",
    "description": "Pleural effusion, not elsewhere classified"
  },
  {
    "code": "J93",
    "description": "Pneumothorax"
  },
  {
    "code": "J96",
    "description": "Respiratory failure, not elsewhere classified"
  },
  {
    "code": "K00",
    "description": "Disorders of tooth development and eruption"
  },
  {
    "code": "K01",
    "description": "Embedded and impacted teeth"
  },
  {
    "code": "K02",
    "description": "Dental caries"
  },
  {
    "code": "K03",
    "description": "Other diseases of hard tissues of teeth"
  },
  {
    "code": "K04",
    "description": "Diseases of pulp and periapical tissues"
  },
  {
    "code": "K05",
    "description": "Gingivitis and periodontal diseases"
  },
  {
    "code": "K06",
    "description": "Other disorders of gingiva and edentulous alveolar ridge"
  },
  {
    "code": "K08",
    "description": "Other disorders of teeth and supporting structures"
  },
  {
    "code": "K09",
    "description": "Cysts of oral region, not elsewhere classified"
  },
  {
    "code": "K11",
    "description": "Diseases of salivary glands"
  },
  {
    "code": "K12",
    "description": "Stomatitis and related lesions"
  },
  {
    "code": "K13",
    "description": "Other diseases of lip and oral mucosa"
  },
  {
    "code": "K14",
    "description": "Diseases of tongue"
  },
  {
    "code": "K22",
    "description": "Other diseases of esophagus"
  },
  {
    "code": "K26",
    "description": "Duodenal ulcer"
  },
  {
    "code": "K28",
    "description": "Gastrojejunal ulcer"
  },
  {
    "code": "K30",
    "description": "Functional dyspepsia"
  },
  {
    "code": "K42",
    "description": "Umbilical hernia"
  },
  {
    "code": "K43",
    "description": "Ventral hernia"
  },
  {
    "code": "K44",
    "description": "Diaphragmatic hernia"
  },
  {
    "code": "K45",
    "description": "Other abdominal hernia"
  },
  {
    "code": "K46",
    "description": "Unspecified abdominal hernia"
  },
  {
    "code": "K50",
    "description": "Crohn's disease"
  },
  {
    "code": "K51",
    "description": "Ulcerative colitis"
  },
  {
    "code": "K55",
    "description": "Vascular disorders of intestine"
  },
  {
    "code": "K59",
    "description": "Other functional intestinal disorders"
  },
  {
    "code": "K62",
    "description": "Other diseases of anus and rectum"
  },
  {
    "code": "K63",
    "description": "Other diseases of intestine"
  },
  {
    "code": "K65",
    "description": "Peritonitis"
  },
  {
    "code": "K70",
    "description": "Alcoholic liver disease"
  },
  {
    "code": "K71",
    "description": "Toxic liver disease"
  },
  {
    "code": "K72",
    "description": "Hepatic failure, not elsewhere classified"
  },
  {
    "code": "K73",
    "description": "Chronic hepatitis, not elsewhere classified"
  },
  {
    "code": "K75",
    "description": "Other inflammatory liver diseases"
  },
  {
    "code": "K76",
    "description": "Other diseases of liver"
  },
  {
    "code": "K82",
    "description": "Other diseases of gallbladder"
  },
  {
    "code": "K83",
    "description": "Other diseases of biliary tract"
  },
  {
    "code": "K85",
    "description": "Acute pancreatitis"
  },
  {
    "code": "K86",
    "description": "Other diseases of pancreas"
  },
  {
    "code": "K90",
    "description": "Intestinal malabsorption"
  },
  {
    "code": "K91",
    "description": "Postprocedural disorders of digestive system, not elsewhere classified"
  },
  {
    "code": "K92",
    "description": "Other diseases of digestive system"
  },
  {
    "code": "L01",
    "description": "Impetigo"
  },
  {
    "code": "L04",
    "description": "Acute lymphadenitis"
  },
  {
    "code": "L05",
    "description": "Pilonidal cyst"
  },
  {
    "code": "L10",
    "description": "Pemphigus"
  },
  {
    "code": "L12",
    "description": "Pemphigoid"
  },
  {
    "code": "L22",
    "description": "Diaper dermatitis"
  },
  {
    "code": "L24",
    "description": "Irritant contact dermatitis"
  },
  {
    "code": "L28",
    "description": "Lichen simplex chronicus and prurigo"
  },
  {
    "code": "L29",
    "description": "Pruritus"
  },
  {
    "code": "L30",
    "description": "Other dermatitis"
  },
  {
    "code": "L41",
    "description": "Parapsoriasis"
  },
  {
    "code": "L43",
    "description": "Lichen planus"
  },
  {
    "code": "L51",
    "description": "Erythema multiforme"
  },
  {
    "code": "L52",
    "description": "Erythema nodosum"
  },
  {
    "code": "L53",
    "description": "Other erythematous conditions"
  },
  {
    "code": "L55",
    "description": "Sunburn"
  },
  {
    "code": "L65",
    "description": "Other nonscarring hair loss"
  },
  {
    "code": "L66",
    "description": "Cicatricial alopecia"
  },
  {
    "code": "L71",
    "description": "Rosacea"
  },
  {
    "code": "L74",
    "description": "Eccrine sweat disorders"
  },
  {
    "code": "L80",
    "description": "Vitiligo"
  },
  {
    "code": "L81",
    "description": "Other disorders of pigmentation"
  },
  {
    "code": "L85",
    "description": "Other epidermal thickening"
  },
  {
    "code": "L89",
    "description": "Pressure ulcer"
  },
  {
    "code": "L90",
    "description": "Atrophic disorders of skin"
  },
  {
    "code": "L91",
    "description": "Hypertrophic disorders of skin"
  },
  {
    "code": "L98",
    "description": "Other disorders of skin and subcutaneous tissue, not elsewhere classified"
  },
  {
    "code": "M00",
    "description": "Pyogenic arthritis"
  },
  {
    "code": "M02",
    "description": "Reactive arthritis"
  },
  {
    "code": "M06",
    "description": "Other rheumatoid arthritis"
  },
  {
    "code": "M08",
    "description": "Juvenile arthritis"
  },
  {
    "code": "M11",
    "description": "Other crystal arthropathies"
  },
  {
    "code": "M12",
    "description": "Other specific arthropathies"
  },
  {
    "code": "M13",
    "description": "Other arthritis"
  },
  {
    "code": "M19",
    "description": "Other osteoarthritis"
  },
  {
    "code": "M21",
    "description": "Other acquired deformities of limbs"
  },
  {
    "code": "M22",
    "description": "Disorders of patella"
  },
  {
    "code": "M23",
    "description": "Internal derangement of knee"
  },
  {
    "code": "M24",
    "description": "Other specific joint derangements"
  },
  {
    "code": "M31",
    "description": "Other necrotizing vasculopathies"
  },
  {
    "code": "M33",
    "description": "Dermatopolymyositis"
  },
  {
    "code": "M34",
    "description": "Systemic sclerosis"
  },
  {
    "code": "M35",
    "description": "Other systemic involvement of connective tissue"
  },
  {
    "code": "M40",
    "description": "Kyphosis and lordosis"
  },
  {
    "code": "M41",
    "description": "Scoliosis"
  },
  {
    "code": "M43",
    "description": "Other deforming dorsopathies"
  },
  {
    "code": "M45",
    "description": "Ankylosing spondylitis"
  },
  {
    "code": "M46",
    "description": "Other inflammatory spondylopathies"
  },
  {
    "code": "M47",
    "description": "Spondylosis"
  },
  {
    "code": "M50",
    "description": "Cervical disc disorders"
  },
  {
    "code": "M53",
    "description": "Other dorsopathies, not elsewhere classified"
  },
  {
    "code": "M60",
    "description": "Myositis"
  },
  {
    "code": "M65",
    "description": "Synovitis and tenosynovitis"
  },
  {
    "code": "M66",
    "description": "Spontaneous rupture of synovium and tendon"
  },
  {
    "code": "M67",
    "description": "Other disorders of synovium and tendon"
  },
  {
    "code": "M70",
    "description": "Soft tissue disorders related to use, overuse and pressure"
  },
  {
    "code": "M71",
    "description": "Other bursopathies"
  },
  {
    "code": "M72",
    "description": "Fibroblastic disorders"
  },
  {
    "code": "M75",
    "description": "Shoulder lesions"
  },
  {
    "code": "M76",
    "description": "Enthesopathies of lower limb, excluding foot"
  },
  {
    "code": "M77",
    "description": "Other enthesopathies"
  },
  {
    "code": "M79",
    "description": "Other soft tissue disorders, not elsewhere classified"
  },
  {
    "code": "M84",
    "description": "Disorders of continuity of bone"
  },
  {
    "code": "M88",
    "description": "Paget's disease of bone"
  },
  {
    "code": "M89",
    "description": "Other disorders of bone"
  },
  {
    "code": "M90",
    "description": "Osteopathies in diseases classified elsewhere"
  },
  {
    "code": "M95",
    "description": "Other acquired deformities of musculoskeletal system and connective tissue"
  },
  {
    "code": "M99",
    "description": "Biomechanical lesions, not elsewhere classified"
  },
  {
    "code": "N01",
    "description": "Rapidly progressive nephritic syndrome"
  },
  {
    "code": "N02",
    "description": "Recurrent and persistent hematuria"
  },
  {
    "code": "N03",
    "description": "Chronic nephritic syndrome"
  },
  {
    "code": "N04",
    "description": "Nephrotic syndrome"
  },
  {
    "code": "N11",
    "description": "Chronic tubulo-interstitial nephritis"
  },
  {
    "code": "N13",
    "description": "Obstructive and reflux uropathy"
  },
  {
    "code": "N17",
    "description": "Acute kidney failure"
  },
  {
    "code": "N19",
    "description": "Unspecified kidney failure"
  },
  {
    "code": "N21",
    "description": "Calculus of lower urinary tract"
  },
  {
    "code": "N25",
    "description": "Disorders resulting from impaired renal tubular function"
  },
  {
    "code": "N28",
    "description": "Other disorders of kidney and ureter, not elsewhere classified"
  },
  {
    "code": "N31",
    "description": "Neuromuscular dysfunction of bladder, not elsewhere classified"
  },
  {
    "code": "N34",
    "description": "Urethritis and urethral syndrome"
  },
  {
    "code": "N35",
    "description": "Urethral stricture"
  },
  {
    "code": "N41",
    "description": "Inflammatory diseases of prostate"
  },
  {
    "code": "N43",
    "description": "Hydrocele and spermatocele"
  },
  {
    "code": "N44",
    "description": "Torsion of testis"
  },
  {
    "code": "N45",
    "description": "Orchitis and epididymitis"
  },
  {
    "code": "N46",
    "description": "Male infertility"
  },
  {
    "code": "N47",
    "description": "Disorders of prepuce"
  },
  {
    "code": "N48",
    "description": "Other disorders of penis"
  },
  {
    "code": "N61",
    "description": "Inflammatory disorders of breast"
  },
  {
    "code": "N62",
    "description": "Hypertrophy of breast"
  },
  {
    "code": "N63",
    "description": "Unspecified lump in breast"
  },
  {
    "code": "N64",
    "description": "Other disorders of breast"
  },
  {
    "code": "N71",
    "description": "Inflammatory disease of uterus, except cervix"
  },
  {
    "code": "N72",
    "description": "Inflammatory disease of cervix uteri"
  },
  {
    "code": "N73",
    "description": "Other female pelvic inflammatory diseases"
  },
  {
    "code": "N75",
    "description": "Diseases of Bartholin's gland"
  },
  {
    "code": "N76",
    "description": "Other inflammation of vagina and vulva"
  },
  {
    "code": "N81",
    "description": "Female genital prolapse"
  },
  {
    "code": "N83",
    "description": "Noninflammatory disorders of ovary, fallopian tube and broad ligament"
  },
  {
    "code": "N84",
    "description": "Polyp of female genital tract"
  },
  {
    "code": "N85",
    "description": "Other noninflammatory disorders of uterus, except cervix"
  },
  {
    "code": "N87",
    "description": "Dysplasia of cervix uteri"
  },
  {
    "code": "N89",
    "description": "Other noninflammatory disorders of vagina"
  },
  {
    "code": "N92",
    "description": "Excessive, frequent and irregular menstruation"
  },
  {
    "code": "N93",
    "description": "Other abnormal uterine and vaginal bleeding"
  },
  {
    "code": "N94",
    "description": "Pain and other conditions associated with female genital organs and menstrual cycle"
  },
  {
    "code": "N95",
    "description": "Menopausal and other perimenopausal disorders"
  },
  {
    "code": "N97",
    "description": "Female infertility"
  },
  {
    "code": "O10",
    "description": "Pre-existing hypertension complicating pregnancy, childbirth and the puerperium"
  },
  {
    "code": "O11",
    "description": "Pre-existing hypertensive disorder with superimposed proteinuria"
  },
  {
    "code": "O12",
    "description": "Gestational [pregnancy-induced] edema and proteinuria without hypertension"
  },
  {
    "code": "O13",
    "description": "Gestational [pregnancy-induced] hypertension without significant proteinuria"
  },
  {
    "code": "O20",
    "description": "Hemorrhage in early pregnancy"
  },
  {
    "code": "O22",
    "description": "Venous complications in pregnancy"
  },
  {
    "code": "O23",
    "description": "Infections of genitourinary tract in pregnancy"
  },
  {
    "code": "O32",
    "description": "Maternal care for known or suspected malpresentation of fetus"
  },
  {
    "code": "O33",
    "description": "Maternal care for known or suspected disproportion"
  },
  {
    "code": "O36",
    "description": "Maternal care for other fetal problems"
  },
  {
    "code": "O44",
    "description": "Placenta previa"
  },
  {
    "code": "O45",
    "description": "Premature separation of placenta [abruptio placentae]"
  },
  {
    "code": "O48",
    "description": "Late pregnancy"
  },
  {
    "code": "O68",
    "description": "Labor and delivery complicated by fetal stress [distress]"
  },
  {
    "code": "O85",
    "description": "Puerperal sepsis"
  },
  {
    "code": "O90",
    "description": "Complications of the puerperium, not elsewhere classified"
  },
  {
    "code": "O91",
    "description": "Infections of breast associated with childbirth"
  },
  {
    "code": "P00",
    "description": "Newborn affected by maternal conditions that may be unrelated to present pregnancy"
  },
  {
    "code": "P08",
    "description": "Disorders of newborn related to long gestation and high birth weight"
  },
  {
    "code": "P10",
    "description": "Intracranial laceration and hemorrhage due to birth injury"
  },
  {
    "code": "P20",
    "description": "Intrauterine hypoxia"
  },
  {
    "code": "P28",
    "description": "Other respiratory conditions originating in the perinatal period"
  },
  {
    "code": "P39",
    "description": "Other infections specific to the perinatal period"
  },
  {
    "code": "P52",
    "description": "Intracranial nontraumatic hemorrhage of fetus and newborn"
  },
  {
    "code": "P54",
    "description": "Other neonatal hemorrhages"
  },
  {
    "code": "Q00",
    "description": "Anencephaly and similar malformations"
  },
  {
    "code": "Q04",
    "description": "Other congenital malformations of brain"
  },
  {
    "code": "Q17",
    "description": "Other congenital malformations of ear"
  },
  {
    "code": "Q20",
    "description": "Congenital malformations of cardiac chambers and connections"
  },
  {
    "code": "Q24",
    "description": "Other congenital malformations of heart"
  },
  {
    "code": "Q35",
    "description": "Cleft palate"
  },
  {
    "code": "Q36",
    "description": "Cleft lip"
  },
  {
    "code": "Q37",
    "description": "Cleft palate with cleft lip"
  },
  {
    "code": "Q39",
    "description": "Congenital malformations of esophagus"
  },
  {
    "code": "Q40",
    "description": "Other congenital malformations of upper alimentary tract"
  },
  {
    "code": "Q53",
    "description": "Undescended testicle"
  },
  {
    "code": "Q54",
    "description": "Hypospadias"
  },
  {
    "code": "Q65",
    "description": "Congenital deformities of hip"
  },
  {
    "code": "Q66",
    "description": "Congenital deformities of feet"
  },
  {
    "code": "Q89",
    "description": "Other congenital malformations, not elsewhere classified"
  },
  {
    "code": "Q96",
    "description": "Turner's syndrome"
  },
  {
    "code": "Q98",
    "description": "Other sex chromosome abnormalities, male phenotype, not elsewhere classified"
  },
  {
    "code": "A15.0",
    "description": "Tuberculosis of lung, confirmed by sputum microscopy with or without culture"
  },
  {
    "code": "A15.1",
    "description": "Tuberculosis of lung, confirmed by culture only"
  },
  {
    "code": "A15.2",
    "description": "Tuberculosis of lung, confirmed histologically"
  },
  {
    "code": "A15.3",
    "description": "Tuberculosis of lung, confirmed by unspecified means"
  },
  {
    "code": "A19.0",
    "description": "Acute miliary tuberculosis of a single specified site"
  },
  {
    "code": "A19.1",
    "description": "Acute miliary tuberculosis of multiple sites"
  },
  {
    "code": "A19.2",
    "description": "Acute miliary tuberculosis, unspecified"
  },
  {
    "code": "A28.0",
    "description": "Pasteurellosis"
  },
  {
    "code": "A28.1",
    "description": "Cat-scratch disease"
  },
  {
    "code": "A31.0",
    "description": "Pulmonary mycobacterial infection"
  },
  {
    "code": "A33",
    "description": "Tetanus neonatorum"
  },
  {
    "code": "A37.0",
    "description": "Whooping cough due to Bordetella pertussis"
  },
  {
    "code": "A37.1",
    "description": "Whooping cough due to Bordetella parapertussis"
  },
  {
    "code": "A54.0",
    "description": "Gonococcal infection of lower genitourinary tract"
  },
  {
    "code": "A54.1",
    "description": "Gonococcal infection of lower genitourinary tract with periurethral and accessory gland abscess"
  },
  {
    "code": "A54.2",
    "description": "Pelvic inflammatory disease and other gonococcal genitourinary infections"
  },
  {
    "code": "A54.3",
    "description": "Gonococcal infection of eye"
  },
  {
    "code": "A54.4",
    "description": "Gonococcal infection of musculoskeletal system"
  },
  {
    "code": "A55",
    "description": "Chlamydial lymphogranuloma (venereum)"
  },
  {
    "code": "A57",
    "description": "Chancroid"
  },
  {
    "code": "A58",
    "description": "Granuloma inguinale"
  },
  {
    "code": "A65",
    "description": "Nonvenereal syphilis"
  },
  {
    "code": "A66",
    "description": "Yaws"
  },
  {
    "code": "A67",
    "description": "Pinta"
  },
  {
    "code": "A68",
    "description": "Relapsing fevers"
  },
  {
    "code": "A70",
    "description": "Chlamydia psittaci infection"
  },
  {
    "code": "A74",
    "description": "Other diseases caused by Chlamydia"
  },
  {
    "code": "A75",
    "description": "Typhus fever"
  },
  {
    "code": "A77",
    "description": "Spotted fever (tick-borne rickettsiosis)"
  },
  {
    "code": "A78",
    "description": "Q fever"
  },
  {
    "code": "A79",
    "description": "Other rickettsioses"
  },
  {
    "code": "A81",
    "description": "Atypical virus infections of central nervous system"
  },
  {
    "code": "A83",
    "description": "Mosquito-borne viral encephalitis"
  },
  {
    "code": "A85",
    "description": "Other viral encephalitis, not elsewhere classified"
  },
  {
    "code": "A86",
    "description": "Unspecified viral encephalitis"
  },
  {
    "code": "A87",
    "description": "Viral meningitis"
  },
  {
    "code": "A88",
    "description": "Other viral infections of central nervous system, not elsewhere classified"
  },
  {
    "code": "A89",
    "description": "Unspecified viral infection of central nervous system"
  },
  {
    "code": "A91",
    "description": "Dengue hemorrhagic fever"
  },
  {
    "code": "A93",
    "description": "Other arthropod-borne viral fevers"
  },
  {
    "code": "A94",
    "description": "Unspecified arthropod-borne viral fever"
  },
  {
    "code": "A98",
    "description": "Other viral hemorrhagic fevers, not elsewhere classified"
  },
  {
    "code": "A99",
    "description": "Unspecified viral hemorrhagic fever"
  },
  {
    "code": "B01",
    "description": "Varicella [chickenpox]"
  },
  {
    "code": "B05",
    "description": "Measles"
  },
  {
    "code": "B09",
    "description": "Unspecified viral infection characterized by skin and mucous membrane lesions"
  },
  {
    "code": "B17",
    "description": "Other acute viral hepatitis"
  },
  {
    "code": "B19",
    "description": "Unspecified viral hepatitis"
  },
  {
    "code": "B23",
    "description": "Human immunodeficiency virus [HIV] disease resulting in other conditions"
  },
  {
    "code": "B36",
    "description": "Other superficial mycoses"
  },
  {
    "code": "B38",
    "description": "Coccidioidomycosis"
  },
  {
    "code": "B39",
    "description": "Histoplasmosis"
  },
  {
    "code": "B40",
    "description": "Blastomycosis"
  },
  {
    "code": "B41",
    "description": "Paracoccidioidomycosis"
  },
  {
    "code": "B42",
    "description": "Sporotrichosis"
  },
  {
    "code": "B43",
    "description": "Chromomycosis and pheomycotic abscess"
  },
  {
    "code": "B44",
    "description": "Aspergillosis"
  },
  {
    "code": "B46",
    "description": "Mucormycosis"
  },
  {
    "code": "B47",
    "description": "Mycetoma"
  },
  {
    "code": "B48",
    "description": "Other mycoses, not elsewhere classified"
  },
  {
    "code": "B49",
    "description": "Unspecified mycosis"
  },
  {
    "code": "B51",
    "description": "Plasmodium vivax malaria"
  },
  {
    "code": "B52",
    "description": "Plasmodium malariae malaria"
  },
  {
    "code": "B53",
    "description": "Other parasitologically confirmed malaria"
  },
  {
    "code": "B57",
    "description": "Chagas' disease"
  },
  {
    "code": "B59",
    "description": "Pneumocystosis"
  },
  {
    "code": "B60",
    "description": "Other protozoal diseases, not elsewhere classified"
  },
  {
    "code": "B64",
    "description": "Unspecified protozoal disease"
  },
  {
    "code": "B66",
    "description": "Other fluke infections"
  },
  {
    "code": "B69",
    "description": "Cysticercosis"
  },
  {
    "code": "B70",
    "description": "Diphyllobothriasis and sparganosis"
  },
  {
    "code": "B71",
    "description": "Other cestode infections"
  },
  {
    "code": "B75",
    "description": "Trichinellosis"
  },
  {
    "code": "B78",
    "description": "Strongyloidiasis"
  },
  {
    "code": "B79",
    "description": "Trichuriasis"
  },
  {
    "code": "B80",
    "description": "Enterobiasis"
  },
  {
    "code": "B83",
    "description": "Other helminthiases"
  },
  {
    "code": "B88",
    "description": "Other infestations"
  },
  {
    "code": "B89",
    "description": "Unspecified parasitic disease"
  },
  {
    "code": "B90",
    "description": "Sequelae of tuberculosis"
  },
  {
    "code": "B91",
    "description": "Sequelae of poliomyelitis"
  },
  {
    "code": "B92",
    "description": "Sequelae of leprosy"
  },
  {
    "code": "B94",
    "description": "Sequelae of other and unspecified infectious and parasitic diseases"
  },
  {
    "code": "B95",
    "description": "Streptococcus and Staphylococcus as the cause of diseases classified elsewhere"
  },
  {
    "code": "B96",
    "description": "Other bacterial agents as the cause of diseases classified elsewhere"
  },
  {
    "code": "B97",
    "description": "Viral agents as the cause of diseases classified elsewhere"
  },
  {
    "code": "C02",
    "description": "Malignant neoplasm of other and unspecified parts of tongue"
  },
  {
    "code": "C03",
    "description": "Malignant neoplasm of gum"
  },
  {
    "code": "C04",
    "description": "Malignant neoplasm of floor of mouth"
  },
  {
    "code": "C05",
    "description": "Malignant neoplasm of palate"
  },
  {
    "code": "C18",
    "description": "Malignant neoplasm of colon"
  },
  {
    "code": "C18.0",
    "description": "Malignant neoplasm of cecum"
  },
  {
    "code": "C18.2",
    "description": "Malignant neoplasm of ascending colon"
  },
  {
    "code": "C18.4",
    "description": "Malignant neoplasm of transverse colon"
  },
  {
    "code": "C18.6",
    "description": "Malignant neoplasm of descending colon"
  },
  {
    "code": "C18.7",
    "description": "Malignant neoplasm of sigmoid colon"
  },
  {
    "code": "C34.1",
    "description": "Malignant neoplasm of upper lobe, bronchus or lung"
  },
  {
    "code": "C34.2",
    "description": "Malignant neoplasm of middle lobe, bronchus or lung"
  },
  {
    "code": "C34.3",
    "description": "Malignant neoplasm of lower lobe, bronchus or lung"
  },
  {
    "code": "C43",
    "description": "Malignant melanoma of skin"
  },
  {
    "code": "C43.0",
    "description": "Malignant melanoma of lip"
  },
  {
    "code": "C43.3",
    "description": "Malignant melanoma of other and unspecified parts of face"
  },
  {
    "code": "C43.5",
    "description": "Malignant melanoma of trunk"
  },
  {
    "code": "C43.6",
    "description": "Malignant melanoma of upper limb, including shoulder"
  },
  {
    "code": "C43.7",
    "description": "Malignant melanoma of lower limb, including hip"
  },
  {
    "code": "C50.0",
    "description": "Malignant neoplasm of nipple and areola"
  },
  {
    "code": "C50.1",
    "description": "Malignant neoplasm of central portion of breast"
  },
  {
    "code": "C50.4",
    "description": "Malignant neoplasm of upper-outer quadrant of breast"
  },
  {
    "code": "C61",
    "description": "Malignant neoplasm of prostate"
  },
  {
    "code": "D12.6",
    "description": "Benign neoplasm of colon, unspecified"
  },
  {
    "code": "D50.0",
    "description": "Iron deficiency anemia secondary to blood loss (chronic)"
  },
  {
    "code": "D50.8",
    "description": "Other iron deficiency anemias"
  },
  {
    "code": "D50.9",
    "description": "Iron deficiency anemia, unspecified"
  },
  {
    "code": "D57.0",
    "description": "Sickle-cell anemia with crisis"
  },
  {
    "code": "D57.1",
    "description": "Sickle-cell anemia without crisis"
  },
  {
    "code": "D57.2",
    "description": "Sickle-cell/HbC disease"
  },
  {
    "code": "D57.3",
    "description": "Sickle-cell trait"
  },
  {
    "code": "D61",
    "description": "Other aplastic anemias"
  },
  {
    "code": "D61.0",
    "description": "Constitutional aplastic anemia"
  },
  {
    "code": "D61.1",
    "description": "Drug-induced aplastic anemia"
  },
  {
    "code": "D61.9",
    "description": "Aplastic anemia, unspecified"
  },
  {
    "code": "D63",
    "description": "Anemia in chronic diseases classified elsewhere"
  },
  {
    "code": "D67",
    "description": "Hereditary factor IX deficiency"
  },
  {
    "code": "D68.0",
    "description": "Von Willebrand's disease"
  },
  {
    "code": "D72",
    "description": "Other disorders of white blood cells"
  },
  {
    "code": "D73",
    "description": "Diseases of spleen"
  },
  {
    "code": "D75",
    "description": "Other diseases of blood and blood-forming organs"
  },
  {
    "code": "D82",
    "description": "Immunodeficiency associated with other major defects"
  },
  {
    "code": "D83",
    "description": "Common variable immunodeficiency"
  },
  {
    "code": "D89",
    "description": "Other disorders involving the immune mechanism, not elsewhere classified"
  },
  {
    "code": "E05",
    "description": "Thyrotoxicosis [hyperthyroidism]"
  },
  {
    "code": "E05.0",
    "description": "Thyrotoxicosis with diffuse goiter"
  },
  {
    "code": "E05.9",
    "description": "Thyrotoxicosis, unspecified"
  },
  {
    "code": "E10",
    "description": "Type 1 diabetes mellitus"
  },
  {
    "code": "E10.9",
    "description": "Type 1 diabetes mellitus without complications"
  },
  {
    "code": "E11.9",
    "description": "Type 2 diabetes mellitus without complications"
  },
  {
    "code": "E16.2",
    "description": "Hypoglycemia, unspecified"
  },
  {
    "code": "E26",
    "description": "Hyperaldosteronism"
  },
  {
    "code": "E45",
    "description": "Retarded development following protein-calorie malnutrition"
  },
  {
    "code": "E46",
    "description": "Unspecified protein-calorie malnutrition"
  },
  {
    "code": "E58",
    "description": "Dietary calcium deficiency"
  },
  {
    "code": "E59",
    "description": "Dietary selenium deficiency"
  },
  {
    "code": "E61.1",
    "description": "Iron deficiency"
  },
  {
    "code": "E66.0",
    "description": "Obesity due to excess calories"
  },
  {
    "code": "E66.9",
    "description": "Obesity, unspecified"
  },
  {
    "code": "E77",
    "description": "Disorders of glycoprotein metabolism"
  },
  {
    "code": "E78.0",
    "description": "Pure hypercholesterolemia"
  },
  {
    "code": "E78.1",
    "description": "Pure hyperglyceridemia"
  },
  {
    "code": "E78.2",
    "description": "Mixed hyperlipidemia"
  },
  {
    "code": "E78.5",
    "description": "Hyperlipidemia, unspecified"
  },
  {
    "code": "E79",
    "description": "Disorders of purine and pyrimidine metabolism"
  },
  {
    "code": "E86",
    "description": "Volume depletion (Dehydration)"
  },
  {
    "code": "F04",
    "description": "Organic amnesic syndrome, not induced by alcohol and other psychoactive substances"
  },
  {
    "code": "F07",
    "description": "Personality and behavioral disorders due to brain disease, damage and dysfunction"
  },
  {
    "code": "F10.1",
    "description": "Alcohol abuse"
  },
  {
    "code": "F10.2",
    "description": "Alcohol dependence"
  },
  {
    "code": "F20",
    "description": "Schizophrenia"
  },
  {
    "code": "F20.0",
    "description": "Paranoid schizophrenia"
  },
  {
    "code": "F20.1",
    "description": "Hebephrenic schizophrenia"
  },
  {
    "code": "F20.2",
    "description": "Catatonic schizophrenia"
  },
  {
    "code": "F30",
    "description": "Manic episode"
  },
  {
    "code": "F32.0",
    "description": "Mild depressive episode"
  },
  {
    "code": "F32.1",
    "description": "Moderate depressive episode"
  },
  {
    "code": "F32.2",
    "description": "Severe depressive episode without psychotic symptoms"
  },
  {
    "code": "F41.0",
    "description": "Panic disorder [episodic paroxysmal anxiety]"
  },
  {
    "code": "F41.1",
    "description": "Generalized anxiety disorder"
  },
  {
    "code": "F43",
    "description": "Reaction to severe stress, and adjustment disorders"
  },
  {
    "code": "F43.1",
    "description": "Post-traumatic stress disorder (PTSD)"
  },
  {
    "code": "F43.2",
    "description": "Adjustment disorders"
  },
  {
    "code": "F53",
    "description": "Mental and behavioral disorders associated with the puerperium, not elsewhere classified"
  },
  {
    "code": "F98",
    "description": "Other emotional and behavioral disorders with onset usually occurring in childhood and adolescence"
  },
  {
    "code": "G06",
    "description": "Intracranial and intraspinal abscess and granuloma"
  },
  {
    "code": "G13",
    "description": "Systemic atrophies primarily affecting central nervous system in diseases classified elsewhere"
  },
  {
    "code": "G20",
    "description": "Parkinson's disease"
  },
  {
    "code": "G30",
    "description": "Alzheimer's disease"
  },
  {
    "code": "G30.0",
    "description": "Alzheimer's disease with early onset"
  },
  {
    "code": "G30.1",
    "description": "Alzheimer's disease with late onset"
  },
  {
    "code": "G31.0",
    "description": "Circumscribed brain atrophy (Pick's disease)"
  },
  {
    "code": "G40.9",
    "description": "Epilepsy, unspecified"
  },
  {
    "code": "G43.0",
    "description": "Migraine without aura"
  },
  {
    "code": "G43.1",
    "description": "Migraine with aura"
  },
  {
    "code": "G47.0",
    "description": "Disorders of initiating and maintaining sleep [insomnia]"
  },
  {
    "code": "G47.3",
    "description": "Sleep apnea"
  },
  {
    "code": "G52",
    "description": "Disorders of other cranial nerves"
  },
  {
    "code": "G54",
    "description": "Nerve root and plexus disorders"
  },
  {
    "code": "G57",
    "description": "Mononeuropathies of lower limb"
  },
  {
    "code": "G81",
    "description": "Hemiplegia"
  },
  {
    "code": "G83",
    "description": "Other paralytic syndromes"
  },
  {
    "code": "G92",
    "description": "Toxic encephalopathy"
  },
  {
    "code": "G95",
    "description": "Other diseases of spinal cord"
  },
  {
    "code": "H00",
    "description": "Hordeolum and chalazion"
  },
  {
    "code": "H01",
    "description": "Other inflammation of eyelid"
  },
  {
    "code": "H10.1",
    "description": "Acute atopic conjunctivitis"
  },
  {
    "code": "H25",
    "description": "Senile cataract"
  },
  {
    "code": "H40",
    "description": "Glaucoma"
  },
  {
    "code": "H40.1",
    "description": "Primary open-angle glaucoma"
  },
  {
    "code": "H40.2",
    "description": "Primary angle-closure glaucoma"
  },
  {
    "code": "H52.1",
    "description": "Myopia"
  },
  {
    "code": "H52.2",
    "description": "Astigmatism"
  },
  {
    "code": "H52.4",
    "description": "Presbyopia"
  },
  {
    "code": "H65",
    "description": "Nonsuppurative otitis media"
  },
  {
    "code": "H80",
    "description": "Otosclerosis"
  },
  {
    "code": "H90",
    "description": "Conductive and sensorineural hearing loss"
  },
  {
    "code": "I02",
    "description": "Rheumatic chorea"
  },
  {
    "code": "I10.9",
    "description": "Essential (primary) hypertension"
  },
  {
    "code": "I20",
    "description": "Angina pectoris"
  },
  {
    "code": "I20.0",
    "description": "Unstable angina"
  },
  {
    "code": "I20.9",
    "description": "Angina pectoris, unspecified"
  },
  {
    "code": "I25.1",
    "description": "Atherosclerotic heart disease of native coronary artery"
  },
  {
    "code": "I28",
    "description": "Other diseases of pulmonary vessels"
  },
  {
    "code": "I33",
    "description": "Acute and subacute endocarditis"
  },
  {
    "code": "I48.0",
    "description": "Paroxysmal atrial fibrillation"
  },
  {
    "code": "I48.1",
    "description": "Persistent atrial fibrillation"
  },
  {
    "code": "I48.2",
    "description": "Chronic atrial fibrillation"
  },
  {
    "code": "I50",
    "description": "Heart failure"
  },
  {
    "code": "I50.1",
    "description": "Left ventricular failure"
  },
  {
    "code": "I50.2",
    "description": "Systolic (congestive) heart failure"
  },
  {
    "code": "I50.3",
    "description": "Diastolic (congestive) heart failure"
  },
  {
    "code": "I50.9",
    "description": "Heart failure, unspecified"
  },
  {
    "code": "I63.9",
    "description": "Cerebral infarction, unspecified"
  },
  {
    "code": "I70.2",
    "description": "Atherosclerosis of native arteries of extremities"
  },
  {
    "code": "I72",
    "description": "Other aneurysm and dissection"
  },
  {
    "code": "I80.2",
    "description": "Phlebitis and thrombophlebitis of other deep vessels of lower extremities (DVT)"
  },
  {
    "code": "I89.0",
    "description": "Lymphedema, not elsewhere classified"
  },
  {
    "code": "J01",
    "description": "Acute sinusitis"
  },
  {
    "code": "J02",
    "description": "Acute pharyngitis"
  },
  {
    "code": "J06.9",
    "description": "Acute upper respiratory infection, unspecified"
  },
  {
    "code": "J18.0",
    "description": "Bronchopneumonia, unspecified"
  },
  {
    "code": "J18.9",
    "description": "Pneumonia, unspecified"
  },
  {
    "code": "J20.9",
    "description": "Acute bronchitis, unspecified"
  },
  {
    "code": "J30.1",
    "description": "Allergic rhinitis due to pollen"
  },
  {
    "code": "J30.9",
    "description": "Allergic rhinitis, unspecified"
  },
  {
    "code": "J44.0",
    "description": "Chronic obstructive pulmonary disease with acute lower respiratory infection"
  },
  {
    "code": "J44.1",
    "description": "Chronic obstructive pulmonary disease with acute exacerbation"
  },
  {
    "code": "J44.9",
    "description": "Chronic obstructive pulmonary disease, unspecified"
  },
  {
    "code": "J45.2",
    "description": "Mild intermittent asthma"
  },
  {
    "code": "J45.3",
    "description": "Mild persistent asthma"
  },
  {
    "code": "J45.4",
    "description": "Moderate persistent asthma"
  },
  {
    "code": "J45.5",
    "description": "Severe persistent asthma"
  },
  {
    "code": "J45.9",
    "description": "Asthma, unspecified"
  },
  {
    "code": "J98",
    "description": "Other respiratory disorders"
  },
  {
    "code": "K07",
    "description": "Dentofacial anomalies [including malocclusion]"
  },
  {
    "code": "K21.0",
    "description": "Gastro-esophageal reflux disease with esophagitis"
  },
  {
    "code": "K21.9",
    "description": "Gastro-esophageal reflux disease without esophagitis"
  },
  {
    "code": "K25.9",
    "description": "Gastric ulcer, unspecified as acute or chronic, without hemorrhage or perforation"
  },
  {
    "code": "K29",
    "description": "Gastritis and duodenitis"
  },
  {
    "code": "K29.0",
    "description": "Acute hemorrhagic gastritis"
  },
  {
    "code": "K29.7",
    "description": "Gastritis, unspecified"
  },
  {
    "code": "K35",
    "description": "Acute appendicitis"
  },
  {
    "code": "K36",
    "description": "Other appendicitis"
  },
  {
    "code": "K37",
    "description": "Unspecified appendicitis"
  },
  {
    "code": "K58.0",
    "description": "Irritable bowel syndrome with diarrhea"
  },
  {
    "code": "K58.9",
    "description": "Irritable bowel syndrome without diarrhea"
  },
  {
    "code": "K70.3",
    "description": "Alcoholic cirrhosis of liver"
  },
  {
    "code": "K76.0",
    "description": "Fatty (change of) liver, not elsewhere classified (NAFLD)"
  },
  {
    "code": "K80",
    "description": "Cholelithiasis (Gallstones)"
  },
  {
    "code": "K80.2",
    "description": "Calculus of gallbladder without cholecystitis"
  },
  {
    "code": "L00",
    "description": "Staphylococcal scalded skin syndrome"
  },
  {
    "code": "L20.9",
    "description": "Atopic dermatitis, unspecified"
  },
  {
    "code": "L25.9",
    "description": "Unspecified contact dermatitis, unspecified cause"
  },
  {
    "code": "L40",
    "description": "Psoriasis"
  },
  {
    "code": "L40.0",
    "description": "Psoriasis vulgaris"
  },
  {
    "code": "L70",
    "description": "Acne"
  },
  {
    "code": "L70.0",
    "description": "Acne vulgaris"
  },
  {
    "code": "L82",
    "description": "Seborrheic keratosis"
  },
  {
    "code": "L89.0",
    "description": "Pressure ulcer of elbow"
  },
  {
    "code": "L89.1",
    "description": "Pressure ulcer of back"
  },
  {
    "code": "L89.2",
    "description": "Pressure ulcer of hip"
  },
  {
    "code": "L89.3",
    "description": "Pressure ulcer of buttock"
  },
  {
    "code": "L97",
    "description": "Non-pressure chronic ulcer of lower limb, not elsewhere classified"
  },
  {
    "code": "M05",
    "description": "Seropositive rheumatoid arthritis"
  },
  {
    "code": "M10.0",
    "description": "Idiopathic gout"
  },
  {
    "code": "M15",
    "description": "Polyosteoarthritis"
  },
  {
    "code": "M17.0",
    "description": "Bilateral primary osteoarthritis of knee"
  },
  {
    "code": "M17.1",
    "description": "Unilateral primary osteoarthritis of knee"
  },
  {
    "code": "M25.5",
    "description": "Pain in joint"
  },
  {
    "code": "M54.2",
    "description": "Cervicalgia (Neck pain)"
  },
  {
    "code": "M54.4",
    "description": "Lumbago with sciatica"
  },
  {
    "code": "M54.5",
    "description": "Low back pain"
  },
  {
    "code": "M80",
    "description": "Osteoporosis with current pathological fracture"
  },
  {
    "code": "M81",
    "description": "Osteoporosis without current pathological fracture"
  },
  {
    "code": "M81.0",
    "description": "Age-related osteoporosis without current pathological fracture"
  },
  {
    "code": "N18.1",
    "description": "Chronic kidney disease, stage 1"
  },
  {
    "code": "N18.2",
    "description": "Chronic kidney disease, stage 2"
  },
  {
    "code": "N18.3",
    "description": "Chronic kidney disease, stage 3"
  },
  {
    "code": "N18.4",
    "description": "Chronic kidney disease, stage 4"
  },
  {
    "code": "N18.5",
    "description": "Chronic kidney disease, stage 5"
  },
  {
    "code": "N18.9",
    "description": "Chronic kidney disease, unspecified"
  },
  {
    "code": "N20.0",
    "description": "Calculus of kidney"
  },
  {
    "code": "N20.1",
    "description": "Calculus of ureter"
  },
  {
    "code": "N39.0",
    "description": "Urinary tract infection, site unspecified"
  },
  {
    "code": "N40",
    "description": "Benign prostatic hyperplasia (BPH)"
  },
  {
    "code": "N80",
    "description": "Endometriosis"
  },
  {
    "code": "N92.0",
    "description": "Excessive and frequent menstruation with regular cycle"
  },
  {
    "code": "O09",
    "description": "Duration of pregnancy"
  },
  {
    "code": "O14",
    "description": "Gestational [pregnancy-induced] hypertension with significant proteinuria (Preeclampsia)"
  },
  {
    "code": "O14.0",
    "description": "Mild to moderate pre-eclampsia"
  },
  {
    "code": "O14.1",
    "description": "Severe pre-eclampsia"
  },
  {
    "code": "O14.9",
    "description": "Unspecified pre-eclampsia"
  },
  {
    "code": "O21",
    "description": "Excessive vomiting in pregnancy (Hyperemesis gravidarum)"
  },
  {
    "code": "O26",
    "description": "Maternal care for other conditions predominantly related to pregnancy"
  },
  {
    "code": "O43",
    "description": "Placental disorders"
  },
  {
    "code": "O46",
    "description": "Antepartum hemorrhage, not elsewhere classified"
  },
  {
    "code": "O69",
    "description": "Labor and delivery complicated by umbilical cord complications"
  },
  {
    "code": "O71",
    "description": "Other obstetric trauma"
  },
  {
    "code": "O80.0",
    "description": "Spontaneous vertex delivery"
  },
  {
    "code": "P07",
    "description": "Disorders related to short gestation and low birth weight, not elsewhere classified"
  },
  {
    "code": "P07.0",
    "description": "Extremely low birth weight"
  },
  {
    "code": "P07.1",
    "description": "Other low birth weight"
  },
  {
    "code": "P07.2",
    "description": "Extreme immaturity"
  },
  {
    "code": "P07.3",
    "description": "Other preterm infants"
  },
  {
    "code": "P12",
    "description": "Birth injury to scalp"
  },
  {
    "code": "P13",
    "description": "Birth injury to skeleton"
  },
  {
    "code": "P14",
    "description": "Birth injury to nervous system"
  },
  {
    "code": "P15",
    "description": "Other birth injuries"
  },
  {
    "code": "P21.0",
    "description": "Severe birth asphyxia"
  },
  {
    "code": "P21.1",
    "description": "Mild and moderate birth asphyxia"
  },
  {
    "code": "Q01",
    "description": "Encephalocele"
  },
  {
    "code": "Q02",
    "description": "Microcephaly"
  },
  {
    "code": "Q03",
    "description": "Congenital hydrocephalus"
  },
  {
    "code": "Q05",
    "description": "Spina bifida"
  },
  {
    "code": "Q21",
    "description": "Congenital malformations of cardiac septa"
  },
  {
    "code": "Q21.0",
    "description": "Ventricular septal defect"
  },
  {
    "code": "Q21.1",
    "description": "Atrial septal defect"
  },
  {
    "code": "Q25",
    "description": "Congenital malformations of great arteries"
  },
  {
    "code": "Q25.0",
    "description": "Patent ductus arteriosus"
  },
  {
    "code": "Q38",
    "description": "Other congenital malformations of tongue, mouth and pharynx"
  },
  {
    "code": "Q60",
    "description": "Renal agenesis and other reduction defects of kidney"
  },
  {
    "code": "Q61",
    "description": "Cystic kidney disease"
  },
  {
    "code": "Q91",
    "description": "Trisomy 18 and Trisomy 13"
  },
  {
    "code": "R00",
    "description": "Abnormalities of heart beat"
  },
  {
    "code": "R00.0",
    "description": "Tachycardia, unspecified"
  },
  {
    "code": "R00.1",
    "description": "Bradycardia, unspecified"
  },
  {
    "code": "R00.2",
    "description": "Palpitations"
  },
  {
    "code": "R01",
    "description": "Cardiac murmurs and other cardiac sounds"
  },
  {
    "code": "R03",
    "description": "Abnormal blood-pressure reading, without diagnosis"
  },
  {
    "code": "R03.0",
    "description": "Elevated blood-pressure reading, without diagnosis of hypertension"
  },
  {
    "code": "R05.9",
    "description": "Cough, unspecified"
  },
  {
    "code": "R06",
    "description": "Abnormalities of breathing"
  },
  {
    "code": "R06.0",
    "description": "Dyspnea"
  },
  {
    "code": "R06.2",
    "description": "Wheezing"
  },
  {
    "code": "R07.0",
    "description": "Pain in throat"
  },
  {
    "code": "R07.2",
    "description": "Precordial pain"
  },
  {
    "code": "R07.8",
    "description": "Other chest pain"
  },
  {
    "code": "R07.9",
    "description": "Chest pain, unspecified"
  },
  {
    "code": "R10",
    "description": "Abdominal and pelvic pain"
  },
  {
    "code": "R10.0",
    "description": "Acute abdomen"
  },
  {
    "code": "R10.1",
    "description": "Pain localized to upper abdomen"
  },
  {
    "code": "R10.2",
    "description": "Pelvic and perineal pain"
  },
  {
    "code": "R10.3",
    "description": "Pain localized to other parts of lower abdomen"
  },
  {
    "code": "R10.4",
    "description": "Other and unspecified abdominal pain"
  },
  {
    "code": "R10.9",
    "description": "Unspecified abdominal pain"
  },
  {
    "code": "R11.0",
    "description": "Nausea"
  },
  {
    "code": "R11.1",
    "description": "Vomiting"
  },
  {
    "code": "R11.2",
    "description": "Nausea with vomiting, unspecified"
  },
  {
    "code": "R12",
    "description": "Heartburn"
  },
  {
    "code": "R13",
    "description": "Dysphagia"
  },
  {
    "code": "R14",
    "description": "Flatulence and related conditions"
  },
  {
    "code": "R16",
    "description": "Hepatomegaly and splenomegaly, not elsewhere classified"
  },
  {
    "code": "R17",
    "description": "Unspecified jaundice"
  },
  {
    "code": "R18",
    "description": "Ascites"
  },
  {
    "code": "R19",
    "description": "Other symptoms and signs involving the digestive system and abdomen"
  },
  {
    "code": "R20",
    "description": "Disturbances of skin sensation"
  },
  {
    "code": "R21",
    "description": "Rash and other nonspecific skin eruption"
  },
  {
    "code": "R22",
    "description": "Localized swelling, mass and lump of skin and subcutaneous tissue"
  },
  {
    "code": "R25",
    "description": "Abnormal involuntary movements"
  },
  {
    "code": "R26",
    "description": "Abnormalities of gait and mobility"
  },
  {
    "code": "R27",
    "description": "Other lack of coordination"
  },
  {
    "code": "R29",
    "description": "Other symptoms and signs involving the nervous and musculoskeletal systems"
  },
  {
    "code": "R30",
    "description": "Pain associated with micturition"
  },
  {
    "code": "R33",
    "description": "Retention of urine"
  },
  {
    "code": "R40",
    "description": "Somnolence, stupor and coma"
  },
  {
    "code": "R41",
    "description": "Other symptoms and signs involving cognitive functions and awareness"
  },
  {
    "code": "R42",
    "description": "Dizziness and giddiness"
  },
  {
    "code": "R43",
    "description": "Disturbances of smell and taste"
  },
  {
    "code": "R45",
    "description": "Symptoms and signs involving emotional state"
  },
  {
    "code": "R50.9",
    "description": "Fever, unspecified"
  },
  {
    "code": "R51.9",
    "description": "Headache, unspecified"
  },
  {
    "code": "R52",
    "description": "Pain, not elsewhere classified"
  },
  {
    "code": "R53.83",
    "description": "Other fatigue"
  },
  {
    "code": "R55",
    "description": "Syncope and collapse"
  },
  {
    "code": "R56",
    "description": "Convulsions, not elsewhere classified"
  },
  {
    "code": "R57",
    "description": "Shock, not elsewhere classified"
  },
  {
    "code": "R59",
    "description": "Enlarged lymph nodes"
  },
  {
    "code": "R60",
    "description": "Edema, not elsewhere classified"
  },
  {
    "code": "R60.0",
    "description": "Localized edema"
  },
  {
    "code": "R60.1",
    "description": "Generalized edema"
  },
  {
    "code": "R63",
    "description": "Symptoms and signs concerning food and fluid intake"
  },
  {
    "code": "R64",
    "description": "Cachexia"
  },
  {
    "code": "R73",
    "description": "Elevated blood glucose level"
  },
  {
    "code": "S00",
    "description": "Superficial injury of head"
  },
  {
    "code": "S01",
    "description": "Open wound of head"
  },
  {
    "code": "S09",
    "description": "Other and unspecified injuries of head"
  },
  {
    "code": "S10",
    "description": "Superficial injury of neck"
  },
  {
    "code": "S12",
    "description": "Fracture of cervical spine"
  },
  {
    "code": "S13",
    "description": "Dislocation, sprain and strain of joints and ligaments at neck level"
  },
  {
    "code": "S20",
    "description": "Superficial injury of thorax"
  },
  {
    "code": "S22",
    "description": "Fracture of rib(s), sternum and thoracic spine"
  },
  {
    "code": "S27",
    "description": "Injury of other and unspecified intrathoracic organs"
  },
  {
    "code": "Z01",
    "description": "Encounter for other special examination and investigation of persons without complaint or reported diagnosis"
  }

];

async function seed() {

  for (const item of icd10Codes) {

    await prisma.iCD10Code.upsert({

      where: {
        code: item.code
      },

      update: {},

      create: item
    });
  }

  console.log("ICD10 seeded");
}

seed()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });