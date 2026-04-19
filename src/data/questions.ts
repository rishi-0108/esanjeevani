export interface FollowUpQuestion {
  id: string;
  question: string;
  type: 'yes_no' | 'scale' | 'choice' | 'text';
  options?: string[];
  triggerSymptoms?: string[];
  alwaysAsk?: boolean;
  icon?: string;
}

export const followUpQuestions: FollowUpQuestion[] = [
  {
    id: 'fever_present',
    question: 'Do you currently have a fever or elevated body temperature?',
    type: 'yes_no',
    alwaysAsk: true,
  },
  {
    id: 'fever_duration',
    question: 'For how many days have you had fever?',
    type: 'choice',
    options: ['Less than 1 day', '1–2 days', '3–5 days', 'More than 5 days'],
    triggerSymptoms: ['fever', 'chills'],
  },
  {
    id: 'fever_pattern',
    question: 'How does the fever pattern appear?',
    type: 'choice',
    options: ['Continuous throughout the day', 'Comes and goes with chills and sweating', 'Mainly in evenings', 'Unpredictable pattern'],
    triggerSymptoms: ['fever', 'chills'],
  },
  {
    id: 'cough_type',
    question: 'What type of cough do you have?',
    type: 'choice',
    options: ['Dry cough', 'Wet cough with phlegm', 'Cough with blood', 'No cough'],
    triggerSymptoms: ['cough', 'respiratory'],
    alwaysAsk: true,
  },
  {
    id: 'breathing_difficulty',
    question: 'Are you experiencing any difficulty in breathing?',
    type: 'choice',
    options: ['No difficulty', 'Mild shortness of breath', 'Moderate — difficulty during activity', 'Severe — difficulty even at rest'],
    alwaysAsk: true,
  },
  {
    id: 'chest_pain',
    question: 'Do you have any chest pain or tightness?',
    type: 'choice',
    options: ['No', 'Mild discomfort', 'Moderate chest pain', 'Severe crushing chest pain'],
    alwaysAsk: true,
  },
  {
    id: 'headache_severity',
    question: 'How would you describe your headache?',
    type: 'choice',
    options: ['No headache', 'Mild throbbing', 'Moderate one-sided', 'Severe worst-ever headache', 'Headache with stiff neck'],
    alwaysAsk: true,
  },
  {
    id: 'nausea_vomiting',
    question: 'Do you have nausea or vomiting?',
    type: 'choice',
    options: ['None', 'Mild nausea only', 'Nausea with occasional vomiting', 'Frequent vomiting (>3 times/day)'],
    alwaysAsk: true,
  },
  {
    id: 'diarrhea',
    question: 'Are you experiencing diarrhea or loose stools?',
    type: 'choice',
    options: ['No', 'Mild (1–2 times)', 'Moderate (3–5 times)', 'Severe (more than 5 times)', 'With blood or mucus'],
    alwaysAsk: true,
  },
  {
    id: 'body_ache',
    question: 'Do you have significant body pain or muscle aches?',
    type: 'choice',
    options: ['No body pain', 'Mild general ache', 'Moderate joint and muscle pain', 'Severe pain (especially eye/joint pain)'],
    alwaysAsk: true,
  },
  {
    id: 'skin_changes',
    question: 'Have you noticed any skin changes or rashes?',
    type: 'choice',
    options: ['No changes', 'Mild redness', 'Rash on body/limbs', 'Rash with blisters', 'Yellowing of skin/eyes (jaundice)'],
    alwaysAsk: true,
  },
  {
    id: 'taste_smell',
    question: 'Have you noticed loss of taste or smell?',
    type: 'yes_no',
    alwaysAsk: true,
  },
  {
    id: 'urination',
    question: 'Any changes in urination patterns?',
    type: 'choice',
    options: ['Normal urination', 'Increased frequency', 'Decreased/dark urine', 'Painful urination', 'Blood in urine'],
    alwaysAsk: true,
  },
  {
    id: 'dizziness',
    question: 'Do you feel dizzy or experience sudden blackouts?',
    type: 'choice',
    options: ['No', 'Mild lightheadedness', 'Dizziness when standing', 'Severe spinning sensation (vertigo)'],
    alwaysAsk: true,
  },
  {
    id: 'bleeding',
    question: 'Have you noticed any unusual bleeding?',
    type: 'choice',
    options: ['None', 'Mild bleeding from gums', 'Nosebleed', 'Blood in stool', 'Easy bruising'],
    triggerSymptoms: ['dengue', 'fever'],
  },
];

export function getQuestionsForSymptoms(symptoms: string[]): FollowUpQuestion[] {
  return followUpQuestions.filter(q => {
    if (q.alwaysAsk) return true;
    if (q.triggerSymptoms) {
      return q.triggerSymptoms.some(ts =>
        symptoms.some(s => s.toLowerCase().includes(ts.toLowerCase()))
      );
    }
    return false;
  });
}
