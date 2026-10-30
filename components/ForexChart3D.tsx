"use client";

// Visual candlestick 3D berbasis CSS (tanpa WebGL/three.js):
// ringan, tidak memicu "WebGL context lost", dan aman dipakai di mobile.
const CANDLES = [
  { color: "#ef4444", body: 70, wick: 130, offset: 30, delay: 0 },
  { color: "#22d3a8", body: 105, wick: 175, offset: -10, delay: 0.6 },
  { color: "#22d3a8", body: 140, wick: 215, offset: -55, delay: 1.2 },
  { color: "#ef4444", body: 50, wick: 105, offset: -25, delay: 1.8 },
];

export default function ForexChart3D({ active }: { active: boolean }) {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{ perspective: "1200px" }}
      aria-hidden
    >
      <div
        className="relative flex items-end gap-6 md:gap-10 fx-orbit"
        style={{
          transformStyle: "preserve-3d",
          animationPlayState: active ? "running" : "paused",
        }}
      >
        {CANDLES.map((c, i) => (
          <div
            key={i}
            className="relative flex items-center justify-center fx-float"
            style={
              {
                height: c.wick,
                top: c.offset,
                "--fx-float": "-14px",
                "--fx-dur": "3.2s",
                "--fx-delay": `${c.delay}s`,
                animationPlayState: active ? "running" : "paused",
              } as React.CSSProperties
            }
          >
            {/* Wick */}
            <span
              className="absolute w-[3px] h-full rounded-full"
              style={{ background: c.color, boxShadow: `0 0 12px ${c.color}` }}
            />
            {/* Body */}
            <span
              className="relative w-7 md:w-9 rounded-md"
              style={{
                height: c.body,
                background: `linear-gradient(135deg, ${c.color}, ${c.color}99)`,
                boxShadow: `0 0 30px ${c.color}66, inset 0 1px 0 rgba(255,255,255,0.35)`,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
