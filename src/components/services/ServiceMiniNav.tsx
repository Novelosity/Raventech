'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface ServiceMiniNavProps {
  serviceName: string;
  accent: 'violet' | 'cyan' | 'gold';
}

const accentTextClass = {
  violet: 'text-violet',
  cyan: 'text-cyan',
  gold: 'text-gold',
};

const accentBtnClass = {
  violet: 'bg-violet hover:bg-violet/80 text-white',
  cyan: 'bg-cyan hover:bg-cyan/80 text-void',
  gold: 'bg-gold hover:bg-gold/80 text-void',
};

const accentBarClass = {
  violet: 'from-violet via-cyan to-violet',
  cyan: 'from-cyan via-violet to-cyan',
  gold: 'from-gold via-violet to-gold',
};

export function ServiceMiniNav({ serviceName, accent }: ServiceMiniNavProps) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? scrolled / total : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToCTA = () => {
    const el = document.getElementById('service-cta');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 glass-dark border-b border-white/5"
    >
      {/* Scroll progress bar */}
      <div
        className={`absolute top-0 left-0 h-[2px] bg-gradient-to-r ${accentBarClass[accent]} transition-none`}
        style={{ width: `${scrollProgress * 100}%` }}
      />

      <nav className="flex items-center justify-between px-4 md:px-8 py-3">
        {/* Logo + Breadcrumb */}
        <div className="flex items-center gap-2 min-w-0">
          <Link
            href="/"
            className="font-display font-bold text-sm md:text-base tracking-wider text-white shrink-0"
            data-cursor-scale="1.5"
          >
            RAVEN<span className="text-gradient-violet-cyan">TECH</span>
          </Link>
          <span className="text-white/20 text-sm hidden sm:inline select-none">/</span>
          <Link
            href="/#services"
            className="text-white/40 hover:text-white/70 text-xs font-display tracking-wide transition-colors hidden sm:inline truncate"
          >
            Services
          </Link>
          <span className="text-white/20 text-sm hidden sm:inline select-none">/</span>
          <span
            className={`text-xs md:text-sm font-display font-medium tracking-wide truncate max-w-[120px] md:max-w-none ${accentTextClass[accent]}`}
          >
            {serviceName}
          </span>
        </div>

        {/* CTA button */}
        <button
          onClick={scrollToCTA}
          className={`shrink-0 px-3 md:px-5 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-display font-semibold tracking-wider transition-all duration-300 hover:scale-105 active:scale-95 ${accentBtnClass[accent]}`}
          data-cursor-scale="1.5"
          data-cursor-label="QUOTE"
        >
          <span className="hidden md:inline">Get a Quote</span>
          <span className="md:hidden">Quote</span>
        </button>
      </nav>
    </motion.header>
  );
}
