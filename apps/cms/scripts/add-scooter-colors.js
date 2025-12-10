const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

/**
 * Adaugă culori pentru un scuter și importă imaginile pentru fiecare culoare
 *
 * @param {string} slug - Slug-ul scuterului
 * @param {Array} colors - Array de obiecte culoare:
 *   {
 *     name: 'Midnight Black',
 *     code: 'midnight-black',
 *     hex: '#1a1a1a',
 *     listingImageFile: 'Yamaha-NMAX-125-black.jpg',  // opțional
 *     imageFile: 'Yamaha-NMAX-125-black.jpg',         // opțional
 *     galleryFiles: ['...']                            // opțional
 *   }
 */
async function addScooterColors(slug, colors) {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'scutere125',
    user: 'mihaibucse',
  });

  await client.connect();
  
  try {
    // 1. Găsește scuterul
    const scooterResult = await client.query(
      'SELECT id, slug, name FROM scooters WHERE slug = $1',
      [slug]
    );
    
    if (scooterResult.rows.length === 0) {
      console.log(`❌ Scuter nu găsit: ${slug}`);
      return;
    }
    
    const scooter = scooterResult.rows[0];
    console.log(`✅ Găsit scuter: ${scooter.name} (ID: ${scooter.id})`);
    
    // 2. Procesează fiecare culoare
    const processedColors = [];
    
    for (const color of colors) {
      console.log(`\n📦 Procesare culoare: ${color.name}`);
      
      const colorData = {
        name: color.name,
        code: color.code,
        hex: color.hex || null,
      };
      
      // Import listingImage dacă există
      if (color.listingImageFile) {
        const fileId = await importImage(client, slug, color.code, color.listingImageFile, 'listing');
        if (fileId) {
          colorData.listingImage = `http://localhost:1337/uploads/${slug}-${color.code}-listing.jpg`;
        }
      }

      // Import image dacă există
      if (color.imageFile) {
        const fileId = await importImage(client, slug, color.code, color.imageFile, 'main');
        if (fileId) {
          colorData.image = `http://localhost:1337/uploads/${slug}-${color.code}-main.jpg`;
        }
      }

      // Import gallery dacă există
      if (color.galleryFiles && color.galleryFiles.length > 0) {
        colorData.gallery = [];
        for (let i = 0; i < color.galleryFiles.length; i++) {
          const fileId = await importImage(client, slug, color.code, color.galleryFiles[i], `gallery-${i + 1}`);
          if (fileId) {
            colorData.gallery.push(`http://localhost:1337/uploads/${slug}-${color.code}-gallery-${i + 1}.jpg`);
          }
        }
      }
      
      processedColors.push(colorData);
      console.log(`✅ Culoare procesată: ${color.name}`);
    }
    
    // 3. Actualizează scuterul cu culorile
    await client.query(
      'UPDATE scooters SET colors = $1 WHERE id = $2',
      [JSON.stringify(processedColors), scooter.id]
    );
    
    console.log(`\n🎉 Culori adăugate cu succes pentru ${scooter.name}!`);
    console.log(`Total culori: ${processedColors.length}`);
    
  } catch (err) {
    console.error('❌ Eroare:', err.message);
    throw err;
  } finally {
    await client.end();
  }
}

async function importImage(client, slug, colorCode, sourceFileName, type) {
  const sourcePath = path.join(__dirname, `../../web/public/images/scooters/${sourceFileName}`);
  const destFileName = `${slug}-${colorCode}-${type}.jpg`;
  const destPath = path.join(__dirname, '../public/uploads', destFileName);
  
  if (!fs.existsSync(sourcePath)) {
    console.log(`  ⚠️  Fișier sursă nu există: ${sourceFileName}`);
    return null;
  }
  
  // Copiază fișierul
  fs.copyFileSync(sourcePath, destPath);
  console.log(`  ✅ Copiat: ${destFileName}`);
  
  // Verifică dacă fișierul există deja în DB
  const fileCheck = await client.query(
    'SELECT id FROM files WHERE name = $1',
    [destFileName]
  );
  
  if (fileCheck.rows.length > 0) {
    console.log(`  ℹ️  Fișier deja există în DB (ID: ${fileCheck.rows[0].id})`);
    return fileCheck.rows[0].id;
  }
  
  // Inserează în tabela files
  const stats = fs.statSync(destPath);
  const fileSize = (stats.size / 1024).toFixed(2);
  const hash = `${slug}_${colorCode}_${type}`.replace(/-/g, '_');
  
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
      `${slug} ${colorCode} - ${type}`,
      hash,
      fileSize,
      `/uploads/${destFileName}`
    ]
  );

  console.log(`  ✅ Fișier inserat în DB (ID: ${fileResult.rows[0].id})`);
  return fileResult.rows[0].id;
}

// Export funcția pentru a putea fi folosită din alte scripturi
module.exports = { addScooterColors };

// Dacă scriptul este rulat direct
if (require.main === module) {
  console.log('Usage: node add-scooter-colors.js');
  console.log('Editează scriptul pentru a adăuga culorile dorite.');
}

