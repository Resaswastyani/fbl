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
import { ThreeDMonitor } from "@/components/ThreeDMonitor";

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

// Old MonitorMockup replaced by ThreeDMonitor component

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
    <main className="w-full bg-[#f8fafc] dark:bg-[#050508] text-[#111A4A] dark:text-slate-100 font-[family-name:var(--font-figtree)] overflow-x-hidden selection:bg-[#22d3a8] selection:text-[#111A4A]">
      
      {/* Hero Section - Restored Light Base to match Global Header, added dark mode gradient */}
      <section className="relative w-full min-h-screen flex items-center justify-center px-6 pt-32 pb-24 overflow-hidden bg-gradient-to-b from-[#f8fafc] via-white to-[#f1f5f9] dark:from-[#050508] dark:via-[#090910] dark:to-[#050508]">
        {/* Elegant light glowing background blobs */}
        <div className="absolute top-[10%] -left-32 w-[600px] h-[600px] bg-[#22d3a8]/20 rounded-full mix-blend-multiply filter blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[10%] -right-32 w-[600px] h-[600px] bg-[#167E6C]/10 rounded-full mix-blend-multiply filter blur-[120px] pointer-events-none"></div>

        <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center mt-4">
          
          {/* Left Content */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-[#167E6C] dark:text-[#22d3a8] font-semibold text-sm mb-6 lg:mb-8 shadow-sm backdrop-blur-sm hover:border-[#167E6C]/30 dark:hover:border-[#22d3a8]/50 transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-[#22d3a8] animate-pulse shadow-[0_0_8px_#22d3a8]"></span>
              <span>{t("version")}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#111A4A] dark:text-white tracking-tight leading-[1.1] mb-6 drop-shadow-sm"
            >
              {t("title")} <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#167E6C] to-[#22d3a8]">
                {t("subtitle")}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 font-medium italic mb-10 lg:mb-12 max-w-2xl leading-relaxed"
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
                className="group relative inline-flex items-center justify-center gap-3 px-6 lg:px-8 py-3 lg:py-4 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-[#111A4A] dark:text-white font-semibold text-base overflow-hidden transition-all hover:border-[#167E6C]/30 dark:hover:border-[#22d3a8]/50 hover:shadow-lg hover:-translate-y-1"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Download size={20} className="text-[#167E6C] group-hover:-translate-y-1 transition-transform" />
                  {t("downloadPDF")}
                </span>
              </a>

              <a
                href="#panduan-lengkap"
                className="group relative inline-flex items-center justify-center gap-3 px-6 lg:px-8 py-3 lg:py-4 bg-[#111A4A] dark:bg-[#167E6C] text-white rounded-full font-bold text-base transition-all hover:bg-[#1a275e] dark:hover:bg-[#116556] hover:shadow-[0_10px_20px_rgba(17,26,74,0.2)] dark:hover:shadow-[0_10px_20px_rgba(22,126,108,0.2)] hover:-translate-y-1"
              >
                <BookOpen size={20} className="text-[#22d3a8]" />
                {t("readOnline")}
              </a>
            </motion.div>
          </div>

          {/* Right Visual (3D Monitor) */}
          <div className="order-1 lg:order-2 w-full px-4 sm:px-12 lg:px-0 h-[400px] md:h-[500px]">
            <ThreeDMonitor textureUrl="/bt1.png" />
          </div>

        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400 z-10"
        >
          <span className="text-sm font-medium tracking-widest uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-slate-400/50 to-transparent"></div>
        </motion.div>
      </section>

      {/* Content Sections Wrapper */}
      <div id="panduan-lengkap" className="w-full relative z-10">

        {/* Section 2: Persiapan - Premium Light & Dark Glassmorphism */}
        <section className="w-full bg-white dark:bg-[#050508] py-24 relative overflow-hidden border-t border-gray-100 dark:border-white/5">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#167E6C]/5 dark:bg-[#22d3a8]/5 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-[0.02] dark:opacity-[0.05] pointer-events-none invert-0 dark:invert"></div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            className="container mx-auto px-6 max-w-6xl relative z-10"
          >
            <motion.div variants={fadeIn} className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 text-[#167E6C] dark:text-[#22d3a8] rounded-2xl flex items-center justify-center shadow-sm">
                  <Settings size={32} />
                </div>
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold text-[#111A4A] dark:text-white mb-2">{t("section2Title")}</h2>
                  <p className="text-slate-500 dark:text-slate-400 text-lg">{t("section2Desc")}</p>
                </div>
              </div>
            </motion.div>

            {/* ACTION BUTTONS (Moved to Pre Installation top area) - Kept Premium & Vibrant */}
            <motion.div variants={fadeIn} className="grid md:grid-cols-2 gap-6 mb-16">
              <TiltCard>
                <a href="/exness5setup.exe" download className="block h-full group">
                  <div className="relative bg-gradient-to-br from-[#167E6C] to-[#0f5b4d] p-6 md:p-8 rounded-[2rem] text-white shadow-xl overflow-hidden transition-all duration-500 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 h-full hover:shadow-[0_20px_40px_rgba(22,126,108,0.3)]">
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex flex-shrink-0 items-center justify-center group-hover:scale-110 group-hover:bg-white/20 transition-all shadow-sm">
                       <Download size={28} className="text-[#22d3a8]" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{t("downloadMT5")}</h3>
                      <p className="text-white/80 text-sm md:text-base">{t("downloadMT5Desc")}</p>
                    </div>
                  </div>
                </a>
              </TiltCard>

              <TiltCard>
                <a href="https://one.exnessonelink.com/a/p0xhj9ay9j" target="_blank" rel="noopener noreferrer" className="block h-full group">
                  <div className="relative bg-gradient-to-br from-[#f59e0b] to-[#d97706] p-6 md:p-8 rounded-[2rem] text-white shadow-xl overflow-hidden transition-all duration-500 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 h-full hover:shadow-[0_20px_40px_rgba(245,158,11,0.3)]">
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex flex-shrink-0 items-center justify-center group-hover:scale-110 group-hover:bg-white/20 transition-all shadow-sm">
                       <CheckCircle size={28} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{t("openExnessAccount")}</h3>
                      <p className="text-white/80 text-sm md:text-base">{t("openExnessAccountDesc")}</p>
                    </div>
                  </div>
                </a>
              </TiltCard>
            </motion.div>

            {/* Grid Persiapan Parameters - Premium Light Glass */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { label: t("prepPlatform"), value: t("prepPlatformVal"), icon: <Cpu size={20}/> },
                { label: t("prepBroker"), value: t("prepBrokerVal"), icon: <Activity size={20}/> },
                { label: t("prepInstrument"), value: t("prepInstrumentVal"), icon: <BarChart3 size={20}/> },
                { label: t("prepTimeframe"), value: t("prepTimeframeVal"), icon: <Clock size={20}/> },
                { label: t("prepCapital"), value: t("prepCapitalVal"), icon: <Zap size={20}/> },
                { label: t("prepConnection"), value: t("prepConnectionVal"), icon: <CheckCircle size={20}/> },
              ].map((item, i) => (
                <motion.div key={i} variants={fadeIn} className="relative bg-white dark:bg-white/5 p-8 rounded-3xl border border-gray-100 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.03)] dark:shadow-none hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:hover:shadow-[0_0_20px_rgba(34,211,168,0.1)] hover:border-[#167E6C]/30 dark:hover:border-[#22d3a8]/30 transition-all duration-300 group overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#167E6C]/5 dark:bg-[#22d3a8]/10 rounded-bl-full -mr-4 -mt-4 opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500"></div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-[#167E6C] dark:text-[#22d3a8] opacity-70 group-hover:opacity-100 transition-opacity">
                      {item.icon}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-widest">{item.label}</p>
                  </div>
                  <p className="text-lg md:text-xl font-bold text-[#111A4A] dark:text-white group-hover:text-[#167E6C] dark:group-hover:text-[#22d3a8] transition-colors">{item.value}</p>
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeIn} className="mt-10 relative bg-gradient-to-r from-[#111A4A] to-[#1a275e] p-8 rounded-[23px] flex flex-col md:flex-row gap-6 items-start md:items-center shadow-xl">
              <div className="w-14 h-14 bg-amber-400/20 border border-amber-400/30 text-amber-400 rounded-full flex items-center justify-center shrink-0">
                <AlertTriangle size={28} />
              </div>
              <div>
                <h4 className="text-xl font-bold text-amber-400 mb-2">{t("importantCentTitle")}</h4>
                <p className="text-white/90 text-lg">{t("importantCentDesc")}</p>
              </div>
            </motion.div>

          </motion.div>
        </section>

        {/* Section 3: Instalasi - Premium Light & Dark Style */}
        <section className="w-full bg-[#f8fafc] dark:bg-[#090910] py-24 border-t border-gray-100 dark:border-white/5 relative overflow-hidden">
          <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-[#167E6C]/5 dark:bg-[#22d3a8]/10 rounded-full filter blur-[100px] pointer-events-none -translate-y-1/2"></div>
          
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn}
            className="container mx-auto px-6 max-w-6xl relative z-10"
          >
            <div className="flex flex-col items-center text-center gap-5 mb-16">
              <div className="w-16 h-16 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-[#167E6C] dark:text-[#22d3a8] rounded-2xl flex items-center justify-center shadow-sm">
                <Cpu size={32} />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#111A4A] dark:text-white">{t("section3Title")}</h2>
              <p className="text-slate-500 dark:text-slate-400 max-w-2xl text-lg">{t("section3Desc")}</p>
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
                <div key={i} className="relative bg-white dark:bg-[#050508] p-8 rounded-3xl border border-gray-100 dark:border-white/10 shadow-sm dark:shadow-none group overflow-hidden hover:-translate-y-2 transition-all duration-300 hover:shadow-xl dark:hover:shadow-[0_0_20px_rgba(34,211,168,0.1)] hover:border-[#167E6C]/30 dark:hover:border-[#22d3a8]/30">
                  <div className="absolute top-0 right-0 -mr-6 -mt-6 w-32 h-32 bg-[#f8fafc] dark:bg-[#090910] rounded-full z-[0] group-hover:scale-[2.5] group-hover:bg-[#167E6C]/5 dark:group-hover:bg-[#22d3a8]/5 transition-transform duration-700 ease-out"></div>
                  
                  <div className="relative z-10">
                    <div className="text-5xl font-black text-gray-100 dark:text-gray-800 group-hover:text-[#22d3a8] transition-colors duration-300 mb-4 inline-block">{step.step}</div>
                    <h4 className="text-xl font-bold text-[#111A4A] dark:text-white mb-3 group-hover:text-[#167E6C] dark:group-hover:text-[#22d3a8] transition-colors">{step.title}</h4>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Section: Do's and Don'ts - Deep Blue Dark Theme (matching global system) */}
        <section className="w-full bg-[#111A4A] dark:bg-[#050508] py-24 overflow-hidden relative border-t border-[#1a275e] dark:border-white/5">
          {/* Decorative background elements for dark section */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#167E6C] dark:bg-[#22d3a8] rounded-full mix-blend-screen filter blur-[150px] opacity-20 dark:opacity-10 pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
          
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
                      <span className="text-slate-200 text-lg leading-relaxed">{item}</span>
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
                      <span className="text-slate-200 text-lg leading-relaxed">{item}</span>
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
