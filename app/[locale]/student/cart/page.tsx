"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Trash2, ArrowLeft, CheckCircle } from "lucide-react";
import { useCart } from "@/context/cart-context";

export default function CartPage() {
  const t = useTranslations("StudentCart");
  const router = useRouter();
  const {
    items,
    removeFromCart,
    clearCart,
    checkout,
    isLoggedIn,
    refreshAuth,
  } = useCart();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  // Check authentication on mount
  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me", {
        credentials: "include",
        cache: "no-store",
      });

      if (res.status === 401 || !res.ok) {
        alert(t("pleaseLogin"));
        router.push("/login");
        return;
      }

      const data = await res.json();
      if (!data?.user) {
        router.push("/login");
        return;
      }

      setUser(data.user);

      if (data.user.role !== "PELANGGAN") {
        router.push("/student/dashboard");
        return;
      }
    } catch (error) {
      console.error("Authentication error:", error);
      router.push("/login");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Listen untuk auth changes
  useEffect(() => {
    const handleAuthChange = () => {
      checkAuth();
    };

    const handleLogout = () => {
      setUser(null);
      router.push("/login");
    };

    window.addEventListener("app-auth-change", handleAuthChange);
    window.addEventListener("app-logout", handleLogout);

    return () => {
      window.removeEventListener("app-auth-change", handleAuthChange);
      window.removeEventListener("app-logout", handleLogout);
    };
  }, [checkAuth, router]);

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const formatPrice = (price: number) => {
    return `Rp ${price.toLocaleString("id-ID")}`;
  };

  const handleRemoveItem = (id: string) => {
    if (confirm(t("confirmRemove"))) {
      removeFromCart(id);
    }
  };

  const handleClearCart = () => {
    if (confirm(t("confirmClear"))) {
      clearCart();
    }
  };

  const handleCheckout = async () => {
    if (items.length === 0) {
      alert(t("cartEmptyAlert"));
      return;
    }

    if (items.length > 1) {
      alert(t("checkoutOneByOne"));
      return;
    }

    setProcessing(true);
    try {
      await checkout();
    } catch (error) {
      console.error("Checkout error:", error);
      alert(t("checkoutError"));
    } finally {
      setProcessing(false);
    }
  };

  const handleContinueShopping = () => {
    router.push("/student/courses");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#156d95] mx-auto"></div>
          <p className="mt-4 text-muted-foreground">{t("loadingCart")}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const total = calculateTotal();
  const isEmpty = items.length === 0;

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-4 text-muted-foreground hover:text-[#156d95]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />{t("back")}</Button>
          <h1 className="text-3xl font-bold text-foreground">
            Keranjang Belanja
          </h1>
          <p className="text-muted-foreground mt-2">
            {items.length} item{items.length !== 1 ? "s" : ""} dalam keranjang
          </p>
        </div>

        {isEmpty ? (
          <div className="bg-card rounded-2xl shadow-lg p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#156d95]/10 flex items-center justify-center">
              <ShoppingCart className="w-10 h-10 text-[#156d95]" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Keranjang Anda Kosong
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                {t("cartEmptyDesc")}
              </p>
            <Button
              onClick={handleContinueShopping}
              size="lg"
              className="bg-[#156d95] hover:bg-[#0d476e] text-white px-8 py-6 text-lg"
            >{t("exploreCourses")}</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {items.map((item) => (
                <Card
                  key={item.id}
                  className="border border-border hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="mb-4 md:mb-0 w-full md:w-auto">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-xl font-bold text-foreground">
                            {item.name}
                          </h3>
                          <Badge
                            variant="secondary"
                            className={`${item.isBundle
                                ? "bg-[#ff6b00]/10 text-[#ff6b00]"
                                : "bg-[#156d95]/10 text-[#156d95]"
                              }`}
                          >
                            {item.isBundle ? "Bundle" : "Kursus Tunggal"}
                          </Badge>
                        </div>

                        {item.isBundle && item.courseNames && (
                          <div className="mt-3 p-4 bg-secondary rounded-lg">
                            <p className="text-sm font-medium text-muted-foreground mb-2">
                              {t("includesCourses", { count: item.courseNames.length })}
                            </p>
                            <ul className="space-y-1">
                              {item.courseNames.map((name, index) => (
                                <li
                                  key={index}
                                  className="flex items-start text-sm text-muted-foreground"
                                >
                                  <span className="text-[#156d95] mr-2 mt-1">
                                    •
                                  </span>
                                  <span>{name}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className="mt-4 flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">{t("price")}</p>
                            <p className="text-lg font-bold text-[#156d95]">
                              {formatPrice(item.price)}
                            </p>
                          </div>
                          <div>
                            {/* <p className="text-sm text-muted-foreground">Jumlah</p>
                            <p className="text-lg font-bold text-foreground">
                              {item.quantity}
                            </p> */}
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">{t("subtotal")}</p>
                            <p className="text-lg font-bold text-foreground">
                              {formatPrice(item.price * item.quantity)}
                            </p>
                          </div>
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        title="Hapus dari keranjang"
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-24 border-0 shadow-xl overflow-hidden bg-gradient-to-br from-[#156d95] to-[#0d476e]">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-white mb-6">{t("orderSummary")}</h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-white/90">
                      <span>{t("totalItems")}</span>
                      <span>{items.length}</span>
                    </div>
                    <div className="flex justify-between text-white/90">
                      <span>{t("totalPrice")}</span>
                      <span className="font-bold text-white text-xl">
                        {formatPrice(total)}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6 pt-4 border-t border-white/20">
                    <div className="flex items-center text-sm text-white/80">
                      <CheckCircle className="h-4 w-4 text-green-300 mr-2" />
                      <span>{t("lifetimeAccess")}</span>
                    </div>
                    {/* <div className="flex items-center text-sm text-white/80">
                      <CheckCircle className="h-4 w-4 text-green-300 mr-2" />
                      <span>Sertifikat resmi</span>
                    </div> */}
                    <div className="flex items-center text-sm text-white/80">
                      <CheckCircle className="h-4 w-4 text-green-300 mr-2" />
                      <span>{t("freeUpdates")}</span>
                    </div>
                  </div>

                  {items.length > 1 ? (
                    <Button
                      disabled
                      className="w-full bg-white/20 text-white hover:bg-white/30 cursor-not-allowed py-6 text-lg font-bold"
                    >{t("checkoutSingle")}</Button>
                  ) : (
                    <Button
                      onClick={handleCheckout}
                      disabled={processing}
                      className="w-full bg-white text-[#156d95] hover:bg-gray-100 font-bold py-6 text-lg rounded-xl shadow-lg transition-all duration-300 hover:scale-[1.02]"
                    >
                      {processing ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#156d95] mr-2"></div>
                          Memproses...
                        </>
                      ) : (
                        "Lanjutkan ke Pembayaran"
                      )}
                    </Button>
                  )}

                  <Button
                    variant="ghost"
                    onClick={handleClearCart}
                    className="w-full mt-3 text-white/70 hover:text-white hover:bg-white/10"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />{t("clearCart")}</Button>
                </CardContent>
              </Card>

              <Card className="mt-6 border border-border">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4 text-foreground">{t("paymentInfo")}</h3>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-start">
                      <span className="text-[#156d95] mr-2 mt-1">•</span>
                      <span>
                        Pembayaran diproses melalui Midtrans (payment gateway
                        terpercaya)
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#156d95] mr-2 mt-1">•</span>
                      <span>
                        Setelah pembayaran berhasil, kursus langsung tersedia di
                        dashboard
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#156d95] mr-2 mt-1">•</span>
                      <span>
                        Akses kursus seumur hidup dengan update materi gratis
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
