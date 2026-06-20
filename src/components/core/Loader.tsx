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

          {/* Particle raven — using video reference */}
          <motion.div
            className="relative w-80 h-56 md:w-96 md:h-72 mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: phase === 'assembling' ? [0, 0.6, 1] : 1,
              scale: phase === 'assembling' ? [0.7, 1.05, 1] : 1,
            }}
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* SVG particle raven */}
            <svg
              viewBox="0 0 400 280"
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <filter id="glow-loader">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <radialGradient id="particle-grad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#22D3EE" />
                  <stop offset="100%" stopColor="#7C3AED" />
                </radialGradient>
              </defs>

              {/* Raven body outline with particles */}
              <g filter="url(#glow-loader)" opacity="0.9">
                {/* Body */}
                <motion.path
                  d="M200 140 C180 120 150 110 130 120 C110 130 100 150 110 170 C120 190 150 200 180 195 C210 190 230 175 240 160 C250 145 240 135 200 140Z"
                  fill="none"
                  stroke="url(#particle-grad)"
                  strokeWidth="1.5"
                  strokeDasharray="5 3"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.8, ease: "easeInOut" }}
                />
                {/* Wings */}
                <motion.path
                  d="M140 130 C120 115 90 105 60 115 C40 122 30 135 40 148 C55 155 80 145 100 135 C120 125 140 130 140 130Z"
                  fill="none"
                  stroke="#22D3EE"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.8 }}
                  transition={{ duration: 2, delay: 0.3, ease: "easeInOut" }}
                />
                <motion.path
                  d="M150 120 C140 100 135 75 145 55 C155 40 170 35 185 45 C195 55 195 75 185 90 C175 105 160 115 150 120Z"
                  fill="none"
                  stroke="#7C3AED"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.8 }}
                  transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
                />
                {/* Head & beak */}
                <motion.path
                  d="M240 140 C255 130 270 120 280 110 C285 105 270 95 260 100 C250 105 245 115 240 125 C242 128 242 135 240 140Z"
                  fill="none"
                  stroke="#22D3EE"
                  strokeWidth="1.5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, delay: 0.8, ease: "easeInOut" }}
                />
                {/* Tail */}
                <motion.path
                  d="M110 185 C95 195 80 210 70 225 C65 233 85 235 100 228 C115 220 120 205 118 190Z"
                  fill="none"
                  stroke="#7C3AED"
                  strokeWidth="1"
                  strokeDasharray="3 5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.7 }}
                  transition={{ duration: 1.5, delay: 1, ease: "easeInOut" }}
                />
              </g>

              {/* Particle dots scattered around raven */}
              {particlePositions.map((p, i) => (
                <motion.circle
                  key={i}
                  cx={p.x}
                  cy={p.y}
                  r={p.r}
                  fill={p.color}
                  filter="url(#glow-loader)"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: [0, p.opacity, p.opacity * 0.6], scale: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: p.delay,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    repeatDelay: Math.random() * 2,
                  }}
                />
              ))}

              {/* Connection lines */}
              {connectionLines.map((l, i) => (
                <motion.line
                  key={i}
                  x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
                  stroke="rgba(34,211,238,0.3)"
                  strokeWidth="0.5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.5, 0] }}
                  transition={{ duration: 2, delay: l.delay, repeat: Infinity }}
                />
              ))}
            </svg>
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

// Pre-generated particle positions around the raven form
const particlePositions = [
  { x: 200, y: 140, r: 2.5, opacity: 0.9, color: '#22D3EE', delay: 0.2 },
  { x: 155, y: 125, r: 1.5, opacity: 0.7, color: '#7C3AED', delay: 0.4 },
  { x: 130, y: 148, r: 2, opacity: 0.8, color: '#22D3EE', delay: 0.1 },
  { x: 240, y: 155, r: 1.5, opacity: 0.7, color: '#7C3AED', delay: 0.6 },
  { x: 80, y: 130, r: 1, opacity: 0.5, color: '#22D3EE', delay: 0.8 },
  { x: 60, y: 118, r: 1.5, opacity: 0.6, color: '#7C3AED', delay: 0.3 },
  { x: 170, y: 55, r: 2, opacity: 0.8, color: '#22D3EE', delay: 0.9 },
  { x: 185, y: 80, r: 1.5, opacity: 0.7, color: '#7C3AED', delay: 0.5 },
  { x: 270, y: 108, r: 1.5, opacity: 0.6, color: '#22D3EE', delay: 0.7 },
  { x: 100, y: 200, r: 1, opacity: 0.4, color: '#7C3AED', delay: 1.0 },
  { x: 75, y: 222, r: 1.5, opacity: 0.5, color: '#22D3EE', delay: 1.1 },
  { x: 180, y: 192, r: 2, opacity: 0.7, color: '#7C3AED', delay: 0.4 },
  { x: 40, y: 148, r: 1, opacity: 0.4, color: '#22D3EE', delay: 1.2 },
  { x: 250, y: 130, r: 1.5, opacity: 0.6, color: '#7C3AED', delay: 0.6 },
  { x: 210, y: 175, r: 2, opacity: 0.7, color: '#22D3EE', delay: 0.3 },
  { x: 145, y: 95, r: 1, opacity: 0.5, color: '#7C3AED', delay: 1.3 },
  { x: 110, y: 165, r: 2, opacity: 0.8, color: '#22D3EE', delay: 0.8 },
  { x: 280, y: 122, r: 1, opacity: 0.4, color: '#7C3AED', delay: 1.4 },
  { x: 190, y: 40, r: 1.5, opacity: 0.6, color: '#22D3EE', delay: 1.0 },
  { x: 50, y: 160, r: 1, opacity: 0.3, color: '#7C3AED', delay: 1.5 },
  { x: 230, y: 165, r: 1.5, opacity: 0.6, color: '#22D3EE', delay: 0.5 },
  { x: 160, y: 200, r: 1, opacity: 0.5, color: '#7C3AED', delay: 0.9 },
  { x: 95, y: 140, r: 2, opacity: 0.7, color: '#22D3EE', delay: 0.2 },
  { x: 120, y: 112, r: 1.5, opacity: 0.6, color: '#7C3AED', delay: 1.1 },
];

const connectionLines = [
  { x1: 200, y1: 140, x2: 155, y2: 125, delay: 0.3 },
  { x1: 155, y1: 125, x2: 130, y2: 148, delay: 0.5 },
  { x1: 130, y1: 148, x2: 80, y2: 130, delay: 0.7 },
  { x1: 200, y1: 140, x2: 240, y2: 155, delay: 0.4 },
  { x1: 240, y1: 155, x2: 270, y2: 108, delay: 0.6 },
  { x1: 170, y1: 55, x2: 185, y2: 80, delay: 0.8 },
  { x1: 185, y1: 80, x2: 200, y2: 140, delay: 1.0 },
  { x1: 80, y1: 130, x2: 60, y2: 118, delay: 0.9 },
];
