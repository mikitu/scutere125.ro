'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, FileText } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { useQuoteModal } from '@/contexts/QuoteModalContext';
import { useEffect, useState, useRef } from 'react';
import { fetchScootersForFooter } from '@/data/scooters';
import ReCAPTCHA from 'react-google-recaptcha';

const contactInfo = [
  {
    icon: Phone,
    title: 'Telefon',
    value: '+40 772 129 775',
    href: 'tel:+40772129775',
  },
  {
    icon: Mail,
    title: 'Email',
    value: 'contact@scutere125.ro',
    href: 'mailto:contact@scutere125.ro',
  },
  {
    icon: MapPin,
    title: 'Adresă',
    value: 'Strada Selimbar nr.10, Brebu Mânăstirei, Prahova',
    href: 'https://maps.google.com/?q=Brebu+Manastirei+Prahova',
  },
];

const schedule = [
  { day: 'Luni', hours: '10:00 - 15:00' },
  { day: 'Marți - Vineri', hours: '09:00 - 18:00' },
  { day: 'Sâmbătă', hours: '10:00 - 17:00' },
  { day: 'Duminică', hours: 'Închis' },
];

export default function ContactPage() {
  const { openModal } = useQuoteModal();
  const [footerScooters, setFooterScooters] = useState<Array<{ name: string; slug: string }>>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  useEffect(() => {
    fetchScootersForFooter().then(setFooterScooters);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // Get reCAPTCHA token
      const recaptchaToken = await recaptchaRef.current?.executeAsync();
      if (!recaptchaToken) {
        throw new Error('Verificarea reCAPTCHA a eșuat. Te rugăm să încerci din nou.');
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'A apărut o eroare. Te rugăm să încerci din nou.');
      }

      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
      recaptchaRef.current?.reset();

      // Hide success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'A apărut o eroare. Te rugăm să încerci din nou.');
      recaptchaRef.current?.reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#0a0a0a] pt-24">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-b from-[#e63946]/10 to-transparent" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Contactează-<span className="text-[#e63946]">ne</span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Suntem aici să te ajutăm să găsești scuterul perfect. Nu ezita să ne contactezi!
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl font-bold text-white mb-8">
                  Informații de <span className="text-[#e63946]">Contact</span>
                </h2>
                <div className="space-y-6 mb-10">
                  {contactInfo.map((info) => (
                    <a
                      key={info.title}
                      href={info.href}
                      target={info.icon === MapPin ? '_blank' : undefined}
                      rel={info.icon === MapPin ? 'noopener noreferrer' : undefined}
                      className="flex items-start gap-4 p-4 bg-[#1a1a1a] rounded-xl border border-gray-800 hover:border-[#e63946]/50 transition-all group"
                    >
                      <div className="w-12 h-12 rounded-lg bg-[#e63946]/10 flex items-center justify-center group-hover:bg-[#e63946]/20 transition-colors">
                        <info.icon className="w-6 h-6 text-[#e63946]" />
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm">{info.title}</div>
                        <div className="text-white font-medium">{info.value}</div>
                      </div>
                    </a>
                  ))}
                </div>

                {/* Schedule */}
                <div className="bg-[#1a1a1a] rounded-xl p-6 border border-gray-800">
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="w-6 h-6 text-[#e63946]" />
                    <h3 className="text-xl font-semibold text-white">Program</h3>
                  </div>
                  <div className="space-y-3">
                    {schedule.map((item) => (
                      <div key={item.day} className="flex justify-between text-gray-300">
                        <span>{item.day}</span>
                        <span className={item.hours === 'Închis' ? 'text-red-400' : 'text-[#f4a261]'}>
                          {item.hours}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-bold text-white">
                    Trimite-ne un <span className="text-[#e63946]">Mesaj</span>
                  </h2>
                  <div className="flex items-center gap-2 text-white/60 text-sm">
                    <span>sau</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openModal()}
                      className="whitespace-nowrap"
                    >
                      <FileText className="w-4 h-4" />
                      Solicită Ofertă
                    </Button>
                  </div>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {submitStatus === 'success' && (
                    <div className="bg-green-500/10 border border-green-500/50 rounded-lg p-4 text-green-400">
                      ✅ Mesajul tău a fost trimis cu succes! Îți vom răspunde în cel mai scurt timp.
                    </div>
                  )}
                  {submitStatus === 'error' && (
                    <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 text-red-400">
                      ❌ {errorMessage}
                    </div>
                  )}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-400 mb-2">Nume *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-[#1a1a1a] border border-gray-800 rounded-lg px-4 py-3 text-white focus:border-[#e63946] focus:outline-none transition-colors"
                        placeholder="Numele tău"
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-2">Telefon</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#1a1a1a] border border-gray-800 rounded-lg px-4 py-3 text-white focus:border-[#e63946] focus:outline-none transition-colors"
                        placeholder="+40 7XX XXX XXX"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#1a1a1a] border border-gray-800 rounded-lg px-4 py-3 text-white focus:border-[#e63946] focus:outline-none transition-colors"
                      placeholder="email@exemplu.ro"
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2">Mesaj *</label>
                    <textarea
                      rows={6}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[#1a1a1a] border border-gray-800 rounded-lg px-4 py-3 text-white focus:border-[#e63946] focus:outline-none transition-colors resize-none"
                      placeholder="Scrie mesajul tău aici..."
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* reCAPTCHA */}
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    size="invisible"
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-linear-to-r from-[#e63946] to-[#f4a261] text-white font-semibold py-4 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                    {isSubmitting ? 'Se trimite...' : 'Trimite Mesajul'}
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer scooters={footerScooters} />
    </>
  );
}

