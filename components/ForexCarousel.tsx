"use client";

import React, { useEffect, useRef, memo } from "react";

function ForexCarousel() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Prevent duplicate injections in React Strict Mode
    if (container.current && container.current.querySelector("iframe")) return;
    if (container.current && container.current.querySelector("script")) {
      // If script is there but no iframe, maybe it failed. Let's clear and retry.
      container.current.innerHTML = '<div class="tradingview-widget-container__widget"></div>';
    }

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        { proName: "FX:EURUSD", title: "EURUSD" },
        { proName: "FX:GBPUSD", title: "GBPUSD" },
        { proName: "FX:USDJPY", title: "USDJPY" },
        { proName: "FX:AUDUSD", title: "AUDUSD" },
        { proName: "FX:USDCHF", title: "USDCHF" },
        { proName: "FX:NZDUSD", title: "NZDUSD" },
        { proName: "FX:USDCAD", title: "USDCAD" },
        { proName: "FX:EURGBP", title: "EURGBP" },
        { proName: "FX:EURJPY", title: "EURJPY" },
        { proName: "FX:GBPJPY", title: "GBPJPY" },
        { proName: "FX:CHFJPY", title: "CHFJPY" },
        { proName: "FX:AUDJPY", title: "AUDJPY" },
        { proName: "FX:NZDJPY", title: "NZDJPY" },
        { proName: "FX:EURCHF", title: "EURCHF" },
        { proName: "FX:GBPCHF", title: "GBPCHF" },
        { proName: "FX:CADJPY", title: "CADJPY" },
        { proName: "FX:AUDCAD", title: "AUDCAD" },
        { proName: "FX:EURCAD", title: "EURCAD" },
        { proName: "FX:GBPCAD", title: "GBPCAD" },
        { proName: "FX:USDSEK", title: "USDSEK" }
      ],
      showSymbolLogo: true,
      isTransparent: true,
      displayMode: "regular",
      colorTheme: "dark",
      locale: "id"
    });

    if (container.current) {
      container.current.appendChild(script);
    }
  }, []);

  return (
    <div className="w-full bg-[#0B0F19] border-y border-white/10 overflow-hidden" style={{ minHeight: "46px" }}>
      <div className="tradingview-widget-container" ref={container}>
        <div className="tradingview-widget-container__widget"></div>
      </div>
    </div>
  );
}

export default memo(ForexCarousel);
