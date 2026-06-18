"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  BarChart2,
  BrainCircuit,
  BookOpen,
  ShieldCheck,
  FileText,
  TrendingUp,
  PlayCircle,
  Newspaper,
  Calculator,
  User,
  LayoutDashboard,
  LogOut,
  Settings,
  ShoppingCart,
  Gift,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

import { useCart } from "@/context/cart-context";
import LanguageSwitcher from "@/components/LanguageSwitcher";

type UserData = {
  id: string;
  name: string | null;
  email: string;
  role: string;
  image: string | null;
};

export const Header = () => {
  const t = useTranslations("Navigation");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  const { items, refreshAuth } = useCart();
  const router = useRouter();
  const pathname = usePathname();
  const itemCount = items.reduce((t, i) => t + i.quantity, 0);

  const isDarkBgAtTop = pathname === '/' || pathname === '/id' || pathname === '/en' || pathname?.includes('/giveaway');
  const textColorClass = isScrolled ? "text-gray-700" : (isDarkBgAtTop ? "text-white" : "text-gray-700");
  const textShadowStyle = (!isScrolled && isDarkBgAtTop) ? { textShadow: '0 1px 4px rgba(0,0,0,0.5), 0 0px 12px rgba(0,0,0,0.3)' } : {};

  // Refs untuk tracking hover state
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Check auth status on mount dan listen untuk perubahan
  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me", {
        credentials: "include",
        cache: "no-store",
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Auth check error:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Listen untuk storage events (logout dari tab lain)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "logout-event") {
        console.log("Logout detected from another tab");
        setUser(null);
        refreshAuth();
      }
      if (e.key === "auth-change") {
        console.log("Auth change detected");
        checkAuth();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Custom event untuk same-tab
    const handleCustomLogout = () => {
      console.log("Custom logout event received in Header");
      setUser(null);
    };

    const handleCustomAuthChange = () => {
      console.log("Custom auth change received in Header");
      checkAuth();
    };

    window.addEventListener("app-logout", handleCustomLogout);
    window.addEventListener("app-auth-change", handleCustomAuthChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("app-logout", handleCustomLogout);
      window.removeEventListener("app-auth-change", handleCustomAuthChange);
    };
  }, [checkAuth, refreshAuth]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);

    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push(href);
    }
  };

  // PERBAIKAN: Handle Kelola Kursus - simpan menu preference ke localStorage
  const handleManageCourses = () => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);

    // Simpan preference menu ke localStorage agar dashboard membuka tab Courses
    localStorage.setItem("dashboard-active-menu", "courses");

    // Trigger event untuk dashboard jika sedang di halaman dashboard
    window.dispatchEvent(
      new CustomEvent("dashboard-navigate", {
        detail: { menu: "courses" },
      }),
    );

    // Navigate ke dashboard
    router.push("/dashboard");
  };

  // PERBAIKAN: Logout dengan proper broadcast dan state cleanup
  const handleLogout = async () => {
    try {
      // Clear cookies via API
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear local state TERLEBIH DAHULU
      setUser(null);
      setOpenDropdown(null);

      // Broadcast logout event ke SEMUA tab dan komponen
      localStorage.setItem("logout-event", Date.now().toString());

      // Custom event untuk same-tab (dispatch SEBELUM removeItem)
      window.dispatchEvent(new Event("app-logout"));

      // Hapus dari localStorage SETELAH dispatch
      setTimeout(() => {
        localStorage.removeItem("logout-event");
      }, 100);

      // Clear cart
      try {
        localStorage.removeItem("cart");
      } catch (e) {
        console.error("Error clearing cart:", e);
      }

      // Refresh cart context
      await refreshAuth();

      // Navigate dan refresh
      router.push("/");
      router.refresh();
    }
  };

  // PERBAIKAN: Dashboard URL berdasarkan role dengan validasi yang lebih baik
  const getDashboardUrl = (role: string) => {
    if (!role) return "/login";

    const upperRole = role.toUpperCase().trim();

    // Admin dan Mentor ke dashboard utama
    if (upperRole === "ADMIN" || upperRole === "MENTOR") {
      return "/dashboard";
    }

    // Pelanggan/Student ke student dashboard
    if (
      upperRole === "PELANGGAN" ||
      upperRole === "STUDENT" ||
      upperRole === "USER"
    ) {
      return "/student/dashboard";
    }

    // Default fallback
    return "/student/dashboard";
  };

  // PERBAIKAN: Cek role dengan validasi lebih ketat
  const isAdminOrMentor = (role: string | undefined | null) => {
    if (!role) return false;
    const upperRole = role.toUpperCase().trim();
    return upperRole === "ADMIN" || upperRole === "MENTOR";
  };

  // Fungsi untuk handle mouse enter dengan clear timeout
  const handleMouseEnter = (title: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setOpenDropdown(title);
  };

  // Fungsi untuk handle mouse leave dengan delay
  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  const Dropdown = ({
    title,
    items,
  }: {
    title: string;
    items: { name: string; href: string; icon: any }[];
  }) => (
    <div
      className="relative group"
      onMouseEnter={() => handleMouseEnter(title)}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={`flex items-center gap-1 font-medium hover:text-primary transition
          ${isScrolled ? "text-sm" : "text-base"} ${textColorClass}
        `}
        style={textShadowStyle}
      >
        {title}
        <ChevronDown size={15} className="mt-0.5" />
      </button>

      <AnimatePresence>
        {openDropdown === title && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className="absolute left-0 mt-2 w-[250px] bg-white shadow-xl rounded-xl border border-gray-100 py-2 z-40"
            style={{
              paddingTop: "8px",
              marginTop: "4px",
            }}
          >
            {/* Pseudo-element bridge untuk menghubungkan trigger dan dropdown */}
            <div
              className="absolute -top-2 left-0 right-0 h-2 bg-transparent"
              aria-hidden="true"
            />
            {items.map((item) => (
              <button
                key={item.name}
                onClick={() => handleLinkClick(item.href)}
                className="flex items-center gap-3 w-full px-4 py-3 text-gray-600 hover:bg-gray-100 transition rounded-lg"
              >
                <item.icon size={18} />
                {item.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  // PERBAIKAN: User Dropdown Component dengan role handling yang benar
  const UserDropdown = () => {
    if (!user) return null;

    const dashboardUrl = getDashboardUrl(user.role);
    const userIsAdminOrMentor = isAdminOrMentor(user.role);

    return (
      <div
        className="relative"
        onMouseEnter={() => handleMouseEnter("user")}
        onMouseLeave={handleMouseLeave}
      >
        <button
          className={`flex items-center gap-2 font-medium hover:text-primary transition
            ${isScrolled ? "text-sm" : "text-base"} ${textColorClass}
          `}
        >
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
            {user.image ? (
              <img
                src={user.image}
                alt={user.name || "User"}
                className="w-full h-full object-cover"
              />
            ) : (
              <User size={16} className="text-primary" />
            )}
          </div>
          <span className="hidden lg:block max-w-[100px] truncate">
            {user.name || user.email}
          </span>
          <ChevronDown size={15} className="mt-0.5" />
        </button>

        <AnimatePresence>
          {openDropdown === "user" && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18 }}
              className="absolute right-0 mt-2 w-[280px] bg-white shadow-xl rounded-xl border border-gray-100 py-2 z-40"
              style={{
                paddingTop: "8px",
                marginTop: "4px",
              }}
            >
              {/* Pseudo-element bridge */}
              <div
                className="absolute -top-2 left-0 right-0 h-2 bg-transparent"
                aria-hidden="true"
              />
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="font-semibold text-gray-900 truncate">
                  {user.name || "User"}
                </p>
                <p className="text-sm text-gray-500 truncate">{user.email}</p>
                <span className="inline-block mt-2 px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full capitalize">
                  {(user.role || "user").toLowerCase()}
                </span>
              </div>

              <div className="py-2">
                <button
                  onClick={() => handleLinkClick(dashboardUrl)}
                  className="flex items-center gap-3 w-full px-4 py-3 text-gray-600 hover:bg-gray-100 transition"
                >
                  <LayoutDashboard size={18} />
                  {t("dashboard")}
                </button>

                <button
                  onClick={() => handleLinkClick("/profile")}
                  className="flex items-center gap-3 w-full px-4 py-3 text-gray-600 hover:bg-gray-100 transition"
                >
                  <Settings size={18} />
                  {t("settings")}
                </button>

                {/* PERBAIKAN: Kelola Kursus menggunakan handleManageCourses */}
                {userIsAdminOrMentor && (
                  <button
                    onClick={handleManageCourses}
                    className="flex items-center gap-3 w-full px-4 py-3 text-gray-600 hover:bg-gray-100 transition"
                  >
                    <BookOpen size={18} />
                    {t("manageCourses")}
                  </button>
                )}

                <div className="border-t border-gray-100 my-2"></div>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 transition"
                >
                  <LogOut size={18} />
                  {t("logout")}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <>
      <nav
        className={`
          fixed left-0 right-0 z-50 transition-all duration-300
          ${isScrolled ? "top-5" : "top-10"}
        `}
      >
        {/* Gradient overlay behind header for text readability on dark-bg pages */}
        {!isScrolled && isDarkBgAtTop && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)',
              borderRadius: 'inherit',
            }}
          />
        )}
        <div
          className={`
            mx-auto transition-all duration-300 flex items-center justify-between relative
            ${
              isScrolled
                ? "max-w-5xl bg-white shadow-lg rounded-2xl px-6 py-1.5 backdrop-blur-xl"
                : "max-w-7xl bg-transparent px-8 py-3"
            }
          `}
        >
          <button
            onClick={() => handleLinkClick("/")}
            className="flex items-center"
          >
            <motion.img
              src="/logo-fbl.png"
              alt="Forex Logo"
              animate={{ scale: isScrolled ? 0.77 : 1 }}
              transition={{ duration: 0.25 }}
              className="h-auto object-contain"
              style={{ width: isScrolled ? "110px" : "145px" }}
            />
          </button>

          <div
            className={`
              hidden md:flex items-center transition-all duration-200
              ${isScrolled ? "gap-5" : "gap-8"}
            `}
          >
            <Dropdown
              title={t("robotTrading")}
              items={[

                {
                  name: t("giveawayMenu"),
                  href: "/robot-trading/giveaway",
                  icon: Gift,
                },
                {
                  name: t("backtestPerformance"),
                  href: "/robot-trading/backtest",
                  icon: BarChart2,
                },
              ]}
            />
            <Dropdown
              title={t("tradingLesson")}
              items={[
                {
                  name: t("articleTrading"),
                  href: "/articles",
                  icon: FileText,
                },
                {
                  name: t("videoTrading"),
                  href: "/video-trading",
                  icon: PlayCircle,
                },
              ]}
            />

            <button
              onClick={() => handleLinkClick("/professional-course")}
              className={`font-medium hover:text-primary transition 
                ${isScrolled ? "text-sm" : "text-base"} ${textColorClass}
              `}
              style={textShadowStyle}
            >
              {t("professionalCourse")}
            </button>

            <button
              onClick={() => handleLinkClick("/broker-rekommendation")}
              className={`font-medium hover:text-primary transition 
                ${isScrolled ? "text-sm" : "text-base"} ${textColorClass}
              `}
              style={textShadowStyle}
            >
              {t("brokerRecommendation")}
            </button>

            <Dropdown
              title={t("tools")}
              items={[
                {
                  name: t("positionSizeCalculator"),
                  href: "/position-size-calculator",
                  icon: Calculator,
                },
              ]}
            />
          </div>

          <div className="hidden md:flex items-center gap-4">
            {/* LANGUAGE SWITCHER - Added here */}
            <LanguageSwitcher isScrolled={isScrolled} />

            <button
              onClick={() => router.push("/student/cart")}
              className={`relative p-2 hover:text-primary transition ${textColorClass}`}
              style={textShadowStyle}
            >
              <ShoppingCart size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            {!loading && (
              <>
                {user ? (
                  <UserDropdown />
                ) : (
                  <>
                    <button
                      onClick={() => router.push("/login")}
                      className={`hover:text-primary transition hover:underline 
                        ${isScrolled ? "text-sm" : "text-base"} ${textColorClass}
                      `}
                      style={textShadowStyle}
                    >
                      {t("login")}
                    </button>

                    <button
                      onClick={() => router.push("/signup")}
                      className={`
                        px-5 py-2.5 font-semibold rounded-lg transition
                        ${isScrolled 
                          ? "text-sm px-4 py-2 border border-primary text-primary hover:bg-primary hover:text-white" 
                          : (isDarkBgAtTop 
                              ? "text-base border border-white text-white hover:bg-white hover:text-[#111A4A]" 
                              : "text-base border border-primary text-primary hover:bg-primary hover:text-white")}
                      `}
                    >
                      {t("signup")}
                    </button>
                  </>
                )}
              </>
            )}
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 hover:text-primary transition ${isScrolled ? "text-gray-800" : (isDarkBgAtTop ? "text-white" : "text-gray-800")}`}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden bg-white/95 backdrop-blur-lg border-t border-gray-200"
            >
              <div className="px-6 py-6 space-y-5">
                {/* LANGUAGE SWITCHER MOBILE - Added here */}
                <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                  <span className="text-gray-500 text-sm">
                    Bahasa / Language
                  </span>
                  <LanguageSwitcher isScrolled={false} />
                </div>

                {user && (
                  <div className="border-b border-gray-200 pb-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                        {user.image ? (
                          <img
                            src={user.image}
                            alt={user.name || "User"}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <User size={20} className="text-primary" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {user.name || "User"}
                        </p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    <span className="inline-block px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full capitalize">
                      {(user.role || "user").toLowerCase()}
                    </span>
                  </div>
                )}
                <div>
                  <p className="text-gray-900 font-semibold mb-2">
                    {t("robotTrading")}
                  </p>
                  <div className="space-y-2 pl-3">

                    <button
                      onClick={() => handleLinkClick("/robot-trading/giveaway")}
                      className="flex gap-2 items-center text-gray-700 w-full"
                    >
                      <Gift size={16} /> {t("giveawayMenu")}
                    </button>
                    <button
                      onClick={() => handleLinkClick("/robot-trading/backtest")}
                      className="flex gap-2 items-center text-gray-700 w-full"
                    >
                      <BarChart2 size={16} /> {t("backtestPerformance")}
                    </button>
                  </div>
                </div>
                <div>
                  <p className="text-gray-900 font-semibold mb-2">
                    {t("tradingLesson")}
                  </p>
                  <div className="space-y-2 pl-3">
                    <button
                      onClick={() => handleLinkClick("/articles")}
                      className="flex gap-2 items-center text-gray-700 w-full"
                    >
                      <FileText size={16} /> {t("articleTrading")}
                    </button>
                    <button
                      onClick={() => handleLinkClick("/video-trading")}
                      className="flex gap-2 items-center text-gray-700 w-full"
                    >
                      <PlayCircle size={16} /> {t("videoTrading")}
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => handleLinkClick("/professional-course")}
                  className="block w-full text-left text-lg text-gray-800"
                >
                  {t("professionalCourse")}
                </button>
                <button
                  onClick={() => handleLinkClick("/broker-rekommendation")}
                  className="block w-full text-left text-lg text-gray-800"
                >
                  {t("brokerRecommendation")}
                </button>

                <div>
                  <p className="text-gray-900 font-semibold mb-2">
                    {t("tools")}
                  </p>
                  <div className="space-y-2 pl-3">
                    <button
                      onClick={() =>
                        handleLinkClick("/position-size-calculator")
                      }
                      className="flex gap-2 items-center text-gray-700 w-full"
                    >
                      <Calculator size={16} /> {t("positionSizeCalculator")}
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => handleLinkClick("/cart")}
                  className="flex items-center gap-2 w-full text-lg text-gray-800"
                >
                  <ShoppingCart size={20} />
                  {t("cart")}
                  {itemCount > 0 && (
                    <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {itemCount}
                    </span>
                  )}
                </button>

                {!loading && (
                  <>
                    {user ? (
                      <div className="space-y-3 pt-4 border-t border-gray-200">
                        <button
                          onClick={() =>
                            handleLinkClick(getDashboardUrl(user.role))
                          }
                          className="flex items-center gap-2 w-full text-lg text-gray-800"
                        >
                          <LayoutDashboard size={20} />
                          {t("dashboard")}
                        </button>
                        <button
                          onClick={() => handleLinkClick("/profile")}
                          className="flex items-center gap-2 w-full text-lg text-gray-800"
                        >
                          <Settings size={20} />
                          {t("settings")}
                        </button>
                        {/* PERBAIKAN: Mobile menu juga menggunakan handleManageCourses */}
                        {isAdminOrMentor(user.role) && (
                          <button
                            onClick={handleManageCourses}
                            className="flex items-center gap-2 w-full text-lg text-gray-800"
                          >
                            <BookOpen size={20} />
                            {t("manageCourses")}
                          </button>
                        )}
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-2 w-full text-lg text-red-600"
                        >
                          <LogOut size={20} />
                          {t("logout")}
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-3 pt-4 border-t border-gray-200">
                        <button
                          onClick={() => handleLinkClick("/login")}
                          className="block w-full text-left text-lg text-gray-800"
                        >
                          {t("login")}
                        </button>
                        <button
                          onClick={() => handleLinkClick("/signup")}
                          className="w-full px-5 py-3 border border-primary text-primary rounded-lg text-lg font-semibold hover:bg-primary hover:text-white transition"
                        >
                          {t("signup")}
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};
