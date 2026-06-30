"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
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
  AlertTriangle,
  PlayCircle,
  Check,
  Crown,
  Star,
  ChevronDown,
  ChevronUp,
  CreditCard
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

const pricingPackages = [
  {
    id: "basic",
    name: "Starter",
    price: "Rp 1.500.000",
    period: "/ bulan",
    description: "Cocok untuk trader pemula yang ingin mencoba performa EA FBL.",
    features: [
      "Lisensi 1 Akun MT5",
      "Mode Konservatif & Moderat",
      "Support Telegram 24/7",
      "Free Update Minor",
      "Maksimal Balance $5,000"
    ],
    isPopular: false,
    icon: Star,
    color: "from-blue-400 to-blue-600",
    shadow: "shadow-blue-200"
  },
  {
    id: "pro",
    name: "Professional",
    price: "Rp 7.500.000",
    period: "/ 6 bulan",
    description: "Pilihan terpopuler dengan fitur lengkap untuk hasil optimal.",
    features: [
      "Lisensi 2 Akun MT5",
      "Semua Mode (Termasuk Agresif)",
      "Prioritas Support 24/7",
      "Free Update Mayor & Minor",
      "Setup VPS Gratis",
      "Tanpa Batas Balance"
    ],
    isPopular: true,
    icon: Crown,
    color: "from-[#156d95] to-cyan-500",
    shadow: "shadow-cyan-200"
  },
  {
    id: "lifetime",
    name: "Lifetime VVIP",
    price: "Rp 15.000.000",
    period: "sekali bayar",
    description: "Akses seumur hidup tanpa biaya langganan bulanan.",
    features: [
      "Lisensi Unlimited Akun MT5 (Nama Sama)",
      "Semua Mode Premium",
      "Konsultasi Private 1-on-1",
      "Free Update Selamanya",
      "Gratis VPS Premium 1 Tahun",
      "Tanpa Batas Balance"
    ],
    isPopular: false,
    icon: Zap,
    color: "from-amber-400 to-orange-500",
    shadow: "shadow-orange-200"
  }
];

const backtestData = [
  // 2025
  { year: "2025", month: "Jan", week: "5-11", profit: -281, pct: "-0.28%", peak: 100000, maxDd: 281, maxDdPct: "0.28%", trades: 84 },
  { year: "2025", month: "Jan", week: "13-18", profit: -209, pct: "-0.21%", peak: 100034, maxDd: 209, maxDdPct: "0.21%", trades: 68 },
  { year: "2025", month: "Jan", week: "20-25", profit: -183, pct: "-0.18%", peak: 100000, maxDd: 183, maxDdPct: "0.18%", trades: 97 },
  { year: "2025", month: "Jan", week: "27-31", profit: -281, pct: "-0.28%", peak: 100000, maxDd: 281, maxDdPct: "0.28%", trades: 87 },
  { year: "2025", month: "Feb", week: "3-8", profit: -1197, pct: "-1.20%", peak: 100031, maxDd: 1430, maxDdPct: "1.43%", trades: 114 },
  { year: "2025", month: "Feb", week: "10-15", profit: 5810, pct: "5.81%", peak: 106826, maxDd: 0, maxDdPct: "0.00%", trades: 82 },
  { year: "2025", month: "Feb", week: "17-22", profit: 77, pct: "0.08%", peak: 100509, maxDd: 184, maxDdPct: "0.18%", trades: 76 },
  { year: "2025", month: "Feb", week: "24-28", profit: -100, pct: "-0.10%", peak: 100070, maxDd: 452, maxDdPct: "0.45%", trades: 124 },
  { year: "2025", month: "Mar", week: "3-8", profit: -352, pct: "-0.35%", peak: 100000, maxDd: 452, maxDdPct: "0.45%", trades: 72 },
  { year: "2025", month: "Mar", week: "10-15", profit: -349, pct: "-0.35%", peak: 100000, maxDd: 449, maxDdPct: "0.45%", trades: 124 },
  { year: "2025", month: "Mar", week: "17-22", profit: 1953, pct: "1.95%", peak: 101953, maxDd: 0, maxDdPct: "0.00%", trades: 65 },
  { year: "2025", month: "Mar", week: "24-29", profit: -118, pct: "-0.12%", peak: 100000, maxDd: 169, maxDdPct: "0.17%", trades: 84 },
  { year: "2025", month: "Apr", week: "1-5", profit: -533, pct: "-0.53%", peak: 100160, maxDd: 841, maxDdPct: "0.84%", trades: 152 },
  { year: "2025", month: "Apr", week: "7-12", profit: -1515, pct: "-1.52%", peak: 100000, maxDd: 1711, maxDdPct: "1.71%", trades: 288 },
  { year: "2025", month: "Apr", week: "14-19", profit: -302, pct: "-0.30%", peak: 100011, maxDd: 1000, maxDdPct: "1.00%", trades: 164 },
  { year: "2025", month: "Apr", week: "21-26", profit: 1600, pct: "1.60%", peak: 103995, maxDd: 1378, maxDdPct: "1.38%", trades: 240 },
  { year: "2025", month: "Apr", week: "28-30", profit: -312, pct: "-0.31%", peak: 100890, maxDd: 355, maxDdPct: "0.36%", trades: 152 },
  { year: "2025", month: "Mei", week: "1-3", profit: 9587, pct: "9.59%", peak: 109690, maxDd: 0, maxDdPct: "0.00%", trades: 198 },
  { year: "2025", month: "Mei", week: "5-10", profit: 13174, pct: "13.17%", peak: 122325, maxDd: 167, maxDdPct: "0.17%", trades: 172 },
  { year: "2025", month: "Mei", week: "12-17", profit: -726, pct: "-0.73%", peak: 101227, maxDd: 1017, maxDdPct: "1.02%", trades: 161 },
  { year: "2025", month: "Mei", week: "19-24", profit: -498, pct: "-0.50%", peak: 100040, maxDd: 628, maxDdPct: "0.63%", trades: 151 },
  { year: "2025", month: "Mei", week: "26-31", profit: -170, pct: "-0.17%", peak: 100074, maxDd: 340, maxDdPct: "0.34%", trades: 101 },
  { year: "2025", month: "Jun", week: "2-7", profit: 2675, pct: "2.68%", peak: 103000, maxDd: 353, maxDdPct: "0.35%", trades: 104 },
  { year: "2025", month: "Jun", week: "9-14", profit: -177, pct: "-0.18%", peak: 100036, maxDd: 841, maxDdPct: "0.84%", trades: 163 },
  { year: "2025", month: "Jun", week: "16-21", profit: 4383, pct: "4.38%", peak: 105893, maxDd: 202, maxDdPct: "0.20%", trades: 138 },
  { year: "2025", month: "Jun", week: "23-28", profit: 1724, pct: "1.72%", peak: 101666, maxDd: 213, maxDdPct: "0.21%", trades: 108 },
  { year: "2025", month: "Jul", week: "29-5", profit: -251, pct: "-0.25%", peak: 100752, maxDd: 251, maxDdPct: "0.25%", trades: 118 },
  { year: "2025", month: "Jul", week: "6-12", profit: -393, pct: "-0.39%", peak: 100000, maxDd: 396, maxDdPct: "0.40%", trades: 86 },
  { year: "2025", month: "Jul", week: "13-19", profit: -1468, pct: "-1.47%", peak: 100034, maxDd: 1468, maxDdPct: "1.47%", trades: 67 },
  { year: "2025", month: "Jul", week: "20-26", profit: -247, pct: "-0.25%", peak: 100000, maxDd: 876, maxDdPct: "0.88%", trades: 114 },
  { year: "2025", month: "Jul", week: "27-2", profit: -729, pct: "-0.73%", peak: 100735, maxDd: 1028, maxDdPct: "1.03%", trades: 96 },
  { year: "2025", month: "Aug", week: "3-9", profit: -202, pct: "-0.20%", peak: 100062, maxDd: 163, maxDdPct: "0.16%", trades: 64 },
  { year: "2025", month: "Aug", week: "10-16", profit: 4458, pct: "4.46%", peak: 104976, maxDd: 176, maxDdPct: "0.18%", trades: 72 },
  { year: "2025", month: "Aug", week: "17-23", profit: -276, pct: "-0.28%", peak: 100000, maxDd: 276, maxDdPct: "0.28%", trades: 67 },
  { year: "2025", month: "Aug", week: "24-30", profit: 2597, pct: "2.60%", peak: 102597, maxDd: 0, maxDdPct: "0.00%", trades: 103 },
  { year: "2025", month: "Sep", week: "31-6", profit: 7312, pct: "7.31%", peak: 108847, maxDd: 0, maxDdPct: "0.00%", trades: 163 },
  { year: "2025", month: "Sep", week: "7-13", profit: -135, pct: "-0.13%", peak: 101411, maxDd: 169, maxDdPct: "0.17%", trades: 95 },
  { year: "2025", month: "Sep", week: "14-20", profit: 2959, pct: "2.96%", peak: 105070, maxDd: 275, maxDdPct: "0.28%", trades: 81 },
  { year: "2025", month: "Sep", week: "21-27", profit: -123, pct: "-0.12%", peak: 100451, maxDd: 719, maxDdPct: "0.72%", trades: 107 },
  { year: "2025", month: "Sep", week: "28-4", profit: -144, pct: "-0.14%", peak: 101751, maxDd: 648, maxDdPct: "0.65%", trades: 134 },
  { year: "2025", month: "Okt", week: "5-11", profit: 14157, pct: "14.16%", peak: 116597, maxDd: 316, maxDdPct: "0.32%", trades: 175 },
  { year: "2025", month: "Okt", week: "12-18", profit: 125203, pct: "125.20%", peak: 231534, maxDd: 353, maxDdPct: "0.35%", trades: 371 },
  { year: "2025", month: "Okt", week: "19-25", profit: 315334, pct: "315.33%", peak: 423043, maxDd: 209, maxDdPct: "0.21%", trades: 377 },
  { year: "2025", month: "Okt", week: "26-1", profit: 67359, pct: "67.36%", peak: 168951, maxDd: 289, maxDdPct: "0.29%", trades: 223 },
  { year: "2025", month: "Nov", week: "2-8", profit: 3029, pct: "3.03%", peak: 104373, maxDd: 954, maxDdPct: "0.95%", trades: 102 },
  { year: "2025", month: "Nov", week: "9-15", profit: -511, pct: "-0.51%", peak: 101410, maxDd: 1148, maxDdPct: "1.15%", trades: 241 },
  { year: "2025", month: "Nov", week: "16-22", profit: -463, pct: "-0.46%", peak: 102377, maxDd: 1448, maxDdPct: "1.45%", trades: 135 },
  { year: "2025", month: "Nov", week: "26-29", profit: -153, pct: "-0.15%", peak: 100000, maxDd: 585, maxDdPct: "0.58%", trades: 187 },
  { year: "2025", month: "Des", week: "30-6", profit: -426, pct: "-0.43%", peak: 101073, maxDd: 1565, maxDdPct: "1.57%", trades: 101 },
  { year: "2025", month: "Des", week: "7-13", profit: -10, pct: "-0.01%", peak: 103070, maxDd: 48, maxDdPct: "0.05%", trades: 183 },
  { year: "2025", month: "Des", week: "14-20", profit: -1158, pct: "-1.16%", peak: 100158, maxDd: 1158, maxDdPct: "1.16%", trades: 103 },
  { year: "2025", month: "Des", week: "21-27", profit: -997, pct: "-1.00%", peak: 100189, maxDd: 1309, maxDdPct: "1.31%", trades: 210 },

  // 2026
  { year: "2026", month: "Jan", week: "5-10", profit: -251, pct: "-0.25%", peak: 104696, maxDd: 707, maxDdPct: "0.71%", trades: 167 },
  { year: "2026", month: "Jan", week: "12-17", profit: 17623, pct: "17.62%", peak: 117037, maxDd: 390, maxDdPct: "0.39%", trades: 125 },
  { year: "2026", month: "Jan", week: "19-24", profit: 45488, pct: "45.49%", peak: 147602, maxDd: 156, maxDdPct: "0.16%", trades: 337 },
  { year: "2026", month: "Jan", week: "26-31", profit: 6036038, pct: "6036.04%", peak: 6049443, maxDd: 0, maxDdPct: "0.00%", trades: 913 },
  { year: "2026", month: "Feb", week: "2-7", profit: 8437838, pct: "8437.84%", peak: 8672134, maxDd: 0, maxDdPct: "0.00%", trades: 690 },
  { year: "2026", month: "Feb", week: "9-14", profit: 184971, pct: "184.97%", peak: 286018, maxDd: 277, maxDdPct: "0.28%", trades: 241 },
  { year: "2026", month: "Feb", week: "16-21", profit: 28015, pct: "28.01%", peak: 131155, maxDd: 1576, maxDdPct: "1.58%", trades: 267 },
  { year: "2026", month: "Feb", week: "23-28", profit: -443, pct: "-0.44%", peak: 106408, maxDd: 655, maxDdPct: "0.66%", trades: 188 },
  { year: "2026", month: "Mar", week: "2-7", profit: 40398, pct: "40.40%", peak: 150692, maxDd: 20, maxDdPct: "0.02%", trades: 423 },
  { year: "2026", month: "Mar", week: "9-14", profit: -176, pct: "-0.18%", peak: 100037, maxDd: 889, maxDdPct: "0.89%", trades: 229 },
  { year: "2026", month: "Mar", week: "16-21", profit: 279634, pct: "279.63%", peak: 378592, maxDd: 568, maxDdPct: "0.57%", trades: 567 },
  { year: "2026", month: "Mar", week: "23-28", profit: 1030224, pct: "1030.22%", peak: 1133472, maxDd: 633, maxDdPct: "0.63%", trades: 504 },
  { year: "2026", month: "Mar", week: "30-4", profit: 87492, pct: "87.49%", peak: 186168, maxDd: 504, maxDdPct: "0.50%", trades: 382 },
  { year: "2026", month: "Apr", week: "6-11", profit: 43260, pct: "43.26%", peak: 145438, maxDd: 0, maxDdPct: "0.00%", trades: 257 },
  { year: "2026", month: "Apr", week: "13-18", profit: -950, pct: "-0.95%", peak: 100053, maxDd: 981, maxDdPct: "0.98%", trades: 246 },
  { year: "2026", month: "Apr", week: "20-25", profit: 15822, pct: "15.82%", peak: 117741, maxDd: 333, maxDdPct: "0.33%", trades: 176 },
  { year: "2026", month: "Apr", week: "27-2", profit: 4222, pct: "4.22%", peak: 105053, maxDd: 1120, maxDdPct: "1.12%", trades: 220 },
  { year: "2026", month: "Mei", week: "4-9", profit: -853, pct: "-0.85%", peak: 103178, maxDd: 1707, maxDdPct: "1.71%", trades: 262 },
  { year: "2026", month: "Mei", week: "11-16", profit: -1012, pct: "-1.01%", peak: 102529, maxDd: 1274, maxDdPct: "1.27%", trades: 56 },
  { year: "2026", month: "Mei", week: "18-23", profit: 29319, pct: "29.32%", peak: 135588, maxDd: 517, maxDdPct: "0.52%", trades: 229 },
  { year: "2026", month: "Mei", week: "25-30", profit: 14427, pct: "14.43%", peak: 117031, maxDd: 916, maxDdPct: "0.92%", trades: 235 },
  { year: "2026", month: "Jun", week: "1-6", profit: 7427, pct: "7.43%", peak: 109425, maxDd: 538, maxDdPct: "0.54%", trades: 0 },
  { year: "2026", month: "Jun", week: "8-13", profit: 18654, pct: "18.65%", peak: 124092, maxDd: 880, maxDdPct: "0.88%", trades: 0 },
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
  const [showPricing, setShowPricing] = useState(false);
  const [backtestView, setBacktestView] = useState<"mingguan" | "bulanan">("mingguan");
  
  const heroRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  
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

  const handleRobotClick = () => {
    setShowPricing(true);
    setTimeout(() => {
      pricingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const monthlyData = useMemo(() => {
    const grouped = backtestData.reduce((acc, curr) => {
      const key = `${curr.year}-${curr.month}`;
      if (!acc[key]) {
        acc[key] = {
          year: curr.year,
          month: curr.month,
          profit: 0,
          peak: 0,
          trades: 0,
          maxDd: 0
        };
      }
      acc[key].profit += curr.profit;
      acc[key].peak = Math.max(acc[key].peak, curr.peak);
      acc[key].trades += curr.trades;
      acc[key].maxDd = Math.max(acc[key].maxDd, curr.maxDd);
      return acc;
    }, {} as Record<string, any>);

    return Object.values(grouped).map(item => ({
      ...item,
      pct: ((item.profit / 100000) * 100).toFixed(2) + "%",
      maxDdPct: ((item.maxDd / 100000) * 100).toFixed(2) + "%"
    }));
  }, []);

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
            className="relative w-full aspect-square md:aspect-auto md:h-[500px] flex items-center justify-center cursor-pointer group"
            onClick={handleRobotClick}
          >
            {/* Glass Container */}
            <div className="relative w-full max-w-md h-[400px] bg-white/80 border border-slate-200 rounded-3xl backdrop-blur-xl p-6 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] group-hover:shadow-[0_30px_60px_-15px_rgba(21,109,149,0.3)] transition-all duration-500 overflow-hidden flex flex-col z-10 transform group-hover:-translate-y-2">

              {/* Click Me Badge */}
              <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-bounce flex items-center gap-1 z-20">
                <CreditCard className="w-3 h-3" />
                Klik untuk Harga
              </div>

              {/* Header inside glass */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-cyan-50 rounded-lg group-hover:bg-[#156d95] transition-colors duration-500">
                    <Bot className="w-6 h-6 text-cyan-600 group-hover:text-white transition-colors duration-500" />
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
            <div className="absolute top-10 -right-4 w-24 h-24 bg-cyan-200 rounded-full blur-2xl opacity-60 group-hover:scale-150 transition-transform duration-700"></div>
            <div className="absolute bottom-10 -left-4 w-32 h-32 bg-blue-200 rounded-full blur-2xl opacity-60 group-hover:scale-150 transition-transform duration-700"></div>
          </motion.div>
        </div>
      </section>

      {/* PRICING SECTION (Animated/Conditional) */}
      <AnimatePresence>
        {showPricing && (
          <motion.section 
            ref={pricingRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-full bg-gradient-to-b from-white to-slate-50 py-20 border-b border-slate-200 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-6 md:px-12">
              <div className="text-center mb-16">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                  className="text-3xl md:text-5xl font-bold mb-4 text-[#111A4A]"
                >
                  Pilih <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#156d95] to-cyan-500">Paket Investasi</span> Anda
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                  className="text-slate-600 max-w-2xl mx-auto text-lg"
                >
                  Dapatkan akses penuh ke algoritma trading canggih kami dengan harga yang terjangkau. Mulai otomatisasi profit Anda hari ini.
                </motion.p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                {pricingPackages.map((pkg, idx) => (
                  <motion.div
                    key={pkg.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + (idx * 0.1), duration: 0.5 }}
                    className={`relative flex flex-col bg-white rounded-3xl p-8 border ${pkg.isPopular ? 'border-cyan-400 shadow-2xl scale-105 z-10' : 'border-slate-200 shadow-lg'} hover:shadow-2xl transition-all duration-300 group`}
                  >
                    {pkg.isPopular && (
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-[#156d95] to-cyan-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg flex items-center gap-1">
                        <Crown className="w-4 h-4" /> Most Popular
                      </div>
                    )}
                    
                    <div className="mb-6">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${pkg.color} flex items-center justify-center text-white mb-6 ${pkg.shadow} shadow-lg`}>
                        <pkg.icon className="w-7 h-7" />
                      </div>
                      <h3 className="text-2xl font-bold text-[#111A4A] mb-2">{pkg.name}</h3>
                      <p className="text-slate-500 text-sm h-10">{pkg.description}</p>
                    </div>

                    <div className="mb-8">
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-extrabold text-[#111A4A]">{pkg.price}</span>
                      </div>
                      <span className="text-slate-500 font-medium">{pkg.period}</span>
                    </div>

                    <ul className="flex-1 flex flex-col gap-4 mb-8">
                      {pkg.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="shrink-0 w-5 h-5 rounded-full bg-cyan-50 flex items-center justify-center mt-0.5">
                            <Check className="w-3 h-3 text-[#156d95]" />
                          </div>
                          <span className="text-slate-600 text-sm font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={handleWhatsAppGeneral}
                      className={`w-full py-4 rounded-xl font-bold transition-all duration-300 ${pkg.isPopular ? 'bg-gradient-to-r from-[#111A4A] to-[#156d95] text-white shadow-xl hover:shadow-2xl hover:scale-[1.02]' : 'bg-slate-50 text-[#111A4A] border border-slate-200 hover:bg-slate-100 hover:border-slate-300'}`}
                    >
                      Pilih Paket {pkg.name}
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* 2. LANGKAH PENGGUNAAN ROBOT */}
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
              Transparansi penuh terhadap hasil pengujian dan simulasi yang ekstensif (Jan 2025 - April 2026). Initial Balance $100,000 (Mode Agresif 2).
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
                  <p className="font-bold text-[#111A4A]">Cent</p>
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
                  <p className="text-slate-500 text-xs">Tick</p>
                  <p className="font-bold text-[#111A4A]">Every Tick</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100 bg-slate-50 p-4 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="w-4 h-4 text-[#156d95]" />
                  <p className="text-xs font-bold text-[#111A4A]">Statistik Total</p>
                </div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-slate-600">Total Profit (2025-2026)</span>
                  <span className="text-xs font-bold text-green-600">+16.8M USD</span>
                </div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-slate-600">History Quality</span>
                  <span className="text-xs font-bold text-[#111A4A]">100%</span>
                </div>
              </div>
            </motion.div>

            {/* Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} delay={0.2}
              className="xl:col-span-3 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm overflow-hidden flex flex-col"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                <div>
                  <h3 className="text-xl font-bold text-[#111A4A]">History Trade Lengkap</h3>
                  <p className="text-sm text-slate-500">Mode Agresif 2 | Start Capital $100k</p>
                </div>
                <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
                  <button 
                    onClick={() => setBacktestView("mingguan")}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${backtestView === 'mingguan' ? 'bg-white text-[#111A4A] shadow' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    Per Minggu
                  </button>
                  <button 
                    onClick={() => setBacktestView("bulanan")}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${backtestView === 'bulanan' ? 'bg-white text-[#111A4A] shadow' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    Per Bulan
                  </button>
                </div>
              </div>

              <div className="w-full overflow-x-auto pb-4 custom-scrollbar max-h-[500px]">
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead className="sticky top-0 z-10 bg-white">
                    <tr className="border-b border-slate-200">
                      <th className="py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-50 rounded-tl-xl">Periode</th>
                      <th className="py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-50">Nett Profit</th>
                      <th className="py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-50">Peak Balance</th>
                      <th className="py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-50">Max DD</th>
                      <th className="py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-50 rounded-tr-xl">Total Trades</th>
                    </tr>
                  </thead>
                  <tbody>
                    {backtestView === 'mingguan' ? 
                      backtestData.map((row, i) => (
                        <tr key={i} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                          <td className="py-4 px-4">
                            <p className="font-bold text-[#111A4A]">{row.week} {row.month}</p>
                            <p className="text-xs text-slate-500">{row.year}</p>
                          </td>
                          <td className="py-4 px-4">
                            <p className={`font-semibold ${row.profit > 0 ? 'text-green-600' : 'text-red-500'}`}>
                              {row.profit > 0 ? '+' : ''}{row.profit.toLocaleString('id-ID')}
                            </p>
                            <p className={`text-xs ${row.profit > 0 ? 'text-green-500' : 'text-red-400'}`}>
                              {row.pct}
                            </p>
                          </td>
                          <td className="py-4 px-4">
                            <p className="font-semibold text-[#111A4A]">{row.peak.toLocaleString('id-ID')}</p>
                          </td>
                          <td className="py-4 px-4">
                            <p className="font-semibold text-amber-600">{row.maxDd.toLocaleString('id-ID')}</p>
                            <p className="text-xs text-amber-500">{row.maxDdPct}</p>
                          </td>
                          <td className="py-4 px-4">
                            <p className="font-semibold text-[#111A4A]">{row.trades > 0 ? row.trades.toLocaleString('id-ID') : '-'}</p>
                          </td>
                        </tr>
                      ))
                    : 
                      monthlyData.map((row, i) => (
                        <tr key={i} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors bg-cyan-50/10">
                          <td className="py-4 px-4">
                            <p className="font-bold text-[#111A4A]">{row.month} {row.year}</p>
                            <p className="text-xs text-slate-500">Agregasi Bulanan</p>
                          </td>
                          <td className="py-4 px-4">
                            <p className={`font-bold ${row.profit > 0 ? 'text-green-600' : 'text-red-500'}`}>
                              {row.profit > 0 ? '+' : ''}{row.profit.toLocaleString('id-ID')}
                            </p>
                            <p className={`text-xs font-semibold ${row.profit > 0 ? 'text-green-500' : 'text-red-400'}`}>
                              {row.pct}
                            </p>
                          </td>
                          <td className="py-4 px-4">
                            <p className="font-semibold text-[#111A4A]">{row.peak.toLocaleString('id-ID')}</p>
                          </td>
                          <td className="py-4 px-4">
                            <p className="font-semibold text-amber-600">{row.maxDd.toLocaleString('id-ID')}</p>
                            <p className="text-xs text-amber-500">{row.maxDdPct}</p>
                          </td>
                          <td className="py-4 px-4">
                            <p className="font-semibold text-[#111A4A]">{row.trades > 0 ? row.trades.toLocaleString('id-ID') : '-'}</p>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>

              <div className="mt-4 p-4 bg-cyan-50/50 rounded-xl border border-cyan-100 flex items-start gap-3">
                <BarChart3 className="w-5 h-5 text-cyan-600 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-600">
                  Data di atas adalah ringkasan performa backtest per minggu dan bulan. Nilai tertera menggambarkan jumlah poin/profit kotor dalam kondisi market pada periode tersebut.
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
      <style dangerouslySetInnerHTML={{
        __html: `
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
