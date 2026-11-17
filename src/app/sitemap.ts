// src/app/sitemap.ts
import type { MetadataRoute } from 'next';
import { getContent } from '@/lib/content-loader';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://rakibuilds.github.io';

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/experiments`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/lab-notes`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/projects`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
  ];

  const experiments = getContent('experiments').map((e) => ({
    url: `${baseUrl}/experiments/${e.slug}`,
    lastModified: e.date ? new Date(e.date) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const labNotes = getContent('lab-notes').map((n) => ({
    url: `${baseUrl}/lab-notes/${n.slug}`,
    lastModified: n.date ? new Date(n.date) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const projects = getContent('projects').map((p) => ({
    url: `${baseUrl}/projects/${p.slug}`,
    lastModified: p.date ? new Date(p.date) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...experiments, ...labNotes, ...projects];
}