const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

const PUBLIC_IMAGES_DIR = path.join(__dirname, '../../web/public/images/scooters');
const UPLOADS_DIR = path.join(__dirname, '../public/uploads');

const client = new Client({
  host: 'localhost',
  port: 5432,
  database: 'scutere125',
  user: 'mihaibucse',
});

/**
 * Upload an image to Strapi uploads directory and create DB record
 */
async function uploadImage(imageName, colorCode) {
  const sourcePath = path.join(PUBLIC_IMAGES_DIR, imageName);

  if (!fs.existsSync(sourcePath)) {
    console.log(`  ⚠️  Image not found: ${imageName}`);
    return null;
  }

  const destFileName = `${colorCode}-${imageName}`;
  const destPath = path.join(UPLOADS_DIR, destFileName);

  // Copy file
  fs.copyFileSync(sourcePath, destPath);

  // Check if file already exists in DB
  const fileCheck = await client.query(
    'SELECT id FROM files WHERE name = $1',
    [destFileName]
  );

  if (fileCheck.rows.length > 0) {
    return fileCheck.rows[0].id;
  }

  // Insert into files table
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
    [
      destFileName,
      `${colorCode} - image`,
      hash,
      fileSize,
      `/uploads/${destFileName}`
    ]
  );

  return fileResult.rows[0].id;
}

/**
 * Create a scooter color with images
 */
async function createScooterColor(scooterId, colorData) {
  const { name, code, hex, listingImageFile, imageFile, galleryFiles = [] } = colorData;

  console.log(`\n📝 Creating color: ${name} (${code})`);

  // Upload images if provided
  let listingImageId = null;
  let imageId = null;
  let galleryIds = [];

  if (listingImageFile) {
    console.log(`  📤 Uploading listing image: ${listingImageFile}`);
    listingImageId = await uploadImage(listingImageFile, code);
  }

  if (imageFile) {
    console.log(`  📤 Uploading main image: ${imageFile}`);
    imageId = await uploadImage(imageFile, code);
  }

  for (const galleryFile of galleryFiles) {
    console.log(`  📤 Uploading gallery image: ${galleryFile}`);
    const galleryId = await uploadImage(galleryFile, code);
    if (galleryId) {
      galleryIds.push(galleryId);
    }
  }

  // Insert color into database
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

  // Create scooter relation
  await client.query(
    `INSERT INTO scooter_colors_scooter_links (
      scooter_color_id, scooter_id, scooter_color_order
    ) VALUES ($1, $2, 1)`,
    [colorId, scooterId]
  );
  console.log(`  ✅ Linked to scooter ID: ${scooterId}`);

  // Create media relations
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

  for (let i = 0; i < galleryIds.length; i++) {
    await client.query(
      `INSERT INTO files_related_morphs (file_id, related_id, related_type, field, "order")
       VALUES ($1, $2, 'api::scooter-color.scooter-color', 'gallery', $3)`,
      [galleryIds[i], colorId, i + 1]
    );
  }
  if (galleryIds.length > 0) {
    console.log(`  ✅ Linked ${galleryIds.length} gallery images`);
  }

  return colorId;
}

/**
 * Get scooter ID by slug
 */
async function getScooterIdBySlug(slug) {
  const result = await client.query(
    'SELECT id FROM scooters WHERE slug = $1',
    [slug]
  );

  if (result.rows.length === 0) {
    throw new Error(`Scooter not found: ${slug}`);
  }

  return result.rows[0].id;
}

/**
 * Main function to add colors to a scooter
 */
async function addColorsToScooter(scooterSlug, colors) {
  await client.connect();

  try {
    console.log(`\n🎨 Adding colors to scooter: ${scooterSlug}`);

    const scooterId = await getScooterIdBySlug(scooterSlug);
    console.log(`✅ Found scooter with ID: ${scooterId}`);

    for (const color of colors) {
      await createScooterColor(scooterId, color);
    }

    console.log(`\n✅ All colors added successfully!`);
  } finally {
    await client.end();
  }
}

module.exports = { addColorsToScooter, createScooterColor, getScooterIdBySlug };

