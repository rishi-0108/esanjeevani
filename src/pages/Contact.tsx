import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, ChevronDown, Activity } from 'lucide-react';
import { Page } from '../types';

interface ContactProps {
  onNavigate: (page: Page) => void;
}

const faqs = [
  { q: 'Is E-Sanjeevni a replacement for seeing a doctor?', a: 'No. E-Sanjeevni is a preliminary health screening tool that helps identify possible symptoms and urgency levels. It does not replace professional medical diagnosis or treatment. Always consult a qualified doctor for proper medical care.' },
  { q: 'How accurate is the AI disease prediction?', a: 'The AI uses evidence-based symptom-disease correlation models aligned with WHO and ICMR guidelines. However, AI screening has inherent limitations and should be treated as informational guidance only, not a definitive diagnosis.' },
  { q: 'Is my health data stored or shared?', a: 'E-Sanjeevni processes your health information locally during your session. We follow privacy-by-design principles. No identifiable health data is stored on our servers without your explicit consent.' },
  { q: 'Can I use E-Sanjeevni for children?', a: 'Yes, you can enter the child\'s information. However, pediatric cases have unique clinical presentations. Always consult a pediatrician for children under 14 years, and do not rely solely on AI screening.' },
  { q: 'What should I do if I get an Emergency urgency rating?', a: 'Call 108 (Ambulance) or 112 (Emergency Services) immediately. Go to the nearest emergency room. Do not wait or attempt self-treatment for emergency-level symptoms.' },
  { q: 'Is E-Sanjeevni free to use?', a: 'Yes, E-Sanjeevni is completely free to use. There is no registration required. Our mission is to make preventive health screening accessible to all Indians.' },
  { q: 'How do I report a technical issue or inaccuracy?', a: 'Please email us at support@esanjeevni.in with details of the issue. For medical inaccuracies, include the symptoms entered and the output received. We review all feedback within 48 hours.' },
];

export default function Contact({ onNavigate }: ContactProps) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white pt-16">
      <div className="bg-gradient-to-br from-blue-900 to-teal-800 py-20 px-4 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-xs font-medium px-4 py-2 rounded-full mb-5">
            <Mail className="w-3.5 h-3.5" />
            We're here to help
          </div>
          <h1 className="text-4xl font-extrabold mb-4">Contact E-Sanjeevni</h1>
          <p className="text-blue-100 text-lg">Questions, feedback, or support? Reach our team anytime.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-red-600 rounded-3xl p-8 mb-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-white text-center sm:text-left">
            <h2 className="text-2xl font-extrabold mb-1 flex items-center gap-3 justify-center sm:justify-start">
              <Phone className="w-7 h-7" />
              Medical Emergency?
            </h2>
            <p className="text-red-100">Do not contact us — call emergency services immediately</p>
          </div>
          <div className="flex gap-3">
            <a href="tel:108" className="bg-white text-red-600 font-black text-xl px-7 py-3 rounded-2xl shadow-xl hover:scale-105 transition-all">108</a>
            <a href="tel:104" className="bg-red-800 text-white font-bold text-base px-6 py-3 rounded-2xl hover:bg-red-900 transition-all">104</a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-1 space-y-5">
            <h2 className="text-2xl font-extrabold text-slate-900 mb-5">Get In Touch</h2>

            {[
              { icon: Mail, title: 'Email Support', info: 'support@esanjeevni.in', sub: 'Response within 24-48 hours', color: 'bg-blue-50 border-blue-100', iconColor: 'text-blue-600' },
              { icon: Phone, title: 'Health Helpline', info: '104 (Free)', sub: 'Government health advisory', color: 'bg-teal-50 border-teal-100', iconColor: 'text-teal-600' },
              { icon: MapPin, title: 'Serving', info: 'Pan-India', sub: 'Digital platform — available everywhere', color: 'bg-green-50 border-green-100', iconColor: 'text-green-600' },
            ].map((item, i) => (
              <div key={i} className={`${item.color} border rounded-2xl p-4 flex items-start gap-4`}>
                <div className={`w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm flex-shrink-0`}>
                  <item.icon className={`w-5 h-5 ${item.iconColor}`} />
                </div>
                <div>
                  <p className="font-bold text-slate-800 text-sm">{item.title}</p>
                  <p className="text-slate-700 font-semibold">{item.info}</p>
                  <p className="text-slate-400 text-xs">{item.sub}</p>
                </div>
              </div>
            ))}

            <div className="bg-gradient-to-br from-blue-600 to-teal-600 rounded-2xl p-5 text-white">
              <Activity className="w-8 h-8 text-teal-200 mb-3" />
              <h3 className="font-bold text-lg mb-2">Need Health Screening?</h3>
              <p className="text-blue-100 text-sm mb-4">Use our AI symptom checker for immediate health pre-screening.</p>
              <button
                onClick={() => onNavigate('checker')}
                className="bg-white text-blue-700 font-bold text-sm px-5 py-2.5 rounded-xl hover:scale-105 transition-all"
              >
                Start Health Check →
              </button>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white border border-slate-100 rounded-3xl shadow-sm p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Send Us a Message</h2>

              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                  <p className="text-slate-500 mb-6">Thank you for reaching out. We'll respond within 24-48 hours.</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="border border-slate-200 text-slate-600 font-semibold px-6 py-2.5 rounded-xl hover:bg-slate-50 transition-all"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Your Name *</label>
                      <input
                        required
                        type="text"
                        placeholder="Full name"
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-300 transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Email Address *</label>
                      <input
                        required
                        type="email"
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-300 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Subject *</label>
                    <select
                      required
                      value={form.subject}
                      onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                      className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select a subject</option>
                      <option>Technical Issue</option>
                      <option>Medical Inaccuracy Report</option>
                      <option>General Feedback</option>
                      <option>Partnership / Collaboration</option>
                      <option>Media / Press Inquiry</option>
                      <option>Feature Request</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Message *</label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Describe your query or feedback in detail..."
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                  </div>
                  <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3">
                    <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <p className="text-amber-800 text-xs">For medical emergencies, call 108 immediately. This form is for general inquiries only and is not monitored 24/7.</p>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Frequently Asked Questions</h2>
            <p className="text-slate-500">Find answers to the most common questions about E-Sanjeevni</p>
          </div>
          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-slate-100 rounded-2xl bg-white overflow-hidden hover:shadow-sm transition-shadow">
                <button
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-semibold text-slate-800 text-sm pr-4">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5">
                    <p className="text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
