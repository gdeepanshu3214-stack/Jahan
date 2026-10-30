import React from 'react';
import { Logo } from './Logo';
import { RoutePath } from '../../types';
import { COMPANY_INFO, SERVICES_LIST } from '../../config/siteData';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: RoutePath) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (path: RoutePath) => {
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          
          {/* Group 1: Brand & Background (Span 4) */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <div className="bg-white rounded-xl p-3 inline-block mb-4 shadow-xs">
              <Logo size="md" showTagline={false} />
            </div>
            
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm mb-5">
              Jahan Express provides dependable road, air, and ocean freight logistics across North India and worldwide destinations.
            </p>

            <div className="text-sm text-slate-400 space-y-1">
              <p className="text-slate-200 font-medium">Proprietor: {COMPANY_INFO.proprietor}</p>
              <p>Established {COMPANY_INFO.establishedYear} · Logistics trade roots since {COMPANY_INFO.industryExperienceSince}</p>
            </div>
          </div>

          {/* Group 2: Services (Span 3) */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Services
            </h3>
            <ul className="space-y-3 text-sm">
              {SERVICES_LIST.map((srv) => (
                <li key={srv.id}>
                  <button
                    onClick={() => handleNav(`/services/${srv.slug}` as RoutePath)}
                    className="text-slate-400 hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {srv.name}
                  </button>
                </li>
              ))}
              <li className="pt-1">
                <button
                  onClick={() => handleNav('/services')}
                  className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
                >
                  All services overview →
                </button>
              </li>
            </ul>
          </div>

          {/* Group 3: Quick Links (Span 2) */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Quick links
            </h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <button
                  onClick={() => handleNav('/about')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  About us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/coverage')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Coverage network
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/track')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Track shipment
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/get-a-quote')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Get a quote
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/faq')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  FAQs
                </button>
              </li>
            </ul>
          </div>

          {/* Group 4: Direct Contact (Span 3) */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Contact & Depot
            </h3>
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <span>
                  {COMPANY_INFO.workAddress.line1}, {COMPANY_INFO.workAddress.city} – {COMPANY_INFO.workAddress.pincode}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <a
                  href={COMPANY_INFO.primaryPhoneTel}
                  className="text-slate-200 hover:text-blue-400 font-medium transition-colors"
                >
                  {COMPANY_INFO.primaryPhoneFormatted}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a
                  href={`mailto:${COMPANY_INFO.primaryEmail}`}
                  className="text-slate-200 hover:text-blue-400 transition-colors"
                >
                  {COMPANY_INFO.primaryEmail}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{COMPANY_INFO.operatingHours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimers and Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved.</p>

          <div className="flex items-center gap-6 text-sm">
            <button
              onClick={() => handleNav('/privacy')}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => handleNav('/terms')}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <button
              onClick={() => handleNav('/audit')}
              className="hover:text-slate-300 transition-colors cursor-pointer text-slate-600 hover:text-slate-400"
            >
              Internal Audit
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
