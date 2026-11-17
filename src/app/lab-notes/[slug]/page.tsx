// src/app/lab-notes/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import matter from 'gray-matter';
import { ArrowLeft } from 'lucide-react';
import { getContent, getContentSlugs, getRawContent } from '@/lib/content-loader';
import { compileMDX } from 'next-mdx-remote/rsc';
import { ShareButton } from '@/components/share-button';
import { getPageMetadata } from '@/lib/og';

export function generateStaticParams() {
  return getContentSlugs('lab-notes').map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return getPageMetadata('lab-notes', slug);
}

export default async function LabNotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = getContent('lab-notes').find((p) => p.slug === slug);
  if (!post) notFound();

  const rawContent = getRawContent('lab-notes', slug);
  if (!rawContent) notFound();

  const { content: body } = matter(rawContent);
  const { content } = await compileMDX({
    source: body,
    options: { parseFrontmatter: false },
  });

  // Lab notes use `excerpt` in frontmatter rather than `description`.
  const shareText = post.description ?? post.excerpt;

  return (
    <main className="min-h-screen bg-[#03040a] text-white font-sans selection:bg-cyan-400 selection:text-black">
      <div className="max-w-3xl mx-auto px-4 md:px-6 pt-32 pb-20">
        <Link
          href="/lab-notes"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12"
        >
          <ArrowLeft size={16} /> Back to Lab Notes
        </Link>

        <div className="mb-12 border-b border-white/10 pb-8">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            {post.title}
          </h1>
          <p className="text-gray-500 font-mono text-sm">{post.date}</p>
        </div>

        <div className="prose prose-invert prose-cyan max-w-none">
          {content}
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs font-mono uppercase tracking-wider text-gray-500">
            Share this lab note
          </p>
          <ShareButton title={post.title} text={shareText} />
        </div>
      </div>
    </main>
  );
}
