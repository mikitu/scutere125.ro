# Configurare Resend pentru Email-uri

## ⚠️ Pași Obligatorii pentru Trimitere Email-uri

### 1. Verificare Domeniu în Resend

Pentru a putea trimite email-uri de la `contact@scutere125.ro`, trebuie să verifici domeniul în Resend:

1. **Accesează Resend Dashboard:**
   - Mergi la: https://resend.com/domains
   - Login cu contul tău

2. **Adaugă Domeniul:**
   - Click pe "Add Domain"
   - Introdu: `scutere125.ro`
   - Click "Add"

3. **Configurează DNS Records:**
   Resend îți va da 3 DNS records pe care trebuie să le adaugi la domeniul tău:
   
   **SPF Record (TXT):**
   ```
   Name: @
   Type: TXT
   Value: v=spf1 include:_spf.resend.com ~all
   ```

   **DKIM Record (TXT):**
   ```
   Name: resend._domainkey
   Type: TXT
   Value: [valoarea dată de Resend]
   ```

   **DMARC Record (TXT):**
   ```
   Name: _dmarc
   Type: TXT
   Value: v=DMARC1; p=none
   ```

4. **Verifică Domeniul:**
   - După ce ai adăugat DNS records, așteaptă 5-10 minute
   - Click pe "Verify" în Resend dashboard
   - Când domeniul e verificat, vei vedea un checkmark verde ✅

### 2. Testare Email-uri (Opțional - Fără Domeniu Verificat)

Dacă vrei să testezi email-urile **ÎNAINTE** de verificarea domeniului, poți folosi adresa de test a Resend:

**Modifică temporar în API routes:**

```typescript
// În apps/web/src/app/api/contact/route.ts
// și apps/web/src/app/api/request-quote/route.ts

await resend.emails.send({
  from: 'onboarding@resend.dev', // ← Adresă de test Resend
  to: ['contact@scutere125.ro'], // sau email-ul tău personal
  // ... rest of config
});
```

⚠️ **Notă:** Cu `onboarding@resend.dev` poți trimite doar către adrese verificate în Resend (adaugă-ți email-ul personal în Resend → Settings → Verified Emails).

### 3. Verificare Funcționalitate

După ce ai configurat domeniul (sau ai folosit adresa de test):

1. **Testează Contact Form:**
   - Mergi la: http://localhost:3000/contact
   - Completează formularul
   - Verifică email-ul la `contact@scutere125.ro`

2. **Testează Request Quote Modal:**
   - Click pe "Solicită Ofertă" din orice pagină
   - Completează formularul
   - Verifică email-ul la `contact@scutere125.ro`

3. **Verifică în Strapi:**
   - Mergi la: http://localhost:1337/admin
   - Content Manager → Contact Messages / Quote Requests
   - Verifică că `emailSent` = `true` și `emailSentAt` are timestamp

### 4. Monitorizare Email-uri

**Resend Dashboard:**
- https://resend.com/emails
- Vezi toate email-urile trimise
- Status: delivered, bounced, complained
- Click pe fiecare email pentru detalii

**Strapi Admin:**
- http://localhost:1337/admin
- Content Manager → Contact Messages
- Content Manager → Quote Requests
- Vezi toate mesajele + status email

## 🚀 Production Setup

Pentru production (Vercel), adaugă variabilele de mediu:

```bash
RESEND_API_KEY=re_97U61vu5_EkmnNyMDxeCpRJUVkS3v3uzZ
RECAPTCHA_SECRET_KEY=6LfNbCgsAAAAAM3XMY26J4CeXvRDtREuua3rBISA
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6LfNbCgsAAAAAC6JzLIcFRsjKLwp7iyccxi-ZiFC
NEXT_PUBLIC_STRAPI_URL=https://scutere125-ro.onrender.com
```

## 📧 Template Email-uri

Email-urile sunt formatate cu HTML și includ:

**Contact Form Email:**
- Detalii contact (nume, email, telefon)
- Mesajul complet
- Informații tehnice (IP, User Agent, timestamp)

**Quote Request Email:**
- Detalii contact (nume, email, telefon)
- Scuter de interes (dacă a selectat)
- Mesaj (ce îl interesează)
- Call-to-action pentru răspuns rapid
- Informații tehnice

## ❓ Troubleshooting

**Email-urile nu se trimit:**
1. Verifică că domeniul e verificat în Resend
2. Verifică că `RESEND_API_KEY` e corect în `.env.local`
3. Verifică logs în terminal Next.js
4. Verifică Resend dashboard pentru erori

**reCAPTCHA nu funcționează:**
1. Verifică că `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` e corect
2. Verifică că `RECAPTCHA_SECRET_KEY` e corect
3. Verifică că domeniul e adăugat în Google reCAPTCHA admin

**Mesajele nu apar în Strapi:**
1. Verifică că Strapi rulează pe http://localhost:1337
2. Verifică că content types sunt create (Contact Messages, Quote Requests)
3. Verifică logs în terminal Strapi

