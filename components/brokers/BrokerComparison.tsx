// // // components/brokers/BrokerComparison.tsx
// // "use client";

// // import { useState } from "react";
// // import { motion } from "framer-motion";
// // import { Check, X, ChevronDown, ChevronUp } from "lucide-react";
// // import { brokers } from "@/types/brokers";

// // export default function BrokerComparison() {
// //   const [isExpanded, setIsExpanded] = useState(false);
// //   const [selectedBrokers, setSelectedBrokers] = useState([
// //     "xm",
// //     "exness",
// //     "fbs",
// //   ]);

// //   const toggleBroker = (id: string) => {
// //     if (selectedBrokers.includes(id)) {
// //       if (selectedBrokers.length > 2) {
// //         setSelectedBrokers(selectedBrokers.filter((b) => b !== id));
// //       }
// //     } else if (selectedBrokers.length < 4) {
// //       setSelectedBrokers([...selectedBrokers, id]);
// //     }
// //   };

// //   const comparisonData = brokers.filter((b) => selectedBrokers.includes(b.id));

// //   return (
// //     <section className="py-16 bg-gradient-to-b from-[#f8fafc] to-white">
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //         <motion.div
// //           initial={{ opacity: 0, y: 20 }}
// //           whileInView={{ opacity: 1, y: 0 }}
// //           viewport={{ once: true }}
// //           className="text-center mb-10"
// //         >
// //           <h2
// //             className="text-3xl font-bold text-[#111A4A] mb-4"
// //             style={{ fontFamily: "var(--font-figtree), Figtree" }}
// //           >
// //             Bandingkan Broker
// //           </h2>
// //           <p className="text-gray-600 max-w-2xl mx-auto">
// //             Pilih hingga 4 broker untuk membandingkan fitur dan layanan mereka
// //             secara berdampingan.
// //           </p>
// //         </motion.div>

// //         {/* Broker Selector */}
// //         <div className="flex flex-wrap justify-center gap-3 mb-8">
// //           {brokers.map((broker) => (
// //             <button
// //               key={broker.id}
// //               onClick={() => toggleBroker(broker.id)}
// //               className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
// //                 selectedBrokers.includes(broker.id)
// //                   ? "bg-[#156d95] text-white shadow-lg shadow-[#156d95]/25"
// //                   : "bg-white text-gray-600 border border-gray-200 hover:border-[#156d95] hover:text-[#156d95]"
// //               }`}
// //             >
// //               {broker.name}
// //             </button>
// //           ))}
// //         </div>

// //         {/* Comparison Table */}
// //         <motion.div
// //           layout
// //           className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
// //         >
// //           <div className="overflow-x-auto">
// //             <table className="w-full">
// //               <thead>
// //                 <tr className="bg-gradient-to-r from-[#156d95] to-[#111A4A] text-white">
// //                   <th className="px-6 py-4 text-left font-semibold">Fitur</th>
// //                   {comparisonData.map((broker) => (
// //                     <th
// //                       key={broker.id}
// //                       className="px-6 py-4 text-center font-semibold min-w-[150px]"
// //                     >
// //                       {broker.name}
// //                     </th>
// //                   ))}
// //                 </tr>
// //               </thead>
// //               <tbody className="divide-y divide-gray-100">
// //                 <tr>
// //                   <td className="px-6 py-4 font-medium text-gray-700">
// //                     Rating
// //                   </td>
// //                   {comparisonData.map((broker) => (
// //                     <td key={broker.id} className="px-6 py-4 text-center">
// //                       <span className="text-[#156d95] font-bold">
// //                         {broker.rating}
// //                       </span>
// //                       <span className="text-gray-400 text-sm">/5</span>
// //                     </td>
// //                   ))}
// //                 </tr>
// //                 <tr className="bg-gray-50/50">
// //                   <td className="px-6 py-4 font-medium text-gray-700">
// //                     Min. Deposit
// //                   </td>
// //                   {comparisonData.map((broker) => (
// //                     <td
// //                       key={broker.id}
// //                       className="px-6 py-4 text-center font-semibold text-[#111A4A]"
// //                     >
// //                       {broker.minDeposit}
// //                     </td>
// //                   ))}
// //                 </tr>
// //                 <tr>
// //                   <td className="px-6 py-4 font-medium text-gray-700">
// //                     Spread
// //                   </td>
// //                   {comparisonData.map((broker) => (
// //                     <td key={broker.id} className="px-6 py-4 text-center">
// //                       <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
// //                         {broker.spread}
// //                       </span>
// //                     </td>
// //                   ))}
// //                 </tr>
// //                 <tr className="bg-gray-50/50">
// //                   <td className="px-6 py-4 font-medium text-gray-700">
// //                     Leverage
// //                   </td>
// //                   {comparisonData.map((broker) => (
// //                     <td
// //                       key={broker.id}
// //                       className="px-6 py-4 text-center font-semibold text-[#111A4A]"
// //                     >
// //                       {broker.leverage}
// //                     </td>
// //                   ))}
// //                 </tr>
// //                 <tr>
// //                   <td className="px-6 py-4 font-medium text-gray-700">
// //                     Regulasi
// //                   </td>
// //                   {comparisonData.map((broker) => (
// //                     <td key={broker.id} className="px-6 py-4 text-center">
// //                       <div className="flex flex-wrap justify-center gap-1">
// //                         {broker.regulation.map((reg) => (
// //                           <span
// //                             key={reg}
// //                             className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
// //                           >
// //                             {reg}
// //                           </span>
// //                         ))}
// //                       </div>
// //                     </td>
// //                   ))}
// //                 </tr>

// //                 {isExpanded && (
// //                   <>
// //                     <tr className="bg-gray-50/50">
// //                       <td className="px-6 py-4 font-medium text-gray-700">
// //                         Bonus
// //                       </td>
// //                       {comparisonData.map((broker) => (
// //                         <td key={broker.id} className="px-6 py-4 text-center">
// //                           {broker.features.some((f) =>
// //                             f.toLowerCase().includes("bonus"),
// //                           ) ? (
// //                             <Check className="w-5 h-5 text-green-500 mx-auto" />
// //                           ) : (
// //                             <X className="w-5 h-5 text-gray-300 mx-auto" />
// //                           )}
// //                         </td>
// //                       ))}
// //                     </tr>
// //                     <tr>
// //                       <td className="px-6 py-4 font-medium text-gray-700">
// //                         Copy Trading
// //                       </td>
// //                       {comparisonData.map((broker) => (
// //                         <td key={broker.id} className="px-6 py-4 text-center">
// //                           {broker.features.some((f) =>
// //                             f.toLowerCase().includes("copy"),
// //                           ) ? (
// //                             <Check className="w-5 h-5 text-green-500 mx-auto" />
// //                           ) : (
// //                             <X className="w-5 h-5 text-gray-300 mx-auto" />
// //                           )}
// //                         </td>
// //                       ))}
// //                     </tr>
// //                     <tr className="bg-gray-50/50">
// //                       <td className="px-6 py-4 font-medium text-gray-700">
// //                         MT4/MT5
// //                       </td>
// //                       {comparisonData.map((broker) => (
// //                         <td key={broker.id} className="px-6 py-4 text-center">
// //                           {broker.features.some(
// //                             (f) =>
// //                               f.toLowerCase().includes("mt4") ||
// //                               f.toLowerCase().includes("mt5"),
// //                           ) ? (
// //                             <Check className="w-5 h-5 text-green-500 mx-auto" />
// //                           ) : (
// //                             <X className="w-5 h-5 text-gray-300 mx-auto" />
// //                           )}
// //                         </td>
// //                       ))}
// //                     </tr>
// //                   </>
// //                 )}
// //               </tbody>
// //             </table>
// //           </div>

// //           {/* Expand Button */}
// //           <button
// //             onClick={() => setIsExpanded(!isExpanded)}
// //             className="w-full py-3 text-sm font-medium text-[#156d95] hover:text-[#111A4A] hover:bg-gray-50 transition-colors flex items-center justify-center gap-1 border-t border-gray-100"
// //           >
// //             {isExpanded ? (
// //               <>
// //                 Sembunyikan Detail <ChevronUp size={16} />
// //               </>
// //             ) : (
// //               <>
// //                 Lihat Perbandingan Lengkap <ChevronDown size={16} />
// //               </>
// //             )}
// //           </button>
// //         </motion.div>
// //       </div>
// //     </section>
// //   );
// // }

// // components/brokers/BrokerComparison.tsx
// "use client";

// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Check, X, ChevronDown, ChevronUp } from "lucide-react";
// import { useTranslations } from "next-intl";
// import { brokers } from "@/types/brokers";

// export default function BrokerComparison() {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [selectedBrokers, setSelectedBrokers] = useState([
//     "xm",
//     "exness",
//     "fbs",
//   ]);

//   const t = useTranslations("Broker");

//   const toggleBroker = (id: string) => {
//     if (selectedBrokers.includes(id)) {
//       if (selectedBrokers.length > 2) {
//         setSelectedBrokers(selectedBrokers.filter((b) => b !== id));
//       }
//     } else if (selectedBrokers.length < 4) {
//       setSelectedBrokers([...selectedBrokers, id]);
//     }
//   };

//   const comparisonData = brokers.filter((b) => selectedBrokers.includes(b.id));

//   return (
//     <section className="py-16 bg-gradient-to-b from-[#f8fafc] to-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="text-center mb-10"
//         >
//           <h2
//             className="text-3xl font-bold text-[#111A4A] mb-4"
//             style={{ fontFamily: "var(--font-figtree), Figtree" }}
//           >
//             {t("compareBrokers")}
//           </h2>
//           <p className="text-gray-600 max-w-2xl mx-auto">{t("compareDesc")}</p>
//         </motion.div>

//         {/* Broker Selector */}
//         <div className="flex flex-wrap justify-center gap-3 mb-8">
//           {brokers.map((broker) => (
//             <button
//               key={broker.id}
//               onClick={() => toggleBroker(broker.id)}
//               className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
//                 selectedBrokers.includes(broker.id)
//                   ? "bg-[#156d95] text-white shadow-lg shadow-[#156d95]/25"
//                   : "bg-white text-gray-600 border border-gray-200 hover:border-[#156d95] hover:text-[#156d95]"
//               }`}
//             >
//               {broker.name}
//             </button>
//           ))}
//         </div>

//         {/* Comparison Table */}
//         <motion.div
//           layout
//           className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
//         >
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="bg-gradient-to-r from-[#156d95] to-[#111A4A] text-white">
//                   <th className="px-6 py-4 text-left font-semibold">
//                     {t("feature")}
//                   </th>
//                   {comparisonData.map((broker) => (
//                     <th
//                       key={broker.id}
//                       className="px-6 py-4 text-center font-semibold min-w-[150px]"
//                     >
//                       {broker.name}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-100">
//                 <tr>
//                   <td className="px-6 py-4 font-medium text-gray-700">
//                     {t("rating")}
//                   </td>
//                   {comparisonData.map((broker) => (
//                     <td key={broker.id} className="px-6 py-4 text-center">
//                       <span className="text-[#156d95] font-bold">
//                         {broker.rating}
//                       </span>
//                       <span className="text-gray-400 text-sm">/5</span>
//                     </td>
//                   ))}
//                 </tr>
//                 <tr className="bg-gray-50/50">
//                   <td className="px-6 py-4 font-medium text-gray-700">
//                     {t("minDeposit")}
//                   </td>
//                   {comparisonData.map((broker) => (
//                     <td
//                       key={broker.id}
//                       className="px-6 py-4 text-center font-semibold text-[#111A4A]"
//                     >
//                       {broker.minDeposit}
//                     </td>
//                   ))}
//                 </tr>
//                 <tr>
//                   <td className="px-6 py-4 font-medium text-gray-700">
//                     {t("spread")}
//                   </td>
//                   {comparisonData.map((broker) => (
//                     <td key={broker.id} className="px-6 py-4 text-center">
//                       <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                         {broker.spread}
//                       </span>
//                     </td>
//                   ))}
//                 </tr>
//                 <tr className="bg-gray-50/50">
//                   <td className="px-6 py-4 font-medium text-gray-700">
//                     {t("leverage")}
//                   </td>
//                   {comparisonData.map((broker) => (
//                     <td
//                       key={broker.id}
//                       className="px-6 py-4 text-center font-semibold text-[#111A4A]"
//                     >
//                       {broker.leverage}
//                     </td>
//                   ))}
//                 </tr>
//                 <tr>
//                   <td className="px-6 py-4 font-medium text-gray-700">
//                     {t("regulationLabel")}
//                   </td>
//                   {comparisonData.map((broker) => (
//                     <td key={broker.id} className="px-6 py-4 text-center">
//                       <div className="flex flex-wrap justify-center gap-1">
//                         {broker.regulation.map((reg) => (
//                           <span
//                             key={reg}
//                             className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
//                           >
//                             {reg}
//                           </span>
//                         ))}
//                       </div>
//                     </td>
//                   ))}
//                 </tr>

//                 {isExpanded && (
//                   <>
//                     <tr className="bg-gray-50/50">
//                       <td className="px-6 py-4 font-medium text-gray-700">
//                         {t("bonus")}
//                       </td>
//                       {comparisonData.map((broker) => (
//                         <td key={broker.id} className="px-6 py-4 text-center">
//                           {broker.features.some((f) =>
//                             f.toLowerCase().includes("bonus"),
//                           ) ? (
//                             <Check className="w-5 h-5 text-green-500 mx-auto" />
//                           ) : (
//                             <X className="w-5 h-5 text-gray-300 mx-auto" />
//                           )}
//                         </td>
//                       ))}
//                     </tr>
//                     <tr>
//                       <td className="px-6 py-4 font-medium text-gray-700">
//                         {t("copyTrading")}
//                       </td>
//                       {comparisonData.map((broker) => (
//                         <td key={broker.id} className="px-6 py-4 text-center">
//                           {broker.features.some((f) =>
//                             f.toLowerCase().includes("copy"),
//                           ) ? (
//                             <Check className="w-5 h-5 text-green-500 mx-auto" />
//                           ) : (
//                             <X className="w-5 h-5 text-gray-300 mx-auto" />
//                           )}
//                         </td>
//                       ))}
//                     </tr>
//                     <tr className="bg-gray-50/50">
//                       <td className="px-6 py-4 font-medium text-gray-700">
//                         {t("mt4mt5")}
//                       </td>
//                       {comparisonData.map((broker) => (
//                         <td key={broker.id} className="px-6 py-4 text-center">
//                           {broker.features.some(
//                             (f) =>
//                               f.toLowerCase().includes("mt4") ||
//                               f.toLowerCase().includes("mt5"),
//                           ) ? (
//                             <Check className="w-5 h-5 text-green-500 mx-auto" />
//                           ) : (
//                             <X className="w-5 h-5 text-gray-300 mx-auto" />
//                           )}
//                         </td>
//                       ))}
//                     </tr>
//                   </>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Expand Button */}
//           <button
//             onClick={() => setIsExpanded(!isExpanded)}
//             className="w-full py-3 text-sm font-medium text-[#156d95] hover:text-[#111A4A] hover:bg-gray-50 transition-colors flex items-center justify-center gap-1 border-t border-gray-100"
//           >
//             {isExpanded ? (
//               <>
//                 {t("hideDetails")} <ChevronUp size={16} />
//               </>
//             ) : (
//               <>
//                 {t("viewFullComparison")} <ChevronDown size={16} />
//               </>
//             )}
//           </button>
//         </motion.div>
//       </div>
//     </section>
//   );
// }

// components/brokers/BrokerComparison.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, X, ChevronDown, ChevronUp } from "lucide-react";
import { useTranslations } from "next-intl";
import { brokers } from "@/types/brokers";

export default function BrokerComparison() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedBrokers, setSelectedBrokers] = useState([
    "xm",
    "exness",
    "fbs",
  ]);

  const t = useTranslations("Broker");

  const toggleBroker = (id: string) => {
    if (selectedBrokers.includes(id)) {
      if (selectedBrokers.length > 2) {
        setSelectedBrokers(selectedBrokers.filter((b) => b !== id));
      }
    } else if (selectedBrokers.length < 4) {
      setSelectedBrokers([...selectedBrokers, id]);
    }
  };

  const comparisonData = brokers.filter((b) => selectedBrokers.includes(b.id));

  return (
    <section className="py-16 bg-gradient-to-b from-[#f8fafc] to-white dark:from-[#050508] dark:to-[#0a0a1a] transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2
            className="text-3xl font-bold text-[#111A4A] dark:text-white mb-4"
            style={{ fontFamily: "var(--font-figtree), Figtree" }}
          >
            {t("compareBrokers")}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{t("compareDesc")}</p>
        </motion.div>

        {/* Broker Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {brokers.map((broker) => (
            <button
              key={broker.id}
              onClick={() => toggleBroker(broker.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedBrokers.includes(broker.id)
                  ? "bg-[#156d95] dark:bg-[#22d3a8] text-white dark:text-gray-900 shadow-lg shadow-[#156d95]/25 dark:shadow-[#22d3a8]/25"
                  : "bg-white dark:bg-[#0a0a1a] text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-white/10 hover:border-[#156d95] dark:hover:border-[#22d3a8] hover:text-[#156d95] dark:hover:text-[#22d3a8]"
              }`}
            >
              {broker.name}
            </button>
          ))}
        </div>

        {/* Comparison Table */}
        <motion.div
          layout
          className="bg-white dark:bg-[#0a0a1a] rounded-2xl shadow-xl dark:shadow-2xl dark:shadow-black/50 border border-gray-100 dark:border-white/10 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-[#156d95] dark:from-white/5 to-[#111A4A] dark:to-transparent text-white border-b dark:border-white/10">
                  <th className="px-6 py-4 text-left font-semibold">
                    {t("feature")}
                  </th>
                  {comparisonData.map((broker) => (
                    <th
                      key={broker.id}
                      className="px-6 py-4 text-center font-semibold min-w-[150px]"
                    >
                      {broker.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-white/10">
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-700 dark:text-gray-300">
                    {t("rating")}
                  </td>
                  {comparisonData.map((broker) => (
                    <td key={broker.id} className="px-6 py-4 text-center">
                      <span className="text-[#156d95] dark:text-[#22d3a8] font-bold">
                        {broker.rating}
                      </span>
                      <span className="text-gray-400 dark:text-gray-500 text-sm">/5</span>
                    </td>
                  ))}
                </tr>
                <tr className="bg-gray-50/50 dark:bg-white/5">
                  <td className="px-6 py-4 font-medium text-gray-700 dark:text-gray-300">
                    {t("minDeposit")}
                  </td>
                  {comparisonData.map((broker) => (
                    <td
                      key={broker.id}
                      className="px-6 py-4 text-center font-semibold text-[#111A4A] dark:text-white"
                    >
                      {broker.minDeposit}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-700 dark:text-gray-300">
                    {t("spread")}
                  </td>
                  {comparisonData.map((broker) => (
                    <td key={broker.id} className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-400/10 text-green-800 dark:text-green-400">
                        {broker.spread}
                      </span>
                    </td>
                  ))}
                </tr>
                <tr className="bg-gray-50/50 dark:bg-white/5">
                  <td className="px-6 py-4 font-medium text-gray-700 dark:text-gray-300">
                    {t("leverage")}
                  </td>
                  {comparisonData.map((broker) => (
                    <td
                      key={broker.id}
                      className="px-6 py-4 text-center font-semibold text-[#111A4A] dark:text-white"
                    >
                      {broker.leverage}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-700 dark:text-gray-300">
                    {t("regulationLabel")}
                  </td>
                  {comparisonData.map((broker) => (
                    <td key={broker.id} className="px-6 py-4 text-center">
                      <div className="flex flex-wrap justify-center gap-1">
                        {broker.regulation.map((reg) => (
                          <span
                            key={reg}
                            className="text-xs bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 px-2 py-1 rounded"
                          >
                            {reg}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>

                {isExpanded && (
                  <>
                    <tr className="bg-gray-50/50 dark:bg-white/5">
                      <td className="px-6 py-4 font-medium text-gray-700 dark:text-gray-300">
                        {t("bonus")}
                      </td>
                      {comparisonData.map((broker) => (
                        <td key={broker.id} className="px-6 py-4 text-center">
                          {broker.features.some((f) =>
                            f.toLowerCase().includes("bonus"),
                          ) ? (
                            <Check className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-gray-300 dark:text-gray-600 mx-auto" />
                          )}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium text-gray-700 dark:text-gray-300">
                        {t("copyTrading")}
                      </td>
                      {comparisonData.map((broker) => (
                        <td key={broker.id} className="px-6 py-4 text-center">
                          {broker.features.some((f) =>
                            f.toLowerCase().includes("copy"),
                          ) ? (
                            <Check className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-gray-300 dark:text-gray-600 mx-auto" />
                          )}
                        </td>
                      ))}
                    </tr>
                    <tr className="bg-gray-50/50 dark:bg-white/5">
                      <td className="px-6 py-4 font-medium text-gray-700 dark:text-gray-300">
                        {t("mt4mt5")}
                      </td>
                      {comparisonData.map((broker) => (
                        <td key={broker.id} className="px-6 py-4 text-center">
                          {broker.features.some(
                            (f) =>
                              f.toLowerCase().includes("mt4") ||
                              f.toLowerCase().includes("mt5"),
                          ) ? (
                            <Check className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-gray-300 dark:text-gray-600 mx-auto" />
                          )}
                        </td>
                      ))}
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>

          {/* Expand Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full py-3 text-sm font-medium text-[#156d95] dark:text-[#22d3a8] hover:text-[#111A4A] dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-colors flex items-center justify-center gap-1 border-t border-gray-100 dark:border-white/10"
          >
            {isExpanded ? (
              <>
                {t("hideDetails")} <ChevronUp size={16} />
              </>
            ) : (
              <>
                {t("viewFullComparison")} <ChevronDown size={16} />
              </>
            )}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
