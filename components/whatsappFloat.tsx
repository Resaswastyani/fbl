"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  MessageCircle,
  X,
  Send,
  CheckCheck,
  Bot,
  User,
  HelpCircle,
  BookOpen,
  TrendingUp,
  MapPin,
  Phone,
  History,
  Trash2,
  Menu,
  ArrowLeft,
} from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "bot" | "user";
  timestamp: Date;
  type?: "text" | "quick_reply" | "menu" | "card";
  metadata?: any;
}

interface MenuItem {
  id: string;
  labelKey: string;
  descKey: string;
  icon: React.ReactNode;
  keywords: string[];
}

export default function WhatsAppFloat() {
  const t = useTranslations("WhatsAppFloat");
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

  const MENU_ITEMS: MenuItem[] = [
    {
      id: "robot",
      labelKey: "menuRobotLabel",
      descKey: "menuRobotDesc",
      icon: <TrendingUp size={18} />,
      keywords: ["robot", "ea", "bot", "trading otomatis", "auto"],
    },
    {
      id: "course",
      labelKey: "menuCourseLabel",
      descKey: "menuCourseDesc",
      icon: <BookOpen size={18} />,
      keywords: ["kursus", "kelas", "belajar", "edukasi", "program"],
    },
    {
      id: "tools",
      labelKey: "menuToolsLabel",
      descKey: "menuToolsDesc",
      icon: <TrendingUp size={18} />,
      keywords: ["tools", "broker", "platform", "alat", "rekomendasi"],
    },
    {
      id: "about",
      labelKey: "menuAboutLabel",
      descKey: "menuAboutDesc",
      icon: <HelpCircle size={18} />,
      keywords: ["tentang", "profil", "legal", "visi", "misi", "fbl", "pt akademi"],
    },
  ];

  const QUICK_REPLIES = [
    t("quickReplyRobot"),
    t("quickReplyCourse"),
    t("quickReplyTools"),
    t("quickReplyAbout"),
    t("quickReplyAdmin"),
  ];

  const getDetailedResponse = (category: string): string => {
    const map: Record<string, string> = {
      robot: "robotDetail",
      course: "courseDetail",
      tools: "toolsDetail",
      about: "aboutDetail",
    };
    return map[category] ? t(map[category]) : t("botDefaultResponse");
  };

  const detectCategory = (message: string): string | null => {
    const lowerMsg = message.toLowerCase();
    for (const item of MENU_ITEMS) {
      if (item.keywords.some((kw) => lowerMsg.includes(kw))) {
        return item.id;
      }
    }
    return null;
  };

  const getBotResponse = (userMessage: string, messageHistory: Message[]): string => {
    const lowerMsg = userMessage.toLowerCase();
    const lastCategory =
      messageHistory.length > 0
        ? messageHistory[messageHistory.length - 1].metadata?.category
        : null;

    if (
      (lowerMsg.includes("detail") ||
        lowerMsg.includes("lengkap") ||
        lowerMsg.includes("info")) &&
      lastCategory
    ) {
      return getDetailedResponse(lastCategory);
    }

    const detectedCategory = detectCategory(userMessage);
    if (detectedCategory) {
      return getDetailedResponse(detectedCategory);
    }

    if (lowerMsg.match(/^(halo|hi|hello|hey|selamat|pagi|siang|sore|malam)/)) {
      return t("welcomeMsg");
    }

    return t("botDefaultResponse");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasNotification(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        addMessage({
          id: "welcome",
          text: t("welcomeMsg"),
          sender: "bot",
          timestamp: new Date(),
          type: "text",
        });

        setTimeout(() => {
          addMessage({
            id: "quick-replies",
            text: t("chooseTopic"),
            sender: "bot",
            timestamp: new Date(),
            type: "quick_reply",
          });
        }, 1000);
      }, 600);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

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
      type: "text",
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
        metadata: { category: detectedCategory },
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
    const categoryMap: Record<string, string> = {
      [t("quickReplyRobot")]: "robot",
      [t("quickReplyCourse")]: "course",
      [t("quickReplyTools")]: "tools",
      [t("quickReplyAbout")]: "about",
      [t("quickReplyAdmin")]: "admin",
    };

    const category = categoryMap[reply];

    if (category === "admin") {
      handleStartChat();
      return;
    }

    addMessage({
      id: Date.now().toString(),
      text: reply,
      sender: "user",
      timestamp: new Date(),
      type: "text",
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
        metadata: { category },
      });
    }, 800);
  };

  const handleMenuSelect = (item: MenuItem) => {
    setShowMenu(false);
    handleQuickReply(t(item.labelKey));
  };

  const handleStartChat = () => {
    const phoneNumber = "6285187555440";
    const recentTopics = messages
      .filter((m) => m.sender === "user")
      .slice(-3)
      .map((m) => m.text)
      .join(", ");

    let waMessage = "Hi Admin FBL, saya ingin berkonsultasi";
    if (recentTopics) {
      waMessage = `Hi Admin FBL, saya baru chat dengan bot tentang: ${recentTopics.substring(0, 80)}... dan ingin konsultasi lebih lanjut.`;
    }

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(waMessage)}`;
    window.open(whatsappUrl, "_blank");
  };

  const clearHistory = () => {
    if (confirm(t("clearHistoryConfirm"))) {
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
      year: "numeric",
    });
  };

  return (
    <>
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
                <MessageCircle
                  size={24}
                  className="sm:w-7 sm:h-7"
                  fill="currentColor"
                />
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
                <span className="font-medium">{t("consultFree")}</span>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 bg-[#111A4A] rotate-45"></div>
              </div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

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
                        {t("botName")}
                      </h3>
                      <div className="flex items-center gap-1.5 text-green-300 text-xs">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        {t("onlineStatus")}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setShowHistory(!showHistory)}
                      className="text-white/80 hover:text-white transition p-2 rounded-full hover:bg-white/10"
                      title={t("history")}
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

              <AnimatePresence>
                {showMenu && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-[#111A4A] border-b border-white/10 overflow-hidden flex-shrink-0"
                  >
                    <div className="p-3 space-y-1">
                      <p className="text-white/60 text-xs uppercase tracking-wider px-2 mb-2">
                        {t("navMenu")}
                      </p>
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
                            <p className="text-sm font-medium">{t(item.labelKey)}</p>
                            <p className="text-xs text-white/50">
                              {t(item.descKey)}
                            </p>
                          </div>
                        </button>
                      ))}
                      <div className="border-t border-white/10 mt-2 pt-2">
                        <button
                          onClick={handleStartChat}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#25D366] hover:bg-white/10 transition text-left"
                        >
                          <Phone size={18} />
                          <span className="text-sm font-medium">
                            {t("startChatWA")}
                          </span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

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
                      <h3 className="text-white font-semibold">{t("history")}</h3>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                      {messages.length === 0 ? (
                        <p className="text-center text-gray-400 text-sm py-8">
                          Belum ada riwayat chat
                        </p>
                      ) : (
                        <div className="space-y-3">
                          {messages
                            .filter((m) => m.sender === "user")
                            .map((msg, idx) => (
                              <div
                                key={msg.id}
                                className="bg-white p-3 rounded-lg shadow-sm border border-gray-100"
                              >
                                <p className="text-xs text-gray-400 mb-1">
                                  {formatDate(msg.timestamp)}{" "}
                                  {formatTime(msg.timestamp)}
                                </p>
                                <p className="text-sm text-gray-800">
                                  {msg.text}
                                </p>
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
                          {t("clearHistoryConfirm")}
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <div
                ref={chatBodyRef}
                className="bg-[#E5DDD5] p-3 flex-1 overflow-y-auto min-h-0"
              >
                <div className="text-center mb-3">
                  <span className="bg-[#99BEBA]/30 text-[#54656F] text-xs px-3 py-1 rounded-full">
                    {t("today")} {formatDate(new Date())}
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
                        <p className="text-xs text-gray-500 mb-2 ml-9">
                          {msg.text}
                        </p>
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

              <div className="p-3 bg-white border-t border-gray-100 flex-shrink-0">
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={t("typeMessage")}
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
              </div>

              <div className="p-3 bg-gray-50 border-t border-gray-100 flex-shrink-0">
                <motion.button
                  onClick={handleStartChat}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#22c55e] hover:to-[#16a34a] text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-green-500/25 transition-all duration-300 text-sm"
                >
                  <MessageCircle size={18} />
                  {t("startChatWA")}
                </motion.button>
                <p className="text-center text-gray-400 text-xs mt-2">
                  {t("poweredBy")}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
