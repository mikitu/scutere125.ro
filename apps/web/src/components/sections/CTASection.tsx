'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useMemo } from 'react';
import { Phone, MessageCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

// Generate particle positions once to avoid hydration mismatch
const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  top: Math.random() * 100,
  duration: 3 + Math.random() * 2,
  delay: Math.random() * 2,
}));

export function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      {/* Background with animated gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-background to-accent/20" />
      
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-2 h-2 bg-primary/30 rounded-full"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
            </span>
            Disponibil acum
          </div>

          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Pregătit să pornești
            <br />
            <span className="gradient-text">la drum?</span>
          </h2>

          {/* Description */}
          <p className="text-xl text-white/60 max-w-2xl mx-auto mb-12">
            Contactează-ne acum pentru o ofertă personalizată. 
            Echipa noastră te așteaptă să îți găsească scuterul perfect.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" href="tel:+40700000000">
              <Phone className="w-5 h-5" />
              Sună acum
            </Button>
            <Button variant="outline" size="lg" href="/contact">
              <MessageCircle className="w-5 h-5" />
              Trimite mesaj
            </Button>
          </div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 flex flex-wrap justify-center gap-8 text-white/40 text-sm"
          >
            <div className="flex items-center gap-2">
              <span className="text-primary">✓</span>
              Răspuns în 24h
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary">✓</span>
              Consultanță gratuită
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary">✓</span>
              Fără obligații
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

