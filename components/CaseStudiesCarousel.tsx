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
  cards: {
    type: "performance" | "risk" | "equity";
    delay: number;
    zIndex: number;
  }[];
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
    cards: [
      { type: "performance", delay: 0, zIndex: 1 },
      { type: "equity", delay: 0.1, zIndex: 2 },
    ],
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
    cards: [
      { type: "equity", delay: 0, zIndex: 1 },
      { type: "risk", delay: 0.1, zIndex: 2 },
    ],
  },
  {
    id: "strategi",
    program: "Berbasis Strategi",
    logo: <div className="text-4xl font-black text-yellow-500">FBL</div>,
    title: "Trading dengan rencana, bukan spekulasi.",
    features: ["Price Action", "Risk Management", "Mindset"],
    quote: "Entry lebih jelas dan terukur.",
    attribution: "Sistem Trading FBL",
    accentColor: "#0A0D12",
    cards: [
      { type: "risk", delay: 0, zIndex: 1 },
      { type: "performance", delay: 0.1, zIndex: 2 },
    ],
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
    cards: [
      { type: "performance", delay: 0, zIndex: 1 },
      { type: "risk", delay: 0.1, zIndex: 2 },
    ],
  },
];

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

  return (
    <div className="w-full min-h-screen bg-linear-to-br from-background via-background to-muted/20 flex items-center justify-center py-24 px-8">
      <div className="max-w-7xl w-full">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-[40px] leading-tight font-normal mb-6 tracking-tight">
            Why Choose FBL
          </h1>
          <p className="text-lg leading-7 text-muted-foreground max-w-2xl mx-auto">
            Alasan kenapa FBL jadi pilihan trader Indonesia.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT */}
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
        </div>
      </div>
    </div>
  );
};
