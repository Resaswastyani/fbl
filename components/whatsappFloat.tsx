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

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageCircle, 
  X, 
  Send, 
  CheckCheck, 
  Bot, 
  User, 
  ChevronDown, 
  ChevronUp,
  Clock,
  HelpCircle,
  BookOpen,
  TrendingUp,
  DollarSign,
  Calendar,
  MapPin,
  Phone,
  MessageSquare,
  Sparkles,
  History,
  Trash2,
  Menu,
  ArrowLeft
} from "lucide-react";

// Tipe data untuk pesan
interface Message {
  id: string;
  text: string;
  sender: "bot" | "user";
  timestamp: Date;
  type?: "text" | "quick_reply" | "menu" | "card";
  metadata?: any;
}

// Tipe data untuk menu navigasi
interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  description: string;
  keywords: string[];
}

// Data menu navigasi
const MENU_ITEMS: MenuItem[] = [
  {
    id: "kursus",
    label: "Program Edukasi",
    icon: <BookOpen size={18} />,
    description: "Info kelas, batch, dan kurikulum",
    keywords: ["kursus", "kelas", "belajar", "edukasi", "batch", "program", "kurikulum"]
  },
  {
    id: "trading",
    label: "Trading & Analisis",
    icon: <TrendingUp size={18} />,
    description: "Signal, analisa market, strategi",
    keywords: ["trading", "analisa", "signal", "market", "forex", "strategi"]
  },
  {
    id: "biaya",
    label: "Biaya & Investasi",
    icon: <DollarSign size={18} />,
    description: "Harga, promo, dan pembayaran",
    keywords: ["harga", "biaya", "investasi", "bayar", "promo", "diskon"]
  },
  {
    id: "jadwal",
    label: "Jadwal & Lokasi",
    icon: <Calendar size={18} />,
    description: "Jadwal kelas dan lokasi offline",
    keywords: ["jadwal", "lokasi", "alamat", "kantor", "waktu", "tempat"]
  },
  {
    id: "tentang",
    label: "Tentang FBL",
    icon: <HelpCircle size={18} />,
    description: "Profil perusahaan dan legalitas",
    keywords: ["tentang", "profil", "legal", "resmi", "pt akademi", "nusantara"]
  }
];

// Database respons detail berdasarkan kategori
const DETAILED_RESPONSES: Record<string, string[]> = {
  kursus: [
    "📚 **Program Edukasi FBL**\n\nKami menyediakan 3 level kelas:\n\n**1. Kelas Pemula (Basic)**\n• Pengenalan Forex & pasar keuangan\n• Dasar-dasar analisis teknikal\n• Money management dasar\n• Psychology trading pemula\n• Durasi: 4 pertemuan\n• Cocok untuk: Pemula tanpa pengalaman\n\n**2. Kelas Menengah (Intermediate)**\n• Analisis teknikal lanjutan\n• Fundamental analysis\n• Risk management mendalam\n• Strategi trading harian\n• Durasi: 6 pertemuan\n• Bonus: Akses grup signal 1 bulan\n\n**3. Kelas Mahir (Advanced)**\n• Institutional trading strategies\n• Portfolio management\n• Advanced risk & money management\n• Live trading session intensif\n• Durasi: 8 pertemuan + 2 minggu mentoring\n• Bonus: Lifetime akses update materi\n\nSemua kelas mencakup:\n✅ Materi PDF & video recording\n✅ Sertifikat penyelesaian\n✅ Akses komunitas trader FBL\n✅ Konsultasi lifetime\n\nBatch baru dibuka setiap bulan! 🎯"
  ],
  trading: [
    "📈 **Layanan Trading & Analisis FBL**\n\n**Analisis Harian:**\n• EUR/USD, GBP/USD, USD/JPY\n• XAU/USD (Gold), XAG/USD (Silver)\n• Oil (WTI & Brent)\n• Major crypto pairs\n\n**Signal Trading:**\n• Entry point dengan risk ratio jelas\n• Stop loss & take level recommendations\n• Update real-time via WhatsApp grup\n• Win rate historis 70-75%\n\n**Instrumen yang Dipelajari:**\n• Major currency pairs\n• Cross currencies\n• Commodities (emas, perak, minyak)\n• Crypto-linked instruments\n• Index futures\n\n**Tools & Platform:**\n• MetaTrader 4/5 guidance\n• TradingView setup\n• Economic calendar analysis\n• Risk calculator tools\n\nSemua analisis menggunakan **institutional-grade data**! 📊"
  ],
  biaya: [
    "💰 **Investasi Edukasi di FBL**\n\n**Kelas Pemula:**\n• Normal: Rp 1.500.000\n• Promo Early Bird: Rp 1.200.000\n• Group (3 orang): Rp 1.000.000/orang\n\n**Kelas Intermediate:**\n• Normal: Rp 2.500.000\n• Promo: Rp 2.000.000\n• Bundle dengan Basic: Rp 3.000.000\n\n**Kelas Advanced:**\n• Normal: Rp 4.000.000\n• Promo: Rp 3.200.000\n• Full Package (Basic-Adv): Rp 5.500.000\n\n**Metode Pembayaran:**\n• Transfer Bank (BCA, Mandiri, BNI)\n• E-wallet (OVO, GoPay, DANA)\n• Kartu Kredit (via midtrans)\n• Cicilan 0% (CC tertentu)\n\n**Garansi:**\n✅ Uang kembali 100% jika tidak puas setelah 2 pertemuan pertama\n✅ Free retake kelas (seumur hidup)\n✅ Diskon alumni 30% untuk kelas lanjutan\n\nPromo berlaku terbatas! 🎉"
  ],
  jadwal: [
    "📅 **Jadwal & Lokasi FBL**\n\n**Jadwal Kelas Reguler:**\n\n*Weekday Class:*\n• Senin & Rabu: 19.00 - 21.30 WIB\n• Selasa & Kamis: 19.00 - 21.30 WIB\n\n*Weekend Class:*\n• Sabtu: 09.00 - 12.00 & 13.00 - 16.00 WIB\n• Minggu: 13.00 - 16.00 WIB (khusus private)\n\n**Format Belajar:**\n• Offline: Jakarta Selatan (Tebet/Epicentrum)\n• Online Live: Zoom/Google Meet interactive\n• Hybrid: Bebas pilih sesi offline/online\n• Private: Jadwal fleksibel sesuai request\n\n**Lokasi Offline:**\n📍 Tebet, Jakarta Selatan\n📍 Epicentrum Walk, Kuningan\n📍 (Coming Soon) Surabaya & Bandung\n\n**Fasilitas Offline:**\n• Ruang kelas AC & proyektor\n• WiFi high-speed\n• Coffee break & snack\n• Stationery set\n\nBatch baru: **April 2026** sudah buka pendaftaran! 🚀"
  ],
  tentang: [
    "🏢 **Tentang Forex for Better Living**\n\n**Legalitas:**\n• Nama Resmi: PT Akademi Keuangan Nusantara\n• Bidang: Layanan edukasi & konsultasi bisnis Forex Trading\n• Fokus: Masyarakat Indonesia\n\n**Visi:**\nMenjadikan trading forex sebagai instrumen keuangan yang dipahami dan dikuasai secara praktis, efektif, dan berorientasi hasil oleh masyarakat Indonesia.\n\n**Misi:**\n• Edukasi trading berkualitas dengan harga terjangkau\n• Pendampingan dari dasar hingga mahir\n• Komunitas trader yang supportif\n• Update market & strategi terkini\n\n**Keunggulan FBL:**\n✅ Instruktur berpengalaman 5-10 tahun\n✅ Kurikulum praktis, bukan teori berlebihan\n✅ Komunitas aktif 1000+ member\n✅ Support 24/7 via grup WhatsApp\n✅ Update materi berkelanjutan (free)\n\n**Kontak:**\n📱 WhatsApp: 0857-0221-2770\n📧 Email: admin@forexforbetterliving.com\n🌐 Website: www.forexforbetterliving.com\n\nTerdaftar resmi & beroperasi sejak 2019! ⭐"
  ]
};

// Quick replies suggestions
const QUICK_REPLIES = [
  "📚 Lihat Program Kursus",
  "💰 Cek Biaya & Promo",
  "📅 Jadwal Kelas",
  "📈 Konsultasi Trading",
  "👨‍💼 Hubungi Admin"
];

// Fungsi untuk mendapatkan respons detail
const getDetailedResponse = (category: string): string => {
  return DETAILED_RESPONSES[category]?.[0] || "";
};

// Fungsi untuk mendeteksi kategori dari pesan user
const detectCategory = (message: string): string | null => {
  const lowerMsg = message.toLowerCase();
  for (const [category, responses] of Object.entries(DETAILED_RESPONSES)) {
    if (lowerMsg.includes(category)) return category;
  }
  
  // Check menu keywords
  for (const item of MENU_ITEMS) {
    if (item.keywords.some(kw => lowerMsg.includes(kw))) {
      return item.id;
    }
  }
  
  return null;
};

// Fungsi utama respons bot
const getBotResponse = (userMessage: string, messageHistory: Message[]): string => {
  const lowerMsg = userMessage.toLowerCase();
  const lastCategory = messageHistory.length > 0 ? 
    messageHistory[messageHistory.length - 1].metadata?.category : null;

  // Cek apakah user meminta detail dari kategori sebelumnya
  if ((lowerMsg.includes("detail") || lowerMsg.includes("lengkap") || lowerMsg.includes("info")) && lastCategory) {
    return getDetailedResponse(lastCategory);
  }

  // Cek kategori baru
  const detectedCategory = detectCategory(userMessage);
  if (detectedCategory) {
    const summary = getDetailedResponse(detectedCategory);
    // Return summary pertama, offer detail
    return summary.split('\n\n')[0] + "\n\nKetik *'detail'* untuk informasi lengkap, atau pilih menu lain.";
  }

  // Greetings
  if (lowerMsg.match(/^(halo|hi|hello|hey|selamat|pagi|siang|sore|malam)/)) {
    return "Halo! 👋 Selamat datang di **Forex for Better Living** (PT Akademi Keuangan Nusantara).\n\nSaya assistant virtual yang siap membantu Anda dengan informasi lengkap tentang:\n• 📚 Program edukasi trading\n• 📈 Analisis & signal trading\n• 💰 Investasi belajar & promo\n• 📅 Jadwal dan lokasi kelas\n• 👨‍💼 Konsultasi langsung dengan admin\n\nSilakan pilih menu di atas atau ketik pertanyaan Anda!";
  }

  // Help
  if (lowerMsg.includes("bantu") || lowerMsg.includes("help") || lowerMsg.includes("menu")) {
    return "Saya bisa membantu Anda dengan:\n\n**Ketik keyword atau pilih menu:**\n• *Kursus/Kelas* - Info program edukasi\n• *Trading* - Analisis & strategi\n• *Harga/Biaya* - Investasi & promo\n• *Jadwal* - Waktu & lokasi kelas\n• *Tentang* - Profil FBL\n• *Admin* - Chat langsung WhatsApp\n\nAtau gunakan tombol menu (≡) di pojok kiri atas chat.";
  }

  // Thanks
  if (lowerMsg.includes("terima kasih") || lowerMsg.includes("thanks") || lowerMsg.includes("makasih")) {
    return "Sama-sama! 😊 Senang bisa membantu.\n\nJika ada pertanyaan lain atau siap untuk memulai perjalanan trading Anda, jangan ragu untuk:\n• Lanjutkan chat di sini\n• Atau klik tombol hijau untuk chat langsung dengan Admin FBL\n\nSukses selalu! 🚀";
  }

  // Admin/Contact
  if (lowerMsg.includes("admin") || lowerMsg.includes("hubungi") || lowerMsg.includes("wa") || lowerMsg.includes("whatsapp") || lowerMsg.includes("telepon") || lowerMsg.includes("hp")) {
    return "Anda bisa menghubungi Admin FBL langsung via WhatsApp:\n\n📱 **0857-0221-2770**\n\n⏰ Jam operasional:\n• Senin-Jumat: 08.00 - 20.00 WIB\n• Sabtu: 09.00 - 17.00 WIB\n\nAdmin kami akan membantu Anda dengan:\n✅ Konsultasi personal\n✅ Pendaftaran kelas\n✅ Info promo terbaru\n✅ Technical support\n\nKlik tombol hijau di bawah untuk chat langsung! 👇";
  }

  // Bye
  if (lowerMsg.includes("bye") || lowerMsg.includes("dadah") || lowerMsg.includes("selamat tinggal")) {
    return "Sampai jumpa! 👋 Semoga harimu menyenangkan.\n\nJangan lupa: kesempatan bagus tidak datang dua kali. Batch kelas April 2026 sudah buka! 🎯\n\nChat kami kapan saja jika Anda siap memulai. Sukses! 🚀";
  }

  // Default response with context awareness
  const contextAwareResponses = [
    "Menarik pertanyaannya! 🤔 Untuk informasi detail, saya sarankan:\n\n1. Pilih menu yang relevan di atas\n2. Atau ketik keyword seperti 'kursus', 'harga', 'jadwal'\n3. Atau langsung chat dengan Admin via WhatsApp\n\nAda yang spesifik ingin Anda tanyakan?",
    "Saya ingin memastikan jawaban yang tepat untuk Anda. 💡\n\nBisakah spesifikasikan:\n• Apakah ini tentang program kelas?\n• Informasi biaya?\n• Jadwal dan lokasi?\n• Atau konsultasi trading?\n\nAtau klik tombol menu untuk pilihan lengkap!",
    "Baik, saya catat pertanyaan Anda. 📝\n\nUntuk respons terbaik, silakan:\n• Pilih kategori dari menu navigasi\n• Atau ketik 'help' untuk lihat semua opsi\n• Atau hubungi Admin langsung untuk diskusi mendalam\n\nBagaimana Anda ingin melanjutkan?"
  ];
  
  // Pick random context-aware response
  return contextAwareResponses[Math.floor(Math.random() * contextAwareResponses.length)];
};

export default function WhatsAppFloat() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasNotification, setHasNotification] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatBodyRef = useRef<HTMLDivElement>(null);

  // Auto show notification
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasNotification(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Initialize welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        addMessage({
          id: "welcome",
          text: "Halo! 👋 Selamat datang di **Forex for Better Living**.\n\nSaya assistant virtual FBL siap membantu Anda 24/7 dengan:\n• 📚 Info program edukasi trading\n• 📈 Konsultasi strategi & analisis\n• 💰 Detail biaya & promo menarik\n• 📅 Jadwal kelas & lokasi\n\n**Pilih menu di atas** atau ketik pertanyaan Anda!",
          sender: "bot",
          timestamp: new Date(),
          type: "text"
        });
        
        // Add quick replies after welcome
        setTimeout(() => {
          addMessage({
            id: "quick-replies",
            text: "Pilih topik yang Anda minati:",
            sender: "bot",
            timestamp: new Date(),
            type: "quick_reply"
          });
        }, 1000);
      }, 600);
    }
  }, [isOpen]);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Focus input
  useEffect(() => {
    if (isOpen && !showMenu && !showHistory) {
      setTimeout(() => inputRef.current?.focus(), 400);
    }
  }, [isOpen, showMenu, showHistory]);

  const addMessage = useCallback((msg: Message) => {
    setMessages((prev) => [...prev, msg]);
  }, []);

  const handleOpenChat = () => {
    setIsOpen(true);
    setHasNotification(false);
    setUnreadCount(0);
  };

  const handleSendMessage = useCallback(() => {
    if (!inputValue.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
      type: "text"
    };
    addMessage(userMsg);
    setInputValue("");
    setIsTyping(true);

    const delay = 1000 + Math.random() * 1000;

    setTimeout(() => {
      setIsTyping(false);
      const botResponse = getBotResponse(userMsg.text, messages);
      const detectedCategory = detectCategory(userMsg.text);

      addMessage({
        id: "bot-" + Date.now(),
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
        type: "text",
        metadata: { category: detectedCategory }
      });
    }, delay);
  }, [inputValue, messages, addMessage]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickReply = (reply: string) => {
    // Map quick reply to category
    const categoryMap: Record<string, string> = {
      "📚 Lihat Program Kursus": "kursus",
      "💰 Cek Biaya & Promo": "biaya",
      "📅 Jadwal Kelas": "jadwal",
      "📈 Konsultasi Trading": "trading",
      "👨‍💼 Hubungi Admin": "admin"
    };

    const category = categoryMap[reply];
    
    if (category === "admin") {
      handleStartChat();
      return;
    }

    // Add user selection as message
    addMessage({
      id: Date.now().toString(),
      text: reply,
      sender: "user",
      timestamp: new Date(),
      type: "text"
    });

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const response = getDetailedResponse(category);
      addMessage({
        id: "bot-" + Date.now(),
        text: response,
        sender: "bot",
        timestamp: new Date(),
        type: "text",
        metadata: { category }
      });
    }, 800);
  };

  const handleMenuSelect = (item: MenuItem) => {
    setShowMenu(false);
    handleQuickReply(item.label);
  };

  const handleStartChat = () => {
    const phoneNumber = "6285702212770";
    const recentTopics = messages
      .filter(m => m.sender === "user")
      .slice(-3)
      .map(m => m.text)
      .join(", ");
    
    let waMessage = "Hi Admin FBL, saya ingin berkonsultasi";
    if (recentTopics) {
      waMessage = `Hi Admin FBL, saya baru chat dengan bot tentang: ${recentTopics.substring(0, 80)}... dan ingin konsultasi lebih lanjut.`;
    }

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(waMessage)}`;
    window.open(whatsappUrl, "_blank");
  };

  const clearHistory = () => {
    if (confirm("Hapus semua riwayat chat?")) {
      setMessages([]);
      setShowHistory(false);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
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
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50"
          >
            <motion.button
              onClick={handleOpenChat}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-75"></span>
              <div className="relative bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white p-3 sm:p-4 rounded-full shadow-2xl shadow-green-500/30 flex items-center justify-center">
                <MessageCircle size={24} className="sm:w-7 sm:h-7" fill="currentColor" />
              </div>
              {(hasNotification || unreadCount > 0) && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white"
                >
                  {unreadCount}
                </motion.span>
              )}
              <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-[#111A4A] text-white text-sm px-4 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none hidden md:block">
                <span className="font-medium">Konsultasi Gratis 24/7</span>
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
            className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 z-50 w-full sm:w-[420px] max-w-full sm:max-w-[calc(100vw-2rem)] h-[100dvh] sm:h-[600px]"
          >
            <div className="bg-white sm:rounded-2xl shadow-2xl overflow-hidden border-0 sm:border border-gray-100 h-full flex flex-col">
              
              {/* Header */}
              <div className="bg-gradient-to-r from-[#156d95] to-[#111A4A] p-4 relative flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setShowMenu(!showMenu)}
                      className="text-white/80 hover:text-white transition p-2 rounded-full hover:bg-white/10 -ml-2"
                    >
                      <Menu size={20} />
                    </button>
                    
                    <div className="relative">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Bot size={20} className="text-white" />
                      </div>
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#25D366] border-2 border-[#156d95] rounded-full"></span>
                    </div>

                    <div>
                      <h3 className="text-white font-semibold text-base">
                        FBL Assistant
                      </h3>
                      <div className="flex items-center gap-1.5 text-green-300 text-xs">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        Online 24/7 • PT Akademi Keuangan Nusantara
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setShowHistory(!showHistory)}
                      className="text-white/80 hover:text-white transition p-2 rounded-full hover:bg-white/10"
                      title="Riwayat Chat"
                    >
                      <History size={18} />
                    </button>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="text-white/80 hover:text-white transition p-2 rounded-full hover:bg-white/10"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Menu Overlay */}
              <AnimatePresence>
                {showMenu && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-[#111A4A] border-b border-white/10 overflow-hidden flex-shrink-0"
                  >
                    <div className="p-3 space-y-1">
                      <p className="text-white/60 text-xs uppercase tracking-wider px-2 mb-2">Menu Navigasi</p>
                      {MENU_ITEMS.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => handleMenuSelect(item)}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/90 hover:bg-white/10 transition text-left group"
                        >
                          <span className="text-[#25D366] group-hover:scale-110 transition-transform">
                            {item.icon}
                          </span>
                          <div>
                            <p className="text-sm font-medium">{item.label}</p>
                            <p className="text-xs text-white/50">{item.description}</p>
                          </div>
                        </button>
                      ))}
                      <div className="border-t border-white/10 mt-2 pt-2">
                        <button
                          onClick={handleStartChat}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#25D366] hover:bg-white/10 transition text-left"
                        >
                          <Phone size={18} />
                          <span className="text-sm font-medium">Chat WhatsApp Admin</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* History Overlay */}
              <AnimatePresence>
                {showHistory && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="absolute inset-0 bg-white z-20 flex flex-col"
                  >
                    <div className="bg-gradient-to-r from-[#156d95] to-[#111A4A] p-4 flex items-center gap-3">
                      <button
                        onClick={() => setShowHistory(false)}
                        className="text-white/80 hover:text-white transition p-1"
                      >
                        <ArrowLeft size={20} />
                      </button>
                      <h3 className="text-white font-semibold">Riwayat Chat</h3>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                      {messages.length === 0 ? (
                        <p className="text-center text-gray-400 text-sm py-8">Belum ada riwayat chat</p>
                      ) : (
                        <div className="space-y-3">
                          {messages.filter(m => m.sender === "user").map((msg, idx) => (
                            <div key={msg.id} className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                              <p className="text-xs text-gray-400 mb-1">{formatDate(msg.timestamp)} {formatTime(msg.timestamp)}</p>
                              <p className="text-sm text-gray-800">{msg.text}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    {messages.length > 0 && (
                      <div className="p-3 border-t border-gray-100 bg-white">
                        <button
                          onClick={clearHistory}
                          className="w-full flex items-center justify-center gap-2 text-red-500 hover:bg-red-50 py-2 rounded-lg transition text-sm"
                        >
                          <Trash2 size={16} />
                          Hapus Riwayat
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Chat Body */}
              <div 
                ref={chatBodyRef}
                className="bg-[#E5DDD5] p-3 flex-1 overflow-y-auto min-h-0"
              >
                <div className="text-center mb-3">
                  <span className="bg-[#99BEBA]/30 text-[#54656F] text-xs px-3 py-1 rounded-full">
                    Hari ini {formatDate(new Date())}
                  </span>
                </div>

                {messages.map((msg, index) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`flex gap-2 mb-3 ${msg.sender === "user" ? "justify-end" : ""}`}
                  >
                    {msg.sender === "bot" && (
                      <div className="w-7 h-7 bg-gradient-to-br from-[#156d95] to-[#111A4A] rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot size={14} className="text-white" />
                      </div>
                    )}

                    {msg.type === "quick_reply" ? (
                      <div className="w-full">
                        <p className="text-xs text-gray-500 mb-2 ml-9">{msg.text}</p>
                        <div className="flex flex-wrap gap-2 ml-9">
                          {QUICK_REPLIES.map((reply, idx) => (
                            <motion.button
                              key={idx}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: idx * 0.1 }}
                              onClick={() => handleQuickReply(reply)}
                              className="bg-white hover:bg-[#DCF8C6] text-gray-800 text-xs py-2 px-3 rounded-full shadow-sm border border-gray-200 transition-colors text-left"
                            >
                              {reply}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div
                        className={`max-w-[85%] rounded-2xl p-3 shadow-sm ${
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
                            <CheckCheck size={12} className="text-[#53BDEB]" />
                          )}
                        </div>
                      </div>
                    )}

                    {msg.sender === "user" && (
                      <div className="w-7 h-7 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                        <User size={14} className="text-gray-600" />
                      </div>
                    )}
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-2"
                  >
                    <div className="w-7 h-7 bg-gradient-to-br from-[#156d95] to-[#111A4A] rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot size={14} className="text-white" />
                    </div>
                    <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-3 bg-white border-t border-gray-100 flex-shrink-0">
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ketik pesan atau ketik 'menu'..."
                    className="flex-1 bg-gray-100 text-gray-800 text-sm px-4 py-2.5 rounded-full focus:outline-none focus:ring-2 focus:ring-[#156d95]/50 placeholder-gray-500"
                  />
                  <motion.button
                    onClick={handleSendMessage}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={!inputValue.trim()}
                    className="bg-[#156d95] text-white p-2.5 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#0f5a7a] transition-colors flex-shrink-0"
                  >
                    <Send size={18} />
                  </motion.button>
                </div>
                <p className="text-center text-gray-400 text-xs mt-2">
                  Tekan menu (≡) untuk navigasi cepat
                </p>
              </div>

              {/* Footer CTA */}
              <div className="p-3 bg-gray-50 border-t border-gray-100 flex-shrink-0">
                <motion.button
                  onClick={handleStartChat}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#22c55e] hover:to-[#16a34a] text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-green-500/25 transition-all duration-300 text-sm"
                >
                  <MessageCircle size={18} />
                  Chat Langsung Admin WhatsApp
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}