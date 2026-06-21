'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { MotifProps } from '../ServiceCanvas';

// Scattered positions (random cloud)
const SCATTER_POSITIONS: [number, number, number][] = [
  [-2.0, 1.2, 0.5], [1.6, 1.8, -0.3], [-1.4, -1.1, 0.4],
  [1.8, -0.8, 0.2], [0.2, 1.6, -0.5], [-0.8, 0.3, 0.8],
  [2.2, 0.5, -0.2], [-1.8, 0.8, 0.1], [0.6, -1.4, 0.6],
];

// Grid positions (assembled)
const GRID_POSITIONS: [number, number, number][] = [
  [-1.4, 0.85, 0], [-0.46, 0.85, 0], [0.46, 0.85, 0],
  [-1.4, 0, 0], [-0.46, 0, 0], [0.46, 0, 0],
  [-1.4, -0.85, 0], [-0.46, -0.85, 0], [0.46, -0.85, 0],
];

const PANEL_COLORS = [
  '#7C3AED', '#22D3EE', '#7C3AED', '#22D3EE',
  '#0D1B3E', '#7C3AED', '#22D3EE', '#7C3AED', '#22D3EE',
];

export function WebDevMotif({ scrollProgress, mouseX, mouseY, reducedMotion }: MotifProps) {
  const groupRef = useRef<THREE.Group>(null);
  const panelRefs = useRef<(THREE.Mesh | null)[]>([]);
  const currentPositions = useRef<[number, number, number][]>(SCATTER_POSITIONS.map((p) => [...p] as [number, number, number]));

  useFrame((_, delta) => {
    if (reducedMotion || !groupRef.current) return;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, mouseY * 0.14, 0.05);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouseX * 0.16, 0.05);

    // Lerp each panel toward scatter or grid based on scrollProgress
    panelRefs.current.forEach((panel, i) => {
      if (!panel) return;
      const scatter = SCATTER_POSITIONS[i];
      const grid = GRID_POSITIONS[i];
      const tx = THREE.MathUtils.lerp(scatter[0], grid[0], scrollProgress);
      const ty = THREE.MathUtils.lerp(scatter[1], grid[1], scrollProgress);
      const tz = THREE.MathUtils.lerp(scatter[2], grid[2], scrollProgress);
      panel.position.set(
        THREE.MathUtils.lerp(panel.position.x, tx, 0.05),
        THREE.MathUtils.lerp(panel.position.y, ty, 0.05),
        THREE.MathUtils.lerp(panel.position.z, tz, 0.05)
      );
      panel.rotation.x = THREE.MathUtils.lerp(panel.rotation.x, (1 - scrollProgress) * 0.4 * (i % 2 === 0 ? 1 : -1), 0.04);
      panel.rotation.y = THREE.MathUtils.lerp(panel.rotation.y, (1 - scrollProgress) * 0.3 * (i % 3 === 0 ? 1 : -1), 0.04);
    });
  });

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <group ref={groupRef}>
      {SCATTER_POSITIONS.map((_, i) => (
        <group key={i} ref={(el) => { if (el) panelRefs.current[i] = el.children[0] as THREE.Mesh; }} position={SCATTER_POSITIONS[i]}>
          <mesh>
            <boxGeometry args={[0.75, 0.65, 0.04]} />
            <meshStandardMaterial
              color="#0D1B3E"
              emissive={PANEL_COLORS[i]}
              emissiveIntensity={0.25}
              metalness={0.1}
              roughness={0.5}
            />
          </mesh>
          {/* Code line strips */}
          {[0, 1, 2].map((l) => (
            <mesh key={l} position={[-0.15 + l * 0.08, 0.12 - l * 0.12, 0.025]}>
              <boxGeometry args={[0.3 - l * 0.06, 0.04, 0.01]} />
              <meshStandardMaterial color={PANEL_COLORS[i]} emissive={PANEL_COLORS[i]} emissiveIntensity={0.6} />
            </mesh>
          ))}
        </group>
      ))}

      <pointLight position={[0, 2, 2]} color="#22D3EE" intensity={2} />
      <pointLight position={[-2, -1, 1]} color="#7C3AED" intensity={1.2} />
    </group>
  );
}
