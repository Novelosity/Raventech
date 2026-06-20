'use client';

/**
 * BrowserFrame — Web Dev scene
 * 3D browser builds wireframe → fills with live UI, code streams beside it
 */

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { lerp, seededRandom } from '@/lib/utils';
import { useScrollStore } from '@/store/scrollStore';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface BrowserFrameProps {
  sceneProgress: number;
  visible?: boolean;
}

export function BrowserFrame({ sceneProgress, visible = true }: BrowserFrameProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { mouseX, mouseY } = useScrollStore();
  const reduced = useReducedMotion();

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = lerp(groupRef.current.rotation.y, mouseX * 0.12 - 0.15, 0.04);
    groupRef.current.rotation.x = lerp(groupRef.current.rotation.x, mouseY * 0.06 + 0.05, 0.04);
    if (!reduced) {
      groupRef.current.position.y = Math.sin(t * 0.4) * 0.05;
    }
  });

  const fillProgress = Math.max(0, (sceneProgress - 0.2) / 0.8);
  const codeProgress = Math.max(0, (sceneProgress - 0.1) / 0.9);

  return (
    <group ref={groupRef} position={[0, 0, 0]} visible={visible}>
      {/* Browser shell */}
      <BrowserShell progress={sceneProgress} />

      {/* Screen content fills in */}
      <ScreenContent progress={fillProgress} />

      {/* Code stream panel */}
      <CodeStream progress={codeProgress} />

      {/* Floating UI component chips */}
      <UIComponents progress={fillProgress} />

      {/* Lighting */}
      <pointLight color="#22D3EE" intensity={5 * sceneProgress} distance={10} position={[3, 2, 4]} />
      <pointLight color="#7C3AED" intensity={3 * sceneProgress} distance={8} position={[-2, -1, 3]} />
      <ambientLight intensity={0.5} />
    </group>
  );
}

function BrowserShell({ progress }: { progress: number }) {
  const frameRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);

  const frameGeo = useMemo(() => new THREE.BoxGeometry(4.4, 3.0, 0.08), []);

  useFrame(() => {
    if (!frameRef.current || !wireRef.current) return;
    const scale = progress > 0.05 ? 1 : 0;
    frameRef.current.scale.setScalar(lerp(frameRef.current.scale.x, scale, 0.05));
    wireRef.current.scale.setScalar(lerp(wireRef.current.scale.x, scale, 0.05));
    // Wireframe fades to solid
    const wireOpacity = Math.max(0, 0.6 - progress * 0.8);
    (wireRef.current.material as THREE.MeshBasicMaterial).opacity = wireOpacity;
  });

  return (
    <group>
      {/* Solid shell (fades in) */}
      <mesh ref={frameRef} scale={0}>
        <primitive object={frameGeo} />
        <meshStandardMaterial color="#0D1B3E" roughness={0.6} metalness={0.3} transparent opacity={progress > 0.3 ? 0.9 : 0} />
      </mesh>

      {/* Wireframe (visible first, fades out) */}
      <mesh ref={wireRef} scale={0}>
        <primitive object={frameGeo} />
        <meshBasicMaterial color="#22D3EE" wireframe transparent opacity={0.6} />
      </mesh>

      {/* Browser top bar */}
      <mesh position={[0, 1.35, 0.05]} scale={[4.4, 0.3, 0.05]}>
        <boxGeometry />
        <meshStandardMaterial color="#111827" roughness={0.8} transparent opacity={progress * 0.9} />
      </mesh>

      {/* URL bar */}
      <mesh position={[0.2, 1.35, 0.1]} scale={[2.8, 0.12, 0.02]}>
        <boxGeometry />
        <meshStandardMaterial color="#1F2937" roughness={0.9} transparent opacity={progress * 0.8} />
      </mesh>

      {/* Traffic lights */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[-1.9 + i * 0.18, 1.35, 0.1]} scale={[0.06, 0.06, 0.06]}>
          <sphereGeometry args={[1, 8, 8]} />
          <meshStandardMaterial
            color={['#EF4444', '#F5C518', '#10B981'][i]}
            emissive={['#EF4444', '#F5C518', '#10B981'][i]}
            emissiveIntensity={progress}
          />
        </mesh>
      ))}
    </group>
  );
}

function ScreenContent({ progress }: { progress: number }) {
  // Simulated UI sections
  const sections = [
    { y: 0.7, w: 3.2, h: 0.5, color: '#7C3AED', label: 'hero' },
    { y: 0.2, w: 1.2, h: 0.35, color: '#22D3EE', label: 'card' },
    { y: 0.2, w: 1.2, h: 0.35, color: '#0D1B3E', label: 'card2', x: 1.1 },
    { y: -0.25, w: 3.2, h: 0.3, color: '#111827', label: 'nav' },
    { y: -0.6, w: 0.8, h: 0.6, color: '#1F2937', label: 'col1', x: -1.1 },
    { y: -0.6, w: 0.8, h: 0.6, color: '#1F2937', label: 'col2', x: 0 },
    { y: -0.6, w: 0.8, h: 0.6, color: '#1F2937', label: 'col3', x: 1.1 },
  ];

  return (
    <group position={[0, 0, 0.06]}>
      {sections.map((s, i) => (
        <ScreenPanel
          key={i}
          position={[(s as any).x ?? 0, s.y, 0]}
          size={[s.w, s.h]}
          color={s.color}
          progress={progress}
          delay={i * 0.06}
        />
      ))}
    </group>
  );
}

function ScreenPanel({
  position, size, color, progress, delay,
}: {
  position: [number, number, number];
  size: [number, number];
  color: string;
  progress: number;
  delay: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!ref.current) return;
    const target = progress > delay ? 1 : 0;
    ref.current.scale.setScalar(lerp(ref.current.scale.x, target, 0.07));
  });

  return (
    <mesh ref={ref} position={position} scale={0}>
      <boxGeometry args={[size[0], size[1], 0.01]} />
      <meshStandardMaterial
        color={color}
        roughness={0.8}
        emissive={color}
        emissiveIntensity={0.1}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}

function CodeStream({ progress }: { progress: number }) {
  const ref = useRef<THREE.Group>(null);
  const reduced = useReducedMotion();

  useFrame((state) => {
    if (!ref.current || reduced) return;
    ref.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
  });

  return (
    <group ref={ref} position={[3.2, 0, 0]}>
      {Array.from({ length: 16 }, (_, i) => (
        <CodeLine
          key={i}
          y={1.2 - i * 0.16}
          width={seededRandom(i * 3) * 0.8 + 0.4}
          color={i % 4 === 0 ? '#7C3AED' : i % 4 === 1 ? '#22D3EE' : i % 4 === 2 ? '#F5C518' : '#4B5563'}
          progress={progress}
          delay={i * 0.04}
        />
      ))}
    </group>
  );
}

function CodeLine({
  y, width, color, progress, delay,
}: {
  y: number; width: number; color: string; progress: number; delay: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const mat = ref.current.material as THREE.MeshBasicMaterial;
    const target = progress > delay ? 1 : 0;
    mat.opacity = lerp(mat.opacity, target * 0.7, 0.05);
    // Shimmer
    mat.opacity *= 0.9 + Math.sin(state.clock.getElapsedTime() * 3 + delay * 10) * 0.1;
  });

  return (
    <mesh ref={ref} position={[width / 2 - 0.8, y, 0]}>
      <boxGeometry args={[width, 0.04, 0.01]} />
      <meshBasicMaterial color={color} transparent opacity={0} />
    </mesh>
  );
}

function UIComponents({ progress }: { progress: number }) {
  const components = [
    { x: -2.8, y: 1.8, z: 0.5, label: 'Button', color: '#7C3AED' },
    { x: 2.8, y: 0.8, z: 0.4, label: 'Card', color: '#22D3EE' },
    { x: -2.5, y: -0.5, z: 0.3, label: 'Input', color: '#F5C518' },
    { x: 3.0, y: -0.8, z: 0.5, label: 'Nav', color: '#7C3AED' },
  ];

  return (
    <>
      {components.map((c, i) => (
        <FloatingChip
          key={i}
          position={[c.x, c.y, c.z]}
          color={c.color}
          progress={progress}
          delay={0.4 + i * 0.1}
          index={i}
        />
      ))}
    </>
  );
}

function FloatingChip({
  position, color, progress, delay, index,
}: {
  position: [number, number, number];
  color: string;
  progress: number;
  delay: number;
  index: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    const target = progress > delay ? 1 : 0;
    ref.current.scale.setScalar(lerp(ref.current.scale.x, target * 0.4, 0.06));
    ref.current.position.y = position[1] + Math.sin(t * 0.7 + index) * 0.08;
  });

  return (
    <mesh ref={ref} position={position} scale={0}>
      <boxGeometry args={[1.2, 0.3, 0.06]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        roughness={0.4}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
}
