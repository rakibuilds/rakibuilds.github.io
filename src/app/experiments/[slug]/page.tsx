import { notFound } from 'next/navigation';
import Link from 'next/link';
import matter from 'gray-matter';
import { ArrowLeft, ExternalLink, BookOpen, Code2 } from 'lucide-react';
import { getContent, getContentSlugs, getRawContent } from '@/lib/content-loader';
import { compileMDX } from 'next-mdx-remote/rsc';

export function generateStaticParams() {
  return getContentSlugs('experiments').map((slug) => ({ slug }));
}

export default async function ExperimentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getContent('experiments').find((p) => p.slug === slug);
  const rawContent = getRawContent('experiments', slug);

  if (!project || !rawContent) notFound();

  const { content: body } = matter(rawContent);
  const { content } = await compileMDX({
    source: body,
    options: { parseFrontmatter: false },
  });

  return (
    <main className="min-h-screen bg-[#03040a] text-white font-sans selection:bg-cyan-400 selection:text-black">
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-cyan-600/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-3xl mx-auto px-4 md:px-6 pt-32 pb-20">
        <Link
          href="/experiments"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12"
        >
          <ArrowLeft size={16} /> Back to Experiments
        </Link>

        <div className="mb-12 border-b border-white/10 pb-12">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            {project.title}
          </h1>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags?.map((tag: string) => (
              <span
                key={tag}
                className="text-xs font-mono text-cyan-400 uppercase tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="text-lg md:text-xl text-gray-400 leading-relaxed mb-8">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-400 text-black font-bold hover:bg-cyan-300 transition-colors"
              >
                View Live <ExternalLink size={16} />
              </a>
            )}
            {project.docUrl && (
              <a
                href={project.docUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 font-medium hover:bg-white/20 transition-colors"
              >
                Read Docs <BookOpen size={16} />
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 font-medium hover:bg-white/20 transition-colors"
              >
                GitHub Repo <Code2 size={16} />
              </a>
            )}
          </div>
        </div>

        <div className="prose prose-invert prose-cyan max-w-none">
          {content}
        </div>
      </div>
    </main>
  );
}