// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Trocar `site` pelo dominio definitivo quando for configurado no Netlify
export default defineConfig({
  site: 'https://nextaieng.com',
  integrations: [sitemap({ filter: (page) => !page.includes('/obrigado') })],
});
