'use client';

import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { MotifProps } from '../ServiceCanvas';

const NODE_POSITIONS: [number, number, number][] = [
  [0, 0, 0], [1.2, 0.5, 0.3], [-1.1, 0.6, 0.2],
  [0.8, -0.7, 0.4], [-0.9, -0.6, 0.3], [0, 1.2, 0.2],
  [1.4, -0.2, 0.1], [-1.3, -0.1, 0.2],
];

export function GoogleAdsMotif({ scrollProgress, mouseX, mouseY, reducedMotion }: MotifProps) {
  const groupRef = useRef<THREE.Group>(null);
  const funnelRef = useRef<THREE.Group>(null);
  const nodeRefs = useRef<(THREE.Mesh | null)[]>([]);
  const time = useRef(0);

  useFrame((_, delta) => {
    if (reducedMotion || !groupRef.current) return;
    time.current += delta;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, mouseY * 0.14, 0.05);
    groupRef.current.rotation.y += delta * 0.06;

    // Funnel slow spin
    if (funnelRef.current) {
      funnelRef.current.rotation.y += delta * 0.12;
    }

    // Node pulse
    nodeRefs.current.forEach((node, i) => {
      if (!node) return;
      const pulse = 1 + Math.sin(time.current * 1.5 + i * 0.7) * 0.12;
      node.scale.setScalar(pulse);
    });
  });

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <group ref={groupRef} position={[-0.5, 0, 0]}>
      {/* Search funnel — 3 concentric tori at descending heights */}
      <group ref={funnelRef} position={[-0.8, 0, 0]}>
        {[
          { y: 0.7, radius: 0.9, color: '#22D3EE', intensity: 0.8 },
          { y: 0, radius: 0.65, color: '#7C3AED', intensity: 0.9 },
          { y: -0.7, radius: 0.4, color: '#F5C518', intensity: 1.0 },
        ].map((ring, i) => (
          <mesh key={i} position={[0, ring.y, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[ring.radius, 0.055, 8, 32]} />
            <meshStandardMaterial
              color={ring.color}
              emissive={ring.color}
              emissiveIntensity={ring.intensity}
            />
          </mesh>
        ))}
        {/* Funnel connecting struts */}
        {[0, 1, 2, 3].map((i) => {
          const angle = (i / 4) * Math.PI * 2;
          return (
            <mesh key={i} position={[Math.cos(angle) * 0.65, 0, Math.sin(angle) * 0.65]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.015, 0.015, 1.4, 4]} />
              <meshStandardMaterial color="#22D3EE" opacity={0.4} transparent />
            </mesh>
          );
        })}
      </group>

      {/* PMax node web */}
      <group position={[0.9, 0, 0]}>
        {NODE_POSITIONS.map((pos, i) => (
          <mesh key={i} ref={(el) => { nodeRefs.current[i] = el; }} position={pos}>
            <sphereGeometry args={[0.075, 10, 10]} />
            <meshStandardMaterial
              color={i === 0 ? '#F5C518' : '#7C3AED'}
              emissive={i === 0 ? '#F5C518' : '#7C3AED'}
              emissiveIntensity={i === 0 ? 1.4 : 0.8}
            />
          </mesh>
        ))}

        {/* Connecting lines between central node and others */}
        {NODE_POSITIONS.slice(1).map((pos, i) => {
          const dir = new THREE.Vector3(...pos).normalize();
          const len = new THREE.Vector3(...pos).length();
          const mid = new THREE.Vector3(...pos).multiplyScalar(0.5);
          return (
            <mesh key={i} position={[mid.x, mid.y, mid.z]} quaternion={new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir)}>
              <cylinderGeometry args={[0.01, 0.01, len, 4]} />
              <meshStandardMaterial color="#F5C518" opacity={0.35} transparent emissive="#F5C518" emissiveIntensity={0.3} />
            </mesh>
          );
        })}
      </group>

      <pointLight position={[-2, 1, 2]} color="#22D3EE" intensity={1.8} />
      <pointLight position={[2, 0, 1]} color="#7C3AED" intensity={1.2} />
    </group>
  );
}
