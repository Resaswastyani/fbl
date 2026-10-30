"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

const ForexChart3D = dynamic(() => import("./ForexChart3D"), { ssr: false });

export const ForexPhilosophyHero = () => {
  const t = useTranslations("ForexPhilosophyHero");
  const sectionRef = useRef<HTMLElement>(null);
  const [enable3D, setEnable3D] = useState(false);
  const [inView, setInView] = useState(false);

  // Visual 3D (CSS) dimuat setelah mount; animasi berhenti saat di luar layar
  useEffect(() => {
    setEnable3D(true);
  }, []);

  // Render loop 3D hanya berjalan saat section terlihat
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin: "200px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full min-h-[70vh] md:min-h-[95vh] py-20 md:py-0 flex items-center justify-center overflow-hidden bg-white dark:bg-[#050508] transition-colors duration-500">
      {/* Lusion-style 3D Background */}
      {enable3D && (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-25 md:opacity-60">
          <ForexChart3D active={inView} />
        </div>
      )}

      {/* Ambient glowing blobs — radial gradient statis + animasi CSS (tanpa blur besar) */}
      <div
        className="absolute top-1/4 -left-[15%] w-[700px] h-[700px] rounded-full pointer-events-none fx-drift"
        style={{ background: "radial-gradient(circle, rgba(34,211,168,0.22) 0%, transparent 65%)", "--fx-dur": "14s" } as React.CSSProperties}
      />
      <div
        className="absolute bottom-1/4 -right-[15%] w-[700px] h-[700px] rounded-full pointer-events-none fx-drift"
        style={{ background: "radial-gradient(circle, rgba(22,126,108,0.22) 0%, transparent 65%)", "--fx-dur": "18s", "--fx-delay": "2s" } as React.CSSProperties}
      />

      {/* Content overlay */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 mb-6 md:mb-8 px-4 md:px-5 py-2 rounded-full border border-[#167E6C]/20 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-md shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-[#22d3a8] animate-pulse"></span>
            <span className="text-[#167E6C] text-xs md:text-sm font-semibold tracking-widest uppercase">{t("tagline")}</span>
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-[#111A4A] dark:text-white mb-6 md:mb-8 leading-[1.1] tracking-tight">
            {t("titlePart1")} <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#167E6C] to-[#22d3a8]">
              {t("titlePart2")}
            </span>
          </h2>
          
          <p className="text-lg md:text-2xl text-[#111A4A]/70 dark:text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed font-medium italic font-[family-name:var(--font-figtree)]">
            "{t("description")}"
          </p>

          <Link href="/philosophy">
            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center justify-center gap-3 px-7 py-4 md:px-10 md:py-5 rounded-full bg-[#111A4A] dark:bg-[#167E6C] text-white font-semibold text-base md:text-lg overflow-hidden transition-all shadow-xl hover:shadow-[#22d3a8]/30 hover:shadow-2xl"
            >
              <span className="relative z-10 flex items-center gap-2">
                {t("button")}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#167E6C] to-[#22d3a8] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
