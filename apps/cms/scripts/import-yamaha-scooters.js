const { Client } = require('pg');

const yamahaScooters = [
  {
    name: 'Yamaha NMAX 125',
    slug: 'yamaha-nmax-125',
    tagline: 'Sportiv și eficient',
    description: 'NMAX 125 este scuterul sport perfect pentru oraș. Cu design modern, motor Blue Core eficient și tehnologie avansată, oferă o experiență de conducere dinamică și economică. Ideal pentru traficul urban intens.',
    price: 3490,
    price_max: null,
    engine: '125cc Blue Core răcit lichid',
    power: '9.0 kW (12.2 CP) @ 8,000 rpm',
    consumption: '2.1L/100km',
    weight: '131 kg',
    seat_height: '765 mm',
    storage: '24L sub șa',
    features: JSON.stringify([
      'Motor Blue Core eficient',
      'Sistem Start-Stop',
      'Iluminare LED completă',
      'Frână ABS',
      'Port USB',
      'Cuplu: 11.2 Nm @ 6,000 rpm',
    ]),
    category: 'sport',
    badge: null,
  },
  {
    name: 'Yamaha NMAX 125 Tech Max',
    slug: 'yamaha-nmax-125-tech-max',
    tagline: 'Tehnologie premium',
    description: 'Versiunea Tech Max a NMAX-ului aduce tehnologie de vârf: ecran TFT color, conectivitate smartphone și sistem de control al tracțiunii. Pentru cei care vor cel mai bun echipament.',
    price: 3890,
    price_max: null,
    engine: '125cc Blue Core răcit lichid',
    power: '9.0 kW (12.2 CP) @ 8,000 rpm',
    consumption: '2.1L/100km',
    weight: '133 kg',
    seat_height: '765 mm',
    storage: '24L sub șa',
    features: JSON.stringify([
      'Ecran TFT color 4.2 inch',
      'Conectivitate smartphone',
      'Control tracțiune TCS',
      'Frână ABS',
      'Port USB',
      'Sistem Start-Stop',
    ]),
    category: 'premium',
    badge: 'Tech Max',
  },
  {
    name: 'Yamaha XMAX 125',
    slug: 'yamaha-xmax-125-2026',
    tagline: 'Maxiscuter premium',
    description: 'XMAX 125 este maxiscuterul de referință în clasa 125cc. Design sportiv, confort superior și echipament complet pentru călătorii lungi. Modelul 2026 vine cu îmbunătățiri semnificative.',
    price: 5290,
    price_max: null,
    engine: '125cc Blue Core răcit lichid',
    power: '9.2 kW (12.5 CP) @ 8,000 rpm',
    consumption: '2.0L/100km',
    weight: '179 kg',
    seat_height: '795 mm',
    storage: '45L sub șa',
    features: JSON.stringify([
      'Motor Blue Core performant',
      'Parbriz ajustabil',
      'Frână ABS',
      'Control tracțiune TCS',
      'Iluminare LED adaptivă',
      'Cuplu: 11.5 Nm @ 6,000 rpm',
    ]),
    category: 'sport',
    badge: 'Nou 2026',
  },
  {
    name: 'Yamaha XMAX 125 Tech Max',
    slug: 'yamaha-xmax-125-tech-max',
    tagline: 'Maxim de tehnologie',
    description: 'Versiunea Tech Max a XMAX-ului oferă tot ce poți dori: ecran TFT de 7 inch, conectivitate completă, cruise control și sistem de navigație integrat. Luxul suprem în clasa 125cc.',
    price: 5790,
    price_max: null,
    engine: '125cc Blue Core răcit lichid',
    power: '9.2 kW (12.5 CP) @ 8,000 rpm',
    consumption: '2.0L/100km',
    weight: '181 kg',
    seat_height: '795 mm',
    storage: '45L sub șa',
    features: JSON.stringify([
      'Ecran TFT 7 inch color',
      'Conectivitate smartphone completă',
      'Cruise control',
      'Control tracțiune TCS',
      'Frână ABS',
      'Sistem navigație integrat',
    ]),
    category: 'premium',
    badge: 'Top Spec',
  },
  {
    name: 'Yamaha Tricity 125',
    slug: 'yamaha-tricity-125',
    tagline: 'Stabilitate maximă',
    description: 'Tricity 125 este singurul scuter cu 3 roți în clasa 125cc. Două roți față oferă stabilitate excepțională și încredere maximă în orice condiții. Perfect pentru începători sau pentru cei care vor siguranță maximă.',
    price: 4590,
    price_max: null,
    engine: '125cc Blue Core răcit lichid',
    power: '9.0 kW (12.2 CP) @ 8,000 rpm',
    consumption: '2.2L/100km',
    weight: '165 kg',
    seat_height: '780 mm',
    storage: '22L sub șa',
    features: JSON.stringify([
      'Sistem LMW cu 3 roți',
      'Stabilitate excepțională',
      'Frână ABS',
      'Motor Blue Core',
      'Iluminare LED',
      'Cuplu: 11.2 Nm @ 6,000 rpm',
    ]),
    category: 'urban',
    badge: '3 Roți',
  },
  {
    name: 'Yamaha Rayzr',
    slug: 'yamaha-rayzr',
    tagline: 'Design futurist',
    description: 'Rayzr este scuterul cu cel mai îndrăzneț design din gama Yamaha. Linii agresive, LED-uri distinctive și echipament modern. Pentru cei care vor să iasă în evidență.',
    price: 3190,
    price_max: null,
    engine: '125cc răcit aer',
    power: '8.2 kW (11.1 CP) @ 7,500 rpm',
    consumption: '2.3L/100km',
    weight: '116 kg',
    seat_height: '775 mm',
    storage: '21L sub șa',
    features: JSON.stringify([
      'Design futurist unic',
      'Iluminare LED completă',
      'Tablou digital',
      'Port USB',
      'Frână combinată UBS',
      'Cuplu: 10.5 Nm @ 5,500 rpm',
    ]),
    category: 'urban',
    badge: 'Design Unic',
  },
  {
    name: "Yamaha D'elight 125",
    slug: 'yamaha-delight-125',
    tagline: 'Accesibil și practic',
    description: "D'elight 125 este scuterul perfect pentru cei care caută un vehicul economic și ușor de manevrat. Compact, eficient și cu costuri de întreținere minime. Ideal pentru oraș.",
    price: 2790,
    price_max: null,
    engine: '125cc răcit aer',
    power: '8.1 kW (11.0 CP) @ 7,500 rpm',
    consumption: '2.4L/100km',
    weight: '104 kg',
    seat_height: '775 mm',
    storage: '20L sub șa',
    features: JSON.stringify([
      'Cel mai ușor din gamă',
      'Consum redus',
      'Iluminare LED',
      'Tablou digital',
      'Frână combinată UBS',
      'Cuplu: 10.3 Nm @ 5,500 rpm',
    ]),
    category: 'urban',
    badge: 'Cel mai ieftin',
  },
];

async function importYamahaScooters() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'scutere125',
    user: 'mihaibucse',
    password: '',
  });

  try {
    await client.connect();
    console.log('✅ Conectat la PostgreSQL');

    for (const scooter of yamahaScooters) {
      const query = `
        INSERT INTO scooters (
          name, slug, tagline, description, price, price_max,
          engine, power, consumption, weight, seat_height, storage,
          features, category, badge,
          published_at, created_at, updated_at, created_by_id, updated_by_id
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15,
          NOW(), NOW(), NOW(), 1, 1
        )
        ON CONFLICT (slug) DO UPDATE SET
          name = EXCLUDED.name,
          tagline = EXCLUDED.tagline,
          description = EXCLUDED.description,
          price = EXCLUDED.price,
          price_max = EXCLUDED.price_max,
          engine = EXCLUDED.engine,
          power = EXCLUDED.power,
          consumption = EXCLUDED.consumption,
          weight = EXCLUDED.weight,
          seat_height = EXCLUDED.seat_height,
          storage = EXCLUDED.storage,
          features = EXCLUDED.features,
          category = EXCLUDED.category,
          badge = EXCLUDED.badge,
          updated_at = NOW()
        RETURNING id, name;
      `;

      const values = [
        scooter.name,
        scooter.slug,
        scooter.tagline,
        scooter.description,
        scooter.price,
        scooter.price_max,
        scooter.engine,
        scooter.power,
        scooter.consumption,
        scooter.weight,
        scooter.seat_height,
        scooter.storage,
        scooter.features,
        scooter.category,
        scooter.badge,
      ];

      const result = await client.query(query, values);
      console.log(`✅ Importat: ${result.rows[0].name} (ID: ${result.rows[0].id})`);
    }

    console.log('\n🎉 Import Yamaha finalizat cu succes!');
    console.log(`📊 Total scutere adăugate: ${yamahaScooters.length}`);
  } catch (error) {
    console.error('❌ Eroare la import:', error.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

importYamahaScooters();

