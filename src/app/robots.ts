import type { MetadataRoute } from 'next';

export const dynamic = 'force-static'; // ← ADD THIS LINE

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://rakibuilds.github.io';
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}