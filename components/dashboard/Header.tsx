"use client";

import { Menu, Bell, Search, ShoppingCart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/cart-context";

interface HeaderProps {
  openMobileSidebar: () => void;
}

export default function Header({ openMobileSidebar }: HeaderProps) {
  const { items, toggleCart } = useCart();
  const cartCount = items?.length ?? 0;

  return (
    <header
      className="
        w-full h-16 bg-white border-b 
        fixed top-0 left-0 right-0 z-30
        flex items-center
        px-4
        md:pl-64      /* ruang sidebar desktop */
      "
    >
      {/* MOBILE MENU BUTTON */}
      <button
        onClick={openMobileSidebar}
        className="
          md:hidden 
          w-10 h-10 flex items-center justify-center 
          rounded-lg hover:bg-gray-100
        "
      >
        <Menu size={22} />
      </button>

      {/* SEARCH (desktop only) */}
      <div
        className="
          hidden md:flex items-center
          gap-2 w-80 ml-6   /* ⭐️ ML-6: geser search sedikit ke kanan */
        "
      >
        <Search size={16} className="text-gray-500" />
        <Input placeholder="Cari materi, kelas, atau analisa..." />
      </div>

      {/* RIGHT ICONS */}
      <div className="flex items-center gap-4 ml-auto">
        {/* CART ICON */}
        <button
          onClick={toggleCart}
          className="
            relative w-10 h-10 flex items-center justify-center
            rounded-full hover:bg-gray-100
          "
        >
          <ShoppingCart size={22} />

          {cartCount > 0 && (
            <span className="absolute top-1 right-1 bg-[#5100fd] text-white text-[10px] px-1.5 py-0.5 rounded-full">
              {cartCount}
            </span>
          )}
        </button>

        {/* NOTIFICATION ICON */}
        <button
          className="
            relative w-10 h-10 flex items-center justify-center
            rounded-full hover:bg-gray-100
          "
        >
          <Bell size={22} />
          <span className="absolute top-2 right-2 bg-[#5100fd] w-2 h-2 rounded-full" />
        </button>
      </div>
    </header>
  );
}
