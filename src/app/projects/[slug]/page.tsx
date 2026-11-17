// src/app/projects/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import { ArrowLeft, ExternalLink, Code2, Star, Code, Calendar } from 'lucide-react';
import { getContent, getContentSlugs, getRawContent } from '@/lib/content-loader';
import { getRepo, getReadme, fixReadmeImages } from '@/lib/github';
import { ShareButton } from '@/components/share-button';
import { getPageMetadata } from '@/lib/og';

export function generateStaticParams() {
  return getContentSlugs('projects').map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return getPageMetadata('projects', slug);
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const project = getContent('projects').find((p) => p.slug === slug);
  if (!project) notFound();

  const raw = getRawContent('projects', slug);
  if (!raw) notFound();

  const repoName = project.repoName;
  const repo = repoName ? await getRepo(repoName) : null;
  const readmeData = repoName ? await getReadme(repoName) : null;

  let readme = readmeData?.markdown ?? null;
  if (readme && repoName && readmeData) {
    readme = fixReadmeImages(readme, repoName, readmeData.branch);
  }

  const { content: mdxBody } = matter(raw);

  // The README wins when there is one; the local MDX body is the fallback.
  const body = readme ?? mdxBody;

  return (
    <main className="min-h-screen bg-[#03040a] text-white font-sans selection:bg-emerald-400 selection:text-black">
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-emerald-600/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-3xl mx-auto px-4 md:px-6 pt-32 pb-20">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12"
        >
          <ArrowLeft size={16} /> Back to Projects
        </Link>

        <div className="mb-12 border-b border-white/10 pb-12">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            {project.title}
          </h1>

          {repo && (
            <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-6">
              {repo.language && (
                <span className="inline-flex items-center gap-1.5">
                  <Code size={14} /> {repo.language}
                </span>
              )}
              {repo.stars > 0 && (
                <span className="inline-flex items-center gap-1.5">
                  <Star size={14} /> {repo.stars} stars
                </span>
              )}
              <span className="inline-flex items-center gap-1.5">
                <Calendar size={14} /> Updated{' '}
                {new Date(repo.updatedAt).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </span>
            </div>
          )}

          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="text-xs font-mono text-emerald-400 uppercase tracking-wider"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <p className="text-lg md:text-xl text-gray-400 leading-relaxed mb-8">
            {project.description}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-400 text-black font-bold hover:bg-emerald-300 transition-colors"
              >
                View Live <ExternalLink size={16} />
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

        <div className="prose prose-invert max-w-none">
          {body ? (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw, rehypeSanitize]}
            >
              {body}
            </ReactMarkdown>
          ) : (
            <p className="text-gray-500">No content available.</p>
          )}
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs font-mono uppercase tracking-wider text-gray-500">
            Share this project
          </p>
          <ShareButton title={project.title} text={project.description} />
        </div>
      </div>
    </main>
  );
}
