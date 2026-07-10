"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ---------------------------------------------------------------------------
// Data & helpers
// ---------------------------------------------------------------------------
const PAIRS = [
  { symbol: "XAU/USD", base: 2318.45, color: "#f59e0b", dir: 1 },
  { symbol: "EUR/USD", base: 1.0842,  color: "#22d3ee", dir: -1 },
  { symbol: "GBP/USD", base: 1.2715,  color: "#a78bfa", dir: 1 },
  { symbol: "USD/JPY", base: 157.32,  color: "#34d399", dir: -1 },
  { symbol: "BTC/USD", base: 67450.0, color: "#fb923c", dir: 1 },
];

const CHART_WIDTH  = 340;
const CHART_HEIGHT = 130;
const NUM_POINTS   = 42;

function generatePath(seed: number, dir: number) {
  const pts: [number, number][] = [];
  let y = CHART_HEIGHT * 0.55;
  for (let i = 0; i < NUM_POINTS; i++) {
    const noise =
      Math.sin(i * 0.55 + seed) * 16 +
      Math.cos(i * 0.3 + seed * 1.7) * 11;
    y = Math.max(10, Math.min(CHART_HEIGHT - 10, y + noise * 0.35 * dir));
    pts.push([(i / (NUM_POINTS - 1)) * CHART_WIDTH, y]);
  }
  return pts;
}

function pointsToPath(pts: [number, number][]) {
  if (!pts.length) return "";
  return pts
    .map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`))
    .join(" ");
}

function pointsToArea(pts: [number, number][]) {
  if (!pts.length) return "";
  return `${pointsToPath(pts)} L${CHART_WIDTH},${CHART_HEIGHT} L0,${CHART_HEIGHT} Z`;
}

// ---------------------------------------------------------------------------
// LiveChart
// ---------------------------------------------------------------------------
function LiveChart({ color, seed, dir }: { color: string; seed: number; dir: number }) {
  const [offset, setOffset] = useState(0);
  const rafRef = useRef<number>();

  useEffect(() => {
    let t = 0;
    const animate = () => {
      t += 0.012;
      setOffset(t);
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current!);
  }, []);

  const pts = generatePath(seed + offset, dir);
  const last = pts[pts.length - 1];
  const gradId = `grad-${seed}`;
  const glowId = `glow-${seed}`;

  return (
    <svg width={CHART_WIDTH} height={CHART_HEIGHT}
      viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
      className="overflow-visible w-full">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
        <filter id={glowId}>
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
          <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {[0.25, 0.5, 0.75].map((f) => (
        <line key={f} x1={0} y1={CHART_HEIGHT * f} x2={CHART_WIDTH} y2={CHART_HEIGHT * f}
          stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
      ))}

      <path d={pointsToArea(pts)} fill={`url(#${gradId})`} />
      <path d={pointsToPath(pts)} fill="none" stroke={color} strokeWidth="2"
        strokeLinecap="round" filter={`url(#${glowId})`} />

      {last && (
        <>
          <circle cx={last[0]} cy={last[1]} r="6" fill={color} opacity="0.2" />
          <circle cx={last[0]} cy={last[1]} r="3" fill={color} filter={`url(#${glowId})`} />
        </>
      )}
    </svg>
  );
}

// ---------------------------------------------------------------------------
// TickerRow
// ---------------------------------------------------------------------------
function TickerRow({ symbol, base, color, dir, delay }: {
  symbol: string; base: number; color: string; dir: number; delay: number;
}) {
  const [price, setPrice] = useState(base);
  const [pct, setPct]     = useState(0);
  const [up, setUp]       = useState(true);
  const prev = useRef(base);

  useEffect(() => {
    const id = setInterval(() => {
      const delta = (Math.random() - 0.48) * (base * 0.0008) * dir;
      const next = parseFloat((prev.current + delta).toFixed(
        base > 1000 ? 2 : base > 10 ? 4 : 5
      ));
      setUp(next >= prev.current);
      setPct(((next - base) / base) * 100);
      prev.current = next;
      setPrice(next);
    }, 900 + delay * 220);
    return () => clearInterval(id);
  }, [base, dir, delay]);

  const fmt =
    base > 1000 ? price.toFixed(2) :
    base > 10   ? price.toFixed(4) :
                  price.toFixed(5);

  const miniPoints = Array.from({ length: 8 }, (_, i) => {
    const jitter = Math.sin(i * 1.3 + delay + price * 0.001) * 7;
    return `${i * 7},${11 + jitter}`;
  }).join(" ");

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 + delay * 0.1, duration: 0.4 }}
      style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "7px 10px", borderRadius: 8,
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 7, minWidth: 80 }}>
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: color,
          boxShadow: `0 0 6px ${color}`, flexShrink: 0 }} />
        <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.8)",
          letterSpacing: "0.06em" }}>{symbol}</span>
      </div>

      <svg width="50" height="22" viewBox="0 0 50 22" style={{ flexShrink: 0 }}>
        <polyline points={miniPoints} fill="none" stroke={color}
          strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
      </svg>

      <div style={{ textAlign: "right" }}>
        <AnimatePresence mode="popLayout">
          <motion.p key={fmt}
            initial={{ y: up ? 6 : -6, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: up ? -6 : 6, opacity: 0 }}
            transition={{ duration: 0.22 }}
            style={{ fontSize: 12, fontWeight: 700, fontFamily: "monospace",
              color: up ? "#34d399" : "#f87171" }}
          >{fmt}</motion.p>
        </AnimatePresence>
        <p style={{ fontSize: 9, fontFamily: "monospace",
          color: up ? "#34d399" : "#f87171", marginTop: 1 }}>
          {up ? "▲" : "▼"} {Math.abs(pct).toFixed(2)}%
        </p>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// FloatingBadge
// ---------------------------------------------------------------------------
function FloatingBadge({ label, value, sub, color, style }: {
  label: string; value: string; sub: string; color: string;
  style?: React.CSSProperties;
}) {
  return (
    <div style={{
      position: "absolute",
      background: "rgba(10,18,40,0.88)",
      backdropFilter: "blur(14px)",
      border: `1px solid ${color}44`,
      borderRadius: 12, padding: "8px 14px", minWidth: 105,
      boxShadow: `0 4px 24px ${color}22`,
      zIndex: 10,
      ...style,
    }}>
      <p style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", textTransform: "uppercase",
        letterSpacing: "0.08em", marginBottom: 3 }}>{label}</p>
      <p style={{ fontSize: 15, fontWeight: 700, color, fontFamily: "monospace",
        lineHeight: 1 }}>{value}</p>
      {sub && <p style={{ fontSize: 9, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>{sub}</p>}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------
export default function RightAnimationCard() {
  const [activePair, setActivePair] = useState(0);
  const [clock, setClock] = useState("");

  useEffect(() => {
    const id = setInterval(() => setActivePair((p) => (p + 1) % PAIRS.length), 4000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const tick = () =>
      setClock(new Date().toLocaleTimeString("en-GB", {
        hour: "2-digit", minute: "2-digit", second: "2-digit",
      }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const pair = PAIRS[activePair];

  return (
    <div style={{ position: "relative", width: "100%", fontFamily: "'Inter',sans-serif" }}>

      {/* ── Ambient glows ─────────────────────────────────────────────── */}
      <div style={{
        position: "absolute", width: 200, height: 200,
        background: "radial-gradient(circle,rgba(99,102,241,0.18) 0%,transparent 70%)",
        top: "5%", right: "-15%", borderRadius: "50%", pointerEvents: "none", zIndex: -1,
      }} />
      <div style={{
        position: "absolute", width: 160, height: 160,
        background: "radial-gradient(circle,rgba(245,158,11,0.13) 0%,transparent 70%)",
        bottom: "15%", left: "-12%", borderRadius: "50%", pointerEvents: "none", zIndex: -1,
      }} />

      {/* ── Floating badges ───────────────────────────────────────────── */}
      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.5, type: "spring" }}>
        <FloatingBadge label="XAU/USD" value="2,318.45" sub="▲ +0.72% today"
          color="#f59e0b" style={{ left: -16, top: 36 }} />
      </motion.div>
      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.5, type: "spring" }}>
        <FloatingBadge label="Win Rate" value="73.4%" sub="Last 30 trades"
          color="#22d3ee" style={{ left: -16, top: 168 }} />
      </motion.div>
      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.0, duration: 0.5, type: "spring" }}>
        <FloatingBadge label="Profit" value="+$4,820" sub="This month"
          color="#34d399" style={{ right: -16, top: 90 }} />
      </motion.div>

      {/* ── Monitor shell ─────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, type: "spring" }}
        style={{
          background: "linear-gradient(135deg,#0f1629 0%,#1a2744 55%,#0d1f3c 100%)",
          borderRadius: 18,
          border: "1.5px solid rgba(99,179,237,0.2)",
          boxShadow: "0 24px 80px rgba(0,0,80,0.5),inset 0 1px 0 rgba(255,255,255,0.08)",
          overflow: "hidden", position: "relative",
        }}
      >
        {/* scanline */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
          backgroundImage:
            "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.03) 2px,rgba(0,0,0,0.03) 4px)",
        }} />

        {/* ── Top bar ── */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "9px 14px",
          background: "rgba(0,0,0,0.3)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ display: "flex", gap: 5 }}>
              {["#ff5f57","#ffbd2e","#28ca41"].map((c) => (
                <div key={c} style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />
              ))}
            </div>
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", fontFamily: "monospace" }}>
              FBL Trading Terminal v2.1
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 9, color: "rgba(255,255,255,0.22)", fontFamily: "monospace" }}>
              {clock} GMT+7
            </span>
            <span style={{
              fontSize: 8, color: "#34d399",
              background: "rgba(52,211,153,0.12)",
              border: "1px solid rgba(52,211,153,0.3)",
              borderRadius: 4, padding: "2px 6px", fontFamily: "monospace",
            }}>● LIVE</span>
          </div>
        </div>

        {/* ── Body ── */}
        <div style={{ padding: "12px 14px", position: "relative", zIndex: 2 }}>

          {/* Chart header */}
          <div style={{ display: "flex", justifyContent: "space-between",
            alignItems: "center", marginBottom: 8 }}>
            <div style={{ display: "flex", gap: 5 }}>
              {PAIRS.map((p, i) => (
                <button key={p.symbol} onClick={() => setActivePair(i)} style={{
                  fontSize: 9, padding: "3px 7px", borderRadius: 5,
                  border: `1px solid ${i === activePair ? p.color : "rgba(255,255,255,0.1)"}`,
                  background: i === activePair ? `${p.color}22` : "transparent",
                  color: i === activePair ? p.color : "rgba(255,255,255,0.3)",
                  cursor: "pointer", fontFamily: "monospace", fontWeight: 700,
                  transition: "all 0.2s",
                }}>{p.symbol}</button>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {["M5","M15","H1","H4"].map((tf, i) => (
                <span key={tf} style={{
                  fontSize: 9, fontFamily: "monospace", cursor: "pointer",
                  color: i === 2 ? "#22d3ee" : "rgba(255,255,255,0.25)",
                  borderBottom: i === 2 ? "1px solid #22d3ee" : "none",
                  paddingBottom: 1,
                }}>{tf}</span>
              ))}
            </div>
          </div>

          {/* Chart */}
          <div style={{ position: "relative", marginBottom: 4 }}>
            <AnimatePresence mode="wait">
              <motion.div key={activePair}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}>
                <LiveChart color={pair.color} seed={activePair * 7.3} dir={pair.dir} />
              </motion.div>
            </AnimatePresence>
            {/* Y-axis */}
            <div style={{
              position: "absolute", right: 4, top: 0, bottom: 0,
              display: "flex", flexDirection: "column",
              justifyContent: "space-between", pointerEvents: "none",
            }}>
              {["H","M","L"].map((l) => (
                <span key={l} style={{ fontSize: 8, color: "rgba(255,255,255,0.2)",
                  fontFamily: "monospace" }}>{l}</span>
              ))}
            </div>
          </div>

          {/* Volume bars */}
          <div style={{ display: "flex", gap: 2, height: 18, alignItems: "flex-end", marginBottom: 10 }}>
            {Array.from({ length: 40 }, (_, i) => (
              <div key={i} style={{
                flex: 1,
                height: `${20 + Math.abs(Math.sin(i * 0.7 + activePair)) * 80}%`,
                background: i % 3 === 0 ? `${pair.color}60` : "rgba(255,255,255,0.07)",
                borderRadius: 1, transition: "height 0.4s",
              }} />
            ))}
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "4px 0 8px" }} />

          {/* Ticker rows */}
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {PAIRS.map((p, i) => (
              <TickerRow key={p.symbol} {...p} delay={i} />
            ))}
          </div>

          {/* Status bar */}
          <div style={{
            marginTop: 10, padding: "6px 10px",
            background: "rgba(0,0,0,0.25)", borderRadius: 8,
            display: "flex", justifyContent: "space-between", alignItems: "center",
            border: "1px solid rgba(255,255,255,0.05)",
          }}>
            {[
              { l: "Spread", v: "0.8 pips" },
              { l: "Margin", v: "2.5%" },
              { l: "Session", v: "London / NY" },
            ].map(({ l, v }) => (
              <div key={l} style={{ textAlign: "center" }}>
                <p style={{ fontSize: 8, color: "rgba(255,255,255,0.28)", marginBottom: 2 }}>{l}</p>
                <p style={{ fontSize: 10, color: "rgba(255,255,255,0.7)",
                  fontFamily: "monospace", fontWeight: 700 }}>{v}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Monitor stand ─────────────────────────────────────────────── */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ width: 50, height: 14,
          background: "linear-gradient(180deg,#1e293b,#0f172a)", borderRadius: "0 0 4px 4px" }} />
        <div style={{ width: 110, height: 7,
          background: "linear-gradient(90deg,#0f172a,#1e293b,#0f172a)",
          borderRadius: "0 0 8px 8px" }} />
      </div>
    </div>
  );
}
