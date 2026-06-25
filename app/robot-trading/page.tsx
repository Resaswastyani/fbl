"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
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
  CheckCircle2,
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

// --- Dummy Data ---
const equityData = [
  { month: "Jan", equity: 10000, profit: 0 },
  { month: "Feb", equity: 11200, profit: 1200 },
  { month: "Mar", equity: 11800, profit: 600 },
  { month: "Apr", equity: 13500, profit: 1700 },
  { month: "May", equity: 14200, profit: 700 },
  { month: "Jun", equity: 16800, profit: 2600 },
  { month: "Jul", equity: 18500, profit: 1700 },
  { month: "Aug", equity: 21000, profit: 2500 },
];

const historyTrades = [
  { id: 1, date: "2024-03-28 14:30", pair: "XAU/USD", type: "BUY", lot: 0.1, profit: 125.5 },
  { id: 2, date: "2024-03-27 09:15", pair: "EUR/USD", type: "SELL", lot: 0.5, profit: 45.2 },
  { id: 3, date: "2024-03-26 16:45", pair: "GBP/JPY", type: "BUY", lot: 0.2, profit: -12.4 },
  { id: 4, date: "2024-03-25 11:20", pair: "USD/JPY", type: "BUY", lot: 0.3, profit: 89.0 },
  { id: 5, date: "2024-03-24 08:00", pair: "XAU/USD", type: "SELL", lot: 0.1, profit: 210.8 },
];

const usageSteps = [
  {
    icon: ShieldCheck,
    title: "1. Buka Akun Broker",
    description: "Daftar dan verifikasi akun di broker rekomendasi kami yang sudah teruji kompatibel dengan EA.",
  },
  {
    icon: Download,
    title: "2. Unduh & Install EA",
    description: "Dapatkan file robot (EA) dan panduan instalasi lengkap ke dalam platform MetaTrader Anda.",
  },
  {
    icon: Settings,
    title: "3. Konfigurasi Sistem",
    description: "Sesuaikan parameter risiko (lot size, stop loss) sesuai dengan profil risiko dan modal Anda.",
  },
  {
    icon: Zap,
    title: "4. Auto-Trading Aktif",
    description: "Biarkan robot bekerja 24/5 menganalisa pasar dan mengeksekusi trading secara otomatis.",
  },
];

// --- Components ---

const AnimatedCounter = ({ target, suffix = "", duration = 2 }: { target: number, suffix?: string, duration?: number }) => {
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
          const end = target;
          const increment = end / (duration * 60);

          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
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

  return <span ref={ref}>{count}{suffix}</span>;
};

// --- Page Layout ---
export default function RobotTradingCenter() {
  const [mounted, setMounted] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleWhatsAppGeneral = () => {
    const message = `Halo, saya tertarik dengan EA/Robot Trading Forex for Better Living. Mohon info detailnya.`;
    const waUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank");
  };

  if (!mounted) return <div className="min-h-screen bg-[#0A0F2C]" />; // Avoid hydration mismatch

  return (
    <div className="min-h-screen bg-[#0A0F2C] text-white overflow-hidden selection:bg-[#22d3ee] selection:text-[#0A0F2C]">
      
      {/* 1. HERO SECTION */}
      <section ref={heroRef} className="relative w-full min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden">
        {/* Animated Background Gradients */}
        <div className="absolute inset-0 z-0">
          <motion.div 
            style={{ y: yBg }} 
            className="absolute -top-[20%] -left-[10%] w-[50%] h-[70%] rounded-full bg-[#156d95] opacity-20 blur-[120px]" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[20%] -right-[10%] w-[60%] h-[80%] rounded-full bg-[#22d3ee] opacity-10 blur-[150px]" 
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Hero Content */}
          <motion.div 
            style={{ opacity: opacityHero }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md w-fit">
              <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs font-medium text-gray-300 uppercase tracking-wider">Sistem Trading Otomatis</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-[#22d3ee]">
              EA / Robot <br /> Trading Center
            </h1>
            
            <p className="text-lg text-gray-400 max-w-xl leading-relaxed">
              Maksimalkan potensi profit Anda dengan algoritma cerdas yang bekerja 24/5. 
              Tanpa emosi, presisi tinggi, dan strategi yang telah teruji melalui backtest bertahun-tahun.
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleWhatsAppGeneral}
                className="px-8 py-4 bg-gradient-to-r from-[#156d95] to-[#22d3ee] text-white rounded-xl font-semibold shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transition-all flex items-center gap-2 group"
              >
                Mulai Gunakan EA
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <motion.a
                href="#backtest"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-semibold hover:bg-white/10 transition-all backdrop-blur-md"
              >
                Lihat Performa
              </motion.a>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 mt-4 border-t border-white/10">
              <div>
                <div className="text-3xl font-bold text-white"><AnimatedCounter target={82} suffix="%" /></div>
                <div className="text-sm text-gray-400 mt-1">Win Rate Rata-rata</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white"><AnimatedCounter target={24} suffix="/5" /></div>
                <div className="text-sm text-gray-400 mt-1">Sistem Aktif</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#22d3ee]"><AnimatedCounter target={10} suffix="K+" /></div>
                <div className="text-sm text-gray-400 mt-1">Pips Terkumpul</div>
              </div>
            </div>
          </motion.div>

          {/* Hero Visual Animation */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="relative w-full aspect-square md:aspect-auto md:h-[500px] flex items-center justify-center"
          >
            {/* Glass Container */}
            <div className="relative w-full max-w-md h-[400px] bg-white/[0.02] border border-white/10 rounded-3xl backdrop-blur-xl p-6 shadow-2xl overflow-hidden flex flex-col">
              
              {/* Header inside glass */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#22d3ee]/20 rounded-lg">
                    <Bot className="w-6 h-6 text-[#22d3ee]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Alpha Engine</h3>
                    <p className="text-xs text-green-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span> Scanning Market
                    </p>
                  </div>
                </div>
                <Activity className="w-5 h-5 text-gray-400" />
              </div>

              {/* Animated Chart inside glass */}
              <div className="flex-1 relative w-full mt-4">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="heroLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#156d95" />
                      <stop offset="50%" stopColor="#22d3ee" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                    <linearGradient id="heroAreaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="rgba(34,211,238,0.3)" />
                      <stop offset="100%" stopColor="rgba(34,211,238,0)" />
                    </linearGradient>
                  </defs>

                  {/* Grid Lines */}
                  {[0, 1, 2, 3].map((i) => (
                    <line key={`h-${i}`} x1="0" y1={i * 50} x2="400" y2={i * 50} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                  ))}
                  {[0, 1, 2, 3, 4].map((i) => (
                    <line key={`v-${i}`} x1={i * 100} y1="0" x2={i * 100} y2="200" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                  ))}

                  <motion.path
                    d="M0,150 Q40,160 80,120 T160,100 T240,60 T320,80 T400,20"
                    fill="none"
                    stroke="url(#heroLineGradient)"
                    strokeWidth="4"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }}
                  />
                  
                  <motion.path
                    d="M0,150 Q40,160 80,120 T160,100 T240,60 T320,80 T400,20 L400,200 L0,200 Z"
                    fill="url(#heroAreaGradient)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  />

                  {/* Moving Scrubber */}
                  <motion.line 
                    x1="0" y1="0" x2="0" y2="200" 
                    stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="4 4"
                    animate={{ x: [0, 400, 0] }}
                    transition={{ duration: 5, ease: "linear", repeat: Infinity }}
                  />
                </svg>
              </div>

              {/* Fake Live Trades */}
              <div className="mt-6 flex flex-col gap-2">
                <AnimatePresence>
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 text-xs font-bold">B</div>
                      <div>
                        <p className="text-sm font-semibold text-white">XAU/USD</p>
                        <p className="text-xs text-gray-400">Entry: 2345.50</p>
                      </div>
                    </div>
                    <p className="text-green-400 font-semibold text-sm">+$125.00</p>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>

            {/* Floating Orbs behind glass */}
            <motion.div 
              animate={{ y: [-10, 10, -10], x: [-10, 10, -10] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 -right-10 w-24 h-24 bg-[#22d3ee] rounded-full blur-2xl opacity-40 -z-10"
            />
            <motion.div 
              animate={{ y: [10, -10, 10], x: [10, -10, 10] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-10 -left-10 w-32 h-32 bg-[#3b82f6] rounded-full blur-2xl opacity-30 -z-10"
            />
          </motion.div>
        </div>
      </section>

      {/* 2. LANGKAH PENGGUNAAN ROBOT */}
      <section className="relative w-full py-24 bg-[#060a1f] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold mb-4"
            >
              Langkah Penggunaan <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22d3ee] to-[#3b82f6]">Robot</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="text-gray-400 max-w-2xl mx-auto text-lg"
            >
              Mulai otomatisasi trading Anda hanya dalam 4 langkah mudah. Tidak perlu keahlian programming.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Connecting Line (Desktop only) */}
            <div className="hidden lg:block absolute top-[60px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-transparent via-[#22d3ee]/30 to-transparent z-0"></div>

            {usageSteps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative z-10 flex flex-col items-center text-center p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all group"
              >
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#156d95]/20 to-[#3b82f6]/20 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-all duration-300">
                  <step.icon className="w-10 h-10 text-[#22d3ee]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. DATA BACKTEST & HISTORY TRADE */}
      <section id="backtest" className="relative w-full py-24 bg-[#0A0F2C]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Data Backtest & <span className="text-[#22d3ee]">History</span></h2>
              <p className="text-gray-400 max-w-xl text-lg">
                Transparansi adalah kunci. Pantau pertumbuhan ekuitas dan jejak rekam trading secara real-time.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="flex gap-4"
            >
              <button className="px-5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors flex items-center gap-2 text-sm">
                <LineChartIcon className="w-4 h-4" /> Full Report
              </button>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Chart Section (Takes up 2 columns on lg) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="lg:col-span-2 bg-[#060a1f] border border-white/5 rounded-3xl p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-bold text-white">Pertumbuhan Ekuitas</h3>
                  <p className="text-sm text-gray-400">YTD Performance (2024)</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-400">+110%</div>
                  <p className="text-xs text-gray-500">Total Return</p>
                </div>
              </div>
              
              <div className="w-full h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={equityData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorEquity" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis 
                      dataKey="month" 
                      stroke="rgba(255,255,255,0.3)" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                      dy={10}
                    />
                    <YAxis 
                      stroke="rgba(255,255,255,0.3)" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                      tickFormatter={(value) => `$${value/1000}k`}
                      dx={-10}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0A0F2C', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                      itemStyle={{ color: '#22d3ee' }}
                      formatter={(value: number) => [`$${value.toLocaleString()}`, 'Equity']}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="equity" 
                      stroke="#22d3ee" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorEquity)" 
                      activeDot={{ r: 6, fill: '#fff', stroke: '#22d3ee', strokeWidth: 2 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* History Table Section (Takes up 1 column on lg) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} delay={0.2}
              className="bg-[#060a1f] border border-white/5 rounded-3xl p-6 shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Live Trades</h3>
                <span className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> Active
                </span>
              </div>

              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-3">
                {historyTrades.map((trade) => (
                  <div key={trade.id} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${trade.type === 'BUY' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                          {trade.type}
                        </span>
                        <span className="font-bold text-white text-sm">{trade.pair}</span>
                      </div>
                      <div className="text-xs text-gray-500">{trade.date} • {trade.lot} Lot</div>
                    </div>
                    <div className="text-right">
                      <div className={`font-bold ${trade.profit > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {trade.profit > 0 ? '+' : ''}${Math.abs(trade.profit).toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-colors border border-white/5">
                Lihat Semua History
              </button>
            </motion.div>

          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#156d95] to-[#0A0F2C] opacity-50 z-0"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white mb-6"
          >
            Siap untuk Mengotomatiskan Profit Anda?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-blue-100 mb-10 text-lg"
          >
            Bergabunglah dengan trader lain yang sudah menggunakan teknologi EA kami.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={handleWhatsAppGeneral}
            className="px-8 py-4 bg-white text-[#0A0F2C] rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all"
          >
            Konsultasi Sekarang
          </motion.button>
        </div>
      </section>
      
      {/* Basic style for custom scrollbar in the history table */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}} />
    </div>
  );
}
