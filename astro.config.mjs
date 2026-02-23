// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import solidJs from '@astrojs/solid-js';
import sitemap from '@astrojs/sitemap';
import remarkGfm from 'remark-gfm';
import rehypeCallouts from 'rehype-callouts';

// https://astro.build/config
export default defineConfig({
  site: 'https://atakanzen.com',
  output: 'static',
  integrations: [mdx(), solidJs(), sitemap()],
  markdown: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [[rehypeCallouts, { theme: 'github' }]],
    shikiConfig: {
      theme: 'dracula',
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});