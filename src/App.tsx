import { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import SymptomChecker from './pages/SymptomChecker';
import Report from './pages/Report';
import About from './pages/About';
import Contact from './pages/Contact';
import { Page, DiagnosisReport } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [report, setReport] = useState<DiagnosisReport | null>(null);

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReportReady = (r: DiagnosisReport) => {
    setReport(r);
    setCurrentPage('report');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const titles: Record<Page, string> = {
      home: 'E-Sanjeevni — AI Health Pre-Surveillance System',
      checker: 'Symptom Checker — E-Sanjeevni',
      report: 'Health Report — E-Sanjeevni',
      about: 'About Us — E-Sanjeevni',
      contact: 'Contact — E-Sanjeevni',
    };
    document.title = titles[currentPage];
  }, [currentPage]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
      <main className="flex-1">
        {currentPage === 'home' && <Home onNavigate={handleNavigate} />}
        {currentPage === 'checker' && <SymptomChecker onReportReady={handleReportReady} />}
        {currentPage === 'report' && report && <Report report={report} onNavigate={handleNavigate} />}
        {currentPage === 'report' && !report && (
          <div className="min-h-screen flex items-center justify-center pt-16">
            <div className="text-center">
              <p className="text-slate-500 mb-4">No report available. Please complete the symptom checker first.</p>
              <button
                onClick={() => handleNavigate('checker')}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
              >
                Start Health Check
              </button>
            </div>
          </div>
        )}
        {currentPage === 'about' && <About onNavigate={handleNavigate} />}
        {currentPage === 'contact' && <Contact onNavigate={handleNavigate} />}
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
