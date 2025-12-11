import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ScooterCatalog } from '@/components/sections/ScooterCatalog';
import { fetchScooters, fetchScootersForFooter } from '@/data/scooters';

export const metadata: Metadata = {
  title: 'Catalog Scutere 125cc | Scutere ieftine conform legii B125 | Scutere125.ro',
  description: 'Descoperă gama completă de scutere Honda 125cc. SH Mode, PCX 125, Forza 125 - toate conforme cu legea B125. Prețuri de la 2.990€.',
};

export default async function ScuterePage() {
  const scooters = await fetchScooters();
  const footerScooters = await fetchScootersForFooter();

  return (
    <>
      <Header />
      <main className="pt-20">
        <ScooterCatalog scooters={scooters} />
      </main>
      <Footer scooters={footerScooters} />
    </>
  );
}

