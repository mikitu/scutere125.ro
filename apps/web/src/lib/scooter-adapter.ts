import type { Scooter } from '@/data/scooters';
import type { StrapiScooter } from './strapi';
import { getStrapiMediaUrl, getStrapiMediaUrls } from './strapi';

export function adaptStrapiScooter(strapiScooter: StrapiScooter): Scooter {
  const { attributes } = strapiScooter;
  
  return {
    id: attributes.slug,
    name: attributes.name,
    slug: attributes.slug,
    tagline: attributes.tagline,
    description: attributes.description,
    price: Number(attributes.price),
    priceMax: attributes.priceMax ? Number(attributes.priceMax) : undefined,
    listingImage: getStrapiMediaUrl(attributes.listingImage),
    image: getStrapiMediaUrl(attributes.image),
    gallery: getStrapiMediaUrls(attributes.gallery),
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

