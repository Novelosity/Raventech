'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import { useScrollStore } from '@/store/scrollStore';
import type { ServiceData } from '@/data/serviceData';

import { ServiceMiniNav } from './ServiceMiniNav';
import { ServiceHero } from './ServiceHero';
import { CapabilityCards } from './CapabilityCards';
import { ProcessTimeline } from './ProcessTimeline';
import { PortfolioGrid } from './PortfolioGrid';
import { PricingStrip } from './PricingStrip';
import { FaqAccordion } from './FaqAccordion';
import { RelatedServices } from './RelatedServices';
import { CtaBanner } from './CtaBanner';

// Heavy client-only components loaded dynamically
const ServiceCanvas = dynamic(
  () =>
    import('@/components/three/ServiceCanvas').then((m) => ({
      default: m.ServiceCanvas,
    })),
  { ssr: false }
);

const Cursor = dynamic(
  () => import('@/components/core/Cursor').then((m) => ({ default: m.Cursor })),
  { ssr: false }
);

const LenisProvider = dynamic(
  () =>
    import('@/components/core/LenisProvider').then((m) => ({
      default: m.LenisProvider,
    })),
  { ssr: false }
);

interface ServicePageTemplateProps {
  serviceData: ServiceData;
}

/** Inner component — has access to scroll tracking */
function ServicePageContent({ serviceData }: ServicePageTemplateProps) {
  const setProgress = useScrollStore((s) => s.setProgress);
  const setScrollY = useScrollStore((s) => s.setScrollY);
  const { scrollYProgress, scrollY } = useScroll();

  // Feed scroll store
  useMotionValueEvent(scrollYProgress, 'change', (v) => setProgress(v));
  useMotionValueEvent(scrollY, 'change', (v) => setScrollY(v));

  // Mouse tracking
  useEffect(() => {
    const setMouse = useScrollStore.getState().setMouse;
    const onMove = (e: MouseEvent) => {
      setMouse(
        (e.clientX / window.innerWidth) * 2 - 1,
        -((e.clientY / window.innerHeight) * 2 - 1)
      );
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // Get live scroll progress for canvas
  const scrollProgress = useScrollStore((s) => s.progress);

  return (
    <>
      {/* Film grain overlay */}
      <div className="grain" aria-hidden="true" />

      {/* Fixed R3F canvas — z-index 0 */}
      <ServiceCanvas
        motifKey={serviceData.motifKey}
        scrollProgress={scrollProgress}
      />

      {/* Custom cursor */}
      <Cursor />

      {/* Sticky service mini-nav */}
      <ServiceMiniNav
        serviceName={serviceData.name}
        accent={serviceData.accent}
      />

      {/* Main page content — z-index 10 */}
      <main className="relative z-10">
        {/* 1. Hero */}
        <ServiceHero
          headline={serviceData.headline}
          subheadline={serviceData.subheadline}
          accent={serviceData.accent}
        />

        {/* 2. Capabilities */}
        <CapabilityCards
          capabilities={serviceData.capabilities}
          accent={serviceData.accent}
        />

        {/* 3. Process timeline */}
        <ProcessTimeline
          steps={serviceData.process}
          accent={serviceData.accent}
        />

        {/* 4. Portfolio grid */}
        <div id="portfolio">
          <PortfolioGrid
            portfolio={serviceData.portfolio}
            filters={serviceData.filters}
            accent={serviceData.accent}
          />
        </div>

        {/* 5. Pricing */}
        <PricingStrip
          pricing={serviceData.pricing}
          accent={serviceData.accent}
        />

        {/* 6. FAQ */}
        <FaqAccordion
          faq={serviceData.faq}
          accent={serviceData.accent}
        />

        {/* 7. Related services */}
        <RelatedServices
          relatedSlugs={serviceData.relatedSlugs}
          currentAccent={serviceData.accent}
        />

        {/* 8. CTA + footer */}
        <CtaBanner accent={serviceData.accent} />
      </main>
    </>
  );
}

/** Root template — provides Lenis smooth scroll */
export function ServicePageTemplate({ serviceData }: ServicePageTemplateProps) {
  return (
    <LenisProvider>
      <ServicePageContent serviceData={serviceData} />
    </LenisProvider>
  );
}
