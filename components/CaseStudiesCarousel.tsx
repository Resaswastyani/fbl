"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

// ============================================
// WHY CHOOSE FBL SECTION
// ============================================

type CaseStudy = {
  id: string;
  program: string;
  logo: React.ReactNode;
  title: string;
  features: string[];
  quote: string;
  attribution: string;
  accentColor: string;
  gradient: string;
};

// ============================================
// ANIMATED VISUAL COMPONENTS (RIGHT SIDE)
// ============================================

const FloatingCard = ({
  children,
  delay = 0,
  className = "",
  style = {},
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -20, scale: 0.95 }}
    transition={{
      duration: 0.6,
      delay,
      ease: [0.23, 1, 0.32, 1],
    }}
    whileHover={{
      y: -5,
      scale: 1.02,
      transition: { duration: 0.2 },
    }}
    className={`absolute backdrop-blur-xl bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-2xl border border-white/50 dark:border-white/10 ${className}`}
    style={style}
  >
    {children}
  </motion.div>
);

const ChartBar = ({
  height,
  color,
  delay,
}: {
  height: number;
  color: string;
  delay: number;
}) => (
  <motion.div
    initial={{ height: 0 }}
    animate={{ height: `${height}%` }}
    transition={{ duration: 0.8, delay, ease: "easeOut" }}
    className="w-3 rounded-t-sm"
    style={{ backgroundColor: color }}
  />
);

const CircularProgress = ({
  percentage,
  color,
  size = 80,
}: {
  percentage: number;
  color: string;
  size?: number;
}) => {
  const circumference = 2 * Math.PI * ((size - 8) / 2);
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90 w-full h-full">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={(size - 8) / 2}
          stroke="currentColor"
          strokeWidth="6"
          fill="transparent"
          className="text-gray-200"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={(size - 8) / 2}
          stroke={color}
          strokeWidth="6"
          fill="transparent"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-bold" style={{ color }}>
          {percentage}%
        </span>
      </div>
    </div>
  );
};

const AnimatedChart = ({ accentColor }: { accentColor: string }) => (
  <FloatingCard
    delay={0.1}
    className="p-5 w-64"
    style={{ top: "10%", right: "15%" }}
  >
    <div className="flex items-center justify-between mb-4">
      <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">Performance</span>
      <span className="text-xs text-green-500 font-medium">+24.5%</span>
    </div>
    <div className="flex items-end gap-2 h-24">
      {[35, 55, 40, 70, 45, 80, 65, 90].map((h, i) => (
        <ChartBar
          key={i}
          height={h}
          color={i === 7 ? accentColor : `${accentColor}40`}
          delay={0.2 + i * 0.05}
        />
      ))}
    </div>
  </FloatingCard>
);

const StatsCard = ({ accentColor }: { accentColor: string }) => (
  <FloatingCard
    delay={0.2}
    className="p-5 w-56"
    style={{ top: "45%", right: "5%" }}
  >
    <div className="flex items-center gap-3">
      <CircularProgress percentage={92} color={accentColor} size={60} />
      <div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Materi Tuntas</p>
        <p className="text-lg font-bold text-gray-800 dark:text-white">92%</p>
        <p className="text-xs text-green-500">Tingkat penyelesaian</p>
      </div>
    </div>
  </FloatingCard>
);

const FloatingBadge = ({
  text,
  icon,
  color,
  delay,
  top,
  left,
}: {
  text: string;
  icon: string;
  color: string;
  delay: number;
  top: string;
  left: string;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.5, x: -20 }}
    animate={{ opacity: 1, scale: 1, x: 0 }}
    transition={{ duration: 0.5, delay, type: "spring", stiffness: 200 }}
    className="absolute flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-100 dark:border-gray-700"
    style={{ top, left }}
  >
    <span className="text-lg">{icon}</span>
    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{text}</span>
    <motion.div
      className="w-2 h-2 rounded-full"
      style={{ backgroundColor: color }}
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
  </motion.div>
);

const BackgroundGlow = ({ gradient }: { gradient: string }) => (
  <motion.div
    className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-full blur-3xl opacity-60`}
    animate={{
      scale: [1, 1.1, 1],
      rotate: [0, 5, -5, 0],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    style={{ filter: "blur(60px)" }}
  />
);

const FloatingParticles = () => {
  const particles = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    size: Math.random() * 8 + 4,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 3 + 2,
  }));

  return (
    <>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white/30 backdrop-blur-sm"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.id * 0.3,
          }}
        />
      ))}
    </>
  );
};

// ============================================
// MAIN COMPO
// ============================================

export const ForexTestimonials = () => {
  const t = useTranslations("WhyChoose");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const caseStudies: CaseStudy[] = [
    {
      id: "praktis",
      program: t("praktis"),
      logo: <div className="text-4xl font-black text-green-600">FBL</div>,
      title: t("praktisTitle"),
      features: ["Mudah Dipahami", "Langsung Praktik", "Tanpa Ribet"],
      quote: t("praktisQuote"),
      attribution: "Metode Belajar FBL",
      accentColor: "#16b364",
      gradient: "from-green-500/20 to-emerald-600/20",
    },
    {
      id: "mudah",
      program: t("mudah"),
      logo: <div className="text-4xl font-black text-blue-600">FBL</div>,
      title: t("mudahTitle"),
      features: ["Bahasa Sederhana", "Step by Step", "Terstruktur"],
      quote: t("mudahQuote"),
      attribution: "Kurikulum FBL",
      accentColor: "#3b82f6",
      gradient: "from-blue-500/20 to-indigo-600/20",
    },
    {
      id: "strategi",
      program: t("strategi"),
      logo: <div className="text-4xl font-black text-yellow-500">FBL</div>,
      title: t("strategiTitle"),
      features: ["Price Action", "Risk Management", "Mindset"],
      quote: t("strategiQuote"),
      attribution: "Sistem Trading FBL",
      accentColor: "#f59e0b",
      gradient: "from-amber-500/20 to-orange-600/20",
    },
    {
      id: "efisien",
      program: t("efisien"),
      logo: <div className="text-4xl font-black text-blue-700">FBL</div>,
      title: t("efisienTitle"),
      features: ["Materi Padat", "Fokus Inti", "Langsung Action"],
      quote: t("efisienQuote"),
      attribution: "Pendekatan FBL",
      accentColor: "#155eef",
      gradient: "from-blue-600/20 to-cyan-500/20",
    },
  ];

  const currentStudy = caseStudies[currentIndex];

  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % caseStudies.length);
    }, 5000);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [caseStudies.length]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  return (
    <div className="w-full min-h-screen bg-white dark:bg-[#050508] transition-colors duration-500 flex items-center justify-center py-24 px-8 overflow-hidden">
      <div className="max-w-7xl w-full">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[40px] leading-tight font-normal mb-6 tracking-tight text-[#111A4A] dark:text-white"
          >
            {t("title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg leading-7 text-[#111A4A]/60 dark:text-gray-400 max-w-2xl mx-auto"
          >
            {t("subtitle")}
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT SIDE - CONTENT (TIDAK DIUBAH) */}
          <div className="relative z-10">
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.div
                key={currentStudy.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div className="inline-flex items-center gap-3 bg-black dark:bg-white/10 text-white px-4 py-1.5 rounded-full text-sm font-medium">
                  {currentStudy.logo}
                  {currentStudy.program}
                </div>

                <h2 className="text-3xl leading-snug font-semibold text-[#111A4A] dark:text-white">
                  {currentStudy.title}
                </h2>

                <blockquote className="text-lg font-medium text-[#111A4A]/60 dark:text-gray-400 italic">
                  "{currentStudy.quote}"
                </blockquote>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Dots */}
            <div className="flex items-center gap-3 mt-10">
              {caseStudies.map((cs, index) => (
                <button
                  key={cs.id}
                  onClick={() => goToSlide(index)}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-[#111A4A] dark:bg-white w-8"
                      : "bg-gray-300 dark:bg-gray-600 w-3 hover:bg-gray-400 dark:hover:bg-gray-500"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* RIGHT SIDE - ANIMATED VISUALS (BARU) */}
          <div className="relative h-[500px] lg:h-[600px] hidden lg:block">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStudy.id + "-visuals"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                {/* Background Glow Effect */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <BackgroundGlow gradient={currentStudy.gradient} />
                </div>

                {/* Floating Particles */}
                <FloatingParticles />

                {/* Main Central Element */}
                <motion.div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div
                    className="w-48 h-48 rounded-3xl shadow-2xl flex items-center justify-center relative overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${currentStudy.accentColor}20, ${currentStudy.accentColor}40)`,
                      border: `2px solid ${currentStudy.accentColor}30`,
                    }}
                  >
                    <motion.div
                      className="text-6xl font-black"
                      style={{ color: currentStudy.accentColor }}
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      FBL
                    </motion.div>

                    {/* Shine Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                      animate={{ x: ["-200%", "200%"] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatDelay: 2,
                      }}
                    />
                  </div>
                </motion.div>

                {/* Floating Cards */}
                <AnimatedChart accentColor={currentStudy.accentColor} />
                <StatsCard accentColor={currentStudy.accentColor} />

                {/* Floating Badges */}
                <FloatingBadge
                  text={t("profitConsisten")}
                  icon="📈"
                  color="#22c55e"
                  delay={0.3}
                  top="15%"
                  left="5%"
                />
                <FloatingBadge
                  text={t("riskManaged")}
                  icon="🛡️"
                  color={currentStudy.accentColor}
                  delay={0.4}
                  top="70%"
                  left="10%"
                />
                <FloatingBadge
                  text={t("communityAktif")}
                  icon="👥"
                  color="#3b82f6"
                  delay={0.5}
                  top="85%"
                  right="20%"
                  left="auto"
                />

                {/* Decorative Elements */}
                <motion.div
                  className="absolute w-20 h-20 border-2 rounded-full"
                  style={{
                    borderColor: `${currentStudy.accentColor}30`,
                    top: "20%",
                    left: "60%",
                  }}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <motion.div
                  className="absolute w-12 h-12 border-2 rounded-lg"
                  style={{
                    borderColor: `${currentStudy.accentColor}20`,
                    bottom: "25%",
                    right: "15%",
                  }}
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
