"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Plus, HelpCircle, MessageCircle, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

// ============================================
// ANIMATED BACKGROUND COMPONENTS
// ============================================

const FloatingShape = ({
  delay,
  duration,
  size,
  color,
  initialX,
  initialY,
}: {
  delay: number;
  duration: number;
  size: number;
  color: string;
  initialX: string;
  initialY: string;
}) => (
  <motion.div
    className="absolute rounded-full opacity-20 pointer-events-none"
    style={{
      width: size,
      height: size,
      background: color,
      left: initialX,
      top: initialY,
      filter: "blur(40px)",
    }}
    animate={{
      x: [0, 30, -20, 0],
      y: [0, -40, 20, 0],
      scale: [1, 1.2, 0.8, 1],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

const GradientOrb = ({
  className,
  color,
}: {
  className?: string;
  color: string;
}) => (
  <motion.div
    className={`absolute rounded-full pointer-events-none ${className}`}
    style={{
      background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      filter: "blur(60px)",
    }}
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.5, 0.3],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

const ParticleField = () => {
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 4 + 3,
    delay: Math.random() * 2,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-gradient-to-br from-blue-400/30 to-purple-400/30"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const AnimatedLine = ({ delay }: { delay: number }) => (
  <motion.div
    className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"
    initial={{ scaleX: 0, opacity: 0 }}
    animate={{ scaleX: 1, opacity: 1 }}
    transition={{
      duration: 0.8,
      delay,
      ease: [0.4, 0, 0.2, 1],
    }}
  />
);

const PulseRing = ({ delay }: { delay: number }) => (
  <motion.div
    className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-blue-400/30"
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{
      scale: [0.8, 1.5, 0.8],
      opacity: [0, 0.5, 0],
    }}
    transition={{
      duration: 2,
      delay,
      repeat: Infinity,
      ease: "easeOut",
    }}
  />
);

// ============================================
// MAIN COMPONENT
// ============================================

export const FAQSection = () => {
  const t = useTranslations("FAQ");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    { question: t("q1"), answer: t("a1") },
    { question: t("q2"), answer: t("a2") },
    { question: t("q3"), answer: t("a3") },
    { question: t("q4"), answer: t("a4") },
    { question: t("q5"), answer: t("a5") },
    { question: t("q6"), answer: t("a6") },
    { question: t("q7"), answer: t("a7") },
  ];

  // Stagger animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="w-full py-24 px-8 bg-white relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <GradientOrb
          color="rgba(59, 130, 246, 0.15)"
          className="w-96 h-96 -top-48 -left-48"
        />
        <GradientOrb
          color="rgba(139, 92, 246, 0.1)"
          className="w-80 h-80 top-1/2 -right-40"
        />
        <FloatingShape
          delay={0}
          duration={12}
          size={200}
          color="linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2))"
          initialX="10%"
          initialY="20%"
        />
        <FloatingShape
          delay={2}
          duration={15}
          size={150}
          color="linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(59, 130, 246, 0.15))"
          initialX="80%"
          initialY="60%"
        />
        <ParticleField />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-16">
          {/* Left Column - Title with Animation */}
          <motion.div
            className="lg:col-span-4"
            variants={titleVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="sticky top-24">
              {/* Decorative Icon */}
              <motion.div
                className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/25"
                animate={{
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                whileHover={{ scale: 1.1, rotate: 10 }}
              >
                <HelpCircle className="w-7 h-7 text-white" />
              </motion.div>

              <h2
                className="text-[40px] leading-tight font-normal text-[#202020] tracking-tight mb-4"
                style={{
                  fontFamily: "var(--font-figtree), Figtree",
                  fontWeight: "400",
                  fontSize: "40px",
                }}
              >
                {t("title")}
              </h2>

              {/* Animated underline */}
              <motion.div
                className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                initial={{ width: 0 }}
                animate={isInView ? { width: "60px" } : { width: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />

              {/* Floating help text */}
              <motion.div
                className="mt-6 flex items-center gap-2 text-sm text-gray-500"
                initial={{ opacity: 0, y: 10 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
                }
                transition={{ delay: 0.7 }}
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t("hint")}</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - FAQ Items with Animations */}
          <motion.div
            className="lg:col-span-8"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="space-y-0 relative">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="relative"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Animated border line */}
                  <AnimatedLine delay={index * 0.1} />

                  {/* Pulse ring on hover */}
                  <AnimatePresence>
                    {hoveredIndex === index && openIndex !== index && (
                      <PulseRing delay={0} />
                    )}
                  </AnimatePresence>

                  <div
                    className={`relative transition-all duration-300 ${
                      hoveredIndex === index ? "bg-gray-50/50" : ""
                    } ${openIndex === index ? "bg-blue-50/30" : ""}`}
                  >
                    {/* Question */}
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full flex items-center justify-between py-6 text-left group relative z-10"
                      aria-expanded={openIndex === index}
                    >
                      <span
                        className={`text-lg leading-7 pr-8 transition-colors duration-300 ${
                          openIndex === index
                            ? "text-blue-600"
                            : "text-[#202020] group-hover:text-blue-500"
                        }`}
                        style={{
                          fontFamily: "var(--font-figtree), Figtree",
                          fontWeight: "400",
                        }}
                      >
                        {faq.question}
                      </span>

                      <motion.div
                        animate={{
                          rotate: openIndex === index ? 45 : 0,
                          scale: openIndex === index ? 1.1 : 1,
                        }}
                        whileHover={{ scale: 1.2 }}
                        transition={{
                          duration: 0.3,
                          ease: [0.4, 0, 0.2, 1],
                        }}
                        className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${
                          openIndex === index
                            ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
                            : "bg-gray-100 text-[#202020] group-hover:bg-blue-100 group-hover:text-blue-600"
                        }`}
                      >
                        <Plus className="w-5 h-5" strokeWidth={2} />
                      </motion.div>
                    </button>

                    {/* Answer with enhanced animation */}
                    <AnimatePresence initial={false} mode="wait">
                      {openIndex === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{
                            height: "auto",
                            opacity: 1,
                            transition: {
                              height: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
                              opacity: { duration: 0.3, delay: 0.1 },
                            },
                          }}
                          exit={{
                            height: 0,
                            opacity: 0,
                            transition: {
                              height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
                              opacity: { duration: 0.2 },
                            },
                          }}
                          className="overflow-hidden"
                        >
                          <motion.div
                            className="pb-6 pr-12 relative"
                            initial={{ y: -10 }}
                            animate={{ y: 0 }}
                            transition={{ delay: 0.1 }}
                          >
                            {/* Decorative sparkles */}
                            <motion.div
                              className="absolute top-0 right-4 text-yellow-400"
                              animate={{
                                rotate: [0, 20, -20, 0],
                                scale: [1, 1.2, 1],
                              }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              <Sparkles className="w-5 h-5" />
                            </motion.div>

                            <p
                              className="text-lg leading-7 text-[#666666] relative"
                              style={{
                                fontFamily: "var(--font-figtree), Figtree",
                              }}
                            >
                              {faq.answer}
                            </p>

                            {/* Animated gradient line under answer */}
                            <motion.div
                              className="mt-4 h-px bg-gradient-to-r from-blue-400/50 to-purple-400/50"
                              initial={{ scaleX: 0, originX: 0 }}
                              animate={{ scaleX: 1 }}
                              transition={{ duration: 0.6, delay: 0.2 }}
                            />
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Hover glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-400/5 to-purple-400/0 pointer-events-none"
                    initial={{ opacity: 0, x: "-100%" }}
                    animate={{
                      opacity: hoveredIndex === index ? 1 : 0,
                      x: hoveredIndex === index ? "100%" : "-100%",
                    }}
                    transition={{ duration: 0.6 }}
                  />
                </motion.div>
              ))}

              {/* Final line */}
              <motion.div
                className="absolute left-0 right-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.8, delay: faqs.length * 0.1 }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
