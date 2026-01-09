"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const RightAnimationCard = dynamic(() => import("./RightAnimationCard"), {
  ssr: false,
});

export const ProductTeaserCard = ({
  headline = "Forex for Better Living",
  primaryButtonText = "Mulai Belajar",
  primaryButtonHref = "/login",
}) => {
  const router = useRouter();
  return (
    <section className="w-full pt-24 md:pt-32 pb-20 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-5 lg:gap-16 px-8 md:px-12">

        {/* LEFT TEXT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="
            col-span-12 lg:col-span-6 
            flex flex-col justify-center
            text-left
          "
        >
          {/* Small Link */}
          <a
            onClick={(e) => e.preventDefault()}
            className="flex items-center gap-1 text-[#6e6e6e] mb-4 cursor-pointer"
          >
            <span className="text-xs uppercase tracking-tight font-mono flex items-center gap-1 hover:text-[#202020]">
              Lihat materi baru <ArrowUpRight size={14} strokeWidth={1.5} />
            </span>
          </a>

          {/* Headline */}
          <h1 className="text-[40px] font-normal leading-tight tracking-tight text-[#111A4A] mb-6"
              style={{
                fontFamily: "var(--font-figtree), Figtree",
                fontSize: "50px",
                fontWeight: "500",
              }}
            >
            {headline}
          </h1>

          {/* Subheadline */}
          <p className="text-lg leading-6 text-[#111A4A] opacity-60 mt-0 mb-6"
            style={{ fontFamily: "var(--font-figtree), Figtree" }}
          >
            Layanan edukasi dan konsultasi bisnis di bidang Forex Trading
            yang hadir untuk menjawab kebutuhan masyarakat Indonesia 
            dalam memahami dan menguasai dunia trading secara praktis, efektif, dan berorientasi hasil.
          </p>

          {/* Small CTA Button */}
          <button
             onClick={() => router.push(primaryButtonHref)}
            className="
              inline-flex items-center justify-center
              bg-[#156d95]
              text-white
              rounded-lg
              px-5 py-3
              text-sm sm:text-base
              font-medium
              w-fit
              transition-all hover:translate-x-1
            "
          >
            {primaryButtonText}
          </button>
        </motion.div>

        {/* RIGHT ANIMATION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="
            col-span-12 lg:col-span-6
            flex items-center justify-center
            mt-6 md:mt-0
          "
        >
          <div className="relative w-auto max-w-[420px] md:max-w-[520px] lg:max-w-[600px] h-auto">
            <RightAnimationCard />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
