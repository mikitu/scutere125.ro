# 🚀 Deployment Guide - Render.com

Ghid complet pentru deployment Scutere125.ro pe Render.com.

## 📋 Cerințe

- Cont Render.com (gratuit sau plătit)
- Git repository cu codul (GitHub, GitLab, etc.)
- Baza de date locală pregătită cu toate datele

## 🗄️ Pasul 1: Export Bază de Date Locală

### 1.1 Rulează scriptul de export

```bash
cd apps/cms
./scripts/export-db.sh
```

Acest script va:
- ✅ Exporta întreaga bază de date PostgreSQL
- ✅ Comprima fișierul SQL (`.gz`)
- ✅ Salva în `apps/cms/exports/scutere125_TIMESTAMP.sql.gz`

### 1.2 Verifică fișierul exportat

```bash
ls -lh exports/
```

Ar trebui să vezi un fișier de tipul: `scutere125_20251209_120000.sql.gz`

## 🐘 Pasul 2: Creează Serviciu PostgreSQL în Render

### 2.1 Creează serviciul

1. Intră în [Render Dashboard](https://dashboard.render.com/)
2. Click pe **"New +"** → **"PostgreSQL"**
3. Configurare:
   - **Name**: `scutere125-db`
   - **Database**: `scutere125`
   - **User**: `scutere125_user` (auto-generat)
   - **Region**: `Frankfurt (EU Central)` (recomandat pentru România)
   - **Plan**: `Free` (pentru început) sau `Starter` ($7/lună)

4. Click **"Create Database"**

### 2.2 Obține URL-ul de conexiune

După creare, vei vedea:
- **Internal Database URL**: `postgresql://user:pass@host:5432/dbname`
- **External Database URL**: Similar, dar cu host extern

**⚠️ IMPORTANT**: Copiază **Internal Database URL** - îl vei folosi pentru import și pentru Strapi.

## 📥 Pasul 3: Import Date în Render PostgreSQL

### 3.1 Rulează scriptul de import

```bash
cd apps/cms
./scripts/import-db.sh "postgresql://user:pass@host:5432/dbname" ./exports/scutere125_TIMESTAMP.sql.gz
```

**Înlocuiește**:
- `postgresql://user:pass@host:5432/dbname` cu **Internal Database URL** din Render
- `scutere125_TIMESTAMP.sql.gz` cu numele fișierului tău exportat

### 3.2 Verifică importul

Scriptul va afișa:
- ✅ Număr total de scutere importate
- ✅ Număr total de fișiere media importate

## 📦 Pasul 4: Deploy Strapi CMS în Render

### 4.1 Creează serviciul Strapi

1. În Render Dashboard: **"New +"** → **"Web Service"**
2. Conectează repository-ul Git
3. Configurare:
   - **Name**: `scutere125-cms`
   - **Region**: `Frankfurt (EU Central)`
   - **Branch**: `main`
   - **Root Directory**: `apps/cms`
   - **Runtime**: `Node`
   - **Build Command**: `pnpm install && pnpm build`
   - **Start Command**: `pnpm start`
   - **Plan**: `Free` sau `Starter` ($7/lună)

### 4.2 Configurează Environment Variables

Adaugă următoarele variabile de mediu:

```bash
# Database
DATABASE_CLIENT=postgres
DATABASE_HOST=<host-from-internal-url>
DATABASE_PORT=5432
DATABASE_NAME=scutere125
DATABASE_USERNAME=<user-from-internal-url>
DATABASE_PASSWORD=<password-from-internal-url>
DATABASE_SSL=true

# Sau simplu (recomandat):
DATABASE_URL=<Internal-Database-URL>

# Strapi
HOST=0.0.0.0
PORT=10000
APP_KEYS=<generat-random-64-chars>
API_TOKEN_SALT=<generat-random-32-chars>
ADMIN_JWT_SECRET=<generat-random-32-chars>
TRANSFER_TOKEN_SALT=<generat-random-32-chars>
JWT_SECRET=<generat-random-32-chars>

# Node
NODE_ENV=production
```

**Generare secrete**:
```bash
# Rulează local pentru a genera secrete
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### 4.3 Deploy

Click **"Create Web Service"** - Render va:
1. ✅ Clona repository-ul
2. ✅ Instala dependențele
3. ✅ Builda aplicația
4. ✅ Porni serviciul

URL-ul va fi: `https://scutere125-cms.onrender.com`

## 🌐 Pasul 5: Deploy Next.js Frontend în Render

### 5.1 Creează serviciul Next.js

1. În Render Dashboard: **"New +"** → **"Web Service"**
2. Conectează același repository
3. Configurare:
   - **Name**: `scutere125-web`
   - **Region**: `Frankfurt (EU Central)`
   - **Branch**: `main`
   - **Root Directory**: `apps/web`
   - **Runtime**: `Node`
   - **Build Command**: `pnpm install && pnpm build`
   - **Start Command**: `pnpm start`
   - **Plan**: `Free` sau `Starter`

### 5.2 Configurează Environment Variables

```bash
# Strapi API
NEXT_PUBLIC_STRAPI_URL=https://scutere125-cms.onrender.com
STRAPI_API_URL=https://scutere125-cms.onrender.com

# Node
NODE_ENV=production
```

### 5.3 Deploy

Click **"Create Web Service"**

URL-ul va fi: `https://scutere125-web.onrender.com`

## 📤 Pasul 6: Upload Imagini în Strapi

### 6.1 Copiază imaginile

Imaginile trebuie să fie accesibile în Strapi. Opțiuni:

**Opțiunea A: Upload manual în Strapi Admin**
1. Intră în `https://scutere125-cms.onrender.com/admin`
2. Login cu credențialele tale
3. Media Library → Upload fișierele din `apps/cms/public/uploads/`

**Opțiunea B: Folosește Cloudinary/S3** (recomandat pentru producție)
- Configurează Strapi să folosească Cloudinary sau AWS S3
- Instalează plugin-ul: `@strapi/provider-upload-cloudinary`

## ✅ Pasul 7: Verificare Finală

### 7.1 Testează API-ul Strapi

```bash
curl https://scutere125-cms.onrender.com/api/scooters
```

Ar trebui să returneze lista de scutere.

### 7.2 Testează Frontend

Deschide în browser: `https://scutere125-web.onrender.com`

Verifică:
- ✅ Homepage se încarcă
- ✅ Lista de scutere apare
- ✅ Imaginile se afișează
- ✅ Pagina de detalii funcționează
- ✅ Pagina de contact funcționează

## 🔧 Troubleshooting

### Problema: Strapi nu pornește

**Soluție**: Verifică logs în Render Dashboard
- Asigură-te că toate variabilele de mediu sunt setate corect
- Verifică că DATABASE_URL este corect

### Problema: Imagini lipsă

**Soluție**: 
- Upload manual în Media Library
- Sau configurează Cloudinary/S3

### Problema: Build failed

**Soluție**:
- Verifică că `pnpm` este instalat (adaugă în `package.json`: `"packageManager": "pnpm@8.x"`)
- Verifică logs pentru erori specifice

## 📊 Costuri Estimate

### Plan Gratuit (Free)
- PostgreSQL: Gratuit (1GB storage, 1GB RAM)
- Strapi CMS: Gratuit (512MB RAM, sleep după 15 min inactivitate)
- Next.js: Gratuit (512MB RAM, sleep după 15 min inactivitate)
- **Total: €0/lună** ⚠️ Cu limitări (sleep mode)

### Plan Starter (Recomandat)
- PostgreSQL: $7/lună (10GB storage, 1GB RAM)
- Strapi CMS: $7/lună (512MB RAM, always on)
- Next.js: $7/lună (512MB RAM, always on)
- **Total: €21/lună** ✅ Fără sleep mode

## 🎯 Next Steps

După deployment:
1. ✅ Configurează domeniu custom (scutere125.ro)
2. ✅ Activează SSL (automat în Render)
3. ✅ Configurează backup automat pentru PostgreSQL
4. ✅ Monitorizează performanța în Render Dashboard
5. ✅ Configurează alerting pentru downtime

---

**🎉 Gata! Aplicația ta este live pe Render.com!**

