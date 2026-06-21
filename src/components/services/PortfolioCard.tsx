'use client';

import { motion } from 'framer-motion';
import type { PortfolioProject } from '@/data/serviceData';

interface PortfolioCardProps {
  project: PortfolioProject;
  accent: 'violet' | 'cyan' | 'gold';
  onClick: () => void;
  index: number;
}

const accentGlow = {
  violet: {
    box: '0 0 0 1px rgba(124,58,237,0.5), 0 0 40px rgba(124,58,237,0.25)',
    bg: 'rgba(124,58,237,0.15)',
    text: '#7C3AED',
    pill: 'bg-violet/20 text-violet',
  },
  cyan: {
    box: '0 0 0 1px rgba(34,211,238,0.5), 0 0 40px rgba(34,211,238,0.25)',
    bg: 'rgba(34,211,238,0.12)',
    text: '#22D3EE',
    pill: 'bg-cyan/20 text-cyan',
  },
  gold: {
    box: '0 0 0 1px rgba(245,197,24,0.5), 0 0 40px rgba(245,197,24,0.2)',
    bg: 'rgba(245,197,24,0.12)',
    text: '#F5C518',
    pill: 'bg-gold/20 text-gold',
  },
};

// CSS-only geometric decorative pattern for thumbnails
function GeometricPattern() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-20"
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="200" cy="150" r="80" stroke="white" strokeWidth="1" />
      <circle cx="200" cy="150" r="120" stroke="white" strokeWidth="0.5" />
      <polygon points="200,70 270,200 130,200" stroke="white" strokeWidth="1" fill="none" />
      <rect x="155" y="105" width="90" height="90" stroke="white" strokeWidth="0.8" fill="none" transform="rotate(45 200 150)" />
      <circle cx="200" cy="150" r="12" fill="white" opacity="0.3" />
      <line x1="80" y1="150" x2="320" y2="150" stroke="white" strokeWidth="0.4" />
      <line x1="200" y1="30" x2="200" y2="270" stroke="white" strokeWidth="0.4" />
    </svg>
  );
}

export function PortfolioCard({ project, accent, onClick, index }: PortfolioCardProps) {
  const colors = accentGlow[accent];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ delay: index * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick()}
      role="button"
      tabIndex={0}
      aria-label={`View case study: ${project.title}`}
      className="relative rounded-2xl overflow-hidden cursor-pointer"
      style={{ aspectRatio: '4/3' }}
      data-cursor-scale="1.5"
      data-cursor-label="VIEW"
    >
      {/* Thumbnail gradient bg */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${project.thumbnailGradient}`}
      />

      {/* Geometric SVG pattern */}
      <GeometricPattern />

      {/* "Sample / Concept" badge */}
      <div className="absolute top-3 left-3 z-10">
        <span className="px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-sm text-white/60 text-[10px] font-display tracking-wider">
          Sample / Concept
        </span>
      </div>

      {/* Bottom content overlay */}
      <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-void/95 via-void/60 to-transparent p-4 md:p-5">
        <div className="text-white/40 text-[10px] font-display tracking-wider uppercase mb-1">
          {project.niche}
        </div>
        <div className="font-display font-semibold text-white text-sm md:text-base leading-snug mb-2">
          {project.title}
        </div>

        {/* Headline metric */}
        <span
          className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-display font-bold ${colors.pill}`}
        >
          {project.metric}
        </span>
      </div>

      {/* Hover reveal overlay */}
      <motion.div
        className="absolute inset-0 z-20 flex flex-col items-center justify-center p-5 backdrop-blur-sm"
        style={{ background: colors.bg }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.22 }}
      >
        {/* Metrics */}
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          {project.metrics.slice(0, 3).map((m) => (
            <span
              key={m.label}
              className="px-2.5 py-1 rounded-full glass text-white text-xs font-display"
            >
              <span className="font-bold" style={{ color: colors.text }}>{m.value}{m.unit}</span>{' '}
              <span className="text-white/50">{m.label}</span>
            </span>
          ))}
        </div>
        <span className="font-display text-sm font-semibold tracking-wide" style={{ color: colors.text }}>
          View Case Study →
        </span>
      </motion.div>

      {/* Neon glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        initial={{ boxShadow: 'none' }}
        whileHover={{ boxShadow: colors.box }}
        transition={{ duration: 0.22 }}
      />
    </motion.div>
  );
}
