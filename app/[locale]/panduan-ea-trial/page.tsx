"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import {
  Download, CheckCircle, XCircle, AlertTriangle,
  Settings, BarChart3, Cpu,
  ChevronRight, PlayCircle, BookOpen, Clock, Activity, Zap
} from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

// Realistic Monitor Mockup wrapping the chart image
const MonitorMockup = () => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
      className="relative w-full max-w-xl mx-auto lg:max-w-none z-20 pb-12 perspective-[1200px]"
      style={{ perspective: 1200 }}
    >
      <motion.div 
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        animate={{ y: [-8, 8, -8] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        <div 
          className="relative bg-[#1e293b]/80 backdrop-blur-sm rounded-t-2xl rounded-b-lg p-2 md:p-3 shadow-[0_0_50px_rgba(34,211,168,0.2)] border border-white/10"
          style={{ transform: "translateZ(30px)" }}
        >
          {/* Camera dot */}
          <div className="absolute top-1 md:top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-black rounded-full border border-white/10 shadow-[0_0_5px_rgba(255,255,255,0.2)]"></div>
          
          {/* Screen */}
          <div className="relative bg-[#050B14] rounded-xl overflow-hidden w-full aspect-[4/3] sm:aspect-[16/10] border border-white/5 flex items-center shadow-inner">
            <motion.img 
              src="/bt1.png" 
              alt="Backtest Results" 
              className="w-[150%] max-w-none h-auto pointer-events-none select-none opacity-90 mix-blend-lighten"
              draggable="false"
              animate={{ x: ["0%", "-33.33%", "0%"] }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              style={{ transform: "translateZ(20px)" }}
            />
            {/* 3D Floating Elements inside screen */}
            <motion.div 
              className="absolute top-1/4 left-1/4 w-16 h-16 bg-[#22d3a8] rounded-full opacity-30 mix-blend-screen blur-[15px]"
              animate={{ y: [-15, 15, -15], scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{ transform: "translateZ(40px)" }}
            />
            <motion.div 
              className="absolute bottom-1/4 right-1/4 w-20 h-20 bg-blue-500 rounded-full opacity-20 mix-blend-screen blur-[20px]"
              animate={{ y: [15, -15, 15], scale: [1.2, 1, 1.2] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              style={{ transform: "translateZ(50px)" }}
            />
          </div>
          
          {/* Bottom Bezel */}
          <div className="h-4 md:h-6 w-full bg-[#1e293b]/80 flex items-center justify-center rounded-b-md">
            <div className="w-8 h-1 rounded-full bg-white/20"></div>
          </div>
        </div>
        
        {/* Monitor Stand */}
        <div 
          className="absolute -bottom-6 md:-bottom-10 left-1/2 -translate-x-1/2 w-24 md:w-32 h-8 md:h-12 bg-gradient-to-b from-[#1e293b] to-[#0B0F19]" 
          style={{ clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)', transform: "translateZ(10px)" }}
        ></div>
        <div 
          className="absolute -bottom-8 md:-bottom-12 left-1/2 -translate-x-1/2 w-40 md:w-56 h-2 md:h-3 bg-[#0a0f18] rounded-full shadow-lg border border-white/5"
          style={{ transform: "translateZ(0px)" }}
        ></div>
      </motion.div>

      {/* Glow effect behind monitor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#22d3a8] rounded-full mix-blend-screen filter blur-[150px] opacity-10 -z-10 pointer-events-none"></div>
    </motion.div>
  );
};

// 3D Tilt Card Component for Action Buttons
const TiltCard = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative perspective-[1000px] w-full h-full ${className || ""}`}
    >
      {children}
    </motion.div>
  );
};

export default function PanduanEATrialPage() {
  const { scrollYProgress } = useScroll();
  const yPos = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const t = useTranslations("PanduanEATrial");

  return (
    <main className="w-full bg-[#0B0F19] text-white font-[family-name:var(--font-figtree)] overflow-x-hidden selection:bg-[#22d3a8] selection:text-[#0B0F19]">
      
      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex items-center justify-center px-6 pt-32 pb-24 overflow-hidden">
        {/* Futuristic Background Gradients */}
        <div className="absolute top-[-10%] -left-32 w-[600px] h-[600px] bg-[#22d3a8] rounded-full mix-blend-screen filter blur-[150px] opacity-[0.15] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] -right-32 w-[600px] h-[600px] bg-[#3b82f6] rounded-full mix-blend-screen filter blur-[150px] opacity-[0.1] pointer-events-none"></div>

        <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center mt-4">
          
          {/* Left Content */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-[#22d3a8] font-medium text-sm mb-6 lg:mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(34,211,168,0.1)]"
            >
              <span className="w-2 h-2 rounded-full bg-[#22d3a8] animate-pulse shadow-[0_0_8px_#22d3a8]"></span>
              <span>{t("version")}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-6"
            >
              {t("title")} <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22d3a8] to-[#3b82f6]">
                {t("subtitle")}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-xl md:text-2xl text-slate-400 font-medium italic mb-10 lg:mb-12 max-w-2xl leading-relaxed"
            >
              "{t("description")}"
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="flex flex-col sm:flex-row flex-wrap gap-4"
            >
              <a
                href="/Panduan_Free_Trial_30_Hari.pdf"
                download
                className="group relative inline-flex items-center justify-center gap-3 px-6 lg:px-8 py-3 lg:py-4 rounded-full bg-white/5 border border-white/10 text-white font-semibold text-base overflow-hidden transition-all hover:bg-white/10 hover:border-white/20 hover:-translate-y-1"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Download size={20} className="text-slate-300 group-hover:text-white transition-colors" />
                  {t("downloadPDF")}
                </span>
              </a>

              <a
                href="#panduan-lengkap"
                className="group relative inline-flex items-center justify-center gap-3 px-6 lg:px-8 py-3 lg:py-4 bg-[#22d3a8] text-[#0B0F19] rounded-full font-bold text-base transition-all hover:bg-[#1fbe97] hover:shadow-[0_0_30px_rgba(34,211,168,0.4)] hover:-translate-y-1"
              >
                <BookOpen size={20} className="text-[#0B0F19]" />
                {t("readOnline")}
              </a>
            </motion.div>
          </div>

          {/* Right Visual (Monitor) */}
          <div className="order-1 lg:order-2 w-full px-4 sm:px-12 lg:px-0">
            <MonitorMockup />
          </div>

        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 z-10"
        >
          <span className="text-sm font-medium tracking-widest uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-slate-500/50 to-transparent"></div>
        </motion.div>
      </section>

      {/* Content Sections Wrapper */}
      <div id="panduan-lengkap" className="w-full relative z-10">

        {/* Section 2: Persiapan - Dark Lusion Style */}
        <section className="w-full bg-[#0a0e17] py-24 relative overflow-hidden border-t border-white/5">
          {/* Subtle grid background */}
          <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-[0.03] pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#167E6C] rounded-full mix-blend-screen filter blur-[150px] opacity-[0.08] pointer-events-none"></div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            className="container mx-auto px-6 max-w-6xl relative z-10"
          >
            <motion.div variants={fadeIn} className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 bg-white/5 text-[#22d3a8] rounded-2xl flex items-center justify-center border border-white/10 backdrop-blur-md shadow-[0_0_20px_rgba(34,211,168,0.1)]">
                  <Settings size={32} />
                </div>
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">{t("section2Title")}</h2>
                  <p className="text-slate-400 text-lg">Langkah pra-instalasi untuk memastikan kelancaran trading.</p>
                </div>
              </div>
            </motion.div>

            {/* ACTION BUTTONS (Moved to Pre Installation top area) */}
            <motion.div variants={fadeIn} className="grid md:grid-cols-2 gap-6 mb-16">
              <TiltCard>
                <a href="/exness5setup.exe" download className="block h-full group">
                  <div className="relative bg-[#131A2B] border border-white/10 hover:border-[#22d3a8]/50 p-6 md:p-8 rounded-[2rem] text-white shadow-xl overflow-hidden transition-all duration-500 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#22d3a8]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex flex-shrink-0 items-center justify-center group-hover:scale-110 group-hover:bg-[#22d3a8]/20 group-hover:shadow-[0_0_20px_rgba(34,211,168,0.2)] transition-all">
                       <Download size={28} className="text-[#22d3a8]" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2">Download MT5</h3>
                      <p className="text-slate-400 text-sm md:text-base">Unduh platform trading MetaTrader 5 resmi dari Exness untuk PC Anda.</p>
                    </div>
                  </div>
                </a>
              </TiltCard>

              <TiltCard>
                <a href="https://one.exnessonelink.com/a/p0xhj9ay9j" target="_blank" rel="noopener noreferrer" className="block h-full group">
                  <div className="relative bg-[#131A2B] border border-white/10 hover:border-[#f59e0b]/50 p-6 md:p-8 rounded-[2rem] text-white shadow-xl overflow-hidden transition-all duration-500 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#f59e0b]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex flex-shrink-0 items-center justify-center group-hover:scale-110 group-hover:bg-[#f59e0b]/20 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.2)] transition-all">
                       <CheckCircle size={28} className="text-[#f59e0b]" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2">Buka Akun Exness</h3>
                      <p className="text-slate-400 text-sm md:text-base">Daftar dan buat akun Cent di Exness untuk persyaratan minimum margin yang aman.</p>
                    </div>
                  </div>
                </a>
              </TiltCard>
            </motion.div>

            {/* Grid Persiapan Parameters */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { label: t("prepPlatform"), value: t("prepPlatformVal"), icon: <Cpu size={20}/> },
                { label: t("prepBroker"), value: t("prepBrokerVal"), icon: <Activity size={20}/> },
                { label: t("prepInstrument"), value: t("prepInstrumentVal"), icon: <BarChart3 size={20}/> },
                { label: t("prepTimeframe"), value: t("prepTimeframeVal"), icon: <Clock size={20}/> },
                { label: t("prepCapital"), value: t("prepCapitalVal"), icon: <Zap size={20}/> },
                { label: t("prepConnection"), value: t("prepConnectionVal"), icon: <CheckCircle size={20}/> },
              ].map((item, i) => (
                <motion.div key={i} variants={fadeIn} className="relative bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 hover:bg-white/10 hover:border-[#22d3a8]/30 transition-all duration-300 group overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-full -mr-4 -mt-4 opacity-50 group-hover:scale-125 group-hover:bg-[#22d3a8]/10 transition-transform duration-500"></div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-[#22d3a8] opacity-70 group-hover:opacity-100 transition-opacity">
                      {item.icon}
                    </div>
                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-widest">{item.label}</p>
                  </div>
                  <p className="text-lg md:text-xl font-bold text-white group-hover:text-[#22d3a8] transition-colors">{item.value}</p>
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeIn} className="mt-10 relative bg-gradient-to-r from-amber-500/10 to-transparent p-[1px] rounded-3xl overflow-hidden">
              <div className="bg-[#0B0F19] p-8 rounded-[23px] flex flex-col md:flex-row gap-6 items-start md:items-center">
                <div className="w-14 h-14 bg-amber-500/20 border border-amber-500/30 text-amber-500 rounded-full flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                  <AlertTriangle size={28} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-amber-500 mb-2">{t("importantCentTitle")}</h4>
                  <p className="text-slate-300 text-lg">{t("importantCentDesc")}</p>
                </div>
              </div>
            </motion.div>

          </motion.div>
        </section>

        {/* Section 3: Instalasi - Dark Style */}
        <section className="w-full bg-[#0B0F19] py-24 border-t border-white/5 relative overflow-hidden">
          <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-[#3b82f6] rounded-full mix-blend-screen filter blur-[150px] opacity-[0.05] pointer-events-none -translate-y-1/2"></div>
          
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn}
            className="container mx-auto px-6 max-w-6xl relative z-10"
          >
            <div className="flex flex-col items-center text-center gap-5 mb-16">
              <div className="w-16 h-16 bg-white/5 text-[#3b82f6] rounded-2xl flex items-center justify-center border border-white/10 backdrop-blur-md shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                <Cpu size={32} />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white">{t("section3Title")}</h2>
              <p className="text-slate-400 max-w-2xl text-lg">Ikuti langkah-langkah berikut untuk mengaktifkan EA di MetaTrader 5 Anda.</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { step: 1, title: t("step1Title"), desc: t("step1Desc") },
                { step: 2, title: t("step2Title"), desc: t("step2Desc") },
                { step: 3, title: t("step3Title"), desc: t("step3Desc") },
                { step: 4, title: t("step4Title"), desc: t("step4Desc") },
                { step: 5, title: t("step5Title"), desc: t("step5Desc") },
                { step: 6, title: t("step6Title"), desc: t("step6Desc") },
              ].map((step, i) => (
                <div key={i} className="relative bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 group overflow-hidden hover:-translate-y-2 transition-all duration-300 hover:bg-white/10 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:border-[#3b82f6]/30">
                  <div className="absolute top-0 right-0 -mr-6 -mt-6 w-32 h-32 bg-white/5 rounded-full z-[0] group-hover:scale-[2.5] group-hover:bg-[#3b82f6]/10 transition-transform duration-700 ease-out"></div>
                  
                  <div className="relative z-10">
                    <div className="text-5xl font-black text-white/10 group-hover:text-[#3b82f6]/30 group-hover:shadow-none transition-colors duration-300 mb-4 inline-block drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">{step.step}</div>
                    <h4 className="text-xl font-bold text-white mb-3 group-hover:text-[#3b82f6] transition-colors">{step.title}</h4>
                    <p className="text-slate-400 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Section: Do's and Don'ts */}
        <section className="w-full bg-[#0a0e17] py-24 overflow-hidden relative border-t border-white/5">
          {/* Decorative background elements for dark section */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#167E6C] rounded-full mix-blend-screen filter blur-[150px] opacity-10 pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
          
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn}
            className="container mx-auto px-6 max-w-6xl relative z-10"
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{t("disciplineTitle")}</h2>
              <p className="text-xl text-[#22d3a8] font-medium">{t("disciplineDesc")}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {/* Boleh */}
              <div className="bg-white/5 backdrop-blur-xl rounded-[2rem] overflow-hidden border border-white/10 hover:border-[#22d3a8]/50 transition-all hover:shadow-[0_0_30px_rgba(34,211,168,0.1)]">
                <div className="bg-gradient-to-r from-[#22d3a8]/10 to-transparent px-10 py-6 border-b border-white/10 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#22d3a8]/20 flex items-center justify-center border border-[#22d3a8]/30">
                    <CheckCircle className="text-[#22d3a8]" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{t("dosTitle")}</h3>
                </div>
                <ul className="p-10 space-y-6">
                  {[ t("do1"), t("do2"), t("do3"), t("do4") ].map((item, i) => (
                    <li key={i} className="flex gap-4 items-start">
                      <div className="w-3 h-3 rounded-full bg-[#22d3a8] mt-2 shrink-0 shadow-[0_0_10px_rgba(34,211,168,0.5)]" />
                      <span className="text-slate-300 text-lg leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tidak Boleh */}
              <div className="bg-white/5 backdrop-blur-xl rounded-[2rem] overflow-hidden border border-white/10 hover:border-red-500/50 transition-all hover:shadow-[0_0_30px_rgba(239,68,68,0.1)]">
                <div className="bg-gradient-to-r from-red-500/10 to-transparent px-10 py-6 border-b border-white/10 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center border border-red-500/30">
                    <XCircle className="text-red-400" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{t("dontsTitle")}</h3>
                </div>
                <ul className="p-10 space-y-6">
                  {[ t("dont1"), t("dont2"), t("dont3"), t("dont4") ].map((item, i) => (
                    <li key={i} className="flex gap-4 items-start">
                      <div className="w-3 h-3 rounded-full bg-red-500 mt-2 shrink-0 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                      <span className="text-slate-300 text-lg leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </section>

      </div>
    </main>
  );
}
