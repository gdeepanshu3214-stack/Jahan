import React from 'react';
import { RoutePath } from '../types';
import { MIGRATION_CHECKLIST, COMPANY_INFO } from '../config/siteData';
import { ShieldCheck, AlertCircle, CheckCircle2, Clock, FileText, ArrowRight, ExternalLink } from 'lucide-react';

interface AuditPageProps {
  onNavigate: (path: RoutePath) => void;
}

export const AuditPage: React.FC<AuditPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <button onClick={() => onNavigate('/')} className="hover:text-blue-600 cursor-pointer">
            Home
          </button>
          <span>/</span>
          <span className="text-slate-900 font-semibold">Content Migration & Verification Audit</span>
        </nav>

        {/* Header */}
        <div className="max-w-3xl mb-10">
          <span className="text-xs font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full uppercase tracking-wider inline-block mb-3">
            Source Audit & Migration Transparency
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Source Content Migration Checklist & Verification Notes
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
            Direct homepage audit was conducted against search-indexed records of historical source pages (<code>http://jahanexpress.com/</code>: /index.html, /about.html, /services.html, /contact.html). Below is the comprehensive reconciliation mapping each historical source claim to its verified implementation.
          </p>
        </div>

        {/* Unresolved Business Facts Banner */}
        <div className="bg-white rounded-2xl border border-amber-200 p-6 mb-10 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-600" />
            <span>Honest Status of Unverified Business Claims</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700">
            <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200/80">
              <strong className="block text-slate-900 mb-1">1. Conflicting Telephone Numbers</strong>
              Primary common number <span className="font-mono font-bold">+91 9810990774</span> is used across all live links. Alternate numbers (+91 9810335025 and +91 9312839582) found on older indexed pages remain logged in review notes pending owner verification.
            </div>
            <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200/80">
              <strong className="block text-slate-900 mb-1">2. Registered Address Variant</strong>
              Work depot in Maya Puri (A-96/1 Gf, Phase-II) is consistent. Registered address variance between "R 29" and "R 29 A" in Uttam Nagar is explicitly maintained as a review item rather than silently merged.
            </div>
            <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200/80">
              <strong className="block text-slate-900 mb-1">3. Udyam Registration (UDYAM-DL-11-0024333)</strong>
              Retained in provisional metadata and footer notes; will be formally validated during annual business compliance audit.
            </div>
            <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200/80">
              <strong className="block text-slate-900 mb-1">4. Unconfirmed Carrier Logos</strong>
              Historical mentions of carriers (DHL, FedEx, IndiGo, Blue Dart) are hidden by default in public UI to avoid unauthorized trademark representation without signed agreements.
            </div>
          </div>
        </div>

        {/* Full Migration Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-12">
          <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">
              Section-by-Section Migration Matrix
            </h3>
            <span className="text-xs text-slate-500 font-mono">
              Total {MIGRATION_CHECKLIST.length} Key Checkpoints
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-100 text-slate-900 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3.5 px-4">Original Source Page</th>
                  <th className="py-3.5 px-4">Historical Claim / Section</th>
                  <th className="py-3.5 px-4">Migration Status</th>
                  <th className="py-3.5 px-4">New Location</th>
                  <th className="py-3.5 px-4">Reconciliation Rationale</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {MIGRATION_CHECKLIST.map((item, idx) => {
                  const statusColors = {
                    'Preserved & Refined': 'bg-emerald-50 text-emerald-800 border-emerald-200',
                    'Preserved As Provisional': 'bg-blue-50 text-blue-800 border-blue-200',
                    'Explicitly Flagged For Verification': 'bg-amber-50 text-amber-800 border-amber-200',
                    'Hidden Pending Approval': 'bg-slate-100 text-slate-700 border-slate-300'
                  };

                  return (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                        {item.sourceUrl.replace('http://jahanexpress.com', '')}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-slate-900">
                        {item.originalSection}
                        <span className="block font-normal text-slate-500 text-[11px] mt-0.5">
                          {item.originalClaimOrData}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full border text-[10px] font-bold ${statusColors[item.statusInNewSite]}`}>
                          {item.statusInNewSite}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-medium text-blue-700">
                        {item.newLocation}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 text-[11px] leading-relaxed">
                        {item.notes}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Old URL Redirects Specification */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-400" />
            <span>Legacy .html URL Redirection Specification</span>
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            To preserve search equity from legacy indexed pages, the routing architecture maps old static URLs seamlessly:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
            <div className="p-3 rounded-lg bg-slate-800 border border-slate-700">
              <span className="text-slate-400 block text-[10px]">Legacy:</span>
              <span className="text-amber-400">/index.html</span>
              <span className="text-slate-400 block mt-1 text-[10px]">Maps to:</span>
              <span className="text-emerald-400">/ (Home)</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-800 border border-slate-700">
              <span className="text-slate-400 block text-[10px]">Legacy:</span>
              <span className="text-amber-400">/about.html</span>
              <span className="text-slate-400 block mt-1 text-[10px]">Maps to:</span>
              <span className="text-emerald-400">/about</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-800 border border-slate-700">
              <span className="text-slate-400 block text-[10px]">Legacy:</span>
              <span className="text-amber-400">/services.html</span>
              <span className="text-slate-400 block mt-1 text-[10px]">Maps to:</span>
              <span className="text-emerald-400">/services</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-800 border border-slate-700">
              <span className="text-slate-400 block text-[10px]">Legacy:</span>
              <span className="text-amber-400">/contact.html</span>
              <span className="text-slate-400 block mt-1 text-[10px]">Maps to:</span>
              <span className="text-emerald-400">/contact</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
