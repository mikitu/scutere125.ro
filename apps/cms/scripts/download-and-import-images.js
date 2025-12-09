const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Imagini pentru fiecare scuter
const scooterImages = {
  'sh-mode-125': {
    main: '../../web/public/images/scooters/Honda-SH-Mode-125.jpg',
    gallery: [
      'https://www.honda.co.uk/content/dam/central/motorcycles/colour-picker/scooter/shmode125/shmode_2024/nh-b35p_pearl_jasmine_white/24YM_SH_MODE_NH-B35P_PEARL_JASMINE_WHITE_RHS.png',
      'https://www.honda.co.uk/content/dam/central/motorcycles/scooters/sh-mode-125-2024/Overview/Hero/honda-sh-mode-125-hero-1728x972.jpg',
    ]
  },
  'pcx-125': {
    main: '../../web/public/images/scooters/Honda-PCX-125.jpg',
    gallery: [
      'https://www.honda.co.uk/content/dam/central/motorcycles/colour-picker/scooter/pcx/pcx125_2025/pb-426p_pearl_darl_ash_blue_two/25YM_PCX-125_ED_Studio_Disk_PEARL-DARK-ASH-BLUE-2_RHS.png',
      'https://www.honda.co.uk/content/dam/central/motorcycles/scooters/pcx-125-2025/Overview/Hero/honda-pcx-125-hero-1728x972.jpg',
    ]
  },
  'forza-125': {
    main: '../../web/public/images/scooters/Honda-Forza-125.jpg',
    gallery: [
      'https://www.honda.co.uk/content/dam/central/motorcycles/colour-picker/scooter/forza125/forza125_2025/pb-397p_matte_pearl_pacific_blue/25YM_FORZA125_PEARL_MAT_PEARL_PACIFIC_BLUE_PB-397P_RHS.png',
      'https://www.honda.co.uk/content/dam/central/motorcycles/scooters/forza-125-2025/Overview/Hero/honda-forza-125-hero-1728x972.jpg',
    ]
  },
  'yamaha-nmax-125': {
    main: 'https://www.yamaha-motor.eu/content/dam/yamaha-motor/yme/b2c/ro/scooters/sport/nmax-125/2024/colour/nmax-125-2024-colour-midnight-black.png',
    gallery: [
      'https://www.yamaha-motor.eu/content/dam/yamaha-motor/yme/b2c/ro/scooters/sport/nmax-125/2024/gallery/nmax-125-2024-gallery-01.jpg',
      'https://www.yamaha-motor.eu/content/dam/yamaha-motor/yme/b2c/ro/scooters/sport/nmax-125/2024/gallery/nmax-125-2024-gallery-02.jpg',
    ]
  },
  'yamaha-nmax-125-tech-max': {
    main: 'https://www.yamaha-motor.eu/content/dam/yamaha-motor/yme/b2c/ro/scooters/sport/nmax-125-tech-max/2024/colour/nmax-125-tech-max-2024-colour-tech-kamo.png',
    gallery: [
      'https://www.yamaha-motor.eu/content/dam/yamaha-motor/yme/b2c/ro/scooters/sport/nmax-125-tech-max/2024/gallery/nmax-125-tech-max-2024-gallery-01.jpg',
      'https://www.yamaha-motor.eu/content/dam/yamaha-motor/yme/b2c/ro/scooters/sport/nmax-125-tech-max/2024/gallery/nmax-125-tech-max-2024-gallery-02.jpg',
    ]
  },
  'yamaha-xmax-125-2026': {
    main: 'https://www.yamaha-motor.eu/content/dam/yamaha-motor/yme/b2c/ro/scooters/sport/xmax-125-2026/2026/colour/xmax-125-2026-colour-icon-grey.png',
    gallery: [
      'https://www.yamaha-motor.eu/content/dam/yamaha-motor/yme/b2c/ro/scooters/sport/xmax-125-2026/2026/gallery/xmax-125-2026-gallery-01.jpg',
      'https://www.yamaha-motor.eu/content/dam/yamaha-motor/yme/b2c/ro/scooters/sport/xmax-125-2026/2026/gallery/xmax-125-2026-gallery-02.jpg',
    ]
  },
  'yamaha-xmax-125-tech-max': {
    main: 'https://www.yamaha-motor.eu/content/dam/yamaha-motor/yme/b2c/ro/scooters/sport/xmax-125-tech-max/2024/colour/xmax-125-tech-max-2024-colour-tech-kamo.png',
    gallery: [
      'https://www.yamaha-motor.eu/content/dam/yamaha-motor/yme/b2c/ro/scooters/sport/xmax-125-tech-max/2024/gallery/xmax-125-tech-max-2024-gallery-01.jpg',
      'https://www.yamaha-motor.eu/content/dam/yamaha-motor/yme/b2c/ro/scooters/sport/xmax-125-tech-max/2024/gallery/xmax-125-tech-max-2024-gallery-02.jpg',
    ]
  },
  'yamaha-tricity-125': {
    main: 'https://www.yamaha-motor.eu/content/dam/yamaha-motor/yme/b2c/ro/scooters/urban-mobility/tricity-125/2024/colour/tricity-125-2024-colour-power-black.png',
    gallery: [
      'https://www.yamaha-motor.eu/content/dam/yamaha-motor/yme/b2c/ro/scooters/urban-mobility/tricity-125/2024/gallery/tricity-125-2024-gallery-01.jpg',
      'https://www.yamaha-motor.eu/content/dam/yamaha-motor/yme/b2c/ro/scooters/urban-mobility/tricity-125/2024/gallery/tricity-125-2024-gallery-02.jpg',
    ]
  },
  'yamaha-rayzr': {
    main: 'https://www.yamaha-motor.eu/content/dam/yamaha-motor/yme/b2c/ro/scooters/urban-mobility/rayzr/2024/colour/rayzr-2024-colour-racing-blue.png',
    gallery: [
      'https://www.yamaha-motor.eu/content/dam/yamaha-motor/yme/b2c/ro/scooters/urban-mobility/rayzr/2024/gallery/rayzr-2024-gallery-01.jpg',
      'https://www.yamaha-motor.eu/content/dam/yamaha-motor/yme/b2c/ro/scooters/urban-mobility/rayzr/2024/gallery/rayzr-2024-gallery-02.jpg',
    ]
  },
  'yamaha-delight-125': {
    main: 'https://www.yamaha-motor.eu/content/dam/yamaha-motor/yme/b2c/ro/scooters/urban-mobility/d-elight/2024/colour/d-elight-2024-colour-milky-white.png',
    gallery: [
      'https://www.yamaha-motor.eu/content/dam/yamaha-motor/yme/b2c/ro/scooters/urban-mobility/d-elight/2024/gallery/d-elight-2024-gallery-01.jpg',
      'https://www.yamaha-motor.eu/content/dam/yamaha-motor/yme/b2c/ro/scooters/urban-mobility/d-elight/2024/gallery/d-elight-2024-gallery-02.jpg',
    ]
  },
};

// Funcție pentru descărcare imagine
function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    // Verificăm dacă e URL sau path local
    if (!url.startsWith('http')) {
      const sourcePath = path.join(__dirname, url);
      if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, dest);
        console.log(`✅ Copiat: ${path.basename(dest)}`);
        resolve();
      } else {
        reject(new Error(`Fișier lipsă: ${sourcePath}`));
      }
      return;
    }

    const protocol = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(dest);
    
    protocol.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`✅ Descărcat: ${path.basename(dest)}`);
          resolve();
        });
      } else if (response.statusCode === 301 || response.statusCode === 302) {
        // Redirect
        file.close();
        fs.unlinkSync(dest);
        downloadImage(response.headers.location, dest).then(resolve).catch(reject);
      } else {
        file.close();
        fs.unlinkSync(dest);
        reject(new Error(`Failed to download: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      file.close();
      fs.unlinkSync(dest);
      reject(err);
    });
  });
}

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
    console.log('✅ Conectat la PostgreSQL\n');

    const uploadsDir = path.join(__dirname, '../public/uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    for (const [slug, images] of Object.entries(scooterImages)) {
      console.log(`\n📦 Procesare: ${slug}`);
      
      // Obținem ID-ul scuterului
      const scooterResult = await client.query('SELECT id FROM scooters WHERE slug = $1', [slug]);
      if (scooterResult.rows.length === 0) {
        console.log(`⚠️  Scuter nu există: ${slug}`);
        continue;
      }
      const scooterId = scooterResult.rows[0].id;

      const imageFiles = [];

      // Procesăm imaginea principală
      const mainFileName = `${slug}-main.jpg`;
      const mainPath = path.join(uploadsDir, mainFileName);

      try {
        await downloadImage(images.main, mainPath);
        imageFiles.push({ path: mainPath, fileName: mainFileName, field: 'image', isMain: true });
        imageFiles.push({ path: mainPath, fileName: mainFileName, field: 'listingImage', isMain: true });
      } catch (error) {
        console.log(`⚠️  Eroare descărcare main: ${error.message}`);
      }

      // Procesăm galeria
      for (let i = 0; i < images.gallery.length; i++) {
        const galleryFileName = `${slug}-gallery-${i + 1}.jpg`;
        const galleryPath = path.join(uploadsDir, galleryFileName);

        try {
          await downloadImage(images.gallery[i], galleryPath);
          imageFiles.push({ path: galleryPath, fileName: galleryFileName, field: 'gallery', order: i + 1 });
        } catch (error) {
          console.log(`⚠️  Eroare descărcare gallery ${i + 1}: ${error.message}`);
        }
      }

      // Importăm fișierele în baza de date
      for (const imageFile of imageFiles) {
        const stats = fs.statSync(imageFile.path);
        const fileSize = stats.size;
        const hash = imageFile.fileName.replace(/\.[^/.]+$/, '').toLowerCase().replace(/[^a-z0-9]/g, '_');
        const ext = path.extname(imageFile.fileName);

        // Verificăm dacă fișierul există deja
        const checkResult = await client.query('SELECT id FROM files WHERE hash = $1 LIMIT 1', [hash]);

        let fileId;

        if (checkResult.rows.length > 0) {
          fileId = checkResult.rows[0].id;
          console.log(`  ℹ️  Fișier deja există: ${imageFile.fileName} (ID: ${fileId})`);
        } else {
          // Inserăm fișierul
          const fileQuery = `
            INSERT INTO files (
              name, alternative_text, width, height, hash, ext, mime, size,
              url, provider, folder_path, created_at, updated_at, created_by_id, updated_by_id
            ) VALUES (
              $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW(), NOW(), 1, 1
            )
            RETURNING id;
          `;

          const fileValues = [
            imageFile.fileName,
            `${slug} - ${imageFile.field}`,
            1200,
            800,
            hash,
            ext,
            ext === '.png' ? 'image/png' : 'image/jpeg',
            (fileSize / 1024).toFixed(2),
            `/uploads/${imageFile.fileName}`,
            'local',
            '/',
          ];

          const fileResult = await client.query(fileQuery, fileValues);
          fileId = fileResult.rows[0].id;
          console.log(`  ✅ Fișier importat: ${imageFile.fileName} (ID: ${fileId})`);
        }

        // Creăm relația cu scuterul
        const relationQuery = `
          INSERT INTO files_related_morphs (file_id, related_id, related_type, field, "order")
          VALUES ($1, $2, $3, $4, $5)
          ON CONFLICT DO NOTHING;
        `;

        await client.query(relationQuery, [
          fileId,
          scooterId,
          'api::scooter.scooter',
          imageFile.field,
          imageFile.order || 1,
        ]);

        console.log(`  ✅ Relație creată: ${imageFile.field}`);
      }

      console.log(`✅ Finalizat: ${slug} (${imageFiles.length} imagini)`);
    }

    console.log('\n🎉 Import imagini finalizat cu succes!');
  } catch (error) {
    console.error('❌ Eroare la import:', error.message);
    console.error(error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

importImages();

