'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Fuel, Gauge, Weight, Check } from 'lucide-react';
import { Scooter, ScooterColor } from '@/data/scooters';
import { formatPrice } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ColorIndicator } from '@/components/ui/ColorIndicator';

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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter scooters based on selected category
  const filteredScooters = selectedCategory
    ? scooters.filter(scooter => scooter.category === selectedCategory)
    : scooters;

  // Get badge variant based on category
  const getCategoryVariant = (categorySlug: string) => {
    switch (categorySlug) {
      case 'urban':
        return 'secondary';
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

        {/* Filter badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          <Badge
            variant={selectedCategory === null ? 'primary' : 'secondary'}
            className="cursor-pointer hover:bg-primary/30"
            onClick={() => setSelectedCategory(null)}
          >
            Toate
          </Badge>
          {categories.map(category => (
            <Badge
              key={category.id}
              variant={selectedCategory === category.slug ? getCategoryVariant(category.slug) : 'secondary'}
              className="cursor-pointer hover:bg-primary/30"
              onClick={() => setSelectedCategory(category.slug)}
            >
              {category.displayName}
            </Badge>
          ))}
        </motion.div>

        {/* Scooter list */}
        <div className="space-y-8">
          {filteredScooters.map((scooter, index) => (
            <ScooterCard key={scooter.id} scooter={scooter} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

