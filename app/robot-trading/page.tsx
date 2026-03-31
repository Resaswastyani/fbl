// "use client";

// import { motion, useScroll, useTransform } from "framer-motion";
// import {
//   ArrowUpRight,
//   TrendingUp,
//   Bot,
//   Shield,
//   Zap,
//   BarChart3,
//   Clock,
//   Target,
//   ChevronRight,
//   CheckCircle2,
//   Activity,
//   LineChart,
//   Wallet
// } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { useRef, useState, useEffect } from "react";

// // Animated counter component dengan error handling
// const AnimatedCounter = ({ target, suffix = "", duration = 2 }: { target: number; suffix?: string; duration?: number }) => {
//   const [count, setCount] = useState(0);
//   const [hasAnimated, setHasAnimated] = useState(false);
//   const ref = useRef<HTMLSpanElement>(null);

//   useEffect(() => {
//     if (!ref.current || hasAnimated) return;

//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting && !hasAnimated) {
//           setHasAnimated(true);
//           let start = 0;
//           const end = target;
//           const increment = end / (duration * 60);

//           const timer = setInterval(() => {
//             start += increment;
//             if (start >= end) {
//               setCount(end);
//               clearInterval(timer);
//             } else {
//               setCount(Math.floor(start));
//             }
//           }, 1000 / 60);

//           return () => clearInterval(timer);
//         }
//       },
//       { threshold: 0.1 }
//     );

//     observer.observe(ref.current);
//     return () => observer.disconnect();
//   }, [target, duration, hasAnimated]);

//   return (
//     <span ref={ref} className="font-bold">
//       {count}{suffix}
//     </span>
//   );
// };

// // Animated trading chart component
// const TradingChart = () => {
//   return (
//     <div className="relative w-full h-64 bg-gradient-to-br from-[#111A4A] to-[#1e2a5e] rounded-2xl overflow-hidden shadow-2xl">
//       {/* Grid background */}
//       <div className="absolute inset-0 opacity-20">
//         <div className="w-full h-full" style={{
//           backgroundImage: 'linear-gradient(rgba(21,109,149,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(21,109,149,0.3) 1px, transparent 1px)',
//           backgroundSize: '20px 20px'
//         }} />
//       </div>

//       {/* Animated line chart */}
//       <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
//         <defs>
//           <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
//             <stop offset="0%" stopColor="#156d95" />
//             <stop offset="50%" stopColor="#22d3ee" />
//             <stop offset="100%" stopColor="#156d95" />
//           </linearGradient>
//           <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
//             <stop offset="0%" stopColor="rgba(21,109,149,0.4)" />
//             <stop offset="100%" stopColor="rgba(21,109,149,0)" />
//           </linearGradient>
//         </defs>

//         <motion.path
//           d="M0,150 Q50,140 100,100 T200,80 T300,40 T400,20"
//           fill="none"
//           stroke="url(#lineGradient)"
//           strokeWidth="3"
//           initial={{ pathLength: 0 }}
//           animate={{ pathLength: 1 }}
//           transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }}
//         />

//         <motion.path
//           d="M0,150 Q50,140 100,100 T200,80 T300,40 T400,20 L400,200 L0,200 Z"
//           fill="url(#areaGradient)"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 1, delay: 2 }}
//         />

//         {/* Animated dots */}
//         {[100, 200, 300, 400].map((x, i) => (
//           <motion.circle
//             key={i}
//             cx={x}
//             cy={[100, 80, 40, 20][i]}
//             r="4"
//             fill="#22d3ee"
//             initial={{ scale: 0 }}
//             animate={{ scale: [0, 1.5, 1] }}
//             transition={{ duration: 0.5, delay: 0.5 + i * 0.3, repeat: Infinity, repeatDelay: 2 }}
//           />
//         ))}
//       </svg>

//       {/* Floating stats */}
//       <motion.div
//         className="absolute top-4 right-4 bg-white/10 backdrop-blur-md rounded-lg px-3 py-2"
//         initial={{ opacity: 0, x: 20 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ delay: 1 }}
//       >
//         <div className="flex items-center gap-2">
//           <TrendingUp size={16} className="text-green-400" />
//           <span className="text-green-400 text-sm font-bold">+127.5%</span>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// // Robot Card Component
// const RobotCard = ({ name, description, winRate, profit, trades, icon: Icon, delay }: any) => {
//   const handleWhatsApp = () => {
//     const message = `Halo, saya tertarik dengan robot trading ${name}. Mohon informasi lebih lanjut.`;
//     const waUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;
//     window.open(waUrl, '_blank');
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 30 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.6, delay }}
//       whileHover={{ y: -8, transition: { duration: 0.3 } }}
//       className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl transition-all group"
//     >
//       <div className="flex items-start justify-between mb-4">
//         <div className="w-14 h-14 bg-gradient-to-br from-[#156d95] to-[#111A4A] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
//           <Icon size={28} className="text-white" />
//         </div>
//         <motion.div
//           className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold"
//           animate={{ scale: [1, 1.05, 1] }}
//           transition={{ duration: 2, repeat: Infinity }}
//         >
//           <Activity size={12} />
//           Aktif
//         </motion.div>
//       </div>

//       <h3 className="text-xl font-bold text-[#111A4A] mb-2" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
//         {name}
//       </h3>
//       <p className="text-[#6e6e6e] text-sm mb-4 leading-relaxed">{description}</p>

//       <div className="grid grid-cols-3 gap-3 mb-4">
//         <div className="text-center p-2 bg-gray-50 rounded-lg">
//           <div className="text-lg font-bold text-[#156d95]">{winRate}%</div>
//           <div className="text-xs text-gray-500">Win Rate</div>
//         </div>
//         <div className="text-center p-2 bg-gray-50 rounded-lg">
//           <div className="text-lg font-bold text-green-600">{profit}%</div>
//           <div className="text-xs text-gray-500">Profit</div>
//         </div>
//         <div className="text-center p-2 bg-gray-50 rounded-lg">
//           <div className="text-lg font-bold text-[#111A4A]">{trades}</div>
//           <div className="text-xs text-gray-500">Trades</div>
//         </div>
//       </div>

//       <button
//         onClick={handleWhatsApp}
//         className="w-full py-2.5 bg-[#111A4A] text-white rounded-lg text-sm font-medium hover:bg-[#156d95] transition-colors flex items-center justify-center gap-2 group-hover:gap-3"
//       >
//         Pesan via WhatsApp <ChevronRight size={16} />
//       </button>
//     </motion.div>
//   );
// };

// // Pricing Card Component
// const PricingCard = ({ tier, price, originalPrice, features, recommended, delay }: any) => {
//   const handleWhatsApp = () => {
//     const message = `Halo, saya tertarik dengan paket ${tier} (Rp ${price}jt/bulan). Mohon informasi cara pembelian.`;
//     const waUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;
//     window.open(waUrl, '_blank');
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.9 }}
//       whileInView={{ opacity: 1, scale: 1 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.5, delay }}
//       whileHover={{ scale: 1.03 }}
//       className={`relative rounded-2xl p-6 ${recommended ? 'bg-[#111A4A] text-white' : 'bg-white border border-gray-200'} shadow-xl overflow-hidden`}
//     >
//       {recommended && (
//         <motion.div
//           className="absolute top-0 right-0 bg-[#156d95] text-white text-xs font-bold px-4 py-1 rounded-bl-lg"
//           animate={{ opacity: [1, 0.7, 1] }}
//           transition={{ duration: 2, repeat: Infinity }}
//         >
//           PALING POPULER
//         </motion.div>
//       )}

//       <div className="mb-4">
//         <h3 className={`text-lg font-bold mb-1 ${recommended ? 'text-white' : 'text-[#111A4A]'}`} style={{ fontFamily: "var(--font-figtree), Figtree" }}>
//           {tier}
//         </h3>
//         <p className={`text-xs ${recommended ? 'text-gray-300' : 'text-gray-500'}`}>Profit Sharing 20:80</p>
//       </div>

//       <div className="mb-6">
//         <div className="flex items-baseline gap-2">
//           <span className={`text-3xl font-bold ${recommended ? 'text-white' : 'text-[#111A4A]'}`}>
//             Rp {price}jt
//           </span>
//           <span className={`text-sm line-through ${recommended ? 'text-gray-400' : 'text-gray-400'}`}>
//             Rp {originalPrice}jt
//           </span>
//         </div>
//         <span className={`text-xs ${recommended ? 'text-gray-300' : 'text-gray-500'}`}>/bulan</span>
//       </div>

//       <ul className="space-y-3 mb-6">
//         {features.map((feature: string, idx: number) => (
//           <motion.li
//             key={idx}
//             initial={{ opacity: 0, x: -10 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ delay: delay + idx * 0.1 }}
//             className="flex items-center gap-2 text-sm"
//           >
//             <CheckCircle2 size={16} className={recommended ? 'text-[#22d3ee]' : 'text-[#156d95]'} />
//             <span className={recommended ? 'text-gray-200' : 'text-gray-600'}>{feature}</span>
//           </motion.li>
//         ))}
//       </ul>

//       <motion.button
//         onClick={handleWhatsApp}
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         className={`w-full py-3 rounded-lg font-medium text-sm transition-all ${
//           recommended
//             ? 'bg-white text-[#111A4A] hover:bg-gray-100'
//             : 'bg-[#156d95] text-white hover:bg-[#111A4A]'
//         }`}
//       >
//         Pesan via WhatsApp
//       </motion.button>
//     </motion.div>
//   );
// };

// // Backtest Table Row
// const BacktestRow = ({ date, pair, type, entry, exit, profit, delay }: any) => {
//   const isProfit = profit > 0;

//   return (
//     <motion.tr
//       initial={{ opacity: 0, x: -20 }}
//       whileInView={{ opacity: 1, x: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.4, delay }}
//       className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
//     >
//       <td className="py-3 px-4 text-sm text-gray-600">{date}</td>
//       <td className="py-3 px-4">
//         <span className="font-bold text-[#111A4A]">{pair}</span>
//       </td>
//       <td className="py-3 px-4">
//         <span className={`px-2 py-1 rounded-full text-xs font-medium ${type === 'BUY' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
//           {type}
//         </span>
//       </td>
//       <td className="py-3 px-4 text-sm text-gray-600">{entry}</td>
//       <td className="py-3 px-4 text-sm text-gray-600">{exit}</td>
//       <td className="py-3 px-4">
//         <span className={`font-bold ${isProfit ? 'text-green-600' : 'text-red-600'}`}>
//           {isProfit ? '+' : ''}{profit} pips
//         </span>
//       </td>
//     </motion.tr>
//   );
// };

// // Main Component
// export const RobotTradingPage = () => {
//   const router = useRouter();
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   const { scrollYProgress } = useScroll({ target: containerRef });
//   const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

//   const robots = [
//     {
//       name: "Alpha Scalper X",
//       description: "Robot trading khusus untuk scalping dengan analisis teknikal real-time dan eksekusi cepat di pasar volatile.",
//       winRate: 78,
//       profit: 15.2,
//       trades: 1247,
//       icon: Zap
//     },
//     {
//       name: "Trend Master Pro",
//       description: "Mengikuti tren pasar mayor dengan algoritma machine learning untuk identifikasi tren jangka panjang.",
//       winRate: 82,
//       profit: 23.8,
//       trades: 856,
//       icon: TrendingUp
//     },
//     {
//       name: "Grid Guardian",
//       description: "Strategi grid trading otomatis yang bekerja 24/7 untuk mengumpulkan profit dari fluktuasi harga.",
//       winRate: 71,
//       profit: 12.5,
//       trades: 2156,
//       icon: Bot
//     }
//   ];

//   const backtestData = [
//     { date: "2024-03-28", pair: "EUR/USD", type: "BUY", entry: "1.0821", exit: "1.0845", profit: 24 },
//     { date: "2024-03-27", pair: "GBP/USD", type: "SELL", entry: "1.2654", exit: "1.2621", profit: 33 },
//     { date: "2024-03-26", pair: "USD/JPY", type: "BUY", entry: "151.42", exit: "151.89", profit: 47 },
//     { date: "2024-03-25", pair: "XAU/USD", type: "BUY", entry: "2178.5", exit: "2192.3", profit: 138 },
//     { date: "2024-03-24", pair: "EUR/USD", type: "SELL", entry: "1.0865", exit: "1.0832", profit: 33 },
//   ];

//   const pricingPlans = [
//     {
//       tier: "Starter",
//       price: "5",
//       originalPrice: "7",
//       features: ["1 Robot Trading", "Backtest Report", "Support 24/7", "Risk Management Basic"],
//       recommended: false
//     },
//     {
//       tier: "Professional",
//       price: "12",
//       originalPrice: "18",
//       features: ["3 Robot Trading", "Advanced Backtest", "Priority Support", "Risk Management Pro", "Monthly Report", "Custom Strategy"],
//       recommended: true
//     },
//     {
//       tier: "Enterprise",
//       price: "25",
//       originalPrice: "35",
//       features: ["Unlimited Robot", "Full Backtest Access", "Dedicated Manager", "Custom Development", "API Access", "White Label Option"],
//       recommended: false
//     }
//   ];

//   const handleWhatsAppGeneral = () => {
//     const message = `Halo, saya tertarik dengan Robot Trading Forex for Better Living. Mohon informasi lebih lanjut.`;
//     const waUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;
//     window.open(waUrl, '_blank');
//   };

//   // Prevent hydration mismatch
//   if (!mounted) {
//     return (
//       <div className="w-full bg-white min-h-screen flex items-center justify-center">
//         <div className="animate-pulse text-[#156d95]">Loading...</div>
//       </div>
//     );
//   }

//   return (
//     <div ref={containerRef} className="w-full bg-white min-h-screen overflow-hidden">
//       {/* HERO SECTION */}
//       <section className="w-full pt-24 md:pt-32 pb-16 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
//         {/* Animated background elements */}
//         <motion.div
//           className="absolute top-20 left-10 w-72 h-72 bg-[#156d95]/5 rounded-full blur-3xl"
//           animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
//           transition={{ duration: 8, repeat: Infinity }}
//         />
//         <motion.div
//           className="absolute bottom-20 right-10 w-96 h-96 bg-[#111A4A]/5 rounded-full blur-3xl"
//           animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
//           transition={{ duration: 10, repeat: Infinity }}
//         />

//         <div className="max-w-7xl mx-auto grid grid-cols-12 gap-5 lg:gap-16 px-8 md:px-12 relative z-10">
//           {/* LEFT TEXT */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="col-span-12 lg:col-span-6 flex flex-col justify-center text-left"
//           >
//             <motion.a
//               href="#"
//               className="flex items-center gap-1 text-[#6e6e6e] mb-4 cursor-pointer w-fit"
//               whileHover={{ x: 5 }}
//             >
//               <span className="text-xs uppercase tracking-tight font-mono flex items-center gap-1 hover:text-[#202020]">
//                 Lihat performa robot <ArrowUpRight size={14} strokeWidth={1.5} />
//               </span>
//             </motion.a>

//             <h1
//               className="text-[40px] md:text-[50px] font-medium leading-tight tracking-tight text-[#111A4A] mb-6"
//               style={{ fontFamily: "var(--font-figtree), Figtree" }}
//             >
//               Robot Trading <br />
//               <span className="text-[#156d95]">Cerdas & Otomatis</span>
//             </h1>

//             <p
//               className="text-lg leading-7 text-[#111A4A] opacity-70 mt-0 mb-8 max-w-lg"
//               style={{ fontFamily: "var(--font-figtree), Figtree" }}
//             >
//               Tingkatkan potensi trading Anda dengan AI-powered trading bots yang bekerja 24/7.
//               Backtest terbukti, risk management otomatis, dan profit sharing yang transparan.
//             </p>

//             <div className="flex flex-wrap gap-4 mb-8">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={handleWhatsAppGeneral}
//                 className="inline-flex items-center justify-center bg-[#156d95] text-white rounded-lg px-6 py-3.5 text-sm sm:text-base font-medium transition-all hover:shadow-lg hover:shadow-[#156d95]/25"
//               >
//                 Mulai Sekarang <ArrowUpRight size={18} className="ml-1" />
//               </motion.button>

//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => router.push("#backtest")}
//                 className="inline-flex items-center justify-center bg-white text-[#111A4A] border-2 border-[#111A4A] rounded-lg px-6 py-3.5 text-sm sm:text-base font-medium hover:bg-[#111A4A] hover:text-white transition-all"
//               >
//                 Lihat Backtest
//               </motion.button>
//             </div>

//             {/* Stats */}
//             <div className="flex gap-8">
//               <div>
//                 <div className="text-2xl font-bold text-[#111A4A]">
//                   <AnimatedCounter target={127} suffix="%" />
//                 </div>
//                 <div className="text-xs text-gray-500">Profit Tertinggi</div>
//               </div>
//               <div>
//                 <div className="text-2xl font-bold text-[#111A4A]">
//                   <AnimatedCounter target={78} suffix="%" />
//                 </div>
//                 <div className="text-xs text-gray-500">Win Rate Rata-rata</div>
//               </div>
//               <div>
//                 <div className="text-2xl font-bold text-[#111A4A]">
//                   <AnimatedCounter target={5000} suffix="+" />
//                 </div>
//                 <div className="text-xs text-gray-500">Trades Sukses</div>
//               </div>
//             </div>
//           </motion.div>

//           {/* RIGHT ANIMATION */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             className="col-span-12 lg:col-span-6 flex items-center justify-center mt-6 md:mt-0"
//           >
//             <div className="relative w-full max-w-[520px]">
//               <TradingChart />

//               {/* Floating cards */}
//               <motion.div
//                 className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-xl border border-gray-100"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 1.5 }}
//                 whileHover={{ scale: 1.05 }}
//               >
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
//                     <Bot size={20} className="text-green-600" />
//                   </div>
//                   <div>
//                     <div className="text-sm font-bold text-[#111A4A]">Alpha Scalper</div>
//                     <div className="text-xs text-green-600">+24 pips profit</div>
//                   </div>
//                 </div>
//               </motion.div>

//               <motion.div
//                 className="absolute -top-4 -right-4 bg-white rounded-xl p-3 shadow-xl border border-gray-100"
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 2 }}
//                 whileHover={{ scale: 1.05 }}
//               >
//                 <div className="flex items-center gap-2">
//                   <div className="w-8 h-8 bg-[#156d95]/10 rounded-full flex items-center justify-center">
//                     <Clock size={16} className="text-[#156d95]" />
//                   </div>
//                   <div className="text-xs">
//                     <div className="font-bold text-[#111A4A]">24/7 Active</div>
//                     <div className="text-gray-500">Auto Trading</div>
//                   </div>
//                 </div>
//               </motion.div>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* ROBOT LIST SECTION */}
//       <section className="w-full py-20 bg-white">
//         <div className="max-w-7xl mx-auto px-8 md:px-12">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-center mb-12"
//           >
//             <h2 className="text-3xl md:text-4xl font-bold text-[#111A4A] mb-4" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
//               Pilihan Robot Trading
//             </h2>
//             <p className="text-gray-600 max-w-2xl mx-auto">
//               Setiap robot dirancang dengan strategi berbeda untuk berbagai kondisi pasar.
//               Pilih yang sesuai dengan gaya trading Anda.
//             </p>
//           </motion.div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {robots.map((robot, idx) => (
//               <RobotCard key={idx} {...robot} delay={idx * 0.1} />
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* BACKTEST SECTION */}
//       <section id="backtest" className="w-full py-20 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-8 md:px-12">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="grid grid-cols-12 gap-8 items-center mb-12"
//           >
//             <div className="col-span-12 lg:col-span-6">
//               <h2 className="text-3xl md:text-4xl font-bold text-[#111A4A] mb-4" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
//                 Data Backtest & History
//               </h2>
//               <p className="text-gray-600">
//                 Transparansi penuh dengan data backtest yang dapat diverifikasi.
//                 Semua performa robot tercatat dan dapat Anda audit kapan saja.
//               </p>
//             </div>
//             <div className="col-span-12 lg:col-span-6 flex justify-start lg:justify-end gap-4">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:border-[#156d95] hover:text-[#156d95] transition-colors"
//               >
//                 <BarChart3 size={16} />
//                 Export CSV
//               </motion.button>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="flex items-center gap-2 px-4 py-2 bg-[#156d95] text-white rounded-lg text-sm font-medium hover:bg-[#111A4A] transition-colors"
//               >
//                 <LineChart size={16} />
//                 Full Report
//               </motion.button>
//             </div>
//           </motion.div>

//           {/* Backtest Table */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="bg-white rounded-2xl shadow-lg overflow-hidden"
//           >
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-[#111A4A] text-white">
//                   <tr>
//                     <th className="py-4 px-4 text-left text-xs font-semibold uppercase tracking-wider">Tanggal</th>
//                     <th className="py-4 px-4 text-left text-xs font-semibold uppercase tracking-wider">Pair</th>
//                     <th className="py-4 px-4 text-left text-xs font-semibold uppercase tracking-wider">Type</th>
//                     <th className="py-4 px-4 text-left text-xs font-semibold uppercase tracking-wider">Entry</th>
//                     <th className="py-4 px-4 text-left text-xs font-semibold uppercase tracking-wider">Exit</th>
//                     <th className="py-4 px-4 text-left text-xs font-semibold uppercase tracking-wider">Profit/Loss</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {backtestData.map((data, idx) => (
//                     <BacktestRow key={idx} {...data} delay={idx * 0.1} />
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             <div className="p-4 border-t border-gray-100 flex justify-center">
//               <motion.button
//                 whileHover={{ scale: 1.02 }}
//                 className="text-[#156d95] text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all"
//               >
//                 Lihat Semua History <ChevronRight size={16} />
//               </motion.button>
//             </div>
//           </motion.div>

//           {/* Performance Stats */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
//             {[
//               { label: "Total Profit", value: "+1,247 pips", icon: TrendingUp, color: "text-green-600" },
//               { label: "Win Rate", value: "78.5%", icon: Target, color: "text-[#156d95]" },
//               { label: "Max Drawdown", value: "-5.2%", icon: Shield, color: "text-orange-600" },
//               { label: "Profit Factor", value: "2.34", icon: Wallet, color: "text-[#111A4A]" }
//             ].map((stat, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 whileInView={{ opacity: 1, scale: 1 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: idx * 0.1 }}
//                 whileHover={{ y: -5 }}
//                 className="bg-white rounded-xl p-4 shadow-md text-center"
//               >
//                 <stat.icon size={24} className={`mx-auto mb-2 ${stat.color}`} />
//                 <div className="text-xl font-bold text-[#111A4A]">{stat.value}</div>
//                 <div className="text-xs text-gray-500">{stat.label}</div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* PRICING SECTION */}
//       <section className="w-full py-20 bg-white">
//         <div className="max-w-7xl mx-auto px-8 md:px-12">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-center mb-12"
//           >
//             <h2 className="text-3xl md:text-4xl font-bold text-[#111A4A] mb-4" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
//               Paket Berlangganan
//             </h2>
//             <p className="text-gray-600 max-w-2xl mx-auto">
//               Pilih paket sesuai kebutuhan Anda. Semua paket dilengkapi dengan
//               <span className="text-[#156d95] font-semibold"> Profit Sharing 20:80</span> (Anda 80%, Kami 20%).
//             </p>
//           </motion.div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
//             {pricingPlans.map((plan, idx) => (
//               <PricingCard key={idx} {...plan} delay={idx * 0.15} />
//             ))}
//           </div>

//           <motion.div
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             viewport={{ once: true }}
//             className="mt-12 text-center"
//           >
//             <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
//               <Shield size={16} className="text-green-600" />
//               Garansi uang kembali 30 hari jika tidak puas dengan performa robot
//             </p>
//           </motion.div>
//         </div>
//       </section>

//       {/* CTA SECTION */}
//       <section className="w-full py-20 bg-[#111A4A] relative overflow-hidden">
//         <motion.div
//           className="absolute inset-0 opacity-10"
//           style={{
//             backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
//             backgroundSize: '40px 40px'
//           }}
//         />

//         <div className="max-w-4xl mx-auto px-8 md:px-12 text-center relative z-10">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//           >
//             <h2 className="text-3xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
//               Siap Meningkatkan Trading Anda?
//             </h2>
//             <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
//               Bergabung dengan ribuan trader yang sudah mempercayakan trading mereka kepada robot kami.
//               Mulai perjalanan profit Anda hari ini.
//             </p>

//             <motion.button
//               whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(21,109,149,0.3)" }}
//               whileTap={{ scale: 0.95 }}
//               onClick={handleWhatsAppGeneral}
//               className="bg-[#156d95] text-white rounded-xl px-8 py-4 text-lg font-medium inline-flex items-center gap-2 hover:bg-[#1a8bc2] transition-colors"
//             >
//               Daftar Sekarang <ArrowUpRight size={20} />
//             </motion.button>
//           </motion.div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default RobotTradingPage;
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  TrendingUp,
  Bot,
  Shield,
  Zap,
  BarChart3,
  Clock,
  Target,
  ChevronRight,
  CheckCircle2,
  Activity,
  LineChart,
  Wallet,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";

// Animated counter component dengan error handling
const AnimatedCounter = ({
  target,
  suffix = "",
  duration = 2,
}: {
  target: number;
  suffix?: string;
  duration?: number;
}) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current || hasAnimated) return;

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
      { threshold: 0.1 },
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration, hasAnimated]);

  return (
    <span ref={ref} className="font-bold">
      {count}
      {suffix}
    </span>
  );
};

// Animated trading chart component
const TradingChart = () => {
  return (
    <div className="relative w-full h-64 bg-gradient-to-br from-[#111A4A] to-[#1e2a5e] rounded-2xl overflow-hidden shadow-2xl">
      {/* Grid background */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(21,109,149,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(21,109,149,0.3) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
      </div>

      {/* Animated line chart */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 400 200"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#156d95" />
            <stop offset="50%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#156d95" />
          </linearGradient>
          <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(21,109,149,0.4)" />
            <stop offset="100%" stopColor="rgba(21,109,149,0)" />
          </linearGradient>
        </defs>

        <motion.path
          d="M0,150 Q50,140 100,100 T200,80 T300,40 T400,20"
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 3,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 1,
          }}
        />

        <motion.path
          d="M0,150 Q50,140 100,100 T200,80 T300,40 T400,20 L400,200 L0,200 Z"
          fill="url(#areaGradient)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
        />

        {/* Animated dots */}
        {[100, 200, 300, 400].map((x, i) => (
          <motion.circle
            key={i}
            cx={x}
            cy={[100, 80, 40, 20][i]}
            r="4"
            fill="#22d3ee"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.5, 1] }}
            transition={{
              duration: 0.5,
              delay: 0.5 + i * 0.3,
              repeat: Infinity,
              repeatDelay: 2,
            }}
          />
        ))}
      </svg>

      {/* Floating stats */}
      <motion.div
        className="absolute top-4 right-4 bg-white/10 backdrop-blur-md rounded-lg px-3 py-2"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="flex items-center gap-2">
          <TrendingUp size={16} className="text-green-400" />
          <span className="text-green-400 text-sm font-bold">+127.5%</span>
        </div>
      </motion.div>
    </div>
  );
};

// Robot Card Component
const RobotCard = ({
  name,
  description,
  winRate,
  profit,
  trades,
  icon: Icon,
  delay,
}: any) => {
  const handleWhatsApp = () => {
    const message = `Halo, saya tertarik dengan robot trading ${name}. Mohon informasi lebih lanjut.`;
    const waUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl transition-all group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-14 h-14 bg-gradient-to-br from-[#156d95] to-[#111A4A] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
          <Icon size={28} className="text-white" />
        </div>
        <motion.div
          className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Activity size={12} />
          Aktif
        </motion.div>
      </div>

      <h3
        className="text-xl font-bold text-[#111A4A] mb-2"
        style={{ fontFamily: "var(--font-figtree), Figtree" }}
      >
        {name}
      </h3>
      <p className="text-[#6e6e6e] text-sm mb-4 leading-relaxed">
        {description}
      </p>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="text-center p-2 bg-gray-50 rounded-lg">
          <div className="text-lg font-bold text-[#156d95]">{winRate}%</div>
          <div className="text-xs text-gray-500">Win Rate</div>
        </div>
        <div className="text-center p-2 bg-gray-50 rounded-lg">
          <div className="text-lg font-bold text-green-600">{profit}%</div>
          <div className="text-xs text-gray-500">Profit</div>
        </div>
        <div className="text-center p-2 bg-gray-50 rounded-lg">
          <div className="text-lg font-bold text-[#111A4A]">{trades}</div>
          <div className="text-xs text-gray-500">Trades</div>
        </div>
      </div>

      <button
        onClick={handleWhatsApp}
        className="w-full py-2.5 bg-[#111A4A] text-white rounded-lg text-sm font-medium hover:bg-[#156d95] transition-colors flex items-center justify-center gap-2 group-hover:gap-3"
      >
        Pesan via WhatsApp <ChevronRight size={16} />
      </button>
    </motion.div>
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
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.03 }}
      className={`relative rounded-2xl p-6 ${recommended ? "bg-[#111A4A] text-white" : "bg-white border border-gray-200"} shadow-xl overflow-hidden`}
    >
      {recommended && (
        <motion.div
          className="absolute top-0 right-0 bg-[#156d95] text-white text-xs font-bold px-4 py-1 rounded-bl-lg"
          animate={{ opacity: [1, 0.7, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          PALING POPULER
        </motion.div>
      )}

      <div className="mb-4">
        <h3
          className={`text-lg font-bold mb-1 ${recommended ? "text-white" : "text-[#111A4A]"}`}
          style={{ fontFamily: "var(--font-figtree), Figtree" }}
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
          <span
            className={`text-sm line-through ${recommended ? "text-gray-400" : "text-gray-400"}`}
          >
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
          <motion.li
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: delay + idx * 0.1 }}
            className="flex items-center gap-2 text-sm"
          >
            <CheckCircle2
              size={16}
              className={recommended ? "text-[#22d3ee]" : "text-[#156d95]"}
            />
            <span className={recommended ? "text-gray-200" : "text-gray-600"}>
              {feature}
            </span>
          </motion.li>
        ))}
      </ul>

      <motion.button
        onClick={handleWhatsApp}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`w-full py-3 rounded-lg font-medium text-sm transition-all ${
          recommended
            ? "bg-white text-[#111A4A] hover:bg-gray-100"
            : "bg-[#156d95] text-white hover:bg-[#111A4A]"
        }`}
      >
        Pesan via WhatsApp
      </motion.button>
    </motion.div>
  );
};

// Backtest Table Row
const BacktestRow = ({ date, pair, type, entry, exit, profit, delay }: any) => {
  const isProfit = profit > 0;

  return (
    <motion.tr
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
    >
      <td className="py-3 px-4 text-sm text-gray-600">{date}</td>
      <td className="py-3 px-4">
        <span className="font-bold text-[#111A4A]">{pair}</span>
      </td>
      <td className="py-3 px-4">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${type === "BUY" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
        >
          {type}
        </span>
      </td>
      <td className="py-3 px-4 text-sm text-gray-600">{entry}</td>
      <td className="py-3 px-4 text-sm text-gray-600">{exit}</td>
      <td className="py-3 px-4">
        <span
          className={`font-bold ${isProfit ? "text-green-600" : "text-red-600"}`}
        >
          {isProfit ? "+" : ""}
          {profit} pips
        </span>
      </td>
    </motion.tr>
  );
};

// Main Component
export const RobotTradingPage = () => {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({ target: containerRef });
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const robots = [
    {
      name: "Alpha Scalper X",
      description:
        "Robot trading khusus untuk scalping dengan analisis teknikal real-time dan eksekusi cepat di pasar volatile.",
      winRate: 78,
      profit: 15.2,
      trades: 1247,
      icon: Zap,
    },
    {
      name: "Trend Master Pro",
      description:
        "Mengikuti tren pasar mayor dengan algoritma machine learning untuk identifikasi tren jangka panjang.",
      winRate: 82,
      profit: 23.8,
      trades: 856,
      icon: TrendingUp,
    },
    {
      name: "Grid Guardian",
      description:
        "Strategi grid trading otomatis yang bekerja 24/7 untuk mengumpulkan profit dari fluktuasi harga.",
      winRate: 71,
      profit: 12.5,
      trades: 2156,
      icon: Bot,
    },
  ];

  const backtestData = [
    {
      date: "2024-03-28",
      pair: "EUR/USD",
      type: "BUY",
      entry: "1.0821",
      exit: "1.0845",
      profit: 24,
    },
    {
      date: "2024-03-27",
      pair: "GBP/USD",
      type: "SELL",
      entry: "1.2654",
      exit: "1.2621",
      profit: 33,
    },
    {
      date: "2024-03-26",
      pair: "USD/JPY",
      type: "BUY",
      entry: "151.42",
      exit: "151.89",
      profit: 47,
    },
    {
      date: "2024-03-25",
      pair: "XAU/USD",
      type: "BUY",
      entry: "2178.5",
      exit: "2192.3",
      profit: 138,
    },
    {
      date: "2024-03-24",
      pair: "EUR/USD",
      type: "SELL",
      entry: "1.0865",
      exit: "1.0832",
      profit: 33,
    },
  ];

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

  const handleWhatsAppGeneral = () => {
    const message = `Halo, saya tertarik dengan Robot Trading Forex for Better Living. Mohon informasi lebih lanjut.`;
    const waUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank");
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="w-full bg-white min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-[#156d95]">Loading...</div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="w-full bg-white min-h-screen overflow-hidden"
    >
      {/* HERO SECTION */}
      <section className="w-full pt-24 md:pt-32 pb-16 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        {/* Animated background elements */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-[#156d95]/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-[#111A4A]/5 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        <div className="max-w-7xl mx-auto grid grid-cols-12 gap-5 lg:gap-16 px-8 md:px-12 relative z-10">
          {/* LEFT TEXT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="col-span-12 lg:col-span-6 flex flex-col justify-center text-left"
          >
            <motion.a
              href="#"
              className="flex items-center gap-1 text-[#6e6e6e] mb-4 cursor-pointer w-fit"
              whileHover={{ x: 5 }}
            >
              <span className="text-xs uppercase tracking-tight font-mono flex items-center gap-1 hover:text-[#202020]">
                Lihat performa robot{" "}
                <ArrowUpRight size={14} strokeWidth={1.5} />
              </span>
            </motion.a>

            <h1
              className="text-[40px] md:text-[50px] font-medium leading-tight tracking-tight text-[#111A4A] mb-6"
              style={{ fontFamily: "var(--font-figtree), Figtree" }}
            >
              Robot Trading <br />
              <span className="text-[#156d95]">Cerdas & Otomatis</span>
            </h1>

            <p
              className="text-lg leading-7 text-[#111A4A] opacity-70 mt-0 mb-8 max-w-lg"
              style={{ fontFamily: "var(--font-figtree), Figtree" }}
            >
              Tingkatkan potensi trading Anda dengan AI-powered trading bots
              yang bekerja 24/7. Backtest terbukti, risk management otomatis,
              dan profit sharing yang transparan.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleWhatsAppGeneral}
                className="inline-flex items-center justify-center bg-[#156d95] text-white rounded-lg px-6 py-3.5 text-sm sm:text-base font-medium transition-all hover:shadow-lg hover:shadow-[#156d95]/25"
              >
                Mulai Sekarang <ArrowUpRight size={18} className="ml-1" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push("#backtest")}
                className="inline-flex items-center justify-center bg-white text-[#111A4A] border-2 border-[#111A4A] rounded-lg px-6 py-3.5 text-sm sm:text-base font-medium hover:bg-[#111A4A] hover:text-white transition-all"
              >
                Lihat Backtest
              </motion.button>
            </div>

            {/* Stats */}
            <div className="flex gap-8">
              <div>
                <div className="text-2xl font-bold text-[#111A4A]">
                  <AnimatedCounter target={127} suffix="%" />
                </div>
                <div className="text-xs text-gray-500">Profit Tertinggi</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#111A4A]">
                  <AnimatedCounter target={78} suffix="%" />
                </div>
                <div className="text-xs text-gray-500">Win Rate Rata-rata</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#111A4A]">
                  <AnimatedCounter target={5000} suffix="+" />
                </div>
                <div className="text-xs text-gray-500">Trades Sukses</div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT ANIMATION */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="col-span-12 lg:col-span-6 flex items-center justify-center mt-6 md:mt-0"
          >
            <div className="relative w-full max-w-[520px]">
              <TradingChart />

              {/* Floating cards */}
              <motion.div
                className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-xl border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Bot size={20} className="text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#111A4A]">
                      Alpha Scalper
                    </div>
                    <div className="text-xs text-green-600">
                      +24 pips profit
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute -top-4 -right-4 bg-white rounded-xl p-3 shadow-xl border border-gray-100"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#156d95]/10 rounded-full flex items-center justify-center">
                    <Clock size={16} className="text-[#156d95]" />
                  </div>
                  <div className="text-xs">
                    <div className="font-bold text-[#111A4A]">24/7 Active</div>
                    <div className="text-gray-500">Auto Trading</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PRICING SECTION - DIPINDAHKAN KE ATAS (setelah Hero) */}
      <section className="w-full py-20 bg-white">
        <div className="max-w-7xl mx-auto px-8 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2
              className="text-3xl md:text-4xl font-bold text-[#111A4A] mb-4"
              style={{ fontFamily: "var(--font-figtree), Figtree" }}
            >
              Paket Berlangganan
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Pilih paket sesuai kebutuhan Anda. Semua paket dilengkapi dengan
              <span className="text-[#156d95] font-semibold">
                {" "}
                Profit Sharing 20:80
              </span>{" "}
              (Anda 80%, Kami 20%).
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, idx) => (
              <PricingCard key={idx} {...plan} delay={idx * 0.15} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
              <Shield size={16} className="text-green-600" />
              Garansi uang kembali 30 hari jika tidak puas dengan performa robot
            </p>
          </motion.div>
        </div>
      </section>

      {/* ROBOT LIST SECTION */}
      <section className="w-full py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2
              className="text-3xl md:text-4xl font-bold text-[#111A4A] mb-4"
              style={{ fontFamily: "var(--font-figtree), Figtree" }}
            >
              Pilihan Robot Trading
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Setiap robot dirancang dengan strategi berbeda untuk berbagai
              kondisi pasar. Pilih yang sesuai dengan gaya trading Anda.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {robots.map((robot, idx) => (
              <RobotCard key={idx} {...robot} delay={idx * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* BACKTEST SECTION */}
      <section id="backtest" className="w-full py-20 bg-white">
        <div className="max-w-7xl mx-auto px-8 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-12 gap-8 items-center mb-12"
          >
            <div className="col-span-12 lg:col-span-6">
              <h2
                className="text-3xl md:text-4xl font-bold text-[#111A4A] mb-4"
                style={{ fontFamily: "var(--font-figtree), Figtree" }}
              >
                Data Backtest & History
              </h2>
              <p className="text-gray-600">
                Transparansi penuh dengan data backtest yang dapat diverifikasi.
                Semua performa robot tercatat dan dapat Anda audit kapan saja.
              </p>
            </div>
            <div className="col-span-12 lg:col-span-6 flex justify-start lg:justify-end gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:border-[#156d95] hover:text-[#156d95] transition-colors"
              >
                <BarChart3 size={16} />
                Export CSV
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-[#156d95] text-white rounded-lg text-sm font-medium hover:bg-[#111A4A] transition-colors"
              >
                <LineChart size={16} />
                Full Report
              </motion.button>
            </div>
          </motion.div>

          {/* Backtest Table */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#111A4A] text-white">
                  <tr>
                    <th className="py-4 px-4 text-left text-xs font-semibold uppercase tracking-wider">
                      Tanggal
                    </th>
                    <th className="py-4 px-4 text-left text-xs font-semibold uppercase tracking-wider">
                      Pair
                    </th>
                    <th className="py-4 px-4 text-left text-xs font-semibold uppercase tracking-wider">
                      Type
                    </th>
                    <th className="py-4 px-4 text-left text-xs font-semibold uppercase tracking-wider">
                      Entry
                    </th>
                    <th className="py-4 px-4 text-left text-xs font-semibold uppercase tracking-wider">
                      Exit
                    </th>
                    <th className="py-4 px-4 text-left text-xs font-semibold uppercase tracking-wider">
                      Profit/Loss
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {backtestData.map((data, idx) => (
                    <BacktestRow key={idx} {...data} delay={idx * 0.1} />
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 border-t border-gray-100 flex justify-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                className="text-[#156d95] text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all"
              >
                Lihat Semua History <ChevronRight size={16} />
              </motion.button>
            </div>
          </motion.div>

          {/* Performance Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {[
              {
                label: "Total Profit",
                value: "+1,247 pips",
                icon: TrendingUp,
                color: "text-green-600",
              },
              {
                label: "Win Rate",
                value: "78.5%",
                icon: Target,
                color: "text-[#156d95]",
              },
              {
                label: "Max Drawdown",
                value: "-5.2%",
                icon: Shield,
                color: "text-orange-600",
              },
              {
                label: "Profit Factor",
                value: "2.34",
                icon: Wallet,
                color: "text-[#111A4A]",
              },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl p-4 shadow-md text-center border border-gray-100"
              >
                <stat.icon size={24} className={`mx-auto mb-2 ${stat.color}`} />
                <div className="text-xl font-bold text-[#111A4A]">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="w-full py-20 bg-[#111A4A] relative overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="max-w-4xl mx-auto px-8 md:px-12 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-3xl md:text-5xl font-bold text-white mb-6"
              style={{ fontFamily: "var(--font-figtree), Figtree" }}
            >
              Siap Meningkatkan Trading Anda?
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Bergabung dengan ribuan trader yang sudah mempercayakan trading
              mereka kepada robot kami. Mulai perjalanan profit Anda hari ini.
            </p>

            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(21,109,149,0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={handleWhatsAppGeneral}
              className="bg-[#156d95] text-white rounded-xl px-8 py-4 text-lg font-medium inline-flex items-center gap-2 hover:bg-[#1a8bc2] transition-colors"
            >
              Daftar Sekarang <ArrowUpRight size={20} />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default RobotTradingPage;
