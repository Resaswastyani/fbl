"use client";

import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Download, CheckCircle, XCircle, AlertTriangle,
  Settings, BarChart3, ShieldCheck, Cpu,
  ChevronRight, PlayCircle, BookOpen, Clock, Activity
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

// Animated Chart Component mimicking XAUUSD movement (FBL Theme)
const TradingChartBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#f8fafc] to-white"></div>
      
      {/* Ambient glowing blobs behind content */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
          x: [0, 50, 0],
          y: [0, -50, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 -left-[10%] w-[600px] h-[600px] bg-[#22d3a8] rounded-full mix-blend-multiply filter blur-[128px] pointer-events-none"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.25, 0.1],
          x: [0, -50, 0],
          y: [0, 50, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-1/4 -right-[10%] w-[600px] h-[600px] bg-[#167E6C] rounded-full mix-blend-multiply filter blur-[128px] pointer-events-none"
      />

      <svg className="absolute w-full h-full opacity-60" preserveAspectRatio="none" viewBox="0 0 1000 300">
        <defs>
          <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#22d3a8" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#22d3a8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <motion.path
          d="M0,250 C100,220 150,280 250,200 C350,120 400,240 500,180 C600,120 650,150 750,80 C850,10 950,100 1000,50 L1000,300 L0,300 Z"
          fill="url(#chartGradient)"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <motion.path
          d="M0,250 C100,220 150,280 250,200 C350,120 400,240 500,180 C600,120 650,150 750,80 C850,10 950,100 1000,50"
          fill="none"
          stroke="#167E6C"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
        />
        {/* Animated Data Points */}
        {[
          { cx: 250, cy: 200, delay: 0.5 },
          { cx: 500, cy: 180, delay: 1.0 },
          { cx: 750, cy: 80, delay: 1.5 },
          { cx: 1000, cy: 50, delay: 2.0 },
        ].map((point, i) => (
          <motion.circle
            key={i}
            cx={point.cx}
            cy={point.cy}
            r="6"
            fill="white"
            stroke="#22d3a8"
            strokeWidth="3"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: point.delay, duration: 0.5, type: "spring" }}
          />
        ))}
      </svg>
      
      {/* Floating Particles for Lusion-like effect */}
      {Array.from({ length: 25 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 bg-[#167E6C]/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0.1, 0.6, 0.1],
          }}
          transition={{
            duration: 3 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

export default function PanduanEATrialPage() {
  const { scrollYProgress } = useScroll();
  const yPos = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const t = useTranslations("PanduanEATrial");

  return (
    <main className="w-full bg-white font-[family-name:var(--font-figtree)] overflow-x-hidden">
      
      {/* Hero Section - Full Screen */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-12 overflow-hidden">
        <TradingChartBackground />

        <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center mt-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/70 border border-[#167E6C]/20 text-[#167E6C] font-semibold text-sm mb-8 backdrop-blur-md shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-[#22d3a8] animate-pulse"></span>
            <span>{t("version")}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-[#111A4A] tracking-tight leading-[1.1] mb-6"
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
            className="text-xl md:text-2xl text-[#111A4A]/70 font-medium italic mb-12 max-w-3xl leading-relaxed"
          >
            "{t("description")}"
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-5"
          >
            <a
              href="/Panduan_Free_Trial_30_Hari.pdf"
              download
              className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-[#111A4A] text-white font-semibold text-lg overflow-hidden transition-all shadow-xl hover:shadow-[#22d3a8]/30 hover:shadow-2xl hover:-translate-y-1"
            >
              <span className="relative z-10 flex items-center gap-3">
                <Download size={22} className="group-hover:-translate-y-1 transition-transform" />
                {t("downloadPDF")}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#167E6C] to-[#22d3a8] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </a>
            <a
              href="#panduan-lengkap"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-[#111A4A] rounded-full font-semibold text-lg border border-[#111A4A]/10 hover:border-[#167E6C]/50 transition-all shadow-sm hover:shadow-lg hover:-translate-y-1"
            >
              <BookOpen size={22} className="text-[#167E6C]" />
              {t("readOnline")}
            </a>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#111A4A]/50"
        >
          <span className="text-sm font-medium tracking-widest uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-[#111A4A]/20 to-transparent"></div>
        </motion.div>
      </section>

      {/* Content Sections Wrapper */}
      <div id="panduan-lengkap" className="w-full relative z-10">

        {/* Section 1: Tujuan - Full Width Background */}
        <section className="w-full bg-white py-24 border-t border-gray-100">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn}
            className="container mx-auto px-6 max-w-6xl"
          >
            <div className="flex items-center gap-5 mb-12">
              <div className="w-16 h-16 bg-[#167E6C]/10 text-[#167E6C] rounded-2xl flex items-center justify-center">
                <ShieldCheck size={32} />
              </div>
              <h2 className="text-4xl font-bold text-[#111A4A]">{t("section1Title")}</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-[#111A4A] border-b border-gray-100 pb-4">{t("principleTitle")}</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {t("principleDesc1")}
                </p>
                <div className="p-6 bg-[#111A4A] rounded-2xl shadow-xl shadow-[#111A4A]/10 mt-6">
                  <p className="text-white font-medium text-lg italic">
                    "{t("principleDesc2")}"
                  </p>
                </div>
              </div>
              <div className="bg-[#f8fafc] p-8 rounded-3xl border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold text-[#111A4A] mb-6">{t("scopeTitle")}</h3>
                <ul className="space-y-5">
                  {[ t("scope1"), t("scope2"), t("scope3"), t("scope4") ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle size={18} className="text-[#22d3a8]" />
                      </div>
                      <span className="text-gray-700 text-lg leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Section 2: Persiapan - Different Background */}
        <section className="w-full bg-[#f8fafc] py-24 border-t border-gray-100">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            className="container mx-auto px-6 max-w-6xl"
          >
            <motion.div variants={fadeIn} className="flex items-center gap-5 mb-12">
              <div className="w-16 h-16 bg-[#111A4A]/5 text-[#111A4A] rounded-2xl flex items-center justify-center">
                <Settings size={32} />
              </div>
              <h2 className="text-4xl font-bold text-[#111A4A]">{t("section2Title")}</h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { label: t("prepPlatform"), value: t("prepPlatformVal") },
                { label: t("prepBroker"), value: t("prepBrokerVal") },
                { label: t("prepInstrument"), value: t("prepInstrumentVal") },
                { label: t("prepTimeframe"), value: t("prepTimeframeVal") },
                { label: t("prepCapital"), value: t("prepCapitalVal") },
                { label: t("prepConnection"), value: t("prepConnectionVal") },
              ].map((item, i) => (
                <motion.div key={i} variants={fadeIn} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-[#167E6C]/30 transition-all duration-300 group">
                  <p className="text-sm text-gray-500 font-medium mb-2 uppercase tracking-wider">{item.label}</p>
                  <p className="text-xl font-bold text-[#111A4A] group-hover:text-[#167E6C] transition-colors">{item.value}</p>
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeIn} className="mt-10 bg-[#111A4A] text-white p-8 rounded-3xl flex flex-col md:flex-row gap-6 items-start md:items-center shadow-2xl shadow-[#111A4A]/20">
              <div className="w-14 h-14 bg-amber-400/20 text-amber-400 rounded-full flex items-center justify-center shrink-0">
                <AlertTriangle size={28} />
              </div>
              <div>
                <h4 className="text-xl font-bold text-amber-400 mb-2">{t("importantCentTitle")}</h4>
                <p className="text-white/80 text-lg">{t("importantCentDesc")}</p>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Section 3: Instalasi */}
        <section className="w-full bg-white py-24 border-t border-gray-100">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn}
            className="container mx-auto px-6 max-w-6xl"
          >
            <div className="flex items-center gap-5 mb-16">
              <div className="w-16 h-16 bg-[#167E6C]/10 text-[#167E6C] rounded-2xl flex items-center justify-center">
                <Cpu size={32} />
              </div>
              <h2 className="text-4xl font-bold text-[#111A4A]">{t("section3Title")}</h2>
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
                <div key={i} className="relative bg-white p-8 rounded-3xl shadow-md border border-gray-100 group overflow-hidden hover:-translate-y-2 transition-all duration-300 hover:shadow-xl hover:shadow-[#167E6C]/10 hover:border-[#167E6C]/30">
                  <div className="absolute top-0 right-0 -mr-6 -mt-6 w-32 h-32 bg-[#f8fafc] rounded-full z-[0] group-hover:scale-[2.5] group-hover:bg-[#167E6C]/5 transition-transform duration-700 ease-out"></div>
                  
                  <div className="relative z-10">
                    <div className="text-5xl font-black text-gray-200 group-hover:text-[#22d3a8] transition-colors duration-300 mb-4">{step.step}</div>
                    <h4 className="text-xl font-bold text-[#111A4A] mb-3">{step.title}</h4>
                    <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Section: Do's and Don'ts */}
        <section className="w-full bg-[#111A4A] py-24 overflow-hidden relative">
          {/* Decorative background elements for dark section */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#167E6C] rounded-full mix-blend-screen filter blur-[150px] opacity-20 pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
          
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
              <div className="bg-white/5 backdrop-blur-xl rounded-[2rem] overflow-hidden border border-white/10 hover:border-[#22d3a8]/50 transition-colors">
                <div className="bg-gradient-to-r from-[#167E6C]/40 to-transparent px-10 py-6 border-b border-white/10 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#22d3a8]/20 flex items-center justify-center">
                    <CheckCircle className="text-[#22d3a8]" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{t("dosTitle")}</h3>
                </div>
                <ul className="p-10 space-y-6">
                  {[ t("do1"), t("do2"), t("do3"), t("do4") ].map((item, i) => (
                    <li key={i} className="flex gap-4 items-start">
                      <div className="w-3 h-3 rounded-full bg-[#22d3a8] mt-2 shrink-0 shadow-[0_0_10px_rgba(34,211,168,0.5)]" />
                      <span className="text-gray-200 text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tidak Boleh */}
              <div className="bg-white/5 backdrop-blur-xl rounded-[2rem] overflow-hidden border border-white/10 hover:border-red-500/50 transition-colors">
                <div className="bg-gradient-to-r from-red-900/40 to-transparent px-10 py-6 border-b border-white/10 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                    <XCircle className="text-red-400" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{t("dontsTitle")}</h3>
                </div>
                <ul className="p-10 space-y-6">
                  {[ t("dont1"), t("dont2"), t("dont3"), t("dont4") ].map((item, i) => (
                    <li key={i} className="flex gap-4 items-start">
                      <div className="w-3 h-3 rounded-full bg-red-400 mt-2 shrink-0 shadow-[0_0_10px_rgba(248,113,113,0.5)]" />
                      <span className="text-gray-200 text-lg">{item}</span>
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
