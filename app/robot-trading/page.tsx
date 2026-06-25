"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  Bot,
  TrendingUp,
  Activity,
  ChevronRight,
  BarChart3,
  LineChart as LineChartIcon,
  ShieldCheck,
  Zap,
  Settings,
  Download,
  AlertTriangle,
  PlayCircle
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// --- Data ---
const equityData = [
  { month: "Jan", equity: 10000 },
  { month: "Feb", equity: 11200 },
  { month: "Mar", equity: 11800 },
  { month: "Apr", equity: 13500 },
  { month: "May", equity: 14200 },
  { month: "Jun", equity: 16800 },
  { month: "Jul", equity: 18500 },
  { month: "Aug", equity: 21000 },
];

const usageSteps = [
  {
    icon: ShieldCheck,
    title: "1. Buka Akun Broker",
    description: "Daftar dan verifikasi akun di broker rekomendasi kami (Exness) yang sudah teruji kompatibel.",
  },
  {
    icon: Download,
    title: "2. Unduh & Install EA",
    description: "Dapatkan file robot FBL_AO_XAUUSD_M1.Ex5 dan panduan instalasi lengkap ke MetaTrader.",
  },
  {
    icon: Settings,
    title: "3. Konfigurasi Sistem",
    description: "Pilih mode portofolio (Konservatif / Moderat / Agresif) sesuai profil risiko Anda.",
  },
  {
    icon: Zap,
    title: "4. Auto-Trading Aktif",
    description: "Biarkan robot bekerja menganalisa pasar dan mengeksekusi trading secara otomatis.",
  },
];

const resumeData = [
  { year: "2026", month: "Januari", kon: 202256, mod: 204110, ag1: 326621, ag2: 6099036, maxDd: "6.85%", trades: 4134 },
  { year: "2026", month: "Februari", kon: 123522, mod: 36773, ag1: 179185, ag2: 8622153, maxDd: "4.17%", trades: 5749 },
  { year: "2026", month: "Maret", kon: 20877, mod: -3881, ag1: -4533, ag2: 1438072, maxDd: "3.33%", trades: 3197 },
  { year: "2026", month: "April", kon: 4525, mod: -4654, ag1: -7589, ag2: 58054, maxDd: "1.32%", trades: 2011 },
  { year: "2026", month: "Mei", kon: -1713, mod: -5256, ag1: -4973, ag2: 41879, maxDd: "1.71%", trades: 1542 },
  { year: "2025", month: "Desember", kon: 3166, mod: -249, ag1: 26258, ag2: 568405, maxDd: "2.60%", trades: 4500 },
];

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(val).replace("Rp", "");
};

// --- Components ---
const AnimatedCounter = ({ target, suffix = "", duration = 2, prefix = "" }: { target: number, suffix?: string, prefix?: string, duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const increment = target / (duration * 60);

          const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 1000 / 60);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [target, duration, hasAnimated]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
};

// --- Page Layout ---
export default function RobotTradingCenter() {
  const [mounted, setMounted] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleWhatsAppGeneral = () => {
    const message = `Halo, saya tertarik dengan EA FBL_AO_XAUUSD_M1. Mohon info detailnya.`;
    const waUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank");
  };

  if (!mounted) return <div className="min-h-screen bg-slate-50" />; 

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 overflow-hidden selection:bg-[#156d95] selection:text-white">
      
      {/* 1. HERO SECTION */}
      <section ref={heroRef} className="relative w-full min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden bg-white">
        {/* Animated Background Gradients */}
        <div className="absolute inset-0 z-0">
          <motion.div 
            style={{ y: yBg }} 
            className="absolute -top-[20%] -left-[10%] w-[50%] h-[70%] rounded-full bg-blue-100 opacity-60 blur-[100px]" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[20%] -right-[10%] w-[60%] h-[80%] rounded-full bg-cyan-100 opacity-50 blur-[120px]" 
          />
          {/* Subtle Grid */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Hero Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm w-fit">
              <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs font-bold text-[#156d95] uppercase tracking-wider">REGIME DEPENDENT EA</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-[#111A4A]">
              EA / Robot <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#156d95] to-cyan-500">Trading Center</span>
            </h1>
            
            <p className="text-lg text-slate-600 max-w-xl leading-relaxed">
              Maksimalkan potensi profit Anda dengan algoritma cerdas yang beradaptasi dengan market. 
              Tanpa emosi, presisi tinggi, dan strategi yang telah teruji melalui ribuan backtest.
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleWhatsAppGeneral}
                className="px-8 py-4 bg-[#111A4A] text-white rounded-xl font-semibold shadow-lg hover:bg-[#156d95] hover:shadow-xl transition-all flex items-center gap-2 group"
              >
                Mulai Gunakan EA
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <motion.a
                href="#backtest"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-white border border-slate-200 text-[#111A4A] rounded-xl font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
              >
                Lihat Performa
              </motion.a>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 mt-4 border-t border-slate-200">
              <div>
                <div className="text-3xl font-bold text-[#111A4A]"><AnimatedCounter target={272} suffix="%" /></div>
                <div className="text-sm text-slate-500 mt-1">Avg Monthly Return</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#111A4A]"><AnimatedCounter target={2} suffix="%" prefix="-" /></div>
                <div className="text-sm text-slate-500 mt-1">Worst Monthly</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-cyan-600"><AnimatedCounter target={6} suffix="" /></div>
                <div className="text-sm text-slate-500 mt-1">Max Cons. Loss</div>
              </div>
            </div>
          </motion.div>

          {/* Hero Visual Animation */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="relative w-full aspect-square md:aspect-auto md:h-[500px] flex items-center justify-center"
          >
            {/* Glass Container */}
            <div className="relative w-full max-w-md h-[400px] bg-white/80 border border-slate-200 rounded-3xl backdrop-blur-xl p-6 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col z-10">
              
              {/* Header inside glass */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-cyan-50 rounded-lg">
                    <Bot className="w-6 h-6 text-cyan-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#111A4A]">FBL_AO_XAUUSD</h3>
                    <p className="text-xs text-green-600 flex items-center gap-1 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> M1 Active
                    </p>
                  </div>
                </div>
                <Activity className="w-5 h-5 text-slate-400" />
              </div>

              {/* Animated Chart inside glass */}
              <div className="flex-1 relative w-full mt-4 bg-slate-50 rounded-xl overflow-hidden border border-slate-100">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="heroLineLight" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#156d95" />
                      <stop offset="50%" stopColor="#0ea5e9" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                    <linearGradient id="heroAreaLight" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="rgba(14,165,233,0.2)" />
                      <stop offset="100%" stopColor="rgba(14,165,233,0)" />
                    </linearGradient>
                  </defs>

                  {/* Grid Lines */}
                  {[1, 2, 3].map((i) => (
                    <line key={`h-${i}`} x1="0" y1={i * 50} x2="400" y2={i * 50} stroke="rgba(0,0,0,0.03)" strokeWidth="1" />
                  ))}
                  {[1, 2, 3, 4].map((i) => (
                    <line key={`v-${i}`} x1={i * 100} y1="0" x2={i * 100} y2="200" stroke="rgba(0,0,0,0.03)" strokeWidth="1" />
                  ))}

                  <motion.path
                    d="M0,150 Q40,160 80,120 T160,100 T240,60 T320,80 T400,20"
                    fill="none"
                    stroke="url(#heroLineLight)"
                    strokeWidth="4"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }}
                  />
                  
                  <motion.path
                    d="M0,150 Q40,160 80,120 T160,100 T240,60 T320,80 T400,20 L400,200 L0,200 Z"
                    fill="url(#heroAreaLight)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  />
                </svg>
              </div>

              {/* Fake Live Trades */}
              <div className="mt-6 flex flex-col gap-2">
                <div className="flex items-center justify-between p-3 rounded-lg bg-white border border-slate-100 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xs font-bold">B</div>
                    <div>
                      <p className="text-sm font-bold text-[#111A4A]">XAUUSD</p>
                      <p className="text-xs text-slate-500">Entry: 2345.50</p>
                    </div>
                  </div>
                  <p className="text-green-600 font-bold text-sm">+$125.00</p>
                </div>
              </div>

            </div>

            {/* Decorators behind glass */}
            <div className="absolute top-10 -right-4 w-24 h-24 bg-cyan-200 rounded-full blur-2xl opacity-60"></div>
            <div className="absolute bottom-10 -left-4 w-32 h-32 bg-blue-200 rounded-full blur-2xl opacity-60"></div>
          </motion.div>
        </div>
      </section>

      {/* 2. LANGKAH PENGGUNAAN ROBOT (VIDEO + TEKS) */}
      <section className="relative w-full py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold mb-4 text-[#111A4A]"
            >
              Langkah Penggunaan <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#156d95] to-cyan-500">Robot</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="text-slate-600 max-w-2xl mx-auto text-lg"
            >
              Mulai otomatisasi trading Anda hanya dalam 4 langkah mudah. Tonton panduan video di bawah ini.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left: Video Embed */}
            <motion.div
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="relative w-full rounded-3xl overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-slate-200 aspect-video bg-slate-900 flex items-center justify-center group"
            >
              <iframe 
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=placeholder" 
                title="Panduan EA FBL" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </motion.div>

            {/* Right: Text Steps */}
            <div className="flex flex-col gap-6">
              {usageSteps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-100 hover:border-cyan-200 hover:shadow-md transition-all group"
                >
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-cyan-50 flex items-center justify-center group-hover:scale-110 group-hover:bg-cyan-100 transition-all duration-300">
                    <step.icon className="w-6 h-6 text-[#156d95]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#111A4A] mb-1">{step.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* 3. EA PROFILE & DATA BACKTEST */}
      <section id="backtest" className="relative w-full py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-4 text-[#111A4A]"
            >
              Data Backtest & <span className="text-[#156d95]">Resume Performa</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="text-slate-600 max-w-2xl text-lg"
            >
              Transparansi penuh terhadap hasil pengujian dan simulasi yang ekstensif sejak 2021 hingga April 2026.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            
            {/* EA Profile Summary Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="xl:col-span-1 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col gap-4"
            >
              <div className="pb-4 border-b border-slate-100">
                <h3 className="text-xl font-bold text-[#111A4A] mb-1">EA Spesifikasi</h3>
                <p className="text-sm text-cyan-600 font-semibold bg-cyan-50 w-fit px-2 py-0.5 rounded">FBL_AO_XAUUSD_M1.Ex5</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-500 text-xs">Broker</p>
                  <p className="font-bold text-[#111A4A]">Exness</p>
                </div>
                <div>
                  <p className="text-slate-500 text-xs">Jenis Akun</p>
                  <p className="font-bold text-[#111A4A]">Cent (Real)</p>
                </div>
                <div>
                  <p className="text-slate-500 text-xs">Pairs</p>
                  <p className="font-bold text-[#111A4A]">XAUUSD</p>
                </div>
                <div>
                  <p className="text-slate-500 text-xs">Time Frame</p>
                  <p className="font-bold text-[#111A4A]">M1</p>
                </div>
                <div>
                  <p className="text-slate-500 text-xs">Ping / Delays</p>
                  <p className="font-bold text-[#111A4A]">50 Ms</p>
                </div>
                <div>
                  <p className="text-slate-500 text-xs">Return / Max DD</p>
                  <p className="font-bold text-[#111A4A]">2.07</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100 bg-slate-50 p-4 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  <p className="text-xs font-bold text-[#111A4A]">Risk Metrics</p>
                </div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-slate-600">Worst Monthly</span>
                  <span className="text-xs font-bold text-red-500">-2%</span>
                </div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-slate-600">Avg Monthly</span>
                  <span className="text-xs font-bold text-green-600">272%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-600">Max Cons. Loss</span>
                  <span className="text-xs font-bold text-[#111A4A]">6 Bulan</span>
                </div>
              </div>
            </motion.div>

            {/* Monthly Resume Table */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} delay={0.2}
              className="xl:col-span-3 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm overflow-hidden flex flex-col"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-[#111A4A]">Resume Return Bulanan</h3>
                  <p className="text-sm text-slate-500">Berdasarkan Total Pips/Profit per Mode Portofolio (100k Start Capital)</p>
                </div>
                <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold text-[#111A4A] hover:bg-slate-100 transition">
                  <Download className="w-4 h-4" /> Download CSV
                </button>
              </div>

              <div className="w-full overflow-x-auto pb-4 custom-scrollbar">
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-50 rounded-tl-xl">Periode</th>
                      <th className="py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-50">Konservatif</th>
                      <th className="py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-50">Moderat</th>
                      <th className="py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-50">Agresif 1</th>
                      <th className="py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-50">Agresif 2</th>
                      <th className="py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-50">Max DD</th>
                      <th className="py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-50 rounded-tr-xl">Total Trades</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resumeData.map((row, i) => (
                      <tr key={i} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                        <td className="py-4 px-4">
                          <p className="font-bold text-[#111A4A]">{row.month}</p>
                          <p className="text-xs text-slate-500">{row.year}</p>
                        </td>
                        <td className="py-4 px-4">
                          <p className={`font-semibold ${row.kon > 0 ? 'text-green-600' : 'text-red-500'}`}>
                            {row.kon > 0 ? '+' : ''}{row.kon}
                          </p>
                        </td>
                        <td className="py-4 px-4">
                          <p className={`font-semibold ${row.mod > 0 ? 'text-green-600' : 'text-red-500'}`}>
                            {row.mod > 0 ? '+' : ''}{row.mod}
                          </p>
                        </td>
                        <td className="py-4 px-4">
                          <p className={`font-semibold ${row.ag1 > 0 ? 'text-green-600' : 'text-red-500'}`}>
                            {row.ag1 > 0 ? '+' : ''}{row.ag1}
                          </p>
                        </td>
                        <td className="py-4 px-4">
                          <p className={`font-semibold ${row.ag2 > 0 ? 'text-green-600' : 'text-red-500'}`}>
                            {row.ag2 > 0 ? '+' : ''}{row.ag2}
                          </p>
                        </td>
                        <td className="py-4 px-4">
                          <p className="font-semibold text-amber-600">{row.maxDd}</p>
                        </td>
                        <td className="py-4 px-4">
                          <p className="font-semibold text-[#111A4A]">{row.trades}</p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4 p-4 bg-cyan-50/50 rounded-xl border border-cyan-100 flex items-start gap-3">
                <BarChart3 className="w-5 h-5 text-cyan-600 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-600">
                  Data di atas adalah ringkasan performa backtest per bulan untuk setiap mode portofolio. Nilai tertera menggambarkan jumlah poin/profit kotor dalam kondisi market pada periode tersebut.
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 relative overflow-hidden bg-[#111A4A]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#156d95]/40 to-[#111A4A] opacity-90 z-0"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white mb-6"
          >
            Siap untuk Mengotomatiskan Trading Anda?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-blue-100/80 mb-10 text-lg max-w-2xl mx-auto"
          >
            Pilih portofolio yang paling sesuai dengan gaya trading Anda, hubungkan akun Exness Anda, dan biarkan algoritma bekerja.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={handleWhatsAppGeneral}
            className="px-8 py-4 bg-white text-[#111A4A] rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all"
          >
            Konsultasi Setup EA Sekarang
          </motion.button>
        </div>
      </section>
      
      {/* Scrollbar styling for table */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}} />
    </div>
  );
}
