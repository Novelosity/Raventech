'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ALL_SERVICES } from '@/data/serviceData';

const ACCENT_STYLES = {
  violet: {
    border: 'border-violet-500/40',
    glow: 'hover:shadow-[0_0_28px_0_rgba(124,58,237,0.35)]',
    pill: 'bg-violet-500/10 text-violet-300 border border-violet-500/20',
    arrow: 'text-violet-400 group-hover:text-violet-300',
    top: 'bg-violet-500',
  },
  cyan: {
    border: 'border-cyan-500/40',
    glow: 'hover:shadow-[0_0_28px_0_rgba(34,211,238,0.3)]',
    pill: 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/20',
    arrow: 'text-cyan-400 group-hover:text-cyan-300',
    top: 'bg-cyan-400',
  },
  gold: {
    border: 'border-yellow-500/40',
    glow: 'hover:shadow-[0_0_28px_0_rgba(245,197,24,0.28)]',
    pill: 'bg-yellow-500/10 text-yellow-300 border border-yellow-500/20',
    arrow: 'text-yellow-400 group-hover:text-yellow-300',
    top: 'bg-yellow-400',
  },
};

const CATEGORY_LABELS: Record<string, string> = {
  'logo-creation': 'Design',
  'embroidery-logo-design': 'Design',
  'seo': 'Marketing',
  'social-media-marketing': 'Marketing',
  'meta-ads': 'Paid Ads',
  'tiktok-ads': 'Paid Ads',
  'youtube-ads': 'Paid Ads',
  'google-ads': 'Paid Ads',
  'ecommerce-store-setup': 'E-Commerce',
  'amazon-ebay-etsy': 'E-Commerce',
  'website-development': 'Web',
  'website-designing': 'Web',
  'branding': 'Design',
  'a-plus-content': 'Content',
  'product-listing': 'Content',
  'product-listing-optimization': 'Content',
};

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export function ServicesShowcase() {
  return (
    <section id="services" className="relative py-32 px-6 md:px-12 lg:px-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-violet-600/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-cyan-400/5 rounded-full blur-[90px]" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="text-xs font-mono tracking-[0.2em] text-violet-400 uppercase">What We Do</span>
            <span className="h-px flex-1 max-w-[60px] bg-violet-500/30" />
            <span className="text-xs font-mono text-white/30">{ALL_SERVICES.length} Services</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-none">
            Every service your brand
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
              will ever need.
            </span>
          </h2>
          <p className="mt-5 text-lg text-white/50 max-w-xl">
            Full-stack digital agency capabilities — from identity design to performance marketing, delivered under one roof.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {ALL_SERVICES.map((service) => {
            const styles = ACCENT_STYLES[service.accent];
            const category = CATEGORY_LABELS[service.slug] ?? 'Service';

            return (
              <motion.div key={service.slug} variants={item}>
                <Link
                  href={`/services/${service.slug}`}
                  className={`group relative flex flex-col h-full min-h-[200px] rounded-xl border bg-white/[0.03] backdrop-blur-sm p-6 transition-all duration-300 ${styles.border} ${styles.glow} hover:-translate-y-1 hover:bg-white/[0.06]`}
                >
                  {/* Top accent line */}
                  <div className={`absolute top-0 left-6 right-6 h-[2px] rounded-b-full ${styles.top} opacity-60 group-hover:opacity-100 transition-opacity duration-300`} />

                  {/* Category pill */}
                  <span className={`self-start text-[10px] font-semibold tracking-widest uppercase rounded-full px-2.5 py-0.5 mb-4 ${styles.pill}`}>
                    {category}
                  </span>

                  {/* Name */}
                  <h3 className="text-base font-bold text-white leading-snug mb-2 group-hover:text-white transition-colors">
                    {service.name}
                  </h3>

                  {/* Subheadline */}
                  <p className="text-sm text-white/40 leading-relaxed flex-1 group-hover:text-white/60 transition-colors">
                    {service.subheadline}
                  </p>

                  {/* Arrow */}
                  <div className={`mt-5 flex items-center gap-1.5 text-sm font-medium transition-all duration-300 ${styles.arrow}`}>
                    <span>Explore</span>
                    <svg
                      className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/5 pt-10"
        >
          <p className="text-white/40 text-sm">
            Not sure where to start?{' '}
            <a href="#contact" className="text-violet-400 hover:text-violet-300 underline underline-offset-4 transition-colors">
              Let&apos;s talk strategy.
            </a>
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-all duration-200 hover:shadow-[0_0_24px_rgba(124,58,237,0.5)]"
          >
            Start a Project
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
