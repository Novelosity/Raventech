'use client';

import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';
import type { MotifProps } from '../ServiceCanvas';

export function LogoCreationMotif({ scrollProgress, mouseX, mouseY, reducedMotion }: MotifProps) {
  const groupRef = useRef<THREE.Group>(null);
  const icosaRef = useRef<THREE.Mesh>(null);
  const octaRef = useRef<THREE.Mesh>(null);
  const tetraRef = useRef<THREE.Mesh>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      [icosaRef, octaRef, tetraRef].forEach((r) => {
        if (r.current) {
          r.current.geometry?.dispose();
          if (r.current.material instanceof THREE.Material) r.current.material.dispose();
        }
      });
    };
  }, []);

  useFrame((_, delta) => {
    if (reducedMotion || !groupRef.current) return;

    // Mouse parallax tilt on the whole group
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, mouseY * 0.18, 0.06);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouseX * 0.18, 0.06);

    // Individual slow rotations
    if (icosaRef.current) {
      icosaRef.current.rotation.x += delta * 0.18;
      icosaRef.current.rotation.y += delta * 0.12;
    }
    if (octaRef.current) {
      octaRef.current.rotation.y += delta * 0.22;
      octaRef.current.rotation.z += delta * 0.08;
    }
    if (tetraRef.current) {
      tetraRef.current.rotation.x += delta * 0.28;
    }

    // Scroll: converge shapes toward center
    const spread = 1 - scrollProgress * 0.6;
    if (icosaRef.current) {
      icosaRef.current.position.x = THREE.MathUtils.lerp(icosaRef.current.position.x, -1.4 * spread, 0.05);
      icosaRef.current.position.y = THREE.MathUtils.lerp(icosaRef.current.position.y, 0.6 * spread, 0.05);
    }
    if (octaRef.current) {
      octaRef.current.position.x = THREE.MathUtils.lerp(octaRef.current.position.x, 1.5 * spread, 0.05);
      octaRef.current.position.y = THREE.MathUtils.lerp(octaRef.current.position.y, -0.4 * spread, 0.05);
    }
    if (tetraRef.current) {
      tetraRef.current.position.x = THREE.MathUtils.lerp(tetraRef.current.position.x, 0.2 * spread, 0.05);
      tetraRef.current.position.y = THREE.MathUtils.lerp(tetraRef.current.position.y, -1.2 * spread, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Primary: glassy icosahedron */}
      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.5}>
        <mesh ref={icosaRef} position={[-1.4, 0.6, 0]}>
          <icosahedronGeometry args={[0.9, 0]} />
          <MeshTransmissionMaterial
            backside
            samples={4}
            thickness={0.3}
            roughness={0.05}
            transmission={0.95}
            ior={1.5}
            color="#7C3AED"
            chromaticAberration={0.04}
          />
        </mesh>
      </Float>

      {/* Secondary: cyan octahedron */}
      <Float speed={0.9} rotationIntensity={0.4} floatIntensity={0.4}>
        <mesh ref={octaRef} position={[1.5, -0.4, -0.3]}>
          <octahedronGeometry args={[0.65, 0]} />
          <meshStandardMaterial
            color="#22D3EE"
            emissive="#22D3EE"
            emissiveIntensity={0.7}
            metalness={0.3}
            roughness={0.2}
          />
        </mesh>
      </Float>

      {/* Tertiary: gold tetrahedron */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.6}>
        <mesh ref={tetraRef} position={[0.2, -1.2, 0.2]}>
          <tetrahedronGeometry args={[0.45, 0]} />
          <meshStandardMaterial
            color="#F5C518"
            emissive="#F5C518"
            emissiveIntensity={0.5}
            metalness={0.4}
            roughness={0.15}
          />
        </mesh>
      </Float>

      {/* Lighting */}
      <pointLight position={[-2, 2, 2]} color="#7C3AED" intensity={2} />
      <pointLight position={[2, -1, 1]} color="#22D3EE" intensity={1.2} />
    </group>
  );
}
