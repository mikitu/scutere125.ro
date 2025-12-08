import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { ScooterShowcase } from '@/components/sections/ScooterShowcase';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { CTASection } from '@/components/sections/CTASection';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ScooterShowcase />
        <WhyChooseUs />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
