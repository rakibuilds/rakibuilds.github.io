// src/components/lab-notes-grid.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import type { BaseContent } from '@/lib/content-loader';

export function LabNotesGrid({ notes }: { notes: BaseContent[] }) {
  return (
    <div className="flex flex-col gap-6">
      {notes.map((post, idx) => (
        <motion.div
          key={post.slug}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: idx * 0.1 }}
        >
          <Link
            href={`/lab-notes/${post.slug}`}
            className="group block p-6 md:p-8 rounded-3xl border border-white/10 bg-white/[0.02] hover:border-cyan-400/30 transition-all"
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-2">
              <h2 className="text-2xl font-bold group-hover:text-cyan-400 transition-colors">
                {post.title}
              </h2>
              <span className="text-sm font-mono text-gray-500 whitespace-nowrap">
                {post.date}
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              {post.excerpt || post.description}
            </p>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}