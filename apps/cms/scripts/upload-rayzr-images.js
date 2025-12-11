const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { Client } = require('pg');

const STRAPI_URL = 'http://localhost:1337';
const IMAGES_DIR = path.join(__dirname, '../../web/public/images/scooters/Yamaha Rayzr');

const client = new Client({
  user: 'mihaibucse',
  host: 'localhost',
  database: 'scutere125',
  port: 5432,
});

const colors = [
  {
    name: 'Anodized Red',
    code: 'ANODIZED_RED',
    hex: '#8B0000',
    image: 'Yamaha-Rayzr-Anodized-Red.jpg'
  },
  {
    name: 'Matt Cyan',
    code: 'MATT_CYAN',
    hex: '#00CED1',
    image: 'Yamaha-Rayzr-Matt-Cyan.jpg'
  },
  {
    name: 'Midnight Black',
    code: 'MIDNIGHT_BLACK',
    hex: '#191970',
    image: 'Yamaha-Rayzr-Midnight-Black.jpg'
  }
];

async function uploadImage(imagePath, folderName, colorName) {
  try {
    // Get or create folder
    const folderResult = await client.query(
      `SELECT id FROM upload_folders WHERE name = $1`,
      [folderName]
    );

    let folderId;
    if (folderResult.rows.length === 0) {
      // Get next path_id
      const maxPathIdResult = await client.query(
        `SELECT COALESCE(MAX(path_id), 0) + 1 as next_path_id FROM upload_folders`
      );
      const nextPathId = maxPathIdResult.rows[0].next_path_id;

      const insertResult = await client.query(
        `INSERT INTO upload_folders (name, path_id, path, created_at, updated_at)
         VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
         RETURNING id`,
        [folderName, nextPathId, `/1/${nextPathId}`]
      );
      folderId = insertResult.rows[0].id;
      console.log(`  Created folder: ${folderName} (ID: ${folderId})`);
    } else {
      folderId = folderResult.rows[0].id;
    }

    // Copy file to uploads directory
    const fileName = path.basename(imagePath);
    const fileNameWithoutExt = path.basename(imagePath, path.extname(imagePath));
    const ext = path.extname(imagePath);
    const hash = crypto.randomBytes(8).toString('hex');
    const newFileName = `${colorName.toLowerCase().replace(/ /g, '-')}-${fileNameWithoutExt}${ext}`;
    const uploadsDir = path.join(__dirname, '../public/uploads');

    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const destPath = path.join(uploadsDir, newFileName);
    fs.copyFileSync(imagePath, destPath);

    // Get file stats
    const stats = fs.statSync(imagePath);
    const fileSize = stats.size;

    // Insert file record
    const fileResult = await client.query(
      `INSERT INTO files (name, alternative_text, caption, width, height, formats, hash, ext, mime, size, url, preview_url, provider, provider_metadata, folder_path, created_at, updated_at, created_by_id, updated_by_id)
       VALUES ($1, $2, $3, NULL, NULL, NULL, $4, $5, $6, $7, $8, NULL, 'local', NULL, $9, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL, NULL)
       RETURNING id`,
      [
        fileName,
        colorName,
        `${colorName} color variant`,
        hash,
        ext,
        'image/jpeg',
        (fileSize / 1024).toFixed(2),
        `/uploads/${newFileName}`,
        `/1/${folderId}`
      ]
    );
    const fileId = fileResult.rows[0].id;

    // Link file to folder
    await client.query(
      `INSERT INTO files_folder_links (file_id, folder_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`,
      [fileId, folderId]
    );

    console.log(`  ✅ Uploaded: ${fileName} → ${newFileName} (ID: ${fileId})`);
    return fileId;
  } catch (error) {
    console.error(`  ❌ Error uploading ${imagePath}:`, error.message);
    return null;
  }
}

async function main() {
  await client.connect();

  try {
    // Get scooter ID
    const scooterResult = await client.query(
      `SELECT id FROM scooters WHERE slug = 'yamaha-rayzr'`
    );
    const scooterId = scooterResult.rows[0].id;
    console.log(`📍 Scooter ID: ${scooterId}`);

    const folderName = 'Yamaha Rayzr';

    for (const color of colors) {
      console.log(`\n🎨 Processing color: ${color.name}`);

      // Create color
      const colorResult = await client.query(
        `INSERT INTO scooter_colors (name, code, hex, created_at, updated_at, published_at)
         VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
         RETURNING id`,
        [color.name, color.code, color.hex]
      );
      const colorId = colorResult.rows[0].id;
      console.log(`  Color ID: ${colorId}`);

      // Link color to scooter
      await client.query(
        `INSERT INTO scooter_colors_scooter_links (scooter_color_id, scooter_id)
         VALUES ($1, $2)`,
        [colorId, scooterId]
      );

      // Upload image
      const imagePath = path.join(IMAGES_DIR, color.image);
      const fileId = await uploadImage(imagePath, folderName, color.name);

      if (fileId) {
        // Link image to color (both image and listingImage)
        await client.query(
          `INSERT INTO files_related_morphs (file_id, related_id, related_type, field, "order")
           VALUES ($1, $2, 'api::scooter-color.scooter-color', 'image', 1)`,
          [fileId, colorId]
        );
        await client.query(
          `INSERT INTO files_related_morphs (file_id, related_id, related_type, field, "order")
           VALUES ($1, $2, 'api::scooter-color.scooter-color', 'listingImage', 1)`,
          [fileId, colorId]
        );
        console.log(`  ✅ Linked image to color`);
      }
    }

    // Set first color image as scooter mainImage
    const firstColorResult = await client.query(
      `SELECT sc.id, frm.file_id
       FROM scooter_colors sc
       JOIN scooter_colors_scooter_links scsl ON sc.id = scsl.scooter_color_id
       JOIN files_related_morphs frm ON frm.related_id = sc.id 
         AND frm.related_type = 'api::scooter-color.scooter-color'
         AND frm.field = 'image'
       WHERE scsl.scooter_id = $1
       ORDER BY sc.id
       LIMIT 1`,
      [scooterId]
    );

    if (firstColorResult.rows.length > 0) {
      const mainImageFileId = firstColorResult.rows[0].file_id;
      await client.query(
        `INSERT INTO files_related_morphs (file_id, related_id, related_type, field, "order")
         VALUES ($1, $2, 'api::scooter.scooter', 'mainImage', 1)
         ON CONFLICT DO NOTHING`,
        [mainImageFileId, scooterId]
      );
      console.log(`\n✅ Set mainImage for scooter`);
    }

    console.log('\n🎉 All done!');
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.end();
  }
}

main();

