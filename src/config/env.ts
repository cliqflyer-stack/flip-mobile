import { Platform } from 'react-native';

/**
 * Global Environment Configuration for Flip Mobile App
 *
 * For local testing:
 * - Android emulator: uses 10.0.2.2 to access host machine
 * - iOS simulator / Web: uses localhost (127.0.0.1)
 * - Physical device or production: configure EXPO_PUBLIC_API_URL in .env
 */
const DEFAULT_HOST = Platform.select({
  android: 'http://10.0.2.2:3001',
  ios: 'http://localhost:3001',
  web: 'http://localhost:3001',
  default: 'http://localhost:3001',
});

export const ENV = {
  API_BASE_URL: process.env.EXPO_PUBLIC_API_URL || DEFAULT_HOST,
};
