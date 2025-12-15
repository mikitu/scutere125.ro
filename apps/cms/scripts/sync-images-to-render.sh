#!/bin/bash

# Sync new images to Render Strapi
# This script uploads all Yamaha Tricity images that were added locally

STRAPI_URL="https://scutere125-ro.onrender.com"
API_TOKEN="eda87e53a9ff8a38aaebdafd9c4c8be6b4382c944a0b860d75a7a85725433135b07cd08debc6d4b5a769f0a4d3006efb2fa0df3cb23777197af7ceccb57ca79a95eeed2bd40b887e82937446b6c399b9fcd01f41db877dec1e7e2c7314b8f14abac54eec7efda65665b7c875a7a3908cd52202c4b08185ad062d24ada2b31647"

UPLOAD_DIR="public/uploads"

echo "🚀 Starting image sync to Render..."
echo "Target: $STRAPI_URL"
echo ""

# Upload Yamaha Tricity images (new ones with different hash)
echo "📤 Uploading Yamaha Tricity 125 images..."

for file in \
  "Yamaha_Tricity_125_Matt_Grey_c0a5ac9328.jpg" \
  "Yamaha_Tricity_125_Milky_White_16cb895b66.jpg" \
  "Yamaha_Tricity_125_Zen_Green_d88606a1c3.jpg" \
  "large_Yamaha_Tricity_125_Matt_Grey_c0a5ac9328.jpg" \
  "large_Yamaha_Tricity_125_Milky_White_16cb895b66.jpg" \
  "large_Yamaha_Tricity_125_Zen_Green_d88606a1c3.jpg" \
  "medium_Yamaha_Tricity_125_Matt_Grey_c0a5ac9328.jpg" \
  "medium_Yamaha_Tricity_125_Milky_White_16cb895b66.jpg" \
  "medium_Yamaha_Tricity_125_Zen_Green_d88606a1c3.jpg" \
  "small_Yamaha_Tricity_125_Matt_Grey_c0a5ac9328.jpg" \
  "small_Yamaha_Tricity_125_Milky_White_16cb895b66.jpg" \
  "small_Yamaha_Tricity_125_Zen_Green_d88606a1c3.jpg" \
  "thumbnail_Yamaha_Tricity_125_Matt_Grey_c0a5ac9328.jpg" \
  "thumbnail_Yamaha_Tricity_125_Milky_White_16cb895b66.jpg" \
  "thumbnail_Yamaha_Tricity_125_Zen_Green_d88606a1c3.jpg"
do
  if [ -f "$UPLOAD_DIR/$file" ]; then
    echo "  Uploading: $file"
    curl -X POST "$STRAPI_URL/api/upload" \
      -H "Authorization: Bearer $API_TOKEN" \
      -F "files=@$UPLOAD_DIR/$file" \
      -F "path=/uploads" \
      -s -o /dev/null -w "    Status: %{http_code}\n"
  else
    echo "  ⚠️  File not found: $file"
  fi
done

echo ""
echo "✅ Image sync completed!"
echo ""
echo "🔍 Verify uploads at: $STRAPI_URL/admin/plugins/upload"

