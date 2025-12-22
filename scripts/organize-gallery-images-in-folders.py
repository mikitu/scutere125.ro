#!/usr/bin/env python3

"""
Organize gallery images into proper folders in Strapi Media Library
Moves images from "API Uploads" folder to scooter-specific folders
"""

import psycopg2
import os

# Database connection
DB_CONFIG = {
    'host': 'localhost',
    'port': '5432',
    'database': 'scutere125',
    'user': 'mihaibucse',
}

# Mapping: scooter slug -> folder name pattern
SCOOTER_TO_FOLDER = {
    'yamaha-delight-125': 'Yamaha-Delight-125',
    'yamaha-nmax-125': 'Yamaha-NMAX-125',
    'yamaha-nmax-125-tech-max': 'Yamaha-NMAX-125-Tech-Max',
    'yamaha-rayzr': 'Yamaha-Rayzr',
    'yamaha-tricity-125': 'Yamaha-Tricity-125',
    'yamaha-xmax-125': 'Yamaha-XMAX-125',
    'yamaha-xmax-125-tech-max': 'Yamaha-XMAX-125-Tech-Max',
}

# Image name patterns for each scooter
IMAGE_PATTERNS = {
    'yamaha-delight-125': ['LTS125'],
    'yamaha-nmax-125': ['G125YM-EU-Icon', 'G125YM-EU-Crystal_Graphite'],
    'yamaha-nmax-125-tech-max': ['G125YM-EU-Ceramic', 'G125YM-EU-Tech_MAX'],
    'yamaha-rayzr': ['LCG125'],
    'yamaha-tricity-125': ['LMW125'],
    'yamaha-xmax-125': ['XMAX125A-EU-Icon', 'XMAX125A-EU-Tech_Kamo'],
    'yamaha-xmax-125-tech-max': ['XMAX125A-EU-Ceramic', 'XMAX125A-EU-Tech_MAX'],
}


def get_or_create_folder(conn, folder_name, parent_id=1):
    """Get or create a folder in Strapi"""
    cursor = conn.cursor()
    
    # Check if folder exists
    cursor.execute("""
        SELECT id FROM upload_folders 
        WHERE name = %s
    """, (folder_name,))
    
    result = cursor.fetchone()
    if result:
        folder_id = result[0]
        print(f"  ✅ Found folder: {folder_name} (ID: {folder_id})")
        return folder_id
    
    # Create folder
    cursor.execute("""
        SELECT MAX(id) FROM upload_folders
    """)
    max_id = cursor.fetchone()[0] or 0
    new_id = max_id + 1
    
    # Get parent path
    cursor.execute("""
        SELECT path FROM upload_folders WHERE id = %s
    """, (parent_id,))
    parent_path = cursor.fetchone()[0]
    new_path = f"{parent_path}/{new_id}"
    
    cursor.execute("""
        INSERT INTO upload_folders (id, name, path, path_id, created_at, updated_at)
        VALUES (%s, %s, %s, %s, NOW(), NOW())
        RETURNING id
    """, (new_id, folder_name, new_path, new_id))
    
    folder_id = cursor.fetchone()[0]
    
    # Link to parent
    cursor.execute("""
        INSERT INTO upload_folders_parent_links (folder_id, inv_folder_id)
        VALUES (%s, %s)
    """, (folder_id, parent_id))
    
    conn.commit()
    print(f"  ✅ Created folder: {folder_name} (ID: {folder_id})")
    return folder_id


def move_images_to_folder(conn, scooter_slug, folder_id):
    """Move images for a scooter to its folder"""
    cursor = conn.cursor()
    
    # Get image patterns for this scooter
    patterns = IMAGE_PATTERNS.get(scooter_slug, [])
    if not patterns:
        print(f"  ⚠️  No patterns defined for {scooter_slug}")
        return 0
    
    # Find images matching patterns
    pattern_conditions = " OR ".join([f"f.name LIKE '%{pattern}%'" for pattern in patterns])
    
    query = f"""
        SELECT f.id, f.name, ffl.folder_id
        FROM files f
        LEFT JOIN files_folder_links ffl ON f.id = ffl.file_id
        WHERE ({pattern_conditions})
        AND (f.name LIKE '2024%' OR f.name LIKE '2025%' OR f.name LIKE '2026%')
    """

    cursor.execute(query)
    images = cursor.fetchall()
    
    if not images:
        print(f"  ⚠️  No images found for {scooter_slug}")
        return 0
    
    # Get folder path
    cursor.execute("""
        SELECT path FROM upload_folders WHERE id = %s
    """, (folder_id,))
    folder_path = cursor.fetchone()[0]

    moved_count = 0
    for image_id, image_name, current_folder_id in images:
        if current_folder_id == folder_id:
            print(f"    ✓ Already in correct folder: {image_name}")
            continue

        # Delete old folder link
        if current_folder_id:
            cursor.execute("""
                DELETE FROM files_folder_links WHERE file_id = %s
            """, (image_id,))

        # Create new folder link
        cursor.execute("""
            INSERT INTO files_folder_links (file_id, folder_id)
            VALUES (%s, %s)
            ON CONFLICT DO NOTHING
        """, (image_id, folder_id))

        # Update folder_path in files table
        cursor.execute("""
            UPDATE files SET folder_path = %s WHERE id = %s
        """, (folder_path, image_id))

        moved_count += 1
        print(f"    ✅ Moved: {image_name}")

    conn.commit()
    return moved_count


def main():
    print("🗂️  Organizing Gallery Images in Folders")
    print("=" * 60)
    print()
    
    # Connect to database
    try:
        conn = psycopg2.connect(**DB_CONFIG)
        print("✅ Connected to database")
        print()
    except Exception as e:
        print(f"❌ Failed to connect to database: {e}")
        return
    
    total_moved = 0
    
    for scooter_slug, folder_name in SCOOTER_TO_FOLDER.items():
        print(f"📁 Processing: {scooter_slug}")
        
        # Get or create folder
        folder_id = get_or_create_folder(conn, folder_name)
        
        # Move images
        moved = move_images_to_folder(conn, scooter_slug, folder_id)
        total_moved += moved
        
        print(f"  📊 Moved {moved} images")
        print()
    
    conn.close()
    
    print("=" * 60)
    print(f"✅ Completed! Moved {total_moved} images total")


if __name__ == "__main__":
    main()

