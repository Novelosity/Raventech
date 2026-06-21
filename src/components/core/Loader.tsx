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

          {/* Raven rotation video — plays once, full size */}
          <motion.div
            className="relative w-72 h-72 md:w-96 md:h-96"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Violet glow */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(124,58,237,0.4) 0%, transparent 70%)',
                filter: 'blur(32px)',
                transform: 'scale(1.4)',
              }}
            />
            <video
              ref={videoRef}
              src="/videos/raven-rotate.mp4"
              autoPlay
              muted
              playsInline
              onEnded={handleEnded}
              className="w-full h-full object-contain relative z-10"
              style={{ filter: 'drop-shadow(0 0 40px rgba(124,58,237,0.65))' }}
            />
          </motion.div>

          {/* Tagline — fades in after 0.5s */}
          <motion.div
            className="text-center mt-6 space-y-1"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
          >
            <p className="text-[11px] font-display font-light tracking-[0.35em] text-white/35 uppercase">
              We don&apos;t follow trends.
            </p>
            <p className="text-base font-display font-semibold tracking-[0.2em] text-white uppercase">
              We <span className="text-gradient-violet-cyan">build</span> them.
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
      )}
    </AnimatePresence>
  );
}
