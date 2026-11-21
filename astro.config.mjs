import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://kurashi-museum.eigokb.workers.dev',
  integrations: [mdx()],
});
