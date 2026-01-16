// Strapi API URL - change this to your production URL when deploying
const STRAPI_URL = process.env.EXPO_PUBLIC_STRAPI_URL || 'http://localhost:1337';

interface StrapiImage {
  id: number;
  attributes: {
    url: string;
    alternativeText?: string;
    width?: number;
    height?: number;
  };
}

interface StrapiMedia {
  data: StrapiImage | StrapiImage[] | null;
}

interface StrapiCategory {
  id: number;
  attributes: {
    name: string;
    slug: string;
    displayName: string;
  };
}

export interface StrapiScooterColor {
  id: number;
  attributes: {
    name: string;
    code: string;
    hex?: string;
    listingImage: StrapiMedia;
    image: StrapiMedia;
    gallery: StrapiMedia;
  };
}

export interface StrapiScooter {
  id: number;
  attributes: {
    name: string;
    slug: string;
    tagline: string;
    description: string;
    price: number;
    priceMax?: number;
    listingImage: StrapiMedia;
    image: StrapiMedia;
    gallery: StrapiMedia;
    engine: string;
    power: string;
    consumption: string;
    weight: string;
    seatHeight: string;
    storage: string;
    features: string[];
    categories?: {
      data: StrapiCategory[];
    };
    colors?: {
      data: StrapiScooterColor[];
    };
    manufacturer: string;
    badge?: string;
    showOnHomepage?: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

async function fetchAPI<T>(path: string): Promise<T> {
  const url = `${STRAPI_URL}/api${path}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Strapi API Error:', error);
    throw error;
  }
}

// Get featured scooters (showOnHomepage = true)
export async function getFeaturedScooters(): Promise<StrapiScooter[]> {
  const response = await fetchAPI<StrapiResponse<StrapiScooter[]>>(
    '/scooters?filters[showOnHomepage][$eq]=true&populate[listingImage]=*&populate[categories]=*&sort[0]=createdAt:desc'
  );
  return response.data;
}

// Get latest scooters (sorted by createdAt DESC)
export async function getLatestScooters(limit: number = 5): Promise<StrapiScooter[]> {
  const response = await fetchAPI<StrapiResponse<StrapiScooter[]>>(
    `/scooters?pagination[limit]=${limit}&populate[listingImage]=*&populate[categories]=*&sort[0]=createdAt:desc`
  );
  return response.data;
}

// Get all scooters
export async function getAllScooters(limit: number = 100): Promise<StrapiScooter[]> {
  const response = await fetchAPI<StrapiResponse<StrapiScooter[]>>(
    `/scooters?populate[listingImage]=*&populate[categories]=*&sort[0]=createdAt:desc&pagination[limit]=${limit}`
  );
  return response.data;
}

// Get scooter by slug
export async function getScooterBySlug(slug: string): Promise<StrapiScooter | null> {
  const response = await fetchAPI<StrapiResponse<StrapiScooter[]>>(
    `/scooters?filters[slug][$eq]=${slug}&populate[listingImage]=*&populate[image]=*&populate[gallery]=*&populate[categories]=*&populate[colors][populate][listingImage]=*&populate[colors][populate][image]=*&populate[colors][populate][gallery]=*`
  );
  return response.data[0] || null;
}

// Helper to get full image URL
export function getImageUrl(media: StrapiMedia): string | null {
  if (!media?.data) return null;

  const image = Array.isArray(media.data) ? media.data[0] : media.data;
  if (!image) return null;

  const url = image.attributes.url;
  // If URL is relative, prepend STRAPI_URL
  return url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
}

// Helper to get multiple image URLs (for gallery)
export function getImageUrls(media: StrapiMedia): string[] {
  if (!media?.data) return [];

  const images = Array.isArray(media.data) ? media.data : [media.data];

  return images
    .filter(img => img && img.attributes?.url)
    .map(img => {
      const url = img.attributes.url;
      return url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
    });
}

