"use client";

import { useCart } from "@/context/cart-context";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function CartDrawer() {
  const { items, isOpen, toggleCart, removeFromCart, clearCart, checkout } =
    useCart();
  const t = useTranslations("Cart");

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const openConfirm = () => {
    if (items.length === 0) return;
    setConfirmOpen(true);
  };

  const handleConfirmCheckout = async () => {
    setConfirmOpen(false);

    try {
      await checkout();
    } catch (err: any) {
      setErrorMessage(
        err?.message || t('errorProcessingPayment')
      );
    }
  };

  return (
    <>
      {/* ========================================
          BACKDROP (Drawer)
      ======================================== */}
      {isOpen && (
        <div
          onClick={toggleCart}
          className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-40 transition-opacity animate-fade-in"
        />
      )}

      {/* ========================================
          ERROR MODAL
      ======================================== */}
      {errorMessage && (
        <div className="fixed inset-0 z-100 bg-black/40 flex items-center justify-center">
          <div className="bg-white dark:bg-slate-900 w-[90%] max-w-sm p-6 rounded-2xl shadow-xl text-center animate-pop">
            <h2 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-3">
              {t('errorOccurred')}
            </h2>

            <p className="text-gray-700 dark:text-slate-300 mb-5">{errorMessage}</p>

            <button
              onClick={() => setErrorMessage(null)}
              className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition w-full"
            >
              {t('close')}
            </button>
          </div>
        </div>
      )}

      {/* ========================================
          MODAL KONFIRMASI CHECKOUT
      ======================================== */}
      {confirmOpen && (
        <div className="fixed inset-0 z-90 bg-black/40 flex items-center justify-center">
          <div className="bg-white dark:bg-slate-900 w-[90%] max-w-md p-6 rounded-2xl shadow-xl animate-pop">
            <h2 className="text-xl font-semibold mb-3 text-[#156d95] dark:text-[#4db8e8]">
              {t('confirmOrder')}
            </h2>

            <p className="text-gray-700 dark:text-slate-300 mb-4">
              {t('ensureOrderCorrect')}
            </p>

            <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-xl border dark:border-slate-700 mb-5 space-y-2">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm dark:text-slate-200">
                  <span className="font-medium">{item.name}</span>
                  <span>
                    Rp{item.price.toLocaleString()} × {item.quantity}
                  </span>
                </div>
              ))}

              <div className="border-t dark:border-slate-700 mt-3 pt-3 font-semibold flex justify-between dark:text-slate-100">
                <span>{t('total')}</span>
                <span>
                  Rp
                  {items
                    .reduce((t, i) => t + i.price * i.quantity, 0)
                    .toLocaleString()}
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmOpen(false)}
                className="px-5 py-2 rounded-lg border border-gray-300 dark:border-slate-600 hover:bg-gray-100 dark:hover:bg-slate-800 dark:text-slate-200 transition"
              >
                {t('cancel')}
              </button>

              <button
                onClick={handleConfirmCheckout}
                className="px-5 py-2 rounded-lg bg-[#156d95] text-white hover:bg-[#0f5875] transition"
              >
                {t('proceedToPayment')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================
          DRAWER
      ======================================== */}
      <div
        className={`
          fixed top-0 right-0 h-full w-80 bg-white dark:bg-slate-900 shadow-2xl z-60
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "translate-x-full"}
          rounded-l-3xl overflow-hidden
        `}
      >
        {/* HEADER */}
        <div className="p-5 border-b dark:border-slate-700 flex justify-between items-center bg-white dark:bg-slate-900">
          <h2 className="text-xl font-semibold dark:text-slate-100">{t('cartTitle')}</h2>
          <button
            onClick={toggleCart}
            className="text-gray-500 hover:text-black dark:text-slate-400 dark:hover:text-white text-xl leading-none"
          >
            ✕
          </button>
        </div>

        {/* ITEM LIST */}
        <div className="p-5 space-y-4 overflow-y-auto h-[70%] custom-scrollbar">
          {items.length === 0 && (
            <p className="text-gray-500 dark:text-slate-400 text-center mt-10">
              {t('emptyCart')}
            </p>
          )}

          {items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center p-3 rounded-xl bg-gray-50 dark:bg-slate-800 border dark:border-slate-700 hover:shadow-md transition"
            >
              <div>
                <div className="font-semibold text-gray-900 dark:text-slate-100">{item.name}</div>
                <div className="text-sm text-gray-600 dark:text-slate-400">
                  Rp{item.price.toLocaleString()} × {item.quantity}
                </div>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium"
              >
                {t('remove')}
              </button>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="p-5 border-t dark:border-slate-700 bg-white dark:bg-slate-900">
          {items.length > 0 && (
            <>
              <div className="mb-4 font-semibold text-lg dark:text-slate-100">
                {t('total')}:{" "}
                <span className="text-[#156d95] dark:text-[#4db8e8]">
                  Rp
                  {items
                    .reduce((t, i) => t + i.price * i.quantity, 0)
                    .toLocaleString()}
                </span>
              </div>

              <button
                onClick={openConfirm}
                className="w-full bg-[#156d95] text-white p-3 rounded-full hover:bg-[#0f5875] transition-all shadow-md"
              >
                {t('checkout')}
              </button>

              <button
                onClick={clearCart}
                className="w-full text-red-600 dark:text-red-400 mt-4 font-medium hover:underline"
              >
                {t('clearCart')}
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
