import { ArrowLeft, Clock3 } from 'lucide-react';
import { Page } from '../types';

interface PlaceholderPageProps {
  title: string;
  description: string;
  onNavigate: (page: Page) => void;
}

export default function PlaceholderPage({ title, description, onNavigate }: PlaceholderPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 pt-20 pb-16 flex items-center justify-center">
      <section className="max-w-xl mx-4 bg-white rounded-3xl shadow-xl border border-slate-100 p-8 sm:p-10 text-center">
        <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
          <Clock3 className="w-7 h-7 text-blue-600" />
        </div>
        <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4 border border-teal-100">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
          COMING SOON
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 mb-3">{title}</h1>
        <p className="text-slate-500 leading-relaxed mb-7">{description}</p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center justify-center gap-2 border border-slate-200 text-slate-700 font-semibold px-5 py-3 rounded-xl hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
          <button
            onClick={() => onNavigate('checker')}
            className="bg-gradient-to-r from-blue-600 to-teal-600 text-white font-semibold px-5 py-3 rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            Use Symptom Checker
          </button>
        </div>
      </section>
    </div>
  );
}
