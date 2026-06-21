'use client';

import { Suspense, lazy, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useScrollStore } from '@/store/scrollStore';
import { useIsLowPower } from '@/hooks/useReducedMotion';

// Lazy-load motif components to keep bundle split
const LogoCreationMotif = lazy(() => import('./motifs/LogoCreationMotif').then((m) => ({ default: m.LogoCreationMotif })));
const EmbroideryMotif = lazy(() => import('./motifs/EmbroideryMotif').then((m) => ({ default: m.EmbroideryMotif })));
const SeoMotif = lazy(() => import('./motifs/SeoMotif').then((m) => ({ default: m.SeoMotif })));
const SocialMediaMotif = lazy(() => import('./motifs/SocialMediaMotif').then((m) => ({ default: m.SocialMediaMotif })));
const MetaAdsMotif = lazy(() => import('./motifs/MetaAdsMotif').then((m) => ({ default: m.MetaAdsMotif })));
const TiktokAdsMotif = lazy(() => import('./motifs/TiktokAdsMotif').then((m) => ({ default: m.TiktokAdsMotif })));
const YoutubeAdsMotif = lazy(() => import('./motifs/YoutubeAdsMotif').then((m) => ({ default: m.YoutubeAdsMotif })));
const GoogleAdsMotif = lazy(() => import('./motifs/GoogleAdsMotif').then((m) => ({ default: m.GoogleAdsMotif })));
const EcommerceMotif = lazy(() => import('./motifs/EcommerceMotif').then((m) => ({ default: m.EcommerceMotif })));
const MarketplaceMotif = lazy(() => import('./motifs/MarketplaceMotif').then((m) => ({ default: m.MarketplaceMotif })));
const WebDevMotif = lazy(() => import('./motifs/WebDevMotif').then((m) => ({ default: m.WebDevMotif })));
const WebDesignMotif = lazy(() => import('./motifs/WebDesignMotif').then((m) => ({ default: m.WebDesignMotif })));
const BrandingMotif = lazy(() => import('./motifs/BrandingMotif').then((m) => ({ default: m.BrandingMotif })));
const APlusContentMotif = lazy(() => import('./motifs/APlusContentMotif').then((m) => ({ default: m.APlusContentMotif })));
const ProductListingMotif = lazy(() => import('./motifs/ProductListingMotif').then((m) => ({ default: m.ProductListingMotif })));
const ListingOptimizationMotif = lazy(() => import('./motifs/ListingOptimizationMotif').then((m) => ({ default: m.ListingOptimizationMotif })));

export interface MotifProps {
  scrollProgress: number;
  mouseX: number;
  mouseY: number;
  reducedMotion?: boolean;
}

type MotifComponent = React.ComponentType<MotifProps>;

const MOTIF_MAP: Record<string, MotifComponent> = {
  LogoCreationMotif,
  EmbroideryMotif,
  SeoMotif,
  SocialMediaMotif,
  MetaAdsMotif,
  TiktokAdsMotif,
  YoutubeAdsMotif,
  GoogleAdsMotif,
  EcommerceMotif,
  MarketplaceMotif,
  WebDevMotif,
  WebDesignMotif,
  BrandingMotif,
  APlusContentMotif,
  ProductListingMotif,
  ListingOptimizationMotif,
};

interface ServiceCanvasProps {
  motifKey: string;
  scrollProgress: number;
}

function SceneInner({ motifKey, scrollProgress }: ServiceCanvasProps) {
  const mouseX = useScrollStore((s) => s.mouseX);
  const mouseY = useScrollStore((s) => s.mouseY);
  const isLowPower = useIsLowPower();

  const MotifComponent = MOTIF_MAP[motifKey];

  return (
    <>
      {/* Ambient stars background */}
      <Stars radius={60} depth={40} count={700} factor={3} fade speed={0.6} />

      {/* Service-specific 3D motif */}
      <Suspense fallback={null}>
        {MotifComponent && (
          <MotifComponent
            scrollProgress={scrollProgress}
            mouseX={mouseX}
            mouseY={mouseY}
            reducedMotion={false}
          />
        )}
      </Suspense>

      {/* Post-processing — skip on low-power devices */}
      {!isLowPower && (
        <EffectComposer>
          <Bloom
            intensity={0.45}
            luminanceThreshold={0.28}
            luminanceSmoothing={0.7}
          />
        </EffectComposer>
      )}
    </>
  );
}

export function ServiceCanvas({ motifKey, scrollProgress }: ServiceCanvasProps) {
  const dpr = useMemo(
    () => (typeof window !== 'undefined' ? [1, Math.min(2, window.devicePixelRatio)] : [1, 2]) as [number, number],
    []
  );

  return (
    <div
      className="canvas-container"
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    >
      <Canvas
        dpr={dpr}
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.25} />
        <SceneInner motifKey={motifKey} scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}
