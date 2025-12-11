'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Shield, Award, HeartHandshake, Wrench, Users, Target } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { fetchScootersForFooter } from '@/data/scooters';

const values = [
  {
    icon: Shield,
    title: 'Respectarea legii B125',
    description: 'Toate scuterele noastre sunt conforme cu normele legale pentru categoria B125.',
  },
  {
    icon: Award,
    title: 'Calitate garantată',
    description: 'Garanția celui mai bun raport calitate-preț pe piața din România.',
  },
  {
    icon: HeartHandshake,
    title: 'Suport post-vânzare',
    description: 'Rămânem alături de tine și după achiziție cu service și consultanță.',
  },
  {
    icon: Wrench,
    title: 'Expertiză tehnică',
    description: 'Te ajutăm să navighezi prin multitudinea de opțiuni disponibile.',
  },
  {
    icon: Users,
    title: 'Comunitate',
    description: 'Faci parte dintr-o comunitate de pasionați de mobilitate urbană.',
  },
  {
    icon: Target,
    title: 'Soluții personalizate',
    description: 'Găsim împreună scuterul perfect pentru nevoile tale specifice.',
  },
];

export default function DespreNoiPage() {
  const [footerScooters, setFooterScooters] = useState<Array<{ name: string; slug: string }>>([]);

  useEffect(() => {
    fetchScootersForFooter().then(setFooterScooters);
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#0a0a0a] pt-24">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#e63946]/10 to-transparent" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Despre <span className="text-[#e63946]">Noi</span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                La scutere125.ro, ne dedicăm pasiunii pentru mobilitatea urbană și ne dorim să oferim 
                fiecărui client soluții accesibile și de încredere.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Povestea <span className="text-[#e63946]">Noastră</span>
                </h2>
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p>
                    Cu o experiență solidă în domeniul vehiculelor pe două roți, suntem aici pentru a face 
                    alegerea scuterului perfect cât mai simplă și plăcută.
                  </p>
                  <p>
                    Înțelegem că fiecare călătorie este importantă, de aceea punem accent pe calitate, 
                    siguranță și prețuri competitive. Misiunea noastră este să te ajutăm să găsești 
                    scuterul ideal pentru stilul tău de viață.
                  </p>
                  <p>
                    Fie că ești la primul scuter sau vrei să faci upgrade, echipa noastră de experți 
                    este pregătită să te ghideze în alegerea perfectă.
                  </p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-[#e63946]/20 to-[#f4a261]/20 p-8 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-7xl font-bold text-[#e63946] mb-4">B125</div>
                    <div className="text-2xl text-white font-semibold">Conform Legii</div>
                    <div className="text-gray-400 mt-2">Scutere ieftine și legale</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-[#111]">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-white text-center mb-16"
            >
              De ce să alegi <span className="text-[#e63946]">scutere125.ro</span>?
            </motion.h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-[#1a1a1a] rounded-xl p-6 border border-gray-800 hover:border-[#e63946]/50 transition-all duration-300 group"
                >
                  <div className="w-14 h-14 rounded-lg bg-[#e63946]/10 flex items-center justify-center mb-4 group-hover:bg-[#e63946]/20 transition-colors">
                    <value.icon className="w-7 h-7 text-[#e63946]" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{value.title}</h3>
                  <p className="text-gray-400">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-[#e63946] to-[#f4a261] rounded-2xl p-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Pregătit să pornești la drum?
              </h2>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Contactează-ne astăzi și descoperă scuterul perfect pentru tine.
              </p>
              <a
                href="/contact"
                className="inline-block bg-white text-[#e63946] font-semibold px-8 py-4 rounded-full hover:bg-gray-100 transition-colors"
              >
                Contactează-ne
              </a>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer scooters={footerScooters} />
    </>
  );
}

