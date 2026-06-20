'use client';

/**
 * PricingScene — R3F ambient scene for the pricing section
 * Floating glass card shapes drift forward from depth as scroll enters
 */

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { lerp, seededRandom } from '@/lib/utils';
import { useScrollStore } from '@/store/scrollStore';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface PricingSceneProps {
  sceneProgress: number;
  visible?: boolean;
}

interface CardData {
  id: number;
  targetX: number;
  targetY: number;
  startX: number;
  startY: number;
  startZ: number;
  rotOffset: number;
  delay: number;
  accent: string;
  w: number;
  h: number;
}

const ACCENTS = ['#7C3AED', '#22D3EE', '#F5C518', '#7C3AED', '#22D3EE', '#F5C518', '#22D3EE', '#7C3AED', '#F5C518'];

export function PricingScene({ sceneProgress, visible = true }: PricingSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { mouseX, mouseY } = useScrollStore();
  const reduced = useReducedMotion();

  const cards = useMemo<CardData[]>(() => {
    return Array.from({ length: 9 }, (_, i) => {
      const col = (i % 3) - 1;   // -1, 0, 1
      const row = Math.floor(i / 3) - 1; // -1, 0, 1
      return {
        id: i,
        targetX: col * 2.6,
        targetY: row * 1.7,
        startX: (seededRandom(i * 13) - 0.5) * 10,
        startY: (seededRandom(i * 13 + 1) - 0.5) * 5,
        startZ: -16 - seededRandom(i * 7) * 10,
        rotOffset: (seededRandom(i * 11) - 0.5) * 1.2,
        delay: i * 0.07,
        accent: ACCENTS[i],
        w: 1.6 + seededRandom(i * 7 + 2) * 0.15,
        h: 1.0 + seededRandom(i * 7 + 3) * 0.1,
      };
    });
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = lerp(groupRef.current.rotation.y, mouseX * 0.05, 0.03);
    groupRef.current.rotation.x = lerp(groupRef.current.rotation.x, mouseY * 0.03, 0.03);
  });

  return (
    <group ref={groupRef} visible={visible}>
      {cards.map((card) => (
        <FloatingCard key={card.id} card={card} progress={sceneProgress} reduced={reduced} />
      ))}

      <pointLight color="#7C3AED" intensity={8 * sceneProgress} distance={16} position={[-5, 3, 5]} />
      <pointLight color="#22D3EE" intensity={6 * sceneProgress} distance={13} position={[5, -2, 4]} />
      <pointLight color="#F5C518" intensity={3 * sceneProgress} distance={10} position={[0, 5, 6]} />
      <ambientLight intensity={0.35 * sceneProgress} />
    </group>
  );
}

function FloatingCard({
  card,
  progress,
  reduced,
}: {
  card: CardData;
  progress: number;
  reduced: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const edgeMatRef = useRef<THREE.LineBasicMaterial>(null);

  const edgesGeo = useMemo(() => {
    const box = new THREE.BoxGeometry(card.w, card.h, 0.05);
    return new THREE.EdgesGeometry(box);
  }, [card.w, card.h]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    // Delay-gated local progress
    const localP = Math.max(0, Math.min(1, (progress - card.delay) / Math.max(0.001, 1 - card.delay)));

    // Position: interpolate from scatter to grid
    const tx = lerp(card.startX, card.targetX, localP);
    const ty = lerp(card.startY, card.targetY, localP);
    const tz = lerp(card.startZ, 0, localP);

    groupRef.current.position.x = lerp(groupRef.current.position.x, tx, 0.05);
    groupRef.current.position.y = lerp(groupRef.current.position.y, ty, 0.05);
    groupRef.current.position.z = lerp(groupRef.current.position.z, tz, 0.05);

    // Rotation: tumble → flat
    const targetRotY = lerp(card.rotOffset, 0, localP);
    if (!reduced) {
      groupRef.current.rotation.y = lerp(
        groupRef.current.rotation.y,
        targetRotY + Math.sin(t * 0.35 + card.id * 0.9) * 0.025,
        0.04,
      );
      groupRef.current.rotation.x = lerp(
        groupRef.current.rotation.x,
        Math.sin(t * 0.28 + card.id * 0.6) * 0.012,
        0.04,
      );
    }

    // Scale in
    const ts = localP > 0.05 ? 1 : 0;
    groupRef.current.scale.setScalar(lerp(groupRef.current.scale.x, ts, 0.07));

    // Edge glow pulse
    if (edgeMatRef.current) {
      edgeMatRef.current.opacity = localP * (0.5 + Math.sin(t * 1.8 + card.id * 1.1) * 0.18);
    }
  });

  return (
    <group ref={groupRef} position={[card.startX, card.startY, card.startZ]} scale={0}>
      {/* Glass panel */}
      <mesh>
        <boxGeometry args={[card.w, card.h, 0.05]} />
        <meshPhysicalMaterial
          color={new THREE.Color(0.04, 0.04, 0.11)}
          transparent
          opacity={0.52}
          roughness={0.04}
          metalness={0.12}
          depthWrite={false}
        />
      </mesh>

      {/* Top accent strip */}
      <mesh position={[0, card.h / 2 - 0.04, 0.026]}>
        <boxGeometry args={[card.w, 0.06, 0.01]} />
        <meshBasicMaterial color={card.accent} transparent opacity={0.9} />
      </mesh>

      {/* Glowing edges */}
      <lineSegments geometry={edgesGeo}>
        <lineBasicMaterial ref={edgeMatRef} color={card.accent} transparent opacity={0} />
      </lineSegments>
    </group>
  );
}
