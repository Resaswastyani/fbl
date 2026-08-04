"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import {
  Shield,
  AlertCircle,
  ArrowRight,
  BookOpen,
  AlertTriangle,
  Sparkles,
  ShieldCheck,
  Info,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

export default function DisclaimerPreview() {
  const t = useTranslations("Disclaimer");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();
  const [hoveredCard, setHoveredCard] = useState(false);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        duration: 0.6,
      },
    },
  };

  const floatAnimation = {
    y: [-8, 8, -8],
    rotate: [-5, 5, -5],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  const pulseRing = {
    scale: [1, 1.2, 1],
    opacity: [0.5, 0, 0.5],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeOut",
    },
  };

  const shimmerAnimation = {
    background: [
      "linear-gradient(90deg, rgba(21,109,149,0) 0%, rgba(21,109,149,0.1) 50%, rgba(21,109,149,0) 100%)",
      "linear-gradient(90deg, rgba(21,109,149,0.1) 0%, rgba(21,109,149,0) 50%, rgba(21,109,149,0.1) 100%)",
      "linear-gradient(90deg, rgba(21,109,149,0) 0%, rgba(21,109,149,0.1) 50%, rgba(21,109,149,0) 100%)",
    ],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "linear",
    },
  };

  const cardHoverVariants = {
    rest: {
      scale: 1,
      boxShadow:
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    },
    hover: {
      scale: 1.01,
      boxShadow: "0 25px 50px -12px rgba(21, 109, 149, 0.25)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 15,
      },
    },
  };

  const iconHoverVariants = {
    rest: { rotate: 0, scale: 1 },
    hover: {
      rotate: [0, -10, 10, 0],
      scale: 1.1,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  const buttonHoverVariants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: { scale: 0.95 },
  };

  const slideInLeft = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const slideInRight = {
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const scaleUp = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
  };

  return (
    <section ref={ref} className="w-full relative overflow-hidden">
      {/* Animated Background Gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-[#050508] dark:via-[#0a0a12] dark:to-[#050508] transition-colors duration-500"
        animate={{
          background: [
            "linear-gradient(to bottom right, rgb(248 250 252), rgb(255 255 255), rgb(241 245 249))",
            "linear-gradient(to bottom right, rgb(241 245 249), rgb(248 250 252), rgb(255 255 255))",
            "linear-gradient(to bottom right, rgb(255 255 255), rgb(241 245 249), rgb(248 250 252))",
            "linear-gradient(to bottom right, rgb(248 250 252), rgb(255 255 255), rgb(241 245 249))",
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Decorative Elements */}
      <motion.div
        className="absolute top-10 left-10 w-32 h-32 bg-[#156d95]/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-40 h-40 bg-amber-500/5 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* FULL WIDTH CONTAINER */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-12 md:py-16 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="relative w-full"
        >
          {/* Floating Icon Badge */}
          <motion.div
            variants={itemVariants}
            className="absolute -top-6 left-4 md:left-8 z-20"
          >
            <motion.div animate={floatAnimation} className="relative">
              {/* Pulse Rings */}
              <motion.div
                className="absolute inset-0 bg-[#156d95] rounded-2xl"
                animate={pulseRing}
              />
              <motion.div
                className="absolute inset-0 bg-[#156d95] rounded-2xl"
                animate={{
                  ...pulseRing,
                  transition: { ...pulseRing.transition, delay: 0.5 },
                }}
              />

              {/* Main Badge */}
              <motion.div
                variants={iconHoverVariants}
                initial="rest"
                whileHover="hover"
                className="relative bg-gradient-to-br from-[#156d95] to-[#0d476e] text-white p-4 rounded-2xl shadow-xl shadow-[#156d95]/30 cursor-pointer"
              >
                <Shield size={28} />
                <motion.div
                  className="absolute -top-1 -right-1"
                  animate={{
                    rotate: [0, 15, -15, 0],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Sparkles size={16} className="text-yellow-300" />
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Main Content Card - FULL WIDTH */}
          <motion.div
            variants={cardHoverVariants}
            initial="rest"
            whileHover="hover"
            onHoverStart={() => setHoveredCard(true)}
            onHoverEnd={() => setHoveredCard(false)}
            className="bg-white/80 dark:bg-[#0a0a12]/80 backdrop-blur-xl rounded-3xl p-6 md:p-10 pt-12 md:pt-10 shadow-2xl border border-white/50 dark:border-white/10 relative overflow-hidden w-full transition-colors duration-500"
          >
            {/* Shimmer Effect */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={hoveredCard ? shimmerAnimation : {}}
            />

            {/* Header - Full Width Layout */}
            <motion.div
              variants={slideInLeft}
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 w-full"
            >
              <div className="flex-1">
                <motion.h3
                  variants={itemVariants}
                  className="text-xl md:text-2xl font-bold text-[#111A4A] dark:text-white flex items-center gap-3"
                  style={{ fontFamily: "var(--font-figtree), Figtree" }}
                >
                  <motion.div
                    animate={{
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <AlertCircle size={24} className="text-[#156d95]" />
                  </motion.div>
                  {t("title")}
                </motion.h3>
                <motion.p
                  variants={itemVariants}
                  className="text-sm text-[#6e6e6e] dark:text-gray-400 mt-2 ml-9"
                  style={{ fontFamily: "var(--font-figtree), Figtree" }}
                >
                  {t("subtitle")}
                </motion.p>
              </div>

              {/* Animated Status Badge */}
              <motion.span
                variants={scaleUp}
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center px-4 py-2 rounded-full text-xs font-semibold bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-700/50 shadow-sm w-fit cursor-default"
              >
                <motion.span
                  className="w-2 h-2 rounded-full bg-amber-500 mr-2"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [1, 0.7, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                {t("important")}
                <motion.div
                  className="ml-2"
                  animate={{
                    x: [0, 3, 0],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <AlertTriangle size={14} />
                </motion.div>
              </motion.span>
            </motion.div>

            {/* Content - Full Width */}
            <motion.div
              variants={containerVariants}
              className="space-y-6 w-full"
            >
              <motion.p
                variants={itemVariants}
                className="text-[#374151] dark:text-gray-300 leading-relaxed text-sm md:text-base w-full"
                style={{ fontFamily: "var(--font-figtree), Figtree" }}
              >
                {t("educationText")}
              </motion.p>

              <motion.div
                variants={slideInRight}
                whileHover={{
                  x: 5,
                  boxShadow: "0 10px 40px -10px rgba(21, 109, 149, 0.2)",
                }}
                className="bg-gradient-to-r from-slate-50 to-white dark:from-[#050508] dark:to-[#0a0a12] rounded-xl p-5 border-l-4 border-[#156d95] shadow-sm cursor-default transition-shadow w-full"
                style={{ fontFamily: "var(--font-figtree), Figtree" }}
              >
                <div className="flex items-start gap-3 w-full">
                  <motion.div
                    animate={{
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="mt-1"
                  >
                    <Info size={20} className="text-[#156d95]" />
                  </motion.div>
                  <div className="flex-1">
                    <p className="text-sm text-[#374151] dark:text-gray-300 leading-relaxed">
                      <span className="font-bold text-[#111A4A] dark:text-white text-base">
                        {t("responsibility")}
                      </span>{" "}
                      {t("responsibilityText")}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* CTA Section - Full Width */}
            <motion.div
              variants={itemVariants}
              className="mt-8 pt-8 border-t border-slate-100 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 w-full"
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-xs text-[#6e6e6e] dark:text-gray-400 flex items-center gap-2"
                style={{ fontFamily: "var(--font-figtree), Figtree" }}
              >
                <ShieldCheck size={14} className="text-green-500" />
                {t("learnMore")}
              </motion.p>

              <motion.div
                variants={buttonHoverVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
              >
                <Link
                  href="/disclaimer"
                  className="group relative inline-flex items-center gap-2 bg-[#111A4A] text-white px-6 py-3 rounded-xl text-sm font-semibold overflow-hidden"
                  style={{ fontFamily: "var(--font-figtree), Figtree" }}
                >
                  {/* Button Background Animation */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#156d95] to-[#0d476e]"
                    initial={{ x: "100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />

                  <span className="relative z-10 flex items-center gap-2">
                    <motion.div
                      animate={{
                        y: [0, -2, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <BookOpen size={18} />
                    </motion.div>
                    {t("readMore")}
                    <motion.div
                      animate={{
                        x: [0, 4, 0],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <ArrowRight size={18} />
                    </motion.div>
                  </span>
                </Link>
              </motion.div>
            </motion.div>

            {/* Decorative Corner Icons */}
            <motion.div
              className="absolute top-4 right-4 opacity-10"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <Shield size={80} />
            </motion.div>
          </motion.div>

          {/* Bottom Decorative Line - Full Width */}
          <motion.div
            variants={itemVariants}
            className="mt-8 w-full flex justify-center"
          >
            <motion.div
              className="h-1 bg-gradient-to-r from-transparent via-[#156d95] to-transparent rounded-full"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "100%", opacity: 0.3 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
