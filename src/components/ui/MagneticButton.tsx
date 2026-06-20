'use client';

/**
 * MagneticButton — Button that magnetically follows the cursor
 * Uses Framer Motion spring for smooth following effect
 */

import { useRef, useState, useCallback } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { useIsTouch } from '@/hooks/useReducedMotion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  label?: string;
  /** For cursor label */
  cursorLabel?: string;
  cursorColor?: string;
  disabled?: boolean;
}

export function MagneticButton({
  children,
  className = '',
  strength = 0.4,
  onClick,
  href,
  variant = 'primary',
  label,
  cursorLabel,
  cursorColor,
  disabled = false,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouch();

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current || isTouch) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set((e.clientX - centerX) * strength);
      y.set((e.clientY - centerY) * strength);
    },
    [x, y, strength, isTouch]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const variants = {
    primary:
      'bg-violet hover:bg-violet-600 text-white glow-violet px-8 py-4 rounded-full font-display font-semibold text-fluid-base tracking-wide',
    secondary:
      'bg-cyan/10 hover:bg-cyan/20 text-cyan border border-cyan/30 px-8 py-4 rounded-full font-display font-semibold text-fluid-base tracking-wide',
    ghost:
      'text-white hover:text-cyan px-6 py-3 font-display font-medium text-fluid-base',
    outline:
      'border border-white/20 hover:border-violet text-white hover:text-violet px-8 py-4 rounded-full font-display font-semibold text-fluid-base tracking-wide',
  };

  const inner = (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative inline-flex items-center justify-center"
      data-cursor-label={cursorLabel}
      data-cursor-scale="2"
    >
      <motion.button
        onClick={onClick}
        disabled={disabled}
        aria-label={label}
        className={`relative inline-flex items-center justify-center gap-3 transition-all duration-300 ${variants[variant]} ${className} ${disabled ? 'opacity-50 pointer-events-none' : ''}`}
        whileTap={{ scale: 0.96 }}
      >
        {/* Shimmer effect */}
        <motion.span
          className="absolute inset-0 rounded-full overflow-hidden pointer-events-none"
          initial={{ opacity: 0 }}
        >
          <motion.span
            className="absolute top-0 left-[-100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
            animate={{ left: ['−100%', '200%'] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'linear', repeatDelay: 1 }}
          />
        </motion.span>
        {children}
      </motion.button>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} className="inline-block">
        {inner}
      </a>
    );
  }

  return inner;
}

/** Arrow icon for CTA buttons */
export function ArrowRight({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`w-5 h-5 ${className}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}
