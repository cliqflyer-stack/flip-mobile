/**
 * Global Environment Configuration for Flip Mobile App
 *
 * Points directly to the deployed Flip REST API on Render.
 * Can be overridden for local development using EXPO_PUBLIC_API_URL in .env.
 */
const PROD_API_URL = 'https://flip-api-kdfp.onrender.com';

export const ENV = {
  API_BASE_URL: process.env.EXPO_PUBLIC_API_URL || PROD_API_URL,
};
