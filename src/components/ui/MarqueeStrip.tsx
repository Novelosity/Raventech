'use client';

/**
 * MarqueeStrip — Infinite scrolling marquee for service names
 */

import { motion } from 'framer-motion';

interface MarqueeStripProps {
  items: string[];
  speed?: number;
  direction?: 'left' | 'right';
  separator?: string;
  className?: string;
  itemClassName?: string;
}

export function MarqueeStrip({
  items,
  speed = 30,
  direction = 'left',
  separator = '✦',
  className = '',
  itemClassName = '',
}: MarqueeStripProps) {
  // Duplicate for seamless loop
  const doubled = [...items, ...items];
  const duration = items.length * speed;

  return (
    <div
      className={`relative overflow-hidden py-5 ${className}`}
      aria-hidden="true"
    >
      {/* Gradient fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-void to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-void to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex whitespace-nowrap"
        animate={{
          x: direction === 'left' ? [0, `-${100 / 2}%`] : [`-${100 / 2}%`, 0],
        }}
        transition={{
          duration,
          ease: 'linear',
          repeat: Infinity,
        }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-6 px-6">
            <span
              className={`text-fluid-base font-display font-medium tracking-widest uppercase ${itemClassName}`}
            >
              {item}
            </span>
            <span className="text-violet text-fluid-sm">{separator}</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/** Double-row marquee with opposing directions */
export function DoubleMarquee({ items }: { items: string[] }) {
  return (
    <div className="space-y-0 border-y border-white/5 my-0">
      <MarqueeStrip
        items={items}
        direction="left"
        className="border-b border-white/5"
        itemClassName="text-white/50"
        separator="—"
      />
      <MarqueeStrip
        items={[...items].reverse()}
        direction="right"
        itemClassName="text-violet/80"
        separator="✦"
      />
    </div>
  );
}
