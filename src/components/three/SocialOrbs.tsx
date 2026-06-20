'use client';

/**
 * SocialOrbs — SMM scene: orbiting engagement orbs around pulsing core
 * Expanding reach rings, particle bursts
 */

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { lerp, seededRandom } from '@/lib/utils';
import { useScrollStore } from '@/store/scrollStore';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface SocialOrbsProps {
  sceneProgress: number;
  visible?: boolean;
}

const ORB_CONFIG = [
  { radius: 2.2, speed: 0.8, size: 0.18, color: '#22D3EE', offset: 0 },
  { radius: 2.8, speed: -0.5, size: 0.14, color: '#7C3AED', offset: Math.PI / 3 },
  { radius: 3.5, speed: 0.6, size: 0.2, color: '#F5C518', offset: Math.PI },
  { radius: 1.8, speed: -1.0, size: 0.12, color: '#22D3EE', offset: Math.PI * 1.5 },
  { radius: 4.0, speed: 0.3, size: 0.15, color: '#7C3AED', offset: Math.PI * 0.7 },
  { radius: 3.0, speed: -0.7, size: 0.1, color: '#F5C518', offset: Math.PI * 1.2 },
];

export function SocialOrbs({ sceneProgress, visible = true }: SocialOrbsProps) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const reduced = useReducedMotion();
  const { mouseX, mouseY } = useScrollStore();

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    // Core pulse
    if (coreRef.current) {
      const pulse = 1 + Math.sin(t * 3) * 0.08 * sceneProgress;
      coreRef.current.scale.setScalar(lerp(coreRef.current.scale.x, sceneProgress * pulse, 0.05));
    }

    // Group mouse parallax
    groupRef.current.rotation.x = lerp(groupRef.current.rotation.x, mouseY * 0.1, 0.05);
    groupRef.current.rotation.y = lerp(groupRef.current.rotation.y, mouseX * 0.1, 0.05);
  });

  return (
    <group ref={groupRef} visible={visible}>
      {/* Core pulsing sphere */}
      <mesh ref={coreRef} scale={0}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color="#22D3EE"
          emissive="#22D3EE"
          emissiveIntensity={3}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Core glow layers */}
      {[0.7, 1.0, 1.4].map((r, i) => (
        <CoreGlow key={i} radius={r} opacity={0.08 - i * 0.02} progress={sceneProgress} />
      ))}

      {/* Orbiting engagement orbs */}
      {ORB_CONFIG.map((orb, i) => (
        <OrbitingOrb
          key={i}
          {...orb}
          progress={sceneProgress}
          index={i}
          reduced={reduced}
        />
      ))}

      {/* Reach rings */}
      {[2.5, 3.8, 5.2].map((r, i) => (
        <ReachRing key={i} radius={r} progress={sceneProgress} delay={i * 0.2} />
      ))}

      {/* Particle bursts */}
      <ParticleBurst progress={sceneProgress} />

      {/* Lighting */}
      <pointLight color="#22D3EE" intensity={6 * sceneProgress} distance={10} position={[0, 0, 2]} />
      <pointLight color="#7C3AED" intensity={4 * sceneProgress} distance={8} position={[3, 2, 1]} />
    </group>
  );
}

function CoreGlow({ radius, opacity, progress }: { radius: number; opacity: number; progress: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.scale.setScalar(progress * (1 + Math.sin(t * 2) * 0.05));
  });
  return (
    <mesh ref={ref} scale={0}>
      <sphereGeometry args={[radius, 16, 16]} />
      <meshBasicMaterial color="#22D3EE" transparent opacity={opacity} depthWrite={false} />
    </mesh>
  );
}

function OrbitingOrb({
  radius, speed, size, color, offset, progress, index, reduced,
}: typeof ORB_CONFIG[0] & { progress: number; index: number; reduced: boolean }) {
  const ref = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!ref.current || !meshRef.current) return;
    const t = state.clock.getElapsedTime();

    if (!reduced) {
      ref.current.rotation.y = t * speed + offset;
      ref.current.rotation.x = Math.sin(t * 0.4 + index) * 0.3;
    }

    // Scale in
    const target = progress > 0.2 ? progress * size * 2 : 0;
    meshRef.current.scale.setScalar(lerp(meshRef.current.scale.x, target, 0.06));
  });

  return (
    <group ref={ref}>
      <group position={[radius, 0, 0]}>
        <mesh ref={meshRef} scale={0}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={2}
            transparent
            opacity={0.85}
          />
        </mesh>
        {/* Orb trail */}
        <mesh scale={[0.8, 0.8, 0.8]} position={[-0.1, 0, 0]}>
          <sphereGeometry args={[size * 1.8, 8, 8]} />
          <meshBasicMaterial color={color} transparent opacity={0.1} />
        </mesh>
      </group>
    </group>
  );
}

function ReachRing({ radius, progress, delay }: { radius: number; progress: number; delay: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    const scale = progress * (1 + Math.sin(t * 1.5 + delay) * 0.04);
    ref.current.scale.setScalar(lerp(ref.current.scale.x, scale, 0.05));
    ref.current.rotation.z += 0.003;
  });

  return (
    <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]} scale={0}>
      <torusGeometry args={[radius, 0.012, 8, 64]} />
      <meshBasicMaterial
        color="#22D3EE"
        transparent
        opacity={0.25}
        depthWrite={false}
      />
    </mesh>
  );
}

function ParticleBurst({ progress }: { progress: number }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 120;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = seededRandom(i) * Math.PI * 2;
      const phi = seededRandom(i + 100) * Math.PI;
      const r = 1 + seededRandom(i + 200) * 4;
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = t * 0.1;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#F5C518"
        size={0.05}
        transparent
        opacity={progress * 0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
