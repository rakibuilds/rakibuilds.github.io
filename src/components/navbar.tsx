'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  FlaskConical,
  BookOpen,
  FolderGit2,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import type { BaseContent } from '@/lib/content-loader';
import { siteConfig } from '@/lib/config';
import SearchModal from './search-modal';

type SearchItem = BaseContent & { type: 'experiments' | 'lab-notes' | 'projects' };

const NAV_LINKS = [
  {
    href: '/experiments',
    label: 'Experiments',
    description: 'Local LLM prototypes & agent sandboxes',
    icon: FlaskConical,
    accent: 'text-cyan-400',
  },
  {
    href: '/projects',
    label: 'Projects',
    description: 'Production systems & open-source builds',
    icon: FolderGit2,
    accent: 'text-blue-400',
  },
  {
    href: '/lab-notes',
    label: 'Lab Notes',
    description: 'Architecture deep-dives & benchmarks',
    icon: BookOpen,
    accent: 'text-purple-400',
  },
];

export default function Navbar({ searchItems }: { searchItems: SearchItem[] }) {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Keyboard shortcut (Cmd/Ctrl + K)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsSearchOpen((open) => !open);
      }
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  // Scroll listener for navbar elevation
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled || isMobileMenuOpen
            ? 'bg-[#03040a]/90 backdrop-blur-xl border-b border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.6)]'
            : 'bg-[#03040a]/50 backdrop-blur-md border-b border-white/5'
        }`}
      >
        {/* Subtle top cyan accent hairline */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

        <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-2.5 md:gap-3 group"
          >
            <motion.div
              whileHover={{ rotate: 6, scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="relative w-8 h-8 md:w-10 md:h-10 overflow-hidden rounded-lg ring-1 ring-white/10 group-hover:ring-cyan-400/50 transition-all"
            >
              <Image
                src="/logo.svg"
                alt="Rakibul AI Labs Logo"
                fill
                className="object-cover"
              />
            </motion.div>
            <div className="flex flex-col">
              <span className="font-bold text-lg md:text-xl tracking-tight font-mono text-white/95 leading-none">
                Rakibul<span className="text-cyan-400">.AI</span>
              </span>
              <span className="text-[10px] font-mono text-gray-500 tracking-widest uppercase mt-0.5 md:hidden">
                AI Labs
              </span>
            </div>
          </Link>

          {/* Desktop Navigation with Spring Active Pill */}
          <div className="hidden md:flex items-center gap-1.5 text-sm font-medium">
            {NAV_LINKS.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-3.5 py-2 rounded-full transition-colors ${
                    isActive ? 'text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="desktop-nav-pill"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      className="absolute inset-0 rounded-full bg-white/[0.08] border border-cyan-400/30 shadow-[0_0_15px_rgba(34,211,238,0.12)] -z-10"
                    />
                  )}
                  {item.label}
                </Link>
              );
            })}

            {/* Search Trigger */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-cyan-400/40 hover:bg-white/[0.08] transition-colors text-gray-400 hover:text-white ml-3"
            >
              <Search size={14} className="text-cyan-400" />
              <span className="text-xs">Search</span>
              <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-black/60 border border-white/10 text-[10px] font-mono text-gray-400">
                <span>⌘</span>K
              </kbd>
            </motion.button>
          </div>

          {/* Mobile Controls */}
          <div className="flex md:hidden items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
              className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-gray-300 active:border-cyan-400/40"
            >
              <Search size={18} className="text-cyan-400" />
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle Menu"
              aria-expanded={isMobileMenuOpen}
              className="relative w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex flex-col items-center justify-center gap-1.5 text-gray-200 active:border-cyan-400/40"
            >
              <motion.span
                animate={
                  isMobileMenuOpen
                    ? { rotate: 45, y: 4 }
                    : { rotate: 0, y: 0 }
                }
                transition={{ duration: 0.22 }}
                className="w-5 h-[1.5px] bg-white rounded-full block"
              />
              <motion.span
                animate={
                  isMobileMenuOpen
                    ? { rotate: -45, y: -3.5 }
                    : { rotate: 0, y: 0 }
                }
                transition={{ duration: 0.22 }}
                className="w-5 h-[1.5px] bg-cyan-400 rounded-full block"
              />
            </motion.button>
          </div>
        </div>

        {/* Clean Mobile Drawer (No redundant search bar) */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'calc(100dvh - 4rem)' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden overflow-y-auto bg-[#03040a]/98 backdrop-blur-2xl border-t border-white/10"
            >
              <div className="px-4 py-6 flex flex-col justify-between min-h-full gap-6">
                <div className="space-y-3">
                  <p className="text-[11px] font-mono uppercase tracking-widest text-gray-500 px-1 pt-1">
                    Navigation
                  </p>

                  {/* Staggered Route Cards */}
                  {NAV_LINKS.map((item, idx) => {
                    const Icon = item.icon;
                    const isActive =
                      pathname === item.href ||
                      pathname.startsWith(`${item.href}/`);

                    return (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: -14 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 * idx + 0.04, duration: 0.25 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                            isActive
                              ? 'bg-cyan-500/10 border-cyan-400/40 text-white'
                              : 'bg-white/[0.03] border-white/[0.07] text-gray-200 active:bg-white/[0.07]'
                          }`}
                        >
                          <div className="flex items-center gap-3.5">
                            <div className="w-10 h-10 rounded-xl bg-black/50 border border-white/10 flex items-center justify-center">
                              <Icon size={18} className={item.accent} />
                            </div>
                            <div>
                              <div className="font-semibold text-base flex items-center gap-2">
                                {item.label}
                                {isActive && (
                                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                                )}
                              </div>
                              <p className="text-xs text-gray-400 mt-0.5">
                                {item.description}
                              </p>
                            </div>
                          </div>
                          <ArrowUpRight size={18} className="text-gray-500" />
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Drawer Footer: Lab Status & GitHub */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.25 }}
                  className="pt-4 border-t border-white/10 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Sparkles size={14} className="text-cyan-400" />
                    <span>Assam, IN · Self-Hosted AI</span>
                  </div>
                  <a
                    href={siteConfig.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white text-black text-xs font-bold"
                  >
                    GitHub <ArrowUpRight size={14} />
                  </a>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        items={searchItems}
      />
    </>
  );
}