'use client';

/**
 * ScrollScene — Wrapper that pins a section during 3D scroll animation
 * Provides scroll-driven reveal for DOM content synced with R3F scenes
 */

import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface ScrollSceneProps {
  children: React.ReactNode;
  className?: string;
  /** Sticky height in viewport units (default: 100) */
  stickyHeight?: number;
  id?: string;
}

export function ScrollScene({
  children,
  className = '',
  stickyHeight = 100,
  id,
}: ScrollSceneProps) {
  return (
    <section
      id={id}
      className={`relative ${className}`}
      style={{ minHeight: `${stickyHeight}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        {children}
      </div>
    </section>
  );
}

interface ParallaxProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

/** Parallax wrapper for individual elements */
export function Parallax({ children, speed = 0.5, className = '' }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

/** Section reveal container */
export function SectionReveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
