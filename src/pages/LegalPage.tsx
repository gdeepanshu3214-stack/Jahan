import React from 'react';
import { RoutePath } from '../types';
import { COMPANY_INFO } from '../config/siteData';
import { AlertCircle, ShieldAlert, FileText } from 'lucide-react';

interface LegalPageProps {
  type: 'privacy' | 'terms';
  onNavigate: (path: RoutePath) => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ type, onNavigate }) => {
  const isPrivacy = type === 'privacy';

  return (
    <div className="bg-white min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <button onClick={() => onNavigate('/')} className="hover:text-blue-600 cursor-pointer">
            Home
          </button>
          <span>/</span>
          <span className="text-slate-900 font-semibold">
            {isPrivacy ? 'Privacy Policy (Draft)' : 'Terms of Service (Draft)'}
          </span>
        </nav>

        {/* Notice of Draft Status */}
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs mb-8 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="block text-sm mb-0.5">Provisional Review Draft</strong>
            This document is an administrative review draft prepared for Jahan Express ({COMPANY_INFO.legalName}). It does not constitute binding legal policy until formally reviewed, customized, and executed by the company proprietor.
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-4">
          {isPrivacy ? 'Privacy Policy & Data Handling (Draft)' : 'Terms of Consignment & Service (Draft)'}
        </h1>
        <p className="text-xs text-slate-500 mb-8 font-mono">
          Last updated for administrative review: October 2026 · Proprietor: {COMPANY_INFO.proprietor}
        </p>

        <div className="prose prose-slate max-w-none text-slate-700 text-sm leading-relaxed space-y-6">
          {isPrivacy ? (
            <>
              <section>
                <h2 className="text-lg font-bold text-slate-900 mb-2">1. Scope and Information Collection</h2>
                <p>
                  Jahan Express collects information strictly required for consignment processing, regulatory compliance (such as GST E-Way Bill documentation and Airway Bill manifesting), and door-to-door delivery coordination. This includes shipper and recipient full names, delivery addresses, telephone numbers, and package descriptions.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-slate-900 mb-2">2. Use of Consignment Data</h2>
                <p>
                  Contact details are utilized exclusively to coordinate parcel pickup, checkpoint status updates, and delivery handover. We do not sell, rent, or trade customer contact details to third-party marketing services.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-slate-900 mb-2">3. Digital Tracking and Public Privacy</h2>
                <p>
                  Our public tracking console deliberately obscures full sender and recipient names (masking identifiers) to prevent unauthorized public disclosure while enabling shippers to verify transit milestones.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-slate-900 mb-2">4. Data Inquiries & Contact</h2>
                <p>
                  For inquiries regarding personal data submitted during quotation or shipment booking, contact our central depot at <a href={`mailto:${COMPANY_INFO.primaryEmail}`} className="text-blue-600 underline">{COMPANY_INFO.primaryEmail}</a>.
                </p>
              </section>
            </>
          ) : (
            <>
              <section>
                <h2 className="text-lg font-bold text-slate-900 mb-2">1. Booking and Route Feasibility</h2>
                <p>
                  All quotation estimates generated through this website represent indicative assessments. Formal booking confirmation is subject to vehicle line-haul capacity, cargo screening, route clearance, and physical inspection of parcel dimensions and actual weight.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-slate-900 mb-2">2. Special Zones & Weather Conditions</h2>
                <p>
                  Consignments routed to Leh & Ladakh, mountain passes, and island territories (Port Blair) are subject to weather dependencies, seasonal pass closures, and airline cargo limits. Advertised same-day air delivery is subject strictly to flight schedules and route availability, never an unconditional guarantee.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-slate-900 mb-2">3. Packaging Responsibility</h2>
                <p>
                  Shippers are responsible for adequate internal and external packaging. Fragile articles, electronics, and musical instruments in Student Express must be packed in sturdy, cushioned cases. Jahan Express reserves the right to decline improperly secured cargo.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-slate-900 mb-2">4. Applicable Jurisdiction</h2>
                <p>
                  Consignment agreements are governed by applicable Indian transport and commerce statutes under the jurisdiction of competent courts in New Delhi, India.
                </p>
              </section>
            </>
          )}
        </div>

      </div>
    </div>
  );
};
