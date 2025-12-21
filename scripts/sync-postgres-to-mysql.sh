#!/bin/bash

# Sync PostgreSQL database to MySQL
# This script exports data from local PostgreSQL and imports it into MySQL

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🔄 PostgreSQL to MySQL Sync Script${NC}"
echo ""

# PostgreSQL credentials (local)
PG_HOST="localhost"
PG_PORT="5432"
PG_DB="scutere125"
PG_USER="mihaibucse"

# MySQL credentials (you'll need to configure these)
MYSQL_HOST="${MYSQL_HOST:-localhost}"
MYSQL_PORT="${MYSQL_PORT:-3306}"
MYSQL_DB="${MYSQL_DB:-scutere125}"
MYSQL_USER="${MYSQL_USER:-root}"
MYSQL_PASSWORD="${MYSQL_PASSWORD}"

# Backup directory
BACKUP_DIR="backups"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
PG_BACKUP_FILE="$BACKUP_DIR/postgres-backup-$TIMESTAMP.sql"
MYSQL_IMPORT_FILE="$BACKUP_DIR/mysql-import-$TIMESTAMP.sql"

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

echo -e "${YELLOW}📋 Configuration:${NC}"
echo "  PostgreSQL: $PG_USER@$PG_HOST:$PG_PORT/$PG_DB"
echo "  MySQL: $MYSQL_USER@$MYSQL_HOST:$MYSQL_PORT/$MYSQL_DB"
echo ""

# Step 1: Export PostgreSQL database
echo -e "${YELLOW}📤 Step 1: Exporting PostgreSQL database...${NC}"
pg_dump -h "$PG_HOST" -p "$PG_PORT" -U "$PG_USER" -d "$PG_DB" \
  --data-only \
  --column-inserts \
  --no-owner \
  --no-privileges \
  > "$PG_BACKUP_FILE"

if [ $? -eq 0 ]; then
  echo -e "${GREEN}  ✅ PostgreSQL export successful: $PG_BACKUP_FILE${NC}"
  FILE_SIZE=$(ls -lh "$PG_BACKUP_FILE" | awk '{print $5}')
  echo -e "  📊 File size: $FILE_SIZE"
else
  echo -e "${RED}  ❌ PostgreSQL export failed${NC}"
  exit 1
fi
echo ""

# Step 2: Convert PostgreSQL SQL to MySQL-compatible SQL
echo -e "${YELLOW}🔧 Step 2: Converting PostgreSQL SQL to MySQL format...${NC}"

# Create a Python script to convert the SQL
cat > "$BACKUP_DIR/convert_pg_to_mysql.py" << 'PYTHON_SCRIPT'
import sys
import re

def convert_pg_to_mysql(input_file, output_file):
    """Convert PostgreSQL SQL dump to MySQL-compatible SQL"""
    
    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remove PostgreSQL-specific commands
    content = re.sub(r'SET .*?;', '', content)
    content = re.sub(r'SELECT pg_catalog\..*?;', '', content)
    content = re.sub(r'--.*?\n', '\n', content)  # Remove comments
    
    # Convert boolean values
    content = content.replace("'t'", '1')
    content = content.replace("'f'", '0')
    content = content.replace('true', '1')
    content = content.replace('false', '0')
    
    # Convert sequences/serial to AUTO_INCREMENT (in schema)
    content = re.sub(r'SERIAL', 'INT AUTO_INCREMENT', content, flags=re.IGNORECASE)
    
    # Convert timestamp formats
    content = re.sub(r'::timestamp', '', content)
    content = re.sub(r'::integer', '', content)
    content = re.sub(r'::text', '', content)
    content = re.sub(r'::jsonb', '', content)
    
    # Remove COPY commands (PostgreSQL-specific)
    content = re.sub(r'COPY .*? FROM stdin;.*?\\\.', '', content, flags=re.DOTALL)
    
    # Add MySQL-specific settings
    mysql_header = """
-- MySQL Database Import
-- Converted from PostgreSQL
-- Generated: """ + sys.argv[3] + """

SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

"""
    
    mysql_footer = """

COMMIT;
SET FOREIGN_KEY_CHECKS=1;
"""
    
    content = mysql_header + content + mysql_footer
    
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ Conversion complete: {output_file}")

if __name__ == "__main__":
    if len(sys.argv) != 4:
        print("Usage: python convert_pg_to_mysql.py <input_file> <output_file> <timestamp>")
        sys.exit(1)
    
    convert_pg_to_mysql(sys.argv[1], sys.argv[2])
PYTHON_SCRIPT

python3 "$BACKUP_DIR/convert_pg_to_mysql.py" "$PG_BACKUP_FILE" "$MYSQL_IMPORT_FILE" "$TIMESTAMP"

if [ $? -eq 0 ]; then
  echo -e "${GREEN}  ✅ Conversion successful: $MYSQL_IMPORT_FILE${NC}"
else
  echo -e "${RED}  ❌ Conversion failed${NC}"
  exit 1
fi
echo ""

# Step 3: Import to MySQL
echo -e "${YELLOW}📥 Step 3: Importing to MySQL database...${NC}"

if [ -z "$MYSQL_PASSWORD" ]; then
  echo -e "${YELLOW}  ⚠️  MySQL password not set. Please enter it:${NC}"
  read -s MYSQL_PASSWORD
  echo ""
fi

# Test MySQL connection
mysql -h "$MYSQL_HOST" -P "$MYSQL_PORT" -u "$MYSQL_USER" -p"$MYSQL_PASSWORD" -e "SELECT 1;" > /dev/null 2>&1

if [ $? -ne 0 ]; then
  echo -e "${RED}  ❌ MySQL connection failed. Please check credentials.${NC}"
  exit 1
fi

echo -e "${GREEN}  ✅ MySQL connection successful${NC}"

# Create database if it doesn't exist
mysql -h "$MYSQL_HOST" -P "$MYSQL_PORT" -u "$MYSQL_USER" -p"$MYSQL_PASSWORD" \
  -e "CREATE DATABASE IF NOT EXISTS $MYSQL_DB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

echo -e "${YELLOW}  📊 Importing data to MySQL...${NC}"

mysql -h "$MYSQL_HOST" -P "$MYSQL_PORT" -u "$MYSQL_USER" -p"$MYSQL_PASSWORD" "$MYSQL_DB" < "$MYSQL_IMPORT_FILE"

if [ $? -eq 0 ]; then
  echo -e "${GREEN}  ✅ MySQL import successful${NC}"
else
  echo -e "${RED}  ❌ MySQL import failed${NC}"
  exit 1
fi
echo ""

# Step 4: Verify import
echo -e "${YELLOW}🔍 Step 4: Verifying import...${NC}"

TABLE_COUNT=$(mysql -h "$MYSQL_HOST" -P "$MYSQL_PORT" -u "$MYSQL_USER" -p"$MYSQL_PASSWORD" "$MYSQL_DB" \
  -e "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = '$MYSQL_DB';" -s -N)

echo -e "${GREEN}  ✅ Tables in MySQL database: $TABLE_COUNT${NC}"
echo ""

# Cleanup
echo -e "${YELLOW}🧹 Cleanup:${NC}"
echo "  Backup files saved in: $BACKUP_DIR/"
echo "  - PostgreSQL dump: $PG_BACKUP_FILE"
echo "  - MySQL import: $MYSQL_IMPORT_FILE"
echo ""

echo -e "${GREEN}✅ Sync completed successfully!${NC}"
echo ""
echo -e "${YELLOW}📝 Next steps:${NC}"
echo "  1. Update Strapi database config to use MySQL"
echo "  2. Update .env file with MySQL credentials"
echo "  3. Test Strapi with MySQL connection"

