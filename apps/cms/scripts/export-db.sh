#!/bin/bash

# Script pentru export bază de date PostgreSQL pentru Render.com
# Autor: Scutere125.ro
# Data: 2025-12-09

set -e  # Exit on error

# Culori pentru output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configurare
DB_NAME="scutere125"
DB_USER="mihaibucse"
EXPORT_DIR="./exports"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
EXPORT_FILE="${EXPORT_DIR}/scutere125_${TIMESTAMP}.sql"

echo -e "${GREEN}🚀 Export bază de date pentru Render.com${NC}\n"

# Creăm directorul de export dacă nu există
if [ ! -d "$EXPORT_DIR" ]; then
    mkdir -p "$EXPORT_DIR"
    echo -e "${GREEN}✅ Creat director: ${EXPORT_DIR}${NC}"
fi

# Export bază de date
echo -e "${YELLOW}📦 Export bază de date...${NC}"
pg_dump -U "$DB_USER" -d "$DB_NAME" \
    --clean \
    --if-exists \
    --no-owner \
    --no-privileges \
    -f "$EXPORT_FILE"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Export realizat cu succes: ${EXPORT_FILE}${NC}"
    
    # Afișăm dimensiunea fișierului
    FILE_SIZE=$(du -h "$EXPORT_FILE" | cut -f1)
    echo -e "${GREEN}📊 Dimensiune fișier: ${FILE_SIZE}${NC}"
    
    # Compresia fișierului
    echo -e "${YELLOW}🗜️  Compresie fișier...${NC}"
    gzip -f "$EXPORT_FILE"
    COMPRESSED_FILE="${EXPORT_FILE}.gz"
    COMPRESSED_SIZE=$(du -h "$COMPRESSED_FILE" | cut -f1)
    echo -e "${GREEN}✅ Fișier comprimat: ${COMPRESSED_FILE}${NC}"
    echo -e "${GREEN}📊 Dimensiune comprimată: ${COMPRESSED_SIZE}${NC}"
    
    echo -e "\n${GREEN}🎉 Export finalizat cu succes!${NC}\n"
    echo -e "${YELLOW}📋 Pași următori pentru Render.com:${NC}"
    echo -e "1. Creează serviciu PostgreSQL în Render.com"
    echo -e "2. Obține URL-ul de conexiune (Internal Database URL)"
    echo -e "3. Rulează comanda de import:"
    echo -e "   ${GREEN}./scripts/import-db.sh <RENDER_DATABASE_URL> ${COMPRESSED_FILE}${NC}"
    echo -e "\n${YELLOW}Sau manual:${NC}"
    echo -e "   ${GREEN}gunzip -c ${COMPRESSED_FILE} | psql <RENDER_DATABASE_URL>${NC}\n"
else
    echo -e "${RED}❌ Eroare la export!${NC}"
    exit 1
fi

