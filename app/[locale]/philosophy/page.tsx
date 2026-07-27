"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ShieldCheck, Target, Clock, HeartPulse, XCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRef, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import * as THREE from "three";

const Candlestick = ({ position, color, height, wickHeight, delay = 0, isDynamic = false }: { position: [number, number, number], color: string, height: number, wickHeight: number, delay?: number, isDynamic?: boolean }) => {
  const groupRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 1.5 + delay) * 0.05;
      
      if (isDynamic && bodyRef.current) {
        const pulse = 1 + Math.sin(state.clock.getElapsedTime() * 3 + delay) * 0.1;
        bodyRef.current.scale.y = pulse;
      }
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Wick */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.015, 0.015, wickHeight, 8]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} />
      </mesh>
      {/* Body */}
      <mesh ref={bodyRef} position={[0, 0, 0]}>
        <boxGeometry args={[0.2, height, 0.2]} />
        <meshPhysicalMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={0.4}
          transparent
          opacity={0.8}
          roughness={0.1}
          metalness={0.8}
          clearcoat={1}
        />
      </mesh>
    </group>
  );
};

const FloatingCoin = () => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.getElapsedTime() * 0.4;
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.5;
    }
  });

  return (
    <Float speed={3} rotationIntensity={1.5} floatIntensity={2} position={[2, 1, -1]}>
      <mesh ref={ref}>
        <torusGeometry args={[0.4, 0.1, 16, 32]} />
        <meshStandardMaterial color="#fbbf24" metalness={1} roughness={0.2} emissive="#fbbf24" emissiveIntensity={0.4} />
      </mesh>
    </Float>
  );
};

const AbstractNodes = () => {
  return (
    <group>
      <Float speed={2} rotationIntensity={1} floatIntensity={1.5} position={[-2, 1.5, -2]}>
        <mesh>
          <sphereGeometry args={[0.2, 32, 32]} />
          <meshPhysicalMaterial color="#22d3a8" emissive="#22d3a8" emissiveIntensity={0.5} clearcoat={1} metalness={0.9} roughness={0.1} transparent opacity={0.7} />
        </mesh>
      </Float>
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2} position={[1.5, -0.5, 1.5]}>
        <mesh>
          <sphereGeometry args={[0.1, 32, 32]} />
          <meshStandardMaterial color="#167E6C" emissive="#167E6C" emissiveIntensity={0.8} />
        </mesh>
      </Float>
    </group>
  );
};

const TrendLine = () => {
  // A glowing line connecting the candlesticks abstractly
  const points = useMemo(() => {
    return [
      new THREE.Vector3(-1.5, -0.5, 0.2),
      new THREE.Vector3(-0.8, 0.1, -0.1),
      new THREE.Vector3(-0.1, 0.7, 0.1),
      new THREE.Vector3(0.6, 1.3, -0.2),
      new THREE.Vector3(1.3, 0.8, 0.3)
    ];
  }, []);
  
  const curve = useMemo(() => new THREE.CatmullRomCurve3(points), [points]);
  
  return (
    <mesh>
      <tubeGeometry args={[curve, 64, 0.02, 8, false]} />
      <meshStandardMaterial color="#22d3a8" emissive="#22d3a8" emissiveIntensity={2} />
    </mesh>
  );
};

const AnimatedForexChart3D = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.3;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
    }
  });

  return (
    <group scale={1.5} position={[0, -0.5, 0]}>
      {/* Decorative Floor Rings */}
      <mesh position={[0, -1.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.5, 2.55, 64]} />
        <meshStandardMaterial color="#167E6C" emissive="#167E6C" emissiveIntensity={0.5} transparent opacity={0.3} />
      </mesh>
      <mesh position={[0, -1.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.5, 3.52, 64]} />
        <meshStandardMaterial color="#22d3a8" emissive="#22d3a8" emissiveIntensity={0.2} transparent opacity={0.1} />
      </mesh>

      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <group ref={groupRef}>
          <Candlestick position={[-1.5, -0.5, 0.2]} color="#ef4444" height={0.6} wickHeight={1.2} delay={0} />
          <Candlestick position={[-0.8, 0.1, -0.1]} color="#22d3a8" height={1.0} wickHeight={1.8} delay={1} isDynamic />
          <Candlestick position={[-0.1, 0.7, 0.1]} color="#22d3a8" height={1.4} wickHeight={2.2} delay={2} isDynamic />
          <Candlestick position={[0.6, 1.3, -0.2]} color="#22d3a8" height={1.8} wickHeight={2.8} delay={3} isDynamic />
          <Candlestick position={[1.3, 0.8, 0.3]} color="#ef4444" height={0.5} wickHeight={1.2} delay={4} />
          
          <TrendLine />
          <FloatingCoin />
          <AbstractNodes />
        </group>
      </Float>
    </group>
  );
};

export default function PhilosophyPage() {
  const t = useTranslations("Philosophy");
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);

  const pillars = [
    {
      title: t("pillar1Title"),
      icon: <Target className="w-8 h-8 text-[#22d3a8]" />,
      description: t("pillar1Desc"),
    },
    {
      title: t("pillar2Title"),
      icon: <ShieldCheck className="w-8 h-8 text-[#22d3a8]" />,
      description: t("pillar2Desc"),
    },
    {
      title: t("pillar3Title"),
      icon: <Clock className="w-8 h-8 text-[#22d3a8]" />,
      description: t("pillar3Desc"),
    },
    {
      title: t("pillar4Title"),
      icon: <HeartPulse className="w-8 h-8 text-[#22d3a8]" />,
      description: t("pillar4Desc"),
    },
  ];

  const notTrading = [
    t("not1"),
    t("not2"),
    t("not3"),
    t("not4"),
    t("not5"),
    t("not6"),
    t("not7")
  ];

  const steps = [
    t("order1"),
    t("order2"),
    t("order3"),
    t("order4"),
    t("order5")
  ];

  return (
    <div className="bg-[#fafbfc] min-h-screen text-[#111A4A]" ref={containerRef}>
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden min-h-[70vh]">
        {/* 3D Background */}
        <motion.div style={{ y: y1 }} className="absolute inset-0 z-0 pointer-events-none opacity-40">
          <Canvas camera={{ position: [0, 0, 7] }} gl={{ antialias: true, alpha: true }}>
            <ambientLight intensity={1.5} />
            <directionalLight position={[5, 5, 5]} intensity={2} color="#ffffff" />
            <directionalLight position={[-5, -5, -5]} intensity={1} color="#167E6C" />
            <spotLight position={[0, 10, 0]} intensity={2.5} color="#22d3a8" />
            <Environment preset="city" />
            <AnimatedForexChart3D />
          </Canvas>
        </motion.div>

        {/* Lusion style Background Blobs */}
        <motion.div style={{ y: y1 }} className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#22d3a8]/20 to-[#167E6C]/10 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 -z-10 translate-x-1/3 -translate-y-1/3" />
        <motion.div style={{ y: y2 }} className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-[#167E6C]/20 to-[#22d3a8]/10 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 -z-10 -translate-x-1/3 translate-y-1/3" />

        <div className="max-w-5xl mx-auto text-center mt-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              className="inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full border border-[#167E6C]/20 bg-white/70 backdrop-blur-md shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-[#22d3a8] animate-pulse"></span>
              <span className="text-[#167E6C] text-sm font-semibold tracking-widest uppercase">{t("heroTagline")}</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight leading-[1.1]">
              {t("heroTitle")} <br className="md:hidden"/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#167E6C] to-[#22d3a8]">{t("heroTitleHighlight")}</span>
            </h1>
            <p className="text-xl md:text-2xl font-medium text-[#111A4A]/70 max-w-4xl mx-auto leading-relaxed">
              {t("heroDescription")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Definition Section */}
      <section className="py-24 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="p-10 md:p-14 bg-white rounded-[32px] shadow-[0_20px_50px_-12px_rgba(22,126,108,0.1)] border border-[#167E6C]/10 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#22d3a8] to-[#167E6C]"></div>
            <h2 className="text-3xl font-bold mb-6 text-[#111A4A]">{t("defTitle")}</h2>
            <p className="text-xl md:text-2xl leading-relaxed text-[#111A4A]/80 font-medium">
              {t.rich("defDescription", {
                strong: (chunks: React.ReactNode) => <strong className="text-[#167E6C]">{chunks}</strong>
              })}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 4 Pillars */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">{t("pillarsTitle")}</h2>
            <p className="text-xl text-[#111A4A]/60 max-w-2xl mx-auto font-medium">{t("pillarsSubtitle")}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {pillars.map((pillar, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="p-10 rounded-3xl bg-white border border-gray-100 hover:shadow-[0_20px_40px_-10px_rgba(22,126,108,0.15)] hover:-translate-y-2 transition-all duration-300 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#fafbfc] border border-[#167E6C]/10 shadow-sm flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-[#167E6C]/5 transition-all duration-300">
                  {pillar.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{pillar.title}</h3>
                <p className="text-lg text-[#111A4A]/70 leading-relaxed">{pillar.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What it is NOT */}
      <section className="py-32 px-6 relative bg-[#111A4A] text-white overflow-hidden rounded-[3rem] mx-4 md:mx-10 my-12">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#167E6C] rounded-full mix-blend-screen filter blur-[150px] opacity-20 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">{t("notTitle")} <br/><span className="text-[#22d3a8]">{t("notTitleHighlight")}</span></h2>
            <p className="text-xl md:text-2xl text-white/70 mb-8 leading-relaxed font-light">
              {t.rich("notDesc", {
                strong: (chunks: React.ReactNode) => <strong className="text-white">{chunks}</strong>
              })}
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid gap-4"
          >
            {notTrading.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors"
              >
                <XCircle className="w-6 h-6 text-red-400 shrink-0 mt-0.5" />
                <span className="text-lg text-white/90">{item}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Philosophy Order */}
      <section className="py-24 px-6 bg-[#fafbfc]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-16">{t("orderTitle")}</h2>
          <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-4 w-full">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col lg:flex-row items-center gap-6 lg:gap-4 shrink-0">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15, type: "spring", stiffness: 100 }}
                  className="w-40 h-40 md:w-48 md:h-48 rounded-full flex items-center justify-center bg-white border border-[#167E6C]/10 text-center p-6 shadow-xl shadow-[#167E6C]/5 hover:shadow-2xl hover:-translate-y-2 transition-all relative group"
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#167E6C] to-[#22d3a8] opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0"></div>
                  <span className="font-bold text-lg md:text-xl text-[#111A4A] group-hover:text-white relative z-10 transition-colors duration-300">{step}</span>
                </motion.div>
                {idx < steps.length - 1 && (
                  <ArrowRight className="hidden lg:block w-8 h-8 text-[#167E6C] opacity-50 shrink-0" />
                )}
              </div>
            ))}
          </div>
          <p className="mt-16 text-xl font-medium text-[#111A4A]/80 bg-white inline-block px-8 py-3 rounded-full shadow-sm border border-[#167E6C]/10">{t("orderSubtitle")}</p>
        </div>
      </section>

      {/* Strategic Meaning / Conclusion */}
      <section className="py-24 px-6 bg-[#fafbfc]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-10 md:p-16 bg-white rounded-[40px] shadow-2xl shadow-[#167E6C]/5 border border-[#167E6C]/10 text-center relative overflow-hidden"
          >
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#22d3a8] rounded-full mix-blend-multiply filter blur-[80px] opacity-20 pointer-events-none"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#167E6C] rounded-full mix-blend-multiply filter blur-[80px] opacity-20 pointer-events-none"></div>

            <h2 className="text-3xl md:text-4xl font-bold mb-10 relative z-10">{t("conclusionTitle")}</h2>
            <div className="space-y-6 text-lg md:text-xl text-[#111A4A]/80 font-medium text-left mb-16 max-w-2xl mx-auto relative z-10">
              <p className="flex items-center gap-4 bg-[#fafbfc] p-4 rounded-2xl"><span className="w-3 h-3 rounded-full bg-[#22d3a8] shadow-[0_0_10px_#22d3a8]"></span> {t("consequence1")}</p>
              <p className="flex items-center gap-4 bg-[#fafbfc] p-4 rounded-2xl"><span className="w-3 h-3 rounded-full bg-[#22d3a8] shadow-[0_0_10px_#22d3a8]"></span> {t("consequence2")}</p>
              <p className="flex items-center gap-4 bg-[#fafbfc] p-4 rounded-2xl"><span className="w-3 h-3 rounded-full bg-[#22d3a8] shadow-[0_0_10px_#22d3a8]"></span> {t("consequence3")}</p>
              <p className="flex items-center gap-4 bg-[#fafbfc] p-4 rounded-2xl"><span className="w-3 h-3 rounded-full bg-[#22d3a8] shadow-[0_0_10px_#22d3a8]"></span> {t("consequence4")}</p>
              <p className="flex items-center gap-4 bg-[#fafbfc] p-4 rounded-2xl"><span className="w-3 h-3 rounded-full bg-[#22d3a8] shadow-[0_0_10px_#22d3a8]"></span> {t("consequence5")}</p>
            </div>
            
            <div className="w-24 h-1.5 bg-gradient-to-r from-[#167E6C] to-[#22d3a8] mx-auto mb-12 rounded-full relative z-10"></div>
            
            <h3 className="text-2xl md:text-4xl font-extrabold leading-relaxed text-[#111A4A] relative z-10">
              {t("conclusionQuote")}
            </h3>

            <div className="mt-16 relative z-10">
              <Link href="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 rounded-full bg-[#111A4A] text-white font-semibold text-lg hover:shadow-xl hover:shadow-[#111A4A]/20 transition-all"
                >
                  {t("btnHome")}
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
