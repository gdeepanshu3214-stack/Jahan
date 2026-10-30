import React from 'react';

interface LogoProps {
  className?: string;
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className = '', showTagline = true, size = 'md' }) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11'
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  const taglineSizes = {
    sm: 'text-[9px] tracking-wider',
    md: 'text-[10px] tracking-widest',
    lg: 'text-xs tracking-widest'
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Approved Dynamic Wing / Forward Logistics Mark */}
      <div className={`${iconSizes[size]} flex-shrink-0 relative flex items-center justify-center`}>
        <svg
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-blue-600 transition-transform duration-200 hover:scale-105"
        >
          <path
            d="M6 17L22 7L38 17L22 27L6 17Z"
            fill="#1A73E8"
          />
          <path
            d="M6 25L22 35L38 25"
            stroke="#1557B0"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13 14L29 24L37 19"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Typography Lockup */}
      <div className="flex flex-col">
        <div className={`font-bold ${textSizes[size]} leading-none tracking-tight text-slate-900 flex items-baseline gap-1.5`}>
          <span className="text-blue-600">JAHAN</span>
          <span className="font-semibold text-slate-800">EXPRESS</span>
        </div>
        {showTagline && (
          <span className={`text-slate-500 font-medium ${taglineSizes[size]} uppercase mt-1 hidden sm:block`}>
            Connecting India to a Wider World
          </span>
        )}
      </div>
    </div>
  );
};
