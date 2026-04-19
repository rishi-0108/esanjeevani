import { Activity, Phone, Mail, MapPin, Shield, Heart, ExternalLink } from 'lucide-react';
import { Page } from '../../types';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="bg-red-900/30 border-t border-red-800/50 py-3">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-red-300 text-xs font-medium">
            DISCLAIMER: E-Sanjeevni does not replace professional medical diagnosis. Always consult a qualified doctor for proper treatment and diagnosis.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-bold text-white text-lg">E-Sanjeevni</span>
                <p className="text-[10px] text-teal-400">AI Health Pre-Surveillance</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              AI-powered early disease detection and health pre-surveillance system for preventive healthcare.
            </p>
            <div className="flex items-center gap-2 text-xs text-green-400 bg-green-900/30 border border-green-800/50 rounded-full px-3 py-1.5 w-fit">
              <Shield className="w-3.5 h-3.5" />
              <span>HIPAA Compliant Design</span>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: 'Home', page: 'home' as Page },
                { label: 'Symptom Checker', page: 'checker' as Page },
                { label: 'Health Report', page: 'report' as Page },
                { label: 'About Us', page: 'about' as Page },
                { label: 'Contact', page: 'contact' as Page },
              ].map(link => (
                <li key={link.page}>
                  <button
                    onClick={() => onNavigate(link.page)}
                    className="text-slate-400 hover:text-teal-400 text-sm transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Health Resources</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-center gap-1.5 hover:text-teal-400 cursor-pointer transition-colors">
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Ministry of Health, India</span>
              </li>
              <li className="flex items-center gap-1.5 hover:text-teal-400 cursor-pointer transition-colors">
                <ExternalLink className="w-3.5 h-3.5" />
                <span>WHO Health Guidelines</span>
              </li>
              <li className="flex items-center gap-1.5 hover:text-teal-400 cursor-pointer transition-colors">
                <ExternalLink className="w-3.5 h-3.5" />
                <span>AIIMS Patient Portal</span>
              </li>
              <li className="flex items-center gap-1.5 hover:text-teal-400 cursor-pointer transition-colors">
                <ExternalLink className="w-3.5 h-3.5" />
                <span>ICMR Guidelines</span>
              </li>
              <li className="flex items-center gap-1.5 hover:text-teal-400 cursor-pointer transition-colors">
                <ExternalLink className="w-3.5 h-3.5" />
                <span>National Health Portal</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Emergency & Support</h4>
            <div className="space-y-3">
              <a href="tel:108" className="flex items-center gap-2 bg-red-900/40 border border-red-800/50 rounded-xl p-3 hover:bg-red-900/60 transition-colors">
                <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">108 - Ambulance</p>
                  <p className="text-red-300 text-xs">24/7 Emergency</p>
                </div>
              </a>
              <a href="tel:104" className="flex items-center gap-2 bg-blue-900/30 border border-blue-800/50 rounded-xl p-3 hover:bg-blue-900/50 transition-colors">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">104 - Health Helpline</p>
                  <p className="text-blue-300 text-xs">Free Medical Advice</p>
                </div>
              </a>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Mail className="w-4 h-4 text-teal-400" />
                <span>support@esanjeevni.in</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <MapPin className="w-4 h-4 text-teal-400" />
                <span>India — Pan-India Service</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs">
            © 2025 E-Sanjeevni. All rights reserved. Powered by AI for Preventive Healthcare.
          </p>
          <p className="flex items-center gap-1 text-slate-500 text-xs">
            Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for better health outcomes in India
          </p>
        </div>
      </div>
    </footer>
  );
}
