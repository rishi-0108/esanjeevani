import { PatientInfo, QuestionAnswer, DiagnosisReport } from '../types';
import { getDiseaseBySymptoms } from '../data/diseases';

export function generateReport(
  patientInfo: PatientInfo,
  answers: QuestionAnswer[]
): DiagnosisReport {
  const answersMap: Record<string, string> = {};
  answers.forEach(a => {
    answersMap[a.questionId] = a.answer.toLowerCase();
  });

  const allSymptoms = [...patientInfo.mainSymptoms];

  if (patientInfo.breathingDifficulty === 'severe') allSymptoms.push('shortness_of_breath');
  if (patientInfo.breathingDifficulty === 'moderate') allSymptoms.push('shortness_of_breath');
  if (parseFloat(patientInfo.temperature) >= 99) allSymptoms.push('fever');
  if (parseFloat(patientInfo.temperature) >= 101) allSymptoms.push('high_fever');
  if (patientInfo.travelHistory === 'yes') allSymptoms.push('travel_history');
  if (patientInfo.infectionExposure === 'yes') allSymptoms.push('infection_exposure');
  if (patientInfo.fatigueLevel === 'severe') allSymptoms.push('severe_fatigue');
  if (patientInfo.appetite === 'none') allSymptoms.push('loss_of_appetite');

  answers.forEach(a => {
    const ans = a.answer.toLowerCase();
    if (ans.includes('severe') || ans === 'yes') {
      allSymptoms.push(a.questionId);
    }
    if (a.questionId === 'cough_type' && !ans.includes('no cough')) allSymptoms.push('cough');
    if (a.questionId === 'diarrhea' && !ans.includes('no')) allSymptoms.push('diarrhea');
    if (a.questionId === 'body_ache' && !ans.includes('no body pain')) allSymptoms.push('body_ache');
    if (a.questionId === 'skin_changes' && ans.includes('rash')) allSymptoms.push('rash');
    if (a.questionId === 'skin_changes' && ans.includes('jaundice')) allSymptoms.push('jaundice');
    if (a.questionId === 'taste_smell' && ans === 'yes') {
      allSymptoms.push('loss_of_taste');
      allSymptoms.push('loss_of_smell');
    }
    if (a.questionId === 'headache_severity' && !ans.includes('no headache')) {
      allSymptoms.push('headache');
      if (ans.includes('one-sided')) allSymptoms.push('one_sided_headache');
      if (ans.includes('light sensitivity')) allSymptoms.push('light_sensitivity');
      if (ans.includes('stiff neck')) allSymptoms.push('stiff_neck');
    }
    if (a.questionId === 'nausea_vomiting') {
      if (!ans.includes('none')) allSymptoms.push('nausea');
      if (ans.includes('vomiting')) allSymptoms.push('vomiting');
    }
    if (a.questionId === 'fever_pattern' && ans.includes('chills and sweating')) {
      allSymptoms.push('chills');
      allSymptoms.push('sweating');
    }
    if (a.questionId === 'bleeding' && !ans.includes('none')) {
      allSymptoms.push('bleeding_gums');
    }
  });

  const results = getDiseaseBySymptoms(
    [...new Set(allSymptoms)],
    answersMap,
    patientInfo.existingConditions
  );

  let overallUrgency: DiagnosisReport['overallUrgency'] = 'low';

  const isEmergency =
    patientInfo.breathingDifficulty === 'severe' ||
    answers.some(a =>
      a.questionId === 'chest_pain' && a.answer.toLowerCase().includes('severe')
    ) ||
    answers.some(a =>
      a.questionId === 'headache_severity' && a.answer.toLowerCase().includes('stiff neck')
    ) ||
    answers.some(a =>
      a.questionId === 'bleeding' && (a.answer.toLowerCase().includes('blood in stool') || a.answer.toLowerCase().includes('blood in urine'))
    );

  if (isEmergency) {
    overallUrgency = 'emergency';
  } else if (results.length > 0) {
    const urgencyOrder = ['emergency', 'high', 'moderate', 'low'];
    for (const level of urgencyOrder) {
      if (results.some(r => r.urgencyLevel === level)) {
        overallUrgency = level as DiagnosisReport['overallUrgency'];
        break;
      }
    }
  }

  if (results.length === 0) {
    results.push({
      name: 'General Health Concern',
      icdCode: 'Z00',
      confidence: 45,
      urgencyLevel: 'low',
      description: 'Based on your symptoms, a general health consultation is advisable to identify the underlying cause.',
      precautions: ['Monitor symptoms closely', 'Maintain good hydration', 'Get adequate rest', 'Avoid self-medication'],
      redFlags: ['Symptoms worsening rapidly', 'High fever above 102°F', 'Chest pain or difficulty breathing', 'Persistent vomiting'],
      nextSteps: ['Schedule appointment with a general physician', 'Note all symptoms with timing', 'Bring all current medications to the appointment'],
      selfCare: ['Rest adequately', 'Stay hydrated', 'Light nutritious meals', 'Avoid stress'],
      doctorConsultation: 'Schedule a consultation within 2-3 days',
      lifestyle: ['Maintain regular sleep schedule', 'Balanced diet', 'Regular light exercise', 'Avoid alcohol and smoking'],
      recommendedTests: ['CBC', 'Basic Metabolic Panel', 'Urinalysis'],
    });
  }

  return {
    patientInfo,
    answers,
    results,
    overallUrgency,
    reportId: `ESJ-${Date.now().toString(36).toUpperCase()}`,
    timestamp: new Date(),
  };
}

export function getUrgencyConfig(urgency: string) {
  switch (urgency) {
    case 'emergency':
      return {
        label: 'EMERGENCY',
        color: 'text-red-600',
        bg: 'bg-red-50',
        border: 'border-red-200',
        badge: 'bg-red-600',
        angle: 162,
        description: 'Seek immediate emergency medical care. Call 108 now.',
      };
    case 'high':
      return {
        label: 'HIGH',
        color: 'text-orange-600',
        bg: 'bg-orange-50',
        border: 'border-orange-200',
        badge: 'bg-orange-500',
        angle: 126,
        description: 'Consult a doctor within the next few hours.',
      };
    case 'moderate':
      return {
        label: 'MODERATE',
        color: 'text-yellow-600',
        bg: 'bg-yellow-50',
        border: 'border-yellow-200',
        badge: 'bg-yellow-500',
        angle: 90,
        description: 'Seek medical consultation within 24-48 hours.',
      };
    default:
      return {
        label: 'LOW',
        color: 'text-green-600',
        bg: 'bg-green-50',
        border: 'border-green-200',
        badge: 'bg-green-500',
        angle: 54,
        description: 'Monitor symptoms. Consult a doctor if they worsen.',
      };
  }
}
