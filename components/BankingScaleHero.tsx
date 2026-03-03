// "use client";

// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { useRouter } from "next/navigation";

// type StatItem = {
//   value: string;
//   description: string;
//   delay: number;
// };

// type DataPoint = {
//   id: number;
//   left: number;
//   top: number;
//   height: number;
//   direction: "up" | "down";
//   delay: number;
// };

// const stats: StatItem[] = [
//   {
//     value: "Praktis & Sederhana",
//     description: "Metode yang dirancang untuk\nkemudahan akses siapa saja",
//     delay: 0,
//   },
//   {
//     value: "Materi Core Business",
//     description: "Strategi inti untuk membangun\nbisnis trading yang kokoh",
//     delay: 0.2,
//   },
//   {
//     value: "Mudah Diimplementasi",
//     description: "Langkah-langkah teknis yang\nsiap langsung dipraktikkan",
//     delay: 0.4,
//   },
//   {
//     value: "Penguasaan Cepat",
//     description: "Kurikulum efisien untuk hasil\nyang lebih optimal",
//     delay: 0.6,
//   },
// ];

// const generateDataPoints = (): DataPoint[] => {
//   const points: DataPoint[] = [];
//   const baseLeft = 1;
//   const spacing = 32;
//   for (let i = 0; i < 50; i++) {
//     const direction = i % 2 === 0 ? "down" : "up";
//     const height = Math.round(Math.random() * 120) + 88;
//     const top =
//       direction === "down"
//         ? Math.random() * 150 + 250
//         : Math.random() * 100 - 80;
//     points.push({
//       id: i,
//       left: baseLeft + i * spacing,
//       top,
//       height,
//       direction,
//       delay: i * 0.035,
//     });
//   }
//   return points;
// };

// export const BankingScaleHero = () => {
//   const [isVisible, setIsVisible] = useState(false);
//   const [dataPoints, setDataPoints] = useState<DataPoint[] | null>(null);
//   const [typingComplete, setTypingComplete] = useState(false);
//   const [mounted, setMounted] = useState(false);

//   const router = useRouter();

//   useEffect(() => {
//     setMounted(true);
//     setDataPoints(generateDataPoints());
//     setIsVisible(true);

//     const timer = setTimeout(() => setTypingComplete(true), 1000);
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <div className="w-full overflow-hidden bg-white">
//       <div className="mx-auto max-w-7xl px-8 py-24 pt-16">
//         <div className="grid grid-cols-12 gap-5 gap-y-16">
//           {/* LEFT CONTENT */}
//           <div className="col-span-12 md:col-span-6 relative z-10">
//             {/* TOP TAGLINE */}
//             <div className="relative h-6 inline-flex items-center font-mono uppercase text-xs text-[#167E6C] mb-12 px-2">
//               <div className="flex items-center gap-0.5 overflow-hidden">
//                 <motion.span
//                   initial={{ width: 0 }}
//                   animate={{ width: "auto" }}
//                   transition={{ duration: 0.8, ease: "easeOut" }}
//                   className="block whitespace-nowrap overflow-hidden text-[#167E6C]"
//                 >
//                   Live Forex Intelligence
//                 </motion.span>

//                 <motion.span
//                   initial={{ opacity: 0 }}
//                   animate={{
//                     opacity: typingComplete ? [1, 0, 1, 0] : 0,
//                   }}
//                   transition={{
//                     duration: 1,
//                     repeat: Infinity,
//                     ease: "linear",
//                   }}
//                   className="block w-1.5 h-3 bg-[#167E6C] ml-0.5 rounded-sm"
//                 />
//               </div>
//             </div>

//             {/* TITLE */}
//             <h2 className="text-[40px] font-normal leading-tight tracking-tight text-[#111A4A] mb-6">
//               Visi & Misi
//             </h2>

//             {/* DESCRIPTION */}
//             <p className="text-lg leading-6 text-[#111A4A] opacity-60 mt-0 mb-6">
//               Menjadi Jasa Edukasi & Konsultasi Forex Trading yang membantu
//               banyak orang di Indonesia yang ingin berkembang menjadi Trader
//               yang mampu mencapai level Trading For Living bahkan Trading For
//               Business dengan pendekatan Metode - metode yang praktis. Karena
//               Forex Trading adalah salah satu industri keuangan yang menjanjikan
//               untuk bisnis dengan kelebihan2nya yang spesifik dibanding industri
//               bisnis lainnya.
//             </p>

//             {/* CTA BUTTON */}
//             {/* <button
//               onClick={() => router.push("/signup")}
//               className="relative inline-flex justify-center items-center leading-4 text-center cursor-pointer whitespace-nowrap outline-none font-medium h-9 text-[#232730] bg-white/50 backdrop-blur-sm shadow-[0_1px_1px_0_rgba(255,255,255,0),0_0_0_1px_rgba(87,90,100,0.12)] transition-all duration-200 ease-in-out rounded-lg px-4 mt-5 text-sm group hover:shadow-[0_1px_2px_0_rgba(0,0,0,0.05),0_0_0_1px_rgba(87,90,100,0.18)]"
//             >
//               Mulai Sekarang
//             </button> */}
//           </div>

//           {/* RIGHT GRAPH */}
//           <div className="col-span-12 md:col-span-6">
//             <div className="relative w-full h-[416px] md:-ml-[200px]">
//               <div className="absolute top-0 left-0 md:left-[302px] w-full md:w-[680px] h-[416px] pointer-events-none">
//                 <div className="relative w-full h-full">
//                   {!mounted || dataPoints === null ? (
//                     <div className="w-full h-full" aria-hidden />
//                   ) : (
//                     dataPoints.map((point) => (
//                       <motion.div
//                         key={point.id}
//                         initial={{ opacity: 0, height: 0 }}
//                         animate={
//                           isVisible
//                             ? {
//                                 opacity: [0, 1, 1],
//                                 height: [0, point.height, point.height],
//                               }
//                             : {}
//                         }
//                         transition={{
//                           duration: 2,
//                           delay: point.delay,
//                           ease: [0.5, 0, 0.01, 1],
//                         }}
//                         className="absolute w-1.5 rounded-[3px]"
//                         style={{
//                           left: `${point.left}px`,
//                           top: `${point.top}px`,
//                           background:
//                             point.direction === "down"
//                               ? "linear-gradient(rgb(176, 200, 196) 0%, rgb(176, 200, 196) 10%, rgba(156, 217, 93, 0.1) 40%, rgba(113, 210, 240, 0) 75%)"
//                               : "linear-gradient(to top, rgb(176, 200, 196) 0%, rgb(176, 200, 196) 10%, rgba(156, 217, 93, 0.1) 40%, rgba(113, 210, 240, 0) 75%)",
//                           backgroundColor: "rgba(22, 126, 108, 0.01)",
//                         }}
//                       >
//                         <motion.div
//                           initial={{ opacity: 0 }}
//                           animate={
//                             isVisible
//                               ? {
//                                   opacity: [0, 1],
//                                 }
//                               : {}
//                           }
//                           transition={{
//                             duration: 0.3,
//                             delay: point.delay + 1.7,
//                           }}
//                           className="absolute -left-1px w-2 h-2 bg-[#167E6C] rounded-full"
//                           style={{
//                             top:
//                               point.direction === "down"
//                                 ? "0px"
//                                 : `${point.height - 8}px`,
//                           }}
//                         />
//                       </motion.div>
//                     ))
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* STATS SECTION - UPDATED TO TEXT */}
//           <div className="col-span-12">
//             <div className="overflow-visible pb-5">
//               <div className="grid grid-cols-12 gap-5 relative z-10">
//                 {stats.map((stat, index) => (
//                   <div
//                     key={index}
//                     className="col-span-12 sm:col-span-6 md:col-span-3"
//                   >
//                     <motion.div
//                       initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
//                       animate={
//                         isVisible
//                           ? {
//                               opacity: 1,
//                               y: 0,
//                               filter: "blur(0px)",
//                             }
//                           : {}
//                       }
//                       transition={{
//                         duration: 1.2,
//                         delay: stat.delay,
//                         ease: [0.1, 0, 0.1, 1],
//                       }}
//                       className="flex flex-col gap-2"
//                     >
//                       {/* Bagian Value sekarang langsung menampilkan teks */}
//                       <span className="text-xl md:text-2xl font-medium leading-tight tracking-tight text-[#167E6C]">
//                         {stat.value}
//                       </span>
//                       <p className="text-xs leading-[1.4] text-[#7C7F88] m-0 whitespace-pre-line">
//                         {stat.description}
//                       </p>
//                     </motion.div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useRouter } from "next/navigation";

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
};

const stats: StatItem[] = [
  {
    value: "Praktis & Sederhana",
    description: "Metode yang dirancang untuk\nkemudahan akses siapa saja",
    delay: 0,
  },
  {
    value: "Materi Core Business",
    description: "Strategi inti untuk membangun\nbisnis trading yang kokoh",
    delay: 0.2,
  },
  {
    value: "Mudah Diimplementasi",
    description: "Langkah-langkah teknis yang\nsiap langsung dipraktikkan",
    delay: 0.4,
  },
  {
    value: "Penguasaan Cepat",
    description: "Kurikulum efisien untuk hasil\nyang lebih optimal",
    delay: 0.6,
  },
];

const generateDataPoints = (): DataPoint[] => {
  const points: DataPoint[] = [];
  const baseLeft = 1;
  const spacing = 32;
  for (let i = 0; i < 50; i++) {
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
    });
  }
  return points;
};

// ⭐ KOMPONEN ANIMASI TEXT REVEAL
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

// ⭐ KOMPONEN ANIMASI GLOW PULSE
const GlowPulse = ({ delay = 0 }: { delay?: number }) => (
  <motion.div
    className="absolute inset-0 rounded-full"
    style={{
      background:
        "radial-gradient(circle, rgba(22, 126, 108, 0.3) 0%, transparent 70%)",
    }}
    animate={{
      scale: [1, 1.5, 1],
      opacity: [0.3, 0.6, 0.3],
    }}
    transition={{
      duration: 3,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

// ⭐ KOMPONEN FLOATING ELEMENTS
const FloatingElement = ({
  children,
  delay = 0,
  duration = 4,
  yOffset = 10,
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
}) => (
  <motion.div
    animate={{
      y: [0, -yOffset, 0],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    {children}
  </motion.div>
);

// ⭐ KOMPONEN SHIMMER EFFECT
const ShimmerText = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => (
  <motion.div
    initial={{ backgroundPosition: "-200% 0" }}
    animate={{ backgroundPosition: "200% 0" }}
    transition={{
      duration: 3,
      delay,
      repeat: Infinity,
      ease: "linear",
    }}
    style={{
      background:
        "linear-gradient(90deg, #167E6C 0%, #22d3a8 50%, #167E6C 100%)",
      backgroundSize: "200% 100%",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    }}
  >
    {children}
  </motion.div>
);

export const BankingScaleHero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [dataPoints, setDataPoints] = useState<DataPoint[] | null>(null);
  const [typingComplete, setTypingComplete] = useState(false);
  const [mounted, setMounted] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    setDataPoints(generateDataPoints());
    setIsVisible(true);

    const timer = setTimeout(() => setTypingComplete(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  // ⭐ ANIMASI UNTUK TITLE
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

  // ⭐ ANIMASI UNTUK DESCRIPTION
  const descriptionVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
    visible: {
      opacity: 0.6,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 1, delay: 0.3, ease: "easeOut" },
    },
  };

  // ⭐ ANIMASI UNTUK STATS
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
      transition: {
        duration: 0.6,
        ease: [0.215, 0.61, 0.355, 1],
      },
    },
  };

  return (
    <div className="w-full overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-8 py-24 pt-16">
        <div className="grid grid-cols-12 gap-5 gap-y-16">
          {/* LEFT CONTENT */}
          <div className="col-span-12 md:col-span-6 relative z-10">
            {/* TOP TAGLINE */}
            <motion.div
              className="relative h-6 inline-flex items-center font-mono uppercase text-xs text-[#167E6C] mb-12 px-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="flex items-center gap-0.5 overflow-hidden">
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: "auto" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="block whitespace-nowrap overflow-hidden text-[#167E6C]"
                >
                  {"Live Forex Intelligence".split("").map((char, i) => (
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

                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: typingComplete ? [1, 0, 1, 0] : 0,
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="block w-1.5 h-3 bg-[#167E6C] ml-0.5 rounded-sm"
                />
              </div>
            </motion.div>

            {/* TITLE DENGAN ANIMASI MODERN */}
            <motion.h2
              className="text-[40px] font-normal leading-tight tracking-tight text-[#111A4A] mb-6"
              variants={titleVariants}
              initial="hidden"
              animate="visible"
            >
              <AnimatedText text="Visi & Misi" delay={0.2} />
            </motion.h2>

            {/* DESCRIPTION DENGAN ANIMASI BLUR REVEAL */}
            <motion.p
              className="text-lg leading-6 text-[#111A4A] opacity-60 mt-0 mb-6"
              variants={descriptionVariants}
              initial="hidden"
              animate="visible"
            >
              <AnimatedText
                text="Menjadi Jasa Edukasi & Konsultasi Forex Trading yang membantu banyak orang di Indonesia yang ingin berkembang menjadi Trader yang mampu mencapai level Trading For Living bahkan Trading For Business dengan pendekatan Metode - metode yang praktis. Karena Forex Trading adalah salah satu industri keuangan yang menjanjikan untuk bisnis dengan kelebihan2nya yang spesifik dibanding industri bisnis lainnya."
                delay={0.4}
              />
            </motion.p>

            {/* CTA BUTTON DENGAN ANIMASI HOVER MAGNETIC */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              {/* Button placeholder untuk future use */}
            </motion.div>
          </div>

          {/* RIGHT GRAPH DENGAN ANIMASI ENHANCED */}
          <div className="col-span-12 md:col-span-6">
            <motion.div
              className="relative w-full h-[416px] md:-ml-[200px]"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 1,
                delay: 0.3,
                ease: [0.215, 0.61, 0.355, 1],
              }}
            >
              {/* BACKGROUND GLOW EFFECT */}
              <div className="absolute top-0 left-0 md:left-[302px] w-full md:w-[680px] h-[416px] pointer-events-none">
                <GlowPulse delay={0} />
                <GlowPulse delay={1} />

                <div className="relative w-full h-full">
                  {!mounted || dataPoints === null ? (
                    <div className="w-full h-full" aria-hidden />
                  ) : (
                    dataPoints.map((point, index) => (
                      <motion.div
                        key={point.id}
                        initial={{ opacity: 0, height: 0, scaleY: 0 }}
                        animate={
                          isVisible
                            ? {
                                opacity: [0, 0.6, 1],
                                height: [0, point.height * 0.5, point.height],
                                scaleY: [0, 1.2, 1],
                              }
                            : {}
                        }
                        transition={{
                          duration: 1.5,
                          delay: point.delay,
                          ease: [0.34, 1.56, 0.64, 1],
                        }}
                        className="absolute w-1.5 rounded-[3px] origin-bottom"
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
                        {/* DOT DENGAN ANIMASI PULSE */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={
                            isVisible
                              ? {
                                  opacity: 1,
                                  scale: [0, 1.5, 1],
                                }
                              : {}
                          }
                          transition={{
                            duration: 0.5,
                            delay: point.delay + 1.2,
                            ease: "backOut",
                          }}
                          className="absolute -left-[1px] w-2 h-2 bg-[#167E6C] rounded-full"
                          style={{
                            top:
                              point.direction === "down"
                                ? "0px"
                                : `${point.height - 8}px`,
                          }}
                        >
                          {/* RIPPLE EFFECT */}
                          <motion.div
                            className="absolute inset-0 bg-[#167E6C] rounded-full"
                            animate={{
                              scale: [1, 2, 2],
                              opacity: [0.5, 0, 0],
                            }}
                            transition={{
                              duration: 2,
                              delay: point.delay + 1.5,
                              repeat: Infinity,
                              repeatDelay: 3,
                            }}
                          />
                        </motion.div>
                      </motion.div>
                    ))
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          {/* STATS SECTION DENGAN ANIMASI STAGGER DAN HOVER */}
          <div className="col-span-12">
            <motion.div
              className="overflow-visible pb-5"
              variants={statContainerVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="grid grid-cols-12 gap-5 relative z-10">
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
                      className="flex flex-col gap-2 p-4 rounded-xl transition-all duration-300 hover:bg-[#167E6C]/5 cursor-default"
                      whileHover={{
                        boxShadow: "0 20px 40px -15px rgba(22, 126, 108, 0.2)",
                      }}
                    >
                      {/* VALUE DENGAN SHIMMER EFFECT */}
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

                      {/* DESCRIPTION DENGAN FADE UP */}
                      <motion.p
                        className="text-xs leading-[1.4] text-[#7C7F88] m-0 whitespace-pre-line"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: stat.delay + 0.7, duration: 0.5 }}
                      >
                        {stat.description}
                      </motion.p>

                      {/* DECORATIVE LINE */}
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
