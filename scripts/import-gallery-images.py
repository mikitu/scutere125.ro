#!/usr/bin/env python3

"""
Import gallery images from galerie-foto to Strapi
Maps folder names to scooter slugs and uploads images to gallery field
"""

import os
import requests
import json
from pathlib import Path

STRAPI_URL = "http://localhost:1337"
API_TOKEN = "eda87e53a9ff8a38aaebdafd9c4c8be6b4382c944a0b860d75a7a85725433135b07cd08debc6d4b5a769f0a4d3006efb2fa0df3cb23777197af7ceccb57ca79a95eeed2bd40b887e82937446b6c399b9fcd01f41db877dec1e7e2c7314b8f14abac54eec7efda65665b7c875a7a3908cd52202c4b08185ad062d24ada2b31647"

# Mapping: folder_name -> scooter_slug
FOLDER_TO_SLUG = {
    "D'elight 125": "yamaha-delight-125",
    "NMAX 125": "yamaha-nmax-125",
    "NMAX 125 Tech MAX": "yamaha-nmax-125-tech-max",
    "RayZR 125": "yamaha-rayzr",
    "Tricity 125": "yamaha-tricity-125",
    "XMAX 125": "yamaha-xmax-125",
    "XMAX 125 Tech MAX": "yamaha-xmax-125-tech-max",
}

HEADERS = {
    "Authorization": f"Bearer {API_TOKEN}"
}


def get_scooter_id(slug):
    """Get scooter ID from slug"""
    url = f"{STRAPI_URL}/api/scooters"
    params = {
        "filters[slug][$eq]": slug,
        "fields": "id"
    }
    response = requests.get(url, headers=HEADERS, params=params)
    data = response.json()
    
    if data.get("data") and len(data["data"]) > 0:
        return data["data"][0]["id"]
    return None


def upload_image(image_path):
    """Upload image to Strapi media library"""
    url = f"{STRAPI_URL}/api/upload"
    
    with open(image_path, 'rb') as f:
        files = {'files': (os.path.basename(image_path), f, 'image/jpeg')}
        data = {'path': '/uploads'}
        response = requests.post(url, headers=HEADERS, files=files, data=data)
    
    if response.status_code == 200:
        result = response.json()
        if isinstance(result, list) and len(result) > 0:
            return result[0]['id']
    return None


def attach_images_to_scooter(scooter_id, image_ids):
    """Attach uploaded images to scooter's gallery field"""
    url = f"{STRAPI_URL}/api/scooters/{scooter_id}"
    
    # First, get current gallery images
    response = requests.get(f"{url}?populate=gallery", headers=HEADERS)
    current_data = response.json()
    
    current_gallery_ids = []
    if current_data.get("data") and current_data["data"].get("attributes"):
        gallery = current_data["data"]["attributes"].get("gallery", {})
        if gallery.get("data"):
            current_gallery_ids = [img["id"] for img in gallery["data"]]
    
    # Merge with new images
    all_image_ids = list(set(current_gallery_ids + image_ids))
    
    # Update scooter
    payload = {
        "data": {
            "gallery": all_image_ids
        }
    }
    
    response = requests.put(url, headers=HEADERS, json=payload)
    return response.status_code == 200


def process_folder(folder_name, scooter_slug):
    """Process a folder and upload all images"""
    folder_path = Path(f"galerie-foto/YAMAHA/{folder_name}")
    
    if not folder_path.exists():
        print(f"⚠️  Folder not found: {folder_path}")
        return
    
    print(f"\n📁 Processing: {folder_name} -> {scooter_slug}")
    
    # Get scooter ID
    scooter_id = get_scooter_id(scooter_slug)
    if not scooter_id:
        print(f"  ❌ Scooter not found in Strapi: {scooter_slug}")
        return
    
    print(f"  ✅ Found scooter ID: {scooter_id}")
    
    # Find all images
    image_files = list(folder_path.glob("*.jpg")) + \
                  list(folder_path.glob("*.jpeg")) + \
                  list(folder_path.glob("*.png")) + \
                  list(folder_path.glob("*.JPG")) + \
                  list(folder_path.glob("*.JPEG")) + \
                  list(folder_path.glob("*.PNG"))
    
    print(f"  📸 Found {len(image_files)} images")
    
    # Upload images
    uploaded_ids = []
    for i, image_file in enumerate(image_files, 1):
        print(f"    [{i}/{len(image_files)}] Uploading: {image_file.name}...", end=" ")
        file_id = upload_image(image_file)
        if file_id:
            print(f"✅ (ID: {file_id})")
            uploaded_ids.append(file_id)
        else:
            print("❌ Failed")
    
    print(f"  📊 Uploaded {len(uploaded_ids)}/{len(image_files)} images")
    
    # Attach to scooter
    if uploaded_ids:
        print(f"  🔗 Attaching images to scooter...", end=" ")
        if attach_images_to_scooter(scooter_id, uploaded_ids):
            print("✅ Done")
        else:
            print("❌ Failed")


def main():
    print("🚀 Starting gallery images import...\n")
    
    for folder_name, scooter_slug in FOLDER_TO_SLUG.items():
        process_folder(folder_name, scooter_slug)
    
    print("\n✅ Gallery import completed!")


if __name__ == "__main__":
    main()

