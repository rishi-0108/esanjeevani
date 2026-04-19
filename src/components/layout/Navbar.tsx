import { useState } from 'react';
import { Activity, Menu, X, Phone, Shield } from 'lucide-react';
import { Page } from '../../types';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links: { label: string; page: Page }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Symptom Checker', page: 'checker' },
    { label: 'About', page: 'about' },
    { label: 'Contact', page: 'contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-blue-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 group"
          >
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-teal-500 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-blue-800 text-lg tracking-tight">E-Sanjeevni</span>
              <span className="text-[10px] text-teal-600 font-medium tracking-wide hidden sm:block">AI Health Pre-Surveillance</span>
            </div>
          </button>

          <div className="hidden md:flex items-center gap-1">
            {links.map(link => (
              <button
                key={link.page}
                onClick={() => onNavigate(link.page)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentPage === link.page
                    ? 'bg-blue-50 text-blue-700 shadow-sm'
                    : 'text-slate-600 hover:text-blue-700 hover:bg-blue-50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-green-50 border border-green-200 px-3 py-1.5 rounded-full">
              <Shield className="w-3.5 h-3.5 text-green-600" />
              <span className="text-green-700 font-medium">Secure & Private</span>
            </div>
            <a
              href="tel:108"
              className="flex items-center gap-1.5 bg-red-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-red-700 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              Emergency: 108
            </a>
            <button
              onClick={() => onNavigate('checker')}
              className="bg-gradient-to-r from-blue-600 to-teal-600 text-white text-sm font-semibold px-5 py-2 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all"
            >
              Start Health Check
            </button>
          </div>

          <button
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-blue-50"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-blue-100 px-4 py-3 space-y-1 shadow-lg">
          {links.map(link => (
            <button
              key={link.page}
              onClick={() => { onNavigate(link.page); setMobileOpen(false); }}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                currentPage === link.page
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-slate-600 hover:bg-blue-50 hover:text-blue-700'
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => { onNavigate('checker'); setMobileOpen(false); }}
            className="w-full mt-2 bg-gradient-to-r from-blue-600 to-teal-600 text-white text-sm font-semibold py-3 rounded-xl shadow"
          >
            Start Health Check
          </button>
          <a
            href="tel:108"
            className="w-full flex items-center justify-center gap-2 bg-red-600 text-white text-sm font-semibold py-2.5 rounded-xl mt-1"
          >
            <Phone className="w-4 h-4" />
            Emergency: 108
          </a>
        </div>
      )}
    </nav>
  );
}
