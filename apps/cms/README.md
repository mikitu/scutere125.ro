# Scutere125.ro CMS

Backend Strapi pentru gestionarea scuterelor.

## Setup

### 1. Baza de date PostgreSQL

Asigură-te că PostgreSQL rulează pe localhost:5432 și că există baza de date `scutere125`:

```bash
psql -U mihaibucse -d postgres -c "CREATE DATABASE scutere125;"
```

### 2. Instalare dependențe

```bash
pnpm install
```

### 3. Pornire Strapi

```bash
pnpm dev
```

Strapi va rula pe http://localhost:1337

### 4. Configurare Admin

La prima pornire, accesează http://localhost:1337/admin și creează un cont de administrator.

### 5. Configurare permisiuni API

Pentru ca Next.js să poată accesa datele, trebuie să configurezi permisiunile:

1. Mergi la **Settings** → **Users & Permissions Plugin** → **Roles** → **Public**
2. Expandează **Scooter**
3. Bifează: `find` și `findOne`
4. Salvează

### 6. (Opțional) Generare API Token

Pentru securitate suplimentară:

1. Mergi la **Settings** → **API Tokens**
2. Creează un nou token cu tip **Read-only**
3. Copiază token-ul și adaugă-l în `apps/web/.env.local`:
   ```
   STRAPI_API_TOKEN=your_token_here
   ```

## Content Type: Scooter

Schema pentru scutere include:

- **name**: Nume scuter (text)
- **slug**: URL-friendly identifier (UID)
- **tagline**: Slogan scurt (text)
- **description**: Descriere detaliată (text lung)
- **price**: Preț (decimal)
- **priceMax**: Preț maxim opțional (decimal)
- **listingImage**: Imagine pentru catalog (media)
- **image**: Imagine principală (media)
- **gallery**: Galerie imagini (media multiple)
- **engine**: Specificații motor (text)
- **power**: Putere (text)
- **consumption**: Consum (text)
- **weight**: Greutate (text)
- **seatHeight**: Înălțime șa (text)
- **storage**: Spațiu depozitare (text)
- **features**: Lista caracteristici (JSON)
- **category**: Categorie (enum: urban, sport, premium)
- **badge**: Badge opțional (text)

## API Endpoints

- `GET /api/scooters` - Lista toate scuterele
- `GET /api/scooters/:id` - Detalii scuter specific
- `GET /api/scooters?filters[slug][$eq]=slug-name` - Găsește scuter după slug

## Migrare date

Pentru a importa datele existente din `apps/web/src/data/scooters.ts`, folosește panoul admin Strapi și adaugă manual cele 3 scutere sau creează un script de import.

