// "use client";

// import { motion, AnimatePresence } from "framer-motion";
// import Link from "next/link";
// import Image from "next/image";
// import { useState } from "react";
// import {
//   ArrowUpRight,
//   TrendingUp,
//   TrendingDown,
//   DollarSign,
//   Activity,
//   Cpu,
//   Zap,
//   CheckCircle2,
//   ChevronRight,
//   Shield,
//   Download,
//   Play,
//   FileText,
//   Settings,
//   X,
//   Sparkles,
//   Timer,
//   Award,
//   BarChart3,
//   Eye,
//   ArrowDownCircle,
//   Lock,
//   Unlock,
// } from "lucide-react";

// // ==========================================
// // SUB-COMPONENTS
// // ==========================================

// // Floating particles
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

// // Robot head component
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
//       {/* Robot Face */}
//       <div className="absolute inset-0 bg-gradient-to-br from-[#111A4A] to-[#156d95] rounded-3xl shadow-2xl border-4 border-white/20">
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

//           {/* Mouth */}
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

// // Floating trading cards around robot
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

// // Robot Animation Component
// const RobotAnimation = () => {
//   return (
//     <div className="relative w-full h-[350px] sm:h-[450px] md:h-[500px] flex items-center justify-center">
//       {/* Background glow */}
//       <div className="absolute inset-0 overflow-hidden">
//         <motion.div
//           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] bg-[#156d95]/20 rounded-full blur-3xl"
//           animate={{
//             scale: [1, 1.2, 1],
//             opacity: [0.3, 0.5, 0.3],
//           }}
//           transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
//         />
//       </div>

//       <FloatingParticles />

//       <div className="relative z-10">
//         {/* Orbit rings */}
//         <motion.div
//           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] border border-[#156d95]/20 rounded-full"
//           animate={{ rotate: 360 }}
//           transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//         />
//         <motion.div
//           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] sm:w-[340px] sm:h-[340px] border border-dashed border-[#156d95]/10 rounded-full"
//           animate={{ rotate: -360 }}
//           transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
//         />

//         {/* Robot Container */}
//         <motion.div
//           className="relative flex flex-col items-center"
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.8 }}
//         >
//           <RobotHead />

//           {/* Robot Body */}
//           <motion.div
//             className="mt-2 w-20 h-24 sm:w-28 sm:h-32 md:w-32 md:h-36 bg-gradient-to-b from-[#111A4A] to-[#156d95] rounded-2xl shadow-xl relative overflow-hidden"
//             animate={{ scaleY: [1, 1.02, 1] }}
//             transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
//           >
//             <div className="absolute inset-2 bg-[#0a0f2e] rounded-xl flex flex-col items-center justify-center gap-2">
//               <div className="flex items-center gap-1">
//                 <Zap size={12} className="text-yellow-400 sm:w-4 sm:h-4" />
//                 <span className="text-[10px] sm:text-xs text-white font-mono">
//                   AI ACTIVE
//                 </span>
//               </div>
//               <AnimatedChartBars />
//             </div>
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

//           <FloatingCards />
//         </motion.div>
//       </div>

//       {/* Bottom stats */}
//       <motion.div
//         className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4 sm:gap-8 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20"
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

// // ==========================================
// // FREE TRIAL SECTION COMPONENTS
// // ==========================================

// // Animated counter hook
// const useAnimatedCounter = (target: number, duration: number = 2) => {
//   const [count, setCount] = useState(0);

//   useState(() => {
//     let startTime: number;
//     let animationFrame: number;

//     const animate = (timestamp: number) => {
//       if (!startTime) startTime = timestamp;
//       const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
//       setCount(Math.floor(progress * target));
//       if (progress < 1) {
//         animationFrame = requestAnimationFrame(animate);
//       }
//     };

//     animationFrame = requestAnimationFrame(animate);
//     return () => cancelAnimationFrame(animationFrame);
//   });

//   return count;
// };

// // Glow button component
// const GlowButton = ({
//   children,
//   onClick,
//   variant = "primary",
//   className = "",
//   icon: Icon,
// }: {
//   children: React.ReactNode;
//   onClick?: () => void;
//   variant?: "primary" | "secondary" | "outline";
//   className?: string;
//   icon?: React.ElementType;
// }) => {
//   const baseStyles =
//     "relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 overflow-hidden group";

//   const variants = {
//     primary:
//       "bg-[#156d95] text-white hover:shadow-[0_0_30px_rgba(21,109,149,0.4)] hover:scale-105",
//     secondary:
//       "bg-[#111A4A] text-white hover:shadow-[0_0_30px_rgba(17,26,74,0.4)] hover:scale-105",
//     outline:
//       "bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/20 hover:scale-105",
//   };

//   return (
//     <motion.button
//       whileHover={{ scale: 1.05 }}
//       whileTap={{ scale: 0.95 }}
//       onClick={onClick}
//       className={`${baseStyles} ${variants[variant]} ${className}`}
//     >
//       <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
//       {Icon && <Icon size={18} />}
//       <span className="relative z-10">{children}</span>
//     </motion.button>
//   );
// };

// // Image modal component
// const ImageModal = ({
//   isOpen,
//   onClose,
//   src,
//   alt,
//   title,
// }: {
//   isOpen: boolean;
//   onClose: () => void;
//   src: string;
//   alt: string;
//   title: string;
// }) => {
//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
//           onClick={onClose}
//         >
//           <motion.div
//             initial={{ scale: 0.8, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             exit={{ scale: 0.8, opacity: 0 }}
//             transition={{ type: "spring", damping: 25 }}
//             className="relative max-w-4xl w-full bg-[#111A4A] rounded-2xl overflow-hidden shadow-2xl border border-[#156d95]/30"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="flex items-center justify-between p-4 border-b border-white/10">
//               <h3 className="text-white font-semibold flex items-center gap-2">
//                 <Eye size={18} className="text-[#22d3ee]" />
//                 {title}
//               </h3>
//               <button
//                 onClick={onClose}
//                 className="p-2 hover:bg-white/10 rounded-lg transition-colors"
//               >
//                 <X size={20} className="text-white" />
//               </button>
//             </div>
//             <div className="p-4">
//               <Image
//                 src={src}
//                 alt={alt}
//                 width={1200}
//                 height={800}
//                 className="w-full rounded-lg"
//               />
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// // Step card component
// const StepCard = ({
//   number,
//   title,
//   description,
//   icon: Icon,
//   delay,
//   children,
// }: {
//   number: number;
//   title: string;
//   description: string;
//   icon: React.ElementType;
//   delay: number;
//   children?: React.ReactNode;
// }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 30 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.6, delay }}
//       className="relative group"
//     >
//       <div className="absolute -inset-1 bg-gradient-to-r from-[#156d95] to-[#22d3ee] rounded-2xl opacity-0 group-hover:opacity-30 blur transition duration-500" />
//       <div className="relative bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:border-[#156d95]/30 transition-all duration-300 h-full">
//         <div className="flex items-start gap-4">
//           <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#156d95] to-[#22d3ee] rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-[#156d95]/20">
//             <Icon size={24} />
//           </div>
//           <div className="flex-1">
//             <div className="flex items-center gap-2 mb-2">
//               <span className="text-xs font-bold text-[#156d95] bg-[#156d95]/10 px-2 py-0.5 rounded-full">
//                 STEP {number}
//               </span>
//             </div>
//             <h4 className="text-lg font-bold text-[#111A4A] mb-2">{title}</h4>
//             <p className="text-sm text-gray-600 leading-relaxed">
//               {description}
//             </p>
//             {children && <div className="mt-4">{children}</div>}
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// // Feature badge
// const FeatureBadge = ({
//   icon: Icon,
//   text,
// }: {
//   icon: React.ElementType;
//   text: string;
// }) => (
//   <motion.div
//     whileHover={{ scale: 1.05 }}
//     className="inline-flex items-center gap-2 px-4 py-2 bg-[#156d95]/10 rounded-full text-sm text-[#156d95] font-medium border border-[#156d95]/20"
//   >
//     <Icon size={16} />
//     {text}
//   </motion.div>
// );

// // Main Free Trial Section
// const FreeTrialSection = () => {
//   const [modalImage, setModalImage] = useState<{
//     src: string;
//     title: string;
//   } | null>(null);
//   const [isHovered, setIsHovered] = useState(false);

//   const handleDownload = () => {
//     const link = document.createElement("a");
//     link.href = "/ea/GIVE%20AWAY%20EA%20FBLTRIAL%2030%20hari.ex5";
//     link.download = "GIVE AWAY EA FBLTRIAL 30 hari.ex5";
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const handleWhatsAppTrial = () => {
//     const message = `Halo, saya ingin mengaktifkan Free Trial EA FBL 30 hari. Mohon bantuannya untuk setup dan aktivasi.`;
//     const waUrl = `https://wa.me/6285187555440?text=${encodeURIComponent(message)}`;
//     window.open(waUrl, "_blank");
//   };

//   return (
//     <>
//       <ImageModal
//         isOpen={!!modalImage}
//         onClose={() => setModalImage(null)}
//         src={modalImage?.src || ""}
//         alt={modalImage?.title || ""}
//         title={modalImage?.title || ""}
//       />

//       <section className="relative w-full overflow-hidden">
//         {/* Background Effects */}
//         <div className="absolute inset-0 bg-gradient-to-b from-[#111A4A] via-[#0f172a] to-[#111A4A]">
//           <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxNTZkOTUiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0aDR2NGgtNHpNMjAgMjBoNHY0aC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
//         </div>

//         {/* Floating Orbs */}
//         <motion.div
//           className="absolute top-20 left-10 w-72 h-72 bg-[#156d95]/20 rounded-full blur-3xl"
//           animate={{
//             x: [0, 50, 0],
//             y: [0, 30, 0],
//             scale: [1, 1.2, 1],
//           }}
//           transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
//         />
//         <motion.div
//           className="absolute bottom-20 right-10 w-96 h-96 bg-[#22d3ee]/10 rounded-full blur-3xl"
//           animate={{
//             x: [0, -30, 0],
//             y: [0, -50, 0],
//             scale: [1, 1.3, 1],
//           }}
//           transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
//         />

//         <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
//           {/* Section Header */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//             className="text-center mb-12 sm:mb-16"
//           >
//             <motion.div
//               initial={{ scale: 0 }}
//               whileInView={{ scale: 1 }}
//               viewport={{ once: true }}
//               transition={{ type: "spring", delay: 0.2 }}
//               className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#156d95]/20 to-[#22d3ee]/20 rounded-full mb-6 border border-[#156d95]/30"
//             >
//               <Sparkles size={18} className="text-[#22d3ee]" />
//               <span className="text-sm text-[#22d3ee] font-semibold">
//                 FREE TRIAL 30 HARI
//               </span>
//               <motion.span
//                 animate={{ rotate: [0, 15, -15, 0] }}
//                 transition={{ duration: 2, repeat: Infinity }}
//               >
//                 <Sparkles size={18} className="text-[#22d3ee]" />
//               </motion.span>
//             </motion.div>

//             <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
//               Coba EA FBL Trading{" "}
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22d3ee] to-[#156d95]">
//                 Gratis 30 Hari
//               </span>
//             </h2>

//             <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">
//               Rasakan pengalaman trading otomatis tanpa risiko. Download EA
//               trial, lihat hasil backtest yang telah terbukti, dan mulai trading
//               dengan confidence yang tinggi.
//             </p>

//             <div className="flex flex-wrap justify-center gap-3 mt-8">
//               <FeatureBadge icon={Timer} text="30 Hari Full Access" />
//               <FeatureBadge icon={Award} text="Backtest Verified" />
//               <FeatureBadge icon={Shield} text="Risk Management" />
//               <FeatureBadge icon={BarChart3} text="Real-time Analytics" />
//             </div>
//           </motion.div>

//           {/* Main Content Grid */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16">
//             {/* Left: EA Download Card */}
//             <motion.div
//               initial={{ opacity: 0, x: -40 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.8 }}
//               className="relative group"
//               onMouseEnter={() => setIsHovered(true)}
//               onMouseLeave={() => setIsHovered(false)}
//             >
//               <div className="absolute -inset-1 bg-gradient-to-r from-[#156d95] via-[#22d3ee] to-[#156d95] rounded-3xl opacity-50 blur-lg group-hover:opacity-75 transition duration-500" />

//               <div className="relative bg-gradient-to-br from-[#111A4A] to-[#0a0f2e] rounded-3xl p-6 sm:p-8 border border-[#156d95]/30 shadow-2xl">
//                 {/* File Header */}
//                 <div className="flex items-center gap-4 mb-6">
//                   <motion.div
//                     animate={{
//                       boxShadow: [
//                         "0 0 20px rgba(21,109,149,0.3)",
//                         "0 0 40px rgba(34,211,238,0.4)",
//                         "0 0 20px rgba(21,109,149,0.3)",
//                       ],
//                     }}
//                     transition={{ duration: 2, repeat: Infinity }}
//                     className="w-16 h-16 bg-gradient-to-br from-[#156d95] to-[#22d3ee] rounded-2xl flex items-center justify-center"
//                   >
//                     <FileText size={32} className="text-white" />
//                   </motion.div>
//                   <div>
//                     <h3 className="text-xl font-bold text-white">
//                       EA FBL Trial
//                     </h3>
//                     <p className="text-sm text-gray-400">
//                       Expert Advisor for MetaTrader 5
//                     </p>
//                     <div className="flex items-center gap-2 mt-1">
//                       <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full font-medium">
//                         .ex5
//                       </span>
//                       <span className="text-xs text-gray-500">44 KB</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Animated Preview */}
//                 <div className="relative bg-[#0a0f2e] rounded-xl p-4 mb-6 overflow-hidden">
//                   <div className="flex items-center justify-between mb-3">
//                     <div className="flex items-center gap-2">
//                       <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
//                       <span className="text-xs text-gray-400 font-mono">
//                         READY TO DOWNLOAD
//                       </span>
//                     </div>
//                     <motion.div
//                       animate={{ opacity: [0.5, 1, 0.5] }}
//                       transition={{ duration: 1.5, repeat: Infinity }}
//                       className="text-xs text-[#22d3ee] font-mono"
//                     >
//                       v2.4.1
//                     </motion.div>
//                   </div>

//                   {/* Simulated Code/Config Preview */}
//                   <div className="space-y-2 font-mono text-xs">
//                     <motion.div
//                       initial={{ opacity: 0, x: -20 }}
//                       whileInView={{ opacity: 1, x: 0 }}
//                       transition={{ delay: 0.1 }}
//                       className="flex items-center gap-2 text-green-400"
//                     >
//                       <CheckCircle2 size={14} />
//                       <span>Strategy: FBL Scalping Pro</span>
//                     </motion.div>
//                     <motion.div
//                       initial={{ opacity: 0, x: -20 }}
//                       whileInView={{ opacity: 1, x: 0 }}
//                       transition={{ delay: 0.2 }}
//                       className="flex items-center gap-2 text-[#22d3ee]"
//                     >
//                       <CheckCircle2 size={14} />
//                       <span>Timeframe: H1 / M15</span>
//                     </motion.div>
//                     <motion.div
//                       initial={{ opacity: 0, x: -20 }}
//                       whileInView={{ opacity: 1, x: 0 }}
//                       transition={{ delay: 0.3 }}
//                       className="flex items-center gap-2 text-purple-400"
//                     >
//                       <CheckCircle2 size={14} />
//                       <span>Risk: Auto MM (1-2% per trade)</span>
//                     </motion.div>
//                     <motion.div
//                       initial={{ opacity: 0, x: -20 }}
//                       whileInView={{ opacity: 1, x: 0 }}
//                       transition={{ delay: 0.4 }}
//                       className="flex items-center gap-2 text-yellow-400"
//                     >
//                       <CheckCircle2 size={14} />
//                       <span>Pair: EURUSD, GBPUSD, XAUUSD</span>
//                     </motion.div>
//                   </div>

//                   {/* Progress Bar Animation */}
//                   <div className="mt-4">
//                     <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
//                       <motion.div
//                         className="h-full bg-gradient-to-r from-[#156d95] to-[#22d3ee]"
//                         initial={{ width: "0%" }}
//                         whileInView={{ width: "100%" }}
//                         viewport={{ once: true }}
//                         transition={{ duration: 2, delay: 0.5 }}
//                       />
//                     </div>
//                     <div className="flex justify-between mt-1">
//                       <span className="text-[10px] text-gray-500">
//                         System Check
//                       </span>
//                       <span className="text-[10px] text-[#22d3ee]">100%</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="flex flex-col sm:flex-row gap-3">
//                   <GlowButton
//                     onClick={handleDownload}
//                     icon={Download}
//                     className="flex-1"
//                   >
//                     Download EA Trial
//                   </GlowButton>
//                   <GlowButton
//                     onClick={handleWhatsAppTrial}
//                     variant="outline"
//                     icon={ArrowUpRight}
//                     className="flex-1"
//                   >
//                     Butuh Bantuan?
//                   </GlowButton>
//                 </div>

//                 <p className="text-xs text-gray-500 text-center mt-4">
//                   File tersimpan di:{" "}
//                   <span className="text-[#156d95]">
//                     D:\\laragon\\www\\FBL\\public\\ea
//                   </span>
//                 </p>
//               </div>
//             </motion.div>

//             {/* Right: Stats & Benefits */}
//             <motion.div
//               initial={{ opacity: 0, x: 40 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.8, delay: 0.2 }}
//               className="space-y-6"
//             >
//               {/* Stats Cards */}
//               <div className="grid grid-cols-2 gap-4">
//                 {[
//                   {
//                     label: "Win Rate",
//                     value: "78.5%",
//                     icon: TrendingUp,
//                     color: "from-green-500 to-emerald-600",
//                   },
//                   {
//                     label: "Max DD",
//                     value: "12.3%",
//                     icon: TrendingDown,
//                     color: "from-[#156d95] to-[#22d3ee]",
//                   },
//                   {
//                     label: "Profit Factor",
//                     value: "2.41",
//                     icon: DollarSign,
//                     color: "from-purple-500 to-indigo-600",
//                   },
//                   {
//                     label: "Sharpe Ratio",
//                     value: "1.85",
//                     icon: Activity,
//                     color: "from-orange-500 to-red-500",
//                   },
//                 ].map((stat, idx) => (
//                   <motion.div
//                     key={idx}
//                     initial={{ opacity: 0, y: 20 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     viewport={{ once: true }}
//                     transition={{ delay: idx * 0.1 }}
//                     whileHover={{ scale: 1.05, y: -5 }}
//                     className="relative group"
//                   >
//                     <div
//                       className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-xl opacity-0 group-hover:opacity-20 blur transition duration-300`}
//                     />
//                     <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:border-[#156d95]/50 transition-all duration-300">
//                       <stat.icon size={20} className="text-[#22d3ee] mb-2" />
//                       <div className="text-2xl font-bold text-white">
//                         {stat.value}
//                       </div>
//                       <div className="text-xs text-gray-400">{stat.label}</div>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>

//               {/* Benefit List */}
//               <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
//                 <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
//                   <Unlock size={18} className="text-[#22d3ee]" />
//                   Apa yang Anda Dapatkan?
//                 </h4>
//                 <ul className="space-y-3">
//                   {[
//                     "Akses penuh ke EA FBL selama 30 hari tanpa batasan",
//                     "Backtest report lengkap dengan statistik detail",
//                     "File setup dan konfigurasi siap pakai",
//                     "Support teknis via WhatsApp selama trial",
//                     "Upgrade seamless ke paket berlangganan",
//                   ].map((item, idx) => (
//                     <motion.li
//                       key={idx}
//                       initial={{ opacity: 0, x: -20 }}
//                       whileInView={{ opacity: 1, x: 0 }}
//                       viewport={{ once: true }}
//                       transition={{ delay: idx * 0.1 }}
//                       className="flex items-start gap-3 text-sm text-gray-300"
//                     >
//                       <CheckCircle2
//                         size={18}
//                         className="text-[#22d3ee] flex-shrink-0 mt-0.5"
//                       />
//                       {item}
//                     </motion.li>
//                   ))}
//                 </ul>
//               </div>
//             </motion.div>
//           </div>

//           {/* Divider */}
//           <motion.div
//             initial={{ scaleX: 0 }}
//             whileInView={{ scaleX: 1 }}
//             viewport={{ once: true }}
//             transition={{ duration: 1 }}
//             className="w-full h-px bg-gradient-to-r from-transparent via-[#156d95]/50 to-transparent mb-12"
//           />

//           {/* How It Works Steps */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-center mb-10"
//           >
//             <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
//               Cara Menggunakan <span className="text-[#22d3ee]">EA Trial</span>
//             </h3>
//             <p className="text-gray-400 text-sm sm:text-base">
//               3 langkah mudah untuk mulai trading otomatis
//             </p>
//           </motion.div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
//             {/* Step 1: Download */}
//             <StepCard
//               number={1}
//               title="Download & Install"
//               description="Download file EA .ex5 dan letakkan di folder Experts MetaTrader 5 Anda. File sudah siap pakai tanpa perlu compile ulang."
//               icon={Download}
//               delay={0}
//             >
//               <GlowButton
//                 onClick={handleDownload}
//                 variant="secondary"
//                 className="w-full text-xs"
//                 icon={ArrowDownCircle}
//               >
//                 Download Sekarang
//               </GlowButton>
//             </StepCard>

//             {/* Step 2: Setup */}
//             <StepCard
//               number={2}
//               title="Setup & Konfigurasi"
//               description="Ikuti panduan setup yang telah kami siapkan. Atur parameter risk management sesuai preferensi Anda untuk hasil optimal."
//               icon={Settings}
//               delay={0.2}
//             >
//               <div className="flex gap-2">
//                 <button
//                   onClick={() =>
//                     setModalImage({
//                       src: "/ea/GIVEAWAY%20setting%20H1.JPG.jpeg",
//                       title: "Panduan Setup H1",
//                     })
//                   }
//                   className="flex-1 py-2 px-3 bg-[#156d95]/10 hover:bg-[#156d95]/20 border border-[#156d95]/30 rounded-lg text-xs text-[#156d95] font-medium transition-all flex items-center justify-center gap-2"
//                 >
//                   <Eye size={14} />
//                   Lihat Setup
//                 </button>
//               </div>
//             </StepCard>

//             {/* Step 3: Backtest */}
//             <StepCard
//               number={3}
//               title="Verifikasi Backtest"
//               description="Lihat hasil backtest yang telah kami lakukan untuk memastikan performa EA sebelum digunakan di akun real."
//               icon={BarChart3}
//               delay={0.4}
//             >
//               <div className="flex gap-2">
//                 <button
//                   onClick={() =>
//                     setModalImage({
//                       src: "/ea/GIVEAWAY%20backtest%201.JPG.jpeg",
//                       title: "Hasil Backtest 1",
//                     })
//                   }
//                   className="flex-1 py-2 px-3 bg-[#156d95]/10 hover:bg-[#156d95]/20 border border-[#156d95]/30 rounded-lg text-xs text-[#156d95] font-medium transition-all flex items-center justify-center gap-2"
//                 >
//                   <Eye size={14} />
//                   Backtest 1
//                 </button>
//                 <button
//                   onClick={() =>
//                     setModalImage({
//                       src: "/ea/GIVEAWAY%20BACKTEST.JPG.jpeg",
//                       title: "Hasil Backtest 2",
//                     })
//                   }
//                   className="flex-1 py-2 px-3 bg-[#156d95]/10 hover:bg-[#156d95]/20 border border-[#156d95]/30 rounded-lg text-xs text-[#156d95] font-medium transition-all flex items-center justify-center gap-2"
//                 >
//                   <Eye size={14} />
//                   Backtest 2
//                 </button>
//               </div>
//             </StepCard>
//           </div>

//           {/* Image Gallery Preview */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//             className="mb-12"
//           >
//             <h4 className="text-white font-semibold text-center mb-6 flex items-center justify-center gap-2">
//               <Eye size={18} className="text-[#22d3ee]" />
//               Preview Dokumentasi & Hasil Backtest
//             </h4>

//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//               {[
//                 {
//                   src: "/ea/GIVEAWAY%20setting%20H1.JPG.jpeg",
//                   title: "Setup Konfigurasi H1",
//                   desc: "Parameter optimal untuk timeframe H1",
//                 },
//                 {
//                   src: "/ea/GIVEAWAY%20backtest%201.JPG.jpeg",
//                   title: "Backtest Report 1",
//                   desc: "Analisis performa dan statistik trading",
//                 },
//                 {
//                   src: "/ea/GIVEAWAY%20BACKTEST.JPG.jpeg",
//                   title: "Backtest Report 2",
//                   desc: "Grafik equity curve dan drawdown",
//                 },
//               ].map((img, idx) => (
//                 <motion.div
//                   key={idx}
//                   whileHover={{ scale: 1.03, y: -5 }}
//                   whileTap={{ scale: 0.98 }}
//                   onClick={() =>
//                     setModalImage({ src: img.src, title: img.title })
//                   }
//                   className="relative group cursor-pointer rounded-xl overflow-hidden border border-[#156d95]/20 hover:border-[#156d95]/60 transition-all duration-300"
//                 >
//                   <div className="absolute inset-0 bg-gradient-to-t from-[#111A4A] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
//                   <Image
//                     src={img.src}
//                     alt={img.title}
//                     width={400}
//                     height={300}
//                     className="w-full h-48 object-cover"
//                   />
//                   <div className="absolute bottom-0 left-0 right-0 p-4 z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
//                     <h5 className="text-white font-semibold text-sm">
//                       {img.title}
//                     </h5>
//                     <p className="text-gray-300 text-xs">{img.desc}</p>
//                   </div>
//                   <div className="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
//                     <div className="bg-[#156d95]/80 backdrop-blur-sm p-2 rounded-lg">
//                       <Eye size={16} className="text-white" />
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>

//           {/* CTA Banner */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//             className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#156d95] to-[#111A4A] p-8 sm:p-10"
//           >
//             <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] opacity-30" />

//             <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
//               <div className="text-center md:text-left">
//                 <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
//                   Siap Meningkatkan Trading Anda?
//                 </h3>
//                 <p className="text-gray-300 text-sm sm:text-base">
//                   30 hari gratis untuk merasakan performa EA FBL. Tanpa kartu
//                   kredit, tanpa risiko.
//                 </p>
//               </div>
//               <div className="flex flex-col sm:flex-row gap-3">
//                 <GlowButton onClick={handleDownload} icon={Download}>
//                   Download Gratis
//                 </GlowButton>
//                 <GlowButton
//                   onClick={handleWhatsAppTrial}
//                   variant="outline"
//                   icon={ArrowUpRight}
//                 >
//                   Tanya Admin
//                 </GlowButton>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </section>
//     </>
//   );
// };

// // Pricing Card Component (UNCHANGED)
// const PricingCard = ({
//   tier,
//   price,
//   originalPrice,
//   features,
//   recommended,
//   delay,
// }: any) => {
//   const handleWhatsApp = () => {
//     const message = `Halo, saya tertarik dengan paket ${tier} (Rp ${price}jt/bulan). Mohon informasi cara pembelian.`;
//     const waUrl = `https://wa.me/6285187555440?text=${encodeURIComponent(message)}`;
//     window.open(waUrl, "_blank");
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 30 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.5, delay }}
//       whileHover={{ y: -8 }}
//       className={`relative rounded-2xl p-6 ${recommended ? "bg-[#111A4A] text-white" : "bg-white border border-gray-200"} shadow-xl overflow-hidden`}
//     >
//       {recommended && (
//         <div className="absolute top-0 right-0 bg-[#156d95] text-white text-xs font-bold px-4 py-1 rounded-bl-lg">
//           PALING POPULER
//         </div>
//       )}

//       <div className="mb-4">
//         <h3
//           className={`text-lg font-bold mb-1 ${recommended ? "text-white" : "text-[#111A4A]"}`}
//         >
//           {tier}
//         </h3>
//         <p
//           className={`text-xs ${recommended ? "text-gray-300" : "text-gray-500"}`}
//         >
//           Profit Sharing 20:80
//         </p>
//       </div>

//       <div className="mb-6">
//         <div className="flex items-baseline gap-2">
//           <span
//             className={`text-3xl font-bold ${recommended ? "text-white" : "text-[#111A4A]"}`}
//           >
//             Rp {price}jt
//           </span>
//           <span className="text-sm line-through text-gray-400">
//             Rp {originalPrice}jt
//           </span>
//         </div>
//         <span
//           className={`text-xs ${recommended ? "text-gray-300" : "text-gray-500"}`}
//         >
//           /bulan
//         </span>
//       </div>

//       <ul className="space-y-3 mb-6">
//         {features.map((feature: string, idx: number) => (
//           <li key={idx} className="flex items-center gap-2 text-sm">
//             <CheckCircle2
//               size={16}
//               className={recommended ? "text-[#22d3ee]" : "text-[#156d95]"}
//             />
//             <span className={recommended ? "text-gray-200" : "text-gray-600"}>
//               {feature}
//             </span>
//           </li>
//         ))}
//       </ul>

//       <button
//         onClick={handleWhatsApp}
//         className={`w-full py-3 rounded-lg font-medium text-sm transition-all ${
//           recommended
//             ? "bg-white text-[#111A4A] hover:bg-gray-100"
//             : "bg-[#156d95] text-white hover:bg-[#111A4A]"
//         }`}
//       >
//         Pesan via WhatsApp
//       </button>
//     </motion.div>
//   );
// };

// // ==========================================
// // MAIN COMPONENT
// // ==========================================

// export const RobotTradingSection = () => {
//   const handleWhatsAppGeneral = () => {
//     const message = `Halo, saya tertarik dengan Robot Trading. Mohon informasi lebih lanjut.`;
//     const waUrl = `https://wa.me/6285187555440?text=${encodeURIComponent(message)}`;
//     window.open(waUrl, "_blank");
//   };

//   const pricingPlans = [
//     {
//       tier: "Starter",
//       price: "5",
//       originalPrice: "7",
//       features: [
//         "1 Robot Trading",
//         "Backtest Report",
//         "Support 24/7",
//         "Risk Management Basic",
//       ],
//       recommended: false,
//     },
//     {
//       tier: "Professional",
//       price: "12",
//       originalPrice: "18",
//       features: [
//         "3 Robot Trading",
//         "Advanced Backtest",
//         "Priority Support",
//         "Risk Management Pro",
//         "Monthly Report",
//         "Custom Strategy",
//       ],
//       recommended: true,
//     },
//     {
//       tier: "Enterprise",
//       price: "25",
//       originalPrice: "35",
//       features: [
//         "Unlimited Robot",
//         "Full Backtest Access",
//         "Dedicated Manager",
//         "Custom Development",
//         "API Access",
//         "White Label Option",
//       ],
//       recommended: false,
//     },
//   ];

//   return (
//     <section className="w-full bg-gradient-to-b from-gray-50 to-white py-16 sm:py-20 lg:py-24">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* HERO AREA */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16 sm:mb-20">
//           {/* LEFT: TEXT CONTENT */}
//           <motion.div
//             initial={{ opacity: 0, x: -30 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//             className="text-center lg:text-left order-2 lg:order-1"
//           >
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: 0.2 }}
//               className="inline-flex items-center gap-2 px-4 py-2 bg-[#156d95]/10 rounded-full mb-4 sm:mb-6"
//             >
//               <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
//               <span className="text-sm text-[#156d95] font-medium">
//                 AI Trading Bot Active
//               </span>
//             </motion.div>

//             <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#111A4A] leading-tight mb-4 sm:mb-6">
//               Robot Trading <br />
//               <span className="text-[#156d95]">Cerdas & Otomatis</span>
//             </h1>

//             <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-lg mx-auto lg:mx-0">
//               Tingkatkan potensi trading Anda dengan AI-powered trading bots
//               yang bekerja 24/7. Backtest terbukti, risk management otomatis,
//               dan profit sharing yang transparan.
//             </p>

//             <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-8">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={handleWhatsAppGeneral}
//                 className="inline-flex items-center justify-center bg-[#156d95] text-white rounded-xl px-6 sm:px-8 py-3.5 sm:py-4 font-semibold transition-all hover:shadow-lg hover:shadow-[#156d95]/25 text-sm sm:text-base"
//               >
//                 Mulai Sekarang <ArrowUpRight size={18} className="ml-2" />
//               </motion.button>

//               <Link href="/robot-trading">
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="inline-flex items-center justify-center bg-white text-[#111A4A] border-2 border-[#111A4A] rounded-xl px-6 sm:px-8 py-3.5 sm:py-4 font-semibold hover:bg-[#111A4A] hover:text-white transition-all text-sm sm:text-base"
//                 >
//                   Lihat Backtest
//                 </motion.button>
//               </Link>
//             </div>

//             {/* Quick Stats */}
//             <div className="flex gap-6 sm:gap-8 justify-center lg:justify-start">
//               {[
//                 { value: "78%", label: "Win Rate" },
//                 { value: "5K+", label: "Trades" },
//                 { value: "+127%", label: "Profit" },
//               ].map((stat, idx) => (
//                 <div key={idx} className="text-center">
//                   <div className="text-xl sm:text-2xl font-bold text-[#111A4A]">
//                     {stat.value}
//                   </div>
//                   <div className="text-xs sm:text-sm text-gray-500">
//                     {stat.label}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </motion.div>

//           {/* RIGHT: ROBOT ANIMATION */}
//           <motion.div
//             initial={{ opacity: 0, x: 30 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8, delay: 0.3 }}
//             className="order-1 lg:order-2"
//           >
//             <RobotAnimation />
//           </motion.div>
//         </div>

//         {/* DIVIDER */}
//         <motion.div
//           initial={{ scaleX: 0 }}
//           whileInView={{ scaleX: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8 }}
//           className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-12 sm:mb-16"
//         />

//         {/* ============================ */}
//         {/* FREE TRIAL SECTION INSERTED */}
//         {/* ============================ */}
//         <div className="mb-16 sm:mb-20">
//           <FreeTrialSection />
//         </div>

//         {/* DIVIDER */}
//         <motion.div
//           initial={{ scaleX: 0 }}
//           whileInView={{ scaleX: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8 }}
//           className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-12 sm:mb-16"
//         />

//         {/* PRICING AREA */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="text-center mb-8 sm:mb-12"
//         >
//           <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#111A4A] mb-3 sm:mb-4">
//             Paket Berlangganan
//           </h2>
//           <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
//             Pilih paket sesuai kebutuhan Anda. Semua paket dilengkapi dengan
//             <span className="text-[#156d95] font-semibold">
//               {" "}
//               Profit Sharing 20:80
//             </span>{" "}
//             (Anda 80%, Kami 20%).
//           </p>
//         </motion.div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
//           {pricingPlans.map((plan, idx) => (
//             <PricingCard key={idx} {...plan} delay={idx * 0.15} />
//           ))}
//         </div>

//         <motion.div
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//           className="mt-8 sm:mt-12 text-center"
//         >
//           <p className="text-xs sm:text-sm text-gray-500 flex items-center justify-center gap-2">
//             <Shield size={14} className="text-green-600" />
//             Garansi uang kembali 30 hari jika tidak puas dengan performa robot
//           </p>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default RobotTradingSection;

"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
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
  Download,
  Play,
  FileText,
  Settings,
  X,
  Sparkles,
  Timer,
  Award,
  BarChart3,
  Eye,
  ArrowDownCircle,
  Lock,
  Unlock,
  Target,
  Gauge,
  Layers,
  MousePointerClick,
  MessageCircle,
  Users,
} from "lucide-react";

// ==========================================
// SUB-COMPONENTS (UNCHANGED FROM ORIGINAL)
// ==========================================

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
      <div className="absolute inset-0 bg-gradient-to-br from-[#111A4A] to-[#156d95] rounded-3xl shadow-2xl border-4 border-white/20">
        <div className="absolute inset-2 bg-[#0a0f2e] rounded-2xl overflow-hidden">
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
      <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-3 h-8 bg-[#156d95] rounded-l-lg" />
      <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-3 h-8 bg-[#156d95] rounded-r-lg" />
    </motion.div>
  );
};

const FloatingCards = () => {
  const cards = [
    { icon: TrendingUp, label: "BUY", value: "AI", color: "bg-green-500", delay: 0 },
    { icon: DollarSign, label: "Auto", value: "MM", color: "bg-[#156d95]", delay: 0.5 },
    { icon: Activity, label: "Active", value: "24/7", color: "bg-purple-500", delay: 1 },
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

const RobotAnimation = () => {
  return (
    <div className="relative w-full h-[350px] sm:h-[450px] md:h-[500px] flex items-center justify-center">
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
        <motion.div
          className="relative flex flex-col items-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <RobotHead />
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
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4 sm:gap-8 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        {[
          { label: "AI Engine", value: "Active", icon: Cpu },
          { label: "Trades", value: "Auto", icon: Activity },
          { label: "Status", value: "Online", icon: Shield },
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

// ==========================================
// FREE TRIAL SECTION - FULL SCREEN
// ==========================================

const GlowButton = ({ 
  children, 
  onClick, 
  variant = "primary",
  className = "",
  icon: Icon,
  disabled = false
}: { 
  children: React.ReactNode; 
  onClick?: () => void; 
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  icon?: React.ElementType;
  disabled?: boolean;
}) => {
  const baseStyles = "relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-[#156d95] text-white hover:shadow-[0_0_30px_rgba(21,109,149,0.4)] hover:scale-105 disabled:hover:scale-100",
    secondary: "bg-[#111A4A] text-white hover:shadow-[0_0_30px_rgba(17,26,74,0.4)] hover:scale-105",
    outline: "bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/20 hover:scale-105"
  };

  return (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {!disabled && <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />}
      {Icon && <Icon size={18} />}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

const ImageModal = ({ 
  isOpen, 
  onClose, 
  src, 
  alt,
  title 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  src: string; 
  alt: string;
  title: string;
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
            className="relative max-w-4xl w-full bg-[#111A4A] rounded-2xl overflow-hidden shadow-2xl border border-[#156d95]/30"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h3 className="text-white font-semibold flex items-center gap-2">
                <Eye size={18} className="text-[#22d3ee]" />
                {title}
              </h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X size={20} className="text-white" />
              </button>
            </div>
            <div className="p-4">
              <Image
                src={src}
                alt={alt}
                width={1200}
                height={800}
                className="w-full rounded-lg"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const StepCard = ({ 
  number, 
  title, 
  description, 
  icon: Icon,
  delay,
  children 
}: { 
  number: number; 
  title: string; 
  description: string; 
  icon: React.ElementType;
  delay: number;
  children?: React.ReactNode;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="relative group"
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-[#156d95] to-[#22d3ee] rounded-2xl opacity-0 group-hover:opacity-30 blur transition duration-500" />
      <div className="relative bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:border-[#156d95]/30 transition-all duration-300 h-full">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#156d95] to-[#22d3ee] rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-[#156d95]/20">
            <Icon size={24} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-[#156d95] bg-[#156d95]/10 px-2 py-0.5 rounded-full">
                STEP {number}
              </span>
            </div>
            <h4 className="text-lg font-bold text-[#111A4A] mb-2">{title}</h4>
            <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
            {children && <div className="mt-4">{children}</div>}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const FeatureBadge = ({ icon: Icon, text }: { icon: React.ElementType; text: string }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="inline-flex items-center gap-2 px-4 py-2 bg-[#156d95]/10 rounded-full text-sm text-[#156d95] font-medium border border-[#156d95]/20"
  >
    <Icon size={16} />
    {text}
  </motion.div>
);

// TikTok Follow Gate Component
const TikTokGate = ({ onUnlock }: { onUnlock: () => void }) => {
  const [isVerifying, setIsVerifying] = useState(false);

  const handleFollow = () => {
    window.open("https://www.tiktok.com/@forexforbetterliving", "_blank");
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      onUnlock();
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#111A4A] to-[#0a0f2e] border border-[#156d95]/30 p-8 text-center"
    >
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48ZyBmaWxsPSIjMTU2ZDk1IiBmaWxsLW9wYWNpdHk9IjAuMDMiPjxwYXRoIGQ9Ik0zNiAzNGg0djRoLTR6TTIwIDIwaDR2NGgtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50" />
      
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10"
      >
        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#156d95] to-[#22d3ee] rounded-2xl flex items-center justify-center shadow-lg shadow-[#156d95]/30">
          <Lock size={36} className="text-white" />
        </div>
        
        <h3 className="text-2xl font-bold text-white mb-3">
          Konten Terkunci
        </h3>
        <p className="text-gray-400 mb-6 max-w-md mx-auto">
          Download EA Trial gratis tersedia setelah Anda follow TikTok kami. 
          Dapatkan update trading dan edukasi forex setiap hari!
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <GlowButton 
            onClick={handleFollow}
            icon={isVerifying ? Activity : MousePointerClick}
            className={isVerifying ? "animate-pulse" : ""}
          >
            {isVerifying ? "Memverifikasi..." : "Follow @forexforbetterliving"}
          </GlowButton>
        </div>

        <p className="text-xs text-gray-500 mt-4">
          Klik tombol di atas untuk membuka TikTok dan follow akun kami
        </p>
      </motion.div>
    </motion.div>
  );
};

const FreeTrialSection = () => {
  const [modalImage, setModalImage] = useState<{ src: string; title: string } | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/ea/GIVE%20AWAY%20EA%20FBLTRIAL%2030%20hari.ex5";
    link.download = "GIVE AWAY EA FBLTRIAL 30 hari.ex5";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleWhatsAppTrial = () => {
    const message = `Halo, saya ingin mengaktifkan Free Trial EA FBL 30 hari. Mohon bantuannya untuk setup dan aktivasi.`;
    const waUrl = `https://wa.me/6285187555440?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank");
  };

  return (
    <>
      <ImageModal
        isOpen={!!modalImage}
        onClose={() => setModalImage(null)}
        src={modalImage?.src || ""}
        alt={modalImage?.title || ""}
        title={modalImage?.title || ""}
      />

      <section className="relative w-full min-h-screen flex items-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#111A4A] via-[#0f172a] to-[#111A4A]">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxNTZkOTUiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0aDR2NGgtNHpNMjAgMjBoNHY0aC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        </div>

        {/* Floating Orbs */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-[#156d95]/20 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-[#22d3ee]/10 rounded-full blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, -50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-[#156d95]/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#156d95]/20 to-[#22d3ee]/20 rounded-full mb-6 border border-[#156d95]/30"
            >
              <Sparkles size={18} className="text-[#22d3ee]" />
              <span className="text-sm text-[#22d3ee] font-semibold">
                FREE TRIAL 30 HARI
              </span>
              <motion.span
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles size={18} className="text-[#22d3ee]" />
              </motion.span>
            </motion.div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              Coba EA FBL Trading{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22d3ee] to-[#156d95]">
                Gratis 30 Hari
              </span>
            </h2>
            
            <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">
              Rasakan pengalaman trading otomatis tanpa risiko. Download EA trial, 
              lihat hasil backtest yang telah terbukti, dan mulai trading dengan 
              confidence yang tinggi.
            </p>

            <div className="flex flex-wrap justify-center gap-3 mt-8">
              <FeatureBadge icon={Timer} text="30 Hari Full Access" />
              <FeatureBadge icon={Award} text="Backtest Verified" />
              <FeatureBadge icon={Shield} text="Risk Management" />
              <FeatureBadge icon={BarChart3} text="Real-time Analytics" />
            </div>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16">
            {/* Left: EA Download Card */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative group"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-[#156d95] via-[#22d3ee] to-[#156d95] rounded-3xl opacity-50 blur-lg group-hover:opacity-75 transition duration-500" />
              
              <div className="relative bg-gradient-to-br from-[#111A4A] to-[#0a0f2e] rounded-3xl p-6 sm:p-8 border border-[#156d95]/30 shadow-2xl">
                {/* File Header */}
                <div className="flex items-center gap-4 mb-6">
                  <motion.div
                    animate={{ 
                      boxShadow: [
                        "0 0 20px rgba(21,109,149,0.3)",
                        "0 0 40px rgba(34,211,238,0.4)",
                        "0 0 20px rgba(21,109,149,0.3)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-16 h-16 bg-gradient-to-br from-[#156d95] to-[#22d3ee] rounded-2xl flex items-center justify-center"
                  >
                    <FileText size={32} className="text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold text-white">EA FBL Trial</h3>
                    <p className="text-sm text-gray-400">Expert Advisor for MetaTrader 5</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full font-medium">
                        .ex5
                      </span>
                      <span className="text-xs text-gray-500">44 KB</span>
                    </div>
                  </div>
                </div>

                {/* Animated Preview */}
                <div className="relative bg-[#0a0f2e] rounded-xl p-4 mb-6 overflow-hidden">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-xs text-gray-400 font-mono">READY TO DOWNLOAD</span>
                    </div>
                    <motion.div
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="text-xs text-[#22d3ee] font-mono"
                    >
                      v2.4.1
                    </motion.div>
                  </div>
                  
                  <div className="space-y-2 font-mono text-xs">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className="flex items-center gap-2 text-green-400"
                    >
                      <CheckCircle2 size={14} />
                      <span>Strategy: FBL Scalping Pro</span>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="flex items-center gap-2 text-[#22d3ee]"
                    >
                      <CheckCircle2 size={14} />
                      <span>Timeframe: H1</span>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex items-center gap-2 text-purple-400"
                    >
                      <CheckCircle2 size={14} />
                      <span>Risk: Fix Lots/Currency</span>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="flex items-center gap-2 text-yellow-400"
                    >
                      <CheckCircle2 size={14} />
                      <span>Pair: XAUUSD</span>
                    </motion.div>
                  </div>

                  <div className="mt-4">
                    <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-[#156d95] to-[#22d3ee]"
                        initial={{ width: "0%" }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 2, delay: 0.5 }}
                      />
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-[10px] text-gray-500">System Check</span>
                      <span className="text-[10px] text-[#22d3ee]">100%</span>
                    </div>
                  </div>
                </div>

                {/* TikTok Gate or Download Buttons */}
                <AnimatePresence mode="wait">
                  {!isUnlocked ? (
                    <motion.div
                      key="locked"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <TikTokGate onUnlock={() => setIsUnlocked(true)} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="unlocked"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="space-y-3"
                    >
                      <div className="flex items-center gap-2 mb-3 text-green-400 text-sm">
                        <Unlock size={18} />
                        <span className="font-semibold">Akses Dibuka! Silakan download EA Anda.</span>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <GlowButton 
                          onClick={handleDownload}
                          icon={Download}
                          className="flex-1"
                        >
                          Download EA Trial
                        </GlowButton>
                        <GlowButton 
                          onClick={handleWhatsAppTrial}
                          variant="outline"
                          icon={MessageCircle}
                          className="flex-1"
                        >
                          Butuh Bantuan?
                        </GlowButton>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <p className="text-xs text-gray-500 text-center mt-4">
                  File tersimpan di: <span className="text-[#156d95]">D:\\laragon\\www\\FBL\\public\\ea</span>
                </p>
              </div>
            </motion.div>

            {/* Right: Honest Stats & Benefits */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Honest Performance Metrics */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Trade Accuracy", value: "Data-driven", icon: Target, color: "from-[#156d95] to-[#22d3ee]" },
                  { label: "Risk Control", value: "Fix Lots/Currency", icon: Shield, color: "from-green-500 to-emerald-600" },
                  { label: "Strategy Type", value: "Scalping", icon: Gauge, color: "from-purple-500 to-indigo-600" },
                  { label: "Markets", value: "XAUUSD", icon: Layers, color: "from-orange-500 to-red-500" },
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="relative group"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-xl opacity-0 group-hover:opacity-20 blur transition duration-300`} />
                    <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:border-[#156d95]/50 transition-all duration-300">
                      <stat.icon size={20} className="text-[#22d3ee] mb-2" />
                      <div className="text-lg font-bold text-white">{stat.value}</div>
                      <div className="text-xs text-gray-400">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Transparency Notice */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4"
              >
                <div className="flex items-start gap-3">
                  <Shield size={20} className="text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-yellow-400 font-semibold text-sm mb-1">Transparansi & Disclaimer</h4>
                    <p className="text-gray-300 text-xs leading-relaxed">
                      Hasil trading di masa lalu tidak menjamin hasil di masa depan. 
                      Performa EA bervariasi tergantung kondisi pasar, broker, dan konfigurasi. 
                      Selalu gunakan manajemen risiko yang tepat dan trade dengan tanggung jawab.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Benefit List */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Unlock size={18} className="text-[#22d3ee]" />
                  Apa yang Anda Dapatkan?
                </h4>
                <ul className="space-y-3">
                  {[
                    "Akses penuh ke EA FBL selama 30 hari tanpa batasan",
                    "Backtest report lengkap dengan statistik detail",
                    "File setup dan konfigurasi siap pakai",
                    "Support teknis via WhatsApp selama trial",
                    "Upgrade seamless ke paket berlangganan",
                  ].map((item, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-start gap-3 text-sm text-gray-300"
                    >
                      <CheckCircle2 size={18} className="text-[#22d3ee] flex-shrink-0 mt-0.5" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full h-px bg-gradient-to-r from-transparent via-[#156d95]/50 to-transparent mb-12"
          />

          {/* How It Works Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Cara Menggunakan <span className="text-[#22d3ee]">EA Trial</span>
            </h3>
            <p className="text-gray-400 text-sm sm:text-base">
              3 langkah mudah untuk mulai trading otomatis
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <StepCard
              number={1}
              title="Download & Install"
              description="Download file EA .ex5 dan letakkan di folder Experts MetaTrader 5 Anda. File sudah siap pakai tanpa perlu compile ulang."
              icon={Download}
              delay={0}
            >
              <GlowButton 
                onClick={() => isUnlocked ? handleDownload() : {}}
                variant="secondary"
                className="w-full text-xs"
                icon={ArrowDownCircle}
                disabled={!isUnlocked}
              >
                {isUnlocked ? "Download Sekarang" : "Follow TikTok Dulu"}
              </GlowButton>
            </StepCard>

            <StepCard
              number={2}
              title="Setup & Konfigurasi"
              description="Ikuti panduan setup yang telah kami siapkan. Atur parameter risk management sesuai preferensi Anda untuk hasil optimal."
              icon={Settings}
              delay={0.2}
            >
              <div className="flex gap-2">
                <button
                  onClick={() => setModalImage({ 
                    src: "/ea/GIVEAWAY%20setting%20H1.JPG.jpeg", 
                    title: "Panduan Setup H1" 
                  })}
                  className="flex-1 py-2 px-3 bg-[#156d95]/10 hover:bg-[#156d95]/20 border border-[#156d95]/30 rounded-lg text-xs text-[#156d95] font-medium transition-all flex items-center justify-center gap-2"
                >
                  <Eye size={14} />
                  Lihat Setup
                </button>
              </div>
            </StepCard>

            <StepCard
              number={3}
              title="Verifikasi Backtest"
              description="Lihat hasil backtest yang telah kami lakukan untuk memastikan performa EA sebelum digunakan di akun real."
              icon={BarChart3}
              delay={0.4}
            >
              <div className="flex gap-2">
                <button
                  onClick={() => setModalImage({ 
                    src: "/ea/GIVEAWAY%20backtest%201.JPG.jpeg", 
                    title: "Hasil Backtest 1" 
                  })}
                  className="flex-1 py-2 px-3 bg-[#156d95]/10 hover:bg-[#156d95]/20 border border-[#156d95]/30 rounded-lg text-xs text-[#156d95] font-medium transition-all flex items-center justify-center gap-2"
                >
                  <Eye size={14} />
                  Backtest 1
                </button>
                <button
                  onClick={() => setModalImage({ 
                    src: "/ea/GIVEAWAY%20BACKTEST.JPG.jpeg", 
                    title: "Hasil Backtest 2" 
                  })}
                  className="flex-1 py-2 px-3 bg-[#156d95]/10 hover:bg-[#156d95]/20 border border-[#156d95]/30 rounded-lg text-xs text-[#156d95] font-medium transition-all flex items-center justify-center gap-2"
                >
                  <Eye size={14} />
                  Backtest 2
                </button>
              </div>
            </StepCard>
          </div>

          {/* Image Gallery Preview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h4 className="text-white font-semibold text-center mb-6 flex items-center justify-center gap-2">
              <Eye size={18} className="text-[#22d3ee]" />
              Preview Dokumentasi & Hasil Backtest
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { 
                  src: "/ea/GIVEAWAY%20setting%20H1.JPG.jpeg", 
                  title: "Setup Konfigurasi H1",
                  desc: "Parameter optimal untuk timeframe H1"
                },
                { 
                  src: "/ea/GIVEAWAY%20backtest%201.JPG.jpeg", 
                  title: "Backtest Report 1",
                  desc: "Analisis performa dan statistik trading"
                },
                { 
                  src: "/ea/GIVEAWAY%20BACKTEST.JPG.jpeg", 
                  title: "Backtest Report 2",
                  desc: "Grafik equity curve dan drawdown"
                },
              ].map((img, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.03, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setModalImage({ src: img.src, title: img.title })}
                  className="relative group cursor-pointer rounded-xl overflow-hidden border border-[#156d95]/20 hover:border-[#156d95]/60 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111A4A] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                  <Image
                    src={img.src}
                    alt={img.title}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h5 className="text-white font-semibold text-sm">{img.title}</h5>
                    <p className="text-gray-300 text-xs">{img.desc}</p>
                  </div>
                  <div className="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-[#156d95]/80 backdrop-blur-sm p-2 rounded-lg">
                      <Eye size={16} className="text-white" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#156d95] to-[#111A4A] p-8 sm:p-10"
          >
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] opacity-30" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  Siap Meningkatkan Trading Anda?
                </h3>
                <p className="text-gray-300 text-sm sm:text-base">
                  30 hari gratis untuk merasakan performa EA FBL. Tanpa kartu kredit, tanpa risiko.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <GlowButton 
                  onClick={() => isUnlocked ? handleDownload() : {}}
                  icon={Download}
                  disabled={!isUnlocked}
                >
                  {isUnlocked ? "Download Gratis" : "Follow TikTok Dulu"}
                </GlowButton>
                <GlowButton 
                  onClick={handleWhatsAppTrial}
                  variant="outline"
                  icon={MessageCircle}
                >
                  Tanya Admin
                </GlowButton>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

// // Pricing Card Component (UNCHANGED)
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
    const waUrl = `https://wa.me/6285187555440?text=${encodeURIComponent(message)}`;
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
    const waUrl = `https://wa.me/6285187555440?text=${encodeURIComponent(message)}`;
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

              <Link href="/robot-trading">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center bg-white text-[#111A4A] border-2 border-[#111A4A] rounded-xl px-6 sm:px-8 py-3.5 sm:py-4 font-semibold hover:bg-[#111A4A] hover:text-white transition-all text-sm sm:text-base"
                >
                  Lihat Backtest
                </motion.button>
              </Link>
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

        {/* ============================ */}
        {/* FREE TRIAL SECTION INSERTED */}
        {/* ============================ */}
        <div className="mb-16 sm:mb-20">
          <FreeTrialSection />
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