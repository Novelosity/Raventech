'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionReveal } from '@/components/ui/ScrollScene';

// ─── FIELD COMPONENT ─────────────────────────────────────────────────────────
function Field({
  label,
  children,
  required,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <div>
      <label className="flex items-center gap-1 text-[10px] font-display font-semibold tracking-[0.4em] uppercase text-white/40 mb-2">
        {label}
        {required && <span className="text-violet text-xs leading-none">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  'w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-4 py-3.5 text-white ' +
  'placeholder-white/25 font-body text-sm transition-all duration-200 ' +
  'focus:border-violet/60 focus:outline-none focus:ring-1 focus:ring-violet/20 focus:bg-white/[0.06] ' +
  'hover:border-white/20';

// ─── CONTACT INFO ITEMS ───────────────────────────────────────────────────────
const INFO = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
        strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
    label: 'Email us',
    value: 'hello@raventech.io',
    href: 'mailto:hello@raventech.io',
    accent: 'cyan',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
        strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
    label: 'Call us',
    value: '+1 (555) 000-0000',
    href: 'tel:+15550000000',
    accent: 'violet',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
        strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: 'Response time',
    value: 'Within 24 hours',
    href: null,
    accent: 'gold',
  },
];

const SOCIAL = [
  {
    label: 'X (Twitter)',
    href: '#',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: '#',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
      </svg>
    ),
  },
];

const accentText: Record<string, string> = {
  cyan: 'text-cyan',
  violet: 'text-violet',
  gold: 'text-gold',
};
const accentBg: Record<string, string> = {
  cyan: 'bg-cyan/[0.08] border-cyan/20',
  violet: 'bg-violet/[0.08] border-violet/20',
  gold: 'bg-gold/[0.08] border-gold/20',
};

// ─── MAIN EXPORT ──────────────────────────────────────────────────────────────
export function ContactSection() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [form, setForm] = useState({
    name: '', email: '', company: '', service: '', budget: '', message: '',
  });

  const update = (field: string, val: string) =>
    setForm((prev) => ({ ...prev, [field]: val }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate async send — replace with real API/Formspree/Resend call
    await new Promise((r) => setTimeout(r, 1400));
    setStatus('sent');
  };

  return (
    <section
      id="contact-form"
      className="relative py-28 md:py-36 overflow-hidden"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(124,58,237,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.05) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%)',
        }}
      />

      {/* Ambient glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%)', filter: 'blur(60px)' }} />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 md:px-10 lg:px-16">

        {/* Section header */}
        <div className="text-center mb-16 md:mb-20 max-w-3xl mx-auto">
          <SectionReveal>
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="h-px w-12 bg-gradient-to-r from-transparent to-violet" />
              <span className="text-xs font-display font-semibold tracking-[0.42em] uppercase text-violet">
                Get In Touch
              </span>
              <span className="h-px w-12 bg-gradient-to-l from-transparent to-violet" />
            </div>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <h2
              className="font-headline font-extrabold text-white leading-[0.92] mb-5"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 4.5rem)' }}
            >
              Let&apos;s build your{' '}
              <span className="text-gradient-violet-cyan">dominance.</span>
            </h2>
          </SectionReveal>

          <SectionReveal delay={0.18}>
            <p className="text-white/50 font-body leading-relaxed"
              style={{ fontSize: 'clamp(0.95rem, 1.6vw, 1.1rem)' }}>
              Tell us about your project. We&apos;ll respond within 24 hours with a
              tailored strategy — no fluff, no canned proposals.
            </p>
          </SectionReveal>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start">

          {/* ── LEFT: Contact info ───────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-8">
            {/* Info cards */}
            <div className="space-y-4">
              {INFO.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  {item.href ? (
                    <a
                      href={item.href}
                      className={`flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300
                        hover:bg-white/[0.04] group ${accentBg[item.accent]}`}
                    >
                      <span className={`${accentText[item.accent]} flex-shrink-0`}>{item.icon}</span>
                      <div>
                        <p className="text-[10px] font-display tracking-[0.35em] uppercase text-white/30 mb-0.5">
                          {item.label}
                        </p>
                        <p className={`font-display font-medium text-sm group-hover:${accentText[item.accent]} text-white/80 transition-colors`}>
                          {item.value}
                        </p>
                      </div>
                    </a>
                  ) : (
                    <div className={`flex items-center gap-4 p-4 rounded-2xl border ${accentBg[item.accent]}`}>
                      <span className={`${accentText[item.accent]} flex-shrink-0`}>{item.icon}</span>
                      <div>
                        <p className="text-[10px] font-display tracking-[0.35em] uppercase text-white/30 mb-0.5">
                          {item.label}
                        </p>
                        <p className="font-display font-medium text-sm text-white/80">{item.value}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-white/[0.06]" />

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.6 }}
            >
              <p className="text-[10px] font-display tracking-[0.38em] uppercase text-white/30 mb-4">
                Follow us
              </p>
              <div className="flex items-center gap-3">
                {SOCIAL.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center
                               text-white/40 hover:text-white hover:border-violet/50 hover:bg-violet/10
                               transition-all duration-200"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Trust note */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45 }}
              className="flex items-start gap-3 p-4 rounded-2xl border border-white/[0.06] bg-white/[0.02]"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
                strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-violet flex-shrink-0 mt-0.5">
                <path d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
              <p className="text-white/35 font-body text-xs leading-relaxed">
                All information shared is covered by our NDA. We never share your data with third parties.
              </p>
            </motion.div>
          </div>

          {/* ── RIGHT: Form ──────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3"
          >
            <div className="relative p-7 sm:p-9 rounded-3xl border border-white/[0.08] bg-white/[0.025] backdrop-blur-sm
                            shadow-[0_0_60px_rgba(124,58,237,0.08)]">
              {/* Top accent bar */}
              <div className="absolute top-0 left-8 right-8 h-[2px] rounded-b-full bg-gradient-to-r from-violet via-cyan to-violet opacity-60" />

              <AnimatePresence mode="wait">
                {status === 'sent' ? (
                  /* ── SUCCESS STATE ── */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center text-center py-16 gap-6"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.1 }}
                      className="w-16 h-16 rounded-full bg-violet/20 border border-violet/40 flex items-center justify-center"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
                        strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-violet">
                        <path d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </motion.div>
                    <div>
                      <h3 className="font-headline font-bold text-white text-2xl mb-2">Message received.</h3>
                      <p className="text-white/50 font-body text-sm leading-relaxed max-w-xs">
                        We&apos;ll review your project and get back to you within 24 hours with a tailored plan.
                      </p>
                    </div>
                    <button
                      onClick={() => { setStatus('idle'); setForm({ name: '', email: '', company: '', service: '', budget: '', message: '' }); }}
                      className="text-xs font-display tracking-widest uppercase text-violet/70 hover:text-violet transition-colors"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  /* ── FORM ── */
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <h3 className="font-display font-semibold text-white text-lg mb-6">
                      Start your project
                    </h3>

                    {/* Row 1: Name + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="Full Name" required>
                        <input
                          type="text"
                          placeholder="John Smith"
                          value={form.name}
                          onChange={(e) => update('name', e.target.value)}
                          className={inputClass}
                          required
                        />
                      </Field>
                      <Field label="Email Address" required>
                        <input
                          type="email"
                          placeholder="john@company.com"
                          value={form.email}
                          onChange={(e) => update('email', e.target.value)}
                          className={inputClass}
                          required
                        />
                      </Field>
                    </div>

                    {/* Row 2: Company + Service */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="Company">
                        <input
                          type="text"
                          placeholder="Your company"
                          value={form.company}
                          onChange={(e) => update('company', e.target.value)}
                          className={inputClass}
                        />
                      </Field>
                      <Field label="Service Needed" required>
                        <select
                          value={form.service}
                          onChange={(e) => update('service', e.target.value)}
                          className={inputClass + ' cursor-pointer'}
                          required
                        >
                          <option value="" className="bg-[#0A0A0F]">Select a service...</option>
                          <option value="seo" className="bg-[#0A0A0F]">SEO Optimization</option>
                          <option value="smm" className="bg-[#0A0A0F]">Social Media Marketing</option>
                          <option value="design" className="bg-[#0A0A0F]">Graphic Design</option>
                          <option value="branding" className="bg-[#0A0A0F]">Logo & Branding</option>
                          <option value="web" className="bg-[#0A0A0F]">Web Design & Development</option>
                          <option value="saas" className="bg-[#0A0A0F]">SaaS Application</option>
                          <option value="multiple" className="bg-[#0A0A0F]">Multiple Services</option>
                        </select>
                      </Field>
                    </div>

                    {/* Budget */}
                    <Field label="Monthly Budget">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {['< $2k', '$2k–5k', '$5k–10k', '$10k+'].map((b) => (
                          <button
                            key={b}
                            type="button"
                            onClick={() => update('budget', b)}
                            className={`py-2.5 px-3 rounded-xl border text-xs font-display font-semibold tracking-wider
                              transition-all duration-200 ${
                                form.budget === b
                                  ? 'border-violet/60 bg-violet/20 text-violet'
                                  : 'border-white/10 bg-white/[0.03] text-white/40 hover:border-white/20 hover:text-white/70'
                              }`}
                          >
                            {b}
                          </button>
                        ))}
                      </div>
                    </Field>

                    {/* Message */}
                    <Field label="Project Brief" required>
                      <textarea
                        rows={4}
                        placeholder="Tell us about your goals, challenges, and what success looks like for you..."
                        value={form.message}
                        onChange={(e) => update('message', e.target.value)}
                        className={inputClass + ' resize-none'}
                        required
                      />
                    </Field>

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={status === 'sending'}
                      whileHover={{ scale: status === 'sending' ? 1 : 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full relative py-4 px-8 rounded-xl font-display font-semibold text-sm
                                 tracking-wider text-white overflow-hidden transition-all duration-300
                                 disabled:opacity-70 disabled:cursor-not-allowed
                                 bg-gradient-to-r from-violet to-cyan
                                 hover:shadow-[0_0_32px_rgba(124,58,237,0.4)]"
                    >
                      <AnimatePresence mode="wait">
                        {status === 'sending' ? (
                          <motion.span
                            key="sending"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center justify-center gap-2"
                          >
                            <motion.span
                              className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                            />
                            Sending...
                          </motion.span>
                        ) : (
                          <motion.span
                            key="idle"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center justify-center gap-2"
                          >
                            Send Message
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
                              strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                              <path d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                            </svg>
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.button>

                    <p className="text-center text-white/25 font-body text-[11px]">
                      No spam. No retainer traps. Just results.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
