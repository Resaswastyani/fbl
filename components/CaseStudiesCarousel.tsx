// "use client";

// import type React from "react";
// import { useState, useRef, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// // =============================
// //  FOREX FOR BETTER LIVING TESTIMONIAL CAROUSEL
// //  Version: C (Program + Individu)
// //  Cards: Trading Performance Cards (Option 1)
// // =============================

// // ============================================
// // TYPES
// // ============================================
// type CaseStudy = {
//   id: string;
//   program: string;
//   logo: React.ReactNode;
//   title: string;
//   features: string[];
//   quote: string;
//   attribution: string;
//   accentColor: string;
//   cards: {
//     type: "performance" | "risk" | "equity";
//     delay: number;
//     zIndex: number;
//   }[];
// };

// // ============================================
// // CASE STUDIES (PROGRAM + ALUMNI TESTIMONIALS)
// // ============================================
// const caseStudies: CaseStudy[] = [
//   {
//     id: "basic-forex",
//     program: "Program Dasar Forex",
//     logo: (
//       <div className="text-4xl font-black text-green-600">FBL</div>
//     ),
//     title: "Program Dasar Forex membantu ribuan pemula memahami fondasi market dan mulai trading dengan percaya diri.",
//     features: ["Pemahaman Market", "Candlestick Basic", "Risk Management Dasar"],
//     quote: "Saya tidak menyangka belajar forex bisa sesederhana itu. Setelah ikut kelas ini, saya akhirnya konsisten profit mingguan.",
//     attribution: "Irfan – Alumni Program Dasar",
//     accentColor: "#16b364",
//     cards: [
//       { type: "performance", delay: 0, zIndex: 1 },
//       { type: "equity", delay: 0.1, zIndex: 2 },
//     ],
//   },
//   {
//     id: "price-action",
//     program: "Price Action Mastery",
//     logo: <div className="text-4xl font-black text-blue-600">FBL</div>,
//     title: "Price Action Mastery membawa trader memahami struktur pasar dan entry yang lebih presisi.",
//     features: ["Market Structure", "Supply & Demand", "Advanced Price Action"],
//     quote: "Dulu saya sering FOMO. Setelah belajar PA Mastery, entry saya jauh lebih terukur dan winrate meningkat drastis.",
//     attribution: "Gilang – Alumni PA Mastery",
//     accentColor: "#3b82f6",
//     cards: [
//       { type: "equity", delay: 0, zIndex: 1 },
//       { type: "risk", delay: 0.1, zIndex: 2 },
//     ],
//   },
//   {
//     id: "risk-management",
//     program: "Risk Management Bootcamp",
//     logo: <div className="text-4xl font-black text-yellow-500">FBL</div>,
//     title: "Risk Management Bootcamp mengubah trader agresif menjadi trader stabil dengan kontrol risiko optimal.",
//     features: ["Money Management", "Drawdown Control", "Position Sizing"],
//     quote: "Risk Bootcamp mengubah cara saya melihat market. Sekarang drawdown saya kecil dan akun bertahan lebih lama.",
//     attribution: "Nadia – Alumni RM Bootcamp",
//     accentColor: "#0A0D12",
//     cards: [
//       { type: "risk", delay: 0, zIndex: 1 },
//       { type: "performance", delay: 0.1, zIndex: 2 },
//     ],
//   },
//   {
//     id: "mentorship",
//     program: "One-on-One Mentorship",
//     logo: <div className="text-4xl font-black text-blue-700">FBL</div>,
//     title: "Program Mentorship membimbing trader secara langsung hingga mencapai konsistensi profit.",
//     features: ["Personal Coaching", "Strategy Refinement", "Weekly Evaluation"],
//     quote: "Mentorship FBL benar-benar beda. Ada yang mengarahkan saya secara personal sampai strategi saya matang.",
//     attribution: "Rafi – Alumni Mentorship",
//     accentColor: "#155eef",
//     cards: [
//       { type: "performance", delay: 0, zIndex: 1 },
//       { type: "risk", delay: 0.1, zIndex: 2 },
//     ],
//   },
// ];

// // ============================================
// // FEATURE BADGE
// // ============================================
// const FeatureBadge = ({ name }: { name: string }) => {
//   return (
//     <div className="flex items-center gap-2 bg-white/75 shadow-sm border border-black/5 rounded-lg px-2 py-1 text-sm font-medium text-foreground">
//       <span>✔</span>
//       {name}
//     </div>
//   );
// };

// // ============================================
// // CARD COMPONENTS (TRADING VISUAL CARDS)
// // ============================================
// const TradingPerformanceCard = ({ accentColor, delay, zIndex }: any) => (
//   <motion.div
//     initial={{ opacity: 0, y: 20, scale: 0.95 }}
//     animate={{ opacity: 1, y: 0, scale: 1 }}
//     transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1], delay }}
//     className="absolute w-[380px] rounded-xl p-6 backdrop-blur-xl"
//     style={{
//       backgroundColor: "rgba(255, 255, 255, 0.85)",
//       boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
//       transform: "translate(-180px, -70px)",
//       zIndex,
//     }}
//   >
//     <h4 className="text-sm font-semibold mb-4">Weekly Performance</h4>
//     <div className="space-y-3">
//       <div className="flex justify-between text-sm">
//         <span>Winrate</span>
//         <span className="font-bold">82%</span>
//       </div>
//       <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
//         <div className="h-full" style={{ width: "82%", backgroundColor: accentColor }} />
//       </div>
//     </div>
//   </motion.div>
// );

// const EquityGrowthCard = ({ accentColor, delay, zIndex }: any) => (
//   <motion.div
//     initial={{ opacity: 0, y: 20, scale: 0.95 }}
//     animate={{ opacity: 1, y: 0, scale: 1 }}
//     transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1], delay }}
//     className="absolute w-[360px] rounded-xl p-6 backdrop-blur-xl"
//     style={{
//       backgroundColor: "rgba(255,255,255,0.85)",
//       boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
//       transform: "translate(-200px, -40px)",
//       zIndex,
//     }}
//   >
//     <h4 className="text-sm font-semibold mb-3">Equity Growth</h4>
//     <div className="h-24 bg-muted rounded-lg flex items-end p-2 gap-2">
//       {[20, 40, 60, 45, 80].map((v, i) => (
//         <div key={i} className="flex-1 bg-green-500 rounded-sm" style={{ height: `${v}%`, backgroundColor: accentColor }} />
//       ))}
//     </div>
//   </motion.div>
// );

// const RiskScoreCard = ({ accentColor, delay, zIndex }: any) => (
//   <motion.div
//     initial={{ opacity: 0, y: 20, scale: 0.95 }}
//     animate={{ opacity: 1, y: 0, scale: 1 }}
//     transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1], delay }}
//     className="absolute w-[320px] rounded-xl p-6 backdrop-blur-xl"
//     style={{
//       backgroundColor: "rgba(255,255,255,0.85)",
//       boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
//       transform: "translate(-120px, -120px)",
//       zIndex,
//     }}
//   >
//     <h4 className="text-sm font-semibold mb-3">Risk Score</h4>
//     <div className="text-lg font-bold text-green-600">Low Risk</div>
//     <p className="text-xs text-muted-foreground mt-2">Drawdown terkontrol & posisi aman.</p>
//   </motion.div>
// );

// // ============================================
// // MAIN COMPONENT
// // ============================================
// export const ForexTestimonials = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [direction, setDirection] = useState(0);
//   const [isAutoPlaying, setIsAutoPlaying] = useState(true);
//   const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

//   const currentStudy = caseStudies[currentIndex];

//   const startAutoPlay = () => {
//     if (autoPlayRef.current) clearInterval(autoPlayRef.current);
//     autoPlayRef.current = setInterval(() => {
//       nextSlide();
//     }, 5000);
//   };

//   const stopAutoPlay = () => {
//     if (autoPlayRef.current) {
//       clearInterval(autoPlayRef.current);
//       autoPlayRef.current = null;
//     }
//   };

//   useEffect(() => {
//     if (isAutoPlaying) startAutoPlay();
//     else stopAutoPlay();
//     return () => stopAutoPlay();
//   }, [isAutoPlaying, currentIndex]);

//   const nextSlide = () => {
//     setDirection(1);
//     setCurrentIndex((prev) => (prev + 1) % caseStudies.length);
//   };

//   const prevSlide = () => {
//     setDirection(-1);
//     setCurrentIndex((prev) => (prev - 1 + caseStudies.length) % caseStudies.length);
//   };

//   const goToSlide = (index: number) => {
//     setDirection(index > currentIndex ? 1 : -1);
//     setCurrentIndex(index);
//   };

//   const slideVariants = {
//     enter: (direction: number) => ({ x: direction > 0 ? 1000 : -1000, opacity: 0 }),
//     center: { x: 0, opacity: 1 },
//     exit: (direction: number) => ({ x: direction < 0 ? 1000 : -1000, opacity: 0 }),
//   };

//   return (
//     <div
//       className="w-full min-h-screen bg-linear-to-br from-background via-background to-muted/20 flex items-center justify-center py-24 px-8"
//       onMouseEnter={() => setIsAutoPlaying(false)}
//       onMouseLeave={() => setIsAutoPlaying(true)}
//     >
//       <div className="max-w-7xl w-full">
//         {/* Header */}
//         <div className="text-center mb-16">
//           <h1 className="text-[40px] leading-tight font-normal mb-6 tracking-tight">Testimoni Forex for Better Living</h1>
//           <p className="text-lg leading-7 text-muted-foreground max-w-2xl mx-auto">
//             Kisah nyata para trader yang berkembang bersama Forex for Better Living.
//           </p>
//         </div>

//         <div className="grid lg:grid-cols-2 gap-16 items-center">
//           {/* LEFT SIDE – TEXT CONTENT */}
//           <div>
//             <AnimatePresence mode="wait" initial={false} custom={direction}>
//               <motion.div
//                 key={currentStudy.id}
//                 custom={direction}
//                 variants={slideVariants}
//                 initial="enter"
//                 animate="center"
//                 exit="exit"
//                 transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
//                 className="space-y-6"
//               >
//                 {/* Program Label */}
//                 <div className="inline-flex items-center gap-3 bg-black text-white px-4 py-1.5 rounded-full text-sm font-medium">
//                   {currentStudy.logo}
//                   {currentStudy.program}
//                 </div>

//                 {/* Title */}
//                 <h2 className="text-3xl leading-snug font-semibold">{currentStudy.title}</h2>

//                 {/* Features */}
//                 <div className="flex flex-wrap gap-3 mt-4">
//                   {currentStudy.features.map((f) => (
//                     <FeatureBadge key={f} name={f} />
//                   ))}
//                 </div>

//                 {/* Quote */}
//                 <blockquote className="mt-6 text-lg font-medium text-muted-foreground border-l-4 border-black/20 pl-4 italic">
//                   “{currentStudy.quote}”
//                 </blockquote>
//                 <div className="text-base font-semibold">— {currentStudy.attribution}</div>
//               </motion.div>
//             </AnimatePresence>

//             {/* Navigation Dots */}
//             <div className="flex items-center gap-3 mt-10">
//               {caseStudies.map((cs, index) => (
//                 <button
//                   key={cs.id}
//                   onClick={() => goToSlide(index)}
//                   className={`h-3 rounded-full transition-all duration-300 ${
//                     index === currentIndex ? "bg-foreground w-8" : "bg-muted-foreground/30 w-3"
//                   }`}
//                 />
//               ))}
//             </div>
//           </div>

//           {/* RIGHT SIDE – FLOATING CARDS */}
//           <div className="relative h-[420px] lg:h-[520px]">
//             <AnimatePresence mode="popLayout" initial={false}>
//               <motion.div
//                 key={currentStudy.id + "-cards"}
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ duration: 0.5 }}
//                 className="absolute inset-0"
//               >
//                 {currentStudy.cards.map((card, i) => {
//                   const props = {
//                     accentColor: currentStudy.accentColor,
//                     delay: card.delay,
//                     zIndex: card.zIndex,
//                   };

//                   if (card.type === "performance") return <TradingPerformanceCard key={i} {...props} />;
//                   if (card.type === "equity") return <EquityGrowthCard key={i} {...props} />;
//                   if (card.type === "risk") return <RiskScoreCard key={i} {...props} />;
//                 })}
//               </motion.div>
//             </AnimatePresence>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// "use client";

// import type React from "react";
// import { useState, useRef, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// // ============================================
// // WHY CHOOSE FBL SECTION
// // ============================================

// type CaseStudy = {
//   id: string;
//   program: string;
//   logo: React.ReactNode;
//   title: string;
//   features: string[];
//   quote: string;
//   attribution: string;
//   accentColor: string;
//   cards: {
//     type: "performance" | "risk" | "equity";
//     delay: number;
//     zIndex: number;
//   }[];
// };

// const caseStudies: CaseStudy[] = [
//   {
//     id: "praktis",
//     program: "Praktis & Sederhana",
//     logo: <div className="text-4xl font-black text-green-600">FBL</div>,
//     title: "Materi disusun ringkas, jelas, dan langsung ke inti.",
//     features: ["Mudah Dipahami", "Langsung Praktik", "Tanpa Ribet"],
//     quote: "Belajar trading jadi lebih simpel dan terarah.",
//     attribution: "Metode Belajar FBL",
//     accentColor: "#16b364",
//     cards: [
//       { type: "performance", delay: 0, zIndex: 1 },
//       { type: "equity", delay: 0.1, zIndex: 2 },
//     ],
//   },
//   {
//     id: "mudah",
//     program: "Mudah Dipahami",
//     logo: <div className="text-4xl font-black text-blue-600">FBL</div>,
//     title: "Cocok untuk pemula maupun trader berkembang.",
//     features: ["Bahasa Sederhana", "Step by Step", "Terstruktur"],
//     quote: "Tidak perlu latar belakang trading.",
//     attribution: "Kurikulum FBL",
//     accentColor: "#3b82f6",
//     cards: [
//       { type: "equity", delay: 0, zIndex: 1 },
//       { type: "risk", delay: 0.1, zIndex: 2 },
//     ],
//   },
//   {
//     id: "strategi",
//     program: "Berbasis Strategi",
//     logo: <div className="text-4xl font-black text-yellow-500">FBL</div>,
//     title: "Trading dengan rencana, bukan spekulasi.",
//     features: ["Price Action", "Risk Management", "Mindset"],
//     quote: "Entry lebih jelas dan terukur.",
//     attribution: "Sistem Trading FBL",
//     accentColor: "#0A0D12",
//     cards: [
//       { type: "risk", delay: 0, zIndex: 1 },
//       { type: "performance", delay: 0.1, zIndex: 2 },
//     ],
//   },
//   {
//     id: "efisien",
//     program: "Efisiensi Waktu",
//     logo: <div className="text-4xl font-black text-blue-700">FBL</div>,
//     title: "Belajar efektif tanpa buang waktu.",
//     features: ["Materi Padat", "Fokus Inti", "Langsung Action"],
//     quote: "Belajar singkat, hasil maksimal.",
//     attribution: "Pendekatan FBL",
//     accentColor: "#155eef",
//     cards: [
//       { type: "performance", delay: 0, zIndex: 1 },
//       { type: "risk", delay: 0.1, zIndex: 2 },
//     ],
//   },
// ];

// // ============================================
// // MAIN COMPONENT
// // ============================================

// export const ForexTestimonials = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [direction, setDirection] = useState(0);
//   const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

//   const currentStudy = caseStudies[currentIndex];

//   useEffect(() => {
//     autoPlayRef.current = setInterval(() => {
//       setDirection(1);
//       setCurrentIndex((prev) => (prev + 1) % caseStudies.length);
//     }, 5000);

//     return () => {
//       if (autoPlayRef.current) clearInterval(autoPlayRef.current);
//     };
//   }, []);

//   const slideVariants = {
//     enter: (direction: number) => ({
//       x: direction > 0 ? 1000 : -1000,
//       opacity: 0,
//     }),
//     center: { x: 0, opacity: 1 },
//     exit: (direction: number) => ({
//       x: direction < 0 ? 1000 : -1000,
//       opacity: 0,
//     }),
//   };

//   return (
//     <div className="w-full min-h-screen bg-linear-to-br from-background via-background to-muted/20 flex items-center justify-center py-24 px-8">
//       <div className="max-w-7xl w-full">
//         {/* Header */}
//         <div className="text-center mb-16">
//           <h1 className="text-[40px] leading-tight font-normal mb-6 tracking-tight">
//             Why Choose FBL
//           </h1>
//           <p className="text-lg leading-7 text-muted-foreground max-w-2xl mx-auto">
//             Alasan kenapa FBL jadi pilihan trader Indonesia.
//           </p>
//         </div>

//         <div className="grid lg:grid-cols-2 gap-16 items-center">
//           {/* LEFT */}
//           <AnimatePresence mode="wait" initial={false} custom={direction}>
//             <motion.div
//               key={currentStudy.id}
//               custom={direction}
//               variants={slideVariants}
//               initial="enter"
//               animate="center"
//               exit="exit"
//               transition={{ duration: 0.6 }}
//               className="space-y-6"
//             >
//               <div className="inline-flex items-center gap-3 bg-black text-white px-4 py-1.5 rounded-full text-sm font-medium">
//                 {currentStudy.logo}
//                 {currentStudy.program}
//               </div>

//               <h2 className="text-3xl leading-snug font-semibold">
//                 {currentStudy.title}
//               </h2>

//               <blockquote className="text-lg font-medium text-muted-foreground italic">
//                 “{currentStudy.quote}”
//               </blockquote>

//               <div className="text-base font-semibold">
//                 — {currentStudy.attribution}
//               </div>
//             </motion.div>
//           </AnimatePresence>
//         </div>
//       </div>
//     </div>
//   );
// };

"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

const caseStudies: CaseStudy[] = [
  {
    id: "praktis",
    program: "Praktis & Sederhana",
    logo: <div className="text-4xl font-black text-green-600">FBL</div>,
    title: "Materi disusun ringkas, jelas, dan langsung ke inti.",
    features: ["Mudah Dipahami", "Langsung Praktik", "Tanpa Ribet"],
    quote: "Belajar trading jadi lebih simpel dan terarah.",
    attribution: "Metode Belajar FBL",
    accentColor: "#16b364",
    gradient: "from-green-500/20 to-emerald-600/20",
  },
  {
    id: "mudah",
    program: "Mudah Dipahami",
    logo: <div className="text-4xl font-black text-blue-600">FBL</div>,
    title: "Cocok untuk pemula maupun trader berkembang.",
    features: ["Bahasa Sederhana", "Step by Step", "Terstruktur"],
    quote: "Tidak perlu latar belakang trading.",
    attribution: "Kurikulum FBL",
    accentColor: "#3b82f6",
    gradient: "from-blue-500/20 to-indigo-600/20",
  },
  {
    id: "strategi",
    program: "Berbasis Strategi",
    logo: <div className="text-4xl font-black text-yellow-500">FBL</div>,
    title: "Trading dengan rencana, bukan spekulasi.",
    features: ["Price Action", "Risk Management", "Mindset"],
    quote: "Entry lebih jelas dan terukur.",
    attribution: "Sistem Trading FBL",
    accentColor: "#f59e0b",
    gradient: "from-amber-500/20 to-orange-600/20",
  },
  {
    id: "efisien",
    program: "Efisiensi Waktu",
    logo: <div className="text-4xl font-black text-blue-700">FBL</div>,
    title: "Belajar efektif tanpa buang waktu.",
    features: ["Materi Padat", "Fokus Inti", "Langsung Action"],
    quote: "Belajar singkat, hasil maksimal.",
    attribution: "Pendekatan FBL",
    accentColor: "#155eef",
    gradient: "from-blue-600/20 to-cyan-500/20",
  },
];

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
    className={`absolute backdrop-blur-xl bg-white/90 rounded-2xl shadow-2xl border border-white/50 ${className}`}
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
      <span className="text-xs font-semibold text-gray-600">Performance</span>
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
      <CircularProgress percentage={87} color={accentColor} size={60} />
      <div>
        <p className="text-xs text-gray-500 mb-1">Profit</p>
        <p className="text-lg font-bold text-gray-800">87%</p>
        <p className="text-xs text-green-500">+12% vs last month</p>
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
    className="absolute flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-lg border border-gray-100"
    style={{ top, left }}
  >
    <span className="text-lg">{icon}</span>
    <span className="text-sm font-medium text-gray-700">{text}</span>
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
// MAIN COMPONENT
// ============================================

export const ForexTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const currentStudy = caseStudies[currentIndex];

  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % caseStudies.length);
    }, 5000);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, []);

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
    <div className="w-full min-h-screen bg-linear-to-br from-background via-background to-muted/20 flex items-center justify-center py-24 px-8 overflow-hidden">
      <div className="max-w-7xl w-full">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[40px] leading-tight font-normal mb-6 tracking-tight"
          >
            Why Choose FBL
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg leading-7 text-muted-foreground max-w-2xl mx-auto"
          >
            Alasan kenapa FBL jadi pilihan trader Indonesia.
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
                <div className="inline-flex items-center gap-3 bg-black text-white px-4 py-1.5 rounded-full text-sm font-medium">
                  {currentStudy.logo}
                  {currentStudy.program}
                </div>

                <h2 className="text-3xl leading-snug font-semibold">
                  {currentStudy.title}
                </h2>

                <blockquote className="text-lg font-medium text-muted-foreground italic">
                  “{currentStudy.quote}”
                </blockquote>

                <div className="text-base font-semibold">
                  — {currentStudy.attribution}
                </div>
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
                      ? "bg-foreground w-8"
                      : "bg-muted-foreground/30 w-3 hover:bg-muted-foreground/50"
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
                  text="Profit Consisten"
                  icon="📈"
                  color="#22c55e"
                  delay={0.3}
                  top="15%"
                  left="5%"
                />
                <FloatingBadge
                  text="Risk Managed"
                  icon="🛡️"
                  color={currentStudy.accentColor}
                  delay={0.4}
                  top="70%"
                  left="10%"
                />
                <FloatingBadge
                  text="Community Aktif"
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
