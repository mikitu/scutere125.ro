import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ScooterCatalogWrapper } from '@/components/sections/ScooterCatalogWrapper';
import { fetchScooters, fetchScootersForFooter } from '@/data/scooters';
import { getCategories } from '@/lib/strapi';

export const metadata: Metadata = {
  title: 'Catalog Scutere 125cc | Scutere de calitate și accesibile conform legii B125 | Scutere125.ro',
  description: 'Descoperă gama completă de scutere 125cc - Honda, Yamaha și multe altele. Toate conforme cu legea B125. Prețuri de la 2.990€.',
};

export default async function ScuterePage() {
  const scooters = await fetchScooters();
  const footerScooters = await fetchScootersForFooter();

  // Fetch categories from Strapi
  let categories = [];
  try {
    const strapiCategories = await getCategories();
    categories = strapiCategories.map(cat => ({
      id: cat.id,
      name: cat.attributes.name,
      slug: cat.attributes.slug,
      displayName: cat.attributes.displayName,
      icon: cat.attributes.icon,
      order: cat.attributes.order,
    }));
  } catch (error) {
    console.error('Error fetching categories:', error);
    // Fallback to default categories
    categories = [
      { id: 1, name: 'urban', slug: 'urban', displayName: 'Urban', icon: 'building', order: 1 },
      { id: 2, name: 'premium', slug: 'premium', displayName: 'Premium', icon: 'star', order: 2 },
      { id: 3, name: 'sport', slug: 'sport', displayName: 'Sport', icon: 'zap', order: 3 },
    ];
  }

  return (
    <>
      <Header />
      <main className="pt-20">
        <ScooterCatalogWrapper scooters={scooters} categories={categories} />
      </main>
      <Footer scooters={footerScooters} />
    </>
  );
}

