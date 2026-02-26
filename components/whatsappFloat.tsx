// components/WhatsAppFloat.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  Clock,
  CheckCheck,
  User,
  Headphones,
} from "lucide-react";

export default function WhatsAppFloat() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasNotification, setHasNotification] = useState(true);

  // Auto show notification dot
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasNotification(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenChat = () => {
    setIsOpen(true);
    setHasNotification(false);
  };

  const handleStartChat = () => {
    const phoneNumber = "6285702212770"; // Ganti dengan nomor WhatsApp admin
    const message = "Hi Admin FBL, saya ingin berkonsultasi";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <motion.button
              onClick={handleOpenChat}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              {/* Pulse Animation */}
              <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-75"></span>

              {/* Main Button */}
              <div className="relative bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white p-4 rounded-full shadow-2xl shadow-green-500/30 flex items-center justify-center">
                <MessageCircle size={28} fill="currentColor" />
              </div>

              {/* Notification Badge */}
              {hasNotification && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white"
                >
                  1
                </motion.span>
              )}

              {/* Tooltip */}
              <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-[#111A4A] text-white text-sm px-4 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none hidden md:block">
                <span className="font-medium">Konsultasi Gratis</span>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 bg-[#111A4A] rotate-45"></div>
              </div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)]"
          >
            {/* Chat Card */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
              {/* Header */}
              <div className="bg-gradient-to-r from-[#156d95] to-[#111A4A] p-5 relative">
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 text-white/80 hover:text-white transition p-1 rounded-full hover:bg-white/10"
                >
                  <X size={20} />
                </button>

                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <Headphones size={24} className="text-white" />
                    </div>
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#25D366] border-2 border-[#156d95] rounded-full"></span>
                  </div>

                  <div>
                    <h3 className="text-white font-semibold text-lg">
                      Admin FBL
                    </h3>
                    <div className="flex items-center gap-1.5 text-green-300 text-sm">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                      Online
                    </div>
                  </div>
                </div>

                {/* Subtitle */}
                <p className="text-white/80 text-sm mt-3 pl-[60px]">
                  Konsultasi trading gratis, biasanya membalas dalam beberapa
                  menit
                </p>
              </div>

              {/* Chat Body */}
              <div className="bg-[#E5DDD5] p-4 min-h-[280px] max-h-[320px] overflow-y-auto">
                {/* Time */}
                <div className="text-center mb-4">
                  <span className="bg-[#99BEBA]/30 text-[#54656F] text-xs px-3 py-1 rounded-full">
                    Hari ini
                  </span>
                </div>

                {/* Welcome Message */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex gap-2 mb-4"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-[#156d95] to-[#111A4A] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">FBL</span>
                  </div>
                  <div className="bg-white rounded-2xl rounded-tl-sm p-3 shadow-sm max-w-[80%]">
                    <p className="text-gray-800 text-sm leading-relaxed">
                      Halo! 👋 Selamat datang di{" "}
                      <strong>Forex for Better Living</strong>. Saya siap
                      membantu Anda dengan:
                    </p>
                    <ul className="text-sm text-gray-600 mt-2 space-y-1">
                      <li className="flex items-center gap-2">
                        <span className="w-1 h-1 bg-[#156d95] rounded-full"></span>
                        Konsultasi strategi trading
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1 h-1 bg-[#156d95] rounded-full"></span>
                        Informasi kursus & edukasi
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1 h-1 bg-[#156d95] rounded-full"></span>
                        Analisis market terkini
                      </li>
                    </ul>
                    <div className="flex items-center gap-1 mt-2 text-[#99BEBA] text-xs">
                      <Clock size={12} />
                      <span>Baru saja</span>
                    </div>
                  </div>
                </motion.div>

                {/* Suggested Message */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex justify-end mb-4"
                >
                  <div className="bg-[#DCF8C6] rounded-2xl rounded-tr-sm p-3 shadow-sm max-w-[85%]">
                    <p className="text-gray-800 text-sm">
                      Hi Admin FBL, saya ingin berkonsultasi
                    </p>
                    <div className="flex items-center justify-end gap-1 mt-1 text-[#99BEBA] text-xs">
                      <span>Baru saja</span>
                      <CheckCheck size={14} className="text-[#53BDEB]" />
                    </div>
                  </div>
                </motion.div>

                {/* Typing Indicator */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex gap-2"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-[#156d95] to-[#111A4A] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">FBL</span>
                  </div>
                  <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                      <span
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></span>
                      <span
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Footer / CTA */}
              <div className="p-4 bg-white border-t border-gray-100">
                <motion.button
                  onClick={handleStartChat}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#22c55e] hover:to-[#16a34a] text-white font-semibold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-green-500/25 transition-all duration-300"
                >
                  <Send size={18} />
                  Mulai Chat WhatsApp
                </motion.button>

                <p className="text-center text-gray-400 text-xs mt-3">
                  Powered by Forex for Better Living
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
