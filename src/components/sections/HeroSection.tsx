'use client';

/**
 * HeroSection — Scene 0 (0–12%)
 * RAVENTECH + "Digital Marketing, Engineered." + staggered char reveal + scroll cue
 */

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { RevealText, Highlight } from '@/components/ui/RevealText';
import { MagneticButton, ArrowRight } from '@/components/ui/MagneticButton';
import { ScrollScene } from '@/components/ui/ScrollScene';
import { useScrollStore } from '@/store/scrollStore';

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const loaderDone = useScrollStore((s) => s.loaderDone);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], ['0%', '-20%']);

  const scrollToNext = () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: total * 0.14, behavior: 'smooth' });
  };

  return (
    <ScrollScene id="hero" stickyHeight={120} className="min-h-screen">
      <motion.div
        ref={ref as any}
        style={{ opacity, y }}
        className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-20 w-full max-w-6xl mx-auto"
      >
        {/* Eyebrow */}
        {loaderDone && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 flex items-center gap-3"
          >
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-violet" />
            <span className="text-xs font-display font-medium tracking-[0.4em] text-violet uppercase">
              Digital Marketing Agency
            </span>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-violet" />
          </motion.div>
        )}

        {/* Main headline */}
        {loaderDone && (
          <h1 className="font-headline font-extrabold leading-[0.9] mb-6" style={{ fontSize: 'clamp(4rem, 12vw, 10rem)' }}>
            <div className="overflow-hidden">
              <RevealText
                text="RAVEN"
                mode="chars"
                delay={0.4}
                stagger={0.06}
                className="text-white inline-flex"
              />
            </div>
            <div className="overflow-hidden">
              <RevealText
                text="TECH"
                mode="chars"
                delay={0.7}
                stagger={0.06}
                className="text-gradient-violet-cyan inline-flex"
              />
            </div>
          </h1>
        )}

        {/* Subtitle */}
        {loaderDone && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-light tracking-[0.2em] text-white/60 mb-10 uppercase"
            style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1.4rem)' }}
          >
            Digital Marketing,{' '}
            <span className="text-cyan font-medium">Engineered.</span>
          </motion.p>
        )}

        {/* CTA Buttons */}
        {loaderDone && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center gap-4 mb-16"
          >
            <MagneticButton
              variant="primary"
              className="text-base py-4 px-8"
              cursorLabel="START"
              cursorColor="violet"
              onClick={() => {
                const total = document.documentElement.scrollHeight - window.innerHeight;
                window.scrollTo({ top: total * 0.92, behavior: 'smooth' });
              }}
            >
              Start Your Project <ArrowRight />
            </MagneticButton>
            <MagneticButton
              variant="outline"
              className="text-base py-4 px-8"
              cursorLabel="WORK"
              onClick={() => {
                const total = document.documentElement.scrollHeight - window.innerHeight;
                window.scrollTo({ top: total * 0.14, behavior: 'smooth' });
              }}
            >
              View Our Work
            </MagneticButton>
          </motion.div>
        )}

        {/* Stats row */}
        {loaderDone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.8 }}
            className="flex items-center gap-8 md:gap-16 mb-12"
          >
            {[
              { val: '200+', label: 'Brands Scaled' },
              { val: '98%', label: 'Client Retention' },
              { val: '5×', label: 'Avg. ROI' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display font-bold text-3xl md:text-4xl text-gradient-violet-cyan">
                  {stat.val}
                </div>
                <div className="text-xs font-body text-white/40 tracking-wider uppercase mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Scroll cue */}
        {loaderDone && (
          <motion.button
            onClick={scrollToNext}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.2 }}
            className="flex flex-col items-center gap-2 text-white/30 hover:text-white/70 transition-colors group"
            data-cursor-scale="1.5"
          >
            <span className="text-[10px] font-display tracking-[0.3em] uppercase">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <svg className="w-5 h-5 group-hover:text-cyan transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
              </svg>
            </motion.div>
          </motion.button>
        )}
      </motion.div>
    </ScrollScene>
  );
}
