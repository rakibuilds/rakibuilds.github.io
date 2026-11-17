// src/app/lab-notes/page.tsx
import { BookOpen } from 'lucide-react';
import { getContent } from '@/lib/content-loader';
import { LabNotesGrid } from '@/components/lab-notes-grid';

export default function LabNotesPage() {
  const notes = getContent('lab-notes');

  return (
    <main className="min-h-screen bg-[#03040a] text-white font-sans selection:bg-cyan-400 selection:text-black">
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-cyan-600/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-6 pt-32 pb-20">
        <div className="mb-12 md:mb-20">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 flex items-center gap-4">
            <BookOpen className="w-10 h-10 text-cyan-400" />
            The <span className="text-cyan-400">Lab Notes</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl">
            Thoughts on AI, building products, and the future of self-hosted infrastructure.
          </p>
        </div>

        <LabNotesGrid notes={notes} />
      </div>
    </main>
  );
}