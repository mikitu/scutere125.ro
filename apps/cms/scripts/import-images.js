const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

// Mapare imagini pentru fiecare scuter Honda
const imageMapping = [
  {
    slug: 'sh-mode-125',
    imagePath: '../../web/public/images/scooters/Honda-SH-Mode-125.jpg',
    fileName: 'Honda-SH-Mode-125.jpg',
  },
  {
    slug: 'pcx-125',
    imagePath: '../../web/public/images/scooters/Honda-PCX-125.jpg',
    fileName: 'Honda-PCX-125.jpg',
  },
  {
    slug: 'forza-125',
    imagePath: '../../web/public/images/scooters/Honda-Forza-125.jpg',
    fileName: 'Honda-Forza-125.jpg',
  },
];

async function importImages() {
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

    // Creăm directorul pentru uploads dacă nu există
    const uploadsDir = path.join(__dirname, '../public/uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
      console.log('✅ Creat director uploads');
    }

    for (const mapping of imageMapping) {
      const sourcePath = path.join(__dirname, mapping.imagePath);
      const destPath = path.join(uploadsDir, mapping.fileName);

      // Verificăm dacă fișierul sursă există
      if (!fs.existsSync(sourcePath)) {
        console.log(`⚠️  Fișier lipsă: ${sourcePath}`);
        continue;
      }

      // Copiem imaginea în directorul uploads
      fs.copyFileSync(sourcePath, destPath);
      console.log(`✅ Copiat: ${mapping.fileName}`);

      // Obținem informații despre fișier
      const stats = fs.statSync(destPath);
      const fileSize = stats.size;
      const hash = mapping.fileName.replace(/\.[^/.]+$/, '').toLowerCase().replace(/[^a-z0-9]/g, '_');

      // Verificăm dacă fișierul există deja
      const checkQuery = `SELECT id FROM files WHERE hash = $1 LIMIT 1`;
      const checkResult = await client.query(checkQuery, [hash]);

      let fileId;

      if (checkResult.rows.length > 0) {
        fileId = checkResult.rows[0].id;
        console.log(`ℹ️  Fișier deja există: ID ${fileId}`);
      } else {
        // Inserăm în tabela files (Strapi media)
        const fileQuery = `
          INSERT INTO files (
            name, alternative_text, caption, width, height, formats, hash, ext, mime, size,
            url, preview_url, provider, provider_metadata, folder_path,
            created_at, updated_at, created_by_id, updated_by_id
          ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
            $11, $12, $13, $14, $15,
            NOW(), NOW(), 1, 1
          )
          RETURNING id;
        `;

        const fileValues = [
          mapping.fileName,                          // name
          `Imagine ${mapping.slug}`,                 // alternative_text
          null,                                      // caption
          800,                                       // width (placeholder)
          600,                                       // height (placeholder)
          null,                                      // formats
          hash,                                      // hash
          '.jpg',                                    // ext
          'image/jpeg',                              // mime
          (fileSize / 1024).toFixed(2),             // size in KB
          `/uploads/${mapping.fileName}`,            // url
          null,                                      // preview_url
          'local',                                   // provider
          null,                                      // provider_metadata
          '/',                                       // folder_path
        ];

        const fileResult = await client.query(fileQuery, fileValues);
        fileId = fileResult.rows[0].id;
        console.log(`✅ Fișier înregistrat în DB: ID ${fileId}`);
      }

      // Actualizăm scuterul cu imaginea
      const scooterQuery = `
        UPDATE scooters
        SET listing_image = $1, main_image = $2, updated_at = NOW()
        WHERE slug = $3
        RETURNING id, name;
      `;

      const scooterValues = [fileId, fileId, mapping.slug];
      const scooterResult = await client.query(scooterQuery, scooterValues);

      if (scooterResult.rows.length > 0) {
        console.log(`✅ Actualizat scuter: ${scooterResult.rows[0].name} (ID: ${scooterResult.rows[0].id})`);
      } else {
        console.log(`⚠️  Scuter nu a fost găsit: ${mapping.slug}`);
      }

      console.log('');
    }

    console.log('🎉 Import imagini finalizat cu succes!');
  } catch (error) {
    console.error('❌ Eroare la import:', error.message);
    console.error(error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

importImages();

