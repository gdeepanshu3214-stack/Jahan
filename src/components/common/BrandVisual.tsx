import React, { useState } from 'react';
import { PHOTO_ASSETS } from '../../config/assets';
import { Truck, Plane, Anchor } from 'lucide-react';

export type BrandVisualType =
  | 'hero'
  | 'road'
  | 'air'
  | 'ocean'
  | 'student'
  | 'ladakh'
  | 'north-india'
  | 'port-blair'
  | 'warehouse';

interface BrandVisualProps {
  type: BrandVisualType;
  className?: string;
  alt?: string;
  priority?: boolean;
}

const VISUAL_CONFIG: Record<
  BrandVisualType,
  {
    src: string;
    alt: string;
    label?: string;
    aspectRatio?: string;
  }
> = {
  hero: {
    src: PHOTO_ASSETS.hero,
    alt: 'Commercial freight truck and cargo airplane on tarmac during loading operations',
  },
  road: {
    src: PHOTO_ASSETS.roadFreight,
    alt: 'White commercial freight truck traveling along mountain highway',
    label: 'Domestic surface freight',
  },
  air: {
    src: PHOTO_ASSETS.airFreight,
    alt: 'Air cargo plane on tarmac with ground handling and freight pallets',
    label: 'Express air connectivity',
  },
  ocean: {
    src: PHOTO_ASSETS.oceanFreight,
    alt: 'International container ship sailing on calm ocean waters',
    label: 'International maritime cargo',
  },
  student: {
    src: PHOTO_ASSETS.studentExpress,
    alt: 'Student carefully packing books into a sturdy shipping carton in dorm',
    label: 'Hostel and student moves',
  },
  ladakh: {
    src: PHOTO_ASSETS.lehLadakh,
    alt: 'Snow-capped mountain range and hillside monastery in Leh Ladakh',
    label: 'High-altitude mountain zone',
  },
  'north-india': {
    src: PHOTO_ASSETS.roadFreight,
    alt: 'Highway route through northern mountain foothills',
    label: 'Core line-haul network',
  },
  'port-blair': {
    src: PHOTO_ASSETS.portBlair,
    alt: 'Tropical coastline and turquoise sea in Andaman Islands',
    label: 'Island freight gateway',
  },
  warehouse: {
    src: PHOTO_ASSETS.warehouseOperations,
    alt: 'Modern logistics warehouse with high-bay shelving and organized cargo pallets',
    label: 'Operational transit hub',
  },
};

export const BrandVisual: React.FC<BrandVisualProps> = ({
  type,
  className = '',
  alt,
  priority = false,
}) => {
  const [hasError, setHasError] = useState(false);
  const config = VISUAL_CONFIG[type] || VISUAL_CONFIG.hero;
  const imageAlt = alt || config.alt;

  if (hasError) {
    // Elegant fallback container
    return (
      <div
        className={`w-full h-full min-h-[160px] bg-slate-100 flex flex-col items-center justify-center p-6 text-center text-slate-500 border border-slate-200 ${className}`}
        role="img"
        aria-label={imageAlt}
      >
        <span className="text-xs font-medium text-slate-600">{config.label || 'Logistics visual'}</span>
        <span className="text-[11px] text-slate-400 mt-1">{imageAlt}</span>
      </div>
    );
  }

  // Hero visual special layout with top badge
  if (type === 'hero') {
    return (
      <div className={`relative w-full h-[320px] sm:h-[400px] lg:h-[480px] rounded-3xl overflow-hidden shadow-sm border border-slate-200/90 bg-slate-100 ${className}`}>
        <img
          src={config.src}
          alt={imageAlt}
          className="w-full h-full object-cover object-center"
          loading={priority ? 'eager' : 'lazy'}
          referrerPolicy="no-referrer"
          onError={() => setHasError(true)}
        />

        {/* Floating Mode Indicator Badge (Road · Air · Ocean) from Desktop Design */}
        <div className="absolute top-4 right-4 sm:top-5 sm:right-5 bg-white/95 backdrop-blur-md px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-xs border border-slate-200/80 flex items-center gap-2 sm:gap-2.5 text-xs font-medium text-slate-700 select-none">
          <span className="flex items-center gap-1.5 text-slate-700">
            <Truck className="w-3.5 h-3.5 text-blue-600" />
            <span>Road</span>
          </span>
          <span className="text-slate-300">·</span>
          <span className="flex items-center gap-1.5 text-slate-700">
            <Plane className="w-3.5 h-3.5 text-blue-600" />
            <span>Air</span>
          </span>
          <span className="text-slate-300">·</span>
          <span className="flex items-center gap-1.5 text-slate-700">
            <Anchor className="w-3.5 h-3.5 text-blue-600" />
            <span>Ocean</span>
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full overflow-hidden bg-slate-100 ${className}`}>
      <img
        src={config.src}
        alt={imageAlt}
        className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.02]"
        loading={priority ? 'eager' : 'lazy'}
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
      />
    </div>
  );
};
