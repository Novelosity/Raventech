'use client';

/**
 * BrandingMorph — Logo & Branding scene
 * Geometry morphs from abstract organic → defined flat emblem
 * Brand identity grid assembles (swatches, type specimens, logo mark)
 */

import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { lerp, seededRandom } from '@/lib/utils';
import { useScrollStore } from '@/store/scrollStore';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface BrandingMorphProps {
  sceneProgress: number;
  visible?: boolean;
}

export function BrandingMorph({ sceneProgress, visible = true }: BrandingMorphProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { mouseX, mouseY } = useScrollStore();
  const reduced = useReducedMotion();

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = lerp(groupRef.current.rotation.y, mouseX * 0.08, 0.04);
    groupRef.current.rotation.x = lerp(groupRef.current.rotation.x, mouseY * 0.04, 0.04);
  });

  return (
    <group ref={groupRef} visible={visible}>
      {/* Central morphing logo mark */}
      <LogoMorph progress={sceneProgress} reduced={reduced} />

      {/* Brand grid elements */}
      <BrandGrid progress={sceneProgress} />

      {/* Geometric construction lines */}
      <ConstructionLines progress={sceneProgress} />

      {/* Lighting */}
      <pointLight color="#F5C518" intensity={6 * sceneProgress} distance={10} position={[2, 3, 3]} />
      <pointLight color="#7C3AED" intensity={4 * sceneProgress} distance={8} position={[-3, -1, 2]} />
      <ambientLight intensity={0.5} />
    </group>
  );
}

function LogoMorph({ progress, reduced }: { progress: number; reduced: boolean }) {
  const ref = useRef<THREE.Mesh>(null);

  // Two morphing geometries: organic → defined
  const organicGeo = useMemo(() => new THREE.IcosahedronGeometry(0.8, 2), []);
  const definedGeo = useMemo(() => {
    // Stylized "R" chevron mark via extrusion
    const shape = new THREE.Shape();
    shape.moveTo(-0.5, -0.6);
    shape.lineTo(-0.5, 0.6);
    shape.lineTo(0.1, 0.6);
    shape.quadraticCurveTo(0.5, 0.6, 0.5, 0.25);
    shape.quadraticCurveTo(0.5, 0, 0.1, 0);
    shape.lineTo(0.5, -0.6);
    shape.lineTo(0.15, -0.6);
    shape.lineTo(-0.15, 0);
    shape.lineTo(-0.2, 0);
    shape.lineTo(-0.2, -0.6);
    shape.closePath();
    return new THREE.ExtrudeGeometry(shape, { depth: 0.12, bevelEnabled: true, bevelSize: 0.02, bevelThickness: 0.02 });
  }, []);

  useFrame((state, delta) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();

    if (!reduced) {
      ref.current.rotation.y += delta * (1 - progress) * 0.5;
    }

    ref.current.scale.setScalar(lerp(ref.current.scale.x, progress > 0.1 ? 1.2 : 0, 0.05));
  });

  const morphProgress = Math.min(1, progress * 1.5);

  return (
    <group position={[0, 0.3, 0]}>
      {/* Organic icosahedron (fades out) */}
      <mesh ref={ref} geometry={organicGeo} scale={0}>
        <meshStandardMaterial
          color="#7C3AED"
          emissive="#7C3AED"
          emissiveIntensity={morphProgress > 0.7 ? 0 : 1.5 * (1 - morphProgress)}
          transparent
          opacity={1 - morphProgress}
          metalness={0.3}
          roughness={0.2}
        />
      </mesh>

      {/* Defined logo mark (fades in) */}
      <mesh
        geometry={definedGeo}
        scale={morphProgress > 0.3 ? [1.2, 1.2, 1.2] : [0, 0, 0]}
        position={[-0.05, -0.05, 0]}
      >
        <meshStandardMaterial
          color="#ffffff"
          metalness={0.8}
          roughness={0.1}
          emissive="#F5C518"
          emissiveIntensity={morphProgress * 0.3}
        />
      </mesh>

      {/* Glow disc behind logo */}
      <mesh position={[0, 0, -0.2]} scale={morphProgress * 1.8}>
        <circleGeometry args={[0.9, 32]} />
        <meshBasicMaterial color="#7C3AED" transparent opacity={0.15} depthWrite={false} />
      </mesh>
    </group>
  );
}

function BrandGrid({ progress }: { progress: number }) {
  const assembleProgress = Math.max(0, (progress - 0.4) / 0.6);

  // Color swatches
  const swatches = [
    { color: '#7C3AED', x: -3, y: 1.5 },
    { color: '#22D3EE', x: -2.3, y: 1.5 },
    { color: '#F5C518', x: -1.6, y: 1.5 },
    { color: '#0A0A0F', x: -0.9, y: 1.5 },
    { color: '#ffffff', x: -0.2, y: 1.5 },
  ];

  return (
    <group>
      {/* Color swatches */}
      {swatches.map((s, i) => (
        <SwatchPanel
          key={i}
          position={[s.x, s.y, 0]}
          color={s.color}
          progress={assembleProgress}
          delay={i * 0.08}
        />
      ))}

      {/* Typography specimen blocks */}
      {[-3, -2, -1].map((x, i) => (
        <TypographyBlock
          key={i}
          position={[x + i * 0.8, -1.8, 0]}
          progress={assembleProgress}
          delay={0.3 + i * 0.1}
        />
      ))}

      {/* Grid lines */}
      <GridLines progress={assembleProgress} />
    </group>
  );
}

function SwatchPanel({
  position, color, progress, delay,
}: {
  position: [number, number, number];
  color: string;
  progress: number;
  delay: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!ref.current) return;
    const target = progress > delay ? 1 : 0;
    ref.current.scale.setScalar(lerp(ref.current.scale.x, target * 0.5, 0.06));
  });

  return (
    <mesh ref={ref} position={position} scale={0}>
      <boxGeometry args={[0.55, 0.55, 0.03]} />
      <meshStandardMaterial color={color} roughness={0.3} metalness={0.1} />
    </mesh>
  );
}

function TypographyBlock({
  position, progress, delay,
}: {
  position: [number, number, number];
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
      <boxGeometry args={[0.7, 0.35, 0.02]} />
      <meshStandardMaterial color="#1a1a2e" roughness={0.8} emissive="#22D3EE" emissiveIntensity={0.2} />
    </mesh>
  );
}

function GridLines({ progress }: { progress: number }) {
  const ref = useRef<THREE.LineSegments>(null);

  const geo = useMemo(() => {
    const points: number[] = [];
    for (let x = -4; x <= 4; x++) {
      points.push(x, -3, 0, x, 3, 0);
    }
    for (let y = -3; y <= 3; y++) {
      points.push(-4, y, 0, 4, y, 0);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(points), 3));
    return g;
  }, []);

  return (
    <lineSegments ref={ref} geometry={geo}>
      <lineBasicMaterial color="#7C3AED" transparent opacity={progress * 0.12} />
    </lineSegments>
  );
}

function ConstructionLines({ progress }: { progress: number }) {
  const lineRef = useRef<THREE.Line>(null);

  const lineObj = useMemo(() => {
    const curve = new THREE.EllipseCurve(0, 0, 1.4, 1.4, 0, Math.PI * 2, false, 0);
    const points = curve.getPoints(64);
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    const mat = new THREE.LineBasicMaterial({ color: '#F5C518', transparent: true, opacity: 0 });
    return new THREE.Line(geo, mat);
  }, []);

  useEffect(() => {
    const mat = lineObj.material as THREE.LineBasicMaterial;
    mat.opacity = progress * 0.4;
  }, [progress, lineObj]);

  return <primitive object={lineObj} position={[0, 0.3, -0.1]} />;
}
