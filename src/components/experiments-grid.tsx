// src/components/experiments-grid.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import type { BaseContent } from '@/lib/content-loader';

export function ExperimentsGrid({ experiments }: { experiments: BaseContent[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {experiments.map((project, idx) => (
        <Link href={`/experiments/${project.slug}`} key={project.slug}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="group relative flex flex-col p-6 md:p-8 rounded-3xl border border-white/10 bg-white/[0.02] hover:border-cyan-400/30 transition-all h-full"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl md:text-2xl font-bold group-hover:text-cyan-400 transition-colors">
                {project.title}
              </h3>
              <ExternalLink size={18} className="text-gray-500 group-hover:text-cyan-400" />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/5">
              {project.tags?.map((tag: string) => (
                <span
                  key={tag}
                  className="text-[10px] font-mono uppercase tracking-wider text-gray-300 bg-white/5 px-2 py-1 rounded-lg border border-white/5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </Link>
      ))}
    </div>
  );
}