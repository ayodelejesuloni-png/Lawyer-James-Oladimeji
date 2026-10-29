import React, { useState } from 'react';
import { FIRM_LOGO, FIRM_SHORT_NAME } from '../data/legalData';
import { Scale } from 'lucide-react';

interface FirmLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showText?: boolean;
  className?: string;
  subtext?: string;
  variant?: 'circular' | 'rounded';
}

export const FirmLogo: React.FC<FirmLogoProps> = ({
  size = 'md',
  showText = false,
  className = '',
  subtext,
  variant = 'circular',
}) => {
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    sm: 'w-9 h-9',
    md: 'w-11 h-11',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
    '2xl': 'w-32 h-32',
  };

  const shapeClass = variant === 'circular' ? 'rounded-full' : 'rounded-2xl';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`relative ${sizeClasses[size]} shrink-0 ${shapeClass} overflow-hidden border-2 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.25)] bg-[#070e1b] flex items-center justify-center transition-transform group-hover:scale-105`}>
        {!imageError ? (
          <img
            src={FIRM_LOGO}
            alt={`${FIRM_SHORT_NAME} Crest`}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center"
          />
        ) : (
          /* SVG Fallback with Gold, White and Royal Blue */
          <div className="w-full h-full bg-[#0B172D] flex items-center justify-center text-amber-400">
            <Scale className="w-1/2 h-1/2 text-amber-400" />
          </div>
        )}
      </div>

      {showText && (
        <div className="flex flex-col text-left">
          <span className="font-serif-heading text-lg sm:text-xl font-bold tracking-tight text-white whitespace-nowrap">
            {FIRM_SHORT_NAME}
          </span>
          <span className="text-[11px] text-amber-400/90 tracking-wider uppercase font-semibold whitespace-nowrap">
            {subtext || 'Barristers & Solicitors · Ogun & Lagos'}
          </span>
        </div>
      )}
    </div>
  );
};
