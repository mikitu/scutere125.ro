'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageGalleryProps {
  images: string[];
  alt: string;
  mainImage?: string;
}

export function ImageGallery({ images, alt, mainImage }: ImageGalleryProps) {
  // Combine main image with gallery images
  const allImages = mainImage ? [mainImage, ...images] : images;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const currentImage = allImages[selectedIndex];

  const goToPrevious = useCallback(() => {
    setSelectedIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  }, [allImages.length]);

  const goToNext = useCallback(() => {
    setSelectedIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  }, [allImages.length]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') goToPrevious();
    if (e.key === 'ArrowRight') goToNext();
    if (e.key === 'Escape') setIsLightboxOpen(false);
  }, [goToPrevious, goToNext]);

  return (
    <>
      {/* Main image */}
      <div 
        className="relative aspect-[4/3] bg-gradient-to-br from-white/5 to-transparent rounded-2xl overflow-hidden cursor-pointer group"
        onClick={() => setIsLightboxOpen(true)}
      >
        <motion.div
          key={selectedIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0"
        >
          <Image
            src={currentImage}
            alt={alt}
            fill
            className="object-contain p-4"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </motion.div>
        
        {/* Fullscreen overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/20 backdrop-blur-sm rounded-full p-4"
          >
            <Maximize2 className="w-8 h-8 text-white" />
          </motion.div>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-3 mt-4">
        {allImages.slice(0, 4).map((img, i) => (
          <motion.button
            key={i}
            onClick={() => setSelectedIndex(i)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "relative aspect-4/3 rounded-xl overflow-hidden border-2 transition-all duration-300",
              selectedIndex === i 
                ? "border-primary ring-2 ring-primary/30" 
                : "border-white/10 hover:border-white/30"
            )}
          >
            <Image
              src={img}
              alt={`${alt} - imagine ${i + 1}`}
              fill
              className="object-contain p-1 bg-white/5"
              sizes="100px"
            />
          </motion.button>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={() => setIsLightboxOpen(false)}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            {/* Close button */}
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Navigation arrows */}
            <button
              onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
              className="absolute left-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="w-8 h-8 text-white" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); goToNext(); }}
              className="absolute right-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="w-8 h-8 text-white" />
            </button>

            {/* Main image in lightbox */}
            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="relative w-full h-full max-w-5xl max-h-[80vh] mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={currentImage}
                alt={alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </motion.div>

            {/* Thumbnails in lightbox */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {allImages.map((img, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setSelectedIndex(i); }}
                  className={cn(
                    "w-16 h-12 relative rounded-lg overflow-hidden border-2 transition-all",
                    selectedIndex === i ? "border-primary" : "border-white/20 hover:border-white/50"
                  )}
                >
                  <Image src={img} alt="" fill className="object-contain bg-white/10" sizes="64px" />
                </button>
              ))}
            </div>

            {/* Image counter */}
            <div className="absolute top-4 left-4 text-white/60 text-sm">
              {selectedIndex + 1} / {allImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

