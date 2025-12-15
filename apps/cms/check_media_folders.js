const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('.tmp/data.db');

// Check if there are any folders
db.all("SELECT * FROM upload_folders", (err, folders) => {
  if (err) {
    console.error('Error querying folders:', err);
    return;
  }
  console.log('\n=== UPLOAD FOLDERS ===');
  console.log(JSON.stringify(folders, null, 2));
  
  // Check files and their folder associations
  db.all(`
    SELECT f.id, f.name, f.url, fl.folder_id 
    FROM files f
    LEFT JOIN files_folder_links fl ON f.id = fl.file_id
    WHERE f.name LIKE '%Tricity%' OR f.name LIKE '%Rayzr%'
    ORDER BY f.name
  `, (err, files) => {
    if (err) {
      console.error('Error querying files:', err);
      db.close();
      return;
    }
    console.log('\n=== FILES (Tricity & Rayzr) ===');
    console.log(JSON.stringify(files, null, 2));
    db.close();
  });
});
