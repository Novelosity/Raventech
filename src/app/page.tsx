'use client';

/**
 * page.tsx — Root page
 * Orchestrates: Loader → Lenis → Scene canvas → DOM sections
 * Master scroll progress synced to global store
 */

import { useEffect, useRef, useState } from 'react';
import { useScroll, useMotionValueEvent, useTransform, motion } from 'framer-motion';
import dynamic from 'next/dynamic';

import { Navigation }      from '@/components/core/Navigation';
import { Footer }          from '@/components/core/Footer';
import { Cursor }          from '@/components/core/Cursor';
import { HeroSection }     from '@/components/sections/HeroSection';
import { ServiceChapters } from '@/components/sections/ServiceChapters';
import { CTASection }      from '@/components/sections/CTASection';
import { PricingSection }  from '@/components/sections/PricingSection';
import { DoubleMarquee }   from '@/components/ui/MarqueeStrip';
import { ServicesShowcase } from '@/components/sections/ServicesShowcase';
import { ContactSection }  from '@/components/sections/ContactSection';
import { WhyUsSection }    from '@/components/sections/WhyUsSection';
import { useScrollStore }  from '@/store/scrollStore';

const Scene = dynamic(
  () => import('@/components/three/Scene').then((m) => ({ default: m.Scene })),
  { ssr: false }
);
const LenisProvider = dynamic(
  () => import('@/components/core/LenisProvider').then((m) => ({ default: m.LenisProvider })),
  { ssr: false }
);

// ─────────────────────────────────────────────────────────────────────────────
// FIXED HERO VIDEO — autoplays at 0.35× speed, true multi-layer parallax
// ─────────────────────────────────────────────────────────────────────────────
function HeroVideoFixed() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll();

  // Start slow cinematic playback the moment the video is ready
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    const start = () => {
      vid.playbackRate = 0.35;   // very slow — cinematic
      vid.play().catch(() => {}); // autoplay (muted, so allowed by browsers)
    };
    if (vid.readyState >= 1) start();
    else vid.addEventListener('loadedmetadata', start, { once: true });
  }, []);

  // ── Parallax depth layers ─────────────────────────────────────────────────
  // Each layer moves at a different rate, creating real depth perception.

  // Layer 0 (deepest — video itself): slow drift DOWN + subtle zoom
  const videoY     = useTransform(scrollYProgress, [0, 0.45], ['0%',  '9%']);
  const videoScale = useTransform(scrollYProgress, [0, 0.45], [1.0,   1.15]);

  // Layer 1 (mid — colour fog): drifts UP slightly faster than video
  const fog1Y      = useTransform(scrollYProgress, [0, 0.45], ['0%', '-7%']);
  const fog1Opacity= useTransform(scrollYProgress, [0, 0.20, 0.40], [0.55, 0.75, 0.95]);

  // Layer 2 (near — radial vignette): drifts UP faster still
  const fog2Y      = useTransform(scrollYProgress, [0, 0.45], ['0%', '-16%']);

  // Whole-unit fade — video disappears as first service section takes over
  const unitOpacity = useTransform(
    scrollYProgress,
    [0, 0.26, 0.36, 0.46],
    [1,  1,   0.22,  0]
  );

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ opacity: unitOpacity, zIndex: 1 }}
    >
      {/* ── LAYER 0: VIDEO (deepest, slowest) ── */}
      <motion.video
        ref={videoRef}
        src="/videos/crow-hero-reveal.mp4"
        muted
        playsInline
        loop
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover will-change-transform"
        style={{ scale: videoScale, y: videoY }}
      />

      {/* ── LAYER 1: Base tone gradient (static, no movement) ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(10,10,15,0.48) 0%, rgba(10,10,15,0.06) 42%, rgba(10,10,15,0.85) 100%)',
        }}
      />

      {/* ── LAYER 2: Colour fog — mid depth, drifts up ── */}
      <motion.div
        className="absolute inset-0"
        style={{ y: fog1Y, opacity: fog1Opacity }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 130% 80% at 50% 58%, transparent 25%, rgba(10,10,15,0.92) 100%)',
          }}
        />
        {/* Ambient violet tint — matches crow video colour temp */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(124,58,237,0.08) 0%, transparent 50%, rgba(34,211,238,0.05) 100%)',
          }}
        />
      </motion.div>

      {/* ── LAYER 3: Vignette ring — nearest, drifts fastest ── */}
      <motion.div
        className="absolute inset-0"
        style={{ y: fog2Y }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 55% at 50% 48%, transparent 40%, rgba(10,10,15,0.82) 100%)',
          }}
        />
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
const SERVICES = [
  'SEO Optimization', 'Social Media Marketing', 'Graphic Design',
  'Logo & Branding', 'Web Development', 'SaaS Applications',
  'Brand Strategy', 'Content Marketing',
];

export default function Home() {
  const setProgress = useScrollStore((s) => s.setProgress);
  const setScrollY  = useScrollStore((s) => s.setScrollY);
  const setMouse    = useScrollStore((s) => s.setMouse);

  // Only mount Three.js on desktop — saves WebGL context + ~40MB on mobile
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    setIsDesktop(window.innerWidth >= 768);
  }, []);

  const { scrollYProgress, scrollY } = useScroll();

  useMotionValueEvent(scrollYProgress, 'change', (v) => setProgress(v));
  useMotionValueEvent(scrollY,         'change', (v) => setScrollY(v));

  // Global mouse tracking → drives 3D parallax in hero + Three.js camera
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMouse(
        (e.clientX / window.innerWidth)  * 2 - 1,
        -((e.clientY / window.innerHeight) * 2 - 1)
      );
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [setMouse]);

  return (
    <LenisProvider>
      {/* ── FIXED LAYERS (behind everything) ── */}
      <HeroVideoFixed />

      {/* Film grain */}
      <div className="grain" aria-hidden="true" />
      {/* Vignette */}
      <div className="vignette" aria-hidden="true" />

      {/* Custom cursor */}
      <Cursor />

      {/* Three.js canvas — desktop only */}
      {isDesktop && <Scene />}

      {/* Nav */}
      <Navigation />

      {/* ── DOM CONTENT ── */}
      <main className="dom-content">

        {/* 0: HERO */}
        <HeroSection />

        <DoubleMarquee items={SERVICES} />

        {/* SERVICE CHAPTERS — scroll-animated headings + product grids */}
        <ServiceChapters />

        <DoubleMarquee items={['SEO','Branding','Web Dev','SaaS','Design','Strategy','Growth','Results']} />

        {/* WHY US */}
        <WhyUsSection />

        <DoubleMarquee items={['No BS','Real Results','Zero Outsourcing','Full Transparency','Guaranteed Growth','Data Driven','Always On','Built Different']} />

        {/* ALL SERVICES SHOWCASE */}
        <ServicesShowcase />

        {/* CONTACT */}
        <ContactSection />

        {/* PRICING */}
        <PricingSection />

        {/* CTA */}
        <CTASection />
      </main>

      <Footer />
    </LenisProvider>
  );
}
