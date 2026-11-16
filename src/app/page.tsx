'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, MeshDistortMaterial, Sphere, Stars } from '@react-three/drei';
import { motion } from 'framer-motion';
import { ArrowRight, Github, ExternalLink, Cpu, Database, Code2 } from 'lucide-react';
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
      
      {/* Dynamic Background Gradient */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-900/20 via-[#03040a] to-[#03040a]"></div>

      {/* Navigation (Glassmorphism) */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#03040a]/60 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-8 h-8 md:w-10 md:h-10 overflow-hidden rounded-lg">
              <Image 
                src="/logo.svg" 
                alt="Rakibul AI Labs Logo" 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <span className="font-bold text-xl tracking-tight font-mono text-white/90 hidden sm:block">
              Rakibul<span className="text-cyan-400">.AI</span>
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <a href="#projects" className="hover:text-white transition-colors">Experiments</a>
            <a href="https://github.com/rakibuilds" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
              <Github size={16} /> GitHub
            </a>
            <a href="https://rakibul-labs.netlify.app/" target="_blank" rel="noreferrer" className="px-4 py-2 rounded-full border border-cyan-400/30 text-cyan-300 hover:bg-cyan-400/10 transition-colors">
              Main Portfolio ↗
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center overflow-hidden pt-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/banner.webp')" }}
      >
        {/* Dark Overlay so text is readable over the banner */}
        <div className="absolute inset-0 bg-[#03040a]/85 z-0"></div>

        {/* 3D Background */}
        <div className="absolute inset-0 z-0 opacity-70">
          <Canvas camera={{ position: [0, 0, 6] }}>
            <ambientLight intensity={0.2} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#79e4f2" />
            <pointLight position={[-10, -10, -10]} intensity={1} color="#a99aff" />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
              <Sphere args={[1.8, 64, 64]}>
                <MeshDistortMaterial
                  color="#79e4f2"
                  attach="material"
                  distort={0.5}
                  speed={2}
                  roughness={0.1}
                  metalness={0.9}
                  emissive="#79e4f2"
                  emissiveIntensity={0.2}
                />
              </Sphere>
            </Float>
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
          </Canvas>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-[-10vh]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-cyan-300 text-xs font-semibold tracking-wider uppercase mb-8">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(121,228,242,0.8)]"></span>
              R&D Sandbox
            </span>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 leading-tight">
              Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">AI systems</span> <br /> from the ground up.
            </h1>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              A personal playground for local LLMs, agentic workflows, and self-hosted AI infrastructure. Built for privacy, speed, and absolute control.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#projects" className="px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-cyan-400 transition-colors flex items-center gap-2 w-full sm:w-auto justify-center">
                View Experiments <ArrowRight size={18} />
              </a>
              <a href="https://github.com/rakibuilds" target="_blank" rel="noreferrer" className="px-8 py-4 rounded-full border border-white/20 hover:border-cyan-400/50 hover:bg-white/5 transition-all text-white font-medium flex items-center gap-2 w-full sm:w-auto justify-center">
                <Github size={18} /> Source Code
              </a>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-gray-500 to-transparent"></div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative z-10 py-32 px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Active <span className="text-cyan-400">Experiments</span>
              </h2>
              <p className="text-gray-400 max-w-lg text-lg">
                Projects and prototypes focused on local AI execution, privacy, and creative user interfaces.
              </p>
            </div>
            <a href="https://github.com/rakibuilds" target="_blank" rel="noreferrer" className="text-cyan-400 font-medium hover:text-white transition-colors flex items-center gap-2 group">
              View all on GitHub <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, idx) => (
              <motion.a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group relative flex flex-col p-8 rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent hover:border-cyan-400/30 transition-all duration-500 overflow-hidden"
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-b from-cyan-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10 flex-1">
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-300">
                      {project.icon}
                    </div>
                    <ExternalLink size={20} className="text-gray-500 group-hover:text-cyan-400 transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>
                
                <div className="relative z-10 flex flex-wrap gap-2 mt-auto pt-6 border-t border-white/5">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[11px] font-mono uppercase tracking-wider text-gray-300 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
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
      <footer className="border-t border-white/10 bg-[#03040a] py-12 relative z-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Rakibul AI Labs. All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-sm font-medium">
            <a href="https://github.com/rakibuilds" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">GitHub</a>
            <a href="https://x.com/rakibuilds" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">X (Twitter)</a>
            <a href="https://rakibul-labs.netlify.app/" target="_blank" rel="noreferrer" className="text-cyan-400 hover:text-white transition-colors">Rakibul Labs ↗</a>
          </div>
        </div>
      </footer>
    </main>
  );
}