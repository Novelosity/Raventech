'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ALL_SERVICES } from '@/data/serviceData';

interface RelatedServicesProps {
  relatedSlugs: string[];
  currentAccent: 'violet' | 'cyan' | 'gold';
}

const accentArrowText = {
  violet: 'text-violet',
  cyan: 'text-cyan',
  gold: 'text-gold',
};

const accentHoverBorder = {
  violet: 'hover:border-violet/30',
  cyan: 'hover:border-cyan/30',
  gold: 'hover:border-gold/30',
};

export function RelatedServices({ relatedSlugs, currentAccent }: RelatedServicesProps) {
  const related = relatedSlugs
    .map((slug) => ALL_SERVICES.find((s) => s.slug === slug))
    .filter(Boolean) as typeof ALL_SERVICES;

  if (related.length === 0) return null;

  return (
    <section className="py-20 md:py-28 px-6 md:px-12 lg:px-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <p className="text-xs font-display tracking-[0.32em] uppercase text-violet/80 mb-3">
            Explore More
          </p>
          <h2 className="font-headline font-bold text-white" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}>
            You Might Also Need
          </h2>
        </motion.div>

        {/* Horizontal scroll */}
        <div
          className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {related.map((service, i) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.09 }}
              className="snap-start shrink-0"
              style={{ width: 'clamp(240px, 30vw, 320px)' }}
            >
              <Link
                href={`/services/${service.slug}`}
                className={`group flex flex-col h-full glass rounded-2xl border border-white/5 p-6 transition-all duration-300 hover:-translate-y-1 ${accentHoverBorder[currentAccent]}`}
                data-cursor-scale="1.5"
                data-cursor-label="EXPLORE"
              >
                <div className="font-display font-bold text-base md:text-lg text-white mb-2 group-hover:text-white transition-colors">
                  {service.name}
                </div>
                <div className="text-white/40 text-sm font-body mb-5 line-clamp-2 flex-1 leading-relaxed">
                  {service.subheadline}
                </div>
                <div
                  className={`text-sm font-display font-medium transition-colors ${accentArrowText[currentAccent]}`}
                >
                  Explore →
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
