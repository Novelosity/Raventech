'use client';

/**
 * Scene — Main R3F Canvas
 * Fixed full-screen, behind all DOM content
 * Camera flythrough driven by master scroll progress
 */

import { Suspense, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { AdaptiveDpr, AdaptiveEvents } from '@react-three/drei';
import * as THREE from 'three';
import { useScrollStore, SCENE_RANGES, getSceneProgress } from '@/store/scrollStore';
import { lerp } from '@/lib/utils';
import { useReducedMotion, useIsLowPower } from '@/hooks/useReducedMotion';

// 3D scene components
import { ParticleField, StarField } from './ParticleField';
import { RavenCrystal } from './RavenCrystal';
import { DataTerrain } from './DataTerrain';
import { SocialOrbs } from './SocialOrbs';
import { DesignShatter } from './DesignShatter';
import { BrandingMorph } from './BrandingMorph';
import { BrowserFrame } from './BrowserFrame';
import { SaasDashboard } from './SaasDashboard';
import { PricingScene } from './PricingScene';
import { PostProcessing } from './PostProcessing';

/** Camera positions and targets for each scene */
const CAMERA_STATES = [
  { pos: [0, 0, 6], target: [0, 0, 0] },        // 0: Hero
  { pos: [0, 3, 5], target: [0, -1, 0] },        // 1: SEO
  { pos: [1, 0, 6], target: [0, 0, 0] },         // 2: SMM
  { pos: [-0.5, 0.5, 5.5], target: [0, 0, 0] }, // 3: Design
  { pos: [0, 0.3, 5], target: [0, 0.3, 0] },    // 4: Branding
  { pos: [0.3, 0, 5], target: [0, 0, 0] },      // 5: Web Dev
  { pos: [0, 0.3, 5.5], target: [0, 0.3, 0] }, // 6: SaaS
  { pos: [0, 0.5, 7], target: [0, 0, 0] },      // 7: Pricing
  { pos: [0, 0, 4.5], target: [0, 0, 0] },      // 8: CTA
];

function SceneContent() {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const { camera } = useThree();
  const reduced = useReducedMotion();
  const { progress, mouseX, mouseY, loaderDone } = useScrollStore();

  useFrame((state, delta) => {
    if (!loaderDone) return;

    // Determine active scene
    let sceneIdx = 0;
    for (let i = 0; i < SCENE_RANGES.length; i++) {
      const [start, end] = SCENE_RANGES[i];
      if (progress >= start && progress <= end) {
        sceneIdx = i;
        break;
      }
    }
    if (progress >= 0.9) sceneIdx = 8;

    // Get lerp between current and next camera state
    const [start, end] = SCENE_RANGES[Math.min(sceneIdx, 8)] ?? [0, 1];
    const localT = (progress - start) / Math.max(0.001, end - start);

    const currCam = CAMERA_STATES[Math.min(sceneIdx, 8)];
    const nextCam = CAMERA_STATES[Math.min(sceneIdx + 1, 8)];

    const targetPosX = lerp(currCam.pos[0], nextCam.pos[0], localT);
    const targetPosY = lerp(currCam.pos[1], nextCam.pos[1], localT);
    const targetPosZ = lerp(currCam.pos[2], nextCam.pos[2], localT);

    // Hero-specific: slow orbit arc around crystal as you scroll the hero
    const heroProgress = getSceneProgress(progress, 0);
    const orbitAngle = heroProgress * Math.PI * 0.6; // 108° arc sweep
    const orbitR = 0.7 * Math.sin(heroProgress * Math.PI); // bell curve (0→peak→0)
    const heroOrbitX = Math.sin(orbitAngle) * orbitR;
    const heroOrbitZ = (1 - Math.cos(orbitAngle)) * orbitR * 0.5;
    const heroExtra = sceneIdx === 0 ? 1 : 0;

    // Smooth camera follow
    camera.position.x = lerp(camera.position.x, targetPosX + mouseX * 0.15 + heroOrbitX * heroExtra, 0.04);
    camera.position.y = lerp(camera.position.y, targetPosY + mouseY * 0.1, 0.04);
    camera.position.z = lerp(camera.position.z, targetPosZ - heroOrbitZ * heroExtra, 0.04);

    // Look at target
    const targetX = lerp(currCam.target[0], nextCam.target[0], localT);
    const targetY = lerp(currCam.target[1], nextCam.target[1], localT);
    const lookTarget = new THREE.Vector3(targetX, targetY, 0);
    camera.lookAt(lookTarget);
  });

  // Compute per-scene progress values
  const heroProgress = getSceneProgress(progress, 0);
  const seoProgress = getSceneProgress(progress, 1);
  const smmProgress = getSceneProgress(progress, 2);
  const designProgress = getSceneProgress(progress, 3);
  const brandingProgress = getSceneProgress(progress, 4);
  const webProgress = getSceneProgress(progress, 5);
  const saasProgress = getSceneProgress(progress, 6);
  const pricingProgress = getSceneProgress(progress, 7);
  const ctaProgress = getSceneProgress(progress, 8);

  return (
    <>
      {/* Ambient background */}
      <color attach="background" args={['#0A0A0F']} />
      <fog attach="fog" args={['#0A0A0F', 15, 40]} />

      {/* Global stars */}
      <StarField count={500} />

      {/* Ambient particle field (always present) */}
      <ParticleField count={600} spread={18} size={0.025} color="#7C3AED" speed={0.08} />
      <ParticleField count={300} spread={15} size={0.02} color="#22D3EE" speed={0.05} />

      {/* Scene 0: Hero — Raven crystal */}
      <Suspense fallback={null}>
        <RavenCrystal
          sceneProgress={heroProgress}
          visible={progress < 0.14}
        />
      </Suspense>

      {/* Scene 1: SEO — Data terrain */}
      <Suspense fallback={null}>
        <DataTerrain
          sceneProgress={seoProgress}
          visible={seoProgress > 0 && progress < 0.29}
        />
      </Suspense>

      {/* Scene 2: SMM — Social orbs */}
      <Suspense fallback={null}>
        <SocialOrbs
          sceneProgress={smmProgress}
          visible={smmProgress > 0 && progress < 0.40}
        />
      </Suspense>

      {/* Scene 3: Graphic Design — Shatter */}
      <Suspense fallback={null}>
        <DesignShatter
          sceneProgress={designProgress}
          visible={designProgress > 0 && progress < 0.51}
        />
      </Suspense>

      {/* Scene 4: Branding — Morph */}
      <Suspense fallback={null}>
        <BrandingMorph
          sceneProgress={brandingProgress}
          visible={brandingProgress > 0 && progress < 0.62}
        />
      </Suspense>

      {/* Scene 5: Web Dev — Browser */}
      <Suspense fallback={null}>
        <BrowserFrame
          sceneProgress={webProgress}
          visible={webProgress > 0 && progress < 0.73}
        />
      </Suspense>

      {/* Scene 6: SaaS — Dashboard */}
      <Suspense fallback={null}>
        <SaasDashboard
          sceneProgress={saasProgress}
          visible={saasProgress > 0 && progress < 0.84}
        />
      </Suspense>

      {/* Scene 7: Pricing — Floating glass cards */}
      <Suspense fallback={null}>
        <PricingScene
          sceneProgress={pricingProgress}
          visible={pricingProgress > 0 && progress < 0.97}
        />
      </Suspense>

      {/* Scene 8: CTA — Raven crystal (collapses back) */}
      <Suspense fallback={null}>
        <RavenCrystal
          sceneProgress={ctaProgress}
          visible={ctaProgress > 0}
        />
      </Suspense>

      {/* Post processing */}
      <PostProcessing />

      {/* Performance optimizations */}
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
    </>
  );
}

export function Scene() {
  const lowPower = useIsLowPower();

  return (
    <div className="canvas-container">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60, near: 0.1, far: 100 }}
        dpr={lowPower ? [1, 1] : [1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        shadows={false}
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  );
}
