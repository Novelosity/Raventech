'use client';

/**
 * DesignShatter — Graphic Design scene: grayscale shards explode → vivid gradient panels
 * Color floods in based on scroll progress
 */

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { lerp, seededRandom } from '@/lib/utils';
import { useScrollStore } from '@/store/scrollStore';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface DesignShatterProps {
  sceneProgress: number;
  visible?: boolean;
}

interface ShardData {
  id: number;
  explodeX: number;
  explodeY: number;
  explodeZ: number;
  panelX: number;
  panelY: number;
  panelZ: number;
  rotX: number;
  rotY: number;
  w: number;
  h: number;
  color: string;
  delay: number;
}

// Panel colors (the vivid gradient panels)
const PANEL_COLORS = [
  '#7C3AED', '#22D3EE', '#F5C518', '#E11D48', '#06B6D4',
  '#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#6366F1',
  '#14B8A6', '#EC4899', '#84CC16', '#F97316', '#3B82F6',
];

export function DesignShatter({ sceneProgress, visible = true }: DesignShatterProps) {
  const groupRef = useRef<THREE.Group>(null);
  const reduced = useReducedMotion();
  const { mouseX, mouseY } = useScrollStore();

  // Shard pieces — initially clustered, scatter then reassemble as panels
  const shards = useMemo<ShardData[]>(() => {
    return Array.from({ length: 20 }, (_, i) => {
      const angle = (i / 20) * Math.PI * 2;
      const r = seededRandom(i * 7) * 3 + 0.5;
      return {
        id: i,
        explodeX: Math.cos(angle) * r * 2.5,
        explodeY: Math.sin(angle) * r * 1.5,
        explodeZ: (seededRandom(i * 7 + 1) - 0.5) * 3,
        panelX: ((i % 5) - 2) * 1.4,
        panelY: (Math.floor(i / 5) - 1.5) * 1.1,
        panelZ: 0,
        rotX: (seededRandom(i * 13) - 0.5) * Math.PI * 4,
        rotY: (seededRandom(i * 13 + 1) - 0.5) * Math.PI * 4,
        w: 0.9 + seededRandom(i * 13 + 2) * 0.4,
        h: 0.7 + seededRandom(i * 13 + 3) * 0.3,
        color: PANEL_COLORS[i % PANEL_COLORS.length],
        delay: seededRandom(i * 11) * 0.3,
      };
    });
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = lerp(groupRef.current.rotation.y, mouseX * 0.1, 0.03);
    groupRef.current.rotation.x = lerp(groupRef.current.rotation.x, mouseY * 0.05, 0.03);
  });

  // Phase: 0–0.3 = scattered gray, 0.3–0.7 = color floods in, 0.7–1 = panels assembled
  const phase = sceneProgress;

  return (
    <group ref={groupRef} visible={visible} position={[0, 0.5, 0]}>
      {shards.map((shard) => (
        <ShardPanel
          key={shard.id}
          shard={shard}
          phase={phase}
          reduced={reduced}
        />
      ))}

      {/* Lighting */}
      <pointLight color="#7C3AED" intensity={5 * sceneProgress} distance={12} position={[-3, 2, 3]} />
      <pointLight color="#22D3EE" intensity={4 * sceneProgress} distance={10} position={[3, -1, 2]} />
      <ambientLight intensity={0.4 * sceneProgress} />
    </group>
  );
}

function ShardPanel({
  shard, phase, reduced,
}: {
  shard: ShardData;
  phase: number;
  reduced: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshStandardMaterial>(null);

  // Layout phase: how assembled vs scattered
  const assemblePhase = Math.max(0, (phase - 0.3) / 0.7);
  // Color saturation phase
  const colorPhase = Math.max(0, (phase - 0.2) / 0.6);

  useFrame((state, delta) => {
    if (!meshRef.current || !matRef.current) return;
    const t = state.clock.getElapsedTime();
    const ap = Math.min(1, assemblePhase);

    // Interpolate position from scattered → panel grid
    const targetX = lerp(shard.explodeX, shard.panelX, ap);
    const targetY = lerp(shard.explodeY, shard.panelY, ap);
    const targetZ = lerp(shard.explodeZ, shard.panelZ, ap);

    meshRef.current.position.x = lerp(meshRef.current.position.x, targetX, 0.06);
    meshRef.current.position.y = lerp(meshRef.current.position.y, targetY, 0.06);
    meshRef.current.position.z = lerp(meshRef.current.position.z, targetZ, 0.06);

    // Interpolate rotation toward 0 (flat panel)
    meshRef.current.rotation.x = lerp(meshRef.current.rotation.x, shard.rotX * (1 - ap), 0.06);
    meshRef.current.rotation.y = lerp(meshRef.current.rotation.y, shard.rotY * (1 - ap) + Math.sin(t * 0.3) * 0.02, 0.06);

    // Color: gray → vivid
    const cp = Math.min(1, colorPhase);
    const gray = new THREE.Color(0.2, 0.2, 0.25);
    const vivid = new THREE.Color(shard.color);
    matRef.current.color.lerpColors(gray, vivid, cp);
    matRef.current.emissive.lerpColors(new THREE.Color(0), vivid, cp * 0.5);
    matRef.current.emissiveIntensity = cp * 0.7;

    // Scale in
    const targetScale = phase > shard.delay ? 1 : 0;
    meshRef.current.scale.setScalar(lerp(meshRef.current.scale.x, targetScale, 0.08));
  });

  return (
    <mesh
      ref={meshRef}
      position={[shard.explodeX, shard.explodeY, shard.explodeZ]}
      scale={0}
    >
      <boxGeometry args={[shard.w, shard.h, 0.04]} />
      <meshStandardMaterial
        ref={matRef}
        color={new THREE.Color(0.2, 0.2, 0.25)}
        roughness={0.3}
        metalness={0.1}
      />
    </mesh>
  );
}
