"use client";

import { motion } from "framer-motion";
import { ArrowRight, BookOpen, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

// ─── Data ilustrasi chart (deterministik agar render server = client) ─────────
const SL = 2333.5;
const ENTRY = 2345.5;
const TP = 2369.5;
const PRICE_MIN = 2328;
const PRICE_MAX = 2374;

// [open, high, low, close]
const CANDLES: [number, number, number, number][] = [
  [2338, 2341, 2335, 2340],
  [2340, 2342, 2336, 2337],
  [2337, 2340, 2334, 2339],
  [2339, 2344, 2338, 2343],
  [2343, 2345, 2339, 2340],
  [2340, 2343, 2337, 2342],
  [2342, 2347, 2341, 2346],
  [2346, 2349, 2343, 2344],
  [2344, 2348, 2342, 2347],
  [2347, 2353, 2346, 2352],
  [2352, 2355, 2349, 2350],
  [2350, 2357, 2349, 2356],
  [2356, 2360, 2353, 2359],
  [2359, 2362, 2355, 2357],
  [2357, 2364, 2356, 2363],
  [2363, 2367, 2360, 2366],
];
const ENTRY_INDEX = 6; // candle saat posisi dibuka

const W = 360;
const H = 210;
const PAD_R = 58; // ruang label harga di kanan
const y = (p: number) => ((PRICE_MAX - p) / (PRICE_MAX - PRICE_MIN)) * H;
const fmt = (p: number) => p.toLocaleString("en-US", { minimumFractionDigits: 2 });

function TradePlanChart({ labels }: { labels: { entry: string; sl: string; tp: string } }) {
  const plotW = W - PAD_R;
  const step = plotW / CANDLES.length;
  const bodyW = step * 0.58;
  const zoneX = ENTRY_INDEX * step + step / 2;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="Contoh trading plan XAU/USD dengan entry, stop loss dan take profit">
      {/* grid */}
      {[0.2, 0.4, 0.6, 0.8].map((r) => (
        <line key={r} x1={0} x2={plotW} y1={H * r} y2={H * r} className="stroke-slate-200 dark:stroke-white/5" strokeWidth={1} />
      ))}

      {/* zona reward (hijau) & risiko (merah) seperti tool posisi di platform trading */}
      <rect x={zoneX} y={y(TP)} width={plotW - zoneX} height={y(ENTRY) - y(TP)} fill="#22d3a8" opacity={0.12} />
      <rect x={zoneX} y={y(ENTRY)} width={plotW - zoneX} height={y(SL) - y(ENTRY)} fill="#ef4444" opacity={0.1} />

      {/* candles */}
      {CANDLES.map(([o, h, l, c], i) => {
        const up = c >= o;
        const cx = i * step + step / 2;
        const color = up ? "#16a34a" : "#ef4444";
        return (
          <g key={i}>
            <line x1={cx} x2={cx} y1={y(h)} y2={y(l)} stroke={color} strokeWidth={1.2} />
            <rect
              x={cx - bodyW / 2}
              y={y(Math.max(o, c))}
              width={bodyW}
              height={Math.max(1.5, Math.abs(y(o) - y(c)))}
              rx={1}
              fill={color}
            />
          </g>
        );
      })}

      {/* level TP / Entry / SL */}
      {[
        { p: TP, color: "#16a34a", label: labels.tp },
        { p: ENTRY, color: "#2563eb", label: labels.entry },
        { p: SL, color: "#ef4444", label: labels.sl },
      ].map(({ p, color, label }) => (
        <g key={label}>
          <line x1={zoneX} x2={plotW} y1={y(p)} y2={y(p)} stroke={color} strokeWidth={1.2} strokeDasharray="4 3" />
          <rect x={plotW + 2} y={y(p) - 9} width={PAD_R - 2} height={18} rx={4} fill={color} />
          <text x={plotW + PAD_R / 2 + 1} y={y(p) + 3.5} textAnchor="middle" fontSize={9.5} fontWeight={600} fill="#fff">
            {fmt(p)}
          </text>
          <text x={zoneX + 4} y={y(p) - 4} fontSize={9} fontWeight={600} fill={color}>
            {label}
          </text>
        </g>
      ))}

      {/* titik entry */}
      <circle cx={zoneX} cy={y(ENTRY)} r={3.5} fill="#2563eb" stroke="#fff" strokeWidth={1.5} />
    </svg>
  );
}

export const ForexPhilosophyHero = () => {
  const t = useTranslations("ForexPhilosophyHero");

  // Aturan manajemen risiko yang diajarkan, ditampilkan sebagai angka kunci
  const rules = [
    { value: "1–2%", label: t("rule1Label") },
    { value: "1 : 2", label: t("rule2Label") },
    { value: "100%", label: t("rule3Label") },
  ];

  // Konsisten dengan chart: SL $12 dari entry, 0.01 lot XAU/USD (1 oz) = risiko $12 = 1% dari $1,200;
  // TP $24 dari entry -> Risk:Reward 1:2
  const stats = [
    { label: t("balance"), value: "$1,200" },
    { label: t("riskPerTrade"), value: "1% · $12" },
    { label: t("lotSize"), value: "0.01" },
    { label: t("riskReward"), value: "1 : 2" },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-white via-[#f6fbfa] to-white dark:from-[#050508] dark:via-[#07100e] dark:to-[#050508] py-20 md:py-28 transition-colors duration-500">
      {/* Latar halus: grid tipis + glow statis */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.35] dark:opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(17,26,74,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(17,26,74,0.06) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />
      <div
        className="absolute -top-40 -right-40 w-[560px] h-[560px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(34,211,168,0.16) 0%, transparent 65%)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 md:px-12 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* ── Pesan utama (kanan di desktop, atas di mobile) ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="lg:order-2"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#111A4A] dark:text-white leading-[1.08] tracking-tight mb-5">
            {t("titlePart1")}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#167E6C] to-[#22d3a8]">
              {t("titlePart2")}
            </span>
          </h2>

          <p className="text-base md:text-lg text-[#111A4A]/70 dark:text-gray-400 leading-relaxed max-w-xl mb-8">
            {t("description")}
          </p>

          {/* Aturan risiko: strip angka kunci */}
          <dl className="grid grid-cols-3 max-w-xl mb-9 border-y border-slate-200 dark:border-white/10 divide-x divide-slate-200 dark:divide-white/10">
            {rules.map((r) => (
              <div key={r.label} className="py-4 sm:py-5 px-3 sm:px-5 first:pl-0">
                <dt className="sr-only">{r.label}</dt>
                <dd className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#111A4A] dark:text-white tabular-nums">
                  {r.value}
                </dd>
                <dd className="mt-1 text-xs sm:text-sm leading-snug text-[#111A4A]/60 dark:text-gray-400">
                  {r.label}
                </dd>
              </div>
            ))}
          </dl>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/philosophy"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#111A4A] dark:bg-[#167E6C] text-white font-semibold text-base shadow-lg shadow-[#111A4A]/15 hover:bg-[#167E6C] transition-colors"
            >
              {t("button")}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/professional-course"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-slate-300 dark:border-white/15 text-[#111A4A] dark:text-white font-semibold text-base hover:border-[#167E6C] hover:text-[#167E6C] dark:hover:text-[#22d3a8] transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              {t("secondaryButton")}
            </Link>
          </div>
        </motion.div>

        {/* ── Kartu trading plan (kiri di desktop, bawah di mobile) ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative lg:order-1"
        >
          <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0b1220] shadow-[0_24px_60px_-20px_rgba(17,26,74,0.25)] dark:shadow-black/40 overflow-hidden">
            {/* header */}
            <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-slate-100 dark:border-white/5">
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-amber-400/15 text-amber-500 font-bold text-sm">Au</span>
                <div>
                  <p className="text-sm font-semibold text-[#111A4A] dark:text-white leading-tight">XAU/USD · H1</p>
                  <p className="text-xs text-slate-500 dark:text-gray-400">{t("planTitle")}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-base font-semibold text-[#111A4A] dark:text-white tabular-nums">2,366.00</p>
                <p className="text-xs font-medium text-emerald-600 tabular-nums">+20.50 (+0.88%)</p>
              </div>
            </div>

            {/* chart */}
            <div className="px-3 pt-4 pb-2">
              <TradePlanChart labels={{ entry: t("entry"), sl: t("stopLoss"), tp: t("takeProfit") }} />
            </div>

            {/* info modal terlindungi */}
            <div className="mx-4 mb-4 flex items-center gap-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 px-3.5 py-2.5">
              <ShieldCheck className="w-5 h-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
              <p className="text-xs sm:text-sm text-emerald-900 dark:text-emerald-200">
                <span className="font-semibold">{t("capitalProtected")}</span>
                <span className="text-emerald-800/70 dark:text-emerald-200/70"> — {t("capitalProtectedDesc")}</span>
              </p>
            </div>

            {/* ringkasan position sizing */}
            <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-slate-100 dark:border-white/5">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className={`px-4 py-3.5 ${i > 0 ? "sm:border-l" : ""} ${i % 2 === 1 ? "border-l sm:border-l" : ""} ${i > 1 ? "border-t sm:border-t-0" : ""} border-slate-100 dark:border-white/5`}
                >
                  <p className="text-[10px] sm:text-[11px] uppercase tracking-wide whitespace-nowrap text-slate-500 dark:text-gray-500">{s.label}</p>
                  <p className="text-sm font-semibold text-[#111A4A] dark:text-white tabular-nums mt-0.5">{s.value}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-3 text-center text-xs text-slate-400 dark:text-gray-500">{t("disclaimer")}</p>
        </motion.div>
      </div>
    </section>
  );
};
