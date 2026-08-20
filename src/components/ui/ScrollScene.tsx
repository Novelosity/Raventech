'use client';

/**
 * ScrollScene — Wrapper that pins a section during 3D scroll animation
 * Provides scroll-driven reveal for DOM content synced with R3F scenes
 */

import { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, MotionValue } from 'framer-motion';

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

/** Section reveal container — 3D lift-in from depth */
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
      initial={{ opacity: 0, y: 28, rotateX: 14, filter: 'blur(4px)' }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0.15 }}
      className={className}
      style={{ transformPerspective: 900 }}
    >
      {children}
    </motion.div>
  );
}

interface Parallax3DProps {
  children: React.ReactNode;
  /** Depth factor: higher = more dramatic parallax */
  depth?: number;
  /** Enable mouse-reactive tilt */
  tiltOnHover?: boolean;
  className?: string;
}

/**
 * Parallax3D — wraps content in CSS 3D perspective with scroll-driven depth
 * Layer system: depth 1 (far) → depth 5 (near)
 */
export function Parallax3D({
  children,
  depth = 1,
  tiltOnHover = false,
  className = '',
}: Parallax3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const translateY = useTransform(
    scrollYProgress,
    [0, 1],
    [`${depth * 18}%`, `${-depth * 18}%`]
  );
  const scaleVal = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1, 0.96]);

  // Mouse tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { damping: 25, stiffness: 100 });
  const springY = useSpring(mouseY, { damping: 25, stiffness: 100 });
  const rotY = useTransform(springX, [-1, 1], [-6 * depth, 6 * depth]);
  const rotX = useTransform(springY, [-1, 1], [4 * depth, -4 * depth]);

  return (
    <motion.div
      ref={ref}
      className={`parallax-track ${className}`}
      style={{
        y: translateY,
        scale: scaleVal,
        ...(tiltOnHover && {
          rotateX: rotX,
          rotateY: rotY,
          transformPerspective: 1000,
        }),
      }}
      onMouseMove={
        tiltOnHover
          ? (e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              mouseX.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
              mouseY.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
            }
          : undefined
      }
      onMouseLeave={
        tiltOnHover
          ? () => {
              mouseX.set(0);
              mouseY.set(0);
            }
          : undefined
      }
    >
      {children}
    </motion.div>
  );
}
