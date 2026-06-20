'use client';

/**
 * PostProcessing — Bloom, Vignette, ChromaticAberration, Noise effects
 * Adapts intensity based on scroll progress
 */

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import {
  EffectComposer,
  Bloom,
  Vignette,
  ChromaticAberration,
  Noise,
} from '@react-three/postprocessing';
import { BlendFunction, KernelSize } from 'postprocessing';
import { Vector2 } from 'three';
import { useScrollStore } from '@/store/scrollStore';
import { useReducedMotion, useIsLowPower } from '@/hooks/useReducedMotion';

export function PostProcessing() {
  const reduced = useReducedMotion();
  const lowPower = useIsLowPower();
  const progress = useScrollStore((s) => s.progress);

  // Disable heavy effects on low-power / reduced motion
  if (lowPower) {
    return (
      <EffectComposer>
        <Bloom intensity={0.3} luminanceThreshold={0.8} />
        <Vignette darkness={0.4} />
      </EffectComposer>
    );
  }

  // Dynamic bloom: brighter in hero and CTA
  const bloomIntensity =
    progress < 0.12 ? 0.8 :
    progress > 0.9 ? 1.2 :
    0.5;

  const chromaticOffset = progress < 0.12 ? 0.0008 : progress > 0.9 ? 0.001 : 0.0004;

  return (
    <EffectComposer multisampling={reduced ? 0 : 4}>
      <Bloom
        intensity={bloomIntensity}
        luminanceThreshold={0.6}
        luminanceSmoothing={0.4}
        kernelSize={KernelSize.LARGE}
        mipmapBlur
      />
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={new Vector2(chromaticOffset, chromaticOffset)}
        radialModulation={false}
        modulationOffset={0}
      />
      <Noise
        premultiply
        blendFunction={BlendFunction.ADD}
        opacity={0.03}
      />
      <Vignette darkness={0.55} offset={0.3} />
    </EffectComposer>
  );
}
