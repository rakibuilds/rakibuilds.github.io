// src/components/footer.tsx
import Image from 'next/image';
import { siteConfig } from '@/lib/config';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#03040a] py-8 md:py-12 relative z-10">
      <div className="max-w-6xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
        <div className="text-gray-400 text-xs md:text-sm text-center md:text-left">
          © {new Date().getFullYear()} Rakibul AI Labs. All rights reserved.
        </div>
        <div className="flex items-center gap-4 md:gap-6 text-xs md:text-sm font-medium">
          <a href={siteConfig.github} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors flex items-center gap-1.5 md:gap-2">
            <Image src="/social/github.svg" alt="GitHub" width={14} height={14} className="invert opacity-70" /> GitHub
          </a>
          <a href={siteConfig.twitter} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors flex items-center gap-1.5 md:gap-2">
            <Image src="/social/x.svg" alt="X" width={14} height={14} className="invert opacity-70" /> X
          </a>
          <a href={siteConfig.mainPortfolio} target="_blank" rel="noreferrer" className="text-cyan-400 hover:text-white transition-colors">Rakibul Labs ↗</a>
        </div>
      </div>
    </footer>
  );
}