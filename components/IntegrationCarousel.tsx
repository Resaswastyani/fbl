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
"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

type IntegrationApp = {
  name: string;
  logo: string;
};

type IntegrationCarouselProps = {
  buttonHref?: string;
  topRowApps?: IntegrationApp[];
  bottomRowApps?: IntegrationApp[];
};

// Logo broker dari folder public
const defaultTopRowApps: IntegrationApp[] = [
  { name: "Exness", logo: "/brokers/exness.png" },
  { name: "IC Markets", logo: "/brokers/icm.jpeg" },
  { name: "XM", logo: "/brokers/xm.png" },
  { name: "HFM", logo: "/brokers/hfm.jpg" },
  { name: "FBS", logo: "/brokers/fbs.png" },
  { name: "Exness", logo: "/brokers/exness.png" },
  { name: "IC Markets", logo: "/brokers/icm.jpeg" },
  { name: "XM", logo: "/brokers/xm.png" },
  { name: "HFM", logo: "/brokers/hfm.jpg" },
  { name: "FBS", logo: "/brokers/fbs.png" },
];

const defaultBottomRowApps: IntegrationApp[] = [
  { name: "Exness", logo: "/brokers/exness.png" },
  { name: "IC Markets", logo: "/brokers/icm.jpeg" },
  { name: "XM", logo: "/brokers/xm.png" },
  { name: "HFM", logo: "/brokers/hfm.jpg" },
  { name: "FBS", logo: "/brokers/fbs.png" },
  { name: "Exness", logo: "/brokers/exness.png" },
  { name: "IC Markets", logo: "/brokers/icm.jpeg" },
  { name: "XM", logo: "/brokers/xm.png" },
  { name: "HFM", logo: "/brokers/hfm.jpg" },
  { name: "FBS", logo: "/brokers/fbs.png" },
];

// @component: IntegrationCarousel
export const IntegrationCarousel = ({
  buttonHref = "#",
  topRowApps = defaultTopRowApps,
  bottomRowApps = defaultBottomRowApps,
}: IntegrationCarouselProps) => {
  const t = useTranslations("IntegrationCarousel");
  const topRowRef = useRef<HTMLDivElement>(null);
  const bottomRowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let topAnimationId: number;
    let bottomAnimationId: number;
    let topPosition = 0;
    let bottomPosition = 0;

    const animateTopRow = () => {
      if (topRowRef.current) {
        topPosition -= 0.5;
        if (Math.abs(topPosition) >= topRowRef.current.scrollWidth / 2) {
          topPosition = 0;
        }
        topRowRef.current.style.transform = `translateX(${topPosition}px)`;
      }
      topAnimationId = requestAnimationFrame(animateTopRow);
    };

    const animateBottomRow = () => {
      if (bottomRowRef.current) {
        bottomPosition -= 0.65;
        if (Math.abs(bottomPosition) >= bottomRowRef.current.scrollWidth / 2) {
          bottomPosition = 0;
        }
        bottomRowRef.current.style.transform = `translateX(${bottomPosition}px)`;
      }
      bottomAnimationId = requestAnimationFrame(animateBottomRow);
    };

    topAnimationId = requestAnimationFrame(animateTopRow);
    bottomAnimationId = requestAnimationFrame(animateBottomRow);

    return () => {
      cancelAnimationFrame(topAnimationId);
      cancelAnimationFrame(bottomAnimationId);
    };
  }, []);

  return (
    <div className="w-full py-24 bg-white dark:bg-[#050508] transition-colors duration-500">
      <div className="max-w-[680px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center mb-20"
        >
          <div className="flex flex-col items-center gap-4">
            <h2
              className="text-[40px] leading-tight font-normal text-[#222222] dark:text-white text-center tracking-tight mb-0"
              style={{ fontFamily: "var(--font-figtree), Figtree" }}
            >
              {t("title")}
            </h2>

            <p
              className="text-lg leading-7 text-[#666666] dark:text-gray-400 text-center max-w-[600px] mt-2"
              style={{ fontFamily: "var(--font-figtree), Figtree" }}
            >
              {t("subtitle")}
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
            className="flex gap-3 mt-6"
          >
            <a
              href={buttonHref}
              className="inline-block px-5 py-2.5 rounded-full bg-white dark:bg-white/10 text-[#222222] dark:text-white text-[15px] font-medium leading-6 text-center whitespace-nowrap transition-all duration-75 ease-out w-[182px] cursor-pointer hover:shadow-lg dark:hover:shadow-[#22d3a8]/20 dark:border dark:border-white/10"
              style={{
                boxShadow:
                  "0 -1px 0 0 rgb(181, 181, 181) inset, -1px 0 0 0 rgb(227, 227, 227) inset, 1px 0 0 0 rgb(227, 227, 227) inset, 0 1px 0 0 rgb(227, 227, 227) inset",
                backgroundImage:
                  "linear-gradient(rgba(255, 255, 255, 0.06) 80%, rgba(255, 255, 255, 0.12))",
              }}
            >
              {t("buttonText")}
            </a>
          </motion.div>
        </motion.div>
      </div>

      <div className="h-[268px] -mt-6 mb-0 pb-0 relative overflow-hidden">
        <div
          ref={topRowRef}
          className="flex items-start gap-6 absolute top-6 whitespace-nowrap"
          style={{ willChange: "transform" }}
        >
          {[...topRowApps, ...topRowApps].map((app, index) => (
            <div
              key={`top-${index}`}
              className="flex items-center justify-center w-24 h-24 rounded-3xl shrink-0"
              style={{
                backgroundImage:
                  "linear-gradient(rgb(255, 255, 255), rgb(252, 252, 252))",
                boxShadow:
                  "rgba(0, 0, 0, 0.04) 0px 0px 0px 1px, rgba(0, 0, 0, 0.04) 0px 1px 1px 0px, rgba(0, 0, 0, 0.04) 0px 3px 3px -1.4px, rgba(0, 0, 0, 0.04) 0px 6px 6px -3px, rgba(0, 0, 0, 0.04) 0px 12px 12px -6px, rgba(0, 0, 0, 0.04) 0px 12px 12px -12px",
              }}
            >
              <img
                src={app.logo}
                alt={app.name}
                className="w-9 h-9 block object-contain"
              />
            </div>
          ))}
        </div>

        <div
          className="absolute top-0 right-0 bottom-0 w-60 h-[268px] z-10 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(0, 0, 0, 0), rgb(255, 255, 255))",
          }}
        />

        <div
          className="absolute top-0 left-0 bottom-0 w-60 h-[268px] z-10 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgb(255, 255, 255), rgba(0, 0, 0, 0))",
          }}
        />

        <div
          ref={bottomRowRef}
          className="flex items-start gap-6 absolute top-[148px] whitespace-nowrap"
          style={{ willChange: "transform" }}
        >
          {[...bottomRowApps, ...bottomRowApps].map((app, index) => (
            <div
              key={`bottom-${index}`}
              className="flex items-center justify-center w-24 h-24 rounded-3xl shrink-0"
              style={{
                backgroundImage:
                  "linear-gradient(rgb(255, 255, 255), rgb(252, 252, 252))",
                boxShadow:
                  "rgba(0, 0, 0, 0.04) 0px 0px 0px 1px, rgba(0, 0, 0, 0.04) 0px 1px 1px 0px, rgba(0, 0, 0, 0.04) 0px 3px 3px -1.4px, rgba(0, 0, 0, 0.04) 0px 6px 6px -3px, rgba(0, 0, 0, 0.04) 0px 12px 12px -6px, rgba(0, 0, 0, 0.04) 0px 12px 12px -12px",
              }}
            >
              <img
                src={app.logo}
                alt={app.name}
                className="w-9 h-9 block object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
