'use client';

import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { MotifProps } from '../ServiceCanvas';

export function YoutubeAdsMotif({ scrollProgress, mouseX, mouseY, reducedMotion }: MotifProps) {
  const groupRef = useRef<THREE.Group>(null);
  const playRef = useRef<THREE.Mesh>(null);
  const skipRef = useRef<THREE.Mesh>(null);
  const time = useRef(0);

  useFrame((_, delta) => {
    if (reducedMotion || !groupRef.current) return;
    time.current += delta;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, mouseY * 0.14, 0.05);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouseX * 0.16, 0.05);

    // Play button pulse
    if (playRef.current) {
      const pulse = 1 + Math.sin(time.current * 1.8) * 0.05;
      playRef.current.scale.setScalar(pulse);
    }

    // Skip bar slides in
    if (skipRef.current) {
      const targetX = 1.8 - scrollProgress * 0.8;
      skipRef.current.position.x = THREE.MathUtils.lerp(skipRef.current.position.x, targetX, 0.04);
    }
  });

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <group ref={groupRef} position={[0, 0.2, 0]}>
      {/* Video screen background */}
      <mesh position={[0, 0.3, -0.5]}>
        <boxGeometry args={[3.2, 1.9, 0.04]} />
        <meshStandardMaterial color="#0A0A0F" emissive="#0D1B3E" emissiveIntensity={0.4} />
      </mesh>

      {/* Play button triangle */}
      <mesh ref={playRef} position={[0, 0.3, -0.45]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[0.35, 0.5, 3]} />
        <meshStandardMaterial color="#F5C518" emissive="#F5C518" emissiveIntensity={1.0} />
      </mesh>

      {/* Timeline bar */}
      <mesh position={[0, -1.1, 0]}>
        <boxGeometry args={[3.0, 0.08, 0.04]} />
        <meshStandardMaterial color="#333" />
      </mesh>

      {/* Active portion of timeline */}
      <mesh position={[-0.8 + scrollProgress * 0.8, -1.1, 0.02]}>
        <boxGeometry args={[1.6 * scrollProgress + 0.1, 0.08, 0.02]} />
        <meshStandardMaterial color="#F5C518" emissive="#F5C518" emissiveIntensity={0.6} />
      </mesh>

      {/* Division markers on timeline */}
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh key={i} position={[-1.2 + i * 0.6, -1.1, 0.03]}>
          <boxGeometry args={[0.02, 0.16, 0.02]} />
          <meshStandardMaterial color="#666" />
        </mesh>
      ))}

      {/* "Skip Ad" bar — slides in */}
      <mesh ref={skipRef} position={[2.0, -0.7, -0.44]}>
        <boxGeometry args={[0.55, 0.22, 0.02]} />
        <meshStandardMaterial color="#F5C518" emissive="#F5C518" emissiveIntensity={0.3} />
      </mesh>

      <pointLight position={[0, 2, 2]} color="#F5C518" intensity={1.8} />
      <pointLight position={[0, -2, 1]} color="#22D3EE" intensity={0.8} />
    </group>
  );
}
