"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Clock, MapPin, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

export default function WebinarPopup() {
    const [isOpen, setIsOpen] = useState(false);
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        // Show popup after a short delay
        const timer = setTimeout(() => {
            setIsOpen(true);
        }, 1000);
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
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-4xl max-h-[95vh] rounded-3xl bg-[#0A0E1A] text-white shadow-[0_0_50px_rgba(0,201,167,0.2)] border border-[#00C9A7]/30 flex flex-col md:flex-row overflow-y-auto overflow-x-hidden md:overflow-hidden"
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 z-50 rounded-full bg-black/50 p-2 text-white hover:bg-[#00C9A7] transition-colors"
                        >
                            <X className="h-5 w-5" />
                        </button>

                        {/* Left Side: Info & Countdown */}
                        <div className="flex-1 p-5 sm:p-8 flex flex-col justify-center relative overflow-hidden">
                            {/* Animated Background accents */}
                            <motion.div
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.3, 0.5, 0.3],
                                }}
                                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -top-20 -left-20 w-64 h-64 bg-[#00C9A7]/20 rounded-full blur-[80px] pointer-events-none"
                            />
                            <motion.div
                                animate={{
                                    scale: [1, 1.3, 1],
                                    opacity: [0.2, 0.4, 0.2],
                                }}
                                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#C9A84C]/20 rounded-full blur-[80px] pointer-events-none"
                            />

                            <div className="relative z-10">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <span className="inline-flex items-center rounded-full bg-[#C9A84C]/20 px-3 py-1 text-[10px] sm:text-xs font-bold text-[#C9A84C] tracking-wider uppercase mb-3 border border-[#C9A84C]/30 shadow-sm">
                                        <Sparkles className="w-3 h-3 mr-1" /> Webinar Eksklusif • 100% Gratis
                                    </span>
                                </motion.div>

                                <h2 className="text-2xl sm:text-3xl font-bold mb-2 leading-tight">
                                    Manajemen Trading Forex dengan <span className="text-[#00C9A7]">EA/Robot Trading FBL</span>
                                </h2>

                                <p className="text-lg sm:text-xl text-gray-300 font-medium mb-5">
                                    Peluang, Risiko & Cara Kerja Sebenarnya
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 text-gray-300 text-sm">
                                    <div className="flex items-center">
                                        <Calendar className="w-4 h-4 mr-2 text-[#C9A84C]" />
                                        <span className="font-medium">20 Juli 2026</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Clock className="w-4 h-4 mr-2 text-[#C9A84C]" />
                                        <span className="font-medium">19.00 - 21.00 WIB</span>
                                    </div>
                                    <div className="flex items-center sm:col-span-2">
                                        <MapPin className="w-4 h-4 mr-2 text-[#C9A84C]" />
                                        <span className="font-medium">Google Meet (Link via WA Group)</span>
                                    </div>
                                </div>

                                {/* Countdown */}
                                <div className="mb-6">
                                    <div className="flex space-x-2 sm:space-x-3">
                                        {[
                                            { label: "HARI", value: timeLeft.days },
                                            { label: "JAM", value: timeLeft.hours },
                                            { label: "MENIT", value: timeLeft.minutes },
                                            { label: "DETIK", value: timeLeft.seconds },
                                        ].map((item, i) => (
                                            <div key={i} className="flex flex-col items-center">
                                                <div className="flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-xl bg-gray-900 border border-[#00C9A7]/30 shadow-inner relative overflow-hidden group">
                                                    <div className="absolute inset-0 bg-[#00C9A7]/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                                    <span className="text-xl sm:text-2xl font-bold text-[#00C9A7]">
                                                        {item.value.toString().padStart(2, "0")}
                                                    </span>
                                                </div>
                                                <span className="mt-1.5 text-[10px] text-gray-400 font-bold tracking-widest">{item.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Highlighted Benefits */}
                                <motion.div
                                    animate={{
                                        boxShadow: ["0 0 0px rgba(0,201,167,0)", "0 0 15px rgba(0,201,167,0.3)", "0 0 0px rgba(0,201,167,0)"]
                                    }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="rounded-xl bg-gradient-to-r from-[#00C9A7]/15 to-[#00C9A7]/5 p-4 border border-[#00C9A7]/40 relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 p-2 opacity-20">
                                        <Sparkles className="w-12 h-12 text-[#00C9A7]" />
                                    </div>
                                    <h4 className="font-bold text-[#00C9A7] mb-2 text-base flex items-center">
                                        Benefit Eksklusif (GRATIS):
                                    </h4>
                                    <ul className="text-xs sm:text-sm text-white space-y-1.5 font-medium relative z-10">
                                        <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-[#C9A84C] mr-2 flex-shrink-0" /> Materi Profesional Trading Forex</li>
                                        <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-[#C9A84C] mr-2 flex-shrink-0" /> Position Size Calculator .ex4 & .ex5</li>
                                        <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-[#C9A84C] mr-2 flex-shrink-0" /> Free Trial Robot Trading 30 Hari</li>
                                    </ul>
                                </motion.div>
                            </div>
                        </div>

                        {/* Right Side: Speakers & QR */}
                        <div className="w-full md:w-[320px] bg-[#111827] p-5 sm:p-8 flex flex-col justify-between border-t md:border-t-0 md:border-l border-gray-800 relative z-10">

                            <div>
                                <h3 className="text-base font-bold text-white mb-4 border-b border-gray-800 pb-2 flex items-center justify-between">
                                    <span>Pembicara & Host</span>
                                </h3>

                                <div className="space-y-4">
                                    {/* Speaker 1 (SW) */}
                                    <motion.div
                                        whileHover={{ scale: 1.05, x: 5 }}
                                        className="flex items-center space-x-3 cursor-default"
                                    >
                                        <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full overflow-hidden flex-shrink-0 shadow-lg border-2 border-[#111827] relative bg-gray-800">
                                            <Image
                                                src="/mentors/pakwi.jpeg"
                                                alt="Eka Pramudhita"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <p className="font-bold text-white text-sm leading-tight">Sindhurahardjo W.</p>
                                            <p className="text-[10px] font-medium text-[#C9A84C] mt-0.5 uppercase tracking-wider">Pemateri</p>
                                        </div>
                                    </motion.div>

                                    {/* Speaker 2 (Eka) */}
                                    <motion.div
                                        whileHover={{ scale: 1.05, x: 5 }}
                                        className="flex items-center space-x-3 cursor-default"
                                    >
                                        <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full overflow-hidden flex-shrink-0 shadow-lg border-2 border-[#111827] relative bg-gray-800">
                                            <Image
                                                src="/mentors/Eka.jpeg"
                                                alt="Eka Pramudhita"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <p className="font-bold text-white text-sm leading-tight">Eka Pramudhita</p>
                                            <p className="text-[10px] font-medium text-[#C9A84C] mt-0.5 uppercase tracking-wider">Pemateri</p>
                                        </div>
                                    </motion.div>

                                    {/* Host (Desi) */}
                                    <motion.div
                                        whileHover={{ scale: 1.05, x: 5 }}
                                        className="flex items-center space-x-3 cursor-default"
                                    >
                                        <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full overflow-hidden flex-shrink-0 shadow-lg border-2 border-[#111827] relative bg-gray-800">
                                            <Image
                                                src="/mentors/Desi2.jpeg"
                                                alt="Desi Oktasari"
                                                fill
                                                className="object-cover object-top"
                                            />
                                        </div>
                                        <div>
                                            <p className="font-bold text-white text-sm leading-tight">Desi Oktasari</p>
                                            <p className="text-[10px] font-medium text-[#00C9A7] mt-0.5 uppercase tracking-wider">Host</p>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>

                            <div className="mt-6 pt-5 border-t border-gray-800 flex flex-col items-center text-center">
                                <div className="bg-white p-2 rounded-xl mb-4 shadow-[0_0_20px_rgba(0,201,167,0.2)] transform transition-transform hover:scale-105 duration-300 relative">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                        className="absolute -inset-1 rounded-xl border border-dashed border-[#00C9A7]/50"
                                    />
                                    <div className="relative w-24 h-24">
                                        <Image
                                            src="/webinar/tiny_cc_PendaftaranWebinarFBL.png"
                                            alt="QR Code Pendaftaran"
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                </div>

                                <a
                                    href="http://tiny.cc/PendaftaranWebinarFBL"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-full relative overflow-hidden group rounded-lg bg-[#00C9A7] px-4 py-3 font-bold text-[#0A0E1A] shadow-lg transition-all hover:shadow-[0_0_20px_rgba(0,201,167,0.5)] hover:-translate-y-1 active:translate-y-0"
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2 text-xs sm:text-sm uppercase tracking-wider">
                                        Daftar Sekarang
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                                    </span>
                                    <div className="absolute inset-0 z-0 h-full w-full bg-gradient-to-r from-teal-400 to-[#00C9A7] opacity-0 transition-opacity group-hover:opacity-100" />
                                </a>
                                <p className="text-[10px] text-gray-400 mt-3 font-medium">Slot terbatas! Daftar sebelum kehabisan.</p>
                            </div>

                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
