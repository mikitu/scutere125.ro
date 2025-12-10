'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import Image from 'next/image';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageGalleryProps {
  images: string[];
  alt: string;
  mainImage?: string;
}

export function ImageGallery({ images, alt, mainImage }: ImageGalleryProps) {
  // Only show gallery images (mainImage is displayed separately)
  const galleryImages = images;
  const displayImage = mainImage || (images.length > 0 ? images[0] : '');

  // For lightbox, combine main image with gallery
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

  // Handle swipe gestures
  const handleDragEnd = useCallback((event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.x > swipeThreshold) {
      goToPrevious();
    } else if (info.offset.x < -swipeThreshold) {
      goToNext();
    }
  }, [goToPrevious, goToNext]);

  // Handle keyboard navigation globally when lightbox is open
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'Escape') setIsLightboxOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, goToPrevious, goToNext]);

  return (
    <>
      {/* Main image */}
      <div
        className="relative aspect-4/3 bg-linear-to-br from-white/5 to-transparent rounded-2xl overflow-hidden cursor-pointer group"
        onClick={() => setIsLightboxOpen(true)}
      >
        <Image
          src={displayImage}
          alt={alt}
          fill
          className="object-contain p-4"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />

        {/* Fullscreen overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/20 backdrop-blur-sm rounded-full p-4">
            <Maximize2 className="w-8 h-8 text-white" />
          </div>
        </div>
      </div>

      {/* Gallery thumbnails - only show if there are gallery images */}
      {galleryImages.length > 0 && (
        <div className="grid grid-cols-4 gap-3 mt-4">
          {galleryImages.map((img, i) => (
            <motion.button
              key={i}
              onClick={() => {
                // Set to index + 1 because mainImage is at index 0 in allImages
                setSelectedIndex(mainImage ? i + 1 : i);
                setIsLightboxOpen(true);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative aspect-4/3 rounded-xl overflow-hidden border-2 border-white/10 hover:border-white/30 transition-all duration-300"
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
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={() => setIsLightboxOpen(false)}
          >
            {/* Close button */}
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Navigation arrows - hide on mobile */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
                  className="absolute left-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors hidden md:flex"
                >
                  <ChevronLeft className="w-8 h-8 text-white" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); goToNext(); }}
                  className="absolute right-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors hidden md:flex"
                >
                  <ChevronRight className="w-8 h-8 text-white" />
                </button>
              </>
            )}

            {/* Main image in lightbox with swipe support */}
            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              drag={allImages.length > 1 ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              className="relative w-full h-full max-w-5xl max-h-[80vh] mx-4 cursor-grab active:cursor-grabbing"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={currentImage}
                alt={alt}
                fill
                className="object-contain pointer-events-none"
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

