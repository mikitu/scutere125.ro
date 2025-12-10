'use client';

import Image from 'next/image';
import { ScooterColor } from '@/data/scooters';

interface ColorIndicatorProps {
  colors: ScooterColor[];
  maxDisplay?: number;
  className?: string;
}

export function ColorIndicator({ colors, maxDisplay = 4, className = '' }: ColorIndicatorProps) {
  if (!colors || colors.length === 0) {
    return null;
  }

  const displayColors = colors.slice(0, maxDisplay);
  const remainingCount = colors.length - maxDisplay;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-xs text-white/40 uppercase">Culori:</span>
      <div className="flex items-center gap-1.5">
        {displayColors.map((color) => (
          <div
            key={color.id}
            className="relative w-8 h-8 rounded-full overflow-hidden border border-white/20 hover:border-white/40 transition-all"
            title={color.name}
          >
            {color.listingImage ? (
              <Image
                src={color.listingImage}
                alt={color.name}
                fill
                className="object-cover"
                sizes="32px"
              />
            ) : color.hex ? (
              <div
                className="w-full h-full"
                style={{ backgroundColor: color.hex }}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-white/10 to-white/5" />
            )}
          </div>
        ))}
        
        {remainingCount > 0 && (
          <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
            <span className="text-xs text-white/60 font-semibold">+{remainingCount}</span>
          </div>
        )}
      </div>
    </div>
  );
}

