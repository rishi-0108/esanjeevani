import { useRef } from 'react';
import {
  Activity, AlertTriangle, CheckCircle, Download, Printer,
  Calendar, User, Stethoscope, Shield, Phone, ChevronRight,
  FileText, Heart, AlertCircle, ArrowRight, TrendingUp, List, Eye
} from 'lucide-react';
import { DiagnosisReport, Page } from '../types';
import { getUrgencyConfig } from '../utils/diagnosis';

interface ReportProps {
  report: DiagnosisReport;
  onNavigate: (page: Page) => void;
}

function UrgencyGauge({ urgency }: { urgency: string }) {
  const config = getUrgencyConfig(urgency);
  const levels = ['low', 'moderate', 'high', 'emergency'];
  const idx = levels.indexOf(urgency);

  return (
    <div className="relative flex flex-col items-center">
      <div className="relative w-48 h-24 overflow-hidden mb-3">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full border-[14px] border-slate-100" />
        {[
          { color: '#10B981', rotate: -90, opacity: 1 },
          { color: '#F59E0B', rotate: -45, opacity: 1 },
          { color: '#F97316', rotate: 0, opacity: 1 },
          { color: '#EF4444', rotate: 45, opacity: 1 },
        ].map((seg, i) => (
          <div
            key={i}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full border-[14px] border-transparent"
            style={{
              borderTopColor: seg.color,
              transform: `rotate(${seg.rotate}deg) translateX(-50%)`,
              transformOrigin: 'center bottom',
              opacity: i <= idx ? 1 : 0.2,
            }}
          />
        ))}
        <div
          className="absolute bottom-0 left-1/2 w-1 h-20 bg-slate-700 rounded-full origin-bottom transition-all duration-1000"
          style={{
            transformOrigin: 'bottom center',
            transform: `translateX(-50%) rotate(${-90 + idx * 60}deg)`,
          }}
        />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-700 rounded-full" />
      </div>
      <div className={`text-2xl font-black ${config.color}`}>{config.label}</div>
      <div className="text-slate-500 text-xs text-center mt-1 max-w-[160px]">{config.description}</div>
    </div>
  );
}

function ConfidenceBar({ confidence, color }: { confidence: number; color: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${color}`}
          style={{ width: `${confidence}%` }}
        />
      </div>
      <span className="text-sm font-bold text-slate-700 w-10">{confidence}%</span>
    </div>
  );
}

export default function Report({ report, onNavigate }: ReportProps) {
  const printRef = useRef<HTMLDivElement>(null);
  const urgencyConfig = getUrgencyConfig(report.overallUrgency);
  const primaryDisease = report.results[0];

  const handlePrint = () => {
    window.print();
  };

  const formatDate = (d: Date) => new Date(d).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  const urgencyColors = ['bg-green-500', 'bg-yellow-500', 'bg-orange-500', 'bg-red-600'];
  const diseaseConfidenceColors = ['bg-blue-600', 'bg-teal-500', 'bg-slate-400'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pt-20 pb-16 print:bg-white print:pt-0">
      <div className="max-w-5xl mx-auto px-4" ref={printRef}>
        <div className={`${urgencyConfig.bg} ${urgencyConfig.border} border-2 rounded-3xl p-4 mb-6 mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4`}>
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 ${urgencyConfig.badge} rounded-2xl flex items-center justify-center shadow`}>
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-slate-700 font-bold">Urgency Assessment</p>
              <p className={`text-2xl font-black ${urgencyConfig.color}`}>{urgencyConfig.label} URGENCY</p>
            </div>
          </div>
          <p className={`text-sm font-semibold ${urgencyConfig.color} max-w-xs`}>{urgencyConfig.description}</p>
        </div>

        {report.overallUrgency === 'emergency' && (
          <div className="bg-red-600 rounded-2xl p-5 mb-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-white">
              <Phone className="w-8 h-8" />
              <div>
                <p className="font-black text-xl">CALL 108 IMMEDIATELY</p>
                <p className="text-red-100 text-sm">This appears to be a medical emergency. Do not delay.</p>
              </div>
            </div>
            <a href="tel:108" className="bg-white text-red-600 font-black text-xl px-6 py-3 rounded-xl shadow-xl hover:scale-105 transition-all">
              108
            </a>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 col-span-1">
            <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4 text-sm uppercase tracking-wide">
              <User className="w-4 h-4 text-blue-600" />
              Patient Summary
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 bg-blue-50 rounded-xl p-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">{report.patientInfo.name[0]?.toUpperCase()}</span>
                </div>
                <div>
                  <p className="font-bold text-slate-900">{report.patientInfo.name}</p>
                  <p className="text-slate-500 text-xs">{report.patientInfo.age} yrs · {report.patientInfo.gender}</p>
                </div>
              </div>
              {[
                { label: 'Temperature', value: report.patientInfo.temperature ? `${report.patientInfo.temperature}°F` : 'Not recorded' },
                { label: 'Pain Level', value: `${report.patientInfo.painLevel}/10` },
                { label: 'Breathing', value: report.patientInfo.breathingDifficulty },
                { label: 'Fatigue', value: report.patientInfo.fatigueLevel },
                { label: 'Duration', value: report.patientInfo.duration || 'Not specified' },
              ].map(item => (
                <div key={item.label} className="flex justify-between text-sm">
                  <span className="text-slate-500">{item.label}:</span>
                  <span className="font-semibold text-slate-800 capitalize">{item.value}</span>
                </div>
              ))}
              {report.patientInfo.existingConditions.length > 0 && (
                <div>
                  <p className="text-slate-500 text-xs mb-1.5">Existing Conditions:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {report.patientInfo.existingConditions.map(c => (
                      <span key={c} className="bg-orange-100 text-orange-700 text-xs px-2.5 py-1 rounded-full font-medium">{c}</span>
                    ))}
                  </div>
                </div>
              )}
              <div className="pt-2 border-t border-slate-100">
                <p className="text-slate-400 text-xs">Report ID: {report.reportId}</p>
                <p className="text-slate-400 text-xs">{formatDate(report.timestamp)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 flex flex-col items-center justify-center">
            <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wide mb-4 self-start flex items-center gap-2">
              <Activity className="w-4 h-4 text-teal-600" />
              Urgency Meter
            </h3>
            <UrgencyGauge urgency={report.overallUrgency} />
            <div className="flex gap-3 mt-4 w-full justify-center">
              {['Low', 'Moderate', 'High', 'Emergency'].map((l, i) => (
                <div key={l} className="flex flex-col items-center gap-1">
                  <div className={`w-3 h-3 rounded-full ${urgencyColors[i]} ${l.toLowerCase() === report.overallUrgency ? 'ring-2 ring-offset-2 ring-slate-400' : 'opacity-40'}`} />
                  <span className="text-[9px] text-slate-400">{l}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
            <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wide mb-4 flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-orange-500" />
              Doctor Consultation
            </h3>
            {primaryDisease && (
              <div className={`${urgencyConfig.bg} ${urgencyConfig.border} border rounded-2xl p-4 mb-4`}>
                <p className={`text-xs font-semibold ${urgencyConfig.color} mb-1`}>RECOMMENDATION</p>
                <p className="text-slate-800 font-bold text-sm">{primaryDisease.doctorConsultation}</p>
              </div>
            )}
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-600">Show this report to your physician</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-600">Download PDF for records</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-600">Monitor symptoms closely</span>
              </div>
            </div>
            <button className="mt-4 w-full bg-blue-600 text-white font-semibold py-2.5 rounded-xl text-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
              <Stethoscope className="w-4 h-4" />
              Book Doctor (Coming Soon)
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 mb-6">
          <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wide mb-5 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            AI Disease Prediction
            <span className="text-xs font-normal text-slate-400 normal-case">— Preliminary screening only, not a final diagnosis</span>
          </h3>
          <div className="space-y-5">
            {report.results.map((disease, i) => (
              <div key={i} className={`border rounded-2xl p-5 ${i === 0 ? 'border-blue-200 bg-blue-50' : 'border-slate-100 bg-slate-50'}`}>
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-sm ${i === 0 ? 'bg-blue-600' : i === 1 ? 'bg-teal-600' : 'bg-slate-500'}`}>
                      #{i + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-base">{disease.name}</h4>
                      <p className="text-slate-400 text-xs">ICD-10: {disease.icdCode}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${getUrgencyConfig(disease.urgencyLevel).badge}`}>
                      {getUrgencyConfig(disease.urgencyLevel).label}
                    </span>
                  </div>
                </div>
                <p className="text-slate-600 text-sm mb-3">{disease.description}</p>
                <div className="mb-2">
                  <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <span>Symptom Match Confidence</span>
                    <span className="font-bold">{disease.confidence}%</span>
                  </div>
                  <ConfidenceBar confidence={disease.confidence} color={diseaseConfidenceColors[i]} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
            <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wide mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-600" />
              Immediate Precautions
            </h3>
            <div className="space-y-2.5">
              {primaryDisease?.precautions.map((p, i) => (
                <div key={i} className="flex items-start gap-2.5 bg-green-50 border border-green-100 rounded-xl px-3 py-2.5">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 text-sm">{p}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
            <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wide mb-4 flex items-center gap-2">
              <Heart className="w-4 h-4 text-pink-500" />
              Self-Care Guidance
            </h3>
            <div className="space-y-2.5">
              {primaryDisease?.selfCare.map((s, i) => (
                <div key={i} className="flex items-start gap-2.5 bg-pink-50 border border-pink-100 rounded-xl px-3 py-2.5">
                  <Heart className="w-4 h-4 text-pink-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 text-sm">{s}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
            <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wide mb-4 flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-blue-600" />
              Recommended Next Steps
            </h3>
            <div className="space-y-2.5">
              {primaryDisease?.nextSteps.map((s, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 text-blue-700 font-bold text-xs">{i + 1}</div>
                  <span className="text-slate-700 text-sm pt-0.5">{s}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
            <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wide mb-4 flex items-center gap-2">
              <List className="w-4 h-4 text-purple-600" />
              Recommended Tests
            </h3>
            <div className="space-y-2">
              {primaryDisease?.recommendedTests.map((t, i) => (
                <div key={i} className="flex items-center gap-2.5 bg-slate-50 border border-slate-100 rounded-xl px-3 py-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                  <span className="text-slate-700 text-sm font-medium">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-red-50 border-2 border-red-200 rounded-3xl p-6 mb-6">
          <h3 className="font-bold text-red-700 text-sm uppercase tracking-wide mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Red Alert Symptoms — Seek Emergency Care Immediately If You Notice:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {primaryDisease?.redFlags.map((flag, i) => (
              <div key={i} className="flex items-start gap-2.5 bg-white border border-red-100 rounded-xl px-3 py-2.5">
                <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-red-800 text-sm font-medium">{flag}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 mb-6">
          <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wide mb-4 flex items-center gap-2">
            <Eye className="w-4 h-4 text-teal-600" />
            Lifestyle Recommendations
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {primaryDisease?.lifestyle.map((l, i) => (
              <div key={i} className="flex items-start gap-2.5 bg-teal-50 border border-teal-100 rounded-xl px-3 py-2.5">
                <CheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700 text-sm">{l}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 mb-6">
          <h3 className="font-bold text-slate-700 text-sm uppercase tracking-wide mb-4 flex items-center gap-2">
            <FileText className="w-4 h-4 text-slate-500" />
            Nearby Hospitals (Location-Based)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { name: 'Government District Hospital', distance: '1.2 km', type: 'Government', beds: '240+' },
              { name: 'Community Health Center', distance: '2.5 km', type: 'PHC', beds: '80+' },
              { name: 'Apollo Hospitals', distance: '4.1 km', type: 'Private', beds: '500+' },
            ].map((h, i) => (
              <div key={i} className="bg-white border border-slate-100 rounded-xl p-4">
                <p className="font-bold text-slate-800 text-sm mb-1">{h.name}</p>
                <p className="text-blue-600 text-xs font-medium mb-1">{h.distance} away</p>
                <div className="flex gap-2">
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">{h.type}</span>
                  <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">{h.beds} beds</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-slate-400 text-xs mt-3">* Enable location access for real-time nearby hospital suggestions.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6 print:hidden">
          <button
            onClick={handlePrint}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-teal-600 text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            <Download className="w-5 h-5" />
            Download Report (PDF)
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center justify-center gap-2 border border-slate-200 text-slate-600 font-semibold px-6 py-4 rounded-2xl hover:bg-slate-50 transition-all"
          >
            <Printer className="w-5 h-5" />
            Print
          </button>
          <button
            onClick={() => onNavigate('checker')}
            className="flex items-center justify-center gap-2 border border-blue-200 text-blue-600 font-semibold px-6 py-4 rounded-2xl hover:bg-blue-50 transition-all"
          >
            <ArrowRight className="w-5 h-5" />
            New Check
          </button>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-center">
          <AlertCircle className="w-6 h-6 text-amber-500 mx-auto mb-2" />
          <p className="text-amber-800 text-sm font-medium">
            <strong>Medical Disclaimer:</strong> E-Sanjeevni provides preliminary health screening only and does not constitute a medical diagnosis. This report is generated by AI based on symptoms provided and should NOT replace professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional.
          </p>
        </div>
      </div>
    </div>
  );
}
