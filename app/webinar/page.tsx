"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import Script from "next/script";

export default function WebinarRegistrationPage() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    const targetDate = new Date("2026-07-20T19:00:00+07:00").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [isMounted]);

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-[#0A0E1A] text-white relative overflow-hidden font-sans">
      {/* Meta Pixel Code */}
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1534984315082438');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        <img height="1" width="1" style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=1534984315082438&ev=PageView&noscript=1"
          alt="meta-pixel" />
      </noscript>

      {/* TikTok Pixel Code */}
      <Script id="tiktok-pixel" strategy="afterInteractive">
        {`
          !function (w, d, t) {
            w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(
            var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script")
            ;n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};

            ttq.load('D8T3HTRC77UDQUH9CCJ0');
            ttq.page();
          }(window, document, 'ttq');
        `}
      </Script>

      {/* Animated Background Blob */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          rotate: [0, 90, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] bg-[#00C9A7]/10 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
          rotate: [0, -90, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-[40%] -right-[10%] w-[60vw] h-[60vw] bg-[#C9A84C]/10 rounded-full blur-[150px] pointer-events-none"
      />

      <div className="container mx-auto px-4 py-12 sm:py-20 relative z-10">

        {/* Header Badge */}
        <div className="flex justify-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="inline-flex items-center rounded-full bg-[#C9A84C]/20 px-4 py-2 text-sm sm:text-base font-bold text-[#C9A84C] tracking-widest uppercase border border-[#C9A84C]/30 shadow-lg"
          >
            <Sparkles className="w-5 h-5 mr-2" /> Webinar Eksklusif • 100% Gratis
          </motion.div>
        </div>

        {/* Hero Section: Title & Registration */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 max-w-7xl mx-auto mb-16">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left flex-1"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">
              Manajemen Trading Forex dengan <br className="hidden lg:block" /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C9A7] to-teal-200">EA/Robot Trading FBL</span>
            </h1>
          </motion.div>

          {/* Registration Box */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full max-w-md lg:w-5/12 flex-shrink-0"
          >
            <div className="bg-gradient-to-b from-[#111827] to-[#0A0E1A] rounded-3xl p-8 border border-[#00C9A7]/30 shadow-[0_20px_50px_rgba(0,201,167,0.15)] flex flex-col items-center text-center relative overflow-hidden">
              <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00C9A7] to-transparent"></div>

              <h3 className="text-2xl font-black text-white mb-2">Amankan Kursi Anda</h3>
              <p className="text-sm font-medium text-gray-400 mb-8">
                Slot terbatas! Scan QR code atau klik tombol di bawah untuk mendaftar.
              </p>

              <div className="bg-white p-3 rounded-3xl mb-8 shadow-[0_0_40px_rgba(0,201,167,0.3)] transform transition-transform hover:scale-105 duration-500 relative group">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-2 rounded-3xl border-2 border-dashed border-[#00C9A7]/60"
                />
                <div className="relative w-40 h-40 sm:w-48 sm:h-48 z-10">
                  <Image
                    src="/webinar/tiny_cc_PendaftaranWebinarFBL.png"
                    alt="QR Code Pendaftaran FBL"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSeYVq0Hz5nSCdQ4ugCMcnMUpsqGF0iG_c9uRmw5BswlAJmN4w/viewform?usp=dialog"
                target="_blank"
                rel="noreferrer"
                className="w-full relative overflow-hidden group rounded-2xl bg-[#00C9A7] px-8 py-5 font-bold text-[#0A0E1A] shadow-lg transition-all hover:shadow-[0_0_30px_rgba(0,201,167,0.6)] hover:-translate-y-2 active:translate-y-0"
              >
                <span className="relative z-10 flex items-center justify-center gap-3 text-lg uppercase tracking-widest">
                  DAFTAR SEKARANG
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 z-0 h-full w-full bg-gradient-to-r from-teal-400 to-teal-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-7xl mx-auto">

          {/* Left Column: Info & Countdown */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-7 flex flex-col justify-center space-y-10 order-1 lg:order-1"
          >
            {/* Event Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm shadow-2xl">
              <div className="flex items-center p-4 bg-[#111827] rounded-2xl border border-gray-800 hover:border-[#C9A84C]/50 transition-colors">
                <div className="bg-[#C9A84C]/20 p-3 rounded-xl mr-4">
                  <Calendar className="w-6 h-6 text-[#C9A84C]" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Tanggal</p>
                  <p className="font-bold text-white text-lg">20 Juli 2026</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-[#111827] rounded-2xl border border-gray-800 hover:border-[#C9A84C]/50 transition-colors">
                <div className="bg-[#C9A84C]/20 p-3 rounded-xl mr-4">
                  <Clock className="w-6 h-6 text-[#C9A84C]" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Waktu</p>
                  <p className="font-bold text-white text-lg">19.00 - 21.00 WIB</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-[#111827] rounded-2xl border border-gray-800 sm:col-span-2 hover:border-[#00C9A7]/50 transition-colors">
                <div className="bg-[#00C9A7]/20 p-3 rounded-xl mr-4">
                  <MapPin className="w-6 h-6 text-[#00C9A7]" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Lokasi</p>
                  <p className="font-bold text-white text-lg">Zoom Meeting(Link via WA Group)</p>
                </div>
              </div>
            </div>

            {/* Countdown */}
            <div>
              <h3 className="text-sm text-gray-400 uppercase tracking-widest mb-4 font-semibold text-center sm:text-left">Hitung Mundur Acara</h3>
              <div className="flex justify-center sm:justify-start space-x-4 sm:space-x-6">
                {[
                  { label: "HARI", value: timeLeft.days },
                  { label: "JAM", value: timeLeft.hours },
                  { label: "MENIT", value: timeLeft.minutes },
                  { label: "DETIK", value: timeLeft.seconds },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="flex h-20 w-20 sm:h-28 sm:w-28 items-center justify-center rounded-2xl bg-gray-900 border border-[#00C9A7]/40 shadow-[0_0_30px_rgba(0,201,167,0.15)] relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-b from-[#00C9A7]/20 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
                      <span className="text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-[#00C9A7] relative z-10">
                        {item.value.toString().padStart(2, "0")}
                      </span>
                    </div>
                    <span className="mt-3 text-xs sm:text-sm text-gray-400 font-bold tracking-[0.3em]">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <motion.div
              animate={{
                boxShadow: ["0 0 0px rgba(0,201,167,0)", "0 0 25px rgba(0,201,167,0.4)", "0 0 0px rgba(0,201,167,0)"]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="rounded-3xl bg-gradient-to-br from-[#00C9A7]/20 to-[#00C9A7]/5 p-8 border border-[#00C9A7]/50 relative overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 opacity-10">
                <Sparkles className="w-40 h-40 text-[#00C9A7]" />
              </div>
              <h4 className="font-bold text-[#00C9A7] mb-6 text-2xl flex items-center">
                Benefit Eksklusif (GRATIS):
              </h4>
              <ul className="text-base sm:text-lg text-white space-y-4 font-medium relative z-10">
                <li className="flex items-center"><CheckCircle2 className="w-6 h-6 text-[#C9A84C] mr-4 flex-shrink-0" /> Materi Profesional Trading Forex</li>
                <li className="flex items-center"><CheckCircle2 className="w-6 h-6 text-[#C9A84C] mr-4 flex-shrink-0" /> Position Size Calculator .ex4 & .ex5</li>
                <li className="flex items-center"><CheckCircle2 className="w-6 h-6 text-[#C9A84C] mr-4 flex-shrink-0" /> Free Trial Robot Trading 30 Hari</li>
              </ul>
            </motion.div>
          </motion.div>

          {/* Right Column: Speakers */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="lg:col-span-5 flex flex-col space-y-8 order-2 lg:order-2"
          >
            {/* Speakers Box */}
            <div className="bg-[#111827] rounded-3xl p-8 border border-gray-800 shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-6 border-b border-gray-800 pb-4 flex items-center justify-between uppercase tracking-widest">
                <span>Pembicara & Host</span>
              </h3>

              <div className="space-y-6">
                {/* Speaker 1 (SW) */}
                <motion.div whileHover={{ scale: 1.03, x: 10 }} className="flex items-center space-x-5 cursor-default transition-transform">
                  <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full overflow-hidden flex-shrink-0 shadow-lg border-[3px] border-[#0A0E1A] relative bg-gray-800">
                    <Image src="/mentors/pakwi.jpeg" alt="Eka Pramudhita" fill className="object-cover" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-lg sm:text-xl leading-tight mb-1">Sindhurahardjo W.</p>
                    <span className="inline-block px-3 py-1 bg-[#C9A84C]/20 text-[#C9A84C] text-xs font-bold rounded-full uppercase tracking-widest">Pemateri</span>
                  </div>
                </motion.div>

                {/* Speaker 2 (Eka) */}
                <motion.div whileHover={{ scale: 1.03, x: 10 }} className="flex items-center space-x-5 cursor-default transition-transform">
                  <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full overflow-hidden flex-shrink-0 shadow-lg border-[3px] border-[#0A0E1A] relative bg-gray-800">
                    <Image src="/mentors/Eka.jpeg" alt="Eka Pramudhita" fill className="object-cover" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-lg sm:text-xl leading-tight mb-1">Eka Pramudhita</p>
                    <span className="inline-block px-3 py-1 bg-[#C9A84C]/20 text-[#C9A84C] text-xs font-bold rounded-full uppercase tracking-widest">Pemateri</span>
                  </div>
                </motion.div>

                {/* Host (Desi) */}
                <motion.div whileHover={{ scale: 1.03, x: 10 }} className="flex items-center space-x-5 cursor-default transition-transform">
                  <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full overflow-hidden flex-shrink-0 shadow-lg border-[3px] border-[#0A0E1A] relative bg-gray-800">
                    <Image src="/mentors/Desi2.jpeg" alt="Desi Oktasari" fill className="object-cover object-top" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-lg sm:text-xl leading-tight mb-1">Desi Oktasari</p>
                    <span className="inline-block px-3 py-1 bg-[#00C9A7]/20 text-[#00C9A7] text-xs font-bold rounded-full uppercase tracking-widest">Host</span>
                  </div>
                </motion.div>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
}
