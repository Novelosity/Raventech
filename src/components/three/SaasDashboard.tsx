'use client';

/**
 * SaasDashboard — SaaS scene
 * Interconnected dashboard modules linked via glowing data-lines
 * Rotating product ecosystem
 */

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { lerp, seededRandom } from '@/lib/utils';
import { useScrollStore } from '@/store/scrollStore';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface SaasDashboardProps {
  sceneProgress: number;
  visible?: boolean;
}

const MODULES = [
  { x: 0, y: 0, z: 0, w: 2.2, h: 1.4, label: 'Dashboard', color: '#0D1B3E', accent: '#22D3EE', delay: 0 },
  { x: -2.8, y: 0.9, z: 0.3, w: 1.6, h: 1.0, label: 'Analytics', color: '#111827', accent: '#7C3AED', delay: 0.1 },
  { x: 2.8, y: 0.9, z: 0.3, w: 1.6, h: 1.0, label: 'Revenue', color: '#111827', accent: '#F5C518', delay: 0.15 },
  { x: -2.8, y: -1.1, z: 0.2, w: 1.6, h: 0.9, label: 'Users', color: '#0F172A', accent: '#22D3EE', delay: 0.2 },
  { x: 2.8, y: -1.1, z: 0.2, w: 1.6, h: 0.9, label: 'Growth', color: '#0F172A', accent: '#10B981', delay: 0.25 },
  { x: 0, y: -2.0, z: 0.1, w: 2.2, h: 0.7, label: 'Activity', color: '#0D1B3E', accent: '#7C3AED', delay: 0.3 },
];

const CONNECTIONS = [
  [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [1, 3], [2, 4],
];

export function SaasDashboard({ sceneProgress, visible = true }: SaasDashboardProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { mouseX, mouseY } = useScrollStore();
  const reduced = useReducedMotion();

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = lerp(groupRef.current.rotation.y, mouseX * 0.1 - 0.1, 0.04);
    groupRef.current.rotation.x = lerp(groupRef.current.rotation.x, mouseY * 0.05 + 0.1, 0.04);
    if (!reduced) {
      groupRef.current.rotation.z = Math.sin(t * 0.2) * 0.02;
    }
  });

  return (
    <group ref={groupRef} visible={visible} position={[0, 0.3, 0]}>
      {/* Connection data lines */}
      {CONNECTIONS.map(([a, b], i) => (
        <DataLine
          key={i}
          from={MODULES[a]}
          to={MODULES[b]}
          progress={sceneProgress}
          delay={0.2 + i * 0.05}
        />
      ))}

      {/* Dashboard modules */}
      {MODULES.map((mod, i) => (
        <DashboardModule
          key={i}
          module={mod}
          progress={sceneProgress}
          index={i}
          reduced={reduced}
        />
      ))}

      {/* Ambient data particles */}
      <DataParticles progress={sceneProgress} />

      {/* Platform glow disc */}
      <mesh position={[0, -2.5, -1]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[4, 64]} />
        <meshBasicMaterial color="#22D3EE" transparent opacity={sceneProgress * 0.06} depthWrite={false} />
      </mesh>

      {/* Lighting */}
      <pointLight color="#22D3EE" intensity={6 * sceneProgress} distance={12} position={[0, 2, 5]} />
      <pointLight color="#7C3AED" intensity={4 * sceneProgress} distance={10} position={[-3, -1, 4]} />
      <pointLight color="#F5C518" intensity={3 * sceneProgress} distance={8} position={[3, 1, 3]} />
      <ambientLight intensity={0.4} />
    </group>
  );
}

function DashboardModule({
  module, progress, index, reduced,
}: {
  module: typeof MODULES[0];
  progress: number;
  index: number;
  reduced: boolean;
}) {
  const ref = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    const target = progress > module.delay ? 1 : 0;
    const currentScale = ref.current.scale.x;
    ref.current.scale.setScalar(lerp(currentScale, target, 0.06));

    if (!reduced) {
      ref.current.position.z = module.z + Math.sin(t * 0.5 + index * 0.8) * 0.05;
    }

    // Glow pulse
    if (glowRef.current) {
      const mat = glowRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = progress * (0.12 + Math.sin(t * 2 + index) * 0.04);
    }
  });

  return (
    <group ref={ref} position={[module.x, module.y, module.z]} scale={0}>
      {/* Main panel */}
      <mesh>
        <boxGeometry args={[module.w, module.h, 0.06]} />
        <meshStandardMaterial
          color={module.color}
          roughness={0.7}
          metalness={0.1}
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* Top accent bar */}
      <mesh position={[0, module.h / 2 - 0.06, 0.04]}>
        <boxGeometry args={[module.w, 0.08, 0.02]} />
        <meshStandardMaterial
          color={module.accent}
          emissive={module.accent}
          emissiveIntensity={1.5}
        />
      </mesh>

      {/* Inner content lines */}
      {[0.3, 0.1, -0.1].map((y, i) => (
        <mesh key={i} position={[-(module.w * 0.1), y, 0.04]}>
          <boxGeometry args={[module.w * (0.4 + seededRandom(index * 3 + i) * 0.4), 0.04, 0.01]} />
          <meshBasicMaterial color={module.accent} transparent opacity={0.5} />
        </mesh>
      ))}

      {/* Glow rim */}
      <mesh ref={glowRef} position={[0, 0, -0.04]}>
        <boxGeometry args={[module.w + 0.1, module.h + 0.1, 0.01]} />
        <meshBasicMaterial color={module.accent} transparent opacity={0.1} depthWrite={false} />
      </mesh>
    </group>
  );
}

function DataLine({
  from, to, progress, delay,
}: {
  from: typeof MODULES[0];
  to: typeof MODULES[0];
  progress: number;
  delay: number;
}) {
  const lineObj = useMemo(() => {
    const points = [
      new THREE.Vector3(from.x, from.y, from.z + 0.1),
      new THREE.Vector3((from.x + to.x) / 2, (from.y + to.y) / 2 + 0.3, Math.max(from.z, to.z) + 0.5),
      new THREE.Vector3(to.x, to.y, to.z + 0.1),
    ];
    const curve = new THREE.QuadraticBezierCurve3(...(points as [THREE.Vector3, THREE.Vector3, THREE.Vector3]));
    const geo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(32));
    const mat = new THREE.LineBasicMaterial({ color: '#22D3EE', transparent: true, opacity: 0 });
    return new THREE.Line(geo, mat);
  }, [from, to]);

  useFrame((state) => {
    const mat = lineObj.material as THREE.LineBasicMaterial;
    const t = state.clock.getElapsedTime();
    const target = progress > delay ? 1 : 0;
    mat.opacity = lerp(mat.opacity, target * (0.4 + Math.sin(t * 2 + delay * 5) * 0.1), 0.05);
  });

  return <primitive object={lineObj} />;
}

function DataParticles({ progress }: { progress: number }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 80;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (seededRandom(i * 7) - 0.5) * 8;
      arr[i * 3 + 1] = (seededRandom(i * 7 + 1) - 0.5) * 6;
      arr[i * 3 + 2] = seededRandom(i * 7 + 2) * 2;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z = state.clock.getElapsedTime() * 0.05;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#22D3EE"
        size={0.06}
        transparent
        opacity={progress * 0.5}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
