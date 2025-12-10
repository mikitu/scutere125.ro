#!/bin/bash

# Script to sync local PostgreSQL database to Render
# This exports the local database and imports it to Render

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Local database settings
LOCAL_DB="scutere125"
LOCAL_USER="mihaibucse"
LOCAL_HOST="localhost"
LOCAL_PORT="5432"

# Render database settings
RENDER_DB="scutere125_ro"
RENDER_USER="scutere125_ro_user"
RENDER_PASSWORD="5JDLvWYE4YtvHh7UiZBvxujqWMrPnPGL"
RENDER_HOST="dpg-d4s1jq4gq5a738021dg-a.frankfurt-postgres.render.com"
RENDER_PORT="5432"
RENDER_URL="postgresql://scutere125_ro_user:5JDLvWYE4YtvHh7UiZBvxujqWMrPnPGL@dpg-d4s1jq4gq5a738021dg-a.frankfurt-postgres.render.com/scutere125_ro?sslmode=require"

# Temporary dump file
DUMP_FILE="./tmp/scutere125_dump_$(date +%Y%m%d_%H%M%S).sql"

# Create tmp directory if it doesn't exist
mkdir -p ./tmp

echo -e "${YELLOW}🚀 Starting database sync from local to Render...${NC}\n"

# Step 1: Export local database
echo -e "${YELLOW}📦 Step 1: Exporting local database...${NC}"
pg_dump -U $LOCAL_USER -h $LOCAL_HOST -p $LOCAL_PORT -d $LOCAL_DB \
  --clean \
  --if-exists \
  --no-owner \
  --no-privileges \
  -f $DUMP_FILE

if [ $? -eq 0 ]; then
  echo -e "${GREEN}✅ Local database exported successfully to: $DUMP_FILE${NC}\n"
else
  echo -e "${RED}❌ Failed to export local database${NC}"
  exit 1
fi

# Step 2: Import to Render
echo -e "${YELLOW}📤 Step 2: Importing to Render database...${NC}"
echo -e "${YELLOW}   This may take a few minutes...${NC}\n"

psql "$RENDER_URL" -f $DUMP_FILE

if [ $? -eq 0 ]; then
  echo -e "\n${GREEN}✅ Database imported successfully to Render!${NC}\n"
else
  echo -e "\n${RED}❌ Failed to import database to Render${NC}"
  exit 1
fi

# Step 3: Verify import
echo -e "${YELLOW}🔍 Step 3: Verifying import...${NC}"
SCOOTER_COUNT=$(psql "$RENDER_URL" -t -c "SELECT COUNT(*) FROM scooters;")
COLOR_COUNT=$(psql "$RENDER_URL" -t -c "SELECT COUNT(*) FROM scooter_colors;")
FILE_COUNT=$(psql "$RENDER_URL" -t -c "SELECT COUNT(*) FROM files;")
FOLDER_COUNT=$(psql "$RENDER_URL" -t -c "SELECT COUNT(*) FROM upload_folders;")

echo -e "${GREEN}✅ Verification complete:${NC}"
echo -e "   Scooters: $SCOOTER_COUNT"
echo -e "   Colors: $COLOR_COUNT"
echo -e "   Files: $FILE_COUNT"
echo -e "   Folders: $FOLDER_COUNT"

# Optional: Clean up dump file
echo -e "\n${YELLOW}🧹 Cleanup${NC}"
read -p "Do you want to delete the dump file? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  rm $DUMP_FILE
  echo -e "${GREEN}✅ Dump file deleted${NC}"
else
  echo -e "${YELLOW}📁 Dump file kept at: $DUMP_FILE${NC}"
fi

echo -e "\n${GREEN}🎉 Database sync completed successfully!${NC}"
echo -e "${YELLOW}📝 Next steps:${NC}"
echo -e "   1. Update Strapi .env to use Render database"
echo -e "   2. Upload media files to Render (if using local storage)"
echo -e "   3. Test the application with Render database\n"

