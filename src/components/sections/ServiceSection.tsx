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
    [0, 0.3, 0.7, 1],
    align === 'left' ? ['-30px', '0px', '0px', '-20px'] : ['30px', '0px', '0px', '20px']
  );
  const contentOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0, 1, 1, 0]);

  return (
    <section
      ref={ref}
      id={id}
      className="relative min-h-screen flex items-center section-pad"
    >
      <div className="w-full max-w-7xl mx-auto">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
            align === 'right' ? 'lg:grid-flow-dense' : ''
          }`}
        >
          {/* Content */}
          <motion.div
            style={{ x: contentX, opacity: contentOpacity }}
            className={`space-y-6 ${align === 'right' ? 'lg:col-start-2' : ''}`}
          >
            {/* Scene number */}
            <SectionReveal>
              <span className={`text-xs font-display font-medium tracking-[0.4em] uppercase ${accent} opacity-70`}>
                {sceneNo} — Service
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
                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${accent.replace('text-', 'bg-')}`} />
                    {f}
                  </motion.li>
                ))}
              </ul>
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
                <div className="relative rounded-2xl overflow-hidden border border-white/10">
                  <img
                    src={image}
                    alt={title}
                    className="w-full h-auto object-cover opacity-90"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-void/60 via-transparent to-transparent" />
                </div>
              </SectionReveal>
            )}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <SectionReveal key={i} delay={0.2 + i * 0.1}>
                  <StatCard
                    value={stat.val}
                    label={stat.label}
                    color={stat.color ?? 'violet'}
                  />
                </SectionReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
