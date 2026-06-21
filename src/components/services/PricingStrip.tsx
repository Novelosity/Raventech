'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import type { ServicePricing } from '@/data/serviceData';

interface PricingStripProps {
  pricing: ServicePricing;
  accent: 'violet' | 'cyan' | 'gold';
}

const accentStyles = {
  violet: {
    btn: 'bg-violet hover:bg-violet/80 text-white',
    text: 'text-violet',
    border: 'border-violet/30',
    pillBg: 'bg-violet',
  },
  cyan: {
    btn: 'bg-cyan hover:bg-cyan/80 text-void',
    text: 'text-cyan',
    border: 'border-cyan/30',
    pillBg: 'bg-cyan',
  },
  gold: {
    btn: 'bg-gold hover:bg-gold/80 text-void',
    text: 'text-gold',
    border: 'border-gold/30',
    pillBg: 'bg-gold',
  },
};

function useCountUp(target: number, duration: number, trigger: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger || target === 0) return;
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
  const match = str.replace(/,/g, '').match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
}

export function PricingStrip({ pricing, accent }: PricingStripProps) {
  const [currency, setCurrency] = useState<'usd' | 'pkr'>('usd');
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const styles = accentStyles[accent];

  const displayPrice = currency === 'usd' ? pricing.usd : pricing.pkr;
  const priceNum = extractNumber(displayPrice);
  const count = useCountUp(priceNum, 1400, inView);

  return (
    <section
      ref={ref}
      className="py-20 md:py-32 px-6 md:px-12 lg:px-20 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-start md:items-center justify-between flex-wrap gap-4 mb-10"
        >
          <div>
            <p className="text-xs font-display tracking-[0.32em] uppercase text-violet/80 mb-3">
              Transparent Pricing
            </p>
            <h2 className="text-fluid-2xl font-headline font-bold text-white">Investment</h2>
          </div>

          {/* USD / PKR toggle */}
          <div className="flex items-center gap-1 glass rounded-full p-1">
            {(['usd', 'pkr'] as const).map((c) => (
              <button
                key={c}
                onClick={() => setCurrency(c)}
                className={`relative px-4 py-1.5 rounded-full text-xs font-display font-semibold tracking-widest uppercase transition-colors duration-200 ${
                  currency === c ? 'text-void' : 'text-white/45 hover:text-white/75'
                }`}
              >
                {currency === c && (
                  <motion.div
                    layoutId="pricing-currency-pill"
                    className={`absolute inset-0 rounded-full ${styles.pillBg}`}
                    transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                  />
                )}
                <span className="relative z-10">{c.toUpperCase()}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tiers or single price */}
        {pricing.tiers && pricing.tiers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-10">
            {pricing.tiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`glass rounded-2xl p-6 md:p-7 border transition-all duration-300 ${
                  i === 1
                    ? `${styles.border} hover:shadow-[0_0_40px_rgba(124,58,237,0.1)]`
                    : 'border-white/5 hover:border-white/12'
                }`}
              >
                {i === 1 && (
                  <span className={`text-[10px] font-display font-bold tracking-widest uppercase ${styles.text} mb-3 block`}>
                    Most Popular
                  </span>
                )}
                <div className="text-white/45 font-display text-sm mb-1">{tier.name}</div>
                <div className={`font-headline font-bold text-2xl md:text-3xl ${styles.text} mb-1`}>
                  {currency === 'usd' ? tier.usd : tier.pkr}
                </div>
                <div className="text-white/30 text-xs font-display">{pricing.period}</div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8 md:p-14 text-center border border-white/5 mb-10"
          >
            <div className="text-white/35 font-display text-sm mb-2">Starting at</div>
            <div className={`font-headline font-black ${styles.text} mb-1`} style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
              {currency === 'usd'
                ? `${pricing.usd.includes('$') ? '' : '$'}${count.toLocaleString()}`
                : `₨${count.toLocaleString()}`}
            </div>
            <div className="text-white/30 font-display text-sm">{pricing.period}</div>
          </motion.div>
        )}

        {/* CTA + footnote */}
        <div className="flex flex-col items-center gap-4">
          <Link
            href="/#contact"
            className={`inline-block px-8 py-3.5 rounded-full font-display font-semibold text-sm tracking-wider transition-all duration-300 hover:scale-105 active:scale-95 ${styles.btn}`}
            data-cursor-scale="1.5"
          >
            Get Started →
          </Link>
          <p className="text-white/22 text-xs font-body text-center max-w-lg leading-relaxed">
            Starting prices. Final quotes scoped per project. Ad management fees exclude media/ad spend.
          </p>
          {pricing.note && (
            <p className="text-white/32 text-xs font-display text-center italic">
              {pricing.note}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
