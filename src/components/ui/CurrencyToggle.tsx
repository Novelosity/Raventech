'use client';

/**
 * CurrencyToggle — Premium USD / PKR switcher
 * Framer Motion spring sliding pill
 */

import { motion } from 'framer-motion';
import type { Currency } from '@/data/pricingData';

interface CurrencyToggleProps {
  value: Currency;
  onChange: (c: Currency) => void;
}

const OPTIONS: { value: Currency; label: string; symbol: string }[] = [
  { value: 'USD', label: 'USD', symbol: '$' },
  { value: 'PKR', label: 'PKR', symbol: '₨' },
];

export function CurrencyToggle({ value, onChange }: CurrencyToggleProps) {
  return (
    <div
      role="group"
      aria-label="Currency selector"
      className="inline-flex items-center p-1 rounded-xl gap-0.5"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(8px)',
      }}
    >
      {OPTIONS.map((opt) => {
        const isActive = value === opt.value;
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            aria-pressed={isActive}
            className="relative px-3.5 py-1.5 rounded-lg text-[12px] font-semibold tracking-wide transition-colors duration-200 focus-visible:outline-none"
          >
            {/* Sliding pill */}
            {isActive && (
              <motion.span
                layoutId="currency-pill"
                className="absolute inset-0 rounded-lg"
                style={{
                  background: 'linear-gradient(135deg, rgba(124,58,237,0.6) 0%, rgba(124,58,237,0.4) 100%)',
                  boxShadow: '0 0 12px rgba(124,58,237,0.4)',
                  border: '1px solid rgba(124,58,237,0.4)',
                }}
                transition={{ type: 'spring', stiffness: 420, damping: 32 }}
              />
            )}
            <span className={`relative z-10 flex items-center gap-1.5 transition-colors duration-200 ${isActive ? 'text-white' : 'text-white/35 hover:text-white/60'}`}>
              <span className="opacity-60">{opt.symbol}</span>
              {opt.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
