'use client';

/**
 * HeroSection — crow-hero-reveal.mp4 story sequence
 *
 * The crow video is 5s, scrubbed by scroll in HeroVideoFixed (page.tsx).
 * ALL content reveals are scroll-driven, synced to the video narrative arc:
 *
 * ┌────────────────────────────────────────────────────────────────────┐
 * │  0.00 – 0.12  │ Pure darkness. Crow begins to form.               │
 * │  0.08 – 0.20  │ "Digital Marketing Agency" tag fades in.          │
 * │  0.16 – 0.34  │ "RAVEN" slams in from depth (rotateX + Y).        │
 * │  0.24 – 0.40  │ "TECH" gradient word rises up.                    │
 * │  0.34 – 0.52  │ Orbital rings fade in, crow mid-reveal.           │
 * │  0.40 – 0.54  │ Subtitle fades in.                                │
 * │  0.50 – 0.64  │ CTA buttons slide up.                             │
 * │  0.60 – 0.74  │ Stats counter in with stagger.                    │
 * │  0.72 – 0.84  │ Scroll cue pulses in.                             │
 * │  0.84 – 1.00  │ Full hero fades upward as services begin.         │
 * └────────────────────────────────────────────────────────────────────┘
 */

import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import { MagneticButton, ArrowRight } from '@/components/ui/MagneticButton';

const STATS = [
  { val: '200+', label: 'Brands Scaled' },
  { val: '98%',  label: 'Client Retention' },
  { val: '5×',   label: 'Avg. ROI' },
];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // ── STORY BEAT TRANSFORMS ──────────────────────────────────────────

  // Phase 0: section-wide exit (crow flies off screen)
  const sectionOpacity = useTransform(scrollYProgress, [0.84, 1.0], [1, 0]);
  const sectionY       = useTransform(scrollYProgress, [0.84, 1.0], ['0%', '-6%']);

  // Phase 1 (0.08–0.20): Agency tag appears as crow begins to form
  const eyebrowOpacity = useTransform(scrollYProgress, [0.08, 0.20], [0, 1]);
  const eyebrowY       = useTransform(scrollYProgress, [0.08, 0.20], [28, 0]);
  const eyebrowScale   = useTransform(scrollYProgress, [0.08, 0.20], [0.9, 1]);

  // Phase 2 (0.16–0.34): "RAVEN" depth-slam — arrives from behind like the crow emerging
  const ravenOpacity   = useTransform(scrollYProgress, [0.16, 0.34], [0, 1]);
  const ravenY         = useTransform(scrollYProgress, [0.16, 0.34], [90, 0]);
  const ravenScale     = useTransform(scrollYProgress, [0.16, 0.34], [0.76, 1]);
  const ravenRotateX   = useTransform(scrollYProgress, [0.16, 0.34], [30, 0]);
  const ravenLetterSpacing = useTransform(scrollYProgress, [0.16, 0.42], ['0.6em', '0em']);

  // Phase 3 (0.24–0.40): "TECH" rises up, gradient word
  const techOpacity    = useTransform(scrollYProgress, [0.24, 0.40], [0, 1]);
  const techY          = useTransform(scrollYProgress, [0.24, 0.40], [60, 0]);
  const techScale      = useTransform(scrollYProgress, [0.24, 0.40], [0.84, 1]);
  const techRotateX    = useTransform(scrollYProgress, [0.24, 0.40], [18, 0]);

  // Headline parallax depth (both lines float up as you exit)
  const headlineY = useTransform(scrollYProgress, [0, 1], ['0%', '-16%']);

  // Phase 4 (0.34–0.52): Rings appear as crow mid-reveal
  const ringOpacity    = useTransform(scrollYProgress, [0.34, 0.52, 0.82, 1.0], [0, 1, 1, 0]);

  // ── RING SCROLL PARALLAX — different rates per depth layer ─────────
  // Ring 1 (far/deep) moves slowest — gives sense of great distance
  const ring1ScrollY = useTransform(scrollYProgress, [0.34, 0.84], ['0%', '-10%']);
  const ring1ScrollScale = useTransform(scrollYProgress, [0.34, 0.84], [0.88, 1.22]);
  // Ring 2 (mid) moves at medium rate
  const ring2ScrollY = useTransform(scrollYProgress, [0.34, 0.84], ['0%', '-18%']);
  const ring2ScrollScale = useTransform(scrollYProgress, [0.34, 0.84], [0.92, 1.14]);
  // Ring 3 (near) moves fastest — flies past the camera
  const ring3ScrollY = useTransform(scrollYProgress, [0.34, 0.84], ['0%', '-30%']);
  const ring3ScrollScale = useTransform(scrollYProgress, [0.34, 0.84], [0.96, 1.07]);

  // Phase 5 (0.40–0.54): Subtitle
  const subtitleOpacity = useTransform(scrollYProgress, [0.40, 0.54], [0, 1]);
  const subtitleY       = useTransform(scrollYProgress, [0.40, 0.54], [24, 0]);

  // Phase 6 (0.50–0.64): CTA buttons
  const ctaOpacity = useTransform(scrollYProgress, [0.50, 0.64], [0, 1]);
  const ctaY       = useTransform(scrollYProgress, [0.50, 0.64], [28, 0]);

  // Phase 7 (0.60–0.74): Stats
  const statsOpacity = useTransform(scrollYProgress, [0.60, 0.74], [0, 1]);
  const statsY       = useTransform(scrollYProgress, [0.60, 0.74], [18, 0]);

  // Mission capsule (after TECH fades in)
  const missionOpacity = useTransform(scrollYProgress, [0.38, 0.50], [0, 1]);
  const missionY       = useTransform(scrollYProgress, [0.38, 0.50], [14, 0]);

  // Trusted brands strip
  const brandsOpacity  = useTransform(scrollYProgress, [0.68, 0.78], [0, 1]);

  // Phase 8 (0.72–0.84): Scroll cue
  const scrollCueOpacity = useTransform(
    scrollYProgress,
    [0.72, 0.82, 0.90, 1.0],
    [0, 1, 1, 0]
  );

  // ── MOUSE 3D PARALLAX ─────────────────────────────────────────────
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 28, stiffness: 120 });
  const smoothY = useSpring(mouseY, { damping: 28, stiffness: 120 });

  // Three depth layers: outermost ring moves most
  const ring1X = useTransform(smoothX, [-1, 1], [-26, 26]);
  const ring1Y = useTransform(smoothY, [-1, 1], [-26, 26]);
  const ring2X = useTransform(smoothX, [-1, 1], [-16, 16]);
  const ring2Y = useTransform(smoothY, [-1, 1], [-16, 16]);
  const ring3X = useTransform(smoothX, [-1, 1], [-8, 8]);
  const ring3Y = useTransform(smoothY, [-1, 1], [-8, 8]);

  // Content nudges gently opposite to rings for depth illusion
  const contentDX = useTransform(smoothX, [-1, 1], [-7, 7]);
  const contentDY = useTransform(smoothY, [-1, 1], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    mouseY.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  };

  const scrollToNext = () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    // 0.34 = just past the hero (hero ends at ~0.32)
    window.scrollTo({ top: total * 0.34, behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{ height: '500vh' }}
      className="relative"
      onMouseMove={handleMouseMove}
    >
      <motion.div
        style={{ opacity: sectionOpacity, y: sectionY }}
        className="sticky top-0 h-screen overflow-hidden flex items-center justify-center"
      >

        {/* ── VIOLET BOTTOM GLOW (3D floor light) ─────────────────── */}
        <div
          className="absolute inset-x-0 bottom-0 z-[2] pointer-events-none"
          style={{
            height: '45%',
            background:
              'linear-gradient(to top, rgba(124,58,237,0.16) 0%, rgba(34,211,238,0.04) 60%, transparent 100%)',
          }}
        />

        {/* ── SCAN LINES — cinematic texture ──────────────────────── */}
        <div
          className="absolute inset-0 z-[2] pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.6) 2px, rgba(255,255,255,0.6) 3px)',
            backgroundSize: '100% 6px',
          }}
        />

        {/* ── ORBITAL RINGS ───────────────────────────────────────── */}
        <motion.div
          style={{ opacity: ringOpacity }}
          className="absolute inset-0 z-[2] pointer-events-none flex items-center justify-center"
        >
          {/* Ring 1 — far/deep: scroll-driven depth + mouse parallax */}
          <motion.div
            className="absolute flex items-center justify-center"
            style={{ y: ring1ScrollY, scale: ring1ScrollScale }}
          >
            <motion.div
              className="absolute flex items-center justify-center"
              style={{ width: '88vmin', height: '88vmin', x: ring1X, y: ring1Y }}
              animate={{ rotate: 360 }}
              transition={{ duration: 38, repeat: Infinity, ease: 'linear' }}
            >
              <div className="w-full h-full rounded-full border border-violet-500/[0.18]" />
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2
                           w-3 h-3 rounded-full bg-violet-400
                           shadow-[0_0_16px_6px_rgba(124,58,237,0.65)]"
              />
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2
                           w-1.5 h-1.5 rounded-full bg-violet-300/60"
              />
            </motion.div>
          </motion.div>

          {/* Ring 2 — mid depth: dashed, counter-clockwise */}
          <motion.div
            className="absolute flex items-center justify-center"
            style={{ y: ring2ScrollY, scale: ring2ScrollScale }}
          >
            <motion.div
              className="absolute flex items-center justify-center"
              style={{ width: '66vmin', height: '66vmin', x: ring2X, y: ring2Y }}
              animate={{ rotate: -360 }}
              transition={{ duration: 52, repeat: Infinity, ease: 'linear' }}
            >
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 100 100"
                fill="none"
              >
                <circle
                  cx="50" cy="50" r="49"
                  stroke="rgba(34,211,238,0.18)"
                  strokeWidth="0.5"
                  strokeDasharray="6 3"
                />
              </svg>
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2
                           w-2.5 h-2.5 rounded-full bg-cyan-400
                           shadow-[0_0_12px_4px_rgba(34,211,238,0.75)]"
              />
            </motion.div>
          </motion.div>

          {/* Ring 3 — near/fast: flies past the camera as user scrolls */}
          <motion.div
            className="absolute flex items-center justify-center"
            style={{ y: ring3ScrollY, scale: ring3ScrollScale }}
          >
            <motion.div
              className="absolute flex items-center justify-center"
              style={{ width: '47vmin', height: '47vmin', x: ring3X, y: ring3Y }}
              animate={{ rotate: 360 }}
              transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
            >
              <div className="w-full h-full rounded-full border border-violet-300/[0.12]" />
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2
                           w-1.5 h-1.5 rounded-full bg-violet-300
                           shadow-[0_0_8px_2px_rgba(196,181,253,0.6)]"
              />
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2
                           w-1.5 h-1.5 rounded-full bg-cyan-300
                           shadow-[0_0_8px_2px_rgba(103,232,249,0.5)]"
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ── AMBIENT GLOW ORBS ─────────────────────────────────────── */}
        <motion.div
          style={{ opacity: ringOpacity }}
          className="absolute inset-0 z-[2] pointer-events-none"
        >
          <motion.div
            className="absolute rounded-full"
            style={{
              width: '46vmax', height: '46vmax',
              top: '6%', left: '-14%',
              background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)',
              filter: 'blur(44px)',
            }}
            animate={{ y: [0, -32, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute rounded-full"
            style={{
              width: '40vmax', height: '40vmax',
              bottom: '4%', right: '-12%',
              background: 'radial-gradient(circle, rgba(34,211,238,0.09) 0%, transparent 70%)',
              filter: 'blur(44px)',
            }}
            animate={{ y: [0, 26, 0], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          />
          {/* Centre crow-halo glow — pulses with the reveal */}
          <motion.div
            style={{ opacity: ringOpacity }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <motion.div
              className="rounded-full"
              style={{
                width: '30vmin', height: '30vmin',
                background: 'radial-gradient(circle, rgba(124,58,237,0.22) 0%, transparent 70%)',
                filter: 'blur(28px)',
              }}
              animate={{ scale: [1, 1.14, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>

        {/* ── MAIN CONTENT ──────────────────────────────────────────── */}
        <motion.div
          className="relative z-10 flex flex-col items-center justify-center text-center
                     px-5 sm:px-6 pt-20 w-full max-w-6xl mx-auto"
          style={{ x: contentDX, y: contentDY }}
        >

          {/* Phase 1 — Eyebrow tag */}
          <motion.div
            style={{ opacity: eyebrowOpacity, y: eyebrowY, scale: eyebrowScale }}
            className="mb-6 flex items-center gap-3"
          >
            <motion.span
              className="h-px bg-gradient-to-r from-transparent via-violet to-transparent"
              style={{ width: '3rem' }}
            />
            <span className="text-[0.65rem] sm:text-xs font-display font-semibold tracking-[0.35em] text-violet uppercase">
              ★ 4.9 &nbsp;·&nbsp; Digital Marketing Agency &nbsp;·&nbsp; Est. 2022
            </span>
            <motion.span
              className="h-px bg-gradient-to-l from-transparent via-violet to-transparent"
              style={{ width: '3rem' }}
            />
          </motion.div>

          {/* Phase 2 + 3 — RAVEN TECH headline */}
          <motion.div style={{ y: headlineY }}>
            <h1
              className="font-headline font-extrabold leading-[0.86] mb-5"
              style={{ fontSize: 'clamp(4rem, 13vw, 11rem)' }}
            >
              {/* RAVEN — depth-slams in like crow bursting through */}
              <motion.div
                className="block overflow-hidden"
                style={{
                  opacity:     ravenOpacity,
                  y:           ravenY,
                  scale:       ravenScale,
                  rotateX:     ravenRotateX,
                  letterSpacing: ravenLetterSpacing,
                  transformPerspective: 900,
                }}
              >
                <span className="text-white inline-block">RAVEN</span>
              </motion.div>

              {/* TECH — rises from below with gradient */}
              <motion.div
                className="block overflow-hidden"
                style={{
                  opacity:  techOpacity,
                  y:        techY,
                  scale:    techScale,
                  rotateX:  techRotateX,
                  transformPerspective: 900,
                }}
              >
                <span className="text-gradient-violet-cyan inline-block">TECH</span>
              </motion.div>
            </h1>
          </motion.div>

          {/* Phase 5 — Subtitle */}
          <motion.p
            style={{
              opacity: subtitleOpacity,
              y: subtitleY,
              fontSize: 'clamp(0.82rem, 2.4vw, 1.3rem)',
            }}
            className="font-display font-light tracking-[0.24em] text-white/65 mb-10 uppercase"
          >
            Digital Marketing,{' '}
            <span className="text-cyan font-semibold">Engineered.</span>
          </motion.p>

          {/* Mission capsule — appears as crow fully emerges */}
          <motion.div
            style={{ opacity: missionOpacity, y: missionY }}
            className="mb-8 max-w-xl mx-auto"
          >
            <p
              className="font-body text-white/50 leading-relaxed text-center italic border-l-2 border-violet/40 pl-4 text-left"
              style={{ fontSize: 'clamp(0.88rem, 1.8vw, 1.05rem)' }}
            >
              We don&apos;t run campaigns. We engineer market dominance — through
              precision SEO, performance social, and conversion-obsessed digital
              experiences that compound over time.
            </p>
          </motion.div>

          {/* Phase 6 — CTA buttons */}
          <motion.div
            style={{ opacity: ctaOpacity, y: ctaY }}
            className="flex flex-col sm:flex-row items-center gap-4 mb-14"
          >
            <MagneticButton
              variant="primary"
              className="text-sm sm:text-base py-3.5 sm:py-4 px-7 sm:px-8"
              cursorLabel="START"
              onClick={() => {
                const t = document.documentElement.scrollHeight - window.innerHeight;
                window.scrollTo({ top: t * 0.93, behavior: 'smooth' });
              }}
            >
              Start Your Project <ArrowRight />
            </MagneticButton>
            <MagneticButton
              variant="outline"
              className="text-sm sm:text-base py-3.5 sm:py-4 px-7 sm:px-8"
              cursorLabel="WORK"
              onClick={() => {
                const t = document.documentElement.scrollHeight - window.innerHeight;
                window.scrollTo({ top: t * 0.34, behavior: 'smooth' });
              }}
            >
              View Our Work
            </MagneticButton>
          </motion.div>

          {/* Phase 7 — Stats */}
          <motion.div
            style={{ opacity: statsOpacity, y: statsY }}
            className="flex flex-wrap items-center justify-center gap-6 md:gap-14 mb-12"
          >
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-gradient-violet-cyan">
                  {stat.val}
                </div>
                <div className="text-[10px] sm:text-xs font-body text-white/40 tracking-wider uppercase mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Trusted brands strip */}
          <motion.div
            style={{ opacity: brandsOpacity }}
            className="flex flex-col items-center gap-3 mb-10"
          >
            <span className="text-[10px] font-display tracking-[0.35em] uppercase text-white/25">
              Trusted by brands across 12 industries
            </span>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {['SHOPIFY', 'AMAZON', 'META ADS', 'WOOCOMMERCE', 'KLAVIYO'].map((brand) => (
                <span
                  key={brand}
                  className="text-[11px] font-display font-semibold tracking-[0.25em] text-white/20 uppercase"
                >
                  {brand}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Phase 8 — Scroll cue */}
          <motion.button
            onClick={scrollToNext}
            style={{ opacity: scrollCueOpacity }}
            className="flex flex-col items-center gap-2 text-white/30 hover:text-white/70
                       transition-colors duration-300 group cursor-pointer"
            aria-label="Scroll to services"
          >
            <span className="text-[9px] sm:text-[10px] font-display tracking-[0.35em] uppercase">
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 group-hover:text-cyan transition-colors duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </motion.div>
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}
