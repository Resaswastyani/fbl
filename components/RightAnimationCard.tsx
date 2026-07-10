"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// ─────────────────────────────────────────────────────────────────────────────
// TYPES & CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────
interface Candle {
  open: number; high: number; low: number; close: number; volume: number; time: number;
}
interface Pair {
  symbol: string; pip: number; bullColor: string; bearColor: string; volatility: number;
}

const PAIR: Pair = { symbol: "ETH/USDC", pip: 2, bullColor: "#26a69a", bearColor: "#2196f3", volatility: 45 };
const CANDLE_COUNT = 60;
const CHART_W = 450;
const CHART_H = 220;
const VOL_H = 40;
const Y_AXIS_W = 50;
const CANDLE_GAP = 1;
const MA_COLORS = ["#f59e0b", "#a78bfa", "#22d3ee"];
const MA_PERIODS = [7, 25, 99];

const TRADE_ACTIVITY = [
  { type: "Short", price: 6243.00, time: "19:34:13" },
  { type: "Long", price: 6291.00, time: "19:34:13" },
  { type: "Long", price: 8328.00, time: "19:34:13" },
  { type: "Short", price: 5797.00, time: "19:34:13" },
  { type: "Long", price: 6255.00, time: "19:34:13" },
  { type: "Short", price: 8017.00, time: "19:34:13" },
  { type: "Long", price: 1852.00, time: "19:34:13" },
  { type: "Short", price: 5319.00, time: "19:34:13" },
  { type: "Long", price: 1028.00, time: "19:34:13" },
  { type: "Long", price: 2097.00, time: "19:34:13" },
];

const COINS = [
  { name: "Bitcoin", symbol: "BTC", price: 67450, change: 2.4, color: "#f7931a" },
  { name: "Ethereum", symbol: "ETH", price: 3450, change: 1.2, color: "#627eea" },
  { name: "Ripple", symbol: "XRP", price: 0.52, change: -0.8, color: "#23292f" },
  { name: "Cardano", symbol: "ADA", price: 0.45, change: 5.6, color: "#0033ad" },
  { name: "Solana", symbol: "SOL", price: 145, change: -2.1, color: "#14f195" },
  { name: "Dogecoin", symbol: "DOGE", price: 0.12, change: 10.2, color: "#c2a633" },
  { name: "Polkadot", symbol: "DOT", price: 6.8, change: 0.4, color: "#e6007a" },
  { name: "Litecoin", symbol: "LTC", price: 82.3, change: 1.5, color: "#345d9d" },
];

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────
function generateCandles(count: number): Candle[] {
  const candles: Candle[] = [];
  let price = 41400.00;
  const now = Date.now();
  for (let i = 0; i < count; i++) {
    const body = (Math.random() - 0.48) * 80;
    const open = price;
    const close = open + body;
    const high = Math.max(open, close) + Math.random() * 40;
    const low = Math.min(open, close) - Math.random() * 40;
    candles.push({ open, high, low, close, volume: 500 + Math.random() * 4500, time: now - (count - i) * 60000 });
    price = close;
  }
  return candles;
}

function calcMA(candles: Candle[], period: number): (number | null)[] {
  return candles.map((_, i) => {
    if (i < period - 1) return null;
    const slice = candles.slice(i - period + 1, i + 1);
    return slice.reduce((s, c) => s + c.close, 0) / period;
  });
}

function fmtPrice(val: number, pip: number) {
  return val.toFixed(pip);
}

// ─────────────────────────────────────────────────────────────────────────────
// SVG CHART COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
function CandlestickChart({ candles, pair, livePrice, crosshairX, onMouseMove, onMouseLeave }: any) {
  const W = CHART_W - Y_AXIS_W;
  const highs = candles.map((c: Candle) => c.high);
  const lows = candles.map((c: Candle) => c.low);
  const maxP = Math.max(...highs) * 1.001;
  const minP = Math.min(...lows) * 0.999;
  const rangeP = maxP - minP || 1;
  const maxVol = Math.max(...candles.map((c: Candle) => c.volume)) || 1;

  const toY = (p: number) => ((maxP - p) / rangeP) * CHART_H;
  const toVolY = (v: number) => VOL_H - (v / maxVol) * VOL_H;

  const candleW = Math.max(3, (W / candles.length) - CANDLE_GAP);
  const candleStep = W / candles.length;
  const mas = MA_PERIODS.map(p => calcMA(candles, p));

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

  const hoverIdx = crosshairX !== null
    ? Math.min(candles.length - 1, Math.max(0, Math.floor(crosshairX / candleStep)))
    : null;
  const hoverCandle = hoverIdx !== null ? candles[hoverIdx] : candles[candles.length - 1];

  const yLabels = Array.from({ length: 5 }, (_, i) => {
    const p = minP + (rangeP * (4 - i)) / 4;
    return { y: toY(p), label: fmtPrice(p, pair.pip) };
  });

  const livePriceY = toY(livePrice);
  const liveUp = livePrice >= candles[candles.length - 1].open;

  return (
    <div style={{ position: "relative", width: "100%", maxWidth: CHART_W, aspectRatio: `${CHART_W} / ${CHART_H + VOL_H + 4}`, userSelect: "none" }}>
      <svg
        width="100%" height="100%" viewBox={`0 0 ${CHART_W} ${CHART_H + VOL_H + 4}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ display: "block", cursor: "crosshair" }}
        onMouseMove={e => {
          const rect = (e.currentTarget as SVGSVGElement).getBoundingClientRect();
          // Scale mouse X coordinates relative to the actual rendered SVG size vs viewBox
          const scaleX = CHART_W / rect.width;
          onMouseMove((e.clientX - rect.left) * scaleX);
        }}
        onMouseLeave={onMouseLeave}
      >
        <defs>
          <clipPath id="chartClip"><rect x={0} y={0} width={W} height={CHART_H + VOL_H + 4} /></clipPath>
        </defs>
        
        {/* Grids */}
        {yLabels.map((l, i) => (
          <line key={i} x1={0} y1={l.y} x2={W} y2={l.y} stroke="rgba(255,255,255,0.05)" strokeWidth={1} />
        ))}
        {Array.from({ length: 6 }, (_, i) => (
          <line key={i} x1={(W / 6) * i} y1={0} x2={(W / 6) * i} y2={CHART_H} stroke="rgba(255,255,255,0.03)" strokeWidth={1} />
        ))}

        <g clipPath="url(#chartClip)">
          {candles.map((c: Candle, i: number) => {
            const cx = i * candleStep;
            const isBull = c.close >= c.open;
            const fill = isBull ? pair.bullColor : pair.bearColor;
            const bodyTop = toY(Math.max(c.open, c.close));
            const bodyBot = toY(Math.min(c.open, c.close));
            const bodyH = Math.max(1, bodyBot - bodyTop);
            const midX = cx + candleStep / 2;
            return (
              <g key={i}>
                <line x1={midX} y1={toY(c.high)} x2={midX} y2={toY(c.low)} stroke={fill} strokeWidth={1} opacity={0.8} />
                <rect x={cx + (candleStep - candleW) / 2} y={bodyTop} width={candleW} height={bodyH} fill={fill} opacity={hoverIdx === i ? 1 : 0.85} />
              </g>
            );
          })}
          {mas.map((ma, mi) => (
            <path key={mi} d={maPath(ma)} fill="none" stroke={MA_COLORS[mi]} strokeWidth={1} opacity={0.8} strokeLinejoin="round" />
          ))}
          <line x1={0} y1={livePriceY} x2={W} y2={livePriceY} stroke={liveUp ? pair.bullColor : pair.bearColor} strokeWidth={1} strokeDasharray="4 3" opacity={0.7} />
          {crosshairX !== null && (
            <>
              <line x1={crosshairX} y1={0} x2={crosshairX} y2={CHART_H} stroke="rgba(255,255,255,0.3)" strokeWidth={1} strokeDasharray="3 3" />
              <line x1={0} y1={toY(hoverCandle.close)} x2={W} y2={toY(hoverCandle.close)} stroke="rgba(255,255,255,0.3)" strokeWidth={1} strokeDasharray="3 3" />
              <circle cx={crosshairX} cy={toY(hoverCandle.close)} r={3} fill="#fff" opacity={0.7} />
            </>
          )}
        </g>
        
        {/* Volumes */}
        <g>
          {candles.map((c: Candle, i: number) => {
            const isBull = c.close >= c.open;
            const bx = i * candleStep + (candleStep - candleW) / 2;
            const by = CHART_H + 4 + toVolY(c.volume);
            const bh = VOL_H - toVolY(c.volume);
            return <rect key={i} x={bx} y={by} width={candleW} height={Math.max(1, bh)} fill={isBull ? pair.bullColor : pair.bearColor} opacity={0.5} />;
          })}
        </g>

        {/* Y Axis */}
        <rect x={W} y={0} width={Y_AXIS_W} height={CHART_H + VOL_H + 4} fill="transparent" />
        <line x1={W} y1={0} x2={W} y2={CHART_H + VOL_H + 4} stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
        {yLabels.map((l, i) => (
          <text key={i} x={W + 6} y={l.y + 3} fill="rgba(255,255,255,0.4)" fontSize={8} fontFamily="monospace">{l.label}</text>
        ))}
        
        {/* Live Badge */}
        <rect x={W} y={livePriceY - 8} width={Y_AXIS_W} height={16} fill={liveUp ? pair.bullColor : pair.bearColor} rx={2} />
        <text x={W + Y_AXIS_W / 2} y={livePriceY + 3} textAnchor="middle" fill="#fff" fontSize={9} fontWeight="bold" fontFamily="monospace">{fmtPrice(livePrice, pair.pip)}</text>

        {/* Hover Badge */}
        {crosshairX !== null && (
          <>
            <rect x={W} y={toY(hoverCandle.close) - 8} width={Y_AXIS_W} height={16} fill="#2a2e39" stroke="rgba(255,255,255,0.2)" strokeWidth={1} rx={2} />
            <text x={W + Y_AXIS_W / 2} y={toY(hoverCandle.close) + 3} textAnchor="middle" fill="#fff" fontSize={8} fontFamily="monospace">{fmtPrice(hoverCandle.close, pair.pip)}</text>
          </>
        )}
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// WIDGET COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

function IMacContent({ candles, livePrice, crosshairX, setCrosshairX }: any) {
  const hoverCandle = crosshairX !== null
    ? candles[Math.min(candles.length - 1, Math.max(0, Math.floor(crosshairX / ((CHART_W - Y_AXIS_W) / candles.length))))]
    : candles[candles.length - 1];

  return (
    <div className="flex flex-col h-full text-white/80 font-sans">
      {/* Navbar */}
      <div className="flex items-center justify-between px-3 md:px-5 h-12 border-b border-white/5 bg-[#181920]">
        <div className="flex items-center gap-3 md:gap-6 text-[10px] md:text-[11px] font-medium">
          <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-[#2196f3] shadow-[0_0_10px_rgba(33,150,243,0.5)]"></div>
          <span className="bg-[#2196f3] text-white px-2 md:px-3 py-1 rounded-md">Trade</span>
          <span className="hidden sm:inline hover:text-white cursor-pointer transition-colors">Pool</span>
          <span className="hidden md:inline hover:text-white cursor-pointer transition-colors">About</span>
          <span className="hidden md:inline hover:text-white cursor-pointer transition-colors">FAQ</span>
        </div>
        <div className="flex items-center gap-2 md:gap-4 text-[10px] md:text-[11px]">
          <span className="hidden sm:inline text-white/50">Balance</span>
          <span className="font-mono font-bold text-white">$1,727.00</span>
          <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#2196f3] flex items-center justify-center text-white text-[12px] md:text-[14px] cursor-pointer shadow-[0_0_10px_rgba(33,150,243,0.3)]">+</div>
          <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-gray-600 overflow-hidden border border-white/10 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-3 h-3 md:w-4 md:h-4 opacity-50"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
          </div>
        </div>
      </div>

      {/* 3 Columns */}
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        
        {/* Left Sidebar - Hidden on Mobile */}
        <div className="hidden md:flex w-[150px] border-r border-white/5 p-3 flex-col bg-[#131418]">
          <h3 className="text-[10px] text-white/70 mb-3 font-semibold">Others Trade Activity</h3>
          <div className="flex text-[9px] text-white/40 mb-2 px-1 font-medium">
            <span className="w-8">Type</span>
            <span className="flex-1 text-right">Out</span>
            <span className="flex-1 text-right">Time</span>
          </div>
          <div className="flex-1 overflow-hidden flex flex-col gap-1.5">
            {TRADE_ACTIVITY.map((t, i) => (
              <div key={i} className="flex text-[9px] font-mono items-center px-1">
                <span className={`w-8 ${t.type === 'Long' ? 'text-[#26a69a]' : 'text-[#ef5350]'}`}>{t.type}</span>
                <span className="flex-1 text-right text-white/80">${t.price.toFixed(2)}</span>
                <span className="flex-1 text-right text-white/30">{t.time}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 flex gap-1 h-1.5 rounded-full overflow-hidden">
             <div className="h-full bg-[#2196f3] w-[54%]"></div>
             <div className="h-full bg-[#26a69a] w-[46%]"></div>
          </div>
          <div className="flex justify-between text-[8px] mt-1 text-white/40 font-mono">
             <span>54%</span>
             <span>46%</span>
          </div>
          <h3 className="text-[9px] text-white/70 mt-3 font-semibold border-t border-white/5 pt-3">Positions</h3>
        </div>

        {/* Center Area */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#15161c] relative">
          <div className="p-3 md:p-4 flex items-center justify-between border-b border-white/5">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg">
                <span className="text-white text-[8px] md:text-[10px] font-bold">ETH</span>
              </div>
              <span className="text-[12px] md:text-[14px] font-bold text-white tracking-wide">ETH/USDC</span>
              <span className="text-[12px] md:text-[14px] font-mono font-bold text-[#2196f3] drop-shadow-[0_0_8px_rgba(33,150,243,0.4)]">
                ${livePrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex gap-1 md:gap-2">
              {['Daily', 'Weekly', 'Monthly'].map((btn, i) => (
                <button key={btn} className={`text-[8px] md:text-[9px] px-2 md:px-3 py-1 md:py-1.5 rounded-md font-medium transition-colors ${i===0 ? 'bg-[#2196f3] text-white shadow-[0_0_10px_rgba(33,150,243,0.3)]' : 'hidden sm:inline-block bg-[#1e2028] text-white/50 hover:text-white/80'}`}>
                  {btn}
                </button>
              ))}
              <div className="w-5 h-5 md:w-6 md:h-6 rounded-md bg-[#1e2028] flex items-center justify-center text-[10px]">🗓</div>
            </div>
          </div>
          
          {hoverCandle && (
            <div className="absolute top-[60px] md:top-[70px] left-[16px] z-10 flex gap-2 md:gap-3 text-[8px] md:text-[9px] font-mono text-white/40">
               <span>O <span className={hoverCandle.close >= hoverCandle.open ? 'text-[#26a69a]' : 'text-[#ef5350]'}>{hoverCandle.open.toFixed(2)}</span></span>
               <span>H <span className={hoverCandle.close >= hoverCandle.open ? 'text-[#26a69a]' : 'text-[#ef5350]'}>{hoverCandle.high.toFixed(2)}</span></span>
               <span>L <span className={hoverCandle.close >= hoverCandle.open ? 'text-[#26a69a]' : 'text-[#ef5350]'}>{hoverCandle.low.toFixed(2)}</span></span>
               <span>C <span className={hoverCandle.close >= hoverCandle.open ? 'text-[#26a69a]' : 'text-[#ef5350]'}>{hoverCandle.close.toFixed(2)}</span></span>
            </div>
          )}

          <div className="flex-1 w-full p-2 md:p-4 flex flex-col items-center justify-center mt-4">
            {candles.length > 0 && (
              <CandlestickChart candles={candles} pair={PAIR} livePrice={livePrice} crosshairX={crosshairX} onMouseMove={(x: number) => setCrosshairX(x)} onMouseLeave={() => setCrosshairX(null)} />
            )}
          </div>
        </div>

        {/* Right Sidebar - Stacked vertically on Mobile */}
        <div className="w-full md:w-[160px] border-t md:border-t-0 md:border-l border-white/5 p-4 flex flex-col gap-4 bg-[#131418]">
          <h3 className="text-[10px] text-white/70 font-semibold flex justify-between items-center">
            Order New Position
            <span className="text-[8px] bg-white/5 px-1.5 py-0.5 rounded text-white/40">Open</span>
          </h3>
          <div className="flex items-center justify-between text-[11px] bg-[#1a1b20] p-1.5 rounded-lg border border-white/5">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400"></div>
              <span className="font-medium text-white/80">ETH/USDC</span>
            </div>
            <span className="text-[9px] text-white/40">All Market ▼</span>
          </div>
          <div className="flex bg-[#1a1b20] rounded-lg p-1 border border-white/5">
            <button className="flex-1 text-[10px] py-1.5 bg-[#2196f3] rounded-md text-white font-medium shadow-[0_0_10px_rgba(33,150,243,0.3)]">Buy</button>
            <button className="flex-1 text-[10px] py-1.5 text-white/50 font-medium hover:text-white/80 transition-colors">Sell</button>
          </div>
          <div>
            <p className="text-[9px] text-white/50 mb-1.5">Price</p>
            <div className="bg-[#1a1b20] p-2 rounded-lg text-[11px] flex justify-between border border-white/5">
               <span className="font-mono text-white/90">$183.00</span>
               <span className="text-[9px] text-white/30">Max</span>
            </div>
          </div>
          <div className="flex justify-between gap-1.5">
             {['5x','10x','15x','50x'].map((x, i) => (
                <button key={x} className={`flex-1 text-[9px] py-1.5 rounded-md font-medium transition-colors border ${i===1 ? 'bg-[#2196f3]/10 text-[#2196f3] border-[#2196f3]/30' : 'bg-[#1a1b20] text-white/40 border-transparent hover:bg-white/5'}`}>{x}</button>
             ))}
          </div>
          <div className="flex justify-between items-center pt-2">
             <div>
               <p className="text-[9px] text-white/70">Auto Close</p>
               <p className="text-[9px] font-mono text-white/40 mt-0.5">$380.00</p>
             </div>
             <div className="w-7 h-4 bg-[#2196f3] rounded-full flex items-center justify-end px-0.5 cursor-pointer shadow-[0_0_8px_rgba(33,150,243,0.4)]">
               <div className="w-3 h-3 bg-white rounded-full"></div>
             </div>
          </div>
          <div className="mt-auto">
             <div className="bg-[#1a1b20] p-1 rounded-lg flex border border-white/5">
                <button className="flex-1 text-[9px] py-1.5 bg-[#2196f3] rounded-md text-white shadow-[0_0_8px_rgba(33,150,243,0.3)]">Open</button>
                <button className="flex-1 text-[9px] py-1.5 text-white/50 hover:text-white/80 transition-colors">Closed</button>
                <button className="flex-1 text-[9px] py-1.5 text-white/50 hover:text-white/80 transition-colors">History</button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TopRightCard() {
  return (
    <div className="w-full md:w-[240px] p-4 bg-[#22242b] rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.6)] border border-white/5 mx-auto">
      <div className="flex justify-between items-center mb-4">
        <span className="text-[10px] text-white/70 font-medium">Buy/Sell/Exchange</span>
        <div className="w-4 h-4 rounded-full border border-white/20 flex items-center justify-center text-[7px] text-white/50 hover:bg-white/5 cursor-pointer">▶</div>
      </div>
      <div className="flex gap-1.5 items-end h-20 mb-3 px-1 relative border-b border-white/5 pb-2">
        <div className="absolute right-[-10px] top-0 bottom-2 flex flex-col justify-between text-[7px] font-mono text-white/30 text-right">
           <span>$300000</span>
           <span>$250000</span>
           <span>$200000</span>
           <span>$150000</span>
           <span>$0</span>
        </div>
        {[30, 45, 40, 65, 55, 85, 75].map((val, i) => (
           <div key={i} className="flex-1 flex flex-col justify-end items-center gap-1.5 relative group">
             <div className="w-full rounded-sm transition-all group-hover:opacity-80" style={{ height: `${val}%`, backgroundColor: i % 2 === 0 ? '#2196f3' : '#26a69a' }}></div>
             <span className="text-[7px] font-mono text-white/50 bg-[#1a1b20] px-1 py-0.5 rounded">201{5+i}</span>
           </div>
        ))}
      </div>
    </div>
  );
}

function TabletContent() {
  return (
    <div className="flex flex-col h-full font-sans text-white">
      <div className="flex justify-between items-center mb-4 px-1">
        <span className="text-[12px] font-bold">Market Capital</span>
        <div className="flex gap-1">
          <button className="bg-[#2196f3] text-white text-[8px] px-2.5 py-1 rounded-full font-medium shadow-[0_0_8px_rgba(33,150,243,0.3)]">Fiat</button>
          <button className="text-white/50 text-[8px] px-2.5 py-1 font-medium hover:text-white/80">Spot</button>
          <button className="text-white/50 text-[8px] px-2.5 py-1 font-medium hover:text-white/80">API</button>
        </div>
      </div>
      <div className="bg-[#1a1b20] border border-white/5 rounded-lg p-2 flex justify-between items-center mb-3">
        <span className="text-[9px] text-white/40">Search coin...</span>
        <span className="text-[9px] text-white/40">🔍</span>
      </div>
      <div className="flex text-[8px] text-white/40 mb-2 px-2 font-medium">
        <span className="w-16">Coin</span>
        <span className="w-14 text-right">Last Price</span>
        <span className="w-12 text-right">Change (24H)</span>
        <span className="flex-1 text-right">Volume (24H)</span>
      </div>
      <div className="flex-1 overflow-hidden flex flex-col gap-0.5">
        {COINS.map(c => (
          <div key={c.symbol} className="flex items-center text-[9px] px-2 py-1.5 border-b border-white/5 hover:bg-white/[0.02] cursor-pointer transition-colors">
            <div className="w-16 flex items-center gap-2">
              <div className="w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold shadow-md" style={{ backgroundColor: c.color, color: 'white' }}>
                {c.symbol.charAt(0)}
              </div>
              <span className="font-semibold text-white/90">{c.name}</span>
            </div>
            <span className="w-14 text-right font-mono text-white/80">${c.price.toLocaleString()}</span>
            <span className={`w-12 text-right font-mono ${c.change >= 0 ? 'text-[#26a69a]' : 'text-[#ef5350]'}`}>
              {c.change > 0 ? '+' : ''}{c.change}%
            </span>
            <div className="flex-1 flex items-center justify-end pl-2">
               <svg width="28" height="12" viewBox="0 0 28 12" className="drop-shadow-md">
                 <polyline points="0,8 6,10 12,3 18,7 24,2 28,5" fill="none" stroke={c.change >= 0 ? '#26a69a' : '#ef5350'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
               </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PhoneContent() {
  return (
    <div className="flex flex-col h-full font-sans text-white">
      <div className="flex justify-between items-center mb-4 px-1">
        <span className="text-[11px] font-bold tracking-wide">My Wallet</span>
        <span className="text-[10px] text-white/50 cursor-pointer hover:text-white transition-colors">•••</span>
      </div>
      <p className="text-[18px] font-mono font-bold text-center text-[#2196f3] mb-4 drop-shadow-[0_0_8px_rgba(33,150,243,0.4)]">$5,893.90</p>

      <div className="relative w-24 h-24 mx-auto mb-6">
        <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90 drop-shadow-lg">
          <path className="text-[#1a1b20]" strokeWidth="3.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
          <path className="text-[#2196f3]" strokeDasharray="65, 100" strokeWidth="3.5" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
          <path className="text-[#26a69a]" strokeDasharray="20, 100" strokeDashoffset="-65" strokeWidth="3.5" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <span className="text-[8px] text-white/50 font-medium">Total</span>
          <span className="text-[12px] font-bold text-white/90">75%</span>
        </div>
      </div>

      <div className="flex text-[8px] text-white/40 mb-2 px-1 font-medium">
        <span className="flex-1">Margin</span>
        <span className="w-14 text-right">Total</span>
      </div>
      <div className="flex flex-col gap-2.5">
        <div className="flex text-[9px] items-center px-1">
           <span className="w-2.5 h-2.5 rounded-full bg-[#2196f3] mr-2 shadow-[0_0_5px_rgba(33,150,243,0.5)]"></span>
           <span className="flex-1 font-medium text-white/90">BTC</span>
           <span className="font-mono text-white/70">$1,452.50</span>
        </div>
        <div className="flex text-[9px] items-center px-1">
           <span className="w-2.5 h-2.5 rounded-full bg-[#26a69a] mr-2 shadow-[0_0_5px_rgba(38,166,154,0.5)]"></span>
           <span className="flex-1 font-medium text-white/90">ETH</span>
           <span className="font-mono text-white/70">$845.20</span>
        </div>
        <div className="flex text-[9px] items-center px-1">
           <span className="w-2.5 h-2.5 rounded-full bg-[#1a1b20] border border-white/20 mr-2"></span>
           <span className="flex-1 font-medium text-white/90">USDT</span>
           <span className="font-mono text-white/70">$3,596.20</span>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────────────────────────────────────────
export default function RightAnimationCard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [candles, setCandles] = useState<Candle[]>([]);
  const [livePrice, setLivePrice] = useState(0);
  const [crosshairX, setCrosshairX] = useState<number | null>(null);

  // Initialize and scale (only for desktop collage)
  useEffect(() => {
    const checkScale = () => {
      if (containerRef.current) {
        const parentW = containerRef.current.parentElement?.clientWidth || window.innerWidth;
        if (window.innerWidth >= 768) {
          setScale(Math.min(1, parentW / 950)); 
        }
      }
    };
    checkScale();
    window.addEventListener("resize", checkScale);
    return () => window.removeEventListener("resize", checkScale);
  }, []);

  // Candles Logic
  useEffect(() => {
    const initial = generateCandles(CANDLE_COUNT);
    setCandles(initial);
    setLivePrice(initial[initial.length - 1].close);
  }, []);

  useEffect(() => {
    if (candles.length === 0) return;
    const id = setInterval(() => {
      setCandles(prev => {
        if (prev.length === 0) return prev;
        const last = { ...prev[prev.length - 1] };
        const delta = (Math.random() - 0.49) * PAIR.volatility * 0.6;
        last.close = parseFloat((last.close + delta).toFixed(PAIR.pip));
        last.high = Math.max(last.high, last.close);
        last.low = Math.min(last.low, last.close);
        last.volume += Math.random() * 80;
        const newPrev = [...prev.slice(0, -1), last];
        setLivePrice(last.close);
        return newPrev;
      });
    }, 400);
    return () => clearInterval(id);
  }, [candles.length]);

  useEffect(() => {
    const id = setInterval(() => {
      setCandles(prev => {
        if (prev.length === 0) return prev;
        const last = prev[prev.length - 1];
        const newCandle: Candle = {
          open: last.close, high: last.close, low: last.close, close: last.close,
          volume: 100 + Math.random() * 400, time: Date.now(),
        };
        return [...prev.slice(1), newCandle];
      });
    }, 8000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full flex items-center justify-center relative overflow-visible" ref={containerRef}>
      
      {/* ─────────────────────────────────────────────────────────────────
          DESKTOP COLLAGE CONTAINER (Hidden on mobile) 
          ───────────────────────────────────────────────────────────────── */}
      <div
        className="relative hidden md:block"
        style={{
          width: 850,
          height: 600,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
      >
        {/* Glows */}
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-600/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-teal-500/10 rounded-full blur-[100px] pointer-events-none" />

        {/* IMAC */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, type: "spring" }}
           className="absolute top-[30px] left-[20px]"
        >
          <div className="flex flex-col items-center">
            <div className="w-[740px] h-[480px] bg-[#1a1b20] rounded-t-2xl rounded-b-lg shadow-2xl overflow-hidden flex flex-col border border-gray-800">
              <div className="flex-1 overflow-hidden bg-[#131418] relative">
                <IMacContent candles={candles} livePrice={livePrice} crosshairX={crosshairX} setCrosshairX={setCrosshairX} />
              </div>
              <div className="h-10 bg-[#24252a] flex items-center justify-center border-t border-gray-800">
                <div className="w-2.5 h-2.5 rounded-full bg-black/60"></div>
              </div>
            </div>
            <div className="w-32 h-14 bg-gradient-to-b from-[#24252a] to-[#141518] rounded-b-lg shadow-inner z-[-1]"></div>
            <div className="w-48 h-1.5 bg-[#141518] rounded-full shadow-2xl mt-[-2px] z-[-1]"></div>
          </div>
        </motion.div>

        {/* FLOAT CARD */}
        <motion.div
           initial={{ opacity: 0, x: 30 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
           className="absolute top-[45px] right-[40px] z-10"
        >
          <TopRightCard />
        </motion.div>

        {/* TABLET */}
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
           className="absolute bottom-[20px] right-[150px] z-20"
        >
          <div className="w-[280px] h-[380px] bg-[#131418] rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-[12px] border-[#0a0a0c] relative overflow-hidden flex flex-col">
            <div className="absolute top-0 w-full h-4 flex justify-center items-center z-10">
              <div className="w-1.5 h-1.5 rounded-full bg-[#2a2a30]"></div>
            </div>
            <div className="flex-1 px-3 pt-6 pb-3 overflow-hidden bg-[#181920]">
              <TabletContent />
            </div>
          </div>
        </motion.div>

        {/* PHONE */}
        <motion.div
           initial={{ opacity: 0, x: 40, y: 40 }}
           animate={{ opacity: 1, x: 0, y: 0 }}
           transition={{ duration: 0.8, delay: 0.6, type: "spring" }}
           className="absolute bottom-[0px] right-[40px] z-30"
        >
          <div className="w-[150px] h-[320px] bg-[#131418] rounded-[2rem] shadow-[0_30px_60px_rgba(0,0,0,0.6)] border-[8px] border-[#0a0a0c] relative overflow-hidden flex flex-col">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-4 bg-[#0a0a0c] rounded-b-xl z-10 flex justify-center items-end pb-1">
               <div className="w-5 h-1 bg-white/10 rounded-full"></div>
            </div>
            <div className="flex-1 px-3 pt-8 pb-3 bg-[#181920]">
              <PhoneContent />
            </div>
          </div>
        </motion.div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────
          MOBILE STACK CONTAINER (Hidden on desktop) 
          ───────────────────────────────────────────────────────────────── */}
      <div className="w-full flex flex-col md:hidden items-center gap-8 pb-10">
         
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           className="w-full bg-[#1a1b20] rounded-2xl shadow-xl overflow-hidden flex flex-col border border-gray-800"
         >
            <IMacContent candles={candles} livePrice={livePrice} crosshairX={crosshairX} setCrosshairX={setCrosshairX} />
         </motion.div>

         <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6, delay: 0.1 }}
           className="w-full max-w-[300px]"
         >
            <TopRightCard />
         </motion.div>

         <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6, delay: 0.2 }}
           className="w-full max-w-[320px]"
         >
            <div className="w-full h-[380px] bg-[#131418] rounded-[2rem] shadow-xl border-[12px] border-[#0a0a0c] relative overflow-hidden flex flex-col">
               <div className="absolute top-0 w-full h-4 flex justify-center items-center z-10">
                 <div className="w-1.5 h-1.5 rounded-full bg-[#2a2a30]"></div>
               </div>
               <div className="flex-1 px-3 pt-6 pb-3 overflow-hidden bg-[#181920]">
                 <TabletContent />
               </div>
            </div>
         </motion.div>

         <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6, delay: 0.3 }}
           className="w-[200px]"
         >
            <div className="w-full h-[340px] bg-[#131418] rounded-[2rem] shadow-xl border-[8px] border-[#0a0a0c] relative overflow-hidden flex flex-col">
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-4 bg-[#0a0a0c] rounded-b-xl z-10 flex justify-center items-end pb-1">
                 <div className="w-5 h-1 bg-white/10 rounded-full"></div>
               </div>
               <div className="flex-1 px-3 pt-8 pb-3 bg-[#181920]">
                 <PhoneContent />
               </div>
            </div>
         </motion.div>
      </div>

    </div>
  );
}
