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