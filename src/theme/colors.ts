/**
 * Design System Colors
 * Extracted and calibrated directly from Figma specifications.
 */

export const colors = {
  // Brand Backgrounds
  background: '#F7F5EE',        // Warm ivory / cream primary screen background
  backgroundSubtle: '#F0EEE5',  // Slightly darker cream for press states
  surfaceWhite: '#FFFFFF',      // Pure white cards, input boxes, secondary buttons
  sageContainer: '#E8EFE6',     // Soft sage container (hero backdrop, callout cards)
  iconContainerBg: '#DCE6DD',   // Muted sage icon container for lists
  
  // Primary Forest Green
  primary: '#075E50',           // Deep emerald / forest green for primary CTA buttons
  primaryHover: '#054B40',      // Darker emerald for pressed state
  primaryDark: '#123D38',       // Deep evergreen for bold titles and headings
  primaryTint: '#E8F3EE',       // Very light emerald tint
  
  // Lime / Chartreuse Accent
  accentLime: '#D8F36A',        // Vivid chartreuse lime (badges, pill tags, icon circles)
  accentLimeDark: '#B8D642',    // Slightly darker lime for borders/pressed
  accentLimeLight: '#EEF9BC',   // Soft lime background
  
  // Neutral & Typography Colors
  textPrimary: '#123D38',       // Main dark forest text for headings & labels
  textDark: '#123D38',          // Alias for primary dark text
  textSecondary: '#596E64',     // Muted sage-grey for subheadings & body copy
  textMuted: '#8A9A90',         // Subtle captions, placeholders, legal text
  textInverse: '#FFFFFF',       // White text on dark buttons
  
  // Borders & Dividers
  borderLight: '#E0E5DF',       // Subtle input and card outline
  borderSubtle: '#ECEFEA',      // List divider lines
  borderFocus: '#075E50',       // Active input focus outline
  
  // Semantic & Social
  socialFacebook: '#1877F2',    // Official Facebook blue
  socialGoogle: '#EA4335',      // Google brand red
  socialApple: '#000000',       // Apple black
  
  // States & Accents
  success: '#107C41',
  error: '#D32F2F',
  brandRed: '#CC0000',          // Store brand red (Longo's, Home Hardware)
  dealChipBg: '#FFF0F0',        // Light pink/red background for flyer deal chips
  textMutedDark: '#697773',     // Darker muted text for search placeholder & metadata
  tabBarBg: 'rgba(241, 241, 241, 0.94)', // Translucent floating dock background
} as const;

export type ColorToken = keyof typeof colors;
