const { addColorsToScooter } = require('./add-color-to-scooter');

/**
 * Yamaha NMAX 125 (2025) - Official colors
 * Source: https://www.yamaha-motor.eu/ro/ro/scooters/sport/pdp/nmax-125/
 */
const nmaxColors = [
  {
    name: 'Icon Black',
    code: 'icon-black',
    hex: '#1a1a1a',
    listingImageFile: 'Yamaha-NMAX-125-blue.jpg', // temporary - needs proper image
    imageFile: 'Yamaha-NMAX-125-blue.jpg',
  },
  {
    name: 'Milky White',
    code: 'milky-white',
    hex: '#f8f9fa',
    listingImageFile: 'Yamaha-NMAX-125-blue.jpg', // temporary - needs proper image
    imageFile: 'Yamaha-NMAX-125-blue.jpg',
  },
];

/**
 * Yamaha NMAX 125 Tech Max (2025/2026) - Official colors
 * Source: https://www.yamaha-motor.eu/ro/ro/scooters/sport/pdp/nmax-125-tech-max/
 */
const nmaxTechMaxColors = [
  {
    name: 'Ceramic Grey',
    code: 'ceramic-grey',
    hex: '#9ca3af',
    listingImageFile: 'Yamaha-NMAX-125-tech-max-grey.jpg',
    imageFile: 'Yamaha-NMAX-125-tech-max-grey.jpg',
  },
  {
    name: 'Crystal Graphite',
    code: 'crystal-graphite',
    hex: '#4a5568',
    listingImageFile: 'Yamaha-NMAX-125-tech-max-graphite.jpg',
    imageFile: 'Yamaha-NMAX-125-tech-max-graphite.jpg',
  },
  // Uncomment when you have the image
  // {
  //   name: 'Dark Magma',
  //   code: 'dark-magma',
  //   hex: '#7f1d1d',
  //   listingImageFile: 'Yamaha-NMAX-125-tech-max-dark-magma.jpg',
  //   imageFile: 'Yamaha-NMAX-125-tech-max-dark-magma.jpg',
  // },
];

async function main() {
  const { Client } = require('pg');
  const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'scutere125',
    user: 'mihaibucse',
  });

  await client.connect();

  try {
    const { createScooterColor, getScooterIdBySlug } = require('./add-color-to-scooter');

    // Override the module's client
    const addColorModule = require('./add-color-to-scooter');
    const originalClient = addColorModule.client;

    // Add colors to Yamaha NMAX 125
    console.log('\n🎨 Adding colors to scooter: yamaha-nmax-125');
    const nmax125Id = await client.query('SELECT id FROM scooters WHERE slug = $1', ['yamaha-nmax-125']);
    if (nmax125Id.rows.length === 0) throw new Error('Scooter not found: yamaha-nmax-125');
    console.log(`✅ Found scooter with ID: ${nmax125Id.rows[0].id}`);

    for (const color of nmaxColors) {
      await createScooterColorDirect(client, nmax125Id.rows[0].id, color);
    }

    // Add colors to Yamaha NMAX 125 Tech Max
    console.log('\n🎨 Adding colors to scooter: yamaha-nmax-125-tech-max');
    const nmaxTechMaxId = await client.query('SELECT id FROM scooters WHERE slug = $1', ['yamaha-nmax-125-tech-max']);
    if (nmaxTechMaxId.rows.length === 0) throw new Error('Scooter not found: yamaha-nmax-125-tech-max');
    console.log(`✅ Found scooter with ID: ${nmaxTechMaxId.rows[0].id}`);

    for (const color of nmaxTechMaxColors) {
      await createScooterColorDirect(client, nmaxTechMaxId.rows[0].id, color);
    }

    console.log('\n🎉 All Yamaha NMAX colors added successfully!');
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

async function createScooterColorDirect(client, scooterId, colorData) {
  const fs = require('fs');
  const path = require('path');

  const PUBLIC_IMAGES_DIR = path.join(__dirname, '../../web/public/images/scooters');
  const UPLOADS_DIR = path.join(__dirname, '../public/uploads');

  const { name, code, hex, listingImageFile, imageFile } = colorData;

  console.log(`\n📝 Creating color: ${name} (${code})`);

  async function uploadImageDirect(imageName, colorCode) {
    const sourcePath = path.join(PUBLIC_IMAGES_DIR, imageName);

    if (!fs.existsSync(sourcePath)) {
      console.log(`  ⚠️  Image not found: ${imageName}`);
      return null;
    }

    const destFileName = `${colorCode}-${imageName}`;
    const destPath = path.join(UPLOADS_DIR, destFileName);

    fs.copyFileSync(sourcePath, destPath);

    const fileCheck = await client.query('SELECT id FROM files WHERE name = $1', [destFileName]);
    if (fileCheck.rows.length > 0) {
      return fileCheck.rows[0].id;
    }

    const stats = fs.statSync(destPath);
    const fileSize = (stats.size / 1024).toFixed(2);
    const hash = destFileName.replace(/[.-]/g, '_').replace(/\.jpg$/, '');

    const fileResult = await client.query(
      `INSERT INTO files (
        name, alternative_text, caption, width, height, formats,
        hash, ext, mime, size, url, preview_url, provider,
        provider_metadata, folder_path, created_at, updated_at,
        created_by_id, updated_by_id
      ) VALUES (
        $1, $2, NULL, 1200, 800, NULL,
        $3, '.jpg', 'image/jpeg', $4, $5, NULL, 'local',
        NULL, '/', NOW(), NOW(), NULL, NULL
      ) RETURNING id`,
      [destFileName, `${colorCode} - image`, hash, fileSize, `/uploads/${destFileName}`]
    );

    return fileResult.rows[0].id;
  }

  let listingImageId = null;
  let imageId = null;

  if (listingImageFile) {
    console.log(`  📤 Uploading listing image: ${listingImageFile}`);
    listingImageId = await uploadImageDirect(listingImageFile, code);
  }

  if (imageFile) {
    console.log(`  📤 Uploading main image: ${imageFile}`);
    imageId = await uploadImageDirect(imageFile, code);
  }

  const colorResult = await client.query(
    `INSERT INTO scooter_colors (
      name, code, hex, created_at, updated_at, published_at,
      created_by_id, updated_by_id
    ) VALUES (
      $1, $2, $3, NOW(), NOW(), NOW(), NULL, NULL
    ) RETURNING id`,
    [name, code, hex || null]
  );

  const colorId = colorResult.rows[0].id;
  console.log(`  ✅ Color created with ID: ${colorId}`);

  await client.query(
    `INSERT INTO scooter_colors_scooter_links (
      scooter_color_id, scooter_id, scooter_color_order
    ) VALUES ($1, $2, 1)`,
    [colorId, scooterId]
  );
  console.log(`  ✅ Linked to scooter ID: ${scooterId}`);

  if (listingImageId) {
    await client.query(
      `INSERT INTO files_related_morphs (file_id, related_id, related_type, field, "order")
       VALUES ($1, $2, 'api::scooter-color.scooter-color', 'listingImage', 1)`,
      [listingImageId, colorId]
    );
    console.log(`  ✅ Linked listing image`);
  }

  if (imageId) {
    await client.query(
      `INSERT INTO files_related_morphs (file_id, related_id, related_type, field, "order")
       VALUES ($1, $2, 'api::scooter-color.scooter-color', 'image', 1)`,
      [imageId, colorId]
    );
    console.log(`  ✅ Linked main image`);
  }

  return colorId;
}

main();

