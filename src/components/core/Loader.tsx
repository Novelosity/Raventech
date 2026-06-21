'use client';

/**
 * Loader — Plays raven-rotate.mp4 in full, then exits into hero
 */

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollStore } from '@/store/scrollStore';

export function Loader() {
  const setLoaderDone = useScrollStore((s) => s.setLoaderDone);
  const setLoaded = useScrollStore((s) => s.setLoaded);
  const [exiting, setExiting] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // When video ends → start exit
  const handleEnded = () => {
    setLoaded(true);
    setExiting(true);
    // Give exit animation time to finish before unmounting & enabling scroll
    setTimeout(() => setLoaderDone(true), 900);
  };

  // Fallback: if video fails to load/play after 8s, exit anyway
  useEffect(() => {
    const fallback = setTimeout(() => {
      if (!exiting) handleEnded();
    }, 8000);
    return () => clearTimeout(fallback);
  }, [exiting]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9997] flex flex-col items-center justify-center bg-void overflow-hidden"
          exit={{
            opacity: 0,
            scale: 1.06,
            transition: { duration: 0.85, ease: [0.43, 0.13, 0.23, 0.96] },
          }}
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-radial from-navy/30 via-void to-void" />

          {/* Full-screen video */}
          <motion.video
            ref={videoRef}
            src="/videos/raven-rotate.mp4"
            autoPlay
            muted
            playsInline
            onEnded={handleEnded}
            className="absolute inset-0 w-full h-full object-cover z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{ filter: 'drop-shadow(0 0 60px rgba(124,58,237,0.5))' }}
          />

          {/* Violet vignette over video */}
          <div
            className="absolute inset-0 z-20 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 30%, rgba(10,10,15,0.6) 100%)',
            }}
          />

          {/* Tagline overlay — bottom center */}
          <motion.div
            className="absolute bottom-12 left-0 right-0 z-30 text-center space-y-1"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
          >
            <p className="text-[11px] font-display font-light tracking-[0.35em] text-white/50 uppercase">
              We don&apos;t follow trends.
            </p>
            <p className="text-base font-display font-semibold tracking-[0.2em] text-white uppercase">
              We <span className="text-gradient-violet-cyan">build</span> them.
            </p>
          </motion.div>

          {/* Corner labels */}
          <div className="absolute top-6 left-8 z-30 font-display text-[10px] tracking-widest text-white/30 uppercase">
            RAVENTECH™
          </div>
          <div className="absolute top-6 right-8 z-30 font-display text-[10px] tracking-widest text-white/30 uppercase">
            Digital Marketing
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
