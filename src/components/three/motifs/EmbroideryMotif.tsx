'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { MotifProps } from '../ServiceCanvas';

export function EmbroideryMotif({ scrollProgress, mouseX, mouseY, reducedMotion }: MotifProps) {
  const groupRef = useRef<THREE.Group>(null);
  const planeRef = useRef<THREE.Mesh>(null);
  const tubeRef = useRef<THREE.Mesh>(null);
  const time = useRef(0);

  // Stitch path: a simple logo-like curve
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.8, 0, 0),
      new THREE.Vector3(-0.4, 0.6, 0),
      new THREE.Vector3(0, 0.8, 0),
      new THREE.Vector3(0.4, 0.6, 0),
      new THREE.Vector3(0.8, 0, 0),
      new THREE.Vector3(0.4, -0.6, 0),
      new THREE.Vector3(0, -0.4, 0),
      new THREE.Vector3(-0.4, -0.6, 0),
      new THREE.Vector3(-0.8, 0, 0),
    ], true);
  }, []);

  const tubeGeom = useMemo(() => new THREE.TubeGeometry(curve, 80, 0.03, 6, true), [curve]);
  const planeGeom = useMemo(() => new THREE.PlaneGeometry(3.5, 2.5, 20, 14), []);

  useEffect(() => {
    return () => {
      tubeGeom.dispose();
      planeGeom.dispose();
    };
  }, [tubeGeom, planeGeom]);

  useFrame((_, delta) => {
    if (reducedMotion || !groupRef.current) return;
    time.current += delta;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, mouseY * 0.15, 0.06);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouseX * 0.2, 0.06);

    // Fabric wave on plane vertices
    if (planeRef.current) {
      const pos = planeRef.current.geometry.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        pos.setZ(i, Math.sin(x * 1.2 + time.current) * Math.cos(y * 0.9 + time.current * 0.7) * 0.12);
      }
      pos.needsUpdate = true;
      planeRef.current.geometry.computeVertexNormals();
    }

    // Stitch tube draw-in based on scrollProgress
    if (tubeRef.current) {
      const drawProgress = Math.min(scrollProgress * 2, 1);
      tubeRef.current.scale.setScalar(drawProgress > 0.05 ? 1 : 0);
      (tubeRef.current.material as THREE.MeshStandardMaterial).opacity = drawProgress;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -1]}>
      {/* Fabric plane */}
      <mesh ref={planeRef} geometry={planeGeom}>
        <meshStandardMaterial
          color="#f0ede8"
          roughness={0.85}
          metalness={0}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Stitch path tube */}
      <mesh ref={tubeRef} geometry={tubeGeom} position={[0, 0, 0.05]}>
        <meshStandardMaterial
          color="#F5C518"
          emissive="#F5C518"
          emissiveIntensity={0.6}
          transparent
          opacity={1}
        />
      </mesh>

      {/* Left spool */}
      <mesh position={[-1.4, 0, 0.1]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.3, 12]} />
        <meshStandardMaterial color="#8B6914" metalness={0.5} roughness={0.4} />
      </mesh>
      <mesh position={[-1.4, 0, 0.1]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.08, 12]} />
        <meshStandardMaterial color="#A0522D" metalness={0.3} roughness={0.5} />
      </mesh>

      {/* Right spool */}
      <mesh position={[1.4, 0, 0.1]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.3, 12]} />
        <meshStandardMaterial color="#8B6914" metalness={0.5} roughness={0.4} />
      </mesh>
      <mesh position={[1.4, 0, 0.1]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.08, 12]} />
        <meshStandardMaterial color="#A0522D" metalness={0.3} roughness={0.5} />
      </mesh>

      <pointLight position={[0, 2, 2]} color="#F5C518" intensity={1.5} />
      <pointLight position={[0, -2, 1]} color="#ffffff" intensity={0.6} />
    </group>
  );
}
