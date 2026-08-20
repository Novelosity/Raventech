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
        {/* Social proof bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-2 mb-2"
        >
          <div className="flex items-center gap-0.5">
            {[1,2,3,4,5].map(i => (
              <svg key={i} className="w-3.5 h-3.5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs font-display text-white/40 tracking-wider">
            4.9 / 5 &nbsp;·&nbsp; 87 verified reviews &nbsp;·&nbsp; 200+ brands scaled
          </span>
        </motion.div>

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
            className="font-headline font-extrabold leading-[0.9]"
            style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
          >
            <RevealText
              text="Stop blending in."
              mode="words"
              className="text-white block"
              delay={0.1}
            />
            <RevealText
              text="Dominate."
              mode="words"
              className="text-gradient-violet-cyan block"
              delay={0.45}
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
          200+ brands have already made the shift. We partner with ambitious
          companies to build digital marketing systems that don&apos;t just
          grow — they compound. Your next unfair advantage starts here.
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

        {/* Trust badges — SVG icons only, no emoji */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-5 pt-4"
        >
          {[
            {
              label: 'NDA Protected',
              icon: <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>,
            },
            {
              label: '48h Response',
              icon: <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>,
            },
            {
              label: 'Data-Driven',
              icon: <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>,
            },
            {
              label: 'Results Guaranteed',
              icon: <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 010 3.182M9.095 3.368l-.004.001A3.745 3.745 0 006.75 6.25c-.621 0-1.125.504-1.125 1.125v.75c0 .621-.504 1.125-1.125 1.125H3.375C2.754 9.25 2.25 9.754 2.25 10.375V12c0 .621.504 1.125 1.125 1.125h.75c.621 0 1.125.504 1.125 1.125v.75c0 .621-.504 1.125-1.125 1.125H3.375A1.125 1.125 0 012.25 17.25v1.125c0 .621.504 1.125 1.125 1.125h1.5c.621 0 1.125-.504 1.125-1.125v-.75c0-.621.504-1.125 1.125-1.125h.75" /></svg>,
            },
          ].map((badge) => (
            <span
              key={badge.label}
              className="flex items-center gap-1.5 text-[11px] font-display font-medium text-white/35 tracking-wider"
            >
              <span className="text-white/25">{badge.icon}</span>
              {badge.label}
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
