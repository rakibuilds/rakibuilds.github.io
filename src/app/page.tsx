'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, Cpu, Database, Code2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const projects = [
  {
    title: "Local LLM Agent",
    description: "An autonomous agent running entirely offline using Ollama and LangChain for private data analysis and task execution.",
    tags: ["Python", "LangChain", "Ollama"],
    icon: <Cpu className="w-6 h-6 text-cyan-400" />,
    link: "https://github.com/rakibuilds"
  },
  {
    title: "Private RAG System",
    description: "A self-hosted Retrieval-Augmented Generation pipeline that ensures complete data privacy without relying on external APIs.",
    tags: ["Next.js", "Supabase", "AI"],
    icon: <Database className="w-6 h-6 text-purple-400" />,
    link: "https://github.com/rakibuilds"
  },
  {
    title: "UI Component Lab",
    description: "Experimental React components with Framer Motion and Three.js for modern, interactive web interfaces.",
    tags: ["React", "Three.js", "Framer Motion"],
    icon: <Code2 className="w-6 h-6 text-emerald-400" />,
    link: "https://github.com/rakibuilds"
  }
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#03040a] text-white selection:bg-cyan-400 selection:text-black font-sans overflow-x-hidden">
      
      {/* Ambient Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-cyan-600/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-purple-600/10 rounded-full blur-[100px]"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#03040a]/80 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 md:gap-3 group">
            <div className="relative w-8 h-8 md:w-10 md:h-10 overflow-hidden rounded-lg">
              <Image 
                src="/logo.svg" 
                alt="Rakibul AI Labs Logo" 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <span className="font-bold text-lg md:text-xl tracking-tight font-mono text-white/90">
              Rakibul<span className="text-cyan-400">.AI</span>
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <a href="#projects" className="hover:text-white transition-colors">Experiments</a>
            <a href="https://github.com/rakibuilds" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
              <Image src="/social/github.svg" alt="GitHub" width={16} height={16} className="invert opacity-70" /> GitHub
            </a>
            <a href="https://rakibul-labs.netlify.app/" target="_blank" rel="noreferrer" className="px-4 py-2 rounded-full border border-cyan-400/30 text-cyan-300 hover:bg-cyan-400/10 transition-colors">
              Main Portfolio ↗
            </a>
          </div>

          <div className="flex md:hidden">
             <a href="https://github.com/rakibuilds" target="_blank" rel="noreferrer" className="p-2 rounded-lg border border-white/10 text-gray-300">
                <Image src="/social/github.svg" alt="GitHub" width={20} height={20} className="invert opacity-80" />
             </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[90vh] md:h-screen flex items-center justify-center overflow-hidden pt-16">
        
        <div className="absolute inset-0 z-0 opacity-60 md:opacity-80">
          <Canvas camera={{ position: [0, 0, 8] }} dpr={[1, 1.5]}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#79e4f2" />
            <Float speed={1.5} rotationIntensity={1} floatIntensity={1.5}>
              <Sphere args={[1.5, 32, 32]}>
                <MeshDistortMaterial
                  color="#79e4f2"
                  attach="material"
                  distort={0.4}
                  speed={1.5}
                  roughness={0.2}
                  metalness={0.8}
                  emissive="#79e4f2"
                  emissiveIntensity={0.1}
                />
              </Sphere>
            </Float>
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
          </Canvas>
        </div>

        <div className="relative z-10 text-center px-4 md:px-6 max-w-5xl mx-auto mt-[-5vh]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-4 md:mb-6 leading-[1.1]">
              Building <br className="md:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">AI systems</span> <br className="hidden md:block" /> 
              from the ground up.
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed px-2">
              A personal playground for local LLMs, agentic workflows, and self-hosted AI infrastructure. Built for privacy, speed, and absolute control.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 w-full px-4 sm:px-0">
              <a href="#projects" className="w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 rounded-full bg-white text-black font-bold hover:bg-cyan-400 transition-colors flex items-center justify-center gap-2">
                View Experiments <ArrowRight size={18} />
              </a>
              <a href="https://github.com/rakibuilds" target="_blank" rel="noreferrer" className="w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 rounded-full border border-white/20 hover:border-cyan-400/50 hover:bg-white/5 transition-all text-white font-medium flex items-center justify-center gap-2">
                <Image src="/social/github.svg" alt="GitHub" width={18} height={18} className="invert" /> Source Code
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative z-10 py-20 md:py-32 px-4 md:px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-50px" }}
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
            <a href="https://github.com/rakibuilds" target="_blank" rel="noreferrer" className="text-sm md:text-base text-cyan-400 font-medium hover:text-white transition-colors flex items-center gap-2 group w-fit">
              View all on GitHub <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {projects.map((project, idx) => (
              <motion.a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group relative flex flex-col p-6 md:p-8 rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent hover:border-cyan-400/30 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-cyan-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10 flex-1">
                  <div className="flex justify-between items-start mb-4 md:mb-6">
                    <div className="p-2 md:p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-300">
                      {project.icon}
                    </div>
                    <ExternalLink size={18} className="text-gray-500 group-hover:text-cyan-400 transition-colors" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                  <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-4 md:mb-6">
                    {project.description}
                  </p>
                </div>
                
                <div className="relative z-10 flex flex-wrap gap-2 mt-auto pt-4 md:pt-6 border-t border-white/5">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] md:text-[11px] font-mono uppercase tracking-wider text-gray-300 bg-white/5 px-2 md:px-3 py-1 md:py-1.5 rounded-lg border border-white/5">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#03040a] py-8 md:py-12 relative z-10">
        <div className="max-w-6xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
          <div className="text-gray-400 text-xs md:text-sm text-center md:text-left">
            © 2026 Rakibul AI Labs. All rights reserved.
          </div>
          <div className="flex items-center gap-4 md:gap-6 text-xs md:text-sm font-medium">
            <a href="https://github.com/rakibuilds" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors flex items-center gap-1.5 md:gap-2">
              <Image src="/social/github.svg" alt="GitHub" width={14} height={14} className="invert opacity-70" /> GitHub
            </a>
            <a href="https://x.com/rakibuilds" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors flex items-center gap-1.5 md:gap-2">
              <Image src="/social/x.svg" alt="X" width={14} height={14} className="invert opacity-70" /> X
            </a>
            <a href="https://rakibul-labs.netlify.app/" target="_blank" rel="noreferrer" className="text-cyan-400 hover:text-white transition-colors">Rakibul Labs ↗</a>
          </div>
        </div>
      </footer>
    </main>
  );
}