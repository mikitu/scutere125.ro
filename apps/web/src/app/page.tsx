import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { ScooterShowcase } from '@/components/sections/ScooterShowcase';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { CTASection } from '@/components/sections/CTASection';
import { fetchScooters } from '@/data/scooters';

export default async function Home() {
  const scooters = await fetchScooters();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <ScooterShowcase scooters={scooters} />
        <WhyChooseUs />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
