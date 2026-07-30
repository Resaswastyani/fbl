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
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Animated Chart Component mimicking XAUUSD movement
const TradingChartBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary/5 to-transparent"></div>
      <svg className="absolute w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 300">
        <defs>
          <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(var(--color-primary-rgb), 0.2)" />
            <stop offset="100%" stopColor="rgba(var(--color-primary-rgb), 0)" />
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
          stroke="var(--color-primary, #0070f3)"
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
            stroke="var(--color-primary, #0070f3)"
            strokeWidth="3"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: point.delay, duration: 0.5, type: "spring" }}
          />
        ))}
      </svg>
      {/* Floating Particles for Lusion-like effect */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 bg-primary/40 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
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
    <main className="min-h-screen bg-gray-50 overflow-hidden pt-24 pb-20">
      {/* Hero Section */}
      <section className="relative w-full max-w-7xl mx-auto px-6 pt-12 pb-24 lg:pt-24 lg:pb-32 flex flex-col items-center justify-center text-center">
        <TradingChartBackground />

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6 border border-primary/20 backdrop-blur-sm"
          >
            <Activity size={16} />
            <span>{t("version")}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6"
          >
            {t("title")} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">{t("subtitle")}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-600 font-medium mb-10 max-w-2xl"
          >
            {t("description")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="/Panduan_Free_Trial_30_Hari.pdf"
              download
              className="flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white rounded-xl font-semibold text-lg hover:bg-primary/90 transition shadow-lg shadow-primary/30 hover:shadow-xl hover:-translate-y-1"
            >
              <Download size={20} />
              {t("downloadPDF")}
            </a>
            <a
              href="/Panduan_Free_Trial_30_Hari_EA_FBL_1.pdf"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-800 rounded-xl font-semibold text-lg border border-gray-200 hover:border-gray-300 transition shadow-sm hover:shadow hover:-translate-y-1"
            >
              <BookOpen size={20} />
              {t("readOnline")}
            </a>
          </motion.div>
        </div>
      </section>

      <div id="panduan-lengkap" className="max-w-5xl mx-auto px-6 space-y-24 relative z-10">

        {/* Section 1: Tujuan */}
        <motion.section
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-gray-200/50 border border-gray-100"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
              <ShieldCheck size={28} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">{t("section1Title")}</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">{t("principleTitle")}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t("principleDesc1")} <strong className="text-gray-900">{t("principleDesc2")}</strong>
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">{t("scopeTitle")}</h3>
              <ul className="space-y-3">
                {[
                  t("scope1"),
                  t("scope2"),
                  t("scope3"),
                  t("scope4")
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-600">
                    <CheckCircle size={20} className="text-green-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Section 2: Persiapan */}
        <motion.section
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
        >
          <motion.div variants={fadeIn} className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center">
              <Settings size={28} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">{t("section2Title")}</h2>
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
              <motion.div key={i} variants={fadeIn} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
                <p className="text-sm text-gray-500 font-medium mb-1">{item.label}</p>
                <p className="text-lg font-semibold text-gray-900">{item.value}</p>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeIn} className="mt-8 bg-amber-50 border border-amber-200 p-6 rounded-2xl flex gap-4">
            <AlertTriangle className="text-amber-500 shrink-0" size={24} />
            <div>
              <h4 className="font-semibold text-amber-900 mb-1">{t("importantCentTitle")}</h4>
              <p className="text-amber-800/80">{t("importantCentDesc")}</p>
            </div>
          </motion.div>
        </motion.section>

        {/* Section 3: Instalasi */}
        <motion.section
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center">
              <Cpu size={28} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">{t("section3Title")}</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { step: 1, title: t("step1Title"), desc: t("step1Desc") },
              { step: 2, title: t("step2Title"), desc: t("step2Desc") },
              { step: 3, title: t("step3Title"), desc: t("step3Desc") },
              { step: 4, title: t("step4Title"), desc: t("step4Desc") },
              { step: 5, title: t("step5Title"), desc: t("step5Desc") },
              { step: 6, title: t("step6Title"), desc: t("step6Desc") },
            ].map((step, i) => (
              <div key={i} className="relative bg-white p-6 rounded-2xl shadow-sm border border-gray-100 z-10 group overflow-hidden">
                <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-gray-50 rounded-full z-[-1] group-hover:scale-150 transition-transform duration-500 ease-out"></div>
                <div className="text-4xl font-black text-gray-100 mb-2">{step.step}</div>
                <h4 className="font-semibold text-gray-900 mb-2">{step.title}</h4>
                <p className="text-gray-600 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Section: Do's and Don'ts */}
        <motion.section
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">{t("disciplineTitle")}</h2>
            <p className="text-gray-500 mt-3">{t("disciplineDesc")}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Boleh */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-lg shadow-green-900/5 border border-green-100">
              <div className="bg-green-50 px-8 py-4 border-b border-green-100 flex items-center gap-3">
                <CheckCircle className="text-green-600" />
                <h3 className="text-xl font-bold text-green-900">{t("dosTitle")}</h3>
              </div>
              <ul className="p-8 space-y-6">
                {[
                  t("do1"),
                  t("do2"),
                  t("do3"),
                  t("do4")
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-2 shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tidak Boleh */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-lg shadow-red-900/5 border border-red-100">
              <div className="bg-red-50 px-8 py-4 border-b border-red-100 flex items-center gap-3">
                <XCircle className="text-red-600" />
                <h3 className="text-xl font-bold text-red-900">{t("dontsTitle")}</h3>
              </div>
              <ul className="p-8 space-y-6">
                {[
                  t("dont1"),
                  t("dont2"),
                  t("dont3"),
                  t("dont4")
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="w-2 h-2 rounded-full bg-red-500 mt-2 shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.section>

      </div>
    </main>
  );
}
