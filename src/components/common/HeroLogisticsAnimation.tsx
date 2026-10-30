import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Truck, Plane, Anchor, CheckCircle2, RotateCcw } from 'lucide-react';

interface HeroLogisticsAnimationProps {
  className?: string;
}

type JourneyPhase = 'loading' | 'departure' | 'transit' | 'delivery' | 'reset';

export const HeroLogisticsAnimation: React.FC<HeroLogisticsAnimationProps> = ({ className = '' }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [phase, setPhase] = useState<JourneyPhase>('loading');
  const [progress, setProgress] = useState<number>(0); // 0 to 1
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const pausedTimeRef = useRef<number>(0);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);

  const CYCLE_DURATION = 15000; // 15 seconds full cycle

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    if (mediaQuery.matches) {
      setIsPlaying(false);
    }

    const handler = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
      if (e.matches) setIsPlaying(false);
    };
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // IntersectionObserver to pause when hero is scrolled off-screen
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            setIsPlaying(false);
          } else if (!isReducedMotion) {
            setIsPlaying(true);
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [isReducedMotion]);

  // Tab visibility change
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        setIsPlaying(false);
      } else if (!isReducedMotion) {
        setIsPlaying(true);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [isReducedMotion]);

  // Animation Loop Clock
  useEffect(() => {
    if (!isPlaying || isReducedMotion) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      return;
    }

    const loop = () => {
      const now = Date.now();
      const elapsed = (now - startTimeRef.current) % CYCLE_DURATION;
      const p = elapsed / CYCLE_DURATION;
      setProgress(p);

      // Determine phase from progress
      // 0 - 3.8s (0.00 - 0.25): loading
      // 3.8 - 5.8s (0.25 - 0.39): departure
      // 5.8 - 10.2s (0.39 - 0.68): transit
      // 10.2 - 13.2s (0.68 - 0.88): delivery
      // 13.2 - 15.0s (0.88 - 1.00): reset
      if (p < 0.25) {
        setPhase('loading');
      } else if (p < 0.39) {
        setPhase('departure');
      } else if (p < 0.68) {
        setPhase('transit');
      } else if (p < 0.88) {
        setPhase('delivery');
      } else {
        setPhase('reset');
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying, isReducedMotion]);

  const togglePlayback = () => {
    if (isPlaying) {
      setIsPlaying(false);
      pausedTimeRef.current = Date.now();
    } else {
      // Resume smoothly without jumping
      const pauseDuration = Date.now() - (pausedTimeRef.current || Date.now());
      startTimeRef.current += pauseDuration;
      setIsPlaying(true);
    }
  };

  // Scene Coordinates & Transform Calculations based on cycle time
  // Scene viewBox is 640 x 420
  // Warehouse is at x: 40 to 190. Truck bay parking is at x: 120.
  // Destination building is at x: 460 to 590. Dropoff spot is at x: 430.
  let truckX = 130;
  let truckDoorOpen = true;
  let parcel1Opacity = 1;
  let parcel1X = 75;
  let parcel1Y = 225;
  let parcel2Opacity = 1;
  let parcel2X = 90;
  let parcel2Y = 230;
  let parcelDeliveredX = 390;
  let parcelDeliveredOpacity = 0;
  let showDeliveredCheck = false;
  let sceneOpacity = 1;
  let roadDashesOffset = 0;
  let wheelRotation = 0;
  let truckBounce = 0;

  if (phase === 'loading') {
    // 0 to 0.25
    const phaseP = progress / 0.25; // 0 to 1
    truckX = 130;
    truckDoorOpen = true;
    showDeliveredCheck = false;
    parcelDeliveredOpacity = 0;

    // Box 1 moves into truck (0 to 0.5)
    if (phaseP < 0.5) {
      const b1 = phaseP / 0.5;
      parcel1X = 75 + b1 * 60;
      parcel1Y = 225 - b1 * 12;
      parcel1Opacity = b1 > 0.85 ? 1 - (b1 - 0.85) / 0.15 : 1;
    } else {
      parcel1Opacity = 0;
    }

    // Box 2 moves into truck (0.4 to 0.9)
    if (phaseP > 0.4 && phaseP < 0.9) {
      const b2 = (phaseP - 0.4) / 0.5;
      parcel2X = 90 + b2 * 45;
      parcel2Y = 230 - b2 * 10;
      parcel2Opacity = b2 > 0.85 ? 1 - (b2 - 0.85) / 0.15 : 1;
    } else if (phaseP >= 0.9) {
      parcel2Opacity = 0;
    }
  } else if (phase === 'departure') {
    // 0.25 to 0.39 (2 seconds)
    const phaseP = (progress - 0.25) / 0.14; // 0 to 1
    truckDoorOpen = phaseP < 0.25;
    parcel1Opacity = 0;
    parcel2Opacity = 0;
    showDeliveredCheck = false;
    parcelDeliveredOpacity = 0;

    // Truck accelerates out of warehouse
    if (phaseP > 0.3) {
      const moveP = (phaseP - 0.3) / 0.7;
      truckX = 130 + moveP * 80;
      wheelRotation = moveP * 720;
      truckBounce = Math.sin(moveP * 20) * 1.5;
    }
  } else if (phase === 'transit') {
    // 0.39 to 0.68 (4.4 seconds)
    const phaseP = (progress - 0.39) / 0.29; // 0 to 1
    truckDoorOpen = false;
    parcel1Opacity = 0;
    parcel2Opacity = 0;
    showDeliveredCheck = false;
    parcelDeliveredOpacity = 0;

    // Truck moves steadily along highway towards destination
    truckX = 210 + phaseP * 160;
    roadDashesOffset = phaseP * 300;
    wheelRotation = phaseP * 2160;
    truckBounce = Math.sin(phaseP * 35) * 1.8;
  } else if (phase === 'delivery') {
    // 0.68 to 0.88 (3 seconds)
    const phaseP = (progress - 0.68) / 0.20; // 0 to 1
    truckX = 370 + Math.min(phaseP * 2, 1) * 20; // decelerates and stops at x = 390
    truckDoorOpen = phaseP > 0.2;
    parcel1Opacity = 0;
    parcel2Opacity = 0;

    // Delivered parcel appears and moves onto receiving table
    if (phaseP > 0.25) {
      const delP = Math.min(1, (phaseP - 0.25) / 0.45);
      parcelDeliveredOpacity = Math.min(1, delP * 2);
      parcelDeliveredX = 390 + delP * 85;
    }

    // Checkmark appears after parcel is placed
    if (phaseP > 0.7) {
      showDeliveredCheck = true;
    }
  } else if (phase === 'reset') {
    // 0.88 to 1.0 (1.8 seconds)
    const phaseP = (progress - 0.88) / 0.12; // 0 to 1
    truckX = 390;
    showDeliveredCheck = true;
    parcelDeliveredOpacity = 1 - phaseP;

    // Gentle crossfade for seamless loop reset
    if (phaseP > 0.6) {
      sceneOpacity = 1 - (phaseP - 0.6) / 0.4;
    }
  }

  // Phase caption text
  const getPhaseCaption = () => {
    switch (phase) {
      case 'loading':
        return 'Carefully loaded at Maya Puri hub';
      case 'departure':
        return 'Departing on scheduled line-haul route';
      case 'transit':
        return 'On the move across North India corridor';
      case 'delivery':
        return 'Delivered with care & recipient sign-off';
      case 'reset':
        return 'Consignment completed · Next shipment ready';
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[290px] sm:h-[380px] lg:h-[460px] rounded-3xl overflow-hidden border border-[#D2E3FC] bg-gradient-to-b from-[#EDF5FE] via-[#F7FAFE] to-[#E8F2FC] shadow-sm select-none ${className}`}
      aria-label="Animated illustration of a freight shipment journey from warehouse loading to doorstep delivery"
    >
      {/* Top Floating Badge: Road · Air · Ocean */}
      <div 
        className="absolute top-4 right-4 sm:top-5 sm:right-5 z-20 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-xs border border-[#D2E3FC] flex items-center gap-2 text-xs font-semibold text-slate-700"
        aria-hidden="true"
      >
        <span className="flex items-center gap-1.5 text-slate-700">
          <Truck className="w-3.5 h-3.5 text-[#1A73E8]" />
          <span>Road</span>
        </span>
        <span className="text-slate-300">·</span>
        <span className="flex items-center gap-1.5 text-slate-700">
          <Plane className="w-3.5 h-3.5 text-[#1A73E8]" />
          <span>Air</span>
        </span>
        <span className="text-slate-300">·</span>
        <span className="flex items-center gap-1.5 text-slate-700">
          <Anchor className="w-3.5 h-3.5 text-[#1A73E8]" />
          <span>Ocean</span>
        </span>
      </div>

      {/* SVG Canvas (640 x 420 viewBox) */}
      <div 
        className="w-full h-full transition-opacity duration-300"
        style={{ opacity: sceneOpacity }}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 640 420"
          className="w-full h-full object-cover"
          preserveAspectRatio="xMidYMid meet"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="280" gradientUnits="userSpaceOnUse">
              <stop stopColor="#EBF3FD" />
              <stop offset="0.7" stopColor="#F5F9FE" />
              <stop offset="1" stopColor="#E2EEFC" />
            </linearGradient>

            <linearGradient id="groundGrad" x1="0" y1="260" x2="0" y2="420" gradientUnits="userSpaceOnUse">
              <stop stopColor="#E2E8F0" />
              <stop offset="0.2" stopColor="#EDF2F7" />
              <stop offset="1" stopColor="#E2E8F0" />
            </linearGradient>

            <linearGradient id="roadGrad" x1="0" y1="280" x2="0" y2="350" gradientUnits="userSpaceOnUse">
              <stop stopColor="#334155" />
              <stop offset="0.5" stopColor="#1E293B" />
              <stop offset="1" stopColor="#0F172A" />
            </linearGradient>

            <linearGradient id="warehouseWall" x1="40" y1="120" x2="180" y2="280" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFFFF" />
              <stop offset="1" stopColor="#E6EEF8" />
            </linearGradient>

            <linearGradient id="truckCab" x1="0" y1="0" x2="60" y2="70" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFFFF" />
              <stop offset="1" stopColor="#E2E8F0" />
            </linearGradient>

            <linearGradient id="truckContainer" x1="0" y1="0" x2="0" y2="80" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFFFF" />
              <stop offset="1" stopColor="#F1F5F9" />
            </linearGradient>

            {/* Filter soft shadow */}
            <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#0F172A" floodOpacity="0.12" />
            </filter>
            <filter id="truckShadow" x="-10%" y="-10%" width="120%" height="140%">
              <feDropShadow dx="0" dy="8" stdDeviation="5" floodColor="#0F172A" floodOpacity="0.18" />
            </filter>
          </defs>

          {/* 1. Backdrop Hills & Soft Clouds */}
          <rect width="640" height="420" fill="url(#skyGrad)" />
          
          {/* Subtle rolling hills in background */}
          <path d="M0 240Q90 200 200 230T420 220T640 235V280H0V240Z" fill="#CBD5E1" opacity="0.35" />
          <path d="M-30 255Q120 225 260 250T540 235T660 255V280H-30V255Z" fill="#94A3B8" opacity="0.25" />

          {/* Gentle white fluffy clouds */}
          <g opacity="0.6">
            <ellipse cx="140" cy="70" rx="35" ry="12" fill="#FFFFFF" />
            <ellipse cx="160" cy="65" rx="25" ry="15" fill="#FFFFFF" />
            <ellipse cx="440" cy="90" rx="42" ry="14" fill="#FFFFFF" />
            <ellipse cx="465" cy="82" rx="28" ry="16" fill="#FFFFFF" />
          </g>

          {/* 2. Ground & Road Plane */}
          <rect y="260" width="640" height="160" fill="url(#groundGrad)" />

          {/* Asphalt Highway */}
          <rect y="280" width="640" height="74" fill="url(#roadGrad)" />
          {/* Road edge curbs */}
          <line x1="0" y1="280" x2="640" y2="280" stroke="#94A3B8" strokeWidth="2.5" />
          <line x1="0" y1="354" x2="640" y2="354" stroke="#94A3B8" strokeWidth="2.5" />

          {/* Animated Center Road Dashes */}
          <g>
            <line
              x1="0"
              y1="317"
              x2="640"
              y2="317"
              stroke="#FDE047"
              strokeWidth="3.5"
              strokeDasharray="28 20"
              strokeDashoffset={-roadDashesOffset}
            />
          </g>

          {/* Highway kilometer mile marker */}
          <g transform="translate(320, 255)">
            <rect x="0" y="0" width="16" height="24" rx="4" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1" />
            <rect x="0" y="0" width="16" height="8" rx="3" fill="#16A34A" />
            <text x="3" y="18" fill="#1E293B" fontSize="6.5" fontWeight="bold" fontFamily="sans-serif">NH</text>
            <text x="3" y="23" fill="#1E293B" fontSize="5.5" fontWeight="bold" fontFamily="sans-serif">44</text>
          </g>

          {/* 3. WAREHOUSE DEPOT (Left Side, x: 40 to 180) */}
          <g id="warehouse-depot" filter="url(#softShadow)">
            {/* Building base shadow */}
            <rect x="35" y="265" width="145" height="10" rx="4" fill="#94A3B8" opacity="0.4" />
            
            {/* Warehouse Main Structure */}
            <rect x="40" y="140" width="135" height="126" rx="6" fill="url(#warehouseWall)" stroke="#CBD5E1" strokeWidth="2" />
            
            {/* Architectural Modern Roof Overhang */}
            <path d="M35 140H180L175 130H30L35 140Z" fill="#1A73E8" />
            
            {/* Warehouse Header Signage */}
            <rect x="52" y="148" width="112" height="20" rx="3" fill="#0F172A" />
            <text x="58" y="162" fill="#FFFFFF" fontWeight="bold" fontSize="8.5" fontFamily="sans-serif" letterSpacing="0.8">
              MAYA PURI HUB · DEPOT
            </text>

            {/* Loading Bay Shutter Door */}
            <rect x="52" y="176" width="76" height="84" rx="3" fill="#334155" stroke="#475569" strokeWidth="1.5" />
            {/* Shutter horizontal slats */}
            <line x1="52" y1="188" x2="128" y2="188" stroke="#475569" strokeWidth="1" />
            <line x1="52" y1="200" x2="128" y2="200" stroke="#475569" strokeWidth="1" />
            <line x1="52" y1="212" x2="128" y2="212" stroke="#475569" strokeWidth="1" />
            <line x1="52" y1="224" x2="128" y2="224" stroke="#475569" strokeWidth="1" />
            <line x1="52" y1="236" x2="128" y2="236" stroke="#475569" strokeWidth="1" />
            <line x1="52" y1="248" x2="128" y2="248" stroke="#475569" strokeWidth="1" />

            {/* Warehouse Concrete Loading Dock Platform */}
            <rect x="48" y="254" width="84" height="14" rx="2" fill="#64748B" />
            {/* Safety hazard yellow/black stripes */}
            <rect x="48" y="264" width="84" height="4" fill="#FBBF24" />
            <path d="M54 268L58 264H62L58 268H54ZM66 268L70 264H74L70 268H66ZM78 268L82 264H86L82 268H78ZM90 268L94 264H98L94 268H90ZM102 268L106 264H110L106 268H102ZM114 268L118 264H122L118 268H114Z" fill="#0F172A" />

            {/* Warehouse Conveyor & Staged Parcels on Platform */}
            <rect x="65" y="240" width="55" height="14" rx="2" fill="#475569" />
            {/* Conveyor rollers */}
            <circle cx="72" cy="247" r="3" fill="#94A3B8" />
            <circle cx="82" cy="247" r="3" fill="#94A3B8" />
            <circle cx="92" cy="247" r="3" fill="#94A3B8" />
            <circle cx="102" cy="247" r="3" fill="#94A3B8" />
            <circle cx="112" cy="247" r="3" fill="#94A3B8" />
          </g>

          {/* Staged Cardboard Boxes (Loading action) */}
          {/* Parcel 1 (Animated into truck) */}
          <g 
            transform={`translate(${parcel1X}, ${parcel1Y})`} 
            opacity={parcel1Opacity}
            filter="url(#softShadow)"
          >
            <rect x="0" y="0" width="18" height="15" rx="1.5" fill="#D97706" stroke="#B45309" strokeWidth="1" />
            <line x1="9" y1="0" x2="9" y2="15" stroke="#B45309" strokeWidth="1" />
            <rect x="2" y="3" width="7" height="4" rx="0.5" fill="#FFFFFF" opacity="0.9" />
          </g>

          {/* Parcel 2 (Animated into truck) */}
          <g 
            transform={`translate(${parcel2X}, ${parcel2Y})`} 
            opacity={parcel2Opacity}
            filter="url(#softShadow)"
          >
            <rect x="0" y="0" width="20" height="17" rx="1.5" fill="#F59E0B" stroke="#D97706" strokeWidth="1" />
            <line x1="10" y1="0" x2="10" y2="17" stroke="#D97706" strokeWidth="1" />
            <rect x="3" y="4" width="8" height="5" rx="0.5" fill="#FFFFFF" opacity="0.9" />
          </g>

          {/* 4. DESTINATION RECEPTION (Right Side, x: 470 to 595) */}
          <g id="destination-office" filter="url(#softShadow)">
            <rect x="465" y="265" width="135" height="10" rx="4" fill="#94A3B8" opacity="0.4" />
            
            {/* Building facade */}
            <rect x="470" y="155" width="130" height="112" rx="6" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
            
            {/* Building Blue Roof parapet */}
            <path d="M465 155H605L600 148H470L465 155Z" fill="#0F172A" />
            
            {/* Building signage */}
            <rect x="485" y="163" width="95" height="16" rx="3" fill="#EEF2F6" stroke="#CBD5E1" strokeWidth="1" />
            <text x="495" y="174" fill="#1A73E8" fontWeight="bold" fontSize="7.5" fontFamily="sans-serif">
              CONSIGNEE DELIVERY POINT
            </text>

            {/* Glass Entrance Double Doors */}
            <rect x="525" y="195" width="45" height="70" rx="2" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.5" />
            <line x1="547" y1="195" x2="547" y2="265" stroke="#0284C7" strokeWidth="1" />
            {/* Door handles */}
            <rect x="543" y="230" width="2" height="10" rx="1" fill="#0369A1" />
            <rect x="550" y="230" width="2" height="10" rx="1" fill="#0369A1" />

            {/* Receiving Counter / Table on the left of door */}
            <rect x="480" y="235" width="40" height="30" rx="2" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1" />
            <rect x="477" y="232" width="46" height="4" rx="1" fill="#64748B" />

            {/* Delivery Confirmation Bell / Desk Check */}
            <circle cx="510" cy="226" r="4" fill="#10B981" />
          </g>

          {/* Delivered Parcel on Receiving Table */}
          <g 
            transform={`translate(${parcelDeliveredX}, 216)`} 
            opacity={parcelDeliveredOpacity}
            filter="url(#softShadow)"
          >
            <rect x="0" y="0" width="22" height="18" rx="2" fill="#D97706" stroke="#92400E" strokeWidth="1" />
            <line x1="11" y1="0" x2="11" y2="18" stroke="#92400E" strokeWidth="1" />
            <rect x="3" y="3" width="9" height="5" rx="1" fill="#FFFFFF" />
            <text x="4" y="7" fill="#1A73E8" fontSize="3" fontWeight="bold" fontFamily="sans-serif">JHN</text>
          </g>

          {/* Delivery Confirmed Badge Popup */}
          {showDeliveredCheck && (
            <g transform="translate(485, 192)" filter="url(#softShadow)">
              <rect x="0" y="0" width="56" height="18" rx="9" fill="#10B981" />
              <circle cx="9" cy="9" r="6" fill="#FFFFFF" />
              <path d="M6.5 9L8.5 11L12 7" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <text x="18" y="12.5" fill="#FFFFFF" fontWeight="bold" fontSize="7.5" fontFamily="sans-serif">
                Delivered
              </text>
            </g>
          )}

          {/* 5. JAHAN EXPRESS DELIVERY TRUCK (Focal Point) */}
          <g 
            transform={`translate(${truckX}, ${236 + truckBounce})`}
            filter="url(#truckShadow)"
          >
            {/* Ground Contact Shadow */}
            <ellipse cx="65" cy="84" rx="68" ry="7" fill="#0F172A" opacity="0.35" />

            {/* TRUCK CONTAINER (White Box with Blue Stripe & Logo) */}
            <rect x="0" y="10" width="96" height="64" rx="4" fill="url(#truckContainer)" stroke="#CBD5E1" strokeWidth="2" />
            
            {/* Royal Blue Signature Stripe */}
            <rect x="0" y="42" width="96" height="8" fill="#1A73E8" />
            
            {/* Jahan Express Brand on Container */}
            <g transform="translate(10, 28)">
              {/* Mini Wing Icon */}
              <path d="M0 6L6 2L12 6L6 9L0 6Z" fill="#1A73E8" />
              <text x="16" y="7" fill="#0F172A" fontWeight="bold" fontSize="7.5" fontFamily="sans-serif">
                JAHAN EXPRESS
              </text>
              <text x="16" y="13" fill="#64748B" fontWeight="600" fontSize="4.5" letterSpacing="0.5" fontFamily="sans-serif">
                NORTH INDIA NETWORK
              </text>
            </g>

            {/* Rear Cargo Door */}
            <rect x="0" y="12" width="6" height="60" fill="#94A3B8" stroke="#64748B" strokeWidth="1" />
            {truckDoorOpen ? (
              /* Open door flap */
              <path d="M0 12L-12 18L-12 66L0 72Z" fill="#475569" stroke="#334155" strokeWidth="1" />
            ) : (
              /* Closed door seam */
              <line x1="3" y1="12" x2="3" y2="72" stroke="#334155" strokeWidth="1" />
            )}

            {/* TRUCK CABIN */}
            {/* Cab main body */}
            <path d="M96 28H122L138 48L140 74H96V28Z" fill="url(#truckCab)" stroke="#CBD5E1" strokeWidth="2" />
            
            {/* Tinted Windshield */}
            <path d="M102 32H120L132 47H102V32Z" fill="#1E293B" opacity="0.85" />
            
            {/* Driver Silhouette */}
            <circle cx="112" cy="42" r="4" fill="#94A3B8" opacity="0.8" />
            
            {/* Headlights */}
            <rect x="137" y="58" width="3" height="7" rx="1.5" fill="#FEF08A" />
            {phase !== 'loading' && (
              /* Light Beam */
              <polygon points="140,58 175,50 175,76 140,65" fill="#FEF08A" opacity="0.25" />
            )}

            {/* Side Mirror */}
            <rect x="106" y="42" width="3" height="6" rx="1" fill="#334155" />

            {/* Front Chrome Bumper */}
            <rect x="134" y="66" width="7" height="8" rx="2" fill="#94A3B8" stroke="#64748B" strokeWidth="1" />

            {/* WHEELS (Rotating with rotation angle) */}
            {/* Rear Wheel 1 */}
            <g transform={`translate(24, 74) rotate(${wheelRotation})`}>
              <circle cx="0" cy="0" r="11" fill="#0F172A" />
              <circle cx="0" cy="0" r="6" fill="#94A3B8" />
              <line x1="-5" y1="0" x2="5" y2="0" stroke="#CBD5E1" strokeWidth="1.5" />
              <line x1="0" y1="-5" x2="0" y2="5" stroke="#CBD5E1" strokeWidth="1.5" />
            </g>

            {/* Rear Wheel 2 */}
            <g transform={`translate(68, 74) rotate(${wheelRotation})`}>
              <circle cx="0" cy="0" r="11" fill="#0F172A" />
              <circle cx="0" cy="0" r="6" fill="#94A3B8" />
              <line x1="-5" y1="0" x2="5" y2="0" stroke="#CBD5E1" strokeWidth="1.5" />
              <line x1="0" y1="-5" x2="0" y2="5" stroke="#CBD5E1" strokeWidth="1.5" />
            </g>

            {/* Front Wheel */}
            <g transform={`translate(118, 74) rotate(${wheelRotation})`}>
              <circle cx="0" cy="0" r="11" fill="#0F172A" />
              <circle cx="0" cy="0" r="6" fill="#94A3B8" />
              <line x1="-5" y1="0" x2="5" y2="0" stroke="#CBD5E1" strokeWidth="1.5" />
              <line x1="0" y1="-5" x2="0" y2="5" stroke="#CBD5E1" strokeWidth="1.5" />
            </g>
          </g>

          {/* Roadside Foliage / Clean Isometric Accent Tree */}
          <g transform="translate(245, 245)">
            <rect x="4" y="16" width="3" height="12" fill="#78350F" />
            <circle cx="5.5" cy="12" r="10" fill="#10B981" opacity="0.8" />
            <circle cx="7" cy="8" r="8" fill="#059669" />
          </g>
          <g transform="translate(435, 248)">
            <rect x="3" y="14" width="2.5" height="10" fill="#78350F" />
            <circle cx="4" cy="10" r="8" fill="#10B981" opacity="0.8" />
          </g>
        </svg>
      </div>

      {/* Bottom Scene Status & Playback Controls Bar */}
      <div className="absolute bottom-3.5 left-4 right-4 sm:bottom-4 sm:left-5 sm:right-5 z-20 flex items-center justify-between pointer-events-auto">
        
        {/* Dynamic HTML Caption Pill */}
        <div className="bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-xs border border-[#D2E3FC] flex items-center gap-2 text-xs text-slate-700">
          <span className="w-2 h-2 rounded-full bg-[#1A73E8] animate-pulse"></span>
          <span className="font-semibold text-slate-900">{getPhaseCaption()}</span>
        </div>

        {/* Accessible Play/Pause Control Button */}
        <button
          onClick={togglePlayback}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white/95 hover:bg-[#F0F6FF] text-slate-700 text-xs font-semibold rounded-full shadow-xs border border-[#D2E3FC] transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1A73E8]"
          aria-label={isPlaying ? 'Pause logistics animation' : 'Play logistics animation'}
          title={isPlaying ? 'Pause animation' : 'Play animation'}
        >
          {isPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5 text-[#1A73E8] fill-[#1A73E8]" />
              <span className="hidden sm:inline">Pause</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 text-[#1A73E8] fill-[#1A73E8]" />
              <span className="hidden sm:inline">Play</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
