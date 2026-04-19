import { Brain, Target, TrendingUp, Users, Shield, Award, Heart, Cpu, CheckCircle, ArrowRight } from 'lucide-react';
import { Page } from '../types';

interface AboutProps {
  onNavigate: (page: Page) => void;
}

export default function About({ onNavigate }: AboutProps) {
  const teamMembers = [
    { name: 'Dr. Arjun Sharma', role: 'Chief Medical Advisor', dept: 'MBBS, MD — Internal Medicine', initials: 'AS', color: 'from-blue-500 to-blue-700' },
    { name: 'Priya Mehta', role: 'AI/ML Engineer', dept: 'B.Tech CSE — AI & Data Science', initials: 'PM', color: 'from-teal-500 to-teal-700' },
    { name: 'Rohit Verma', role: 'Full Stack Developer', dept: 'React · Node.js · Supabase', initials: 'RV', color: 'from-green-500 to-emerald-700' },
    { name: 'Anita Krishnan', role: 'UX/UI Designer', dept: 'Healthcare UX Specialist', initials: 'AK', color: 'from-orange-500 to-orange-700' },
    { name: 'Dr. Kavya Nair', role: 'Medical Researcher', dept: 'Epidemiology & Public Health', initials: 'KN', color: 'from-purple-500 to-violet-700' },
    { name: 'Sanjay Patel', role: 'Product Manager', dept: 'Health-Tech Strategy', initials: 'SP', color: 'from-slate-500 to-slate-700' },
  ];

  const innovations = [
    { icon: Brain, title: 'Hybrid AI Diagnosis', desc: 'Combines rule-based clinical logic with probabilistic scoring to analyze symptoms across multiple disease patterns simultaneously.', tag: 'Core AI' },
    { icon: TrendingUp, title: 'Dynamic Question Engine', desc: 'Adaptive follow-up questions generated based on symptom patterns, ensuring highly relevant and personalized assessments.', tag: 'Smart Screening' },
    { icon: Shield, title: 'Emergency Detection', desc: 'Real-time red-flag symptom detection that immediately escalates urgency level and provides emergency action guidance.', tag: 'Safety First' },
    { icon: Target, title: 'Multi-Disease Prediction', desc: 'Simultaneously screens for 10+ disease categories with confidence scoring and differential diagnosis presentation.', tag: 'Accuracy' },
    { icon: Cpu, title: 'Clinical Knowledge Base', desc: 'Built on WHO and ICMR clinical guidelines, ensuring evidence-based symptom-disease correlations and recommendations.', tag: 'Evidence-Based' },
    { icon: Award, title: 'PDF Health Reports', desc: 'Printable comprehensive reports with patient summary, disease predictions, urgency meter, and doctor recommendations.', tag: 'Documentation' },
  ];

  return (
    <div className="min-h-screen bg-white pt-16">
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-teal-800 text-white py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-teal-400/10 rounded-full blur-2xl" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-xs font-medium px-4 py-2 rounded-full mb-6">
            <Heart className="w-3.5 h-3.5 text-red-400" />
            Built for Preventive Healthcare in India
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-5">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-cyan-300">E-Sanjeevni</span>
          </h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            A healthcare innovation aimed at making early disease detection accessible to every Indian citizen through the power of Artificial Intelligence.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 border border-blue-100">
              <Target className="w-3.5 h-3.5" />
              OUR VISION
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
              Healthcare for Every Indian, Before It Gets Serious
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              In India, over 70% of preventable deaths occur due to late diagnosis and delayed medical attention. Rural populations, lower-income groups, and individuals with limited healthcare access often seek medical help only when conditions have become critical.
            </p>
            <p className="text-slate-600 leading-relaxed mb-6">
              E-Sanjeevni was conceived as a bridge — between the moment someone feels unwell and the moment they reach a doctor. By providing AI-powered preliminary screening, we enable early awareness, urgency detection, and guided action.
            </p>
            <div className="flex flex-col gap-3">
              {[
                'Early disease detection for preventive care',
                'Accessible to everyone — free and no signup required',
                'Evidence-based guidance aligned with WHO and ICMR',
                'Designed for Bharat — multilingual support planned',
              ].map((point, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 text-sm">{point}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-3xl p-8 border border-blue-100">
            <h3 className="font-bold text-slate-800 text-lg mb-6">The Problem We're Solving</h3>
            <div className="space-y-5">
              {[
                { stat: '70%', label: 'Preventable deaths due to late diagnosis', color: 'text-red-600', bg: 'bg-red-50' },
                { stat: '65%', label: 'Indians lack adequate access to specialist care', color: 'text-orange-600', bg: 'bg-orange-50' },
                { stat: '3.8', label: 'Average days before seeking medical attention', color: 'text-yellow-600', bg: 'bg-yellow-50' },
                { stat: '6x', label: 'Treatment cost reduction with early detection', color: 'text-green-600', bg: 'bg-green-50' },
              ].map((item, i) => (
                <div key={i} className={`${item.bg} rounded-2xl p-4 flex items-center gap-4`}>
                  <p className={`text-3xl font-black ${item.color}`}>{item.stat}</p>
                  <p className="text-slate-700 text-sm leading-tight">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-16">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 border border-teal-100">
              <Cpu className="w-3.5 h-3.5" />
              INNOVATION SHOWCASE
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-3">Technical Innovations</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Built for healthcare hackathons and designed for real-world impact at scale.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {innovations.map((inn, i) => (
              <div key={i} className="bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-md hover:-translate-y-1 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-teal-600 rounded-2xl flex items-center justify-center shadow">
                    <inn.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-full">{inn.tag}</span>
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{inn.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{inn.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-16 bg-gradient-to-r from-blue-600 to-teal-600 rounded-3xl p-8 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <Brain className="w-12 h-12 text-teal-200 mx-auto mb-5" />
            <h2 className="text-2xl font-extrabold mb-4">AI in Healthcare — Our Approach</h2>
            <p className="text-blue-100 leading-relaxed mb-5">
              E-Sanjeevni uses a hybrid approach combining deterministic rule-based medical logic (based on ICD-10 disease classifications and WHO guidelines) with probabilistic scoring algorithms that weigh symptom combinations, risk factors, and patient demographics.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              {[
                { label: 'Rule-Based Logic', desc: 'Clinical decision trees based on WHO/ICMR guidelines' },
                { label: 'Probabilistic AI', desc: 'Weighted symptom scoring across disease categories' },
                { label: 'Emergency AI', desc: 'Real-time red-flag detection for immediate escalation' },
              ].map((item, i) => (
                <div key={i} className="bg-white/10 border border-white/20 rounded-2xl p-4">
                  <p className="font-bold text-white mb-1">{item.label}</p>
                  <p className="text-blue-200 text-xs">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-16">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 border border-orange-100">
              <Users className="w-3.5 h-3.5" />
              THE TEAM
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-3">Built by Passionate Innovators</h2>
            <p className="text-slate-500 max-w-xl mx-auto">A multidisciplinary team of medical professionals, AI engineers, and designers united by a common goal — better healthcare for all.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {teamMembers.map((m, i) => (
              <div key={i} className="bg-white border border-slate-100 rounded-2xl p-4 text-center hover:shadow-md hover:-translate-y-1 transition-all">
                <div className={`w-14 h-14 bg-gradient-to-br ${m.color} rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-md`}>
                  <span className="text-white font-black text-lg">{m.initials}</span>
                </div>
                <p className="font-bold text-slate-900 text-sm leading-tight">{m.name}</p>
                <p className="text-blue-600 text-xs mt-1 font-medium">{m.role}</p>
                <p className="text-slate-400 text-xs mt-1">{m.dept}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center bg-gradient-to-br from-blue-50 to-teal-50 border border-blue-100 rounded-3xl p-10">
          <Award className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-extrabold text-slate-900 mb-3">Hackathon Innovation</h2>
          <p className="text-slate-600 max-w-2xl mx-auto mb-6">
            E-Sanjeevni was developed as a hackathon project addressing the critical need for accessible preventive healthcare technology in India. Inspired by India's Digital Health Mission and the National Health Policy 2017, this platform represents the future of AI-assisted community health.
          </p>
          <button
            onClick={() => onNavigate('checker')}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-teal-600 text-white font-bold px-8 py-4 rounded-2xl shadow-lg hover:scale-105 transition-all"
          >
            Try E-Sanjeevni <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
