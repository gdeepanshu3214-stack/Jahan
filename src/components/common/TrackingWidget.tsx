import React, { useState } from 'react';
import { Package, Search, ArrowRight, AlertCircle, Info } from 'lucide-react';
import { RoutePath } from '../../types';

interface TrackingWidgetProps {
  onNavigate?: (path: RoutePath) => void;
  onTrackSubmit?: (trackingNumber: string) => void;
  initialValue?: string;
  variant?: 'hero-floating' | 'embedded' | 'standalone';
}

export const TrackingWidget: React.FC<TrackingWidgetProps> = ({
  onNavigate,
  onTrackSubmit,
  initialValue = '',
  variant = 'hero-floating',
}) => {
  const [trackingNumber, setTrackingNumber] = useState(initialValue);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = trackingNumber.trim().toUpperCase();
    if (!clean) {
      setError('Please enter your AWB or docket number (e.g. JHN-84920-IN)');
      return;
    }
    setError(null);
    if (onTrackSubmit) {
      onTrackSubmit(clean);
    } else if (onNavigate) {
      onNavigate(`/track?id=${encodeURIComponent(clean)}` as RoutePath);
    }
  };

  const handleDemoSample = () => {
    const sampleId = 'JHN-84920-IN';
    setTrackingNumber(sampleId);
    setError(null);
    if (onTrackSubmit) {
      onTrackSubmit(sampleId);
    } else if (onNavigate) {
      onNavigate(`/track?id=${sampleId}` as RoutePath);
    }
  };

  return (
    <div
      className={`w-full bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-6 lg:p-7 transition-all ${
        variant === 'hero-floating' ? 'relative z-20' : ''
      }`}
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left Side: Icon + Headline + Helper text */}
        <div className="flex items-start sm:items-center gap-4 shrink-0 lg:max-w-xs">
          <div className="w-12 h-12 rounded-xl bg-[#E8F0FE] border border-[#D2E3FC] flex items-center justify-center text-[#1A73E8] shrink-0">
            <Package className="w-6 h-6 stroke-[1.8]" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              Track your shipment
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Enter your tracking number to get the latest updates.
            </p>
          </div>
        </div>

        {/* Right Side: Form with visible label, dominant input, Track shipment button, and honest note */}
        <form onSubmit={handleSubmit} className="flex-1 max-w-2xl">
          <div className="flex flex-col gap-1.5">
            {/* Visible label on desktop & mobile */}
            <label
              htmlFor="awb-hero-input"
              className="text-xs font-semibold text-slate-700 tracking-wide"
            >
              AWB or docket number
            </label>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="awb-hero-input"
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => {
                    setTrackingNumber(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="e.g. JHN-84920-IN"
                  className={`w-full min-h-[50px] pl-10 pr-4 py-3 rounded-xl border text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-[#1A73E8] focus:border-[#1A73E8] ${
                    error
                      ? 'border-red-300 bg-red-50/50 text-red-900 placeholder-red-400'
                      : 'border-slate-200 bg-slate-50/60 hover:bg-white focus:bg-white text-slate-900 placeholder-slate-400'
                  }`}
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-6 min-h-[50px] bg-[#1A73E8] hover:bg-[#1557B0] active:bg-[#174EA6] text-white font-semibold text-sm rounded-xl shadow-xs transition-colors whitespace-nowrap cursor-pointer shrink-0"
              >
                <span>Track shipment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Validation error message if any */}
          {error && (
            <div className="flex items-center gap-1.5 mt-2 text-xs text-red-600 font-medium">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Bottom helper row: Small secondary 'Try a sample' link + Compact honest note */}
          <div className="flex flex-wrap items-center justify-between gap-y-1.5 gap-x-4 mt-3 pt-2 text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <span>Have a question?</span>
              <button
                type="button"
                onClick={handleDemoSample}
                className="text-[#1A73E8] hover:text-[#1557B0] font-semibold hover:underline inline-flex items-center cursor-pointer"
              >
                Try a sample (JHN-84920-IN)
              </button>
            </div>

            <div className="flex items-center gap-1 text-[11px] text-slate-400">
              <Info className="w-3.5 h-3.5 shrink-0 text-slate-400" />
              <span>Demo preview — live tracking is not connected.</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

