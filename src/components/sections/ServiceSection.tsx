'use client';

/**
 * ServiceSection — Reusable section layout for all service scenes (SEO, SMM, Design, etc.)
 * Layout: left content panel + right image/stats
 */

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { RevealText, Highlight } from '@/components/ui/RevealText';
import { MagneticButton, ArrowRight } from '@/components/ui/MagneticButton';
import { GlowCard, StatCard } from '@/components/ui/GlowCard';
import { SectionReveal } from '@/components/ui/ScrollScene';

interface ServiceSectionProps {
  id: string;
  /** Scene number label */
  sceneNo: string;
  /** Main service name */
  title: string;
  titleHighlight?: string;
  /** Tagline */
  tagline: string;
  /** Description paragraph */
  description: string;
  /** Feature bullet points */
  features: string[];
  /** Stats to show */
  stats: { val: string; label: string; color?: 'violet' | 'cyan' | 'gold' }[];
  /** Layout: content on left or right */
  align?: 'left' | 'right';
  /** Primary accent color class */
  accent?: string;
  image?: string;
}

export function ServiceSection({
  id,
  sceneNo,
  title,
  titleHighlight,
  tagline,
  description,
  features,
  stats,
  align = 'left',
  accent = 'text-violet',
  image,
}: ServiceSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const contentX = useTransform(
    scrollYProgress,
    [0, 0.3, 1],
    align === 'left' ? ['-32px', '0px', '0px'] : ['32px', '0px', '0px']
  );
  const contentY = useTransform(scrollYProgress, [0.05, 0.3, 1], ['20px', '0px', '0px']);
  const contentOpacity = useTransform(scrollYProgress, [0.05, 0.25, 1], [0, 1, 1]);

  return (
    <section
      ref={ref}
      id={id}
      className="relative min-h-screen flex items-center section-pad overflow-hidden"
    >
      {/* Decorative scene number — large ghost text */}
      <div
        className="scene-number absolute top-1/2 -translate-y-1/2 select-none pointer-events-none"
        style={{
          [align === 'left' ? 'right' : 'left']: '2%',
          opacity: 0.035,
        }}
        aria-hidden="true"
      >
        {sceneNo}
      </div>

      <div className="w-full max-w-7xl mx-auto perspective-scene">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
            align === 'right' ? 'lg:grid-flow-dense' : ''
          }`}
        >
          {/* Content */}
          <motion.div
            style={{ x: contentX, opacity: contentOpacity, y: contentY }}
            className={`space-y-6 ${align === 'right' ? 'lg:col-start-2' : ''}`}
          >
            {/* Scene number */}
            <SectionReveal>
              <span className={`text-xs font-display font-medium tracking-[0.4em] uppercase ${accent} opacity-70`}>
                SERVICE {sceneNo}
              </span>
            </SectionReveal>

            {/* Tagline */}
            <SectionReveal delay={0.05}>
              <h2
                className="font-headline font-extrabold leading-tight"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
              >
                <RevealText text={tagline} mode="words" className="text-white" />
              </h2>
            </SectionReveal>

            {/* Title badge */}
            <SectionReveal delay={0.1}>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-current opacity-50" />
                <span className={`text-sm font-display font-semibold tracking-widest uppercase ${accent}`}>
                  {title}{titleHighlight && ` — ${titleHighlight}`}
                </span>
              </div>
            </SectionReveal>

            {/* Description */}
            <SectionReveal delay={0.15}>
              <p className="text-white/60 font-body leading-relaxed" style={{ fontSize: 'clamp(1rem, 1.5vw, 1.15rem)' }}>
                {description}
              </p>
            </SectionReveal>

            {/* Features */}
            <SectionReveal delay={0.2}>
              <ul className="space-y-3">
                {features.map((f, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.08 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 text-white/70 font-body text-sm"
                  >
                    <svg className={`w-4 h-4 flex-shrink-0 ${accent}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {f}
                  </motion.li>
                ))}
              </ul>
            </SectionReveal>

            {/* Key result callout */}
            <SectionReveal delay={0.28}>
              <div className={`rounded-xl border bg-white/[0.03] p-4 flex items-start gap-3 ${accent === 'text-cyan' ? 'border-cyan/15' : accent === 'text-gold' ? 'border-gold/15' : 'border-violet/15'}`}>
                <svg className={`w-5 h-5 mt-0.5 flex-shrink-0 ${accent}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
                <p className="text-white/55 font-body text-sm leading-relaxed">
                  <span className={`font-semibold ${accent}`}>Typical result:</span>{' '}
                  {stats[0]?.val} {stats[0]?.label?.toLowerCase()} achieved within the first 6 months — measured, reported, and guaranteed in your contract.
                </p>
              </div>
            </SectionReveal>

            {/* CTA */}
            <SectionReveal delay={0.35}>
              <MagneticButton
                variant="secondary"
                className="mt-2"
                cursorLabel="LEARN"
              >
                Learn More <ArrowRight />
              </MagneticButton>
            </SectionReveal>
          </motion.div>

          {/* Stats / Image Panel */}
          <div className={`space-y-4 ${align === 'right' ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
            {image && (
              <SectionReveal delay={0.1}>
                <div className="relative rounded-2xl overflow-hidden border border-white/10" style={{ aspectRatio: '16/10' }}>
                  <img
                    src={image}
                    alt={title}
                    className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-700 hover:scale-[1.07]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-void/70 via-void/10 to-transparent pointer-events-none" />
                </div>
              </SectionReveal>
            )}
            <div className="grid grid-cols-2 gap-4 preserve-3d">
              {stats.map((stat, i) => (
                <SectionReveal key={i} delay={0.2 + i * 0.1}>
                  <motion.div
                    whileHover={{
                      scale: 1.04,
                      rotateX: -4,
                      rotateY: i % 2 === 0 ? 4 : -4,
                      z: 20,
                    }}
                    style={{ transformStyle: 'preserve-3d', perspective: 600 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                  >
                    <StatCard
                      value={stat.val}
                      label={stat.label}
                      color={stat.color ?? 'violet'}
                    />
                  </motion.div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
