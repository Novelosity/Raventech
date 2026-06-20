'use client';

/**
 * PriceCard — Premium pricing card
 * - Rich dark glass panel with accent gradient depth
 * - Animated count-up on scroll-enter
 * - AnimatePresence USD ↔ PKR cross-fade
 * - Floating gold "Most Popular" badge
 * - Neon edge + lift on hover
 * - Staggered clip-path reveal
 */

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import type { PricingCard as PricingCardData, Currency } from '@/data/pricingData';

/* ─── Count-up ──────────────────────────────────────────────────── */

function parsePriceNum(str: string): number | null {
  const m = str.match(/[\d,]+/);
  if (!m) return null;
  return parseInt(m[0].replace(/,/g, ''), 10);
}

function rebuildPrice(original: string, count: number): string {
  return original.replace(/[\d,]+/, count.toLocaleString('en-US'));
}

function CountUpPrice({ priceStr, inView }: { priceStr: string; inView: boolean }) {
  const target = parsePriceNum(priceStr);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView || target === null) return;
    let startTs: number | null = null;
    let raf: number;
    const DURATION = 1200;

    const tick = (ts: number) => {
      if (!startTs) startTs = ts;
      const p = Math.min((ts - startTs) / DURATION, 1);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    setCount(0);
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, priceStr]);

  if (target === null) return <>{priceStr}</>;
  return <>{rebuildPrice(priceStr, count)}</>;
}

/* ─── PriceCard ─────────────────────────────────────────────────── */

interface PriceCardProps {
  card: PricingCardData;
  currency: Currency;
  index: number;
}

export function PriceCard({ card, currency, index }: PriceCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px 0px' });

  const priceStr = currency === 'USD' ? card.pricePrimary.usd : card.pricePrimary.pkr;
  const altPriceStr = card.altPrice
    ? currency === 'USD' ? card.altPrice.usd : card.altPrice.pkr
    : null;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 56, clipPath: 'inset(40% 0% 60% 0% round 24px)' }}
      animate={inView ? { opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0% round 24px)' } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col h-full group"
    >
      {/* ── Most Popular floating badge ────────────────── */}
      {card.isMostPopular && (
        <div className="absolute -top-4 left-0 right-0 flex justify-center z-30 pointer-events-none">
          <motion.span
            initial={{ opacity: 0, scale: 0.8, y: 4 }}
            animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ delay: index * 0.08 + 0.4, duration: 0.4, ease: 'backOut' }}
            className="inline-flex items-center gap-1.5 px-3.5 py-[5px] rounded-full text-[9.5px] font-bold tracking-[0.18em] uppercase"
            style={{
              background: 'linear-gradient(135deg, #F5C518 0%, #FFD93D 100%)',
              color: '#0A0A0F',
              boxShadow: '0 0 20px rgba(245,197,24,0.55), 0 2px 10px rgba(0,0,0,0.4)',
            }}
          >
            <svg viewBox="0 0 10 10" fill="currentColor" width="8" height="8">
              <path d="M5 1l1.1 2.2L9 3.6 7 5.5l.5 3L5 7.2 2.5 8.5 3 5.5 1 3.6l2.9-.4z" />
            </svg>
            Most Popular
          </motion.span>
        </div>
      )}

      {/* ── Card shell ───────────────────────────────── */}
      <CardShell accent={card.accentColor} popular={card.isMostPopular}>
        {/* Service name */}
        <h3 className="font-headline text-[15px] font-semibold text-white leading-snug mb-1">
          {card.name}
        </h3>

        {/* Tagline */}
        <p className="text-white/40 text-[11.5px] italic leading-relaxed mb-5">
          "{card.tagline}"
        </p>

        {/* ── Price ──────────────────────────────────── */}
        <div className="mb-5">
          <span className="text-[9.5px] text-white/30 uppercase tracking-[0.22em] block mb-2">
            {card.pricePrefix}
          </span>

          <AnimatePresence mode="wait">
            <motion.div
              key={currency + priceStr}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="flex flex-wrap items-end gap-x-2 gap-y-1"
            >
              <span
                className="text-[2.75rem] font-display font-bold leading-none tabular-nums"
                style={{
                  background: `linear-gradient(135deg, ${card.accentColor} 0%, #ffffff 130%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: `drop-shadow(0 0 12px ${card.accentColor}60)`,
                }}
              >
                <CountUpPrice priceStr={priceStr} inView={inView} />
              </span>

              <div className="flex flex-col pb-1">
                {card.priceSuffix && (
                  <span className="text-[11px] text-white/35 leading-tight">{card.priceSuffix}</span>
                )}
                {card.priceNote && (
                  <span className="text-[10px] text-white/25 leading-tight">{card.priceNote}</span>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Alt price */}
          {card.altPriceLabel && altPriceStr && (
            <AnimatePresence mode="wait">
              <motion.div
                key={currency + (altPriceStr ?? '')}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="mt-2 inline-flex items-center gap-1.5"
              >
                <span className="text-[10px] text-white/25">{card.altPriceLabel}</span>
                <span
                  className="text-[11px] font-medium px-2 py-0.5 rounded-full"
                  style={{
                    background: `${card.accentColor}18`,
                    color: `${card.accentColor}cc`,
                    border: `1px solid ${card.accentColor}28`,
                  }}
                >
                  {altPriceStr === 'Custom Quote' ? altPriceStr : `from ${altPriceStr}`}
                </span>
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        {/* ── Divider ────────────────────────────────── */}
        <div
          className="h-px mb-5"
          style={{
            background: `linear-gradient(90deg, ${card.accentColor}40 0%, ${card.accentColor}10 60%, transparent 100%)`,
          }}
        />

        {/* ── Deliverables ───────────────────────────── */}
        <ul className="flex-1 space-y-2.5 mb-5">
          {card.deliverables.map((d, i) => (
            <li key={i} className="flex items-start gap-2.5 text-[12px] text-white/60 leading-relaxed">
              <span
                className="mt-[3px] flex-shrink-0 w-[14px] h-[14px] rounded-full inline-flex items-center justify-center"
                style={{
                  background: `${card.accentColor}28`,
                  boxShadow: `0 0 6px ${card.accentColor}30`,
                }}
              >
                <svg viewBox="0 0 10 8" fill="none" width="7" height="6">
                  <path d="M1 4l2.5 2.5L9 1" stroke={card.accentColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              {d}
            </li>
          ))}
        </ul>

        {/* ── Sub-options ────────────────────────────── */}
        {card.subOptions && (
          <div className="mb-4 rounded-xl overflow-hidden" style={{ border: `1px solid ${card.accentColor}18` }}>
            {card.subOptions.map((opt, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-3 py-2 text-[11px] border-b last:border-b-0"
                style={{
                  background: i % 2 === 0 ? `${card.accentColor}08` : 'transparent',
                  borderColor: `${card.accentColor}12`,
                }}
              >
                <span className="text-white/45 flex items-center gap-1.5">
                  <span style={{ color: `${card.accentColor}70` }}>›</span>
                  {opt.label}
                </span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currency + opt.usd}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="font-semibold tabular-nums"
                    style={{ color: card.accentColor }}
                  >
                    {currency === 'USD' ? opt.usd : opt.pkr}
                    {opt.suffix && (
                      <span className="text-white/30 font-normal ml-1 text-[10px]">{opt.suffix}</span>
                    )}
                  </motion.span>
                </AnimatePresence>
              </div>
            ))}
            {card.subNote && (
              <p className="text-[9.5px] text-white/25 px-3 py-2 italic">{card.subNote}</p>
            )}
          </div>
        )}

        {/* Standalone subNote */}
        {card.subNote && !card.subOptions && (
          <p className="text-[10px] text-white/28 mb-4 italic">{card.subNote}</p>
        )}

        {/* ── CTA ────────────────────────────────────── */}
        <a
          href="#contact"
          data-cursor-scale="1.5"
          data-cursor-label="Start"
          className="mt-auto block w-full text-center py-3 rounded-xl text-[12.5px] font-semibold tracking-wide transition-all duration-250 ease-out"
          style={{
            border: `1px solid ${card.accentColor}38`,
            color: card.accentColor,
            background: `${card.accentColor}0e`,
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.background = `${card.accentColor}22`;
            el.style.borderColor = `${card.accentColor}65`;
            el.style.boxShadow = `0 0 24px ${card.accentColor}28, inset 0 0 20px ${card.accentColor}08`;
            el.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.background = `${card.accentColor}0e`;
            el.style.borderColor = `${card.accentColor}38`;
            el.style.boxShadow = '';
            el.style.transform = '';
          }}
        >
          Get Started →
        </a>
      </CardShell>
    </motion.div>
  );
}

/* ─── CardShell ─────────────────────────────────────────────────── */

function CardShell({
  children,
  accent,
  popular,
}: {
  children: React.ReactNode;
  accent: string;
  popular?: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col h-full rounded-3xl p-6 overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, rgba(13,27,62,0.72) 0%, rgba(10,10,20,0.88) 100%)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: `1px solid ${hovered ? accent + '50' : accent + '1e'}`,
        boxShadow: hovered
          ? `0 0 0 1px ${accent}38, 0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${accent}18, inset 0 0 80px ${accent}06`
          : `0 0 0 1px ${accent}0e, 0 8px 32px rgba(0,0,0,0.45)`,
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease, border-color 0.3s ease',
      }}
    >
      {/* Top accent glow bar */}
      <div
        className="absolute top-0 left-6 right-6 h-[1.5px]"
        style={{
          background: `linear-gradient(90deg, transparent, ${accent}${hovered ? 'ee' : '88'}, transparent)`,
          boxShadow: hovered ? `0 0 12px ${accent}60` : 'none',
          transition: 'box-shadow 0.3s ease',
          borderRadius: '0 0 4px 4px',
        }}
      />

      {/* Radial glow inside card top */}
      <div
        className="absolute top-0 left-0 right-0 h-40 pointer-events-none rounded-t-3xl"
        style={{
          background: `radial-gradient(ellipse 80% 100% at 50% 0%, ${accent}${popular ? '12' : '08'} 0%, transparent 100%)`,
        }}
      />

      {/* Corner dot accent */}
      <div
        className="absolute top-5 right-5 w-1.5 h-1.5 rounded-full"
        style={{
          background: accent,
          boxShadow: `0 0 8px ${accent}`,
          opacity: hovered ? 1 : 0.4,
          transition: 'opacity 0.3s ease',
        }}
      />

      {children}
    </div>
  );
}
