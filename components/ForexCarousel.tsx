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
        { proName: "FX:EURUSD", title: "EUR/USD" },
        { proName: "FX:GBPUSD", title: "GBP/USD" },
        { proName: "FX:USDJPY", title: "USD/JPY" },
        { proName: "FX:AUDUSD", title: "AUD/USD" },
        { proName: "FX:USDCHF", title: "USD/CHF" },
        { proName: "FX:NZDUSD", title: "NZD/USD" },
        { proName: "FX:USDCAD", title: "USD/CAD" },
        { proName: "FX:EURGBP", title: "EUR/GBP" },
        { proName: "FX:EURJPY", title: "EUR/JPY" },
        { proName: "FX:GBPJPY", title: "GBP/JPY" },
        { proName: "FX:CHFJPY", title: "CHF/JPY" },
        { proName: "FX:AUDJPY", title: "AUD/JPY" },
        { proName: "FX:NZDJPY", title: "NZD/JPY" },
        { proName: "FX:EURCHF", title: "EUR/CHF" },
        { proName: "FX:GBPCHF", title: "GBP/CHF" },
        { proName: "FX:CADJPY", title: "CAD/JPY" },
        { proName: "FX:AUDCAD", title: "AUD/CAD" },
        { proName: "FX:EURCAD", title: "EUR/CAD" },
        { proName: "FX:GBPCAD", title: "GBP/CAD" },
        { proName: "FX:USDSEK", title: "USD/SEK" }
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
