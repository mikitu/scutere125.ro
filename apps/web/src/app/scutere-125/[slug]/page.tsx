import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ScooterDetail } from '@/components/sections/ScooterDetail';
import { fetchScooters, fetchScooterBySlug } from '@/data/scooters';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const scooters = await fetchScooters();
  return scooters.map((scooter) => ({
    slug: scooter.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const scooter = await fetchScooterBySlug(slug);

  if (!scooter) {
    return {
      title: 'Scuter negăsit | Scutere125.ro',
    };
  }

  return {
    title: `${scooter.name} | Preț ${scooter.price}€ | Scutere125.ro`,
    description: `${scooter.description} Specificații: ${scooter.specs.power}, ${scooter.specs.consumption}. Preț de la ${scooter.price}€. Conform legii B125.`,
    openGraph: {
      title: `${scooter.name} - Scutere125.ro`,
      description: scooter.description,
      images: [scooter.image],
    },
  };
}

export default async function ScooterPage({ params }: PageProps) {
  const { slug } = await params;
  const scooter = await fetchScooterBySlug(slug);

  if (!scooter) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="pt-20">
        <ScooterDetail scooter={scooter} />
      </main>
      <Footer />
    </>
  );
}

