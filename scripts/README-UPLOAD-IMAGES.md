# 📸 Upload Images to Render Strapi

## 🎯 Obiectiv

Acest script uploadează toate imaginile de scutere de pe local în Strapi de pe Render.

---

## 📋 Pași

### **1. Obține API Token din Strapi Admin**

1. **Mergi la Strapi Admin pe Render:**
   - https://scutere125-ro.onrender.com/admin

2. **Login** cu credențialele tale

3. **Creează API Token:**
   - Click **Settings** (jos stânga)
   - Click **API Tokens** (în sidebar)
   - Click **Create new API Token**
   - **Name:** `Image Upload Script`
   - **Description:** `Token for uploading images from local to Render`
   - **Token duration:** `Unlimited` (sau `90 days`)
   - **Token type:** `Full access`
   - Click **Save**

4. **Copiază token-ul** (apare o singură dată!)
   - Format: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0`

---

### **2. Rulează scriptul de upload**

```bash
# Setează token-ul ca environment variable
export STRAPI_API_TOKEN="your_token_here"

# Rulează scriptul
node scripts/upload-all-images-to-render.js
```

**Sau într-o singură comandă:**

```bash
STRAPI_API_TOKEN="your_token_here" node scripts/upload-all-images-to-render.js
```

---

### **3. Verifică upload-ul**

După ce scriptul se termină:

1. **Mergi la Strapi Admin:**
   - https://scutere125-ro.onrender.com/admin

2. **Click Media Library** (în sidebar)

3. **Verifică că toate imaginile sunt acolo**

---

## 🔧 Opțiuni Alternative

### **Opțiunea 2: Sync Database complet**

Dacă vrei să copiezi **toată baza de date** (scutere + imagini + culori) de la local la Render:

```bash
# Setează credențialele Render în .env.render
node scripts/sync-to-render.js
```

⚠️ **ATENȚIE:** Acest script va **șterge toate datele** din Render și le va înlocui cu cele de pe local!

---

## 📊 Ce face scriptul?

1. ✅ Scanează toate folderele din `apps/web/public/images/scooters/`
2. ✅ Găsește toate imaginile (`.jpg`, `.png`, `.jpeg`)
3. ✅ Uploadează fiecare imagine în Strapi Media Library
4. ✅ Afișează progres în timp real
5. ✅ Raportează câte imagini au fost uploadate cu succes

---

## 🐛 Troubleshooting

### **Eroare: "STRAPI_API_TOKEN environment variable is required"**

→ Nu ai setat token-ul. Urmează pașii de mai sus pentru a obține și seta token-ul.

### **Eroare: "Failed to upload ... 401 Unauthorized"**

→ Token-ul e invalid sau a expirat. Creează un token nou.

### **Eroare: "Failed to upload ... 413 Payload Too Large"**

→ Imaginea e prea mare. Strapi are un limit de 200MB per upload.

---

## ✅ Success!

După ce scriptul se termină cu succes, toate imaginile vor fi în Strapi Media Library pe Render! 🎉

