import prisma from "../utils/prisma.js";

const icd10Codes = [

  {
    "code": "B50.9",
    "description": "Plasmodium falciparum malaria, unspecified"
  },
  {
    "code": "B50.8",
    "description": "Other severe and complicated Plasmodium falciparum malaria"
  },
  {
    "code": "M54.3",
    "description": "Sciatica"
  },
  {
    "code": "M54.1",
    "description": "Radiculopathy"
  },
  {
    "code": "J06.9",
    "description": "Acute upper respiratory infection, unspecified"
  },
  {
    "code": "A01.0",
    "description": "Typhoid fever"
  },
  {
    "code": "G44.2",
    "description": "Tension-type headache"
  },
  {
    "code": "J02.9",
    "description": "Acute pharyngitis, unspecified"
  },
  {
    "code": "S83.9",
    "description": "Sprain and strain of unspecified site of knee"
  },
  {
    "code": "A09",
    "description": "Infectious gastroenteritis and colitis, unspecified"
  },
  {
    "code": "Z09",
    "description": "Encounter for follow-up examination after completed treatment for conditions other than malignant neoplasm"
  },
  {
    "code": "M17.9",
    "description": "Osteoarthritis of knee, unspecified"
  },
  {
    "code": "A00.0",
    "description": "Cholera due to Vibrio cholerae 01, biovar cholerae"
  },
  {
    "code": "A00.1",
    "description": "Cholera due to Vibrio cholerae 01, biovar eltor"
  },
  {
    "code": "A00.9",
    "description": "Cholera, unspecified"
  },
  {
    "code": "A01.1",
    "description": "Paratyphoid fever A"
  },
  {
    "code": "A01.2",
    "description": "Paratyphoid fever B"
  },
  {
    "code": "A01.3",
    "description": "Paratyphoid fever C"
  },
  {
    "code": "A01.4",
    "description": "Paratyphoid fever, unspecified"
  },
  {
    "code": "A02.0",
    "description": "Salmonella enteritis"
  },
  {
    "code": "A02.1",
    "description": "Salmonella sepsis"
  },
  {
    "code": "A02.20",
    "description": "Localized salmonella infection, unspecified"
  },
  {
    "code": "A02.21",
    "description": "Salmonella meningitis"
  },
  {
    "code": "A02.22",
    "description": "Salmonella pneumonia"
  },
  {
    "code": "A02.8",
    "description": "Other specified salmonella infections"
  },
  {
    "code": "A02.9",
    "description": "Salmonella infection, unspecified"
  },
  {
    "code": "A03.0",
    "description": "Shigellosis due to Shigella dysenteriae"
  },
  {
    "code": "A03.1",
    "description": "Shigellosis due to Shigella flexneri"
  },
  {
    "code": "A03.2",
    "description": "Shigellosis due to Shigella boydii"
  },
  {
    "code": "A03.3",
    "description": "Shigellosis due to Shigella sonnei"
  },
  {
    "code": "A03.8",
    "description": "Other shigellosis"
  },
  {
    "code": "A03.9",
    "description": "Shigellosis, unspecified"
  },
  {
    "code": "A04.0",
    "description": "Enteropathogenic Escherichia coli infection"
  },
  {
    "code": "A04.1",
    "description": "Enterotoxigenic Escherichia coli infection"
  },
  {
    "code": "A04.2",
    "description": "Enteroinvasive Escherichia coli infection"
  },
  {
    "code": "A04.3",
    "description": "Enterohemorrhagic Escherichia coli infection"
  },
  {
    "code": "A04.4",
    "description": "Other intestinal Escherichia coli infections"
  },
  {
    "code": "A04.5",
    "description": "Campylobacter enteritis"
  },
  {
    "code": "A04.6",
    "description": "Enteritis due to Yersinia enterocolitica"
  },
  {
    "code": "A04.71",
    "description": "Enterocolitis due to Clostridium difficile, recurrent"
  },
  {
    "code": "A04.72",
    "description": "Enterocolitis due to Clostridium difficile, not specified as recurrent"
  },
  {
    "code": "A04.8",
    "description": "Other specified bacterial intestinal infections"
  },
  {
    "code": "A04.9",
    "description": "Bacterial intestinal infection, unspecified"
  },
  {
    "code": "A05.0",
    "description": "Foodborne staphylococcal intoxication"
  },
  {
    "code": "A05.1",
    "description": "Botulism food poisoning"
  },
  {
    "code": "A05.2",
    "description": "Foodborne Clostridium perfringens intoxication"
  },
  {
    "code": "A05.3",
    "description": "Foodborne Vibrio parahaemolyticus intoxication"
  },
  {
    "code": "A05.4",
    "description": "Foodborne Bacillus cereus intoxication"
  },
  {
    "code": "A05.8",
    "description": "Other specified bacterial foodborne intoxications"
  },
  {
    "code": "A05.9",
    "description": "Bacterial foodborne intoxication, unspecified"
  },
  {
    "code": "A06.0",
    "description": "Acute amebic dysentery"
  },
  {
    "code": "A06.1",
    "description": "Chronic intestinal amebiasis"
  },
  {
    "code": "A06.2",
    "description": "Amebic nondysenteric colitis"
  },
  {
    "code": "A06.3",
    "description": "Ameboma of intestine"
  },
  {
    "code": "A06.4",
    "description": "Amebic liver abscess"
  },
  {
    "code": "A06.5",
    "description": "Amebic lung abscess"
  },
  {
    "code": "A06.6",
    "description": "Amebic brain abscess"
  },
  {
    "code": "A06.7",
    "description": "Cutaneous amebiasis"
  },
  {
    "code": "A06.81",
    "description": "Amebic cystitis"
  },
  {
    "code": "A06.82",
    "description": "Other amebic genitourinary infections"
  },
  {
    "code": "A06.89",
    "description": "Other amebic infections"
  },
  {
    "code": "A06.9",
    "description": "Amebiasis, unspecified"
  },
  {
    "code": "A07.0",
    "description": "Balantidiasis"
  },
  {
    "code": "A07.1",
    "description": "Giardiasis [lambliasis]"
  },
  {
    "code": "A07.2",
    "description": "Cryptosporidiosis"
  },
  {
    "code": "A07.3",
    "description": "Isosporiasis"
  },
  {
    "code": "A07.4",
    "description": "Cyclosporiasis"
  },
  {
    "code": "A07.8",
    "description": "Other specified protozoal intestinal diseases"
  },
  {
    "code": "A07.9",
    "description": "Protozoal intestinal disease, unspecified"
  },
  {
    "code": "A08.0",
    "description": "Rotaviral enteritis"
  },
  {
    "code": "A08.11",
    "description": "Acute gastroenteropathy due to Norwalk agent"
  },
  {
    "code": "A08.19",
    "description": "Acute gastroenteropathy due to other small round viruses"
  },
  {
    "code": "A08.2",
    "description": "Adenoviral enteritis"
  },
  {
    "code": "A08.31",
    "description": "Calicivirus enteritis"
  },
  {
    "code": "A08.32",
    "description": "Astrovirus enteritis"
  },
  {
    "code": "A08.39",
    "description": "Other viral enteritis"
  },
  {
    "code": "A08.4",
    "description": "Viral intestinal infection, unspecified"
  },
  {
    "code": "A08.8",
    "description": "Other specified intestinal infections"
  },
  {
    "code": "A15.0",
    "description": "Tuberculosis of lung, confirmed by sputum microscopy with or without culture"
  },
  {
    "code": "A15.4",
    "description": "Tuberculosis of intrathoracic lymph nodes, confirmed bacteriologically and histologically"
  },
  {
    "code": "A15.5",
    "description": "Tuberculosis of larynx, trachea and bronchus, confirmed bacteriologically and histologically"
  },
  {
    "code": "A15.6",
    "description": "Tuberculous pleurisy, confirmed bacteriologically and histologically"
  },
  {
    "code": "A15.7",
    "description": "Primary respiratory tuberculosis, confirmed bacteriologically and histologically"
  },
  {
    "code": "A15.8",
    "description": "Other respiratory tuberculosis, confirmed bacteriologically and histologically"
  },
  {
    "code": "A15.9",
    "description": "Respiratory tuberculosis unspecified, confirmed bacteriologically and histologically"
  },
  {
    "code": "A17.0",
    "description": "Tuberculous meningitis"
  },
  {
    "code": "A17.1",
    "description": "Meningeal tuberculoma"
  },
  {
    "code": "A17.81",
    "description": "Tuberculoma of brain and spinal cord"
  },
  {
    "code": "A17.82",
    "description": "Tuberculous meningoencephalitis"
  },
  {
    "code": "A17.83",
    "description": "Tuberculous neuritis"
  },
  {
    "code": "A17.89",
    "description": "Other tuberculosis of nervous system"
  },
  {
    "code": "A17.9",
    "description": "Tuberculosis of nervous system, unspecified"
  },
  {
    "code": "A18.01",
    "description": "Tuberculosis of spine"
  },
  {
    "code": "A18.02",
    "description": "Tuberculous arthritis of other joints"
  },
  {
    "code": "A18.03",
    "description": "Tuberculosis of other bones"
  },
  {
    "code": "A18.09",
    "description": "Other musculoskeletal tuberculosis"
  },
  {
    "code": "A18.10",
    "description": "Tuberculosis of genitourinary system, unspecified"
  },
  {
    "code": "A18.11",
    "description": "Tuberculosis of kidney and ureter"
  },
  {
    "code": "A18.12",
    "description": "Tuberculosis of male genital organs"
  },
  {
    "code": "A18.13",
    "description": "Tuberculosis of female genital organs"
  },
  {
    "code": "A18.14",
    "description": "Tuberculosis of prostate"
  },
  {
    "code": "A18.15",
    "description": "Tuberculosis of cervix"
  },
  {
    "code": "A18.16",
    "description": "Tuberculosis of other urinary organs"
  },
  {
    "code": "A18.2",
    "description": "Tuberculous peripheral lymphadenopathy"
  },
  {
    "code": "A18.31",
    "description": "Tuberculous peritonitis"
  },
  {
    "code": "A18.32",
    "description": "Tuberculous enteritis"
  },
  {
    "code": "A18.39",
    "description": "Retroperitoneal tuberculosis"
  },
  {
    "code": "A18.4",
    "description": "Tuberculosis of skin and subcutaneous tissue"
  },
  {
    "code": "A18.50",
    "description": "Tuberculosis of eye, unspecified"
  },
  {
    "code": "A18.51",
    "description": "Tuberculous episcleritis"
  },
  {
    "code": "A18.52",
    "description": "Tuberculous keratitis"
  },
  {
    "code": "A18.53",
    "description": "Tuberculous chorioretinitis"
  },
  {
    "code": "A18.54",
    "description": "Tuberculous iridocyclitis"
  },
  {
    "code": "A18.59",
    "description": "Other tuberculosis of eye"
  },
  {
    "code": "A18.6",
    "description": "Tuberculosis of (inner) (middle) ear"
  },
  {
    "code": "A18.7",
    "description": "Tuberculosis of adrenal glands"
  },
  {
    "code": "A18.81",
    "description": "Tuberculosis of thyroid gland"
  },
  {
    "code": "A18.82",
    "description": "Tuberculosis of other endocrine glands"
  },
  {
    "code": "A18.83",
    "description": "Tuberculosis of digestive tract organs, not elsewhere classified"
  },
  {
    "code": "A18.84",
    "description": "Tuberculosis of heart"
  },
  {
    "code": "A18.85",
    "description": "Tuberculosis of spleen"
  },
  {
    "code": "A18.89",
    "description": "Tuberculosis of other sites"
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
    "code": "A19.8",
    "description": "Other miliary tuberculosis"
  },
  {
    "code": "A19.9",
    "description": "Miliary tuberculosis, unspecified"
  },
  {
    "code": "A20.0",
    "description": "Bubonic plague"
  },
  {
    "code": "A20.1",
    "description": "Cellulocutaneous plague"
  },
  {
    "code": "A20.2",
    "description": "Pneumonic plague"
  },
  {
    "code": "A20.3",
    "description": "Plague meningitis"
  },
  {
    "code": "A20.7",
    "description": "Septicemic plague"
  },
  {
    "code": "A20.8",
    "description": "Other forms of plague"
  },
  {
    "code": "A20.9",
    "description": "Plague, unspecified"
  },
  {
    "code": "A21.0",
    "description": "Ulceroglandular tularemia"
  },
  {
    "code": "A21.1",
    "description": "Oculoglandular tularemia"
  },
  {
    "code": "A21.2",
    "description": "Pulmonary tularemia"
  },
  {
    "code": "A21.3",
    "description": "Gastrointestinal tularemia"
  },
  {
    "code": "A21.7",
    "description": "Generalized tularemia"
  },
  {
    "code": "A21.8",
    "description": "Other forms of tularemia"
  },
  {
    "code": "A21.9",
    "description": "Tularemia, unspecified"
  },
  {
    "code": "A22.0",
    "description": "Cutaneous anthrax"
  },
  {
    "code": "A22.1",
    "description": "Pulmonary anthrax"
  },
  {
    "code": "A22.2",
    "description": "Gastrointestinal anthrax"
  },
  {
    "code": "A22.7",
    "description": "Anthrax sepsis"
  },
  {
    "code": "A22.8",
    "description": "Other forms of anthrax"
  },
  {
    "code": "A22.9",
    "description": "Anthrax, unspecified"
  },
  {
    "code": "A23.0",
    "description": "Brucellosis due to Brucella melitensis"
  },
  {
    "code": "A23.1",
    "description": "Brucellosis due to Brucella abortus"
  },
  {
    "code": "A23.2",
    "description": "Brucellosis due to Brucella suis"
  },
  {
    "code": "A23.3",
    "description": "Brucellosis due to Brucella canis"
  },
  {
    "code": "A23.8",
    "description": "Other brucellosis"
  },
  {
    "code": "A23.9",
    "description": "Brucellosis, unspecified"
  },
  {
    "code": "A24.0",
    "description": "Glanders"
  },
  {
    "code": "A24.1",
    "description": "Acute and fulminating melioidosis"
  },
  {
    "code": "A24.2",
    "description": "Subacute and chronic melioidosis"
  },
  {
    "code": "A24.3",
    "description": "Other melioidosis"
  },
  {
    "code": "A24.4",
    "description": "Melioidosis, unspecified"
  },
  {
    "code": "A25.0",
    "description": "Spirillosis"
  },
  {
    "code": "A25.1",
    "description": "Streptobacillosis"
  },
  {
    "code": "A25.9",
    "description": "Rat-bite fever, unspecified"
  },
  {
    "code": "A26.0",
    "description": "Cutaneous erysipeloid"
  },
  {
    "code": "A26.7",
    "description": "Erysipelothrix sepsis"
  },
  {
    "code": "A26.8",
    "description": "Other forms of erysipeloid"
  },
  {
    "code": "A26.9",
    "description": "Erysipeloid, unspecified"
  },
  {
    "code": "A27.0",
    "description": "Leptospirosis icterohemorrhagica"
  },
  {
    "code": "A27.81",
    "description": "Aseptic meningitis in leptospirosis"
  },
  {
    "code": "A27.89",
    "description": "Other forms of leptospirosis"
  },
  {
    "code": "A27.9",
    "description": "Leptospirosis, unspecified"
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
    "code": "A28.2",
    "description": "Extraintestinal yersiniosis"
  },
  {
    "code": "A28.8",
    "description": "Other specified zoonotic bacterial diseases, not elsewhere classified"
  },
  {
    "code": "A28.9",
    "description": "Zoonotic bacterial disease, unspecified"
  },
  {
    "code": "A30.0",
    "description": "Indeterminate leprosy"
  },
  {
    "code": "A30.1",
    "description": "Tuberculoid leprosy"
  },
  {
    "code": "A30.2",
    "description": "Borderline tuberculoid leprosy"
  },
  {
    "code": "A30.3",
    "description": "Borderline leprosy"
  },
  {
    "code": "A30.4",
    "description": "Borderline lepromatous leprosy"
  },
  {
    "code": "A30.5",
    "description": "Lepromatous leprosy"
  },
  {
    "code": "A30.8",
    "description": "Other forms of leprosy"
  },
  {
    "code": "A30.9",
    "description": "Leprosy, unspecified"
  },
  {
    "code": "A31.0",
    "description": "Pulmonary mycobacterial infection"
  },
  {
    "code": "A31.1",
    "description": "Cutaneous mycobacterial infection"
  },
  {
    "code": "A31.2",
    "description": "Disseminated mycobacterium avium-intracellulare complex (MAC) infection"
  },
  {
    "code": "A31.8",
    "description": "Other mycobacterial infections"
  },
  {
    "code": "A31.9",
    "description": "Mycobacterial infection, unspecified"
  },
  {
    "code": "A32.0",
    "description": "Cutaneous listeriosis"
  },
  {
    "code": "A32.11",
    "description": "Listerial meningitis"
  },
  {
    "code": "A32.12",
    "description": "Listerial meningoencephalitis"
  },
  {
    "code": "A32.7",
    "description": "Listerial sepsis"
  },
  {
    "code": "A32.81",
    "description": "Oculoglandular listeriosis"
  },
  {
    "code": "A32.82",
    "description": "Listerial endocarditis"
  },
  {
    "code": "A32.89",
    "description": "Other forms of listeriosis"
  },
  {
    "code": "A32.9",
    "description": "Listeriosis, unspecified"
  },
  {
    "code": "A33",
    "description": "Tetanus neonatorum"
  },
  {
    "code": "A34",
    "description": "Obstetrical tetanus"
  },
  {
    "code": "A35",
    "description": "Other tetanus"
  },
  {
    "code": "A36.0",
    "description": "Pharyngeal diphtheria"
  },
  {
    "code": "A36.1",
    "description": "Nasopharyngeal diphtheria"
  },
  {
    "code": "A36.2",
    "description": "Laryngeal diphtheria"
  },
  {
    "code": "A36.3",
    "description": "Cutaneous diphtheria"
  },
  {
    "code": "A36.81",
    "description": "Diphtheritic cardiomyopathy"
  },
  {
    "code": "A36.82",
    "description": "Diphtheritic radiculomyelitis"
  },
  {
    "code": "A36.83",
    "description": "Diphtheritic polyneuritis"
  },
  {
    "code": "A36.84",
    "description": "Diphtheritic tubulo-interstitial nephropathy"
  },
  {
    "code": "A36.85",
    "description": "Diphtheritic cystitis"
  },
  {
    "code": "A36.86",
    "description": "Diphtheritic conjunctivitis"
  },
  {
    "code": "A36.89",
    "description": "Other diphtheritic complications"
  },
  {
    "code": "A36.9",
    "description": "Diphtheria, unspecified"
  },
  {
    "code": "A37.00",
    "description": "Whooping cough due to Bordetella pertussis without pneumonia"
  },
  {
    "code": "A37.01",
    "description": "Whooping cough due to Bordetella pertussis with pneumonia"
  },
  {
    "code": "A37.10",
    "description": "Whooping cough due to Bordetella parapertussis without pneumonia"
  },
  {
    "code": "A37.11",
    "description": "Whooping cough due to Bordetella parapertussis with pneumonia"
  },
  {
    "code": "A37.80",
    "description": "Whooping cough due to other Bordetella species without pneumonia"
  },
  {
    "code": "A37.81",
    "description": "Whooping cough due to other Bordetella species with pneumonia"
  },
  {
    "code": "A37.90",
    "description": "Whooping cough, unspecified species without pneumonia"
  },
  {
    "code": "A37.91",
    "description": "Whooping cough, unspecified species with pneumonia"
  },
  {
    "code": "A38.0",
    "description": "Scarlet fever with otitis media"
  },
  {
    "code": "A38.1",
    "description": "Scarlet fever with myocarditis"
  },
  {
    "code": "A38.8",
    "description": "Scarlet fever with other complications"
  },
  {
    "code": "A38.9",
    "description": "Scarlet fever, uncomplicated"
  },
  {
    "code": "A39.0",
    "description": "Meningococcal meningitis"
  },
  {
    "code": "A39.1",
    "description": "Waterhouse-Friderichsen syndrome"
  },
  {
    "code": "A39.2",
    "description": "Acute meningococcemia"
  },
  {
    "code": "A39.3",
    "description": "Chronic meningococcemia"
  },
  {
    "code": "A39.4",
    "description": "Meningococcemia, unspecified"
  },
  {
    "code": "A39.50",
    "description": "Meningococcal carditis, unspecified"
  },
  {
    "code": "A39.51",
    "description": "Meningococcal endocarditis"
  },
  {
    "code": "A39.52",
    "description": "Meningococcal myocarditis"
  },
  {
    "code": "A39.53",
    "description": "Meningococcal pericarditis"
  },
  {
    "code": "A39.81",
    "description": "Meningococcal encephalitis"
  },
  {
    "code": "A39.82",
    "description": "Meningococcal retrobulbar neuritis"
  },
  {
    "code": "A39.83",
    "description": "Meningococcal arthritis"
  },
  {
    "code": "A39.84",
    "description": "Postmeningococcal arthritis"
  },
  {
    "code": "A39.89",
    "description": "Other meningococcal infections"
  },
  {
    "code": "A39.9",
    "description": "Meningococcal infection, unspecified"
  },
  {
    "code": "A40.0",
    "description": "Sepsis due to streptococcus, group A"
  },
  {
    "code": "A40.1",
    "description": "Sepsis due to streptococcus, group B"
  },
  {
    "code": "A40.3",
    "description": "Sepsis due to Streptococcus pneumoniae"
  },
  {
    "code": "A40.8",
    "description": "Other streptococcal sepsis"
  },
  {
    "code": "A40.9",
    "description": "Streptococcal sepsis, unspecified"
  },
  {
    "code": "A41.01",
    "description": "Sepsis due to Methicillin susceptible Staphylococcus aureus"
  },
  {
    "code": "A41.02",
    "description": "Sepsis due to Methicillin resistant Staphylococcus aureus"
  },
  {
    "code": "A41.1",
    "description": "Sepsis due to other specified staphylococcus"
  },
  {
    "code": "A41.2",
    "description": "Sepsis due to unspecified staphylococcus"
  },
  {
    "code": "A41.3",
    "description": "Sepsis due to Hemophilus influenzae"
  },
  {
    "code": "A41.4",
    "description": "Sepsis due to anaerobes"
  },
  {
    "code": "A41.50",
    "description": "Gram-negative sepsis, unspecified"
  },
  {
    "code": "A41.51",
    "description": "Sepsis due to Escherichia coli [E. coli]"
  },
  {
    "code": "A41.52",
    "description": "Sepsis due to Pseudomonas"
  },
  {
    "code": "A41.53",
    "description": "Sepsis due to Serratia"
  },
  {
    "code": "A41.59",
    "description": "Other Gram-negative sepsis"
  },
  {
    "code": "A41.81",
    "description": "Sepsis due to Enterococcus"
  },
  {
    "code": "A41.89",
    "description": "Other specified sepsis"
  },
  {
    "code": "A41.9",
    "description": "Sepsis, unspecified organism"
  },
  {
    "code": "A42.0",
    "description": "Pulmonary actinomycosis"
  },
  {
    "code": "A42.1",
    "description": "Abdominal actinomycosis"
  },
  {
    "code": "A42.2",
    "description": "Cervicofacial actinomycosis"
  },
  {
    "code": "A42.7",
    "description": "Actinomycotic sepsis"
  },
  {
    "code": "A42.81",
    "description": "Actinomycotic meningitis"
  },
  {
    "code": "A42.82",
    "description": "Actinomycotic encephalitis"
  },
  {
    "code": "A42.89",
    "description": "Other forms of actinomycosis"
  },
  {
    "code": "A42.9",
    "description": "Actinomycosis, unspecified"
  },
  {
    "code": "A43.0",
    "description": "Pulmonary nocardiosis"
  },
  {
    "code": "A43.1",
    "description": "Cutaneous nocardiosis"
  },
  {
    "code": "A43.8",
    "description": "Other forms of nocardiosis"
  },
  {
    "code": "A43.9",
    "description": "Nocardiosis, unspecified"
  },
  {
    "code": "A44.0",
    "description": "Systemic bartonellosis"
  },
  {
    "code": "A44.1",
    "description": "Cutaneous and mucocutaneous bartonellosis"
  },
  {
    "code": "A44.8",
    "description": "Other forms of bartonellosis"
  },
  {
    "code": "A44.9",
    "description": "Bartonellosis, unspecified"
  },
  {
    "code": "A46",
    "description": "Erysipelas"
  },
  {
    "code": "A48.0",
    "description": "Gas gangrene"
  },
  {
    "code": "A48.1",
    "description": "Legionnaires' disease"
  },
  {
    "code": "A48.2",
    "description": "Nonpneumonic Legionnaires' disease [Pontiac fever]"
  },
  {
    "code": "A48.3",
    "description": "Toxic shock syndrome"
  },
  {
    "code": "A48.4",
    "description": "Brazilian purpuric fever"
  },
  {
    "code": "A48.51",
    "description": "Infant botulism"
  },
  {
    "code": "A48.52",
    "description": "Wound botulism"
  },
  {
    "code": "A48.8",
    "description": "Other specified bacterial diseases"
  },
  {
    "code": "A49.01",
    "description": "Methicillin susceptible Staphylococcus aureus infection, unspecified site"
  },
  {
    "code": "A49.02",
    "description": "Methicillin resistant Staphylococcus aureus infection, unspecified site"
  },
  {
    "code": "A49.1",
    "description": "Streptococcal infection, unspecified site"
  },
  {
    "code": "A49.2",
    "description": "Hemophilus influenzae infection, unspecified site"
  },
  {
    "code": "A49.3",
    "description": "Mycoplasma infection, unspecified site"
  },
  {
    "code": "A49.8",
    "description": "Other bacterial infections of unspecified site"
  },
  {
    "code": "A49.9",
    "description": "Bacterial infection, unspecified"
  },
  {
    "code": "A50.01",
    "description": "Early congenital syphilitic oculopathy"
  },
  {
    "code": "A50.02",
    "description": "Early congenital syphilitic osteochondritis"
  },
  {
    "code": "A50.03",
    "description": "Early congenital syphilitic pharyngitis"
  },
  {
    "code": "A50.04",
    "description": "Early congenital syphilitic pneumonia"
  },
  {
    "code": "A50.05",
    "description": "Early congenital syphilitic rhinitis"
  },
  {
    "code": "A50.06",
    "description": "Early congenital cutaneous syphilis"
  },
  {
    "code": "A50.07",
    "description": "Early congenital syphilis of mucocutaneous tissue"
  },
  {
    "code": "A50.08",
    "description": "Early congenital syphilis of solid organs"
  },
  {
    "code": "A50.09",
    "description": "Other early congenital syphilis, symptomatic"
  },
  {
    "code": "A50.1",
    "description": "Early congenital syphilis, latent"
  },
  {
    "code": "A50.2",
    "description": "Early congenital syphilis, unspecified"
  },
  {
    "code": "A50.30",
    "description": "Late congenital syphilitic oculopathy, unspecified"
  },
  {
    "code": "A50.31",
    "description": "Late congenital syphilitic interstitial keratitis"
  },
  {
    "code": "A50.32",
    "description": "Late congenital syphilitic chorioretinitis"
  },
  {
    "code": "A50.39",
    "description": "Other late congenital syphilitic oculopathy"
  },
  {
    "code": "A50.40",
    "description": "Late congenital neurosyphilis, unspecified"
  },
  {
    "code": "A50.41",
    "description": "Late congenital syphilitic meningitis"
  },
  {
    "code": "A50.42",
    "description": "Late congenital syphilitic encephalitis"
  },
  {
    "code": "A50.43",
    "description": "Late congenital syphilitic polyneuropathy"
  },
  {
    "code": "A50.44",
    "description": "Late congenital syphilitic optic nerve atrophy"
  },
  {
    "code": "A50.45",
    "description": "Juvenile general paresis"
  },
  {
    "code": "A50.49",
    "description": "Other late congenital neurosyphilis"
  },
  {
    "code": "A50.51",
    "description": "Clutton's joints"
  },
  {
    "code": "A50.52",
    "description": "Hutchinson's teeth"
  },
  {
    "code": "A50.53",
    "description": "Hutchinson's triad"
  },
  {
    "code": "A50.54",
    "description": "Late congenital cardiovascular syphilis"
  },
  {
    "code": "A50.55",
    "description": "Late congenital syphilitic arthropathy"
  },
  {
    "code": "A50.56",
    "description": "Late congenital syphilitic osteochondropathy"
  },
  {
    "code": "A50.57",
    "description": "Syphilitic saddle nose"
  },
  {
    "code": "A50.59",
    "description": "Other late congenital syphilis, symptomatic"
  },
  {
    "code": "A50.6",
    "description": "Late congenital syphilis, latent"
  },
  {
    "code": "A50.7",
    "description": "Late congenital syphilis, unspecified"
  },
  {
    "code": "A50.9",
    "description": "Congenital syphilis, unspecified"
  },
  {
    "code": "A51.0",
    "description": "Primary genital syphilis"
  },
  {
    "code": "A51.1",
    "description": "Primary anal syphilis"
  },
  {
    "code": "A51.2",
    "description": "Primary syphilis of other sites"
  },
  {
    "code": "A51.31",
    "description": "Condyloma latum"
  },
  {
    "code": "A51.32",
    "description": "Syphilitic alopecia"
  },
  {
    "code": "A51.39",
    "description": "Other secondary syphilis of skin and mucocutaneous tissue"
  },
  {
    "code": "A51.41",
    "description": "Secondary syphilitic meningitis"
  },
  {
    "code": "A51.42",
    "description": "Secondary syphilitic female pelvic disease"
  },
  {
    "code": "A51.43",
    "description": "Secondary syphilitic oculopathy"
  },
  {
    "code": "A51.44",
    "description": "Secondary syphilitic nephritis"
  },
  {
    "code": "A51.45",
    "description": "Secondary syphilitic hepatitis"
  },
  {
    "code": "A51.46",
    "description": "Secondary syphilitic osteopathy"
  },
  {
    "code": "A51.49",
    "description": "Other secondary syphilitic conditions"
  },
  {
    "code": "A51.5",
    "description": "Early syphilis, latent"
  },
  {
    "code": "A51.9",
    "description": "Early syphilis, unspecified"
  },
  {
    "code": "A52.00",
    "description": "Cardiovascular syphilis, unspecified"
  },
  {
    "code": "A52.01",
    "description": "Syphilitic aneurysm of aorta"
  },
  {
    "code": "A52.02",
    "description": "Syphilitic aortitis"
  },
  {
    "code": "A52.03",
    "description": "Syphilitic endocarditis"
  },
  {
    "code": "A52.04",
    "description": "Syphilitic cerebral arteritis"
  },
  {
    "code": "A52.05",
    "description": "Other cerebrovascular syphilis"
  },
  {
    "code": "A52.06",
    "description": "Other syphilitic heart involvement"
  },
  {
    "code": "A52.09",
    "description": "Other cardiovascular syphilis"
  },
  {
    "code": "A52.10",
    "description": "Symptomatic neurosyphilis, unspecified"
  },
  {
    "code": "A52.11",
    "description": "Tabes dorsalis"
  },
  {
    "code": "A52.12",
    "description": "Other cerebrospinal syphilis"
  },
  {
    "code": "A52.13",
    "description": "Late syphilitic meningitis"
  },
  {
    "code": "A52.14",
    "description": "Late syphilitic encephalitis"
  },
  {
    "code": "A52.15",
    "description": "Late syphilitic neuropathy"
  },
  {
    "code": "A52.16",
    "description": "Charcot's arthropathy (tabetic)"
  },
  {
    "code": "A52.17",
    "description": "General paresis"
  },
  {
    "code": "A52.19",
    "description": "Other symptomatic neurosyphilis"
  },
  {
    "code": "A52.2",
    "description": "Asymptomatic neurosyphilis"
  },
  {
    "code": "A52.3",
    "description": "Neurosyphilis, unspecified"
  },
  {
    "code": "A52.71",
    "description": "Late syphilitic oculopathy"
  },
  {
    "code": "A52.72",
    "description": "Syphilis of lung and bronchus"
  },
  {
    "code": "A52.73",
    "description": "Symptomatic late syphilis of other respiratory organs"
  },
  {
    "code": "A52.74",
    "description": "Syphilis of liver and other digestive organs"
  },
  {
    "code": "A52.75",
    "description": "Syphilis of kidney and ureter"
  },
  {
    "code": "A52.76",
    "description": "Syphilis of other genitourinary organs"
  },
  {
    "code": "A52.77",
    "description": "Syphilis of bone and joint"
  },
  {
    "code": "A52.78",
    "description": "Syphilis of other musculoskeletal tissue"
  },
  {
    "code": "A52.79",
    "description": "Other symptomatic late syphilis"
  },
  {
    "code": "A52.8",
    "description": "Late syphilis, latent"
  },
  {
    "code": "A52.9",
    "description": "Late syphilis, unspecified"
  },
  {
    "code": "A53.0",
    "description": "Latent syphilis, unspecified as early or late"
  },
  {
    "code": "A53.9",
    "description": "Syphilis, unspecified"
  },
  {
    "code": "A54.00",
    "description": "Gonococcal infection of lower genitourinary tract, unspecified"
  },
  {
    "code": "A54.01",
    "description": "Gonococcal cystitis and urethritis, unspecified"
  },
  {
    "code": "A54.02",
    "description": "Gonococcal vulvovaginitis, unspecified"
  },
  {
    "code": "A54.03",
    "description": "Gonococcal cervicitis, unspecified"
  },
  {
    "code": "A54.09",
    "description": "Other gonococcal infection of lower genitourinary tract"
  },
  {
    "code": "A54.1",
    "description": "Gonococcal infection of lower genitourinary tract with periurethral and accessory gland abscess"
  },
  {
    "code": "A54.21",
    "description": "Gonococcal infection of kidney and ureter"
  },
  {
    "code": "A54.22",
    "description": "Gonococcal prostatitis"
  },
  {
    "code": "A54.23",
    "description": "Gonococcal infection of other male genital organs"
  },
  {
    "code": "A54.24",
    "description": "Gonococcal female pelvic inflammatory disease"
  },
  {
    "code": "A54.29",
    "description": "Other gonococcal genitourinary infections"
  },
  {
    "code": "A54.30",
    "description": "Gonococcal infection of eye, unspecified"
  },
  {
    "code": "A54.31",
    "description": "Gonococcal conjunctivitis"
  },
  {
    "code": "A54.32",
    "description": "Gonococcal iridocyclitis"
  },
  {
    "code": "A54.33",
    "description": "Gonococcal keratitis"
  },
  {
    "code": "A54.39",
    "description": "Other gonococcal eye infection"
  },
  {
    "code": "A54.40",
    "description": "Gonococcal infection of musculoskeletal system, unspecified"
  },
  {
    "code": "A54.41",
    "description": "Gonococcal spondylopathy"
  },
  {
    "code": "A54.42",
    "description": "Gonococcal arthritis"
  },
  {
    "code": "A54.43",
    "description": "Gonococcal osteomyelitis"
  },
  {
    "code": "A54.49",
    "description": "Gonococcal infection of other musculoskeletal tissue"
  },
  {
    "code": "A54.5",
    "description": "Gonococcal pharyngitis"
  },
  {
    "code": "A54.6",
    "description": "Gonococcal infection of anus and rectum"
  },
  {
    "code": "A54.81",
    "description": "Gonococcal meningitis"
  },
  {
    "code": "A54.82",
    "description": "Gonococcal brain abscess"
  },
  {
    "code": "A54.83",
    "description": "Gonococcal heart infection"
  },
  {
    "code": "A54.84",
    "description": "Gonococcal pneumonia"
  },
  {
    "code": "A54.85",
    "description": "Gonococcal peritonitis"
  },
  {
    "code": "A54.86",
    "description": "Gonococcal sepsis"
  },
  {
    "code": "A54.89",
    "description": "Other gonococcal infections"
  },
  {
    "code": "A54.9",
    "description": "Gonococcal infection, unspecified"
  },
  {
    "code": "A55",
    "description": "Chlamydial lymphogranuloma (venereum)"
  },
  {
    "code": "A56.00",
    "description": "Chlamydial infection of lower genitourinary tract, unspecified"
  },
  {
    "code": "A56.01",
    "description": "Chlamydial cystitis and urethritis"
  },
  {
    "code": "A56.02",
    "description": "Chlamydial vulvovaginitis"
  },
  {
    "code": "A56.09",
    "description": "Other chlamydial infection of lower genitourinary tract"
  },
  {
    "code": "A56.11",
    "description": "Chlamydial female pelvic inflammatory disease"
  },
  {
    "code": "A56.19",
    "description": "Other chlamydial genitourinary infections"
  },
  {
    "code": "A56.2",
    "description": "Chlamydial infection of genitourinary tract, unspecified"
  },
  {
    "code": "A56.3",
    "description": "Chlamydial infection of anus and rectum"
  },
  {
    "code": "A56.4",
    "description": "Chlamydial infection of pharynx"
  },
  {
    "code": "A56.8",
    "description": "Sexually transmitted chlamydial infection of other sites"
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
    "code": "A59.00",
    "description": "Urogenital trichomoniasis, unspecified"
  },
  {
    "code": "A59.01",
    "description": "Trichomonal vulvovaginitis"
  },
  {
    "code": "A59.02",
    "description": "Trichomonal prostatitis"
  },
  {
    "code": "A59.03",
    "description": "Trichomonal cystitis and urethritis"
  },
  {
    "code": "A59.09",
    "description": "Other urogenital trichomoniasis"
  },
  {
    "code": "A59.8",
    "description": "Trichomoniasis of other sites"
  },
  {
    "code": "A59.9",
    "description": "Trichomoniasis, unspecified"
  },
  {
    "code": "A60.00",
    "description": "Herpesviral infection of urogenital system, unspecified"
  },
  {
    "code": "A60.01",
    "description": "Herpesviral infection of penis"
  },
  {
    "code": "A60.02",
    "description": "Herpesviral infection of other male genital organs"
  },
  {
    "code": "A60.03",
    "description": "Herpesviral cervicitis"
  },
  {
    "code": "A60.04",
    "description": "Herpesviral vulvovaginitis"
  },
  {
    "code": "A60.09",
    "description": "Herpesviral infection of other urogenital tract"
  },
  {
    "code": "A60.1",
    "description": "Herpesviral infection of perianal skin and rectum"
  },
  {
    "code": "A60.9",
    "description": "Anogenital herpesviral infection, unspecified"
  },
  {
    "code": "A63.0",
    "description": "Anogenital (venereal) warts"
  },
  {
    "code": "A63.8",
    "description": "Other specified predominantly sexually transmitted diseases"
  },
  {
    "code": "A64",
    "description": "Unspecified sexually transmitted disease"
  },
  {
    "code": "A65",
    "description": "Nonvenereal syphilis"
  },
  {
    "code": "A66.0",
    "description": "Initial lesions of yaws"
  },
  {
    "code": "A66.1",
    "description": "Multiple papillomata and wet crab yaws"
  },
  {
    "code": "A66.2",
    "description": "Other early skin lesions of yaws"
  },
  {
    "code": "A66.3",
    "description": "Hyperkeratosis of yaws"
  },
  {
    "code": "A66.4",
    "description": "Gummata and ulcers of yaws"
  },
  {
    "code": "A66.5",
    "description": "Gangosa"
  },
  {
    "code": "A66.6",
    "description": "Bone and joint lesions of yaws"
  },
  {
    "code": "A66.7",
    "description": "Other manifestations of yaws"
  },
  {
    "code": "A66.8",
    "description": "Latent yaws"
  },
  {
    "code": "A66.9",
    "description": "Yaws, unspecified"
  },
  {
    "code": "A67.0",
    "description": "Primary lesions of pinta"
  },
  {
    "code": "A67.1",
    "description": "Intermediate lesions of pinta"
  },
  {
    "code": "A67.2",
    "description": "Late lesions of pinta"
  },
  {
    "code": "A67.3",
    "description": "Mixed lesions of pinta"
  },
  {
    "code": "A67.9",
    "description": "Pinta, unspecified"
  },
  {
    "code": "A68.0",
    "description": "Louse-borne relapsing fever"
  },
  {
    "code": "A68.1",
    "description": "Tick-borne relapsing fever"
  },
  {
    "code": "A68.9",
    "description": "Relapsing fever, unspecified"
  },
  {
    "code": "A69.0",
    "description": "Necrotizing ulcerative stomatitis"
  },
  {
    "code": "A69.1",
    "description": "Other Vincent's infections"
  },
  {
    "code": "A69.20",
    "description": "Lyme disease, unspecified"
  },
  {
    "code": "A69.21",
    "description": "Meningitis due to Lyme disease"
  },
  {
    "code": "A69.22",
    "description": "Other neurologic disorders in Lyme disease"
  },
  {
    "code": "A69.23",
    "description": "Arthritis due to Lyme disease"
  },
  {
    "code": "A69.29",
    "description": "Other conditions associated with Lyme disease"
  },
  {
    "code": "A69.8",
    "description": "Other specified spirochetal infections"
  },
  {
    "code": "A69.9",
    "description": "Spirochetal infection, unspecified"
  },
  {
    "code": "A70",
    "description": "Chlamydia psittaci infection"
  },
  {
    "code": "A71.0",
    "description": "Initial stage of trachoma"
  },
  {
    "code": "A71.1",
    "description": "Active stage of trachoma"
  },
  {
    "code": "A71.9",
    "description": "Trachoma, unspecified"
  },
  {
    "code": "A74.0",
    "description": "Chlamydial conjunctivitis"
  },
  {
    "code": "A74.81",
    "description": "Chlamydial peritonitis"
  },
  {
    "code": "A74.89",
    "description": "Other chlamydial diseases"
  },
  {
    "code": "A74.9",
    "description": "Chlamydial infection, unspecified"
  },
  {
    "code": "A75.0",
    "description": "Epidemic louse-borne typhus fever due to Rickettsia prowazekii"
  },
  {
    "code": "A75.1",
    "description": "Recrudescent typhus [Brill's disease]"
  },
  {
    "code": "A75.2",
    "description": "Typhus fever due to Rickettsia typhi"
  },
  {
    "code": "A75.3",
    "description": "Typhus fever due to Rickettsia tsutsugamushi"
  },
  {
    "code": "A75.9",
    "description": "Typhus fever, unspecified"
  },
  {
    "code": "A77.0",
    "description": "Spotted fever due to Rickettsia rickettsii"
  },
  {
    "code": "A77.1",
    "description": "Spotted fever due to Rickettsia conorii"
  },
  {
    "code": "A77.2",
    "description": "Spotted fever due to Rickettsia siberica"
  },
  {
    "code": "A77.3",
    "description": "Spotted fever due to Rickettsia australis"
  },
  {
    "code": "A77.40",
    "description": "Ehrlichiosis, unspecified"
  },
  {
    "code": "A77.41",
    "description": "Ehrlichiosis chafeensis"
  },
  {
    "code": "A77.49",
    "description": "Other ehrlichiosis"
  },
  {
    "code": "A77.8",
    "description": "Other spotted fevers"
  },
  {
    "code": "A77.9",
    "description": "Spotted fever, unspecified"
  },
  {
    "code": "A78",
    "description": "Q fever"
  },
  {
    "code": "A79.0",
    "description": "Trench fever"
  },
  {
    "code": "A79.1",
    "description": "Rickettsialpox due to Rickettsia akari"
  },
  {
    "code": "A79.81",
    "description": "Rickettsiosis due to Ehrlichia sennetsu"
  },
  {
    "code": "A79.89",
    "description": "Other specified rickettsioses"
  },
  {
    "code": "A79.9",
    "description": "Rickettsiosis, unspecified"
  },
  {
    "code": "A80.0",
    "description": "Acute paralytic poliomyelitis, vaccine-associated"
  },
  {
    "code": "A80.1",
    "description": "Acute paralytic poliomyelitis, wild virus, imported"
  },
  {
    "code": "A80.2",
    "description": "Acute paralytic poliomyelitis, wild virus, indigenous"
  },
  {
    "code": "A80.30",
    "description": "Acute paralytic poliomyelitis, unspecified"
  },
  {
    "code": "A80.39",
    "description": "Other acute paralytic poliomyelitis"
  },
  {
    "code": "A80.4",
    "description": "Acute nonparalytic poliomyelitis"
  },
  {
    "code": "A80.9",
    "description": "Acute poliomyelitis, unspecified"
  },
  {
    "code": "A81.00",
    "description": "Creutzfeldt-Jakob disease, unspecified"
  },
  {
    "code": "A81.01",
    "description": "Variant Creutzfeldt-Jakob disease"
  },
  {
    "code": "A81.09",
    "description": "Other Creutzfeldt-Jakob disease"
  },
  {
    "code": "A81.1",
    "description": "Subacute sclerosing panencephalitis"
  },
  {
    "code": "A81.2",
    "description": "Progressive multifocal leukoencephalopathy"
  },
  {
    "code": "A81.81",
    "description": "Kuru"
  },
  {
    "code": "A81.82",
    "description": "Fatal familial insomnia"
  },
  {
    "code": "A81.83",
    "description": "Gerstmann-Straussler-Scheinker syndrome"
  },
  {
    "code": "A81.89",
    "description": "Other atypical virus infections of central nervous system"
  },
  {
    "code": "A81.9",
    "description": "Atypical virus infection of central nervous system, unspecified"
  },
  {
    "code": "A82.0",
    "description": "Sylvatic rabies"
  },
  {
    "code": "A82.1",
    "description": "Urban rabies"
  },
  {
    "code": "A82.9",
    "description": "Rabies, unspecified"
  },
  {
    "code": "A83.0",
    "description": "Japanese encephalitis"
  },
  {
    "code": "A83.1",
    "description": "Western equine encephalitis"
  },
  {
    "code": "A83.2",
    "description": "Eastern equine encephalitis"
  },
  {
    "code": "A83.3",
    "description": "St Louis encephalitis"
  },
  {
    "code": "A83.4",
    "description": "Australian encephalitis"
  },
  {
    "code": "A83.5",
    "description": "California encephalitis"
  },
  {
    "code": "A83.6",
    "description": "Rocio virus disease"
  },
  {
    "code": "A83.8",
    "description": "Other mosquito-borne viral encephalitis"
  },
  {
    "code": "A83.9",
    "description": "Mosquito-borne viral encephalitis, unspecified"
  },
  {
    "code": "A84.0",
    "description": "Far Eastern tick-borne encephalitis"
  },
  {
    "code": "A84.1",
    "description": "Central European tick-borne encephalitis"
  },
  {
    "code": "A84.8",
    "description": "Other tick-borne viral encephalitis"
  },
  {
    "code": "A84.9",
    "description": "Tick-borne viral encephalitis, unspecified"
  },
  {
    "code": "A85.0",
    "description": "Enteroviral encephalitis"
  },
  {
    "code": "A85.1",
    "description": "Adenoviral encephalitis"
  },
  {
    "code": "A85.2",
    "description": "Arthropod-borne viral encephalitis, unspecified"
  },
  {
    "code": "A85.8",
    "description": "Other specified viral encephalitis"
  },
  {
    "code": "A86",
    "description": "Unspecified viral encephalitis"
  },
  {
    "code": "A87.0",
    "description": "Enteroviral meningitis"
  },
  {
    "code": "A87.1",
    "description": "Adenoviral meningitis"
  },
  {
    "code": "A87.2",
    "description": "Lymphocytic choriomeningitis"
  },
  {
    "code": "A87.8",
    "description": "Other viral meningitis"
  },
  {
    "code": "A87.9",
    "description": "Viral meningitis, unspecified"
  },
  {
    "code": "A88.0",
    "description": "Enteroviral exanthematous fever [Boston exanthem]"
  },
  {
    "code": "A88.1",
    "description": "Epidemic vertigo"
  },
  {
    "code": "A88.8",
    "description": "Other specified viral infections of central nervous system"
  },
  {
    "code": "A89",
    "description": "Unspecified viral infection of central nervous system"
  },
  {
    "code": "A90",
    "description": "Dengue fever [classical dengue]"
  },
  {
    "code": "A91",
    "description": "Dengue hemorrhagic fever"
  },
  {
    "code": "A92.0",
    "description": "Chikungunya virus disease"
  },
  {
    "code": "A92.1",
    "description": "O'nyong-nyong fever"
  },
  {
    "code": "A92.2",
    "description": "Venezuelan equine fever"
  },
  {
    "code": "A92.30",
    "description": "West Nile virus infection, unspecified"
  },
  {
    "code": "A92.31",
    "description": "West Nile virus infection with encephalitis"
  },
  {
    "code": "A92.32",
    "description": "West Nile virus infection with other neurologic manifestation"
  },
  {
    "code": "A92.39",
    "description": "West Nile virus infection with other complications"
  },
  {
    "code": "A92.4",
    "description": "Rift Valley fever"
  },
  {
    "code": "A92.5",
    "description": "Zika virus disease"
  },
  {
    "code": "A92.8",
    "description": "Other specified mosquito-borne viral fevers"
  },
  {
    "code": "A92.9",
    "description": "Mosquito-borne viral fever, unspecified"
  },
  {
    "code": "A93.0",
    "description": "Oropouche virus disease"
  },
  {
    "code": "A93.1",
    "description": "Sandfly fever"
  },
  {
    "code": "A93.2",
    "description": "Colorado tick fever"
  },
  {
    "code": "A93.8",
    "description": "Other specified arthropod-borne viral fevers"
  },
  {
    "code": "A94",
    "description": "Unspecified arthropod-borne viral fever"
  },
  {
    "code": "A95.0",
    "description": "Sylvatic yellow fever"
  },
  {
    "code": "A95.1",
    "description": "Urban yellow fever"
  },
  {
    "code": "A95.9",
    "description": "Yellow fever, unspecified"
  },
  {
    "code": "A96.0",
    "description": "Junin hemorrhagic fever"
  },
  {
    "code": "A96.1",
    "description": "Machupo hemorrhagic fever"
  },
  {
    "code": "A96.2",
    "description": "Lassa fever"
  },
  {
    "code": "A96.8",
    "description": "Other arenaviral hemorrhagic fevers"
  },
  {
    "code": "A96.9",
    "description": "Arenaviral hemorrhagic fever, unspecified"
  },
  {
    "code": "A98.0",
    "description": "Crimean-Congo hemorrhagic fever"
  },
  {
    "code": "A98.1",
    "description": "Omsk hemorrhagic fever"
  },
  {
    "code": "A98.2",
    "description": "Kyasanur Forest disease"
  },
  {
    "code": "A98.3",
    "description": "Marburg virus disease"
  },
  {
    "code": "A98.4",
    "description": "Ebola virus disease"
  },
  {
    "code": "A98.5",
    "description": "Hemorrhagic fever with renal syndrome"
  },
  {
    "code": "A98.8",
    "description": "Other specified viral hemorrhagic fevers"
  },
  {
    "code": "A99",
    "description": "Unspecified viral hemorrhagic fever"
  },
  {
    "code": "B00.0",
    "description": "Eczema herpeticum"
  },
  {
    "code": "B00.1",
    "description": "Herpesviral vesicular dermatitis"
  },
  {
    "code": "B00.2",
    "description": "Herpesviral gingivostomatitis and pharyngotonsillitis"
  },
  {
    "code": "B00.3",
    "description": "Herpesviral meningitis"
  },
  {
    "code": "B00.4",
    "description": "Herpesviral encephalitis"
  },
  {
    "code": "B00.50",
    "description": "Herpesviral ocular disease, unspecified"
  },
  {
    "code": "B00.51",
    "description": "Herpesviral iridocyclitis"
  },
  {
    "code": "B00.52",
    "description": "Herpesviral keratitis"
  },
  {
    "code": "B00.53",
    "description": "Herpesviral conjunctivitis"
  },
  {
    "code": "B00.59",
    "description": "Other herpesviral disease of eye"
  },
  {
    "code": "B00.7",
    "description": "Disseminated herpesviral disease"
  },
  {
    "code": "B00.81",
    "description": "Herpesviral hepatitis"
  },
  {
    "code": "B00.82",
    "description": "Herpes simplex myelitis"
  },
  {
    "code": "B00.89",
    "description": "Other herpesviral infection"
  },
  {
    "code": "B00.9",
    "description": "Herpesviral infection, unspecified"
  },
  {
    "code": "B01.0",
    "description": "Varicella meningitis"
  },
  {
    "code": "B01.11",
    "description": "Varicella encephalitis and encephalomyelitis"
  },
  {
    "code": "B01.12",
    "description": "Varicella myelitis"
  },
  {
    "code": "B01.2",
    "description": "Varicella pneumonia"
  },
  {
    "code": "B01.81",
    "description": "Varicella keratitis"
  },
  {
    "code": "B01.89",
    "description": "Other varicella complications"
  },
  {
    "code": "B01.9",
    "description": "Varicella without complication"
  },
  {
    "code": "B02.0",
    "description": "Zoster encephalitis"
  },
  {
    "code": "B02.1",
    "description": "Zoster meningitis"
  },
  {
    "code": "B02.21",
    "description": "Postherpetic geniculate ganglionitis"
  },
  {
    "code": "B02.22",
    "description": "Postherpetic trigeminal neuralgia"
  },
  {
    "code": "B02.23",
    "description": "Postherpetic polyneuropathy"
  },
  {
    "code": "B02.24",
    "description": "Postherpetic myelitis"
  },
  {
    "code": "B02.29",
    "description": "Other postherpetic nervous system involvement"
  },
  {
    "code": "B02.30",
    "description": "Zoster ocular disease, unspecified"
  },
  {
    "code": "B02.31",
    "description": "Zoster conjunctivitis"
  },
  {
    "code": "B02.32",
    "description": "Zoster iridocyclitis"
  },
  {
    "code": "B02.33",
    "description": "Zoster keratitis"
  },
  {
    "code": "B02.34",
    "description": "Zoster scleritis"
  },
  {
    "code": "B02.39",
    "description": "Other herpes zoster eye disease"
  },
  {
    "code": "B02.7",
    "description": "Disseminated zoster"
  },
  {
    "code": "B02.8",
    "description": "Zoster with other complications"
  },
  {
    "code": "B02.9",
    "description": "Zoster without complications"
  },
  {
    "code": "B03",
    "description": "Smallpox"
  },
  {
    "code": "B04",
    "description": "Monkeypox"
  },
  {
    "code": "B05.0",
    "description": "Measles complicated by encephalitis"
  },
  {
    "code": "B05.1",
    "description": "Measles complicated by meningitis"
  },
  {
    "code": "B05.2",
    "description": "Measles complicated by pneumonia"
  },
  {
    "code": "B05.3",
    "description": "Measles complicated by otitis media"
  },
  {
    "code": "B05.4",
    "description": "Measles with intestinal complications"
  },
  {
    "code": "B05.81",
    "description": "Measles keratitis and keratoconjunctivitis"
  },
  {
    "code": "B05.89",
    "description": "Other measles complications"
  },
  {
    "code": "B05.9",
    "description": "Measles without complication"
  },
  {
    "code": "B06.00",
    "description": "Rubella with neurological complication, unspecified"
  },
  {
    "code": "B06.01",
    "description": "Rubella encephalitis"
  },
  {
    "code": "B06.02",
    "description": "Rubella meningitis"
  },
  {
    "code": "B06.09",
    "description": "Other neurological complications of rubella"
  },
  {
    "code": "B06.81",
    "description": "Rubella pneumonia"
  },
  {
    "code": "B06.82",
    "description": "Rubella arthritis"
  },
  {
    "code": "B06.89",
    "description": "Other rubella complications"
  },
  {
    "code": "B06.9",
    "description": "Rubella without complication"
  },
  {
    "code": "B07.0",
    "description": "Plantar wart"
  },
  {
    "code": "B07.8",
    "description": "Other viral warts"
  },
  {
    "code": "B07.9",
    "description": "Viral wart, unspecified"
  },
  {
    "code": "B08.01",
    "description": "Cowpox"
  },
  {
    "code": "B08.02",
    "description": "Vaccinia not from vaccine"
  },
  {
    "code": "B08.03",
    "description": "Vaccinia from vaccine"
  },
  {
    "code": "B08.04",
    "description": "Paravaccinia, unspecified"
  },
  {
    "code": "B08.09",
    "description": "Other orthopoxvirus infections"
  },
  {
    "code": "B08.1",
    "description": "Molluscum contagiosum"
  },
  {
    "code": "B08.20",
    "description": "Exanthema subitum [sixth disease], unspecified"
  },
  {
    "code": "B08.21",
    "description": "Exanthema subitum [sixth disease] due to human herpesvirus 6"
  },
  {
    "code": "B08.22",
    "description": "Exanthema subitum [sixth disease] due to human herpesvirus 7"
  },
  {
    "code": "B08.3",
    "description": "Erythema infectiosum [fifth disease]"
  },
  {
    "code": "B08.4",
    "description": "Enteroviral vesicular stomatitis with exanthem"
  },
  {
    "code": "B08.5",
    "description": "Enteroviral vesicular pharyngitis"
  },
  {
    "code": "B08.60",
    "description": "Parapoxvirus infection, unspecified"
  },
  {
    "code": "B08.61",
    "description": "Bovine stomatitis"
  },
  {
    "code": "B08.62",
    "description": "Sealpox"
  },
  {
    "code": "B08.69",
    "description": "Other parapoxvirus infections"
  },
  {
    "code": "B08.8",
    "description": "Other specified viral infections characterized by skin and mucous membrane lesions"
  },
  {
    "code": "B09",
    "description": "Unspecified viral infection characterized by skin and mucous membrane lesions"
  },
  {
    "code": "B10.01",
    "description": "Human herpesvirus 1 infection"
  },
  {
    "code": "B10.09",
    "description": "Other human herpesvirus infection"
  },
  {
    "code": "B15.0",
    "description": "Hepatitis A with hepatic coma"
  },
  {
    "code": "B15.9",
    "description": "Hepatitis A without hepatic coma"
  },
  {
    "code": "B16.0",
    "description": "Acute hepatitis B with delta-agent with hepatic coma"
  },
  {
    "code": "B16.1",
    "description": "Acute hepatitis B with delta-agent without hepatic coma"
  },
  {
    "code": "B16.2",
    "description": "Acute hepatitis B without delta-agent with hepatic coma"
  },
  {
    "code": "B16.9",
    "description": "Acute hepatitis B without delta-agent and without hepatic coma"
  },
  {
    "code": "B17.0",
    "description": "Acute delta-(super) infection of hepatitis B carrier"
  },
  {
    "code": "B17.10",
    "description": "Acute hepatitis C without hepatic coma"
  },
  {
    "code": "B17.11",
    "description": "Acute hepatitis C with hepatic coma"
  },
  {
    "code": "B17.2",
    "description": "Acute hepatitis E"
  },
  {
    "code": "B17.8",
    "description": "Other specified acute viral hepatitis"
  },
  {
    "code": "B17.9",
    "description": "Acute viral hepatitis, unspecified"
  },
  {
    "code": "B18.0",
    "description": "Chronic viral hepatitis B with delta-agent"
  },
  {
    "code": "B18.1",
    "description": "Chronic viral hepatitis B without delta-agent"
  },
  {
    "code": "B18.2",
    "description": "Chronic viral hepatitis C"
  },
  {
    "code": "B18.8",
    "description": "Other chronic viral hepatitis"
  },
  {
    "code": "B18.9",
    "description": "Chronic viral hepatitis, unspecified"
  },
  {
    "code": "B19.0",
    "description": "Unspecified viral hepatitis with hepatic coma"
  },
  {
    "code": "B19.10",
    "description": "Unspecified viral hepatitis B without hepatic coma"
  },
  {
    "code": "B19.11",
    "description": "Unspecified viral hepatitis B with hepatic coma"
  },
  {
    "code": "B19.20",
    "description": "Unspecified viral hepatitis C without hepatic coma"
  },
  {
    "code": "B19.21",
    "description": "Unspecified viral hepatitis C with hepatic coma"
  },
  {
    "code": "B19.9",
    "description": "Unspecified viral hepatitis without hepatic coma"
  },
  {
    "code": "B20",
    "description": "Human immunodeficiency virus [HIV] disease"
  },
  {
    "code": "B25.0",
    "description": "Cytomegaloviral pneumonitis"
  },
  {
    "code": "B25.1",
    "description": "Cytomegaloviral hepatitis"
  },
  {
    "code": "B25.2",
    "description": "Cytomegaloviral pancreatitis"
  },
  {
    "code": "B25.8",
    "description": "Other cytomegaloviral diseases"
  },
  {
    "code": "B25.9",
    "description": "Cytomegaloviral disease, unspecified"
  },
  {
    "code": "B26.0",
    "description": "Mumps orchitis"
  },
  {
    "code": "B26.1",
    "description": "Mumps meningitis"
  },
  {
    "code": "B26.2",
    "description": "Mumps encephalitis"
  },
  {
    "code": "B26.3",
    "description": "Mumps pancreatitis"
  },
  {
    "code": "B26.81",
    "description": "Mumps hepatitis"
  },
  {
    "code": "B26.82",
    "description": "Mumps myocarditis"
  },
  {
    "code": "B26.83",
    "description": "Mumps nephritis"
  },
  {
    "code": "B26.84",
    "description": "Mumps polyneuropathy"
  },
  {
    "code": "B26.85",
    "description": "Mumps arthritis"
  },
  {
    "code": "B26.89",
    "description": "Other mumps complications"
  },
  {
    "code": "B26.9",
    "description": "Mumps without complication"
  },
  {
    "code": "B27.00",
    "description": "Gammaherpesviral mononucleosis without complication"
  },
  {
    "code": "B27.01",
    "description": "Gammaherpesviral mononucleosis with polyneuropathy"
  },
  {
    "code": "B27.02",
    "description": "Gammaherpesviral mononucleosis with meningitis"
  },
  {
    "code": "B27.09",
    "description": "Gammaherpesviral mononucleosis with other complications"
  },
  {
    "code": "B27.10",
    "description": "Cytomegaloviral mononucleosis without complication"
  },
  {
    "code": "B27.11",
    "description": "Cytomegaloviral mononucleosis with polyneuropathy"
  },
  {
    "code": "B27.12",
    "description": "Cytomegaloviral mononucleosis with meningitis"
  },
  {
    "code": "B27.19",
    "description": "Cytomegaloviral mononucleosis with other complications"
  },
  {
    "code": "B27.80",
    "description": "Other infectious mononucleosis without complication"
  },
  {
    "code": "B27.81",
    "description": "Other infectious mononucleosis with polyneuropathy"
  },
  {
    "code": "B27.82",
    "description": "Other infectious mononucleosis with meningitis"
  },
  {
    "code": "B27.89",
    "description": "Other infectious mononucleosis with other complications"
  },
  {
    "code": "B27.90",
    "description": "Infectious mononucleosis, unspecified without complication"
  },
  {
    "code": "B27.91",
    "description": "Infectious mononucleosis, unspecified with polyneuropathy"
  },
  {
    "code": "B27.92",
    "description": "Infectious mononucleosis, unspecified with meningitis"
  },
  {
    "code": "B27.99",
    "description": "Infectious mononucleosis, unspecified with other complications"
  },
  {
    "code": "C00.0",
    "description": "Malignant neoplasm of external upper lip"
  },
  {
    "code": "C00.1",
    "description": "Malignant neoplasm of external lower lip"
  },
  {
    "code": "C00.2",
    "description": "Malignant neoplasm of external lip, unspecified"
  },
  {
    "code": "C00.3",
    "description": "Malignant neoplasm of upper lip, inner aspect"
  },
  {
    "code": "C00.4",
    "description": "Malignant neoplasm of lower lip, inner aspect"
  },
  {
    "code": "C00.5",
    "description": "Malignant neoplasm of lip, unspecified, inner aspect"
  },
  {
    "code": "C00.6",
    "description": "Malignant neoplasm of commissure of lip"
  },
  {
    "code": "C00.8",
    "description": "Malignant neoplasm of overlapping sites of lip"
  },
  {
    "code": "C00.9",
    "description": "Malignant neoplasm of lip, unspecified"
  },
  {
    "code": "C01",
    "description": "Malignant neoplasm of base of tongue"
  },
  {
    "code": "C02.0",
    "description": "Malignant neoplasm of dorsal surface of tongue"
  },
  {
    "code": "C02.1",
    "description": "Malignant neoplasm of border of tongue"
  },
  {
    "code": "C02.2",
    "description": "Malignant neoplasm of ventral surface of tongue"
  },
  {
    "code": "C02.3",
    "description": "Malignant neoplasm of anterior two-thirds of tongue, part unspecified"
  },
  {
    "code": "C02.4",
    "description": "Malignant neoplasm of lingual tonsil"
  },
  {
    "code": "C02.8",
    "description": "Malignant neoplasm of overlapping sites of tongue"
  },
  {
    "code": "C02.9",
    "description": "Malignant neoplasm of tongue, unspecified"
  },
  {
    "code": "C03.0",
    "description": "Malignant neoplasm of upper gum"
  },
  {
    "code": "C03.1",
    "description": "Malignant neoplasm of lower gum"
  },
  {
    "code": "C03.9",
    "description": "Malignant neoplasm of gum, unspecified"
  },
  {
    "code": "C04.0",
    "description": "Malignant neoplasm of anterior floor of mouth"
  },
  {
    "code": "C04.1",
    "description": "Malignant neoplasm of lateral floor of mouth"
  },
  {
    "code": "C04.8",
    "description": "Malignant neoplasm of overlapping sites of floor of mouth"
  },
  {
    "code": "C04.9",
    "description": "Malignant neoplasm of floor of mouth, unspecified"
  },
  {
    "code": "C05.0",
    "description": "Malignant neoplasm of hard palate"
  },
  {
    "code": "C05.1",
    "description": "Malignant neoplasm of soft palate"
  },
  {
    "code": "C05.2",
    "description": "Malignant neoplasm of uvula"
  },
  {
    "code": "C05.8",
    "description": "Malignant neoplasm of overlapping sites of palate"
  },
  {
    "code": "C05.9",
    "description": "Malignant neoplasm of palate, unspecified"
  },
  {
    "code": "C06.0",
    "description": "Malignant neoplasm of cheek mucosa"
  },
  {
    "code": "C06.1",
    "description": "Malignant neoplasm of vestibule of mouth"
  },
  {
    "code": "C06.2",
    "description": "Malignant neoplasm of retromolar area"
  },
  {
    "code": "C06.80",
    "description": "Malignant neoplasm of overlapping sites of unspecified parts of mouth"
  },
  {
    "code": "C06.89",
    "description": "Malignant neoplasm of overlapping sites of other parts of mouth"
  },
  {
    "code": "C06.9",
    "description": "Malignant neoplasm of mouth, unspecified"
  },
  {
    "code": "C07",
    "description": "Malignant neoplasm of parotid gland"
  },
  {
    "code": "C08.0",
    "description": "Malignant neoplasm of submandibular gland"
  },
  {
    "code": "C08.1",
    "description": "Malignant neoplasm of sublingual gland"
  },
  {
    "code": "C08.9",
    "description": "Malignant neoplasm of major salivary gland, unspecified"
  },
  {
    "code": "C09.0",
    "description": "Malignant neoplasm of tonsillar fossa"
  },
  {
    "code": "C09.1",
    "description": "Malignant neoplasm of tonsillar pillar (anterior) (posterior)"
  },
  {
    "code": "C09.8",
    "description": "Malignant neoplasm of overlapping sites of tonsil"
  },
  {
    "code": "C09.9",
    "description": "Malignant neoplasm of tonsil, unspecified"
  },
  {
    "code": "C10.0",
    "description": "Malignant neoplasm of vallecula"
  },
  {
    "code": "C10.1",
    "description": "Malignant neoplasm of anterior surface of epiglottis"
  },
  {
    "code": "C10.2",
    "description": "Malignant neoplasm of lateral wall of oropharynx"
  },
  {
    "code": "C10.3",
    "description": "Malignant neoplasm of posterior wall of oropharynx"
  },
  {
    "code": "C10.4",
    "description": "Malignant neoplasm of branchial cleft"
  },
  {
    "code": "C10.8",
    "description": "Malignant neoplasm of overlapping sites of oropharynx"
  },
  {
    "code": "C10.9",
    "description": "Malignant neoplasm of oropharynx, unspecified"
  },
  {
    "code": "C11.0",
    "description": "Malignant neoplasm of superior wall of nasopharynx"
  },
  {
    "code": "C11.1",
    "description": "Malignant neoplasm of posterior wall of nasopharynx"
  },
  {
    "code": "C11.2",
    "description": "Malignant neoplasm of lateral wall of nasopharynx"
  },
  {
    "code": "C11.3",
    "description": "Malignant neoplasm of anterior wall of nasopharynx"
  },
  {
    "code": "C11.8",
    "description": "Malignant neoplasm of overlapping sites of nasopharynx"
  },
  {
    "code": "C11.9",
    "description": "Malignant neoplasm of nasopharynx, unspecified"
  },
  {
    "code": "C12",
    "description": "Malignant neoplasm of pyriform sinus"
  },
  {
    "code": "C13.0",
    "description": "Malignant neoplasm of postcricoid region"
  },
  {
    "code": "C13.1",
    "description": "Malignant neoplasm of aryepiglottic fold, hypopharyngeal aspect"
  },
  {
    "code": "C13.2",
    "description": "Malignant neoplasm of posterior wall of hypopharynx"
  },
  {
    "code": "C13.8",
    "description": "Malignant neoplasm of overlapping sites of hypopharynx"
  },
  {
    "code": "C13.9",
    "description": "Malignant neoplasm of hypopharynx, unspecified"
  },
  {
    "code": "C14.0",
    "description": "Malignant neoplasm of pharynx, unspecified"
  },
  {
    "code": "C14.2",
    "description": "Malignant neoplasm of Waldeyer's ring"
  },
  {
    "code": "C14.8",
    "description": "Malignant neoplasm of overlapping sites of lip, oral cavity and pharynx"
  },
  {
    "code": "C15.3",
    "description": "Malignant neoplasm of upper third of esophagus"
  },
  {
    "code": "C15.4",
    "description": "Malignant neoplasm of middle third of esophagus"
  },
  {
    "code": "C15.5",
    "description": "Malignant neoplasm of lower third of esophagus"
  },
  {
    "code": "C15.8",
    "description": "Malignant neoplasm of overlapping sites of esophagus"
  },
  {
    "code": "C15.9",
    "description": "Malignant neoplasm of esophagus, unspecified"
  },
  {
    "code": "C16.0",
    "description": "Malignant neoplasm of cardia"
  },
  {
    "code": "C16.1",
    "description": "Malignant neoplasm of fundus of stomach"
  },
  {
    "code": "C16.2",
    "description": "Malignant neoplasm of body of stomach"
  },
  {
    "code": "C16.3",
    "description": "Malignant neoplasm of pyloric antrum"
  },
  {
    "code": "C16.4",
    "description": "Malignant neoplasm of pylorus"
  },
  {
    "code": "C16.5",
    "description": "Malignant neoplasm of lesser curvature of stomach, unspecified"
  },
  {
    "code": "C16.6",
    "description": "Malignant neoplasm of greater curvature of stomach, unspecified"
  },
  {
    "code": "C16.8",
    "description": "Malignant neoplasm of overlapping sites of stomach"
  },
  {
    "code": "C16.9",
    "description": "Malignant neoplasm of stomach, unspecified"
  },
  {
    "code": "C17.0",
    "description": "Malignant neoplasm of duodenum"
  },
  {
    "code": "C17.1",
    "description": "Malignant neoplasm of jejunum"
  },
  {
    "code": "C17.2",
    "description": "Malignant neoplasm of ileum"
  },
  {
    "code": "C17.3",
    "description": "Meckel's diverticulum, malignant"
  },
  {
    "code": "C17.8",
    "description": "Malignant neoplasm of overlapping sites of small intestine"
  },
  {
    "code": "C17.9",
    "description": "Malignant neoplasm of small intestine, unspecified"
  },
  {
    "code": "C18.0",
    "description": "Malignant neoplasm of cecum"
  },
  {
    "code": "C18.1",
    "description": "Malignant neoplasm of appendix"
  },
  {
    "code": "C18.2",
    "description": "Malignant neoplasm of ascending colon"
  },
  {
    "code": "C18.3",
    "description": "Malignant neoplasm of hepatic flexure"
  },
  {
    "code": "C18.4",
    "description": "Malignant neoplasm of transverse colon"
  },
  {
    "code": "C18.5",
    "description": "Malignant neoplasm of splenic flexure"
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
    "code": "C18.8",
    "description": "Malignant neoplasm of overlapping sites of colon"
  },
  {
    "code": "C18.9",
    "description": "Malignant neoplasm of colon, unspecified"
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
    "code": "C21.0",
    "description": "Malignant neoplasm of anus, unspecified"
  },
  {
    "code": "C21.1",
    "description": "Malignant neoplasm of anal canal"
  },
  {
    "code": "C21.2",
    "description": "Malignant neoplasm of cloacogenic zone"
  },
  {
    "code": "C21.8",
    "description": "Malignant neoplasm of overlapping sites of rectum, anus and anal canal"
  },
  {
    "code": "C22.0",
    "description": "Liver cell carcinoma"
  },
  {
    "code": "C22.1",
    "description": "Intrahepatic bile duct carcinoma"
  },
  {
    "code": "C22.2",
    "description": "Hepatoblastoma"
  },
  {
    "code": "C22.3",
    "description": "Angiosarcoma of liver"
  },
  {
    "code": "C22.4",
    "description": "Other sarcomas of liver"
  },
  {
    "code": "C22.7",
    "description": "Other specified carcinomas of liver"
  },
  {
    "code": "C22.8",
    "description": "Malignant neoplasm of liver, primary, unspecified as to type"
  },
  {
    "code": "C22.9",
    "description": "Malignant neoplasm of liver, not specified as primary or secondary"
  },
  {
    "code": "C23",
    "description": "Malignant neoplasm of gallbladder"
  },
  {
    "code": "C24.0",
    "description": "Malignant neoplasm of extrahepatic bile duct"
  },
  {
    "code": "C24.1",
    "description": "Malignant neoplasm of ampulla of Vater"
  },
  {
    "code": "C24.8",
    "description": "Malignant neoplasm of overlapping sites of biliary tract"
  },
  {
    "code": "C24.9",
    "description": "Malignant neoplasm of biliary tract, unspecified"
  },
  {
    "code": "C25.0",
    "description": "Malignant neoplasm of head of pancreas"
  },
  {
    "code": "C25.1",
    "description": "Malignant neoplasm of body of pancreas"
  },
  {
    "code": "C25.2",
    "description": "Malignant neoplasm of tail of pancreas"
  },
  {
    "code": "C25.3",
    "description": "Malignant neoplasm of pancreatic duct"
  },
  {
    "code": "C25.4",
    "description": "Malignant neoplasm of endocrine pancreas"
  },
  {
    "code": "C25.7",
    "description": "Malignant neoplasm of other parts of pancreas"
  },
  {
    "code": "C25.8",
    "description": "Malignant neoplasm of overlapping sites of pancreas"
  },
  {
    "code": "C25.9",
    "description": "Malignant neoplasm of pancreas, unspecified"
  },
  {
    "code": "C26.0",
    "description": "Malignant neoplasm of intestinal tract, part unspecified"
  },
  {
    "code": "C26.1",
    "description": "Malignant neoplasm of spleen"
  },
  {
    "code": "C26.9",
    "description": "Malignant neoplasm of ill-defined sites within the digestive system"
  },
  {
    "code": "C30.0",
    "description": "Malignant neoplasm of nasal cavity"
  },
  {
    "code": "C30.1",
    "description": "Malignant neoplasm of middle ear"
  },
  {
    "code": "C31.0",
    "description": "Malignant neoplasm of maxillary sinus"
  },
  {
    "code": "C31.1",
    "description": "Malignant neoplasm of ethmoidal sinus"
  },
  {
    "code": "C31.2",
    "description": "Malignant neoplasm of frontal sinus"
  },
  {
    "code": "C31.3",
    "description": "Malignant neoplasm of sphenoidal sinus"
  },
  {
    "code": "C31.8",
    "description": "Malignant neoplasm of overlapping sites of accessory sinuses"
  },
  {
    "code": "C31.9",
    "description": "Malignant neoplasm of accessory sinus, unspecified"
  },
  {
    "code": "C32.0",
    "description": "Malignant neoplasm of glottis"
  },
  {
    "code": "C32.1",
    "description": "Malignant neoplasm of supraglottis"
  },
  {
    "code": "C32.2",
    "description": "Malignant neoplasm of subglottis"
  },
  {
    "code": "C32.3",
    "description": "Malignant neoplasm of laryngeal cartilage"
  },
  {
    "code": "C32.8",
    "description": "Malignant neoplasm of overlapping sites of larynx"
  },
  {
    "code": "C32.9",
    "description": "Malignant neoplasm of larynx, unspecified"
  },
  {
    "code": "C33",
    "description": "Malignant neoplasm of trachea"
  },
  {
    "code": "C34.00",
    "description": "Malignant neoplasm of unspecified main bronchus"
  },
  {
    "code": "C34.01",
    "description": "Malignant neoplasm of right main bronchus"
  },
  {
    "code": "C34.02",
    "description": "Malignant neoplasm of left main bronchus"
  },
  {
    "code": "C34.10",
    "description": "Malignant neoplasm of upper lobe, unspecified bronchus or lung"
  },
  {
    "code": "C34.11",
    "description": "Malignant neoplasm of upper lobe, right bronchus or lung"
  },
  {
    "code": "C34.12",
    "description": "Malignant neoplasm of upper lobe, left bronchus or lung"
  },
  {
    "code": "C34.2",
    "description": "Malignant neoplasm of middle lobe, bronchus or lung"
  },
  {
    "code": "C34.30",
    "description": "Malignant neoplasm of lower lobe, unspecified bronchus or lung"
  },
  {
    "code": "C34.31",
    "description": "Malignant neoplasm of lower lobe, right bronchus or lung"
  },
  {
    "code": "C34.32",
    "description": "Malignant neoplasm of lower lobe, left bronchus or lung"
  },
  {
    "code": "C34.80",
    "description": "Malignant neoplasm of overlapping sites of unspecified bronchus and lung"
  },
  {
    "code": "C34.81",
    "description": "Malignant neoplasm of overlapping sites of right bronchus and lung"
  },
  {
    "code": "C34.82",
    "description": "Malignant neoplasm of overlapping sites of left bronchus and lung"
  },
  {
    "code": "C34.90",
    "description": "Malignant neoplasm of unspecified part of unspecified bronchus or lung"
  },
  {
    "code": "C34.91",
    "description": "Malignant neoplasm of unspecified part of right bronchus or lung"
  },
  {
    "code": "C34.92",
    "description": "Malignant neoplasm of unspecified part of left bronchus or lung"
  },
  {
    "code": "C37",
    "description": "Malignant neoplasm of thymus"
  },
  {
    "code": "C38.0",
    "description": "Malignant neoplasm of heart"
  },
  {
    "code": "C38.1",
    "description": "Malignant neoplasm of anterior mediastinum"
  },
  {
    "code": "C38.2",
    "description": "Malignant neoplasm of posterior mediastinum"
  },
  {
    "code": "C38.3",
    "description": "Malignant neoplasm of mediastinum, part unspecified"
  },
  {
    "code": "C38.4",
    "description": "Malignant neoplasm of pleura"
  },
  {
    "code": "C38.8",
    "description": "Malignant neoplasm of overlapping sites of heart, mediastinum and pleura"
  },
  {
    "code": "C39.0",
    "description": "Malignant neoplasm of upper respiratory tract, part unspecified"
  },
  {
    "code": "C39.9",
    "description": "Malignant neoplasm of lower respiratory tract, part unspecified"
  },
  {
    "code": "C40.00",
    "description": "Malignant neoplasm of scapula and long bones of unspecified upper limb"
  },
  {
    "code": "C40.01",
    "description": "Malignant neoplasm of scapula and long bones of right upper limb"
  },
  {
    "code": "C40.02",
    "description": "Malignant neoplasm of scapula and long bones of left upper limb"
  },
  {
    "code": "C40.10",
    "description": "Malignant neoplasm of short bones of unspecified upper limb"
  },
  {
    "code": "C40.11",
    "description": "Malignant neoplasm of short bones of right upper limb"
  },
  {
    "code": "C40.12",
    "description": "Malignant neoplasm of short bones of left upper limb"
  },
  {
    "code": "C40.20",
    "description": "Malignant neoplasm of long bones of unspecified lower limb"
  },
  {
    "code": "C40.21",
    "description": "Malignant neoplasm of long bones of right lower limb"
  },
  {
    "code": "C40.22",
    "description": "Malignant neoplasm of long bones of left lower limb"
  },
  {
    "code": "C40.30",
    "description": "Malignant neoplasm of short bones of unspecified lower limb"
  },
  {
    "code": "C40.31",
    "description": "Malignant neoplasm of short bones of right lower limb"
  },
  {
    "code": "C40.32",
    "description": "Malignant neoplasm of short bones of left lower limb"
  },
  {
    "code": "C40.80",
    "description": "Malignant neoplasm of overlapping sites of bone and articular cartilage of unspecified limb"
  },
  {
    "code": "C40.81",
    "description": "Malignant neoplasm of overlapping sites of bone and articular cartilage of right limb"
  },
  {
    "code": "C40.82",
    "description": "Malignant neoplasm of overlapping sites of bone and articular cartilage of left limb"
  },
  {
    "code": "C40.90",
    "description": "Malignant neoplasm of unspecified bones and articular cartilage of unspecified limb"
  },
  {
    "code": "C40.91",
    "description": "Malignant neoplasm of unspecified bones and articular cartilage of right limb"
  },
  {
    "code": "C40.92",
    "description": "Malignant neoplasm of unspecified bones and articular cartilage of left limb"
  },
  {
    "code": "C41.0",
    "description": "Malignant neoplasm of bones of skull and face"
  },
  {
    "code": "C41.1",
    "description": "Malignant neoplasm of mandible"
  },
  {
    "code": "C41.2",
    "description": "Malignant neoplasm of vertebral column"
  },
  {
    "code": "C41.3",
    "description": "Malignant neoplasm of ribs, sternum and clavicle"
  },
  {
    "code": "C41.4",
    "description": "Malignant neoplasm of pelvic bones, sacrum and coccyx"
  },
  {
    "code": "C41.8",
    "description": "Malignant neoplasm of overlapping sites of bone and articular cartilage"
  },
  {
    "code": "C41.9",
    "description": "Malignant neoplasm of bone and articular cartilage, unspecified"
  },
  {
    "code": "C43.0",
    "description": "Malignant melanoma of lip"
  },
  {
    "code": "C43.10",
    "description": "Malignant melanoma of unspecified eyelid, including canthus"
  },
  {
    "code": "C43.11",
    "description": "Malignant melanoma of right eyelid, including canthus"
  },
  {
    "code": "C43.12",
    "description": "Malignant melanoma of left eyelid, including canthus"
  },
  {
    "code": "C43.20",
    "description": "Malignant melanoma of unspecified ear and external auricular canal"
  },
  {
    "code": "C43.21",
    "description": "Malignant melanoma of right ear and external auricular canal"
  },
  {
    "code": "C43.22",
    "description": "Malignant melanoma of left ear and external auricular canal"
  },
  {
    "code": "C43.30",
    "description": "Malignant melanoma of unspecified part of face"
  },
  {
    "code": "C43.31",
    "description": "Malignant melanoma of nose"
  },
  {
    "code": "C43.39",
    "description": "Malignant melanoma of other parts of face"
  },
  {
    "code": "C43.4",
    "description": "Malignant melanoma of scalp and neck"
  },
  {
    "code": "C43.51",
    "description": "Malignant melanoma of anal skin"
  },
  {
    "code": "C43.52",
    "description": "Malignant melanoma of skin of breast"
  },
  {
    "code": "C43.59",
    "description": "Malignant melanoma of other part of trunk"
  },
  {
    "code": "C43.60",
    "description": "Malignant melanoma of unspecified upper limb, including shoulder"
  },
  {
    "code": "C43.61",
    "description": "Malignant melanoma of right upper limb, including shoulder"
  },
  {
    "code": "C43.62",
    "description": "Malignant melanoma of left upper limb, including shoulder"
  },
  {
    "code": "C43.70",
    "description": "Malignant melanoma of unspecified lower limb, including hip"
  },
  {
    "code": "C43.71",
    "description": "Malignant melanoma of right lower limb, including hip"
  },
  {
    "code": "C43.72",
    "description": "Malignant melanoma of left lower limb, including hip"
  },
  {
    "code": "C43.8",
    "description": "Malignant melanoma of overlapping sites of skin"
  },
  {
    "code": "C43.9",
    "description": "Malignant melanoma of skin, unspecified"
  },
  {
    "code": "C44.00",
    "description": "Unspecified malignant neoplasm of skin of lip"
  },
  {
    "code": "C44.01",
    "description": "Basal cell carcinoma of skin of lip"
  },
  {
    "code": "C44.02",
    "description": "Squamous cell carcinoma of skin of lip"
  },
  {
    "code": "C44.09",
    "description": "Other specified malignant neoplasm of skin of lip"
  },
  {
    "code": "C44.101",
    "description": "Unspecified malignant neoplasm of skin of unspecified eyelid, including canthus"
  },
  {
    "code": "C44.111",
    "description": "Basal cell carcinoma of skin of unspecified eyelid, including canthus"
  },
  {
    "code": "C44.121",
    "description": "Squamous cell carcinoma of skin of unspecified eyelid, including canthus"
  },
  {
    "code": "C44.191",
    "description": "Other specified malignant neoplasm of skin of unspecified eyelid, including canthus"
  },
  {
    "code": "C44.201",
    "description": "Unspecified malignant neoplasm of skin of unspecified ear and external auricular canal"
  },
  {
    "code": "C44.211",
    "description": "Basal cell carcinoma of skin of unspecified ear and external auricular canal"
  },
  {
    "code": "C44.221",
    "description": "Squamous cell carcinoma of skin of unspecified ear and external auricular canal"
  },
  {
    "code": "C44.291",
    "description": "Other specified malignant neoplasm of skin of unspecified ear and external auricular canal"
  },
  {
    "code": "C44.300",
    "description": "Unspecified malignant neoplasm of skin of unspecified part of face"
  },
  {
    "code": "C44.310",
    "description": "Basal cell carcinoma of skin of unspecified part of face"
  },
  {
    "code": "C44.320",
    "description": "Squamous cell carcinoma of skin of unspecified part of face"
  },
  {
    "code": "C44.390",
    "description": "Other specified malignant neoplasm of skin of unspecified part of face"
  },
  {
    "code": "C44.40",
    "description": "Unspecified malignant neoplasm of skin of scalp and neck"
  },
  {
    "code": "C44.41",
    "description": "Basal cell carcinoma of skin of scalp and neck"
  },
  {
    "code": "C44.42",
    "description": "Squamous cell carcinoma of skin of scalp and neck"
  },
  {
    "code": "C44.49",
    "description": "Other specified malignant neoplasm of skin of scalp and neck"
  },
  {
    "code": "C44.500",
    "description": "Unspecified malignant neoplasm of anal skin"
  },
  {
    "code": "C44.510",
    "description": "Basal cell carcinoma of anal skin"
  },
  {
    "code": "C44.520",
    "description": "Squamous cell carcinoma of anal skin"
  },
  {
    "code": "C44.590",
    "description": "Other specified malignant neoplasm of anal skin"
  },
  {
    "code": "C44.601",
    "description": "Unspecified malignant neoplasm of skin of unspecified upper limb, including shoulder"
  },
  {
    "code": "C44.611",
    "description": "Basal cell carcinoma of skin of unspecified upper limb, including shoulder"
  },
  {
    "code": "C44.621",
    "description": "Squamous cell carcinoma of skin of unspecified upper limb, including shoulder"
  },
  {
    "code": "C44.691",
    "description": "Other specified malignant neoplasm of skin of unspecified upper limb, including shoulder"
  },
  {
    "code": "C44.701",
    "description": "Unspecified malignant neoplasm of skin of unspecified lower limb, including hip"
  },
  {
    "code": "C44.711",
    "description": "Basal cell carcinoma of skin of unspecified lower limb, including hip"
  },
  {
    "code": "C44.721",
    "description": "Squamous cell carcinoma of skin of unspecified lower limb, including hip"
  },
  {
    "code": "C44.791",
    "description": "Other specified malignant neoplasm of skin of unspecified lower limb, including hip"
  },
  {
    "code": "C44.80",
    "description": "Unspecified malignant neoplasm of overlapping sites of skin"
  },
  {
    "code": "C44.81",
    "description": "Basal cell carcinoma of overlapping sites of skin"
  },
  {
    "code": "C44.82",
    "description": "Squamous cell carcinoma of overlapping sites of skin"
  },
  {
    "code": "C44.89",
    "description": "Other specified malignant neoplasm of overlapping sites of skin"
  },
  {
    "code": "C44.90",
    "description": "Unspecified malignant neoplasm of skin, unspecified"
  },
  {
    "code": "C44.91",
    "description": "Basal cell carcinoma of skin, unspecified"
  },
  {
    "code": "C44.92",
    "description": "Squamous cell carcinoma of skin, unspecified"
  },
  {
    "code": "C44.99",
    "description": "Other specified malignant neoplasm of skin, unspecified"
  },
  {
    "code": "C45.0",
    "description": "Mesothelioma of pleura"
  },
  {
    "code": "C45.1",
    "description": "Mesothelioma of peritoneum"
  },
  {
    "code": "C45.2",
    "description": "Mesothelioma of pericardium"
  },
  {
    "code": "C45.7",
    "description": "Mesothelioma of other sites"
  },
  {
    "code": "C45.9",
    "description": "Mesothelioma, unspecified"
  },
  {
    "code": "C46.0",
    "description": "Kaposi's sarcoma of skin"
  },
  {
    "code": "C46.1",
    "description": "Kaposi's sarcoma of soft tissue"
  },
  {
    "code": "C46.2",
    "description": "Kaposi's sarcoma of palate"
  },
  {
    "code": "C46.3",
    "description": "Kaposi's sarcoma of lymph nodes"
  },
  {
    "code": "C46.4",
    "description": "Kaposi's sarcoma of gastrointestinal sites"
  },
  {
    "code": "C46.50",
    "description": "Kaposi's sarcoma of unspecified lung"
  },
  {
    "code": "C46.51",
    "description": "Kaposi's sarcoma of right lung"
  },
  {
    "code": "C46.52",
    "description": "Kaposi's sarcoma of left lung"
  },
  {
    "code": "C46.7",
    "description": "Kaposi's sarcoma of other sites"
  },
  {
    "code": "C46.9",
    "description": "Kaposi's sarcoma, unspecified"
  },
  {
    "code": "C47.0",
    "description": "Malignant neoplasm of peripheral nerves of head, face and neck"
  },
  {
    "code": "C47.10",
    "description": "Malignant neoplasm of peripheral nerves of unspecified upper limb, including shoulder"
  },
  {
    "code": "C47.11",
    "description": "Malignant neoplasm of peripheral nerves of right upper limb, including shoulder"
  },
  {
    "code": "C47.12",
    "description": "Malignant neoplasm of peripheral nerves of left upper limb, including shoulder"
  },
  {
    "code": "C47.20",
    "description": "Malignant neoplasm of peripheral nerves of unspecified lower limb, including hip"
  },
  {
    "code": "C47.21",
    "description": "Malignant neoplasm of peripheral nerves of right lower limb, including hip"
  },
  {
    "code": "C47.22",
    "description": "Malignant neoplasm of peripheral nerves of left lower limb, including hip"
  },
  {
    "code": "C47.3",
    "description": "Malignant neoplasm of peripheral nerves of thorax"
  },
  {
    "code": "C47.4",
    "description": "Malignant neoplasm of peripheral nerves of abdomen"
  },
  {
    "code": "C47.5",
    "description": "Malignant neoplasm of peripheral nerves of pelvis"
  },
  {
    "code": "C47.6",
    "description": "Malignant neoplasm of peripheral nerves of trunk, unspecified"
  },
  {
    "code": "C47.8",
    "description": "Malignant neoplasm of overlapping sites of peripheral nerves and autonomic nervous system"
  },
  {
    "code": "C47.9",
    "description": "Malignant neoplasm of peripheral nerves and autonomic nervous system, unspecified"
  },
  {
    "code": "C48.0",
    "description": "Malignant neoplasm of retroperitoneum"
  },
  {
    "code": "C48.1",
    "description": "Malignant neoplasm of specified parts of peritoneum"
  },
  {
    "code": "C48.2",
    "description": "Malignant neoplasm of peritoneum, unspecified"
  },
  {
    "code": "C48.8",
    "description": "Malignant neoplasm of overlapping sites of retroperitoneum and peritoneum"
  },
  {
    "code": "C49.0",
    "description": "Malignant neoplasm of connective and soft tissue of head, face and neck"
  },
  {
    "code": "C49.10",
    "description": "Malignant neoplasm of connective and soft tissue of unspecified upper limb, including shoulder"
  },
  {
    "code": "C49.11",
    "description": "Malignant neoplasm of connective and soft tissue of right upper limb, including shoulder"
  },
  {
    "code": "C49.12",
    "description": "Malignant neoplasm of connective and soft tissue of left upper limb, including shoulder"
  },
  {
    "code": "C49.20",
    "description": "Malignant neoplasm of connective and soft tissue of unspecified lower limb, including hip"
  },
  {
    "code": "C49.21",
    "description": "Malignant neoplasm of connective and soft tissue of right lower limb, including hip"
  },
  {
    "code": "C49.22",
    "description": "Malignant neoplasm of connective and soft tissue of left lower limb, including hip"
  },
  {
    "code": "C49.3",
    "description": "Malignant neoplasm of connective and soft tissue of thorax"
  },
  {
    "code": "C49.4",
    "description": "Malignant neoplasm of connective and soft tissue of abdomen"
  },
  {
    "code": "C49.5",
    "description": "Malignant neoplasm of connective and soft tissue of pelvis"
  },
  {
    "code": "C49.6",
    "description": "Malignant neoplasm of connective and soft tissue of trunk, unspecified"
  },
  {
    "code": "C49.8",
    "description": "Malignant neoplasm of overlapping sites of connective and soft tissue"
  },
  {
    "code": "C49.9",
    "description": "Malignant neoplasm of connective and soft tissue, unspecified"
  },
  {
    "code": "C50.011",
    "description": "Malignant neoplasm of nipple and areola, right female breast"
  },
  {
    "code": "C50.012",
    "description": "Malignant neoplasm of nipple and areola, left female breast"
  },
  {
    "code": "C50.019",
    "description": "Malignant neoplasm of nipple and areola, unspecified female breast"
  },
  {
    "code": "C50.021",
    "description": "Malignant neoplasm of nipple and areola, right male breast"
  },
  {
    "code": "C50.022",
    "description": "Malignant neoplasm of nipple and areola, left male breast"
  },
  {
    "code": "C50.029",
    "description": "Malignant neoplasm of nipple and areola, unspecified male breast"
  },
  {
    "code": "C50.111",
    "description": "Malignant neoplasm of central portion of right female breast"
  },
  {
    "code": "C50.112",
    "description": "Malignant neoplasm of central portion of left female breast"
  },
  {
    "code": "C50.119",
    "description": "Malignant neoplasm of central portion of unspecified female breast"
  },
  {
    "code": "C50.121",
    "description": "Malignant neoplasm of central portion of right male breast"
  },
  {
    "code": "C50.122",
    "description": "Malignant neoplasm of central portion of left male breast"
  },
  {
    "code": "C50.129",
    "description": "Malignant neoplasm of central portion of unspecified male breast"
  },
  {
    "code": "C50.211",
    "description": "Malignant neoplasm of upper-inner quadrant of right female breast"
  },
  {
    "code": "C50.212",
    "description": "Malignant neoplasm of upper-inner quadrant of left female breast"
  },
  {
    "code": "C50.219",
    "description": "Malignant neoplasm of upper-inner quadrant of unspecified female breast"
  },
  {
    "code": "C50.221",
    "description": "Malignant neoplasm of upper-inner quadrant of right male breast"
  },
  {
    "code": "C50.222",
    "description": "Malignant neoplasm of upper-inner quadrant of left male breast"
  },
  {
    "code": "C50.229",
    "description": "Malignant neoplasm of upper-inner quadrant of unspecified male breast"
  },
  {
    "code": "C50.311",
    "description": "Malignant neoplasm of lower-inner quadrant of right female breast"
  },
  {
    "code": "C50.312",
    "description": "Malignant neoplasm of lower-inner quadrant of left female breast"
  },
  {
    "code": "C50.319",
    "description": "Malignant neoplasm of lower-inner quadrant of unspecified female breast"
  },
  {
    "code": "C50.321",
    "description": "Malignant neoplasm of lower-inner quadrant of right male breast"
  },
  {
    "code": "C50.322",
    "description": "Malignant neoplasm of lower-inner quadrant of left male breast"
  },
  {
    "code": "C50.329",
    "description": "Malignant neoplasm of lower-inner quadrant of unspecified male breast"
  },
  {
    "code": "C50.411",
    "description": "Malignant neoplasm of upper-outer quadrant of right female breast"
  },
  {
    "code": "C50.412",
    "description": "Malignant neoplasm of upper-outer quadrant of left female breast"
  },
  {
    "code": "C50.419",
    "description": "Malignant neoplasm of upper-outer quadrant of unspecified female breast"
  },
  {
    "code": "C50.421",
    "description": "Malignant neoplasm of upper-outer quadrant of right male breast"
  },
  {
    "code": "C50.422",
    "description": "Malignant neoplasm of upper-outer quadrant of left male breast"
  },
  {
    "code": "C50.429",
    "description": "Malignant neoplasm of upper-outer quadrant of unspecified male breast"
  },
  {
    "code": "C50.511",
    "description": "Malignant neoplasm of lower-outer quadrant of right female breast"
  },
  {
    "code": "C50.512",
    "description": "Malignant neoplasm of lower-outer quadrant of left female breast"
  },
  {
    "code": "C50.519",
    "description": "Malignant neoplasm of lower-outer quadrant of unspecified female breast"
  },
  {
    "code": "C50.521",
    "description": "Malignant neoplasm of lower-outer quadrant of right male breast"
  },
  {
    "code": "C50.522",
    "description": "Malignant neoplasm of lower-outer quadrant of left male breast"
  },
  {
    "code": "C50.529",
    "description": "Malignant neoplasm of lower-outer quadrant of unspecified male breast"
  },
  {
    "code": "C50.611",
    "description": "Malignant neoplasm of axillary tail of right female breast"
  },
  {
    "code": "C50.612",
    "description": "Malignant neoplasm of axillary tail of left female breast"
  },
  {
    "code": "C50.619",
    "description": "Malignant neoplasm of axillary tail of unspecified female breast"
  },
  {
    "code": "C50.621",
    "description": "Malignant neoplasm of axillary tail of right male breast"
  },
  {
    "code": "C50.622",
    "description": "Malignant neoplasm of axillary tail of left male breast"
  },
  {
    "code": "C50.629",
    "description": "Malignant neoplasm of axillary tail of unspecified male breast"
  },
  {
    "code": "C50.811",
    "description": "Malignant neoplasm of overlapping sites of right female breast"
  },
  {
    "code": "C50.812",
    "description": "Malignant neoplasm of overlapping sites of left female breast"
  },
  {
    "code": "C50.819",
    "description": "Malignant neoplasm of overlapping sites of unspecified female breast"
  },
  {
    "code": "C50.821",
    "description": "Malignant neoplasm of overlapping sites of right male breast"
  },
  {
    "code": "C50.822",
    "description": "Malignant neoplasm of overlapping sites of left male breast"
  },
  {
    "code": "C50.829",
    "description": "Malignant neoplasm of overlapping sites of unspecified male breast"
  },
  {
    "code": "C50.911",
    "description": "Malignant neoplasm of unspecified site of right female breast"
  },
  {
    "code": "C50.912",
    "description": "Malignant neoplasm of unspecified site of left female breast"
  },
  {
    "code": "C50.919",
    "description": "Malignant neoplasm of unspecified site of unspecified female breast"
  },
  {
    "code": "C50.921",
    "description": "Malignant neoplasm of unspecified site of right male breast"
  },
  {
    "code": "C50.922",
    "description": "Malignant neoplasm of unspecified site of left male breast"
  },
  {
    "code": "C50.929",
    "description": "Malignant neoplasm of unspecified site of unspecified male breast"
  },
  {
    "code": "C51.0",
    "description": "Malignant neoplasm of labium majus"
  },
  {
    "code": "C51.1",
    "description": "Malignant neoplasm of labium minus"
  },
  {
    "code": "C51.2",
    "description": "Malignant neoplasm of clitoris"
  },
  {
    "code": "C51.8",
    "description": "Malignant neoplasm of overlapping sites of vulva"
  },
  {
    "code": "C51.9",
    "description": "Malignant neoplasm of vulva, unspecified"
  },
  {
    "code": "C52",
    "description": "Malignant neoplasm of vagina"
  },
  {
    "code": "C53.0",
    "description": "Malignant neoplasm of endocervix"
  },
  {
    "code": "C53.1",
    "description": "Malignant neoplasm of exocervix"
  },
  {
    "code": "C53.8",
    "description": "Malignant neoplasm of overlapping sites of cervix uteri"
  },
  {
    "code": "C53.9",
    "description": "Malignant neoplasm of cervix uteri, unspecified"
  },
  {
    "code": "C54.0",
    "description": "Malignant neoplasm of isthmus uteri"
  },
  {
    "code": "C54.1",
    "description": "Malignant neoplasm of endometrium"
  },
  {
    "code": "C54.2",
    "description": "Malignant neoplasm of myometrium"
  },
  {
    "code": "C54.3",
    "description": "Malignant neoplasm of fundus uteri"
  },
  {
    "code": "C54.8",
    "description": "Malignant neoplasm of overlapping sites of corpus uteri"
  },
  {
    "code": "C54.9",
    "description": "Malignant neoplasm of corpus uteri, unspecified"
  },
  {
    "code": "C55",
    "description": "Malignant neoplasm of uterus, part unspecified"
  },
  {
    "code": "C56.1",
    "description": "Malignant neoplasm of right ovary"
  },
  {
    "code": "C56.2",
    "description": "Malignant neoplasm of left ovary"
  },
  {
    "code": "C56.9",
    "description": "Malignant neoplasm of unspecified ovary"
  },
  {
    "code": "C57.00",
    "description": "Malignant neoplasm of unspecified fallopian tube"
  },
  {
    "code": "C57.01",
    "description": "Malignant neoplasm of right fallopian tube"
  },
  {
    "code": "C57.02",
    "description": "Malignant neoplasm of left fallopian tube"
  },
  {
    "code": "C57.10",
    "description": "Malignant neoplasm of unspecified broad ligament"
  },
  {
    "code": "C57.11",
    "description": "Malignant neoplasm of right broad ligament"
  },
  {
    "code": "C57.12",
    "description": "Malignant neoplasm of left broad ligament"
  },
  {
    "code": "C57.20",
    "description": "Malignant neoplasm of unspecified round ligament"
  },
  {
    "code": "C57.21",
    "description": "Malignant neoplasm of right round ligament"
  },
  {
    "code": "C57.22",
    "description": "Malignant neoplasm of left round ligament"
  },
  {
    "code": "C57.3",
    "description": "Malignant neoplasm of parametrium"
  },
  {
    "code": "C57.4",
    "description": "Malignant neoplasm of uterine adnexa, unspecified"
  },
  {
    "code": "C57.7",
    "description": "Malignant neoplasm of other specified female genital organs"
  },
  {
    "code": "C57.8",
    "description": "Malignant neoplasm of overlapping sites of female genital organs"
  },
  {
    "code": "C57.9",
    "description": "Malignant neoplasm of female genital organ, unspecified"
  },
  {
    "code": "C58",
    "description": "Malignant neoplasm of placenta"
  },
  {
    "code": "C60.0",
    "description": "Malignant neoplasm of prepuce"
  },
  {
    "code": "C60.1",
    "description": "Malignant neoplasm of glans penis"
  },
  {
    "code": "C60.2",
    "description": "Malignant neoplasm of body of penis"
  },
  {
    "code": "C60.8",
    "description": "Malignant neoplasm of overlapping sites of penis"
  },
  {
    "code": "C60.9",
    "description": "Malignant neoplasm of penis, unspecified"
  },
  {
    "code": "C61",
    "description": "Malignant neoplasm of prostate"
  },
  {
    "code": "C62.00",
    "description": "Malignant neoplasm of unspecified undescended testis"
  },
  {
    "code": "C62.01",
    "description": "Malignant neoplasm of right undescended testis"
  },
  {
    "code": "C62.02",
    "description": "Malignant neoplasm of left undescended testis"
  },
  {
    "code": "C62.10",
    "description": "Malignant neoplasm of unspecified descended testis"
  },
  {
    "code": "C62.11",
    "description": "Malignant neoplasm of right descended testis"
  },
  {
    "code": "C62.12",
    "description": "Malignant neoplasm of left descended testis"
  },
  {
    "code": "C62.90",
    "description": "Malignant neoplasm of unspecified testis, unspecified whether descended or undescended"
  },
  {
    "code": "C62.91",
    "description": "Malignant neoplasm of right testis, unspecified whether descended or undescended"
  },
  {
    "code": "C62.92",
    "description": "Malignant neoplasm of left testis, unspecified whether descended or undescended"
  },
  {
    "code": "C63.00",
    "description": "Malignant neoplasm of unspecified epididymis"
  },
  {
    "code": "C63.01",
    "description": "Malignant neoplasm of right epididymis"
  },
  {
    "code": "C63.02",
    "description": "Malignant neoplasm of left epididymis"
  },
  {
    "code": "C63.10",
    "description": "Malignant neoplasm of unspecified spermatic cord"
  },
  {
    "code": "C63.11",
    "description": "Malignant neoplasm of right spermatic cord"
  },
  {
    "code": "C63.12",
    "description": "Malignant neoplasm of left spermatic cord"
  },
  {
    "code": "C63.2",
    "description": "Malignant neoplasm of scrotum"
  },
  {
    "code": "C63.7",
    "description": "Malignant neoplasm of other specified male genital organs"
  },
  {
    "code": "C63.8",
    "description": "Malignant neoplasm of overlapping sites of male genital organs"
  },
  {
    "code": "C63.9",
    "description": "Malignant neoplasm of male genital organ, unspecified"
  },
  {
    "code": "C64.1",
    "description": "Malignant neoplasm of right kidney, except renal pelvis"
  },
  {
    "code": "C64.2",
    "description": "Malignant neoplasm of left kidney, except renal pelvis"
  },
  {
    "code": "C64.9",
    "description": "Malignant neoplasm of unspecified kidney, except renal pelvis"
  },
  {
    "code": "C65.1",
    "description": "Malignant neoplasm of right renal pelvis"
  },
  {
    "code": "C65.2",
    "description": "Malignant neoplasm of left renal pelvis"
  },
  {
    "code": "C65.9",
    "description": "Malignant neoplasm of unspecified renal pelvis"
  },
  {
    "code": "C66.1",
    "description": "Malignant neoplasm of right ureter"
  },
  {
    "code": "C66.2",
    "description": "Malignant neoplasm of left ureter"
  },
  {
    "code": "C66.9",
    "description": "Malignant neoplasm of unspecified ureter"
  },
  {
    "code": "C67.0",
    "description": "Malignant neoplasm of trigone of bladder"
  },
  {
    "code": "C67.1",
    "description": "Malignant neoplasm of dome of bladder"
  },
  {
    "code": "C67.2",
    "description": "Malignant neoplasm of lateral wall of bladder"
  },
  {
    "code": "C67.3",
    "description": "Malignant neoplasm of anterior wall of bladder"
  },
  {
    "code": "C67.4",
    "description": "Malignant neoplasm of posterior wall of bladder"
  },
  {
    "code": "C67.5",
    "description": "Malignant neoplasm of bladder neck"
  },
  {
    "code": "C67.6",
    "description": "Malignant neoplasm of ureteric orifice"
  },
  {
    "code": "C67.7",
    "description": "Malignant neoplasm of urachus"
  },
  {
    "code": "C67.8",
    "description": "Malignant neoplasm of overlapping sites of bladder"
  },
  {
    "code": "C67.9",
    "description": "Malignant neoplasm of bladder, unspecified"
  },
  {
    "code": "C68.0",
    "description": "Malignant neoplasm of urethra"
  },
  {
    "code": "C68.1",
    "description": "Malignant neoplasm of paraurethral glands"
  },
  {
    "code": "C68.8",
    "description": "Malignant neoplasm of overlapping sites of urinary organs"
  },
  {
    "code": "C68.9",
    "description": "Malignant neoplasm of urinary organ, unspecified"
  },
  {
    "code": "C69.00",
    "description": "Malignant neoplasm of unspecified conjunctiva"
  },
  {
    "code": "C69.01",
    "description": "Malignant neoplasm of right conjunctiva"
  },
  {
    "code": "C69.02",
    "description": "Malignant neoplasm of left conjunctiva"
  },
  {
    "code": "C69.10",
    "description": "Malignant neoplasm of unspecified cornea"
  },
  {
    "code": "C69.11",
    "description": "Malignant neoplasm of right cornea"
  },
  {
    "code": "C69.12",
    "description": "Malignant neoplasm of left cornea"
  },
  {
    "code": "C69.20",
    "description": "Malignant neoplasm of unspecified retina"
  },
  {
    "code": "C69.21",
    "description": "Malignant neoplasm of right retina"
  },
  {
    "code": "C69.22",
    "description": "Malignant neoplasm of left retina"
  },
  {
    "code": "C69.30",
    "description": "Malignant neoplasm of unspecified choroid"
  },
  {
    "code": "C69.31",
    "description": "Malignant neoplasm of right choroid"
  },
  {
    "code": "C69.32",
    "description": "Malignant neoplasm of left choroid"
  },
  {
    "code": "C69.40",
    "description": "Malignant neoplasm of unspecified ciliary body"
  },
  {
    "code": "C69.41",
    "description": "Malignant neoplasm of right ciliary body"
  },
  {
    "code": "C69.42",
    "description": "Malignant neoplasm of left ciliary body"
  },
  {
    "code": "C69.50",
    "description": "Malignant neoplasm of unspecified lacrimal gland and duct"
  },
  {
    "code": "C69.51",
    "description": "Malignant neoplasm of right lacrimal gland and duct"
  },
  {
    "code": "C69.52",
    "description": "Malignant neoplasm of left lacrimal gland and duct"
  },
  {
    "code": "C69.60",
    "description": "Malignant neoplasm of unspecified orbit"
  },
  {
    "code": "C69.61",
    "description": "Malignant neoplasm of right orbit"
  },
  {
    "code": "C69.62",
    "description": "Malignant neoplasm of left orbit"
  },
  {
    "code": "C69.80",
    "description": "Malignant neoplasm of overlapping sites of unspecified eye and adnexa"
  },
  {
    "code": "C69.81",
    "description": "Malignant neoplasm of overlapping sites of right eye and adnexa"
  },
  {
    "code": "C69.82",
    "description": "Malignant neoplasm of overlapping sites of left eye and adnexa"
  },
  {
    "code": "C69.90",
    "description": "Malignant neoplasm of unspecified site of unspecified eye"
  },
  {
    "code": "C69.91",
    "description": "Malignant neoplasm of unspecified site of right eye"
  },
  {
    "code": "C69.92",
    "description": "Malignant neoplasm of unspecified site of left eye"
  },
  {
    "code": "C70.0",
    "description": "Malignant neoplasm of cerebral meninges"
  },
  {
    "code": "C70.1",
    "description": "Malignant neoplasm of spinal meninges"
  },
  {
    "code": "C70.9",
    "description": "Malignant neoplasm of meninges, unspecified"
  },
  {
    "code": "C71.0",
    "description": "Malignant neoplasm of cerebrum, except lobes and ventricles"
  },
  {
    "code": "C71.1",
    "description": "Malignant neoplasm of frontal lobe"
  },
  {
    "code": "C71.2",
    "description": "Malignant neoplasm of temporal lobe"
  },
  {
    "code": "C71.3",
    "description": "Malignant neoplasm of parietal lobe"
  },
  {
    "code": "C71.4",
    "description": "Malignant neoplasm of occipital lobe"
  },
  {
    "code": "C71.5",
    "description": "Malignant neoplasm of cerebral ventricle"
  },
  {
    "code": "C71.6",
    "description": "Malignant neoplasm of cerebellum"
  },
  {
    "code": "C71.7",
    "description": "Malignant neoplasm of brain stem"
  },
  {
    "code": "C71.8",
    "description": "Malignant neoplasm of overlapping sites of brain"
  },
  {
    "code": "C71.9",
    "description": "Malignant neoplasm of brain, unspecified"
  },
  {
    "code": "C72.0",
    "description": "Malignant neoplasm of spinal cord"
  },
  {
    "code": "C72.1",
    "description": "Malignant neoplasm of cauda equina"
  },
  {
    "code": "C72.20",
    "description": "Malignant neoplasm of unspecified olfactory nerve"
  },
  {
    "code": "C72.21",
    "description": "Malignant neoplasm of right olfactory nerve"
  },
  {
    "code": "C72.22",
    "description": "Malignant neoplasm of left olfactory nerve"
  },
  {
    "code": "C72.30",
    "description": "Malignant neoplasm of unspecified optic nerve"
  },
  {
    "code": "C72.31",
    "description": "Malignant neoplasm of right optic nerve"
  },
  {
    "code": "C72.32",
    "description": "Malignant neoplasm of left optic nerve"
  },
  {
    "code": "C72.40",
    "description": "Malignant neoplasm of unspecified acoustic nerve"
  },
  {
    "code": "C72.41",
    "description": "Malignant neoplasm of right acoustic nerve"
  },
  {
    "code": "C72.42",
    "description": "Malignant neoplasm of left acoustic nerve"
  },
  {
    "code": "C72.50",
    "description": "Malignant neoplasm of unspecified cranial nerve"
  },
  {
    "code": "C72.59",
    "description": "Malignant neoplasm of other cranial nerves"
  },
  {
    "code": "C72.8",
    "description": "Malignant neoplasm of overlapping sites of brain and other parts of central nervous system"
  },
  {
    "code": "C72.9",
    "description": "Malignant neoplasm of central nervous system, unspecified"
  },
  {
    "code": "C73",
    "description": "Malignant neoplasm of thyroid gland"
  },
  {
    "code": "C74.00",
    "description": "Malignant neoplasm of cortex of unspecified adrenal gland"
  },
  {
    "code": "C74.01",
    "description": "Malignant neoplasm of cortex of right adrenal gland"
  },
  {
    "code": "C74.02",
    "description": "Malignant neoplasm of cortex of left adrenal gland"
  },
  {
    "code": "C74.10",
    "description": "Malignant neoplasm of medulla of unspecified adrenal gland"
  },
  {
    "code": "C74.11",
    "description": "Malignant neoplasm of medulla of right adrenal gland"
  },
  {
    "code": "C74.12",
    "description": "Malignant neoplasm of medulla of left adrenal gland"
  },
  {
    "code": "C74.90",
    "description": "Malignant neoplasm of unspecified part of unspecified adrenal gland"
  },
  {
    "code": "C74.91",
    "description": "Malignant neoplasm of unspecified part of right adrenal gland"
  },
  {
    "code": "C74.92",
    "description": "Malignant neoplasm of unspecified part of left adrenal gland"
  },
  {
    "code": "C75.0",
    "description": "Malignant neoplasm of parathyroid gland"
  },
  {
    "code": "C75.1",
    "description": "Malignant neoplasm of pituitary gland"
  },
  {
    "code": "C75.2",
    "description": "Malignant neoplasm of craniopharyngeal duct"
  },
  {
    "code": "C75.3",
    "description": "Malignant neoplasm of pineal gland"
  },
  {
    "code": "C75.4",
    "description": "Malignant neoplasm of carotid body"
  },
  {
    "code": "C75.5",
    "description": "Malignant neoplasm of aortic body and other paraganglia"
  },
  {
    "code": "C75.8",
    "description": "Malignant neoplasm with pluriglandular involvement, unspecified"
  },
  {
    "code": "C75.9",
    "description": "Malignant neoplasm of endocrine gland, unspecified"
  },
  {
    "code": "C76.0",
    "description": "Malignant neoplasm of head, face and neck"
  },
  {
    "code": "C76.1",
    "description": "Malignant neoplasm of thorax"
  },
  {
    "code": "C76.2",
    "description": "Malignant neoplasm of abdomen"
  },
  {
    "code": "C76.3",
    "description": "Malignant neoplasm of pelvis"
  },
  {
    "code": "C76.40",
    "description": "Malignant neoplasm of unspecified upper limb"
  },
  {
    "code": "C76.41",
    "description": "Malignant neoplasm of right upper limb"
  },
  {
    "code": "C76.42",
    "description": "Malignant neoplasm of left upper limb"
  },
  {
    "code": "C76.50",
    "description": "Malignant neoplasm of unspecified lower limb"
  },
  {
    "code": "C76.51",
    "description": "Malignant neoplasm of right lower limb"
  },
  {
    "code": "C76.52",
    "description": "Malignant neoplasm of left lower limb"
  },
  {
    "code": "C76.8",
    "description": "Malignant neoplasm of other specified ill-defined sites"
  },
  {
    "code": "C77.0",
    "description": "Secondary and unspecified malignant neoplasm of lymph nodes of head, face and neck"
  },
  {
    "code": "C77.1",
    "description": "Secondary and unspecified malignant neoplasm of intrathoracic lymph nodes"
  },
  {
    "code": "C77.2",
    "description": "Secondary and unspecified malignant neoplasm of intra-abdominal lymph nodes"
  },
  {
    "code": "C77.3",
    "description": "Secondary and unspecified malignant neoplasm of axillary and upper limb lymph nodes"
  },
  {
    "code": "C77.4",
    "description": "Secondary and unspecified malignant neoplasm of inguinal and lower limb lymph nodes"
  },
  {
    "code": "C77.5",
    "description": "Secondary and unspecified malignant neoplasm of intrapelvic lymph nodes"
  },
  {
    "code": "C77.8",
    "description": "Secondary and unspecified malignant neoplasm of lymph nodes of multiple regions"
  },
  {
    "code": "C77.9",
    "description": "Secondary and unspecified malignant neoplasm of lymph node, unspecified"
  },
  {
    "code": "C78.00",
    "description": "Secondary malignant neoplasm of unspecified lung"
  },
  {
    "code": "C78.01",
    "description": "Secondary malignant neoplasm of right lung"
  },
  {
    "code": "C78.02",
    "description": "Secondary malignant neoplasm of left lung"
  },
  {
    "code": "C78.1",
    "description": "Secondary malignant neoplasm of mediastinum"
  },
  {
    "code": "C78.2",
    "description": "Secondary malignant neoplasm of pleura"
  },
  {
    "code": "C78.30",
    "description": "Secondary malignant neoplasm of unspecified respiratory organ"
  },
  {
    "code": "C78.39",
    "description": "Secondary malignant neoplasm of other respiratory organs"
  },
  {
    "code": "C78.4",
    "description": "Secondary malignant neoplasm of small intestine"
  },
  {
    "code": "C78.5",
    "description": "Secondary malignant neoplasm of large intestine and rectum"
  },
  {
    "code": "C78.6",
    "description": "Secondary malignant neoplasm of retroperitoneum and peritoneum"
  },
  {
    "code": "C78.7",
    "description": "Secondary malignant neoplasm of liver and intrahepatic bile duct"
  },
  {
    "code": "C78.80",
    "description": "Secondary malignant neoplasm of unspecified digestive organ"
  },
  {
    "code": "C78.89",
    "description": "Secondary malignant neoplasm of other digestive organs"
  },
  {
    "code": "C79.00",
    "description": "Secondary malignant neoplasm of unspecified kidney and renal pelvis"
  },
  {
    "code": "C79.01",
    "description": "Secondary malignant neoplasm of right kidney and renal pelvis"
  },
  {
    "code": "C79.02",
    "description": "Secondary malignant neoplasm of left kidney and renal pelvis"
  },
  {
    "code": "C79.10",
    "description": "Secondary malignant neoplasm of unspecified urinary organs"
  },
  {
    "code": "C79.11",
    "description": "Secondary malignant neoplasm of bladder"
  },
  {
    "code": "C79.19",
    "description": "Secondary malignant neoplasm of other urinary organs"
  },
  {
    "code": "C79.2",
    "description": "Secondary malignant neoplasm of skin"
  },
  {
    "code": "C79.31",
    "description": "Secondary malignant neoplasm of brain"
  },
  {
    "code": "C79.32",
    "description": "Secondary malignant neoplasm of cerebral meninges"
  },
  {
    "code": "C79.40",
    "description": "Secondary malignant neoplasm of unspecified part of nervous system"
  },
  {
    "code": "C79.49",
    "description": "Secondary malignant neoplasm of other parts of nervous system"
  },
  {
    "code": "C79.51",
    "description": "Secondary malignant neoplasm of bone"
  },
  {
    "code": "C79.52",
    "description": "Secondary malignant neoplasm of bone marrow"
  },
  {
    "code": "C79.60",
    "description": "Secondary malignant neoplasm of unspecified ovary"
  },
  {
    "code": "C79.61",
    "description": "Secondary malignant neoplasm of right ovary"
  },
  {
    "code": "C79.62",
    "description": "Secondary malignant neoplasm of left ovary"
  },
  {
    "code": "C79.70",
    "description": "Secondary malignant neoplasm of unspecified adrenal gland"
  },
  {
    "code": "C79.71",
    "description": "Secondary malignant neoplasm of right adrenal gland"
  },
  {
    "code": "C79.72",
    "description": "Secondary malignant neoplasm of left adrenal gland"
  },
  {
    "code": "C79.81",
    "description": "Secondary malignant neoplasm of breast"
  },
  {
    "code": "C79.82",
    "description": "Secondary malignant neoplasm of genital organs"
  },
  {
    "code": "C79.89",
    "description": "Secondary malignant neoplasm of other specified sites"
  },
  {
    "code": "C79.9",
    "description": "Secondary malignant neoplasm of unspecified site"
  },
  {
    "code": "C80.0",
    "description": "Disseminated malignant neoplasm, unspecified"
  },
  {
    "code": "C80.1",
    "description": "Malignant (primary) neoplasm, unspecified"
  },
  {
    "code": "C80.2",
    "description": "Malignant neoplasm associated with transplanted organ"
  },
  {
    "code": "C81.00",
    "description": "Nodular lymphocyte predominant Hodgkin lymphoma, unspecified site"
  },
  {
    "code": "C81.01",
    "description": "Nodular lymphocyte predominant Hodgkin lymphoma, lymph nodes of head, face, and neck"
  },
  {
    "code": "C81.02",
    "description": "Nodular lymphocyte predominant Hodgkin lymphoma, intrathoracic lymph nodes"
  },
  {
    "code": "C81.03",
    "description": "Nodular lymphocyte predominant Hodgkin lymphoma, intra-abdominal lymph nodes"
  },
  {
    "code": "C81.04",
    "description": "Nodular lymphocyte predominant Hodgkin lymphoma, lymph nodes of axilla and upper limb"
  },
  {
    "code": "C81.05",
    "description": "Nodular lymphocyte predominant Hodgkin lymphoma, lymph nodes of inguinal region and lower limb"
  },
  {
    "code": "C81.06",
    "description": "Nodular lymphocyte predominant Hodgkin lymphoma, intrapelvic lymph nodes"
  },
  {
    "code": "C81.07",
    "description": "Nodular lymphocyte predominant Hodgkin lymphoma, spleen"
  },
  {
    "code": "C81.08",
    "description": "Nodular lymphocyte predominant Hodgkin lymphoma, lymph nodes of multiple sites"
  },
  {
    "code": "C81.09",
    "description": "Nodular lymphocyte predominant Hodgkin lymphoma, extranodal and solid organ sites"
  },
  {
    "code": "C81.10",
    "description": "Nodular sclerosis Hodgkin lymphoma, unspecified site"
  },
  {
    "code": "C81.11",
    "description": "Nodular sclerosis Hodgkin lymphoma, lymph nodes of head, face, and neck"
  },
  {
    "code": "C81.12",
    "description": "Nodular sclerosis Hodgkin lymphoma, intrathoracic lymph nodes"
  },
  {
    "code": "C81.13",
    "description": "Nodular sclerosis Hodgkin lymphoma, intra-abdominal lymph nodes"
  },
  {
    "code": "C81.14",
    "description": "Nodular sclerosis Hodgkin lymphoma, lymph nodes of axilla and upper limb"
  },
  {
    "code": "C81.15",
    "description": "Nodular sclerosis Hodgkin lymphoma, lymph nodes of inguinal region and lower limb"
  },
  {
    "code": "C81.16",
    "description": "Nodular sclerosis Hodgkin lymphoma, intrapelvic lymph nodes"
  },
  {
    "code": "C81.17",
    "description": "Nodular sclerosis Hodgkin lymphoma, spleen"
  },
  {
    "code": "C81.18",
    "description": "Nodular sclerosis Hodgkin lymphoma, lymph nodes of multiple sites"
  },
  {
    "code": "C81.19",
    "description": "Nodular sclerosis Hodgkin lymphoma, extranodal and solid organ sites"
  },
  {
    "code": "C81.20",
    "description": "Mixed cellularity Hodgkin lymphoma, unspecified site"
  },
  {
    "code": "C81.21",
    "description": "Mixed cellularity Hodgkin lymphoma, lymph nodes of head, face, and neck"
  },
  {
    "code": "C81.22",
    "description": "Mixed cellularity Hodgkin lymphoma, intrathoracic lymph nodes"
  },
  {
    "code": "C81.23",
    "description": "Mixed cellularity Hodgkin lymphoma, intra-abdominal lymph nodes"
  },
  {
    "code": "C81.24",
    "description": "Mixed cellularity Hodgkin lymphoma, lymph nodes of axilla and upper limb"
  },
  {
    "code": "C81.25",
    "description": "Mixed cellularity Hodgkin lymphoma, lymph nodes of inguinal region and lower limb"
  },
  {
    "code": "C81.26",
    "description": "Mixed cellularity Hodgkin lymphoma, intrapelvic lymph nodes"
  },
  {
    "code": "C81.27",
    "description": "Mixed cellularity Hodgkin lymphoma, spleen"
  },
  {
    "code": "C81.28",
    "description": "Mixed cellularity Hodgkin lymphoma, lymph nodes of multiple sites"
  },
  {
    "code": "C81.29",
    "description": "Mixed cellularity Hodgkin lymphoma, extranodal and solid organ sites"
  },
  {
    "code": "C81.30",
    "description": "Lymphocyte depleted Hodgkin lymphoma, unspecified site"
  },
  {
    "code": "C81.31",
    "description": "Lymphocyte depleted Hodgkin lymphoma, lymph nodes of head, face, and neck"
  },
  {
    "code": "C81.32",
    "description": "Lymphocyte depleted Hodgkin lymphoma, intrathoracic lymph nodes"
  },
  {
    "code": "C81.33",
    "description": "Lymphocyte depleted Hodgkin lymphoma, intra-abdominal lymph nodes"
  },
  {
    "code": "C81.34",
    "description": "Lymphocyte depleted Hodgkin lymphoma, lymph nodes of axilla and upper limb"
  },
  {
    "code": "C81.35",
    "description": "Lymphocyte depleted Hodgkin lymphoma, lymph nodes of inguinal region and lower limb"
  },
  {
    "code": "C81.36",
    "description": "Lymphocyte depleted Hodgkin lymphoma, intrapelvic lymph nodes"
  },
  {
    "code": "C81.37",
    "description": "Lymphocyte depleted Hodgkin lymphoma, spleen"
  },
  {
    "code": "C81.38",
    "description": "Lymphocyte depleted Hodgkin lymphoma, lymph nodes of multiple sites"
  },
  {
    "code": "C81.39",
    "description": "Lymphocyte depleted Hodgkin lymphoma, extranodal and solid organ sites"
  },
  {
    "code": "C81.40",
    "description": "Lymphocyte-rich Hodgkin lymphoma, unspecified site"
  },
  {
    "code": "C81.41",
    "description": "Lymphocyte-rich Hodgkin lymphoma, lymph nodes of head, face, and neck"
  },
  {
    "code": "C81.42",
    "description": "Lymphocyte-rich Hodgkin lymphoma, intrathoracic lymph nodes"
  },
  {
    "code": "C81.43",
    "description": "Lymphocyte-rich Hodgkin lymphoma, intra-abdominal lymph nodes"
  },
  {
    "code": "C81.44",
    "description": "Lymphocyte-rich Hodgkin lymphoma, lymph nodes of axilla and upper limb"
  },
  {
    "code": "C81.45",
    "description": "Lymphocyte-rich Hodgkin lymphoma, lymph nodes of inguinal region and lower limb"
  },
  {
    "code": "C81.46",
    "description": "Lymphocyte-rich Hodgkin lymphoma, intrapelvic lymph nodes"
  },
  {
    "code": "C81.47",
    "description": "Lymphocyte-rich Hodgkin lymphoma, spleen"
  },
  {
    "code": "C81.48",
    "description": "Lymphocyte-rich Hodgkin lymphoma, lymph nodes of multiple sites"
  },
  {
    "code": "C81.49",
    "description": "Lymphocyte-rich Hodgkin lymphoma, extranodal and solid organ sites"
  },
  {
    "code": "C81.70",
    "description": "Other Hodgkin lymphoma, unspecified site"
  },
  {
    "code": "C81.71",
    "description": "Other Hodgkin lymphoma, lymph nodes of head, face, and neck"
  },
  {
    "code": "C81.72",
    "description": "Other Hodgkin lymphoma, intrathoracic lymph nodes"
  },
  {
    "code": "C81.73",
    "description": "Other Hodgkin lymphoma, intra-abdominal lymph nodes"
  },
  {
    "code": "C81.74",
    "description": "Other Hodgkin lymphoma, lymph nodes of axilla and upper limb"
  },
  {
    "code": "C81.75",
    "description": "Other Hodgkin lymphoma, lymph nodes of inguinal region and lower limb"
  },
  {
    "code": "C81.76",
    "description": "Other Hodgkin lymphoma, intrapelvic lymph nodes"
  },
  {
    "code": "C81.77",
    "description": "Other Hodgkin lymphoma, spleen"
  },
  {
    "code": "C81.78",
    "description": "Other Hodgkin lymphoma, lymph nodes of multiple sites"
  },
  {
    "code": "C81.79",
    "description": "Other Hodgkin lymphoma, extranodal and solid organ sites"
  },
  {
    "code": "C81.90",
    "description": "Hodgkin lymphoma, unspecified, unspecified site"
  },
  {
    "code": "C81.91",
    "description": "Hodgkin lymphoma, unspecified, lymph nodes of head, face, and neck"
  },
  {
    "code": "C81.92",
    "description": "Hodgkin lymphoma, unspecified, intrathoracic lymph nodes"
  },
  {
    "code": "C81.93",
    "description": "Hodgkin lymphoma, unspecified, intra-abdominal lymph nodes"
  },
  {
    "code": "C81.94",
    "description": "Hodgkin lymphoma, unspecified, lymph nodes of axilla and upper limb"
  },
  {
    "code": "C81.95",
    "description": "Hodgkin lymphoma, unspecified, lymph nodes of inguinal region and lower limb"
  },
  {
    "code": "C81.96",
    "description": "Hodgkin lymphoma, unspecified, intrapelvic lymph nodes"
  },
  {
    "code": "C81.97",
    "description": "Hodgkin lymphoma, unspecified, spleen"
  },
  {
    "code": "C81.98",
    "description": "Hodgkin lymphoma, unspecified, lymph nodes of multiple sites"
  },
  {
    "code": "C81.99",
    "description": "Hodgkin lymphoma, unspecified, extranodal and solid organ sites"
  },
  {
    "code": "C82.00",
    "description": "Follicular lymphoma grade I, unspecified site"
  },
  {
    "code": "C82.01",
    "description": "Follicular lymphoma grade I, lymph nodes of head, face, and neck"
  },
  {
    "code": "C82.02",
    "description": "Follicular lymphoma grade I, intrathoracic lymph nodes"
  },
  {
    "code": "C82.03",
    "description": "Follicular lymphoma grade I, intra-abdominal lymph nodes"
  },
  {
    "code": "C82.04",
    "description": "Follicular lymphoma grade I, lymph nodes of axilla and upper limb"
  },
  {
    "code": "C82.05",
    "description": "Follicular lymphoma grade I, lymph nodes of inguinal region and lower limb"
  },
  {
    "code": "C82.06",
    "description": "Follicular lymphoma grade I, intrapelvic lymph nodes"
  },
  {
    "code": "C82.07",
    "description": "Follicular lymphoma grade I, spleen"
  },
  {
    "code": "C82.08",
    "description": "Follicular lymphoma grade I, lymph nodes of multiple sites"
  },
  {
    "code": "C82.09",
    "description": "Follicular lymphoma grade I, extranodal and solid organ sites"
  },
  {
    "code": "C82.10",
    "description": "Follicular lymphoma grade II, unspecified site"
  },
  {
    "code": "C82.11",
    "description": "Follicular lymphoma grade II, lymph nodes of head, face, and neck"
  },
  {
    "code": "C82.12",
    "description": "Follicular lymphoma grade II, intrathoracic lymph nodes"
  },
  {
    "code": "C82.13",
    "description": "Follicular lymphoma grade II, intra-abdominal lymph nodes"
  },
  {
    "code": "C82.14",
    "description": "Follicular lymphoma grade II, lymph nodes of axilla and upper limb"
  },
  {
    "code": "C82.15",
    "description": "Follicular lymphoma grade II, lymph nodes of inguinal region and lower limb"
  },
  {
    "code": "C82.16",
    "description": "Follicular lymphoma grade II, intrapelvic lymph nodes"
  },
  {
    "code": "C82.17",
    "description": "Follicular lymphoma grade II, spleen"
  },
  {
    "code": "C82.18",
    "description": "Follicular lymphoma grade II, lymph nodes of multiple sites"
  },
  {
    "code": "C82.19",
    "description": "Follicular lymphoma grade II, extranodal and solid organ sites"
  },
  {
    "code": "C82.20",
    "description": "Follicular lymphoma grade III, unspecified, unspecified site"
  },
  {
    "code": "C82.21",
    "description": "Follicular lymphoma grade III, unspecified, lymph nodes of head, face, and neck"
  },
  {
    "code": "C82.22",
    "description": "Follicular lymphoma grade III, unspecified, intrathoracic lymph nodes"
  },
  {
    "code": "C82.23",
    "description": "Follicular lymphoma grade III, unspecified, intra-abdominal lymph nodes"
  },
  {
    "code": "C82.24",
    "description": "Follicular lymphoma grade III, unspecified, lymph nodes of axilla and upper limb"
  },
  {
    "code": "C82.25",
    "description": "Follicular lymphoma grade III, unspecified, lymph nodes of inguinal region and lower limb"
  },
  {
    "code": "C82.26",
    "description": "Follicular lymphoma grade III, unspecified, intrapelvic lymph nodes"
  },
  {
    "code": "C82.27",
    "description": "Follicular lymphoma grade III, unspecified, spleen"
  },
  {
    "code": "C82.28",
    "description": "Follicular lymphoma grade III, unspecified, lymph nodes of multiple sites"
  },
  {
    "code": "C82.29",
    "description": "Follicular lymphoma grade III, unspecified, extranodal and solid organ sites"
  },
  {
    "code": "C82.30",
    "description": "Follicular lymphoma grade IIIa, unspecified site"
  },
  {
    "code": "C82.31",
    "description": "Follicular lymphoma grade IIIa, lymph nodes of head, face, and neck"
  },
  {
    "code": "C82.32",
    "description": "Follicular lymphoma grade IIIa, intrathoracic lymph nodes"
  },
  {
    "code": "C82.33",
    "description": "Follicular lymphoma grade IIIa, intra-abdominal lymph nodes"
  },
  {
    "code": "C82.34",
    "description": "Follicular lymphoma grade IIIa, lymph nodes of axilla and upper limb"
  },
  {
    "code": "C82.35",
    "description": "Follicular lymphoma grade IIIa, lymph nodes of inguinal region and lower limb"
  },
  {
    "code": "C82.36",
    "description": "Follicular lymphoma grade IIIa, intrapelvic lymph nodes"
  },
  {
    "code": "C82.37",
    "description": "Follicular lymphoma grade IIIa, spleen"
  },
  {
    "code": "C82.38",
    "description": "Follicular lymphoma grade IIIa, lymph nodes of multiple sites"
  },
  {
    "code": "C82.39",
    "description": "Follicular lymphoma grade IIIa, extranodal and solid organ sites"
  },
  {
    "code": "C82.40",
    "description": "Follicular lymphoma grade IIIb, unspecified site"
  },
  {
    "code": "C82.41",
    "description": "Follicular lymphoma grade IIIb, lymph nodes of head, face, and neck"
  },
  {
    "code": "C82.42",
    "description": "Follicular lymphoma grade IIIb, intrathoracic lymph nodes"
  },
  {
    "code": "C82.43",
    "description": "Follicular lymphoma grade IIIb, intra-abdominal lymph nodes"
  },
  {
    "code": "C82.44",
    "description": "Follicular lymphoma grade IIIb, lymph nodes of axilla and upper limb"
  },
  {
    "code": "C82.45",
    "description": "Follicular lymphoma grade IIIb, lymph nodes of inguinal region and lower limb"
  },
  {
    "code": "C82.46",
    "description": "Follicular lymphoma grade IIIb, intrapelvic lymph nodes"
  },
  {
    "code": "C82.47",
    "description": "Follicular lymphoma grade IIIb, spleen"
  },
  {
    "code": "C82.48",
    "description": "Follicular lymphoma grade IIIb, lymph nodes of multiple sites"
  },
  {
    "code": "C82.49",
    "description": "Follicular lymphoma grade IIIb, extranodal and solid organ sites"
  },
  {
    "code": "C82.50",
    "description": "Diffuse follicle center lymphoma, unspecified site"
  },
  {
    "code": "C82.51",
    "description": "Diffuse follicle center lymphoma, lymph nodes of head, face, and neck"
  },
  {
    "code": "C82.52",
    "description": "Diffuse follicle center lymphoma, intrathoracic lymph nodes"
  },
  {
    "code": "C82.53",
    "description": "Diffuse follicle center lymphoma, intra-abdominal lymph nodes"
  },
  {
    "code": "C82.54",
    "description": "Diffuse follicle center lymphoma, lymph nodes of axilla and upper limb"
  },
  {
    "code": "C82.55",
    "description": "Diffuse follicle center lymphoma, lymph nodes of inguinal region and lower limb"
  },
  {
    "code": "C82.56",
    "description": "Diffuse follicle center lymphoma, intrapelvic lymph nodes"
  },
  {
    "code": "C82.57",
    "description": "Diffuse follicle center lymphoma, spleen"
  },
  {
    "code": "C82.58",
    "description": "Diffuse follicle center lymphoma, lymph nodes of multiple sites"
  },
  {
    "code": "C82.59",
    "description": "Diffuse follicle center lymphoma, extranodal and solid organ sites"
  },
  {
    "code": "C82.60",
    "description": "Cutaneous follicle center lymphoma, unspecified site"
  },
  {
    "code": "C82.61",
    "description": "Cutaneous follicle center lymphoma, lymph nodes of head, face, and neck"
  },
  {
    "code": "C82.62",
    "description": "Cutaneous follicle center lymphoma, intrathoracic lymph nodes"
  },
  {
    "code": "C82.63",
    "description": "Cutaneous follicle center lymphoma, intra-abdominal lymph nodes"
  },
  {
    "code": "C82.64",
    "description": "Cutaneous follicle center lymphoma, lymph nodes of axilla and upper limb"
  },
  {
    "code": "C82.65",
    "description": "Cutaneous follicle center lymphoma, lymph nodes of inguinal region and lower limb"
  },
  {
    "code": "C82.66",
    "description": "Cutaneous follicle center lymphoma, intrapelvic lymph nodes"
  },
  {
    "code": "C82.67",
    "description": "Cutaneous follicle center lymphoma, spleen"
  },
  {
    "code": "C82.68",
    "description": "Cutaneous follicle center lymphoma, lymph nodes of multiple sites"
  },
  {
    "code": "C82.69",
    "description": "Cutaneous follicle center lymphoma, extranodal and solid organ sites"
  },
  {
    "code": "C82.80",
    "description": "Other types of follicular lymphoma, unspecified site"
  },
  {
    "code": "C82.81",
    "description": "Other types of follicular lymphoma, lymph nodes of head, face, and neck"
  },
  {
    "code": "C82.82",
    "description": "Other types of follicular lymphoma, intrathoracic lymph nodes"
  },
  {
    "code": "C82.83",
    "description": "Other types of follicular lymphoma, intra-abdominal lymph nodes"
  },
  {
    "code": "C82.84",
    "description": "Other types of follicular lymphoma, lymph nodes of axilla and upper limb"
  },
  {
    "code": "C82.85",
    "description": "Other types of follicular lymphoma, lymph nodes of inguinal region and lower limb"
  },
  {
    "code": "C82.86",
    "description": "Other types of follicular lymphoma, intrapelvic lymph nodes"
  },
  {
    "code": "C82.87",
    "description": "Other types of follicular lymphoma, spleen"
  },
  {
    "code": "C82.88",
    "description": "Other types of follicular lymphoma, lymph nodes of multiple sites"
  },
  {
    "code": "C82.89",
    "description": "Other types of follicular lymphoma, extranodal and solid organ sites"
  },
  {
    "code": "C82.90",
    "description": "Follicular lymphoma, unspecified, unspecified site"
  },
  {
    "code": "C82.91",
    "description": "Follicular lymphoma, unspecified, lymph nodes of head, face, and neck"
  },
  {
    "code": "C82.92",
    "description": "Follicular lymphoma, unspecified, intrathoracic lymph nodes"
  },
  {
    "code": "C82.93",
    "description": "Follicular lymphoma, unspecified, intra-abdominal lymph nodes"
  },
  {
    "code": "C82.94",
    "description": "Follicular lymphoma, unspecified, lymph nodes of axilla and upper limb"
  },
  {
    "code": "C82.95",
    "description": "Follicular lymphoma, unspecified, lymph nodes of inguinal region and lower limb"
  },
  {
    "code": "C82.96",
    "description": "Follicular lymphoma, unspecified, intrapelvic lymph nodes"
  },
  {
    "code": "C82.97",
    "description": "Follicular lymphoma, unspecified, spleen"
  },
  {
    "code": "C82.98",
    "description": "Follicular lymphoma, unspecified, lymph nodes of multiple sites"
  },
  {
    "code": "C82.99",
    "description": "Follicular lymphoma, unspecified, extranodal and solid organ sites"
  },
  {
    "code": "C83.00",
    "description": "Small cell B-cell lymphoma, unspecified site"
  },
  {
    "code": "C83.01",
    "description": "Small cell B-cell lymphoma, lymph nodes of head, face, and neck"
  },
  {
    "code": "C83.02",
    "description": "Small cell B-cell lymphoma, intrathoracic lymph nodes"
  },
  {
    "code": "C83.03",
    "description": "Small cell B-cell lymphoma, intra-abdominal lymph nodes"
  },
  {
    "code": "C83.04",
    "description": "Small cell B-cell lymphoma, lymph nodes of axilla and upper limb"
  },
  {
    "code": "C83.05",
    "description": "Small cell B-cell lymphoma, lymph nodes of inguinal region and lower limb"
  },
  {
    "code": "C83.06",
    "description": "Small cell B-cell lymphoma, intrapelvic lymph nodes"
  },
  {
    "code": "C83.07",
    "description": "Small cell B-cell lymphoma, spleen"
  },
  {
    "code": "C83.08",
    "description": "Small cell B-cell lymphoma, lymph nodes of multiple sites"
  },
  {
    "code": "C83.09",
    "description": "Small cell B-cell lymphoma, extranodal and solid organ sites"
  },
  {
    "code": "C83.10",
    "description": "Mantle cell lymphoma, unspecified site"
  },
  {
    "code": "C83.11",
    "description": "Mantle cell lymphoma, lymph nodes of head, face, and neck"
  },
  {
    "code": "C83.12",
    "description": "Mantle cell lymphoma, intrathoracic lymph nodes"
  },
  {
    "code": "C83.13",
    "description": "Mantle cell lymphoma, intra-abdominal lymph nodes"
  },
  {
    "code": "C83.14",
    "description": "Mantle cell lymphoma, lymph nodes of axilla and upper limb"
  },
  {
    "code": "C83.15",
    "description": "Mantle cell lymphoma, lymph nodes of inguinal region and lower limb"
  },
  {
    "code": "C83.16",
    "description": "Mantle cell lymphoma, intrapelvic lymph nodes"
  },
  {
    "code": "C83.17",
    "description": "Mantle cell lymphoma, spleen"
  },
  {
    "code": "C83.18",
    "description": "Mantle cell lymphoma, lymph nodes of multiple sites"
  },
  {
    "code": "C83.19",
    "description": "Mantle cell lymphoma, extranodal and solid organ sites"
  },
  {
    "code": "C83.30",
    "description": "Diffuse large B-cell lymphoma, unspecified site"
  },
  {
    "code": "C83.31",
    "description": "Diffuse large B-cell lymphoma, lymph nodes of head, face, and neck"
  },
  {
    "code": "C83.32",
    "description": "Diffuse large B-cell lymphoma, intrathoracic lymph nodes"
  },
  {
    "code": "C83.33",
    "description": "Diffuse large B-cell lymphoma, intra-abdominal lymph nodes"
  },
  {
    "code": "C83.34",
    "description": "Diffuse large B-cell lymphoma, lymph nodes of axilla and upper limb"
  },
  {
    "code": "C83.35",
    "description": "Diffuse large B-cell lymphoma, lymph nodes of inguinal region and lower limb"
  },
  {
    "code": "C83.36",
    "description": "Diffuse large B-cell lymphoma, intrapelvic lymph nodes"
  },
  {
    "code": "C83.37",
    "description": "Diffuse large B-cell lymphoma, spleen"
  },
  {
    "code": "C83.38",
    "description": "Diffuse large B-cell lymphoma, lymph nodes of multiple sites"
  },
  {
    "code": "C83.39",
    "description": "Diffuse large B-cell lymphoma, extranodal and solid organ sites"
  },
  {
    "code": "C83.50",
    "description": "Lymphoblastic (diffuse) lymphoma, unspecified site"
  },
  {
    "code": "C83.51",
    "description": "Lymphoblastic (diffuse) lymphoma, lymph nodes of head, face, and neck"
  },
  {
    "code": "C83.52",
    "description": "Lymphoblastic (diffuse) lymphoma, intrathoracic lymph nodes"
  },
  {
    "code": "C83.53",
    "description": "Lymphoblastic (diffuse) lymphoma, intra-abdominal lymph nodes"
  },
  {
    "code": "C83.54",
    "description": "Lymphoblastic (diffuse) lymphoma, lymph nodes of axilla and upper limb"
  },
  {
    "code": "C83.55",
    "description": "Lymphoblastic (diffuse) lymphoma, lymph nodes of inguinal region and lower limb"
  },
  {
    "code": "C83.56",
    "description": "Lymphoblastic (diffuse) lymphoma, intrapelvic lymph nodes"
  },
  {
    "code": "C83.57",
    "description": "Lymphoblastic (diffuse) lymphoma, spleen"
  },
  {
    "code": "C83.58",
    "description": "Lymphoblastic (diffuse) lymphoma, lymph nodes of multiple sites"
  },
  {
    "code": "C83.59",
    "description": "Lymphoblastic (diffuse) lymphoma, extranodal and solid organ sites"
  },
  {
    "code": "C83.70",
    "description": "Burkitt lymphoma, unspecified site"
  },
  {
    "code": "C83.71",
    "description": "Burkitt lymphoma, lymph nodes of head, face, and neck"
  },
  {
    "code": "C83.72",
    "description": "Burkitt lymphoma, intrathoracic lymph nodes"
  },
  {
    "code": "C83.73",
    "description": "Burkitt lymphoma, intra-abdominal lymph nodes"
  },
  {
    "code": "C83.74",
    "description": "Burkitt lymphoma, lymph nodes of axilla and upper limb"
  },
  {
    "code": "C83.75",
    "description": "Burkitt lymphoma, lymph nodes of inguinal region and lower limb"
  },
  {
    "code": "C83.76",
    "description": "Burkitt lymphoma, intrapelvic lymph nodes"
  },
  {
    "code": "C83.77",
    "description": "Burkitt lymphoma, spleen"
  },
  {
    "code": "C83.78",
    "description": "Burkitt lymphoma, lymph nodes of multiple sites"
  },
  {
    "code": "C83.79",
    "description": "Burkitt lymphoma, extranodal and solid organ sites"
  },
  {
    "code": "C83.80",
    "description": "Other non-follicular lymphoma, unspecified site"
  },
  {
    "code": "C83.81",
    "description": "Other non-follicular lymphoma, lymph nodes of head, face, and neck"
  },
  {
    "code": "C83.82",
    "description": "Other non-follicular lymphoma, intrathoracic lymph nodes"
  },
  {
    "code": "C83.83",
    "description": "Other non-follicular lymphoma, intra-abdominal lymph nodes"
  },
  {
    "code": "C83.84",
    "description": "Other non-follicular lymphoma, lymph nodes of axilla and upper limb"
  },
  {
    "code": "C83.85",
    "description": "Other non-follicular lymphoma, lymph nodes of inguinal region and lower limb"
  },
  {
    "code": "C83.86",
    "description": "Other non-follicular lymphoma, intrapelvic lymph nodes"
  },
  {
    "code": "C83.87",
    "description": "Other non-follicular lymphoma, spleen"
  },
  {
    "code": "C83.88",
    "description": "Other non-follicular lymphoma, lymph nodes of multiple sites"
  },
  {
    "code": "C83.89",
    "description": "Other non-follicular lymphoma, extranodal and solid organ sites"
  },
  {
    "code": "C83.90",
    "description": "Non-follicular (diffuse) lymphoma, unspecified, unspecified site"
  },
  {
    "code": "C83.91",
    "description": "Non-follicular (diffuse) lymphoma, unspecified, lymph nodes of head, face, and neck"
  },
  {
    "code": "C83.92",
    "description": "Non-follicular (diffuse) lymphoma, unspecified, intrathoracic lymph nodes"
  },
  {
    "code": "C83.93",
    "description": "Non-follicular (diffuse) lymphoma, unspecified, intra-abdominal lymph nodes"
  },
  {
    "code": "C83.94",
    "description": "Non-follicular (diffuse) lymphoma, unspecified, lymph nodes of axilla and upper limb"
  },
  {
    "code": "C83.95",
    "description": "Non-follicular (diffuse) lymphoma, unspecified, lymph nodes of inguinal region and lower limb"
  },
  {
    "code": "C83.96",
    "description": "Non-follicular (diffuse) lymphoma, unspecified, intrapelvic lymph nodes"
  },
  {
    "code": "C83.97",
    "description": "Non-follicular (diffuse) lymphoma, unspecified, spleen"
  },
  {
    "code": "C83.98",
    "description": "Non-follicular (diffuse) lymphoma, unspecified, lymph nodes of multiple sites"
  },
  {
    "code": "C83.99",
    "description": "Non-follicular (diffuse) lymphoma, unspecified, extranodal and solid organ sites"
  },
  {
    "code": "C84.00",
    "description": "Mycosis fungoides, unspecified site"
  },
  {
    "code": "C84.01",
    "description": "Mycosis fungoides, lymph nodes of head, face, and neck"
  },
  {
    "code": "C84.02",
    "description": "Mycosis fungoides, intrathoracic lymph nodes"
  },
  {
    "code": "C84.03",
    "description": "Mycosis fungoides, intra-abdominal lymph nodes"
  },
  {
    "code": "C84.04",
    "description": "Mycosis fungoides, lymph nodes of axilla and upper limb"
  },
  {
    "code": "C84.05",
    "description": "Mycosis fungoides, lymph nodes of inguinal region and lower limb"
  },
  {
    "code": "C84.06",
    "description": "Mycosis fungoides, intrapelvic lymph nodes"
  },
  {
    "code": "C84.07",
    "description": "Mycosis fungoides, spleen"
  },
  {
    "code": "C84.08",
    "description": "Mycosis fungoides, lymph nodes of multiple sites"
  },
  {
    "code": "C84.09",
    "description": "Mycosis fungoides, extranodal and solid organ sites"
  },
  {
    "code": "C84.10",
    "description": "Sezary disease, unspecified site"
  },
  {
    "code": "C84.11",
    "description": "Sezary disease, lymph nodes of head, face, and neck"
  },
  {
    "code": "C84.12",
    "description": "Sezary disease, intrathoracic lymph nodes"
  },
  {
    "code": "C84.13",
    "description": "Sezary disease, intra-abdominal lymph nodes"
  },
  {
    "code": "C84.14",
    "description": "Sezary disease, lymph nodes of axilla and upper limb"
  },
  {
    "code": "C84.15",
    "description": "Sezary disease, lymph nodes of inguinal region and lower limb"
  },
  {
    "code": "C84.16",
    "description": "Sezary disease, intrapelvic lymph nodes"
  },
  {
    "code": "C84.17",
    "description": "Sezary disease, spleen"
  },
  {
    "code": "C84.18",
    "description": "Sezary disease, lymph nodes of multiple sites"
  },
  {
    "code": "C84.19",
    "description": "Sezary disease, extranodal and solid organ sites"
  },
  {
    "code": "C84.40",
    "description": "Peripheral T-cell lymphoma, not classified, unspecified site"
  },
  {
    "code": "C84.41",
    "description": "Peripheral T-cell lymphoma, not classified, lymph nodes of head, face, and neck"
  },
  {
    "code": "C84.42",
    "description": "Peripheral T-cell lymphoma, not classified, intrathoracic lymph nodes"
  },
  {
    "code": "C84.43",
    "description": "Peripheral T-cell lymphoma, not classified, intra-abdominal lymph nodes"
  },
  {
    "code": "C84.44",
    "description": "Peripheral T-cell lymphoma, not classified, lymph nodes of axilla and upper limb"
  },
  {
    "code": "C84.45",
    "description": "Peripheral T-cell lymphoma, not classified, lymph nodes of inguinal region and lower limb"
  },
  {
    "code": "C84.46",
    "description": "Peripheral T-cell lymphoma, not classified, intrapelvic lymph nodes"
  },
  {
    "code": "C84.47",
    "description": "Peripheral T-cell lymphoma, not classified, spleen"
  },
  {
    "code": "C84.48",
    "description": "Peripheral T-cell lymphoma, not classified, lymph nodes of multiple sites"
  },
  {
    "code": "C84.49",
    "description": "Peripheral T-cell lymphoma, not classified, extranodal and solid organ sites"
  },
  {
    "code": "C84.60",
    "description": "Anaplastic large cell lymphoma, ALK-positive, unspecified site"
  },
  {
    "code": "C84.61",
    "description": "Anaplastic large cell lymphoma, ALK-positive, lymph nodes of head, face, and neck"
  },
  {
    "code": "C84.62",
    "description": "Anaplastic large cell lymphoma, ALK-positive, intrathoracic lymph nodes"
  },
  {
    "code": "C84.63",
    "description": "Anaplastic large cell lymphoma, ALK-positive, intra-abdominal lymph nodes"
  },
  {
    "code": "C84.64",
    "description": "Anaplastic large cell lymphoma, ALK-positive, lymph nodes of axilla and upper limb"
  },
  {
    "code": "C84.65",
    "description": "Anaplastic large cell lymphoma, ALK-positive, lymph nodes of inguinal region and lower limb"
  },
  {
    "code": "C84.66",
    "description": "Anaplastic large cell lymphoma, ALK-positive, intrapelvic lymph nodes"
  },
  {
    "code": "C84.67",
    "description": "Anaplastic large cell lymphoma, ALK-positive, spleen"
  },
  {
    "code": "C84.68",
    "description": "Anaplastic large cell lymphoma, ALK-positive, lymph nodes of multiple sites"
  },
  {
    "code": "C84.69",
    "description": "Anaplastic large cell lymphoma, ALK-positive, extranodal and solid organ sites"
  },
  {
    "code": "C84.70",
    "description": "Anaplastic large cell lymphoma, ALK-negative, unspecified site"
  },
  {
    "code": "C84.71",
    "description": "Anaplastic large cell lymphoma, ALK-negative, lymph nodes of head, face, and neck"
  },
  {
    "code": "C84.72",
    "description": "Anaplastic large cell lymphoma, ALK-negative, intrathoracic lymph nodes"
  },
  {
    "code": "C84.73",
    "description": "Anaplastic large cell lymphoma, ALK-negative, intra-abdominal lymph nodes"
  },
  {
    "code": "C84.74",
    "description": "Anaplastic large cell lymphoma, ALK-negative, lymph nodes of axilla and upper limb"
  },
  {
    "code": "C84.75",
    "description": "Anaplastic large cell lymphoma, ALK-negative, lymph nodes of inguinal region and lower limb"
  },
  {
    "code": "C84.76",
    "description": "Anaplastic large cell lymphoma, ALK-negative, intrapelvic lymph nodes"
  },
  {
    "code": "C84.77",
    "description": "Anaplastic large cell lymphoma, ALK-negative, spleen"
  },
  {
    "code": "C84.78",
    "description": "Anaplastic large cell lymphoma, ALK-negative, lymph nodes of multiple sites"
  },
  {
    "code": "C84.79",
    "description": "Anaplastic large cell lymphoma, ALK-negative, extranodal and solid organ sites"
  },
  {
    "code": "C84.90",
    "description": "Mature T/NK-cell lymphomas, unspecified, unspecified site"
  },
  {
    "code": "C84.91",
    "description": "Mature T/NK-cell lymphomas, unspecified, lymph nodes of head, face, and neck"
  },
  {
    "code": "C84.92",
    "description": "Mature T/NK-cell lymphomas, unspecified, intrathoracic lymph nodes"
  },
  {
    "code": "C84.93",
    "description": "Mature T/NK-cell lymphomas, unspecified, intra-abdominal lymph nodes"
  },
  {
    "code": "C84.94",
    "description": "Mature T/NK-cell lymphomas, unspecified, lymph nodes of axilla and upper limb"
  },
  {
    "code": "C84.95",
    "description": "Mature T/NK-cell lymphomas, unspecified, lymph nodes of inguinal region and lower limb"
  },
  {
    "code": "C84.96",
    "description": "Mature T/NK-cell lymphomas, unspecified, intrapelvic lymph nodes"
  },
  {
    "code": "C84.97",
    "description": "Mature T/NK-cell lymphomas, unspecified, spleen"
  },
  {
    "code": "C84.98",
    "description": "Mature T/NK-cell lymphomas, unspecified, lymph nodes of multiple sites"
  },
  {
    "code": "C84.99",
    "description": "Mature T/NK-cell lymphomas, unspecified, extranodal and solid organ sites"
  },
  {
    "code": "C85.10",
    "description": "Unspecified B-cell lymphoma, unspecified site"
  },
  {
    "code": "C85.11",
    "description": "Unspecified B-cell lymphoma, lymph nodes of head, face, and neck"
  },
  {
    "code": "C85.12",
    "description": "Unspecified B-cell lymphoma, intrathoracic lymph nodes"
  },
  {
    "code": "C85.13",
    "description": "Unspecified B-cell lymphoma, intra-abdominal lymph nodes"
  },
  {
    "code": "C85.14",
    "description": "Unspecified B-cell lymphoma, lymph nodes of axilla and upper limb"
  },
  {
    "code": "C85.15",
    "description": "Unspecified B-cell lymphoma, lymph nodes of inguinal region and lower limb"
  },
  {
    "code": "C85.16",
    "description": "Unspecified B-cell lymphoma, intrapelvic lymph nodes"
  },
  {
    "code": "C85.17",
    "description": "Unspecified B-cell lymphoma, spleen"
  },
  {
    "code": "C85.18",
    "description": "Unspecified B-cell lymphoma, lymph nodes of multiple sites"
  },
  {
    "code": "C85.19",
    "description": "Unspecified B-cell lymphoma, extranodal and solid organ sites"
  },
  {
    "code": "C85.20",
    "description": "Mediastinal (thymic) large B-cell lymphoma, unspecified site"
  },
  {
    "code": "C85.21",
    "description": "Mediastinal (thymic) large B-cell lymphoma, lymph nodes of head, face, and neck"
  },
  {
    "code": "C85.22",
    "description": "Mediastinal (thymic) large B-cell lymphoma, intrathoracic lymph nodes"
  },
  {
    "code": "C85.23",
    "description": "Mediastinal (thymic) large B-cell lymphoma, intra-abdominal lymph nodes"
  },
  {
    "code": "C85.24",
    "description": "Mediastinal (thymic) large B-cell lymphoma, lymph nodes of axilla and upper limb"
  },
  {
    "code": "C85.25",
    "description": "Mediastinal (thymic) large B-cell lymphoma, lymph nodes of inguinal region and lower limb"
  },
  {
    "code": "C85.26",
    "description": "Mediastinal (thymic) large B-cell lymphoma, intrapelvic lymph nodes"
  },
  {
    "code": "C85.27",
    "description": "Mediastinal (thymic) large B-cell lymphoma, spleen"
  },
  {
    "code": "C85.28",
    "description": "Mediastinal (thymic) large B-cell lymphoma, lymph nodes of multiple sites"
  },
  {
    "code": "C85.29",
    "description": "Mediastinal (thymic) large B-cell lymphoma, extranodal and solid organ sites"
  },
  {
    "code": "C85.80",
    "description": "Other specified types of non-Hodgkin lymphoma, unspecified site"
  },
  {
    "code": "C85.81",
    "description": "Other specified types of non-Hodgkin lymphoma, lymph nodes of head, face, and neck"
  },
  {
    "code": "C85.82",
    "description": "Other specified types of non-Hodgkin lymphoma, intrathoracic lymph nodes"
  },
  {
    "code": "C85.83",
    "description": "Other specified types of non-Hodgkin lymphoma, intra-abdominal lymph nodes"
  },
  {
    "code": "C85.84",
    "description": "Other specified types of non-Hodgkin lymphoma, lymph nodes of axilla and upper limb"
  },
  {
    "code": "C85.85",
    "description": "Other specified types of non-Hodgkin lymphoma, lymph nodes of inguinal region and lower limb"
  },
  {
    "code": "C85.86",
    "description": "Other specified types of non-Hodgkin lymphoma, intrapelvic lymph nodes"
  },
  {
    "code": "C85.87",
    "description": "Other specified types of non-Hodgkin lymphoma, spleen"
  },
  {
    "code": "C85.88",
    "description": "Other specified types of non-Hodgkin lymphoma, lymph nodes of multiple sites"
  },
  {
    "code": "C85.89",
    "description": "Other specified types of non-Hodgkin lymphoma, extranodal and solid organ sites"
  },
  {
    "code": "C85.90",
    "description": "Non-Hodgkin lymphoma, unspecified, unspecified site"
  },
  {
    "code": "C85.91",
    "description": "Non-Hodgkin lymphoma, unspecified, lymph nodes of head, face, and neck"
  },
  {
    "code": "C85.92",
    "description": "Non-Hodgkin lymphoma, unspecified, intrathoracic lymph nodes"
  },
  {
    "code": "C85.93",
    "description": "Non-Hodgkin lymphoma, unspecified, intra-abdominal lymph nodes"
  },
  {
    "code": "C85.94",
    "description": "Non-Hodgkin lymphoma, unspecified, lymph nodes of axilla and upper limb"
  },
  {
    "code": "C85.95",
    "description": "Non-Hodgkin lymphoma, unspecified, lymph nodes of inguinal region and lower limb"
  },
  {
    "code": "C85.96",
    "description": "Non-Hodgkin lymphoma, unspecified, intrapelvic lymph nodes"
  },
  {
    "code": "C85.97",
    "description": "Non-Hodgkin lymphoma, unspecified, spleen"
  },
  {
    "code": "C85.98",
    "description": "Non-Hodgkin lymphoma, unspecified, lymph nodes of multiple sites"
  },
  {
    "code": "C85.99",
    "description": "Non-Hodgkin lymphoma, unspecified, extranodal and solid organ sites"
  },
  {
    "code": "C86.0",
    "description": "Extranodal NK/T-cell lymphoma, nasal type"
  },
  {
    "code": "C86.1",
    "description": "Hepatosplenic T-cell lymphoma"
  },
  {
    "code": "C86.2",
    "description": "Enteropathy-type (intestinal) T-cell lymphoma"
  },
  {
    "code": "C86.3",
    "description": "Subcutaneous panniculitis-like T-cell lymphoma"
  },
  {
    "code": "C86.4",
    "description": "Blastic NK-cell lymphoma"
  },
  {
    "code": "C86.5",
    "description": "Angioimmunoblastic T-cell lymphoma"
  },
  {
    "code": "C86.6",
    "description": "Primary cutaneous CD30-positive T-cell proliferations"
  },
  {
    "code": "C88.0",
    "description": "Waldenstrom macroglobulinemia"
  },
  {
    "code": "C88.2",
    "description": "Heavy chain disease"
  },
  {
    "code": "C88.3",
    "description": "Immunoproliferative small intestinal disease"
  },
  {
    "code": "C88.4",
    "description": "Extranodal marginal zone B-cell lymphoma of mucosa-associated lymphoid tissue [MALT-lymphoma]"
  },
  {
    "code": "C88.8",
    "description": "Other malignant immunoproliferative diseases"
  },
  {
    "code": "C88.9",
    "description": "Malignant immunoproliferative disease, unspecified"
  },
  {
    "code": "C90.00",
    "description": "Multiple myeloma not having achieved remission"
  },
  {
    "code": "C90.01",
    "description": "Multiple myeloma in remission"
  },
  {
    "code": "C90.02",
    "description": "Multiple myeloma in relapse"
  },
  {
    "code": "C90.10",
    "description": "Plasma cell leukemia not having achieved remission"
  },
  {
    "code": "C90.11",
    "description": "Plasma cell leukemia in remission"
  },
  {
    "code": "C90.12",
    "description": "Plasma cell leukemia in relapse"
  },
  {
    "code": "C90.20",
    "description": "Extramedullary plasmacytoma not having achieved remission"
  },
  {
    "code": "C90.21",
    "description": "Extramedullary plasmacytoma in remission"
  },
  {
    "code": "C90.22",
    "description": "Extramedullary plasmacytoma in relapse"
  },
  {
    "code": "C90.30",
    "description": "Solitary plasmacytoma not having achieved remission"
  },
  {
    "code": "C90.31",
    "description": "Solitary plasmacytoma in remission"
  },
  {
    "code": "C90.32",
    "description": "Solitary plasmacytoma in relapse"
  },
  {
    "code": "C91.00",
    "description": "Acute lymphoblastic leukemia not having achieved remission"
  },
  {
    "code": "C91.01",
    "description": "Acute lymphoblastic leukemia, in remission"
  },
  {
    "code": "C91.02",
    "description": "Acute lymphoblastic leukemia, in relapse"
  },
  {
    "code": "C91.10",
    "description": "Chronic lymphocytic leukemia of B-cell type not having achieved remission"
  },
  {
    "code": "C91.11",
    "description": "Chronic lymphocytic leukemia of B-cell type in remission"
  },
  {
    "code": "C91.12",
    "description": "Chronic lymphocytic leukemia of B-cell type in relapse"
  },
  {
    "code": "C91.30",
    "description": "Prolymphocytic leukemia of B-cell type not having achieved remission"
  },
  {
    "code": "C91.31",
    "description": "Prolymphocytic leukemia of B-cell type, in remission"
  },
  {
    "code": "C91.32",
    "description": "Prolymphocytic leukemia of B-cell type, in relapse"
  },
  {
    "code": "C91.40",
    "description": "Hairy cell leukemia not having achieved remission"
  },
  {
    "code": "C91.41",
    "description": "Hairy cell leukemia, in remission"
  },
  {
    "code": "C91.42",
    "description": "Hairy cell leukemia, in relapse"
  },
  {
    "code": "C91.50",
    "description": "Adult T-cell lymphoma/leukemia (HTLV-1-associated) not having achieved remission"
  },
  {
    "code": "C91.51",
    "description": "Adult T-cell lymphoma/leukemia (HTLV-1-associated), in remission"
  },
  {
    "code": "C91.52",
    "description": "Adult T-cell lymphoma/leukemia (HTLV-1-associated), in relapse"
  },
  {
    "code": "C91.60",
    "description": "Prolymphocytic leukemia of T-cell type not having achieved remission"
  },
  {
    "code": "C91.61",
    "description": "Prolymphocytic leukemia of T-cell type, in remission"
  },
  {
    "code": "C91.62",
    "description": "Prolymphocytic leukemia of T-cell type, in relapse"
  },
  {
    "code": "C91.90",
    "description": "Lymphoid leukemia, unspecified not having achieved remission"
  },
  {
    "code": "C91.91",
    "description": "Lymphoid leukemia, unspecified, in remission"
  },
  {
    "code": "C91.92",
    "description": "Lymphoid leukemia, unspecified, in relapse"
  },
  {
    "code": "C92.00",
    "description": "Acute myeloblastic leukemia, not having achieved remission"
  },
  {
    "code": "C92.01",
    "description": "Acute myeloblastic leukemia, in remission"
  },
  {
    "code": "C92.02",
    "description": "Acute myeloblastic leukemia, in relapse"
  },
  {
    "code": "C92.10",
    "description": "Chronic myeloid leukemia, BCR/ABL-positive, not having achieved remission"
  },
  {
    "code": "C92.11",
    "description": "Chronic myeloid leukemia, BCR/ABL-positive, in remission"
  },
  {
    "code": "C92.12",
    "description": "Chronic myeloid leukemia, BCR/ABL-positive, in relapse"
  },
  {
    "code": "C92.20",
    "description": "Atypical chronic myeloid leukemia, BCR/ABL-negative, not having achieved remission"
  },
  {
    "code": "C92.21",
    "description": "Atypical chronic myeloid leukemia, BCR/ABL-negative, in remission"
  },
  {
    "code": "C92.22",
    "description": "Atypical chronic myeloid leukemia, BCR/ABL-negative, in relapse"
  },
  {
    "code": "C92.30",
    "description": "Myeloid sarcoma, not having achieved remission"
  },
  {
    "code": "C92.31",
    "description": "Myeloid sarcoma, in remission"
  },
  {
    "code": "C92.32",
    "description": "Myeloid sarcoma, in relapse"
  },
  {
    "code": "C92.40",
    "description": "Acute promyelocytic leukemia, not having achieved remission"
  },
  {
    "code": "C92.41",
    "description": "Acute promyelocytic leukemia, in remission"
  },
  {
    "code": "C92.42",
    "description": "Acute promyelocytic leukemia, in relapse"
  },
  {
    "code": "C92.50",
    "description": "Acute myelomonocytic leukemia, not having achieved remission"
  },
  {
    "code": "C92.51",
    "description": "Acute myelomonocytic leukemia, in remission"
  },
  {
    "code": "C92.52",
    "description": "Acute myelomonocytic leukemia, in relapse"
  },
  {
    "code": "C92.60",
    "description": "Acute myeloid leukemia with 11q23-abnormality not having achieved remission"
  },
  {
    "code": "C92.61",
    "description": "Acute myeloid leukemia with 11q23-abnormality in remission"
  },
  {
    "code": "C92.62",
    "description": "Acute myeloid leukemia with 11q23-abnormality in relapse"
  },
  {
    "code": "C92.A0",
    "description": "Acute myeloid leukemia with multilineage dysplasia, not having achieved remission"
  },
  {
    "code": "C92.A1",
    "description": "Acute myeloid leukemia with multilineage dysplasia, in remission"
  },
  {
    "code": "C92.A2",
    "description": "Acute myeloid leukemia with multilineage dysplasia, in relapse"
  },
  {
    "code": "C92.90",
    "description": "Myeloid leukemia, unspecified, not having achieved remission"
  },
  {
    "code": "C92.91",
    "description": "Myeloid leukemia, unspecified in remission"
  },
  {
    "code": "C92.92",
    "description": "Myeloid leukemia, unspecified in relapse"
  },
  {
    "code": "C93.00",
    "description": "Acute monoblastic/monocytic leukemia, not having achieved remission"
  },
  {
    "code": "C93.01",
    "description": "Acute monoblastic/monocytic leukemia, in remission"
  },
  {
    "code": "C93.02",
    "description": "Acute monoblastic/monocytic leukemia, in relapse"
  },
  {
    "code": "C93.10",
    "description": "Chronic myelomonocytic leukemia not having achieved remission"
  },
  {
    "code": "C93.11",
    "description": "Chronic myelomonocytic leukemia, in remission"
  },
  {
    "code": "C93.12",
    "description": "Chronic myelomonocytic leukemia, in relapse"
  },
  {
    "code": "C93.30",
    "description": "Juvenile myelomonocytic leukemia, not having achieved remission"
  },
  {
    "code": "C93.31",
    "description": "Juvenile myelomonocytic leukemia, in remission"
  },
  {
    "code": "C93.32",
    "description": "Juvenile myelomonocytic leukemia, in relapse"
  },
  {
    "code": "C93.90",
    "description": "Monocytic leukemia, unspecified, not having achieved remission"
  },
  {
    "code": "C93.91",
    "description": "Monocytic leukemia, unspecified in remission"
  },
  {
    "code": "C93.92",
    "description": "Monocytic leukemia, unspecified in relapse"
  },
  {
    "code": "C94.00",
    "description": "Acute erythroid leukemia, not having achieved remission"
  },
  {
    "code": "C94.01",
    "description": "Acute erythroid leukemia, in remission"
  },
  {
    "code": "C94.02",
    "description": "Acute erythroid leukemia, in relapse"
  },
  {
    "code": "C94.20",
    "description": "Acute megakaryoblastic leukemia not having achieved remission"
  },
  {
    "code": "C94.21",
    "description": "Acute megakaryoblastic leukemia, in remission"
  },
  {
    "code": "C94.22",
    "description": "Acute megakaryoblastic leukemia, in relapse"
  },
  {
    "code": "C94.30",
    "description": "Mast cell leukemia not having achieved remission"
  },
  {
    "code": "C94.31",
    "description": "Mast cell leukemia, in remission"
  },
  {
    "code": "C94.32",
    "description": "Mast cell leukemia, in relapse"
  },
  {
    "code": "C94.40",
    "description": "Acute panmyelosis with myelofibrosis not having achieved remission"
  },
  {
    "code": "C94.41",
    "description": "Acute panmyelosis with myelofibrosis, in remission"
  },
  {
    "code": "C94.42",
    "description": "Acute panmyelosis with myelofibrosis, in relapse"
  },
  {
    "code": "C94.6",
    "description": "Myelodysplastic disease, not classified"
  },
  {
    "code": "C94.80",
    "description": "Other specified leukemias not having achieved remission"
  },
  {
    "code": "C94.81",
    "description": "Other specified leukemias, in remission"
  },
  {
    "code": "C94.82",
    "description": "Other specified leukemias, in relapse"
  },
  {
    "code": "C95.00",
    "description": "Acute leukemia of unspecified cell type not having achieved remission"
  },
  {
    "code": "C95.01",
    "description": "Acute leukemia of unspecified cell type, in remission"
  },
  {
    "code": "C95.02",
    "description": "Acute leukemia of unspecified cell type, in relapse"
  },
  {
    "code": "C95.10",
    "description": "Chronic leukemia of unspecified cell type not having achieved remission"
  },
  {
    "code": "C95.11",
    "description": "Chronic leukemia of unspecified cell type, in remission"
  },
  {
    "code": "C95.12",
    "description": "Chronic leukemia of unspecified cell type, in relapse"
  },
  {
    "code": "C95.90",
    "description": "Leukemia, unspecified not having achieved remission"
  },
  {
    "code": "C95.91",
    "description": "Leukemia, unspecified, in remission"
  },
  {
    "code": "C95.92",
    "description": "Leukemia, unspecified, in relapse"
  },
  {
    "code": "C96.0",
    "description": "Multifocal and multisystemic (disseminated) Langerhans-cell histiocytosis"
  },
  {
    "code": "C96.20",
    "description": "Malignant mast cell neoplasm, unspecified"
  },
  {
    "code": "C96.21",
    "description": "Aggressive systemic mastocytosis"
  },
  {
    "code": "C96.22",
    "description": "Mast cell sarcoma"
  },
  {
    "code": "C96.29",
    "description": "Other malignant mast cell neoplasm"
  },
  {
    "code": "C96.4",
    "description": "Sarcoma of dendritic cells (accessory cells)"
  },
  {
    "code": "C96.A",
    "description": "Histiocytic sarcoma"
  },
  {
    "code": "D00.00",
    "description": "Carcinoma in situ of oral cavity, unspecified site"
  },
  {
    "code": "D00.01",
    "description": "Carcinoma in situ of lip, oral cavity and pharynx"
  },
  {
    "code": "D00.1",
    "description": "Carcinoma in situ of esophagus"
  },
  {
    "code": "D00.2",
    "description": "Carcinoma in situ of stomach"
  },
  {
    "code": "D01.0",
    "description": "Carcinoma in situ of colon"
  },
  {
    "code": "D01.1",
    "description": "Carcinoma in situ of rectosigmoid junction"
  },
  {
    "code": "D01.2",
    "description": "Carcinoma in situ of rectum"
  },
  {
    "code": "D01.3",
    "description": "Carcinoma in situ of anus and anal canal"
  },
  {
    "code": "D01.40",
    "description": "Carcinoma in situ of unspecified part of intestine"
  },
  {
    "code": "D01.49",
    "description": "Carcinoma in situ of other parts of intestine"
  },
  {
    "code": "D01.5",
    "description": "Carcinoma in situ of liver, gallbladder and bile ducts"
  },
  {
    "code": "D01.7",
    "description": "Carcinoma in situ of other specified digestive organs"
  },
  {
    "code": "D01.9",
    "description": "Carcinoma in situ of digestive organ, unspecified"
  },
  {
    "code": "D02.0",
    "description": "Carcinoma in situ of larynx"
  },
  {
    "code": "D02.1",
    "description": "Carcinoma in situ of trachea"
  },
  {
    "code": "D02.20",
    "description": "Carcinoma in situ of unspecified bronchus and lung"
  },
  {
    "code": "D02.21",
    "description": "Carcinoma in situ of right bronchus and lung"
  },
  {
    "code": "D02.22",
    "description": "Carcinoma in situ of left bronchus and lung"
  },
  {
    "code": "D02.3",
    "description": "Carcinoma in situ of other parts of respiratory system"
  },
  {
    "code": "D03.0",
    "description": "Melanoma in situ of lip"
  },
  {
    "code": "D03.10",
    "description": "Melanoma in situ of unspecified eyelid, including canthus"
  },
  {
    "code": "D03.11",
    "description": "Melanoma in situ of right eyelid, including canthus"
  },
  {
    "code": "D03.12",
    "description": "Melanoma in situ of left eyelid, including canthus"
  },
  {
    "code": "D03.20",
    "description": "Melanoma in situ of unspecified ear and external auricular canal"
  },
  {
    "code": "D03.21",
    "description": "Melanoma in situ of right ear and external auricular canal"
  },
  {
    "code": "D03.22",
    "description": "Melanoma in situ of left ear and external auricular canal"
  },
  {
    "code": "D03.30",
    "description": "Melanoma in situ of unspecified part of face"
  },
  {
    "code": "D03.39",
    "description": "Melanoma in situ of other parts of face"
  },
  {
    "code": "D03.4",
    "description": "Melanoma in situ of scalp and neck"
  },
  {
    "code": "D03.51",
    "description": "Melanoma in situ of anal skin"
  },
  {
    "code": "D03.52",
    "description": "Melanoma in situ of breast (skin) (soft tissue)"
  },
  {
    "code": "D03.59",
    "description": "Melanoma in situ of other part of trunk"
  },
  {
    "code": "D03.60",
    "description": "Melanoma in situ of unspecified upper limb, including shoulder"
  },
  {
    "code": "D03.61",
    "description": "Melanoma in situ of right upper limb, including shoulder"
  },
  {
    "code": "D03.62",
    "description": "Melanoma in situ of left upper limb, including shoulder"
  },
  {
    "code": "D03.70",
    "description": "Melanoma in situ of unspecified lower limb, including hip"
  },
  {
    "code": "D03.71",
    "description": "Melanoma in situ of right lower limb, including hip"
  },
  {
    "code": "D03.72",
    "description": "Melanoma in situ of left lower limb, including hip"
  },
  {
    "code": "D03.8",
    "description": "Melanoma in situ of overlapping sites"
  },
  {
    "code": "D03.9",
    "description": "Melanoma in situ, unspecified"
  },
  {
    "code": "D04.0",
    "description": "Carcinoma in situ of skin of lip"
  },
  {
    "code": "D04.10",
    "description": "Carcinoma in situ of skin of unspecified eyelid, including canthus"
  },
  {
    "code": "D04.11",
    "description": "Carcinoma in situ of skin of right eyelid, including canthus"
  },
  {
    "code": "D04.12",
    "description": "Carcinoma in situ of skin of left eyelid, including canthus"
  },
  {
    "code": "D04.20",
    "description": "Carcinoma in situ of skin of unspecified ear and external auricular canal"
  },
  {
    "code": "D04.21",
    "description": "Carcinoma in situ of skin of right ear and external auricular canal"
  },
  {
    "code": "D04.22",
    "description": "Carcinoma in situ of skin of left ear and external auricular canal"
  },
  {
    "code": "D04.30",
    "description": "Carcinoma in situ of skin of unspecified part of face"
  },
  {
    "code": "D04.39",
    "description": "Carcinoma in situ of skin of other parts of face"
  },
  {
    "code": "D04.4",
    "description": "Carcinoma in situ of skin of scalp and neck"
  },
  {
    "code": "D04.5",
    "description": "Carcinoma in situ of skin of trunk"
  },
  {
    "code": "D04.60",
    "description": "Carcinoma in situ of skin of unspecified upper limb, including shoulder"
  },
  {
    "code": "D04.61",
    "description": "Carcinoma in situ of skin of right upper limb, including shoulder"
  },
  {
    "code": "D04.62",
    "description": "Carcinoma in situ of skin of left upper limb, including shoulder"
  },
  {
    "code": "D04.70",
    "description": "Carcinoma in situ of skin of unspecified lower limb, including hip"
  },
  {
    "code": "D04.71",
    "description": "Carcinoma in situ of skin of right lower limb, including hip"
  },
  {
    "code": "D04.72",
    "description": "Carcinoma in situ of skin of left lower limb, including hip"
  },
  {
    "code": "D04.8",
    "description": "Carcinoma in situ of skin of other sites"
  },
  {
    "code": "D04.9",
    "description": "Carcinoma in situ of skin, unspecified"
  },
  {
    "code": "D05.00",
    "description": "Lobular carcinoma in situ of unspecified breast"
  },
  { 
    "code": "D57.0", 
    "description": "Sickle-cell disease with crisis, unspecified" 
  },
  { 
    "code": "D57.1", 
    "description": "Sickle-cell disease without crisis" 
  },
  { 
    "code": "D57.2", 
    "description": "Sickle-cell/Hb-C disease" 
  },
  { 
    "code": "D57.3", 
    "description": "Sickle-cell trait" 
  },
  { 
    "code": "D57.4", 
    "description": "Sickle-cell thalassemia" 
  },
  { 
    "code": "D57.8", 
    "description": "Other sickle-cell disorders" 
  },
  { 
    "code": "D50.0", 
    "description": "Iron deficiency anemia secondary to blood loss (chronic)" 
  },
  { "code": "D50.1", "description": "Sideropenic dysphagia" },
  { "code": "D50.8", "description": "Other iron deficiency anemias" },
  { "code": "D50.9", "description": "Iron deficiency anemia, unspecified" },
  { "code": "D51.0", "description": "Vitamin B12 deficiency anemia due to intrinsic factor deficiency" },
  { "code": "D51.1", "description": "Vitamin B12 deficiency anemia due to selective vitamin B12 malabsorption with proteinuria" },
  { "code": "D51.2", "description": "Transcobalamin II deficiency" },
  { "code": "D51.3", "description": "Other dietary vitamin B12 deficiency anemia" },
  { "code": "D51.8", "description": "Other vitamin B12 deficiency anemias" },
  { "code": "D51.9", "description": "Vitamin B12 deficiency anemia, unspecified" },
  { "code": "D52.0", "description": "Dietary folate deficiency anemia" },
  { "code": "D52.1", "description": "Drug-induced folate deficiency anemia" },
  { "code": "D52.8", "description": "Other folate deficiency anemias" },
  { "code": "D52.9", "description": "Folate deficiency anemia, unspecified" },
  { "code": "D53.0", "description": "Protein deficiency anemia" },
  { "code": "D53.1", "description": "Other megaloblastic anemias, not elsewhere classified" },
  { "code": "D53.2", "description": "Scorbutic anemia" },
  { "code": "D53.8", "description": "Other specified nutritional anemias" },
  { "code": "D53.9", "description": "Nutritional anemia, unspecified" },
  { "code": "D55.0", "description": "Anemia due to glucose-6-phosphate dehydrogenase [G6PD] deficiency" },
  { "code": "D55.1", "description": "Anemia due to other disorders of glutathione metabolism" },
  { "code": "D55.2", "description": "Anemia due to disorders of glycolytic enzymes" },
  { "code": "D55.3", "description": "Anemia due to disorders of nucleotide metabolism" },
  { "code": "D55.8", "description": "Other anemias due to enzyme disorders" },
  { "code": "D55.9", "description": "Anemia due to enzyme disorder, unspecified" },
  { "code": "D56.0", "description": "Alpha thalassemia" },
  { "code": "D56.1", "description": "Beta thalassemia" },
  { "code": "D56.2", "description": "Delta-beta thalassemia" },
  { "code": "D56.3", "description": "Thalassemia trait" },
  { "code": "D56.4", "description": "Hereditary persistence of fetal hemoglobin [HPFH]" },
  { "code": "D56.8", "description": "Other thalassemias" },
  { "code": "D56.9", "description": "Thalassemia, unspecified" },
  { "code": "D64.9", "description": "Anemia, unspecified" },
  { "code": "B51.0", "description": "Plasmodium vivax malaria with rupture of spleen" },
  { "code": "B51.8", "description": "Plasmodium vivax malaria with other complications" },
  { "code": "B51.9", "description": "Plasmodium vivax malaria without complication" },
  { "code": "B52.0", "description": "Plasmodium malariae malaria with nephropathy" },
  { "code": "B52.8", "description": "Plasmodium malariae malaria with other complications" },
  { "code": "B52.9", "description": "Plasmodium malariae malaria without complication" },
  { "code": "B53.0", "description": "Plasmodium ovale malaria" },
  { "code": "B53.1", "description": "Malaria due to simian plasmodia" },
  { "code": "B53.8", "description": "Other positive malaria" },
  { "code": "B54", "description": "Unspecified malaria" },
  { "code": "B55.0", "description": "Visceral leishmaniasis" },
  { "code": "B55.1", "description": "Cutaneous leishmaniasis" },
  { "code": "B55.2", "description": "Mucocutaneous leishmaniasis" },
  { "code": "B55.9", "description": "Leishmaniasis, unspecified" },
  { "code": "B56.0", "description": "Gambiense trypanosomiasis" },
  { "code": "B56.1", "description": "Rhodesiense trypanosomiasis" },
  { "code": "B56.9", "description": "African trypanosomiasis, unspecified" },
  { "code": "B57.0", "description": "Acute Chagas' disease with heart involvement" },
  { "code": "B57.1", "description": "Acute Chagas' disease without heart involvement" },
  { "code": "B57.2", "description": "Chagas' disease (chronic) with heart involvement" },
  { "code": "B57.3", "description": "Chagas' disease (chronic) with digestive system involvement" },
  { "code": "B57.4", "description": "Chagas' disease (chronic) with nervous system involvement" },
  { "code": "B57.5", "description": "Chagas' disease (chronic) with other organ involvement" },
  { "code": "B58.0", "description": "Toxoplasma oculopathy" },
  { "code": "B58.1", "description": "Toxoplasma hepatitis" },
  { "code": "B58.2", "description": "Toxoplasma meningoencephalitis" },
  { "code": "B58.3", "description": "Pulmonary toxoplasmosis" },
  { "code": "B58.8", "description": "Toxoplasmosis with other organ involvement" },
  { "code": "B58.9", "description": "Toxoplasmosis, unspecified" },
  { "code": "B65.0", "description": "Schistosomiasis due to Schistosoma haematobium [urinary schistosomiasis]" },
  { "code": "B65.1", "description": "Schistosomiasis due to Schistosoma mansoni [intestinal schistosomiasis]" },
  { "code": "B65.2", "description": "Schistosomiasis due to Schistosoma japonicum" },
  { "code": "B65.3", "description": "Cercarial dermatitis" },
  { "code": "B65.8", "description": "Other schistosomiases" },
  { "code": "B65.9", "description": "Schistosomiasis, unspecified" },
  { "code": "B66.0", "description": "Opisthorchiasis" },
  { "code": "B66.1", "description": "Clonorchiasis" },
  { "code": "B66.2", "description": "Dicrocoeliasis" },
  { "code": "B66.3", "description": "Fascioliasis" },
  { "code": "B66.4", "description": "Paragonimiasis" },
  { "code": "B66.5", "description": "Fasciolopsiasis" },
  { "code": "B66.8", "description": "Other specified fluke infections" },
  { "code": "B66.9", "description": "Fluke infection, unspecified" },
  { "code": "B67.0", "description": "Echinococcus granulosus infection of liver" },
  { "code": "B67.1", "description": "Echinococcus granulosus infection of lung" },
  { "code": "B67.2", "description": "Echinococcus granulosus infection of bone" },
  { "code": "B67.3", "description": "Echinococcus granulosus infection, other and multiple sites" },
  { "code": "B67.4", "description": "Echinococcus granulosus infection, unspecified" },
  { "code": "B67.5", "description": "Echinococcus multilocularis infection of liver" },
  { "code": "B67.6", "description": "Echinococcus multilocularis infection, other and multiple sites" },
  { "code": "B67.7", "description": "Echinococcus multilocularis infection, unspecified" },
  { "code": "B67.8", "description": "Echinococcosis, unspecified, of liver" },
  { "code": "B67.9", "description": "Echinococcosis, other and unspecified" },
  { "code": "B68.0", "description": "Taenia solium taeniasis" },
  { "code": "B68.1", "description": "Taenia saginata taeniasis" },
  { "code": "B68.9", "description": "Taeniasis, unspecified" },
  { "code": "B69.0", "description": "Cysticercosis of central nervous system" },
  { "code": "B69.1", "description": "Cysticercosis of eye" },
  { "code": "B69.8", "description": "Cysticercosis of other sites" },
  { "code": "B69.9", "description": "Cysticercosis, unspecified" },
  { "code": "B72", "description": "Dracunculiasis" },
  { "code": "B73", "description": "Onchocerciasis" },
  { "code": "B74.0", "description": "Filariasis due to Wuchereria bancrofti" },
  { "code": "B74.1", "description": "Filariasis due to Brugia malayi" },
  { "code": "B74.2", "description": "Filariasis due to Brugia timori" },
  { "code": "B74.3", "description": "Loiasis" },
  { "code": "B74.4", "description": "Mansonelliasis" },
  { "code": "B74.8", "description": "Other filariases" },
  { "code": "B74.9", "description": "Filariasis, unspecified" },
  { "code": "B75", "description": "Trichinellosis" },
  { "code": "B76.0", "description": "Ancylostomiasis" },
  { "code": "B76.1", "description": "Necatoriasis" },
  { "code": "B76.8", "description": "Other hookworm diseases" },
  { "code": "B76.9", "description": "Hookworm disease, unspecified" },
  { "code": "B77.0", "description": "Ascariasis with intestinal complications" },
  { "code": "B77.8", "description": "Ascariasis with other complications" },
  { "code": "B77.9", "description": "Ascariasis, unspecified" },
  { "code": "B78.0", "description": "Intestinal strongyloidiasis" },
  { "code": "B78.1", "description": "Cutaneous strongyloidiasis" },
  { "code": "B78.7", "description": "Disseminated strongyloidiasis" },
  { "code": "B78.9", "description": "Strongyloidiasis, unspecified" },
  { "code": "B79", "description": "Trichuriasis" },
  { "code": "B80", "description": "Enterobiasis" },
  { "code": "B81.0", "description": "Anisakiasis" },
  { "code": "B81.1", "description": "Intestinal capillariasis" },
  { "code": "B81.2", "description": "Trichostrongyliasis" },
  { "code": "B81.3", "description": "Intestinal angiostrongyliasis" },
  { "code": "B81.4", "description": "Mixed intestinal helminthiases" },
  { "code": "B81.8", "description": "Other specified intestinal helminthiases" },
  { "code": "B82.0", "description": "Intestinal helminthiasis, unspecified" },
  { "code": "B82.9", "description": "Intestinal parasitism, unspecified" },
  { "code": "B85.0", "description": "Pediculosis due to Pediculus humanus capitis" },
  { "code": "B85.1", "description": "Pediculosis due to Pediculus humanus corporis" },
  { "code": "B85.2", "description": "Pediculosis, unspecified" },
  { "code": "B85.3", "description": "Phthiriasis" },
  { "code": "B85.4", "description": "Mixed pediculosis and phthiriasis" },
  { "code": "B86", "description": "Scabies" },
  { "code": "B87.0", "description": "Cutaneous myiasis" },
  { "code": "B87.1", "description": "Wound myiasis" },
  { "code": "B87.2", "description": "Ocular myiasis" },
  { "code": "B87.3", "description": "Nasopharyngeal myiasis" },
  { "code": "B87.4", "description": "Aural myiasis" },
  { "code": "B87.8", "description": "Myiasis of other sites" },
  { "code": "B87.9", "description": "Myiasis, unspecified" },
  { "code": "B88.0", "description": "Other acariasis" },
  { "code": "B88.1", "description": "Tungiasis [sandflea infestation]" },
  { "code": "B88.2", "description": "Other arthropod infestations" },
  { "code": "B88.3", "description": "External hirudiniasis" },
  { "code": "B88.8", "description": "Other specified infestations" },
  { "code": "B88.9", "description": "Infestation, unspecified" },
  { "code": "B15.0", "description": "Hepatitis A with hepatic coma" },
  { "code": "B15.9", "description": "Hepatitis A without hepatic coma" },
  { "code": "B16.0", "description": "Acute hepatitis B with delta-agent with hepatic coma" },
  { "code": "B16.1", "description": "Acute hepatitis B with delta-agent without hepatic coma" },
  { "code": "B16.2", "description": "Acute hepatitis B without delta-agent with hepatic coma" },
  { "code": "B16.9", "description": "Acute hepatitis B without delta-agent and without hepatic coma" },
  { "code": "B17.0", "description": "Acute delta-(super) infection of hepatitis B carrier" },
  { "code": "B17.1", "description": "Acute hepatitis C" },
  { "code": "B17.2", "description": "Acute hepatitis E" },
  { "code": "B17.8", "description": "Other specified acute viral hepatitis" },
  { "code": "B17.9", "description": "Acute viral hepatitis, unspecified" },
  { "code": "B18.0", "description": "Chronic viral hepatitis B with delta-agent" },
  { "code": "B18.1", "description": "Chronic viral hepatitis B without delta-agent" },
  { "code": "B18.2", "description": "Chronic viral hepatitis C" },
  { "code": "B18.8", "description": "Other chronic viral hepatitis" },
  { "code": "B18.9", "description": "Chronic viral hepatitis, unspecified" },
  { "code": "B19.0", "description": "Unspecified viral hepatitis with hepatic coma" },
  { "code": "B19.1", "description": "Unspecified viral hepatitis B" },
  { "code": "B19.2", "description": "Unspecified viral hepatitis C" },
  { "code": "B19.9", "description": "Unspecified viral hepatitis without hepatic coma" },
  { "code": "B20", "description": "Human immunodeficiency virus [HIV] disease" },
  { "code": "B25.0", "description": "Cytomegaloviral pneumonitis" },
  { "code": "B25.1", "description": "Cytomegaloviral hepatitis" },
  { "code": "B25.2", "description": "Cytomegaloviral pancreatitis" },
  { "code": "B25.8", "description": "Other cytomegaloviral diseases" },
  { "code": "B25.9", "description": "Cytomegaloviral disease, unspecified" },
  { "code": "B26.0", "description": "Mumps orchitis" },
  { "code": "B26.1", "description": "Mumps meningitis" },
  { "code": "B26.2", "description": "Mumps encephalitis" },
  { "code": "B26.3", "description": "Mumps pancreatitis" },
  { "code": "B26.8", "description": "Other mumps complications" },
  { "code": "B26.9", "description": "Mumps without complication" },
  { "code": "E40", "description": "Kwashiorkor" },
  { "code": "E41", "description": "Nutritional marasmus" },
  { "code": "E42", "description": "Marasmic kwashiorkor" },
  { "code": "E43", "description": "Unspecified severe protein-calorie malnutrition" },
  { "code": "E44.0", "description": "Moderate protein-calorie malnutrition" },
  { "code": "E44.1", "description": "Mild protein-calorie malnutrition" },
  { "code": "E45", "description": "Retarded development following protein-calorie malnutrition" },
  { "code": "E46", "description": "Unspecified protein-calorie malnutrition" },
  { "code": "E50.0", "description": "Vitamin A deficiency with conjunctival xerosis" },
  { "code": "E50.1", "description": "Vitamin A deficiency with Bitot's spot and conjunctival xerosis" },
  { "code": "E50.2", "description": "Vitamin A deficiency with corneal xerosis" },
  { "code": "E50.3", "description": "Vitamin A deficiency with corneal ulceration and xerosis" },
  { "code": "E50.4", "description": "Vitamin A deficiency with keratomalacia" },
  { "code": "E50.5", "description": "Vitamin A deficiency with night blindness" },
  { "code": "E50.6", "description": "Vitamin A deficiency with xerophthalmic scars of cornea" },
  { "code": "E50.7", "description": "Other ocular manifestations of vitamin A deficiency" },
  { "code": "E50.8", "description": "Other manifestations of vitamin A deficiency" },
  { "code": "E50.9", "description": "Vitamin A deficiency, unspecified" },
  { "code": "E51.1", "description": "Beriberi" },
  { "code": "E51.2", "description": "Wernicke's encephalopathy" },
  { "code": "E51.8", "description": "Other manifestations of thiamine deficiency" },
  { "code": "E51.9", "description": "Thiamine deficiency, unspecified" },
  { "code": "E52", "description": "Niacin deficiency [pellagra]" },
  { "code": "E53.0", "description": "Riboflavin deficiency" },
  { "code": "E53.1", "description": "Pyridoxine deficiency" },
  { "code": "E53.8", "description": "Deficiency of other specified B group vitamins" },
  { "code": "E53.9", "description": "Vitamin B deficiency, unspecified" },
  { "code": "E54", "description": "Ascorbic acid deficiency" },
  { "code": "E55.0", "description": "Rickets, active" },
  { "code": "E55.9", "description": "Vitamin D deficiency, unspecified" },
  { "code": "E56.0", "description": "Deficiency of vitamin E" },
  { "code": "E56.1", "description": "Deficiency of vitamin K" },
  { "code": "E56.8", "description": "Deficiency of other vitamins" },
  { "code": "E56.9", "description": "Vitamin deficiency, unspecified" },
  { "code": "E64.0", "description": "Sequelae of protein-calorie malnutrition" },
  { "code": "E64.1", "description": "Sequelae of vitamin A deficiency" },
  { "code": "E64.2", "description": "Sequelae of vitamin C deficiency" },
  { "code": "E64.3", "description": "Sequelae of rickets" },
  { "code": "E64.8", "description": "Sequelae of other nutritional deficiencies" },
  { "code": "E64.9", "description": "Sequelae of unspecified nutritional deficiency" },
  { "code": "E10.10", "description": "Type 1 diabetes mellitus with ketoacidosis without coma" },
  { "code": "E10.21", "description": "Type 1 diabetes mellitus with diabetic nephropathy" },
  { "code": "E10.319", "description": "Type 1 diabetes mellitus with unspecified diabetic retinopathy without macular edema" },
  { "code": "E10.40", "description": "Type 1 diabetes mellitus with diabetic neuropathy, unspecified" },
  { "code": "E10.51", "description": "Type 1 diabetes mellitus with diabetic peripheral angiopathy without gangrene" },
  { "code": "E10.621", "description": "Type 1 diabetes mellitus with foot ulcer" },
  { "code": "E10.9", "description": "Type 1 diabetes mellitus without complications" },
  { "code": "E11.10", "description": "Type 2 diabetes mellitus with ketoacidosis without coma" },
  { "code": "E11.21", "description": "Type 2 diabetes mellitus with diabetic nephropathy" },
  { "code": "E11.319", "description": "Type 2 diabetes mellitus with unspecified diabetic retinopathy without macular edema" },
  { "code": "E11.40", "description": "Type 2 diabetes mellitus with diabetic neuropathy, unspecified" },
  { "code": "E11.51", "description": "Type 2 diabetes mellitus with diabetic peripheral angiopathy without gangrene" },
  { "code": "E11.621", "description": "Type 2 diabetes mellitus with foot ulcer" },
  { "code": "E11.9", "description": "Type 2 diabetes mellitus without complications" },
  { "code": "E01.0", "description": "Iodine-deficiency related diffuse (endemic) goiter" },
  { "code": "E01.1", "description": "Iodine-deficiency related multinodular (endemic) goiter" },
  { "code": "E01.2", "description": "Iodine-deficiency related (endemic) goiter, unspecified" },
  { "code": "E01.8", "description": "Other iodine-deficiency related thyroid disorders and allied conditions" },
  { "code": "E05.00", "description": "Thyrotoxicosis with diffuse goiter without thyrotoxic crisis or storm" },
  { "code": "E05.90", "description": "Thyrotoxicosis, unspecified without thyrotoxic crisis or storm" },
  { "code": "I10", "description": "Essential (primary) hypertension" },
  { "code": "I11.0", "description": "Hypertensive heart disease with heart failure" },
  { "code": "I11.9", "description": "Hypertensive heart disease without heart failure" },
  { "code": "I12.0", "description": "Hypertensive chronic kidney disease with stage 5 chronic kidney disease or end stage renal disease" },
  { "code": "I12.9", "description": "Hypertensive chronic kidney disease with stage 1 through stage 4 chronic kidney disease, or unspecified chronic kidney disease" },
  { "code": "I13.0", "description": "Hypertensive heart and chronic kidney disease with heart failure and stage 1 through stage 4 chronic kidney disease, or unspecified chronic kidney disease" },
  { "code": "I13.10", "description": "Hypertensive heart and chronic kidney disease without heart failure, with stage 1 through stage 4 chronic kidney disease, or unspecified chronic kidney disease" },
  { "code": "I13.2", "description": "Hypertensive heart and chronic kidney disease with heart failure and with stage 5 chronic kidney disease, or end stage renal disease" },
  { "code": "I15.0", "description": "Renovascular hypertension" },
  { "code": "I15.8", "description": "Other secondary hypertension" },
  { "code": "I15.9", "description": "Secondary hypertension, unspecified" },
  { "code": "I00", "description": "Rheumatic fever without heart involvement" },
  { "code": "I01.0", "description": "Acute rheumatic pericarditis" },
  { "code": "I01.1", "description": "Acute rheumatic endocarditis" },
  { "code": "I01.2", "description": "Acute rheumatic myocarditis" },
  { "code": "I01.8", "description": "Other acute rheumatic heart disease" },
  { "code": "I01.9", "description": "Acute rheumatic heart disease, unspecified" },
  { "code": "I02.0", "description": "Rheumatic chorea with heart involvement" },
  { "code": "I02.9", "description": "Rheumatic chorea without heart involvement" },
  { "code": "I05.0", "description": "Rheumatic mitral stenosis" },
  { "code": "I05.1", "description": "Rheumatic mitral insufficiency" },
  { "code": "I05.2", "description": "Rheumatic mitral stenosis with insufficiency" },
  { "code": "I05.8", "description": "Other rheumatic mitral valve diseases" },
  { "code": "I05.9", "description": "Rheumatic mitral valve disease, unspecified" },
  { "code": "I06.0", "description": "Rheumatic aortic stenosis" },
  { "code": "I06.1", "description": "Rheumatic aortic insufficiency" },
  { "code": "I06.2", "description": "Rheumatic aortic stenosis with insufficiency" },
  { "code": "I06.8", "description": "Other rheumatic aortic valve diseases" },
  { "code": "I06.9", "description": "Rheumatic aortic valve disease, unspecified" },
  { "code": "I50.1", "description": "Left ventricular failure, unspecified" },
  { "code": "I50.20", "description": "Unspecified systolic (congestive) heart failure" },
  { "code": "I50.21", "description": "Acute systolic (congestive) heart failure" },
  { "code": "I50.22", "description": "Chronic systolic (congestive) heart failure" },
  { "code": "I50.23", "description": "Acute on chronic systolic (congestive) heart failure" },
  { "code": "I50.30", "description": "Unspecified diastolic (congestive) heart failure" },
  { "code": "I50.31", "description": "Acute diastolic (congestive) heart failure" },
  { "code": "I50.32", "description": "Chronic diastolic (congestive) heart failure" },
  { "code": "I50.33", "description": "Acute on chronic diastolic (congestive) heart failure" },
  { "code": "I50.40", "description": "Unspecified combined systolic (congestive) and diastolic (congestive) heart failure" },
  { "code": "I50.41", "description": "Acute combined systolic (congestive) and diastolic (congestive) heart failure" },
  { "code": "I50.42", "description": "Chronic combined systolic (congestive) and diastolic (congestive) heart failure" },
  { "code": "I50.43", "description": "Acute on chronic combined systolic (congestive) and diastolic (congestive) heart failure" },
  { "code": "I50.9", "description": "Heart failure, unspecified" },
  { "code": "I60.9", "description": "Nontraumatic subarachnoid hemorrhage, unspecified" },
  { "code": "I61.9", "description": "Nontraumatic intracerebral hemorrhage, unspecified" },
  { "code": "I63.9", "description": "Cerebral infarction, unspecified" },
  { "code": "I64", "description": "Nontraumatic intracerebral hemorrhage, unspecified" },
  { "code": "J12.0", "description": "Adenoviral pneumonia" },
  { "code": "J12.1", "description": "Respiratory syncytial virus pneumonia" },
  { "code": "J12.2", "description": "Parainfluenza virus pneumonia" },
  { "code": "J12.89", "description": "Other viral pneumonia" },
  { "code": "J12.9", "description": "Viral pneumonia, unspecified" },
  { "code": "J13", "description": "Pneumonia due to Streptococcus pneumoniae" },
  { "code": "J14", "description": "Pneumonia due to Hemophilus influenzae" },
  { "code": "J15.0", "description": "Pneumonia due to Klebsiella pneumoniae" },
  { "code": "J15.1", "description": "Pneumonia due to Pseudomonas" },
  { "code": "J15.2", "description": "Pneumonia due to staphylococcus" },
  { "code": "J15.3", "description": "Pneumonia due to streptococcus, group B" },
  { "code": "J15.4", "description": "Pneumonia due to other streptococci" },
  { "code": "J15.5", "description": "Pneumonia due to Escherichia coli" },
  { "code": "J15.6", "description": "Pneumonia due to other aerobic Gram-negative bacteria" },
  { "code": "J15.7", "description": "Pneumonia due to Mycoplasma pneumoniae" },
  { "code": "J15.8", "description": "Pneumonia due to other specified bacteria" },
  { "code": "J15.9", "description": "Unspecified bacterial pneumonia" },
  { "code": "J18.0", "description": "Bronchopneumonia, unspecified organism" },
  { "code": "J18.1", "description": "Lobar pneumonia, unspecified organism" },
  { "code": "J18.2", "description": "Hypostatic pneumonia, unspecified organism" },
  { "code": "J18.8", "description": "Other pneumonia, unspecified organism" },
  { "code": "J18.9", "description": "Pneumonia, unspecified organism" },
  { "code": "J40", "description": "Bronchitis, not specified as acute or chronic" },
  { "code": "J44.0", "description": "Chronic obstructive pulmonary disease with acute lower respiratory infection" },
  { "code": "J44.1", "description": "Chronic obstructive pulmonary disease with (acute) exacerbation" },
  { "code": "J44.9", "description": "Chronic obstructive pulmonary disease, unspecified" },
  { "code": "J45.20", "description": "Mild intermittent asthma, uncomplicated" },
  { "code": "J45.21", "description": "Mild intermittent asthma with (acute) exacerbation" },
  { "code": "J45.22", "description": "Mild intermittent asthma with status asthmaticus" },
  { "code": "J45.30", "description": "Mild persistent asthma, uncomplicated" },
  { "code": "J45.31", "description": "Mild persistent asthma with (acute) exacerbation" },
  { "code": "J45.32", "description": "Mild persistent asthma with status asthmaticus" },
  { "code": "J45.40", "description": "Moderate persistent asthma, uncomplicated" },
  { "code": "J45.41", "description": "Moderate persistent asthma with (acute) exacerbation" },
  { "code": "J45.42", "description": "Moderate persistent asthma with status asthmaticus" },
  { "code": "J45.50", "description": "Severe persistent asthma, uncomplicated" },
  { "code": "J45.51", "description": "Severe persistent asthma with (acute) exacerbation" },
  { "code": "J45.52", "description": "Severe persistent asthma with status asthmaticus" },
  { "code": "J45.901", "description": "Unspecified asthma with (acute) exacerbation" },
  { "code": "J45.902", "description": "Unspecified asthma with status asthmaticus" },
  { "code": "J45.909", "description": "Unspecified asthma, uncomplicated" },
  { "code": "J45.991", "description": "Cough variant asthma" },
  { "code": "J45.998", "description": "Other asthma" },
  { "code": "K25.0", "description": "Acute gastric ulcer with hemorrhage" },
  { "code": "K25.1", "description": "Acute gastric ulcer with perforation" },
  { "code": "K25.2", "description": "Acute gastric ulcer with both hemorrhage and perforation" },
  { "code": "K25.3", "description": "Acute gastric ulcer without hemorrhage or perforation" },
  { "code": "K25.7", "description": "Chronic gastric ulcer without hemorrhage or perforation" },
  { "code": "K25.9", "description": "Gastric ulcer, unspecified as acute or chronic, without hemorrhage or perforation" },
  { "code": "K26.0", "description": "Acute duodenal ulcer with hemorrhage" },
  { "code": "K26.1", "description": "Acute duodenal ulcer with perforation" },
  { "code": "K26.2", "description": "Acute duodenal ulcer with both hemorrhage and perforation" },
  { "code": "K26.3", "description": "Acute duodenal ulcer without hemorrhage or perforation" },
  { "code": "K26.7", "description": "Chronic duodenal ulcer without hemorrhage or perforation" },
  { "code": "K26.9", "description": "Duodenal ulcer, unspecified as acute or chronic, without hemorrhage or perforation" },
  { "code": "K27.0", "description": "Acute peptic ulcer, site unspecified, with hemorrhage" },
  { "code": "K27.1", "description": "Acute peptic ulcer, site unspecified, with perforation" },
  { "code": "K27.2", "description": "Acute peptic ulcer, site unspecified, with both hemorrhage and perforation" },
  { "code": "K27.3", "description": "Acute peptic ulcer, site unspecified, without hemorrhage or perforation" },
  { "code": "K27.7", "description": "Chronic peptic ulcer, site unspecified, without hemorrhage or perforation" },
  { "code": "K27.9", "description": "Peptic ulcer, site unspecified, unspecified as acute or chronic, without hemorrhage or perforation" },
  { "code": "K35.20", "description": "Acute appendicitis with generalized peritonitis, without abscess" },
  { "code": "K35.30", "description": "Acute appendicitis with localized peritonitis, without perforation or gangrene" },
  { "code": "K35.80", "description": "Unspecified acute appendicitis" },
  { "code": "K35.89", "description": "Other acute appendicitis" },
  { "code": "K40.90", "description": "Unilateral inguinal hernia, without obstruction or gangrene, not specified as recurrent" },
  { "code": "K41.90", "description": "Unilateral femoral hernia, without obstruction or gangrene, not specified as recurrent" },
  { "code": "K42.9", "description": "Umbilical hernia without obstruction or gangrene" },
  { "code": "K43.9", "description": "Ventral hernia without obstruction or gangrene" },
  { "code": "K44.9", "description": "Diaphragmatic hernia without obstruction or gangrene" },
  { "code": "K45.8", "description": "Other specified abdominal hernia without obstruction or gangrene" },
  { "code": "K46.9", "description": "Unspecified abdominal hernia without obstruction or gangrene" },
  { "code": "K70.10", "description": "Alcoholic hepatitis without ascites" },
  { "code": "K70.30", "description": "Alcoholic cirrhosis of liver without ascites" },
  { "code": "K70.9", "description": "Alcoholic liver disease, unspecified" },
  { "code": "K73.9", "description": "Chronic hepatitis, unspecified" },
  { "code": "K74.60", "description": "Unspecified cirrhosis of liver" },
  { "code": "K74.69", "description": "Other cirrhosis of liver" },
  { "code": "N17.0", "description": "Acute kidney failure with tubular necrosis" },
  { "code": "N17.1", "description": "Acute kidney failure with acute cortical necrosis" },
  { "code": "N17.2", "description": "Acute kidney failure with medullary necrosis" },
  { "code": "N17.8", "description": "Other acute kidney failure" },
  { "code": "N17.9", "description": "Acute kidney failure, unspecified" },
  { "code": "N18.1", "description": "Chronic kidney disease, stage 1" },
  { "code": "N18.2", "description": "Chronic kidney disease, stage 2 (mild)" },
  { "code": "N18.30", "description": "Chronic kidney disease, stage 3 unspecified" },
  { "code": "N18.4", "description": "Chronic kidney disease, stage 4 (severe)" },
  { "code": "N18.5", "description": "Chronic kidney disease, stage 5" },
  { "code": "N18.6", "description": "End stage renal disease" },
  { "code": "N18.9", "description": "Chronic kidney disease, unspecified" },
  { "code": "N82.0", "description": "Vesicovaginal fistula" },
  { "code": "N82.1", "description": "Other female intestinal-urinary tract fistulae" },
  { "code": "N82.2", "description": "Fistula of vagina to small intestine" },
  { "code": "N82.3", "description": "Fistula of vagina to large intestine" },
  { "code": "N82.4", "description": "Other female intestinal-genital tract fistulae" },
  { "code": "N82.8", "description": "Other female genital tract fistulae" },
  { "code": "N82.9", "description": "Female genital tract fistula, unspecified" },
  { "code": "N70.03", "description": "Acute salpingitis and oophoritis" },
  { "code": "N70.93", "description": "Salpingitis and oophoritis, unspecified" },
  { "code": "O00.0", "description": "Abdominal pregnancy" },
  { "code": "O00.1", "description": "Tubal pregnancy" },
  { "code": "O00.2", "description": "Ovarian pregnancy" },
  { "code": "O00.8", "description": "Other ectopic pregnancy" },
  { "code": "O00.9", "description": "Ectopic pregnancy, unspecified" },
  { "code": "O14.00", "description": "Mild to moderate pre-eclampsia, unspecified trimester" },
  { "code": "O14.10", "description": "Severe pre-eclampsia, unspecified trimester" },
  { "code": "O14.20", "description": "HELLP syndrome, unspecified trimester" },
  { "code": "O14.90", "description": "Pre-eclampsia, unspecified, unspecified trimester" },
  { "code": "O15.00", "description": "Eclampsia in pregnancy, unspecified trimester" },
  { "code": "O15.1", "description": "Eclampsia in labor" },
  { "code": "O15.2", "description": "Eclampsia in the puerperium" },
  { "code": "O15.9", "description": "Eclampsia, unspecified as to time period" },
  { "code": "O43.211", "description": "Placenta accreta, first trimester" },
  { "code": "O43.212", "description": "Placenta accreta, second trimester" },
  { "code": "O43.213", "description": "Placenta accreta, third trimester" },
  { "code": "O43.219", "description": "Placenta accreta, unspecified trimester" },
  { "code": "O44.00", "description": "Placenta previa specified as without hemorrhage, unspecified trimester" },
  { "code": "O44.10", "description": "Placenta previa with hemorrhage, unspecified trimester" },
  { "code": "O64.0XX0", "description": "Obstructed labor due to incomplete rotation of fetal head, not applicable or unspecified" },
  { "code": "O64.1XX0", "description": "Obstructed labor due to breech presentation, not applicable or unspecified" },
  { "code": "O64.2XX0", "description": "Obstructed labor due to face presentation, not applicable or unspecified" },
  { "code": "O64.3XX0", "description": "Obstructed labor due to brow presentation, not applicable or unspecified" },
  { "code": "O64.4XX0", "description": "Obstructed labor due to shoulder presentation, not applicable or unspecified" },
  { "code": "O64.9XX0", "description": "Obstructed labor due to malposition and malpresentation, unspecified, not applicable or unspecified" },
  { "code": "O72.0", "description": "Third-stage hemorrhage" },
  { "code": "O72.1", "description": "Other immediate postpartum hemorrhage" },
  { "code": "O72.2", "description": "Delayed and secondary postpartum hemorrhage" },
  { "code": "O72.3", "description": "Postpartum coagulation defects" },
  { "code": "O85", "description": "Puerperal sepsis" },
  { "code": "O90.3", "description": "Peripartum cardiomyopathy" },
  { "code": "P07.20", "description": "Extreme immaturity of newborn, unspecified weeks of gestation" },
  { "code": "P07.30", "description": "Preterm [premature] newborn, unspecified weeks of gestation" },
  { "code": "P21.0", "description": "Severe birth asphyxia" },
  { "code": "P21.1", "description": "Mild and moderate birth asphyxia" },
  { "code": "P21.9", "description": "Birth asphyxia, unspecified" },
  { "code": "P22.0", "description": "Respiratory distress syndrome of newborn" },
  { "code": "P36.0", "description": "Sepsis of newborn due to streptococcus, group B" },
  { "code": "P36.10", "description": "Sepsis of newborn due to unspecified streptococci" },
  { "code": "P36.2", "description": "Sepsis of newborn due to Staphylococcus aureus" },
  { "code": "P36.30", "description": "Sepsis of newborn due to unspecified staphylococci" },
  { "code": "P36.4", "description": "Sepsis of newborn due to Escherichia coli" },
  { "code": "P36.5", "description": "Sepsis of newborn due to anaerobes" },
  { "code": "P36.8", "description": "Other bacterial sepsis of newborn" },
  { "code": "P36.9", "description": "Bacterial sepsis of newborn, unspecified" },
  { "code": "P59.0", "description": "Neonatal jaundice associated with preterm delivery" },
  { "code": "P59.1", "description": "Neonatal jaundice from other and unspecified polycythemia" },
  { "code": "P59.2", "description": "Neonatal jaundice from other and unspecified infection" },
  { "code": "P59.3", "description": "Neonatal jaundice from breast milk inhibitor" },
  { "code": "P59.8", "description": "Neonatal jaundice from other specified causes" },
  { "code": "P59.9", "description": "Neonatal jaundice, unspecified" },
  { "code": "C53.0", "description": "Malignant neoplasm of endocervix" },
  { "code": "C53.1", "description": "Malignant neoplasm of exocervix" },
  { "code": "C53.8", "description": "Malignant neoplasm of overlapping sites of cervix uteri" },
  { "code": "C53.9", "description": "Malignant neoplasm of cervix uteri, unspecified" },
  { "code": "C50.911", "description": "Malignant neoplasm of unspecified site of right female breast" },
  { "code": "C50.912", "description": "Malignant neoplasm of unspecified site of left female breast" },
  { "code": "C50.919", "description": "Malignant neoplasm of unspecified site of unspecified female breast" },
  { "code": "C50.921", "description": "Malignant neoplasm of unspecified site of right male breast" },
  { "code": "C50.922", "description": "Malignant neoplasm of unspecified site of left male breast" },
  { "code": "C50.929", "description": "Malignant neoplasm of unspecified site of unspecified male breast" },
  { "code": "C61", "description": "Malignant neoplasm of prostate" },
  { "code": "C22.0", "description": "Liver cell carcinoma" },
  { "code": "C22.1", "description": "Intrahepatic bile duct carcinoma" },
  { "code": "C22.2", "description": "Hepatoblastoma" },
  { "code": "C22.3", "description": "Angiosarcoma of liver" },
  { "code": "C22.4", "description": "Other sarcomas of liver" },
  { "code": "C22.7", "description": "Other specified carcinomas of liver" },
  { "code": "C22.8", "description": "Malignant neoplasm of liver, primary, unspecified as to type" },
  { "code": "C22.9", "description": "Malignant neoplasm of liver, not specified as primary or secondary" },
  { "code": "C83.70", "description": "Burkitt lymphoma, unspecified site" },
  { "code": "C83.71", "description": "Burkitt lymphoma, lymph nodes of head, face, and neck" },
  { "code": "C83.72", "description": "Burkitt lymphoma, intrathoracic lymph nodes" },
  { "code": "C83.73", "description": "Burkitt lymphoma, intra-abdominal lymph nodes" },
  { "code": "C83.74", "description": "Burkitt lymphoma, lymph nodes of axilla and upper limb" },
  { "code": "C83.75", "description": "Burkitt lymphoma, lymph nodes of inguinal region and lower limb" },
  { "code": "C83.76", "description": "Burkitt lymphoma, intrapelvic lymph nodes" },
  { "code": "C83.77", "description": "Burkitt lymphoma, spleen" },
  { "code": "C83.78", "description": "Burkitt lymphoma, lymph nodes of multiple sites" },
  { "code": "C83.79", "description": "Burkitt lymphoma, extranodal and solid organ sites" },
  { "code": "C46.0", "description": "Kaposi's sarcoma of skin" },
  { "code": "C46.1", "description": "Kaposi's sarcoma of soft tissue" },
  { "code": "C46.2", "description": "Kaposi's sarcoma of palate" },
  { "code": "C46.3", "description": "Kaposi's sarcoma of lymph nodes" },
  { "code": "C46.4", "description": "Kaposi's sarcoma of gastrointestinal sites" },
  { "code": "C46.50", "description": "Kaposi's sarcoma of unspecified lung" },
  { "code": "C46.7", "description": "Kaposi's sarcoma of other sites" },
  { "code": "C46.9", "description": "Kaposi's sarcoma, unspecified" },
  { "code": "T63.001A", "description": "Toxic effect of unspecified snake venom, accidental (unintentional), initial encounter" },
  { "code": "T63.011A", "description": "Toxic effect of rattlesnake venom, accidental (unintentional), initial encounter" },
  { "code": "T63.021A", "description": "Toxic effect of coral snake venom, accidental (unintentional), initial encounter" },
  { "code": "T63.031A", "description": "Toxic effect of brown snake venom, accidental (unintentional), initial encounter" },
  { "code": "T63.041A", "description": "Toxic effect of black mamba venom, accidental (unintentional), initial encounter" },
  { "code": "T63.061A", "description": "Toxic effect of Taipan venom, accidental (unintentional), initial encounter" },
  { "code": "T63.071A", "description": "Toxic effect of tiger snake venom, accidental (unintentional), initial encounter" },
  { "code": "T63.081A", "description": "Toxic effect of other snake venom, accidental (unintentional), initial encounter" },
  { "code": "T63.091A", "description": "Toxic effect of other reptile venom, accidental (unintentional), initial encounter" },
  { "code": "T63.2X1A", "description": "Toxic effect of scorpion venom, accidental (unintentional), initial encounter" },
  { "code": "T63.301A", "description": "Toxic effect of unspecified spider venom, accidental (unintentional), initial encounter" },
  { "code": "B35.0", "description": "Tinea capitis and tinea barbae" },
  { "code": "B35.1", "description": "Tinea unguium" },
  { "code": "B35.2", "description": "Tinea manuum" },
  { "code": "B35.3", "description": "Tinea pedis" },
  { "code": "B35.4", "description": "Tinea corporis" },
  { "code": "G00.0", "description": "Hemophilus meningitis" },
  { "code": "G00.1", "description": "Pneumococcal meningitis" },
  { "code": "G00.2", "description": "Streptococcal meningitis" },
  { "code": "P35.0", "description": "Congenital rubella syndrome" },
  { "code": "P35.1", "description": "Congenital cytomegalovirus infection" },
  { "code": "P35.2", "description": "Congenital herpesviral infection" },
  { "code": "P35.3", "description": "Congenital viral hepatitis" },
  { "code": "P35.8", "description": "Other congenital viral diseases" },
  { "code": "P35.9", "description": "Congenital viral disease, unspecified" },

]

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