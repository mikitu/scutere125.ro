# Deployment Guide - Scutere125.ro

## 🏗️ Architecture

- **Frontend (Next.js)**: Deployed on Vercel
- **Backend (Strapi CMS)**: Deployed on Render
- **Database (PostgreSQL)**: Hosted on Render

---

## 📋 Environment Variables

### 1️⃣ Vercel (Next.js App)

Set these in Vercel Dashboard → Settings → Environment Variables:

```bash
NEXT_PUBLIC_STRAPI_API_URL=https://scutere125-ro.onrender.com
```

**Note**: The `NEXT_PUBLIC_` prefix makes this variable accessible in the browser.

---

### 2️⃣ Render Web Service (Strapi CMS)

Set these in Render Dashboard → Your Service → Environment:

```bash
# Node Environment
NODE_ENV=production
HOST=0.0.0.0
PORT=1337

# Database Configuration
DATABASE_CLIENT=postgres
DATABASE_HOST=dpg-d4slig4hg0os738921dg-a.frankfurt-postgres.render.com
DATABASE_PORT=5432
DATABASE_NAME=scutere125_ro
DATABASE_USERNAME=scutere125_ro_user
DATABASE_PASSWORD=5JGIvMYEXt4hxMi7UlZBxekgWgWFnPoL
DATABASE_SSL=true

# Strapi Security Keys (generated with crypto.randomBytes)
APP_KEYS=NJlpNOX/rBBwyH+eNc3+vtUeHZEiJ47/yBuJDg3+wm8=,mAfjwOasuf02Dujcfc6Rkl8DZNN2MKYYoaM5WJsLQ8w=
API_TOKEN_SALT=ve6nyIA7gy/fb28itCXd/y7DbVIv4S7vFt+8Pp7c6sE=
ADMIN_JWT_SECRET=Yt2/Ym/QpSFbtkWFXOiL9xY2pDUXylSy134ExCER4Pg=
TRANSFER_TOKEN_SALT=4hrXxOuMv/mjDkbm+6/BVmjA69De58ZE4MEN1dasYG0=
JWT_SECRET=XWV2ZvZ2MWxiUmKNTS3TUNvI3Jj5BNveHKOUGRiYjuU=
```

---

## 🚀 Deployment Steps

### Step 1: Deploy Strapi to Render

1. **Create Web Service** on Render
2. **Connect GitHub repository**: `mikitu/scutere125.ro`
3. **Configure Build Settings**:
   - **Root Directory**: `apps/cms`
   - **Build Command**: `pnpm install && pnpm build`
   - **Start Command**: `pnpm start`
4. **Add Environment Variables** (see above)
5. **Deploy**

### Step 2: Sync Database to Render

```bash
# Make sure .env.render exists with Render database credentials
./scripts/sync-db-to-render.sh
```

This will:
- Export local PostgreSQL database
- Import to Render PostgreSQL
- Verify data (scooters, colors, files, folders)

### Step 3: Deploy Next.js to Vercel

1. **Import Project** on Vercel
2. **Configure Project**:
   - **Framework Preset**: Next.js
   - **Root Directory**: `apps/web`
3. **Add Environment Variables**:
   - `NEXT_PUBLIC_STRAPI_API_URL=https://scutere125-ro.onrender.com`
4. **Deploy**

---

## 🔐 Security Notes

### Files NOT committed to Git:
- `.env.production` (Strapi production config)
- `.env.render` (Render database credentials)
- `.env.local` (Next.js local development)
- `tmp/` (database dumps)

### Files committed to Git:
- `.env.example` (Next.js template)
- `.env.production.example` (Strapi template)
- All source code

---

## 🛠️ Local Development

### 1. Start PostgreSQL
```bash
# Make sure PostgreSQL is running locally
psql -U mihaibucse -d scutere125 -c "SELECT version();"
```

### 2. Start Strapi CMS
```bash
cd apps/cms
pnpm dev
# Runs on http://localhost:1337
```

### 3. Start Next.js App
```bash
cd apps/web
pnpm dev
# Runs on http://localhost:3000
```

---

## 📊 Database Management

### Export Local Database
```bash
pg_dump -U mihaibucse -d scutere125 > backup.sql
```

### Sync to Render
```bash
./scripts/sync-db-to-render.sh
```

### Connect to Render Database
```bash
psql "postgresql://scutere125_ro_user:PASSWORD@dpg-d4slig4hg0os738921dg-a.frankfurt-postgres.render.com/scutere125_ro"
```

---

## 🔄 Update Workflow

1. **Make changes locally**
2. **Test locally** (Strapi + Next.js)
3. **Commit and push** to GitHub
4. **Sync database** to Render (if schema changed)
5. **Deploy automatically** (Vercel + Render watch `main` branch)

---

## 📝 Generating New Security Keys

If you need to regenerate Strapi security keys:

```bash
cd apps/cms
node -e "
const crypto = require('crypto');
const generateKey = () => crypto.randomBytes(32).toString('base64');
console.log('APP_KEYS=' + generateKey() + ',' + generateKey());
console.log('API_TOKEN_SALT=' + generateKey());
console.log('ADMIN_JWT_SECRET=' + generateKey());
console.log('TRANSFER_TOKEN_SALT=' + generateKey());
console.log('JWT_SECRET=' + generateKey());
"
```

Copy the output to your `.env.production` file and update Render environment variables.

