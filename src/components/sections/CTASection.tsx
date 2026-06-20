'use client';

/**
 * CTASection — Scene 7 (90–100%)
 * "Let's build your empire." + magnetic contact button
 * Background brightens to navy, raven wing-pulse
 */

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { RevealText } from '@/components/ui/RevealText';
import { MagneticButton, ArrowRight } from '@/components/ui/MagneticButton';
import { GlowCard } from '@/components/ui/GlowCard';

export function CTASection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end'],
  });

  const bgOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.4], [0.95, 1]);

  return (
    <section
      ref={ref}
      id="contact"
      className="relative min-h-screen flex flex-col items-center justify-center section-pad text-center overflow-hidden"
    >
      {/* Navy background reveal */}
      <motion.div
        style={{ opacity: bgOpacity }}
        className="absolute inset-0 bg-gradient-radial from-navy/60 via-void to-void"
      />

      {/* Glow rings */}
      <motion.div
        style={{ opacity: bgOpacity, scale }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        {[300, 500, 700].map((size, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-violet/10"
            style={{ width: size, height: size }}
            animate={{ scale: [1, 1.05, 1], opacity: [0.15, 0.08, 0.15] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
          />
        ))}
      </motion.div>

      <motion.div
        style={{ scale }}
        className="relative z-10 max-w-4xl mx-auto space-y-8"
      >
        {/* Pre-label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-3"
        >
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-violet" />
          <span className="text-xs font-display tracking-[0.4em] uppercase text-violet">
            Ready to dominate?
          </span>
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-violet" />
        </motion.div>

        {/* Main CTA headline */}
        <div>
          <h2
            className="font-headline font-extrabold leading-tight"
            style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
          >
            <RevealText
              text="Let's build"
              mode="words"
              className="text-white block"
              delay={0.1}
            />
            <RevealText
              text="your empire."
              mode="words"
              className="text-gradient-violet-cyan block"
              delay={0.4}
            />
          </h2>
        </div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-white/50 font-body max-w-lg mx-auto leading-relaxed"
          style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)' }}
        >
          We partner with ambitious brands to engineer digital marketing that
          doesn&apos;t just grow — it compounds. Let&apos;s talk.
        </motion.p>

        {/* Contact buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <MagneticButton
            variant="primary"
            className="text-base py-5 px-10 text-lg"
            cursorLabel="START"
            strength={0.5}
            href="mailto:hello@raventech.io"
          >
            <RavenWingIcon className="w-5 h-5" />
            Start Your Project
          </MagneticButton>
          <MagneticButton
            variant="secondary"
            className="text-base py-5 px-10"
            cursorLabel="CALL"
            href="tel:+15550000000"
          >
            Schedule a Call
          </MagneticButton>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-6 pt-4"
        >
          {[
            '🔒 NDA Protected',
            '⚡ 48h Response',
            '📊 Data-driven',
            '🏆 Award-winning',
          ].map((badge) => (
            <span
              key={badge}
              className="text-xs font-display font-medium text-white/30 tracking-wider"
            >
              {badge}
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* Contact card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.2 }}
        viewport={{ once: true }}
        className="relative z-10 mt-20 w-full max-w-2xl mx-auto"
      >
        <GlowCard className="p-8 md:p-10" glowColor="rgba(124, 58, 237, 0.3)">
          <ContactForm />
        </GlowCard>
      </motion.div>
    </section>
  );
}

function ContactForm() {
  return (
    <form
      className="space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        alert('Message sent! We\'ll be in touch within 48 hours.');
      }}
    >
      <h3 className="font-display font-semibold text-xl text-white mb-6">
        Send us a message
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-display text-white/40 tracking-widest uppercase mb-2">
            Name
          </label>
          <input
            type="text"
            placeholder="Your name"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 font-body text-sm focus:border-violet/60 focus:outline-none focus:ring-1 focus:ring-violet/30 transition-colors"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-display text-white/40 tracking-widest uppercase mb-2">
            Email
          </label>
          <input
            type="email"
            placeholder="your@email.com"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 font-body text-sm focus:border-violet/60 focus:outline-none focus:ring-1 focus:ring-violet/30 transition-colors"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-display text-white/40 tracking-widest uppercase mb-2">
          Service
        </label>
        <select className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white/70 font-body text-sm focus:border-violet/60 focus:outline-none focus:ring-1 focus:ring-violet/30 transition-colors">
          <option value="" className="bg-void">Select a service...</option>
          <option value="seo" className="bg-void">SEO Optimization</option>
          <option value="smm" className="bg-void">Social Media Marketing</option>
          <option value="design" className="bg-void">Graphic Design</option>
          <option value="branding" className="bg-void">Logo & Branding</option>
          <option value="web" className="bg-void">Web Design & Development</option>
          <option value="saas" className="bg-void">SaaS Application</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-display text-white/40 tracking-widest uppercase mb-2">
          Message
        </label>
        <textarea
          rows={4}
          placeholder="Tell us about your project..."
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 font-body text-sm focus:border-violet/60 focus:outline-none focus:ring-1 focus:ring-violet/30 transition-colors resize-none"
        />
      </div>

      <MagneticButton
        variant="primary"
        className="w-full justify-center py-4"
        cursorLabel="SEND"
      >
        Send Message <ArrowRight />
      </MagneticButton>
    </form>
  );
}

function RavenWingIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C7 2 3 6.5 3 12c0 3.3 1.5 6.2 3.9 8.1L6 22l3-1.5L12 22l3-1.5L18 22l-.9-1.9C19.5 18.2 21 15.3 21 12c0-5.5-4-10-9-10zm0 2c3.9 0 7 3.6 7 8 0 2.5-1.1 4.7-2.8 6.2L15 18l-3 1.5L9 18l-1.2.2C6.1 16.7 5 14.5 5 12c0-4.4 3.1-8 7-8z"/>
    </svg>
  );
}
