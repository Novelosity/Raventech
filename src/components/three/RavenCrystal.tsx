'use client';

/**
 * RavenCrystal — Refractive glass diamond/crystal raven form
 * Icosahedron with transmission material, subtle rotation, scroll-driven scale
 */

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Float, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { useScrollStore } from '@/store/scrollStore';
import { lerp } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface RavenCrystalProps {
  sceneProgress: number;
  visible?: boolean;
}

export function RavenCrystal({ sceneProgress, visible = true }: RavenCrystalProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Mesh>(null);
  const reduced = useReducedMotion();
  const { mouseX, mouseY } = useScrollStore();

  // Inner crystal geometry
  const crystalGeo = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1.2, 1);
    return geo;
  }, []);

  // Outer wireframe halo
  const haloGeo = useMemo(() => {
    return new THREE.IcosahedronGeometry(1.6, 1);
  }, []);

  useFrame((state, delta) => {
    if (!meshRef.current || !outerRef.current) return;

    const t = state.clock.getElapsedTime();

    // Scroll-driven spin: base rotation + acceleration as hero scrolls out
    if (!reduced) {
      // Crystal spins smoothly, faster as you scroll (0.35 → 4.5 rad/s)
      const spinBoost = 0.35 + sceneProgress * 4.2;
      meshRef.current.rotation.y += delta * spinBoost;

      // Gentle X/Z sway via sine waves
      meshRef.current.rotation.x = Math.sin(t * 0.28) * 0.18 + mouseY * 0.12;
      meshRef.current.rotation.z = Math.sin(t * 0.18) * 0.06;

      // Counter-rotating outer halo — accelerates opposite direction
      outerRef.current.rotation.y -= delta * (0.18 + sceneProgress * 2.1);
      outerRef.current.rotation.x = Math.sin(t * 0.22) * 0.13;
      outerRef.current.rotation.z += delta * 0.08;
    }

    // Mouse parallax
    meshRef.current.position.x = lerp(meshRef.current.position.x, mouseX * 0.3, 0.05);
    // Crystal drifts upward as hero exits
    const yOffset = mouseY * 0.2 + 0.2 - sceneProgress * 1.8;
    meshRef.current.position.y = lerp(meshRef.current.position.y, yOffset, 0.04);

    // Scroll-driven scale:
    //   0→0.08: scale in (0 → 1)
    //   0.08→0.72: full size
    //   0.72→1.0: scale out dramatically to 0 (cinematic exit)
    let targetScale: number;
    if (sceneProgress < 0.08) {
      targetScale = (sceneProgress / 0.08);
    } else if (sceneProgress > 0.72) {
      targetScale = Math.max(0, 1 - (sceneProgress - 0.72) / 0.28);
    } else {
      targetScale = 1;
    }

    meshRef.current.scale.setScalar(lerp(meshRef.current.scale.x, targetScale, 0.06));
    outerRef.current.scale.setScalar(lerp(outerRef.current.scale.x, targetScale * 1.08, 0.05));

    // Fade out opacity on outer halo as crystal exits
    if (outerRef.current.material) {
      (outerRef.current.material as THREE.MeshBasicMaterial).opacity =
        lerp((outerRef.current.material as THREE.MeshBasicMaterial).opacity,
          targetScale * 0.15, 0.06);
    }
  });

  return (
    <group visible={visible}>
      <Environment preset="night" />

      {/* Main crystal */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
        <mesh ref={meshRef} geometry={crystalGeo} castShadow>
          <MeshTransmissionMaterial
            backside
            samples={8}
            thickness={0.5}
            roughness={0}
            anisotropy={0.5}
            chromaticAberration={0.06}
            distortion={0.3}
            distortionScale={0.5}
            temporalDistortion={0.1}
            iridescence={0.3}
            iridescenceIOR={1.3}
            color="#8B9FE8"
            transmission={0.95}
            reflectivity={0.9}
            ior={1.5}
          />
        </mesh>
      </Float>

      {/* Outer wireframe */}
      <mesh ref={outerRef} geometry={haloGeo}>
        <meshBasicMaterial
          color="#7C3AED"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* Glow point light */}
      <pointLight
        color="#22D3EE"
        intensity={4}
        distance={8}
        position={[2, 2, 2]}
      />
      <pointLight
        color="#7C3AED"
        intensity={3}
        distance={6}
        position={[-2, -1, 1]}
      />

      {/* Energy rings — tilt planes for visual depth */}
      {[1.8, 2.1, 2.5].map((r, i) => (
        <EnergyRing
          key={i}
          radius={r}
          speed={0.5 + i * 0.3}
          color={i % 2 === 0 ? '#22D3EE' : '#7C3AED'}
          sceneProgress={sceneProgress}
          tilt={(i * Math.PI) / 3.5}
        />
      ))}
    </group>
  );
}

function EnergyRing({
  radius,
  speed,
  color,
  sceneProgress,
  tilt = 0,
}: {
  radius: number;
  speed: number;
  color: string;
  sceneProgress: number;
  tilt?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const reduced = useReducedMotion();

  const geo = useMemo(() => new THREE.TorusGeometry(radius, 0.009, 8, 64), [radius]);

  useFrame((_, delta) => {
    if (!ref.current || reduced) return;

    // Spin speed boosts with scroll
    const spinMult = 1 + sceneProgress * 3.5;
    ref.current.rotation.z += delta * speed * 0.3 * spinMult;

    // Tilt the ring plane for 3D depth, wobbles slowly
    ref.current.rotation.x = Math.PI / 2 + tilt + Math.sin(Date.now() * 0.0008) * 0.12;
    ref.current.rotation.y = tilt * 0.5 + Math.sin(Date.now() * 0.0006 + tilt) * 0.08;
  });

  // Fade out with crystal as hero exits
  const opacity = 0.4 * Math.max(0, 1 - Math.max(0, sceneProgress - 0.72) / 0.28);

  return (
    <mesh ref={ref} geometry={geo}>
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  );
}
