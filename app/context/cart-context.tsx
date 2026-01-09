"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  toggleCart: () => void;
  clearCart: () => void;
  checkout: () => Promise<void>;
  syncToServer: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [snapReady, setSnapReady] = useState(false);

  // =====================================================
  // 1. LOAD LOCAL STORAGE
  // =====================================================
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setItems(JSON.parse(stored));
  }, []);

  // =====================================================
  // 2. SAVE TO LOCAL STORAGE
  // =====================================================
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  // =====================================================
  // 3. LOAD MIDTRANS SNAP SCRIPT (PENTING!)
  // =====================================================
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute(
      "data-client-key",
      process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || ""
    );

    script.onload = () => {
      console.log("Snap.js loaded");
      setSnapReady(true);
    };

    script.onerror = () => {
      console.error("Failed to load Snap.js");
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // =====================================================
  // ADD TO CART
  // =====================================================
  const addToCart = (item: CartItem) => {
    setItems((prev) => {
      const exist = prev.find((i) => i.id === item.id);
      if (exist) {
        return prev.map((i) =>
          i.id === exist.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, item];
    });

    setIsOpen(true);
  };

  const removeFromCart = (id: string) =>
    setItems((prev) => prev.filter((i) => i.id !== id));

  const toggleCart = () => setIsOpen((o) => !o);

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem("cart");
  };

  // =====================================================
  // 4. SYNC CART → SERVER
  // =====================================================
  const syncToServer = async () => {
    try {
      const res = await fetch("/api/cart", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      if (!res.ok) {
        console.error("Failed to sync cart");
        return;
      }

      setItems([]);
      localStorage.removeItem("cart");
      console.log("Cart synced to DB");
    } catch (err) {
      console.error("Sync error:", err);
    }
  };

  // =====================================================
  // 5. CHECKOUT MIDTRANS
  // =====================================================
  const checkout = async () => {
    if (!snapReady || !window.snap) {
      alert("Pembayaran belum siap. Tunggu 1–2 detik lalu coba lagi.");
      return;
    }

    if (items.length === 0) return;

    const item = items[0];
    const totalAmount = item.price * item.quantity;

    try {
      const res = await fetch("/api/payment/midtrans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan: item.id,
          amount: totalAmount,
        }),
      });

      const data = await res.json();
      if (!data.token) {
        alert("Gagal menghubungkan ke server pembayaran.");
        return;
      }

      window.snap.pay(data.token, {
        onSuccess: () => {
          alert("Pembayaran berhasil!");
          clearCart();
        },
      });
    } catch (err) {
      console.error("Checkout error:", err);
    }
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        clearCart,
        isOpen,
        toggleCart,
        checkout,
        syncToServer,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be inside CartProvider");
  return ctx;
}
