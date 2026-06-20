'use client';

/**
 * PricingSection — Services & Pricing
 * Premium Awwwards-grade layout with layered background, trust strip,
 * category tabs, USD/PKR toggle, animated card grid, and disclaimer.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CategoryTabs } from '@/components/ui/CategoryTabs';
import { CurrencyToggle } from '@/components/ui/CurrencyToggle';
import { PriceCard } from '@/components/ui/PriceCard';
import { CATEGORIES, PRICING_CARDS } from '@/data/pricingData';
import type { CategoryKey, Currency } from '@/data/pricingData';

/* ─── Trust stat strip ──────────────────────────────────────────── */

const TRUST_STATS = [
  { value: '200+', label: 'Brands Scaled' },
  { value: '98%',  label: 'Client Retention' },
  { value: '5×',   label: 'Average ROI' },
  { value: '$18M+',label: 'Revenue Generated' },
];

/* ─── Per-category disclaimer ───────────────────────────────────── */

const CATEGORY_NOTES: Record<CategoryKey, string> = {
  BRAND_DESIGN: 'All deliverables include source files. Revisions are scoped per package — additional rounds quoted separately.',
  GROWTH_ADS:   'Management fee covers strategy, creative, optimisation, and reporting. Media spend is billed directly by the ad platform.',
  SEO:          'Retainers billed monthly. Results compound over 3–6 months. GEO / AI-search optimisation included at no extra charge.',
  ECOMMERCE:    'Setup fees are per platform. Bulk listing rates available for 50+ SKUs — request a custom scope call.',
  WEB_DEV:      'All builds use Next.js 14 + TypeScript, optimised for Core Web Vitals. Includes 30 days of post-launch support.',
};

/* ─── Section ───────────────────────────────────────────────────── */

export function PricingSection() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('BRAND_DESIGN');
  const [currency, setCurrency] = useState<Currency>('USD');

  const visibleCards = PRICING_CARDS.filter((c) => c.category === activeCategory);
  const accentColor = CATEGORIES.find((c) => c.key === activeCategory)?.color ?? '#7C3AED';

  return (
    <section id="pricing" className="relative py-36 px-4 md:px-8 lg:px-16 overflow-hidden">

      {/* ── Background layers ──────────────────────────── */}

      {/* Thin top separator */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(124,58,237,0.45) 50%, transparent 100%)' }}
      />

      {/* Ambient orbs */}
      <div className="absolute -top-40 -left-32 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.09) 0%, transparent 70%)', filter: 'blur(1px)' }} />
      <div className="absolute bottom-0 -right-32 w-[420px] h-[420px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.07) 0%, transparent 70%)', filter: 'blur(1px)' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(124,58,237,0.04) 0%, transparent 70%)' }} />

      {/* Subtle grid mesh */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 90% 70% at 50% 30%, black 0%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 70% at 50% 30%, black 0%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* ── Section header ────────────────────────────── */}
        <div className="text-center mb-16">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-violet/70" />
            <span className="text-[10.5px] font-semibold tracking-[0.3em] uppercase text-violet/80">
              Services & Pricing
            </span>
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-violet/70" />
          </motion.div>

          {/* Main headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-bold text-fluid-3xl leading-none tracking-tight mb-5"
          >
            <span className="text-white">Invest in </span>
            <span className="text-gradient-gold">growth.</span>
          </motion.h2>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.25 }}
            className="text-white/45 text-base max-w-lg mx-auto leading-relaxed"
          >
            Premium-value packages — below US-agency rates, above average results.
            Karachi-based, globally delivered.
          </motion.p>
        </div>

        {/* ── Trust stat strip ──────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 mb-16"
        >
          {TRUST_STATS.map((s, i) => (
            <div key={i} className="flex items-center gap-3">
              {i > 0 && <div className="hidden sm:block h-7 w-px bg-white/10" />}
              <div className="text-center">
                <p className="font-display font-bold text-xl text-white leading-none">{s.value}</p>
                <p className="text-[10px] text-white/35 tracking-wider uppercase mt-0.5">{s.label}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* ── Controls row ──────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-2"
        >
          <CategoryTabs active={activeCategory} onChange={setActiveCategory} />
          <div className="sm:flex-shrink-0 pb-px">
            <CurrencyToggle value={currency} onChange={setCurrency} />
          </div>
        </motion.div>

        {/* ── Card grid ─────────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="mt-10"
          >
            {/* Desktop grid — max 3 cols to keep cards spacious */}
            <div className="hidden sm:grid items-stretch gap-6 grid-cols-2 lg:grid-cols-3">
              {visibleCards.map((card, i) => (
                <PriceCard key={card.id} card={card} currency={currency} index={i} />
              ))}
            </div>

            {/* Mobile snap carousel */}
            <div className="sm:hidden flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory -mx-4 px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {visibleCards.map((card, i) => (
                <div key={card.id} className="flex-shrink-0 w-[82vw] max-w-[320px] snap-start">
                  <PriceCard card={card} currency={currency} index={i} />
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── Category note ─────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + '-note'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-8"
          >
            <p
              className="text-[11px] text-white/28 leading-relaxed border-l-2 pl-3.5 max-w-2xl"
              style={{ borderColor: `${accentColor}45` }}
            >
              {CATEGORY_NOTES[activeCategory]}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* ── Disclaimer ────────────────────────────────── */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-8 text-center text-[10.5px] text-white/22 max-w-2xl mx-auto leading-relaxed"
        >
          Prices are starting points. Final quotes are scoped to your project.
          Ad management fees exclude media / ad spend. Multi-platform bundles: 2 platforms 10% off · 3+ platforms 15% off.
        </motion.p>

        {/* ── Bottom CTA strip ──────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="mt-20 relative"
        >
          {/* Background strip */}
          <div
            className="rounded-2xl px-8 py-10 text-center"
            style={{
              background: 'linear-gradient(135deg, rgba(124,58,237,0.12) 0%, rgba(13,27,62,0.4) 50%, rgba(34,211,238,0.06) 100%)',
              border: '1px solid rgba(124,58,237,0.2)',
              boxShadow: 'inset 0 0 60px rgba(124,58,237,0.06)',
            }}
          >
            <p className="text-white/55 text-sm mb-1">Not sure which package fits your goals?</p>
            <p className="text-white/80 font-medium text-base mb-6">
              Every RAVENTECH engagement starts with a free scope call.
            </p>
            <a
              href="#contact"
              data-cursor-scale="2"
              data-cursor-label="Let's Talk"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-semibold text-white transition-all duration-250"
              style={{
                background: 'linear-gradient(135deg, #7C3AED 0%, #5b21b6 100%)',
                boxShadow: '0 0 24px rgba(124,58,237,0.45), 0 4px 16px rgba(0,0,0,0.3)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 36px rgba(124,58,237,0.65), 0 4px 20px rgba(0,0,0,0.3)';
                (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 24px rgba(124,58,237,0.45), 0 4px 16px rgba(0,0,0,0.3)';
                (e.currentTarget as HTMLAnchorElement).style.transform = '';
              }}
            >
              Let's scope it together
              <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
