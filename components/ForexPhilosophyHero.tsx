"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Box, Cylinder, Environment } from "@react-three/drei";
import { ArrowRight } from "lucide-react";
import * as THREE from "three";
import { useTranslations } from "next-intl";
import Link from "next/link";

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
        <meshPhysicalMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={0.4}
          transparent
          opacity={0.8}
          roughness={0.1}
          metalness={0.5}
          clearcoat={1}
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

export const ForexPhilosophyHero = () => {
  const t = useTranslations("ForexPhilosophyHero");
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <section className="relative w-full min-h-[95vh] flex items-center justify-center overflow-hidden bg-white dark:bg-[#050508] transition-colors duration-500">
      {/* Lusion-style 3D Background */}
      <motion.div style={{ y }} className="absolute inset-0 z-0 pointer-events-none opacity-90">
        <Canvas camera={{ position: [0, 0, 7] }} gl={{ antialias: true, alpha: true }}>
          <ambientLight intensity={1.5} />
          <directionalLight position={[5, 5, 5]} intensity={2} color="#ffffff" />
          <directionalLight position={[-5, -5, -5]} intensity={1} color="#167E6C" />
          <spotLight position={[0, 10, 0]} intensity={2.5} color="#22d3a8" />
          <Environment preset="city" />
          <AnimatedForexChart3D />
        </Canvas>
      </motion.div>

      {/* Ambient glowing blobs behind content */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
          x: [0, 50, 0],
          y: [0, -50, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 -left-[10%] w-[600px] h-[600px] bg-[#22d3a8] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[128px] pointer-events-none"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.3, 0.15],
          x: [0, -50, 0],
          y: [0, 50, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-1/4 -right-[10%] w-[600px] h-[600px] bg-[#167E6C] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[128px] pointer-events-none"
      />

      {/* Content overlay */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full border border-[#167E6C]/20 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-md shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-[#22d3a8] animate-pulse"></span>
            <span className="text-[#167E6C] text-sm font-semibold tracking-widest uppercase">{t("tagline")}</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-7xl font-bold text-[#111A4A] dark:text-white mb-8 leading-[1.1] tracking-normal font-[family-name:var(--font-figtree)]">
            {t("titlePart1")} <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#167E6C] to-[#22d3a8]">
              {t("titlePart2")}
            </span>
          </h2>
          
          <p className="text-lg md:text-2xl text-[#111A4A]/70 dark:text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed font-medium italic font-[family-name:var(--font-figtree)]">
            "{t("description")}"
          </p>

          <Link href="/philosophy">
            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-[#111A4A] dark:bg-[#167E6C] text-white font-semibold text-lg overflow-hidden transition-all shadow-xl hover:shadow-[#22d3a8]/30 hover:shadow-2xl"
            >
              <span className="relative z-10 flex items-center gap-2">
                {t("button")}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#167E6C] to-[#22d3a8] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
