"use client";

import { useEffect, useState } from "react";

export default function TransisiSection() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handle = () => {
      const section = document.getElementById("halo-dark-area");
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const start = window.innerHeight * 0.3; 
      
      const p = Math.min(
        Math.max(0, (start - rect.top) / start),
        1
      );

      setProgress(p);
    };

    window.addEventListener("scroll", handle);
    return () => window.removeEventListener("scroll", handle);
  }, []);

  // Size lingkaran membesar seiring scroll
  const haloSize = 300 + progress * 1600; 
  const haloOpacity = 1 - progress * 1.2; 
  const bgDarkOpacity = progress * 0.9;

  return (
    <section
      id="halo-dark-area"
      className="relative w-full h-[120vh] flex items-center justify-center overflow-hidden"
      style={{
        backgroundColor: `rgba(10, 13, 18, ${bgDarkOpacity})`,
        transition: "background-color 0.2s linear",
      }}
    >
      {/* LINGKARAN CAHAYA */}
      <div
        style={{
          width: haloSize,
          height: haloSize,
          opacity: haloOpacity,
          background: "radial-gradient(circle, white 0%, rgba(255,255,255,0.1) 70%, rgba(0,0,0,0) 100%)",
          transition: "opacity 0.2s linear",
          filter: "blur(60px)",
          transform: "translateY(-80px)",
        }}
        className="absolute rounded-full"
      />

      <div className="relative z-10 text-center">
        <h2
          className={`text-4xl font-semibold transition-colors duration-300 ${
            progress > 0.6 ? "text-white" : "text-black"
          }`}
        >
          Menjelajah Lebih Dalam
        </h2>

        <p
          className={`mt-4 text-lg transition-colors duration-300 ${
            progress > 0.6 ? "text-white/70" : "text-black/60"
          }`}
        >
          Efek lingkaran cahaya berubah menjadi dark saat scroll.
        </p>
      </div>
    </section>
  );
}
