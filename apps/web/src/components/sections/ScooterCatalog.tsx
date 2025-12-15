'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Fuel, Gauge, Weight, Check, LayoutGrid, LayoutList } from 'lucide-react';
import { Scooter, ScooterColor } from '@/data/scooters';
import { formatPrice } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ColorIndicator } from '@/components/ui/ColorIndicator';

type ViewMode = 'list' | 'grid';

interface Category {
  id: number;
  name: string;
  slug: string;
  displayName: string;
  icon?: string;
  order: number;
}

interface ScooterCatalogProps {
  scooters: Scooter[];
  categories: Category[];
}

// Grid view card component (similar to homepage)
function ScooterGridCard({ scooter, index }: { scooter: Scooter; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
    >
      <Card className="h-full flex flex-col overflow-hidden group">
        {/* Image container - landscape aspect ratio */}
        <div className="relative aspect-[16/10] bg-gradient-to-br from-white/5 to-transparent overflow-hidden">
          {scooter.badge && (
            <div className="absolute top-4 left-4 z-10">
              <Badge variant={scooter.category === 'premium' ? 'accent' : scooter.category === 'sport' ? 'primary' : 'success'}>
                {scooter.badge}
              </Badge>
            </div>
          )}
          <motion.div
            className="absolute inset-0"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={scooter.listingImage}
              alt={scooter.name}
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </motion.div>
          {/* Glow effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          <div className="mb-4">
            <p className="text-primary text-sm font-medium mb-1">{scooter.tagline}</p>
            <h3 className="text-2xl font-bold text-white mb-2">{scooter.name}</h3>
            <p className="text-white/60 text-sm line-clamp-2">{scooter.description}</p>
          </div>

          {/* Quick specs */}
          <div className="grid grid-cols-3 gap-4 py-4 border-y border-white/10 mb-4">
            <div className="text-center">
              <Gauge className="w-4 h-4 text-primary mx-auto mb-1" />
              <p className="text-xs text-white/40">Putere</p>
              <p className="text-sm text-white font-medium">{scooter.specs.power}</p>
            </div>
            <div className="text-center">
              <Fuel className="w-4 h-4 text-primary mx-auto mb-1" />
              <p className="text-xs text-white/40">Consum</p>
              <p className="text-sm text-white font-medium">{scooter.specs.consumption}</p>
            </div>
            <div className="text-center">
              <Weight className="w-4 h-4 text-primary mx-auto mb-1" />
              <p className="text-xs text-white/40">Greutate</p>
              <p className="text-sm text-white font-medium">{scooter.specs.weight}</p>
            </div>
          </div>

          {/* Price and CTA */}
          <div className="mt-auto flex items-center justify-between">
            <div>
              <p className="text-xs text-white/40">de la</p>
              <p className="text-2xl font-bold text-white">
                {formatPrice(scooter.price)}
              </p>
            </div>
            <Link href={`/scutere-125/${scooter.slug}`}>
              <Button variant="primary" size="sm">
                Detalii <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

// List view card component (current design)
function ScooterCard({ scooter, index }: { scooter: Scooter; index: number }) {
  const [selectedColor, setSelectedColor] = useState<ScooterColor | null>(
    scooter.colors && scooter.colors.length > 0 ? scooter.colors[0] : null
  );

  // Use color-specific listing image if a color is selected, otherwise use default
  const displayListingImage = selectedColor?.listingImage || scooter.listingImage;

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
    >
      <Card className="overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Image side */}
          <div className="relative h-80 lg:h-auto bg-linear-to-br from-white/5 to-transparent overflow-hidden">
            {scooter.badge && (
              <div className="absolute top-6 left-6 z-10">
                <Badge variant={scooter.category === 'premium' ? 'accent' : scooter.category === 'sport' ? 'primary' : 'success'}>
                  {scooter.badge}
                </Badge>
              </div>
            )}
            <motion.div
              className="absolute inset-0 flex items-center justify-center p-6"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
              key={selectedColor?.id || 'default'} // Key for animation on color change
            >
              <Image
                src={displayListingImage}
                alt={selectedColor ? `${scooter.name} - ${selectedColor.name}` : scooter.name}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </div>

          {/* Content side */}
          <div className="p-8 lg:p-12 flex flex-col justify-center">
            <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-2">
              {scooter.tagline}
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              {scooter.name}
            </h2>
            <p className="text-white/60 text-lg mb-6 leading-relaxed">
              {scooter.description}
            </p>

            {/* Specs grid */}
            <div className="grid grid-cols-3 gap-6 py-6 border-y border-white/10 mb-6">
              <div>
                <Gauge className="w-5 h-5 text-primary mb-2" />
                <p className="text-xs text-white/40 uppercase">Putere</p>
                <p className="text-lg text-white font-semibold">{scooter.specs.power}</p>
              </div>
              <div>
                <Fuel className="w-5 h-5 text-primary mb-2" />
                <p className="text-xs text-white/40 uppercase">Consum</p>
                <p className="text-lg text-white font-semibold">{scooter.specs.consumption}</p>
              </div>
              <div>
                <Weight className="w-5 h-5 text-primary mb-2" />
                <p className="text-xs text-white/40 uppercase">Greutate</p>
                <p className="text-lg text-white font-semibold">{scooter.specs.weight}</p>
              </div>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-2 mb-6">
              {scooter.features.slice(0, 4).map((feature) => (
                <span key={feature} className="inline-flex items-center gap-1 text-sm text-white/60">
                  <Check className="w-4 h-4 text-primary" />
                  {feature}
                </span>
              ))}
            </div>

            {/* Color indicator */}
            {scooter.colors && scooter.colors.length > 0 && (
              <div className="mb-6">
                <ColorIndicator
                  colors={scooter.colors}
                  maxDisplay={4}
                  onColorChange={setSelectedColor}
                />
              </div>
            )}

            {/* Price and CTA */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/40">Preț de la</p>
                <p className="text-3xl font-bold text-white">
                  {formatPrice(scooter.price)}
                  {scooter.priceMax && (
                    <span className="text-lg text-white/40 font-normal"> - {formatPrice(scooter.priceMax)}</span>
                  )}
                </p>
              </div>
              <Link href={`/scutere-125/${scooter.slug}`}>
                <Button variant="primary" size="lg">
                  Vezi detalii <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

export function ScooterCatalog({ scooters, categories }: ScooterCatalogProps) {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedManufacturer, setSelectedManufacturer] = useState<string | null>(null);

  // Read view mode from localStorage on mount, default to 'list'
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('scooter-catalog-view-mode');
      return (saved === 'grid' || saved === 'list') ? saved : 'list';
    }
    return 'list';
  });

  // Save view mode to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('scooter-catalog-view-mode', viewMode);
  }, [viewMode]);

  // Read manufacturer from URL on mount
  useEffect(() => {
    const manufacturerParam = searchParams.get('manufacturer');
    if (manufacturerParam) {
      setSelectedManufacturer(manufacturerParam);
    }
  }, [searchParams]);

  // Filter scooters based on selected category and manufacturer
  const filteredScooters = scooters.filter(scooter => {
    // Check if scooter has the selected category in its categories array (or fallback to category field)
    const scooterCategories = scooter.categories && scooter.categories.length > 0
      ? scooter.categories
      : [scooter.category];
    const categoryMatch = !selectedCategory || scooterCategories.includes(selectedCategory);
    const manufacturerMatch = !selectedManufacturer || scooter.manufacturer === selectedManufacturer;
    return categoryMatch && manufacturerMatch;
  });

  // Handle category click - keep manufacturer filter
  const handleCategoryClick = (categorySlug: string | null) => {
    setSelectedCategory(categorySlug);
  };

  // Handle clear all filters
  const handleClearFilters = () => {
    setSelectedCategory(null);
    setSelectedManufacturer(null);
  };

  // Get badge variant based on category
  const getCategoryVariant = (categorySlug: string) => {
    switch (categorySlug) {
      case 'urban':
        return 'primary';
      case 'premium':
        return 'accent';
      case 'sport':
        return 'success';
      default:
        return 'secondary';
    }
  };

  return (
    <section className="py-16 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Catalog <span className="gradient-text">Scutere 125cc</span>
          </h1>
          <p className="text-xl text-white/60 max-w-3xl mx-auto">
            Toate scuterele noastre sunt conforme cu legea B125 și pot fi conduse legal cu permisul auto categoria B.
            Alege modelul perfect pentru tine.
          </p>
        </motion.div>

        {/* Active manufacturer filter */}
        {selectedManufacturer && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 text-center"
          >
            <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 rounded-lg px-4 py-2">
              <span className="text-white/80">Filtrare după producător:</span>
              <Badge variant="primary" className="font-semibold">
                {selectedManufacturer}
              </Badge>
              <button
                onClick={handleClearFilters}
                className="ml-2 text-white/60 hover:text-white transition-colors"
                aria-label="Clear filter"
              >
                ✕
              </button>
            </div>
          </motion.div>
        )}

        {/* Filter badges and view toggle */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
          {/* Category filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3"
          >
            <Badge
              variant={selectedCategory === null ? 'primary' : 'secondary'}
              className="cursor-pointer hover:bg-primary/30"
              onClick={() => handleCategoryClick(null)}
            >
              Toate
            </Badge>
            {categories.map(category => (
              <Badge
                key={category.id}
                variant={selectedCategory === category.slug ? getCategoryVariant(category.slug) : 'secondary'}
                className="cursor-pointer hover:bg-primary/30"
                onClick={() => handleCategoryClick(category.slug)}
              >
                {category.displayName}
              </Badge>
            ))}
          </motion.div>

          {/* View mode toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex gap-2 bg-white/5 rounded-lg p-1"
          >
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded transition-all ${
                viewMode === 'list'
                  ? 'bg-primary text-white'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
              aria-label="List view"
            >
              <LayoutList className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded transition-all ${
                viewMode === 'grid'
                  ? 'bg-primary text-white'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
              aria-label="Grid view"
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
          </motion.div>
        </div>

        {/* Scooter list or grid */}
        {filteredScooters.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-20"
          >
            <div className="max-w-2xl mx-auto">
              <div className="text-6xl mb-6">🏍️</div>
              <h3 className="text-2xl font-bold text-white mb-4">
                {selectedManufacturer ? `Scutere ${selectedManufacturer} în curând!` : 'Niciun scuter găsit'}
              </h3>
              <p className="text-lg text-white/60 mb-8">
                {selectedManufacturer
                  ? `Stai p'aci că băgăm marfa! Scuterele ${selectedManufacturer} vor fi disponibile în curând. Între timp, explorează celelalte modele.`
                  : 'Nu am găsit scutere care să corespundă filtrelor tale. Încearcă să modifici criteriile de căutare.'
                }
              </p>
              <Button
                onClick={handleClearFilters}
                variant="primary"
                size="lg"
              >
                Vezi toate scuterele
              </Button>
            </div>
          </motion.div>
        ) : viewMode === 'list' ? (
          <div className="space-y-8">
            {filteredScooters.map((scooter, index) => (
              <ScooterCard key={scooter.id} scooter={scooter} index={index} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredScooters.map((scooter, index) => (
              <ScooterGridCard key={scooter.id} scooter={scooter} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

