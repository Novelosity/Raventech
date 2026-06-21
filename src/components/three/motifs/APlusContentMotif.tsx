'use client';

import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { MotifProps } from '../ServiceCanvas';

const MODULE_COLORS = ['#22D3EE', '#7C3AED', '#22D3EE', '#7C3AED', '#F5C518'];
const MODULE_HEIGHTS = [0.35, 0.3, 0.4, 0.3, 0.25];
const TOTAL_MODULES = 5;

export function APlusContentMotif({ scrollProgress, mouseX, mouseY, reducedMotion }: MotifProps) {
  const groupRef = useRef<THREE.Group>(null);
  const moduleRefs = useRef<(THREE.Mesh | null)[]>([]);
  const time = useRef(0);

  useFrame((_, delta) => {
    if (reducedMotion || !groupRef.current) return;
    time.current += delta;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, mouseY * 0.12, 0.05);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouseX * 0.14, 0.05);

    // Gentle float
    groupRef.current.position.y = Math.sin(time.current * 0.5) * 0.08;

    // Each module slides in from below as scrollProgress threshold passes
    moduleRefs.current.forEach((module, i) => {
      if (!module) return;
      const threshold = i / TOTAL_MODULES;
      const progress = Math.max(0, Math.min(1, (scrollProgress - threshold) * TOTAL_MODULES));
      const targetY = 0.9 - i * 0.38;
      const startY = targetY - 1.5;
      module.position.y = THREE.MathUtils.lerp(module.position.y, THREE.MathUtils.lerp(startY, targetY, progress), 0.07);
      const mat = module.material as THREE.MeshStandardMaterial;
      mat.opacity = THREE.MathUtils.lerp(mat.opacity, progress, 0.07);
    });
  });

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <group ref={groupRef} position={[0.2, 0, 0]}>
      {/* Product image placeholder at top */}
      <mesh position={[0, 1.3, 0]}>
        <boxGeometry args={[1.6, 0.5, 0.04]} />
        <meshStandardMaterial color="#0D1B3E" emissive="#7C3AED" emissiveIntensity={0.3} />
      </mesh>

      {/* A+ module panels */}
      {Array.from({ length: TOTAL_MODULES }).map((_, i) => (
        <mesh
          key={i}
          ref={(el) => { moduleRefs.current[i] = el; }}
          position={[0, 0.9 - i * 0.38 - 1.5, 0]}
        >
          <boxGeometry args={[1.6, MODULE_HEIGHTS[i], 0.04]} />
          <meshStandardMaterial
            color="#0D1B3E"
            emissive={MODULE_COLORS[i]}
            emissiveIntensity={0.25}
            transparent
            opacity={0}
          />
        </mesh>
      ))}

      {/* Left accent bars on each module */}
      {Array.from({ length: TOTAL_MODULES }).map((_, i) => (
        <mesh key={`bar-${i}`} position={[-0.76, 0.9 - i * 0.38, 0.025]}>
          <boxGeometry args={[0.06, MODULE_HEIGHTS[i] * 0.7, 0.02]} />
          <meshStandardMaterial color={MODULE_COLORS[i]} emissive={MODULE_COLORS[i]} emissiveIntensity={0.8} />
        </mesh>
      ))}

      <pointLight position={[0, 2, 2]} color="#22D3EE" intensity={1.8} />
      <pointLight position={[0, -2, 1]} color="#7C3AED" intensity={1.0} />
    </group>
  );
}
