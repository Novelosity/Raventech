'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { MotifProps } from '../ServiceCanvas';

export function TiktokAdsMotif({ scrollProgress, mouseX, mouseY, reducedMotion }: MotifProps) {
  const groupRef = useRef<THREE.Group>(null);
  const frameRefs = useRef<(THREE.Mesh | null)[]>([]);
  const time = useRef(0);

  const sparkPositions = useMemo(() => {
    const count = 120;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = 0.5 + Math.random() * 1.5;
      pos[i * 3] = Math.cos(angle) * r;
      pos[i * 3 + 1] = Math.sin(angle) * r;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 1.5;
    }
    return pos;
  }, []);

  const sparkGeom = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(sparkPositions.slice(), 3));
    return geo;
  }, [sparkPositions]);

  useEffect(() => {
    return () => { sparkGeom.dispose(); };
  }, [sparkGeom]);

  useFrame((_, delta) => {
    if (reducedMotion || !groupRef.current) return;
    time.current += delta;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, mouseY * 0.14, 0.05);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouseX * 0.18, 0.05);

    // Swipe/carousel animation — periodic translation
    const swipeOffset = Math.sin(time.current * 0.6) * 0.3;

    frameRefs.current.forEach((frame, i) => {
      if (!frame) return;
      const baseX = (i - 1) * 1.1;
      frame.position.x = THREE.MathUtils.lerp(frame.position.x, baseX + swipeOffset, 0.08);
      const scale = i === 1 ? 1 : 0.75;
      frame.scale.setScalar(THREE.MathUtils.lerp(frame.scale.x, scale, 0.06));
    });

    // Animate spark particle burst on scroll
    if (sparkGeom) {
      const pos = sparkGeom.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < pos.count; i++) {
        const speed = 0.3 + (i % 5) * 0.1;
        const angle = (i / pos.count) * Math.PI * 2 + time.current * speed * 0.5;
        const r = 0.3 + scrollProgress * 1.8 + Math.sin(time.current * 2 + i) * 0.1;
        pos.setXYZ(i, Math.cos(angle) * r, Math.sin(angle) * r, Math.sin(time.current + i) * 0.3);
      }
      pos.needsUpdate = true;
    }
  });

  const frameColors = ['#0D1B3E', '#131428', '#0D1B3E'];

  return (
    <group ref={groupRef}>
      {/* Vertical video frames */}
      {frameColors.map((color, i) => (
        <mesh
          key={i}
          ref={(el) => { frameRefs.current[i] = el; }}
          position={[(i - 1) * 1.1, 0, 0]}
          scale={i === 1 ? 1 : 0.75}
        >
          <boxGeometry args={[0.7, 1.25, 0.06]} />
          <meshStandardMaterial
            color={color}
            emissive={i === 1 ? '#22D3EE' : '#7C3AED'}
            emissiveIntensity={i === 1 ? 0.4 : 0.2}
            metalness={0.1}
            roughness={0.5}
          />
        </mesh>
      ))}

      {/* Spark particles */}
      <points geometry={sparkGeom}>
        <pointsMaterial
          color="#F5C518"
          size={0.045}
          transparent
          opacity={0.75}
        />
      </points>

      <pointLight position={[0, 0, 2]} color="#22D3EE" intensity={2} />
      <pointLight position={[0, 1, 0]} color="#F5C518" intensity={0.8} />
    </group>
  );
}
