// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

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
  // Responsive images: generates srcset/sizes + width/height for <Image> and
  // relative Markdown images automatically. (public/ images are never optimized.)
  image: {
    layout: 'constrained',
  },
  // Self-hosted fonts via the local provider. Files live in src/assets/fonts/.
  // Astro emits @font-face, preload links, and optimized fallback metrics.
  experimental: {
    fonts: [
      {
        provider: fontProviders.local(),
        name: 'Jersey 20',
        cssVariable: '--font-jersey',
        options: {
          variants: [
            { weight: 400, style: 'normal', src: ['./src/assets/fonts/jersey-20-400.woff2'] },
          ],
        },
      },
      {
        provider: fontProviders.local(),
        name: 'JetBrains Mono',
        cssVariable: '--font-jetbrains',
        options: {
          variants: [
            { weight: 300, style: 'normal', src: ['./src/assets/fonts/jetbrains-mono-300.woff2'] },
            { weight: 400, style: 'normal', src: ['./src/assets/fonts/jetbrains-mono-400.woff2'] },
            { weight: 500, style: 'normal', src: ['./src/assets/fonts/jetbrains-mono-500.woff2'] },
            { weight: 600, style: 'normal', src: ['./src/assets/fonts/jetbrains-mono-600.woff2'] },
          ],
        },
      },
      {
        provider: fontProviders.local(),
        name: 'Nudica',
        cssVariable: '--font-nudica',
        options: {
          variants: [
            { weight: 500, style: 'normal', src: ['./src/assets/fonts/nudica-medium.woff2'] },
          ],
        },
      },
    ],
  },
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