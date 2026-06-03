"use client";

import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

export default function AnnouncementBar() {
  const t = useTranslations("Announcement");
  const [visible, setVisible] = useState(true);
  const [closed, setClosed] = useState(false);

  const handleClose = () => {
    setClosed(true);
    setVisible(false);
  };

  useEffect(() => {
    const onScroll = () => {
      if (closed) return;
      if (window.scrollY > 40) setVisible(false);
      else setVisible(true);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [closed]);

  if (!visible) return null;

  return (
    <div
      className="
        fixed top-0 left-0 w-full z-9999
        bg-[#EFE9FF] text-[#111A4A]
        py-2 px-4 text-sm
        flex items-center justify-center gap-4
        shadow-sm
        animate-fade-in
      "
    >
      <span className="font-medium">{t("newBatch")}</span>

      <a
        href="/signup"
        className="underline font-medium text-[#111A4A] hover:opacity-70"
      >
        {t("registerNow")}
      </a>

      <button
        onClick={handleClose}
        className="
          absolute right-3 top-1/2 -translate-y-1/2
          text-[#111A4A] hover:opacity-70 transition
        "
      >
        <X size={16} />
      </button>
    </div>
  );
}
