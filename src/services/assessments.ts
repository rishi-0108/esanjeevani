import type { DiagnosisReport, DiseaseResult, PatientInfo, QuestionAnswer } from '../types';
import { supabase, supabaseConfigError } from '../lib/supabase';

export interface AssessmentHistoryItem {
  id: string;
  createdAt: string;
  report: DiagnosisReport | null;
  reportId: string | null;
  reportTimestamp: string | null;
  urgency: DiagnosisReport['overallUrgency'] | null;
  symptomSummary: string | null;
}

export interface AssessmentHistoryResult {
  assessments: AssessmentHistoryItem[];
  malformedCount: number;
}

type SerializedDiagnosisReport = Omit<DiagnosisReport, 'timestamp'> & { timestamp: string };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(item => typeof item === 'string');
}

function isUrgency(value: unknown): value is DiagnosisReport['overallUrgency'] {
  return value === 'low' || value === 'moderate' || value === 'high' || value === 'emergency';
}

function isPatientInfo(value: unknown): value is PatientInfo {
  if (!isRecord(value)) return false;
  return typeof value.name === 'string'
    && typeof value.age === 'string'
    && typeof value.gender === 'string'
    && isStringArray(value.existingConditions)
    && isStringArray(value.mainSymptoms)
    && typeof value.duration === 'string'
    && typeof value.temperature === 'string'
    && typeof value.painLevel === 'number'
    && typeof value.breathingDifficulty === 'string'
    && typeof value.fatigueLevel === 'string'
    && typeof value.appetite === 'string'
    && typeof value.sleepQuality === 'string'
    && typeof value.travelHistory === 'string'
    && typeof value.infectionExposure === 'string'
    && typeof value.additionalNotes === 'string';
}

function isQuestionAnswer(value: unknown): value is QuestionAnswer {
  return isRecord(value)
    && typeof value.questionId === 'string'
    && typeof value.question === 'string'
    && typeof value.answer === 'string';
}

function isDiseaseResult(value: unknown): value is DiseaseResult {
  return isRecord(value)
    && typeof value.name === 'string'
    && typeof value.icdCode === 'string'
    && typeof value.confidence === 'number'
    && isUrgency(value.urgencyLevel)
    && typeof value.description === 'string'
    && isStringArray(value.precautions)
    && isStringArray(value.redFlags)
    && isStringArray(value.nextSteps)
    && isStringArray(value.selfCare)
    && typeof value.doctorConsultation === 'string'
    && isStringArray(value.lifestyle)
    && isStringArray(value.recommendedTests);
}

function isSerializedReport(value: unknown): value is SerializedDiagnosisReport {
  if (!isRecord(value) || !isPatientInfo(value.patientInfo)) return false;
  return Array.isArray(value.answers)
    && value.answers.every(isQuestionAnswer)
    && Array.isArray(value.results)
    && value.results.every(isDiseaseResult)
    && isUrgency(value.overallUrgency)
    && typeof value.reportId === 'string'
    && typeof value.timestamp === 'string'
    && Number.isFinite(Date.parse(value.timestamp));
}

function asHistoryItem(value: unknown): AssessmentHistoryItem | null {
  if (!isRecord(value) || typeof value.id !== 'string' || typeof value.created_at !== 'string') return null;
  if (!Number.isFinite(Date.parse(value.created_at))) return null;

  const rawReport = value.report_data;
  const reportRecord = isRecord(rawReport) ? rawReport : null;
  const rawPatient = reportRecord && isRecord(reportRecord.patientInfo) ? reportRecord.patientInfo : null;
  const rawSymptoms = rawPatient?.mainSymptoms;
  const symptoms = isStringArray(rawSymptoms) ? rawSymptoms.filter(Boolean) : [];
  const rawUrgency = reportRecord?.overallUrgency;
  const reportTimestamp = typeof reportRecord?.timestamp === 'string'
    && Number.isFinite(Date.parse(reportRecord.timestamp))
    ? reportRecord.timestamp
    : null;
  const serializedReport = isSerializedReport(rawReport) ? rawReport : null;

  return {
    id: value.id,
    createdAt: value.created_at,
    report: serializedReport
      ? { ...serializedReport, timestamp: new Date(serializedReport.timestamp) }
      : null,
    reportId: typeof reportRecord?.reportId === 'string' ? reportRecord.reportId : null,
    reportTimestamp,
    urgency: isUrgency(rawUrgency) ? rawUrgency : null,
    symptomSummary: symptoms.length > 0 ? symptoms.join(', ') : null,
  };
}

export async function saveAssessment(report: DiagnosisReport, userId: string): Promise<void> {
  if (!supabase) {
    throw new Error(supabaseConfigError ?? 'Assessment storage is not configured.');
  }

  const { error } = await supabase.from('assessments').insert({
    user_id: userId,
    report_data: report,
  });

  if (error) throw new Error('Assessment could not be saved.');
}

export async function listAssessments(): Promise<AssessmentHistoryResult> {
  if (!supabase) {
    throw new Error(supabaseConfigError ?? 'Assessment storage is not configured.');
  }

  const { data, error } = await supabase
    .from('assessments')
    .select('id, created_at, report_data')
    .order('created_at', { ascending: false });

  if (error) throw new Error('Assessment history could not be loaded.');
  const rawRows: unknown = data;
  if (!Array.isArray(rawRows)) throw new Error('Assessment history could not be loaded.');

  const assessments: AssessmentHistoryItem[] = [];
  let malformedCount = 0;
  for (const row of rawRows) {
    const item = asHistoryItem(row);
    if (!item) {
      malformedCount += 1;
      continue;
    }
    if (!item.report) malformedCount += 1;
    assessments.push(item);
  }

  return { assessments, malformedCount };
}
