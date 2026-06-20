'use client';

/**
 * DataTerrain — 3D SEO scene: displaced terrain mesh + rising bar instances + network nodes
 */

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Line } from '@react-three/drei';
import * as THREE from 'three';
import { useScrollStore } from '@/store/scrollStore';
import { lerp, seededRandom } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface DataTerrainProps {
  sceneProgress: number;
  visible?: boolean;
}

export function DataTerrain({ sceneProgress, visible = true }: DataTerrainProps) {
  const terrainRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const reduced = useReducedMotion();
  const { mouseX, mouseY } = useScrollStore();

  // Terrain geometry with vertex displacement
  const terrainGeo = useMemo(() => {
    const geo = new THREE.PlaneGeometry(14, 10, 40, 30);
    const pos = geo.attributes.position.array as Float32Array;
    for (let i = 0; i < pos.length; i += 3) {
      const x = pos[i];
      const y = pos[i + 1];
      // Mountain peak near center-right (SEO #1 peak)
      const distToCenter = Math.sqrt((x - 1) ** 2 + y ** 2);
      pos[i + 2] = Math.max(0, 3 - distToCenter * 0.8) + Math.sin(x * 1.5) * 0.3 + Math.cos(y * 1.2) * 0.2;
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  // Bar chart positions
  const bars = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      x: -3 + i * 0.9,
      y: -2,
      z: 0.5,
      targetH: 0.3 + (i === 6 ? 2.8 : seededRandom(i * 3) * 1.5),
      color: i === 6 ? '#22D3EE' : '#7C3AED',
      delay: i * 0.1,
    }));
  }, []);

  // Network nodes
  const nodes = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      x: (seededRandom(i * 5) - 0.5) * 10,
      y: (seededRandom(i * 5 + 1) - 0.5) * 7,
      z: 1,
      size: 0.05 + seededRandom(i * 5 + 2) * 0.1,
      color: i % 3 === 0 ? '#F5C518' : i % 3 === 1 ? '#22D3EE' : '#7C3AED',
    }));
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    // Subtle camera drift
    groupRef.current.rotation.x = lerp(groupRef.current.rotation.x, -0.3 + mouseY * 0.05, 0.03);
    groupRef.current.rotation.y = lerp(groupRef.current.rotation.y, mouseX * 0.08, 0.03);

    // Terrain animation
    if (terrainRef.current && !reduced) {
      terrainRef.current.rotation.z = Math.sin(t * 0.3) * 0.01;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.5, -2]} visible={visible}>
      {/* Grid terrain */}
      <mesh ref={terrainRef} geometry={terrainGeo} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <meshStandardMaterial
          color="#0D1B3E"
          wireframe={false}
          side={THREE.DoubleSide}
          emissive="#0D1B3E"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Wireframe overlay */}
      <mesh geometry={terrainGeo} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0.01]}>
        <meshBasicMaterial color="#7C3AED" wireframe transparent opacity={0.3} />
      </mesh>

      {/* Bar charts */}
      {bars.map((bar, i) => (
        <AnimatedBar
          key={i}
          position={[bar.x, bar.y, bar.z]}
          targetHeight={bar.targetH * sceneProgress}
          color={bar.color}
          progress={sceneProgress}
          delay={bar.delay}
        />
      ))}

      {/* #1 label */}
      {sceneProgress > 0.5 && (
        <Text
          position={[2.1, bars[6].targetH * sceneProgress - 1.5, 0.5]}
          fontSize={0.4}
          color="#F5C518"
          font="/fonts/SpaceGrotesk-Bold.ttf"
          anchorX="center"
        >
          #1
        </Text>
      )}

      {/* Network nodes */}
      {nodes.map((node, i) => (
        <NetworkNode key={i} {...node} progress={sceneProgress} index={i} />
      ))}

      {/* Connection lines between adjacent nodes */}
      {nodes.slice(0, -1).map((n, i) => (
        <Line
          key={i}
          points={[[n.x, n.y, n.z], [nodes[i + 1].x, nodes[i + 1].y, nodes[i + 1].z]]}
          color="#22D3EE"
          lineWidth={0.5}
          transparent
          opacity={sceneProgress * 0.3}
        />
      ))}

      {/* Lighting */}
      <pointLight color="#22D3EE" intensity={8} distance={12} position={[2, 3, 3]} />
      <pointLight color="#7C3AED" intensity={5} distance={10} position={[-3, 2, 2]} />
      <ambientLight intensity={0.3} />
    </group>
  );
}

function AnimatedBar({
  position,
  targetHeight,
  color,
  progress,
  delay,
}: {
  position: [number, number, number];
  targetHeight: number;
  color: string;
  progress: number;
  delay: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!ref.current) return;
    const h = Math.max(0.01, targetHeight);
    ref.current.scale.y = lerp(ref.current.scale.y, h, 0.05);
    ref.current.position.y = position[1] + ref.current.scale.y / 2;
  });

  return (
    <mesh ref={ref} position={position} scale={[0.3, 0.01, 0.3]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.8}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}

function NetworkNode({
  x, y, z, size, color, progress, index,
}: {
  x: number; y: number; z: number; size: number; color: string; progress: number; index: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.scale.setScalar(lerp(ref.current.scale.x, progress * size * (1 + Math.sin(t * 2 + index) * 0.2), 0.05));
  });

  return (
    <mesh ref={ref} position={[x, y, z]} scale={0}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={2}
      />
    </mesh>
  );
}
