// src/app/experiments/page.tsx
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getContent } from '@/lib/content-loader';
import { ExperimentsGrid } from '@/components/experiments-grid';

export default function ExperimentsPage() {
  const experiments = getContent('experiments');

  return (
    <main className="min-h-screen bg-[#03040a] text-white font-sans selection:bg-cyan-400 selection:text-black">
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-cyan-600/10 rounded-full blur-[100px]"></div>
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
            All <span className="text-cyan-400">Experiments</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl">
            A complete archive of my R&D work. Building self-hosted AI, local LLMs, and interactive web interfaces.
          </p>
        </div>

        <ExperimentsGrid experiments={experiments} />
      </div>
    </main>
  );
}