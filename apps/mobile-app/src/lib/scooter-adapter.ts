import { StrapiScooter, getImageUrl } from './strapi';

export interface Scooter {
  id: number;
  name: string;
  category: string;
  cc: string;
  price: string;
  image: string | null;
  rating?: number;
  badge?: string;
  manufacturer: string;
  slug: string;
  categories?: Array<{ name: string; slug: string; displayName: string }>;
}

export function adaptStrapiScooter(strapiScooter: StrapiScooter): Scooter {
  const attrs = strapiScooter.attributes;

  // Get primary category
  const primaryCategory = attrs.categories?.data?.[0]?.attributes?.displayName || 'Urban';

  // Get all categories
  const categories = attrs.categories?.data?.map(cat => ({
    name: cat.attributes.name,
    slug: cat.attributes.slug,
    displayName: cat.attributes.displayName,
  })) || [];

  // Extract CC from engine string (e.g., "125cc 4-stroke" -> "125cc")
  const ccMatch = attrs.engine.match(/(\d+cc)/i);
  const cc = ccMatch ? ccMatch[1] : '125cc';

  // Format price
  const price = attrs.priceMax
    ? `€${attrs.price.toLocaleString()} - €${attrs.priceMax.toLocaleString()}`
    : `€${attrs.price.toLocaleString()}`;

  // Get image URL
  const imageUrl = getImageUrl(attrs.listingImage || attrs.image);

  return {
    id: strapiScooter.id,
    name: attrs.name,
    category: primaryCategory,
    cc,
    price,
    image: imageUrl,
    badge: attrs.badge,
    manufacturer: attrs.manufacturer,
    slug: attrs.slug,
    categories,
  };
}

export function adaptStrapiScooters(strapiScooters: StrapiScooter[]): Scooter[] {
  return strapiScooters.map(adaptStrapiScooter);
}

