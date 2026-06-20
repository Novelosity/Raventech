'use client';

/**
 * ParticleField — Ambient floating particles for background depth
 * Instanced for performance
 */

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollStore } from '@/store/scrollStore';
import { seededRandom } from '@/lib/utils';
import { useReducedMotion, useIsLowPower } from '@/hooks/useReducedMotion';

interface ParticleFieldProps {
  count?: number;
  spread?: number;
  size?: number;
  color?: string;
  speed?: number;
}

export function ParticleField({
  count = 800,
  spread = 20,
  size = 0.03,
  color = '#7C3AED',
  speed = 0.1,
}: ParticleFieldProps) {
  const ref = useRef<THREE.Points>(null);
  const reduced = useReducedMotion();
  const lowPower = useIsLowPower();
  const { mouseX, mouseY } = useScrollStore();

  const actualCount = lowPower ? Math.floor(count * 0.3) : reduced ? Math.floor(count * 0.5) : count;

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(actualCount * 3);
    const velocities = new Float32Array(actualCount * 3);

    for (let i = 0; i < actualCount; i++) {
      const idx = i * 3;
      const r1 = seededRandom(i * 3);
      const r2 = seededRandom(i * 3 + 1);
      const r3 = seededRandom(i * 3 + 2);

      positions[idx] = (r1 - 0.5) * spread;
      positions[idx + 1] = (r2 - 0.5) * spread;
      positions[idx + 2] = (r3 - 0.5) * spread * 0.3;

      velocities[idx] = (seededRandom(i * 7) - 0.5) * 0.002;
      velocities[idx + 1] = (seededRandom(i * 7 + 1) - 0.5) * 0.002;
      velocities[idx + 2] = (seededRandom(i * 7 + 2) - 0.5) * 0.001;
    }

    return { positions, velocities };
  }, [actualCount, spread]);

  useFrame((state, delta) => {
    if (!ref.current || reduced) return;

    const pos = ref.current.geometry.attributes.position.array as Float32Array;
    const t = state.clock.getElapsedTime();

    for (let i = 0; i < actualCount; i++) {
      const idx = i * 3;
      pos[idx] += velocities[idx];
      pos[idx + 1] += velocities[idx + 1] + Math.sin(t * 0.3 + i) * 0.0005;
      pos[idx + 2] += velocities[idx + 2];

      // Wrap around
      const half = spread / 2;
      if (pos[idx] > half) pos[idx] = -half;
      if (pos[idx] < -half) pos[idx] = half;
      if (pos[idx + 1] > half) pos[idx + 1] = -half;
      if (pos[idx + 1] < -half) pos[idx + 1] = half;
    }

    ref.current.geometry.attributes.position.needsUpdate = true;

    // Subtle mouse parallax on whole field
    ref.current.rotation.x += (mouseY * 0.02 - ref.current.rotation.x) * 0.02;
    ref.current.rotation.y += (mouseX * 0.02 - ref.current.rotation.y) * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={size}
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/** Star-field background */
export function StarField({ count = 400 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const lowPower = useIsLowPower();
  const actualCount = lowPower ? Math.floor(count * 0.4) : count;

  const positions = useMemo(() => {
    const arr = new Float32Array(actualCount * 3);
    for (let i = 0; i < actualCount; i++) {
      arr[i * 3] = (seededRandom(i * 11) - 0.5) * 50;
      arr[i * 3 + 1] = (seededRandom(i * 11 + 1) - 0.5) * 50;
      arr[i * 3 + 2] = -5 - seededRandom(i * 11 + 2) * 20;
    }
    return arr;
  }, [actualCount]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.005;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#ffffff"
        size={0.04}
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
