const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

interface StrapiImage {
  id: number;
  attributes: {
    url: string;
    alternativeText?: string;
    width?: number;
    height?: number;
    name?: string;
    ext?: string;
    mime?: string;
    size?: number;
  };
}

interface StrapiMedia {
  data: StrapiImage | StrapiImage[] | null;
}

export interface StrapiCategory {
  id: number;
  attributes: {
    name: string;
    slug: string;
    displayName: string;
    icon?: string;
    order: number;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
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
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
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
    mainImage: StrapiMedia;
    image: StrapiMedia;
    gallery: StrapiMedia;
    engine: string;
    power: string;
    consumption: string;
    weight: string;
    seatHeight: string;
    storage: string;
    features: string[];
    category: 'urban' | 'sport' | 'premium';
    badge?: string;
    showOnHomepage?: boolean;
    colors?: {
      data: StrapiScooterColor[];
    };
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export interface StrapiFaq {
  id: number;
  attributes: {
    question: string;
    answer: string;
    category: 'general' | 'permis' | 'achizitie' | 'intretinere' | 'tehnic';
    order: number;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

async function fetchAPI<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (STRAPI_API_TOKEN) {
    headers['Authorization'] = `Bearer ${STRAPI_API_TOKEN}`;
  }

  const url = `${STRAPI_URL}/api${path}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export async function getScooters(): Promise<StrapiScooter[]> {
  const response = await fetchAPI<StrapiResponse<StrapiScooter[]>>(
    '/scooters?populate[listingImage]=*&populate[mainImage]=*&populate[image]=*&populate[gallery]=*&populate[colors][populate][listingImage]=*&populate[colors][populate][image]=*&populate[colors][populate][gallery]=*',
    {
      cache: 'no-store', // Disable cache during development
    }
  );

  return response.data;
}

export async function getHomepageScooters(): Promise<StrapiScooter[]> {
  const response = await fetchAPI<StrapiResponse<StrapiScooter[]>>(
    '/scooters?filters[showOnHomepage][$eq]=true&populate[listingImage]=*&populate[mainImage]=*&populate[image]=*&populate[gallery]=*&populate[colors][populate][listingImage]=*&populate[colors][populate][image]=*&populate[colors][populate][gallery]=*',
    {
      cache: 'no-store', // Disable cache during development
    }
  );

  return response.data;
}

export async function getScooterBySlug(slug: string): Promise<StrapiScooter | null> {
  const response = await fetchAPI<StrapiResponse<StrapiScooter[]>>(
    `/scooters?filters[slug][$eq]=${slug}&populate[listingImage]=*&populate[mainImage]=*&populate[image]=*&populate[gallery]=*&populate[colors][populate][listingImage]=*&populate[colors][populate][image]=*&populate[colors][populate][gallery]=*`,
    {
      cache: 'no-store', // Disable cache during development
    }
  );

  return response.data[0] || null;
}

export function getStrapiMediaUrl(media: StrapiMedia): string {
  if (!media?.data) return '';

  const imageData = Array.isArray(media.data) ? media.data[0] : media.data;
  if (!imageData) return '';

  const url = imageData.attributes.url;
  if (!url) return '';

  // If URL is already absolute, return it
  if (url.startsWith('http')) {
    return url;
  }

  // Otherwise, prepend Strapi URL
  return `${STRAPI_URL}${url}`;
}

// Category API functions
export async function getCategories(): Promise<StrapiCategory[]> {
  const response = await fetchAPI<StrapiResponse<StrapiCategory[]>>(
    '/categories?sort=order:asc',
    {
      cache: 'no-store',
    }
  );
  return response.data;
}

// FAQ API functions
export async function getFaqs(): Promise<StrapiFaq[]> {
  const response = await fetchAPI<StrapiResponse<StrapiFaq[]>>(
    '/faqs?sort=order:asc,id:asc',
    {
      cache: 'no-store',
    }
  );
  return response.data;
}

export function getStrapiMediaUrls(media: StrapiMedia): string[] {
  if (!media?.data) return [];

  const images = Array.isArray(media.data) ? media.data : [media.data];

  return images.map(img => {
    const url = img.attributes.url;
    return url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
  });
}

