'use client';

/**
 * Loader — Particle raven assembles + tagline, then disperses into hero
 * Uses AnimatePresence exit animation
 */

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollStore } from '@/store/scrollStore';

export function Loader() {
  const setLoaderDone = useScrollStore((s) => s.setLoaderDone);
  const setLoaded = useScrollStore((s) => s.setLoaded);
  const [phase, setPhase] = useState<'assembling' | 'holding' | 'exiting'>('assembling');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + Math.random() * 15;
      });
    }, 100);

    // Phase timeline
    const t1 = setTimeout(() => setPhase('holding'), 2200);
    const t2 = setTimeout(() => {
      setPhase('exiting');
      setLoaded(true);
    }, 3500);
    const t3 = setTimeout(() => setLoaderDone(true), 4500);

    return () => {
      clearInterval(interval);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [setLoaderDone, setLoaded]);

  const isExiting = phase === 'exiting';

  return (
    <AnimatePresence>
      {!isExiting ? (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9997] flex flex-col items-center justify-center bg-void overflow-hidden"
          exit={{
            opacity: 0,
            scale: 1.05,
            transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] },
          }}
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-radial from-navy/30 via-void to-void" />

          {/* Rotating raven video */}
          <motion.div
            className="relative w-64 h-64 md:w-80 md:h-80 mb-8"
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{
              opacity: 1,
              scale: phase === 'assembling' ? [0.75, 1.04, 1] : 1,
            }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Radial violet glow behind video */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(124,58,237,0.35) 0%, transparent 70%)',
                filter: 'blur(24px)',
                transform: 'scale(1.3)',
              }}
            />
            <video
              src="/videos/raven-rotate.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-contain relative z-10"
              style={{ filter: 'drop-shadow(0 0 32px rgba(124,58,237,0.6))' }}
            />
          </motion.div>

          {/* Tagline */}
          <motion.div
            className="text-center space-y-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: phase !== 'assembling' ? 0 : 0, y: 0 }}
          >
            <motion.p
              className="text-fluid-lg font-display font-light tracking-[0.3em] text-white/40 uppercase"
              initial={{ opacity: 0, letterSpacing: '0.5em' }}
              animate={{ opacity: 1, letterSpacing: '0.3em' }}
              transition={{ duration: 1.5, delay: 1, ease: 'easeOut' }}
            >
              We don&apos;t follow trends.
            </motion.p>
            <motion.p
              className="text-fluid-xl font-display font-semibold tracking-[0.2em] text-white uppercase"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
            >
              We{' '}
              <span className="text-gradient-violet-cyan">build</span>{' '}
              them.
            </motion.p>
          </motion.div>

          {/* Loading bar */}
          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2 w-48"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="h-px bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-violet to-cyan rounded-full"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
            <p className="text-center text-[10px] font-display tracking-widest text-white/30 mt-2 uppercase">
              {Math.min(Math.round(progress), 100)}%
            </p>
          </motion.div>

          {/* Corner labels */}
          <div className="absolute top-6 left-8 font-display text-[10px] tracking-widest text-white/20 uppercase">
            RAVENTECH™
          </div>
          <div className="absolute top-6 right-8 font-display text-[10px] tracking-widest text-white/20 uppercase">
            Digital Marketing
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

