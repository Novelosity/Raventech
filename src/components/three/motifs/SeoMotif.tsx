'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { MotifProps } from '../ServiceCanvas';

const BAR_HEIGHTS = [0.4, 0.7, 1.0, 1.4, 1.9];
const BAR_COLORS = ['#22D3EE', '#22D3EE', '#7C3AED', '#7C3AED', '#F5C518'];

export function SeoMotif({ scrollProgress, mouseX, mouseY, reducedMotion }: MotifProps) {
  const groupRef = useRef<THREE.Group>(null);
  const terrainRef = useRef<THREE.Mesh>(null);
  const barRefs = useRef<(THREE.Mesh | null)[]>([]);
  const nodeRefs = useRef<(THREE.Mesh | null)[]>([]);
  const time = useRef(0);

  const terrainGeom = useMemo(() => new THREE.PlaneGeometry(6, 4, 28, 18), []);

  useEffect(() => {
    return () => { terrainGeom.dispose(); };
  }, [terrainGeom]);

  useFrame((_, delta) => {
    if (reducedMotion || !groupRef.current) return;
    time.current += delta * 0.4;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, mouseY * 0.12 - 0.5, 0.05);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouseX * 0.15, 0.05);

    // Animate terrain
    if (terrainRef.current) {
      const pos = terrainRef.current.geometry.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const z = pos.getZ(i);
        pos.setY(i, Math.sin(x * 0.6 + time.current) * Math.cos(z * 0.5 + time.current * 0.8) * 0.25);
      }
      pos.needsUpdate = true;
      terrainRef.current.geometry.computeVertexNormals();
    }

    // Animate bars growing with scroll
    barRefs.current.forEach((bar, i) => {
      if (!bar) return;
      const targetH = BAR_HEIGHTS[i] * scrollProgress;
      bar.scale.y = THREE.MathUtils.lerp(bar.scale.y, Math.max(0.01, targetH), 0.06);
      bar.position.y = bar.scale.y * BAR_HEIGHTS[i] * 0.5 - 0.6;
    });

    // Nodes float
    nodeRefs.current.forEach((node, i) => {
      if (!node) return;
      node.position.y = Math.sin(time.current * 1.2 + i * 1.1) * 0.15 + (i % 2 === 0 ? 0.5 : -0.2);
    });
  });

  return (
    <group ref={groupRef} position={[0, 0, -1]} rotation={[-0.5, 0, 0]}>
      {/* Terrain */}
      <mesh ref={terrainRef} geometry={terrainGeom} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.8, 0]}>
        <meshStandardMaterial
          color="#0D1B3E"
          emissive="#22D3EE"
          emissiveIntensity={0.1}
          wireframe
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Ranking bars */}
      {BAR_HEIGHTS.map((h, i) => (
        <mesh
          key={i}
          ref={(el) => { barRefs.current[i] = el; }}
          position={[-1.6 + i * 0.8, -0.6, 0.2]}
          scale={[1, 0.01, 1]}
        >
          <boxGeometry args={[0.22, h, 0.22]} />
          <meshStandardMaterial
            color={BAR_COLORS[i]}
            emissive={BAR_COLORS[i]}
            emissiveIntensity={i === 4 ? 1.0 : 0.4}
            metalness={0.2}
            roughness={0.3}
          />
        </mesh>
      ))}

      {/* Keyword nodes */}
      {[[-1.2, 0.5, 0.8], [0.4, 0.3, 0.5], [1.8, 0.6, 0.6], [-0.3, -0.2, 0.9]].map((pos, i) => (
        <mesh
          key={i}
          ref={(el) => { nodeRefs.current[i] = el; }}
          position={pos as [number, number, number]}
        >
          <sphereGeometry args={[0.08, 10, 10]} />
          <meshStandardMaterial color="#7C3AED" emissive="#7C3AED" emissiveIntensity={1.2} />
        </mesh>
      ))}

      <pointLight position={[0, 3, 2]} color="#22D3EE" intensity={2} />
      <pointLight position={[0, -1, 1]} color="#7C3AED" intensity={1} />
    </group>
  );
}
