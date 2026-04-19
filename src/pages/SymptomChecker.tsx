import { useState } from 'react';
import { Activity, User, ChevronRight, ChevronLeft, AlertCircle, CheckCircle, Brain, Loader2 } from 'lucide-react';
import { PatientInfo, QuestionAnswer, DiagnosisReport } from '../types';
import { followUpQuestions, getQuestionsForSymptoms } from '../data/questions';
import { generateReport } from '../utils/diagnosis';

interface SymptomCheckerProps {
  onReportReady: (report: DiagnosisReport) => void;
}

const SYMPTOM_OPTIONS = [
  'Fever / High Temperature', 'Cough', 'Sore Throat', 'Runny Nose', 'Chest Pain',
  'Shortness of Breath', 'Headache', 'Body Ache / Muscle Pain', 'Fatigue / Weakness',
  'Nausea', 'Vomiting', 'Diarrhea / Loose Stools', 'Abdominal Pain', 'Skin Rash',
  'Dizziness / Vertigo', 'Joint Pain', 'Back Pain', 'Eye Pain / Redness',
  'Loss of Taste / Smell', 'Chills / Sweating',
];

const EXISTING_CONDITIONS = [
  'Diabetes', 'Hypertension (BP)', 'Asthma', 'Heart Disease', 'Thyroid',
  'Kidney Disease', 'Liver Disease', 'HIV/AIDS', 'Cancer', 'Arthritis', 'None',
];

const emptyPatient: PatientInfo = {
  name: '', age: '', gender: '', existingConditions: [],
  mainSymptoms: [], duration: '', temperature: '',
  painLevel: 5, breathingDifficulty: 'none', fatigueLevel: 'mild',
  appetite: 'normal', sleepQuality: 'normal', travelHistory: 'no',
  infectionExposure: 'no', additionalNotes: '',
};

type Step = 'basic' | 'symptoms' | 'questions' | 'processing';

export default function SymptomChecker({ onReportReady }: SymptomCheckerProps) {
  const [step, setStep] = useState<Step>('basic');
  const [patient, setPatient] = useState<PatientInfo>(emptyPatient);
  const [answers, setAnswers] = useState<QuestionAnswer[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [errors, setErrors] = useState<Partial<PatientInfo>>({});

  const questions = getQuestionsForSymptoms(patient.mainSymptoms);

  const validateBasic = () => {
    const e: Partial<PatientInfo> = {};
    if (!patient.name.trim()) (e as Record<string, string>).name = 'Name is required';
    if (!patient.age || parseInt(patient.age) < 1 || parseInt(patient.age) > 120) (e as Record<string, string>).age = 'Valid age required';
    if (!patient.gender) (e as Record<string, string>).gender = 'Gender is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateSymptoms = () => {
    if (patient.mainSymptoms.length === 0) {
      setErrors({ mainSymptoms: [] });
      return false;
    }
    return true;
  };

  const handleAnswer = (questionId: string, question: string, answer: string) => {
    setAnswers(prev => {
      const filtered = prev.filter(a => a.questionId !== questionId);
      return [...filtered, { questionId, question, answer }];
    });
  };

  const getCurrentAnswer = (questionId: string) => {
    return answers.find(a => a.questionId === questionId)?.answer || '';
  };

  const handleNextQuestion = () => {
    const q = questions[currentQIndex];
    if (!getCurrentAnswer(q.id)) {
      handleAnswer(q.id, q.question, q.type === 'yes_no' ? 'No' : q.options?.[0] || 'Not sure');
    }
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
    } else {
      processReport();
    }
  };

  const processReport = () => {
    setStep('processing');
    setTimeout(() => {
      const report = generateReport(patient, answers);
      onReportReady(report);
    }, 3500);
  };

  const toggleSymptom = (s: string) => {
    setPatient(prev => ({
      ...prev,
      mainSymptoms: prev.mainSymptoms.includes(s)
        ? prev.mainSymptoms.filter(x => x !== s)
        : [...prev.mainSymptoms, s],
    }));
    setErrors({});
  };

  const toggleCondition = (c: string) => {
    if (c === 'None') {
      setPatient(prev => ({ ...prev, existingConditions: ['None'] }));
      return;
    }
    setPatient(prev => ({
      ...prev,
      existingConditions: prev.existingConditions.includes(c)
        ? prev.existingConditions.filter(x => x !== c)
        : [...prev.existingConditions.filter(x => x !== 'None'), c],
    }));
  };

  const stepProgress = step === 'basic' ? 25 : step === 'symptoms' ? 50 : step === 'questions' ? 75 + (currentQIndex / questions.length) * 24 : 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 pt-20 pb-16">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-8 mt-8">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-3 border border-blue-200">
            <Activity className="w-3.5 h-3.5" />
            AI-POWERED HEALTH ASSESSMENT
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Symptom Checker</h1>
          <p className="text-slate-500">Answer a few questions and receive your personalized health pre-screening report.</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-1">
            <div className="bg-white/20 rounded-full h-1.5">
              <div
                className="bg-white rounded-full h-1.5 transition-all duration-700"
                style={{ width: `${stepProgress}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-100">
            {[
              { id: 'basic', label: 'Basic Info', num: 1 },
              { id: 'symptoms', label: 'Symptoms', num: 2 },
              { id: 'questions', label: 'AI Questions', num: 3 },
              { id: 'processing', label: 'Report', num: 4 },
            ].map((s, i) => {
              const isActive = s.id === step;
              const isDone = ['basic', 'symptoms', 'questions', 'processing'].indexOf(s.id) < ['basic', 'symptoms', 'questions', 'processing'].indexOf(step);
              return (
                <div key={s.id} className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    isDone ? 'bg-green-500 text-white' : isActive ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-200 text-slate-500'
                  }`}>
                    {isDone ? <CheckCircle className="w-4 h-4" /> : s.num}
                  </div>
                  <span className={`text-xs font-semibold hidden sm:block ${isActive ? 'text-blue-700' : isDone ? 'text-green-600' : 'text-slate-400'}`}>
                    {s.label}
                  </span>
                  {i < 3 && <ChevronRight className="w-4 h-4 text-slate-300 mx-1" />}
                </div>
              );
            })}
          </div>

          <div className="p-6 sm:p-8">
            {step === 'basic' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-blue-100 rounded-2xl flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Patient Information</h2>
                    <p className="text-slate-400 text-sm">Tell us about yourself</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Full Name *</label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      value={patient.name}
                      onChange={e => { setPatient(p => ({ ...p, name: e.target.value })); setErrors({}); }}
                      className={`w-full border rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${(errors as Record<string, string>).name ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-slate-50 hover:border-blue-300'}`}
                    />
                    {(errors as Record<string, string>).name && <p className="text-red-500 text-xs mt-1">{(errors as Record<string, string>).name}</p>}
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Age *</label>
                    <input
                      type="number"
                      placeholder="Years"
                      min={1}
                      max={120}
                      value={patient.age}
                      onChange={e => { setPatient(p => ({ ...p, age: e.target.value })); setErrors({}); }}
                      className={`w-full border rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${(errors as Record<string, string>).age ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-slate-50 hover:border-blue-300'}`}
                    />
                    {(errors as Record<string, string>).age && <p className="text-red-500 text-xs mt-1">{(errors as Record<string, string>).age}</p>}
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Gender *</label>
                    <div className="flex gap-3">
                      {['Male', 'Female', 'Other'].map(g => (
                        <button
                          key={g}
                          onClick={() => { setPatient(p => ({ ...p, gender: g })); setErrors({}); }}
                          className={`flex-1 py-3 rounded-xl text-sm font-semibold border transition-all ${patient.gender === g ? 'bg-blue-600 text-white border-blue-600 shadow-md' : 'border-slate-200 text-slate-600 hover:border-blue-300 bg-slate-50'}`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                    {(errors as Record<string, string>).gender && <p className="text-red-500 text-xs mt-1">{(errors as Record<string, string>).gender}</p>}
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Body Temperature (°F)</label>
                    <input
                      type="number"
                      placeholder="e.g. 98.6"
                      step="0.1"
                      value={patient.temperature}
                      onChange={e => setPatient(p => ({ ...p, temperature: e.target.value }))}
                      className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-300 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700 mb-2 block">Existing Medical Conditions</label>
                  <div className="flex flex-wrap gap-2">
                    {EXISTING_CONDITIONS.map(c => (
                      <button
                        key={c}
                        onClick={() => toggleCondition(c)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${patient.existingConditions.includes(c) ? 'bg-teal-600 text-white border-teal-600 shadow' : 'border-slate-200 text-slate-600 hover:border-teal-400 bg-slate-50'}`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Breathing Difficulty</label>
                    <select
                      value={patient.breathingDifficulty}
                      onChange={e => setPatient(p => ({ ...p, breathingDifficulty: e.target.value }))}
                      className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="none">No difficulty</option>
                      <option value="mild">Mild shortness of breath</option>
                      <option value="moderate">Moderate — during activity</option>
                      <option value="severe">Severe — even at rest</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Fatigue Level</label>
                    <select
                      value={patient.fatigueLevel}
                      onChange={e => setPatient(p => ({ ...p, fatigueLevel: e.target.value }))}
                      className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="none">No fatigue</option>
                      <option value="mild">Mild tiredness</option>
                      <option value="moderate">Moderate fatigue</option>
                      <option value="severe">Severe — cannot do daily tasks</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Appetite</label>
                    <select
                      value={patient.appetite}
                      onChange={e => setPatient(p => ({ ...p, appetite: e.target.value }))}
                      className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="normal">Normal</option>
                      <option value="reduced">Reduced appetite</option>
                      <option value="none">No appetite</option>
                      <option value="increased">Increased appetite</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Sleep Quality</label>
                    <select
                      value={patient.sleepQuality}
                      onChange={e => setPatient(p => ({ ...p, sleepQuality: e.target.value }))}
                      className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="normal">Normal sleep</option>
                      <option value="disturbed">Disturbed sleep</option>
                      <option value="excessive">Excessive sleepiness</option>
                      <option value="insomnia">Unable to sleep</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Recent Travel History?</label>
                    <div className="flex gap-3">
                      {['Yes', 'No'].map(v => (
                        <button
                          key={v}
                          onClick={() => setPatient(p => ({ ...p, travelHistory: v.toLowerCase() }))}
                          className={`flex-1 py-3 rounded-xl text-sm font-semibold border transition-all ${patient.travelHistory === v.toLowerCase() ? 'bg-blue-600 text-white border-blue-600' : 'border-slate-200 text-slate-600 hover:border-blue-300 bg-slate-50'}`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Known Infection Exposure?</label>
                    <div className="flex gap-3">
                      {['Yes', 'No'].map(v => (
                        <button
                          key={v}
                          onClick={() => setPatient(p => ({ ...p, infectionExposure: v.toLowerCase() }))}
                          className={`flex-1 py-3 rounded-xl text-sm font-semibold border transition-all ${patient.infectionExposure === v.toLowerCase() ? 'bg-blue-600 text-white border-blue-600' : 'border-slate-200 text-slate-600 hover:border-blue-300 bg-slate-50'}`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Pain Level (1–10)</label>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-green-600 font-medium">1 (No pain)</span>
                    <input
                      type="range"
                      min={1}
                      max={10}
                      value={patient.painLevel}
                      onChange={e => setPatient(p => ({ ...p, painLevel: parseInt(e.target.value) }))}
                      className="flex-1 h-2 appearance-none bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 rounded-full cursor-pointer"
                    />
                    <span className="text-sm text-red-600 font-medium">10 (Worst)</span>
                    <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-700 text-sm">{patient.painLevel}</span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Additional Notes (Optional)</label>
                  <textarea
                    placeholder="Describe anything else about your symptoms or medical history..."
                    value={patient.additionalNotes}
                    onChange={e => setPatient(p => ({ ...p, additionalNotes: e.target.value }))}
                    rows={3}
                    className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>

                <button
                  onClick={() => { if (validateBasic()) setStep('symptoms'); }}
                  className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                >
                  Continue to Symptoms
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {step === 'symptoms' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-orange-100 rounded-2xl flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Select Your Symptoms</h2>
                    <p className="text-slate-400 text-sm">Choose all symptoms you are currently experiencing</p>
                  </div>
                </div>

                {errors.mainSymptoms !== undefined && patient.mainSymptoms.length === 0 && (
                  <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    Please select at least one symptom to continue.
                  </div>
                )}

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {SYMPTOM_OPTIONS.map(s => {
                    const isSelected = patient.mainSymptoms.includes(s);
                    return (
                      <button
                        key={s}
                        onClick={() => toggleSymptom(s)}
                        className={`flex items-center gap-2 p-3 rounded-xl text-sm font-medium border transition-all text-left ${
                          isSelected
                            ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                            : 'border-slate-200 text-slate-600 hover:border-blue-300 hover:bg-blue-50 bg-white'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${isSelected ? 'border-white bg-white' : 'border-slate-300'}`}>
                          {isSelected && <div className="w-2 h-2 bg-blue-600 rounded-full" />}
                        </div>
                        {s}
                      </button>
                    );
                  })}
                </div>

                {patient.mainSymptoms.length > 0 && (
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                    <p className="text-blue-700 text-sm font-semibold mb-2">Selected ({patient.mainSymptoms.length}):</p>
                    <div className="flex flex-wrap gap-2">
                      {patient.mainSymptoms.map(s => (
                        <span key={s} className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-medium">{s}</span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Duration of Symptoms</label>
                    <select
                      value={patient.duration}
                      onChange={e => setPatient(p => ({ ...p, duration: e.target.value }))}
                      className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select duration</option>
                      <option value="less_than_day">Less than 1 day</option>
                      <option value="1_2_days">1–2 days</option>
                      <option value="3_5_days">3–5 days</option>
                      <option value="1_week">About 1 week</option>
                      <option value="more_than_week">More than a week</option>
                      <option value="chronic">Ongoing / Chronic</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep('basic')}
                    className="flex items-center gap-2 border border-slate-200 text-slate-600 font-semibold px-6 py-3 rounded-xl hover:bg-slate-50 transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Back
                  </button>
                  <button
                    onClick={() => { if (validateSymptoms()) { setCurrentQIndex(0); setStep('questions'); } }}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-teal-600 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    Start AI Questions ({questions.length} questions)
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {step === 'questions' && questions.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-teal-100 rounded-2xl flex items-center justify-center">
                      <Brain className="w-5 h-5 text-teal-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">AI Follow-Up Questions</h2>
                      <p className="text-slate-400 text-sm">Question {currentQIndex + 1} of {questions.length}</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-blue-600">{Math.round(((currentQIndex + 1) / questions.length) * 100)}%</span>
                </div>

                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-teal-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${((currentQIndex + 1) / questions.length) * 100}%` }}
                  />
                </div>

                {(() => {
                  const q = questions[currentQIndex];
                  const currentAns = getCurrentAnswer(q.id);
                  return (
                    <div className="bg-gradient-to-br from-blue-50 to-teal-50 border border-blue-100 rounded-2xl p-6">
                      <p className="text-slate-800 font-bold text-lg mb-5 leading-relaxed">{q.question}</p>

                      {q.type === 'yes_no' && (
                        <div className="flex gap-4">
                          {['Yes', 'No'].map(opt => (
                            <button
                              key={opt}
                              onClick={() => handleAnswer(q.id, q.question, opt)}
                              className={`flex-1 py-4 rounded-xl font-bold text-base border-2 transition-all ${
                                currentAns === opt
                                  ? opt === 'Yes' ? 'bg-orange-500 text-white border-orange-500 shadow-lg' : 'bg-green-500 text-white border-green-500 shadow-lg'
                                  : 'border-slate-200 text-slate-600 hover:border-blue-300 bg-white'
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      )}

                      {(q.type === 'choice' || q.type === 'scale') && q.options && (
                        <div className="space-y-2.5">
                          {q.options.map(opt => (
                            <button
                              key={opt}
                              onClick={() => handleAnswer(q.id, q.question, opt)}
                              className={`w-full text-left px-5 py-3.5 rounded-xl border-2 font-medium text-sm transition-all ${
                                currentAns === opt
                                  ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                                  : 'border-slate-200 text-slate-700 hover:border-blue-300 hover:bg-blue-50 bg-white'
                              }`}
                            >
                              <span className={`inline-block w-5 h-5 rounded-full border-2 mr-3 align-middle transition-all ${currentAns === opt ? 'border-white bg-white/30' : 'border-slate-300'}`} />
                              {opt}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })()}

                <div className="flex gap-3">
                  <button
                    onClick={() => currentQIndex > 0 ? setCurrentQIndex(currentQIndex - 1) : setStep('symptoms')}
                    className="flex items-center gap-2 border border-slate-200 text-slate-600 font-semibold px-6 py-3 rounded-xl hover:bg-slate-50 transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Back
                  </button>
                  <button
                    onClick={handleNextQuestion}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-teal-600 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    {currentQIndex === questions.length - 1 ? (
                      <>Generate My Health Report <CheckCircle className="w-5 h-5" /></>
                    ) : (
                      <>Next Question <ChevronRight className="w-5 h-5" /></>
                    )}
                  </button>
                </div>
              </div>
            )}

            {step === 'processing' && (
              <div className="text-center py-16 px-4">
                <div className="relative w-24 h-24 mx-auto mb-8">
                  <div className="absolute inset-0 border-4 border-blue-100 rounded-full" />
                  <div className="absolute inset-0 border-4 border-t-blue-600 border-r-teal-500 rounded-full animate-spin" />
                  <div className="absolute inset-3 bg-blue-50 rounded-full flex items-center justify-center">
                    <Brain className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
                <h2 className="text-2xl font-extrabold text-slate-900 mb-3">Analyzing Your Health Data</h2>
                <p className="text-slate-500 mb-8 max-w-md mx-auto">Our AI is processing your symptoms against thousands of medical patterns and clinical guidelines to generate your personalized report.</p>
                <div className="max-w-xs mx-auto space-y-3">
                  {[
                    { label: 'Analyzing symptom patterns...', done: true },
                    { label: 'Cross-referencing medical database...', done: true },
                    { label: 'Calculating disease probabilities...', done: false },
                    { label: 'Generating health report...', done: false },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm">
                      {item.done ? (
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      ) : (
                        <Loader2 className="w-5 h-5 text-blue-500 animate-spin flex-shrink-0" />
                      )}
                      <span className={item.done ? 'text-slate-500 line-through' : 'text-slate-700 font-medium'}>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-amber-800 text-sm">
            <strong>Important Disclaimer:</strong> This tool provides preliminary health screening only. It does not replace professional medical diagnosis. Always consult a qualified doctor for proper treatment and diagnosis.
          </p>
        </div>
      </div>
    </div>
  );
}
