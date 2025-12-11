import { Metadata } from 'next';
import Link from 'next/link';
import { Newspaper, Video, FileText, Award } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Blog | Scutere125.ro',
  description: 'Articole, recenzii și ghiduri despre scutere 125cc',
};

export default function BlogPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-background py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Blog Scutere125.ro
          </h1>
          <p className="text-white/60 text-lg">
            Recenzii, ghiduri și tot ce trebuie să știi despre scutere 125cc
          </p>
        </div>

        {/* Coming Soon Card */}
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-12 text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/20 rounded-full mb-6">
            <Newspaper className="w-10 h-10 text-primary" />
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-4">
            În curând!
          </h2>
          
          <p className="text-white/80 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            Pregătim un blog complet dedicat pasionaților de scutere 125cc. Vom testa fiecare model înainte 
            de a-l adăuga pe site și vom împărtăși experiența noastră reală cu tine.
          </p>

          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-lg">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
            <span className="text-white/60 text-sm">În dezvoltare</span>
          </div>
        </div>

        {/* What to Expect */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            Ce vei găsi pe blog:
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-lg p-6 hover:border-primary/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Video className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    Recenzii Video
                  </h4>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Teste complete pe drum cu fiecare scuter, în condiții reale de trafic urban și extraurban.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-6 hover:border-primary/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    Ghiduri Detaliate
                  </h4>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Tot ce trebuie să știi despre permis B125, întreținere, asigurări și costuri de operare.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-6 hover:border-primary/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    Comparații Oneste
                  </h4>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Comparații directe între modele, cu avantaje și dezavantaje reale, fără marketing.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-6 hover:border-primary/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Newspaper className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    Noutăți din Industrie
                  </h4>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Lansări de modele noi, actualizări legislative și tendințe în mobilitatea urbană.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter CTA */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-3">
            Fii primul care află când lansăm blogul!
          </h3>
          <p className="text-white/60 mb-6">
            Abonează-te la newsletter pentru a primi notificări despre articole noi și oferte exclusive.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
          >
            Contactează-ne
          </Link>
        </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

