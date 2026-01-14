# 📱 Scutere125 Mobile App

iOS-first React Native app built with Expo.

## 🎨 Design Philosophy

**iOS-Native Premium Experience:**
- Apple App Store / Apple Maps aesthetic
- Minimal, airy, calm design
- SF Pro typography
- iOS system colors
- Smooth animations & haptic feedback
- Glass morphism & blur effects

## 🚀 Quick Start

```bash
# Install dependencies
yarn install

# Start Expo dev server
yarn start

# Run on iOS simulator
yarn ios

# Run on Android emulator
yarn android
```

## 📂 Project Structure

```
src/
├── app/                    # Expo Router pages
│   ├── _layout.tsx        # Root layout
│   └── (tabs)/            # Tab navigation
│       ├── _layout.tsx    # Tab bar layout
│       ├── index.tsx      # Home screen
│       ├── search.tsx     # Search screen
│       ├── favorites.tsx  # Favorites screen
│       └── profile.tsx    # Profile screen
├── components/            # Reusable components
│   └── ScooterLogo.tsx   # SVG logo
└── constants/            # Design system
    └── theme.ts          # Colors, typography, spacing
```

## 🎨 Design System

### Colors
- Background: `#0B0B0C` (near-black)
- Accent: `#FF453A` (Apple red)
- Secondary: `#0A84FF` (iOS blue)
- Text: iOS system grays

### Typography
- SF Pro font family
- iOS text styles (largeTitle, title1, body, etc.)
- Regular & Semibold weights only

### Components
- Horizontal scrolling cards
- Blur tab bar
- Smooth animations
- iOS-style search bar
- Native-feeling interactions

## 🔮 Upcoming Features

### Must-Have for Monetization
- ❤️ Favorites with persistence
- 🔔 Push notifications for deals
- 📊 Compare models side-by-side
- 📍 "View in store" affiliate links
- 💸 Deals & offers section

## 🛠️ Tech Stack

- **Framework:** React Native + Expo
- **Navigation:** Expo Router (file-based)
- **Language:** TypeScript
- **UI:** iOS-native components
- **Animations:** React Native Animated API
- **Icons:** SF Symbols (emoji placeholders)

## 📱 Platform Support

- iOS 13.0+
- Android 6.0+ (with iOS-inspired design)

## 🎯 Development

Run from VSCode with F5:
- **Expo: Start** - Dev server
- **Expo: Run iOS Simulator**
- **Expo: Run Android Emulator**

---

Made with ❤️ for scooter enthusiasts

