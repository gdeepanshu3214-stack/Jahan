import React from 'react';
import { RoutePath, ServiceId } from '../types';
import { SERVICES_LIST } from '../config/siteData';
import { BrandVisual } from '../components/common/BrandVisual';
import { ArrowRight, Check, ShieldCheck, Truck, Plane, Anchor, GraduationCap } from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (path: RoutePath) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  const getIcon = (id: ServiceId) => {
    switch (id) {
      case 'road-freight':
        return <Truck className="w-6 h-6 text-blue-600" />;
      case 'air-freight':
        return <Plane className="w-6 h-6 text-sky-600" />;
      case 'ocean-freight':
        return <Anchor className="w-6 h-6 text-indigo-600" />;
      case 'student-express':
        return <GraduationCap className="w-6 h-6 text-amber-600" />;
    }
  };

  return (
    <div className="bg-white min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-4">
            <button onClick={() => onNavigate('/')} className="hover:text-blue-600 cursor-pointer">
              Home
            </button>
            <span>/</span>
            <span className="text-slate-900 font-semibold">Services Overview</span>
          </nav>
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-widest block mb-2">
            Integrated Multimodal Logistics
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
            Tailored freight solutions for every destination.
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
            Whether moving palletized industrial cargo across national highways, shipping personal student luggage to campus, or coordinating maritime containers, Jahan Express provides dedicated custody and scheduled handovers.
          </p>
        </div>

        {/* 4 Detailed Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {SERVICES_LIST.map((srv) => (
            <div
              key={srv.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Visual */}
                <div className="h-56 relative overflow-hidden">
                  <BrandVisual
                    type={
                      srv.id === 'road-freight'
                        ? 'road'
                        : srv.id === 'air-freight'
                        ? 'air'
                        : srv.id === 'ocean-freight'
                        ? 'ocean'
                        : 'student'
                    }
                  />
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <h2 className="text-2xl font-bold text-slate-900">
                      {srv.name}
                    </h2>
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                      {getIcon(srv.id)}
                    </div>
                  </div>

                  <p className="text-sm font-semibold text-blue-600 mb-4">
                    {srv.tagline}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    {srv.longDescription}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="space-y-2 mb-6">
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-2">
                      Key Highlights
                    </span>
                    {srv.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                        <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* Availability disclaimer */}
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-[11px] text-slate-500 leading-relaxed">
                    <strong>Service note:</strong> {srv.availabilityNotice}
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="p-6 sm:p-8 pt-0 flex items-center justify-between gap-4 border-t border-slate-100 mt-4">
                <button
                  onClick={() => onNavigate(`/services/${srv.slug}` as RoutePath)}
                  className="text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Explore full service details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('/get-a-quote')}
                  className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Request Quote
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Matrix Table */}
        <div className="bg-slate-50 rounded-3xl border border-slate-200 p-6 sm:p-10 mb-16">
          <div className="mb-8">
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-widest block mb-1">
              Decision Matrix
            </span>
            <h3 className="text-2xl font-bold text-slate-900">
              Comparing Our Shipping Services
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Choose the method best matching your cargo type, volume, and urgency.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-700">
              <thead className="border-b border-slate-200 text-xs font-bold text-slate-900 uppercase tracking-wider bg-slate-100/80">
                <tr>
                  <th className="py-3 px-4 rounded-l-xl">Service</th>
                  <th className="py-3 px-4">Primary Mode</th>
                  <th className="py-3 px-4">Typical Consignment</th>
                  <th className="py-3 px-4">Special Advantage</th>
                  <th className="py-3 px-4 rounded-r-xl">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white font-normal">
                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-4 font-bold text-slate-900">Road Freight</td>
                  <td className="py-4 px-4">Dedicated Highway Trucks</td>
                  <td className="py-4 px-4">Commercial pallets, cartons, machinery</td>
                  <td className="py-4 px-4">Dense North India line-haul network</td>
                  <td className="py-4 px-4">
                    <button
                      onClick={() => onNavigate('/services/road-freight')}
                      className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
                    >
                      Details →
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-4 font-bold text-slate-900">Air Freight</td>
                  <td className="py-4 px-4">Commercial Aviation Cargo</td>
                  <td className="py-4 px-4">Time-sensitive samples, electronics, documents</td>
                  <td className="py-4 px-4">Expedited transit & global airport links</td>
                  <td className="py-4 px-4">
                    <button
                      onClick={() => onNavigate('/services/air-freight')}
                      className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
                    >
                      Details →
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-4 font-bold text-slate-900">Ocean Freight</td>
                  <td className="py-4 px-4">Maritime Shipping Container</td>
                  <td className="py-4 px-4">Heavy equipment, export bulk commodities</td>
                  <td className="py-4 px-4">Maximum cost efficiency for high volume</td>
                  <td className="py-4 px-4">
                    <button
                      onClick={() => onNavigate('/services/ocean-freight')}
                      className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
                    >
                      Details →
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-4 font-bold text-slate-900">Student Express</td>
                  <td className="py-4 px-4">Door-to-door ground / air</td>
                  <td className="py-4 px-4">Textbooks, clothes, bedding, musical instruments</td>
                  <td className="py-4 px-4">Campus hostel pickup & student tariffs</td>
                  <td className="py-4 px-4">
                    <button
                      onClick={() => onNavigate('/services/student-express')}
                      className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
                    >
                      Details →
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};
