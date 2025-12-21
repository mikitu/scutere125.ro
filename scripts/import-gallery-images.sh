#!/bin/bash

# Import gallery images from galerie-foto to Strapi
# Maps folder names to scooter slugs and uploads images to gallery field

STRAPI_URL="http://localhost:1337"
API_TOKEN="eda87e53a9ff8a38aaebdafd9c4c8be6b4382c944a0b860d75a7a85725433135b07cd08debc6d4b5a769f0a4d3006efb2fa0df3cb23777197af7ceccb57ca79a95eeed2bd40b887e82937446b6c399b9fcd01f41db877dec1e7e2c7314b8f14abac54eec7efda65665b7c875a7a3908cd52202c4b08185ad062d24ada2b31647"

# Mapping: folder_name -> scooter_slug
declare -A FOLDER_TO_SLUG
FOLDER_TO_SLUG["D'elight 125"]="yamaha-delight-125"
FOLDER_TO_SLUG["NMAX 125"]="yamaha-nmax-125"
FOLDER_TO_SLUG["NMAX 125 Tech MAX"]="yamaha-nmax-125-tech-max"
FOLDER_TO_SLUG["RayZR 125"]="yamaha-rayzr"
FOLDER_TO_SLUG["Tricity 125"]="yamaha-tricity-125"
FOLDER_TO_SLUG["XMAX 125"]="yamaha-xmax-125"
FOLDER_TO_SLUG["XMAX 125 Tech MAX"]="yamaha-xmax-125-tech-max"

echo "🚀 Starting gallery images import..."
echo ""

# Function to upload images for a scooter
upload_gallery_images() {
  local folder_name="$1"
  local scooter_slug="$2"
  local folder_path="galerie-foto/YAMAHA/$folder_name"
  
  if [ ! -d "$folder_path" ]; then
    echo "⚠️  Folder not found: $folder_path"
    return
  fi
  
  echo "📁 Processing: $folder_name -> $scooter_slug"
  
  # Get scooter ID from Strapi
  local scooter_id=$(curl -s "$STRAPI_URL/api/scooters?filters[slug][\$eq]=$scooter_slug&fields=id" \
    -H "Authorization: Bearer $API_TOKEN" | jq -r '.data[0].id')
  
  if [ -z "$scooter_id" ] || [ "$scooter_id" = "null" ]; then
    echo "  ❌ Scooter not found in Strapi: $scooter_slug"
    return
  fi
  
  echo "  ✅ Found scooter ID: $scooter_id"
  
  # Count images
  local image_count=$(find "$folder_path" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) | wc -l | tr -d ' ')
  echo "  📸 Found $image_count images"
  
  # Upload each image
  local uploaded=0
  for image_file in "$folder_path"/*.{jpg,jpeg,png,JPG,JPEG,PNG}; do
    # Skip if glob didn't match
    [ -e "$image_file" ] || continue
    
    local filename=$(basename "$image_file")
    echo "    Uploading: $filename"
    
    # Upload to Strapi media library
    local upload_response=$(curl -s -X POST "$STRAPI_URL/api/upload" \
      -H "Authorization: Bearer $API_TOKEN" \
      -F "files=@$image_file" \
      -F "path=/uploads")
    
    local file_id=$(echo "$upload_response" | jq -r '.[0].id')
    
    if [ -n "$file_id" ] && [ "$file_id" != "null" ]; then
      echo "      ✅ Uploaded (ID: $file_id)"
      ((uploaded++))
    else
      echo "      ❌ Upload failed"
    fi
  done
  
  echo "  📊 Uploaded $uploaded/$image_count images"
  echo ""
}

# Process each folder
for folder_name in "${!FOLDER_TO_SLUG[@]}"; do
  upload_gallery_images "$folder_name" "${FOLDER_TO_SLUG[$folder_name]}"
done

echo "✅ Gallery import completed!"
echo ""
echo "⚠️  Note: Images are uploaded to Media Library but NOT yet attached to scooters."
echo "   You need to manually attach them in Strapi Admin:"
echo "   1. Go to Content Manager -> Scooters"
echo "   2. Edit each scooter"
echo "   3. Add images to the 'gallery' field"
echo ""
echo "   Or we can create a script to auto-attach them via API."

