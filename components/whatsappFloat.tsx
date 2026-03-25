// // components/WhatsAppFloat.tsx
// "use client";

// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   MessageCircle,
//   X,
//   Send,
//   Clock,
//   CheckCheck,
//   User,
//   Headphones,
// } from "lucide-react";

// export default function WhatsAppFloat() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [hasNotification, setHasNotification] = useState(true);

//   // Auto show notification dot
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setHasNotification(true);
//     }, 3000);
//     return () => clearTimeout(timer);
//   }, []);

//   const handleOpenChat = () => {
//     setIsOpen(true);
//     setHasNotification(false);
//   };

//   const handleStartChat = () => {
//     const phoneNumber = "6285702212770"; // Ganti dengan nomor WhatsApp admin
//     const message = "Hi Admin FBL, saya ingin berkonsultasi";
//     const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
//     window.open(whatsappUrl, "_blank");
//   };

//   return (
//     <>
//       {/* Floating Button */}
//       <AnimatePresence>
//         {!isOpen && (
//           <motion.div
//             initial={{ scale: 0, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             exit={{ scale: 0, opacity: 0 }}
//             className="fixed bottom-6 right-6 z-50"
//           >
//             <motion.button
//               onClick={handleOpenChat}
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.95 }}
//               className="relative group"
//             >
//               {/* Pulse Animation */}
//               <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-75"></span>

//               {/* Main Button */}
//               <div className="relative bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white p-4 rounded-full shadow-2xl shadow-green-500/30 flex items-center justify-center">
//                 <MessageCircle size={28} fill="currentColor" />
//               </div>

//               {/* Notification Badge */}
//               {hasNotification && (
//                 <motion.span
//                   initial={{ scale: 0 }}
//                   animate={{ scale: 1 }}
//                   className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white"
//                 >
//                   1
//                 </motion.span>
//               )}

//               {/* Tooltip */}
//               <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-[#111A4A] text-white text-sm px-4 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none hidden md:block">
//                 <span className="font-medium">Konsultasi Gratis</span>
//                 <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 bg-[#111A4A] rotate-45"></div>
//               </div>
//             </motion.button>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Chat Window */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: 20, scale: 0.95 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: 20, scale: 0.95 }}
//             transition={{ duration: 0.3 }}
//             className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)]"
//           >
//             {/* Chat Card */}
//             <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
//               {/* Header */}
//               <div className="bg-gradient-to-r from-[#156d95] to-[#111A4A] p-5 relative">
//                 <button
//                   onClick={() => setIsOpen(false)}
//                   className="absolute top-4 right-4 text-white/80 hover:text-white transition p-1 rounded-full hover:bg-white/10"
//                 >
//                   <X size={20} />
//                 </button>

//                 <div className="flex items-center gap-3">
//                   {/* Avatar */}
//                   <div className="relative">
//                     <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
//                       <Headphones size={24} className="text-white" />
//                     </div>
//                     <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#25D366] border-2 border-[#156d95] rounded-full"></span>
//                   </div>

//                   <div>
//                     <h3 className="text-white font-semibold text-lg">
//                       Admin FBL
//                     </h3>
//                     <div className="flex items-center gap-1.5 text-green-300 text-sm">
//                       <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
//                       Online
//                     </div>
//                   </div>
//                 </div>

//                 {/* Subtitle */}
//                 <p className="text-white/80 text-sm mt-3 pl-[60px]">
//                   Konsultasi trading gratis, biasanya membalas dalam beberapa
//                   menit
//                 </p>
//               </div>

//               {/* Chat Body */}
//               <div className="bg-[#E5DDD5] p-4 min-h-[280px] max-h-[320px] overflow-y-auto">
//                 {/* Time */}
//                 <div className="text-center mb-4">
//                   <span className="bg-[#99BEBA]/30 text-[#54656F] text-xs px-3 py-1 rounded-full">
//                     Hari ini
//                   </span>
//                 </div>

//                 {/* Welcome Message */}
//                 <motion.div
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: 0.2 }}
//                   className="flex gap-2 mb-4"
//                 >
//                   <div className="w-8 h-8 bg-gradient-to-br from-[#156d95] to-[#111A4A] rounded-full flex items-center justify-center flex-shrink-0">
//                     <span className="text-white text-xs font-bold">FBL</span>
//                   </div>
//                   <div className="bg-white rounded-2xl rounded-tl-sm p-3 shadow-sm max-w-[80%]">
//                     <p className="text-gray-800 text-sm leading-relaxed">
//                       Halo! 👋 Selamat datang di{" "}
//                       <strong>Forex for Better Living</strong>. Saya siap
//                       membantu Anda dengan:
//                     </p>
//                     <ul className="text-sm text-gray-600 mt-2 space-y-1">
//                       <li className="flex items-center gap-2">
//                         <span className="w-1 h-1 bg-[#156d95] rounded-full"></span>
//                         Konsultasi strategi trading
//                       </li>
//                       <li className="flex items-center gap-2">
//                         <span className="w-1 h-1 bg-[#156d95] rounded-full"></span>
//                         Informasi kursus & edukasi
//                       </li>
//                       <li className="flex items-center gap-2">
//                         <span className="w-1 h-1 bg-[#156d95] rounded-full"></span>
//                         Analisis market terkini
//                       </li>
//                     </ul>
//                     <div className="flex items-center gap-1 mt-2 text-[#99BEBA] text-xs">
//                       <Clock size={12} />
//                       <span>Baru saja</span>
//                     </div>
//                   </div>
//                 </motion.div>

//                 {/* Suggested Message */}
//                 <motion.div
//                   initial={{ opacity: 0, x: 20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: 0.4 }}
//                   className="flex justify-end mb-4"
//                 >
//                   <div className="bg-[#DCF8C6] rounded-2xl rounded-tr-sm p-3 shadow-sm max-w-[85%]">
//                     <p className="text-gray-800 text-sm">
//                       Hi Admin FBL, saya ingin berkonsultasi
//                     </p>
//                     <div className="flex items-center justify-end gap-1 mt-1 text-[#99BEBA] text-xs">
//                       <span>Baru saja</span>
//                       <CheckCheck size={14} className="text-[#53BDEB]" />
//                     </div>
//                   </div>
//                 </motion.div>

//                 {/* Typing Indicator */}
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 0.6 }}
//                   className="flex gap-2"
//                 >
//                   <div className="w-8 h-8 bg-gradient-to-br from-[#156d95] to-[#111A4A] rounded-full flex items-center justify-center flex-shrink-0">
//                     <span className="text-white text-xs font-bold">FBL</span>
//                   </div>
//                   <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
//                     <div className="flex gap-1">
//                       <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
//                       <span
//                         className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
//                         style={{ animationDelay: "0.1s" }}
//                       ></span>
//                       <span
//                         className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
//                         style={{ animationDelay: "0.2s" }}
//                       ></span>
//                     </div>
//                   </div>
//                 </motion.div>
//               </div>

//               {/* Footer / CTA */}
//               <div className="p-4 bg-white border-t border-gray-100">
//                 <motion.button
//                   onClick={handleStartChat}
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   className="w-full bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#22c55e] hover:to-[#16a34a] text-white font-semibold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-green-500/25 transition-all duration-300"
//                 >
//                   <Send size={18} />
//                   Mulai Chat WhatsApp
//                 </motion.button>

//                 <p className="text-center text-gray-400 text-xs mt-3">
//                   Powered by Forex for Better Living
//                 </p>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }

// components/WhatsAppFloat.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, CheckCheck, Bot, User } from "lucide-react";

// Tipe data untuk pesan
interface Message {
  id: string;
  text: string;
  sender: "bot" | "user";
  timestamp: Date;
}

// Respon chatbot otomatis berdasarkan keyword
const getBotResponse = (userMessage: string): string => {
  const lowerMsg = userMessage.toLowerCase();

  if (
    lowerMsg.includes("halo") ||
    lowerMsg.includes("hi") ||
    lowerMsg.includes("hello")
  ) {
    return "Halo! 👋 Senang bertemu dengan Anda. Ada yang bisa saya bantu terkait trading forex atau edukasi di FBL?";
  }

  if (
    lowerMsg.includes("kursus") ||
    lowerMsg.includes("kelas") ||
    lowerMsg.includes("belajar")
  ) {
    return "Kami memiliki berbagai program edukasi trading:\n\n📚 Kelas Pemula - Dasar-dasar forex\n📈 Kelas Intermediate - Strategi teknikal\n🎯 Kelas Advanced - Risk management\n\nIngin tahu detail harga dan jadwal?";
  }

  if (
    lowerMsg.includes("harga") ||
    lowerMsg.includes("biaya") ||
    lowerMsg.includes("berapa")
  ) {
    return "Biaya kursus bervariasi mulai dari 500rb - 2jt tergantung levelnya. Kami juga sering ada promo diskon hingga 30%! 🎉\n\nMau info promo terbaru?";
  }

  if (
    lowerMsg.includes("analisa") ||
    lowerMsg.includes("signal") ||
    lowerMsg.includes("market")
  ) {
    return "Tim analis FBL menyediakan:\n\n📊 Analisa harian EUR/USD, GBP/USD, XAU/USD\n📉 Signal trading dengan risk ratio\n📰 Berita market terkini\n\nIni gratis untuk member kursus!";
  }

  if (
    lowerMsg.includes("daftar") ||
    lowerMsg.includes("join") ||
    lowerMsg.includes("gabung")
  ) {
    return "Mantap! 🚀 Untuk pendaftaran, saya akan hubungkan Anda dengan Admin FBL via WhatsApp untuk proses registrasi dan pembayaran.\n\nKlik tombol hijau di bawah ya!";
  }

  if (
    lowerMsg.includes("terima kasih") ||
    lowerMsg.includes("thanks") ||
    lowerMsg.includes("makasih")
  ) {
    return "Sama-sama! 😊 Senang bisa membantu. Jika ada pertanyaan lain, silakan tanya saja atau chat langsung dengan Admin via WhatsApp.";
  }

  if (
    lowerMsg.includes("jam") ||
    lowerMsg.includes("buka") ||
    lowerMsg.includes("operasional")
  ) {
    return "Admin FBL online:\n🕐 Senin-Jumat: 08.00 - 20.00 WIB\n🕐 Sabtu: 09.00 - 17.00 WIB\n\nChatbot ini available 24 jam! 🤖";
  }

  return (
    'Menarik! 🤔 Untuk informasi lebih detail tentang "' +
    userMessage +
    '", saya sarankan berkonsultasi langsung dengan Admin FBL via WhatsApp. Mau saya hubungkan sekarang?'
  );
};

export default function WhatsAppFloat() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasNotification, setHasNotification] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto show notification dot
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasNotification(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Initialize welcome message saat chat dibuka
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        addMessage({
          id: "welcome",
          text: "Halo! 👋 Selamat datang di Forex for Better Living.\n\nSaya assistant virtual FBL yang siap membantu Anda dengan:\n• Konsultasi strategi trading\n• Informasi kursus & edukasi\n• Analisis market terkini\n• Info pendaftaran & biaya\n\nAda yang bisa saya bantu?",
          sender: "bot",
          timestamp: new Date(),
        });
      }, 500);
    }
  }, [isOpen]);

  // Auto scroll ke pesan terbaru
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Focus input saat chat dibuka
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const addMessage = (msg: Message) => {
    setMessages((prev) => [...prev, msg]);
  };

  const handleOpenChat = () => {
    setIsOpen(true);
    setHasNotification(false);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Tambah pesan user
    const userMsg: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };
    addMessage(userMsg);
    setInputValue("");

    // Simulasi typing indicator
    setIsTyping(true);

    // Delay respon bot (1.5-2.5 detik random)
    const delay = 1500 + Math.random() * 1000;

    setTimeout(() => {
      setIsTyping(false);
      const botResponse = getBotResponse(userMsg.text);

      addMessage({
        id: "bot-" + Date.now(),
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      });
    }, delay);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleStartChat = () => {
    const phoneNumber = "6285702212770";
    const lastMessage = messages[messages.length - 1]?.text || "";

    // Buat pesan yang mengarahkan ke WA dengan konteks percakapan
    let waMessage = "Hi Admin FBL, saya ingin berkonsultasi";

    if (messages.length > 1) {
      waMessage = `Hi Admin FBL, saya baru saja chat dengan bot FBL dan ingin konsultasi lebih lanjut tentang:\n${lastMessage.substring(0, 100)}${lastMessage.length > 100 ? "..." : ""}`;
    }

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(waMessage)}`;
    window.open(whatsappUrl, "_blank");
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      {/* Floating Button - TETAP SAMA */}
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
              <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-75"></span>
              <div className="relative bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white p-4 rounded-full shadow-2xl shadow-green-500/30 flex items-center justify-center">
                <MessageCircle size={28} fill="currentColor" />
              </div>
              {hasNotification && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white"
                >
                  1
                </motion.span>
              )}
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
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
              {/* Header - TETAP SAMA STYLE */}
              <div className="bg-gradient-to-r from-[#156d95] to-[#111A4A] p-5 relative">
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 text-white/80 hover:text-white transition p-1 rounded-full hover:bg-white/10"
                >
                  <X size={20} />
                </button>

                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <Bot size={24} className="text-white" />
                    </div>
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#25D366] border-2 border-[#156d95] rounded-full"></span>
                  </div>

                  <div>
                    <h3 className="text-white font-semibold text-lg">
                      FBL Assistant
                    </h3>
                    <div className="flex items-center gap-1.5 text-green-300 text-sm">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                      Online 24/7
                    </div>
                  </div>
                </div>

                <p className="text-white/80 text-sm mt-3 pl-[60px]">
                  Chatbot otomatis. Untuk konsultasi lanjutan, hubungi Admin via
                  WhatsApp.
                </p>
              </div>

              {/* Chat Body - DYNAMIC MESSAGES */}
              <div className="bg-[#E5DDD5] p-4 min-h-[280px] max-h-[320px] overflow-y-auto">
                <div className="text-center mb-4">
                  <span className="bg-[#99BEBA]/30 text-[#54656F] text-xs px-3 py-1 rounded-full">
                    Hari ini
                  </span>
                </div>

                {/* Render Messages */}
                {messages.map((msg, index) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex gap-2 mb-3 ${
                      msg.sender === "user" ? "justify-end" : ""
                    }`}
                  >
                    {msg.sender === "bot" && (
                      <div className="w-8 h-8 bg-gradient-to-br from-[#156d95] to-[#111A4A] rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot size={16} className="text-white" />
                      </div>
                    )}

                    <div
                      className={`max-w-[80%] rounded-2xl p-3 shadow-sm ${
                        msg.sender === "user"
                          ? "bg-[#DCF8C6] rounded-tr-sm"
                          : "bg-white rounded-tl-sm"
                      }`}
                    >
                      <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-line">
                        {msg.text}
                      </p>
                      <div
                        className={`flex items-center gap-1 mt-1 text-[#99BEBA] text-xs ${
                          msg.sender === "user" ? "justify-end" : ""
                        }`}
                      >
                        <span>{formatTime(msg.timestamp)}</span>
                        {msg.sender === "user" && (
                          <CheckCheck size={14} className="text-[#53BDEB]" />
                        )}
                      </div>
                    </div>

                    {msg.sender === "user" && (
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                        <User size={16} className="text-gray-600" />
                      </div>
                    )}
                  </motion.div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-2"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-[#156d95] to-[#111A4A] rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot size={16} className="text-white" />
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
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area - BARU */}
              <div className="p-3 bg-white border-t border-gray-100">
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ketik pesan Anda..."
                    className="flex-1 bg-gray-100 text-gray-800 text-sm px-4 py-2.5 rounded-full focus:outline-none focus:ring-2 focus:ring-[#156d95]/50 placeholder-gray-500"
                  />
                  <motion.button
                    onClick={handleSendMessage}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={!inputValue.trim()}
                    className="bg-[#156d95] text-white p-2.5 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#0f5a7a] transition-colors"
                  >
                    <Send size={18} />
                  </motion.button>
                </div>
              </div>

              {/* Footer / CTA ke WhatsApp - TETAP SAMA STYLE */}
              <div className="p-4 bg-white border-t border-gray-100">
                <motion.button
                  onClick={handleStartChat}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#22c55e] hover:to-[#16a34a] text-white font-semibold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-green-500/25 transition-all duration-300"
                >
                  <MessageCircle size={18} />
                  Chat Langsung Admin WhatsApp
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
