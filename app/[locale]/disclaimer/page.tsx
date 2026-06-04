// app/disclaimer/page.tsx
"use client";

import { motion } from "framer-motion";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";

const disclaimerSections = [
  {
    id: 1,
    title: "DISCLAIMER",
    content: [
      "Seluruh informasi yang ditampilkan di channel ini disediakan semata-mata sebagai sarana berbagi pengalaman dan pengetahuan umum. Konten ini bukan merupakan nasihat investasi, rekomendasi trading, ataupun ajakan untuk melakukan transaksi tertentu. Kami tidak memberikan jaminan atas keakuratan, kelengkapan, atau kesesuaian informasi yang ada untuk kebutuhan Anda.",
      "Segala keputusan investasi dan risiko yang muncul sepenuhnya menjadi tanggung jawab pribadi pengguna. Kami tidak memikul tanggung jawab atas kerugian finansial, kesalahan transaksi, ataupun konsekuensi apa pun yang timbul dari penggunaan informasi di channel ini.",
    ],
  },
  {
    id: 2,
    title: "PENTING",
    content: [
      "Contoh transaksi, strategi, maupun analisis yang ditampilkan hanya bertujuan sebagai ilustrasi edukatif. Hasil yang diperlihatkan tidak menjamin bahwa pengguna akan mencapai hasil serupa. Setiap bentuk aktivitas trading memiliki risiko tinggi, dan tidak ada metode yang bisa menjanjikan keuntungan atau menghilangkan risiko kerugian.",
      "Sebelum melakukan transaksi, pertimbangkan tujuan finansial, tingkat toleransi risiko, serta kondisi keuangan Anda. Informasi dalam konten ini belum tentu relevan untuk semua trader dan dapat berubah sesuai kondisi pasar.",
      "Channel ini tidak memberikan arahan untuk membeli, menjual, atau mempertahankan instrumen finansial tertentu. Pengguna harus melakukan analisis mandiri sebelum mengambil keputusan.",
      "Kami tidak bertanggung jawab apabila ada pihak lain yang mengatasnamakan channel ini untuk tujuan apa pun. Apabila terdapat perbedaan antara informasi di sini dengan aturan hukum yang berlaku, maka yang dipakai adalah regulasi resmi.",
      "Kami mengimbau pengguna untuk selalu waspada terhadap penipuan, pemalsuan identitas, atau pihak yang mengaku memiliki hubungan dengan channel ini.",
      "Semoga informasi yang dibagikan dapat menambah wawasan Anda, namun seluruh keputusan trading tetap menjadi tanggung jawab Anda sepenuhnya.",
    ],
  },
  {
    id: 3,
    title: "PERINGATAN RISIKO",
    content: [
      "Trading di pasar keuangan seperti forex, saham, dan cryptocurrency memiliki risiko yang sangat tinggi dan tidak cocok untuk semua orang. Sebelum memulai, pahami bahwa:",
      "1. Anda berpotensi kehilangan sebagian atau seluruh modal yang Anda investasikan.",
      "2. Pergerakan pasar sangat fluktuatif dan dapat berubah dengan cepat.",
      "3. Leverage dapat memperbesar peluang profit, namun juga meningkatkan potensi kerugian.",
      "4. Gangguan teknis, koneksi internet, atau kegagalan sistem dapat memengaruhi transaksi Anda.",
      "5. Peraturan pemerintah atau kebijakan baru dapat berdampak langsung pada hasil trading Anda.",
      "Gunakan hanya dana yang siap Anda tanggung risikonya. Konsultasikan dengan penasihat keuangan bersertifikat bila diperlukan. Pendapat atau analisis yang disajikan bersifat pribadi dan dapat berubah tanpa pemberitahuan. Hasil di masa lalu tidak menjamin hasil di masa mendatang. Dengan menggunakan informasi ini, Anda memahami bahwa seluruh risiko sepenuhnya berada pada Anda. Konten yang dibagikan bukan merupakan financial advice dan sepenuhnya berdasarkan pengalaman serta sudut pandang pribadi. Tidak ada jaminan keuntungan. Seluruh materi dalam bentuk teks, gambar, video, atau media lain yang ditampilkan di platform ini dilindungi oleh hak cipta. Tidak diperkenankan menyalin, menyebarluaskan, atau menggunakan sebagian maupun seluruh konten tanpa izin tertulis dari pemilik hak.",
    ],
  },
  {
    id: 4,
    title: "PERINGATAN HUKUM & REGULASI",
    content: [
      "Aktivitas trading tunduk pada aturan dan hukum yang berlaku di masing-masing negara. Di Indonesia, kegiatan perdagangan berjangka komoditi (termasuk forex) diatur oleh:",
      "1. Undang-Undang No. 10 Tahun 2011 tentang perubahan atas UU No. 32/1997.",
      "2. Ketentuan BAPPEBTI, sebagai lembaga resmi yang mengawasi kegiatan PBK.",
      "3. UU Perlindungan Konsumen No. 8 Tahun 1999, terkait perlindungan konsumen terhadap praktik usaha yang merugikan.",
      "Setiap pihak yang menawarkan layanan trading wajib terdaftar dan memiliki izin dari BAPPEBTI. Penggunaan broker ilegal dapat membawa risiko hukum dan kerugian bagi pengguna.",
    ],
  },
  {
    id: 5,
    title: "TANGGUNG JAWAB PENGGUNA",
    content: [
      "Setiap pengguna wajib:",
      "1. Memastikan hanya bertransaksi dengan broker resmi yang memiliki izin.",
      "2. Memahami seluruh risiko sebelum berinvestasi.",
      "3. Melakukan riset mandiri atau konsultasi profesional sebelum mengambil keputusan.",
      "Kami tidak bertanggung jawab atas kerugian apa pun yang muncul akibat penggunaan informasi dari konten ini. Patuhi seluruh aturan hukum yang berlaku dan lakukan aktivitas trading secara sadar dan bertanggung jawab.",
    ],
  },
];

export default function DisclaimerPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-white pt-24 md:pt-28">
        {/* Header Section */}
        <section className="w-full py-8 md:py-12 bg-gray-50 border-b border-gray-200">
          <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-[#6e6e6e] text-sm mb-6 hover:text-[#156d95] transition-colors"
              >
                <ArrowLeft size={16} />
                Kembali ke Beranda
              </Link>

              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="text-[#156d95]" size={32} />
                <h1
                  className="text-2xl md:text-3xl font-semibold text-[#111A4A]"
                  style={{ fontFamily: "var(--font-figtree), Figtree" }}
                >
                  Disclaimer & Ketentuan
                </h1>
              </div>

              <p
                className="text-[#6e6e6e]"
                style={{ fontFamily: "var(--font-figtree), Figtree" }}
              >
                Mohon baca dengan seksama sebelum menggunakan layanan kami.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Content Sections */}
        <section className="w-full py-8 md:py-12">
          <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 space-y-8">
            {disclaimerSections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 md:p-8 border border-gray-100 shadow-sm"
              >
                <h2
                  className="text-xl md:text-2xl font-semibold text-[#111A4A] mb-4 pb-4 border-b border-gray-100"
                  style={{ fontFamily: "var(--font-figtree), Figtree" }}
                >
                  {section.id}. {section.title}
                </h2>

                <div className="space-y-4">
                  {section.content.map((paragraph, pIndex) => (
                    <p
                      key={pIndex}
                      className="text-[#374151] leading-relaxed text-justify"
                      style={{ fontFamily: "var(--font-figtree), Figtree" }}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="w-full py-12 bg-gray-50">
          <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 text-center">
            <p
              className="text-[#6e6e6e] mb-6"
              style={{ fontFamily: "var(--font-figtree), Figtree" }}
            >
              Dengan menggunakan website ini, Anda menyetujui seluruh ketentuan
              di atas.
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center bg-[#156d95] text-white rounded-lg px-8 py-3 text-base font-medium transition-all hover:bg-[#0d5a7c]"
            >
              Saya Mengerti dan Setuju
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
