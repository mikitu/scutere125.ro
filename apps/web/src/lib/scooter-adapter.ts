import type { Scooter } from '@/data/scooters';
import type { StrapiScooter } from './strapi';
import { getStrapiMediaUrl, getStrapiMediaUrls } from './strapi';

// Placeholder image pentru scutere fără imagini
const PLACEHOLDER_IMAGE = '/images/placeholder-scooter.jpg';

export function adaptStrapiScooter(strapiScooter: StrapiScooter): Scooter {
  const { attributes } = strapiScooter;

  const listingImage = getStrapiMediaUrl(attributes.listingImage) || PLACEHOLDER_IMAGE;
  const mainImage = getStrapiMediaUrl(attributes.image) || PLACEHOLDER_IMAGE;
  const gallery = getStrapiMediaUrls(attributes.gallery);

  return {
    id: attributes.slug,
    name: attributes.name,
    slug: attributes.slug,
    tagline: attributes.tagline,
    description: attributes.description,
    price: Number(attributes.price),
    priceMax: attributes.priceMax ? Number(attributes.priceMax) : undefined,
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
    category: attributes.category,
    badge: attributes.badge,
  };
}

export function adaptStrapiScooters(strapiScooters: StrapiScooter[]): Scooter[] {
  return strapiScooters.map(adaptStrapiScooter);
}

