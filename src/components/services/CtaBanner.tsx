'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface CtaBannerProps {
  accent: 'violet' | 'cyan' | 'gold';
}

const serviceLinks = [
  { name: 'Logo Creation', href: '/services/logo-creation' },
  { name: 'SEO', href: '/services/seo' },
  { name: 'Meta Ads', href: '/services/meta-ads' },
  { name: 'TikTok Ads', href: '/services/tiktok-ads' },
  { name: 'Google Ads', href: '/services/google-ads' },
  { name: 'Web Development', href: '/services/website-development' },
  { name: 'Branding', href: '/services/branding' },
  { name: 'E-Commerce Setup', href: '/services/ecommerce-store-setup' },
];

export function CtaBanner({ accent: _ }: CtaBannerProps) {
  return (
    <section
      id="service-cta"
      className="py-24 md:py-44 px-6 md:px-12 lg:px-20 border-t border-white/5 relative overflow-hidden"
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(124,58,237,0.12) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-headline font-black text-white leading-tight mb-6"
          style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)' }}
        >
          Let&apos;s build your{' '}
          <span className="text-gradient-violet-cyan">empire.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.18 }}
          className="text-white/45 font-body text-base md:text-lg mb-10 max-w-xl mx-auto"
        >
          Ready to dominate your market? Let&apos;s talk strategy.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.32 }}
          className="mb-16"
        >
          <Link
            href="/#contact"
            className="inline-block px-10 py-4 rounded-full bg-violet text-white font-display font-bold text-base tracking-wider hover:bg-violet/80 hover:scale-105 active:scale-95 transition-all duration-300"
            data-cursor-scale="2"
            data-cursor-label="LET'S GO"
          >
            Start Your Project →
          </Link>
        </motion.div>

        {/* Contact + socials */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.45 }}
          className="flex flex-wrap items-center justify-center gap-5 mb-12"
        >
          <a
            href="mailto:contact@raventech.co"
            className="text-white/35 hover:text-white text-sm font-display transition-colors"
          >
            contact@raventech.co
          </a>
          <span className="text-white/12 hidden sm:inline">·</span>
          <div className="flex items-center gap-4">
            <a
              href="#"
              aria-label="Instagram"
              className="text-white/28 hover:text-white transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="text-white/28 hover:text-white transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="Twitter / X"
              className="text-white/28 hover:text-white transition-colors"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </motion.div>

        {/* Service links */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.55 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-2 max-w-2xl mx-auto"
        >
          {serviceLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white/22 hover:text-white/55 text-xs font-display tracking-wide transition-colors py-1"
            >
              {link.name}
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
