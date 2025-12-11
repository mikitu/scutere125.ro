import { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Politica de Confidențialitate | Scutere125.ro',
  description: 'Politica de confidențialitate și protecția datelor personale pe Scutere125.ro',
};

export default function ConfidentialitatePage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <section className="py-24 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-16">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                Politica de <span className="gradient-text">Confidențialitate</span>
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
                Scutere125.ro respectă confidențialitatea vizitatorilor și utilizatorilor săi. Această politică de 
                confidențialitate explică ce date personale colectăm, cum le utilizăm și ce drepturi aveți în legătură 
                cu acestea, în conformitate cu Regulamentul General privind Protecția Datelor (GDPR).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Date Personale Colectate</h2>
              <p className="text-white/80 leading-relaxed mb-4">
                Colectăm următoarele categorii de date personale:
              </p>
              
              <h3 className="text-xl font-semibold text-white mb-3 mt-6">2.1. Date furnizate direct de dumneavoastră</h3>
              <ul className="list-disc list-inside text-white/80 space-y-2 ml-4">
                <li><strong>Formular de contact/ofertă:</strong> nume, prenume, email, telefon, mesaj</li>
                <li><strong>Newsletter:</strong> adresă de email (dacă vă abonați)</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3 mt-6">2.2. Date colectate automat</h3>
              <ul className="list-disc list-inside text-white/80 space-y-2 ml-4">
                <li>Adresa IP</li>
                <li>Tipul de browser și dispozitiv</li>
                <li>Pagini vizitate și timp petrecut pe site</li>
                <li>Sursă de trafic (de unde ați ajuns pe site)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Scopul Prelucrării Datelor</h2>
              <p className="text-white/80 leading-relaxed mb-4">
                Utilizăm datele dumneavoastră personale pentru:
              </p>
              <ul className="list-disc list-inside text-white/80 space-y-2 ml-4">
                <li>Răspuns la solicitările de ofertă și întrebări</li>
                <li>Trimiterea de oferte personalizate</li>
                <li>Comunicare prin email sau telefon</li>
                <li>Îmbunătățirea experienței pe site</li>
                <li>Analiză statistică și optimizare</li>
                <li>Trimiterea de newsletter (doar cu consimțământul dumneavoastră)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Baza Legală a Prelucrării</h2>
              <p className="text-white/80 leading-relaxed">
                Prelucrăm datele dumneavoastră pe baza:
              </p>
              <ul className="list-disc list-inside text-white/80 space-y-2 ml-4">
                <li><strong>Consimțământ:</strong> pentru newsletter și comunicări marketing</li>
                <li><strong>Interes legitim:</strong> pentru răspunsul la solicitări și îmbunătățirea serviciilor</li>
                <li><strong>Executarea unui contract:</strong> pentru procesarea cererilor de ofertă</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Partajarea Datelor</h2>
              <p className="text-white/80 leading-relaxed mb-4">
                Nu vindem, nu închiriem și nu partajăm datele dumneavoastră personale cu terțe părți în scopuri 
                comerciale. Putem partaja date doar cu:
              </p>
              <ul className="list-disc list-inside text-white/80 space-y-2 ml-4">
                <li>Furnizori de servicii tehnice (hosting, email)</li>
                <li>Autorități competente, la cerere legală</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Perioada de Stocare</h2>
              <p className="text-white/80 leading-relaxed">
                Păstrăm datele dumneavoastră personale:
              </p>
              <ul className="list-disc list-inside text-white/80 space-y-2 ml-4">
                <li>Solicitări de ofertă: 2 ani de la ultima interacțiune</li>
                <li>Newsletter: până la dezabonare</li>
                <li>Date analitice: 14 luni (conform Google Analytics)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Drepturile Dumneavoastră</h2>
              <p className="text-white/80 leading-relaxed mb-4">
                Conform GDPR, aveți următoarele drepturi:
              </p>
              <ul className="list-disc list-inside text-white/80 space-y-2 ml-4">
                <li><strong>Dreptul de acces:</strong> să solicitați o copie a datelor personale</li>
                <li><strong>Dreptul la rectificare:</strong> să corectați datele incorecte</li>
                <li><strong>Dreptul la ștergere:</strong> să solicitați ștergerea datelor ("dreptul de a fi uitat")</li>
                <li><strong>Dreptul la restricționare:</strong> să limitați prelucrarea datelor</li>
                <li><strong>Dreptul la portabilitate:</strong> să primiți datele într-un format structurat</li>
                <li><strong>Dreptul la opoziție:</strong> să vă opuneți prelucrării datelor</li>
                <li><strong>Dreptul de a retrage consimțământul:</strong> în orice moment</li>
              </ul>
              <p className="text-white/80 leading-relaxed mt-4">
                Pentru exercitarea acestor drepturi, contactați-ne la: <strong className="text-primary">contact@scutere125.ro</strong>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. Securitatea Datelor</h2>
              <p className="text-white/80 leading-relaxed">
                Implementăm măsuri tehnice și organizatorice adecvate pentru protejarea datelor dumneavoastră împotriva 
                accesului neautorizat, pierderii sau distrugerii. Acestea includ criptare SSL, backup-uri regulate și 
                acces restricționat la date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">9. Cookies</h2>
              <p className="text-white/80 leading-relaxed">
                Site-ul nostru utilizează cookies pentru îmbunătățirea experienței utilizatorului. Pentru detalii, 
                consultați <Link href="/cookies" className="text-primary hover:underline">Politica de Cookies</Link>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">10. Contact</h2>
              <p className="text-white/80 leading-relaxed">
                Pentru întrebări despre această politică de confidențialitate:
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

