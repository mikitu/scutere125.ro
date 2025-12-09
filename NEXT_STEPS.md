# Următorii Pași - Configurare Strapi Backend

## ✅ Ce am făcut

1. **Configurat Strapi CMS** în `apps/cms/`
   - Instalat Strapi 4.25.23
   - Configurat PostgreSQL ca bază de date
   - Creat structura de directoare și fișiere de configurare

2. **Creat Content Type pentru Scooters**
   - Schema completă cu toate câmpurile necesare
   - Suport pentru imagini (listingImage, image, gallery)
   - Specificații tehnice (engine, power, consumption, etc.)
   - Categorii și badge-uri

3. **Configurat API Client în Next.js**
   - Funcții pentru a prelua date din Strapi (`apps/web/src/lib/strapi.ts`)
   - Adapter pentru a converti datele Strapi în formatul aplicației (`apps/web/src/lib/scooter-adapter.ts`)
   - Funcții async în `apps/web/src/data/scooters.ts` cu fallback la date statice

4. **Documentație**
   - README principal cu instrucțiuni complete
   - README pentru CMS cu detalii despre configurare
   - Variabile de mediu configurate

## 🚀 Următorii Pași

### 1. Configurare Strapi Admin (IMPORTANT!)

Strapi rulează pe http://localhost:1337 (verifică terminal ID 17).

**Acțiuni necesare:**

a) **Configurare permisiuni API** (OBLIGATORIU pentru ca Next.js să funcționeze):
   1. Accesează http://localhost:1337/admin
   2. Mergi la **Settings** (⚙️) → **Users & Permissions Plugin** → **Roles**
   3. Click pe **Public**
   4. Expandează secțiunea **Scooter**
   5. Bifează: ✅ `find` și ✅ `findOne`
   6. Click **Save**

b) **Adaugă scuterele în CMS**:
   1. Mergi la **Content Manager** → **Scooter**
   2. Click **Create new entry**
   3. Completează datele pentru fiecare scuter:
      - **Honda SH Mode 125**
      - **Honda PCX 125**
      - **Honda Forza 125**
   
   Datele le găsești în `apps/web/src/data/scooters.ts` (liniile 25-126)

### 2. Actualizare componente Next.js

Componentele trebuie actualizate pentru a folosi funcțiile async:

**Fișiere de modificat:**

- `apps/web/src/app/scutere-125/page.tsx` - folosește `fetchScooters()` în loc de `scooters`
- `apps/web/src/app/scutere-125/[slug]/page.tsx` - folosește `fetchScooterBySlug(slug)` în loc de `getScooterBySlug(slug)`
- `apps/web/src/components/sections/hero.tsx` - dacă afișează scutere
- `apps/web/src/components/sections/scooter-catalog.tsx` - folosește `fetchScooters()`

**Exemplu de modificare:**

```typescript
// Înainte (static)
import { scooters } from '@/data/scooters';

export default function Page() {
  return <div>{scooters.map(...)}</div>;
}

// După (dinamic cu Strapi)
import { fetchScooters } from '@/data/scooters';

export default async function Page() {
  const scooters = await fetchScooters();
  return <div>{scooters.map(...)}</div>;
}
```

### 3. Upload imagini în Strapi

Pentru fiecare scuter, trebuie să uploadezi imaginile:
- Descarcă imaginile din URL-urile existente
- Uploadează-le în Strapi Media Library
- Asociază-le cu scuterele respective

### 4. Testare

```bash
# Pornește ambele servere
pnpm dev

# Verifică:
# - Strapi: http://localhost:1337/admin
# - API: http://localhost:1337/api/scooters?populate=*
# - Next.js: http://localhost:3000
```

### 5. (Opțional) Generare API Token

Pentru securitate suplimentară în producție:

1. În Strapi Admin: **Settings** → **API Tokens** → **Create new API Token**
2. Nume: "Next.js Frontend"
3. Token type: **Read-only**
4. Token duration: **Unlimited**
5. Copiază token-ul generat
6. Adaugă în `apps/web/.env.local`:
   ```
   STRAPI_API_TOKEN=your_generated_token_here
   ```

## 📝 Note Importante

- **Fallback**: Dacă Strapi nu e disponibil, aplicația va folosi datele statice din `scooters.ts`
- **Revalidare**: Datele se revalidează la fiecare 60 secunde (configurabil în `strapi.ts`)
- **PostgreSQL**: Asigură-te că PostgreSQL rulează înainte de a porni Strapi
- **Port-uri**: 
  - Next.js: 3000
  - Strapi: 1337
  - PostgreSQL: 5432

## 🐛 Troubleshooting

**Strapi nu pornește:**
- Verifică că PostgreSQL rulează: `psql -U mihaibucse -l`
- Verifică că baza de date există: `psql -U mihaibucse -d scutere125 -c "\dt"`

**Next.js nu primește date:**
- Verifică permisiunile API în Strapi (Pasul 1a)
- Verifică că Strapi rulează pe port 1337
- Verifică console-ul browser pentru erori

**Imagini nu se afișează:**
- Verifică că imaginile sunt uploadate în Strapi
- Verifică că `populate=*` e în query-ul API
- Verifică URL-urile în `getStrapiMediaUrl()`

## 🎯 Rezultat Final

După finalizarea acestor pași, vei avea:
- ✅ Backend Strapi complet funcțional
- ✅ Bază de date PostgreSQL cu scutere
- ✅ Next.js conectat la Strapi
- ✅ Posibilitatea de a adăuga/edita scutere din admin panel
- ✅ Sistem scalabil pentru produse noi

