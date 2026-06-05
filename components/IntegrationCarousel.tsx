// // "use client"

// // import { useEffect, useRef } from "react"
// // import { motion } from "framer-motion"

// // type IntegrationApp = {
// //   name: string
// //   logo: string
// // }

// // type IntegrationCarouselProps = {
// //   buttonText?: string
// //   buttonHref?: string
// //   title?: string
// //   subtitle?: string
// //   topRowApps?: IntegrationApp[]
// //   bottomRowApps?: IntegrationApp[]
// // }

// // // helper currency svg
// // const currencyIcon = (symbol: string) =>
// //   `data:image/svg+xml;utf8,
// //   <svg xmlns='http://www.w3.org/2000/svg' width='40' height='40'>
// //     <circle cx='20' cy='20' r='18' fill='%23111111'/>
// //     <text x='50%' y='55%' text-anchor='middle'
// //       font-size='20' fill='white'
// //       font-family='Arial, Helvetica, sans-serif'>${symbol}</text>
// //   </svg>`

// // const defaultTopRowApps: IntegrationApp[] = [
// //   { name: "EUR / USD", logo: currencyIcon("€") },
// //   { name: "USD / JPY", logo: currencyIcon("¥") },
// //   { name: "GBP / USD", logo: currencyIcon("£") },
// //   { name: "AUD / USD", logo: currencyIcon("A$") },
// //   { name: "USD / CHF", logo: currencyIcon("₣") },
// //   { name: "NZD / USD", logo: currencyIcon("NZ$") },
// //   { name: "EUR / JPY", logo: currencyIcon("€") },
// //   { name: "EUR / USD", logo: currencyIcon("€") },
// //   { name: "USD / JPY", logo: currencyIcon("¥") },
// //   { name: "GBP / USD", logo: currencyIcon("£") },
// //   { name: "AUD / USD", logo: currencyIcon("A$") },
// //   { name: "USD / CHF", logo: currencyIcon("₣") },
// // ]

// // const defaultBottomRowApps: IntegrationApp[] = [
// //   { name: "XAU / USD", logo: currencyIcon("Au") },
// //   { name: "XAG / USD", logo: currencyIcon("Ag") },
// //   { name: "BTC / USD", logo: currencyIcon("₿") },
// //   { name: "ETH / USD", logo: currencyIcon("Ξ") },
// //   { name: "USD Index", logo: currencyIcon("$") },
// //   { name: "EUR Index", logo: currencyIcon("€") },
// //   { name: "JPY Index", logo: currencyIcon("¥") },
// //   { name: "XAU / USD", logo: currencyIcon("Au") },
// //   { name: "XAG / USD", logo: currencyIcon("Ag") },
// //   { name: "BTC / USD", logo: currencyIcon("₿") },
// //   { name: "ETH / USD", logo: currencyIcon("Ξ") },
// //   { name: "USD Index", logo: currencyIcon("$") },
// // ]

// // // @component: IntegrationCarousel
// // export const IntegrationCarousel = ({
// //   buttonText = "Explore Forex Markets",
// //   buttonHref = "#",
// //   title = "Trade across the global forex market.",
// //   subtitle = "Analyze major currency pairs, commodities, and crypto-linked instruments in real time with institutional-grade data.",
// //   topRowApps = defaultTopRowApps,
// //   bottomRowApps = defaultBottomRowApps,
// // }: IntegrationCarouselProps) => {
// //   const topRowRef = useRef<HTMLDivElement>(null)
// //   const bottomRowRef = useRef<HTMLDivElement>(null)

// //   useEffect(() => {
// //     let topAnimationId: number
// //     let bottomAnimationId: number
// //     let topPosition = 0
// //     let bottomPosition = 0

// //     const animateTopRow = () => {
// //       if (topRowRef.current) {
// //         topPosition -= 0.5
// //         if (Math.abs(topPosition) >= topRowRef.current.scrollWidth / 2) {
// //           topPosition = 0
// //         }
// //         topRowRef.current.style.transform = `translateX(${topPosition}px)`
// //       }
// //       topAnimationId = requestAnimationFrame(animateTopRow)
// //     }

// //     const animateBottomRow = () => {
// //       if (bottomRowRef.current) {
// //         bottomPosition -= 0.65
// //         if (Math.abs(bottomPosition) >= bottomRowRef.current.scrollWidth / 2) {
// //           bottomPosition = 0
// //         }
// //         bottomRowRef.current.style.transform = `translateX(${bottomPosition}px)`
// //       }
// //       bottomAnimationId = requestAnimationFrame(animateBottomRow)
// //     }

// //     topAnimationId = requestAnimationFrame(animateTopRow)
// //     bottomAnimationId = requestAnimationFrame(animateBottomRow)

// //     return () => {
// //       cancelAnimationFrame(topAnimationId)
// //       cancelAnimationFrame(bottomAnimationId)
// //     }
// //   }, [])

// //   return (
// //     <div className="w-full py-24 bg-white">
// //       <div className="max-w-[680px] mx-auto">
// //         <motion.div
// //           initial={{ opacity: 0, y: 30 }}
// //           whileInView={{ opacity: 1, y: 0 }}
// //           viewport={{ once: true, margin: "-100px" }}
// //           transition={{ duration: 0.6, ease: "easeOut" }}
// //           className="flex flex-col items-center mb-20"
// //         >
// //           <div className="flex flex-col items-center gap-4">
// //             <h2
// //               className="text-[40px] leading-tight font-normal text-[#222222] text-center tracking-tight mb-0"
// //               style={{ fontFamily: "var(--font-figtree), Figtree" }}
// //             >
// //               {title}
// //             </h2>

// //             <p
// //               className="text-lg leading-7 text-[#666666] text-center max-w-[600px] mt-2"
// //               style={{ fontFamily: "var(--font-figtree), Figtree" }}
// //             >
// //               {subtitle}
// //             </p>
// //           </div>

// //           <motion.div
// //             initial={{ opacity: 0, scale: 0.95 }}
// //             whileInView={{ opacity: 1, scale: 1 }}
// //             viewport={{ once: true }}
// //             transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
// //             className="flex gap-3 mt-6"
// //           >
// //             <a
// //               href={buttonHref}
// //               className="inline-block px-5 py-2.5 rounded-full bg-white text-[#222222] text-[15px] font-medium leading-6 text-center whitespace-nowrap transition-all duration-75 ease-out w-[182px] cursor-pointer hover:shadow-lg"
// //               style={{
// //                 boxShadow:
// //                   "0 -1px 0 0 rgb(181, 181, 181) inset, -1px 0 0 0 rgb(227, 227, 227) inset, 1px 0 0 0 rgb(227, 227, 227) inset, 0 1px 0 0 rgb(227, 227, 227) inset",
// //                 backgroundImage:
// //                   "linear-gradient(rgba(255, 255, 255, 0.06) 80%, rgba(255, 255, 255, 0.12))",
// //               }}
// //             >
// //               {buttonText}
// //             </a>
// //           </motion.div>
// //         </motion.div>
// //       </div>

// //       <div className="h-[268px] -mt-6 mb-0 pb-0 relative overflow-hidden">
// //         <div
// //           ref={topRowRef}
// //           className="flex items-start gap-6 absolute top-6 whitespace-nowrap"
// //           style={{ willChange: "transform" }}
// //         >
// //           {[...topRowApps, ...topRowApps].map((app, index) => (
// //             <div
// //               key={`top-${index}`}
// //               className="flex items-center justify-center w-24 h-24 rounded-3xl shrink-0"
// //               style={{
// //                 backgroundImage:
// //                   "linear-gradient(rgb(255, 255, 255), rgb(252, 252, 252))",
// //                 boxShadow:
// //                   "rgba(0, 0, 0, 0.04) 0px 0px 0px 1px, rgba(0, 0, 0, 0.04) 0px 1px 1px 0px, rgba(0, 0, 0, 0.04) 0px 3px 3px -1.4px, rgba(0, 0, 0, 0.04) 0px 6px 6px -3px, rgba(0, 0, 0, 0.04) 0px 12px 12px -6px, rgba(0, 0, 0, 0.04) 0px 12px 12px -12px",
// //               }}
// //             >
// //               <img
// //                 src={app.logo}
// //                 alt={app.name}
// //                 className="w-9 h-9 block object-contain"
// //               />
// //             </div>
// //           ))}
// //         </div>

// //         <div
// //           className="absolute top-0 right-0 bottom-0 w-60 h-[268px] z-10 pointer-events-none"
// //           style={{
// //             backgroundImage:
// //               "linear-gradient(90deg, rgba(0, 0, 0, 0), rgb(255, 255, 255))",
// //           }}
// //         />

// //         <div
// //           className="absolute top-0 left-0 bottom-0 w-60 h-[268px] z-10 pointer-events-none"
// //           style={{
// //             backgroundImage:
// //               "linear-gradient(90deg, rgb(255, 255, 255), rgba(0, 0, 0, 0))",
// //           }}
// //         />

// //         <div
// //           ref={bottomRowRef}
// //           className="flex items-start gap-6 absolute top-[148px] whitespace-nowrap"
// //           style={{ willChange: "transform" }}
// //         >
// //           {[...bottomRowApps, ...bottomRowApps].map((app, index) => (
// //             <div
// //               key={`bottom-${index}`}
// //               className="flex items-center justify-center w-24 h-24 rounded-3xl shrink-0"
// //               style={{
// //                 backgroundImage:
// //                   "linear-gradient(rgb(255, 255, 255), rgb(252, 252, 252))",
// //                 boxShadow:
// //                   "rgba(0, 0, 0, 0.04) 0px 0px 0px 1px, rgba(0, 0, 0, 0.04) 0px 1px 1px 0px, rgba(0, 0, 0, 0.04) 0px 3px 3px -1.4px, rgba(0, 0, 0, 0.04) 0px 6px 6px -3px, rgba(0, 0, 0, 0.04) 0px 12px 12px -6px, rgba(0, 0, 0, 0.04) 0px 12px 12px -12px",
// //               }}
// //             >
// //               <img
// //                 src={app.logo}
// //                 alt={app.name}
// //                 className="w-9 h-9 block object-contain"
// //               />
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// "use client";

// import { useEffect, useRef } from "react";
// import { motion } from "framer-motion";

// type IntegrationApp = {
//   name: string;
//   logo: string;
// };

// type IntegrationCarouselProps = {
//   buttonText?: string;
//   buttonHref?: string;
//   title?: string;
//   subtitle?: string;
//   topRowApps?: IntegrationApp[];
//   bottomRowApps?: IntegrationApp[];
// };

// // Logo broker dari folder public
// const defaultTopRowApps: IntegrationApp[] = [
//   { name: "Exness", logo: "/brokers/exness.png" },
//   { name: "IC Markets", logo: "/brokers/icm.jpeg" },
//   { name: "XM", logo: "/brokers/xm.png" },
//   { name: "HFM", logo: "/brokers/hfm.jpg" },
//   { name: "FBS", logo: "/brokers/fbs.png" },
//   // { name: "OctaFX", logo: "/brokers/octafx.png" },
//   { name: "Exness", logo: "/brokers/exness.png" },
//   { name: "IC Markets", logo: "/brokers/icm.jpeg" },
//   { name: "XM", logo: "/brokers/xm.png" },
//   { name: "HFM", logo: "/brokers/hfm.jpg" },
//   { name: "FBS", logo: "/brokers/fbs.png" },
//   // { name: "OctaFX", logo: "/brokers/octafx.png" },
// ];

// const defaultBottomRowApps: IntegrationApp[] = [
//   { name: "Exness", logo: "/brokers/exness.png" },
//   { name: "IC Markets", logo: "/brokers/icm.jpeg" },
//   { name: "XM", logo: "/brokers/xm.png" },
//   { name: "HFM", logo: "/brokers/hfm.jpg" },
//   { name: "FBS", logo: "/brokers/fbs.png" },
//   // { name: "OctaFX", logo: "/brokers/octafx.png" },
//   { name: "Exness", logo: "/brokers/exness.png" },
//   { name: "IC Markets", logo: "/brokers/icm.jpeg" },
//   { name: "XM", logo: "/brokers/xm.png" },
//   { name: "HFM", logo: "/brokers/hfm.jpg" },
//   { name: "FBS", logo: "/brokers/fbs.png" },
//   // { name: "OctaFX", logo: "/brokers/octafx.png" },
// ];

// // @component: IntegrationCarousel
// export const IntegrationCarousel = ({
//   buttonText = "Explore Forex Markets",
//   buttonHref = "#",
//   title = "Trade across the global forex market.",
//   subtitle = "Analyze major currency pairs, commodities, and crypto-linked instruments in real time with institutional-grade data.",
//   topRowApps = defaultTopRowApps,
//   bottomRowApps = defaultBottomRowApps,
// }: IntegrationCarouselProps) => {
//   const topRowRef = useRef<HTMLDivElement>(null);
//   const bottomRowRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     let topAnimationId: number;
//     let bottomAnimationId: number;
//     let topPosition = 0;
//     let bottomPosition = 0;

//     const animateTopRow = () => {
//       if (topRowRef.current) {
//         topPosition -= 0.5;
//         if (Math.abs(topPosition) >= topRowRef.current.scrollWidth / 2) {
//           topPosition = 0;
//         }
//         topRowRef.current.style.transform = `translateX(${topPosition}px)`;
//       }
//       topAnimationId = requestAnimationFrame(animateTopRow);
//     };

//     const animateBottomRow = () => {
//       if (bottomRowRef.current) {
//         bottomPosition -= 0.65;
//         if (Math.abs(bottomPosition) >= bottomRowRef.current.scrollWidth / 2) {
//           bottomPosition = 0;
//         }
//         bottomRowRef.current.style.transform = `translateX(${bottomPosition}px)`;
//       }
//       bottomAnimationId = requestAnimationFrame(animateBottomRow);
//     };

//     topAnimationId = requestAnimationFrame(animateTopRow);
//     bottomAnimationId = requestAnimationFrame(animateBottomRow);

//     return () => {
//       cancelAnimationFrame(topAnimationId);
//       cancelAnimationFrame(bottomAnimationId);
//     };
//   }, []);

//   return (
//     <div className="w-full py-24 bg-white">
//       <div className="max-w-[680px] mx-auto">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, margin: "-100px" }}
//           transition={{ duration: 0.6, ease: "easeOut" }}
//           className="flex flex-col items-center mb-20"
//         >
//           <div className="flex flex-col items-center gap-4">
//             <h2
//               className="text-[40px] leading-tight font-normal text-[#222222] text-center tracking-tight mb-0"
//               style={{ fontFamily: "var(--font-figtree), Figtree" }}
//             >
//               {title}
//             </h2>

//             <p
//               className="text-lg leading-7 text-[#666666] text-center max-w-[600px] mt-2"
//               style={{ fontFamily: "var(--font-figtree), Figtree" }}
//             >
//               {subtitle}
//             </p>
//           </div>

//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
//             className="flex gap-3 mt-6"
//           >
//             <a
//               href={buttonHref}
//               className="inline-block px-5 py-2.5 rounded-full bg-white text-[#222222] text-[15px] font-medium leading-6 text-center whitespace-nowrap transition-all duration-75 ease-out w-[182px] cursor-pointer hover:shadow-lg"
//               style={{
//                 boxShadow:
//                   "0 -1px 0 0 rgb(181, 181, 181) inset, -1px 0 0 0 rgb(227, 227, 227) inset, 1px 0 0 0 rgb(227, 227, 227) inset, 0 1px 0 0 rgb(227, 227, 227) inset",
//                 backgroundImage:
//                   "linear-gradient(rgba(255, 255, 255, 0.06) 80%, rgba(255, 255, 255, 0.12))",
//               }}
//             >
//               {buttonText}
//             </a>
//           </motion.div>
//         </motion.div>
//       </div>

//       <div className="h-[268px] -mt-6 mb-0 pb-0 relative overflow-hidden">
//         <div
//           ref={topRowRef}
//           className="flex items-start gap-6 absolute top-6 whitespace-nowrap"
//           style={{ willChange: "transform" }}
//         >
//           {[...topRowApps, ...topRowApps].map((app, index) => (
//             <div
//               key={`top-${index}`}
//               className="flex items-center justify-center w-24 h-24 rounded-3xl shrink-0"
//               style={{
//                 backgroundImage:
//                   "linear-gradient(rgb(255, 255, 255), rgb(252, 252, 252))",
//                 boxShadow:
//                   "rgba(0, 0, 0, 0.04) 0px 0px 0px 1px, rgba(0, 0, 0, 0.04) 0px 1px 1px 0px, rgba(0, 0, 0, 0.04) 0px 3px 3px -1.4px, rgba(0, 0, 0, 0.04) 0px 6px 6px -3px, rgba(0, 0, 0, 0.04) 0px 12px 12px -6px, rgba(0, 0, 0, 0.04) 0px 12px 12px -12px",
//               }}
//             >
//               <img
//                 src={app.logo}
//                 alt={app.name}
//                 className="w-9 h-9 block object-contain"
//               />
//             </div>
//           ))}
//         </div>

//         <div
//           className="absolute top-0 right-0 bottom-0 w-60 h-[268px] z-10 pointer-events-none"
//           style={{
//             backgroundImage:
//               "linear-gradient(90deg, rgba(0, 0, 0, 0), rgb(255, 255, 255))",
//           }}
//         />

//         <div
//           className="absolute top-0 left-0 bottom-0 w-60 h-[268px] z-10 pointer-events-none"
//           style={{
//             backgroundImage:
//               "linear-gradient(90deg, rgb(255, 255, 255), rgba(0, 0, 0, 0))",
//           }}
//         />

//         <div
//           ref={bottomRowRef}
//           className="flex items-start gap-6 absolute top-[148px] whitespace-nowrap"
//           style={{ willChange: "transform" }}
//         >
//           {[...bottomRowApps, ...bottomRowApps].map((app, index) => (
//             <div
//               key={`bottom-${index}`}
//               className="flex items-center justify-center w-24 h-24 rounded-3xl shrink-0"
//               style={{
//                 backgroundImage:
//                   "linear-gradient(rgb(255, 255, 255), rgb(252, 252, 252))",
//                 boxShadow:
//                   "rgba(0, 0, 0, 0.04) 0px 0px 0px 1px, rgba(0, 0, 0, 0.04) 0px 1px 1px 0px, rgba(0, 0, 0, 0.04) 0px 3px 3px -1.4px, rgba(0, 0, 0, 0.04) 0px 6px 6px -3px, rgba(0, 0, 0, 0.04) 0px 12px 12px -6px, rgba(0, 0, 0, 0.04) 0px 12px 12px -12px",
//               }}
//             >
//               <img
//                 src={app.logo}
//                 alt={app.name}
//                 className="w-9 h-9 block object-contain"
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };
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
    <section className="py-16 bg-gradient-to-b from-[#f8fafc] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2
            className="text-3xl font-bold text-[#111A4A] mb-4"
            style={{ fontFamily: "var(--font-figtree), Figtree" }}
          >
            {t("compareBrokers")}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{t("compareDesc")}</p>
        </motion.div>

        {/* Broker Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {brokers.map((broker) => (
            <button
              key={broker.id}
              onClick={() => toggleBroker(broker.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedBrokers.includes(broker.id)
                  ? "bg-[#156d95] text-white shadow-lg shadow-[#156d95]/25"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-[#156d95] hover:text-[#156d95]"
              }`}
            >
              {broker.name}
            </button>
          ))}
        </div>

        {/* Comparison Table */}
        <motion.div
          layout
          className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-[#156d95] to-[#111A4A] text-white">
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
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-700">
                    {t("rating")}
                  </td>
                  {comparisonData.map((broker) => (
                    <td key={broker.id} className="px-6 py-4 text-center">
                      <span className="text-[#156d95] font-bold">
                        {broker.rating}
                      </span>
                      <span className="text-gray-400 text-sm">/5</span>
                    </td>
                  ))}
                </tr>
                <tr className="bg-gray-50/50">
                  <td className="px-6 py-4 font-medium text-gray-700">
                    {t("minDeposit")}
                  </td>
                  {comparisonData.map((broker) => (
                    <td
                      key={broker.id}
                      className="px-6 py-4 text-center font-semibold text-[#111A4A]"
                    >
                      {broker.minDeposit}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-700">
                    {t("spread")}
                  </td>
                  {comparisonData.map((broker) => (
                    <td key={broker.id} className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {broker.spread}
                      </span>
                    </td>
                  ))}
                </tr>
                <tr className="bg-gray-50/50">
                  <td className="px-6 py-4 font-medium text-gray-700">
                    {t("leverage")}
                  </td>
                  {comparisonData.map((broker) => (
                    <td
                      key={broker.id}
                      className="px-6 py-4 text-center font-semibold text-[#111A4A]"
                    >
                      {broker.leverage}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-700">
                    {t("regulationLabel")}
                  </td>
                  {comparisonData.map((broker) => (
                    <td key={broker.id} className="px-6 py-4 text-center">
                      <div className="flex flex-wrap justify-center gap-1">
                        {broker.regulation.map((reg) => (
                          <span
                            key={reg}
                            className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
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
                    <tr className="bg-gray-50/50">
                      <td className="px-6 py-4 font-medium text-gray-700">
                        {t("bonus")}
                      </td>
                      {comparisonData.map((broker) => (
                        <td key={broker.id} className="px-6 py-4 text-center">
                          {broker.features.some((f) =>
                            f.toLowerCase().includes("bonus"),
                          ) ? (
                            <Check className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-gray-300 mx-auto" />
                          )}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium text-gray-700">
                        {t("copyTrading")}
                      </td>
                      {comparisonData.map((broker) => (
                        <td key={broker.id} className="px-6 py-4 text-center">
                          {broker.features.some((f) =>
                            f.toLowerCase().includes("copy"),
                          ) ? (
                            <Check className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-gray-300 mx-auto" />
                          )}
                        </td>
                      ))}
                    </tr>
                    <tr className="bg-gray-50/50">
                      <td className="px-6 py-4 font-medium text-gray-700">
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
                            <X className="w-5 h-5 text-gray-300 mx-auto" />
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
            className="w-full py-3 text-sm font-medium text-[#156d95] hover:text-[#111A4A] hover:bg-gray-50 transition-colors flex items-center justify-center gap-1 border-t border-gray-100"
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
