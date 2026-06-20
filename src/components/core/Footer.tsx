'use client';

/**
 * Footer — Sticky footer with services, contact, and social links
 */

import { motion } from 'framer-motion';
import { MagneticButton } from '@/components/ui/MagneticButton';

const SERVICES = [
  'SEO Optimization',
  'Social Media Marketing',
  'Graphic Design',
  'Logo & Branding',
  'Web Design & Development',
  'SaaS Applications',
];

const SOCIAL_LINKS = [
  { label: 'Twitter', href: '#', icon: 'X' },
  { label: 'LinkedIn', href: '#', icon: 'in' },
  { label: 'Instagram', href: '#', icon: 'IG' },
  { label: 'Dribbble', href: '#', icon: 'Dr' },
];

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 bg-void/80 backdrop-blur-xl">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-violet to-cyan rounded-lg" />
              <span className="font-display font-bold text-xl tracking-wider">
                RAVEN<span className="text-gradient-violet-cyan">TECH</span>
              </span>
            </div>
            <p className="text-white/50 font-body text-sm leading-relaxed max-w-xs">
              We engineer digital marketing that doesn&apos;t just perform — it dominates.
              Built for brands that refuse to be average.
            </p>
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((s) => (
                <MagneticButton
                  key={s.label}
                  variant="ghost"
                  className="w-10 h-10 rounded-full border border-white/10 hover:border-violet/50 flex items-center justify-center text-xs font-bold text-white/50 hover:text-white p-0"
                  href={s.href}
                  label={s.label}
                  cursorLabel={s.label.toUpperCase()}
                >
                  {s.icon}
                </MagneticButton>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold text-xs tracking-widest uppercase text-white/40 mb-6">
              Services
            </h4>
            <ul className="space-y-3">
              {SERVICES.map((s, i) => (
                <motion.li
                  key={s}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  viewport={{ once: true }}
                >
                  <a
                    href="#"
                    className="text-white/60 hover:text-white font-body text-sm transition-colors duration-200 flex items-center gap-2 group"
                    data-cursor-scale="1.5"
                  >
                    <span className="w-4 h-px bg-violet/50 group-hover:w-6 group-hover:bg-violet transition-all duration-300" />
                    {s}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-xs tracking-widest uppercase text-white/40 mb-6">
              Contact
            </h4>
            <div className="space-y-4">
              <a
                href="mailto:hello@raventech.io"
                className="block text-white/70 hover:text-cyan font-display font-medium transition-colors duration-200 text-fluid-base"
                data-cursor-scale="1.5"
                data-cursor-color="cyan"
              >
                hello@raventech.io
              </a>
              <p className="text-white/40 font-body text-sm">
                Available Mon–Fri, 9am–6pm EST
              </p>
              <div className="pt-4">
                <MagneticButton
                  variant="primary"
                  className="text-sm py-3 px-6"
                  cursorLabel="START"
                >
                  Start a Project →
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 font-body text-xs tracking-wide">
            © 2026 RAVENTECH™. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookies'].map((link) => (
              <a
                key={link}
                href="#"
                className="text-white/30 hover:text-white/60 font-body text-xs transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
