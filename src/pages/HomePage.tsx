import React, { useState } from 'react';
import { RoutePath, ServiceId } from '../types';
import { COMPANY_INFO, SERVICES_LIST, GENERAL_FAQS } from '../config/siteData';
import { TrackingWidget } from '../components/common/TrackingWidget';
import { BrandVisual } from '../components/common/BrandVisual';
import { HeroLogisticsAnimation } from '../components/common/HeroLogisticsAnimation';
import { HowItWorksProcess } from '../components/common/HowItWorksProcess';
import { 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  Plus, 
  Minus,
  Compass,
  Calendar,
  Award
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (path: RoutePath) => void;
  onTrackSubmit: (trackingNumber: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onTrackSubmit }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <div className="bg-white">
      {/* 1. HERO SECTION & INTEGRATED TRACKING CARD (Unified Pale-Blue Surface) */}
      <section className="bg-gradient-to-b from-[#EBF3FD] via-[#F6FAFE] to-white pt-8 pb-12 sm:pt-12 sm:pb-16 lg:pt-14 lg:pb-18 border-b border-slate-100/80">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
          
          {/* Two-Column Grid: Left Copy & Actions, Right Animated Logistics Scene */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* Left Column (Copy & Actions) */}
            <div className="flex flex-col items-start">
              {/* Small understated label in calm light blue badge */}
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase mb-3 sm:mb-4 px-3 py-1 rounded-full bg-[#E8F0FE] border border-[#D2E3FC]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1A73E8]"></span>
                <span className="text-[#1967D2] font-bold">LOGISTICS, SIMPLIFIED</span>
              </div>

              {/* Headline: fluid 52–68px on desktop, tight but readable, two deliberate lines */}
              <h1 className="text-4xl sm:text-5xl lg:text-[54px] xl:text-[62px] font-bold tracking-tight leading-[1.08] mb-4 sm:mb-5">
                <span className="text-[#0F172A] block">Big moves.</span>
                <span className="text-[#1A73E8] block mt-0.5">Made simple.</span>
              </h1>

              {/* Supporting copy: ~18px, max-width 440px, comfortable line-height */}
              <p className="text-[17px] sm:text-[18px] text-slate-600 leading-relaxed mb-6 sm:mb-7 max-w-[440px]">
                Road, air and ocean freight for businesses, families and students—with personal support at every step.
              </p>

              {/* Actions: Primary "Get a quote", Secondary "Explore services", both 48-52px height */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => onNavigate('/get-a-quote')}
                  className="inline-flex items-center justify-center gap-2 px-6 min-h-[50px] bg-[#1A73E8] hover:bg-[#1557B0] active:bg-[#174EA6] text-white font-semibold text-base rounded-xl shadow-xs transition-colors whitespace-nowrap cursor-pointer"
                >
                  <span>Get a quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('/services')}
                  className="inline-flex items-center justify-center gap-2 px-5 min-h-[50px] bg-white hover:bg-slate-50 text-slate-700 font-semibold text-base rounded-xl border border-slate-300 shadow-2xs transition-colors whitespace-nowrap cursor-pointer"
                >
                  <span>Explore services</span>
                </button>
              </div>

              {/* Company Facts: Below actions, small and understated */}
              <div className="flex flex-wrap items-center gap-y-2 gap-x-4 sm:gap-x-5 text-xs text-slate-500 mt-6 sm:mt-8 pt-5 border-t border-slate-200/90 w-full max-w-[440px]">
                <div className="flex items-center gap-1.5 font-medium text-slate-600">
                  <Calendar className="w-3.5 h-3.5 text-[#1A73E8] shrink-0" />
                  <span>Established in 2017</span>
                </div>
                <span className="text-slate-300 hidden sm:inline">|</span>
                <div className="flex items-center gap-1.5 font-medium text-slate-600">
                  <Award className="w-3.5 h-3.5 text-[#1A73E8] shrink-0" />
                  <span>Industry experience since 1995</span>
                </div>
              </div>
            </div>

            {/* Right Column (Looping Animated Logistics Scene) */}
            <div className="w-full">
              <HeroLogisticsAnimation />
            </div>

          </div>

          {/* Integrated Tracking Card at Lower Edge of Hero Surface */}
          <div className="mt-8 sm:mt-12 lg:mt-14">
            <TrackingWidget
              variant="embedded"
              onTrackSubmit={onTrackSubmit}
              onNavigate={onNavigate}
            />
          </div>

        </div>
      </section>

      {/* 3. FOUR SERVICE CARDS ("One partner. Every way to move.") */}
      <section className="py-14 sm:py-20 bg-slate-50/70 border-t border-b border-slate-200/70">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#1A73E8] uppercase tracking-wider mb-2">
                <span>Our Services</span>
                <span className="w-8 h-[2px] bg-[#1A73E8]"></span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                One partner. Every way to move.
              </h2>
              <p className="text-base text-slate-600 mt-2 max-w-2xl">
                Reliable logistics solutions across India and beyond.
              </p>
            </div>

            <button
              onClick={() => onNavigate('/services')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#1A73E8] hover:text-[#1557B0] whitespace-nowrap cursor-pointer self-start md:self-end"
            >
              <span>View all services</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 4 Service Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICES_LIST.map((service) => {
              const visualType: 'road' | 'air' | 'ocean' | 'student' =
                service.id === 'road-freight'
                  ? 'road'
                  : service.id === 'air-freight'
                  ? 'air'
                  : service.id === 'ocean-freight'
                  ? 'ocean'
                  : 'student';

              return (
                <div
                  key={service.id}
                  onClick={() => onNavigate(`/services/${service.slug}` as RoutePath)}
                  className="group bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col cursor-pointer"
                >
                  {/* Photo Container */}
                  <div className="h-44 sm:h-48 overflow-hidden relative bg-slate-100">
                    <BrandVisual type={visualType} />
                  </div>

                  {/* Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-1.5">
                        {service.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                        {service.shortDescription}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-semibold text-blue-600 group-hover:underline">
                        Explore service
                      </span>
                      <div className="w-8 h-8 rounded-full bg-blue-50 group-hover:bg-blue-600 text-blue-600 group-hover:text-white flex items-center justify-center transition-colors">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. COVERAGE HIGHLIGHT ("North India network.") */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
          <div className="bg-[#EEF5FF] rounded-3xl p-6 sm:p-10 border border-blue-100">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Headline (Span 4) */}
              <div className="lg:col-span-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">
                  <span>Our Coverage</span>
                  <span className="w-8 h-[2px] bg-blue-600"></span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-tight">
                  North India network.
                </h2>
                <p className="text-sm sm:text-base text-slate-600 mt-2.5 leading-relaxed">
                  From the mountains to the islands, we keep India moving.
                </p>

                <div className="mt-5 space-y-2 text-xs sm:text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Delhi NCR industrial hubs & line-hauls</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Himalayan high-altitude routes to Leh Ladakh</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Island sea and air connections for Port Blair</span>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    onClick={() => onNavigate('/coverage')}
                    className="inline-flex items-center gap-2 px-5 min-h-[44px] bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition-colors cursor-pointer"
                  >
                    <span>View coverage map</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Right Cards (Span 8) */}
              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                {/* Leh & Ladakh */}
                <div
                  onClick={() => onNavigate('/coverage')}
                  className="group relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-md transition-all cursor-pointer bg-white"
                >
                  <div className="h-36 sm:h-40 overflow-hidden">
                    <BrandVisual type="ladakh" />
                  </div>
                  <div className="p-3.5 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600">
                        Leh & Ladakh
                      </h4>
                      <span className="text-[11px] text-slate-500">Mountain corridor</span>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-slate-100 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-colors">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                {/* North India Network */}
                <div
                  onClick={() => onNavigate('/coverage')}
                  className="group relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-md transition-all cursor-pointer bg-white"
                >
                  <div className="h-36 sm:h-40 overflow-hidden">
                    <BrandVisual type="north-india" />
                  </div>
                  <div className="p-3.5 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600">
                        North India network
                      </h4>
                      <span className="text-[11px] text-slate-500">Express highway routes</span>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-slate-100 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-colors">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                {/* Port Blair */}
                <div
                  onClick={() => onNavigate('/coverage')}
                  className="group relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-md transition-all cursor-pointer bg-white"
                >
                  <div className="h-36 sm:h-40 overflow-hidden">
                    <BrandVisual type="port-blair" />
                  </div>
                  <div className="p-3.5 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600">
                        Port Blair
                      </h4>
                      <span className="text-[11px] text-slate-500">Island maritime gateway</span>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-slate-100 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-colors">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS (Interactive 4-Step Process with Circular Photographs) */}
      <HowItWorksProcess onNavigate={onNavigate} />

      {/* 6. ABOUT TEASER & COMPANY INFORMATION */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-widest block">
                Logistics Roots
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-tight">
                Deep industry roots. Personal customer accountability.
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Jahan Express Solution was established in 2017 under the leadership of proprietor <strong>Mr. Virender Kumar</strong>, who brings over three decades of freight and logistics experience dating back to 1995.
              </p>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Rather than navigating automated voice trees, our customers connect directly with operational desks at our Maya Puri Industrial Area hub in New Delhi for transparent updates and support.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <h4 className="text-sm font-bold text-slate-900 mb-1">
                    Hands-On Experience
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Logistics operations in North India and international corridors since 1995.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <h4 className="text-sm font-bold text-slate-900 mb-1">
                    Specialized Difficult Terrains
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Proven expertise handling mountain routes to Leh Ladakh and island ocean transit.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('/about')}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
                >
                  <span>Learn more about our story</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Side: Clean Company Information Card */}
            <div className="lg:col-span-5 bg-slate-900 text-white rounded-3xl p-7 shadow-sm border border-slate-800">
              <h3 className="text-base font-bold mb-5 text-white flex items-center gap-2">
                <Compass className="w-5 h-5 text-blue-400" />
                <span>Company information</span>
              </h3>

              <div className="space-y-4 text-xs">
                <div className="pb-3 border-b border-slate-800">
                  <span className="text-slate-400 block text-[11px] uppercase tracking-wider mb-0.5">Trade Name</span>
                  <span className="text-sm font-semibold text-white">{COMPANY_INFO.name}</span>
                </div>

                <div className="pb-3 border-b border-slate-800">
                  <span className="text-slate-400 block text-[11px] uppercase tracking-wider mb-0.5">Proprietor</span>
                  <span className="text-sm font-semibold text-white">{COMPANY_INFO.proprietor}</span>
                </div>

                <div className="pb-3 border-b border-slate-800">
                  <span className="text-slate-400 block text-[11px] uppercase tracking-wider mb-0.5">Established & Roots</span>
                  <span className="text-slate-200">
                    Est. {COMPANY_INFO.establishedYear} · Logistics background since {COMPANY_INFO.industryExperienceSince}
                  </span>
                </div>

                <div className="pb-3 border-b border-slate-800">
                  <span className="text-slate-400 block text-[11px] uppercase tracking-wider mb-0.5">Operational Dispatch Depot</span>
                  <span className="text-slate-200">
                    {COMPANY_INFO.workAddress.line1}, {COMPANY_INFO.workAddress.city} – {COMPANY_INFO.workAddress.pincode}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[11px] uppercase tracking-wider mb-0.5">Call our team</span>
                  <span className="text-slate-200 block">{COMPANY_INFO.operatingHours}</span>
                  <a
                    href={COMPANY_INFO.primaryPhoneTel}
                    className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-semibold mt-1"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{COMPANY_INFO.primaryPhoneFormatted}</span>
                  </a>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-800">
                <button
                  onClick={() => onNavigate('/contact')}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-xs rounded-xl transition-colors text-center cursor-pointer"
                >
                  Contact Maya Puri Dispatch Desk
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. FREQUENTLY ASKED QUESTIONS */}
      <section className="py-14 sm:py-20 bg-slate-50/70 border-t border-slate-200/70">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          
          <div className="text-center mb-10">
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-widest block mb-2">
              Help & Clarity
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Frequently asked questions.
            </h2>
            <p className="text-sm text-slate-600 mt-1.5">
              Clear answers regarding bookings, quotes, tracking and student shipping.
            </p>
          </div>

          <div className="space-y-3">
            {GENERAL_FAQS.slice(0, 6).map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/70 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm sm:text-base font-semibold text-slate-900">
                      {faq.question}
                    </span>
                    <span className="shrink-0 text-slate-400">
                      {isOpen ? <Minus className="w-4 h-4 text-blue-600" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => onNavigate('/faq')}
              className="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 cursor-pointer inline-flex items-center gap-1.5"
            >
              <span>Browse all questions in our FAQ knowledge base</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

      {/* 8. BOTTOM CALL TO ACTION BANNER */}
      <section className="py-14 sm:py-16 bg-blue-600 text-white">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-3">
            Ready to move your shipment?
          </h2>
          <p className="text-sm sm:text-base text-blue-100 max-w-xl mx-auto mb-7">
            Tell us what you need to move. Get clear route assessments, honest pricing and reliable door-to-door handling.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              onClick={() => onNavigate('/get-a-quote')}
              className="px-6 min-h-[48px] inline-flex items-center justify-center bg-white text-blue-600 hover:bg-slate-50 font-bold text-sm rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Get a customized quote →
            </button>
            <a
              href={COMPANY_INFO.primaryPhoneTel}
              className="px-6 min-h-[48px] inline-flex items-center justify-center bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm rounded-xl border border-blue-500 transition-colors gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Call {COMPANY_INFO.primaryPhoneFormatted}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
