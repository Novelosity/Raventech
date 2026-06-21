'use client';

import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { MotifProps } from '../ServiceCanvas';

export function MetaAdsMotif({ scrollProgress, mouseX, mouseY, reducedMotion }: MotifProps) {
  const groupRef = useRef<THREE.Group>(null);
  const cardRefs = useRef<(THREE.Mesh | null)[]>([]);
  const needleRef = useRef<THREE.Mesh>(null);
  const time = useRef(0);

  useFrame((_, delta) => {
    if (reducedMotion || !groupRef.current) return;
    time.current += delta;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, mouseY * 0.16, 0.05);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouseX * 0.18, 0.05);

    // Stack cards into view with scroll
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const targetZ = -i * 0.25 + scrollProgress * 0.5;
      card.position.z = THREE.MathUtils.lerp(card.position.z, targetZ, 0.05);
      card.position.y = THREE.MathUtils.lerp(card.position.y, i * 0.15 + Math.sin(time.current * 0.5 + i) * 0.06, 0.05);
    });

    // Gauge needle sweeps with scroll
    if (needleRef.current) {
      const targetRot = -Math.PI * 0.6 + scrollProgress * Math.PI * 1.2;
      needleRef.current.rotation.z = THREE.MathUtils.lerp(needleRef.current.rotation.z, targetRot, 0.05);
    }
  });

  const cardColors = ['#0D1B3E', '#131A3A', '#0A0A1F'];
  const cardEmissive = ['#7C3AED', '#5B21B6', '#3B0ECB'];

  return (
    <group ref={groupRef} position={[0.5, 0, 0]}>
      {/* Stacked feed cards */}
      {cardColors.map((color, i) => (
        <mesh
          key={i}
          ref={(el) => { cardRefs.current[i] = el; }}
          position={[-0.8, i * 0.15, -i * 0.25]}
          rotation={[0, 0.18, 0]}
        >
          <boxGeometry args={[1.6, 2.2, 0.04]} />
          <meshStandardMaterial
            color={color}
            emissive={cardEmissive[i]}
            emissiveIntensity={0.3 - i * 0.08}
            metalness={0.2}
            roughness={0.5}
          />
        </mesh>
      ))}

      {/* Card accent border on front card */}
      <mesh position={[-0.8, 0.15, 0.03]} rotation={[0, 0.18, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(1.64, 2.24, 0.01)]} />
        <lineBasicMaterial color="#7C3AED" />
      </mesh>

      {/* ROAS gauge arc */}
      <mesh position={[1.2, 0, 0]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.55, 0.06, 8, 32, Math.PI * 1.4]} />
        <meshStandardMaterial color="#22D3EE" emissive="#22D3EE" emissiveIntensity={0.6} />
      </mesh>

      {/* Gauge needle */}
      <mesh ref={needleRef} position={[1.2, 0, 0.05]}>
        <boxGeometry args={[0.04, 0.45, 0.02]} />
        <meshStandardMaterial color="#F5C518" emissive="#F5C518" emissiveIntensity={0.8} />
      </mesh>

      <pointLight position={[-1, 1, 2]} color="#7C3AED" intensity={2} />
      <pointLight position={[2, 0, 1]} color="#22D3EE" intensity={1.2} />
    </group>
  );
}
