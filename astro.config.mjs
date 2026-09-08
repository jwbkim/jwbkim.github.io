import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';

const env = loadEnv(process.env.NODE_ENV || 'production', process.cwd(), '');
const configuredBase = process.env.BASE_PATH || env.BASE_PATH || '/';
const base = `/${configuredBase.split('/').filter(Boolean).join('/')}${configuredBase.split('/').filter(Boolean).length ? '/' : ''}`;

export default defineConfig({
  site: process.env.SITE_URL || env.SITE_URL || undefined,
  base,
  trailingSlash: 'always',
  output: 'static',
  devToolbar: { enabled: false },
});
