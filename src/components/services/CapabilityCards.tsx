'use client';

import { motion } from 'framer-motion';
import type { Capability } from '@/data/serviceData';

interface CapabilityCardsProps {
  capabilities: Capability[];
  accent: 'violet' | 'cyan' | 'gold';
}

const accentIconBg = {
  violet: 'bg-violet/10 text-violet',
  cyan: 'bg-cyan/10 text-cyan',
  gold: 'bg-gold/10 text-gold',
};

const accentHoverBorder = {
  violet: 'hover:border-violet/30 hover:shadow-[0_0_30px_rgba(124,58,237,0.12)]',
  cyan: 'hover:border-cyan/30 hover:shadow-[0_0_30px_rgba(34,211,238,0.12)]',
  gold: 'hover:border-gold/30 hover:shadow-[0_0_30px_rgba(245,197,24,0.12)]',
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

export function CapabilityCards({ capabilities, accent }: CapabilityCardsProps) {
  return (
    <section className="py-20 md:py-32 px-6 md:px-12 lg:px-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <p className="text-xs font-display tracking-[0.32em] uppercase text-violet/80 mb-3">
            What We Do
          </p>
          <h2 className="text-fluid-2xl font-headline font-bold text-white">Capabilities</h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          {capabilities.map((cap) => (
            <motion.div
              key={cap.title}
              variants={cardVariants}
              whileHover={{ scale: 1.02 }}
              className={`glass rounded-2xl p-6 md:p-8 border border-white/5 transition-all duration-300 cursor-default ${accentHoverBorder[accent]}`}
            >
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-5 ${accentIconBg[accent]}`}
              >
                {cap.icon}
              </div>
              <h3 className="font-display font-semibold text-white text-base md:text-lg mb-2">
                {cap.title}
              </h3>
              <p className="text-white/52 text-sm font-body leading-relaxed">
                {cap.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
