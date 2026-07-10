"use client";

import { useTranslations } from "next-intl";
import {
  FaInstagram,
  FaTiktok,
  FaFacebookF,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";

export default function Footer() {
  const t = useTranslations("Footer");
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-white text-[#0a0a0f] border-t border-[#e5e5e5]">
      {/* TOP SECTION: LOGO + SOCIAL ICONS */}
      <div
        className="
        w-full pt-14 pb-6 px-6 md:px-11 
        flex flex-col md:flex-row
        items-start md:items-center
        justify-between gap-6 md:gap-0
      "
      >
        {/* LEFT SIDE - MANAGED BY + LOGO */}
        <div className="flex flex-col items-start text-left">
          <p className="text-sm font-medium tracking-wide opacity-80 mb-1">
            {t("managedBy")}
          </p>

          {/* LOGO CONTAINER + R BADGE */}
          <div className="relative inline-block">
            <img
              src="/logo-fbl.png"
              alt="Managed By Logo"
              className="w-40 h-auto opacity-90"
            />
            {/* REGISTERED BADGE - POJOK KANAN ATAS LOGO */}
            <span
              className="
                absolute -top-1.5 -right-1.5
                w-5 h-5
                rounded-full
                border border-[#0a0a0f]/20
                bg-white
                text-[#0a0a0f]
                flex items-center justify-center
                text-[9px] font-bold leading-none
                select-none
                shadow-sm
              "
              aria-label="Registered Trademark"
            >
              R
            </span>
          </div>
        </div>

        {/* SOCIAL ICONS */}
        <div className="flex items-center gap-3">
          {/* Instagram */}
          <a
            href="https://www.instagram.com/forexforbetterliving/#"
            target="_blank"
            rel="noopener noreferrer"
            className="
              w-10 h-10 flex items-center justify-center rounded-full border border-black/20
              hover:border-black hover:bg-black/5 hover:scale-105 transition-all cursor-pointer
            "
          >
            <FaInstagram size={18} className="opacity-80" />
          </a>
          {/* TikTok */}
          <a
            href="https://www.tiktok.com/@forexforbetterliving"
            target="_blank"
            rel="noopener noreferrer"
            className="
              w-10 h-10 flex items-center justify-center rounded-full border border-black/20
              hover:border-black hover:bg-black/5 hover:scale-105 transition-all cursor-pointer
            "
          >
            <FaTiktok size={18} className="opacity-80" />
          </a>
          {/* Facebook */}
          <a
            href="https://web.facebook.com/forexforbetterliving?_rdc=1&_rdr#"
            target="_blank"
            rel="noopener noreferrer"
            className="
              w-10 h-10 flex items-center justify-center rounded-full border border-black/20
              hover:border-black hover:bg-black/5 hover:scale-105 transition-all cursor-pointer
            "
          >
            <FaFacebookF size={18} className="opacity-80" />
          </a>
          {/* YouTube */}
          <a
            href="https://www.youtube.com/@forexforbetterliving"
            target="_blank"
            rel="noopener noreferrer"
            className="
              w-10 h-10 flex items-center justify-center rounded-full border border-black/20
              hover:border-black hover:bg-black/5 hover:scale-105 transition-all cursor-pointer
            "
          >
            <FaYoutube size={18} className="opacity-80" />
          </a>
          {/* WhatsApp */}
          <a
            href="https://wa.me/6285187555440?text=Hi%20admin%20FBL,%20saya%20ingin%20konsultasi"
            target="_blank"
            rel="noopener noreferrer"
            className="
    w-10 h-10 flex items-center justify-center rounded-full border border-black/20
    hover:border-black hover:bg-black/5 hover:scale-105 transition-all cursor-pointer
  "
          >
            <FaWhatsapp size={18} className="opacity-80" />
          </a>
        </div>
      </div>

      {/* LEGAL & COMPLIANCE SECTION */}
      <div className="w-full border-t border-[#e5e5e5] pt-6 pb-6 px-6 md:px-11">
        <div className="max-w-5xl">
          <p className="text-xs font-semibold tracking-wider uppercase opacity-60 mb-3">
            {t("legalCompliance")}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm opacity-80">
            <div>
              <p className="font-medium opacity-60 text-xs mb-1">
                {t("companyNameLabel")}
              </p>
              <p className="font-medium">{t("companyName")}</p>
            </div>
            <div>
              <p className="font-medium opacity-60 text-xs mb-1">{t("nib")}</p>
              <p className="font-medium">1411250044219</p>
            </div>
            <div>
              <p className="font-medium opacity-60 text-xs mb-1">{t("npwp")}</p>
              <p className="font-medium">1000000006570444</p>
            </div>
            <div>
              <p className="font-medium opacity-60 text-xs mb-1">
                {t("investmentStatusLabel")}
              </p>
              <p className="font-medium">PMDN</p>
            </div>
            <div>
              <p className="font-medium opacity-60 text-xs mb-1">
                {t("registeredKbli")}
              </p>
              <p className="font-medium">70209, 74909, 85495</p>
            </div>
          </div>
        </div>
      </div>

      {/* DISCLAIMER */}
      <div className="w-full border-t border-[#e5e5e5] pt-6 pb-10 px-6 md:px-11">
        <p className="max-w-5xl text-sm text-left leading-6 opacity-90">
          {t("disclaimer")}
        </p>
      </div>
      <div className="w-full border-t border-[#e5e5e5] pt-6 pb-10 px-6 md:px-11">
        <p className="max-w-5xl text-sm text-left leading-6 opacity-90">
          {t("privacy")}
        </p>
      </div>

      {/* BOTTOM */}
      <div className="w-full border-t border-[#e5e5e5]">
        <div className="w-full px-6 md:px-12 py-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          {/* COPYRIGHT */}
          <p className="text-sm opacity-90">{t("copyright", { year })}</p>

          {/* LINKS */}
          <div className="flex items-center gap-6">
            <a
              className="text-sm opacity-70 hover:opacity-100 transition"
              href="#"
            >
              {t("terms")}
            </a>
            <a
              className="text-sm opacity-70 hover:opacity-100 transition"
              href="#"
            >
              {t("privacyPolicy")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
