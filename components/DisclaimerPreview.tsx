// components/DisclaimerPreview.tsx
"use client";

import { motion } from "framer-motion";
import { Shield, AlertCircle, ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";

export default function DisclaimerPreview() {
  return (
    <section className="w-full bg-gradient-to-br from-slate-50 via-white to-slate-100 border-t border-slate-200">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* Icon Badge */}
          <div className="absolute -top-4 left-4 md:left-8">
            <div className="bg-[#156d95] text-white p-3 rounded-xl shadow-lg shadow-[#156d95]/20">
              <Shield size={24} />
            </div>
          </div>

          {/* Main Content Card */}
          <div className="bg-white rounded-2xl p-6 md:p-8 pt-10 md:pt-8 shadow-sm border border-slate-100 md:pl-24">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <h3
                  className="text-lg md:text-xl font-semibold text-[#111A4A] flex items-center gap-2"
                  style={{ fontFamily: "var(--font-figtree), Figtree" }}
                >
                  <AlertCircle size={20} className="text-[#156d95]" />
                  Peringatan & Disclaimer
                </h3>
                <p
                  className="text-sm text-[#6e6e6e] mt-1"
                  style={{ fontFamily: "var(--font-figtree), Figtree" }}
                >
                  Mohon baca sebelum menggunakan layanan kami
                </p>
              </div>

              {/* Status Badge */}
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-2 animate-pulse"></span>
                Penting
              </span>
            </div>

            {/* Content */}
            <div className="space-y-4">
              <p
                className="text-[#374151] leading-relaxed text-sm md:text-base"
                style={{ fontFamily: "var(--font-figtree), Figtree" }}
              >
                Informasi yang tersedia di situs ini hanya bertujuan sebagai{" "}
                <span className="font-semibold text-[#111A4A]">
                  bahan edukasi
                </span>{" "}
                dan tidak dimaksudkan sebagai nasihat atau rekomendasi
                investasi. Kami tidak menjamin akurasi maupun kelengkapan konten
                yang ditampilkan.
              </p>

              <div
                className="bg-slate-50 rounded-lg p-4 border-l-4 border-[#156d95]"
                style={{ fontFamily: "var(--font-figtree), Figtree" }}
              >
                <p className="text-sm text-[#374151] leading-relaxed">
                  <span className="font-semibold text-[#111A4A]">
                    Tanggung Jawab Penuh:
                  </span>{" "}
                  Segala keputusan trading atau investasi merupakan tanggung
                  jawab penuh pengguna, termasuk risiko kerugian yang mungkin
                  timbul. Setiap transaksi yang Anda lakukan sepenuhnya menjadi
                  keputusan pribadi.
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p
                className="text-xs text-[#6e6e6e]"
                style={{ fontFamily: "var(--font-figtree), Figtree" }}
              >
                Pelajari selengkapnya tentang ketentuan dan risiko
              </p>

              <Link
                href="/disclaimer"
                className="group inline-flex items-center gap-2 bg-[#111A4A] text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all hover:bg-[#156d95] hover:shadow-lg hover:shadow-[#156d95]/25"
                style={{ fontFamily: "var(--font-figtree), Figtree" }}
              >
                <BookOpen size={16} />
                Baca Selengkapnya
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
