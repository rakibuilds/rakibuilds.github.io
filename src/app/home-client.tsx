'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/lib/config';
import type { BaseContent } from '@/lib/content-loader';
import ProjectCard from '@/components/project-card';
import Hero3DLazy from '@/components/hero-3d-lazy';

export default function Home({ experiments }: { experiments: BaseContent[] }) {
  return (
    <main className="min-h-screen bg-[#03040a] text-white selection:bg-cyan-400 selection:text-black font-sans overflow-x-hidden">
      {/* Ambient Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-cyan-600/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-purple-600/10 rounded-full blur-[100px]"></div>
      </div>

      {/* Hero Section with lazy 3D */}
      <section className="relative h-[90vh] md:h-screen flex items-center justify-center overflow-hidden pt-16">
        <Hero3DLazy />

        <div className="relative z-10 text-center px-4 md:px-6 max-w-5xl mx-auto mt-[-5vh]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-4 md:mb-6 leading-[1.1]">
              Building <br className="md:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
                AI systems
              </span>{' '}
              <br className="hidden md:block" />
              from the ground up.
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed px-2">
              A personal playground for local LLMs, agentic workflows, and self-hosted AI infrastructure. Built for privacy, speed, and absolute control.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 w-full px-4 sm:px-0">
              <Link
                href="/experiments"
                className="w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 rounded-full bg-white text-black font-bold hover:bg-cyan-400 transition-colors flex items-center justify-center gap-2"
              >
                View Experiments <ArrowRight size={18} />
              </Link>
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 rounded-full border border-white/20 hover:border-cyan-400/50 hover:bg-white/5 transition-all text-white font-medium flex items-center justify-center gap-2"
              >
                <Image src="/social/github.svg" alt="GitHub" width={18} height={18} className="invert" /> Source Code
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experiments Section */}
      <section id="experiments" className="relative z-10 py-20 md:py-32 px-4 md:px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-50px' }}
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 gap-4 md:gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-2 md:mb-4">
                Active <span className="text-cyan-400">Experiments</span>
              </h2>
              <p className="text-gray-400 max-w-lg text-sm md:text-lg">
                Projects and prototypes focused on local AI execution, privacy, and creative user interfaces.
              </p>
            </div>
            <Link
              href="/experiments"
              className="text-sm md:text-base text-cyan-400 font-medium hover:text-white transition-colors flex items-center gap-2 group w-fit"
            >
              View all experiments <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {experiments.map((project, idx) => (
              <ProjectCard key={project.slug} project={project} idx={idx} />
            ))}
          </div>
        </motion.div>
      </section>
    </main>
  );
}