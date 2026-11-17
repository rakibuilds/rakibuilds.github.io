import { listSlugs, renderOgImage } from '@/lib/og';

export const dynamic = 'force-static';
export const alt = 'Project preview';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return listSlugs('projects').map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return renderOgImage('projects', slug);
}