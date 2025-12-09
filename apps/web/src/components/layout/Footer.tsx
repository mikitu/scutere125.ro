'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';

const footerLinks = {
  scutere: [
    { href: '/scutere-125/sh-mode-125', label: 'Honda SH Mode 125' },
    { href: '/scutere-125/pcx-125', label: 'Honda PCX 125' },
    { href: '/scutere-125/forza-125', label: 'Honda Forza 125' },
  ],
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

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-background to-black border-t border-white/10">
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
              {footerLinks.scutere.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/60 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
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
                <a href="tel:+40752312097" className="flex items-center gap-3 text-white/60 text-sm hover:text-white transition-colors">
                  <Phone className="w-4 h-4 text-primary" />
                  <span>+40 752 312 097</span>
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

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
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

