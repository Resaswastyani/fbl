// app/mentor/page.tsx
"use client";

import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import MentorCard from "@/components/mentors/MentorCard";
import { mentors } from "@/types/mentors";
import {
  Award,
  MessageCircle,
  Sparkles,
  Zap,
  Target,
  TrendingUp,
  BarChart3,
  Globe,
  Shield,
  ChevronDown,
} from "lucide-react";

export default function MentorPage() {
  return (
    <>
      <main className="min-h-screen bg-white pt-32 md:pt-32">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#111A4A] via-[#156d95] to-[#0d5a7c] pb-20 overflow-hidden">
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <motion.div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          </div>

          {/* Floating Animated Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{
                  x: `${10 + i * 12}%`,
                  y: `${20 + (i % 3) * 25}%`,
                  scale: 0,
                  opacity: 0,
                }}
                animate={{
                  y: [null, "-30px", "30px", null],
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: i * 0.3,
                }}
              >
                <div
                  className={`rounded-full blur-md ${
                    i % 3 === 0
                      ? "w-24 h-24 bg-[#7dd3fc]/30"
                      : i % 3 === 1
                        ? "w-16 h-16 bg-white/20"
                        : "w-20 h-20 bg-[#156d95]/30"
                  }`}
                />
              </motion.div>
            ))}
          </div>

          {/* Rotating Orbit Rings */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/10 rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] border border-[#7dd3fc]/20 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-16">
            <div className="text-center max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {/* Animated Badge */}
                <motion.div
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white text-sm font-medium px-5 py-2.5 rounded-full mb-8 border border-white/20"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Sparkles size={16} className="text-[#7dd3fc]" />
                  </motion.div>
                  <span>Expert & Certified</span>
                  <motion.div
                    animate={{ rotate: [0, -15, 15, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  >
                    <Sparkles size={16} className="text-[#7dd3fc]" />
                  </motion.div>
                </motion.div>

                {/* Animated Title */}
                <motion.h1
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
                  style={{ fontFamily: "var(--font-figtree), Figtree" }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Tim Mentor{" "}
                  <motion.span
                    className="text-[#7dd3fc] inline-block relative"
                    animate={{
                      textShadow: [
                        "0 0 10px rgba(125, 211, 252, 0.3)",
                        "0 0 30px rgba(125, 211, 252, 0.6)",
                        "0 0 10px rgba(125, 211, 252, 0.3)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    FBL
                    <motion.span
                      className="absolute -top-2 -right-4 text-2xl"
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      ✨
                    </motion.span>
                  </motion.span>
                </motion.h1>

                {/* Animated Description */}
                <motion.p
                  className="text-lg md:text-xl text-white/80 leading-relaxed mb-12 max-w-2xl mx-auto"
                  style={{ fontFamily: "var(--font-figtree), Figtree" }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  Belajar dari para profesional dengan pengalaman bertahun-tahun
                  di industri forex. Mentor kami siap membimbing Anda dari nol
                  hingga menjadi trader yang konsisten.
                </motion.p>

                {/* Animated Feature Cards - Ganti Statistik */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                  {[
                    {
                      icon: Zap,
                      label: "Real-Time",
                      desc: "Live Trading",
                      color: "from-yellow-400 to-orange-500",
                    },
                    {
                      icon: Target,
                      label: "Precision",
                      desc: "Strategi Akurat",
                      color: "from-cyan-400 to-blue-500",
                    },
                    {
                      icon: Shield,
                      label: "Trusted",
                      desc: "Tersertifikasi",
                      color: "from-green-400 to-emerald-500",
                    },
                    {
                      icon: Globe,
                      label: "Global",
                      desc: "Standar Dunia",
                      color: "from-purple-400 to-pink-500",
                    },
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 40, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: 0.6 + idx * 0.15, duration: 0.5 }}
                      whileHover={{
                        scale: 1.08,
                        y: -8,
                        transition: { duration: 0.2 },
                      }}
                      className="relative group cursor-pointer"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 overflow-hidden">
                        <motion.div
                          className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg`}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <item.icon className="w-6 h-6 text-white" />
                        </motion.div>
                        <motion.p
                          className="text-lg font-bold text-white mb-1"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.8 + idx * 0.1 }}
                        >
                          {item.label}
                        </motion.p>
                        <p className="text-xs text-white/70">{item.desc}</p>

                        {/* Shine Effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "100%" }}
                          transition={{ duration: 0.6 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Scroll Indicator */}
                <motion.div
                  className="mt-16 flex flex-col items-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  <span className="text-white/50 text-sm">
                    Scroll untuk melihat mentor
                  </span>
                  <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ChevronDown className="w-6 h-6 text-white/50" />
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Animated Wave Bottom */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg
              viewBox="0 0 1440 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full"
            >
              <motion.path
                d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
                fill="white"
                animate={{
                  d: [
                    "M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z",
                    "M0 120L60 115C120 110 240 95 360 85C480 75 600 70 720 75C840 80 960 90 1080 95C1200 100 1320 100 1380 100L1440 100V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z",
                    "M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z",
                  ],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </svg>
          </div>
        </section>

        {/* Mentor List */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <motion.span
                className="inline-flex items-center gap-2 text-[#156d95] text-sm font-semibold uppercase tracking-wider mb-4"
                animate={{ x: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <BarChart3 size={16} />
                Our Mentors
                <BarChart3 size={16} />
              </motion.span>
              <h2
                className="text-3xl md:text-4xl font-bold text-[#111A4A]"
                style={{ fontFamily: "var(--font-figtree), Figtree" }}
              >
                Bertemu dengan Para Expert
              </h2>
            </motion.div>

            <div className="space-y-20">
              {mentors.map((mentor, index) => (
                <MentorCard key={mentor.id} mentor={mentor} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Why Learn From Us */}
        <section className="py-16 bg-gradient-to-b from-[#f8fafc] to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <motion.h2
                className="text-3xl font-bold text-[#111A4A] mb-4"
                style={{ fontFamily: "var(--font-figtree), Figtree" }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                Mengapa Belajar dari Kami?
              </motion.h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Kami tidak hanya mengajarkan teori, tapi juga praktik dan
                mindset yang diperlukan untuk sukses di trading.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Pengalaman Real",
                  desc: "Semua mentor memiliki track record trading live dan pengalaman mengelola portfolio nyata.",
                  color: "from-blue-500 to-cyan-500",
                  icon: TrendingUp,
                },
                {
                  title: "Kurikulum Terstruktur",
                  desc: "Materi disusun sistematis dari level pemula hingga advanced dengan pendampingan penuh.",
                  color: "from-purple-500 to-pink-500",
                  icon: Award,
                },
                {
                  title: "Komunitas Supportif",
                  desc: "Akses lifetime ke grup komunitas untuk diskusi, sharing, dan evaluasi bersama.",
                  color: "from-orange-500 to-red-500",
                  icon: MessageCircle,
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30, rotateX: -15 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2, duration: 0.6 }}
                  whileHover={{
                    scale: 1.03,
                    rotateY: 5,
                    transition: { duration: 0.3 },
                  }}
                  className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center hover:shadow-2xl transition-all cursor-pointer"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <motion.div
                    className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <item.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3
                    className="text-xl font-semibold text-[#111A4A] mb-3"
                    style={{ fontFamily: "var(--font-figtree), Figtree" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Animated CTA Section */}
        <section className="py-16 bg-gradient-to-r from-[#156d95] to-[#111A4A] relative overflow-hidden">
          {/* Animated Background Circles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border border-white/10"
                style={{
                  width: 300 + i * 200,
                  height: 300 + i * 200,
                  left: "50%",
                  top: "50%",
                  marginLeft: -(150 + i * 100),
                  marginTop: -(150 + i * 100),
                }}
                animate={{ rotate: 360 }}
                transition={{
                  duration: 20 + i * 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.h2
              className="text-3xl font-bold text-white mb-4"
              style={{ fontFamily: "var(--font-figtree), Figtree" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Siap Belajar dari Para Expert?
            </motion.h2>
            <motion.p
              className="text-white/80 mb-8 text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Mulai perjalanan trading Anda dengan bimbingan mentor terbaik
              kami.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <motion.a
                href="/professional-course"
                className="inline-flex items-center justify-center bg-white text-[#156d95] font-semibold px-8 py-4 rounded-xl shadow-lg relative overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span className="absolute inset-0 bg-gradient-to-r from-[#7dd3fc] to-[#156d95] opacity-0 group-hover:opacity-10 transition-opacity" />
                Lihat Semua Kursus
              </motion.a>
              <motion.a
                href="https://wa.me/6281234567890?text=Hi%20Admin%20FBL,%20saya%20ingin%20konsultasi%20tentang%20mentor"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle size={18} className="mr-2" />
                Konsultasi Gratis
              </motion.a>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
