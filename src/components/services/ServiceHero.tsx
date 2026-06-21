'use client';

import { motion, useReducedMotion as useFramerReducedMotion } from 'framer-motion';
import { useScrollStore } from '@/store/scrollStore';
import Link from 'next/link';

interface ServiceHeroProps {
  headline: string;
  subheadline: string;
  accent: 'violet' | 'cyan' | 'gold';
}

const accentGradientMap = {
  violet: 'radial-gradient(ellipse at 50% 50%, rgba(124,58,237,0.18) 0%, transparent 70%)',
  cyan: 'radial-gradient(ellipse at 50% 50%, rgba(34,211,238,0.15) 0%, transparent 70%)',
  gold: 'radial-gradient(ellipse at 50% 50%, rgba(245,197,24,0.15) 0%, transparent 70%)',
};

const accentTextClass = {
  violet: 'text-gradient-violet-cyan',
  cyan: 'text-gradient-violet-cyan',
  gold: 'text-gradient-gold',
};

const accentBtnClass = {
  violet: 'bg-violet hover:bg-violet/80',
  cyan: 'bg-cyan hover:bg-cyan/80 !text-void',
  gold: 'bg-gold hover:bg-gold/80 !text-void',
};

export function ServiceHero({ headline, subheadline, accent }: ServiceHeroProps) {
  const mouseX = useScrollStore((s) => s.mouseX);
  const mouseY = useScrollStore((s) => s.mouseY);
  const prefersReduced = useFramerReducedMotion();

  // Split headline into words for stagger
  const words = headline.split(' ');

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.09, delayChildren: 0.35 } },
  };

  const wordVariants = {
    hidden: { y: '110%', opacity: 0 },
    visible: {
      y: '0%',
      opacity: 1,
      transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 md:px-12 pt-24 pb-16 overflow-hidden">
      {/* Radial background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: accentGradientMap[accent] }}
      />

      {/* Mouse parallax content */}
      <motion.div
        className="relative z-10 text-center max-w-5xl mx-auto"
        animate={
          prefersReduced
            ? {}
            : { x: mouseX * 10, y: mouseY * -6 }
        }
        transition={{ type: 'spring', stiffness: 60, damping: 20 }}
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[10px] md:text-xs font-display tracking-[0.45em] uppercase text-white/35 mb-7"
        >
          RAVENTECH — Service
        </motion.p>

        {/* Staggered word headline */}
        <motion.h1
          variants={prefersReduced ? {} : containerVariants}
          initial="hidden"
          animate="visible"
          className="font-headline font-black leading-[1.04] mb-6 overflow-hidden"
          style={{ fontSize: 'clamp(2.8rem, 8vw, 7rem)' }}
          aria-label={headline}
        >
          {words.map((word, i) => {
            const isLast = i === words.length - 1;
            return (
              <span key={i} className="inline-block overflow-hidden mr-[0.22em] last:mr-0">
                <motion.span
                  variants={prefersReduced ? {} : wordVariants}
                  className={isLast ? accentTextClass[accent] : 'text-white'}
                  style={{ display: 'inline-block' }}
                >
                  {word}
                </motion.span>
              </span>
            );
          })}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: 'easeOut' }}
          className="font-display text-white/55 mb-10 max-w-2xl mx-auto"
          style={{ fontSize: 'clamp(1rem, 2.2vw, 1.375rem)' }}
        >
          {subheadline}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={() => {
              document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-7 py-3 rounded-full border border-white/20 text-white font-display font-medium text-sm tracking-wider hover:border-white/50 hover:bg-white/5 transition-all duration-300"
            data-cursor-scale="1.5"
            data-cursor-label="VIEW"
          >
            View Portfolio
          </button>
          <Link
            href="/#contact"
            className={`px-7 py-3 rounded-full text-white font-display font-semibold text-sm tracking-wider transition-all duration-300 hover:scale-105 active:scale-95 ${accentBtnClass[accent]}`}
            data-cursor-scale="1.5"
            data-cursor-label="START"
          >
            Start Project →
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-[10px] font-display tracking-[0.35em] uppercase text-white/20">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-white/35 to-transparent"
        />
      </motion.div>
    </section>
  );
}
