import React from 'react';
import { RoutePath, ServiceId } from '../types';
import { SERVICES_LIST } from '../config/siteData';
import { BrandVisual } from '../components/common/BrandVisual';
import { 
  ArrowRight, 
  CheckCircle2, 
  Home, 
  Building, 
  Tag, 
  HelpCircle, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  AlertCircle 
} from 'lucide-react';

interface ServiceDetailPageProps {
  serviceSlug: string;
  onNavigate: (path: RoutePath) => void;
  onSelectQuoteService: (serviceId: ServiceId) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  serviceSlug,
  onNavigate,
  onSelectQuoteService
}) => {
  const service = SERVICES_LIST.find((s) => s.slug === serviceSlug) || SERVICES_LIST[0];

  const handleQuoteClick = () => {
    onSelectQuoteService(service.id);
    onNavigate('/get-a-quote');
  };

  // Dedicated Student Express layout matching Screen 02 from Mobile Reference
  if (service.id === 'student-express') {
    return (
      <div className="bg-white min-h-screen py-8 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          {/* Breadcrumb matching Screen 02: Services / Student Express */}
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-6">
            <button onClick={() => onNavigate('/services')} className="hover:text-blue-600 cursor-pointer">
              Services
            </button>
            <span className="text-slate-400">/</span>
            <span className="text-blue-600 font-semibold">Student Express</span>
          </nav>

          {/* Headline matching Screen 02 */}
          <div className="mb-6">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Big moves.{' '}
              <span className="text-blue-600 block sm:inline">Student-friendly.</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 mt-3 leading-relaxed max-w-xl">
              From textbooks to personal belongings, we make student moves simple, safe and stress-free.
            </p>
          </div>

          {/* Student Visual Box matching Reference Photo */}
          <div className="h-64 sm:h-80 rounded-3xl overflow-hidden shadow-sm border border-slate-200 mb-8">
            <BrandVisual type="student" />
          </div>

          {/* 3 Key Feature Cards matching Screen 02 */}
          <div className="space-y-4 mb-8">
            
            {/* Card 1: Home to hostel */}
            <div className="flex items-start gap-4 p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-blue-200 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                <Home className="w-6 h-6 stroke-[1.8]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Home to hostel
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5 leading-relaxed">
                  Ship your belongings from home to your university or hostel. Doorstep collection with campus gate coordination.
                </p>
              </div>
            </div>

            {/* Card 2: Hostel to home */}
            <div className="flex items-start gap-4 p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-blue-200 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                <Building className="w-6 h-6 stroke-[1.8]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Hostel to home
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5 leading-relaxed">
                  Heading back? We'll get your belongings home safely before your semester break ends, with weather-protected packing.
                </p>
              </div>
            </div>

            {/* Card 3: Request student pricing */}
            <div className="flex items-start gap-4 p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-blue-200 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                <Tag className="w-6 h-6 stroke-[1.8]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Request student pricing
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5 leading-relaxed">
                  Special rates for students on books, luggage, and instruments. Share your details to get started with no hidden fees.
                </p>
              </div>
            </div>

          </div>

          {/* Primary Action Button matching Screen 02 */}
          <div className="mb-14">
            <button
              onClick={handleQuoteClick}
              className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-base rounded-2xl shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Get a student quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Practical Guidelines & FAQ for Students */}
          <div className="border-t border-slate-200 pt-10 space-y-8">
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                Items typically carried in Student Express
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                {service.cargoExamples.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl text-xs text-amber-900 leading-relaxed flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Student Concession Note:</strong> {service.availabilityNotice}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-4">
                Student Relocation FAQs
              </h2>
              <div className="space-y-3">
                {service.faqs.map((f, i) => (
                  <div key={i} className="p-4 rounded-xl border border-slate-200 bg-white">
                    <h3 className="font-bold text-sm text-slate-900 mb-1">{f.question}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{f.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }

  // Standard Service Detail Layout for Road, Air, and Ocean Freight
  return (
    <div className="bg-white min-h-screen py-8 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-6">
          <button onClick={() => onNavigate('/services')} className="hover:text-blue-600 cursor-pointer">
            Services
          </button>
          <span className="text-slate-400">/</span>
          <span className="text-blue-600 font-semibold">{service.name}</span>
        </nav>

        {/* Headline */}
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-widest block mb-2">
            Logistics Solutions
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
            {service.name}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mt-2 font-medium">
            {service.tagline}
          </p>
        </div>

        {/* Visual Banner */}
        <div className="h-64 sm:h-80 rounded-3xl overflow-hidden shadow-sm border border-slate-200 mb-10">
          <BrandVisual
            type={
              service.id === 'road-freight'
                ? 'road'
                : service.id === 'air-freight'
                ? 'air'
                : 'ocean'
            }
          />
        </div>

        {/* Overview & Action */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          <div className="lg:col-span-8 space-y-6">
            <h2 className="text-xl font-bold text-slate-900">
              Service Capabilities & Reach
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {service.longDescription}
            </p>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-600">
              <strong className="text-slate-900 block mb-1">Route & Availability Condition:</strong>
              {service.availabilityNotice}
            </div>

            {/* Who It Helps */}
            <div className="pt-2">
              <h3 className="text-base font-bold text-slate-900 mb-3">
                Who this service helps
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm">
                {service.idealFor.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-3 bg-white rounded-xl border border-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky Action Card */}
          <div className="lg:col-span-4">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-5 sticky top-28">
              <h3 className="text-base font-bold text-slate-900">
                Book or Enquire
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Receive route evaluation, freight space allocation, and honest rates directly from our dispatch desk.
              </p>

              <button
                onClick={handleQuoteClick}
                className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Request {service.name} Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-2 border-t border-slate-200 space-y-2 text-[11px] text-slate-500">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  <span>Doorstep pickup & cargo inspection</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-600" />
                  <span>Scheduled checkpoint status logs</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Step Process */}
        <div className="mb-16 border-t border-slate-200 pt-10">
          <h2 className="text-xl font-bold text-slate-900 mb-6">
            Standard Movement Workflow
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {service.processSteps.map((step, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <span className="font-mono text-xs font-bold text-blue-600 uppercase block mb-1">
                  Stage 0{idx + 1}
                </span>
                <h3 className="text-sm font-bold text-slate-900 mb-1">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Relevant FAQs */}
        <div className="border-t border-slate-200 pt-10">
          <h2 className="text-xl font-bold text-slate-900 mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {service.faqs.map((faq, idx) => (
              <div key={idx} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50">
                <h3 className="font-bold text-sm text-slate-900 mb-1.5">
                  {faq.question}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
