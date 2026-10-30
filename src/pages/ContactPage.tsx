import React, { useState } from 'react';
import { RoutePath } from '../types';
import { COMPANY_INFO } from '../config/siteData';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  Copy, 
  Check, 
  Building2 
} from 'lucide-react';

interface ContactPageProps {
  onNavigate: (path: RoutePath) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Consignment Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Please provide your name';
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) {
      errs.phone = 'Please provide a valid 10-digit phone number';
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Please provide a valid email address';
    }
    if (!message.trim() || message.trim().length < 5) {
      errs.message = 'Please provide details of your enquiry';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  const inquirySummary = `
JAHAN EXPRESS CONTACT ENQUIRY
----------------------------------------
Name: ${name}
Phone: ${phone}
Email: ${email}
Subject: ${subject}
Message:
${message}
----------------------------------------
Timestamp: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
`.trim();

  const handleCopy = () => {
    navigator.clipboard.writeText(inquirySummary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#F8FAFD] min-h-screen py-10 sm:py-16">
      <div className="max-w-[1140px] mx-auto px-5 sm:px-8">
        
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-4">
            <button onClick={() => onNavigate('/')} className="hover:text-blue-600 cursor-pointer">
              Home
            </button>
            <span>/</span>
            <span className="text-slate-900 font-semibold">Contact & Support</span>
          </nav>
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-widest block mb-2">
            Get in Touch
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
            Connect with our dispatch desk.
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mt-3 leading-relaxed">
            Direct coordination for freight pickups, rate inquiries, and student relocation bookings from our New Delhi hub.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Left Column: Contact Cards & Addresses (Span 5) */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Primary Phone Card */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
              <div className="flex items-center gap-3.5 mb-2">
                <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                    Call our team
                  </span>
                  <a
                    href={COMPANY_INFO.primaryPhoneTel}
                    className="text-lg font-bold text-slate-900 hover:text-blue-600 transition-colors font-mono"
                  >
                    {COMPANY_INFO.primaryPhoneFormatted}
                  </a>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mt-2">
                Direct phone assistance for bookings, consignment pickups, and status questions.
              </p>
            </div>

            {/* Email Card */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
              <div className="flex items-center gap-3.5 mb-2">
                <div className="w-11 h-11 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                    Official Email
                  </span>
                  <a
                    href={`mailto:${COMPANY_INFO.primaryEmail}`}
                    className="text-base font-bold text-slate-900 hover:text-blue-600 transition-colors"
                  >
                    {COMPANY_INFO.primaryEmail}
                  </a>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mt-2">
                Send packing inventories, corporate contracts, and business inquiries.
              </p>
            </div>

            {/* Operational Work Address */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
              <div className="flex items-start gap-3.5">
                <MapPin className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                    Operational Dispatch Depot (Maya Puri)
                  </span>
                  <p className="text-sm text-slate-900 font-medium mt-1">
                    {COMPANY_INFO.workAddress.line1}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600">
                    {COMPANY_INFO.workAddress.city} – {COMPANY_INFO.workAddress.pincode}, {COMPANY_INFO.workAddress.country}
                  </p>
                  <span className="inline-block mt-2 text-xs font-medium text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md">
                    Central Cargo Dispatch Depot
                  </span>
                </div>
              </div>
            </div>

            {/* Registered Address (Single clean owner-approved line) */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
              <div className="flex items-start gap-3.5">
                <Building2 className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                    Registered Address (Uttam Nagar)
                  </span>
                  <p className="text-sm text-slate-900 font-medium mt-1">
                    {COMPANY_INFO.registeredAddress.line1}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600">
                    {COMPANY_INFO.registeredAddress.city} – {COMPANY_INFO.registeredAddress.pincode}, India
                  </p>
                </div>
              </div>
            </div>

            {/* Operating Hours Card */}
            <div className="p-5 rounded-2xl bg-slate-100/70 border border-slate-200/80 text-xs sm:text-sm space-y-1">
              <div className="flex items-center gap-2 font-bold text-slate-800">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>Operating Hours</span>
              </div>
              <p className="text-slate-600 pl-6">
                {COMPANY_INFO.operatingHours}
              </p>
              <p className="text-slate-500 text-xs pl-6">
                Sunday: Closed for routine dispatch (urgent cargo on prior booking).
              </p>
            </div>

          </div>

          {/* Right Column: Contact Form (Span 7) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 sm:p-8">
              
              <div className="border-b border-slate-100 pb-4 mb-6">
                <h3 className="text-xl font-bold text-slate-900">
                  Send an Inquiry
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Fill in your requirements below for general questions, special zone transport, or booking assistance.
                </p>
              </div>

              {submitted ? (
                <div className="py-8 text-center space-y-5">
                  <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900">
                      Enquiry Prepared Successfully
                    </h4>
                    <p className="text-sm text-slate-600 max-w-md mx-auto mt-1 leading-relaxed">
                      You can copy your inquiry summary below or launch your email application to send it directly to <strong>{COMPANY_INFO.primaryEmail}</strong>.
                    </p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-left font-mono text-xs text-slate-800 whitespace-pre-wrap max-h-48 overflow-y-auto">
                    {inquirySummary}
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="min-h-[44px] w-full sm:w-auto px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer hover:bg-slate-800"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      <span>{copied ? 'Copied' : 'Copy details'}</span>
                    </button>

                    <a
                      href={`mailto:${COMPANY_INFO.primaryEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(inquirySummary)}`}
                      className="min-h-[44px] w-full sm:w-auto px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 hover:bg-blue-700"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Open email client</span>
                    </a>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setMessage('');
                    }}
                    className="text-xs text-blue-600 font-semibold hover:underline block mx-auto pt-2 cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Vikram Seth"
                      className={`w-full min-h-[48px] px-3.5 py-2.5 rounded-xl border text-sm font-medium ${
                        errors.name ? 'border-red-400 bg-red-50/30' : 'border-slate-300 bg-white'
                      }`}
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +91 98109 90774"
                        className={`w-full min-h-[48px] px-3.5 py-2.5 rounded-xl border text-sm font-medium ${
                          errors.phone ? 'border-red-400 bg-red-50/30' : 'border-slate-300 bg-white'
                        }`}
                      />
                      {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. name@example.com"
                        className={`w-full min-h-[48px] px-3.5 py-2.5 rounded-xl border text-sm font-medium ${
                          errors.email ? 'border-red-400 bg-red-50/30' : 'border-slate-300 bg-white'
                        }`}
                      />
                      {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      Subject
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full min-h-[48px] px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm font-medium cursor-pointer"
                    >
                      <option value="Consignment Inquiry">General Freight / Consignment Inquiry</option>
                      <option value="Student Express Move">Student Express Relocation</option>
                      <option value="Special Zone Service">Special Zone Route (Leh / Port Blair)</option>
                      <option value="Corporate Line-haul">Corporate B2B Line-haul Contract</option>
                      <option value="Billing and Status">Billing / Status Question</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      Message / Shipment Details *
                    </label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please mention origin city, destination, cargo type, approximate weight, and any specific timing requests..."
                      className={`w-full p-3.5 rounded-xl border text-sm font-medium ${
                        errors.message ? 'border-red-400 bg-red-50/30' : 'border-slate-300 bg-white'
                      }`}
                    />
                    {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full min-h-[48px] px-6 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Inquiry to Dispatch</span>
                    </button>
                  </div>

                  <p className="text-xs text-slate-500 text-center pt-1">
                    We respond during standard hours: Mon–Sat 10:00 AM – 8:00 PM IST.
                  </p>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
