#!/usr/bin/env node

/**
 * Script to set manufacturer field for existing scooters
 * Run with: node apps/cms/scripts/set-manufacturers.js
 */

const { Client } = require('pg');

// Mapping of scooter slugs to manufacturers
const scooterManufacturerMapping = {
  'sh-mode-125': 'Honda',
  'pcx-125': 'Honda',
  'forza-125': 'Honda',
  'yamaha-nmax-125': 'Yamaha',
  'yamaha-nmax-125-tech-max': 'Yamaha',
  'yamaha-xmax-125': 'Yamaha',
  'yamaha-xmax-125-tech-max': 'Yamaha',
  'yamaha-tricity-125': 'Yamaha',
  'yamaha-delight-125': 'Yamaha',
  'yamaha-rayzr': 'Yamaha',
};

async function setManufacturers() {
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

    // Get all scooters
    const scootersResult = await client.query('SELECT id, slug, name FROM scooters');
    
    let updated = 0;
    let skipped = 0;

    for (const scooter of scootersResult.rows) {
      const manufacturer = scooterManufacturerMapping[scooter.slug];
      
      if (!manufacturer) {
        console.log(`⚠️  Nu există manufacturer pentru scuterul "${scooter.name}" (${scooter.slug})`);
        skipped++;
        continue;
      }

      // Update manufacturer
      const updateQuery = `
        UPDATE scooters
        SET manufacturer = $1, updated_at = NOW()
        WHERE id = $2
      `;
      await client.query(updateQuery, [manufacturer, scooter.id]);
      console.log(`✅ ${scooter.name} → ${manufacturer}`);
      updated++;
    }

    console.log(`\n📊 Rezumat:`);
    console.log(`   ✅ Actualizate: ${updated}`);
    console.log(`   ⚠️  Sărite: ${skipped}`);
    console.log(`   📦 Total: ${scootersResult.rows.length}`);

    await client.end();
  } catch (error) {
    console.error('❌ Eroare:', error.message);
    console.error(error);
    await client.end();
    process.exit(1);
  }
}

setManufacturers();

