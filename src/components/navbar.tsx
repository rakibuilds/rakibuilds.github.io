'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Menu, X } from 'lucide-react';
import type { BaseContent } from '@/lib/content-loader';
import SearchModal from './search-modal';

type SearchItem = BaseContent & { type: 'experiments' | 'lab-notes' };

export default function Navbar({ searchItems }: { searchItems: SearchItem[] }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsSearchOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <>
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#03040a]/80 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">

          {/* Logo */}
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

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-400">
            <Link href="/experiments" className="hover:text-white transition-colors">
              Experiments
            </Link>
            <Link href="/lab-notes" className="hover:text-white transition-colors">
              Lab Notes
            </Link>
            <Link href="/projects" className="hover:text-white transition-colors">
              Projects
            </Link>

            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/5 border border-white/10 hover:border-white/20 transition-colors text-gray-400 hover:text-white ml-2"
            >
              <Search size={14} />
              <span className="text-xs">Search</span>
              <kbd className="hidden lg:inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-black/50 border border-white/10 text-[10px] font-mono">
                <span className="text-xs">⌘</span>K
              </kbd>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-3">
            <button onClick={() => setIsSearchOpen(true)} className="p-2 text-gray-300">
              <Search size={20} />
            </button>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-gray-300">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>

        {/* Mobile Nav Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-[#0a0b10] border-b border-white/10 py-4 px-6 flex flex-col gap-4">
            <Link
              href="/experiments"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-300 hover:text-white font-medium"
            >
              Experiments
            </Link>
            <Link
              href="/lab-notes"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-300 hover:text-white font-medium"
            >
              Lab Notes
            </Link>
            <Link
              href="/projects"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-300 hover:text-white font-medium"
            >
              Projects
            </Link>
          </div>
        )}
      </nav>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        items={searchItems}
      />
    </>
  );
}