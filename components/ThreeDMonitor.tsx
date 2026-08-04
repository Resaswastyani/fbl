"use client";

import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, ContactShadows, useTexture, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Monitor component using a simple Box or loaded model. For a highly premium look, 
// we will construct a sleek glassmorphic device plane.
function MonitorObject({ textureUrl }: { textureUrl: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Create a subtle floating rotation
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    // meshRef.current.rotation.y = Math.sin(t / 4) / 4;
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, (state.pointer.y * Math.PI) / 10, 0.1);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, (state.pointer.x * Math.PI) / 6, 0.1);
  });

  const texture = useTexture(textureUrl);

  return (
    <Float floatIntensity={2} rotationIntensity={0.5} speed={2}>
      <mesh ref={meshRef} castShadow receiveShadow>
        <boxGeometry args={[4, 2.5, 0.1]} />
        <meshPhysicalMaterial 
          color="#000" 
          roughness={0.1} 
          metalness={0.9} 
          clearcoat={1} 
          clearcoatRoughness={0.1}
        />
        
        {/* Screen */}
        <mesh position={[0, 0, 0.051]}>
          <planeGeometry args={[3.8, 2.3]} />
          <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>
        
        {/* Glow behind the screen */}
        <mesh position={[0, 0, -0.06]}>
          <planeGeometry args={[3.8, 2.3]} />
          <meshBasicMaterial color="#22d3a8" transparent opacity={0.3} />
        </mesh>
      </mesh>
    </Float>
  );
}

// Particle system for the premium Lusion feel
function Particles({ count = 500 }) {
  const points = useRef<THREE.Points>(null);

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 5 - 2;
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (!points.current) return;
    points.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    points.current.rotation.x = state.clock.getElapsedTime() * 0.03;
  });

  return (
    <Points ref={points} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#22d3a8"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
}

export function ThreeDMonitor({ 
  textureUrl = "/bt1.png",
  className = "w-full h-full min-h-[400px] md:min-h-[500px]"
}: { 
  textureUrl?: string;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        
        <MonitorObject textureUrl={textureUrl} />
        <Particles count={300} />
        
        <ContactShadows 
          position={[0, -1.5, 0]} 
          opacity={0.4} 
          scale={10} 
          blur={2} 
          far={4} 
          color="#000"
        />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
