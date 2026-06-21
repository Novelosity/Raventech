'use client';

import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { MotifProps } from '../ServiceCanvas';

export function ProductListingMotif({ scrollProgress, mouseX, mouseY, reducedMotion }: MotifProps) {
  const groupRef = useRef<THREE.Group>(null);
  const elementRefs = useRef<(THREE.Mesh | null)[]>([]);
  const time = useRef(0);

  // Elements: image box, title, 5 bullets, price
  const elements = [
    { id: 'image', x: -0.55, y: 0.3, w: 0.9, h: 0.9, color: '#7C3AED', threshold: 0.05 },
    { id: 'title', x: 0.4, y: 0.8, w: 1.0, h: 0.12, color: '#22D3EE', threshold: 0.15 },
    { id: 'b1', x: 0.4, y: 0.58, w: 0.85, h: 0.07, color: '#22D3EE', threshold: 0.25 },
    { id: 'b2', x: 0.4, y: 0.44, w: 0.75, h: 0.07, color: '#22D3EE', threshold: 0.35 },
    { id: 'b3', x: 0.4, y: 0.30, w: 0.9, h: 0.07, color: '#22D3EE', threshold: 0.45 },
    { id: 'b4', x: 0.4, y: 0.16, w: 0.7, h: 0.07, color: '#22D3EE', threshold: 0.55 },
    { id: 'b5', x: 0.4, y: 0.02, w: 0.8, h: 0.07, color: '#22D3EE', threshold: 0.65 },
    { id: 'price', x: -0.2, y: -0.55, w: 0.5, h: 0.14, color: '#F5C518', threshold: 0.75 },
  ];

  useFrame((_, delta) => {
    if (reducedMotion || !groupRef.current) return;
    time.current += delta;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, mouseY * 0.12, 0.05);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouseX * 0.14, 0.05);
    groupRef.current.position.y = Math.sin(time.current * 0.4) * 0.06;

    elementRefs.current.forEach((el, i) => {
      if (!el) return;
      const threshold = elements[i].threshold;
      const progress = Math.max(0, Math.min(1, (scrollProgress - threshold) / 0.15));
      const mat = el.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, progress * 0.7, 0.06);
      mat.opacity = THREE.MathUtils.lerp(mat.opacity, progress * 0.9, 0.06);
    });
  });

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <group ref={groupRef}>
      {/* Listing card background */}
      <mesh position={[0, 0.1, -0.05]}>
        <boxGeometry args={[2.2, 2.2, 0.04]} />
        <meshStandardMaterial color="#060610" />
      </mesh>

      {/* Listing card border */}
      <mesh position={[0, 0.1, -0.04]}>
        <boxGeometry args={[2.22, 2.22, 0.03]} />
        <meshStandardMaterial color="#0D1B3E" wireframe />
      </mesh>

      {/* Content elements that light up */}
      {elements.map((elem, i) => (
        <mesh
          key={elem.id}
          ref={(el) => { elementRefs.current[i] = el; }}
          position={[elem.x, elem.y, 0]}
        >
          <boxGeometry args={[elem.w, elem.h, 0.03]} />
          <meshStandardMaterial
            color="#0D1B3E"
            emissive={elem.color}
            emissiveIntensity={0}
            transparent
            opacity={0}
          />
        </mesh>
      ))}

      <pointLight position={[0, 2, 2]} color="#22D3EE" intensity={1.5} />
      <pointLight position={[0, -2, 1]} color="#7C3AED" intensity={1.0} />
    </group>
  );
}
