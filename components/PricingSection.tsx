"use client";

import * as React from "react";
import { CheckIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCart } from "@/app/context/cart-context";
import { useRouter } from "next/navigation"; // ← tambahan untuk redirect

// ----------------------------
// TYPES
// ----------------------------
type PlanLevel = "bundle3" | "bundle5" | "bundle10";

interface PricingFeature {
  name: string;
  included: PlanLevel | "all";
}

interface PricingPlan {
  name: string;
  level: PlanLevel;
  price: number;
  popular?: boolean;
}

// ----------------------------
// FEATURES LIST
// ----------------------------
const features: PricingFeature[] = [
  { name: "Akses materi selamanya", included: "all" },
  { name: "Update materi otomatis", included: "all" },
  { name: "Support via email", included: "all" },
  { name: "Video pembelajaran premium", included: "bundle5" },
  { name: "Bonus PDF strategi trading", included: "bundle5" },
  { name: "Akses grup trader Telegram", included: "bundle5" },
  { name: "Mentoring mingguan 1x", included: "bundle10" },
  { name: "Semua bonus paket sebelumnya", included: "bundle10" },
  { name: "Konsultasi private 1 jam", included: "bundle10" },
];

// ----------------------------
// PRICING PLANS
// ----------------------------
const plans: PricingPlan[] = [
  { name: "Bundle 3 Materi", price: 49000, level: "bundle3" },
  { name: "Bundle 5 Materi", price: 79000, level: "bundle5", popular: true },
  { name: "Bundle 10 Materi", price: 129000, level: "bundle10" },
];

// ----------------------------
// FEATURE CHECK HELPER
// ----------------------------
function shouldShowCheck(included: PricingFeature["included"], level: PlanLevel) {
  if (included === "all") return true;
  if (included === "bundle10" && level === "bundle10") return true;
  if (included === "bundle5" && (level === "bundle5" || level === "bundle10")) return true;
  if (included === "bundle3" && level === "bundle3") return true;
  return false;
}

// ----------------------------
// MAIN COMPONENT
// ----------------------------
export function PricingSection() {
  const [selectedPlan, setSelectedPlan] = React.useState<PlanLevel>("bundle5");
  const { addToCart, toggleCart } = useCart();
  const router = useRouter();

  // Popup Konfirmasi Tambah ke Keranjang
  const [confirmOpen, setConfirmOpen] = React.useState(false);

  // Popup Sukses (kanan atas)
  const [successOpen, setSuccessOpen] = React.useState(false);

  // Popup "Login untuk melanjutkan pembayaran"
  const [loginPromptOpen, setLoginPromptOpen] = React.useState(false);

  // Auto-close success popup
  React.useEffect(() => {
    if (successOpen) {
      const timer = setTimeout(() => setSuccessOpen(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [successOpen]);

  // Ambil data plan aktif
  const activePlan = plans.find((p) => p.level === selectedPlan)!;

  // ----------------------------
  // HANDLE ADD TO CART
  // ----------------------------
  function handleAddToCart() {
    addToCart({
      id: activePlan.level,
      name: activePlan.name,
      price: activePlan.price,
      quantity: 1,
    });

    setConfirmOpen(false);
    setSuccessOpen(true);
    toggleCart(); // buka cart

    // Munculkan popup login setelah sukses tambah ke cart
    setTimeout(() => {
      setLoginPromptOpen(true);
    }, 800); // delay sedikit biar popup sukses kelihatan dulu
  }

  return (
    <>
      {/* ===================== POPUP SUKSES (KANAN ATAS) ===================== */}
      {successOpen && (
        <div className="fixed top-6 right-6 z-60 animate-slide-in opacity-100 transition">
          <div className="bg-[#156d95] text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
              <CheckIcon className="text-[#156d95] w-4 h-4" />
            </div>
            <span className="font-medium">Berhasil ditambahkan ke keranjang</span>
          </div>
        </div>
      )}

      {/* ===================== POPUP LOGIN PROMPT ===================== */}
      {loginPromptOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-8 shadow-2xl text-center animate-fade-in">
            <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-green-100 flex items-center justify-center">
              <CheckIcon className="w-10 h-10 text-green-600" />
            </div>

            <h2 className="text-2xl font-bold text-[#156d95] mb-3">
              Berhasil Ditambahkan!
            </h2>
            <p className="text-gray-700 mb-8 leading-relaxed">
              {activePlan.name} sudah masuk ke keranjang.<br />
              Silakan <strong>login</strong> untuk melanjutkan ke pembayaran.
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  setLoginPromptOpen(false);
                  router.push("/login");
                }}
                className="w-full py-3 bg-[#156d95] text-white rounded-xl font-medium hover:bg-[#0f5a7a] transition"
              >
                Login Sekarang
              </button>
              <button
                onClick={() => setLoginPromptOpen(false)}
                className="text-gray-600 hover:text-gray-800 underline"
              >
                Nanti saja
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================== POPUP KONFIRMASI ===================== */}
      {confirmOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl animate-fade-in">
            <h2 className="text-xl font-semibold mb-4 text-[#0a0a0f]">
              Tambahkan ke Keranjang?
            </h2>

            <p className="text-gray-700 mb-6">
              Kamu akan menambahkan <b>{activePlan.name}</b> ke keranjang dengan harga{" "}
              <b>Rp{activePlan.price.toLocaleString()}</b>.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmOpen(false)}
                className="px-5 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
              >
                Batal
              </button>

              <button
                onClick={handleAddToCart}
                className="px-5 py-2 bg-[#156d95] text-white rounded-xl hover:bg-[#0a0a0f] transition-all"
              >
                Tambah ke Cart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================== CONTENT ===================== */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Title */}
          <div className="text-center mb-16">
            <h2 className="font-figtree text-[40px] font-normal leading-tight mb-4">
              Pilih Paket Bundle Materi
            </h2>
            <p className="font-figtree text-lg text-muted-foreground max-w-2xl mx-auto">
              Pilih paket belajar Forex yang sesuai dengan kebutuhan dan tingkat kemampuanmu.
            </p>
          </div>

          {/* Plans */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {plans.map((plan) => (
              <button
                key={plan.name}
                type="button"
                onClick={() => setSelectedPlan(plan.level)}
                className={cn(
                  "relative p-8 rounded-2xl text-left transition-all border-2",
                  selectedPlan === plan.level
                    ? "border-[#156d95] bg-[#156d95]/5"
                    : "border-border hover:border-[#156d95]/50"
                )}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#156d95] text-white px-4 py-1 rounded-xl text-sm font-figtree">
                    Terpopuler
                  </span>
                )}

                <div className="mb-6">
                  <h3 className="font-figtree text-2xl font-medium mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="font-figtree text-4xl font-medium">
                      Rp{plan.price.toLocaleString()}
                    </span>
                    <span className="font-figtree text-lg text-muted-foreground">/sekali bayar</span>
                  </div>
                </div>

                <div
                  className={cn(
                    "w-full py-3 px-6 rounded-full font-figtree text-lg transition-all text-center",
                    selectedPlan === plan.level
                      ? "bg-[#156d95] text-white"
                      : "bg-secondary text-foreground"
                  )}
                >
                  {selectedPlan === plan.level ? "Dipilih" : "Pilih Paket"}
                </div>
              </button>
            ))}
          </div>

          {/* Features table */}
          <div className="border border-border rounded-2xl overflow-hidden bg-card">
            <div className="overflow-x-auto">
              <div className="min-w-[900px]">
                
                {/* Header */}
                <div className="flex items-center p-6 bg-secondary border-b border-border">
                  <div className="flex-1">
                    <h3 className="font-figtree text-xl font-medium">Manfaat yang Kamu Dapatkan</h3>
                  </div>

                  <div className="flex items-center gap-8">
                    {plans.map((plan) => (
                      <div key={plan.level} className="w-32 text-center font-figtree text-lg font-medium">
                        {plan.name}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rows */}
                {features.map((feature, index) => (
                  <div
                    key={feature.name}
                    className={cn(
                      "flex items-center p-6 transition-colors border-b border-border last:border-b-0",
                      index % 2 === 0 ? "bg-background" : "bg-secondary/30"
                    )}
                  >
                    <div className="flex-1">
                      <span className="font-figtree text-lg">{feature.name}</span>
                    </div>

                    <div className="flex items-center gap-8">
                      {plans.map((plan) => (
                        <div key={plan.level} className="w-32 flex justify-center">
                          {shouldShowCheck(feature.included, plan.level) ? (
                            <div className="w-6 h-6 rounded-full bg-[#156d95] flex items-center justify-center">
                              <CheckIcon className="w-4 h-4 text-white" />
                            </div>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <button
              onClick={() => setConfirmOpen(true)}
              className="bg-[#156d95] text-white px-[18px] py-[15px] rounded-xl font-figtree text-lg hover:bg-[#0a0a0f] transition-all"
            >
              Mulai dengan {activePlan.name}
            </button>
          </div>

        </div>
      </section>
    </>
  );
}