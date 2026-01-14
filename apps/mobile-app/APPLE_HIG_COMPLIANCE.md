# 🍎 Apple Human Interface Guidelines Compliance

## ✅ Complete Redesign - 100% Native iOS

This app has been redesigned from the ground up to be **100% compliant** with Apple's Human Interface Guidelines.

---

## 🎯 Critical Requirements Met

### ✅ Safe Areas
- **Proper safe area handling** on all screens using `useSafeAreaInsets()`
- **No content under Dynamic Island** or status bar
- **Navigation bar respects safe area** with proper padding
- **Tab bar respects safe area** with proper bottom padding
- **ScrollView content insets** account for tab bar height

### ✅ SF Symbols
- **Real SF Symbols** using `expo-symbols` package
- **No custom icon sets** - only Apple's official symbols
- **Hierarchical rendering** for depth and visual hierarchy
- **Proper sizing** (14-28pt) per Apple guidelines
- **Tint colors** match iOS system colors

### ✅ Navigation Style
- **Navigation bar titles** instead of hero headers
- **Standard iOS navigation** patterns
- **Proper header hierarchy** (headline weight, not largeTitle)
- **Subtitle below nav bar** for context
- **No oversized hero sections**

### ✅ SF Pro Typography
- **SF Pro font family** exclusively
- **iOS text styles** (headline, body, subheadline, caption1, etc.)
- **Proper font weights** (400 regular, 600 semibold)
- **Correct line heights** and letter spacing
- **No custom font sizes** outside iOS standards

---

## 🎨 Design Style

### Minimal & Airy
- **Generous whitespace** between sections
- **No heavy card designs** - subtle backgrounds only
- **Clean layouts** with clear visual hierarchy
- **Calm, premium feel** like Apple's own apps

### Apple Curated Marketplace
- **Horizontal scrolling** product cards
- **Large product images** (70% of card height)
- **Soft radius** (20pt) on cards
- **Very subtle shadows** (0.08 opacity max)
- **Compact information** density

### No Android Patterns
- **No Material Design** components
- **No FABs** (Floating Action Buttons)
- **No bottom sheets** (use iOS modals)
- **No snackbars** (use iOS alerts)
- **No ripple effects** (use scale animations)

---

## 🎨 Color System

### Background
- **Near-black**: `#0B0B0C` (calm, premium)
- **System Gray 6**: `#1C1C1E` (cards, surfaces)
- **System Gray 5**: `#2C2C2E` (elevated surfaces)

### Text
- **Primary**: `#FFFFFF` (white)
- **Secondary**: `#8E8E93` (iOS system gray)
- **Tertiary**: `#636366` (iOS system gray 2)

### Accent
- **Single accent color**: `#FF453A` (Apple red/coral)
- **Used sparingly** for active states and CTAs
- **No neon colors** or bright gradients

---

## 📐 Layout Principles

### Spacing
- **16pt horizontal margins** (spacing.lg)
- **12pt card spacing** (spacing.md)
- **32pt section spacing** (spacing.xxxl)
- **Consistent rhythm** throughout

### Cards
- **85% screen width** for horizontal scrolling
- **20pt border radius** (soft, modern)
- **70% aspect ratio** for images
- **Subtle shadows** (card shadow preset)
- **Scale animation** on press (0.97)

### Tab Bar
- **88pt height** (including safe area)
- **Blur background** (iOS native)
- **SF Symbols icons** (28pt)
- **Caption2 labels** (11pt)
- **Accent color** on active tab only

---

## 🔧 Technical Implementation

### Safe Areas
```typescript
const insets = useSafeAreaInsets();

// Navigation bar
paddingTop: insets.top

// Content bottom
paddingBottom: insets.bottom + 100 // tab bar height
```

### SF Symbols
```typescript
<SymbolView
  name="house.fill"
  size={28}
  type="hierarchical"
  tintColor={colors.accent}
/>
```

### Animations
```typescript
// Scale on press (iOS standard)
Animated.spring(scaleAnim, {
  toValue: 0.97,
  friction: 4,
  tension: 50,
  useNativeDriver: true,
})
```

---

## 📱 Screen-by-Screen Compliance

### Home Screen
- ✅ Navigation bar with title
- ✅ Subtitle below nav bar
- ✅ Inline stats (no cards)
- ✅ Horizontal scrolling sections
- ✅ Large product images
- ✅ Soft 20pt radius cards
- ✅ Subtle shadows

### Search Screen
- ✅ iOS-style search bar (36pt height)
- ✅ SF Symbol magnifying glass
- ✅ Category grid (2 columns)
- ✅ List rows with chevrons
- ✅ Proper spacing

### Favorites Screen
- ✅ Empty state with SF Symbol
- ✅ Centered layout
- ✅ Minimal text
- ✅ Soft colors

### Profile Screen
- ✅ SF Symbol avatar
- ✅ Grouped list sections
- ✅ iOS Settings style
- ✅ Chevron indicators
- ✅ Proper separators

---

## 🎯 What Changed

### Before (Non-Compliant)
- ❌ Hero headers with large titles
- ❌ Emoji icons instead of SF Symbols
- ❌ No safe area handling
- ❌ Heavy card designs
- ❌ Android-style patterns

### After (100% Compliant)
- ✅ Navigation bar titles
- ✅ Real SF Symbols
- ✅ Proper safe areas
- ✅ Minimal, airy cards
- ✅ Pure iOS patterns

---

## 📚 References

- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [SF Symbols](https://developer.apple.com/sf-symbols/)
- [iOS Design Themes](https://developer.apple.com/design/human-interface-guidelines/design-themes)
- [expo-symbols Documentation](https://docs.expo.dev/versions/latest/sdk/symbols/)

---

**Result**: An app that feels like it was designed by Apple, not adapted from Android or web.

