import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    category: z.string(),
    tag: z.string(),
    date: z.date(),
    readTime: z.string(),
    excerpt: z.string(),
    series: z.string().optional(),
    seriesPart: z.number().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    order: z.number().optional(),
    name: z.string(),
    description: z.string(),
    status: z.enum(['Active', 'In Progress', 'Idea Stage']),
    tech: z.string(),
    url: z.string().url().optional(),
  }),
});

export const collections = { posts, projects };
