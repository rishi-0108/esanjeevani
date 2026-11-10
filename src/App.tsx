import { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { AuthProvider } from './auth/AuthProvider';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import SymptomChecker from './pages/SymptomChecker';
import Report from './pages/Report';
import About from './pages/About';
import Contact from './pages/Contact';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MedicalHistory from './pages/MedicalHistory';
import { Page, DiagnosisReport } from './types';
import { useAuth } from './auth/AuthContext';
import { saveAssessment } from './services/assessments';

type AssessmentSaveStatus = 'saving' | 'saved' | 'failed';
type ActiveReport =
  | { kind: 'new'; report: DiagnosisReport }
  | { kind: 'historical'; assessmentId: string; ownerId: string; report: DiagnosisReport };

const pagePaths: Record<Page, string> = {
  home: '/',
  checker: '/symptom-checker',
  report: '/report',
  about: '/about',
  contact: '/contact',
  login: '/login',
  register: '/register',
  'medical-history': '/medical-history',
};

const pathPages: Record<string, Page> = Object.fromEntries(
  Object.entries(pagePaths).map(([page, path]) => [path, page])
) as Record<string, Page>;

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

function AppRoutes() {
  const [activeReport, setActiveReport] = useState<ActiveReport | null>(null);
  const [assessmentSaveState, setAssessmentSaveState] = useState<{ reportId: string; status: AssessmentSaveStatus } | null>(null);
  const attemptedReportIds = useRef(new Set<string>());
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigate = (page: Page) => {
    navigate(pagePaths[page]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReportReady = (r: DiagnosisReport) => {
    setActiveReport({ kind: 'new', report: r });
    if (!user) {
      setAssessmentSaveState(null);
    } else if (!attemptedReportIds.current.has(r.reportId)) {
      attemptedReportIds.current.add(r.reportId);
      setAssessmentSaveState({ reportId: r.reportId, status: 'saving' });
      void saveAssessment(r, user.id).then(() => {
        setAssessmentSaveState({ reportId: r.reportId, status: 'saved' });
      }).catch(() => {
        setAssessmentSaveState({ reportId: r.reportId, status: 'failed' });
      });
    }
    navigate('/report');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenHistoricalReport = (assessmentId: string, historicalReport: DiagnosisReport) => {
    if (!user) return;
    setActiveReport({ kind: 'historical', assessmentId, ownerId: user.id, report: historicalReport });
    setAssessmentSaveState(null);
    navigate('/report');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    setActiveReport(current => current?.kind === 'historical' ? null : current);
  }, [user?.id]);

  const currentPage = pathPages[location.pathname] ?? 'home';
  const visibleReport = activeReport?.kind === 'historical' && activeReport.ownerId !== user?.id
    ? null
    : activeReport;

  useEffect(() => {
    const titles: Record<Page, string> = {
      home: 'E-Sanjeevni — AI Health Pre-Surveillance System',
      checker: 'Symptom Checker — E-Sanjeevni',
      report: 'Health Report — E-Sanjeevni',
      about: 'About Us — E-Sanjeevni',
      contact: 'Contact — E-Sanjeevni',
      login: 'Login — E-Sanjeevni',
      register: 'Register — E-Sanjeevni',
      'medical-history': 'Medical History — E-Sanjeevni',
    };
    document.title = titles[currentPage];
  }, [currentPage]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home onNavigate={handleNavigate} />} />
          <Route path="/symptom-checker" element={<SymptomChecker onReportReady={handleReportReady} />} />
          <Route path="/report" element={visibleReport
            ? <Report
                report={visibleReport.report}
                onNavigate={handleNavigate}
                saveStatus={visibleReport.kind === 'new' && assessmentSaveState?.reportId === visibleReport.report.reportId ? assessmentSaveState.status : null}
                historical={visibleReport.kind === 'historical'}
                onReturnToHistory={() => handleNavigate('medical-history')}
              />
            : <div className="min-h-screen flex items-center justify-center pt-16">
                <div className="text-center px-4">
                  <p className="text-slate-500 mb-4">No report is available yet. Complete a symptom check to generate your health report.</p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button onClick={() => handleNavigate('checker')} className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">Start Health Check</button>
                    <button onClick={() => handleNavigate('home')} className="text-blue-700 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors">Return to Home</button>
                  </div>
                </div>
              </div>
          } />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/medical-history" element={<MedicalHistory onOpenAssessment={handleOpenHistoricalReport} />} />
          <Route path="/about" element={<About onNavigate={handleNavigate} />} />
          <Route path="/contact" element={<Contact onNavigate={handleNavigate} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
