'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Cpu } from 'lucide-react';
import type { BaseContent } from '@/lib/content-loader';

type Experiment = BaseContent;

export default function ProjectCard({
  project,
  idx,
}: {
  project: Experiment;
  idx: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      viewport={{ once: true, margin: '-50px' }}
    >
      <Link
        href={`/experiments/${project.slug}`}
        className="group relative block h-full rounded-3xl p-[1px] bg-gradient-to-br from-white/10 via-white/5 to-transparent hover:from-cyan-400/40 hover:via-cyan-400/10 transition-all duration-500"
      >
        <div className="relative h-full rounded-3xl bg-[#0a0b10]/80 backdrop-blur-xl p-6 md:p-8 overflow-hidden">
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-400/20 rounded-full blur-3xl"></div>
          </div>

          <div className="relative">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                <Cpu size={24} />
              </div>
              <ArrowUpRight
                size={20}
                className="text-gray-500 group-hover:text-cyan-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
              />
            </div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">
              {project.title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags?.map((tag: string) => (
                <span
                  key={tag}
                  className="text-[10px] font-mono uppercase tracking-wider text-gray-300 bg-white/5 px-2 py-1 rounded-lg border border-white/5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}