"use client";

import { 
  FaInstagram, 
  FaTiktok, 
  FaFacebookF, 
  FaYoutube, 
  FaWhatsapp 
} from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-white text-[#0a0a0f] border-t border-[#e5e5e5]">

      {/* TOP SECTION: LOGO + SOCIAL ICONS */}
      <div className="
        w-full pt-14 pb-6 px-6 md:px-11 
        flex flex-col md:flex-row
        items-start md:items-center
        justify-between gap-6 md:gap-0
      ">

        {/* LEFT SIDE - MANAGED BY + LOGO */}
        <div className="flex flex-col items-start text-left">
          <p className="text-sm font-medium tracking-wide opacity-80 mb-1">
            MANAGED BY
          </p>

          <img
            src="/logo-fbl.png"
            alt="Managed By Logo"
            className="w-40 h-auto opacity-90"
          />
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
            href="https://wa.me/628123456789"
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

      {/* DISCLAIMER */}
      <div className="w-full border-t border-[#e5e5e5] pt-6 pb-10 px-6 md:px-11">
        <p className="max-w-5xl text-sm text-left leading-6 opacity-90">
          Edukasi forex yang kami sampaikan bertujuan untuk memberikan wawasan dan pemahaman yang lebih baik
          mengenai dunia trading. Trading forex mengandung risiko tinggi dan tidak cocok untuk semua orang.
          Setiap keputusan transaksi merupakan tanggung jawab pribadi masing-masing individu.
          Kami tidak memberikan jaminan keuntungan, rekomendasi investasi, atau ajakan untuk melakukan transaksi apa pun.
          Selalu lakukan riset pribadi dan konsultasikan dengan penasihat keuangan independen sebelum melakukan aktivitas trading.
        </p>
      </div>

      {/* HUGE TEXT */}
      <div className="w-full py-6 md:py-5">
        <h1
          className="
            font-semibold leading-[0.9] tracking-tight text-[#0a0a0f]
            px-4 md:px-8
            text-[15vw]
            sm:text-[12vw]
            md:text-[10vw]
            lg:text-[9.8vw]
            whitespace-normal md:whitespace-nowrap
          "
        >
          Forex for Better Living
        </h1>
      </div>

      {/* BOTTOM */}
      <div className="w-full border-t border-[#e5e5e5]">
        <div className="w-full px-6 md:px-12 py-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">

          {/* COPYRIGHT */}
          <p className="text-sm opacity-90">
            © {year} Forex for Better Living. All rights reserved.
          </p>

          {/* LINKS */}
          <div className="flex items-center gap-6">
            <a className="text-sm opacity-70 hover:opacity-100 transition" href="#">
              Terms of Service
            </a>
            <a className="text-sm opacity-70 hover:opacity-100 transition" href="#">
              Privacy Policy
            </a>
          </div>

        </div>
      </div>

    </footer>
  );
}
