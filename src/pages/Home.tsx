import { useState, useEffect } from 'react';
import {
  Activity, Brain, AlertTriangle, ClipboardList, Stethoscope, FileText,
  ChevronRight, CheckCircle, Star, Phone, Shield, Zap, Clock, Users,
  ArrowRight, Heart, TrendingUp, Eye, Award, Cpu, Lock
} from 'lucide-react';
import { Page } from '../types';

interface HomeProps {
  onNavigate: (page: Page) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const [statsVisible, setStatsVisible] = useState(false);
  const [counter1, setCounter1] = useState(0);
  const [counter2, setCounter2] = useState(0);
  const [counter3, setCounter3] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    const el = document.getElementById('stats-section');
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!statsVisible) return;
    const targets = [{ target: 50000, setter: setCounter1 }, { target: 95, setter: setCounter2 }, { target: 10, setter: setCounter3 }];
    targets.forEach(({ target, setter }) => {
      let start = 0;
      const increment = target / 60;
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) { setter(target); clearInterval(timer); }
        else setter(Math.floor(start));
      }, 25);
    });
  }, [statsVisible]);

  const features = [
    { icon: Brain, title: 'AI Symptom Analysis', desc: 'Advanced AI algorithms analyze your symptoms across 15+ parameters for precise screening.', color: 'from-blue-500 to-blue-700', bg: 'bg-blue-50', border: 'border-blue-100' },
    { icon: TrendingUp, title: 'Disease Risk Prediction', desc: 'Probability-based scoring across 10+ common diseases with confidence percentages.', color: 'from-teal-500 to-teal-700', bg: 'bg-teal-50', border: 'border-teal-100' },
    { icon: AlertTriangle, title: 'Urgency Detection', desc: '4-tier urgency classification from Low to Emergency with immediate action guidance.', color: 'from-orange-500 to-red-600', bg: 'bg-orange-50', border: 'border-orange-100' },
    { icon: ClipboardList, title: 'Smart Precautions', desc: 'Personalized precautionary measures and self-care instructions based on your condition.', color: 'from-green-500 to-emerald-700', bg: 'bg-green-50', border: 'border-green-100' },
    { icon: Stethoscope, title: 'Doctor Recommendation', desc: 'Clear guidance on when to visit a doctor, urgency timeline, and specialists to consult.', color: 'from-purple-500 to-violet-700', bg: 'bg-purple-50', border: 'border-purple-100' },
    { icon: FileText, title: 'Health Report PDF', desc: 'Downloadable comprehensive health report with all findings to share with your physician.', color: 'from-slate-500 to-slate-700', bg: 'bg-slate-50', border: 'border-slate-100' },
  ];

  const steps = [
    { step: '01', title: 'Enter Basic Information', desc: 'Provide your name, age, gender, and existing health conditions for personalized assessment.', icon: Users },
    { step: '02', title: 'Describe Your Symptoms', desc: 'Select from comprehensive symptom categories including duration, severity, and patterns.', icon: Activity },
    { step: '03', title: 'Answer AI Questions', desc: 'Our AI dynamically generates 10–15 follow-up questions based on your specific symptoms.', icon: Brain },
    { step: '04', title: 'Get Your Health Report', desc: 'Receive a detailed pre-diagnosis report with urgency level, precautions, and next steps.', icon: FileText },
  ];

  const testimonials = [
    { name: 'Priya Sharma', age: 34, city: 'Mumbai', rating: 5, text: 'E-Sanjeevni detected moderate urgency for my symptoms and recommended a CBC test. My doctor later confirmed dengue — early detection helped a lot!', condition: 'Dengue (Early Detection)' },
    { name: 'Rajan Mehta', age: 58, city: 'Delhi', rating: 5, text: 'As a diabetic patient, this helped me understand when my symptoms needed emergency care vs self-management. Extremely professional and accurate.', condition: 'Diabetes Management' },
    { name: 'Anitha Kumar', age: 26, city: 'Bangalore', rating: 5, text: 'The symptom checker asked very intelligent follow-up questions. Got a detailed report I shared with my physician — saved time at the clinic.', condition: 'Respiratory Infection' },
    { name: 'Dr. Sanjay Patel', age: 45, city: 'Ahmedabad', rating: 5, text: 'As a physician, I recommend this to patients for pre-visit preparation. The structured report helps me understand patient history instantly.', condition: 'General Practitioner' },
  ];

  const trustItems = [
    { icon: Shield, label: 'Data Privacy', desc: 'Your health data is encrypted and never shared' },
    { icon: Clock, label: '24/7 Available', desc: 'AI assistance available round the clock' },
    { icon: Zap, label: 'Instant Results', desc: 'Get your health report in under 5 minutes' },
    { icon: Award, label: 'Evidence-Based', desc: 'Based on WHO & ICMR medical guidelines' },
    { icon: Lock, label: 'HIPAA Inspired', desc: 'Designed with healthcare data security standards' },
    { icon: Cpu, label: 'AI Powered', desc: 'Hybrid rule-based and ML diagnostic engine' },
  ];

  return (
    <div className="overflow-hidden">
      <section className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-teal-900 flex items-center relative pt-16 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-cyan-400/10 rounded-full blur-2xl" />
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full animate-ping"
              style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 3}s`, animationDuration: `${2 + Math.random() * 3}s` }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-xs font-medium px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                AI-Powered · Evidence-Based · Free to Use
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
                Early Disease
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-cyan-300"> Detection</span>
                <br />
                <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-200">Before It Gets Serious</span>
              </h1>

              <p className="text-blue-100 text-lg leading-relaxed mb-4">
                <span className="text-white font-semibold">E-Sanjeevni</span> is India's AI-powered health pre-surveillance platform. Check your symptoms, understand urgency, and get actionable guidance — all before visiting a doctor.
              </p>

              <p className="text-teal-300 text-sm font-medium mb-8 border-l-2 border-teal-400 pl-3">
                "Check symptoms early. Understand urgency. Take precautions before it gets serious."
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <button
                  onClick={() => onNavigate('checker')}
                  className="group flex items-center gap-2 bg-gradient-to-r from-teal-400 to-cyan-400 text-blue-950 font-bold px-8 py-4 rounded-2xl shadow-xl hover:shadow-teal-500/30 hover:scale-105 transition-all text-base"
                >
                  <Activity className="w-5 h-5" />
                  Start Health Check — Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => onNavigate('about')}
                  className="flex items-center gap-2 border border-white/30 text-white font-semibold px-6 py-4 rounded-2xl hover:bg-white/10 transition-all text-base"
                >
                  Learn More
                </button>
              </div>

              <div className="flex items-center gap-6 text-sm text-blue-200">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>No registration required</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Results in 5 minutes</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>100% Free</span>
                </div>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-400/20 to-blue-400/20 rounded-3xl blur-2xl transform scale-110" />
                <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-white font-bold text-lg">Health Assessment</h3>
                      <p className="text-blue-200 text-sm">AI Analysis in Progress</p>
                    </div>
                    <div className="w-12 h-12 bg-teal-400/20 border border-teal-400/30 rounded-2xl flex items-center justify-center">
                      <Brain className="w-6 h-6 text-teal-400" />
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    {[
                      { label: 'Symptom Analysis', pct: 92, color: 'bg-teal-400' },
                      { label: 'Risk Assessment', pct: 78, color: 'bg-blue-400' },
                      { label: 'Urgency Detection', pct: 85, color: 'bg-orange-400' },
                    ].map(item => (
                      <div key={item.label}>
                        <div className="flex justify-between text-xs text-blue-200 mb-1">
                          <span>{item.label}</span>
                          <span className="font-semibold text-white">{item.pct}%</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div className={`h-full ${item.color} rounded-full transition-all duration-1000`} style={{ width: `${item.pct}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-orange-500/20 border border-orange-500/30 rounded-2xl p-3 text-center">
                      <p className="text-orange-300 font-bold text-lg">Moderate</p>
                      <p className="text-blue-200 text-xs mt-0.5">Urgency Level</p>
                    </div>
                    <div className="bg-teal-500/20 border border-teal-500/30 rounded-2xl p-3 text-center">
                      <p className="text-teal-300 font-bold text-lg">24–48 hrs</p>
                      <p className="text-blue-200 text-xs mt-0.5">Doctor Visit</p>
                    </div>
                  </div>

                  <div className="mt-4 bg-green-500/20 border border-green-500/30 rounded-xl p-3">
                    <p className="text-green-300 text-sm font-medium flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      3 precautions identified
                    </p>
                  </div>
                </div>
              </div>

              {[
                { icon: '🔴', label: 'Emergency Alert', sub: 'Detected', top: '-top-4', right: '-right-4' },
                { icon: '✅', label: 'Report Ready', sub: 'Download PDF', bottom: '-bottom-4', left: '-left-4' },
              ].map((badge, i) => (
                <div key={i} className={`absolute ${badge.top || ''} ${badge.bottom || ''} ${badge.right || ''} ${badge.left || ''} bg-white rounded-xl shadow-xl p-3 flex items-center gap-2 animate-bounce`} style={{ animationDelay: `${i * 0.5}s`, animationDuration: '3s' }}>
                  <span className="text-lg">{badge.icon}</span>
                  <div>
                    <p className="text-slate-800 font-semibold text-xs">{badge.label}</p>
                    <p className="text-slate-400 text-xs">{badge.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 to-transparent" />
      </section>

      <section id="stats-section" className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: counter1.toLocaleString(), suffix: '+', label: 'Assessments Done', icon: Activity, color: 'text-blue-600' },
              { value: counter2, suffix: '%', label: 'Symptom Accuracy', icon: Brain, color: 'text-teal-600' },
              { value: counter3, suffix: '+', label: 'Disease Patterns', icon: Stethoscope, color: 'text-orange-600' },
              { value: '24/7', suffix: '', label: 'AI Availability', icon: Clock, color: 'text-green-600' },
            ].map((stat, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
                <p className={`text-3xl font-extrabold ${stat.color}`}>
                  {stat.value}{stat.suffix}
                </p>
                <p className="text-slate-500 text-sm mt-1 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white" id="features">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 border border-blue-100">
              <Cpu className="w-3.5 h-3.5" />
              AI-POWERED FEATURES
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
              Everything You Need for <span className="text-blue-600">Early Health Screening</span>
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              A comprehensive AI diagnostic ecosystem powered by evidence-based medical knowledge and real-time analysis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className={`group ${f.bg} border ${f.border} rounded-2xl p-6 hover:shadow-lg transition-all hover:-translate-y-1 cursor-default`}>
                <div className={`w-12 h-12 bg-gradient-to-br ${f.color} rounded-2xl flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform`}>
                  <f.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-slate-900 font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-blue-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 border border-teal-200">
              <CheckCircle className="w-3.5 h-3.5" />
              SIMPLE PROCESS
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
              How <span className="text-teal-600">E-Sanjeevni</span> Works
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              Get a comprehensive AI health report in just 4 simple steps — no account needed, completely free.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={i} className="relative">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow text-center group">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform">
                    <step.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-xs font-black text-blue-300 mb-2 tracking-wider">STEP {step.step}</div>
                  <h3 className="text-slate-900 font-bold text-base mb-2">{step.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ChevronRight className="w-6 h-6 text-blue-300" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => onNavigate('checker')}
              className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-teal-600 text-white font-bold px-10 py-4 rounded-2xl shadow-xl hover:shadow-blue-500/30 hover:scale-105 transition-all text-lg"
            >
              <Activity className="w-5 h-5" />
              Begin Your Health Assessment
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 border border-orange-200">
              <Star className="w-3.5 h-3.5" />
              PATIENT STORIES
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
              Trusted by <span className="text-orange-500">50,000+</span> Patients
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-slate-50 border border-slate-100 rounded-2xl p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-4 italic">"{t.text}"</p>
                <div className="flex items-center gap-3 mt-auto pt-3 border-t border-slate-200">
                  <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{t.name[0]}</span>
                  </div>
                  <div>
                    <p className="text-slate-900 font-semibold text-sm">{t.name}, {t.age}</p>
                    <p className="text-teal-600 text-xs">{t.condition} · {t.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-slate-800 mb-10">Why Choose E-Sanjeevni</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {trustItems.map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 text-center border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all">
                <div className="w-10 h-10 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <item.icon className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-slate-800 font-bold text-sm mb-1">{item.label}</p>
                <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-red-600">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-white text-center md:text-left">
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-3 justify-center md:justify-start">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                Medical Emergency? Call Immediately
              </h2>
              <p className="text-red-100 text-base">If you or someone near you is experiencing a medical emergency — chest pain, breathlessness, loss of consciousness — do not wait.</p>
            </div>
            <div className="flex gap-4">
              <a href="tel:108" className="bg-white text-red-600 font-extrabold text-xl px-8 py-4 rounded-2xl shadow-xl hover:scale-105 transition-all flex items-center gap-2">
                <Phone className="w-6 h-6" />
                108
              </a>
              <a href="tel:112" className="bg-red-800 text-white font-bold text-lg px-6 py-4 rounded-2xl hover:bg-red-900 transition-all flex items-center gap-2">
                <Phone className="w-5 h-5" />
                112
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-blue-900 to-teal-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Heart className="w-12 h-12 text-teal-300 mx-auto mb-6 animate-pulse" />
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Your Health Cannot Wait.
          </h2>
          <p className="text-blue-200 text-lg mb-8 max-w-2xl mx-auto">
            Early detection saves lives. Use E-Sanjeevni to screen your symptoms, understand your health status, and take timely action.
          </p>
          <button
            onClick={() => onNavigate('checker')}
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-teal-400 to-cyan-400 text-blue-950 font-extrabold px-10 py-5 rounded-2xl shadow-2xl hover:scale-105 transition-all text-lg"
          >
            <Activity className="w-6 h-6" />
            Check My Symptoms Now — Free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-blue-300 text-xs mt-4">
            This system does not replace professional medical diagnosis. Please consult a qualified doctor.
          </p>
        </div>
      </section>
    </div>
  );
}
