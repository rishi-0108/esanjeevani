import { DiseaseResult } from '../types';

export interface DiseaseRule {
  name: string;
  icdCode: string;
  symptomWeights: Record<string, number>;
  ageRisk?: { min: number; max: number; weight: number };
  conditionTriggers?: string[];
  urgencyBase: 'low' | 'moderate' | 'high' | 'emergency';
  description: string;
  precautions: string[];
  redFlags: string[];
  nextSteps: string[];
  selfCare: string[];
  doctorConsultation: string;
  lifestyle: string[];
  recommendedTests: string[];
}

export const diseaseRules: DiseaseRule[] = [
  {
    name: 'Viral Fever',
    icdCode: 'A94',
    symptomWeights: {
      fever: 10, headache: 6, body_ache: 8, fatigue: 7, chills: 8,
      sore_throat: 5, runny_nose: 5, loss_of_appetite: 4, nausea: 3,
    },
    urgencyBase: 'moderate',
    description: 'A common viral infection causing elevated body temperature, body aches, and general malaise.',
    precautions: ['Isolate from family members', 'Stay hydrated with ORS/fluids', 'Monitor temperature every 4 hours', 'Avoid self-medication with antibiotics'],
    redFlags: ['Fever above 104°F (40°C)', 'Seizures or convulsions', 'Severe dehydration', 'Rash with high fever', 'Stiff neck with headache'],
    nextSteps: ['Consult a general physician within 24-48 hours', 'Get CBC blood test if fever persists beyond 3 days', 'Avoid crowded places'],
    selfCare: ['Take paracetamol for fever relief', 'Rest adequately', 'Luke-warm sponging for high fever', 'Consume light meals'],
    doctorConsultation: 'Recommended within 24-48 hours if fever persists',
    lifestyle: ['Increase fluid intake', 'Avoid junk food', 'Maintain sleep hygiene', 'Light stretching once fever subsides'],
    recommendedTests: ['CBC (Complete Blood Count)', 'Dengue NS1 Antigen (if fever >3 days)', 'Malaria test (if in endemic area)'],
  },
  {
    name: 'Dengue Fever',
    icdCode: 'A97',
    symptomWeights: {
      fever: 10, severe_headache: 9, eye_pain: 9, joint_pain: 9,
      muscle_pain: 8, rash: 8, nausea: 6, vomiting: 6, fatigue: 7,
      bleeding_gums: 10, low_platelet: 10,
    },
    urgencyBase: 'high',
    description: 'A mosquito-borne viral infection with characteristic high fever, severe joint/muscle pain, and rash.',
    precautions: ['Use mosquito repellent', 'Wear full-sleeve clothing', 'Eliminate stagnant water sources', 'Use mosquito nets while sleeping'],
    redFlags: ['Bleeding from gums/nose', 'Blood in urine/stool', 'Severe abdominal pain', 'Persistent vomiting', 'Rapid breathing', 'Platelet count below 50,000'],
    nextSteps: ['Immediate CBC with platelet count', 'Dengue NS1 antigen test', 'Hospitalization if platelets drop below 50,000'],
    selfCare: ['Drink papaya leaf juice (evidence-supported)', 'Stay hydrated', 'Avoid NSAIDs/aspirin', 'Monitor platelet count daily'],
    doctorConsultation: 'Seek immediate medical attention within 12 hours',
    lifestyle: ['Complete bed rest', 'Mosquito-proof environment', 'Soft diet with high fluids'],
    recommendedTests: ['Dengue NS1 Antigen', 'Dengue IgM/IgG', 'CBC with differential', 'Liver function tests'],
  },
  {
    name: 'Malaria',
    icdCode: 'B54',
    symptomWeights: {
      fever: 10, chills: 10, sweating: 9, headache: 7, nausea: 6,
      vomiting: 6, muscle_pain: 7, fatigue: 8, jaundice: 7,
      travel_history: 9, anemia: 7,
    },
    urgencyBase: 'high',
    description: 'A parasitic infection transmitted by Anopheles mosquitoes, causing cyclical fever with chills and sweating.',
    precautions: ['Use insecticide-treated bed nets', 'Apply mosquito repellent', 'Take prophylactic medication if traveling to endemic areas'],
    redFlags: ['Altered consciousness/confusion', 'Seizures', 'Jaundice with high fever', 'Dark/bloody urine', 'Severe anemia'],
    nextSteps: ['Immediate malaria rapid diagnostic test', 'Peripheral blood smear', 'Start antimalarial treatment promptly'],
    selfCare: ['Strict bed rest', 'High fluid intake', 'Monitor temperature patterns', 'Avoid self-medication'],
    doctorConsultation: 'Emergency consultation required within 6-12 hours',
    lifestyle: ['Avoid outdoor activities at dusk and dawn', 'Use protective clothing', 'Eliminate mosquito breeding sites'],
    recommendedTests: ['Malaria RDT (Rapid Diagnostic Test)', 'Peripheral Blood Smear', 'CBC', 'Liver Function Tests', 'Blood glucose'],
  },
  {
    name: 'COVID-19 / Respiratory Infection',
    icdCode: 'U07.1',
    symptomWeights: {
      fever: 9, cough: 9, shortness_of_breath: 10, fatigue: 8,
      loss_of_taste: 10, loss_of_smell: 10, sore_throat: 6, headache: 5,
      body_ache: 6, diarrhea: 5, infection_exposure: 9,
    },
    urgencyBase: 'high',
    description: 'A highly contagious respiratory illness that can range from mild to severe, affecting the lungs and other organs.',
    precautions: ['Isolate immediately', 'Wear N95 mask', 'Inform close contacts', 'Monitor oxygen saturation', 'Report to health authorities'],
    redFlags: ['SpO2 below 94%', 'Chest pain or pressure', 'Confusion or inability to stay awake', 'Blue lips or face', 'Severe breathlessness'],
    nextSteps: ['Get RT-PCR test immediately', 'Self-isolate for 5-7 days', 'Monitor oxygen with pulse oximeter', 'Contact COVID helpline 1075'],
    selfCare: ['Prone positioning for breathing', 'Steam inhalation', 'Vitamin C and Zinc supplements', 'Gargling with warm salt water'],
    doctorConsultation: 'Immediate consultation if SpO2 drops below 95%',
    lifestyle: ['Complete isolation', 'Adequate rest', 'High protein diet', 'Stay connected with family virtually'],
    recommendedTests: ['RT-PCR / RAT Test', 'CT Chest (if symptomatic)', 'CRP and D-Dimer', 'CBC', 'SpO2 monitoring'],
  },
  {
    name: 'Typhoid Fever',
    icdCode: 'A01',
    symptomWeights: {
      fever: 10, headache: 7, abdominal_pain: 9, constipation: 7,
      diarrhea: 6, fatigue: 8, loss_of_appetite: 8, rash: 6,
      nausea: 5, vomiting: 5,
    },
    urgencyBase: 'high',
    description: 'A bacterial infection caused by Salmonella typhi, spread through contaminated food and water.',
    precautions: ['Drink only boiled/filtered water', 'Avoid street food', 'Maintain strict hand hygiene', 'Avoid raw vegetables and fruits from outside'],
    redFlags: ['Intestinal perforation (severe abdominal pain)', 'Prolonged fever >39°C for >5 days', 'Altered sensorium', 'Severe weakness'],
    nextSteps: ['Widal test and blood culture', 'Start antibiotics as prescribed', 'Maintain food hygiene strictly'],
    selfCare: ['Eat soft, easily digestible food', 'Maintain hydration', 'Complete the antibiotic course', 'Rest completely'],
    doctorConsultation: 'Seek medical attention within 24 hours',
    lifestyle: ['Strictly avoid outside food', 'Boil drinking water', 'Vaccinate family members', 'Improve sanitation'],
    recommendedTests: ['Widal Test', 'Blood Culture (gold standard)', 'CBC', 'Typhidot IgM/IgG', 'Urine culture'],
  },
  {
    name: 'Hypertension Crisis',
    icdCode: 'I10',
    symptomWeights: {
      severe_headache: 10, dizziness: 8, blurred_vision: 9, chest_pain: 9,
      shortness_of_breath: 8, nausea: 5, confusion: 9, bp_history: 10,
      facial_flushing: 6,
    },
    conditionTriggers: ['hypertension', 'bp'],
    urgencyBase: 'emergency',
    description: 'Dangerously elevated blood pressure that can lead to stroke, heart attack, or organ damage.',
    precautions: ['Take prescribed BP medications immediately', 'Sit or lie down calmly', 'Avoid stress and exertion', 'Restrict salt intake'],
    redFlags: ['BP above 180/120 mmHg', 'Severe chest pain', 'Sudden vision loss', 'Facial drooping or arm weakness (stroke)', 'Loss of consciousness'],
    nextSteps: ['Measure BP immediately', 'Take antihypertensive medication if prescribed', 'Go to emergency room if BP >180/120', 'Call 108 ambulance if stroke symptoms'],
    selfCare: ['Sit quietly in a comfortable position', 'Avoid physical exertion', 'Take deep breaths', 'Avoid caffeine and smoking'],
    doctorConsultation: 'Emergency consultation required immediately',
    lifestyle: ['DASH diet (low sodium)', 'Daily 30-min moderate exercise', 'Stress management (yoga/meditation)', 'Avoid alcohol and smoking'],
    recommendedTests: ['Blood Pressure monitoring', 'ECG', 'Echocardiogram', 'Kidney function tests', 'Fundoscopy'],
  },
  {
    name: 'Diabetes Complication',
    icdCode: 'E11',
    symptomWeights: {
      excessive_thirst: 9, frequent_urination: 9, fatigue: 8,
      blurred_vision: 7, slow_healing: 8, tingling_feet: 8,
      weight_loss: 7, frequent_infections: 7, dizziness: 5,
    },
    conditionTriggers: ['diabetes'],
    urgencyBase: 'moderate',
    description: 'Complications arising from uncontrolled blood sugar levels affecting multiple organ systems.',
    precautions: ['Monitor blood glucose regularly', 'Take insulin/medication as prescribed', 'Follow diabetic diet', 'Regular foot examination'],
    redFlags: ['Blood sugar >300 mg/dL', 'Confusion or unconsciousness', 'Fruity breath odor (DKA)', 'Severe foot ulcer', 'Signs of hypoglycemia'],
    nextSteps: ['Monitor blood glucose immediately', 'Consult endocrinologist', 'HbA1c test', 'Kidney and eye checkup'],
    selfCare: ['Strict dietary control', 'Regular glucose monitoring', 'Foot care and hygiene', 'Medication adherence'],
    doctorConsultation: 'Consult within 24 hours, emergency if glucose >400',
    lifestyle: ['Low glycemic index diet', '150 min/week of moderate exercise', 'Weight management', 'Stress reduction'],
    recommendedTests: ['Blood Glucose (fasting and PP)', 'HbA1c', 'Kidney Function Tests', 'Lipid Profile', 'Urine microalbumin', 'Fundus examination'],
  },
  {
    name: 'Acute Respiratory Infection',
    icdCode: 'J06',
    symptomWeights: {
      cough: 10, sore_throat: 9, runny_nose: 8, nasal_congestion: 8,
      fever: 6, sneezing: 8, hoarseness: 7, mild_headache: 5,
      loss_of_appetite: 4,
    },
    urgencyBase: 'low',
    description: 'An infection of the upper respiratory tract commonly caused by viruses, affecting the nose, throat, and sinuses.',
    precautions: ['Cover mouth when coughing/sneezing', 'Wash hands frequently', 'Avoid sharing utensils', 'Use disposable tissues'],
    redFlags: ['High fever >102°F', 'Difficulty swallowing', 'Severe throat pain with drooling', 'Stridor (harsh breathing sound)', 'Neck stiffness'],
    nextSteps: ['Rest at home for 3-5 days', 'Consult doctor if symptoms worsen or persist >7 days', 'Throat swab if severe'],
    selfCare: ['Warm saline gargling', 'Steam inhalation', 'Honey-ginger tea', 'Adequate rest and hydration'],
    doctorConsultation: 'Consult if no improvement in 5-7 days',
    lifestyle: ['Good hand hygiene', 'Avoid cold beverages', 'Nutritious diet', 'Adequate sleep'],
    recommendedTests: ['Throat Swab Culture (if severe)', 'CBC (if persistent fever)', 'Rapid Strep test'],
  },
  {
    name: 'Acute Gastroenteritis',
    icdCode: 'A09',
    symptomWeights: {
      diarrhea: 10, nausea: 9, vomiting: 9, abdominal_cramps: 9,
      fever: 6, loss_of_appetite: 7, dehydration: 9,
      blood_in_stool: 8, mucus_in_stool: 7,
    },
    urgencyBase: 'moderate',
    description: 'Inflammation of the stomach and intestines causing vomiting, diarrhea, and abdominal pain.',
    precautions: ['Drink ORS (Oral Rehydration Solution)', 'Avoid solid food initially', 'Maintain strict hand hygiene', 'Avoid dairy and fatty foods'],
    redFlags: ['Signs of severe dehydration (no urination, sunken eyes)', 'Blood in vomit or stool', 'Fever >39°C', 'Severe abdominal pain', 'Vomiting for >24 hours'],
    nextSteps: ['Start ORS immediately', 'BRAT diet (Bananas, Rice, Applesauce, Toast)', 'Consult doctor if diarrhea >10 times/day'],
    selfCare: ['Frequent small sips of water/ORS', 'Probiotic foods (yogurt)', 'Avoid spicy and oily food', 'Banana and boiled rice'],
    doctorConsultation: 'Consult within 24 hours if vomiting persists or signs of dehydration',
    lifestyle: ['Strict food hygiene', 'Boiled/purified water', 'Wash fruits and vegetables thoroughly', 'Avoid outside food temporarily'],
    recommendedTests: ['Stool culture', 'Stool microscopy', 'CBC', 'Electrolytes (if severe dehydration)'],
  },
  {
    name: 'Migraine',
    icdCode: 'G43',
    symptomWeights: {
      severe_headache: 10, nausea: 7, vomiting: 6, light_sensitivity: 9,
      sound_sensitivity: 8, visual_aura: 9, throbbing_pain: 9,
      one_sided_headache: 9, fatigue: 5, dizziness: 6,
    },
    urgencyBase: 'moderate',
    description: 'A neurological condition causing intense, often throbbing headaches, sometimes with sensory disturbances.',
    precautions: ['Identify and avoid triggers', 'Maintain regular sleep schedule', 'Stay hydrated', 'Manage stress levels'],
    redFlags: ['Sudden worst-ever headache', 'Headache with fever and stiff neck', 'Headache after head injury', 'Neurological symptoms (speech difficulty, weakness)', 'Headache in person >50 years old'],
    nextSteps: ['Rest in dark, quiet room', 'Consult neurologist for preventive therapy', 'Keep headache diary'],
    selfCare: ['Cold compress on forehead', 'Ginger tea for nausea', 'Caffeine in small amounts', 'Relaxation techniques'],
    doctorConsultation: 'Consult neurologist for recurrent migraines',
    lifestyle: ['Regular sleep schedule', 'Stress management', 'Avoid trigger foods (cheese, alcohol, caffeine)', 'Regular moderate exercise'],
    recommendedTests: ['MRI Brain (to rule out secondary causes)', 'CT Head (if first severe headache)', 'Eye examination'],
  },
];

export function getDiseaseBySymptoms(
  symptoms: string[],
  answers: Record<string, string>,
  existingConditions: string[]
): DiseaseResult[] {
  const scores: { rule: DiseaseRule; score: number; maxScore: number }[] = [];

  for (const rule of diseaseRules) {
    let score = 0;
    let maxScore = 0;

    for (const [symptom, weight] of Object.entries(rule.symptomWeights)) {
      maxScore += weight;
      if (symptoms.includes(symptom) || answers[symptom] === 'yes' || answers[symptom] === 'severe') {
        score += weight;
      } else if (answers[symptom] === 'mild' || answers[symptom] === 'moderate') {
        score += weight * 0.5;
      }
    }

    if (rule.conditionTriggers) {
      for (const cond of rule.conditionTriggers) {
        if (existingConditions.some(ec => ec.toLowerCase().includes(cond))) {
          score += 15;
          maxScore += 15;
        }
      }
    }

    if (maxScore > 0) {
      scores.push({ rule, score, maxScore });
    }
  }

  scores.sort((a, b) => (b.score / b.maxScore) - (a.score / a.maxScore));

  return scores.slice(0, 3).map(({ rule, score, maxScore }) => {
    const confidence = Math.min(Math.round((score / maxScore) * 100), 95);
    if (confidence < 15) return null;

    let urgency = rule.urgencyBase;
    if (answers['breathing_difficulty'] === 'severe' || answers['chest_pain'] === 'yes') {
      urgency = 'emergency';
    } else if (answers['pain_level'] && parseInt(answers['pain_level']) >= 8) {
      if (urgency === 'low') urgency = 'moderate';
      else if (urgency === 'moderate') urgency = 'high';
    }

    return {
      name: rule.name,
      icdCode: rule.icdCode,
      confidence,
      urgencyLevel: urgency,
      description: rule.description,
      precautions: rule.precautions,
      redFlags: rule.redFlags,
      nextSteps: rule.nextSteps,
      selfCare: rule.selfCare,
      doctorConsultation: rule.doctorConsultation,
      lifestyle: rule.lifestyle,
      recommendedTests: rule.recommendedTests,
    } as DiseaseResult;
  }).filter(Boolean) as DiseaseResult[];
}
