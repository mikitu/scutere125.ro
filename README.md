# Scutere125.ro

**Pe drum, cu încredere** - Website pentru scutere 125cc conform legii B125 din România.

## Structură Monorepo

```
scutere125.ro/
├── apps/
│   ├── web/          # Next.js 16 frontend
│   └── cms/          # Strapi 4 backend
└── package.json
```

## Tech Stack

### Frontend (apps/web)
- **Next.js 16** cu React 19 și TypeScript
- **Tailwind CSS v4** pentru styling
- **Framer Motion** pentru animații
- **Server Components** și **App Router**

### Backend (apps/cms)
- **Strapi 4.25** CMS headless
- **PostgreSQL** bază de date
- **TypeScript**

## Quick Start

### Prerequisite

- Node.js 20+ sau 22+
- PostgreSQL 14+
- pnpm 9+

### 1. Instalare dependențe

```bash
pnpm install
```

### 2. Setup PostgreSQL

```bash
# Creează baza de date
psql -U mihaibucse -d postgres -c "CREATE DATABASE scutere125;"
```

### 3. Configurare CMS

```bash
cd apps/cms
cp .env.example .env
# Editează .env cu credențialele tale PostgreSQL
```

### 4. Pornire dezvoltare

```bash
# Din root, pornește ambele aplicații
pnpm dev

# SAU pornește individual:
pnpm dev:web    # Next.js pe http://localhost:3000
pnpm dev:cms    # Strapi pe http://localhost:1337
```

### 5. Configurare Strapi Admin

1. Accesează http://localhost:1337/admin
2. Creează cont administrator
3. Configurează permisiuni publice pentru API Scooter:
   - Settings → Users & Permissions → Roles → Public
   - Scooter: bifează `find` și `findOne`
   - Salvează

### 6. Adaugă scutere în CMS

Accesează Content Manager în Strapi și adaugă scuterele tale.

## Dezvoltare

### Comenzi disponibile

```bash
# Dezvoltare
pnpm dev              # Pornește toate aplicațiile
pnpm dev:web          # Doar Next.js
pnpm dev:cms          # Doar Strapi

# Build
pnpm build            # Build toate aplicațiile
pnpm build:web        # Doar Next.js

# Lint
pnpm lint             # Lint toate aplicațiile

# Clean
pnpm clean            # Șterge node_modules
```

## Deployment

### Frontend (Next.js)

Poate fi deploiat pe:
- Vercel (recomandat)
- Netlify
- Orice platformă care suportă Next.js

### Backend (Strapi)

Poate fi deploiat pe:
- Railway
- Heroku
- DigitalOcean
- AWS/GCP/Azure

**Important**: Asigură-te că setezi variabilele de mediu corecte pentru producție.

## Variabile de mediu

### apps/web/.env.local

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=optional_token_for_security
```

### apps/cms/.env

```env
HOST=0.0.0.0
PORT=1337
APP_KEYS=your_app_keys
API_TOKEN_SALT=your_salt
ADMIN_JWT_SECRET=your_secret
TRANSFER_TOKEN_SALT=your_salt
JWT_SECRET=your_secret
DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=scutere125
DATABASE_USERNAME=your_username
DATABASE_PASSWORD=your_password
DATABASE_SSL=false
```

## Licență

UNLICENSED - Proprietate privată

