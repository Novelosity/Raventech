'use client';

import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { MotifProps } from '../ServiceCanvas';

const TILE_COLORS = ['#7C3AED', '#22D3EE', '#F5C518'];
const TILE_EMISSIVE = ['#7C3AED', '#22D3EE', '#F5C518'];

export function MarketplaceMotif({ scrollProgress, mouseX, mouseY, reducedMotion }: MotifProps) {
  const groupRef = useRef<THREE.Group>(null);
  const tileRefs = useRef<(THREE.Mesh | null)[]>([]);
  const packetRefs = useRef<(THREE.Mesh | null)[]>([]);
  const packetProgress = useRef([0, 0.33, 0.66]);
  const time = useRef(0);

  // Triangle orbit positions for 3 tiles
  const getOrbitPos = (index: number, t: number, orbitR: number): [number, number, number] => {
    const baseAngle = (index / 3) * Math.PI * 2;
    const angle = baseAngle + t * 0.25;
    return [Math.cos(angle) * orbitR, Math.sin(angle) * 0.5, Math.sin(angle * 0.7) * 0.3];
  };

  useFrame((_, delta) => {
    if (reducedMotion || !groupRef.current) return;
    time.current += delta;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, mouseY * 0.12, 0.05);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouseX * 0.14, 0.05);

    const orbitR = 1.2 + scrollProgress * 0.4;

    tileRefs.current.forEach((tile, i) => {
      if (!tile) return;
      const pos = getOrbitPos(i, time.current, orbitR);
      tile.position.set(...pos);
      tile.rotation.y += delta * 0.3;

      // Emissive pulse
      const mat = tile.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.5 + Math.sin(time.current * 1.5 + i) * 0.2;
    });

    // Data packets travel between tiles
    packetRefs.current.forEach((pkt, i) => {
      if (!pkt) return;
      packetProgress.current[i] = (packetProgress.current[i] + delta * (0.5 + scrollProgress * 0.5)) % 1;
      const t = packetProgress.current[i];
      const fromPos = getOrbitPos(i, time.current, orbitR);
      const toPos = getOrbitPos((i + 1) % 3, time.current, orbitR);
      pkt.position.x = THREE.MathUtils.lerp(fromPos[0], toPos[0], t);
      pkt.position.y = THREE.MathUtils.lerp(fromPos[1], toPos[1], t);
      pkt.position.z = THREE.MathUtils.lerp(fromPos[2], toPos[2], t);
    });
  });

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <group ref={groupRef}>
      {/* 3 marketplace tiles */}
      {TILE_COLORS.map((color, i) => (
        <mesh key={i} ref={(el) => { tileRefs.current[i] = el; }}>
          <boxGeometry args={[0.8, 1.1, 0.08]} />
          <meshStandardMaterial
            color={color}
            emissive={TILE_EMISSIVE[i]}
            emissiveIntensity={0.5}
            metalness={0.1}
            roughness={0.4}
          />
        </mesh>
      ))}

      {/* Data packets */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} ref={(el) => { packetRefs.current[i] = el; }}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial
            color={TILE_COLORS[i]}
            emissive={TILE_COLORS[i]}
            emissiveIntensity={1.5}
          />
        </mesh>
      ))}

      <pointLight position={[0, 2, 2]} color="#7C3AED" intensity={1.5} />
      <pointLight position={[0, -2, 1]} color="#22D3EE" intensity={1.2} />
      <pointLight position={[2, 0, 0]} color="#F5C518" intensity={0.8} />
    </group>
  );
}
