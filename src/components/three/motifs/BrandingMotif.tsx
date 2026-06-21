'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import type { MotifProps } from '../ServiceCanvas';

const SWATCH_COLORS = ['#0A0A0F', '#7C3AED', '#22D3EE', '#F5C518'];

// Scattered layout (before assembly)
const SCATTER: [number, number, number][] = [
  [-2.2, 1.1, 0.6], [1.8, 1.4, -0.4],
  [-1.6, -0.8, 0.5], [2.0, -1.0, 0.3],
  [0.2, 1.8, -0.6], [-0.6, -0.4, 0.8],
];

// Assembled brand board layout
const ASSEMBLED: [number, number, number][] = [
  [-1.1, 0.6, 0], [-0.35, 0.6, 0],
  [0.35, 0.6, 0], [1.1, 0.6, 0],
  [-0.7, -0.3, 0], [0.7, -0.3, 0],
];

export function BrandingMotif({ scrollProgress, mouseX, mouseY, reducedMotion }: MotifProps) {
  const groupRef = useRef<THREE.Group>(null);
  const pieceRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((_, delta) => {
    if (reducedMotion || !groupRef.current) return;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, mouseY * 0.14, 0.05);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouseX * 0.16, 0.05);

    pieceRefs.current.forEach((piece, i) => {
      if (!piece) return;
      const from = SCATTER[i];
      const to = ASSEMBLED[i];
      piece.position.x = THREE.MathUtils.lerp(piece.position.x, THREE.MathUtils.lerp(from[0], to[0], scrollProgress), 0.05);
      piece.position.y = THREE.MathUtils.lerp(piece.position.y, THREE.MathUtils.lerp(from[1], to[1], scrollProgress), 0.05);
      piece.position.z = THREE.MathUtils.lerp(piece.position.z, THREE.MathUtils.lerp(from[2], to[2], scrollProgress), 0.05);

      // Flatten rotation as they assemble
      piece.rotation.x = THREE.MathUtils.lerp(piece.rotation.x, (1 - scrollProgress) * 0.4 * (i % 2 === 0 ? 1 : -1), 0.04);
      piece.rotation.z = THREE.MathUtils.lerp(piece.rotation.z, (1 - scrollProgress) * 0.3, 0.04);
    });
  });

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <group ref={groupRef}>
      {/* 4 color swatches (cubes) */}
      {SWATCH_COLORS.map((color, i) => (
        <mesh key={`swatch-${i}`} ref={(el) => { pieceRefs.current[i] = el; }} position={SCATTER[i]}>
          <boxGeometry args={[0.38, 0.38, 0.12]} />
          <meshStandardMaterial
            color={color}
            emissive={color === '#0A0A0F' ? '#7C3AED' : color}
            emissiveIntensity={0.6}
            metalness={0.2}
            roughness={0.3}
          />
        </mesh>
      ))}

      {/* Type specimen plate */}
      <mesh ref={(el) => { pieceRefs.current[4] = el; }} position={SCATTER[4]}>
        <boxGeometry args={[1.0, 0.3, 0.06]} />
        <meshStandardMaterial color="#0D1B3E" emissive="#7C3AED" emissiveIntensity={0.3} />
      </mesh>

      {/* Logo mark plate */}
      <Float speed={0.8} floatIntensity={0.3}>
        <mesh ref={(el) => { pieceRefs.current[5] = el; }} position={SCATTER[5]}>
          <boxGeometry args={[0.55, 0.55, 0.08]} />
          <meshStandardMaterial color="#0D1B3E" emissive="#F5C518" emissiveIntensity={0.5} metalness={0.3} roughness={0.2} />
        </mesh>
      </Float>

      <pointLight position={[0, 2, 2]} color="#F5C518" intensity={1.6} />
      <pointLight position={[-2, -1, 1]} color="#7C3AED" intensity={1.2} />
    </group>
  );
}
