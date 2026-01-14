import type { Scooter, ScooterColor } from '@/data/scooters';
import type { StrapiScooter, StrapiScooterColor } from './strapi';
import { getStrapiMediaUrl, getStrapiMediaUrls } from './strapi';

// Placeholder image pentru scutere fără imagini
const PLACEHOLDER_IMAGE = '/images/placeholder-scooter.jpg';

function adaptStrapiScooterColor(strapiColor: StrapiScooterColor): ScooterColor {
  const { attributes } = strapiColor;

  return {
    id: strapiColor.id,
    name: attributes.name,
    code: attributes.code,
    hex: attributes.hex,
    listingImage: getStrapiMediaUrl(attributes.listingImage) || undefined,
    image: getStrapiMediaUrl(attributes.image) || undefined,
    gallery: getStrapiMediaUrls(attributes.gallery),
  };
}

export function adaptStrapiScooter(strapiScooter: StrapiScooter): Scooter {
  const { attributes } = strapiScooter;

  const listingImage = getStrapiMediaUrl(attributes.listingImage) || PLACEHOLDER_IMAGE;
  const mainImage = getStrapiMediaUrl(attributes.mainImage) || getStrapiMediaUrl(attributes.image) || PLACEHOLDER_IMAGE;
  const gallery = getStrapiMediaUrls(attributes.gallery);

  // Adapt colors if they exist
  const colors = attributes.colors?.data?.length
    ? attributes.colors.data.map(adaptStrapiScooterColor)
    : undefined;

  // Extract category slugs from the manyToMany relation
  const categories = attributes.categories?.data?.length
    ? attributes.categories.data.map(cat => cat.attributes.slug)
    : [];

  // Fallback to old category field if categories relation is empty
  const category = categories.length > 0 ? categories[0] as 'urban' | 'sport' | 'premium' : attributes.category;

  return {
    id: attributes.slug,
    name: attributes.name,
    slug: attributes.slug,
    tagline: attributes.tagline,
    description: attributes.description,
    price: Number(attributes.price),
    priceMax: attributes.priceMax ? Number(attributes.priceMax) : undefined,
    standardPrice: attributes.standardPrice ? Number(attributes.standardPrice) : undefined,
    listingImage,
    image: mainImage,
    gallery: gallery.length > 0 ? gallery : [mainImage],
    specs: {
      engine: attributes.engine,
      power: attributes.power,
      consumption: attributes.consumption,
      weight: attributes.weight,
      seatHeight: attributes.seatHeight,
      storage: attributes.storage,
    },
    features: attributes.features,
    category, // Keep for backward compatibility
    categories, // New field with all category slugs
    manufacturer: attributes.manufacturer,
    badge: attributes.badge,
    colors,
  };
}

export function adaptStrapiScooters(strapiScooters: StrapiScooter[]): Scooter[] {
  return strapiScooters.map(adaptStrapiScooter);
}

