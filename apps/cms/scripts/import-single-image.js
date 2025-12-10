const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

const client = new Client({
  host: 'localhost',
  port: 5432,
  database: 'scutere125',
  user: 'mihaibucse',
});

async function importImage(slug, imageName) {
  await client.connect();
  
  try {
    // 1. Găsește scuterul
    const scooterResult = await client.query(
      'SELECT id, slug FROM scooters WHERE slug = $1',
      [slug]
    );
    
    if (scooterResult.rows.length === 0) {
      console.log(`❌ Scuter nu găsit: ${slug}`);
      return;
    }
    
    const scooterId = scooterResult.rows[0].id;
    console.log(`✅ Găsit scuter: ${slug} (ID: ${scooterId})`);
    
    // 2. Copiază imaginea în uploads
    const sourcePath = path.join(__dirname, `../../web/public/images/scooters/${imageName}`);
    const destFileName = slug + '-main.jpg';
    const destPath = path.join(__dirname, '../public/uploads', destFileName);
    
    if (!fs.existsSync(sourcePath)) {
      console.log(`❌ Fișier sursă nu există: ${sourcePath}`);
      return;
    }
    
    fs.copyFileSync(sourcePath, destPath);
    console.log(`✅ Copiat: ${destFileName}`);
    
    // 3. Verifică dacă fișierul există deja în DB
    const fileCheck = await client.query(
      'SELECT id FROM files WHERE name = $1',
      [destFileName]
    );
    
    let fileId;
    
    if (fileCheck.rows.length > 0) {
      fileId = fileCheck.rows[0].id;
      console.log(`ℹ️  Fișier deja există (ID: ${fileId})`);
    } else {
      // 4. Inserează în tabela files
      const stats = fs.statSync(destPath);
      const fileSize = (stats.size / 1024).toFixed(2);
      const hash = slug.replace(/-/g, '_') + '_main';
      
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
          `${slug} - image`,
          hash,
          fileSize,
          `/uploads/${destFileName}`
        ]
      );
      
      fileId = fileResult.rows[0].id;
      console.log(`✅ Fișier inserat (ID: ${fileId})`);
    }
    
    // 5. Șterge relațiile vechi pentru acest scuter
    await client.query(
      `DELETE FROM files_related_morphs 
       WHERE related_id = $1 
       AND related_type = 'api::scooter.scooter' 
       AND field IN ('image', 'listingImage')`,
      [scooterId]
    );
    
    // 6. Creează relațiile pentru image și listingImage
    await client.query(
      `INSERT INTO files_related_morphs (file_id, related_id, related_type, field, "order")
       VALUES ($1, $2, 'api::scooter.scooter', 'image', 1)`,
      [fileId, scooterId]
    );
    console.log('✅ Relație creată: image');
    
    await client.query(
      `INSERT INTO files_related_morphs (file_id, related_id, related_type, field, "order")
       VALUES ($1, $2, 'api::scooter.scooter', 'listingImage', 1)`,
      [fileId, scooterId]
    );
    console.log('✅ Relație creată: listingImage');
    
    console.log('🎉 Import finalizat cu succes!');
    
  } catch (err) {
    console.error('❌ Eroare:', err.message);
    throw err;
  } finally {
    await client.end();
  }
}

// Rulează import
const slug = process.argv[2] || 'yamaha-nmax-125';
const imageName = process.argv[3] || 'Yamaha-NMAX-125-blue.jpg';

importImage(slug, imageName).catch(err => {
  console.error('❌ Eroare fatală:', err);
  process.exit(1);
});

