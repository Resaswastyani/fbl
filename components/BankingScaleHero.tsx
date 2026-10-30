"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

type StatItem = {
  value: string;
  description: string;
  delay: number;
};

type DataPoint = {
  id: number;
  left: number;
  top: number;
  height: number;
  direction: "up" | "down";
  delay: number;
  duration: number;
};

const generateDataPoints = (): DataPoint[] => {
  const points: DataPoint[] = [];
  const baseLeft = 1;
  const spacing = 32;
  // Area grafik 680px / spacing 32px ≈ 22 garis yang benar-benar terlihat
  for (let i = 0; i < 22; i++) {
    const direction = i % 2 === 0 ? "down" : "up";
    const height = Math.round(Math.random() * 120) + 88;
    const top =
      direction === "down"
        ? Math.random() * 150 + 250
        : Math.random() * 100 - 80;
    points.push({
      id: i,
      left: baseLeft + i * spacing,
      top,
      height,
      direction,
      delay: i * 0.035,
      duration: Math.random() * 2 + 2,
    });
  }
  return points;
};

// KOMPONEN ANIMASI TEXT REVEAL
const AnimatedText = ({
  text,
  delay = 0,
}: {
  text: string;
  delay?: number;
}) => {
  const words = text.split(" ");
  return (
    <motion.span
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.05, delayChildren: delay }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 20, rotateX: -90 },
            visible: {
              opacity: 1,
              y: 0,
              rotateX: 0,
              transition: { duration: 0.5, ease: [0.215, 0.61, 0.355, 1] },
            },
          }}
          className="inline-block mr-[0.25em]"
          style={{ transformOrigin: "bottom" }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};

// KOMPONEN SHIMMER EFFECT
const ShimmerText = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => (
  <div
    className="fx-shimmer"
    style={
      {
        background:
          "linear-gradient(90deg, #167E6C 0%, #22d3a8 50%, #167E6C 100%)",
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        "--fx-delay": `${delay}s`,
      } as React.CSSProperties
    }
  >
    {children}
  </div>
);

// KOMPONEN DATA LINE DENGAN ANIMASI BERGERAK
const AnimatedDataLine = ({
  point,
  isVisible,
}: {
  point: DataPoint;
  isVisible: boolean;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={isVisible ? { opacity: 1, height: point.height } : {}}
      transition={{
        duration: 1.5,
        delay: point.delay,
        ease: [0.34, 1.56, 0.64, 1],
      }}
      className="absolute w-1.5 rounded-[3px]"
      style={{
        left: `${point.left}px`,
        top: `${point.top}px`,
        background:
          point.direction === "down"
            ? "linear-gradient(rgb(176, 200, 196) 0%, rgb(176, 200, 196) 10%, rgba(156, 217, 93, 0.1) 40%, rgba(113, 210, 240, 0) 75%)"
            : "linear-gradient(to top, rgb(176, 200, 196) 0%, rgb(176, 200, 196) 10%, rgba(156, 217, 93, 0.1) 40%, rgba(113, 210, 240, 0) 75%)",
        backgroundColor: "rgba(22, 126, 108, 0.01)",
      }}
    >
      {/* Animasi wave & glow via CSS (jalan di compositor, bukan JS per frame) */}
      {isVisible && (
        <>
          <div
            className="absolute inset-0 rounded-[3px] fx-wave"
            style={
              {
                background:
                  point.direction === "down"
                    ? "linear-gradient(to top, rgba(22, 126, 108, 0.8) 0%, rgba(176, 200, 196, 0.4) 100%)"
                    : "linear-gradient(to bottom, rgba(22, 126, 108, 0.8) 0%, rgba(176, 200, 196, 0.4) 100%)",
                "--fx-dur": `${point.duration}s`,
                "--fx-delay": `${point.delay + 1.5}s`,
              } as React.CSSProperties
            }
          />
          <div
            className="absolute inset-0 rounded-[3px] fx-pulse"
            style={
              {
                boxShadow: "0 0 8px rgba(22, 126, 108, 0.6)",
                "--fx-dur": "2s",
                "--fx-delay": `${point.delay + 1.5}s`,
              } as React.CSSProperties
            }
          />
        </>
      )}

      {/* DOT DENGAN ANIMASI */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={isVisible ? { opacity: 1, scale: 1 } : {}}
        transition={{
          duration: 0.5,
          delay: point.delay + 1.2,
          ease: "backOut",
        }}
        className="absolute -left-[1px] w-2 h-2 bg-[#167E6C] rounded-full"
        style={{
          top: point.direction === "down" ? "0px" : `${point.height - 8}px`,
        }}
      >
        {/* RIPPLE EFFECT */}
        {isVisible && (
          <>
            <div className="absolute inset-0 bg-[#167E6C] rounded-full fx-ripple" />
            <div
              className="absolute inset-0 bg-[#22d3a8] rounded-full fx-ripple"
              style={
                {
                  "--fx-delay": "0.5s",
                  "--fx-ripple-scale": 2.5,
                  "--fx-ripple-opacity": 0.4,
                } as React.CSSProperties
              }
            />
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export const BankingScaleHero = () => {
  const t = useTranslations("Hero");
  const tStats = useTranslations("Stats");
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [dataPoints, setDataPoints] = useState<DataPoint[] | null>(null);
  const [typingComplete, setTypingComplete] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  const stats: StatItem[] = [
    {
      value: tStats("practical"),
      description: tStats("practicalDesc"),
      delay: 0,
    },
    {
      value: tStats("coreBusiness"),
      description: tStats("coreBusinessDesc"),
      delay: 0.2,
    },
    {
      value: tStats("easyImplement"),
      description: tStats("easyImplementDesc"),
      delay: 0.4,
    },
    {
      value: tStats("fastMastery"),
      description: tStats("fastMasteryDesc"),
      delay: 0.6,
    },
  ];

  useEffect(() => {
    setMounted(true);
    setDataPoints(generateDataPoints());
    setIsVisible(true);
    const timer = setTimeout(() => setTypingComplete(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1],
        staggerChildren: 0.1,
      },
    },
  };

  const descriptionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 0.6,
      y: 0,
      transition: { duration: 1, delay: 0.3, ease: "easeOut" },
    },
  };

  const statContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.5 },
    },
  };

  const statItemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] },
    },
  };

  return (
    <div className="w-full overflow-hidden bg-white dark:bg-[#050508] transition-colors duration-500 relative">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16 md:py-24 pt-12 md:pt-16 relative">
        <div className="grid grid-cols-12 gap-5 gap-y-10 md:gap-y-16 relative">
          {/* LEFT CONTENT */}
          <div className="col-span-12 md:col-span-6 relative z-20">
            {/* TOP TAGLINE */}
            <motion.div
              className="relative h-6 inline-flex items-center text-xs font-medium uppercase tracking-[0.12em] text-[#167E6C] dark:text-[#22d3a8] mb-8 md:mb-12 px-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="flex items-center gap-0.5 overflow-hidden">
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: "auto" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="block whitespace-nowrap overflow-hidden text-[#167E6C] dark:text-[#22d3a8]"
                >
                  {t("tagline")
                    .split("")
                    .map((char, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.03, duration: 0.3 }}
                        className="inline-block"
                      >
                        {char === " " ? "\u00A0" : char}
                      </motion.span>
                    ))}
                </motion.span>
                <span
                  className={`block w-1.5 h-3 bg-[#167E6C] dark:bg-[#22d3a8] ml-0.5 rounded-sm ${typingComplete ? "fx-blink" : "opacity-0"}`}
                />
              </div>
            </motion.div>

            {/* TITLE */}
            <motion.h2
              className="text-3xl md:text-[40px] font-normal leading-tight tracking-tight text-[#111A4A] dark:text-white mb-6"
              variants={titleVariants}
              initial="hidden"
              animate="visible"
            >
              <AnimatedText text={t("title")} delay={0.2} />
            </motion.h2>

            {/* DESCRIPTION */}
            <motion.p
              className="text-base md:text-lg leading-relaxed text-[#111A4A] dark:text-gray-300 opacity-60 dark:opacity-80 mt-0 mb-6"
              variants={descriptionVariants}
              initial="hidden"
              animate="visible"
            >
              <AnimatedText text={t("description")} delay={0.4} />
            </motion.p>
          </div>

          {/* RIGHT GRAPH - Z-INDEX LEBIH RENDAH */}
          <div className="col-span-12 md:col-span-6 relative z-10">
            <motion.div
              className="relative w-full h-[260px] md:h-[416px] md:-ml-[200px]"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 1,
                delay: 0.3,
                ease: [0.215, 0.61, 0.355, 1],
              }}
            >
              {/* BACKGROUND GLOW */}
              <div className="absolute top-0 left-0 md:left-[302px] w-full md:w-[680px] h-[260px] md:h-[416px] pointer-events-none overflow-hidden">
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-50"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(22, 126, 108, 0.15) 0%, transparent 70%)",
                  }}
                />

                <div className="relative w-[680px] h-[416px] origin-top-left scale-[0.62] md:scale-100">
                  {!mounted || dataPoints === null ? (
                    <div className="w-full h-full" aria-hidden />
                  ) : (
                    dataPoints.map((point) => (
                      <AnimatedDataLine
                        key={point.id}
                        point={point}
                        isVisible={isVisible}
                      />
                    ))
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          {/* STATS SECTION - Z-INDEX PALING TINGGI */}
          <div className="col-span-12 relative z-30">
            <motion.div
              className="overflow-visible pb-5"
              variants={statContainerVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="grid grid-cols-12 gap-5 relative">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="col-span-12 sm:col-span-6 md:col-span-3"
                    variants={statItemVariants}
                    whileHover={{
                      y: -8,
                      scale: 1.02,
                      transition: { duration: 0.3, ease: "easeOut" },
                    }}
                  >
                    <motion.div
                      className="flex flex-col gap-2 p-4 rounded-xl transition-all duration-300 hover:bg-[#167E6C]/5 dark:hover:bg-[#22d3a8]/5 cursor-default bg-white/80 dark:bg-white/5 border border-transparent dark:border-white/10 backdrop-blur-sm"
                      whileHover={{
                        boxShadow: "0 20px 40px -15px rgba(22, 126, 108, 0.2)",
                      }}
                    >
                      <motion.span
                        className="text-xl md:text-2xl font-medium leading-tight tracking-tight"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: stat.delay + 0.5, duration: 0.6 }}
                      >
                        <ShimmerText delay={stat.delay}>
                          {stat.value}
                        </ShimmerText>
                      </motion.span>
                      <motion.p
                        className="text-xs leading-[1.4] text-[#7C7F88] m-0 whitespace-pre-line"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: stat.delay + 0.7, duration: 0.5 }}
                      >
                        {stat.description}
                      </motion.p>
                      <motion.div
                        className="h-[2px] bg-gradient-to-r from-[#167E6C] to-transparent mt-2"
                        initial={{ width: 0 }}
                        animate={{ width: "40%" }}
                        transition={{ delay: stat.delay + 0.9, duration: 0.8 }}
                      />
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
