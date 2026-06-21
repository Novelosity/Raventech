'use client';

/**
 * page.tsx — Root page
 * Orchestrates: Loader → Lenis → Scene canvas → DOM sections
 * Master scroll progress synced to global store
 */

import { useEffect, useRef } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import dynamic from 'next/dynamic';

import { Loader } from '@/components/core/Loader';
import { Navigation } from '@/components/core/Navigation';
import { Footer } from '@/components/core/Footer';
import { Cursor } from '@/components/core/Cursor';
import { HeroSection } from '@/components/sections/HeroSection';
import { ServiceSection } from '@/components/sections/ServiceSection';
import { CTASection } from '@/components/sections/CTASection';
import { PricingSection } from '@/components/sections/PricingSection';
import { DoubleMarquee } from '@/components/ui/MarqueeStrip';
import { ServicesShowcase } from '@/components/sections/ServicesShowcase';
import { useScrollStore } from '@/store/scrollStore';

// Dynamic import for R3F (no SSR)
const Scene = dynamic(() => import('@/components/three/Scene').then((m) => ({ default: m.Scene })), {
  ssr: false,
});

// Dynamic import for Lenis
const LenisProvider = dynamic(() => import('@/components/core/LenisProvider').then((m) => ({ default: m.LenisProvider })), {
  ssr: false,
});

const SERVICES = [
  'SEO Optimization',
  'Social Media Marketing',
  'Graphic Design',
  'Logo & Branding',
  'Web Development',
  'SaaS Applications',
  'Brand Strategy',
  'Content Marketing',
];

export default function Home() {
  const setProgress = useScrollStore((s) => s.setProgress);
  const setScrollY = useScrollStore((s) => s.setScrollY);
  const loaderDone = useScrollStore((s) => s.loaderDone);

  const { scrollYProgress, scrollY } = useScroll();

  // Sync Framer scroll progress to global store
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setProgress(v);
  });

  useMotionValueEvent(scrollY, 'change', (v) => {
    setScrollY(v);
  });

  return (
    <LenisProvider>
      {/* Grain film overlay */}
      <div className="grain" aria-hidden="true" />

      {/* Vignette */}
      <div className="vignette" aria-hidden="true" />

      {/* Custom cursor (desktop only) */}
      <Cursor />

      {/* Loader (AnimatePresence exit) */}
      <Loader />

      {/* Fixed R3F Canvas */}
      <Scene />

      {/* Sticky navigation */}
      <Navigation />

      {/* DOM content */}
      <main className="dom-content">
        {/* ─── 0: HERO ────────────────────────────── */}
        <HeroSection />

        {/* Marquee strip */}
        <DoubleMarquee items={SERVICES} />

        {/* ─── 1: SEO ─────────────────────────────── */}
        <ServiceSection
          id="seo"
          sceneNo="01"
          title="SEO Optimization"
          tagline="Rank where it matters."
          description="We engineer search dominance through technical SEO, content architecture, and authority building. Your competitors won't see you coming — but your customers will."
          features={[
            'Technical SEO audits & fixes',
            'Keyword strategy & content mapping',
            'Link authority building',
            'Core Web Vitals optimization',
            'Local & national ranking campaigns',
          ]}
          stats={[
            { val: '#1', label: 'Avg. Ranking Position', color: 'cyan' },
            { val: '340%', label: 'Traffic Increase', color: 'violet' },
            { val: '6mo', label: 'Time to Page 1', color: 'gold' },
            { val: '12×', label: 'ROI on SEO Spend', color: 'cyan' },
          ]}
          image="/images/seo.png"
          accent="text-cyan"
          align="left"
        />

        {/* ─── 2: SMM ─────────────────────────────── */}
        <ServiceSection
          id="smm"
          sceneNo="02"
          title="Social Media Marketing"
          tagline="Conversations that convert."
          description="We build social presences that don't just grow — they compound. Data-driven content, community architecture, and paid amplification that turns followers into fanatics."
          features={[
            'Platform strategy & account setup',
            'Content creation & scheduling',
            'Community management',
            'Paid social campaigns (Meta, TikTok, LinkedIn)',
            'Influencer partnerships',
          ]}
          stats={[
            { val: '5M+', label: 'Organic Impressions/mo', color: 'violet' },
            { val: '8.4%', label: 'Avg. Engagement Rate', color: 'cyan' },
            { val: '280%', label: 'Follower Growth', color: 'gold' },
            { val: '4.2×', label: 'ROAS on Paid Social', color: 'violet' },
          ]}
          accent="text-violet"
          align="right"
        />

        {/* Marquee strip */}
        <DoubleMarquee items={['Strategy', 'Design', 'Growth', 'Innovation', 'Results', 'Performance', 'Brand', 'Scale']} />

        {/* ─── 3: GRAPHIC DESIGN ──────────────────── */}
        <ServiceSection
          id="design"
          sceneNo="03"
          title="Graphic Design"
          tagline="Design that stops the scroll."
          description="Visual communication that commands attention and drives action. From social graphics to campaign assets — every pixel is intentional, every design is engineered to convert."
          features={[
            'Social media graphics & templates',
            'Campaign visual systems',
            'Print & digital collateral',
            'Motion graphics & animated assets',
            'Presentation design',
          ]}
          stats={[
            { val: '3×', label: 'Higher Engagement Rate', color: 'gold' },
            { val: '500+', label: 'Assets Delivered', color: 'violet' },
            { val: '48h', label: 'Average Turnaround', color: 'cyan' },
            { val: '100%', label: 'On-brand Consistency', color: 'gold' },
          ]}
          image="/images/design.png"
          accent="text-gold"
          align="left"
        />

        {/* ─── 4: LOGO & BRANDING ─────────────────── */}
        <ServiceSection
          id="branding"
          sceneNo="04"
          title="Logo & Branding"
          tagline="Identity with intent."
          description="We forge brand identities that don't just look good — they mean something. Logo systems, brand guidelines, and visual language built to scale and endure."
          features={[
            'Brand strategy & positioning',
            'Logo design & variations',
            'Complete brand guidelines',
            'Color, typography & iconography',
            'Brand application across touchpoints',
          ]}
          stats={[
            { val: '150+', label: 'Brands Created', color: 'violet' },
            { val: '97%', label: 'Client Satisfaction', color: 'gold' },
            { val: '2wk', label: 'Brand Delivery', color: 'cyan' },
            { val: '∞', label: 'Scalability Built In', color: 'violet' },
          ]}
          image="/images/branding.png"
          accent="text-violet"
          align="right"
        />

        {/* ─── 5: WEB DESIGN & DEV ────────────────── */}
        <ServiceSection
          id="webdev"
          sceneNo="05"
          title="Web Design & Development"
          tagline="Sites that perform, not just appear."
          description="We build digital experiences that are as fast as they are beautiful. Next.js, TypeScript, edge-deployed — engineered for Core Web Vitals perfection and conversion."
          features={[
            'Custom Next.js & React development',
            'UX/UI design & prototyping',
            'Performance & Core Web Vitals',
            'SEO-ready architecture',
            'CMS integration & E-commerce',
          ]}
          stats={[
            { val: '98', label: 'PageSpeed Score', color: 'cyan' },
            { val: '<1s', label: 'Load Time Target', color: 'violet' },
            { val: '45%', label: 'Avg. Conversion Lift', color: 'gold' },
            { val: '100%', label: 'Responsive & Accessible', color: 'cyan' },
          ]}
          image="/images/webdev.png"
          accent="text-cyan"
          align="left"
        />

        {/* ─── 6: SAAS ────────────────────────────── */}
        <ServiceSection
          id="saas"
          sceneNo="06"
          title="SaaS Applications"
          tagline="Software that scales."
          description="Full-stack SaaS products engineered for growth. From MVP to enterprise — we design, build, and launch software that your users love and your business depends on."
          features={[
            'Product design & UX architecture',
            'Full-stack development (Next.js, Node, PostgreSQL)',
            'Auth, billing & subscription systems',
            'Real-time features & dashboards',
            'Infrastructure, CI/CD & monitoring',
          ]}
          stats={[
            { val: '30+', label: 'SaaS Products Launched', color: 'violet' },
            { val: '2,543', label: 'Daily Active Users', color: 'cyan' },
            { val: '99.9%', label: 'Uptime SLA', color: 'gold' },
            { val: '$18M+', label: 'Revenue Generated', color: 'violet' },
          ]}
          image="/images/saas.png"
          accent="text-violet"
          align="right"
        />

        {/* Marquee strip */}
        <DoubleMarquee items={['SEO', 'SMM', 'Design', 'Branding', 'Web Dev', 'SaaS', 'Strategy', 'Growth']} />

        {/* ─── 7: ALL SERVICES SHOWCASE ───────────── */}
        <ServicesShowcase />

        {/* ─── 8: PRICING ─────────────────────────── */}
        <PricingSection />

        {/* ─── 8: CTA ─────────────────────────────── */}
        <CTASection />
      </main>

      <Footer />
    </LenisProvider>
  );
}
