"use client";

import React, { useEffect, useRef } from "react";

export default function ForexNetworkAnimation() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);

    const resize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", resize);

    const symbols = ["$", "€", "¥", "£", "₩", "₹"];

    const nodes = symbols.map((s, i) => ({
      x: (w / symbols.length) * i + 80,
      y: h / 2 + Math.sin(i) * 80,
      symbol: s,
    }));

    let glowPos = 0;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // DRAW CONNECTION LINES — darker + thicker
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#0D2B6A"; // deep navy
      ctx.shadowBlur = 0;

      ctx.beginPath();
      ctx.moveTo(nodes[0].x, nodes[0].y);
      for (let i = 1; i < nodes.length; i++) {
        ctx.lineTo(nodes[i].x, nodes[i].y);
      }
      ctx.stroke();

      // GLOW ANIMATION — bright cyan moving light
      const p = glowPos;
      const segment = 1 / (nodes.length - 1);
      let idx = Math.floor(p / segment);
      if (idx >= nodes.length - 1) idx = nodes.length - 2;

      const localT = (p - idx * segment) / segment;

      const x = nodes[idx].x + (nodes[idx + 1].x - nodes[idx].x) * localT;
      const y = nodes[idx].y + (nodes[idx + 1].y - nodes[idx].y) * localT;

      const gradient = ctx.createRadialGradient(x, y, 0, x, y, 55);
      gradient.addColorStop(0, "rgba(255,255,255,0.9)");
      gradient.addColorStop(0.4, "rgba(0,180,255,0.8)");
      gradient.addColorStop(1, "transparent");

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, 16, 0, Math.PI * 2);
      ctx.fill();

      glowPos += 0.004;
      if (glowPos > 1) glowPos = 0;

      // DRAW CURRENCY SYMBOLS — dark + bolder
      ctx.fillStyle = "#0D2B6A"; // dark navy
      ctx.font = "700 30px Figtree, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      nodes.forEach((n) => {
        // slight shadow for readability
        ctx.shadowColor = "rgba(0,0,0,0.12)";
        ctx.shadowBlur = 4;
        ctx.fillText(n.symbol, n.x, n.y);
        ctx.shadowBlur = 0;
      });

      requestAnimationFrame(draw);
    };

    draw();

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <div className="w-full h-[300px] relative">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
