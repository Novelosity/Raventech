'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { FAQ } from '@/data/serviceData';

interface FaqAccordionProps {
  faq: FAQ[];
  accent: 'violet' | 'cyan' | 'gold';
}

const accentOpenText = {
  violet: 'text-violet',
  cyan: 'text-cyan',
  gold: 'text-gold',
};

export function FaqAccordion({ faq, accent }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 md:py-32 px-6 md:px-12 lg:px-20 border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="mb-12 md:mb-16"
        >
          <p className="text-xs font-display tracking-[0.32em] uppercase text-violet/80 mb-3">
            Got Questions?
          </p>
          <h2 className="text-fluid-2xl font-headline font-bold text-white">
            Frequently Asked
          </h2>
        </motion.div>

        <div className="flex flex-col">
          {faq.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.05 }}
                className="border-b border-white/[0.07]"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-start justify-between py-5 md:py-6 text-left gap-4 group"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`font-display font-medium text-base md:text-lg leading-snug transition-colors duration-200 ${
                      isOpen
                        ? accentOpenText[accent]
                        : 'text-white/80 group-hover:text-white'
                    }`}
                  >
                    {item.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.28 }}
                    className="shrink-0 mt-0.5"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      className="text-white/35"
                    >
                      <path
                        d="M4.5 6.75L9 11.25L13.5 6.75"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                      className="overflow-hidden"
                    >
                      <p className="text-white/52 font-body text-sm md:text-base leading-relaxed pb-6 pr-8">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
