// "use client";
// import React, { createContext, useContext, useState, useEffect } from "react";

// export interface CartItem {
//   id: string;
//   name: string;
//   price: number;
//   quantity: number;
//   isBundle?: boolean;
//   courseIds?: string[];
//   courseNames?: string[];
// }

// interface CartContextType {
//   items: CartItem[];
//   isOpen: boolean;
//   addToCart: (item: CartItem) => void;
//   removeFromCart: (id: string) => void;
//   toggleCart: () => void;
//   clearCart: () => void;
//   checkout: () => Promise<void>;
//   syncToServer: () => Promise<void>;
//   isLoggedIn: boolean;
//   loading: boolean;
// }

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export function CartProvider({ children }: { children: React.ReactNode }) {
//   const [items, setItems] = useState<CartItem[]>([]);
//   const [isOpen, setIsOpen] = useState(false);
//   const [snapReady, setSnapReady] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [lastAddedItem, setLastAddedItem] = useState<CartItem | null>(null);
//   const [showSuccessPopup, setShowSuccessPopup] = useState(false);

//   // Load Midtrans Snap
//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src =
//       process.env.NEXT_PUBLIC_MIDTRANS_ENVIRONMENT === "production"
//         ? "https://app.midtrans.com/snap/snap.js"
//         : "https://app.sandbox.midtrans.com/snap/snap.js";
//     script.setAttribute(
//       "data-client-key",
//       process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || "",
//     );
//     script.onload = () => setSnapReady(true);
//     script.onerror = () => console.error("Failed to load Snap.js");
//     document.body.appendChild(script);
//     return () => {
//       if (script.parentNode) {
//         document.body.removeChild(script);
//       }
//     };
//   }, []);

//   // Check auth dan load cart
//   useEffect(() => {
//     const initCart = async () => {
//       try {
//         const authRes = await fetch("/api/auth/me", {
//           credentials: "include",
//         });
//         const authenticated = authRes.ok;
//         setIsLoggedIn(authenticated);

//         if (authenticated) {
//           await loadCartFromServer();

//           // Sync guest cart jika ada
//           const guestCart = localStorage.getItem("guest-cart");
//           if (guestCart) {
//             try {
//               const guestItems = JSON.parse(guestCart);
//               if (guestItems.length > 0) {
//                 console.log("Syncing guest cart to server:", guestItems);

//                 const res = await fetch("/api/cart", {
//                   method: "PUT",
//                   headers: { "Content-Type": "application/json" },
//                   credentials: "include",
//                   body: JSON.stringify({ items: guestItems }),
//                 });

//                 if (res.ok) {
//                   console.log("Guest cart synced successfully");
//                   localStorage.removeItem("guest-cart");
//                   await loadCartFromServer();
//                 }
//               }
//             } catch (error) {
//               console.error("Error syncing guest cart:", error);
//             }
//           }
//         } else {
//           const stored = localStorage.getItem("guest-cart");
//           if (stored) {
//             try {
//               const parsed = JSON.parse(stored);
//               setItems(parsed);
//             } catch (e) {
//               localStorage.removeItem("guest-cart");
//             }
//           }
//         }
//       } catch (error) {
//         console.error("Cart init error:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     initCart();
//   }, []);

//   // Load cart dari server
//   const loadCartFromServer = async () => {
//     try {
//       const res = await fetch("/api/cart", {
//         credentials: "include",
//       });

//       if (res.ok) {
//         const data = await res.json();
//         const cartItems = data.items || [];
//         setItems(cartItems);
//         localStorage.setItem("cart", JSON.stringify(cartItems));
//       }
//     } catch (error) {
//       console.error("Error loading cart from server:", error);
//     }
//   };

//   // Save to localStorage (backup)
//   useEffect(() => {
//     if (!loading) {
//       localStorage.setItem("cart", JSON.stringify(items));
//     }
//   }, [items, loading]);

//   // Add to cart
//   const addToCart = async (item: CartItem) => {
//     try {
//       const authRes = await fetch("/api/auth/me", {
//         credentials: "include",
//       });
//       const authenticated = authRes.ok;
//       setIsLoggedIn(authenticated);

//       if (authenticated) {
//         const res = await fetch("/api/cart", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           credentials: "include",
//           body: JSON.stringify({
//             productId: item.id,
//             quantity: item.quantity,
//             price: item.price,
//             name: item.name,
//             isBundle: item.isBundle,
//             courseIds: item.courseIds,
//             courseNames: item.courseNames,
//           }),
//         });

//         if (res.ok) {
//           await loadCartFromServer();
//           setIsOpen(true);
//           setLastAddedItem(item);
//           setShowSuccessPopup(true);
//           setTimeout(() => setShowSuccessPopup(false), 2500);
//         } else {
//           const data = await res.json();
//           console.error("Failed to add to cart:", data.error);
//         }
//       } else {
//         const guestCart = localStorage.getItem("guest-cart");
//         let currentItems: CartItem[] = [];

//         if (guestCart) {
//           currentItems = JSON.parse(guestCart);
//         }

//         const existingIndex = currentItems.findIndex((i) => i.id === item.id);
//         if (existingIndex >= 0) {
//           currentItems[existingIndex].quantity += item.quantity;
//         } else {
//           currentItems.push(item);
//         }

//         localStorage.setItem("guest-cart", JSON.stringify(currentItems));
//         setItems(currentItems);

//         window.dispatchEvent(
//           new CustomEvent("cartAdded", {
//             detail: { item, guest: true },
//           }),
//         );
//       }
//     } catch (error) {
//       console.error("Add to cart error:", error);
//     }
//   };

//   const removeFromCart = async (id: string) => {
//     if (isLoggedIn) {
//       try {
//         const res = await fetch(`/api/cart?productId=${id}`, {
//           method: "DELETE",
//           credentials: "include",
//         });

//         if (res.ok) {
//           await loadCartFromServer();
//         }
//       } catch (error) {
//         console.error("Error removing from cart:", error);
//       }
//     } else {
//       const guestCart = localStorage.getItem("guest-cart");
//       if (guestCart) {
//         const currentItems = JSON.parse(guestCart);
//         const filtered = currentItems.filter((i: CartItem) => i.id !== id);
//         localStorage.setItem("guest-cart", JSON.stringify(filtered));
//         setItems(filtered);
//       } else {
//         setItems((prev) => prev.filter((i) => i.id !== id));
//       }
//     }
//   };

//   const toggleCart = () => setIsOpen((o) => !o);

//   const clearCart = async () => {
//     if (isLoggedIn) {
//       try {
//         await fetch("/api/cart", {
//           method: "DELETE",
//           credentials: "include",
//         });
//       } catch (error) {
//         console.error("Error clearing cart:", error);
//       }
//     }
//     setItems([]);
//     localStorage.removeItem("cart");
//     localStorage.removeItem("guest-cart");
//   };

//   const checkout = async () => {
//     const authCheck = await fetch("/api/auth/me", {
//       method: "GET",
//       credentials: "include",
//     });

//     if (!authCheck.ok) {
//       alert("Silakan login terlebih dahulu untuk melanjutkan pembayaran.");
//       window.location.href = "/login";
//       return;
//     }

//     if (!snapReady || !(window as any).snap) {
//       alert("Pembayaran belum siap. Tunggu 1–2 detik lalu coba lagi.");
//       return;
//     }

//     if (items.length === 0) {
//       alert("Keranjang Anda kosong!");
//       return;
//     }

//     if (items.length > 1) {
//       alert("Silakan checkout satu item per transaksi.");
//       return;
//     }

//     try {
//       const item = items[0];

//       // Pastikan harga adalah number
//       const itemPrice =
//         typeof item.price === "string" ? parseFloat(item.price) : item.price;
//       const totalAmount = itemPrice * (item.quantity || 1);

//       console.log("Checkout item:", {
//         id: item.id,
//         name: item.name,
//         price: itemPrice,
//         quantity: item.quantity,
//         totalAmount: totalAmount,
//         isBundle: item.isBundle,
//         courseIds: item.courseIds,
//       });

//       const res = await fetch("/api/payment/midtrans", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({
//           plan: item.id,
//           amount: totalAmount,
//           isBundle: item.isBundle,
//           courseIds: item.courseIds,
//           courseNames: item.courseNames,
//         }),
//       });

//       const contentType = res.headers.get("content-type");
//       if (!contentType || !contentType.includes("application/json")) {
//         const text = await res.text();
//         console.error("Non-JSON response from payment:", text);
//         alert("Terjadi kesalahan pada server pembayaran. Silakan coba lagi.");
//         return;
//       }

//       const data = await res.json();

//       if (!res.ok) {
//         console.error("Payment API error:", data);
//         alert(data.error || "Gagal menghubungkan ke server pembayaran.");
//         return;
//       }

//       if (!data.token) {
//         alert("Gagal mendapatkan token pembayaran.");
//         return;
//       }

//       (window as any).snap.pay(data.token, {
//         onSuccess: async (result: any) => {
//           console.log("Payment success:", result);
//           console.log("Creating order with data:", {
//             items: items,
//             totalAmount: totalAmount,
//             transactionId: data.order_id || result.order_id,
//           });

//           // TAMBAHKAN DELAY SINGKAT untuk memastikan payment selesai
//           await new Promise((resolve) => setTimeout(resolve, 1000));

//           try {
//             const orderRes = await fetch("/api/orders", {
//               method: "POST",
//               headers: { "Content-Type": "application/json" },
//               credentials: "include",
//               body: JSON.stringify({
//                 items: items.map((item) => ({
//                   id: item.id,
//                   name: item.name,
//                   price:
//                     typeof item.price === "string"
//                       ? parseFloat(item.price)
//                       : item.price,
//                   quantity: item.quantity || 1,
//                   isBundle: item.isBundle || false,
//                   courseIds: item.courseIds || [],
//                   courseNames: item.courseNames || [],
//                 })),
//                 totalAmount: totalAmount,
//                 transactionId:
//                   data.order_id || result.order_id || `TRX-${Date.now()}`,
//                 paymentMethod: "midtrans",
//                 status: "PAID",
//               }),
//             });

//             const orderData = await orderRes.json();
//             console.log("Order response:", orderData);

//             if (!orderRes.ok) {
//               console.error("Order creation failed:", orderData);
//               alert(
//                 `Pembayaran berhasil tapi gagal menyimpan order: ${orderData.error || "Unknown error"}\n\nSilakan hubungi support dengan kode: ${result.order_id}`,
//               );
//             } else {
//               console.log("Order created successfully:", orderData.order.id);
//             }
//           } catch (error: any) {
//             console.error("Order creation error:", error);
//             alert(
//               "Pembayaran berhasil tapi gagal menyimpan order. Silakan hubungi support.\nError: " +
//                 error.message,
//             );
//           }

//           await clearCart();

//           if (!item.isBundle) {
//             window.location.href = `/course/${item.id}?purchase=success`;
//           } else {
//             window.location.href =
//               "/student/dashboard?purchase=success&bundle=true";
//           }
//         },
//         onPending: (result: any) => {
//           console.log("Payment pending:", result);
//           alert(
//             "Pembayaran sedang diproses. Silakan cek email Anda untuk update status.",
//           );
//         },
//         onError: (result: any) => {
//           console.error("Payment error:", result);
//           alert("Pembayaran gagal. Silakan coba lagi.");
//         },
//         onClose: () => {
//           console.log("Payment popup closed without completion");
//         },
//       });
//     } catch (err: any) {
//       console.error("Checkout error:", err);
//       alert(err.message || "Terjadi kesalahan saat memproses pembayaran.");
//     }
//   };
//   const syncToServer = async () => {
//     try {
//       const res = await fetch("/api/cart", {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({ items }),
//       });

//       if (res.ok) {
//         await loadCartFromServer();
//         localStorage.removeItem("cart");
//         localStorage.removeItem("guest-cart");
//       }
//     } catch (err) {
//       console.error("Sync error:", err);
//     }
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         items,
//         addToCart,
//         removeFromCart,
//         clearCart,
//         isOpen,
//         toggleCart,
//         checkout,
//         syncToServer,
//         isLoggedIn,
//         loading,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }

// export function useCart() {
//   const ctx = useContext(CartContext);
//   if (!ctx) throw new Error("useCart must be inside CartProvider");
//   return ctx;
// }

"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  isBundle?: boolean;
  courseIds?: string[];
  courseNames?: string[];
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
  isLoggedIn: boolean;
  loading: boolean;
  refreshAuth: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [snapReady, setSnapReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  // Load Midtrans Snap
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      process.env.NEXT_PUBLIC_MIDTRANS_ENVIRONMENT === "production"
        ? "https://app.midtrans.com/snap/snap.js"
        : "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute(
      "data-client-key",
      process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || "",
    );
    script.onload = () => setSnapReady(true);
    script.onerror = () => console.error("Failed to load Snap.js");
    document.body.appendChild(script);
    return () => {
      if (script.parentNode) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // Check auth dan load cart - DIPISAHKAN AGAR BISA DI-REFRESH
  const checkAuth = useCallback(async () => {
    try {
      const authRes = await fetch("/api/auth/me", {
        credentials: "include",
        cache: "no-store", // Hindari cache
      });

      const authenticated = authRes.ok;
      const authData = authenticated ? await authRes.json() : null;
      const currentUserId = authData?.user?.id || null;

      setIsLoggedIn(authenticated);
      setUserId(currentUserId);

      if (authenticated && currentUserId) {
        // Load cart dari server
        await loadCartFromServer();

        // Cek apakah ada guest cart yang perlu di-sync
        const guestCart = localStorage.getItem("guest-cart");
        if (guestCart) {
          try {
            const guestItems = JSON.parse(guestCart);
            if (guestItems.length > 0) {
              console.log("Syncing guest cart to server:", guestItems);

              const res = await fetch("/api/cart", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ items: guestItems }),
              });

              if (res.ok) {
                console.log("Guest cart synced successfully");
                localStorage.removeItem("guest-cart");
                await loadCartFromServer();
              }
            } else {
              localStorage.removeItem("guest-cart");
            }
          } catch (error) {
            console.error("Error syncing guest cart:", error);
            localStorage.removeItem("guest-cart");
          }
        }
      } else {
        // User tidak login, load dari guest-cart
        const stored = localStorage.getItem("guest-cart");
        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            setItems(parsed);
          } catch (e) {
            localStorage.removeItem("guest-cart");
            setItems([]);
          }
        } else {
          setItems([]);
        }
      }
    } catch (error) {
      console.error("Cart init error:", error);
      setIsLoggedIn(false);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Listen untuk event logout dari komponen lain
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "logout-event") {
        console.log("Logout event detected from another tab/component");
        setIsLoggedIn(false);
        setUserId(null);
        setItems([]);
        localStorage.removeItem("cart");
      }
      if (e.key === "auth-change") {
        console.log("Auth change detected, refreshing cart...");
        checkAuth();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Custom event untuk same-tab communication
    const handleCustomLogout = () => {
      console.log("Custom logout event received");
      setIsLoggedIn(false);
      setUserId(null);
      setItems([]);
      localStorage.removeItem("cart");
    };

    const handleCustomAuthChange = () => {
      console.log("Custom auth change event received");
      checkAuth();
    };

    window.addEventListener("app-logout", handleCustomLogout);
    window.addEventListener("app-auth-change", handleCustomAuthChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("app-logout", handleCustomLogout);
      window.removeEventListener("app-auth-change", handleCustomAuthChange);
    };
  }, [checkAuth]);

  // Effect untuk handle redirect dari Google OAuth
  useEffect(() => {
    const handleOAuthRedirect = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const syncCart = urlParams.get("sync_cart");

      if (syncCart === "true") {
        // Hapus parameter dari URL tanpa reload
        const newUrl = window.location.pathname;
        window.history.replaceState({}, document.title, newUrl);

        // Trigger auth check ulang
        await checkAuth();
      }
    };

    const timer = setTimeout(handleOAuthRedirect, 300);
    return () => clearTimeout(timer);
  }, [checkAuth]);

  // Load cart dari server
  const loadCartFromServer = async () => {
    try {
      const res = await fetch("/api/cart", {
        credentials: "include",
        cache: "no-store",
      });

      if (res.ok) {
        const data = await res.json();
        const cartItems = data.items || [];
        setItems(cartItems);
        localStorage.setItem("cart", JSON.stringify(cartItems));
      } else if (res.status === 401) {
        setIsLoggedIn(false);
        setItems([]);
      }
    } catch (error) {
      console.error("Error loading cart from server:", error);
    }
  };

  // Save to localStorage (backup)
  useEffect(() => {
    if (!loading) {
      if (isLoggedIn) {
        localStorage.setItem("cart", JSON.stringify(items));
      } else {
        localStorage.setItem("guest-cart", JSON.stringify(items));
      }
    }
  }, [items, loading, isLoggedIn]);

  // Add to cart
  const addToCart = async (item: CartItem) => {
    try {
      // Cek auth status terkini
      const authRes = await fetch("/api/auth/me", {
        credentials: "include",
        cache: "no-store",
      });
      const authenticated = authRes.ok;
      setIsLoggedIn(authenticated);

      if (authenticated) {
        const res = await fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
            name: item.name,
            isBundle: item.isBundle,
            courseIds: item.courseIds,
            courseNames: item.courseNames,
          }),
        });

        if (res.ok) {
          await loadCartFromServer();
          setIsOpen(true);
        } else {
          const data = await res.json();
          console.error("Failed to add to cart:", data.error);
        }
      } else {
        // Guest user - simpan ke guest-cart
        const guestCart = localStorage.getItem("guest-cart");
        let currentItems: CartItem[] = [];

        if (guestCart) {
          currentItems = JSON.parse(guestCart);
        }

        const existingIndex = currentItems.findIndex((i) => i.id === item.id);
        if (existingIndex >= 0) {
          currentItems[existingIndex].quantity += item.quantity;
        } else {
          currentItems.push(item);
        }

        localStorage.setItem("guest-cart", JSON.stringify(currentItems));
        setItems(currentItems);
        setIsOpen(true);
      }
    } catch (error) {
      console.error("Add to cart error:", error);
    }
  };

  const removeFromCart = async (id: string) => {
    if (isLoggedIn) {
      try {
        const res = await fetch(`/api/cart?productId=${id}`, {
          method: "DELETE",
          credentials: "include",
        });

        if (res.ok) {
          await loadCartFromServer();
        }
      } catch (error) {
        console.error("Error removing from cart:", error);
      }
    } else {
      const guestCart = localStorage.getItem("guest-cart");
      if (guestCart) {
        const currentItems = JSON.parse(guestCart);
        const filtered = currentItems.filter((i: CartItem) => i.id !== id);
        localStorage.setItem("guest-cart", JSON.stringify(filtered));
        setItems(filtered);
      } else {
        setItems((prev) => prev.filter((i) => i.id !== id));
      }
    }
  };

  const toggleCart = () => setIsOpen((o) => !o);

  const clearCart = async () => {
    if (isLoggedIn) {
      try {
        await fetch("/api/cart", {
          method: "DELETE",
          credentials: "include",
        });
      } catch (error) {
        console.error("Error clearing cart:", error);
      }
    }
    setItems([]);
    localStorage.removeItem("cart");
    localStorage.removeItem("guest-cart");
  };

  const checkout = async () => {
    const authCheck = await fetch("/api/auth/me", {
      method: "GET",
      credentials: "include",
      cache: "no-store",
    });

    if (!authCheck.ok) {
      alert("Silakan login terlebih dahulu untuk melanjutkan pembayaran.");
      window.location.href = "/login";
      return;
    }

    if (!snapReady || !(window as any).snap) {
      alert("Pembayaran belum siap. Tunggu 1–2 detik lalu coba lagi.");
      return;
    }

    if (items.length === 0) {
      alert("Keranjang Anda kosong!");
      return;
    }

    if (items.length > 1) {
      alert("Silakan checkout satu item per transaksi.");
      return;
    }

    try {
      const item = items[0];

      const itemPrice =
        typeof item.price === "string" ? parseFloat(item.price) : item.price;
      const totalAmount = itemPrice * (item.quantity || 1);

      console.log("Checkout item:", {
        id: item.id,
        name: item.name,
        price: itemPrice,
        quantity: item.quantity,
        totalAmount: totalAmount,
        isBundle: item.isBundle,
        courseIds: item.courseIds,
      });

      const res = await fetch("/api/payment/midtrans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          plan: item.id,
          amount: totalAmount,
          isBundle: item.isBundle,
          courseIds: item.courseIds,
          courseNames: item.courseNames,
        }),
      });

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text();
        console.error("Non-JSON response from payment:", text);
        alert("Terjadi kesalahan pada server pembayaran. Silakan coba lagi.");
        return;
      }

      const data = await res.json();

      if (!res.ok) {
        console.error("Payment API error:", data);
        alert(data.error || "Gagal menghubungkan ke server pembayaran.");
        return;
      }

      if (!data.token) {
        alert("Gagal mendapatkan token pembayaran.");
        return;
      }

      (window as any).snap.pay(data.token, {
        onSuccess: async (result: any) => {
          console.log("Payment success:", result);

          await new Promise((resolve) => setTimeout(resolve, 1000));

          try {
            const orderRes = await fetch("/api/orders", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
              body: JSON.stringify({
                items: items.map((item) => ({
                  id: item.id,
                  name: item.name,
                  price:
                    typeof item.price === "string"
                      ? parseFloat(item.price)
                      : item.price,
                  quantity: item.quantity || 1,
                  isBundle: item.isBundle || false,
                  courseIds: item.courseIds || [],
                  courseNames: item.courseNames || [],
                })),
                totalAmount: totalAmount,
                transactionId:
                  data.order_id || result.order_id || `TRX-${Date.now()}`,
                paymentMethod: "midtrans",
                status: "PAID",
              }),
            });

            const orderData = await orderRes.json();
            console.log("Order response:", orderData);

            if (!orderRes.ok) {
              console.error("Order creation failed:", orderData);
              alert(
                `Pembayaran berhasil tapi gagal menyimpan order: ${orderData.error || "Unknown error"}\n\nSilakan hubungi support dengan kode: ${result.order_id}`,
              );
            } else {
              console.log("Order created successfully:", orderData.order.id);
            }
          } catch (error: any) {
            console.error("Order creation error:", error);
            alert(
              "Pembayaran berhasil tapi gagal menyimpan order. Silakan hubungi support.\nError: " +
                error.message,
            );
          }

          await clearCart();

          if (!item.isBundle) {
            window.location.href = `/course/${item.id}?purchase=success`;
          } else {
            window.location.href =
              "/student/dashboard?purchase=success&bundle=true";
          }
        },
        onPending: (result: any) => {
          console.log("Payment pending:", result);
          alert(
            "Pembayaran sedang diproses. Silakan cek email Anda untuk update status.",
          );
        },
        onError: (result: any) => {
          console.error("Payment error:", result);
          alert("Pembayaran gagal. Silakan coba lagi.");
        },
        onClose: () => {
          console.log("Payment popup closed without completion");
        },
      });
    } catch (err: any) {
      console.error("Checkout error:", err);
      alert(err.message || "Terjadi kesalahan saat memproses pembayaran.");
    }
  };

  const syncToServer = async () => {
    try {
      const res = await fetch("/api/cart", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ items }),
      });

      if (res.ok) {
        await loadCartFromServer();
        localStorage.removeItem("cart");
        localStorage.removeItem("guest-cart");
      }
    } catch (err) {
      console.error("Sync error:", err);
    }
  };

  // Fungsi untuk refresh auth state dari komponen lain
  const refreshAuth = async () => {
    await checkAuth();
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
        isLoggedIn,
        loading,
        refreshAuth,
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
