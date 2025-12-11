import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Termeni și Condiții | Scutere125.ro',
  description: 'Termeni și condiții de utilizare a platformei Scutere125.ro',
};

export default function TermeniPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <section className="py-24 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-16">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                Termeni și <span className="gradient-text">Condiții</span>
              </h1>
              <p className="text-xl text-white/60 max-w-3xl mx-auto">
                Ultima actualizare: {new Date().toLocaleDateString('ro-RO', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Introducere</h2>
              <p className="text-white/80 leading-relaxed">
                Bine ați venit pe Scutere125.ro! Prin accesarea și utilizarea acestui site web, acceptați să respectați 
                și să fiți obligat de următorii termeni și condiții de utilizare. Dacă nu sunteți de acord cu oricare 
                dintre acești termeni, vă rugăm să nu utilizați acest site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Despre Serviciu</h2>
              <p className="text-white/80 leading-relaxed mb-4">
                Scutere125.ro este o platformă informativă dedicată scuterelor 125cc care pot fi conduse cu permis B125 
                în România. Oferim:
              </p>
              <ul className="list-disc list-inside text-white/80 space-y-2 ml-4">
                <li>Informații detaliate despre modele de scutere 125cc</li>
                <li>Specificații tehnice și caracteristici</li>
                <li>Prețuri orientative și comparații</li>
                <li>Posibilitatea de a solicita oferte personalizate</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Informații și Prețuri</h2>
              <p className="text-white/80 leading-relaxed mb-4">
                <strong className="text-primary">Important:</strong> Toate informațiile afișate pe acest site au caracter 
                informativ și pot fi supuse modificărilor fără notificare prealabilă.
              </p>
              <ul className="list-disc list-inside text-white/80 space-y-2 ml-4">
                <li>Prețurile afișate sunt orientative și pot varia în funcție de configurație, culoare și disponibilitate</li>
                <li>Specificațiile tehnice pot fi modificate de producători fără notificare prealabilă</li>
                <li>Imaginile pot diferi de produsul real în ceea ce privește culoarea și detaliile</li>
                <li>Nu răspundem pentru eventualele erori de afișaj sau informații incomplete</li>
                <li>Prețurile exacte și disponibilitatea vor fi confirmate prin oferta personalizată trimisă pe email</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Solicitare Ofertă</h2>
              <p className="text-white/80 leading-relaxed">
                Prin completarea formularului de solicitare ofertă, sunteți de acord ca datele dumneavoastră personale 
                să fie procesate conform Politicii de Confidențialitate. Oferta personalizată va fi trimisă pe adresa 
                de email furnizată și va conține informații actualizate despre prețuri, disponibilitate și condiții de achiziție.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Proprietate Intelectuală</h2>
              <p className="text-white/80 leading-relaxed">
                Tot conținutul prezent pe Scutere125.ro, inclusiv dar fără a se limita la texte, imagini, logo-uri, 
                grafice și cod sursă, este proprietatea Scutere125.ro sau a furnizorilor de conținut și este protejat 
                de legile privind drepturile de autor. Utilizarea neautorizată a acestui conținut este interzisă.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Limitarea Răspunderii</h2>
              <p className="text-white/80 leading-relaxed">
                Scutere125.ro nu își asumă răspunderea pentru:
              </p>
              <ul className="list-disc list-inside text-white/80 space-y-2 ml-4">
                <li>Erori sau omisiuni în conținutul site-ului</li>
                <li>Indisponibilitatea temporară a site-ului</li>
                <li>Decizii de achiziție luate pe baza informațiilor de pe site</li>
                <li>Modificări ale specificațiilor sau prețurilor efectuate de producători</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Link-uri către Site-uri Terțe</h2>
              <p className="text-white/80 leading-relaxed">
                Site-ul nostru poate conține link-uri către site-uri terțe. Nu avem control asupra conținutului acestor 
                site-uri și nu ne asumăm răspunderea pentru conținutul sau practicile de confidențialitate ale acestora.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. Modificări ale Termenilor</h2>
              <p className="text-white/80 leading-relaxed">
                Ne rezervăm dreptul de a modifica acești termeni și condiții în orice moment. Modificările vor intra 
                în vigoare imediat după publicarea pe site. Utilizarea continuă a site-ului după modificări constituie 
                acceptarea noilor termeni.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">9. Contact</h2>
              <p className="text-white/80 leading-relaxed">
                Pentru întrebări referitoare la acești termeni și condiții, vă rugăm să ne contactați:
              </p>
              <ul className="list-none text-white/80 space-y-2 mt-4">
                <li><strong>Email:</strong> contact@scutere125.ro</li>
                <li><strong>Telefon:</strong> +40 752 312 097</li>
                <li><strong>Adresă:</strong> Str. Selimbar nr.10, Brebu Mânăstirei, Prahova</li>
              </ul>
            </section>
          </div>
        </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

