"use client";

import { useState, useEffect } from "react";
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
} from "lucide-react";
import { useRouter } from "next/navigation";

import { useCart } from "@/app/context/cart-context";

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const { items } = useCart();
  const router = useRouter();
  const itemCount = items.reduce((t, i) => t + i.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
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
      onMouseEnter={() => setOpenDropdown(title)}
      onMouseLeave={() => setOpenDropdown(null)}
    >
      <button
        className={`flex items-center gap-1 font-medium text-gray-700 hover:text-primary transition
          ${isScrolled ? "text-sm" : "text-base"}
        `}
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
            className="absolute left-0 mt-3 w-[250px] bg-white shadow-xl rounded-xl border border-gray-100 py-2 z-40"
          >
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

  return (
    <>
      <nav
        className={`
          fixed left-0 right-0 z-50 transition-all duration-300
          ${isScrolled ? "top-0" : "top-10"}
        `}
      >
        <div
          className={`
            mx-auto transition-all duration-300 flex items-center justify-between
            ${
              isScrolled
                ? "max-w-4xl bg-white shadow-lg rounded-2xl px-6 py-1.5 backdrop-blur-xl"
                : "max-w-7xl bg-transparent px-8 py-3"
            }
          `}
        >
          {/* BRAND */}
          <button onClick={() => handleLinkClick("#home")} className="flex items-center">
            <motion.img
              src="/logo-fbl.png"
              alt="Forex Logo"
              animate={{ scale: isScrolled ? 0.77 : 1 }}
              transition={{ duration: 0.25 }}
              className="h-auto object-contain"
              style={{ width: isScrolled ? "110px" : "145px" }}
            />
          </button>

          {/* DESKTOP NAV */}
          <div
            className={`
              hidden md:flex items-center transition-all duration-200
              ${isScrolled ? "gap-5" : "gap-8"}
            `}
          >
            <Dropdown
              title="Analisa"
              items={[
                { name: "Analisa Forex", href: "#analisa-forex", icon: BarChart2 },
                { name: "Berita Forex", href: "#berita-forex", icon: Newspaper },
              ]}
            />

            <Dropdown
              title="Free Courses"
              items={[
                { name: "Trading Beginner", href: "#free-1", icon: BookOpen },
                { name: "Artikel Trading", href: "#free-2", icon: FileText },
                { name: "Strategy Trading", href: "#free-1", icon: TrendingUp },
                { name: "Video Trading", href: "#free-2", icon: PlayCircle },
              ]}
            />

            <button
              onClick={() => handleLinkClick("#pro-courses")}
              className={`font-medium text-gray-700 hover:text-primary transition 
                ${isScrolled ? "text-sm" : "text-base"}
              `}
            >
              Professional Courses
            </button>

            <button
              onClick={() => handleLinkClick("#testimoni")}
              className={`font-medium text-gray-700 hover:text-primary transition 
                ${isScrolled ? "text-sm" : "text-base"}
              `}
            >
              Testimoni
            </button>
          </div>

          {/* CTA BUTTONS (CART REMOVED) */}
          <div className="hidden md:flex items-center gap-5">

            <button
              onClick={() => router.push("/login")}
              className={`text-gray-700 hover:text-primary transition hover:underline 
                ${isScrolled ? "text-sm" : "text-base"}
              `}
            >
              Login
            </button>

            <button
              onClick={() => router.push("/signup")}
              className={`
                px-5 py-2.5 border border-primary text-primary font-semibold rounded-lg
                hover:bg-primary hover:text-white transition
                ${isScrolled ? "text-sm px-4 py-2" : "text-base"}
              `}
            >
              Sign Up
            </button>
          </div>

          {/* MOBILE MENU TOGGLE */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-800 hover:text-primary transition"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* MOBILE MENU */}
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

                <div>
                  <p className="text-gray-900 font-semibold mb-2">Analisa</p>
                  <div className="space-y-2 pl-3">
                    <button className="flex gap-2 items-center text-gray-700">
                      <BarChart2 size={16} /> Analisa Forex
                    </button>
                    <button className="flex gap-2 items-center text-gray-700">
                      <Newspaper size={16} /> Berita Forex
                    </button>
                  </div>
                </div>

                <div>
                  <p className="text-gray-900 font-semibold mb-2">Free Courses</p>
                  <div className="space-y-2 pl-3">
                    <button className="flex gap-2 items-center text-gray-700">
                      <BookOpen size={16} /> Trading Beginner
                    </button>
                    <button className="flex gap-2 items-center text-gray-700">
                      <FileText size={16} /> Artikel Trading
                    </button>
                    <button className="flex gap-2 items-center text-gray-700">
                      <TrendingUp size={16} /> Strategy Trading
                    </button>
                    <button className="flex gap-2 items-center text-gray-700">
                      <PlayCircle size={16} /> Video Trading
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => handleLinkClick("#pro-courses")}
                  className="block w-full text-left text-lg text-gray-800"
                >
                  Professional Courses
                </button>

                <button
                  onClick={() => handleLinkClick("#testimoni")}
                  className="block w-full text-left text-lg text-gray-800"
                >
                  Testimoni
                </button>

                {/* CART BUTTON REMOVED */}

                <button
                  onClick={() => router.push("/login")}
                  className="block w-full text-left text-lg text-gray-800"
                >
                  Login
                </button>

                <button
                  onClick={() => router.push("/signup")}
                  className="w-full px-5 py-3 border border-primary text-primary rounded-lg text-lg font-semibold hover:bg-primary hover:text-white transition"
                >
                  Sign Up
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};
