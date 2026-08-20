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
  {
    label: 'X (Twitter)',
    href: '#',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: '#',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 bg-void/80 backdrop-blur-xl">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-violet to-cyan rounded-lg" />
              <span className="font-display font-bold text-xl tracking-wider">
                RAVEN<span className="text-gradient-violet-cyan">TECH</span>
              </span>
            </div>
            <p className="text-white/50 font-body text-sm leading-relaxed max-w-xs">
              Precision-engineered digital marketing for brands that refuse to be average.
              We don&apos;t just grow your numbers — we build your dominance.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="text-[10px] font-display text-white/20 tracking-widest uppercase">
                Remote-first &nbsp;·&nbsp; Est. 2022 &nbsp;·&nbsp; 12 Industries
              </span>
            </div>
            <div className="flex items-center gap-2">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full border border-white/10 hover:border-violet/50 flex items-center justify-center text-white/40 hover:text-white transition-all duration-200 hover:bg-violet/10"
                >
                  {s.icon}
                </a>
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

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-xs tracking-widest uppercase text-white/40 mb-6">
              Company
            </h4>
            <ul className="space-y-3">
              {['About Us', 'Our Process', 'Case Studies', 'Careers', 'Blog'].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-white/55 hover:text-white font-body text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-3 h-px bg-violet/40 group-hover:w-5 group-hover:bg-violet transition-all duration-300" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
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
