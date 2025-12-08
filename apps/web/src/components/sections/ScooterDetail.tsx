'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Phone, MessageCircle, Check, Fuel, Gauge, Weight, Armchair, Package, Settings } from 'lucide-react';
import { Scooter } from '@/data/scooters';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';

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
          <Link href="/scutere" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors">
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
          >
            <Card className="overflow-hidden">
              <div className="relative aspect-[4/3] bg-gradient-to-br from-white/5 to-transparent">
                {scooter.badge && (
                  <div className="absolute top-6 left-6 z-10">
                    <Badge variant={scooter.category === 'premium' ? 'accent' : scooter.category === 'sport' ? 'primary' : 'success'}>
                      {scooter.badge}
                    </Badge>
                  </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="text-9xl"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    🛵
                  </motion.div>
                </div>
              </div>
            </Card>

            {/* Thumbnail gallery */}
            <div className="grid grid-cols-3 gap-4 mt-4">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="aspect-[4/3] rounded-xl bg-white/5 border border-white/10 hover:border-primary/50 cursor-pointer transition-colors flex items-center justify-center"
                >
                  <span className="text-4xl opacity-50">🛵</span>
                </motion.div>
              ))}
            </div>
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
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button variant="primary" size="lg" className="flex-1">
                <Phone className="w-5 h-5" />
                Solicită ofertă
              </Button>
              <Button variant="outline" size="lg" className="flex-1">
                <MessageCircle className="w-5 h-5" />
                Întreabă-ne
              </Button>
            </div>

            {/* Features list */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {scooter.features.map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-white/80">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
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

