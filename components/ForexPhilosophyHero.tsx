"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Environment } from "@react-three/drei";
import { ArrowRight } from "lucide-react";
import * as THREE from "three";
import { useTranslations } from "next-intl";
import Link from "next/link";

const AnimatedBlob = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={0.6} floatIntensity={2.5}>
      <Sphere ref={meshRef} args={[1, 128, 128]} scale={2.4}>
        <MeshDistortMaterial
          color="#22d3a8"
          attach="material"
          distort={0.5}
          speed={1.5}
          roughness={0.1}
          metalness={0.2}
          transmission={0.9}
          ior={1.5}
          thickness={0.5}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </Sphere>
    </Float>
  );
};

export const ForexPhilosophyHero = () => {
  const t = useTranslations("ForexPhilosophyHero");
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <section className="relative w-full min-h-[95vh] flex items-center justify-center overflow-hidden bg-white">
      {/* Lusion-style 3D Background */}
      <motion.div style={{ y }} className="absolute inset-0 z-0 pointer-events-none opacity-90">
        <Canvas camera={{ position: [0, 0, 7] }} gl={{ antialias: true, alpha: true }}>
          <ambientLight intensity={1.5} />
          <directionalLight position={[5, 5, 5]} intensity={2} color="#ffffff" />
          <directionalLight position={[-5, -5, -5]} intensity={1} color="#167E6C" />
          <spotLight position={[0, 10, 0]} intensity={2.5} color="#22d3a8" />
          <Environment preset="city" />
          <AnimatedBlob />
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
        className="absolute top-1/4 -left-[10%] w-[600px] h-[600px] bg-[#22d3a8] rounded-full mix-blend-multiply filter blur-[128px] pointer-events-none"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.3, 0.15],
          x: [0, -50, 0],
          y: [0, 50, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-1/4 -right-[10%] w-[600px] h-[600px] bg-[#167E6C] rounded-full mix-blend-multiply filter blur-[128px] pointer-events-none"
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
            className="inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full border border-[#167E6C]/20 bg-white/70 backdrop-blur-md shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-[#22d3a8] animate-pulse"></span>
            <span className="text-[#167E6C] text-sm font-semibold tracking-widest uppercase">{t("tagline")}</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-7xl font-extrabold text-[#111A4A] mb-8 leading-[1.1] tracking-tight">
            {t("titlePart1")} <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#167E6C] to-[#22d3a8]">
              {t("titlePart2")}
            </span>
          </h2>
          
          <p className="text-lg md:text-2xl text-[#111A4A]/70 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
            {t("description")}
          </p>

          <Link href="/philosophy">
            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-[#111A4A] text-white font-semibold text-lg overflow-hidden transition-all shadow-xl hover:shadow-[#22d3a8]/30 hover:shadow-2xl"
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
