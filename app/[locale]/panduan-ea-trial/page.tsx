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

import { useEffect, useRef } from "react";

// Real TradingView Widget for XAUUSD (M5)
const TradingViewWidget = () => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (container.current && container.current.children.length === 0) {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "autosize": true,
          "symbol": "OANDA:XAUUSD",
          "interval": "5",
          "timezone": "Asia/Jakarta",
          "theme": "light",
          "style": "1",
          "locale": "id",
          "enable_publishing": false,
          "hide_top_toolbar": true,
          "hide_legend": true,
          "save_image": false,
          "allow_symbol_change": false,
          "calendar": false,
          "support_host": "https://www.tradingview.com"
        }`;
      container.current.appendChild(script);
    }
  }, []);

  return (
    <div className="tradingview-widget-container h-full w-full bg-white rounded-xl overflow-hidden pointer-events-none md:pointer-events-auto" ref={container}>
    </div>
  );
};

// Realistic Monitor Mockup wrapping the chart
const MonitorMockup = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
      className="relative mx-auto w-full max-w-5xl z-20 mt-16 pb-16"
    >
      <div 
        className="relative bg-[#1e293b] rounded-t-2xl rounded-b-lg p-2 md:p-3 shadow-2xl border border-slate-700 shadow-[#167E6C]/30 transition-transform duration-700 ease-out hover:-translate-y-2"
      >
        {/* Camera dot */}
        <div className="absolute top-1 md:top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-slate-900 rounded-full border border-slate-800"></div>
        
        {/* Screen */}
        <div className="relative bg-white rounded-xl overflow-hidden w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[21/9] border border-slate-800">
          <TradingViewWidget />
        </div>
        
        {/* Bottom Bezel */}
        <div className="h-4 md:h-6 w-full bg-[#1e293b] flex items-center justify-center">
          <div className="w-8 h-1 rounded-full bg-slate-600/50"></div>
        </div>
      </div>
      
      {/* Monitor Stand */}
      <div className="absolute -bottom-6 md:-bottom-10 left-1/2 -translate-x-1/2 w-24 md:w-32 h-8 md:h-12 bg-gradient-to-b from-slate-700 to-slate-900" style={{ clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)' }}></div>
      <div className="absolute -bottom-8 md:-bottom-12 left-1/2 -translate-x-1/2 w-40 md:w-56 h-2 md:h-3 bg-slate-800 rounded-full shadow-lg"></div>

      {/* Glow effect behind monitor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[#22d3a8] rounded-full mix-blend-multiply filter blur-[120px] opacity-20 -z-10 pointer-events-none"></div>
    </motion.div>
  );
};

export default function PanduanEATrialPage() {
  const { scrollYProgress } = useScroll();
  const yPos = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const t = useTranslations("PanduanEATrial");

  return (
    <main className="w-full bg-white font-[family-name:var(--font-figtree)] overflow-x-hidden">
      
      {/* Hero Section - Full Width, Dark Theme Transition */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-start text-center px-6 pt-32 pb-24 overflow-hidden bg-gradient-to-b from-[#f8fafc] via-white to-white">
        {/* Decorative background blur blobs */}
        <div className="absolute top-1/4 -left-32 w-[600px] h-[600px] bg-[#22d3a8]/10 rounded-full mix-blend-multiply filter blur-[128px] pointer-events-none"></div>
        <div className="absolute top-1/3 -right-32 w-[600px] h-[600px] bg-[#167E6C]/10 rounded-full mix-blend-multiply filter blur-[128px] pointer-events-none"></div>

        <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center mt-4">
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
        
        {/* Real Monitor with TradingView */}
        <MonitorMockup />

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#111A4A]/50 z-10"
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
