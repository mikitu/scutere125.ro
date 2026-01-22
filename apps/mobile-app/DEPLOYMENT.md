# Deployment Guide - Scutere125 Mobile App

Ghid complet pentru publicarea aplicației pe App Store (TestFlight) și Google Play Store.

## Pregătire Inițială

### 1. Instalează EAS CLI (Expo Application Services)

```bash
npm install -g eas-cli
```

### 2. Login în Expo

```bash
eas login
```

Dacă nu ai cont Expo, creează unul pe [expo.dev](https://expo.dev)

### 3. Configurează proiectul pentru EAS Build

```bash
cd apps/mobile-app
eas build:configure
```

Acest command va crea fișierul `eas.json` cu configurații pentru build-uri.

## iOS - App Store & TestFlight

### Cerințe

1. **Apple Developer Account** ($99/an)
   - Înregistrează-te pe [developer.apple.com](https://developer.apple.com)
   - Team ID-ul tău: `FH7KW33Z99` (deja configurat în app.json)

2. **App Store Connect**
   - Mergi pe [appstoreconnect.apple.com](https://appstoreconnect.apple.com)
   - Creează o nouă aplicație:
     - Bundle ID: `ro.scutere125.app`
     - Name: `Scutere125`
     - Primary Language: Romanian
     - SKU: `scutere125-app`

### Pași pentru iOS Build

#### 1. Creează build pentru TestFlight

```bash
eas build --platform ios --profile preview
```

Sau pentru production:

```bash
eas build --platform ios --profile production
```

#### 2. Upload automat pe TestFlight

EAS va uploada automat build-ul pe App Store Connect dacă ai configurat corect credențialele.

#### 3. Configurează TestFlight

1. Mergi în App Store Connect → TestFlight
2. Adaugă informații despre build
3. Adaugă testeri interni/externi
4. Distribuie build-ul

#### 4. Submit pentru App Store Review

1. În App Store Connect, mergi la "App Store" tab
2. Creează o nouă versiune (1.0.0)
3. Completează toate informațiile cerute:
   - Screenshots (iPhone 6.7", 6.5", 5.5")
   - App Description
   - Keywords
   - Support URL
   - Privacy Policy URL
4. Submit for Review

### Screenshots iOS (Cerințe)

Trebuie să faci screenshots pentru:
- iPhone 6.7" (iPhone 14 Pro Max, 15 Pro Max)
- iPhone 6.5" (iPhone 11 Pro Max, XS Max)
- iPhone 5.5" (iPhone 8 Plus)

Poți folosi simulatoarele iOS pentru a face screenshots.

## Android - Google Play Store

### Cerințe

1. **Google Play Console Account** ($25 one-time fee)
   - Înregistrează-te pe [play.google.com/console](https://play.google.com/console)

2. **Creează aplicația în Google Play Console**
   - Package name: `ro.scutere125.app`
   - App name: `Scutere125`

### Pași pentru Android Build

#### 1. Creează build pentru Internal Testing

```bash
eas build --platform android --profile preview
```

Sau pentru production:

```bash
eas build --platform android --profile production
```

#### 2. Upload pe Google Play Console

Opțiune 1 - Manual:
1. Download `.aab` file din Expo dashboard
2. Upload în Google Play Console → Internal Testing

Opțiune 2 - Automat cu EAS Submit:
```bash
eas submit --platform android
```

#### 3. Configurează Store Listing

În Google Play Console:
1. **Store Listing**
   - App name: Scutere125
   - Short description (80 chars)
   - Full description (4000 chars)
   - App icon (512x512 PNG)
   - Feature graphic (1024x500)
   - Screenshots (min 2, max 8)

2. **Content Rating**
   - Completează chestionarul

3. **Target Audience**
   - Selectează vârsta țintă

4. **Privacy Policy**
   - Adaugă URL-ul privacy policy

#### 4. Create Release

1. Mergi la "Internal Testing" sau "Production"
2. Create new release
3. Upload AAB file
4. Add release notes
5. Review and rollout

### Screenshots Android (Cerințe)

Trebuie să faci screenshots pentru:
- Phone (min 2 screenshots)
- 7-inch tablet (optional)
- 10-inch tablet (optional)

Dimensiuni recomandate: 1080x1920 sau 1080x2340

## Configurare EAS (eas.json)

Fișierul `eas.json` ar trebui să arate așa:

```json
{
  "cli": {
    "version": ">= 5.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "ios": {
        "simulator": false
      }
    },
    "production": {
      "autoIncrement": true
    }
  },
  "submit": {
    "production": {
      "ios": {
        "appleId": "your-apple-id@email.com",
        "ascAppId": "your-app-store-connect-app-id",
        "appleTeamId": "FH7KW33Z99"
      },
      "android": {
        "serviceAccountKeyPath": "./google-service-account.json",
        "track": "internal"
      }
    }
  }
}
```

## Checklist Înainte de Submit

### Ambele Platforme
- [ ] Privacy Policy URL (obligatoriu)
- [ ] Support URL/Email
- [ ] App Description (română + engleză)
- [ ] Keywords pentru search
- [ ] Screenshots de calitate
- [ ] App Icon (1024x1024)
- [ ] Testare completă pe device-uri reale

### iOS Specific
- [ ] Apple Developer Account activ
- [ ] Bundle ID creat în Apple Developer Portal
- [ ] App creată în App Store Connect
- [ ] Screenshots pentru toate dimensiunile cerute
- [ ] Export Compliance (dacă folosești encryption)

### Android Specific
- [ ] Google Play Console Account
- [ ] Content Rating completat
- [ ] Target Audience selectat
- [ ] Feature Graphic (1024x500)
- [ ] Privacy Policy URL

## Comenzi Utile

### Build pentru ambele platforme
```bash
eas build --platform all --profile production
```

### Verifică status build
```bash
eas build:list
```

### Submit pentru ambele platforme
```bash
eas submit --platform all
```

### Update OTA (Over-The-Air) - fără rebuild
```bash
eas update --branch production --message "Bug fixes"
```

## Costuri

- **Apple Developer**: $99/an
- **Google Play**: $25 (one-time)
- **EAS Build**: Free tier (limited builds) sau $29/lună pentru unlimited

## Resurse

- [Expo EAS Documentation](https://docs.expo.dev/eas/)
- [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- [Google Play Policy](https://play.google.com/about/developer-content-policy/)

