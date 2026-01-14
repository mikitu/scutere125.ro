'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Phone, MessageCircle, Check, Fuel, Gauge, Weight, Armchair, Package, Settings, CreditCard } from 'lucide-react';
import { Scooter, ScooterColor } from '@/data/scooters';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { ImageGallery } from '@/components/ui/ImageGallery';
import { ColorSelector } from '@/components/ui/ColorSelector';

interface ScooterDetailProps {
  scooter: Scooter;
}

const specIcons: Record<string, React.ElementType> = {
  engine: Settings,
  power: Gauge,
  consumption: Fuel,
  weight: Weight,
  seatHeight: Armchair,
  storage: Package,
};

const specLabels: Record<string, string> = {
  engine: 'Motor',
  power: 'Putere',
  consumption: 'Consum',
  weight: 'Greutate',
  seatHeight: 'Înălțime șa',
  storage: 'Spațiu depozitare',
};

export function ScooterDetail({ scooter }: ScooterDetailProps) {
  const [selectedColor, setSelectedColor] = useState<ScooterColor | null>(
    scooter.colors && scooter.colors.length > 0 ? scooter.colors[0] : null
  );

  // Use color-specific images if a color is selected, otherwise use default scooter images
  const displayImages = selectedColor?.gallery && selectedColor.gallery.length > 0
    ? selectedColor.gallery
    : scooter.gallery;

  const displayMainImage = selectedColor?.image || scooter.image;

  return (
    <section className="py-8 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link href="/scutere-125" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Înapoi la catalog
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image gallery */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {scooter.badge && (
              <div className="absolute top-6 left-6 z-10">
                <Badge variant={scooter.category === 'premium' ? 'accent' : scooter.category === 'sport' ? 'primary' : 'success'}>
                  {scooter.badge}
                </Badge>
              </div>
            )}
            <ImageGallery
              images={displayImages}
              mainImage={displayMainImage}
              alt={selectedColor ? `${scooter.name} - ${selectedColor.name}` : scooter.name}
            />
          </motion.div>

          {/* Product info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col"
          >
            <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-2">
              {scooter.tagline}
            </p>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              {scooter.name}
            </h1>
            <p className="text-xl text-white/60 mb-8 leading-relaxed">
              {scooter.description}
            </p>

            {/* Price */}
            <div className="mb-8">
              {scooter.standardPrice && scooter.standardPrice > scooter.price ? (
                <>
                  <p className="text-sm text-white/40 mb-1">
                    Preț standard: <span className="line-through">{formatPrice(scooter.standardPrice)}</span>
                  </p>
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-4xl font-bold text-primary">{formatPrice(scooter.price)}</span>
                    {scooter.priceMax && (
                      <span className="text-xl text-primary/60">- {formatPrice(scooter.priceMax)}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 mb-2">
                    <p className="text-base text-accent font-semibold">
                      Economisești {formatPrice(scooter.standardPrice - scooter.price)}
                    </p>
                    <Badge variant="accent">
                      -{Math.round((scooter.standardPrice - scooter.price) / scooter.standardPrice * 100)}% reducere
                    </Badge>
                  </div>
                  <p className="text-sm text-green-400 flex items-center gap-1">
                    <Check className="w-4 h-4" />
                    Conform legii B125 - conduci legal cu permis auto
                  </p>
                </>
              ) : (
                <>
                  <p className="text-sm text-white/40 mb-1">Preț de la</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-white">{formatPrice(scooter.price)}</span>
                    {scooter.priceMax && (
                      <span className="text-xl text-white/40">- {formatPrice(scooter.priceMax)}</span>
                    )}
                  </div>
                  <p className="text-sm text-green-400 mt-2 flex items-center gap-1">
                    <Check className="w-4 h-4" />
                    Conform legii B125 - conduci legal cu permis auto
                  </p>
                </>
              )}
            </div>

            {/* Color selector */}
            {scooter.colors && scooter.colors.length > 0 && (
              <div className="mb-8">
                <ColorSelector
                  colors={scooter.colors}
                  onColorChange={setSelectedColor}
                />
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Button
                variant="primary"
                size="lg"
                className="flex-1"
                href={`https://wa.me/40772129775?text=${encodeURIComponent(`Bună ziua! Sunt interesat de ${scooter.name}${selectedColor ? ` în culoarea ${selectedColor.name}` : ''}. Aș dori mai multe detalii.`)}`}
              >
                <MessageCircle className="w-5 h-5" />
                Cumpără Acum
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="flex-1"
                href="tel:+40774515065"
              >
                <CreditCard className="w-5 h-5" />
                Cumpără în Rate
              </Button>
            </div>

            {/* Purchase info */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-white/60 mb-1">
                    <MessageCircle className="w-4 h-4 inline mr-1" />
                    <strong className="text-white">Cumpără Acum:</strong>
                  </p>
                  <p className="text-white/80">
                    Trimite mesaj pe WhatsApp și primești ofertă personalizată instant
                  </p>
                </div>
                <div>
                  <p className="text-white/60 mb-1">
                    <CreditCard className="w-4 h-4 inline mr-1" />
                    <strong className="text-white">Cumpără în Rate:</strong>
                  </p>
                  <p className="text-white/80">
                    Sună la finanțare pentru rate avantajoase fără avans
                  </p>
                </div>
              </div>
            </div>

            {/* Features list */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {scooter.features.map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-white/80">
                  <Check className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Specifications section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Specificații <span className="gradient-text">tehnice</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Object.entries(scooter.specs).map(([key, value]) => {
              const Icon = specIcons[key] || Settings;
              return (
                <Card key={key} className="p-6 text-center" hover={false}>
                  <Icon className="w-8 h-8 text-primary mx-auto mb-3" />
                  <p className="text-xs text-white/40 uppercase mb-1">{specLabels[key]}</p>
                  <p className="text-lg font-semibold text-white">{value}</p>
                </Card>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

