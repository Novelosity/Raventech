'use client';

/**
 * CategoryTabs — Premium tab switcher
 * Animated accent underline + count badge per category
 */

import { motion } from 'framer-motion';
import { CATEGORIES, PRICING_CARDS } from '@/data/pricingData';
import type { CategoryKey } from '@/data/pricingData';

interface CategoryTabsProps {
  active: CategoryKey;
  onChange: (key: CategoryKey) => void;
}

export function CategoryTabs({ active, onChange }: CategoryTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Service categories"
      className="flex items-end gap-0.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {CATEGORIES.map((cat) => {
        const isActive = active === cat.key;
        const count = PRICING_CARDS.filter((c) => c.category === cat.key).length;

        return (
          <button
            key={cat.key}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(cat.key)}
            className="relative flex-shrink-0 flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-t transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-violet/60"
            style={{ color: isActive ? cat.color : 'rgba(255,255,255,0.38)' }}
          >
            <span className={`transition-all duration-200 ${isActive ? 'font-semibold' : ''}`}>
              {cat.label}
            </span>

            {/* Service count badge */}
            <span
              className="text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none transition-all duration-200"
              style={{
                background: isActive ? `${cat.color}22` : 'rgba(255,255,255,0.06)',
                color: isActive ? cat.color : 'rgba(255,255,255,0.25)',
                border: `1px solid ${isActive ? cat.color + '35' : 'rgba(255,255,255,0.08)'}`,
              }}
            >
              {count}
            </span>

            {/* Sliding underline indicator */}
            {isActive && (
              <motion.span
                layoutId="tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-[2px]"
                style={{
                  background: `linear-gradient(90deg, transparent, ${cat.color}, transparent)`,
                  boxShadow: `0 0 8px ${cat.color}80`,
                }}
                transition={{ type: 'spring', stiffness: 420, damping: 32 }}
              />
            )}
          </button>
        );
      })}

      {/* Bottom border line */}
      <div className="flex-1 border-b border-white/[0.07] pb-0" />
    </div>
  );
}
