'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { MotifProps } from '../ServiceCanvas';

const ORB_CONFIGS = [
  { radius: 1.6, speed: 0.4, size: 0.18, color: '#22D3EE', emissive: 0.8 },
  { radius: 1.2, speed: 0.7, size: 0.14, color: '#7C3AED', emissive: 0.9 },
  { radius: 2.0, speed: 0.25, size: 0.22, color: '#F5C518', emissive: 0.6 },
  { radius: 1.4, speed: 0.55, size: 0.12, color: '#22D3EE', emissive: 1.0 },
  { radius: 1.8, speed: 0.35, size: 0.16, color: '#7C3AED', emissive: 0.7 },
  { radius: 1.0, speed: 0.9, size: 0.10, color: '#F5C518', emissive: 0.8 },
];

export function SocialMediaMotif({ scrollProgress, mouseX, mouseY, reducedMotion }: MotifProps) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const orbRefs = useRef<(THREE.Mesh | null)[]>([]);
  const ringRefs = useRef<(THREE.Mesh | null)[]>([]);
  const time = useRef(0);

  const particleGeom = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const count = 80;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  useEffect(() => {
    return () => { particleGeom.dispose(); };
  }, [particleGeom]);

  useFrame((_, delta) => {
    if (reducedMotion || !groupRef.current) return;
    time.current += delta;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, mouseY * 0.14, 0.05);
    groupRef.current.rotation.y += delta * 0.08;
    groupRef.current.rotation.y += mouseX * 0.003;

    // Core pulse
    if (coreRef.current) {
      const pulse = 1 + Math.sin(time.current * 2.5) * 0.08;
      coreRef.current.scale.setScalar(pulse);
    }

    // Orbit orbs
    orbRefs.current.forEach((orb, i) => {
      if (!orb) return;
      const cfg = ORB_CONFIGS[i];
      const angle = time.current * cfg.speed + (i / ORB_CONFIGS.length) * Math.PI * 2;
      orb.position.x = Math.cos(angle) * cfg.radius;
      orb.position.y = Math.sin(angle) * cfg.radius * 0.5;
    });

    // Expand + fade reach rings
    ringRefs.current.forEach((ring, i) => {
      if (!ring) return;
      const phase = (time.current * 0.5 + i * 0.7) % 1;
      ring.scale.setScalar(0.2 + phase * 2.0);
      (ring.material as THREE.MeshStandardMaterial).opacity = 1 - phase;
    });
  });

  return (
    <group ref={groupRef}>
      {/* Central pulsing core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial color="#7C3AED" emissive="#7C3AED" emissiveIntensity={1.5} />
      </mesh>

      {/* Orbiting engagement orbs */}
      {ORB_CONFIGS.map((cfg, i) => (
        <mesh key={i} ref={(el) => { orbRefs.current[i] = el; }}>
          <sphereGeometry args={[cfg.size, 10, 10]} />
          <meshStandardMaterial
            color={cfg.color}
            emissive={cfg.color}
            emissiveIntensity={cfg.emissive}
          />
        </mesh>
      ))}

      {/* Reach rings */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} ref={(el) => { ringRefs.current[i] = el; }} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.9, 1.0, 32]} />
          <meshStandardMaterial
            color="#7C3AED"
            emissive="#7C3AED"
            emissiveIntensity={0.8}
            transparent
            opacity={0.6}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {/* Ambient particles */}
      <points geometry={particleGeom}>
        <pointsMaterial color="#22D3EE" size={0.03} transparent opacity={0.5} />
      </points>

      <pointLight position={[0, 0, 2]} color="#7C3AED" intensity={2} />
      <pointLight position={[2, 1, 0]} color="#22D3EE" intensity={1} />
    </group>
  );
}
