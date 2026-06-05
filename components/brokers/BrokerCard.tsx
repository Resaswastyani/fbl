"use client";

import { motion } from "framer-motion";
import { Star, Check, X, ExternalLink, Shield, TrendingUp } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { Broker } from "@/types/brokers";

interface BrokerCardProps {
  broker: Broker;
  index: number;
}

export default function BrokerCard({ broker, index }: BrokerCardProps) {
  const t = useTranslations("Broker");
  const tData = useTranslations("BrokerData");

  // Ambil konten terjemahan berdasarkan broker.id
  const description = tData(`${broker.id}.description`);
  const features = tData.raw(`${broker.id}.features`) as string[];
  const pros = tData.raw(`${broker.id}.pros`) as string[];
  const cons = tData.raw(`${broker.id}.cons`) as string[];
  const badge = tData(`${broker.id}.badge`);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-2xl hover:shadow-[#156d95]/10 transition-all duration-500"
    >
      {/* Header with Badge */}
      <div className="relative bg-gradient-to-br from-gray-50 to-white p-6 pb-4">
        {badge && (
          <div className="absolute top-4 right-4">
            <span className="bg-gradient-to-r from-[#156d95] to-[#111A4A] text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
              {badge}
            </span>
          </div>
        )}

        {/* Logo & Rating */}
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-white rounded-xl shadow-md border border-gray-100 flex items-center justify-center p-2">
            <div className="w-full h-full bg-gradient-to-br from-[#156d95]/10 to-[#111A4A]/10 rounded-lg flex items-center justify-center">
              <span className="text-2xl font-bold text-[#156d95]">
                {broker.name.charAt(0)}
              </span>
            </div>
          </div>

          <div className="flex-1">
            <h3
              className="text-xl font-semibold text-[#111A4A] mb-1"
              style={{ fontFamily: "var(--font-figtree), Figtree" }}
            >
              {broker.name}
            </h3>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={
                    i < Math.floor(broker.rating)
                      ? "fill-amber-400 text-amber-400"
                      : "text-gray-300"
                  }
                />
              ))}
              <span className="ml-2 text-sm font-medium text-[#156d95]">
                {broker.rating}/5
              </span>
            </div>
          </div>
        </div>

        {/* Regulation Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {broker.regulation.map((reg) => (
            <span
              key={reg}
              className="inline-flex items-center gap-1 text-xs font-medium text-green-700 bg-green-50 px-2.5 py-1 rounded-full border border-green-100"
            >
              <Shield size={10} />
              {reg}
            </span>
          ))}
        </div>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-3 gap-4 px-6 py-4 bg-[#f8fafc] border-y border-gray-100">
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-1">{t("minDeposit")}</p>
          <p className="text-sm font-semibold text-[#111A4A]">
            {broker.minDeposit}
          </p>
        </div>
        <div className="text-center border-x border-gray-200">
          <p className="text-xs text-gray-500 mb-1">{t("spread")}</p>
          <p className="text-sm font-semibold text-[#111A4A]">
            {broker.spread}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-1">{t("leverage")}</p>
          <p className="text-sm font-semibold text-[#111A4A]">
            {broker.leverage}
          </p>
        </div>
      </div>

      {/* Description */}
      <div className="p-6">
        <p
          className="text-sm text-gray-600 leading-relaxed mb-4"
          style={{ fontFamily: "var(--font-figtree), Figtree" }}
        >
          {description}
        </p>

        {/* Features */}
        <div className="space-y-2 mb-5">
          {features.slice(0, 3).map((feature, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 text-sm text-gray-700"
            >
              <div className="w-5 h-5 rounded-full bg-[#156d95]/10 flex items-center justify-center flex-shrink-0">
                <Check size={12} className="text-[#156d95]" />
              </div>
              <span className="truncate">{feature}</span>
            </div>
          ))}
        </div>

        {/* Pros & Cons Preview */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-green-50 rounded-lg p-3">
            <p className="text-xs font-semibold text-green-700 mb-2 flex items-center gap-1">
              <TrendingUp size={12} /> {t("advantages")}
            </p>
            <p className="text-xs text-green-800 line-clamp-2">{pros[0]}</p>
          </div>
          <div className="bg-red-50 rounded-lg p-3">
            <p className="text-xs font-semibold text-red-700 mb-2 flex items-center gap-1">
              <X size={12} /> {t("disadvantages")}
            </p>
            <p className="text-xs text-red-800 line-clamp-2">{cons[0]}</p>
          </div>
        </div>

        {/* CTA Button */}
        <a
          href={broker.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group/btn w-full bg-gradient-to-r from-[#156d95] to-[#111A4A] hover:from-[#0d5a7c] hover:to-[#0a1230] text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-[#156d95]/25 hover:shadow-xl hover:shadow-[#156d95]/30"
        >
          {t("visitWebsite")}
          <ExternalLink
            size={16}
            className="transition-transform group-hover/btn:translate-x-1"
          />
        </a>
      </div>
    </motion.div>
  );
}
