"use client";

import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  YAxis,
  Tooltip,
} from "recharts";

type Pair = { base: string; quote: string };
type PairData = { symbol: string; price: number | null };

const pairs: Pair[] = [
  { base: "EUR", quote: "USD" },
  { base: "GBP", quote: "USD" },
  { base: "USD", quote: "JPY" },
  { base: "AUD", quote: "USD" },
  { base: "USD", quote: "CHF" },
  { base: "NZD", quote: "USD" },
  { base: "USD", quote: "CAD" },
  { base: "EUR", quote: "GBP" },
  { base: "EUR", quote: "JPY" },
  { base: "GBP", quote: "JPY" },
  { base: "CHF", quote: "JPY" },
  { base: "AUD", quote: "JPY" },
  { base: "NZD", quote: "JPY" },
  { base: "EUR", quote: "CHF" },
  { base: "GBP", quote: "CHF" },
  { base: "CAD", quote: "JPY" },
  { base: "AUD", quote: "CAD" },
  { base: "EUR", quote: "CAD" },
  { base: "GBP", quote: "CAD" },
  { base: "USD", quote: "SEK" },
];

export default function ForexCarousel() {
  const [data, setData] = useState<PairData[]>([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<PairData | null>(null);
  const [history, setHistory] = useState<number[]>([]);

  const fetchData = async () => {
    try {
      const res = await fetch("https://open.er-api.com/v6/latest/USD");
      const json = await res.json();
      const rates = json?.rates || {};

      const mapped: PairData[] = pairs.map((p) => {
        let price: number | null = null;

        if (p.base === "USD") price = rates[p.quote] ?? null;
        else if (p.quote === "USD") {
          const rBase = rates[p.base];
          price = rBase ? 1 / rBase : null;
        } else {
          const rBase = rates[p.base];
          const rQuote = rates[p.quote];
          price = rBase && rQuote ? rQuote / rBase : null;
        }

        return { symbol: `${p.base}/${p.quote}`, price };
      });

      setData(mapped);
    } catch (e) {
      console.log("fetch error");
    }
  };

  useEffect(() => {
    fetchData();
    const id = setInterval(fetchData, 7000);
    return () => clearInterval(id);
  }, []);

  const openModal = (item: PairData) => {
    setSelected(item);
    setHistory((prev) => [...prev.slice(-40), item.price || 0]); // keep max 40 points
    setOpen(true);
  };

  useEffect(() => {
    if (!selected) return;
    const found = data.find((d) => d.symbol === selected.symbol);
    if (found) {
      setHistory((prev) => [...prev.slice(-40), found.price || 0]);
      setSelected(found);
    }
  }, [data]);

  return (
    <>
      {/* CAROUSEL (Tampilan awal yang kamu suka) */}
      <div className="w-full overflow-hidden py-3 bg-[#0B0F19] border-y border-white/10">
        <div className="flex animate-scroll whitespace-nowrap">
          {[...data, ...data].map((item, i) => (
            <button
              key={i}
              onClick={() => openModal(item)}
              className="px-6 py-2 text-white flex items-center gap-2 border-r border-white/10 hover:bg-white/5 transition"
            >
              <span className="font-semibold">{item.symbol}</span>
              <span className="opacity-80">
                {item.price ? item.price.toFixed(5) : "-"}
              </span>
            </button>
          ))}
        </div>

        <style>{`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll {
            animation: scroll 22s linear infinite;
          }
        `}</style>
      </div>

      {/* MODAL WITH CHART */}
      <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-xl bg-white rounded-2xl p-6 shadow-xl relative">
            <button
              className="absolute top-4 right-4 text-gray-700 hover:text-black"
              onClick={() => setOpen(false)}
            >
              <X size={22} />
            </button>

            <Dialog.Title className="text-xl font-semibold mb-3">
              {selected?.symbol}
            </Dialog.Title>

            {/* PRICE */}
            <p className="text-3xl font-bold mb-4">
              {selected?.price ? selected.price.toFixed(5) : "-"}
            </p>

            {/* CHART */}
            <div className="w-full h-48 bg-gray-50 border rounded-xl p-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={history.map((v) => ({ v }))}>
                  <YAxis hide domain={["auto", "auto"]} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="v"
                    stroke="#2563eb"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <p className="text-xs text-gray-500 mt-3">
              Updated every 7 seconds • Live FX snapshot
            </p>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
