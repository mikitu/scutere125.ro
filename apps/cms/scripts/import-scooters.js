const { Client } = require('pg');

const scootersData = [
  {
    name: 'Honda SH Mode 125',
    slug: 'sh-mode-125',
    tagline: 'Stilul urban perfect',
    description: 'Cauți un scuter eficient de 125cc? Dimensiunile compacte, construcția practică și costurile reduse de întreținere fac din SH Mode 125 partenerul perfect pentru viața urbană agitată. Cu motor răcit cu lichid și sistem eSP, oferă performanță și economie excepționale.',
    price: 2990,
    price_max: null,
    engine: '125cc răcit lichid SOHC',
    power: '8.7 kW (11.8 CP) @ 8,500 rpm',
    consumption: '2.2L/100km',
    weight: '118 kg',
    seat_height: '765 mm',
    storage: '18L sub șa',
    features: JSON.stringify([
      'Motor eSP răcit cu lichid',
      'Start-Stop automat (Idling Stop)',
      'Spațiu generos sub șa pentru cască',
      'Frână combinată CBS',
      'Iluminare LED completă',
      'Cuplu: 12.0 Nm @ 5,000 rpm',
    ]),
    category: 'urban',
    badge: 'Cel mai accesibil',
  },
  {
    name: 'Honda PCX 125',
    slug: 'pcx-125',
    tagline: 'Tehnologie de top',
    description: 'Scuterul premium cu Smart Key, port USB-C și control al tracțiunii HSTC. Confort și siguranță la superlativ pentru deplasările tale zilnice. Noul model 2025 vine cu ecran TFT de 5 inch și motor eSP+ îmbunătățit.',
    price: 3590,
    price_max: 3950,
    engine: '125cc eSP+ răcit lichid',
    power: '9.2 kW (12.5 CP) @ 8,750 rpm',
    consumption: '2.1L/100km',
    weight: '134 kg',
    seat_height: '764 mm',
    storage: '30L sub șa',
    features: JSON.stringify([
      'Honda Smart Key',
      'Port USB-C',
      'Control tracțiune HSTC',
      'Ecran TFT 5 inch (opțional)',
      'Spațiu 30L sub șa pentru 2 căști',
      'Cuplu: 11.7 Nm @ 6,500 rpm',
    ]),
    category: 'premium',
    badge: 'Best Seller',
  },
  {
    name: 'Honda Forza 125',
    slug: 'forza-125',
    tagline: 'Performanță maximă',
    description: 'Vrei calitatea supremă? Ai găsit-o. Forza 125, scuterul nostru sportiv de 125cc le are pe toate. Eficiență de combustibil incredibilă și autonomie mare, grație motorului eSP+, cu performanțe de top în clasa sa. Parbriz electric cu cursă de 180mm și ecran TFT de 5 inch.',
    price: 6050,
    price_max: null,
    engine: '125cc eSP+ răcit lichid 4V SOHC',
    power: '10.7 kW (14.5 CP) @ 8,750 rpm',
    consumption: '2.0L/100km',
    weight: '164 kg',
    seat_height: '780 mm',
    storage: '48L sub șa',
    features: JSON.stringify([
      'Motor eSP+ cu 4 supape',
      'Parbriz electric (cursă 180mm)',
      'Control tracțiune HSTC',
      'Ecran TFT 5 inch color',
      'Emergency Stop Signal (ESS)',
      'Cuplu: 12.3 Nm @ 6,500 rpm',
    ]),
    category: 'sport',
    badge: 'Premium',
  },
];

async function importScooters() {
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

    for (const scooter of scootersData) {
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

    console.log('\n🎉 Import finalizat cu succes!');
  } catch (error) {
    console.error('❌ Eroare la import:', error.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

importScooters();

