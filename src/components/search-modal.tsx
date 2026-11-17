// src/components/search-modal.tsx
'use client';

import { useState, useEffect } from 'react';
import { Search, X, BookOpen, Cpu } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import type { BaseContent } from '@/lib/content-loader';

type SearchItem = BaseContent & { type: 'experiments' | 'lab-notes' };

export default function SearchModal({
  isOpen,
  onClose,
  items,
}: {
  isOpen: boolean;
  onClose: () => void;
  items: SearchItem[];
}) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const q = query.toLowerCase();
  const filtered = q
    ? items.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          (item.description ?? '').toLowerCase().includes(q) ||
          (item.excerpt ?? '').toLowerCase().includes(q) ||
          item.tags?.some((tag) => tag.toLowerCase().includes(q))
      )
    : [];

  const experiments = filtered.filter((i) => i.type === 'experiments');
  const notes = filtered.filter((i) => i.type === 'lab-notes');

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-[10%] left-1/2 -translate-x-1/2 w-full max-w-xl z-[101] px-4"
          >
            <div className="bg-[#0a0b10] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
              <div className="flex items-center px-4 py-3 border-b border-white/10">
                <Search className="w-5 h-5 text-gray-400 mr-3" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search experiments, lab notes, tech..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-lg"
                />
                <button
                  onClick={onClose}
                  className="p-1 rounded-md hover:bg-white/10 text-gray-400 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="max-h-[60vh] overflow-y-auto p-2">
                {!q ? (
                  <div className="text-center py-10 text-gray-500">
                    Start typing to search...
                  </div>
                ) : filtered.length === 0 ? (
                  <div className="text-center py-10 text-gray-500">
                    No results found for &quot;{query}&quot;
                  </div>
                ) : (
                  <>
                    {experiments.length > 0 && (
                      <div className="mb-4">
                        <div className="px-3 py-2 text-xs font-mono uppercase tracking-wider text-gray-500">
                          Experiments
                        </div>
                        {experiments.map((exp) => (
                          <Link
                            key={exp.slug}
                            href={`/experiments/${exp.slug}`}
                            onClick={onClose}
                            className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors group"
                          >
                            <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-cyan-400">
                              <Cpu size={20} />
                            </div>
                            <div>
                              <h4 className="text-white font-medium group-hover:text-cyan-400 transition-colors">
                                {exp.title}
                              </h4>
                              <p className="text-xs text-gray-400 line-clamp-1">
                                {exp.description}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}

                    {notes.length > 0 && (
                      <div>
                        <div className="px-3 py-2 text-xs font-mono uppercase tracking-wider text-gray-500">
                          Lab Notes
                        </div>
                        {notes.map((note) => (
                          <Link
                            key={note.slug}
                            href={`/lab-notes/${note.slug}`}
                            onClick={onClose}
                            className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors group"
                          >
                            <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-cyan-400">
                              <BookOpen size={20} />
                            </div>
                            <div>
                              <h4 className="text-white font-medium group-hover:text-cyan-400 transition-colors">
                                {note.title}
                              </h4>
                              <p className="text-xs text-gray-400 line-clamp-1">
                                {note.excerpt || note.description}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}