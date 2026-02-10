// app/mentor/page.tsx
"use client";

import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import MentorCard from "@/components/mentors/MentorCard";
import { mentors } from "@/types/mentors";
import {
  Award,
  Users,
  BookOpen,
  TrendingUp,
  MessageCircle,
} from "lucide-react";

export default function MentorPage() {
  return (
    <>
      <main className="min-h-screen bg-white pt-32 md:pt-32">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#111A4A] via-[#156d95] to-[#0d5a7c] pb-20 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-16">
            <div className="text-center max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white text-sm font-medium px-4 py-2 rounded-full mb-6">
                  <Award size={16} />
                  Expert & Certified
                </span>

                <h1
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
                  style={{ fontFamily: "var(--font-figtree), Figtree" }}
                >
                  Tim Mentor <span className="text-[#7dd3fc]">FBL</span>
                </h1>

                <p
                  className="text-lg md:text-xl text-white/80 leading-relaxed mb-8"
                  style={{ fontFamily: "var(--font-figtree), Figtree" }}
                >
                  Belajar dari para profesional dengan pengalaman bertahun-tahun
                  di industri forex. Mentor kami siap membimbing Anda dari nol
                  hingga menjadi trader yang konsisten.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
                  {[
                    { icon: Users, value: "11,000+", label: "Total Students" },
                    { icon: BookOpen, value: "26+", label: "Courses" },
                    { icon: TrendingUp, value: "33+", label: "Years Combined" },
                    { icon: Award, value: "100%", label: "Certified" },
                  ].map((stat, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + idx * 0.1 }}
                      className="bg-white/10 backdrop-blur-sm rounded-xl p-4"
                    >
                      <stat.icon className="w-6 h-6 text-[#7dd3fc] mx-auto mb-2" />
                      <p className="text-2xl font-bold text-white">
                        {stat.value}
                      </p>
                      <p className="text-sm text-white/70">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Wave Bottom */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg
              viewBox="0 0 1440 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
                fill="white"
              />
            </svg>
          </div>
        </section>

        {/* Mentor List */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <h2
                className="text-3xl font-bold text-[#111A4A] mb-4"
                style={{ fontFamily: "var(--font-figtree), Figtree" }}
              >
                Mengapa Belajar dari Kami?
              </h2>
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
                },
                {
                  title: "Kurikulum Terstruktur",
                  desc: "Materi disusun sistematis dari level pemula hingga advanced dengan pendampingan penuh.",
                },
                {
                  title: "Komunitas Supportif",
                  desc: "Akses lifetime ke grup komunitas untuk diskusi, sharing, dan evaluasi bersama.",
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-shadow"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-[#156d95] to-[#111A4A] rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-bold text-white">
                      {idx + 1}
                    </span>
                  </div>
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

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-[#156d95] to-[#111A4A]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2
              className="text-3xl font-bold text-white mb-4"
              style={{ fontFamily: "var(--font-figtree), Figtree" }}
            >
              Siap Belajar dari Para Expert?
            </h2>
            <p className="text-white/80 mb-8 text-lg">
              Mulai perjalanan trading Anda dengan bimbingan mentor terbaik
              kami.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/professional-course"
                className="inline-flex items-center justify-center bg-white text-[#156d95] font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
              >
                Lihat Semua Kursus
              </a>
              <a
                href="https://wa.me/6281234567890?text=Hi%20Admin%20FBL,%20saya%20ingin%20konsultasi%20tentang%20mentor"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-colors"
              >
                <MessageCircle size={18} className="mr-2" />
                Konsultasi Gratis
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
