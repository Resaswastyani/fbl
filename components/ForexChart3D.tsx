"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Box, Cylinder } from "@react-three/drei";
import * as THREE from "three";

const Candlestick = ({ position, color, height, wickHeight, delay = 0 }: { position: [number, number, number], color: string, height: number, wickHeight: number, delay?: number }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 2 + delay) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Wick */}
      <Cylinder args={[0.02, 0.02, wickHeight, 8]} position={[0, 0, 0]}>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} />
      </Cylinder>
      {/* Body */}
      <Box args={[0.25, height, 0.25]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.4}
          transparent
          opacity={0.85}
          roughness={0.2}
          metalness={0.5}
        />
      </Box>
    </group>
  );
};

const AnimatedForexChart3D = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
      <group ref={groupRef} scale={1.8} position={[0, -0.5, 0]}>
        <Candlestick position={[-1.2, -0.2, 0.2]} color="#ef4444" height={0.8} wickHeight={1.5} delay={0} />
        <Candlestick position={[-0.4, 0.4, -0.2]} color="#22d3a8" height={1.2} wickHeight={2.0} delay={1} />
        <Candlestick position={[0.4, 1.0, 0.3]} color="#22d3a8" height={1.6} wickHeight={2.5} delay={2} />
        <Candlestick position={[1.2, 0.6, -0.1]} color="#ef4444" height={0.5} wickHeight={1.2} delay={3} />
      </group>
    </Float>
  );
};

// Scene 3D dipisah agar three.js hanya dimuat saat dibutuhkan (lewat next/dynamic).
// `active` = false menghentikan render loop saat section di luar layar.
export default function ForexChart3D({ active }: { active: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 7] }}
      dpr={[1, 1.5]}
      frameloop={active ? "always" : "never"}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
    >
      {/* Pencahayaan lokal — tanpa <Environment preset> yang mengunduh HDR dari CDN */}
      <ambientLight intensity={1.8} />
      <directionalLight position={[5, 5, 5]} intensity={2.2} color="#ffffff" />
      <directionalLight position={[-5, -5, -5]} intensity={1} color="#167E6C" />
      <pointLight position={[0, 6, 4]} intensity={2.5} color="#22d3a8" />
      <AnimatedForexChart3D />
    </Canvas>
  );
}
