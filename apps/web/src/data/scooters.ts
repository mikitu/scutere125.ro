export interface Scooter {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  price: number;
  priceMax?: number;
  image: string;
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
}

export const scooters: Scooter[] = [
  {
    id: 'sh-mode-125',
    name: 'Honda SH Mode 125',
    slug: 'sh-mode-125',
    tagline: 'Stilul urban perfect',
    description: 'Scuterul compact ideal pentru viața urbană aglomerată. Design elegant, costuri reduse de întreținere și fiabilitate Honda.',
    price: 2990,
    image: '/images/scooters/sh-mode-125.webp',
    gallery: [
      '/images/scooters/sh-mode-125.webp',
      '/images/scooters/sh-mode-125-2.webp',
      '/images/scooters/sh-mode-125-3.webp',
    ],
    specs: {
      engine: '125cc eSP',
      power: '10.1 CP',
      consumption: '2.2L/100km',
      weight: '116 kg',
      seatHeight: '765 mm',
      storage: '18L sub șa',
    },
    features: [
      'Motor eSP eficient',
      'Start-Stop automat',
      'Spațiu generos sub șa',
      'Frână combinată CBS',
      'Iluminare LED',
    ],
    category: 'urban',
    badge: 'Cel mai accesibil',
  },
  {
    id: 'pcx-125',
    name: 'Honda PCX 125',
    slug: 'pcx-125',
    tagline: 'Tehnologie de top',
    description: 'Scuterul premium cu Smart Key, port USB-C și control al tracțiunii HSTC. Confort și siguranță la superlativ.',
    price: 3590,
    priceMax: 3950,
    image: '/images/scooters/pcx-125.webp',
    gallery: [
      '/images/scooters/pcx-125.webp',
      '/images/scooters/pcx-125-2.webp',
      '/images/scooters/pcx-125-3.webp',
    ],
    specs: {
      engine: '125cc eSP+',
      power: '12.5 CP',
      consumption: '2.1L/100km',
      weight: '132 kg',
      seatHeight: '764 mm',
      storage: '30L sub șa',
    },
    features: [
      'Honda Smart Key',
      'Port USB-C',
      'Control tracțiune HSTC',
      'Frână disc 220mm spate',
      'Spațiu 30L sub șa',
      'Panou LCD digital',
    ],
    category: 'premium',
    badge: 'Best Seller',
  },
  {
    id: 'forza-125',
    name: 'Honda Forza 125',
    slug: 'forza-125',
    tagline: 'Performanță maximă',
    description: 'Scuterul sportiv cu motor eSP+ și eficiență incredibilă. Autonomie mare și performanțe de top în clasa sa.',
    price: 6050,
    image: '/images/scooters/forza-125.webp',
    gallery: [
      '/images/scooters/forza-125.webp',
      '/images/scooters/forza-125-2.webp',
      '/images/scooters/forza-125-3.webp',
    ],
    specs: {
      engine: '125cc eSP+',
      power: '15.4 CP',
      consumption: '2.0L/100km',
      weight: '144 kg',
      seatHeight: '780 mm',
      storage: '48L sub șa',
    },
    features: [
      'Motor eSP+ performant',
      'Parbriz electric',
      'Control tracțiune HSTC',
      'Spațiu 48L sub șa',
      'Suspensie premium',
      'Frâne ABS',
    ],
    category: 'sport',
    badge: 'Premium',
  },
];

export const getScooterBySlug = (slug: string): Scooter | undefined => {
  return scooters.find((s) => s.slug === slug);
};

