'use client';

/**
 * RevealText — Animated text reveal with staggered char/word/line modes
 * Props: text, mode, delay, className, as, once
 */

import { motion, Variants } from 'framer-motion';
import { splitChars, splitWords } from '@/lib/utils';

type RevealMode = 'chars' | 'words' | 'lines' | 'fade';

interface RevealTextProps {
  text: string;
  mode?: RevealMode;
  delay?: number;
  stagger?: number;
  className?: string;
  charClassName?: string;
  as?: keyof JSX.IntrinsicElements;
  once?: boolean;
  threshold?: number;
  duration?: number;
  /** y offset for slide-up animation */
  yOffset?: number;
}

const charVariants: Variants = {
  hidden: { opacity: 0, y: '110%', rotateX: -30 },
  visible: (i: number) => ({
    opacity: 1,
    y: '0%',
    rotateX: 0,
    transition: {
      duration: 0.6,
      delay: i,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: i,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const fadeVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export function RevealText({
  text,
  mode = 'chars',
  delay = 0,
  stagger = 0.03,
  className = '',
  charClassName = '',
  as: Tag = 'span',
  once = true,
  threshold = 0.3,
  duration = 0.6,
  yOffset = 110,
}: RevealTextProps) {
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  if (mode === 'fade') {
    return (
      <motion.span
        className={className}
        variants={fadeVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount: threshold }}
      >
        {text}
      </motion.span>
    );
  }

  if (mode === 'words') {
    const words = splitWords(text);
    return (
      <motion.span
        className={`inline-flex flex-wrap gap-x-[0.25em] ${className}`}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount: threshold }}
        aria-label={text}
      >
        {words.map(({ word, i }) => (
          <span key={i} className="overflow-hidden inline-block">
            <motion.span
              className={`inline-block ${charClassName}`}
              variants={wordVariants}
              custom={i * stagger + delay}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    );
  }

  // Default: chars
  const chars = splitChars(text);
  return (
    <motion.span
      className={`inline-flex flex-wrap ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      aria-label={text}
    >
      {chars.map(({ char, i }) => (
        <span key={i} className="overflow-hidden inline-block">
          <motion.span
            className={`inline-block ${char === ' ' ? 'w-[0.25em]' : ''} ${charClassName}`}
            variants={charVariants}
            custom={i * stagger + delay}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/** Highlight wrapper — wraps a word in gradient color */
export function Highlight({
  children,
  color = 'violet-cyan',
}: {
  children: React.ReactNode;
  color?: 'violet-cyan' | 'gold' | 'cyan';
}) {
  const gradients = {
    'violet-cyan': 'text-gradient-violet-cyan',
    gold: 'text-gradient-gold',
    cyan: 'text-cyan-400',
  };
  return <span className={gradients[color]}>{children}</span>;
}
