"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

type FAQItem = {
  question: string;
  answer: string;
};

type FAQSectionProps = {
  title?: string;
  faqs?: FAQItem[];
};

const defaultFAQs: FAQItem[] = [
  {
    question: "Apa itu Forex for Better Living?",
    answer:
      "Forex for Better Living adalah sekolah trading online yang berfokus pada edukasi forex dari dasar hingga mahir. Kami menyediakan kelas, mentoring, analisa harian, dan komunitas private untuk membantu Anda membangun income yang stabil melalui trading yang benar.",
  },
  {
    question: "Apakah pemula bisa ikut belajar?",
    answer:
      "Tentu! Kurikulum kami dibuat bertahap mulai dari 0. Anda akan belajar dasar forex, membaca chart, money management, risk management, hingga strategi profit konsisten. Tidak perlu pengalaman sebelumnya.",
  },
  {
    question: "Apakah saya perlu modal besar untuk mulai trading?",
    answer:
      "Tidak. Anda bisa memulai dengan modal kecil mulai dari $10–$50 sambil fokus membangun skill terlebih dahulu. Kami mengajarkan cara mengelola modal kecil dengan risiko yang aman, step-by-step.",
  },
  {
    question: "Apakah sekolah ini menyediakan sinyal trading?",
    answer:
      "Fokus utama kami adalah edukasi, bukan ketergantungan sinyal. Namun Anda tetap mendapatkan analisa harian, pembahasan market live, dan contoh entry edukasi yang dapat membantu proses belajar Anda.",
  },
  {
    question: "Berapa lama waktu belajar sampai bisa profit konsisten?",
    answer:
      "Rata-rata siswa membutuhkan 1–3 bulan untuk memahami dasar teknik dan 3–6 bulan untuk mencapai konsistensi, tergantung waktu belajar dan latihan masing-masing. Yang penting adalah disiplin dan mengikuti roadmap yang kami berikan.",
  },
  {
    question: "Apakah setelah belajar akan dibimbing terus?",
    answer:
      "Ya! Anda akan masuk komunitas private, bisa tanya kapan saja, konsultasi personal, serta ikut live mentoring mingguan. Kami memastikan Anda tidak belajar sendirian.",
  },
  // {
  //   question: "Apakah ada sertifikat setelah menyelesaikan kelas?",
  //   answer:
  //     "Ada. Anda akan mendapatkan sertifikat digital resmi sebagai bukti telah menyelesaikan program pelatihan Forex for Better Living.",
  // },
  {
    question: "Bagaimana cara daftar kelasnya?",
    answer:
      "Anda cukup membuat akun, melakukan pendaftaran kelas, lalu Anda akan langsung mendapatkan akses dashboard pembelajaran dan group mentoring private.",
  },
];

export const FAQSection = ({
  title = "Frequently asked questions",
  faqs = defaultFAQs,
}: FAQSectionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full py-24 px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-16">
          {/* Left Column - Title */}
          <div className="lg:col-span-4">
            <h2
              className="text-[40px] leading-tight font-normal text-[#202020] tracking-tight sticky top-24"
              style={{
                fontFamily: "var(--font-figtree), Figtree",
                fontWeight: "400",
                fontSize: "40px",
              }}
            >
              {title}
            </h2>
          </div>

          {/* Right Column - FAQ Items */}
          <div className="lg:col-span-8">
            <div className="space-y-0">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border-b border-[#e5e5e5] last:border-b-0"
                >
                  {/* Question */}
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between py-6 text-left group hover:opacity-70 transition-opacity duration-150"
                    aria-expanded={openIndex === index}
                  >
                    <span
                      className="text-lg leading-7 text-[#202020] pr-8"
                      style={{
                        fontFamily: "var(--font-figtree), Figtree",
                        fontWeight: "400",
                      }}
                    >
                      {faq.question}
                    </span>

                    <motion.div
                      animate={{
                        rotate: openIndex === index ? 45 : 0,
                      }}
                      transition={{
                        duration: 0.2,
                        ease: [0.4, 0, 0.2, 1],
                      }}
                      className="shrink-0"
                    >
                      <Plus
                        className="w-6 h-6 text-[#202020]"
                        strokeWidth={1.5}
                      />
                    </motion.div>
                  </button>

                  {/* Answer */}
                  <AnimatePresence initial={false}>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.3,
                          ease: [0.4, 0, 0.2, 1],
                        }}
                        className="overflow-hidden"
                      >
                        <div className="pb-6 pr-12">
                          <p
                            className="text-lg leading-6 text-[#666666]"
                            style={{
                              fontFamily: "var(--font-figtree), Figtree",
                            }}
                          >
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
