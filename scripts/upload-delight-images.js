const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const STRAPI_URL = 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || '';

// Color definitions for Yamaha D'elight 125
const colors = [
  {
    name: 'Milky White',
    code: 'milky-white',
    hex: '#F5F5F5',
    imagePath: 'apps/web/public/images/scooters/Yamaha-Delight-125/Yamaha-Delight-125-milky-white.jpg'
  },
  {
    name: 'Power Black',
    code: 'power-black',
    hex: '#1A1A1A',
    imagePath: 'apps/web/public/images/scooters/Yamaha-Delight-125/Yamaha-Delight-125-power-black.jpg'
  },
  {
    name: 'Trendy Red',
    code: 'trendy-red',
    hex: '#DC143C',
    imagePath: 'apps/web/public/images/scooters/Yamaha-Delight-125/Yamaha-Delight-125-trendy-red.jpg'
  }
];

async function uploadImage(imagePath) {
  const fileName = path.basename(imagePath);

  // Use curl to upload the file
  const curlCommand = `curl -s -X POST "${STRAPI_URL}/api/upload" \
    -H "Authorization: Bearer ${STRAPI_API_TOKEN}" \
    -F "files=@${imagePath}"`;

  try {
    const output = execSync(curlCommand, { encoding: 'utf-8' });
    const data = JSON.parse(output);
    return data[0]; // Return first uploaded file
  } catch (error) {
    throw new Error(`Failed to upload ${fileName}: ${error.message}`);
  }
}

async function createColor(colorData, imageId, scooterId) {
  const response = await fetch(`${STRAPI_URL}/api/scooter-colors`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${STRAPI_API_TOKEN}`
    },
    body: JSON.stringify({
      data: {
        name: colorData.name,
        code: colorData.code,
        hex: colorData.hex,
        listingImage: imageId,
        image: imageId,
        scooter: scooterId,
        publishedAt: new Date().toISOString()
      }
    })
  });

  if (!response.ok) {
    throw new Error(`Failed to create color ${colorData.name}: ${response.statusText}`);
  }

  return await response.json();
}

async function getScooterId(slug) {
  const response = await fetch(
    `${STRAPI_URL}/api/scooters?filters[slug][$eq]=${slug}`,
    {
      headers: {
        'Authorization': `Bearer ${STRAPI_API_TOKEN}`
      }
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to get scooter: ${response.statusText}`);
  }

  const data = await response.json();
  return data.data[0]?.id;
}

async function updateScooterImages(scooterId, firstImageId) {
  const response = await fetch(`${STRAPI_URL}/api/scooters/${scooterId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${STRAPI_API_TOKEN}`
    },
    body: JSON.stringify({
      data: {
        listingImage: firstImageId,
        mainImage: firstImageId,
        image: firstImageId
      }
    })
  });

  if (!response.ok) {
    throw new Error(`Failed to update scooter images: ${response.statusText}`);
  }

  return await response.json();
}

async function main() {
  try {
    console.log('🚀 Starting Yamaha D\'elight 125 image upload...\n');

    // Get scooter ID
    const scooterId = await getScooterId('yamaha-delight-125');
    if (!scooterId) {
      throw new Error('Yamaha D\'elight 125 not found in Strapi!');
    }
    console.log(`✅ Found scooter ID: ${scooterId}\n`);

    let firstImageId = null;

    // Upload images and create colors
    for (const color of colors) {
      console.log(`📸 Uploading ${color.name}...`);
      const uploadedImage = await uploadImage(color.imagePath);
      console.log(`✅ Uploaded image ID: ${uploadedImage.id}`);

      if (!firstImageId) {
        firstImageId = uploadedImage.id;
      }

      console.log(`🎨 Creating color: ${color.name}...`);
      await createColor(color, uploadedImage.id, scooterId);
      console.log(`✅ Color created!\n`);
    }

    // Update scooter with first image
    console.log('🖼️  Updating scooter with listing image...');
    await updateScooterImages(scooterId, firstImageId);
    console.log('✅ Scooter updated!\n');

    console.log('🎉 All done! Yamaha D\'elight 125 images uploaded successfully!');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();

