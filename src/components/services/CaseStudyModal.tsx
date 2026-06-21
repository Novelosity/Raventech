'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { PortfolioProject } from '@/data/serviceData';

interface CaseStudyModalProps {
  project: PortfolioProject | null;
  accent: 'violet' | 'cyan' | 'gold';
  onClose: () => void;
}

const accentStyles = {
  violet: { pill: 'bg-violet/15 text-violet', border: 'border-violet/20', metric: 'text-violet' },
  cyan: { pill: 'bg-cyan/15 text-cyan', border: 'border-cyan/20', metric: 'text-cyan' },
  gold: { pill: 'bg-gold/15 text-gold', border: 'border-gold/20', metric: 'text-gold' },
};

// Count-up hook
function useCountUp(target: number, duration: number, trigger: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) { setCount(0); return; }
    if (target === 0) { setCount(0); return; }
    let rafId: number;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [target, duration, trigger]);
  return count;
}

function extractNumber(str: string): number {
  const clean = str.replace(/[^0-9.]/g, '');
  return parseFloat(clean) || 0;
}

// Metric counter card
function MetricCounter({
  metric,
  trigger,
  accent,
}: {
  metric: { label: string; value: string; unit?: string };
  trigger: boolean;
  accent: 'violet' | 'cyan' | 'gold';
}) {
  const num = extractNumber(metric.value);
  const count = useCountUp(num, 1400, trigger);
  const prefix = metric.value.startsWith('+') ? '+' : metric.value.startsWith('-') ? '-' : '';
  const colors = accentStyles[accent];

  return (
    <div className="glass rounded-xl p-4 text-center border border-white/5">
      <div className={`font-headline font-black text-2xl md:text-3xl ${colors.metric} mb-1`}>
        {prefix}{num % 1 !== 0 ? metric.value : count.toLocaleString()}
        {metric.unit && <span className="text-lg">{metric.unit}</span>}
      </div>
      <div className="text-white/40 text-xs font-display">{metric.label}</div>
    </div>
  );
}

// Before/After slider
function BeforeAfterSlider({
  beforeLabel,
  afterLabel,
  gradient,
}: {
  beforeLabel: string;
  afterLabel: string;
  gradient: string;
}) {
  const [dividerX, setDividerX] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updateDivider = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100));
    setDividerX(pct);
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (dragging.current) updateDivider(e.clientX);
  };
  const onPointerUp = () => { dragging.current = false; };

  return (
    <div className="mt-8">
      <p className="text-xs font-display tracking-[0.25em] uppercase text-white/35 mb-3">
        Before / After
      </p>
      <div
        ref={containerRef}
        className="relative h-40 md:h-52 rounded-xl overflow-hidden border border-white/8 select-none"
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        {/* Before */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'rgba(10,10,15,0.8)' }}>
          <span className="text-white/30 text-xs font-display text-center px-4">{beforeLabel}</span>
        </div>

        {/* After */}
        <div
          className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br ${gradient} overflow-hidden`}
          style={{ clipPath: `inset(0 ${100 - dividerX}% 0 0)` }}
        >
          <div className="absolute inset-0 opacity-30 bg-black" />
          <span className="relative text-white text-xs font-display text-center px-4">{afterLabel}</span>
        </div>

        {/* Divider */}
        <div
          className="absolute inset-y-0 w-px bg-white/60 cursor-ew-resize"
          style={{ left: `${dividerX}%` }}
          onPointerDown={onPointerDown}
        >
          {/* Handle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-lg">
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
              <path d="M1 5h12M4 2L1 5l3 3M10 2l3 3-3 3" stroke="#0A0A0F" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute bottom-2 left-3 text-[10px] font-display text-white/40">Before</div>
        <div className="absolute bottom-2 right-3 text-[10px] font-display text-white/70">After</div>
      </div>
    </div>
  );
}

export function CaseStudyModal({ project, accent, onClose }: CaseStudyModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const colors = accentStyles[accent];

  useEffect(() => {
    setIsOpen(!!project);
  }, [project]);

  // Escape key
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [project, onClose]);

  // Lock body scroll
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-void/85 backdrop-blur-md"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal panel */}
          <motion.div
            key={`modal-${project.id}`}
            initial={{ opacity: 0, scale: 0.93, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', damping: 30, stiffness: 280 }}
            className="fixed inset-3 md:inset-8 lg:inset-12 z-[101] glass-dark rounded-2xl overflow-hidden flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full glass flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all"
              aria-label="Close modal"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            {/* Scrollable content */}
            <div className="overflow-y-auto flex-1">
              {/* Hero gradient */}
              <div
                className={`relative w-full bg-gradient-to-br ${project.thumbnailGradient} flex items-end`}
                style={{ minHeight: '200px', height: '28vh', maxHeight: '300px' }}
              >
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute top-3 left-4">
                  <span className="px-2 py-0.5 rounded-full bg-black/50 text-white/50 text-[10px] font-display tracking-wider">
                    Sample / Concept
                  </span>
                </div>
                <div className="relative z-10 p-6 md:p-8">
                  <h2 className="font-headline font-bold text-white text-xl md:text-3xl leading-tight">
                    {project.title}
                  </h2>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 md:p-8 space-y-8">
                {/* Chips row */}
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full glass text-white/60 text-xs font-display">
                    {project.client}
                  </span>
                  <span className="px-3 py-1 rounded-full glass text-white/50 text-xs font-display">
                    {project.niche}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-display font-bold ${colors.pill}`}>
                    {project.metric}
                  </span>
                </div>

                {/* Challenge / Approach / Result */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { label: 'Challenge', body: project.challenge },
                    { label: 'Approach', body: project.approach },
                    { label: 'Result', body: project.result },
                  ].map((section) => (
                    <div key={section.label}>
                      <p className="text-[10px] font-display tracking-[0.3em] uppercase text-white/35 mb-2">
                        {section.label}
                      </p>
                      <p className="text-white/65 text-sm font-body leading-relaxed">
                        {section.body}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Metric counters */}
                <div>
                  <p className="text-[10px] font-display tracking-[0.3em] uppercase text-white/35 mb-3">
                    Key Metrics
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {project.metrics.map((m) => (
                      <MetricCounter key={m.label} metric={m} trigger={isOpen} accent={accent} />
                    ))}
                  </div>
                </div>

                {/* Before/After slider */}
                {project.hasBeforeAfter && project.beforeLabel && project.afterLabel && (
                  <BeforeAfterSlider
                    beforeLabel={project.beforeLabel}
                    afterLabel={project.afterLabel}
                    gradient={project.thumbnailGradient}
                  />
                )}

                {/* Tools */}
                <div>
                  <p className="text-[10px] font-display tracking-[0.3em] uppercase text-white/35 mb-3">
                    Tools & Tech
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map((tool) => (
                      <span
                        key={tool}
                        className="px-3 py-1.5 rounded-full glass border border-white/8 text-white/55 text-xs font-display"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="pt-4 border-t border-white/5 flex justify-center">
                  <a
                    href="/#contact"
                    onClick={onClose}
                    className="px-7 py-3 rounded-full bg-violet text-white font-display font-semibold text-sm tracking-wider hover:bg-violet/80 transition-all duration-300 hover:scale-105"
                  >
                    Start a Similar Project →
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
