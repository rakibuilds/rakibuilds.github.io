// src/components/hero-3d-lazy.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

const Hero3D = dynamic(() => import('./hero-3d'), {
  ssr: false,
  loading: () => <CSSFallback />,
});

function CSSFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        className="w-72 h-72 md:w-96 md:h-96 rounded-full animate-pulse"
        style={{
          background:
            'radial-gradient(circle at 30% 30%, rgba(121,228,242,0.9), rgba(56,189,248,0.4) 40%, rgba(121,228,242,0.05) 70%)',
          boxShadow: '0 0 120px 40px rgba(121,228,242,0.25)',
          filter: 'blur(1px)',
        }}
      />
    </div>
  );
}

function detectHighEndDevice(): boolean {
  if (typeof window === 'undefined') return false;

  // Respect user's motion preference
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return false;

  // Check CPU cores
  const cores = navigator.hardwareConcurrency ?? 2;
  if (cores <= 2) return false;

  // Check device memory safely without `any`
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  if (typeof memory === 'number' && memory < 4) return false;

  // Check WebGL support
  try {
    const canvas = document.createElement('canvas');
    const gl =
      canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return false;
  } catch {
    return false;
  }

  return true;
}

export default function Hero3DLazy() {
  const ref = useRef<HTMLDivElement>(null);
  // Initialize lazily to prevent calling setState synchronously inside an effect
  const [shouldRender] = useState(() => detectHighEndDevice());
  const [visible, setVisible] = useState(false);

  // Only mount the 3D bundle when hero scrolls into view
  useEffect(() => {
    if (!shouldRender || !ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [shouldRender]);

  return (
    <div
      ref={ref}
      className="absolute inset-0 z-0 opacity-60 md:opacity-80"
      aria-hidden="true"
    >
      {shouldRender && visible ? <Hero3D /> : <CSSFallback />}
    </div>
  );
}