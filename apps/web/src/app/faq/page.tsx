import { Metadata } from 'next';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getFaqs } from '@/lib/strapi';

export const metadata: Metadata = {
  title: 'Întrebări Frecvente | Scutere125.ro',
  description: 'Răspunsuri la cele mai frecvente întrebări despre scutere 125cc și permis B125',
};

const categoryLabels = {
  general: 'General',
  permis: 'Permis B125',
  achizitie: 'Achiziție',
  intretinere: 'Întreținere',
  tehnic: 'Specificații Tehnice',
};

export default async function FaqPage() {
  const faqs = await getFaqs();

  // Group FAQs by category
  const faqsByCategory = faqs.reduce((acc, faq) => {
    const category = faq.attributes.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(faq);
    return acc;
  }, {} as Record<string, typeof faqs>);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Întrebări Frecvente
          </h1>
          <p className="text-white/60 text-lg">
            Găsește răspunsuri la cele mai frecvente întrebări despre scutere 125cc și permis B125
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-12">
          {Object.entries(faqsByCategory).map(([category, categoryFaqs]) => (
            <section key={category}>
              <h2 className="text-2xl font-bold text-white mb-6 pb-3 border-b border-white/10">
                {categoryLabels[category as keyof typeof categoryLabels]}
              </h2>
              
              <div className="space-y-4">
                {categoryFaqs.map((faq) => (
                  <details
                    key={faq.id}
                    className="group bg-white/5 border border-white/10 rounded-lg overflow-hidden hover:border-primary/50 transition-colors"
                  >
                    <summary className="flex items-center justify-between cursor-pointer p-6 list-none">
                      <h3 className="text-lg font-semibold text-white pr-8">
                        {faq.attributes.question}
                      </h3>
                      <ChevronDown className="w-5 h-5 text-primary flex-shrink-0 transition-transform group-open:rotate-180" />
                    </summary>
                    
                    <div className="px-6 pb-6 pt-2">
                      <p className="text-white/80 leading-relaxed whitespace-pre-line">
                        {faq.attributes.answer}
                      </p>
                    </div>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-3">
            Nu ai găsit răspunsul?
          </h3>
          <p className="text-white/60 mb-6">
            Contactează-ne și îți vom răspunde în cel mai scurt timp posibil.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
          >
            Contactează-ne
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}

