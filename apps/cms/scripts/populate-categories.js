#!/usr/bin/env node

/**
 * Script to populate categories in Strapi database
 * Run with: node apps/cms/scripts/populate-categories.js
 */

const { Client } = require('pg');

const categories = [
  {
    name: 'urban',
    slug: 'urban',
    displayName: 'Urban',
    icon: 'building',
    order: 1,
  },
  {
    name: 'premium',
    slug: 'premium',
    displayName: 'Premium',
    icon: 'star',
    order: 2,
  },
  {
    name: 'sport',
    slug: 'sport',
    displayName: 'Sport',
    icon: 'zap',
    order: 3,
  },
];

async function populateCategories() {
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

    // Check if categories table exists
    const tableCheck = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'categories'
      );
    `);

    if (!tableCheck.rows[0].exists) {
      console.log('❌ Tabelul categories nu există încă. Pornește Strapi pentru a crea tabelele.');
      await client.end();
      return;
    }

    // Insert categories
    for (const category of categories) {
      const checkQuery = `SELECT id FROM categories WHERE slug = $1`;
      const checkResult = await client.query(checkQuery, [category.slug]);

      if (checkResult.rows.length > 0) {
        console.log(`⏭️  Categoria "${category.displayName}" există deja (ID: ${checkResult.rows[0].id})`);
        continue;
      }

      const insertQuery = `
        INSERT INTO categories (
          name, slug, display_name, icon, "order",
          published_at, created_at, updated_at, created_by_id, updated_by_id
        ) VALUES (
          $1, $2, $3, $4, $5,
          NOW(), NOW(), NOW(), 1, 1
        )
        RETURNING id
      `;

      const result = await client.query(insertQuery, [
        category.name,
        category.slug,
        category.displayName,
        category.icon,
        category.order,
      ]);

      console.log(`✅ Categoria "${category.displayName}" creată (ID: ${result.rows[0].id})`);
    }

    console.log('\n✅ Toate categoriile au fost procesate!');

    await client.end();
  } catch (error) {
    console.error('❌ Eroare:', error.message);
    await client.end();
    process.exit(1);
  }
}

populateCategories();

