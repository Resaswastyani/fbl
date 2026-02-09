"use client";

import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calculator,
  ShieldCheck,
  AlertTriangle,
  ArrowUpRight,
} from "lucide-react";

/* ================= DATA ================= */
const PAIRS = [
  "EURUSD",
  "GBPUSD",
  "USDJPY",
  "USDCHF",
  "AUDUSD",
  "USDCAD",
  "NZDUSD",
  "EURJPY",
  "GBPJPY",
  "EURGBP",
  "EURAUD",
  "XAUUSD",
  "XAGUSD",
  "BTCUSD",
];

const ACCOUNT_CURRENCIES = ["USD", "EUR", "GBP", "JPY", "AUD", "IDR"];

/* ================= HELPERS ================= */
function getPipSize(pair: string) {
  if (pair.includes("JPY")) return 0.01;
  if (pair.startsWith("XAU")) return 0.01;
  if (pair.startsWith("XAG")) return 0.01;
  if (pair.startsWith("BTC")) return 1;
  return 0.0001;
}

function getContractSize(pair: string) {
  if (pair.startsWith("XAU")) return 100;
  if (pair.startsWith("XAG")) return 5000;
  if (pair.startsWith("BTC")) return 1;
  return 100000;
}

function calculatePipValue(pair: string) {
  return getPipSize(pair) * getContractSize(pair);
}

function needPriceConversion(pair: string) {
  return (
    pair.includes("JPY") || pair.startsWith("XAU") || pair.startsWith("BTC")
  );
}

/* ================= PAGE ================= */
export default function PositionSizeCalculatorPage() {
  const [balance, setBalance] = useState(1000);
  const [riskPercent, setRiskPercent] = useState(1);
  const [stopLoss, setStopLoss] = useState(50);

  const [pair, setPair] = useState("EURUSD");
  const [accountCurrency, setAccountCurrency] = useState("USD");

  const [pipValue, setPipValue] = useState(0);
  const [positionSize, setPositionSize] = useState(0); // LOT
  const [positionUnits, setPositionUnits] = useState(0); // UNIT
  const [isCalculated, setIsCalculated] = useState(false);

  const handleCalculate = () => {
    if (balance <= 0 || riskPercent <= 0 || stopLoss <= 0) return;

    const pv = calculatePipValue(pair);
    const riskAmount = (balance * riskPercent) / 100;
    const lot = riskAmount / (stopLoss * pv);

    const contractSize = getContractSize(pair);
    const units = lot * contractSize;

    setPipValue(pv);
    setPositionSize(lot);
    setPositionUnits(units);
    setIsCalculated(true);
  };

  return (
    <>
      {/* <Header /> */}

      <main className="pt-[140px] bg-white text-[#111A4A]">
        {/* ================= SECTION 1 : PROMOSI ================= */}
        <section className="w-full pt-24 pb-28">
          <div className="max-w-7xl mx-auto grid grid-cols-12 gap-12 px-8">
            {/* LEFT PROMO */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="col-span-12 lg:col-span-7 flex flex-col justify-center"
            >
              <span className="text-xs tracking-wide uppercase text-[#156d95] font-semibold mb-4">
                Risk Management Tool
              </span>

              <h1
                className="text-[50px] font-medium leading-tight mb-6"
                style={{ fontFamily: "var(--font-figtree), Figtree" }}
              >
                Trading Lebih Aman dengan <br />
                <span className="text-[#156d95]">Position Size Calculator</span>
              </h1>

              <p className="text-lg opacity-70 mb-6 leading-relaxed">
                Bukan entry yang bikin akun kamu habis, tapi{" "}
                <b>salah ukuran lot</b>. Tool ini membantu trader mengontrol
                risiko secara profesional, konsisten, dan realistis di setiap
                posisi.
              </p>

              <ul className="text-sm opacity-70 space-y-2">
                <li>✔ Anti overlot & margin call</li>
                <li>✔ Cocok forex, gold, crypto</li>
                <li>✔ Dipakai trader serius & konsisten</li>
              </ul>

              <p className="mt-6 text-xs opacity-50">
                © PT Akademi Keuangan Nusantara
              </p>
            </motion.div>

            {/* RIGHT PROMO – PRICE & CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="col-span-12 lg:col-span-5 flex items-center"
            >
              <div className="w-full p-8 rounded-3xl border border-[#156d95]/20 bg-[#156d95]/5 shadow-sm">
                {/* DISKON BADGE */}
                <span
                  className="inline-block mb-4 px-3 py-1 rounded-full
                         bg-red-100 text-red-600 text-xs font-semibold"
                >
                  Promo Terbatas 🔥
                </span>

                {/* PRICE */}
                <p className="text-sm opacity-60 mb-1">Harga Normal</p>
                <p className="text-lg line-through opacity-50 mb-2">
                  Rp 299.000
                </p>

                <p className="text-sm opacity-60 mb-1">Harga Promo</p>
                <p className="text-4xl font-semibold text-[#156d95] mb-2">
                  Rp 149.000
                </p>

                <p className="text-xs opacity-60 mb-6">
                  Hemat 50% • Akses tool + panduan penggunaan
                </p>

                {/* CTA */}
                <a
                  href="https://wa.me/6281234567890?text=Halo%20saya%20ingin%20order%20Position%20Size%20Calculator%20harga%20promo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full
                     bg-[#156d95] text-white py-3 rounded-xl
                     font-medium text-sm
                     transition-all hover:opacity-90 hover:translate-y-[-1px]"
                >
                  Order Sekarang via WhatsApp
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ================= SECTION 2 : EDUKASI ================= */}
        <section className="w-full pb-32">
          <div className="max-w-7xl mx-auto grid grid-cols-12 gap-12 px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="col-span-12 lg:col-span-6"
            >
              {/* FUNGSI */}
              <div className="mb-10">
                <h2 className="text-2xl font-semibold mb-3">
                  Fungsi Position Size Calculator
                </h2>
                <p className="opacity-70 leading-relaxed">
                  Menghitung ukuran lot ideal berdasarkan risiko per transaksi,
                  sehingga setiap posisi memiliki risiko yang konsisten meskipun
                  jarak stop loss berbeda.
                </p>
              </div>

              {/* PROS & CONS */}
              <div className="grid sm:grid-cols-2 gap-6 mb-10">
                <div className="p-6 rounded-2xl bg-green-50 border border-green-200">
                  <h3 className="flex items-center gap-2 font-semibold text-green-700 mb-3">
                    <ShieldCheck size={18} /> Kelebihan
                  </h3>
                  <ul className="text-sm opacity-80 space-y-2">
                    <li>• Anti overlot & margin call</li>
                    <li>• Risiko konsisten</li>
                    <li>• Disiplin trading</li>
                    <li>• Semua market</li>
                  </ul>
                </div>

                <div className="p-6 rounded-2xl bg-red-50 border border-red-200">
                  <h3 className="flex items-center gap-2 font-semibold text-red-700 mb-3">
                    <AlertTriangle size={18} /> Kekurangan
                  </h3>
                  <ul className="text-sm opacity-80 space-y-2">
                    <li>• Tidak menentukan arah market</li>
                    <li>• Tetap butuh analisa</li>
                    <li>• Pip value tergantung broker</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* VIDEO */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="col-span-12 lg:col-span-6"
            >
              <h2 className="text-2xl font-semibold mb-4">
                Langkah Penggunaan Position Size Calculator
              </h2>

              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/VIDEO_ID_HERE"
                  title="Langkah Penggunaan Position Size Calculator"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ================= SECTION 3 : CALCULATOR ================= */}
        <section className="pb-32 bg-[#f4f7fb]">
          <div className="max-w-6xl mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* INPUT */}
              <motion.div className="bg-white rounded-3xl p-10 shadow-xl">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-[#156d95] text-white flex items-center justify-center">
                    <Calculator />
                  </div>
                  <h2 className="text-2xl font-semibold">
                    Position Size Calculator
                  </h2>
                </div>

                <div className="space-y-5">
                  <Select
                    label="Trading Pair"
                    value={pair}
                    options={PAIRS}
                    onChange={(v: string) => {
                      setPair(v);
                      setIsCalculated(false);
                    }}
                  />

                  <Select
                    label="Account Currency"
                    value={accountCurrency}
                    options={ACCOUNT_CURRENCIES}
                    onChange={(v: string) => {
                      setAccountCurrency(v);
                      setIsCalculated(false);
                    }}
                  />

                  <Input
                    label="Account Balance"
                    value={balance}
                    onChange={setBalance}
                  />
                  <Input
                    label="Risk per Trade (%)"
                    value={riskPercent}
                    onChange={setRiskPercent}
                  />
                  <Input
                    label="Stop Loss (Pips)"
                    value={stopLoss}
                    onChange={setStopLoss}
                  />
                </div>

                <button
                  onClick={handleCalculate}
                  className="w-full mt-8 py-3 rounded-xl bg-[#156d95] text-white"
                >
                  Hitung Position Size
                </button>
              </motion.div>

              {/* RESULT */}
              <ResultPanel
                isCalculated={isCalculated}
                positionSize={positionSize}
                positionUnits={positionUnits}
                balance={balance}
                riskPercent={riskPercent}
                pipValue={pipValue}
                currency={accountCurrency}
                pair={pair}
              />
            </div>
          </div>
        </section>
      </main>
      {/* 
      <Footer /> */}
    </>
  );
}

/* ================= INPUT ================= */
function Input({ label, value, onChange }: any) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1 opacity-80">
        {label}
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
        className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#156d95]"
      />
    </div>
  );
}

function Select({ label, value, options, onChange }: any) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1 opacity-80">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#156d95]"
      >
        {options.map((o: string) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

/* ================= RESULT ================= */
function ResultPanel({
  isCalculated,
  positionSize,
  positionUnits,
  balance,
  riskPercent,
  pipValue,
  currency,
  pair,
}: any) {
  return (
    <div className="space-y-5">
      {/* LOT */}
      <div className="rounded-2xl p-6 text-center text-white bg-gradient-to-r from-blue-500 to-purple-600">
        <p className="text-sm opacity-80">Ukuran Lot</p>
        <p className="text-3xl font-bold">
          {isCalculated ? positionSize.toFixed(3) : "0.000"}
        </p>
      </div>

      {/* POSITION SIZE */}
      <div className="rounded-2xl p-6 text-center text-white bg-gradient-to-r from-blue-500 to-purple-600">
        <p className="text-sm opacity-80">Ukuran Posisi</p>
        <p className="text-3xl font-bold">
          {isCalculated ? positionUnits.toFixed(0) : "0"}
        </p>
      </div>

      {/* RISK */}
      <div className="rounded-2xl p-6 text-center text-white bg-gradient-to-r from-blue-500 to-purple-600">
        <p className="text-sm opacity-80">Jumlah Risiko</p>
        <p className="text-3xl font-bold">
          {isCalculated
            ? `${((balance * riskPercent) / 100).toFixed(2)} ${currency}`
            : `0.00 ${currency}`}
        </p>
      </div>

      {/* INFO PANEL */}
      <div className="bg-white rounded-2xl p-6 border text-sm space-y-3">
        <div>
          <p className="font-semibold">Terdeteksi</p>
          <p className="opacity-70">{pair}</p>
        </div>

        <div>
          <p className="font-semibold">Perlu Harga?</p>
          <p className="opacity-70">
            {needPriceConversion(pair) ? "Ya" : "Tidak"}
          </p>
          <p className="text-xs opacity-50">
            Kolom harga muncul hanya saat diperlukan
          </p>
        </div>

        <div>
          <p className="font-semibold">Nilai Pip (1 lot)</p>
          <p className="opacity-70">
            {isCalculated ? `${pipValue.toFixed(2)} ${currency}` : "-"}
          </p>
        </div>

        <div>
          <p className="font-semibold">Dalam mata uang akun</p>
          <p className="opacity-70">{currency}</p>
        </div>
      </div>
    </div>
  );
}
