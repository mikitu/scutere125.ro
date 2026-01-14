# 🎨 iOS Design Guidelines

## Visual Identity

### Color Palette

```
Background:     #0B0B0C  (near-black, calm)
Surface:        #1C1C1E  (system gray 6)
Elevated:       #2C2C2E  (system gray 5)

Accent:         #FF453A  (Apple red/coral)
Secondary:      #0A84FF  (iOS blue)

Text Primary:   #FFFFFF  (white)
Text Secondary: #8E8E93  (system gray)
Text Tertiary:  #636366  (system gray 2)
```

### Typography Scale

```
Large Title:  34pt / Semibold  (Screen titles)
Title 1:      28pt / Semibold  (Section headers)
Title 2:      22pt / Semibold  (Card titles)
Title 3:      20pt / Semibold  (Subsections)

Headline:     17pt / Semibold  (Emphasized body)
Body:         17pt / Regular   (Main content)
Callout:      16pt / Regular   (Secondary content)
Subheadline:  15pt / Regular   (Metadata)
Footnote:     13pt / Regular   (Captions)
Caption 1:    12pt / Regular   (Small labels)
Caption 2:    11pt / Regular   (Tiny text)
```

## Layout Principles

### Spacing System
```
xs:   4px   (tight spacing)
sm:   8px   (compact)
md:   12px  (comfortable)
lg:   16px  (standard)
xl:   20px  (generous)
xxl:  24px  (section spacing)
xxxl: 32px  (major sections)
```

### Border Radius
```
sm:   10px  (buttons, inputs)
md:   14px  (small cards)
lg:   18px  (medium cards)
xl:   22px  (large cards)
card: 16px  (standard card)
```

## Component Patterns

### Cards
- **Width:** 75% of screen width
- **Aspect Ratio:** 3:2 for images
- **Shadow:** Subtle, iOS-style
- **Padding:** 16px internal
- **Spacing:** 16px between cards

### Horizontal Scrolling
- **Snap to interval:** Card width + spacing
- **Deceleration:** Fast (iOS-native feel)
- **Padding:** 20px left/right
- **Show indicators:** No

### Tab Bar
- **Height:** 88px (with safe area)
- **Background:** Blur effect (iOS)
- **Active color:** Accent red
- **Inactive color:** System gray
- **Icon size:** 26px

### Search Bar
- **Height:** 36px
- **Background:** System gray 5
- **Border radius:** 10px
- **Icon:** 18px search symbol
- **Padding:** 12px horizontal

## Interaction Design

### Animations
```typescript
// Card press
scale: 1.0 → 0.96
duration: 150ms
easing: spring

// Fade in
opacity: 0 → 1
duration: 600ms
easing: ease-out

// Slide in
translateY: 30 → 0
duration: 500ms
easing: ease-out
```

### Touch Feedback
- **Active opacity:** 0.6
- **Scale on press:** 0.96
- **Haptic:** Light impact (iOS)
- **Transition:** Spring animation

## Screen Layouts

### Home Screen
1. Large title header
2. Inline stats (no cards)
3. Horizontal scrolling sections
4. Generous whitespace
5. No footer clutter

### Search Screen
1. iOS-style search bar
2. Category grid (2 columns)
3. Brand list (full width)
4. Chevron indicators

### Favorites Screen
1. Empty state with icon
2. Centered content
3. Minimal text
4. Soft colors

### Profile Screen
1. Centered avatar
2. Grouped menu sections
3. Separated by spacing
4. Chevron navigation

## Do's and Don'ts

### ✅ Do
- Use iOS system colors
- Keep layouts airy and minimal
- Use subtle shadows
- Implement smooth animations
- Follow iOS HIG patterns
- Use SF Symbols aesthetic

### ❌ Don't
- Use neon/bright colors
- Create heavy card designs
- Add unnecessary borders
- Use Android Material patterns
- Overcrowd the interface
- Use bold/heavy typography everywhere

## Accessibility

- Minimum touch target: 44x44pt
- Text contrast: WCAG AA minimum
- Dynamic type support
- VoiceOver labels
- Reduce motion support

---

**Reference:** Apple Human Interface Guidelines

