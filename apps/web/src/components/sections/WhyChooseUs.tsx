'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Shield, Wallet, Wrench, Award, Clock, HeartHandshake } from 'lucide-react';

const reasons = [
  {
    icon: Shield,
    title: 'Legal cu permis B',
    description: 'Toate scuterele noastre sunt conforme cu legea B125. Conduci legal cu permisul auto.',
  },
  {
    icon: Wallet,
    title: 'Prețuri accesibile',
    description: 'Cele mai bune prețuri din România pentru scutere 125cc de calitate.',
  },
  {
    icon: Wrench,
    title: 'Service autorizat',
    description: 'Beneficiezi de service Honda autorizat și piese originale garantate.',
  },
  {
    icon: Award,
    title: 'Garanție completă',
    description: 'Garanție producător Honda și suport tehnic pe toată durata garanției.',
  },
  {
    icon: Clock,
    title: 'Livrare rapidă',
    description: 'Livrăm în toată România. Scuterul tău poate ajunge în câteva zile.',
  },
  {
    icon: HeartHandshake,
    title: 'Consultanță gratuită',
    description: 'Te ajutăm să alegi scuterul perfect pentru nevoile tale. Fără obligații.',
  },
];

export function WhyChooseUs() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-secondary/20 to-background" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            De ce <span className="gradient-text">Scutere125.ro</span>?
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Suntem pasionați de scutere și dedicați să îți oferim cea mai bună experiență.
          </p>
        </motion.div>

        {/* Reasons grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all duration-300 h-full">
                {/* Icon */}
                <motion.div
                  className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/30 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <reason.icon className="w-7 h-7 text-primary" />
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                  {reason.title}
                </h3>
                <p className="text-white/60 leading-relaxed">
                  {reason.description}
                </p>

                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

