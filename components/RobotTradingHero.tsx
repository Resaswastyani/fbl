// "use client";

// import { motion, useAnimation } from "framer-motion";
// import { useEffect, useState } from "react";
// import {
//   TrendingUp,
//   TrendingDown,
//   DollarSign,
//   Activity,
//   Cpu,
//   Zap,
// } from "lucide-react";

// // Floating particles component
// const FloatingParticles = () => {
//   const particles = Array.from({ length: 6 }, (_, i) => ({
//     id: i,
//     size: Math.random() * 4 + 2,
//     x: Math.random() * 100,
//     y: Math.random() * 100,
//     duration: Math.random() * 3 + 2,
//     delay: Math.random() * 2,
//   }));

//   return (
//     <div className="absolute inset-0 overflow-hidden pointer-events-none">
//       {particles.map((particle) => (
//         <motion.div
//           key={particle.id}
//           className="absolute rounded-full bg-[#156d95]/30"
//           style={{
//             width: particle.size,
//             height: particle.size,
//             left: `${particle.x}%`,
//             top: `${particle.y}%`,
//           }}
//           animate={{
//             y: [0, -30, 0],
//             opacity: [0.2, 0.8, 0.2],
//             scale: [1, 1.5, 1],
//           }}
//           transition={{
//             duration: particle.duration,
//             repeat: Infinity,
//             delay: particle.delay,
//             ease: "easeInOut",
//           }}
//         />
//       ))}
//     </div>
//   );
// };

// // Animated chart bars
// const AnimatedChartBars = () => {
//   const bars = [
//     { height: 40, delay: 0, color: "#156d95" },
//     { height: 70, delay: 0.2, color: "#22d3ee" },
//     { height: 50, delay: 0.4, color: "#156d95" },
//     { height: 90, delay: 0.6, color: "#10b981" },
//     { height: 60, delay: 0.8, color: "#156d95" },
//     { height: 80, delay: 1, color: "#22d3ee" },
//     { height: 45, delay: 1.2, color: "#156d95" },
//   ];

//   return (
//     <div className="flex items-end gap-1 h-16">
//       {bars.map((bar, idx) => (
//         <motion.div
//           key={idx}
//           className="w-2 rounded-t-sm"
//           style={{ backgroundColor: bar.color }}
//           initial={{ height: 0 }}
//           animate={{ height: `${bar.height}%` }}
//           transition={{
//             duration: 0.8,
//             delay: bar.delay,
//             repeat: Infinity,
//             repeatType: "reverse",
//             repeatDelay: 0.5,
//           }}
//         />
//       ))}
//     </div>
//   );
// };

// // Robot head component with animated eyes
// const RobotHead = () => {
//   return (
//     <motion.div
//       className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40"
//       animate={{
//         rotateY: [0, 10, 0, -10, 0],
//         rotateX: [0, 5, 0, -5, 0],
//       }}
//       transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
//       style={{ transformStyle: "preserve-3d" }}
//     >
//       {/* Robot Face Background */}
//       <div className="absolute inset-0 bg-gradient-to-br from-[#111A4A] to-[#156d95] rounded-3xl shadow-2xl border-4 border-white/20">
//         {/* Screen/face area */}
//         <div className="absolute inset-2 bg-[#0a0f2e] rounded-2xl overflow-hidden">
//           {/* Animated eyes */}
//           <div className="absolute top-1/3 left-1/4 w-3 h-3 sm:w-4 sm:h-4 bg-[#22d3ee] rounded-full shadow-[0_0_10px_#22d3ee]">
//             <motion.div
//               className="w-full h-full bg-white rounded-full"
//               animate={{ scale: [1, 0.3, 1] }}
//               transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
//             />
//           </div>
//           <div className="absolute top-1/3 right-1/4 w-3 h-3 sm:w-4 sm:h-4 bg-[#22d3ee] rounded-full shadow-[0_0_10px_#22d3ee]">
//             <motion.div
//               className="w-full h-full bg-white rounded-full"
//               animate={{ scale: [1, 0.3, 1] }}
//               transition={{
//                 duration: 3,
//                 repeat: Infinity,
//                 repeatDelay: 2,
//                 delay: 0.1,
//               }}
//             />
//           </div>

//           {/* Mouth/Speaker */}
//           <motion.div
//             className="absolute bottom-1/4 left-1/2 -translate-x-1/2 flex gap-1"
//             animate={{ opacity: [0.5, 1, 0.5] }}
//             transition={{ duration: 2, repeat: Infinity }}
//           >
//             {[...Array(5)].map((_, i) => (
//               <div
//                 key={i}
//                 className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#22d3ee] rounded-full"
//               />
//             ))}
//           </motion.div>
//         </div>
//       </div>

//       {/* Antenna */}
//       <motion.div
//         className="absolute -top-4 left-1/2 -translate-x-1/2 w-1 h-6 bg-gradient-to-t from-[#156d95] to-[#22d3ee]"
//         animate={{ rotate: [-5, 5, -5] }}
//         transition={{ duration: 2, repeat: Infinity }}
//       >
//         <motion.div
//           className="absolute -top-1 -left-1 w-3 h-3 bg-[#22d3ee] rounded-full shadow-[0_0_10px_#22d3ee]"
//           animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
//           transition={{ duration: 1.5, repeat: Infinity }}
//         />
//       </motion.div>

//       {/* Side ears */}
//       <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-3 h-8 bg-[#156d95] rounded-l-lg" />
//       <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-3 h-8 bg-[#156d95] rounded-r-lg" />
//     </motion.div>
//   );
// };

// // Floating trading cards
// const FloatingCards = () => {
//   const cards = [
//     {
//       icon: TrendingUp,
//       label: "BUY",
//       value: "+127%",
//       color: "bg-green-500",
//       delay: 0,
//     },
//     {
//       icon: DollarSign,
//       label: "Profit",
//       value: "$2.4K",
//       color: "bg-[#156d95]",
//       delay: 0.5,
//     },
//     {
//       icon: Activity,
//       label: "Active",
//       value: "24/7",
//       color: "bg-purple-500",
//       delay: 1,
//     },
//   ];

//   return (
//     <>
//       {cards.map((card, idx) => (
//         <motion.div
//           key={idx}
//           className={`absolute ${
//             idx === 0
//               ? "-top-4 -right-4 sm:top-0 sm:-right-8"
//               : idx === 1
//                 ? "-bottom-4 -left-4 sm:bottom-0 sm:-left-8"
//                 : "top-1/2 -right-8 sm:-right-12"
//           }`}
//           initial={{ opacity: 0, scale: 0 }}
//           animate={{
//             opacity: 1,
//             scale: 1,
//             y: [0, -10, 0],
//           }}
//           transition={{
//             opacity: { delay: card.delay + 0.5, duration: 0.5 },
//             scale: { delay: card.delay + 0.5, duration: 0.5 },
//             y: {
//               delay: card.delay + 1,
//               duration: 3,
//               repeat: Infinity,
//               ease: "easeInOut",
//             },
//           }}
//         >
//           <div
//             className={`${card.color} text-white px-3 py-2 sm:px-4 sm:py-3 rounded-xl shadow-lg backdrop-blur-sm bg-opacity-90`}
//           >
//             <div className="flex items-center gap-2">
//               <card.icon size={14} className="sm:w-4 sm:h-4" />
//               <div>
//                 <div className="text-[10px] sm:text-xs opacity-80">
//                   {card.label}
//                 </div>
//                 <div className="text-sm sm:text-base font-bold">
//                   {card.value}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       ))}
//     </>
//   );
// };

// // Main Robot Trading Hero Component
// export const RobotTradingHero = () => {
//   return (
//     <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] flex items-center justify-center">
//       {/* Background glow effects */}
//       <div className="absolute inset-0 overflow-hidden">
//         <motion.div
//           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] bg-[#156d95]/20 rounded-full blur-3xl"
//           animate={{
//             scale: [1, 1.2, 1],
//             opacity: [0.3, 0.5, 0.3],
//           }}
//           transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
//         />
//         <motion.div
//           className="absolute top-1/4 right-1/4 w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] bg-[#22d3ee]/10 rounded-full blur-2xl"
//           animate={{
//             x: [0, 30, 0],
//             y: [0, -20, 0],
//           }}
//           transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
//         />
//       </div>

//       {/* Floating particles */}
//       <FloatingParticles />

//       {/* Main robot container */}
//       <div className="relative z-10">
//         {/* Orbit rings */}
//         <motion.div
//           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] md:w-[350px] md:h-[350px] border border-[#156d95]/20 rounded-full"
//           animate={{ rotate: 360 }}
//           transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//         />
//         <motion.div
//           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] sm:w-[340px] sm:h-[340px] md:w-[420px] md:h-[420px] border border-dashed border-[#156d95]/10 rounded-full"
//           animate={{ rotate: -360 }}
//           transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
//         />

//         {/* Robot body container */}
//         <motion.div
//           className="relative flex flex-col items-center"
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.8 }}
//         >
//           {/* Robot Head */}
//           <RobotHead />

//           {/* Robot Body */}
//           <motion.div
//             className="mt-2 w-20 h-24 sm:w-28 sm:h-32 md:w-32 md:h-36 bg-gradient-to-b from-[#111A4A] to-[#156d95] rounded-2xl shadow-xl relative overflow-hidden"
//             animate={{
//               scaleY: [1, 1.02, 1],
//             }}
//             transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
//           >
//             {/* Chest display */}
//             <div className="absolute inset-2 bg-[#0a0f2e] rounded-xl flex flex-col items-center justify-center gap-2">
//               <div className="flex items-center gap-1">
//                 <Zap size={12} className="text-yellow-400 sm:w-4 sm:h-4" />
//                 <span className="text-[10px] sm:text-xs text-white font-mono">
//                   AI ACTIVE
//                 </span>
//               </div>
//               <AnimatedChartBars />
//             </div>

//             {/* Glow effect */}
//             <motion.div
//               className="absolute inset-0 bg-gradient-to-t from-[#22d3ee]/20 to-transparent"
//               animate={{ opacity: [0.3, 0.6, 0.3] }}
//               transition={{ duration: 2, repeat: Infinity }}
//             />
//           </motion.div>

//           {/* Arms */}
//           <motion.div
//             className="absolute top-24 sm:top-32 -left-4 sm:-left-6 w-4 h-16 sm:w-5 sm:h-20 bg-[#156d95] rounded-full origin-top"
//             animate={{ rotate: [-10, 10, -10] }}
//             transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
//           />
//           <motion.div
//             className="absolute top-24 sm:top-32 -right-4 sm:-right-6 w-4 h-16 sm:w-5 sm:h-20 bg-[#156d95] rounded-full origin-top"
//             animate={{ rotate: [10, -10, 10] }}
//             transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
//           />

//           {/* Floating trading cards */}
//           <FloatingCards />
//         </motion.div>
//       </div>

//       {/* Bottom stats bar */}
//       <motion.div
//         className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex gap-4 sm:gap-8 px-4 sm:px-6 py-2 sm:py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20"
//         initial={{ y: 50, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 1, duration: 0.5 }}
//       >
//         {[
//           { label: "Win Rate", value: "78%", icon: TrendingUp },
//           { label: "Trades", value: "5K+", icon: Cpu },
//           { label: "Profit", value: "+127%", icon: DollarSign },
//         ].map((stat, idx) => (
//           <div key={idx} className="flex items-center gap-1 sm:gap-2">
//             <stat.icon size={14} className="text-[#22d3ee] sm:w-4 sm:h-4" />
//             <div>
//               <div className="text-[10px] sm:text-xs text-gray-400">
//                 {stat.label}
//               </div>
//               <div className="text-xs sm:text-sm font-bold text-white">
//                 {stat.value}
//               </div>
//             </div>
//           </div>
//         ))}
//       </motion.div>
//     </div>
//   );
// };

// export default RobotTradingHero;

"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  Cpu,
  Zap,
  CheckCircle2,
  ChevronRight,
  Shield,
} from "lucide-react";

// ==========================================
// SUB-COMPONENTS
// ==========================================

// Floating particles
const FloatingParticles = () => {
  const particles = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 2,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-[#156d95]/30"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Animated chart bars
const AnimatedChartBars = () => {
  const bars = [
    { height: 40, delay: 0, color: "#156d95" },
    { height: 70, delay: 0.2, color: "#22d3ee" },
    { height: 50, delay: 0.4, color: "#156d95" },
    { height: 90, delay: 0.6, color: "#10b981" },
    { height: 60, delay: 0.8, color: "#156d95" },
    { height: 80, delay: 1, color: "#22d3ee" },
    { height: 45, delay: 1.2, color: "#156d95" },
  ];

  return (
    <div className="flex items-end gap-1 h-16">
      {bars.map((bar, idx) => (
        <motion.div
          key={idx}
          className="w-2 rounded-t-sm"
          style={{ backgroundColor: bar.color }}
          initial={{ height: 0 }}
          animate={{ height: `${bar.height}%` }}
          transition={{
            duration: 0.8,
            delay: bar.delay,
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: 0.5,
          }}
        />
      ))}
    </div>
  );
};

// Robot head component
const RobotHead = () => {
  return (
    <motion.div
      className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40"
      animate={{
        rotateY: [0, 10, 0, -10, 0],
        rotateX: [0, 5, 0, -5, 0],
      }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Robot Face */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#111A4A] to-[#156d95] rounded-3xl shadow-2xl border-4 border-white/20">
        <div className="absolute inset-2 bg-[#0a0f2e] rounded-2xl overflow-hidden">
          {/* Animated eyes */}
          <div className="absolute top-1/3 left-1/4 w-3 h-3 sm:w-4 sm:h-4 bg-[#22d3ee] rounded-full shadow-[0_0_10px_#22d3ee]">
            <motion.div
              className="w-full h-full bg-white rounded-full"
              animate={{ scale: [1, 0.3, 1] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            />
          </div>
          <div className="absolute top-1/3 right-1/4 w-3 h-3 sm:w-4 sm:h-4 bg-[#22d3ee] rounded-full shadow-[0_0_10px_#22d3ee]">
            <motion.div
              className="w-full h-full bg-white rounded-full"
              animate={{ scale: [1, 0.3, 1] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2,
                delay: 0.1,
              }}
            />
          </div>

          {/* Mouth */}
          <motion.div
            className="absolute bottom-1/4 left-1/2 -translate-x-1/2 flex gap-1"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#22d3ee] rounded-full"
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Antenna */}
      <motion.div
        className="absolute -top-4 left-1/2 -translate-x-1/2 w-1 h-6 bg-gradient-to-t from-[#156d95] to-[#22d3ee]"
        animate={{ rotate: [-5, 5, -5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <motion.div
          className="absolute -top-1 -left-1 w-3 h-3 bg-[#22d3ee] rounded-full shadow-[0_0_10px_#22d3ee]"
          animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>

      {/* Side ears */}
      <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-3 h-8 bg-[#156d95] rounded-l-lg" />
      <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-3 h-8 bg-[#156d95] rounded-r-lg" />
    </motion.div>
  );
};

// Floating trading cards around robot
const FloatingCards = () => {
  const cards = [
    {
      icon: TrendingUp,
      label: "BUY",
      value: "+127%",
      color: "bg-green-500",
      delay: 0,
    },
    {
      icon: DollarSign,
      label: "Profit",
      value: "$2.4K",
      color: "bg-[#156d95]",
      delay: 0.5,
    },
    {
      icon: Activity,
      label: "Active",
      value: "24/7",
      color: "bg-purple-500",
      delay: 1,
    },
  ];

  return (
    <>
      {cards.map((card, idx) => (
        <motion.div
          key={idx}
          className={`absolute ${
            idx === 0
              ? "-top-4 -right-4 sm:top-0 sm:-right-8"
              : idx === 1
                ? "-bottom-4 -left-4 sm:bottom-0 sm:-left-8"
                : "top-1/2 -right-8 sm:-right-12"
          }`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -10, 0],
          }}
          transition={{
            opacity: { delay: card.delay + 0.5, duration: 0.5 },
            scale: { delay: card.delay + 0.5, duration: 0.5 },
            y: {
              delay: card.delay + 1,
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          <div
            className={`${card.color} text-white px-3 py-2 sm:px-4 sm:py-3 rounded-xl shadow-lg backdrop-blur-sm bg-opacity-90`}
          >
            <div className="flex items-center gap-2">
              <card.icon size={14} className="sm:w-4 sm:h-4" />
              <div>
                <div className="text-[10px] sm:text-xs opacity-80">
                  {card.label}
                </div>
                <div className="text-sm sm:text-base font-bold">
                  {card.value}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </>
  );
};

// Robot Animation Component
const RobotAnimation = () => {
  return (
    <div className="relative w-full h-[350px] sm:h-[450px] md:h-[500px] flex items-center justify-center">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] bg-[#156d95]/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <FloatingParticles />

      <div className="relative z-10">
        {/* Orbit rings */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] border border-[#156d95]/20 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] sm:w-[340px] sm:h-[340px] border border-dashed border-[#156d95]/10 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />

        {/* Robot Container */}
        <motion.div
          className="relative flex flex-col items-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <RobotHead />

          {/* Robot Body */}
          <motion.div
            className="mt-2 w-20 h-24 sm:w-28 sm:h-32 md:w-32 md:h-36 bg-gradient-to-b from-[#111A4A] to-[#156d95] rounded-2xl shadow-xl relative overflow-hidden"
            animate={{ scaleY: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="absolute inset-2 bg-[#0a0f2e] rounded-xl flex flex-col items-center justify-center gap-2">
              <div className="flex items-center gap-1">
                <Zap size={12} className="text-yellow-400 sm:w-4 sm:h-4" />
                <span className="text-[10px] sm:text-xs text-white font-mono">
                  AI ACTIVE
                </span>
              </div>
              <AnimatedChartBars />
            </div>
          </motion.div>

          {/* Arms */}
          <motion.div
            className="absolute top-24 sm:top-32 -left-4 sm:-left-6 w-4 h-16 sm:w-5 sm:h-20 bg-[#156d95] rounded-full origin-top"
            animate={{ rotate: [-10, 10, -10] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-24 sm:top-32 -right-4 sm:-right-6 w-4 h-16 sm:w-5 sm:h-20 bg-[#156d95] rounded-full origin-top"
            animate={{ rotate: [10, -10, 10] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          <FloatingCards />
        </motion.div>
      </div>

      {/* Bottom stats */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4 sm:gap-8 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        {[
          { label: "Win Rate", value: "78%", icon: TrendingUp },
          { label: "Trades", value: "5K+", icon: Cpu },
          { label: "Profit", value: "+127%", icon: DollarSign },
        ].map((stat, idx) => (
          <div key={idx} className="flex items-center gap-1 sm:gap-2">
            <stat.icon size={14} className="text-[#22d3ee] sm:w-4 sm:h-4" />
            <div>
              <div className="text-[10px] sm:text-xs text-gray-400">
                {stat.label}
              </div>
              <div className="text-xs sm:text-sm font-bold text-white">
                {stat.value}
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

// Pricing Card Component
const PricingCard = ({
  tier,
  price,
  originalPrice,
  features,
  recommended,
  delay,
}: any) => {
  const handleWhatsApp = () => {
    const message = `Halo, saya tertarik dengan paket ${tier} (Rp ${price}jt/bulan). Mohon informasi cara pembelian.`;
    const waUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -8 }}
      className={`relative rounded-2xl p-6 ${recommended ? "bg-[#111A4A] text-white" : "bg-white border border-gray-200"} shadow-xl overflow-hidden`}
    >
      {recommended && (
        <div className="absolute top-0 right-0 bg-[#156d95] text-white text-xs font-bold px-4 py-1 rounded-bl-lg">
          PALING POPULER
        </div>
      )}

      <div className="mb-4">
        <h3
          className={`text-lg font-bold mb-1 ${recommended ? "text-white" : "text-[#111A4A]"}`}
        >
          {tier}
        </h3>
        <p
          className={`text-xs ${recommended ? "text-gray-300" : "text-gray-500"}`}
        >
          Profit Sharing 20:80
        </p>
      </div>

      <div className="mb-6">
        <div className="flex items-baseline gap-2">
          <span
            className={`text-3xl font-bold ${recommended ? "text-white" : "text-[#111A4A]"}`}
          >
            Rp {price}jt
          </span>
          <span className="text-sm line-through text-gray-400">
            Rp {originalPrice}jt
          </span>
        </div>
        <span
          className={`text-xs ${recommended ? "text-gray-300" : "text-gray-500"}`}
        >
          /bulan
        </span>
      </div>

      <ul className="space-y-3 mb-6">
        {features.map((feature: string, idx: number) => (
          <li key={idx} className="flex items-center gap-2 text-sm">
            <CheckCircle2
              size={16}
              className={recommended ? "text-[#22d3ee]" : "text-[#156d95]"}
            />
            <span className={recommended ? "text-gray-200" : "text-gray-600"}>
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <button
        onClick={handleWhatsApp}
        className={`w-full py-3 rounded-lg font-medium text-sm transition-all ${
          recommended
            ? "bg-white text-[#111A4A] hover:bg-gray-100"
            : "bg-[#156d95] text-white hover:bg-[#111A4A]"
        }`}
      >
        Pesan via WhatsApp
      </button>
    </motion.div>
  );
};

// ==========================================
// MAIN COMPONENT
// ==========================================

export const RobotTradingSection = () => {
  const handleWhatsAppGeneral = () => {
    const message = `Halo, saya tertarik dengan Robot Trading. Mohon informasi lebih lanjut.`;
    const waUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank");
  };

  const pricingPlans = [
    {
      tier: "Starter",
      price: "5",
      originalPrice: "7",
      features: [
        "1 Robot Trading",
        "Backtest Report",
        "Support 24/7",
        "Risk Management Basic",
      ],
      recommended: false,
    },
    {
      tier: "Professional",
      price: "12",
      originalPrice: "18",
      features: [
        "3 Robot Trading",
        "Advanced Backtest",
        "Priority Support",
        "Risk Management Pro",
        "Monthly Report",
        "Custom Strategy",
      ],
      recommended: true,
    },
    {
      tier: "Enterprise",
      price: "25",
      originalPrice: "35",
      features: [
        "Unlimited Robot",
        "Full Backtest Access",
        "Dedicated Manager",
        "Custom Development",
        "API Access",
        "White Label Option",
      ],
      recommended: false,
    },
  ];

  return (
    <section className="w-full bg-gradient-to-b from-gray-50 to-white py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HERO AREA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16 sm:mb-20">
          {/* LEFT: TEXT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left order-2 lg:order-1"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#156d95]/10 rounded-full mb-4 sm:mb-6"
            >
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm text-[#156d95] font-medium">
                AI Trading Bot Active
              </span>
            </motion.div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#111A4A] leading-tight mb-4 sm:mb-6">
              Robot Trading <br />
              <span className="text-[#156d95]">Cerdas & Otomatis</span>
            </h1>

            <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-lg mx-auto lg:mx-0">
              Tingkatkan potensi trading Anda dengan AI-powered trading bots
              yang bekerja 24/7. Backtest terbukti, risk management otomatis,
              dan profit sharing yang transparan.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleWhatsAppGeneral}
                className="inline-flex items-center justify-center bg-[#156d95] text-white rounded-xl px-6 sm:px-8 py-3.5 sm:py-4 font-semibold transition-all hover:shadow-lg hover:shadow-[#156d95]/25 text-sm sm:text-base"
              >
                Mulai Sekarang <ArrowUpRight size={18} className="ml-2" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center bg-white text-[#111A4A] border-2 border-[#111A4A] rounded-xl px-6 sm:px-8 py-3.5 sm:py-4 font-semibold hover:bg-[#111A4A] hover:text-white transition-all text-sm sm:text-base"
              >
                Lihat Backtest
              </motion.button>
            </div>

            {/* Quick Stats */}
            <div className="flex gap-6 sm:gap-8 justify-center lg:justify-start">
              {[
                { value: "78%", label: "Win Rate" },
                { value: "5K+", label: "Trades" },
                { value: "+127%", label: "Profit" },
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-[#111A4A]">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: ROBOT ANIMATION */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="order-1 lg:order-2"
          >
            <RobotAnimation />
          </motion.div>
        </div>

        {/* DIVIDER */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-12 sm:mb-16"
        />

        {/* PRICING AREA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#111A4A] mb-3 sm:mb-4">
            Paket Berlangganan
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
            Pilih paket sesuai kebutuhan Anda. Semua paket dilengkapi dengan
            <span className="text-[#156d95] font-semibold">
              {" "}
              Profit Sharing 20:80
            </span>{" "}
            (Anda 80%, Kami 20%).
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {pricingPlans.map((plan, idx) => (
            <PricingCard key={idx} {...plan} delay={idx * 0.15} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 sm:mt-12 text-center"
        >
          <p className="text-xs sm:text-sm text-gray-500 flex items-center justify-center gap-2">
            <Shield size={14} className="text-green-600" />
            Garansi uang kembali 30 hari jika tidak puas dengan performa robot
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default RobotTradingSection;
