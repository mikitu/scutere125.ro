const { Client } = require('pg');

async function addYamahaXMAX125() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'scutere125',
    user: 'mihaibucse',
  });

  await client.connect();

  try {
    console.log('🚀 Adding Yamaha XMAX 125...');

    // Insert scooter
    const scooterResult = await client.query(
      `INSERT INTO scooters (
        name, slug, tagline, description, price, price_max,
        engine, power, consumption, weight, seat_height, storage,
        features, category, badge,
        created_at, updated_at, published_at,
        created_by_id, updated_by_id
      ) VALUES (
        $1, $2, $3, $4, $5, $6,
        $7, $8, $9, $10, $11, $12,
        $13, $14, $15,
        NOW(), NOW(), NOW(), NULL, NULL
      ) RETURNING id`,
      [
        'Yamaha XMAX 125',
        'yamaha-xmax-125',
        'Experience the MAX',
        'Familia emblematică MAX de scutere sport este cea mai importantă gamă Yamaha de modele premium pentru navetă și agrement. Cu stilul său dinamic, confortul de primă clasă și tehnologia ușor de utilizat, XMAX 125 este introducerea perfectă în lumea celor două roți pentru motocicliștii cu permis de categoria B care doresc o modalitate mai inteligentă de a ajunge în oraș.',
        5680, // price in EUR
        null, // priceMax
        '125 cmc, 4 timpi, răcit cu lichid, SOHC, 4 supape',
        '9.0 kW (12.2 CP) la 8000 rpm',
        '2.3 l/100km (Start & Stop pornit)',
        '167 kg',
        '800 mm',
        '2 căști (sub scaun)',
        JSON.stringify([
          'Motor Blue Core EURO5+ de 125 cmc',
          'Tablou de bord LCD de 4.3 inch',
          'Conectivitate smartphone MyRide',
          'Sistem de control al tracțiunii (TCS)',
          'ABS pe ambele roți',
          'Pornire fără cheie Smart Key',
          'Sistem Start & Stop',
          'Încărcător USB tip C',
          'Iluminare Full LED',
          'Ghidon și ecran reglabile',
          'Spațiu depozitare pentru 2 căști',
          'Far LED în formă de X'
        ]),
        'sport',
        null
      ]
    );

    const scooterId = scooterResult.rows[0].id;
    console.log(`✅ Scooter added with ID: ${scooterId}`);

    // Add colors
    const colors = [
      {
        name: 'Icon Blue',
        code: 'icon-blue',
        hex: '#1e3a8a',
        imageFile: 'Yamaha-XMAX-125-blue.jpg'
      },
      {
        name: 'Tech Kamo',
        code: 'tech-kamo',
        hex: '#4a5568',
        imageFile: 'Yamaha-XMAX-125-tech-kamo.jpg'
      }
    ];

    for (const color of colors) {
      console.log(`\n📦 Adding color: ${color.name}`);
      
      const colorResult = await client.query(
        `INSERT INTO scooter_colors (
          name, code, hex,
          created_at, updated_at, published_at,
          created_by_id, updated_by_id
        ) VALUES (
          $1, $2, $3,
          NOW(), NOW(), NOW(), NULL, NULL
        ) RETURNING id`,
        [color.name, color.code, color.hex]
      );

      const colorId = colorResult.rows[0].id;
      console.log(`  ✅ Color added with ID: ${colorId}`);

      // Link color to scooter
      await client.query(
        `INSERT INTO scooter_colors_scooter_links (
          scooter_color_id, scooter_id, scooter_color_order
        ) VALUES ($1, $2, 1)`,
        [colorId, scooterId]
      );
      console.log(`  ✅ Color linked to scooter`);
    }

    console.log('\n🎉 Yamaha XMAX 125 added successfully!');
    console.log(`Total colors: ${colors.length}`);
    console.log('\n📝 Next steps:');
    console.log('1. Upload images to Strapi Media Library');
    console.log('2. Assign images to scooter and colors in Strapi Admin');
    console.log('3. Images available:');
    colors.forEach(c => console.log(`   - ${c.imageFile}`));

  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  } finally {
    await client.end();
  }
}

addYamahaXMAX125();

