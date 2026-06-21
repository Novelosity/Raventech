'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useIsTouch } from '@/hooks/useReducedMotion';
import type { ProcessStep } from '@/data/serviceData';

interface ProcessTimelineProps {
  steps: ProcessStep[];
  accent: 'violet' | 'cyan' | 'gold';
}

const accentColors = {
  violet: { text: 'text-violet', border: 'border-violet', dim: 'text-violet/30' },
  cyan: { text: 'text-cyan', border: 'border-cyan', dim: 'text-cyan/30' },
  gold: { text: 'text-gold', border: 'border-gold', dim: 'text-gold/30' },
};

function VerticalSteps({ steps, accent }: ProcessTimelineProps) {
  const colors = accentColors[accent];
  return (
    <section className="py-20 px-6 md:px-12 lg:px-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-xs font-display tracking-[0.32em] uppercase text-violet/80 mb-3">
            How It Works
          </p>
          <h2 className="text-fluid-2xl font-headline font-bold text-white">Our Process</h2>
        </motion.div>

        <div className="flex flex-col gap-0">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.08 }}
              className="relative flex gap-5 pb-8 last:pb-0"
            >
              {/* Vertical connector */}
              {i < steps.length - 1 && (
                <div className="absolute left-5 top-10 bottom-0 w-px bg-white/8" />
              )}

              {/* Number badge */}
              <div
                className={`shrink-0 w-10 h-10 rounded-full border ${colors.border} flex items-center justify-center ${colors.text} font-display font-bold text-xs z-10`}
              >
                {step.number}
              </div>

              {/* Content */}
              <div className="pt-1.5">
                <h3 className="font-display font-semibold text-white text-base mb-1">
                  {step.title}
                </h3>
                <p className="text-white/50 text-sm font-body leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProcessTimeline({ steps, accent }: ProcessTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouch();
  const colors = accentColors[accent];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Translate the inner track horizontally as we scroll through the sticky section
  const trackWidth = (steps.length - 1) * 100;
  const x = useTransform(scrollYProgress, [0, 1], ['0%', `-${trackWidth / steps.length}%`]);

  if (isTouch) {
    return <VerticalSteps steps={steps} accent={accent} />;
  }

  return (
    <section
      ref={containerRef}
      className="relative border-t border-white/5"
      style={{ height: `${steps.length * 80}vh` }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden py-20">
        {/* Header */}
        <div className="px-6 md:px-12 lg:px-20 mb-14 max-w-7xl mx-auto w-full">
          <p className="text-xs font-display tracking-[0.32em] uppercase text-violet/80 mb-3">
            How It Works
          </p>
          <h2 className="text-fluid-2xl font-headline font-bold text-white">Our Process</h2>
        </div>

        {/* Horizontal scrolling track */}
        <div className="overflow-visible pl-6 md:pl-12 lg:pl-20">
          <motion.div style={{ x }} className="flex gap-6 will-change-transform">
            {steps.map((step, i) => (
              <div
                key={step.number}
                className="glass rounded-2xl border border-white/5 p-7 md:p-8 shrink-0 relative"
                style={{ width: 'clamp(260px, 28vw, 380px)' }}
              >
                {/* Step number — large and dimmed */}
                <div className={`font-headline font-black text-5xl mb-4 ${colors.dim}`}>
                  {step.number}
                </div>
                <h3 className="font-display font-semibold text-white text-lg mb-3">
                  {step.title}
                </h3>
                <p className="text-white/50 text-sm font-body leading-relaxed">
                  {step.description}
                </p>

                {/* Connector dot */}
                {i < steps.length - 1 && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full flex items-center">
                    <div className="w-6 h-px bg-white/10" />
                    <div className={`w-1.5 h-1.5 rounded-full ${colors.text} opacity-40`} />
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
