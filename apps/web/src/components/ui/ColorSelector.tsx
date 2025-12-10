'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ScooterColor } from '@/data/scooters';

interface ColorSelectorProps {
  colors: ScooterColor[];
  onColorChange?: (color: ScooterColor) => void;
  className?: string;
}

export function ColorSelector({ colors, onColorChange, className = '' }: ColorSelectorProps) {
  const [selectedColor, setSelectedColor] = useState<ScooterColor>(colors[0]);

  const handleColorSelect = (color: ScooterColor) => {
    setSelectedColor(color);
    onColorChange?.(color);
  };

  if (!colors || colors.length === 0) {
    return null;
  }

  return (
    <div className={`${className}`}>
      <h3 className="text-lg font-semibold text-white mb-4">
        Culori disponibile
      </h3>
      
      <div className="flex flex-wrap gap-4">
        {colors.map((color) => {
          const isSelected = selectedColor.id === color.id;
          
          return (
            <motion.button
              key={color.id}
              onClick={() => handleColorSelect(color)}
              className="flex flex-col items-center gap-2 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Color avatar with image or hex color */}
              <div
                className={`relative w-16 h-16 rounded-full overflow-hidden border-2 transition-all ${
                  isSelected
                    ? 'border-primary shadow-lg shadow-primary/50'
                    : 'border-white/20 group-hover:border-white/40'
                }`}
              >
                {color.listingImage ? (
                  <Image
                    src={color.listingImage}
                    alt={color.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                ) : color.hex ? (
                  <div
                    className="w-full h-full"
                    style={{ backgroundColor: color.hex }}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-white/10 to-white/5" />
                )}
                
                {/* Selected indicator */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute inset-0 flex items-center justify-center bg-primary/20"
                  >
                    <div className="w-3 h-3 rounded-full bg-primary border-2 border-white" />
                  </motion.div>
                )}
              </div>
              
              {/* Color name */}
              <span
                className={`text-xs text-center max-w-[80px] transition-colors ${
                  isSelected ? 'text-white font-semibold' : 'text-white/60 group-hover:text-white/80'
                }`}
              >
                {color.name}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

