#!/bin/bash

# Script pentru import bază de date în Render.com PostgreSQL
# Autor: Scutere125.ro
# Data: 2025-12-09

set -e  # Exit on error

# Culori pentru output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verificăm argumentele
if [ $# -lt 2 ]; then
    echo -e "${RED}❌ Utilizare: $0 <RENDER_DATABASE_URL> <SQL_FILE>${NC}"
    echo -e "${YELLOW}Exemplu:${NC}"
    echo -e "  $0 'postgresql://user:pass@host:5432/dbname' ./exports/scutere125_20251209_120000.sql.gz"
    exit 1
fi

DATABASE_URL="$1"
SQL_FILE="$2"

echo -e "${GREEN}🚀 Import bază de date în Render.com${NC}\n"

# Verificăm dacă fișierul există
if [ ! -f "$SQL_FILE" ]; then
    echo -e "${RED}❌ Fișierul nu există: ${SQL_FILE}${NC}"
    exit 1
fi

echo -e "${YELLOW}📦 Fișier: ${SQL_FILE}${NC}"
FILE_SIZE=$(du -h "$SQL_FILE" | cut -f1)
echo -e "${YELLOW}📊 Dimensiune: ${FILE_SIZE}${NC}\n"

# Verificăm dacă fișierul este comprimat
if [[ "$SQL_FILE" == *.gz ]]; then
    echo -e "${YELLOW}🗜️  Decompresie și import...${NC}"
    gunzip -c "$SQL_FILE" | psql "$DATABASE_URL"
else
    echo -e "${YELLOW}📥 Import...${NC}"
    psql "$DATABASE_URL" -f "$SQL_FILE"
fi

if [ $? -eq 0 ]; then
    echo -e "\n${GREEN}✅ Import realizat cu succes!${NC}\n"
    
    # Verificăm datele importate
    echo -e "${YELLOW}📊 Verificare date importate:${NC}"
    psql "$DATABASE_URL" -c "SELECT COUNT(*) as total_scooters FROM scooters;" 2>/dev/null || echo "Nu s-a putut verifica"
    psql "$DATABASE_URL" -c "SELECT COUNT(*) as total_files FROM files;" 2>/dev/null || echo "Nu s-a putut verifica"
    
    echo -e "\n${GREEN}🎉 Baza de date este gata în Render.com!${NC}\n"
    echo -e "${YELLOW}📋 Pași următori:${NC}"
    echo -e "1. Actualizează variabilele de mediu în Render.com pentru serviciul Strapi"
    echo -e "2. Setează DATABASE_URL cu URL-ul PostgreSQL din Render"
    echo -e "3. Deploy serviciul Strapi în Render.com"
    echo -e "4. Verifică că API-ul funcționează: https://your-cms.onrender.com/api/scooters\n"
else
    echo -e "${RED}❌ Eroare la import!${NC}"
    exit 1
fi

