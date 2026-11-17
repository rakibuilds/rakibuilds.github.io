// src/components/hero-3d.tsx
'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, MeshDistortMaterial, Sphere, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function Particles({ count = 2000 }: { count?: number }) {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      arr[i] = (Math.random() - 0.5) * 20;
    }
    return arr;
  }, [count]);

  return (
    <Points positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#79e4f2"
        size={0.015}
        sizeAttenuation
        depthWrite={false}
        opacity={0.5}
      />
    </Points>
  );
}

function ScrollSphere() {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    mesh.current.rotation.y = clock.getElapsedTime() * 0.15 + scrollY * 0.002;
    mesh.current.rotation.x = scrollY * 0.001;
  });

  return (
    <Sphere ref={mesh} args={[1.5, 32, 32]}>
      <MeshDistortMaterial
        color="#79e4f2"
        attach="material"
        distort={0.4}
        speed={1.5}
        roughness={0.2}
        metalness={0.8}
        emissive="#79e4f2"
        emissiveIntensity={0.1}
      />
    </Sphere>
  );
}

export default function Hero3D() {
  return (
    <Canvas camera={{ position: [0, 0, 8] }} dpr={[1, 1.5]} gl={{ antialias: false }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#79e4f2" />
      <Float speed={1.5} rotationIntensity={1} floatIntensity={1.5}>
        <ScrollSphere />
      </Float>
      <Particles />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  );
}