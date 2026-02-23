import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    publishedAt: z.coerce.date(),
    status: z.enum(['published', 'draft']),
    author: z.object({
      name: z.string(),
      picture: z.string().url().optional(),
    }),
    slug: z.string(),
    excerpt: z.string(),
  }),
});

export const collections = { posts };
