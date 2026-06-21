'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { MotifProps } from '../ServiceCanvas';

export function ListingOptimizationMotif({ scrollProgress, mouseX, mouseY, reducedMotion }: MotifProps) {
  const groupRef = useRef<THREE.Group>(null);
  const gaugeRef = useRef<THREE.Mesh>(null);
  const needleRef = useRef<THREE.Mesh>(null);
  const arrowRef = useRef<THREE.Group>(null);
  const time = useRef(0);

  // Keyword cloud particle positions
  const cloudPositions = useMemo(() => {
    const count = 28;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const r = 0.4 + Math.random() * 0.7;
      pos[i * 3] = Math.cos(angle) * r + 0.8;
      pos[i * 3 + 1] = Math.sin(angle) * r * 0.8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.6;
    }
    return pos;
  }, []);

  const cloudGeom = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(cloudPositions.slice(), 3));
    return geo;
  }, [cloudPositions]);

  // Trend line points
  const linePoints = useMemo(() => {
    return [
      new THREE.Vector3(-1.5, -0.8, 0.1),
      new THREE.Vector3(-1.1, -0.6, 0.1),
      new THREE.Vector3(-0.6, -0.3, 0.1),
      new THREE.Vector3(-0.1, 0.0, 0.1),
      new THREE.Vector3(0.3, 0.2, 0.1),
      new THREE.Vector3(0.7, 0.5, 0.1),
    ];
  }, []);

  const lineGeom = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints(linePoints);
    return geo;
  }, [linePoints]);

  useEffect(() => {
    return () => {
      cloudGeom.dispose();
      lineGeom.dispose();
    };
  }, [cloudGeom, lineGeom]);

  useFrame((_, delta) => {
    if (reducedMotion || !groupRef.current) return;
    time.current += delta;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, mouseY * 0.13, 0.05);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouseX * 0.15, 0.05);

    // Gauge needle sweeps with scroll
    if (needleRef.current) {
      const targetRot = -Math.PI * 0.65 + scrollProgress * Math.PI * 1.3;
      needleRef.current.rotation.z = THREE.MathUtils.lerp(needleRef.current.rotation.z, targetRot, 0.05);
    }

    // Keyword cloud scale expands with scroll
    if (cloudGeom) {
      const pos = cloudGeom.attributes.position as THREE.BufferAttribute;
      const density = 0.4 + scrollProgress * 0.8;
      for (let i = 0; i < pos.count; i++) {
        const angle = (i / pos.count) * Math.PI * 2;
        const r = (0.3 + (i % 4) * 0.2) * density;
        pos.setX(i, Math.cos(angle + time.current * 0.2) * r + 0.9);
        pos.setY(i, Math.sin(angle + time.current * 0.2) * r * 0.7);
      }
      pos.needsUpdate = true;
    }

    // Arrow bob
    if (arrowRef.current) {
      arrowRef.current.position.y = -1.0 + Math.sin(time.current * 2) * 0.06 + scrollProgress * 0.5;
    }
  });

  return (
    <group ref={groupRef} position={[-0.4, 0, 0]}>
      {/* CVR gauge arc */}
      <mesh position={[-0.9, 0.4, 0]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.65, 0.07, 8, 32, Math.PI * 1.4]} />
        <meshStandardMaterial color="#0D1B3E" emissive="#22D3EE" emissiveIntensity={0.2} />
      </mesh>
      {/* Filled arc based on scroll */}
      <mesh ref={gaugeRef} position={[-0.9, 0.4, 0.01]} rotation={[0, 0, -Math.PI * 0.7 + scrollProgress * Math.PI * 1.4 * 0.5]}>
        <torusGeometry args={[0.65, 0.07, 8, 32, Math.PI * 1.4 * scrollProgress]} />
        <meshStandardMaterial color="#22D3EE" emissive="#22D3EE" emissiveIntensity={0.9} />
      </mesh>

      {/* Gauge needle */}
      <mesh ref={needleRef} position={[-0.9, 0.4, 0.06]}>
        <boxGeometry args={[0.04, 0.5, 0.02]} />
        <meshStandardMaterial color="#F5C518" emissive="#F5C518" emissiveIntensity={0.8} />
      </mesh>

      {/* Keyword cloud particles */}
      <points geometry={cloudGeom}>
        <pointsMaterial color="#7C3AED" size={0.06} transparent opacity={0.8} />
      </points>

      {/* Trend line — use primitive to avoid SVG <line> type conflict */}
      <primitive object={new THREE.Line(lineGeom, new THREE.LineBasicMaterial({ color: '#22D3EE' }))} />

      {/* Up arrow */}
      <group ref={arrowRef} position={[-0.9, -1.0, 0.1]}>
        <mesh>
          <coneGeometry args={[0.12, 0.25, 4]} />
          <meshStandardMaterial color="#F5C518" emissive="#F5C518" emissiveIntensity={1.0} />
        </mesh>
        <mesh position={[0, -0.18, 0]}>
          <boxGeometry args={[0.06, 0.22, 0.04]} />
          <meshStandardMaterial color="#F5C518" emissive="#F5C518" emissiveIntensity={0.7} />
        </mesh>
      </group>

      <pointLight position={[-2, 2, 2]} color="#22D3EE" intensity={1.8} />
      <pointLight position={[2, 0, 1]} color="#7C3AED" intensity={1.2} />
    </group>
  );
}
