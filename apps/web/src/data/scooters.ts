export interface ScooterColor {
  id: number;
  name: string;
  code: string;
  hex?: string;
  listingImage?: string;  // URL resolved from Strapi
  image?: string;         // URL resolved from Strapi
  gallery?: string[];     // URLs resolved from Strapi
}

export interface Scooter {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  price: number;
  priceMax?: number;
  listingImage: string; // Imaginea pentru catalog/listă
  image: string; // Imaginea principală pentru pagina de detalii
  gallery: string[];
  specs: {
    engine: string;
    power: string;
    consumption: string;
    weight: string;
    seatHeight: string;
    storage: string;
  };
  features: string[];
  category: 'urban' | 'sport' | 'premium';
  badge?: string;
  colors?: ScooterColor[];
}

export const scooters: Scooter[] = [
  {
    id: 'sh-mode-125',
    name: 'Honda SH Mode 125',
    slug: 'sh-mode-125',
    tagline: 'Stilul urban perfect',
    description: 'Cauți un scuter eficient de 125cc? Dimensiunile compacte, construcția practică și costurile reduse de întreținere fac din SH Mode 125 partenerul perfect pentru viața urbană agitată. Cu motor răcit cu lichid și sistem eSP, oferă performanță și economie excepționale.',
    price: 2990,
    listingImage: '/images/scooters/Honda-SH-Mode-125.jpg',
    image: '/images/scooters/Honda-SH-Mode-125.jpg',
    gallery: [
      'https://www.honda.co.uk/content/dam/central/motorcycles/colour-picker/scooter/shmode125/shmode_2024/nh-b35p_pearl_jasmine_white/24YM_SH_MODE_NH-B35P_PEARL_JASMINE_WHITE_RHS.png/jcr:content/renditions/c1_r.png',
      'https://www.honda.co.uk/content/dam/central/motorcycles/colour-picker/scooter/sh125i/sh125i_2024/nh-a84p_pearl_nightstar_black/24YM_SH125_Pearl_Nighstar_Black_NHA84_RHS.png/jcr:content/renditions/c1_r.png',
      'https://www.honda.co.uk/content/dam/central/motorcycles/colour-picker/scooter/shmode125/shmode_2024/nh-b35p_pearl_jasmine_white/24YM_SH_MODE_NH-B35P_PEARL_JASMINE_WHITE_RHS.png/jcr:content/renditions/c1_r.png',
    ],
    specs: {
      engine: '125cc răcit lichid SOHC',
      power: '8.7 kW (11.8 CP) @ 8,500 rpm',
      consumption: '2.2L/100km',
      weight: '118 kg',
      seatHeight: '765 mm',
      storage: '18L sub șa',
    },
    features: [
      'Motor eSP răcit cu lichid',
      'Start-Stop automat (Idling Stop)',
      'Spațiu generos sub șa pentru cască',
      'Frână combinată CBS',
      'Iluminare LED completă',
      'Cuplu: 12.0 Nm @ 5,000 rpm',
    ],
    category: 'urban',
    badge: 'Cel mai accesibil',
  },
  {
    id: 'pcx-125',
    name: 'Honda PCX 125',
    slug: 'pcx-125',
    tagline: 'Tehnologie de top',
    description: 'Scuterul premium cu Smart Key, port USB-C și control al tracțiunii HSTC. Confort și siguranță la superlativ pentru deplasările tale zilnice. Noul model 2025 vine cu ecran TFT de 5 inch și motor eSP+ îmbunătățit.',
    price: 3590,
    priceMax: 3950,
    listingImage: '/images/scooters/Honda-PCX-125.jpg',
    image: '/images/scooters/Honda-PCX-125.jpg',
    gallery: [
      'https://www.honda.co.uk/content/dam/central/motorcycles/colour-picker/scooter/pcx/pcx125_2025/pb-426p_pearl_darl_ash_blue_two/25YM_PCX-125_ED_Studio_Disk_PEARL-DARK-ASH-BLUE-2_RHS.png/jcr:content/renditions/c1_r.png',
      'https://www.honda.co.uk/content/dam/central/motorcycles/colour-picker/scooter/sh350i/sh350i_2025/r-414p_matte_pearl_diaspro_red/25YM_SH350_MAT_PEARL_DIASPRO_RED_R-414P_RHS-1728x972.png/jcr:content/renditions/c1_r.png',
      'https://www.honda.co.uk/content/dam/central/motorcycles/colour-picker/scooter/pcx/pcx125_2025/pb-426p_pearl_darl_ash_blue_two/25YM_PCX-125_ED_Studio_Disk_PEARL-DARK-ASH-BLUE-2_RHS.png/jcr:content/renditions/c1_r.png',
    ],
    specs: {
      engine: '125cc eSP+ răcit lichid',
      power: '9.2 kW (12.5 CP) @ 8,750 rpm',
      consumption: '2.1L/100km',
      weight: '134 kg',
      seatHeight: '764 mm',
      storage: '30L sub șa',
    },
    features: [
      'Honda Smart Key',
      'Port USB-C',
      'Control tracțiune HSTC',
      'Ecran TFT 5 inch (opțional)',
      'Spațiu 30L sub șa pentru 2 căști',
      'Cuplu: 11.7 Nm @ 6,500 rpm',
    ],
    category: 'premium',
    badge: 'Best Seller',
  },
  {
    id: 'forza-125',
    name: 'Honda Forza 125',
    slug: 'forza-125',
    tagline: 'Performanță maximă',
    description: 'Vrei calitatea supremă? Ai găsit-o. Forza 125, scuterul nostru sportiv de 125cc le are pe toate. Eficiență de combustibil incredibilă și autonomie mare, grație motorului eSP+, cu performanțe de top în clasa sa. Parbriz electric cu cursă de 180mm și ecran TFT de 5 inch.',
    price: 6050,
    listingImage: '/images/scooters/Honda-Forza-125.jpg',
    image: '/images/scooters/Honda-Forza-125.jpg',
    gallery: [
      'https://www.honda.co.uk/content/dam/central/motorcycles/colour-picker/scooter/forza125/forza125_2025/pb-397p_matte_pearl_pacific_blue/25YM_FORZA125_PEARL_MAT_PEARL_PACIFIC_BLUE_PB-397P_RHS.png/jcr:content/renditions/c1_r.png',
      'https://www.honda.co.uk/content/dam/central/motorcycles/scooters/forza-125-2025/Overview/Hero/honda-forza-125-hero-1728x972.jpg',
      'https://www.honda.co.uk/content/dam/central/motorcycles/scooters/forza-125-2025/Overview/ImageCarousel/honda-forza-125-carousel-image-1-1728x972.jpg',
    ],
    specs: {
      engine: '125cc eSP+ răcit lichid 4V SOHC',
      power: '10.7 kW (14.5 CP) @ 8,750 rpm',
      consumption: '2.0L/100km',
      weight: '164 kg',
      seatHeight: '780 mm',
      storage: '48L sub șa',
    },
    features: [
      'Motor eSP+ cu 4 supape',
      'Parbriz electric (cursă 180mm)',
      'Control tracțiune HSTC',
      'Ecran TFT 5 inch color',
      'Emergency Stop Signal (ESS)',
      'Cuplu: 12.3 Nm @ 6,500 rpm',
    ],
    category: 'sport',
    badge: 'Premium',
  },
];

export const getScooterBySlug = (slug: string): Scooter | undefined => {
  return scooters.find((s) => s.slug === slug);
};

// Funcții pentru a prelua date din Strapi
import { getScooters as getStrapiScooters, getHomepageScooters as getStrapiHomepageScooters, getScooterBySlug as getStrapiScooterBySlug } from '@/lib/strapi';
import { adaptStrapiScooters, adaptStrapiScooter } from '@/lib/scooter-adapter';

export async function fetchScooters(): Promise<Scooter[]> {
  try {
    const strapiScooters = await getStrapiScooters();
    return adaptStrapiScooters(strapiScooters);
  } catch (error) {
    console.error('Error fetching scooters from Strapi:', error);
    // Fallback la datele statice
    return scooters;
  }
}

export async function fetchHomepageScooters(): Promise<Scooter[]> {
  try {
    const strapiScooters = await getStrapiHomepageScooters();
    return adaptStrapiScooters(strapiScooters);
  } catch (error) {
    console.error('Error fetching homepage scooters from Strapi:', error);
    // Fallback la primele 3 scutere statice
    return scooters.slice(0, 3);
  }
}

export async function fetchScooterBySlug(slug: string): Promise<Scooter | null> {
  try {
    const strapiScooter = await getStrapiScooterBySlug(slug);
    if (!strapiScooter) return null;
    return adaptStrapiScooter(strapiScooter);
  } catch (error) {
    console.error('Error fetching scooter from Strapi:', error);
    // Fallback la datele statice
    return getScooterBySlug(slug) || null;
  }
}

export async function fetchScootersForQuoteModal(): Promise<Array<{ id: number; name: string; slug: string }>> {
  try {
    const allScooters = await fetchScooters();
    return allScooters.map((scooter, index) => ({
      id: index + 1,
      name: scooter.name,
      slug: scooter.slug,
    }));
  } catch (error) {
    console.error('Error fetching scooters for quote modal:', error);
    return scooters.map((scooter, index) => ({
      id: index + 1,
      name: scooter.name,
      slug: scooter.slug,
    }));
  }
}

export async function fetchScootersForFooter(): Promise<Array<{ name: string; slug: string }>> {
  try {
    const homepageScooters = await fetchHomepageScooters();
    return homepageScooters.map((scooter) => ({
      name: scooter.name,
      slug: scooter.slug,
    }));
  } catch (error) {
    console.error('Error fetching scooters for footer:', error);
    return scooters.slice(0, 3).map((scooter) => ({
      name: scooter.name,
      slug: scooter.slug,
    }));
  }
}
