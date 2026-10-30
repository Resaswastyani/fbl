"use client";

import { useState } from "react";
import { Play } from "lucide-react";

// Embed YouTube ringan: tampilkan thumbnail dulu, player baru dimuat saat diklik.
// Memakai youtube-nocookie.com agar tidak memanggil googleads/doubleclick.
export default function YouTubeEmbed({
  videoId,
  title,
  className = "",
}: {
  videoId: string;
  title: string;
  className?: string;
}) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <iframe
        className={`absolute inset-0 w-full h-full ${className}`}
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Putar video: ${title}`}
      className={`group absolute inset-0 w-full h-full ${className}`}
    >
      <img
        src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
        alt={title}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <span className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-red-600 text-white shadow-xl group-hover:scale-110 transition-transform">
        <Play className="w-7 h-7 md:w-8 md:h-8 ml-1" fill="currentColor" />
      </span>
    </button>
  );
}
