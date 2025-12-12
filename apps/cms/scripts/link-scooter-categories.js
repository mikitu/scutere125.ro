#!/usr/bin/env node

/**
 * Script to link scooters to categories based on old category enum field
 * Run with: node apps/cms/scripts/link-scooter-categories.js
 */

const { Client } = require('pg');

// Mapping of scooter slugs to category slugs
const scooterCategoryMapping = {
  'sh-mode-125': ['urban'],
  'pcx-125': ['premium', 'urban'],
  'forza-125': ['sport', 'premium'],
  'yamaha-nmax-125': ['urban'],
  'yamaha-nmax-125-tech-max': ['premium', 'urban'],
  'yamaha-xmax-125': ['sport'],
  'yamaha-xmax-125-tech-max': ['sport', 'premium'],
  'yamaha-tricity-125': ['urban'],
  'yamaha-delight-125': ['urban'],
  'yamaha-rayzr': ['sport'],
};

async function linkScooterCategories() {
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

    // Get all categories
    const categoriesResult = await client.query('SELECT id, slug FROM categories');
    const categoriesMap = {};
    categoriesResult.rows.forEach(row => {
      categoriesMap[row.slug] = row.id;
    });

    console.log('📋 Categorii disponibile:', Object.keys(categoriesMap));

    // Get all scooters
    const scootersResult = await client.query('SELECT id, slug, name FROM scooters');
    
    for (const scooter of scootersResult.rows) {
      const categoryNames = scooterCategoryMapping[scooter.slug];
      
      if (!categoryNames) {
        console.log(`⚠️  Nu există mapping pentru scuterul "${scooter.name}" (${scooter.slug})`);
        continue;
      }

      console.log(`\n🔗 Procesez scuterul: ${scooter.name}`);

      for (const categoryName of categoryNames) {
        const categoryId = categoriesMap[categoryName];
        
        if (!categoryId) {
          console.log(`  ❌ Categoria "${categoryName}" nu există în database`);
          continue;
        }

        // Check if link already exists
        const checkQuery = `
          SELECT * FROM scooters_categories_links
          WHERE scooter_id = $1 AND category_id = $2
        `;
        const checkResult = await client.query(checkQuery, [scooter.id, categoryId]);

        if (checkResult.rows.length > 0) {
          console.log(`  ⏭️  Link deja există: ${categoryName}`);
          continue;
        }

        // Create link
        const insertQuery = `
          INSERT INTO scooters_categories_links (scooter_id, category_id, scooter_order, category_order)
          VALUES ($1, $2, 1, 1)
        `;
        await client.query(insertQuery, [scooter.id, categoryId]);
        console.log(`  ✅ Link creat: ${categoryName}`);
      }
    }

    console.log('\n✅ Toate link-urile au fost procesate!');

    await client.end();
  } catch (error) {
    console.error('❌ Eroare:', error.message);
    console.error(error);
    await client.end();
    process.exit(1);
  }
}

linkScooterCategories();

