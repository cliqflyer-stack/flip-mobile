# Design System & Codebase Integration Rules (Figma MCP)

This document serves as the authoritative guide for integrating Figma designs into the **flip** mobile codebase using the Model Context Protocol (MCP) and agentic workflows.

Refer also to:
- `@AGENTS.md` (Expo SDK 58, React Native, and mobile-first standards)

---

## 1. Token Definitions

### Locations
Design tokens are organized inside [`src/theme/`](file:///Users/deepsoni/flip/src/theme/):
- **Colors**: [`src/theme/colors.ts`](file:///Users/deepsoni/flip/src/theme/colors.ts)
- **Typography**: [`src/theme/typography.ts`](file:///Users/deepsoni/flip/src/theme/typography.ts)
- **Spacing**: [`src/theme/spacing.ts`](file:///Users/deepsoni/flip/src/theme/spacing.ts)
- **Border Radii**: [`src/theme/radii.ts`](file:///Users/deepsoni/flip/src/theme/radii.ts)
- **Barrel Export**: [`src/theme/index.ts`](file:///Users/deepsoni/flip/src/theme/index.ts)

### Token Format & Types
Tokens are defined as immutable `as const` TypeScript records with corresponding token key union types:

```typescript
// colors.ts
export const colors = {
  // Brand Backgrounds
  background: '#F7F5EE',        // Warm ivory / cream primary screen background
  backgroundSubtle: '#F0EEE5',  // Slightly darker cream for press states
  surfaceWhite: '#FFFFFF',      // Pure white cards, input boxes, secondary buttons
  sageContainer: '#E8EFE6',     // Soft sage container (hero backdrop, callout cards)
  iconContainerBg: '#DCE6DD',   // Muted sage icon container for lists
  
  // Primary Forest Green & Accents
  primary: '#075E50',           // Deep emerald / forest green for primary CTA buttons
  primaryHover: '#054B40',      // Darker emerald for pressed state
  primaryDark: '#123D38',       // Deep evergreen for bold titles and headings
  primaryTint: '#E8F3EE',       // Very light emerald tint
  accentLime: '#D8F36A',        // Vivid chartreuse lime (badges, pill tags, icon circles)
  accentLimeDark: '#B8D642',    // Slightly darker lime for borders/pressed
  accentLimeLight: '#EEF9BC',   // Soft lime background
  
  // Neutral & Typography Colors
  textPrimary: '#123D38',       // Main dark forest text for headings & labels
  textSecondary: '#596E64',     // Muted sage-grey for subheadings & body copy
  textMuted: '#8A9A90',         // Subtle captions, placeholders, legal text
  textMutedDark: '#697773',     // Darker muted text for search placeholder & metadata
  textInverse: '#FFFFFF',       // White text on dark buttons
  
  // Borders & Chips
  borderLight: '#E0E5DF',       // Subtle input and card outline
  borderSubtle: '#ECEFEA',      // List divider lines
  borderFocus: '#075E50',       // Active input focus outline
  dealChipBg: '#FFF0F0',        // Light pink/red background for flyer deal chips
  brandRed: '#CC0000',          // Store brand red (Longo's, Home Hardware)
  tabBarBg: 'rgba(241, 241, 241, 0.94)', // Translucent floating dock background
} as const;

export type ColorToken = keyof typeof colors;
```

```typescript
// spacing.ts
export const spacing = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
} as const;

// radii.ts
export const radii = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  full: 9999, // Pill shapes
} as const;
```

### Token Transformation System
- Values extracted from Figma styles and node inspection are mapped directly into typed constants.
- Hardcoded hexadecimal colors and numeric pixel values in UI components are forbidden; always import and use tokens from `src/theme`.

---

## 2. Component Library

### Location
All reusable UI components live in [`src/components/ui/`](file:///Users/deepsoni/flip/src/components/ui/) and are exported via [`src/components/ui/index.ts`](file:///Users/deepsoni/flip/src/components/ui/index.ts).

### Component Architecture
Components are structured as typed functional components (`React.FC<Props>`) with:
1. **Explicit TypeScript Interface**: Props defining visual variants, callbacks, and optional overrides.
2. **Accessible Touch Targets**: Wrapping interactive elements with `TouchableOpacity` (or `Pressable`), `activeOpacity={0.7}`, and descriptive `accessibilityLabel`.
3. **Compound/Composed Components**:
   - [`AppHeader`](file:///Users/deepsoni/flip/src/components/ui/AppHeader.tsx): Multi-mode navigation header (Branded flip row, Back button, Notifications bell, More options, Centered title).
   - [`Button`](file:///Users/deepsoni/flip/src/components/ui/Button.tsx): Variants (`primary`, `secondary`, `social`, `outline`, `text`, `iconOnly`).
   - [`Input`](file:///Users/deepsoni/flip/src/components/ui/Input.tsx): Form inputs with floating labels, icons, error messages, and password toggles.
   - [`Badge`](file:///Users/deepsoni/flip/src/components/ui/Badge.tsx): Chips, squircles, and hero stickers (`Chip`, `IconBadge`, `HeroSticker`).
   - [`CalloutCard`](file:///Users/deepsoni/flip/src/components/ui/CalloutCard.tsx): Information callouts and feature hints.
   - [`CityItem`](file:///Users/deepsoni/flip/src/components/ui/CityItem.tsx): Location selector card with radio states.
   - [`ScreenWrapper`](file:///Users/deepsoni/flip/src/components/ui/ScreenWrapper.tsx): Safe area and keyboard avoidance wrapper.
   - [`ScreenSwitcher`](file:///Users/deepsoni/flip/src/components/ui/ScreenSwitcher.tsx): Floating screen tester and debugger.
   - [`FlyerCard`](file:///Users/deepsoni/flip/src/components/ui/FlyerCard.tsx): Store flyer cards with logos, badges, high-res preview images, deal chips, and favorite heart toggles.
   - [`DealTicket`](file:///Users/deepsoni/flip/src/components/ui/DealTicket.tsx): Perforated deal cards with left/right ticket cutouts, product images, store distance, and plus-circle actions.
   - [`FloatingTabBar`](file:///Users/deepsoni/flip/src/components/ui/FloatingTabBar.tsx): Translucent bottom dock navigation bar (`Explore`, `List`, `History`, `Account`).

---

## 3. Frameworks & Libraries

- **Core Framework**: React 19.3.0, React Native 0.88.0.
- **Platform Runtime**: Expo SDK 58 (`expo: ~58.0.19`).
- **Safe Area**: `react-native-safe-area-context` (`~5.10.1`).
- **Icons**: `@expo/vector-icons` (`^15.0.2`).
- **Status Bar**: `expo-status-bar` (`~58.0.4`).
- **Web Support**: `react-native-web` (`^0.21.4`).
- **Bundler & Build Tool**: Metro via Expo CLI.
- **Language**: TypeScript (`~6.0.3`) in strict mode.

---

## 4. Asset Management

### Storage & Organization
- Global and static brand assets are placed under [`assets/`](file:///Users/deepsoni/flip/assets/):
  - App icons & splash screens: `assets/icon.png`, `assets/splash-icon.png`
  - High-res photography: `assets/images/hero_grocery.jpg`
  - Screen-specific assets: `assets/images/explore/`
    - `drug_mart_flyer.png`
    - `longos_flyer.png`
    - `hardware_flyer.png`
    - `pepsi.png`
    - `coke.png`

### MCP Asset Workflow
1. When Figma MCP `get_design_context` returns temporary asset URLs (`https://www.figma.com/api/mcp/asset/...`), **never** leave these temporary URLs in production code (they expire after 7 days).
2. Download assets directly to `assets/images/<feature>/` via `curl -L`.
3. Reference assets using static `require()` imports:
   ```typescript
   source={require('../../assets/images/explore/drug_mart_flyer.png')}
   ```
4. Always set appropriate `resizeMode` (`cover` for flyers/photos, `contain` for cutout product imagery).

---

## 5. Icon System

### Icon Library
The application standardizes on `@expo/vector-icons`, primarily utilizing:
- `Feather`: Clean geometric line icons (`search`, `map`, `bell`, `heart`, `plus-circle`, `check-circle`, `info`, `compass`, `user`, `arrow-left`, `chevron-down`).
- `Ionicons`: Filled & brand icons (`sparkles`, `bookmark-outline`, social icons).
- `MaterialCommunityIcons`: Specialized utility icons (`format-list-checks`, `history`).

### Icon Sizing Guidelines
| Context | Icon Size | Color Token |
| :--- | :--- | :--- |
| Inline captions / info | 12px – 14px | `colors.textMutedDark` |
| Form search / quick actions | 18px – 20px | `colors.primaryDark` / `colors.textMutedDark` |
| Floating dock tabs | 20px | `colors.primary` (active) / `colors.textMutedDark` |
| Primary buttons & action badges | 22px – 24px | `colors.textInverse` / `colors.primaryDark` |
| Standalone badge icons | 48px badge, 22px icon | `colors.primaryDark` on `colors.accentLime` |

---

## 6. Styling Approach

### Methodology
- React Native's `StyleSheet.create({ ... })` is used throughout the codebase for optimal native performance and cross-platform reliability.
- **No Tailwind runtime** is used; all Figma CSS/Tailwind hints are converted into typed React Native styles.
- Layouts rely on flexbox primitives: `flexDirection: 'row'`, `gap`, `paddingHorizontal`, `justifyContent: 'space-between'`.
- Interactive states use `activeOpacity` and component state rather than CSS pseudo-classes.

### Responsive Design
- Layouts are designed to adapt fluidly across mobile device widths (375px to 430px+) using flex containers and percentage/auto widths.
- Floating elements (like `FloatingTabBar`) use auto-centering with max-width constraints:
  ```typescript
  width: 320,
  maxWidth: '90%',
  alignSelf: 'center',
  ```
- Screens wrap content with `ScreenWrapper` to handle safe area insets on notches, Dynamic Island, and Android navigation bars.

---

## 7. Project Structure

```
flip/
├── assets/                       # Static media, icons, and photography
│   └── images/
│       ├── explore/              # Explore screen flyer & product assets
│       └── hero_grocery.jpg      # Welcome screen hero image
├── src/
│   ├── theme/                    # Design tokens (colors, typography, spacing, radii)
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   ├── spacing.ts
│   │   ├── radii.ts
│   │   └── index.ts
│   ├── components/
│   │   └── ui/                   # Reusable UI component library
│   │       ├── AppHeader.tsx
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       ├── Badge.tsx
│   │       ├── CalloutCard.tsx
│   │       ├── CityItem.tsx
│   │       ├── FlyerCard.tsx
│   │       ├── DealTicket.tsx
│   │       ├── FloatingTabBar.tsx
│   │       ├── ScreenWrapper.tsx
│   │       ├── ScreenSwitcher.tsx
│   │       └── index.ts
│   └── screens/                  # App screens
│       ├── WelcomeScreen.tsx
│       ├── NeighborhoodScreen.tsx
│       ├── CreateAccountScreen.tsx
│       ├── SignInOptionsScreen.tsx
│       ├── EmailSignInScreen.tsx
│       ├── ForgotPasswordScreen.tsx
│       ├── ExploreScreen.tsx     # Figma Home · Explore implementation
│       └── index.ts
├── App.tsx                       # Main app root & state navigator
├── package.json
└── tsconfig.json
```

### Navigation Pattern
Screen navigation is state-driven in `App.tsx` (`currentScreen: ScreenId`):
- Successful login from `EmailSignInScreen` redirects the user directly to `'explore'`.
- Social logins and new account creation also route to `'explore'`.
- The user can navigate back to location settings or switch screens via the interactive `ScreenSwitcher` component.
