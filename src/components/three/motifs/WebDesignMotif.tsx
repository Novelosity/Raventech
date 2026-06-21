'use client';

import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';
import type { MotifProps } from '../ServiceCanvas';

export function WebDesignMotif({ scrollProgress, mouseX, mouseY, reducedMotion }: MotifProps) {
  const groupRef = useRef<THREE.Group>(null);
  const panelRefs = useRef<(THREE.Mesh | null)[]>([]);
  const time = useRef(0);

  const PANEL_CONFIGS = [
    { z: 0, tiltX: 0, tiltY: 0, color: '#7C3AED' as const, parallax: 1.0 },
    { z: -0.4, tiltX: 0.1, tiltY: -0.08, color: '#22D3EE' as const, parallax: 0.6 },
    { z: -0.8, tiltX: 0.2, tiltY: 0.12, color: '#5B21B6' as const, parallax: 0.3 },
    { z: -1.2, tiltX: 0.15, tiltY: -0.05, color: '#0891B2' as const, parallax: 0.15 },
  ];

  useFrame((_, delta) => {
    if (reducedMotion || !groupRef.current) return;
    time.current += delta;

    PANEL_CONFIGS.forEach((cfg, i) => {
      const panel = panelRefs.current[i];
      if (!panel) return;

      // Mouse parallax — closer panels move more
      const px = mouseX * 0.25 * cfg.parallax;
      const py = mouseY * 0.18 * cfg.parallax;

      panel.position.x = THREE.MathUtils.lerp(panel.position.x, px + cfg.tiltY * 0.5, 0.05);
      panel.position.y = THREE.MathUtils.lerp(panel.position.y, py, 0.05);

      // Scroll: panels rotate/spread open like a book
      panel.rotation.y = THREE.MathUtils.lerp(
        panel.rotation.y,
        cfg.tiltY + (scrollProgress - 0.5) * 0.3 * (i % 2 === 0 ? 1 : -1),
        0.05
      );
      panel.rotation.x = THREE.MathUtils.lerp(panel.rotation.x, cfg.tiltX, 0.05);
    });

    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouseX * 0.1, 0.04);
    }
  });

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <group ref={groupRef}>
      {PANEL_CONFIGS.map((cfg, i) => (
        <group key={i} position={[0, 0, cfg.z]}>
          <mesh ref={(el) => { panelRefs.current[i] = el; }}>
            <boxGeometry args={[2.4, 1.6, 0.03]} />
            <MeshTransmissionMaterial
              backside
              samples={3}
              thickness={0.1}
              roughness={0.15}
              transmission={0.85}
              ior={1.45}
              color={cfg.color}
              chromaticAberration={0.02}
            />
          </mesh>

          {/* Figma-like grid lines on panel */}
          {[-0.6, 0, 0.6].map((x, j) => (
            <mesh key={`col-${j}`} position={[x, 0, 0.02]}>
              <boxGeometry args={[0.01, 1.5, 0.01]} />
              <meshStandardMaterial color={cfg.color} emissive={cfg.color} emissiveIntensity={0.5} transparent opacity={0.4} />
            </mesh>
          ))}
          {[-0.5, 0, 0.5].map((y, j) => (
            <mesh key={`row-${j}`} position={[0, y, 0.02]}>
              <boxGeometry args={[2.3, 0.01, 0.01]} />
              <meshStandardMaterial color={cfg.color} emissive={cfg.color} emissiveIntensity={0.5} transparent opacity={0.3} />
            </mesh>
          ))}
        </group>
      ))}

      <pointLight position={[0, 2, 3]} color="#7C3AED" intensity={2} />
      <pointLight position={[2, -1, 1]} color="#22D3EE" intensity={1.2} />
    </group>
  );
}
