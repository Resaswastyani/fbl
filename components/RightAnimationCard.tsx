"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// TYPES
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
interface Candle {
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  time: number; // epoch ms
}

interface Pair {
  symbol: string;
  base: number;
  pip: number;     // decimal places for price display
  spread: number;  // in price units
  color: string;
  bullColor: string;
  bearColor: string;
  volatility: number;
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// CONSTANTS
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const PAIRS: Pair[] = [
  { symbol: "XAU/USD", base: 2318.45, pip: 2, spread: 0.35, color: "#f59e0b", bullColor: "#26a69a", bearColor: "#ef5350", volatility: 1.8 },
  { symbol: "EUR/USD", base: 1.08420, pip: 5, spread: 0.00012, color: "#22d3ee", bullColor: "#26a69a", bearColor: "#ef5350", volatility: 0.00035 },
  { symbol: "GBP/USD", base: 1.27150, pip: 5, spread: 0.00015, color: "#a78bfa", bullColor: "#26a69a", bearColor: "#ef5350", volatility: 0.00045 },
  { symbol: "USD/JPY", base: 157.320, pip: 3, spread: 0.012,   color: "#34d399", bullColor: "#26a69a", bearColor: "#ef5350", volatility: 0.025 },
  { symbol: "BTC/USD", base: 67450.0, pip: 1, spread: 8.5,     color: "#fb923c", bullColor: "#26a69a", bearColor: "#ef5350", volatility: 120 },
];

const CANDLE_COUNT   = 60;  // how many candles to show
const CHART_W        = 480;
const CHART_H        = 200;
const VOL_H          = 40;
const Y_AXIS_W       = 58;
const CANDLE_GAP     = 1;
const TIMEFRAMES     = ["1m","5m","15m","1h","4h","1D"];
const INDICATORS     = ["MA(7)","MA(25)","MA(99)"];
const MA_COLORS      = ["#f59e0b","#a78bfa","#22d3ee"];
const MA_PERIODS     = [7, 25, 99];

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// CANDLE GENERATION
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function generateCandles(pair: Pair, count: number): Candle[] {
  const candles: Candle[] = [];
  let price = pair.base;
  const now = Date.now();
  const interval = 60_000; // 1 minute per candle

  for (let i = 0; i < count; i++) {
    const v = pair.volatility;
    const open = price;
    // Random walk with slight trend
    const body  = (Math.random() - 0.49) * v * 2;
    const wick1 = Math.random() * v * 1.2;
    const wick2 = Math.random() * v * 1.2;
    const close = open + body;
    const high  = Math.max(open, close) + wick1;
    const low   = Math.min(open, close) - wick2;
    const volume = 500 + Math.random() * 4500;

    candles.push({
      open, high, low, close, volume,
      time: now - (count - i) * interval,
    });
    price = close;
  }
  return candles;
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// MOVING AVERAGE
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function calcMA(candles: Candle[], period: number): (number | null)[] {
  return candles.map((_, i) => {
    if (i < period - 1) return null;
    const slice = candles.slice(i - period + 1, i + 1);
    return slice.reduce((s, c) => s + c.close, 0) / period;
  });
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// PRICE FORMATTER
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function fmtPrice(val: number, pip: number) {
  return val.toFixed(pip);
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// CANDLESTICK CHART COMPONENT (pure SVG, Canvas-like)
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
interface ChartProps {
  candles: Candle[];
  pair: Pair;
  livePrice: number;
  crosshairX: number | null;
  onMouseMove: (x: number, y: number) => void;
  onMouseLeave: () => void;
}

function CandlestickChart({ candles, pair, livePrice, crosshairX, onMouseMove, onMouseLeave }: ChartProps) {
  const W = CHART_W - Y_AXIS_W;

  // Price range
  const highs  = candles.map(c => c.high);
  const lows   = candles.map(c => c.low);
  const maxP   = Math.max(...highs) * 1.001;
  const minP   = Math.min(...lows)  * 0.999;
  const rangeP = maxP - minP || 1;

  // Volume range
  const maxVol = Math.max(...candles.map(c => c.volume)) || 1;

  const toY    = (p: number) => ((maxP - p) / rangeP) * CHART_H;
  const toVolY = (v: number) => VOL_H - (v / maxVol) * VOL_H;

  const candleW  = Math.max(3, (W / candles.length) - CANDLE_GAP);
  const candleStep = W / candles.length;

  // Moving averages
  const mas = MA_PERIODS.map(p => calcMA(candles, p));

  // MA SVG paths
  function maPath(values: (number | null)[]) {
    let d = "";
    values.forEach((v, i) => {
      if (v === null) return;
      const x = i * candleStep + candleStep / 2;
      const y = toY(v);
      d += d === "" ? `M${x},${y}` : ` L${x},${y}`;
    });
    return d;
  }

  // Crosshair index
  const hoverIdx = crosshairX !== null
    ? Math.min(candles.length - 1, Math.max(0, Math.floor(crosshairX / candleStep)))
    : null;
  const hoverCandle = hoverIdx !== null ? candles[hoverIdx] : candles[candles.length - 1];

  // Y-axis labels (5 levels)
  const yLabels = Array.from({ length: 5 }, (_, i) => {
    const p = minP + (rangeP * (4 - i)) / 4;
    return { y: toY(p), label: fmtPrice(p, pair.pip) };
  });

  // Live price line Y
  const livePriceY = toY(livePrice);
  const liveUp = livePrice >= candles[candles.length - 1].open;

  return (
    <div style={{ position: "relative", width: CHART_W, userSelect: "none" }}>
      <svg
        width={CHART_W}
        height={CHART_H + VOL_H + 4}
        style={{ display: "block", cursor: "crosshair" }}
        onMouseMove={e => {
          const rect = (e.currentTarget as SVGSVGElement).getBoundingClientRect();
          onMouseMove(e.clientX - rect.left, e.clientY - rect.top);
        }}
        onMouseLeave={onMouseLeave}
      >
        <defs>
          {/* Grid clip */}
          <clipPath id="chartClip">
            <rect x={0} y={0} width={W} height={CHART_H + VOL_H + 4} />
          </clipPath>
          {/* Live price glow */}
          <filter id="priceGlow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* â”€â”€ Background â”€â”€ */}
        <rect x={0} y={0} width={W} height={CHART_H} fill="#131722" />
        <rect x={0} y={CHART_H + 4} width={W} height={VOL_H} fill="#0d1117" />

        {/* â”€â”€ Horizontal grid lines â”€â”€ */}
        {yLabels.map((l, i) => (
          <line key={i} x1={0} y1={l.y} x2={W} y2={l.y}
            stroke="rgba(255,255,255,0.05)" strokeWidth={1} />
        ))}
        {/* Vertical grid lines */}
        {Array.from({ length: 6 }, (_, i) => (
          <line key={i} x1={(W / 6) * i} y1={0} x2={(W / 6) * i} y2={CHART_H}
            stroke="rgba(255,255,255,0.03)" strokeWidth={1} />
        ))}

        {/* â”€â”€ Candles â”€â”€ */}
        <g clipPath="url(#chartClip)">
          {candles.map((c, i) => {
            const cx    = i * candleStep;
            const isBull = c.close >= c.open;
            const fill  = isBull ? pair.bullColor : pair.bearColor;
            const bodyTop = toY(Math.max(c.open, c.close));
            const bodyBot = toY(Math.min(c.open, c.close));
            const bodyH   = Math.max(1, bodyBot - bodyTop);
            const midX    = cx + candleStep / 2;

            return (
              <g key={i}>
                {/* Wick */}
                <line x1={midX} y1={toY(c.high)} x2={midX} y2={toY(c.low)}
                  stroke={fill} strokeWidth={1} opacity={0.8} />
                {/* Body */}
                <rect x={cx + (candleStep - candleW) / 2} y={bodyTop}
                  width={candleW} height={bodyH}
                  fill={fill}
                  opacity={hoverIdx === i ? 1 : 0.85}
                />
              </g>
            );
          })}

          {/* â”€â”€ Moving Average lines â”€â”€ */}
          {mas.map((ma, mi) => (
            <path key={mi} d={maPath(ma)} fill="none"
              stroke={MA_COLORS[mi]} strokeWidth={1} opacity={0.8}
              strokeLinejoin="round" />
          ))}

          {/* â”€â”€ Live price dashed line â”€â”€ */}
          <line x1={0} y1={livePriceY} x2={W} y2={livePriceY}
            stroke={liveUp ? pair.bullColor : pair.bearColor}
            strokeWidth={1} strokeDasharray="4 3" opacity={0.7} />

          {/* â”€â”€ Crosshair â”€â”€ */}
          {crosshairX !== null && (
            <>
              <line x1={crosshairX} y1={0} x2={crosshairX} y2={CHART_H}
                stroke="rgba(255,255,255,0.3)" strokeWidth={1} strokeDasharray="3 3" />
              <line x1={0} y1={toY(hoverCandle.close)} x2={W} y2={toY(hoverCandle.close)}
                stroke="rgba(255,255,255,0.3)" strokeWidth={1} strokeDasharray="3 3" />
              {/* Crosshair dot */}
              <circle cx={crosshairX} cy={toY(hoverCandle.close)} r={3}
                fill="#fff" opacity={0.7} />
            </>
          )}
        </g>

        {/* â”€â”€ Volume bars â”€â”€ */}
        <g>
          {candles.map((c, i) => {
            const isBull = c.close >= c.open;
            const bx = i * candleStep + (candleStep - candleW) / 2;
            const by = CHART_H + 4 + toVolY(c.volume);
            const bh = VOL_H - toVolY(c.volume);
            return (
              <rect key={i} x={bx} y={by} width={candleW} height={Math.max(1, bh)}
                fill={isBull ? pair.bullColor : pair.bearColor} opacity={0.5} />
            );
          })}
        </g>

        {/* â”€â”€ Y-axis (right panel) â”€â”€ */}
        <rect x={W} y={0} width={Y_AXIS_W} height={CHART_H + VOL_H + 4} fill="#1a1d2e" />
        <line x1={W} y1={0} x2={W} y2={CHART_H + VOL_H + 4} stroke="rgba(255,255,255,0.08)" strokeWidth={1} />

        {yLabels.map((l, i) => (
          <g key={i}>
            <line x1={W} y1={l.y} x2={W + 4} y2={l.y} stroke="rgba(255,255,255,0.2)" strokeWidth={1} />
            <text x={W + 8} y={l.y + 4} fill="rgba(255,255,255,0.45)"
              fontSize={9} fontFamily="'Roboto Mono',monospace">{l.label}</text>
          </g>
        ))}

        {/* Live price badge on Y-axis */}
        <rect x={W} y={livePriceY - 9} width={Y_AXIS_W} height={18}
          fill={liveUp ? pair.bullColor : pair.bearColor} rx={2} />
        <text x={W + Y_AXIS_W / 2} y={livePriceY + 4.5} textAnchor="middle"
          fill="#fff" fontSize={9.5} fontWeight="bold"
          fontFamily="'Roboto Mono',monospace">
          {fmtPrice(livePrice, pair.pip)}
        </text>

        {/* Crosshair Y price badge */}
        {crosshairX !== null && (
          <>
            <rect x={W} y={toY(hoverCandle.close) - 9} width={Y_AXIS_W} height={18}
              fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)" strokeWidth={1} rx={2} />
            <text x={W + Y_AXIS_W / 2} y={toY(hoverCandle.close) + 4.5} textAnchor="middle"
              fill="#fff" fontSize={9} fontFamily="'Roboto Mono',monospace">
              {fmtPrice(hoverCandle.close, pair.pip)}
            </text>
          </>
        )}
      </svg>
    </div>
  );
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// OHLC TOOLTIP BAR (like TradingView top-left)
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function OHLCBar({ candle, pair }: { candle: Candle; pair: Pair }) {
  const isBull = candle.close >= candle.open;
  const col    = isBull ? "#26a69a" : "#ef5350";
  return (
    <div style={{ display: "flex", gap: 10, fontSize: 10, fontFamily: "'Roboto Mono',monospace" }}>
      {[
        { l: "O", v: fmtPrice(candle.open,  pair.pip) },
        { l: "H", v: fmtPrice(candle.high,  pair.pip) },
        { l: "L", v: fmtPrice(candle.low,   pair.pip) },
        { l: "C", v: fmtPrice(candle.close, pair.pip) },
      ].map(({ l, v }) => (
        <span key={l} style={{ color: "rgba(255,255,255,0.4)" }}>
          {l} <span style={{ color: col }}>{v}</span>
        </span>
      ))}
      <span style={{ color: "rgba(255,255,255,0.3)" }}>
        Vol <span style={{ color: "rgba(255,255,255,0.55)" }}>{(candle.volume / 1000).toFixed(1)}K</span>
      </span>
    </div>
  );
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// BID / ASK TICKER
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function BidAsk({ price, pair }: { price: number; pair: Pair }) {
  const bid = price;
  const ask = price + pair.spread;
  const isBull = true; // simplified
  return (
    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
      <div style={{ textAlign: "center" }}>
        <p style={{ fontSize: 8, color: "#ef5350", marginBottom: 1, letterSpacing: "0.05em" }}>BID</p>
        <p style={{ fontSize: 14, fontWeight: 700, color: "#ef5350", fontFamily: "monospace" }}>
          {fmtPrice(bid, pair.pip)}
        </p>
      </div>
      <div style={{ color: "rgba(255,255,255,0.2)", fontSize: 12 }}>|</div>
      <div style={{ textAlign: "center" }}>
        <p style={{ fontSize: 8, color: "#26a69a", marginBottom: 1, letterSpacing: "0.05em" }}>ASK</p>
        <p style={{ fontSize: 14, fontWeight: 700, color: "#26a69a", fontFamily: "monospace" }}>
          {fmtPrice(ask, pair.pip)}
        </p>
      </div>
    </div>
  );
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// WATCHLIST ROW
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function WatchRow({ pair, price, pct, up, active, onClick }: {
  pair: Pair; price: number; pct: number; up: boolean; active: boolean; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        width: "100%", padding: "5px 8px", borderRadius: 6, cursor: "pointer",
        background: active ? "rgba(255,255,255,0.08)" : "transparent",
        border: active ? "1px solid rgba(255,255,255,0.12)" : "1px solid transparent",
        transition: "all 0.15s",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
        <span style={{
          width: 6, height: 6, borderRadius: "50%", background: pair.color,
          boxShadow: active ? `0 0 8px ${pair.color}` : "none", flexShrink: 0,
        }} />
        <span style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.85)",
          fontFamily: "monospace", letterSpacing: "0.04em" }}>{pair.symbol}</span>
      </div>
      <div style={{ textAlign: "right" }}>
        <AnimatePresence mode="popLayout">
          <motion.p
            key={price.toFixed(pair.pip)}
            initial={{ y: up ? 5 : -5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: up ? -5 : 5, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ fontSize: 11, fontWeight: 700, color: up ? "#26a69a" : "#ef5350",
              fontFamily: "monospace" }}
          >
            {fmtPrice(price, pair.pip)}
          </motion.p>
        </AnimatePresence>
        <p style={{ fontSize: 9, color: up ? "#26a69a" : "#ef5350", marginTop: 1 }}>
          {up ? "â–²" : "â–¼"} {Math.abs(pct).toFixed(2)}%
        </p>
      </div>
    </button>
  );
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// MAIN COMPONENT
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function RightAnimationCard() {
  const [activePairIdx, setActivePairIdx]   = useState(0);
  const [activeTimeframe, setActiveTimeframe] = useState("15m");
  const [candles, setCandles]               = useState<Candle[]>([]);
  const [livePrice, setLivePrice]           = useState(0);
  const [clock, setClock]                   = useState("");
  const [crosshairX, setCrosshairX]         = useState<number | null>(null);

  // Watchlist prices & % changes
  const [watchPrices, setWatchPrices] = useState<number[]>(PAIRS.map(p => p.base));
  const [watchPct,    setWatchPct]    = useState<number[]>(PAIRS.map(() => 0));
  const [watchUp,     setWatchUp]     = useState<boolean[]>(PAIRS.map(() => true));

  const pair = PAIRS[activePairIdx];

  // â”€â”€ Initialise candles when pair changes â”€â”€
  useEffect(() => {
    const initial = generateCandles(pair, CANDLE_COUNT);
    setCandles(initial);
    setLivePrice(initial[initial.length - 1].close);
  }, [activePairIdx, activeTimeframe]);

  // â”€â”€ Live candle update (last candle evolves, new candle appends) â”€â”€
  useEffect(() => {
    if (candles.length === 0) return;
    const id = setInterval(() => {
      setCandles(prev => {
        if (prev.length === 0) return prev;
        const last = { ...prev[prev.length - 1] };
        const delta = (Math.random() - 0.49) * pair.volatility * 0.6;
        last.close = parseFloat((last.close + delta).toFixed(pair.pip));
        last.high  = Math.max(last.high, last.close);
        last.low   = Math.min(last.low,  last.close);
        last.volume += Math.random() * 80;

        // every ~15 ticks add a new candle
        const newPrev = [...prev.slice(0, -1), last];
        setLivePrice(last.close);
        return newPrev;
      });
    }, 400);
    return () => clearInterval(id);
  }, [candles.length, pair]);

  // Occasionally append a new candle
  useEffect(() => {
    const id = setInterval(() => {
      setCandles(prev => {
        if (prev.length === 0) return prev;
        const last = prev[prev.length - 1];
        const newCandle: Candle = {
          open: last.close,
          high: last.close,
          low:  last.close,
          close: last.close,
          volume: 100 + Math.random() * 400,
          time: Date.now(),
        };
        return [...prev.slice(1), newCandle]; // slide window
      });
    }, 8000);
    return () => clearInterval(id);
  }, []);

  // â”€â”€ Watchlist live prices â”€â”€
  useEffect(() => {
    const id = setInterval(() => {
      setWatchPrices(prev => prev.map((p, i) => {
        const pa = PAIRS[i];
        const delta = (Math.random() - 0.49) * pa.volatility * 0.4;
        return parseFloat((p + delta).toFixed(pa.pip));
      }));
      setWatchPrices(prev => {
        setWatchPct(prev.map((p, i) => ((p - PAIRS[i].base) / PAIRS[i].base) * 100));
        setWatchUp(prev.map((p, i) => p >= PAIRS[i].base));
        return prev;
      });
    }, 700);
    return () => clearInterval(id);
  }, []);

  // â”€â”€ Clock â”€â”€
  useEffect(() => {
    const tick = () => setClock(new Date().toLocaleTimeString("en-GB", {
      hour: "2-digit", minute: "2-digit", second: "2-digit",
    }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // â”€â”€ Auto-rotate pair â”€â”€
  useEffect(() => {
    const id = setInterval(() => setActivePairIdx(p => (p + 1) % PAIRS.length), 5000);
    return () => clearInterval(id);
  }, []);

  const hoverCandle = crosshairX !== null
    ? candles[Math.min(candles.length - 1, Math.max(0, Math.floor(crosshairX / ((CHART_W - Y_AXIS_W) / candles.length))))]
    : candles[candles.length - 1];

  const liveUp = livePrice >= (candles[0]?.open ?? livePrice);
  const pctChange = candles.length
    ? ((livePrice - candles[0].open) / candles[0].open) * 100
    : 0;

  return (
    <div style={{ position: "relative", fontFamily: "'Inter',sans-serif" }}>

      {/* â”€â”€ Ambient glow blobs â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div style={{
        position: "absolute", width: 250, height: 250, borderRadius: "50%",
        background: "radial-gradient(circle,rgba(99,102,241,0.15) 0%,transparent 65%)",
        top: "-10%", right: "-20%", pointerEvents: "none", zIndex: -1,
      }} />
      <div style={{
        position: "absolute", width: 180, height: 180, borderRadius: "50%",
        background: `radial-gradient(circle,${pair.color}20 0%,transparent 70%)`,
        bottom: "10%", left: "-10%", pointerEvents: "none", zIndex: -1,
        transition: "background 0.5s",
      }} />

      {/* â”€â”€ Main terminal window â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, type: "spring", damping: 18 }}
        style={{
          background: "#131722",
          borderRadius: 14,
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)",
          overflow: "hidden",
        }}
      >
        {/* â”€â”€ Title bar â”€â”€ */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "8px 14px",
          background: "#1a1d2e",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ display: "flex", gap: 5 }}>
              {["#ff5f57","#ffbd2e","#28ca41"].map(c => (
                <div key={c} style={{ width: 9, height: 9, borderRadius: "50%", background: c }} />
              ))}
            </div>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)",
              fontFamily: "monospace", letterSpacing: "0.05em" }}>
              FBL Â· Trading Terminal
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 9, color: "rgba(255,255,255,0.2)", fontFamily: "monospace" }}>
              {clock} WIB
            </span>
            <span style={{
              fontSize: 8, color: "#26a69a", background: "rgba(38,166,154,0.12)",
              border: "1px solid rgba(38,166,154,0.3)", borderRadius: 3,
              padding: "2px 7px", fontFamily: "monospace",
            }}>â— LIVE</span>
          </div>
        </div>

        {/* â”€â”€ Toolbar (pair selector + timeframe) â”€â”€ */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "6px 12px",
          background: "#1a1d2e",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
          gap: 10,
        }}>
          {/* Pair tabs */}
          <div style={{ display: "flex", gap: 3, overflowX: "auto" }}>
            {PAIRS.map((p, i) => (
              <button key={p.symbol} onClick={() => setActivePairIdx(i)} style={{
                padding: "3px 8px", borderRadius: 5, cursor: "pointer", fontFamily: "monospace",
                fontSize: 9.5, fontWeight: 700, whiteSpace: "nowrap",
                border: `1px solid ${i === activePairIdx ? p.color : "rgba(255,255,255,0.08)"}`,
                background: i === activePairIdx ? `${p.color}18` : "transparent",
                color: i === activePairIdx ? p.color : "rgba(255,255,255,0.3)",
                transition: "all 0.2s",
              }}>{p.symbol}</button>
            ))}
          </div>

          {/* Timeframe selector */}
          <div style={{ display: "flex", gap: 1, flexShrink: 0 }}>
            {TIMEFRAMES.map(tf => (
              <button key={tf} onClick={() => setActiveTimeframe(tf)} style={{
                padding: "2px 6px", borderRadius: 4, cursor: "pointer",
                fontSize: 9, fontFamily: "monospace",
                color: activeTimeframe === tf ? "#131722" : "rgba(255,255,255,0.3)",
                background: activeTimeframe === tf ? "#4c9be8" : "transparent",
                border: "none", fontWeight: activeTimeframe === tf ? 700 : 400,
                transition: "all 0.15s",
              }}>{tf}</button>
            ))}
          </div>
        </div>

        {/* â”€â”€ Chart body â”€â”€ */}
        <div style={{ display: "flex" }}>
          {/* Main chart area */}
          <div style={{ flex: 1, minWidth: 0, position: "relative" }}>

            {/* OHLC info bar */}
            <div style={{
              position: "absolute", top: 8, left: 10, zIndex: 5,
              display: "flex", flexDirection: "column", gap: 3,
            }}>
              {/* Symbol + price */}
              <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 800, color: pair.color,
                  fontFamily: "monospace" }}>{pair.symbol}</span>
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={livePrice.toFixed(pair.pip)}
                    initial={{ y: liveUp ? 6 : -6, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: liveUp ? -6 : 6, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ fontSize: 18, fontWeight: 800,
                      color: liveUp ? "#26a69a" : "#ef5350", fontFamily: "monospace" }}
                  >
                    {fmtPrice(livePrice, pair.pip)}
                  </motion.span>
                </AnimatePresence>
                <span style={{ fontSize: 10, color: liveUp ? "#26a69a" : "#ef5350",
                  fontFamily: "monospace" }}>
                  {liveUp ? "â–²" : "â–¼"}{Math.abs(pctChange).toFixed(2)}%
                </span>
              </div>
              {/* OHLCV */}
              {hoverCandle && <OHLCBar candle={hoverCandle} pair={pair} />}
              {/* MA Legend */}
              <div style={{ display: "flex", gap: 8, marginTop: 2 }}>
                {INDICATORS.map((ind, i) => (
                  <span key={ind} style={{ fontSize: 8.5, color: MA_COLORS[i],
                    fontFamily: "monospace", opacity: 0.85 }}>{ind}</span>
                ))}
              </div>
            </div>

            {/* The candlestick SVG */}
            {candles.length > 0 && (
              <CandlestickChart
                candles={candles}
                pair={pair}
                livePrice={livePrice}
                crosshairX={crosshairX}
                onMouseMove={(x) => setCrosshairX(x)}
                onMouseLeave={() => setCrosshairX(null)}
              />
            )}

            {/* X-axis timestamps */}
            <div style={{
              display: "flex", justifyContent: "space-between",
              padding: "2px 10px 4px",
              background: "#131722",
            }}>
              {Array.from({ length: 6 }, (_, i) => {
                const idx = Math.floor((i / 5) * (candles.length - 1));
                const c = candles[idx];
                if (!c) return null;
                const d = new Date(c.time);
                return (
                  <span key={i} style={{ fontSize: 8, color: "rgba(255,255,255,0.2)",
                    fontFamily: "monospace" }}>
                    {d.getHours().toString().padStart(2,"0")}:{d.getMinutes().toString().padStart(2,"0")}
                  </span>
                );
              })}
            </div>
          </div>

          {/* â”€â”€ Right panel: Watchlist â”€â”€ */}
          <div style={{
            width: 130, flexShrink: 0,
            background: "#1a1d2e",
            borderLeft: "1px solid rgba(255,255,255,0.05)",
            display: "flex", flexDirection: "column",
          }}>
            <div style={{ padding: "6px 8px 3px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <p style={{ fontSize: 8, color: "rgba(255,255,255,0.3)",
                textTransform: "uppercase", letterSpacing: "0.1em" }}>Watchlist</p>
            </div>
            <div style={{ padding: "4px 4px", display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
              {PAIRS.map((p, i) => (
                <WatchRow
                  key={p.symbol}
                  pair={p}
                  price={watchPrices[i]}
                  pct={watchPct[i]}
                  up={watchUp[i]}
                  active={i === activePairIdx}
                  onClick={() => setActivePairIdx(i)}
                />
              ))}
            </div>

            {/* Bid/Ask */}
            <div style={{
              padding: "8px 8px 6px",
              borderTop: "1px solid rgba(255,255,255,0.05)",
              background: "#131722",
            }}>
              <p style={{ fontSize: 7.5, color: "rgba(255,255,255,0.25)",
                marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                {pair.symbol} Spread
              </p>
              <BidAsk price={livePrice} pair={pair} />
              <p style={{ fontSize: 7.5, color: "rgba(255,255,255,0.2)", marginTop: 4,
                fontFamily: "monospace" }}>
                Spread: {fmtPrice(pair.spread, pair.pip)}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* â”€â”€ Monitor stand â”€â”€ */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ width: 52, height: 13, background: "linear-gradient(180deg,#1e293b,#0f172a)",
          borderRadius: "0 0 4px 4px" }} />
        <div style={{ width: 120, height: 7,
          background: "linear-gradient(90deg,#0f172a 0%,#1e293b 50%,#0f172a 100%)",
          borderRadius: "0 0 10px 10px" }} />
      </div>

      {/* â”€â”€ Floating stat badges â”€â”€ */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, type: "spring" }}
        style={{
          position: "absolute", left: -12, top: 50, zIndex: 10,
          background: "rgba(10,15,30,0.9)", backdropFilter: "blur(14px)",
          border: "1px solid rgba(38,166,154,0.35)", borderRadius: 10,
          padding: "8px 12px", minWidth: 100,
          boxShadow: "0 4px 20px rgba(38,166,154,0.15)",
        }}>
        <p style={{ fontSize: 8, color: "rgba(255,255,255,0.35)", marginBottom: 3,
          textTransform: "uppercase", letterSpacing: "0.08em" }}>Win Rate</p>
        <p style={{ fontSize: 18, fontWeight: 800, color: "#26a69a",
          fontFamily: "monospace", lineHeight: 1 }}>73.4%</p>
        <p style={{ fontSize: 8, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>30-day avg</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.0, type: "spring" }}
        style={{
          position: "absolute", right: -12, top: 80, zIndex: 10,
          background: "rgba(10,15,30,0.9)", backdropFilter: "blur(14px)",
          border: "1px solid rgba(245,158,11,0.35)", borderRadius: 10,
          padding: "8px 12px", minWidth: 100,
          boxShadow: "0 4px 20px rgba(245,158,11,0.12)",
        }}>
        <p style={{ fontSize: 8, color: "rgba(255,255,255,0.35)", marginBottom: 3,
          textTransform: "uppercase", letterSpacing: "0.08em" }}>Total Profit</p>
        <p style={{ fontSize: 18, fontWeight: 800, color: "#f59e0b",
          fontFamily: "monospace", lineHeight: 1 }}>+$4,820</p>
        <p style={{ fontSize: 8, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>This month</p>
      </motion.div>
    </div>
  );
}
