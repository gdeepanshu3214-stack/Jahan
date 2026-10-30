import React, { useState, useEffect } from 'react';
import { RoutePath, ShipmentRecord } from '../types';
import { DEMO_SHIPMENTS, COMPANY_INFO } from '../config/siteData';
import { 
  Package, 
  Search, 
  Clock, 
  MapPin, 
  AlertCircle, 
  Info, 
  RotateCcw, 
  Phone,
  Copy,
  Check,
  ArrowRight
} from 'lucide-react';

interface TrackPageProps {
  initialTrackingId?: string;
  onNavigate: (path: RoutePath) => void;
}

export const TrackPage: React.FC<TrackPageProps> = ({ initialTrackingId = '', onNavigate }) => {
  const [query, setQuery] = useState(initialTrackingId);
  const [currentShipment, setCurrentShipment] = useState<ShipmentRecord | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorState, setErrorState] = useState<'none' | 'not-found' | 'invalid'>('none');
  const [copied, setCopied] = useState(false);

  const executeSearch = (trackingId: string) => {
    const clean = trackingId.trim().toUpperCase();
    if (!clean) {
      setErrorState('invalid');
      setCurrentShipment(null);
      return;
    }

    setLoading(true);
    setErrorState('none');

    setTimeout(() => {
      const match = DEMO_SHIPMENTS[clean];
      if (match) {
        setCurrentShipment(match);
        setErrorState('none');
      } else {
        setCurrentShipment(null);
        setErrorState('not-found');
      }
      setLoading(false);
    }, 350);
  };

  useEffect(() => {
    if (initialTrackingId) {
      setQuery(initialTrackingId);
      executeSearch(initialTrackingId);
    } else {
      // Clean default empty state when visiting without query parameter
      setCurrentShipment(null);
      setErrorState('none');
    }
  }, [initialTrackingId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeSearch(query);
  };

  const handleTrySample = () => {
    const sampleId = 'JHN-84920-IN';
    setQuery(sampleId);
    executeSearch(sampleId);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#F8FAFD] min-h-screen py-10 sm:py-16">
      <div className="max-w-[880px] mx-auto px-5 sm:px-6">
        
        {/* Page Header */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-widest block mb-2">
            Shipment Tracking
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Track your consignment
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
            Enter your AWB or docket number to view milestone updates and transit checkpoints.
          </p>
        </div>

        {/* Search Bar Container */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 sm:p-6 mb-6">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <label htmlFor="track-page-input" className="sr-only">
                AWB or docket number
              </label>
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="track-page-input"
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  if (errorState !== 'none') setErrorState('none');
                }}
                placeholder="Enter AWB or docket number (e.g. JHN-84920-IN)"
                className="w-full min-h-[48px] pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1A73E8] bg-slate-50/50 focus:bg-white text-slate-900 placeholder-slate-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="min-h-[48px] px-7 py-3 bg-[#1A73E8] hover:bg-[#1557B0] active:bg-[#174EA6] text-white font-semibold text-sm rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap shadow-xs disabled:opacity-75"
            >
              {loading ? (
                <>
                  <RotateCcw className="w-4 h-4 animate-spin" />
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <span>Track</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleTrySample}
              className="min-h-[48px] px-5 py-3 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm rounded-xl border border-slate-200 transition-colors whitespace-nowrap cursor-pointer"
            >
              Try a sample
            </button>
          </form>
        </div>

        {/* Customer-friendly Demo Notice */}
        <div className="mb-8 bg-blue-50/70 border border-blue-100 rounded-xl p-3.5 flex items-center gap-3 text-xs text-blue-900">
          <Info className="w-4 h-4 text-blue-600 shrink-0" />
          <p className="leading-relaxed">
            Demo preview. Live shipment tracking is not connected yet. Click <strong>"Try a sample"</strong> to see how progress milestones and transit timestamps appear.
          </p>
        </div>

        {/* DEFAULT EMPTY STATE (When no query was searched yet) */}
        {!currentShipment && !loading && errorState === 'none' && (
          <div className="bg-white rounded-2xl border border-slate-200/90 p-8 sm:p-12 text-center">
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-100">
              <Package className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              Ready to look up your shipment
            </h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed mb-6">
              Enter your tracking number above to see consignment status, transit checkpoints, and expected delivery.
            </p>
            <div className="inline-flex items-center gap-2 text-xs text-slate-500">
              <span>Have a physical booking receipt?</span>
              <button
                type="button"
                onClick={handleTrySample}
                className="text-blue-600 font-semibold hover:underline cursor-pointer"
              >
                Load sample demo record
              </button>
            </div>
          </div>
        )}

        {/* NOT FOUND STATE */}
        {errorState === 'not-found' && (
          <div className="bg-white rounded-2xl border border-slate-200/90 p-8 text-center space-y-4">
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              No record found for "{query}"
            </h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              We could not find an active consignment matching this number. Please check the spelling on your booking slip or try the sample record.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={handleTrySample}
                className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
              >
                Load sample consignment
              </button>
              <span className="text-slate-300 hidden sm:inline">·</span>
              <a
                href={COMPANY_INFO.primaryPhoneTel}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-blue-600"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call our team ({COMPANY_INFO.primaryPhoneFormatted})</span>
              </a>
            </div>
          </div>
        )}

        {/* SHIPMENT RECORD DISPLAY */}
        {currentShipment && !loading && (
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
            
            {/* Top Shipment Summary Header */}
            <div className="p-6 sm:p-7 border-b border-slate-200 bg-slate-900 text-white">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                      Consignment Number
                    </span>
                    <button
                      onClick={() => handleCopy(currentShipment.trackingNumber)}
                      className="inline-flex items-center gap-1 text-[11px] text-blue-300 hover:text-white px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 transition-colors"
                      title="Copy tracking number"
                    >
                      {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-white mt-1">
                    {currentShipment.trackingNumber}
                  </h2>
                  <p className="text-xs text-slate-300 mt-1">
                    Service: {currentShipment.service}
                  </p>
                </div>

                <div className="sm:text-right">
                  <span className="text-[11px] text-slate-400 uppercase block tracking-wider">
                    Current Status
                  </span>
                  <div className="inline-block mt-1 px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold text-xs rounded-full">
                    ● {currentShipment.currentStatus}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Last update: {currentShipment.lastUpdated}
                  </div>
                </div>
              </div>

              {/* Route Strip */}
              <div className="mt-6 pt-5 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-slate-400 block text-[11px] uppercase">Origin</span>
                    <span className="font-semibold text-slate-100">{currentShipment.origin}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-slate-400 block text-[11px] uppercase">Destination</span>
                    <span className="font-semibold text-slate-100">{currentShipment.destination}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Consignment Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 border-b border-slate-100 text-xs divide-x divide-slate-100 bg-slate-50/70">
              <div className="p-4">
                <span className="text-[11px] text-slate-500 uppercase block">Packages</span>
                <span className="font-bold text-slate-800 text-sm mt-0.5">{currentShipment.packagesCount} Carton(s)</span>
              </div>
              <div className="p-4">
                <span className="text-[11px] text-slate-500 uppercase block">Weight</span>
                <span className="font-bold text-slate-800 text-sm mt-0.5">{currentShipment.weightKg} kg</span>
              </div>
              <div className="p-4">
                <span className="text-[11px] text-slate-500 uppercase block">Sender</span>
                <span className="font-medium text-slate-800 mt-0.5 font-mono">{currentShipment.senderNameMasked}</span>
              </div>
              <div className="p-4">
                <span className="text-[11px] text-slate-500 uppercase block">Recipient</span>
                <span className="font-medium text-slate-800 mt-0.5 font-mono">{currentShipment.recipientNameMasked}</span>
              </div>
            </div>

            {/* Checkpoint Timeline */}
            <div className="p-6 sm:p-8">
              <h3 className="text-base font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>Transit checkpoints</span>
              </h3>

              <div className="space-y-6 relative before:absolute before:inset-0 before:left-3 before:w-0.5 before:bg-slate-200">
                {currentShipment.checkpoints.map((cp, idx) => {
                  return (
                    <div key={idx} className="relative flex items-start gap-4 pl-8 group">
                      
                      {/* Timeline Dot */}
                      <div
                        className={`absolute left-1.5 -translate-x-1/2 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          cp.current
                            ? 'bg-blue-600 border-white ring-4 ring-blue-100'
                            : cp.completed
                            ? 'bg-emerald-600 border-white'
                            : 'bg-white border-slate-300'
                        }`}
                      >
                        {cp.completed && !cp.current && (
                          <div className="w-1.5 h-1.5 rounded-full bg-white" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                          <span className={`text-sm font-bold ${cp.current ? 'text-blue-600' : 'text-slate-900'}`}>
                            {cp.status}
                          </span>
                          <span className="text-xs text-slate-500 font-mono">
                            {cp.timestamp}
                          </span>
                        </div>

                        <div className="text-xs font-medium text-slate-700 flex items-center gap-1.5 mb-1.5">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>{cp.location}</span>
                        </div>

                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {cp.description}
                        </p>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Support Callout */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
              <span>Need help with special handling instructions or delivery coordination?</span>
              <a
                href={COMPANY_INFO.primaryPhoneTel}
                className="font-bold text-blue-600 hover:underline whitespace-nowrap inline-flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call our team: {COMPANY_INFO.primaryPhoneFormatted}</span>
              </a>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
