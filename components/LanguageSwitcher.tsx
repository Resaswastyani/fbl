"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { Globe } from "lucide-react";
import { useTransition, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

interface LanguageSwitcherProps {
  isScrolled?: boolean;
}

export default function LanguageSwitcher({
  isScrolled = false,
}: LanguageSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("Language");

  const switchLocale = (newLocale: "id" | "en") => {
    if (newLocale === locale) return;
    setIsOpen(false);
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  };

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`
          flex items-center gap-1.5 rounded-full border transition-all duration-200
          ${
            isScrolled
              ? "px-2.5 py-1 text-xs border-gray-200 bg-white/80 backdrop-blur-sm hover:border-[#111A4A]/30"
              : "px-3 py-1.5 text-sm border-gray-300/50 bg-white/60 backdrop-blur-sm hover:border-[#111A4A]/40"
          }
          ${isPending ? "opacity-50" : ""}
          text-[#111A4A]
        `}
        disabled={isPending}
      >
        <Globe size={isScrolled ? 13 : 14} className="text-[#111A4A]/70" />
        <span className="font-semibold uppercase tracking-wide">
          {locale === "id" ? t("id") : t("en")}
        </span>
        <motion.svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="ml-0.5"
        >
          <path
            d="M1 1L5 5L9 1"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute right-0 mt-2 z-50 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 min-w-[100px] overflow-hidden"
            >
              <button
                onClick={() => switchLocale("id")}
                className={`
                  w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors
                  ${
                    locale === "id"
                      ? "bg-[#111A4A] text-white font-semibold"
                      : "text-gray-700 hover:bg-gray-50"
                  }
                `}
              >
                <span className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-[9px] text-white font-bold">
                  ID
                </span>
                {t("id")}
                {locale === "id" && (
                  <motion.span layoutId="lang-check" className="ml-auto">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M2.91669 7.58331L5.25002 9.91665L11.0834 4.08331"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.span>
                )}
              </button>
              <button
                onClick={() => switchLocale("en")}
                className={`
                  w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors
                  ${
                    locale === "en"
                      ? "bg-[#111A4A] text-white font-semibold"
                      : "text-gray-700 hover:bg-gray-50"
                  }
                `}
              >
                <span className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-[9px] text-white font-bold">
                  EN
                </span>
                {t("en")}
                {locale === "en" && (
                  <motion.span layoutId="lang-check" className="ml-auto">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M2.91669 7.58331L5.25002 9.91665L11.0834 4.08331"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.span>
                )}
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
