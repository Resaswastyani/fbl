// // app/broker-recommendation/page.tsx

// "use client";

// import { Header } from "@/components/Header";
// import Footer from "@/components/Footer";
// import BrokerCard from "@/components/brokers/BrokerCard";
// import BrokerComparison from "@/components/brokers/BrokerComparison";
// import { brokers } from "@/types/brokers";
// import { motion } from "framer-motion";
// import { Shield, TrendingUp, Award, AlertCircle } from "lucide-react";

// export default function BrokerRecommendationPage() {
//   return (
//     <>
//       <main className="min-h-screen bg-white pt-35 md:pt-40">
//         {" "}
//         {/* ✅ TAMBAHKAN pt-20 atau pt-24 */}
//         {/* Hero Section */}
//         <section className="relative bg-gradient-to-br from-[#111A4A] via-[#156d95] to-[#0d5a7c] pb-20 overflow-hidden">
//           {/* Background Pattern */}
//           <div className="absolute inset-0 opacity-10">
//             <div
//               className="absolute inset-0"
//               style={{
//                 backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
//               }}
//             />
//           </div>

//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//             <div className="text-center max-w-3xl mx-auto">
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6 }}
//               >
//                 <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white text-sm font-medium px-4 py-2 rounded-full mb-6">
//                   <Award size={16} />
//                   Broker Terverifikasi & Teregulasi
//                 </span>

//                 <h1
//                   className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
//                   style={{ fontFamily: "var(--font-figtree), Figtree" }}
//                 >
//                   Rekomendasi Broker Forex{" "}
//                   <span className="text-[#7dd3fc]">Terbaik 2026</span>
//                 </h1>

//                 <p
//                   className="text-lg md:text-xl text-white/80 leading-relaxed mb-8"
//                   style={{ fontFamily: "var(--font-figtree), Figtree" }}
//                 >
//                   Pilihan broker forex terpercaya dengan regulasi resmi, spread
//                   kompetitif, dan layanan optimal untuk trader Indonesia.
//                 </p>

//                 {/* Trust Indicators */}
//                 <div className="flex flex-wrap justify-center gap-6 text-white/90">
//                   <div className="flex items-center gap-2">
//                     <Shield className="w-5 h-5 text-[#7dd3fc]" />
//                     <span className="text-sm font-medium">
//                       Regulasi Internasional
//                     </span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <TrendingUp className="w-5 h-5 text-[#7dd3fc]" />
//                     <span className="text-sm font-medium">
//                       Spread Mulai 0.0 Pips
//                     </span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Award className="w-5 h-5 text-[#7dd3fc]" />
//                     <span className="text-sm font-medium">
//                       Teruji & Terpercaya
//                     </span>
//                   </div>
//                 </div>
//               </motion.div>
//             </div>
//           </div>

//           {/* Wave Bottom */}
//           <div className="absolute bottom-0 left-0 right-0">
//             <svg
//               viewBox="0 0 1440 120"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
//                 fill="white"
//               />
//             </svg>
//           </div>
//         </section>
//         {/* Rest of your code... */}
//         {/* Disclaimer Alert */}
//         <section className="py-6 bg-amber-50 border-y border-amber-100">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex items-start gap-3">
//               <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
//               <div>
//                 <p className="text-sm text-amber-800 font-medium mb-1">
//                   Peringatan Risiko
//                 </p>
//                 <p className="text-sm text-amber-700">
//                   Trading forex memiliki risiko tinggi. Pastikan Anda memahami
//                   risiko sebelum memulai. Broker yang direkomendasikan telah
//                   terverifikasi regulasi namun tidak menjamin keuntungan.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>
//         {/* Broker Cards Grid */}
//         <section className="py-16 md:py-24">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="text-center mb-12">
//               <h2
//                 className="text-3xl font-bold text-[#111A4A] mb-4"
//                 style={{ fontFamily: "var(--font-figtree), Figtree" }}
//               >
//                 Pilihan Broker Terbaik
//               </h2>
//               <p className="text-gray-600 max-w-2xl mx-auto">
//                 Kami telah menyeleksi broker-broker berikut berdasarkan
//                 regulasi, kondisi trading, dan layanan untuk trader Indonesia.
//               </p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
//               {brokers.map((broker, index) => (
//                 <BrokerCard key={broker.id} broker={broker} index={index} />
//               ))}
//             </div>
//           </div>
//         </section>
//         {/* Comparison Section */}
//         <BrokerComparison />
//         {/* Why Choose Us */}
//         <section className="py-16 bg-gradient-to-b from-white to-[#f8fafc]">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="text-center mb-12">
//               <h2
//                 className="text-3xl font-bold text-[#111A4A] mb-4"
//                 style={{ fontFamily: "var(--font-figtree), Figtree" }}
//               >
//                 Kriteria Pemilihan Broker
//               </h2>
//               <p className="text-gray-600">
//                 Standar ketat dalam merekomendasikan broker untuk Anda
//               </p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//               {[
//                 {
//                   icon: Shield,
//                   title: "Regulasi Resmi",
//                   desc: "Broker harus memiliki lisensi dari regulator terpercaya seperti FCA, ASIC, atau CySEC.",
//                 },
//                 {
//                   icon: TrendingUp,
//                   title: "Kondisi Trading",
//                   desc: "Spread kompetitif, eksekusi cepat, dan leverage yang sesuai untuk berbagai strategi.",
//                 },
//                 {
//                   icon: Award,
//                   title: "Reputasi",
//                   desc: "Track record minimal 5 tahun dengan review positif dari komunitas trader.",
//                 },
//                 {
//                   icon: "support",
//                   title: "Layanan Lokal",
//                   desc: "Support Bahasa Indonesia dan metode deposit/withdrawal via bank lokal.",
//                 },
//               ].map((item, idx) => (
//                 <motion.div
//                   key={idx}
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: idx * 0.1 }}
//                   className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
//                 >
//                   <div className="w-12 h-12 bg-gradient-to-br from-[#156d95] to-[#111A4A] rounded-lg flex items-center justify-center mb-4">
//                     {item.icon === "support" ? (
//                       <svg
//                         className="w-6 h-6 text-white"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
//                         />
//                       </svg>
//                     ) : (
//                       <item.icon className="w-6 h-6 text-white" />
//                     )}
//                   </div>
//                   <h3
//                     className="font-semibold text-[#111A4A] mb-2"
//                     style={{ fontFamily: "var(--font-figtree), Figtree" }}
//                   >
//                     {item.title}
//                   </h3>
//                   <p className="text-sm text-gray-600 leading-relaxed">
//                     {item.desc}
//                   </p>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </section>
//         {/* CTA Section */}
//         <section className="py-16 bg-gradient-to-r from-[#156d95] to-[#111A4A]">
//           <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//             <h2
//               className="text-3xl font-bold text-white mb-4"
//               style={{ fontFamily: "var(--font-figtree), Figtree" }}
//             >
//               Masih Bingung Memilih Broker?
//             </h2>
//             <p className="text-white/80 mb-8 text-lg">
//               Konsultasikan kebutuhan trading Anda dengan tim expert kami secara
//               gratis.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <a
//                 href="https://wa.me/6281234567890?text=Hi%20Admin%20FBL,%20saya%20ingin%20konsultasi%20memilih%20broker"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-flex items-center justify-center bg-white text-[#156d95] font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
//               >
//                 Konsultasi Gratis
//               </a>
//               <a
//                 href="/professional-course"
//                 className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-colors"
//               >
//                 Pelajari Trading Dulu
//               </a>
//             </div>
//           </div>
//         </section>
//       </main>
//     </>
//   );
// }

// app/broker-recommendation/page.tsx

"use client";

import { useTranslations } from "next-intl";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import BrokerCard from "@/components/brokers/BrokerCard";
import BrokerComparison from "@/components/brokers/BrokerComparison";
import { brokers } from "@/types/brokers";
import { motion } from "framer-motion";
import { Shield, TrendingUp, Award, AlertCircle } from "lucide-react";

export default function BrokerRecommendationPage() {
  const t = useTranslations("Broker");

  return (
    <>
      <main className="min-h-screen bg-white dark:bg-[#050508] transition-colors duration-500 pt-35 md:pt-40">
        {" "}
        {/* ✅ TAMBAHKAN pt-20 atau pt-24 */}
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

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white text-sm font-medium px-4 py-2 rounded-full mb-6">
                  <Award size={16} />
                  {t("verified")}
                </span>

                <h1
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
                  style={{ fontFamily: "var(--font-figtree), Figtree" }}
                >
                  {t.rich("heroTitle", {
                    highlight: (chunks) => (
                      <span className="text-[#7dd3fc]">{chunks}</span>
                    ),
                  })}
                </h1>

                <p
                  className="text-lg md:text-xl text-white/80 leading-relaxed mb-8"
                  style={{ fontFamily: "var(--font-figtree), Figtree" }}
                >
                  {t("heroSubtitle")}
                </p>

                {/* Trust Indicators */}
                <div className="flex flex-wrap justify-center gap-6 text-white/90">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-[#7dd3fc]" />
                    <span className="text-sm font-medium">
                      {t("regulation")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-[#7dd3fc]" />
                    <span className="text-sm font-medium">
                      {t("spreadsFrom")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-[#7dd3fc]" />
                    <span className="text-sm font-medium">
                      {t("testedTrusted")}
                    </span>
                  </div>
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
              <path className="hidden dark:block"
                d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
                fill="#050508"
              />
            </svg>
          </div>
        </section>
        {/* Rest of your code... */}
        {/* Disclaimer Alert */}
        <section className="py-6 bg-amber-50 border-y border-amber-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-amber-800 font-medium mb-1">
                  {t("riskWarningTitle")}
                </p>
                <p className="text-sm text-amber-700">{t("riskWarningText")}</p>
              </div>
            </div>
          </div>
        </section>
        {/* Broker Cards Grid */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2
                className="text-3xl font-bold text-[#111A4A] mb-4"
                style={{ fontFamily: "var(--font-figtree), Figtree" }}
              >
                {t("bestChoices")}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                {t("bestChoicesDesc")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {brokers.map((broker, index) => (
                <BrokerCard key={broker.id} broker={broker} index={index} />
              ))}
            </div>
          </div>
        </section>
        {/* Comparison Section */}
        <BrokerComparison />
        {/* Why Choose Us */}
        <section className="py-16 bg-gradient-to-b from-white dark:from-[#050508] to-[#f8fafc] dark:to-[#090910]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2
                className="text-3xl font-bold text-[#111A4A] dark:text-white mb-4"
                style={{ fontFamily: "var(--font-figtree), Figtree" }}
              >
                {t("selectionCriteria")}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">{t("selectionCriteriaDesc")}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Shield,
                  title: t("officialRegulation"),
                  desc: t("officialRegulationDesc"),
                },
                {
                  icon: TrendingUp,
                  title: t("tradingConditions"),
                  desc: t("tradingConditionsDesc"),
                },
                {
                  icon: Award,
                  title: t("reputation"),
                  desc: t("reputationDesc"),
                },
                {
                  icon: "support",
                  title: t("localService"),
                  desc: t("localServiceDesc"),
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white dark:bg-white/5 rounded-xl p-6 shadow-lg dark:shadow-none border border-gray-100 dark:border-white/10 hover:shadow-xl dark:hover:shadow-[0_0_20px_rgba(34,211,168,0.1)] transition-shadow"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-[#156d95] to-[#111A4A] rounded-lg flex items-center justify-center mb-4">
                    {item.icon === "support" ? (
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                    ) : (
                      <item.icon className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <h3
                    className="font-semibold text-[#111A4A] dark:text-white mb-2"
                    style={{ fontFamily: "var(--font-figtree), Figtree" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {item.desc}
                  </p>
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
              {t("confusedTitle")}
            </h2>
            <p className="text-white/80 mb-8 text-lg">{t("confusedDesc")}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/6281234567890?text=Hi%20Admin%20FBL,%20saya%20ingin%20konsultasi%20memilih%20broker"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-white text-[#156d95] font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
              >
                {t("freeConsultation")}
              </a>
              <a
                href="/professional-course"
                className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-colors"
              >
                {t("learnTradingFirst")}
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
