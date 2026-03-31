"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  Cpu,
  Zap,
} from "lucide-react";

// Floating particles component
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

// Robot head component with animated eyes
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
      {/* Robot Face Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#111A4A] to-[#156d95] rounded-3xl shadow-2xl border-4 border-white/20">
        {/* Screen/face area */}
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

          {/* Mouth/Speaker */}
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

// Floating trading cards
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

// Main Robot Trading Hero Component
export const RobotTradingHero = () => {
  return (
    <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] flex items-center justify-center">
      {/* Background glow effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] bg-[#156d95]/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/4 right-1/4 w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] bg-[#22d3ee]/10 rounded-full blur-2xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Floating particles */}
      <FloatingParticles />

      {/* Main robot container */}
      <div className="relative z-10">
        {/* Orbit rings */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] md:w-[350px] md:h-[350px] border border-[#156d95]/20 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] sm:w-[340px] sm:h-[340px] md:w-[420px] md:h-[420px] border border-dashed border-[#156d95]/10 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />

        {/* Robot body container */}
        <motion.div
          className="relative flex flex-col items-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Robot Head */}
          <RobotHead />

          {/* Robot Body */}
          <motion.div
            className="mt-2 w-20 h-24 sm:w-28 sm:h-32 md:w-32 md:h-36 bg-gradient-to-b from-[#111A4A] to-[#156d95] rounded-2xl shadow-xl relative overflow-hidden"
            animate={{
              scaleY: [1, 1.02, 1],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Chest display */}
            <div className="absolute inset-2 bg-[#0a0f2e] rounded-xl flex flex-col items-center justify-center gap-2">
              <div className="flex items-center gap-1">
                <Zap size={12} className="text-yellow-400 sm:w-4 sm:h-4" />
                <span className="text-[10px] sm:text-xs text-white font-mono">
                  AI ACTIVE
                </span>
              </div>
              <AnimatedChartBars />
            </div>

            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-[#22d3ee]/20 to-transparent"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
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

          {/* Floating trading cards */}
          <FloatingCards />
        </motion.div>
      </div>

      {/* Bottom stats bar */}
      <motion.div
        className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex gap-4 sm:gap-8 px-4 sm:px-6 py-2 sm:py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20"
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

export default RobotTradingHero;
