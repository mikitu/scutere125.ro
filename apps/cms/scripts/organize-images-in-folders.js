const { Client } = require('pg');

/**
 * Organizează imaginile în folderele corespunzătoare modelelor de scutere
 */
async function organizeImagesInFolders() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'scutere125',
    user: 'mihaibucse',
  });

  await client.connect();

  try {
    console.log('🗂️  Organizing images into model folders...\n');

    // Get folder IDs
    const foldersResult = await client.query(
      'SELECT id, name, path FROM upload_folders ORDER BY name'
    );
    
    const folders = {};
    foldersResult.rows.forEach(folder => {
      folders[folder.name] = folder;
      console.log(`📁 Folder: ${folder.name} (ID: ${folder.id}, Path: ${folder.path})`);
    });

    console.log('\n');

    // Define image to folder mappings based on filename patterns
    const mappings = [
      // NMAX 125
      { pattern: /nmax-125.*(?!tech-max)/i, folder: 'Yamaha-NMAX-125', exclude: /tech-max/i },
      { pattern: /icon-blue.*nmax-125/i, folder: 'Yamaha-NMAX-125' },
      { pattern: /icon-black.*nmax-125/i, folder: 'Yamaha-NMAX-125' },
      { pattern: /milky-white/i, folder: 'Yamaha-NMAX-125' },
      { pattern: /crystal-graphite.*(?!tech-max)/i, folder: 'Yamaha-NMAX-125', exclude: /tech-max/i },
      
      // NMAX 125 Tech Max
      { pattern: /nmax-125-tech-max/i, folder: 'Yamaha-NMAX-125-Tech-Max' },
      { pattern: /tech-max.*grey/i, folder: 'Yamaha-NMAX-125-Tech-Max' },
      { pattern: /tech-max.*graphite/i, folder: 'Yamaha-NMAX-125-Tech-Max' },
      { pattern: /ceramic-grey/i, folder: 'Yamaha-NMAX-125-Tech-Max' },
      
      // XMAX 125
      { pattern: /xmax-125/i, folder: 'Yamaha-XMAX-125' },
    ];

    // Get all images
    const imagesResult = await client.query(
      `SELECT id, name, folder_path FROM files WHERE folder_path = '/' ORDER BY name`
    );

    console.log(`Found ${imagesResult.rows.length} images in root folder\n`);

    let movedCount = 0;

    for (const image of imagesResult.rows) {
      // Find matching folder
      let targetFolder = null;
      
      for (const mapping of mappings) {
        if (mapping.pattern.test(image.name)) {
          // Check exclude pattern if exists
          if (mapping.exclude && mapping.exclude.test(image.name)) {
            continue;
          }
          targetFolder = mapping.folder;
          break;
        }
      }

      if (targetFolder && folders[targetFolder]) {
        const folder = folders[targetFolder];
        const newPath = `${folder.path}/${image.name}`;
        
        console.log(`📦 Moving: ${image.name}`);
        console.log(`   → To folder: ${targetFolder} (${newPath})`);

        // Update file folder_path
        await client.query(
          'UPDATE files SET folder_path = $1 WHERE id = $2',
          [newPath, image.id]
        );

        // Create folder link
        await client.query(
          `INSERT INTO files_folder_links (file_id, folder_id, file_order)
           VALUES ($1, $2, 1)
           ON CONFLICT DO NOTHING`,
          [image.id, folder.id]
        );

        movedCount++;
        console.log(`   ✅ Moved successfully\n`);
      } else {
        console.log(`⚠️  No folder mapping for: ${image.name}\n`);
      }
    }

    console.log(`\n🎉 Organization complete!`);
    console.log(`   Moved: ${movedCount} images`);
    console.log(`   Remaining in root: ${imagesResult.rows.length - movedCount} images`);

  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  } finally {
    await client.end();
  }
}

organizeImagesInFolders();

