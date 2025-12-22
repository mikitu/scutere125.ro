#!/usr/bin/env node

/**
 * Upload gallery images from local Strapi to Render Strapi
 * This script uploads all images from apps/cms/public/uploads/ to Render
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Render Strapi URL
const STRAPI_URL = process.env.RENDER_STRAPI_URL || 'https://scutere125-ro.onrender.com';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || '';

// Local uploads directory
const UPLOADS_DIR = 'apps/cms/public/uploads';

// Get all images from uploads directory
function getAllImages() {
  const images = [];
  const files = fs.readdirSync(UPLOADS_DIR);
  
  for (const file of files) {
    const filePath = path.join(UPLOADS_DIR, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isFile() && /\.(jpg|jpeg|png|gif|webp)$/i.test(file)) {
      images.push({
        path: filePath,
        name: file,
        size: stat.size,
      });
    }
  }
  
  return images;
}

// Upload a single image
async function uploadImage(imagePath, imageName) {
  console.log(`📸 Uploading ${imageName}...`);
  
  // Use curl to upload the file
  const curlCommand = `curl -s -X POST "${STRAPI_URL}/api/upload" \
    -H "Authorization: Bearer ${STRAPI_API_TOKEN}" \
    -F "files=@${imagePath}"`;
  
  try {
    const output = execSync(curlCommand, { encoding: 'utf-8', maxBuffer: 10 * 1024 * 1024 });
    const data = JSON.parse(output);
    
    if (data && data[0] && data[0].id) {
      console.log(`✅ Uploaded: ${imageName} (ID: ${data[0].id})`);
      return { success: true, id: data[0].id, name: imageName };
    } else {
      console.error(`❌ Failed to upload ${imageName}: Invalid response`);
      return { success: false, name: imageName, error: 'Invalid response' };
    }
  } catch (error) {
    console.error(`❌ Failed to upload ${imageName}: ${error.message}`);
    return { success: false, name: imageName, error: error.message };
  }
}

// Sleep function for rate limiting
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  console.log('🚀 Gallery Images Upload to Render');
  console.log('=' .repeat(50));
  console.log();
  
  // Validate API token
  if (!STRAPI_API_TOKEN) {
    console.error('❌ Error: STRAPI_API_TOKEN environment variable is required!');
    console.log('\nUsage:');
    console.log('  STRAPI_API_TOKEN=your_token node scripts/upload-gallery-images-to-render.js');
    console.log('\nTo get API token:');
    console.log('  1. Go to https://scutere125-ro.onrender.com/admin');
    console.log('  2. Settings → API Tokens → Create new API Token');
    console.log('  3. Type: Full access');
    console.log('  4. Copy the token');
    process.exit(1);
  }
  
  // Get all images
  const images = getAllImages();
  console.log(`📊 Found ${images.length} images in ${UPLOADS_DIR}`);
  console.log();
  
  if (images.length === 0) {
    console.log('⚠️  No images found to upload');
    process.exit(0);
  }
  
  // Calculate total size
  const totalSize = images.reduce((sum, img) => sum + img.size, 0);
  const totalSizeMB = (totalSize / 1024 / 1024).toFixed(2);
  console.log(`📦 Total size: ${totalSizeMB} MB`);
  console.log();
  
  // Confirm upload
  console.log('⚠️  This will upload all images to Render. Continue? (Ctrl+C to cancel)');
  console.log('   Starting in 3 seconds...');
  await sleep(3000);
  console.log();
  
  // Upload images
  const results = {
    success: [],
    failed: [],
  };
  
  let count = 0;
  for (const image of images) {
    count++;
    console.log(`\n[${count}/${images.length}]`);
    
    const result = await uploadImage(image.path, image.name);
    
    if (result.success) {
      results.success.push(result);
    } else {
      results.failed.push(result);
    }
    
    // Rate limiting: wait 100ms between uploads
    if (count < images.length) {
      await sleep(100);
    }
  }
  
  // Summary
  console.log();
  console.log('=' .repeat(50));
  console.log('📊 Upload Summary');
  console.log('=' .repeat(50));
  console.log(`✅ Successful: ${results.success.length}`);
  console.log(`❌ Failed: ${results.failed.length}`);
  console.log(`📦 Total: ${images.length}`);
  console.log();
  
  if (results.failed.length > 0) {
    console.log('❌ Failed uploads:');
    results.failed.forEach(f => {
      console.log(`   - ${f.name}: ${f.error}`);
    });
    console.log();
  }
  
  console.log('✅ Upload completed!');
}

main().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});

