export interface PatientInfo {
  name: string;
  age: string;
  gender: string;
  existingConditions: string[];
  mainSymptoms: string[];
  duration: string;
  temperature: string;
  painLevel: number;
  breathingDifficulty: string;
  fatigueLevel: string;
  appetite: string;
  sleepQuality: string;
  travelHistory: string;
  infectionExposure: string;
  additionalNotes: string;
}

export interface QuestionAnswer {
  questionId: string;
  question: string;
  answer: string;
}

export interface DiseaseResult {
  name: string;
  icdCode: string;
  confidence: number;
  urgencyLevel: 'low' | 'moderate' | 'high' | 'emergency';
  description: string;
  precautions: string[];
  redFlags: string[];
  nextSteps: string[];
  selfCare: string[];
  doctorConsultation: string;
  lifestyle: string[];
  recommendedTests: string[];
}

export interface DiagnosisReport {
  patientInfo: PatientInfo;
  answers: QuestionAnswer[];
  results: DiseaseResult[];
  overallUrgency: 'low' | 'moderate' | 'high' | 'emergency';
  reportId: string;
  timestamp: Date;
}

export type Page = 'home' | 'checker' | 'report' | 'about' | 'contact';

export type CheckerStep = 'basic' | 'symptoms' | 'questions' | 'processing';
