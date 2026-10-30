import React from 'react';
import { RoutePath } from '../types';
import { COMPANY_INFO } from '../config/siteData';
import { BrandVisual } from '../components/common/BrandVisual';
import { 
  Building2,
  Clock, 
  ArrowRight, 
  Target, 
  Eye, 
  Phone,
  Compass
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (path: RoutePath) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white min-h-screen py-10 sm:py-16">
      <div className="max-w-[1040px] mx-auto px-5 sm:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <button onClick={() => onNavigate('/')} className="hover:text-blue-600 cursor-pointer">
            Home
          </button>
          <span>/</span>
          <span className="text-slate-900 font-semibold">About Jahan Express</span>
        </nav>

        {/* Hero Section */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-widest block mb-2">
            Established 2017 · 30+ Years Logistics Roots
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
            Reliable logistics, built on personal accountability.
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
            Connecting industrial hubs with northern commercial corridors, Himalayan valleys, and island gateways through disciplined door-to-door freight management.
          </p>
        </div>

        {/* Editorial Photo Frame (Warehouse Operations) */}
        <div className="mb-14 rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm h-[280px] sm:h-[400px]">
          <BrandVisual type="warehouse" priority={true} />
        </div>

        {/* Key Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">
              Leadership
            </span>
            <h3 className="text-lg font-bold text-slate-900">
              {COMPANY_INFO.proprietor}
            </h3>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Proprietor actively guiding daily operations with personal industry freight experience since 1995.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">
              Established
            </span>
            <h3 className="text-lg font-bold text-slate-900">
              Year {COMPANY_INFO.establishedYear}
            </h3>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Founded as Jahan Express Solution to provide dependable, transparent door-to-door cargo services.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">
              Operational Hub
            </span>
            <h3 className="text-lg font-bold text-slate-900">
              Maya Puri, New Delhi
            </h3>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Central dispatch depot situated in Phase-II Industrial Area with direct highway line-haul access.
            </p>
          </div>
        </div>

        {/* Company Narrative */}
        <div className="max-w-none mb-14 space-y-5 text-slate-700 leading-relaxed text-sm sm:text-base">
          <h2 className="text-2xl font-bold text-slate-900">
            Our Foundation & Industry Roots
          </h2>
          <p>
            Jahan Express (operating legally as <em>Jahan Express Solution</em>) was founded in 2017 under the direct proprietorship of <strong>Mr. Virender Kumar</strong>. Mr. Kumar began his career in the Indian logistics and cargo sector in 1995, building a comprehensive understanding of freight forwarding, road fleet management, and inter-state regulatory requirements over three decades.
          </p>
          <p>
            While many logistics platforms operate as hands-off digital aggregators, Jahan Express maintains a specialized operational footprint centered around our Maya Puri Phase-II dispatch depot in New Delhi. We focus on high-reliability domestic line-hauls across North India—connecting Delhi NCR, Punjab, Haryana, Himachal Pradesh, Jammu & Kashmir, Uttarakhand, and Rajasthan—as well as specialized routes to high-altitude zones in Leh & Ladakh and coastal island cargo to Port Blair.
          </p>
          <p>
            In addition to commercial freight, our signature <strong>Student Express</strong> division was created to relieve students and parents from the anxiety of moving between home and campus hostels, providing affordable, weather-protected handling for books, luggage, and personal room belongings.
          </p>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          <div className="p-8 rounded-2xl bg-[#EEF5FF] border border-blue-100">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-4">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Our Mission</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {COMPANY_INFO.mission} Every consignment is handled with personal custody: appropriate packaging, honest pricing, and milestone tracking.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-slate-900 text-white border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-slate-800 text-blue-400 flex items-center justify-center mb-4">
              <Eye className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Our Vision</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {COMPANY_INFO.vision} To bridge the gap between commercial hubs and remote Himalayan towns with dependable multimodal freight options.
            </p>
          </div>
        </div>

        {/* Company Information Box (Customer-approved clean address line) */}
        <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-6 sm:p-8 mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
            <Compass className="w-4 h-4 text-blue-600" />
            <span>Company information</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="space-y-4">
              <div>
                <span className="font-semibold text-slate-900 block text-xs uppercase tracking-wide mb-0.5">
                  Operational Dispatch Depot
                </span>
                <span className="text-slate-600">
                  {COMPANY_INFO.workAddress.line1}, {COMPANY_INFO.workAddress.city} – {COMPANY_INFO.workAddress.pincode}
                </span>
              </div>
              <div>
                <span className="font-semibold text-slate-900 block text-xs uppercase tracking-wide mb-0.5">
                  Registered Address
                </span>
                <span className="text-slate-600">
                  {COMPANY_INFO.registeredAddress.line1}, {COMPANY_INFO.registeredAddress.city} – {COMPANY_INFO.registeredAddress.pincode}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <span className="font-semibold text-slate-900 block text-xs uppercase tracking-wide mb-0.5">
                  Call our team
                </span>
                <span className="text-slate-600 block">{COMPANY_INFO.operatingHours}</span>
                <a
                  href={COMPANY_INFO.primaryPhoneTel}
                  className="inline-flex items-center gap-1.5 text-blue-600 font-semibold mt-1 hover:underline"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{COMPANY_INFO.primaryPhoneFormatted}</span>
                </a>
              </div>
              <div>
                <span className="font-semibold text-slate-900 block text-xs uppercase tracking-wide mb-0.5">
                  Enterprise Registration
                </span>
                <span className="text-slate-600 font-mono text-xs">{COMPANY_INFO.udyamRegistration}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Banner */}
        <div className="p-8 rounded-2xl bg-blue-600 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-white">Have a logistics requirement?</h3>
            <p className="text-sm text-blue-100 mt-1">
              Our dispatch team in Maya Puri is ready to assist with custom quotes and scheduled collections.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('/get-a-quote')}
              className="px-6 min-h-[48px] bg-white text-blue-600 hover:bg-slate-50 font-bold text-sm rounded-xl transition-colors whitespace-nowrap cursor-pointer inline-flex items-center justify-center"
            >
              Request Quote →
            </button>
            <button
              onClick={() => onNavigate('/contact')}
              className="px-5 min-h-[48px] bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm rounded-xl transition-colors whitespace-nowrap cursor-pointer inline-flex items-center justify-center"
            >
              Contact Team
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
