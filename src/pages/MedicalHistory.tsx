import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Activity, AlertTriangle, Clock3, FileText } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import { listAssessments, type AssessmentHistoryResult } from '../services/assessments';
import type { DiagnosisReport } from '../types';

interface MedicalHistoryProps {
  onOpenAssessment: (assessmentId: string, report: DiagnosisReport) => void;
}

type HistoryState =
  | { ownerId: string; status: 'loading' }
  | { ownerId: string; status: 'error' }
  | { ownerId: string; status: 'ready'; result: AssessmentHistoryResult };

const urgencyStyles: Record<DiagnosisReport['overallUrgency'], string> = {
  low: 'bg-green-100 text-green-700',
  moderate: 'bg-yellow-100 text-yellow-700',
  high: 'bg-orange-100 text-orange-700',
  emergency: 'bg-red-100 text-red-700',
};

function formatDate(value: string | null | undefined) {
  if (!value || !Number.isFinite(Date.parse(value))) return 'Date unavailable';
  return new Date(value).toLocaleString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });
}

export default function MedicalHistory({ onOpenAssessment }: MedicalHistoryProps) {
  const { user, loading: authLoading } = useAuth();
  const [historyState, setHistoryState] = useState<HistoryState | null>(null);
  const [retryKey, setRetryKey] = useState(0);
  const userId = user?.id;

  useEffect(() => {
    let active = true;
    if (authLoading) return () => { active = false; };
    if (!userId) {
      setHistoryState(null);
      return () => { active = false; };
    }

    setHistoryState({ ownerId: userId, status: 'loading' });
    void listAssessments().then(result => {
      if (active) setHistoryState({ ownerId: userId, status: 'ready', result });
    }).catch(() => {
      if (active) setHistoryState({ ownerId: userId, status: 'error' });
    });

    return () => { active = false; };
  }, [authLoading, userId, retryKey]);

  const visibleHistory = userId && historyState?.ownerId === userId ? historyState : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 pt-20 pb-16">
      <main className="max-w-4xl mx-auto px-4">
        <header className="text-center mb-8 mt-8">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-3 border border-blue-200">
            <FileText className="w-3.5 h-3.5" />
            PERSONAL RECORDS
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Medical History</h1>
          <p className="text-slate-500">Review your saved health assessments and reports.</p>
        </header>

        {authLoading ? (
          <section role="status" className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 text-center text-slate-500">Checking your secure session…</section>
        ) : !user ? (
          <section className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 sm:p-10 text-center">
            <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-5"><FileText className="w-7 h-7 text-blue-600" /></div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Sign in to view your history</h2>
            <p className="text-slate-500 mb-6">Your saved assessments are available only to your account. You can also continue using the symptom checker as a guest.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/login" state={{ from: '/medical-history' }} className="bg-gradient-to-r from-blue-600 to-teal-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all">Login to Continue</Link>
              <Link to="/symptom-checker" className="border border-slate-200 text-slate-700 font-semibold px-6 py-3 rounded-xl hover:bg-slate-50 transition-colors">Start a Guest Assessment</Link>
            </div>
          </section>
        ) : !visibleHistory || visibleHistory.status === 'loading' ? (
          <section role="status" className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 text-center text-slate-500">Loading your assessments…</section>
        ) : visibleHistory.status === 'error' ? (
          <section className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 text-center">
            <p role="alert" className="text-red-700 mb-4">Your assessment history could not be loaded. Please try again.</p>
            <button onClick={() => setRetryKey(value => value + 1)} className="bg-blue-600 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-colors">Try Again</button>
          </section>
        ) : visibleHistory.result.assessments.length === 0 ? (
          <section className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 sm:p-10 text-center">
            <div className="w-14 h-14 bg-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-5"><Activity className="w-7 h-7 text-teal-600" /></div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">{visibleHistory.result.malformedCount > 0 ? 'Saved assessments could not be displayed' : 'No saved assessments yet'}</h2>
            <p className="text-slate-500 mb-6">{visibleHistory.result.malformedCount > 0 ? 'Saved assessment records were found, but their required details are incomplete.' : 'Completed assessments created while signed in will appear here.'}</p>
            <Link to="/symptom-checker" className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-teal-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all">Start a Health Assessment</Link>
          </section>
        ) : (
          <div className="space-y-4">
            {visibleHistory.result.malformedCount > 0 && (
              <p role="status" className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                {visibleHistory.result.malformedCount} saved {visibleHistory.result.malformedCount === 1 ? 'assessment has' : 'assessments have'} incomplete data. Any available details are shown; incomplete reports cannot be reopened.
              </p>
            )}
            {visibleHistory.result.assessments.map(assessment => {
              const report = assessment.report;
              return (
              <article key={assessment.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="inline-flex items-center gap-1.5 text-xs text-slate-500"><Clock3 className="w-3.5 h-3.5" />{formatDate(assessment.createdAt)}</span>
                      {assessment.urgency && <span className={`rounded-full px-2.5 py-1 text-xs font-bold uppercase ${urgencyStyles[assessment.urgency]}`}><AlertTriangle className="inline w-3 h-3 mr-1" />{assessment.urgency}</span>}
                    </div>
                    <h2 className="font-bold text-slate-900">{assessment.reportId || 'Assessment report'}</h2>
                    {assessment.symptomSummary && <p className="text-slate-500 text-sm mt-1 break-words">Symptoms: {assessment.symptomSummary}</p>}
                    {!assessment.report && <p className="text-amber-700 text-sm mt-2">This saved report is incomplete and cannot be reopened.</p>}
                  </div>
                  {report && (
                    <button onClick={() => onOpenAssessment(assessment.id, report)} className="shrink-0 bg-blue-600 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-colors">Open Report</button>
                  )}
                </div>
              </article>
              );
            })}
            <div className="text-center pt-4">
              <Link to="/symptom-checker" className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-teal-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all">Start a New Assessment</Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
