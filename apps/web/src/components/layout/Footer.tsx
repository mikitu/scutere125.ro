'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';

interface FooterScooter {
  name: string;
  slug: string;
}

interface FooterProps {
  scooters?: FooterScooter[];
}

const footerLinks = {
  informatii: [
    { href: '/despre', label: 'Despre noi' },
    { href: '/contact', label: 'Contact' },
    { href: '/blog', label: 'Blog' },
    { href: '/faq', label: 'Întrebări frecvente' },
  ],
  legal: [
    { href: '/termeni', label: 'Termeni și condiții' },
    { href: '/confidentialitate', label: 'Politica de confidențialitate' },
    { href: '/cookies', label: 'Politica cookies' },
  ],
};

export function Footer({ scooters = [] }: FooterProps) {
  return (
    <footer className="bg-linear-to-b from-background to-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold">
                <span className="text-primary">Scutere</span>
                <span className="text-white">125</span>
                <span className="text-muted">.ro</span>
              </span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed">
              Pe drum, cu încredere. Cele mai bune scutere 125cc pentru permis B125 din România.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-white/60 hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-primary transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Scutere 125cc */}
          <div>
            <h4 className="text-white font-semibold mb-4">Scutere 125cc</h4>
            <ul className="space-y-2">
              {scooters.length > 0 ? (
                scooters.map((scooter) => (
                  <li key={scooter.slug}>
                    <Link href={`/scutere-125/${scooter.slug}`} className="text-white/60 hover:text-white text-sm transition-colors">
                      {scooter.name}
                    </Link>
                  </li>
                ))
              ) : (
                <li>
                  <Link href="/scutere-125" className="text-white/60 hover:text-white text-sm transition-colors">
                    Vezi toate scuterele
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Informații */}
          <div>
            <h4 className="text-white font-semibold mb-4">Informații</h4>
            <ul className="space-y-2">
              {footerLinks.informatii.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/60 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a href="tel:+40772129775" className="flex items-center gap-3 text-white/60 text-sm hover:text-white transition-colors">
                  <Phone className="w-4 h-4 text-primary" />
                  <span>+40 772 129 775</span>
                </a>
              </li>
              <li>
                <a href="mailto:contact@scutere125.ro" className="flex items-center gap-3 text-white/60 text-sm hover:text-white transition-colors">
                  <Mail className="w-4 h-4 text-primary" />
                  <span>contact@scutere125.ro</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/60 text-sm">
                <MapPin className="w-4 h-4 text-primary mt-0.5" />
                <span>Str. Selimbar nr.10, Brebu Mânăstirei, Prahova</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-8">
            <p className="text-white/60 text-xs text-center leading-relaxed">
              <span className="text-primary font-semibold">Notă importantă:</span> Informațiile afișate pe acest site au caracter informativ.
              Nu răspundem de eventualele erori de afișaj sau modificări ale specificațiilor tehnice efectuate de producători.
              Prețurile exacte, disponibilitatea și specificațiile complete vor fi confirmate prin oferta personalizată trimisă pe email.
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Scutere125.ro. Toate drepturile rezervate.
          </p>
          <div className="flex gap-6">
            {footerLinks.legal.map((link) => (
              <Link key={link.href} href={link.href} className="text-white/40 hover:text-white text-sm transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

