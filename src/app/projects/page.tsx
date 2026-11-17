// src/app/projects/page.tsx
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Code2 } from 'lucide-react';
import { getContent } from '@/lib/content-loader';

export const metadata = {
  title: 'Projects — Rakibul',
  description: 'Live, working projects I have built and shipped.',
};

export default function ProjectsPage() {
  const projects = getContent('projects');

  return (
    <main className="min-h-screen bg-[#03040a] text-white font-sans selection:bg-emerald-400 selection:text-black">
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-emerald-600/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 pt-32 pb-20">
        <div className="mb-12 md:mb-20">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
            Live <span className="text-emerald-400">Projects</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl">
            Production work — deployed, running, and maintained.
          </p>
        </div>

        {projects.length === 0 ? (
          <p className="text-gray-500">
            No projects yet. Add an MDX file to <code>src/content/projects/</code>.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {projects.map((project) => (
              <Link href={`/projects/${project.slug}`} key={project.slug}>
                <div className="group relative flex flex-col p-6 md:p-8 rounded-3xl border border-white/10 bg-white/[0.02] hover:border-emerald-400/30 transition-all h-full">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl md:text-2xl font-bold group-hover:text-emerald-400 transition-colors">
                      {project.title}
                    </h3>
                    <ExternalLink
                      size={18}
                      className="text-gray-500 group-hover:text-emerald-400"
                    />
                  </div>

                  <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                    {project.description}
                  </p>

                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.slice(0, 5).map((tag: string) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono uppercase tracking-wider text-gray-300 bg-white/5 px-2 py-1 rounded-lg border border-white/5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/5">
                    {project.liveUrl && (
                      <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-400 text-black text-sm font-bold">
                        View Live <ExternalLink size={14} />
                      </span>
                    )}
                    {project.repoName && (
                      <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-medium">
                        <Code2 size={14} /> {project.repoName}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}