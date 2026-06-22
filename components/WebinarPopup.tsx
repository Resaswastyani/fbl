"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Clock, MapPin, ArrowRight } from "lucide-react";

export default function WebinarPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Show popup after a short delay
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1500);
    return () => clearTimeout(timer);
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
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl rounded-3xl bg-[#0A0E1A] text-white shadow-[0_0_50px_rgba(0,201,167,0.2)] border border-[#00C9A7]/30 flex flex-col md:flex-row my-auto overflow-hidden"
          >
            {/* Close Button */}
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-20 rounded-full bg-black/50 p-2 text-white hover:bg-[#00C9A7] transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Left Side: Info & Countdown */}
            <div className="flex-1 p-6 sm:p-10 flex flex-col justify-center relative overflow-hidden">
              {/* Background accent */}
              <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#00C9A7]/20 rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#C9A84C]/10 rounded-full blur-[100px] pointer-events-none" />
              
              <div className="relative z-10">
                <span className="inline-block rounded-full bg-[#C9A84C]/20 px-4 py-1.5 text-xs font-bold text-[#C9A84C] tracking-wider uppercase mb-5 border border-[#C9A84C]/30 shadow-sm">
                  Webinar Eksklusif • 100% Gratis
                </span>
                
                <h2 className="text-3xl sm:text-5xl font-bold mb-4 leading-tight">
                  <span className="text-[#00C9A7]">ROBOT TRADING</span> FOREX
                </h2>
                
                <p className="text-xl sm:text-2xl text-gray-300 font-medium mb-6">
                  Peluang, Risiko & Cara Kerja Sebenarnya
                </p>

                <div className="flex flex-col space-y-3 mb-8 text-gray-300">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-3 text-[#C9A84C]" />
                    <span className="font-medium">Senin, 20 Juli 2026</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-3 text-[#C9A84C]" />
                    <span className="font-medium">19.00 - 21.00 WIB</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 mr-3 text-[#C9A84C]" />
                    <span className="font-medium">Google Meet (Link via WA Group)</span>
                  </div>
                </div>

                {/* Countdown */}
                <div className="mb-8">
                  <h3 className="text-sm text-gray-400 uppercase tracking-widest mb-3 font-semibold">Hitung Mundur Acara</h3>
                  <div className="flex space-x-3 sm:space-x-4">
                    {[
                      { label: "HARI", value: timeLeft.days },
                      { label: "JAM", value: timeLeft.hours },
                      { label: "MENIT", value: timeLeft.minutes },
                      { label: "DETIK", value: timeLeft.seconds },
                    ].map((item, i) => (
                      <div key={i} className="flex flex-col items-center">
                        <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-gray-900 border border-[#00C9A7]/30 shadow-inner relative overflow-hidden group">
                          <div className="absolute inset-0 bg-[#00C9A7]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          <span className="text-2xl sm:text-4xl font-bold text-[#00C9A7]">
                            {item.value.toString().padStart(2, "0")}
                          </span>
                        </div>
                        <span className="mt-2 text-xs text-gray-400 font-bold tracking-widest">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl bg-gradient-to-r from-[#00C9A7]/10 to-transparent p-5 border-l-4 border-[#00C9A7]">
                  <h4 className="font-semibold text-white mb-2 text-lg">Trading Starter Kit Pack:</h4>
                  <ul className="text-sm text-gray-300 space-y-2 list-none">
                    <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] mr-2"></span> Materi Profesional Trading Forex</li>
                    <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] mr-2"></span> EA File Calculator .ex4 & .ex5</li>
                    <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] mr-2"></span> Free Trial Robot Trading 30 Hari</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Side: Speakers & QR */}
            <div className="w-full md:w-[380px] bg-[#111827] p-6 sm:p-10 flex flex-col justify-between border-t md:border-t-0 md:border-l border-gray-800 relative z-10">
              
              <div>
                <h3 className="text-lg font-bold text-white mb-6 border-b border-gray-800 pb-3 flex items-center justify-between">
                  <span>Pembicara & Host</span>
                </h3>
                
                <div className="space-y-5">
                  {/* Speaker 1 (SW) */}
                  <div className="flex items-center space-x-4">
                    <div className="h-14 w-14 rounded-full bg-gradient-to-br from-[#00C9A7] to-blue-800 flex items-center justify-center flex-shrink-0 shadow-lg border-2 border-[#111827]">
                      <span className="text-white font-bold text-lg tracking-wider">SW</span>
                    </div>
                    <div>
                      <p className="font-bold text-white text-base leading-tight">Sindhurahardjo W.</p>
                      <p className="text-xs font-medium text-[#C9A84C] mt-0.5 uppercase tracking-wider">Pemateri</p>
                    </div>
                  </div>

                  {/* Speaker 2 (Eka) */}
                  <div className="flex items-center space-x-4">
                    <div className="h-14 w-14 rounded-full overflow-hidden flex-shrink-0 shadow-lg border-2 border-[#111827] relative bg-gray-800">
                      <Image 
                        src="/mentors/Eka.jpeg" 
                        alt="Eka Pramudhita" 
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-white text-base leading-tight">Eka Pramudhita</p>
                      <p className="text-xs font-medium text-[#C9A84C] mt-0.5 uppercase tracking-wider">Pemateri</p>
                    </div>
                  </div>

                  {/* Host (Desi) */}
                  <div className="flex items-center space-x-4">
                    <div className="h-14 w-14 rounded-full overflow-hidden flex-shrink-0 shadow-lg border-2 border-[#111827] relative bg-gray-800">
                      <Image 
                        src="/mentors/Desi.jpeg" 
                        alt="Desi Oktasari" 
                        fill
                        className="object-cover object-top"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-white text-base leading-tight">Desi Oktasari</p>
                      <p className="text-xs font-medium text-[#00C9A7] mt-0.5 uppercase tracking-wider">Host</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col items-center text-center">
                <p className="text-sm font-semibold text-gray-300 mb-4">
                  Scan QR code untuk mendaftar
                </p>
                <div className="bg-white p-2.5 rounded-2xl mb-6 shadow-[0_0_25px_rgba(0,201,167,0.15)] transform transition-transform hover:scale-105 duration-300">
                  <div className="relative w-32 h-32">
                    <Image 
                      src="/webinar/tiny_cc_PendaftaranWebinarFBL.png" 
                      alt="QR Code Pendaftaran" 
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                
                <a 
                  href="https://forms.gle/ForexForBetterLiving2026" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full relative overflow-hidden group rounded-xl bg-[#00C9A7] px-6 py-4 font-bold text-[#0A0E1A] shadow-lg transition-all hover:shadow-[0_0_20px_rgba(0,201,167,0.4)] hover:scale-[1.02] active:scale-95"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2 text-sm uppercase tracking-wider">
                    Daftar Sekarang
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                  </span>
                  <div className="absolute inset-0 z-0 h-full w-full bg-gradient-to-r from-teal-400 to-[#00C9A7] opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
              </div>
              
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
