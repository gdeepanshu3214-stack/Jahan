import React, { useState, useEffect, useRef } from 'react';
import { RoutePath } from '../../types';
import { PROCESS_ASSETS } from '../../config/assets';
import { 
  ArrowRight, 
  CheckCircle2, 
  ChevronRight, 
  Play, 
  Pause, 
  RotateCcw,
  Sparkles,
  Package,
  Truck,
  Scan,
  Compass,
  FileCheck,
  Check,
  MapPin
} from 'lucide-react';

interface HowItWorksProcessProps {
  onNavigate: (path: RoutePath) => void;
}

interface ProcessStepItem {
  id: string;
  stepNumber: string;
  title: string;
  shortDesc: string;
  detailedDesc: string;
  image: string;
  altText: string;
  keyFeature: string;
  operationHighlight: string;
  stageMetric: string;
}

const PROCESS_STEPS: ProcessStepItem[] = [
  {
    id: 'order-processing',
    stepNumber: '01',
    title: 'Order Processing',
    shortDesc: 'Share shipment details and arrange pickup.',
    detailedDesc:
      'We assess your consignment weight, volume, cargo category, and route. Our team confirms transparent rates and schedules a punctual doorstep collection from your warehouse, home, office, or hostel.',
    image: PROCESS_ASSETS.orderProcessing,
    altText: 'Logistics personnel verifying paperwork and cargo shipment on clipboard',
    keyFeature: 'Flexible doorstep collection & immediate booking confirmation',
    operationHighlight: 'Manifest Verification & Rate Evaluation',
    stageMetric: 'Avg. Pickup Dispatch within 2–4 Hours',
  },
  {
    id: 'warehousing',
    stepNumber: '02',
    title: 'Warehousing',
    shortDesc: 'Careful sorting and shipment preparation.',
    detailedDesc:
      'Consignments arrive at our central Maya Puri hub for precision scale verification, protective packaging, weatherproof wrapping, and secure barcode tagging before line-haul container dispatch.',
    image: PROCESS_ASSETS.warehousing,
    altText: 'Warehouse operator inspecting and sorting packages on conveyor belt',
    keyFeature: 'Weight verification & specialized protective packaging',
    operationHighlight: 'Maya Puri Phase-II Hub Consolidation',
    stageMetric: '100% Barcode Tagging & Safety Packaging',
  },
  {
    id: 'shipment-tracking',
    stepNumber: '03',
    title: 'Shipment Tracking',
    shortDesc: 'Follow updates as your shipment moves.',
    detailedDesc:
      'Follow your shipment through highway toll corridors, air terminals, or sea gateways. Transparent checkpoint logs record every key transit milestone from origin departure to destination hub arrival.',
    image: PROCESS_ASSETS.shipmentTracking,
    altText: 'Person holding smartphone displaying clear shipment tracking checkpoint milestones',
    keyFeature: 'Verified milestone updates with clear IST timestamps',
    operationHighlight: 'Inter-State Checkpoint Logging',
    stageMetric: 'Live Milestone Tracking & SMS Alerts',
  },
  {
    id: 'delivery',
    stepNumber: '04',
    title: 'Delivery',
    shortDesc: 'Your shipment reaches its destination.',
    detailedDesc:
      'Safe, on-time handover at the consignee’s doorstep or designated depot. Deliveries conclude with recipient signature verification and immediate digital proof of delivery (POD).',
    image: PROCESS_ASSETS.delivery,
    altText: 'Courier driver handing delivery parcel box to smiling customer at doorstep',
    keyFeature: 'Consignee signature handover & digital proof of delivery',
    operationHighlight: 'Doorstep Handover & Consignee Sign-off',
    stageMetric: 'Digital Proof of Delivery (POD) Recorded',
  },
];

const STEP_DURATION_MS = 3800;

export const HowItWorksProcess: React.FC<HowItWorksProcessProps> = ({ onNavigate }) => {
  const [selectedStep, setSelectedStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  // Auto-play video walkthrough animation logic
  useEffect(() => {
    if (!isPlaying) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      return;
    }

    startTimeRef.current = Date.now();

    const updateProgress = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.min(100, (elapsed / STEP_DURATION_MS) * 100);
      setProgress(pct);

      if (elapsed >= STEP_DURATION_MS) {
        setSelectedStep((prev) => (prev + 1) % PROCESS_STEPS.length);
        startTimeRef.current = Date.now();
        setProgress(0);
      } else {
        animFrameRef.current = requestAnimationFrame(updateProgress);
      }
    };

    animFrameRef.current = requestAnimationFrame(updateProgress);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying, selectedStep]);

  const handleStepClick = (index: number) => {
    setSelectedStep(index);
    setProgress(0);
    startTimeRef.current = Date.now();
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    setProgress(0);
    startTimeRef.current = Date.now();
  };

  const active = PROCESS_STEPS[selectedStep];

  return (
    <section 
      className="py-16 sm:py-24 bg-white border-t border-slate-200/80 overflow-hidden"
      aria-labelledby="how-it-works-heading"
    >
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm font-bold text-[#1A73E8] tracking-[0.2em] uppercase block mb-3">
            How It Works
          </span>
          <h2 
            id="how-it-works-heading"
            className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-slate-900 tracking-tight leading-[1.15]"
          >
            From pickup to delivery. Made simple.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-3 leading-relaxed">
            Four clear steps. One dependable logistics partner.
          </p>

          {/* Video Walkthrough Player Controls */}
          <div className="mt-6 inline-flex items-center gap-3 bg-slate-50 border border-slate-200/90 rounded-full px-4 py-1.5 shadow-2xs">
            <button
              onClick={togglePlay}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-[#1A73E8] cursor-pointer transition-colors"
              aria-label={isPlaying ? 'Pause animated walkthrough' : 'Play animated walkthrough'}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-[#1A73E8] fill-[#1A73E8]" />
                  <span>Pause walkthrough</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-[#1A73E8] fill-[#1A73E8]" />
                  <span>Play walkthrough</span>
                </>
              )}
            </button>

            <span className="text-slate-300">|</span>

            {/* Step navigation dots */}
            <div className="flex items-center gap-1.5" role="tablist" aria-label="Step selector">
              {PROCESS_STEPS.map((step, idx) => (
                <button
                  key={step.id}
                  onClick={() => handleStepClick(idx)}
                  className={`text-[11px] font-mono px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                    selectedStep === idx
                      ? 'bg-[#1A73E8] text-white font-bold shadow-xs'
                      : 'text-slate-500 hover:bg-slate-200 hover:text-slate-800'
                  }`}
                  aria-selected={selectedStep === idx}
                >
                  {step.stepNumber}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* DESKTOP VIEW: 4 Horizontal Connected Circular Steps (lg+)    */}
        {/* Note: NO DUPLICATE BADGES RENDERED. Images already have 01-04 */}
        {/* ============================================================ */}
        <div className="hidden lg:block relative mb-12">
          
          {/* Animated Delicate Dotted Blue Connector Lines between Circles */}
          <div 
            className="absolute top-[96px] left-[13%] right-[13%] flex items-center justify-between pointer-events-none z-0"
            aria-hidden="true"
          >
            {/* Connector 1 -> 2 */}
            <div className="flex-1 flex items-center justify-center px-4">
              <div className="w-full relative flex items-center">
                <svg className="w-full h-4 overflow-visible" preserveAspectRatio="none">
                  <line 
                    x1="0" 
                    y1="8" 
                    x2="100%" 
                    y2="8" 
                    stroke="#A8C7FA" 
                    strokeWidth="2.5" 
                    strokeDasharray="6 6"
                    className="animate-flow-dashes"
                  />
                </svg>
                <div className={`absolute right-0 -top-0.5 transform translate-x-1 transition-colors ${selectedStep >= 1 ? 'text-[#1A73E8]' : 'text-blue-300'}`}>
                  <ChevronRight className="w-4 h-4" strokeWidth={3} />
                </div>
              </div>
            </div>

            {/* Connector 2 -> 3 */}
            <div className="flex-1 flex items-center justify-center px-4">
              <div className="w-full relative flex items-center">
                <svg className="w-full h-4 overflow-visible" preserveAspectRatio="none">
                  <line 
                    x1="0" 
                    y1="8" 
                    x2="100%" 
                    y2="8" 
                    stroke="#A8C7FA" 
                    strokeWidth="2.5" 
                    strokeDasharray="6 6"
                    className="animate-flow-dashes"
                  />
                </svg>
                <div className={`absolute right-0 -top-0.5 transform translate-x-1 transition-colors ${selectedStep >= 2 ? 'text-[#1A73E8]' : 'text-blue-300'}`}>
                  <ChevronRight className="w-4 h-4" strokeWidth={3} />
                </div>
              </div>
            </div>

            {/* Connector 3 -> 4 */}
            <div className="flex-1 flex items-center justify-center px-4">
              <div className="w-full relative flex items-center">
                <svg className="w-full h-4 overflow-visible" preserveAspectRatio="none">
                  <line 
                    x1="0" 
                    y1="8" 
                    x2="100%" 
                    y2="8" 
                    stroke="#A8C7FA" 
                    strokeWidth="2.5" 
                    strokeDasharray="6 6"
                    className="animate-flow-dashes"
                  />
                </svg>
                <div className={`absolute right-0 -top-0.5 transform translate-x-1 transition-colors ${selectedStep >= 3 ? 'text-[#1A73E8]' : 'text-blue-300'}`}>
                  <ChevronRight className="w-4 h-4" strokeWidth={3} />
                </div>
              </div>
            </div>
          </div>

          {/* 4 Steps Row */}
          <div className="grid grid-cols-4 gap-6 relative z-10" role="tablist" aria-label="Shipping process steps">
            {PROCESS_STEPS.map((step, idx) => {
              const isSelected = selectedStep === idx;

              return (
                <div
                  key={step.id}
                  className="flex flex-col items-center group cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-[#D2E3FC] rounded-3xl p-2 transition-all"
                  role="tab"
                  tabIndex={0}
                  id={`step-tab-${idx}`}
                  aria-selected={isSelected}
                  aria-controls={`step-panel-${idx}`}
                  onClick={() => handleStepClick(idx)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleStepClick(idx);
                    } else if (e.key === 'ArrowRight') {
                      e.preventDefault();
                      handleStepClick((idx + 1) % PROCESS_STEPS.length);
                    } else if (e.key === 'ArrowLeft') {
                      e.preventDefault();
                      handleStepClick((idx - 1 + PROCESS_STEPS.length) % PROCESS_STEPS.length);
                    }
                  }}
                >
                  {/* Circular Photo Container (~192px) */}
                  <div className="relative w-[192px] h-[192px] select-none">
                    
                    {/* Fine Light-Blue Outer Ring + Shadow + Soft Glowing Border */}
                    <div
                      className={`w-full h-full rounded-full p-[5px] bg-white transition-all duration-300 motion-reduce:transition-none ${
                        isSelected
                          ? 'ring-4 ring-[#D2E3FC] border-2 border-[#1A73E8] shadow-md scale-[1.03] animate-step-pulse'
                          : 'border-2 border-[#D2E3FC] shadow-2xs group-hover:border-[#1A73E8] group-hover:ring-4 group-hover:ring-[#E8F0FE] group-hover:shadow-sm group-hover:scale-[1.02]'
                      }`}
                    >
                      {/* Photographic Circle (Contains the authentic 01-04 badge in photo) */}
                      <div className="w-full h-full rounded-full overflow-hidden relative bg-slate-100">
                        <img
                          src={step.image}
                          alt={step.altText}
                          className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>

                    {/* Step Timeline Indicator Fill (Circular progress ring around active circle) */}
                    {isSelected && isPlaying && (
                      <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="48"
                          fill="none"
                          stroke="#1A73E8"
                          strokeWidth="2.5"
                          strokeDasharray="301.59"
                          strokeDashoffset={301.59 - (301.59 * progress) / 100}
                          className="transition-all duration-75"
                        />
                      </svg>
                    )}
                  </div>

                  {/* Title and Complete Explanation below circle */}
                  <div className="text-center mt-5 w-full px-2">
                    <h3
                      className={`text-lg font-bold transition-colors ${
                        isSelected ? 'text-[#1A73E8]' : 'text-slate-900 group-hover:text-[#1A73E8]'
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p className="text-sm text-slate-600 mt-1.5 leading-relaxed max-w-[230px] mx-auto">
                      {step.shortDesc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ============================================================ */}
        {/* TABLET VIEW: 2-Column Balanced Grid (md to lg)              */}
        {/* ============================================================ */}
        <div className="hidden md:grid lg:hidden grid-cols-2 gap-6 mb-10" role="tablist">
          {PROCESS_STEPS.map((step, idx) => {
            const isSelected = selectedStep === idx;

            return (
              <div
                key={step.id}
                role="tab"
                tabIndex={0}
                aria-selected={isSelected}
                onClick={() => handleStepClick(idx)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleStepClick(idx);
                  }
                }}
                className={`p-5 rounded-2xl bg-white border transition-all duration-200 cursor-pointer flex items-center gap-5 ${
                  isSelected
                    ? 'border-[#1A73E8] ring-4 ring-[#E8F0FE] shadow-sm scale-[1.01]'
                    : 'border-slate-200 hover:border-[#D2E3FC] hover:shadow-xs'
                }`}
              >
                {/* Circular Photo (130px) */}
                <div className="relative w-[130px] h-[130px] shrink-0">
                  <div
                    className={`w-full h-full rounded-full p-[4px] bg-white border-2 transition-all ${
                      isSelected
                        ? 'border-[#1A73E8] ring-2 ring-[#D2E3FC] shadow-sm'
                        : 'border-[#D2E3FC]'
                    }`}
                  >
                    <div className="w-full h-full rounded-full overflow-hidden bg-slate-100">
                      <img
                        src={step.image}
                        alt={step.altText}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>

                {/* Text beside circle */}
                <div className="flex-1">
                  <span className="text-xs font-semibold text-[#1A73E8] uppercase tracking-wider block mb-1">
                    Step {step.stepNumber}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mb-1">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {step.shortDesc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ============================================================ */}
        {/* MOBILE VIEW: Connected Vertical Timeline (< md)             */}
        {/* ============================================================ */}
        <div className="block md:hidden mb-10 space-y-3">
          <div className="relative pl-3">
            {PROCESS_STEPS.map((step, idx) => {
              const isSelected = selectedStep === idx;

              return (
                <div
                  key={step.id}
                  onClick={() => handleStepClick(idx)}
                  className={`relative flex items-center gap-4 p-3.5 rounded-2xl mb-3 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#F0F6FF] border border-[#D2E3FC] shadow-xs ring-2 ring-[#E8F0FE]'
                      : 'bg-white border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {/* Mobile Circle Photo (84px) */}
                  <div className="relative w-[84px] h-[84px] shrink-0">
                    <div
                      className={`w-full h-full rounded-full p-[3px] bg-white border-2 transition-all ${
                        isSelected
                          ? 'border-[#1A73E8] ring-2 ring-[#D2E3FC] shadow-xs'
                          : 'border-[#D2E3FC]'
                      }`}
                    >
                      <div className="w-full h-full rounded-full overflow-hidden bg-slate-100">
                        <img
                          src={step.image}
                          alt={step.altText}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Text beside circle */}
                  <div className="flex-1">
                    <span className="text-[11px] font-bold text-[#1A73E8] uppercase tracking-wide block mb-0.5">
                      Step {step.stepNumber}
                    </span>
                    <h3 className="text-base font-bold text-slate-900">
                      {step.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {step.shortDesc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ============================================================ */}
        {/* SHARED DETAILS & ANIMATED VIDEO SIMULATION PANEL            */}
        {/* ============================================================ */}
        <div
          id={`step-panel-${selectedStep}`}
          role="tabpanel"
          aria-labelledby={`step-tab-${selectedStep}`}
          className="max-w-4xl mx-auto bg-gradient-to-br from-white to-[#F8FAFD] border border-[#D2E3FC] rounded-3xl p-6 sm:p-8 mb-12 shadow-sm transition-all duration-300 min-h-[170px]"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Left Content (Span 7) */}
            <div className="md:col-span-7 space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="px-3 py-1 rounded-full bg-[#1A73E8] text-white font-bold font-mono text-xs shadow-xs">
                  Stage {active.stepNumber} / 04
                </span>
                <span className="text-xs font-semibold text-[#1967D2]">
                  {active.operationHighlight}
                </span>
              </div>

              <h4 className="text-xl sm:text-2xl font-bold text-slate-900">
                {active.title}
              </h4>

              <p className="text-sm text-slate-600 leading-relaxed">
                {active.detailedDesc}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
                <span className="inline-flex items-center gap-1.5 font-medium text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-lg">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{active.keyFeature}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 font-medium text-[#1A73E8] bg-[#E8F0FE] border border-[#D2E3FC] px-2.5 py-1 rounded-lg">
                  <Sparkles className="w-3.5 h-3.5 text-[#1A73E8]" />
                  <span>{active.stageMetric}</span>
                </span>
              </div>
            </div>

            {/* Right Side: Animated Video-like Interactive Motion Graphic (Span 5) */}
            <div className="md:col-span-5 bg-slate-900 rounded-2xl p-5 text-white shadow-inner border border-slate-800 relative overflow-hidden flex flex-col justify-between min-h-[140px]">
              
              {/* Top status indicator */}
              <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-2.5 mb-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></div>
                  <span className="font-mono text-[11px] text-slate-300">STAGE SIMULATION</span>
                </div>
                <span className="font-mono text-xs text-blue-400 font-bold">
                  {active.stepNumber} of 04
                </span>
              </div>

              {/* Dynamic Animated Graphic per Step */}
              <div className="py-2">
                {selectedStep === 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Doorstep Collection</span>
                      <span className="text-emerald-400 font-mono">Assigned</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-[#1A73E8] h-full w-3/4 animate-pulse"></div>
                    </div>
                    <p className="text-[11px] text-slate-400 flex items-center gap-1.5 pt-1">
                      <Package className="w-3.5 h-3.5 text-blue-400" />
                      <span>Consignment manifest generated & driver en route</span>
                    </p>
                  </div>
                )}

                {selectedStep === 1 && (
                  <div className="space-y-2 relative">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Barcode Scanning & Weighing</span>
                      <span className="text-blue-400 font-mono">Scanning...</span>
                    </div>
                    <div className="relative bg-slate-800/90 h-8 rounded-lg border border-slate-700 flex items-center px-3 overflow-hidden">
                      <span className="font-mono text-xs text-blue-300">AWB-JHN-84920-IN</span>
                      <div className="absolute inset-x-0 h-0.5 bg-red-500 shadow-sm shadow-red-500 animate-scan-beam"></div>
                    </div>
                    <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
                      <Scan className="w-3.5 h-3.5 text-amber-400" />
                      <span>Volumetric check · Weather-proof packaging applied</span>
                    </p>
                  </div>
                )}

                {selectedStep === 2 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Highway Line-haul Radar</span>
                      <span className="text-emerald-400 font-mono">In Transit</span>
                    </div>
                    <div className="flex items-center gap-2 bg-slate-800/80 p-2 rounded-lg border border-slate-700">
                      <div className="w-6 h-6 rounded-full bg-[#1A73E8]/30 flex items-center justify-center relative">
                        <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                        <div className="absolute inset-0 rounded-full border border-blue-400 animate-ping opacity-75"></div>
                      </div>
                      <div className="flex-1 text-[11px] font-mono text-slate-300">
                        Delhi NCR Hub → Ambala Tollway
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5 text-blue-400" />
                      <span>Next milestone checkpoint: 45 km</span>
                    </p>
                  </div>
                )}

                {selectedStep === 3 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Final Handover</span>
                      <span className="text-emerald-400 font-mono">Completed</span>
                    </div>
                    <div className="flex items-center justify-between bg-emerald-950/40 border border-emerald-600/40 p-2 rounded-lg text-xs">
                      <span className="text-emerald-300 font-medium">Consignee Signature Verified</span>
                      <Check className="w-4 h-4 text-emerald-400" />
                    </div>
                    <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
                      <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Instant digital POD receipt sent to sender</span>
                    </p>
                  </div>
                )}
              </div>

              {/* Step indicator progress bar */}
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                <span>Auto-playing process walkthrough</span>
                <span className="font-mono text-blue-400">{Math.round(progress)}%</span>
              </div>
            </div>

          </div>
        </div>

        {/* ============================================================ */}
        {/* BOTTOM ACTION BUTTON: "Get a quote" (matching reference)    */}
        {/* ============================================================ */}
        <div className="text-center">
          <button
            onClick={() => onNavigate('/get-a-quote')}
            className="inline-flex items-center justify-center gap-2.5 px-8 min-h-[50px] bg-[#1A73E8] hover:bg-[#1557B0] active:bg-[#174EA6] text-white font-semibold text-base rounded-full shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer focus-visible:ring-4 focus-visible:ring-[#D2E3FC] focus:outline-none"
          >
            <span>Get a quote</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
