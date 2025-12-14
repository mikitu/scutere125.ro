const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Render Strapi URL
const STRAPI_URL = process.env.RENDER_STRAPI_URL || 'https://scutere125-ro.onrender.com';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || '';

// Get all scooter folders
const scootersDir = 'apps/web/public/images/scooters';
const scooterFolders = fs.readdirSync(scootersDir).filter(f => {
  return fs.statSync(path.join(scootersDir, f)).isDirectory();
});

console.log(`🚀 Found ${scooterFolders.length} scooter folders\n`);

async function uploadImage(imagePath, scooterName) {
  const fileName = path.basename(imagePath);
  
  console.log(`📸 Uploading ${fileName} for ${scooterName}...`);
  
  // Use curl to upload the file
  const curlCommand = `curl -s -X POST "${STRAPI_URL}/api/upload" \
    -H "Authorization: Bearer ${STRAPI_API_TOKEN}" \
    -F "files=@${imagePath}"`;
  
  try {
    const output = execSync(curlCommand, { encoding: 'utf-8' });
    console.log(`   Response: ${output.substring(0, 200)}...`); // Debug
    const data = JSON.parse(output);
    if (data && data[0] && data[0].id) {
      console.log(`✅ Uploaded: ${fileName} (ID: ${data[0].id})`);
      return data[0];
    } else {
      console.error(`❌ Failed to upload ${fileName}: Invalid response`);
      return null;
    }
  } catch (error) {
    console.error(`❌ Failed to upload ${fileName}:`, error.message);
    return null;
  }
}

async function main() {
  if (!STRAPI_API_TOKEN) {
    console.error('❌ Error: STRAPI_API_TOKEN environment variable is required!');
    console.log('\nUsage:');
    console.log('  STRAPI_API_TOKEN=your_token node scripts/upload-all-images-to-render.js');
    console.log('\nTo get API token:');
    console.log('  1. Go to https://scutere125-ro.onrender.com/admin');
    console.log('  2. Settings → API Tokens → Create new API Token');
    console.log('  3. Name: "Image Upload", Token type: "Full access"');
    console.log('  4. Copy the token and use it in the command above');
    process.exit(1);
  }

  console.log(`🎯 Target: ${STRAPI_URL}\n`);

  let totalUploaded = 0;
  let totalFailed = 0;

  for (const folder of scooterFolders) {
    const folderPath = path.join(scootersDir, folder);
    const images = fs.readdirSync(folderPath).filter(f => 
      f.endsWith('.jpg') || f.endsWith('.png') || f.endsWith('.jpeg')
    );

    console.log(`\n📁 ${folder} (${images.length} images)`);
    console.log('─'.repeat(60));

    for (const image of images) {
      const imagePath = path.join(folderPath, image);
      const result = await uploadImage(imagePath, folder);
      
      if (result) {
        totalUploaded++;
      } else {
        totalFailed++;
      }
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  console.log('\n' + '═'.repeat(60));
  console.log(`\n🎉 Upload complete!`);
  console.log(`   ✅ Uploaded: ${totalUploaded} images`);
  console.log(`   ❌ Failed: ${totalFailed} images`);
  console.log('\n' + '═'.repeat(60));
}

main().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});

