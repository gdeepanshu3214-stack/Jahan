import React, { useState, useEffect } from 'react';
import { RoutePath, ServiceId, QuoteFormData, QuoteStep } from '../types';
import { COMPANY_INFO, SERVICES_LIST } from '../config/siteData';
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Lock, 
  Headphones, 
  AlertCircle, 
  Calendar, 
  Package, 
  Copy, 
  Mail, 
  Check, 
  HelpCircle,
  Truck,
  Plane,
  Anchor,
  GraduationCap
} from 'lucide-react';

interface QuotePageProps {
  initialService?: ServiceId | '';
  onNavigate: (path: RoutePath) => void;
}

export const QuotePage: React.FC<QuotePageProps> = ({ initialService = '', onNavigate }) => {
  const [currentStep, setCurrentStep] = useState<QuoteStep>(1);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  // Form State
  const [formData, setFormData] = useState<QuoteFormData>({
    service: initialService,
    shipmentType: 'domestic',
    originCountry: 'India',
    originCity: '',
    originPincode: '',
    destCountry: 'India',
    destCity: '',
    destPincode: '',
    packageCount: 1,
    totalWeightKg: 15,
    lengthCm: undefined,
    widthCm: undefined,
    heightCm: undefined,
    pickupDate: '',
    cargoDescription: '',
    studentMovementType: initialService === 'student-express' ? 'home-to-hostel' : 'none',
    fullName: '',
    phone: '',
    email: '',
    businessName: '',
    notes: ''
  });

  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({
        ...prev,
        service: initialService,
        studentMovementType: initialService === 'student-express' ? 'home-to-hostel' : prev.studentMovementType
      }));
    }
  }, [initialService]);

  // Field validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep1 = (): boolean => {
    const errs: Record<string, string> = {};

    if (!formData.service) {
      errs.service = 'Please choose a logistics service';
    }

    // Origin validation
    if (formData.shipmentType === 'domestic') {
      if (!formData.originPincode || !/^\d{6}$/.test(formData.originPincode.trim())) {
        errs.originPincode = 'Enter a valid 6-digit Indian PIN code';
      }
      if (!formData.destPincode || !/^\d{6}$/.test(formData.destPincode.trim())) {
        errs.destPincode = 'Enter a valid 6-digit Indian PIN code';
      }
    } else {
      if (!formData.originCity.trim()) errs.originCity = 'Origin city required';
      if (!formData.destCountry.trim()) errs.destCountry = 'Destination country required';
    }

    if (formData.packageCount < 1) {
      errs.packageCount = 'Minimum 1 package required';
    }

    if (formData.totalWeightKg <= 0) {
      errs.totalWeightKg = 'Please enter valid total weight in kg';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = (): boolean => {
    const errs: Record<string, string> = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      errs.fullName = 'Please enter your full name';
    }

    // Indian phone or standard mobile
    const phoneClean = formData.phone.replace(/[\s\-\+]/g, '');
    if (!phoneClean || phoneClean.length < 10) {
      errs.phone = 'Please provide a valid 10-digit mobile number';
    }

    // Email
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (validateStep1()) {
        setCurrentStep(2);
        window.scrollTo({ top: 120, behavior: 'smooth' });
      }
    } else if (currentStep === 2) {
      if (validateStep2()) {
        setCurrentStep(3);
        window.scrollTo({ top: 120, behavior: 'smooth' });
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as QuoteStep);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const quoteSummaryText = `
JAHAN EXPRESS — QUOTE ENQUIRY SUMMARY
----------------------------------------
Service: ${formData.service ? SERVICES_LIST.find((s) => s.id === formData.service)?.name : 'Not selected'}
Type: ${formData.shipmentType.toUpperCase()}
${formData.studentMovementType && formData.studentMovementType !== 'none' ? `Student Direction: ${formData.studentMovementType}\n` : ''}
Origin PIN / City: ${formData.originPincode || formData.originCity || 'N/A'} (${formData.originCountry})
Destination PIN / City: ${formData.destPincode || formData.destCity || 'N/A'} (${formData.destCountry})
Packages: ${formData.packageCount}
Total Weight: ${formData.totalWeightKg} kg
Dimensions: ${formData.lengthCm && formData.widthCm && formData.heightCm ? `${formData.lengthCm}x${formData.widthCm}x${formData.heightCm} cm` : 'Not provided'}
Preferred Date: ${formData.pickupDate || 'Flexible'}
Cargo Description: ${formData.cargoDescription || 'General boxed freight'}

CONTACT DETAILS
----------------------------------------
Name: ${formData.fullName}
Phone: ${formData.phone}
Email: ${formData.email}
Company / Inst: ${formData.businessName || 'Individual'}
Special Notes: ${formData.notes || 'None'}
`.trim();

  const handleCopySummary = () => {
    navigator.clipboard.writeText(quoteSummaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-slate-50/60 min-h-screen py-10 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* Top Header matching reference Screen 03 */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Get a quote
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mt-1">
            Tell us what you need to move.
          </p>
        </div>

        {/* 3-Step Stepper Progress Bar */}
        <div className="mb-8 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between relative max-w-md mx-auto">
            
            {/* Connecting Line */}
            <div className="absolute top-4 left-6 right-6 h-[2px] bg-slate-200 -z-0">
              <div
                className="h-full bg-[#1A73E8] transition-all duration-300"
                style={{
                  width: currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%'
                }}
              />
            </div>

            {/* Step 1 */}
            <div className="flex flex-col items-center relative z-10">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  currentStep >= 1
                    ? 'bg-[#1A73E8] text-white'
                    : 'bg-slate-100 text-slate-500 border border-slate-300'
                }`}
              >
                1
              </div>
              <span className={`text-xs mt-1.5 font-medium ${currentStep === 1 ? 'text-[#1A73E8] font-bold' : 'text-slate-600'}`}>
                Shipment
              </span>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center relative z-10">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  currentStep >= 2
                    ? 'bg-[#1A73E8] text-white'
                    : 'bg-white text-slate-500 border-2 border-slate-300'
                }`}
              >
                2
              </div>
              <span className={`text-xs mt-1.5 font-medium ${currentStep === 2 ? 'text-[#1A73E8] font-bold' : 'text-slate-600'}`}>
                Contact
              </span>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center relative z-10">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  currentStep === 3
                    ? 'bg-[#1A73E8] text-white'
                    : 'bg-white text-slate-500 border-2 border-slate-300'
                }`}
              >
                3
              </div>
              <span className={`text-xs mt-1.5 font-medium ${currentStep === 3 ? 'text-[#1A73E8] font-bold' : 'text-slate-600'}`}>
                Review
              </span>
            </div>

          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
          
          {submitted ? (
            /* Submission Confirmation Card */
            <div className="py-6 text-center space-y-6">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              
              <div>
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full uppercase tracking-wider">
                  Demo Request — Not Sent to Server
                </span>
                <h2 className="text-2xl font-bold text-slate-900 mt-3">
                  Consignment Enquiry Formatted
                </h2>
                <p className="text-sm text-slate-600 max-w-md mx-auto mt-2 leading-relaxed">
                  In this live demo build, no backend email server is connected. Your enquiry is compiled below ready to send directly to the Maya Puri dispatch team.
                </p>
              </div>

              {/* Ready Summary Box */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-left font-mono text-xs text-slate-800 whitespace-pre-wrap max-h-60 overflow-y-auto">
                {quoteSummaryText}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied to Clipboard!' : 'Copy Summary to Clipboard'}</span>
                </button>

                <a
                  href={`mailto:${COMPANY_INFO.primaryEmail}?subject=Quote Request: ${formData.service || 'Freight'}&body=${encodeURIComponent(quoteSummaryText)}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email Directly to Dispatch ({COMPANY_INFO.primaryEmail})</span>
                </a>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-center gap-4 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setCurrentStep(1);
                  }}
                  className="text-blue-600 font-semibold hover:underline cursor-pointer"
                >
                  ← Submit Another Enquiry
                </button>
                <span className="text-slate-300">·</span>
                <button
                  type="button"
                  onClick={() => onNavigate('/')}
                  className="text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Return to Home
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={currentStep === 3 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>
              
              {/* STEP 1: SHIPMENT DETAILS */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  
                  {/* Service Selector */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                      Select Service *
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => {
                        const val = e.target.value as ServiceId;
                        setFormData({
                          ...formData,
                          service: val,
                          studentMovementType: val === 'student-express' ? 'home-to-hostel' : formData.studentMovementType
                        });
                        if (errors.service) setErrors({ ...errors, service: '' });
                      }}
                      className={`w-full min-h-[48px] p-3.5 rounded-xl border text-sm font-medium bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer ${
                        errors.service ? 'border-red-400 bg-red-50/30' : 'border-slate-300'
                      }`}
                    >
                      <option value="">-- Choose a service --</option>
                      {SERVICES_LIST.map((srv) => (
                        <option key={srv.id} value={srv.id}>
                          {srv.name} — {srv.tagline}
                        </option>
                      ))}
                    </select>
                    {errors.service && (
                      <p className="mt-1.5 text-xs text-red-600 font-medium flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.service}</span>
                      </p>
                    )}
                  </div>

                  {/* Student Express Special Selector if selected */}
                  {formData.service === 'student-express' && (
                    <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-2.5">
                      <span className="text-xs font-bold text-amber-900 block">
                        Student Relocation Direction:
                      </span>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, studentMovementType: 'home-to-hostel' })}
                          className={`p-2.5 rounded-lg border text-center font-medium cursor-pointer transition-colors ${
                            formData.studentMovementType === 'home-to-hostel'
                              ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                              : 'bg-white text-slate-700 border-amber-200 hover:bg-amber-100'
                          }`}
                        >
                          Home → Campus / Hostel
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, studentMovementType: 'hostel-to-home' })}
                          className={`p-2.5 rounded-lg border text-center font-medium cursor-pointer transition-colors ${
                            formData.studentMovementType === 'hostel-to-home'
                              ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                              : 'bg-white text-slate-700 border-amber-200 hover:bg-amber-100'
                          }`}
                        >
                          Campus / Hostel → Home
                        </button>
                      </div>
                      <p className="text-[11px] text-amber-800">
                        * Special student pricing applied upon valid campus ID verification.
                      </p>
                    </div>
                  )}

                  {/* Domestic vs International */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                      Movement Territory
                    </label>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, shipmentType: 'domestic' })}
                        className={`py-2.5 px-4 rounded-xl border text-center font-medium cursor-pointer transition-colors ${
                          formData.shipmentType === 'domestic'
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        Domestic (Across India)
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, shipmentType: 'international' })}
                        className={`py-2.5 px-4 rounded-xl border text-center font-medium cursor-pointer transition-colors ${
                          formData.shipmentType === 'international'
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        International Cargo
                      </button>
                    </div>
                  </div>

                  {/* Origin & Destination PINs (matching Reference 03) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        Pickup PIN code *
                      </label>
                      <input
                        type="text"
                        maxLength={6}
                        value={formData.originPincode}
                        onChange={(e) => setFormData({ ...formData, originPincode: e.target.value })}
                        placeholder="e.g. 560001 or 110064"
                        className={`w-full min-h-[48px] px-3.5 py-2.5 rounded-xl border text-sm font-medium ${
                          errors.originPincode ? 'border-red-400 bg-red-50/30' : 'border-slate-300 bg-slate-50/50'
                        }`}
                      />
                      {errors.originPincode && (
                        <p className="mt-1 text-xs text-red-600">{errors.originPincode}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        Delivery PIN code *
                      </label>
                      <input
                        type="text"
                        maxLength={6}
                        value={formData.destPincode}
                        onChange={(e) => setFormData({ ...formData, destPincode: e.target.value })}
                        placeholder="e.g. 110001 or 194101"
                        className={`w-full min-h-[48px] px-3.5 py-2.5 rounded-xl border text-sm font-medium ${
                          errors.destPincode ? 'border-red-400 bg-red-50/30' : 'border-slate-300 bg-slate-50/50'
                        }`}
                      />
                      {errors.destPincode && (
                        <p className="mt-1 text-xs text-red-600">{errors.destPincode}</p>
                      )}
                    </div>
                  </div>

                  {/* Weight & Package Count */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        Total weight (kg) *
                      </label>
                      <input
                        type="number"
                        min="1"
                        step="1"
                        value={formData.totalWeightKg || ''}
                        onChange={(e) => setFormData({ ...formData, totalWeightKg: Number(e.target.value) })}
                        placeholder="e.g. 20"
                        className={`w-full min-h-[48px] px-3.5 py-2.5 rounded-xl border text-sm font-medium ${
                          errors.totalWeightKg ? 'border-red-400 bg-red-50/30' : 'border-slate-300 bg-slate-50/50'
                        }`}
                      />
                      {errors.totalWeightKg && (
                        <p className="mt-1 text-xs text-red-600">{errors.totalWeightKg}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        Number of packages *
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={formData.packageCount || ''}
                        onChange={(e) => setFormData({ ...formData, packageCount: Number(e.target.value) })}
                        placeholder="e.g. 3"
                        className={`w-full min-h-[48px] px-3.5 py-2.5 rounded-xl border text-sm font-medium ${
                          errors.packageCount ? 'border-red-400 bg-red-50/30' : 'border-slate-300 bg-slate-50/50'
                        }`}
                      />
                      {errors.packageCount && (
                        <p className="mt-1 text-xs text-red-600">{errors.packageCount}</p>
                      )}
                    </div>
                  </div>

                  {/* Optional Dimensions & Preferred Date */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
                    <span className="text-xs font-semibold text-slate-700 block">
                      Optional Package Dimensions (cm)
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      <input
                        type="number"
                        placeholder="L (cm)"
                        value={formData.lengthCm || ''}
                        onChange={(e) => setFormData({ ...formData, lengthCm: Number(e.target.value) })}
                        className="p-2.5 rounded-lg border border-slate-300 bg-white text-xs"
                      />
                      <input
                        type="number"
                        placeholder="W (cm)"
                        value={formData.widthCm || ''}
                        onChange={(e) => setFormData({ ...formData, widthCm: Number(e.target.value) })}
                        className="p-2.5 rounded-lg border border-slate-300 bg-white text-xs"
                      />
                      <input
                        type="number"
                        placeholder="H (cm)"
                        value={formData.heightCm || ''}
                        onChange={(e) => setFormData({ ...formData, heightCm: Number(e.target.value) })}
                        className="p-2.5 rounded-lg border border-slate-300 bg-white text-xs"
                      />
                    </div>
                  </div>

                  {/* Preferred Pickup Date */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      Preferred Pickup Date (Optional)
                    </label>
                    <input
                      type="date"
                      value={formData.pickupDate}
                      onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
                      className="w-full p-3 rounded-xl border border-slate-300 bg-slate-50/50 text-sm font-medium"
                    />
                  </div>

                  {/* Brief Cargo Description */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      Brief Cargo / Items Description
                    </label>
                    <input
                      type="text"
                      value={formData.cargoDescription}
                      onChange={(e) => setFormData({ ...formData, cargoDescription: e.target.value })}
                      placeholder="e.g. 3 boxes of study books, 1 suitcase, 1 guitar in hardcase"
                      className="w-full p-3 rounded-xl border border-slate-300 bg-slate-50/50 text-sm font-medium"
                    />
                  </div>

                  {/* Continue Button */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleNext}
                      className="w-full py-3.5 px-6 bg-[#1A73E8] hover:bg-[#1557B0] active:bg-[#174EA6] text-white font-semibold text-base rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Continue</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500">
                    <Lock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Final pricing confirmed by our team. No hidden charges.</span>
                  </div>

                </div>
              )}

              {/* STEP 2: CONTACT DETAILS */}
              {currentStep === 2 && (
                <div className="space-y-5">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-base font-bold text-slate-900">
                      Contact Information
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      We require verified contact details to assess route feasibility and send your formal quote.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Rahul Sharma"
                      className={`w-full p-3 rounded-xl border text-sm font-medium ${
                        errors.fullName ? 'border-red-400 bg-red-50/30' : 'border-slate-300 bg-slate-50/50'
                      }`}
                    />
                    {errors.fullName && <p className="mt-1 text-xs text-red-600">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      Mobile Number (for pickup coordination) *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +91 98109 90774"
                      className={`w-full p-3 rounded-xl border text-sm font-medium ${
                        errors.phone ? 'border-red-400 bg-red-50/30' : 'border-slate-300 bg-slate-50/50'
                      }`}
                    />
                    {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. rahul@example.com"
                      className={`w-full p-3 rounded-xl border text-sm font-medium ${
                        errors.email ? 'border-red-400 bg-red-50/30' : 'border-slate-300 bg-slate-50/50'
                      }`}
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      Company / College Name (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      placeholder="e.g. Delhi University / Apex Logistics Pvt Ltd"
                      className="w-full p-3 rounded-xl border border-slate-300 bg-slate-50/50 text-sm font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      Special Handling or Access Instructions (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="e.g. Hostel gate security clearance needed, 2nd floor with elevator access..."
                      className="w-full p-3 rounded-xl border border-slate-300 bg-slate-50/50 text-sm font-medium"
                    />
                  </div>

                  {/* Actions */}
                  <div className="pt-3 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="py-3 px-5 border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-sm rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleNext}
                      className="flex-1 py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Review consignment details</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              )}

              {/* STEP 3: REVIEW DETAILS */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-base font-bold text-slate-900">
                      Review Your Consignment
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Please verify your shipment parameters before generating your quote enquiry.
                    </p>
                  </div>

                  {/* Summary Grid */}
                  <div className="bg-slate-50 rounded-xl p-5 border border-slate-200/80 space-y-4 text-xs">
                    
                    {/* Service */}
                    <div className="flex justify-between items-start pb-3 border-b border-slate-200/80">
                      <div>
                        <span className="text-[11px] font-semibold text-slate-500 uppercase">Selected Service</span>
                        <div className="text-sm font-bold text-slate-900 mt-0.5">
                          {SERVICES_LIST.find((s) => s.id === formData.service)?.name || 'Custom Logistics'}
                        </div>
                        {formData.studentMovementType && formData.studentMovementType !== 'none' && (
                          <div className="text-blue-600 font-medium text-[11px] mt-0.5">
                            Direction: {formData.studentMovementType === 'home-to-hostel' ? 'Home to Campus Hostel' : 'Campus Hostel to Home'}
                          </div>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="text-blue-600 hover:underline font-semibold cursor-pointer"
                      >
                        Edit
                      </button>
                    </div>

                    {/* Route & Packages */}
                    <div className="grid grid-cols-2 gap-4 pb-3 border-b border-slate-200/80">
                      <div>
                        <span className="text-[11px] font-semibold text-slate-500 uppercase">Route PINs</span>
                        <div className="font-mono text-slate-800 font-medium mt-0.5">
                          {formData.originPincode || 'Origin'} → {formData.destPincode || 'Destination'}
                        </div>
                      </div>
                      <div>
                        <span className="text-[11px] font-semibold text-slate-500 uppercase">Weight & Packages</span>
                        <div className="font-semibold text-slate-900 mt-0.5">
                          {formData.totalWeightKg} kg ({formData.packageCount} box{formData.packageCount > 1 ? 'es' : ''})
                        </div>
                      </div>
                    </div>

                    {/* Contact Person */}
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[11px] font-semibold text-slate-500 uppercase">Contact Recipient</span>
                        <div className="font-bold text-slate-900 mt-0.5">
                          {formData.fullName}
                        </div>
                        <div className="text-slate-600 font-mono text-[11px]">
                          {formData.phone} · {formData.email}
                        </div>
                        {formData.businessName && (
                          <div className="text-slate-500 text-[11px] mt-0.5">
                            Organization: {formData.businessName}
                          </div>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        className="text-blue-600 hover:underline font-semibold cursor-pointer"
                      >
                        Edit
                      </button>
                    </div>

                  </div>

                  {/* Submission note */}
                  <div className="p-3.5 bg-blue-50 border border-blue-100 rounded-xl text-xs text-blue-900 leading-relaxed">
                    <strong>Notice:</strong> Submitting this request creates an itemized enquiry summary. Our Maya Puri dispatch desk reviews current vehicle space, route terrain, and weight to confirm current pricing within business hours.
                  </div>

                  {/* Submit Actions */}
                  <div className="pt-2 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="py-3 px-5 border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-sm rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>

                    <button
                      type="submit"
                      className="flex-1 py-3.5 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                    >
                      <span>Submit Quote Request</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              )}

            </form>
          )}

        </div>

        {/* Bottom Help Card matching Reference Screen 03 */}
        <div className="mt-8 bg-white rounded-2xl border border-slate-200 p-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Need help?</h4>
              <p className="text-xs text-slate-500">
                Our team is here to assist you with the right service for your move.
              </p>
            </div>
          </div>

          <a
            href={COMPANY_INFO.primaryPhoneTel}
            className="flex-shrink-0 text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
          >
            Call {COMPANY_INFO.primaryPhoneFormatted} →
          </a>
        </div>

      </div>
    </div>
  );
};
