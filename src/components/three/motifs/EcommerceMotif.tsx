'use client';

import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { MotifProps } from '../ServiceCanvas';

export function EcommerceMotif({ scrollProgress, mouseX, mouseY, reducedMotion }: MotifProps) {
  const groupRef = useRef<THREE.Group>(null);
  const browserRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);
  const cartRef = useRef<THREE.Group>(null);
  const time = useRef(0);

  useFrame((_, delta) => {
    if (reducedMotion || !groupRef.current) return;
    time.current += delta;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, mouseY * 0.14, 0.05);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouseX * 0.16, 0.05);

    // Browser: fade from wireframe to solid with scroll
    if (browserRef.current) {
      const mat = browserRef.current.material as THREE.MeshStandardMaterial;
      mat.opacity = THREE.MathUtils.lerp(mat.opacity, scrollProgress, 0.05);
      mat.emissiveIntensity = scrollProgress * 0.4;
    }
    if (wireframeRef.current) {
      const mat = wireframeRef.current.material as THREE.MeshStandardMaterial;
      mat.opacity = THREE.MathUtils.lerp(mat.opacity, 1 - scrollProgress * 0.9, 0.05);
    }

    // Cart orbit around browser
    if (cartRef.current) {
      const angle = time.current * 0.5;
      cartRef.current.position.x = Math.cos(angle) * 1.6;
      cartRef.current.position.y = Math.sin(angle) * 0.6;
    }
  });

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <group ref={groupRef} position={[0, 0.1, 0]}>
      {/* Browser frame — solid (fades in) */}
      <mesh ref={browserRef} position={[0, 0.2, 0]}>
        <boxGeometry args={[2.8, 1.9, 0.06]} />
        <meshStandardMaterial
          color="#0D1B3E"
          emissive="#7C3AED"
          emissiveIntensity={0}
          transparent
          opacity={0}
        />
      </mesh>

      {/* Browser frame — wireframe (fades out) */}
      <mesh ref={wireframeRef} position={[0, 0.2, 0]}>
        <boxGeometry args={[2.8, 1.9, 0.06]} />
        <meshStandardMaterial
          color="#22D3EE"
          wireframe
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* URL bar */}
      <mesh position={[0, 1.3, 0.04]}>
        <boxGeometry args={[2.4, 0.2, 0.02]} />
        <meshStandardMaterial color="#0D1B3E" emissive="#22D3EE" emissiveIntensity={0.2} />
      </mesh>

      {/* Grid lines inside browser — UI suggestion */}
      {[-0.6, 0, 0.6].map((x, i) => (
        <mesh key={i} position={[x, 0.1, 0.05]}>
          <boxGeometry args={[0.5, 1.2, 0.01]} />
          <meshStandardMaterial color="#7C3AED" opacity={0.25} transparent emissive="#7C3AED" emissiveIntensity={0.15} />
        </mesh>
      ))}

      {/* Cart orbit group */}
      <group ref={cartRef}>
        {/* Cart body */}
        <mesh>
          <boxGeometry args={[0.28, 0.22, 0.18]} />
          <meshStandardMaterial color="#F5C518" emissive="#F5C518" emissiveIntensity={0.6} />
        </mesh>
        {/* Cart wheel L */}
        <mesh position={[-0.08, -0.12, 0.04]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.06, 0.02, 6, 16]} />
          <meshStandardMaterial color="#F5C518" />
        </mesh>
        {/* Cart wheel R */}
        <mesh position={[0.08, -0.12, 0.04]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.06, 0.02, 6, 16]} />
          <meshStandardMaterial color="#F5C518" />
        </mesh>
      </group>

      <pointLight position={[0, 1, 2]} color="#7C3AED" intensity={1.8} />
      <pointLight position={[2, -1, 1]} color="#22D3EE" intensity={1.0} />
    </group>
  );
}
