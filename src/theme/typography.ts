import { TextStyle } from 'react-native';
import { colors } from './colors';

export const typography = {
  // Brand Header
  logo: {
    fontSize: 24,
    fontWeight: '800' as TextStyle['fontWeight'],
    color: colors.primaryDark,
    letterSpacing: -0.5,
  },
  logoSub: {
    fontSize: 9,
    fontWeight: '700' as TextStyle['fontWeight'],
    color: colors.textSecondary,
    letterSpacing: 1.5,
    textTransform: 'uppercase' as TextStyle['textTransform'],
  },

  // Headings
  display: {
    fontSize: 28,
    fontWeight: '800' as TextStyle['fontWeight'],
    lineHeight: 34,
    color: colors.primaryDark,
    letterSpacing: -0.3,
  },
  h1: {
    fontSize: 24,
    fontWeight: '700' as TextStyle['fontWeight'],
    lineHeight: 30,
    color: colors.primaryDark,
    letterSpacing: -0.2,
  },
  h2: {
    fontSize: 20,
    fontWeight: '700' as TextStyle['fontWeight'],
    lineHeight: 26,
    color: colors.primaryDark,
  },
  h3: {
    fontSize: 16,
    fontWeight: '600' as TextStyle['fontWeight'],
    lineHeight: 22,
    color: colors.primaryDark,
  },

  // Body Copy
  bodyLarge: {
    fontSize: 15,
    fontWeight: '400' as TextStyle['fontWeight'],
    lineHeight: 22,
    color: colors.textSecondary,
  },
  bodyRegular: {
    fontSize: 14,
    fontWeight: '400' as TextStyle['fontWeight'],
    lineHeight: 20,
    color: colors.textSecondary,
  },
  bodySmall: {
    fontSize: 13,
    fontWeight: '400' as TextStyle['fontWeight'],
    lineHeight: 18,
    color: colors.textSecondary,
  },

  // Interactive & Form
  buttonText: {
    fontSize: 15,
    fontWeight: '600' as TextStyle['fontWeight'],
    letterSpacing: 0.1,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600' as TextStyle['fontWeight'],
    color: colors.textPrimary,
    marginBottom: 6,
  },
  inputPlaceholder: {
    fontSize: 14,
    color: colors.textMuted,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600' as TextStyle['fontWeight'],
    color: colors.primaryDark,
  },

  // Footers & Disclaimers
  caption: {
    fontSize: 11,
    lineHeight: 16,
    color: colors.textMuted,
  },
  link: {
    fontSize: 13,
    fontWeight: '600' as TextStyle['fontWeight'],
    color: colors.primary,
  },
} as const;
