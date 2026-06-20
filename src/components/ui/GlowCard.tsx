'use client';

/**
 * GlowCard — Glassmorphic card with mouse-tracking glow effect
 */

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  /** Enable tilt effect */
  tilt?: boolean;
  /** Enable hover glow border */
  border?: boolean;
}

export function GlowCard({
  children,
  className = '',
  glowColor = 'rgba(124, 58, 237, 0.4)',
  tilt = true,
  border = true,
}: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setGlowPos({ x, y });

    if (tilt) {
      const tiltX = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
      const tiltY = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
      setRotateX(tiltX);
      setRotateY(tiltY);
    }
  };

  const handleMouseLeave = () => {
    setGlowPos({ x: 50, y: 50 });
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX, rotateY }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
      className={`relative overflow-hidden glass rounded-2xl ${border ? 'border border-white/10 hover:border-violet/40' : ''} transition-colors duration-500 ${className}`}
    >
      {/* Glow spotlight */}
      <motion.div
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, ${glowColor} 0%, transparent 60%)`,
        }}
      />
      {children}
    </motion.div>
  );
}

/** Stat card variant */
export function StatCard({
  value,
  label,
  suffix = '',
  icon,
  color = 'violet',
}: {
  value: string | number;
  label: string;
  suffix?: string;
  icon?: React.ReactNode;
  color?: 'violet' | 'cyan' | 'gold';
}) {
  const colors = {
    violet: 'text-violet',
    cyan: 'text-cyan',
    gold: 'text-gold',
  };

  return (
    <GlowCard className="p-6 flex flex-col gap-2">
      {icon && <div className={`${colors[color]} mb-2`}>{icon}</div>}
      <div className={`text-fluid-2xl font-display font-bold ${colors[color]}`}>
        {value}
        <span className="text-fluid-lg">{suffix}</span>
      </div>
      <div className="text-fluid-sm text-white/60 font-body">{label}</div>
    </GlowCard>
  );
}
