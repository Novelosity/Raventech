'use client';

import { motion } from 'framer-motion';
import { SectionReveal } from '@/components/ui/ScrollScene';

const DIFFERENTIATORS = [
  {
    accent: 'violet' as const,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'No Retainer Traps',
    body: "Pay for performance, not promises. We define KPIs upfront and tie our success to yours. If targets aren't hit, you don't pay.",
  },
  {
    accent: 'cyan' as const,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    title: 'In-House Only',
    body: 'Every strategist, designer, and developer is on our team. Zero outsourcing means zero dropped balls and zero communication failures.',
  },
  {
    accent: 'gold' as const,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6.75v6.75" />
      </svg>
    ),
    title: 'Full Transparency',
    body: 'Live dashboards, weekly performance reports, and bi-weekly strategy calls. You see everything we see — in real time.',
  },
  {
    accent: 'violet' as const,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: 'Speed Without Compromise',
    body: 'Strategy delivered in 72 hours. Campaigns live within a week. We move fast because markets are unforgiving.',
  },
];

const METRICS = [
  { val: '200+', label: 'Brands Scaled' },
  { val: '$18M+', label: 'Revenue Generated' },
  { val: '98%',  label: 'Client Retention' },
  { val: '5×',   label: 'Average ROI' },
  { val: '12',   label: 'Industries Served' },
  { val: '340%', label: 'Avg. Traffic Lift' },
];

const accentMap = {
  violet: {
    text: 'text-violet',
    border: 'border-violet/20',
    bg: 'bg-violet/[0.08]',
    glow: 'hover:shadow-[0_0_32px_rgba(124,58,237,0.18)]',
    bar: 'bg-violet',
  },
  cyan: {
    text: 'text-cyan',
    border: 'border-cyan/20',
    bg: 'bg-cyan/[0.08]',
    glow: 'hover:shadow-[0_0_32px_rgba(34,211,238,0.16)]',
    bar: 'bg-cyan',
  },
  gold: {
    text: 'text-gold',
    border: 'border-gold/20',
    bg: 'bg-gold/[0.08]',
    glow: 'hover:shadow-[0_0_32px_rgba(245,197,24,0.14)]',
    bar: 'bg-gold',
  },
};

export function WhyUsSection() {
  return (
    <section className="relative py-28 md:py-36 overflow-hidden">
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(124,58,237,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.06) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 100%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 lg:px-16">

        {/* Section header */}
        <div className="text-center mb-16 md:mb-20 max-w-3xl mx-auto">
          <SectionReveal>
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="h-px w-12 bg-gradient-to-r from-transparent to-violet" />
              <span className="text-xs font-display font-semibold tracking-[0.42em] uppercase text-violet">
                Why RavenTech
              </span>
              <span className="h-px w-12 bg-gradient-to-l from-transparent to-violet" />
            </div>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <h2
              className="font-headline font-extrabold text-white leading-[0.92] mb-6"
              style={{ fontSize: 'clamp(2.6rem, 5.5vw, 4.5rem)' }}
            >
              Not just an agency.
              <br />
              <span className="text-gradient-violet-cyan">Your growth engine.</span>
            </h2>
          </SectionReveal>

          <SectionReveal delay={0.18}>
            <p
              className="text-white/50 font-body leading-relaxed"
              style={{ fontSize: 'clamp(1rem, 1.6vw, 1.12rem)' }}
            >
              Most agencies sell packages. We build partnerships built on accountability.
              The difference shows in every KPI we track — and every client we retain.
            </p>
          </SectionReveal>
        </div>

        {/* Differentiator cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {DIFFERENTIATORS.map((d, i) => {
            const c = accentMap[d.accent];
            return (
              <motion.div
                key={d.title}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.22 } }}
                className={`relative p-6 rounded-2xl border bg-white/[0.025] backdrop-blur-sm transition-all duration-300 ${c.border} ${c.glow} group`}
              >
                {/* Top accent bar */}
                <div className={`absolute top-0 left-6 right-6 h-[2px] rounded-b-full ${c.bar} opacity-40 group-hover:opacity-80 transition-opacity duration-300`} />

                {/* Icon */}
                <div className={`w-10 h-10 rounded-xl ${c.bg} ${c.text} border ${c.border} flex items-center justify-center mb-5`}>
                  {d.icon}
                </div>

                {/* Title */}
                <h3 className="font-display font-semibold text-white text-[0.95rem] mb-3 leading-snug">
                  {d.title}
                </h3>

                {/* Body */}
                <p className="text-white/45 font-body text-sm leading-relaxed">
                  {d.body}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Metrics row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.02] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6"
        >
          {METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.07 }}
              className="flex flex-col items-center justify-center py-8 px-3 text-center border-r border-white/[0.05] last:border-r-0 hover:bg-white/[0.04] transition-colors duration-200"
            >
              <span
                className="font-display font-bold text-gradient-violet-cyan mb-1.5 leading-none"
                style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)' }}
              >
                {m.val}
              </span>
              <span className="text-[10px] font-body text-white/30 tracking-widest uppercase leading-tight">
                {m.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Proof statement */}
        <SectionReveal delay={0.2}>
          <p className="text-center text-white/30 font-body text-xs tracking-widest uppercase mt-8">
            Results measured across all active client accounts &nbsp;·&nbsp; Updated quarterly
          </p>
        </SectionReveal>
      </div>
    </section>
  );
}
