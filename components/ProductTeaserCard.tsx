// (archived commented code kept above for reference)
"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const RightAnimationCard = dynamic(() => import("./RightAnimationCard"), {
  ssr: false,
});

// ─── Premium Star Field ──────────────────────────────────────────────────────
function StarField() {
  const [stars, setStars] = useState<
    { x: number; y: number; size: number; delay: number; duration: number }[]
  >([]);

  useEffect(() => {
    const generated = Array.from({ length: 90 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.5,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
    }));
    setStars(generated);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1.3, 0.5],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// ─── Floating Orbs ────────────────────────────────────────────────────────────
function FloatingOrbs() {
  const orbs = [
    {
      color: "rgba(34,211,168,0.18)",
      w: 600,
      h: 600,
      x: "-15%",
      y: "10%",
      delay: 0,
      dur: 16,
    },
    {
      color: "rgba(99,102,241,0.14)",
      w: 450,
      h: 450,
      x: "65%",
      y: "-15%",
      delay: 2,
      dur: 20,
    },
    {
      color: "rgba(236,72,153,0.10)",
      w: 380,
      h: 380,
      x: "55%",
      y: "55%",
      delay: 4,
      dur: 13,
    },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: orb.w,
            height: orb.h,
            left: orb.x,
            top: orb.y,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            filter: "blur(80px)",
          }}
          animate={{
            x: [0, 50, -25, 0],
            y: [0, -40, 25, 0],
            scale: [1, 1.12, 0.92, 1],
          }}
          transition={{
            duration: orb.dur,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// ─── Scanning Line ────────────────────────────────────────────────────────────
function ScanLine() {
  return (
    <motion.div
      className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#22d3a8]/50 to-transparent pointer-events-none z-10"
      style={{ top: "0%" }}
      animate={{ top: ["0%", "100%", "0%"] }}
      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
    />
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export const ProductTeaserCard = () => {
  const t = useTranslations("Hero");
  const tFooter = useTranslations("Footer");
  const router = useRouter();

  return (
    <section className="w-full pt-24 md:pt-32 pb-20 bg-white dark:bg-[#050508] transition-colors duration-500 relative overflow-hidden">
      {/* ── DARK MODE PREMIUM AMBIENT EFFECTS ── */}
      <div className="hidden dark:block absolute inset-0">
        <FloatingOrbs />
        <StarField />
        <ScanLine />
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />
        {/* Corner accent lines */}
        <div className="absolute top-0 left-0 w-48 h-48 border-l border-t border-[#22d3a8]/20 rounded-br-3xl" />
        <div className="absolute bottom-0 right-0 w-48 h-48 border-r border-b border-[#6366f1]/20 rounded-tl-3xl" />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-5 lg:gap-16 px-8 md:px-12 relative z-10">
        {/* LEFT TEXT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="col-span-12 lg:col-span-6 flex flex-col justify-center text-left"
        >
          {/* Small Link */}
          <a
            onClick={(e) => e.preventDefault()}
            className="flex items-center gap-1 text-[#6e6e6e] dark:text-[#22d3a8]/70 mb-4 cursor-pointer"
          >
            <span className="text-xs uppercase tracking-tight font-mono flex items-center gap-1 hover:text-[#202020] dark:hover:text-[#22d3a8] transition-colors">
              {t("tagline")} <ArrowUpRight size={14} strokeWidth={1.5} />
            </span>
          </a>

          {/* Headline */}
          <h1
            className="text-[40px] font-normal leading-tight tracking-tight text-[#111A4A] dark:text-white mb-6"
            style={{
              fontFamily: "var(--font-figtree), Figtree",
              fontSize: "50px",
              fontWeight: "500",
            }}
          >
            {t("tagline")}
          </h1>

          {/* Subheadline */}
          <p
            className="text-lg leading-6 text-[#111A4A] dark:text-gray-300 opacity-60 dark:opacity-80 mt-0 mb-6"
            style={{ fontFamily: "var(--font-figtree), Figtree" }}
          >
            {t("description")}
          </p>

          <div className="mb-8">
            <p className="font-semibold text-[#111A4A] dark:text-gray-100 mb-3">
              {tFooter("companyName")}
            </p>
            <div className="grid grid-cols-2 gap-y-4 gap-x-4 text-sm text-[#111A4A] dark:text-gray-400 opacity-80">
              <div>
                <p className="text-xs opacity-60 mb-0.5">{tFooter("nib")}</p>
                <p className="font-medium text-xs">1411250044219</p>
              </div>
              <div>
                <p className="text-xs opacity-60 mb-0.5">{tFooter("npwp")}</p>
                <p className="font-medium text-xs">1000000006570444</p>
              </div>
              <div>
                <p className="text-xs opacity-60 mb-0.5">
                  {tFooter("investmentStatusLabel")}
                </p>
                <p className="font-medium text-xs">PMDN</p>
              </div>
              <div>
                <p className="text-xs opacity-60 mb-0.5">
                  {tFooter("registeredKbli")}
                </p>
                <p className="font-medium text-xs">70209, 74909, 85495</p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={() => router.push("/login")}
            className="relative inline-flex items-center justify-center overflow-hidden bg-[#156d95] dark:bg-transparent text-white rounded-lg px-5 py-3 text-sm sm:text-base font-medium w-fit transition-all hover:translate-x-1 group dark:border dark:border-[#22d3a8]/50"
          >
            {/* Dark mode animated gradient fill */}
            <motion.span
              className="absolute inset-0 hidden dark:block bg-gradient-to-r from-[#22d3a8]/20 to-[#6366f1]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
            <span className="relative z-10">{t("startLearning")}</span>
          </button>
        </motion.div>

        {/* RIGHT ANIMATION — image unchanged */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="col-span-12 lg:col-span-6 flex items-center justify-center mt-6 md:mt-0"
        >
          <div className="relative w-auto max-w-[420px] md:max-w-[520px] lg:max-w-[600px] h-auto">
            {/* Glow halo behind image — dark mode only */}
            <div className="hidden dark:block absolute inset-[-20px] rounded-3xl bg-gradient-to-br from-[#22d3a8]/10 via-[#6366f1]/5 to-transparent blur-3xl" />
            <RightAnimationCard />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
