'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Fuel, Gauge, Weight } from 'lucide-react';
import { Scooter } from '@/data/scooters';
import { formatPrice } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface ScooterShowcaseProps {
  scooters: Scooter[];
}

export function ScooterShowcase({ scooters }: ScooterShowcaseProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-background via-background to-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Alege scuterul <span className="gradient-text">perfect</span>
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Modele de excepție, toate conforme cu legea B125.
            Găsește-l pe cel care ți se potrivește.
          </p>
        </motion.div>

        {/* Scooter cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {scooters.map((scooter, index) => (
            <motion.div
              key={scooter.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
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
          ))}
        </div>

        {/* View all button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Button variant="outline" size="lg" href="/scutere-125">
            Vezi toate scuterele <ArrowRight className="w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

