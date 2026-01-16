# 📋 TODO List - Scutere125.ro

## ✅ Completat

### Mobile App
- [x] Setup React Query + Cache Offline
- [x] Implementare AsyncStorage pentru persistență
- [x] Hooks pentru queries (useScooters, useFavorites)
- [x] Căutare textuală locală în ecranul Search
- [x] Integrare React Query în toate ecranele
- [x] Sistem de favorite cu persistență locală
- [x] Pull-to-refresh în toate ecranele
- [x] Offline-first architecture

### Web App
- [x] Setup Next.js 15 + Tailwind CSS
- [x] Integrare Strapi CMS
- [x] Homepage cu hero section
- [x] Catalog scutere cu filtrare
- [x] Pagină detalii scooter
- [x] Pagină FAQ
- [x] Responsive design

---

## 🚀 În Lucru

### Mobile App
- [ ] Testing & Bug fixes
- [ ] Optimizare performanță

### Web App
- [ ] SEO optimization
- [ ] Performance improvements

---

## 📱 Mobile App - Prioritate Înaltă

### Features Core
- [ ] **Filtre Avansate**
  - [ ] Filtrare după preț (min-max slider)
  - [ ] Filtrare după capacitate cilindree
  - [ ] Filtrare după an fabricație
  - [ ] Sortare (preț crescător/descrescător, popularitate, alfabetic)
  - [ ] Combinare multiple filtre
  - [ ] Reset filtre

- [ ] **Istoric & Recente**
  - [ ] Scutere vizualizate recent (AsyncStorage)
  - [ ] Istoric căutări
  - [ ] Clear history
  - [ ] Limită 20 scutere recente

- [ ] **Share & Deep Links**
  - [ ] Share scooter pe WhatsApp, Facebook, Instagram
  - [ ] Copy link to clipboard
  - [ ] Deep links pentru scutere (scutere125://scooter/slug)
  - [ ] QR code generator pentru scutere
  - [ ] Universal links (iOS)

### UI/UX Improvements
- [ ] **Dark Mode Complet**
  - [ ] Toggle dark/light mode în settings
  - [ ] Persistență preferință theme
  - [ ] Smooth transition între teme
  - [ ] Culori optimizate pentru dark mode

- [ ] **Loading States**
  - [ ] Skeleton loaders în loc de spinner
  - [ ] Shimmer effect pentru imagini
  - [ ] Progressive image loading
  - [ ] Placeholder images optimizate

- [ ] **Animații**
  - [ ] Smooth transitions între ecrane
  - [ ] Micro-interactions (haptic feedback)
  - [ ] Parallax effects în detalii scooter
  - [ ] Animated tabs

### Performance
- [ ] **Optimizări Imagini**
  - [ ] Image caching cu react-native-fast-image
  - [ ] Lazy loading imagini
  - [ ] WebP support
  - [ ] Thumbnail previews

- [ ] **Code Splitting**
  - [ ] Lazy load ecrane
  - [ ] Reduce bundle size
  - [ ] Optimize dependencies

---

## 📱 Mobile App - Prioritate Medie

### Features
- [ ] **Comparare Scutere**
  - [ ] Selectare 2-3 scutere pentru comparare
  - [ ] Tabel comparativ specificații
  - [ ] Highlight diferențe
  - [ ] Share comparație

- [ ] **Notificări Push**
  - [ ] Setup Expo Notifications
  - [ ] Notificări pentru scutere noi
  - [ ] Notificări pentru reduceri de preț
  - [ ] Notificări personalizate bazate pe favorite
  - [ ] Settings pentru notificări

- [ ] **Analytics & Tracking**
  - [ ] Track vizualizări scutere
  - [ ] Track favorite
  - [ ] Track căutări populare
  - [ ] Track share events
  - [ ] Firebase Analytics / Mixpanel

### User Experience
- [ ] **Onboarding**
  - [ ] Tutorial la prima deschidere
  - [ ] Swipeable intro screens
  - [ ] Skip option
  - [ ] Persistență (nu mai arăta)

- [ ] **Settings Screen**
  - [ ] Preferințe utilizator
  - [ ] Notificări on/off
  - [ ] Dark mode toggle
  - [ ] Clear cache
  - [ ] About app
  - [ ] Privacy policy
  - [ ] Terms of service

---

## 🌐 Web App - Prioritate Înaltă

### SEO & Performance
- [ ] **SEO Optimization**
  - [ ] Meta tags dinamice pentru fiecare scooter
  - [ ] Open Graph tags pentru social sharing
  - [ ] Twitter Card tags
  - [ ] Sitemap.xml generator
  - [ ] Robots.txt
  - [ ] Schema.org markup (Product, BreadcrumbList)
  - [ ] Canonical URLs

- [ ] **Performance**
  - [ ] Image optimization (next/image)
  - [ ] Code splitting
  - [ ] Lazy loading components
  - [ ] Prefetch links
  - [ ] Service Worker pentru offline
  - [ ] Lighthouse score 90+

### Features
- [ ] **Search Avansată**
  - [ ] Autocomplete în search bar
  - [ ] Sugestii de căutare
  - [ ] Search history
  - [ ] Filtre multiple (preț, categorie, brand)
  - [ ] Sortare rezultate

- [ ] **Newsletter & Contact**
  - [ ] Formular contact cu validare
  - [ ] Newsletter signup (Mailchimp/SendGrid)
  - [ ] Email notifications pentru scutere noi
  - [ ] Confirmare email

---

## 🌐 Web App - Prioritate Medie

### Features
- [ ] **Blog/Articole**
  - [ ] Content type în Strapi pentru articole
  - [ ] Pagină blog cu listă articole
  - [ ] Pagină detalii articol
  - [ ] Categorii articole
  - [ ] Related articles

- [ ] **Comparare Scutere**
  - [ ] Selectare scutere pentru comparare
  - [ ] Tabel comparativ
  - [ ] Export PDF comparație

- [ ] **User Reviews**
  - [ ] Sistem de review-uri
  - [ ] Rating 1-5 stele
  - [ ] Comentarii utilizatori
  - [ ] Moderare reviews (admin)

---

## 🎨 Design & Branding

- [ ] **Logo & Branding**
  - [ ] Design logo profesional
  - [ ] Color palette finalizată
  - [ ] Typography system
  - [ ] Icon set consistent

- [ ] **Assets**
  - [ ] App icon (iOS & Android)
  - [ ] Splash screen
  - [ ] Favicon pentru web
  - [ ] Social media images

---

## 🔧 DevOps & Infrastructure

- [ ] **CI/CD**
  - [ ] GitHub Actions pentru mobile build
  - [ ] Automated testing
  - [ ] Automated deployment web app
  - [ ] Preview deployments pentru PR-uri

- [ ] **Monitoring**
  - [ ] Error tracking (Sentry)
  - [ ] Performance monitoring
  - [ ] Uptime monitoring
  - [ ] Analytics dashboard

- [ ] **Backup & Security**
  - [ ] Automated Strapi backups
  - [ ] Database backups
  - [ ] SSL certificates
  - [ ] Security headers

---

## 📝 Documentație

- [ ] **Developer Docs**
  - [ ] Setup guide
  - [ ] Architecture overview
  - [ ] API documentation
  - [ ] Contributing guidelines

- [ ] **User Docs**
  - [ ] User guide pentru mobile app
  - [ ] FAQ extins
  - [ ] Video tutorials

---

## 🚀 Launch Checklist

### Pre-Launch
- [ ] Testing complet (iOS & Android)
- [ ] Bug fixes critice
- [ ] Performance optimization
- [ ] SEO optimization
- [ ] Analytics setup
- [ ] Privacy policy & Terms
- [ ] App Store assets (screenshots, description)
- [ ] Google Play assets

### Launch
- [ ] Submit la App Store
- [ ] Submit la Google Play
- [ ] Deploy web app la producție
- [ ] DNS configuration
- [ ] Social media announcement
- [ ] Press release

### Post-Launch
- [ ] Monitor analytics
- [ ] Monitor errors
- [ ] Collect user feedback
- [ ] Iterate based on feedback
- [ ] Marketing campaigns

---

## 💡 Idei Viitoare

- [ ] Sistem de wishlist/favorite sincronizat cu cont
- [ ] User accounts & authentication
- [ ] Salvare configurații scooter personalizate
- [ ] Calculator rate/finanțare
- [ ] Integrare cu dealeri (contact direct)
- [ ] Harta dealeri
- [ ] Test ride booking
- [ ] AR view pentru scutere (iOS ARKit)
- [ ] Gamification (badges, achievements)
- [ ] Referral program

---

**Ultima actualizare:** 2026-01-16

