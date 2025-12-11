import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Politica de Cookies | Scutere125.ro',
  description: 'Informații despre utilizarea cookies pe Scutere125.ro',
};

export default function CookiesPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-background py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Politica de Cookies
          </h1>
          <p className="text-white/60">
            Ultima actualizare: {new Date().toLocaleDateString('ro-RO', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Ce sunt cookies?</h2>
              <p className="text-white/80 leading-relaxed">
                Cookies sunt fișiere text mici care sunt stocate pe dispozitivul dumneavoastră (computer, telefon, tabletă) 
                atunci când vizitați un site web. Acestea permit site-ului să vă recunoască și să rețină preferințele 
                dumneavoastră pentru a îmbunătăți experiența de navigare.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Cum folosim cookies</h2>
              <p className="text-white/80 leading-relaxed mb-4">
                Scutere125.ro utilizează cookies pentru:
              </p>
              <ul className="list-disc list-inside text-white/80 space-y-2 ml-4">
                <li>Funcționarea corectă a site-ului</li>
                <li>Reținerea preferințelor dumneavoastră</li>
                <li>Analiză statistică a traficului</li>
                <li>Îmbunătățirea experienței utilizatorului</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Tipuri de cookies utilizate</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3 mt-6">3.1. Cookies esențiale</h3>
              <p className="text-white/80 leading-relaxed mb-4">
                Aceste cookies sunt necesare pentru funcționarea de bază a site-ului și nu pot fi dezactivate.
              </p>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-4">
                <ul className="list-none text-white/80 space-y-2">
                  <li><strong>Nume:</strong> session_id</li>
                  <li><strong>Scop:</strong> Menținerea sesiunii utilizatorului</li>
                  <li><strong>Durată:</strong> Sesiune (se șterge la închiderea browser-ului)</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-white mb-3 mt-6">3.2. Cookies de performanță</h3>
              <p className="text-white/80 leading-relaxed mb-4">
                Aceste cookies ne ajută să înțelegem cum vizitatorii interacționează cu site-ul nostru.
              </p>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-4">
                <ul className="list-none text-white/80 space-y-2">
                  <li><strong>Furnizor:</strong> Google Analytics</li>
                  <li><strong>Cookies:</strong> _ga, _gid, _gat</li>
                  <li><strong>Scop:</strong> Analiză trafic și comportament utilizatori</li>
                  <li><strong>Durată:</strong> 2 ani (_ga), 24 ore (_gid), 1 minut (_gat)</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-white mb-3 mt-6">3.3. Cookies de funcționalitate</h3>
              <p className="text-white/80 leading-relaxed mb-4">
                Aceste cookies permit site-ului să rețină alegerile dumneavoastră.
              </p>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-4">
                <ul className="list-none text-white/80 space-y-2">
                  <li><strong>Nume:</strong> cookie_consent</li>
                  <li><strong>Scop:</strong> Reținerea preferințelor pentru cookies</li>
                  <li><strong>Durată:</strong> 1 an</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Cookies terțe părți</h2>
              <p className="text-white/80 leading-relaxed mb-4">
                Site-ul nostru poate utiliza servicii terțe care setează propriile cookies:
              </p>
              <ul className="list-disc list-inside text-white/80 space-y-2 ml-4">
                <li><strong>Google Analytics:</strong> pentru analiză trafic</li>
                <li><strong>Google Maps:</strong> pentru afișarea hărților (dacă este cazul)</li>
                <li><strong>Social Media:</strong> pentru butoane de share (Facebook, Instagram)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Gestionarea cookies</h2>
              <p className="text-white/80 leading-relaxed mb-4">
                Puteți controla și/sau șterge cookies după preferințe. Majoritatea browser-elor acceptă cookies în mod 
                implicit, dar puteți modifica setările pentru a le bloca sau șterge.
              </p>
              
              <h3 className="text-xl font-semibold text-white mb-3 mt-6">Cum să gestionați cookies în browser:</h3>
              <ul className="list-disc list-inside text-white/80 space-y-2 ml-4">
                <li><strong>Chrome:</strong> Setări → Confidențialitate și securitate → Cookies</li>
                <li><strong>Firefox:</strong> Opțiuni → Confidențialitate și securitate → Cookies</li>
                <li><strong>Safari:</strong> Preferințe → Confidențialitate → Cookies</li>
                <li><strong>Edge:</strong> Setări → Cookies și permisiuni site</li>
              </ul>

              <p className="text-white/80 leading-relaxed mt-4">
                <strong className="text-primary">Notă:</strong> Blocarea tuturor cookies poate afecta funcționalitatea 
                site-ului și experiența dumneavoastră de navigare.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Actualizări ale politicii</h2>
              <p className="text-white/80 leading-relaxed">
                Ne rezervăm dreptul de a actualiza această politică de cookies. Orice modificare va fi publicată pe 
                această pagină cu data actualizării.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Contact</h2>
              <p className="text-white/80 leading-relaxed">
                Pentru întrebări despre utilizarea cookies:
              </p>
              <ul className="list-none text-white/80 space-y-2 mt-4">
                <li><strong>Email:</strong> contact@scutere125.ro</li>
                <li><strong>Telefon:</strong> +40 752 312 097</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

