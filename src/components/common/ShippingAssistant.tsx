import React, { useState, useEffect } from 'react';
import { RoutePath } from '../../types';
import { COMPANY_INFO, SERVICES_LIST } from '../../config/siteData';
import { X, Phone, ArrowRight, Check, HelpCircle } from 'lucide-react';

interface ShippingAssistantProps {
  onNavigate: (path: RoutePath) => void;
}

export const ShippingAssistant: React.FC<ShippingAssistantProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'match' | 'calc' | 'help'>('match');

  // Matcher state
  const [cargoType, setCargoType] = useState<string>('commercial');
  const [urgency, setUrgency] = useState<string>('standard');

  // Volumetric calculator state
  const [lengthCm, setLengthCm] = useState<number>(40);
  const [widthCm, setWidthCm] = useState<number>(30);
  const [heightCm, setHeightCm] = useState<number>(30);
  const [actualWeightKg, setActualWeightKg] = useState<number>(8);
  const [pkgCount, setPkgCount] = useState<number>(1);

  // Keyboard Escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Volumetric weight: (L * W * H / 5000) * count
  const singleVolumetric = (lengthCm * widthCm * heightCm) / 5000;
  const totalVolumetric = Number((singleVolumetric * pkgCount).toFixed(2));
  const totalActual = Number((actualWeightKg * pkgCount).toFixed(2));
  const chargeableWeight = Math.max(totalVolumetric, totalActual);

  const getMatchedService = () => {
    if (cargoType === 'student') return 'student-express';
    if (cargoType === 'sea-container') return 'ocean-freight';
    if (urgency === 'urgent' || cargoType === 'urgent-parts') return 'air-freight';
    return 'road-freight';
  };

  const matchedId = getMatchedService();
  const matchedService = SERVICES_LIST.find((s) => s.id === matchedId) || SERVICES_LIST[0];

  return (
    <>
      {/* Compact Floating Trigger Button */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2.5 bg-slate-900/90 hover:bg-blue-600 text-white text-xs font-semibold rounded-full shadow-md backdrop-blur-xs border border-slate-700/50 transition-all duration-200 cursor-pointer"
          aria-label="Open shipping help drawer"
        >
          <HelpCircle className="w-4 h-4 text-blue-400 group-hover:text-white" />
          <span>Shipping help</span>
        </button>
      </div>

      {/* Assistant Modal / Drawer */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:justify-end sm:pr-6 p-0 sm:pb-6 bg-slate-950/40 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-labelledby="shipping-help-title"
        >
          <div className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
            
            {/* Header */}
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <h3 id="shipping-help-title" className="text-sm font-bold text-white leading-tight">
                  Shipping help & tools
                </h3>
                <p className="text-xs text-slate-400">
                  Select a service or estimate chargeable weight
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Close shipping help"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sub-Tabs */}
            <div className="grid grid-cols-3 border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-600">
              <button
                onClick={() => setActiveTab('match')}
                className={`py-2.5 text-center transition-colors cursor-pointer ${
                  activeTab === 'match'
                    ? 'bg-white text-blue-600 border-b-2 border-blue-600 font-bold'
                    : 'hover:text-slate-900'
                }`}
              >
                Service Matcher
              </button>
              <button
                onClick={() => setActiveTab('calc')}
                className={`py-2.5 text-center transition-colors cursor-pointer ${
                  activeTab === 'calc'
                    ? 'bg-white text-blue-600 border-b-2 border-blue-600 font-bold'
                    : 'hover:text-slate-900'
                }`}
              >
                Weight Calculator
              </button>
              <button
                onClick={() => setActiveTab('help')}
                className={`py-2.5 text-center transition-colors cursor-pointer ${
                  activeTab === 'help'
                    ? 'bg-white text-blue-600 border-b-2 border-blue-600 font-bold'
                    : 'hover:text-slate-900'
                }`}
              >
                Call Desk
              </button>
            </div>

            {/* Tab 1: Service Matcher */}
            {activeTab === 'match' && (
              <div className="p-5 overflow-y-auto space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1.5">
                    What are you shipping?
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {[
                      { id: 'commercial', label: 'Commercial cartons' },
                      { id: 'student', label: 'Student hostel & books' },
                      { id: 'urgent-parts', label: 'Urgent air parcel' },
                      { id: 'sea-container', label: 'Bulk sea container' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setCargoType(opt.id)}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          cargoType === opt.id
                            ? 'border-blue-600 bg-blue-50/80 text-blue-900 font-semibold'
                            : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1.5">
                    Urgency & Timeline
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {[
                      { id: 'standard', label: 'Standard road transit' },
                      { id: 'urgent', label: 'Priority air express' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setUrgency(opt.id)}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          urgency === opt.id
                            ? 'border-blue-600 bg-blue-50/80 text-blue-900 font-semibold'
                            : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Match Recommendation */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 uppercase tracking-wide">
                    <Check className="w-3.5 h-3.5" />
                    <span>Recommended Service</span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 mt-1">
                    {matchedService.name}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                    {matchedService.shortDescription}
                  </p>
                  <div className="flex items-center gap-3 mt-3 pt-3 border-t border-slate-200">
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        onNavigate(`/services/${matchedService.slug}` as RoutePath);
                      }}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
                    >
                      View details →
                    </button>
                    <span className="text-slate-300">·</span>
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        onNavigate('/get-a-quote');
                      }}
                      className="text-xs font-semibold text-slate-800 hover:text-blue-600 cursor-pointer"
                    >
                      Get quote →
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Volumetric Weight Calculator */}
            {activeTab === 'calc' && (
              <div className="p-5 overflow-y-auto space-y-3.5">
                <p className="text-xs text-slate-500 leading-relaxed">
                  Logistics carriers bill based on whichever is greater: actual weight or volumetric size (L × W × H ÷ 5000).
                </p>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-xs font-medium text-slate-600 block mb-1">Length (cm)</label>
                    <input
                      type="number"
                      min="1"
                      value={lengthCm}
                      onChange={(e) => setLengthCm(Math.max(1, Number(e.target.value)))}
                      className="w-full p-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-600 block mb-1">Width (cm)</label>
                    <input
                      type="number"
                      min="1"
                      value={widthCm}
                      onChange={(e) => setWidthCm(Math.max(1, Number(e.target.value)))}
                      className="w-full p-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-600 block mb-1">Height (cm)</label>
                    <input
                      type="number"
                      min="1"
                      value={heightCm}
                      onChange={(e) => setHeightCm(Math.max(1, Number(e.target.value)))}
                      className="w-full p-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-medium text-slate-600 block mb-1">Actual Wt / box (kg)</label>
                    <input
                      type="number"
                      min="0.1"
                      step="0.5"
                      value={actualWeightKg}
                      onChange={(e) => setActualWeightKg(Math.max(0.1, Number(e.target.value)))}
                      className="w-full p-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-600 block mb-1">Number of boxes</label>
                    <input
                      type="number"
                      min="1"
                      value={pkgCount}
                      onChange={(e) => setPkgCount(Math.max(1, Number(e.target.value)))}
                      className="w-full p-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white"
                    />
                  </div>
                </div>

                {/* Calculation breakdown */}
                <div className="bg-[#EEF5FF] border border-blue-100 rounded-xl p-3 text-xs space-y-1.5">
                  <div className="flex justify-between text-slate-600">
                    <span>Total Actual Weight:</span>
                    <span className="font-semibold text-slate-900">{totalActual} kg</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Total Volumetric Weight:</span>
                    <span className="font-semibold text-slate-900">{totalVolumetric} kg</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-blue-900 pt-1.5 border-t border-blue-200">
                    <span>Estimated Chargeable:</span>
                    <span>{chargeableWeight} kg</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsOpen(false);
                    onNavigate('/get-a-quote');
                  }}
                  className="w-full py-2.5 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-700 transition-colors text-center cursor-pointer"
                >
                  Continue to quote request →
                </button>
              </div>
            )}

            {/* Tab 3: Quick Help & Call Desk */}
            {activeTab === 'help' && (
              <div className="p-5 overflow-y-auto space-y-3.5 text-xs">
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2">
                  <span className="font-bold text-slate-900 block text-sm">
                    Call our dispatch desk
                  </span>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-blue-600" />
                    <a href={COMPANY_INFO.primaryPhoneTel} className="text-blue-600 font-semibold hover:underline text-sm">
                      {COMPANY_INFO.primaryPhoneFormatted}
                    </a>
                  </div>
                  <div className="text-slate-500 text-xs">
                    Hours: {COMPANY_INFO.operatingHours}
                  </div>
                </div>

                <div className="space-y-2 pt-1">
                  <span className="font-semibold text-slate-700 block">Common links</span>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      onNavigate('/track');
                    }}
                    className="w-full text-left p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 flex items-center justify-between text-slate-800 cursor-pointer"
                  >
                    <span>Track an existing shipment</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      onNavigate('/coverage');
                    }}
                    className="w-full text-left p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 flex items-center justify-between text-slate-800 cursor-pointer"
                  >
                    <span>Coverage for Leh & Port Blair</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      onNavigate('/faq');
                    }}
                    className="w-full text-left p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 flex items-center justify-between text-slate-800 cursor-pointer"
                  >
                    <span>Read packaging FAQs</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
