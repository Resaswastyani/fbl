"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowUpRight, Play, Eye, Clock, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";

const RightAnimationCard = dynamic(() => import("./RightAnimationCard"), {
  ssr: false,
});

type TradingVideo = {
  id: string;
  title: string;
  title_en?: string;
  description?: string;
  description_en?: string;
  videoUrl: string;
  videoType: "YOUTUBE" | "UPLOAD";
  thumbnail?: string;
  published: boolean;
  viewCount: number;
  createdAt: string;
  author: {
    name: string | null;
    email: string;
  };
};

export const VideoTradingPage = () => {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("VideoTrading");
  const [videos, setVideos] = useState<TradingVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<TradingVideo | null>(null);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await fetch("/api/trading-videos?published=true");
      if (response.ok) {
        const data = await response.json();
        setVideos(data.videos || []);
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setLoading(false);
    }
  };

  const extractYouTubeId = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s?]+)/,
      /youtube\.com\/shorts\/([^&\s?]+)/,
    ];
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  const getYouTubeEmbedUrl = (url: string): string => {
    const videoId = extractYouTubeId(url);
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  const formatViewCount = (count: number): string => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* HERO SECTION */}
      <section className="w-full pt-24 md:pt-32 pb-16 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-12 gap-5 lg:gap-16 px-8 md:px-12">
          {/* LEFT TEXT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="col-span-12 lg:col-span-6 flex flex-col justify-center text-left"
          >
            {/* Small Link */}
            <a
              href="https://www.youtube.com/@forexforbetterliving"
              className="flex items-center gap-1 text-[#6e6e6e] mb-4 cursor-pointer"
            >
              <span className="text-xs uppercase tracking-tight font-mono flex items-center gap-1 hover:text-[#202020]">
                {t("seeAllVideos")} <ArrowUpRight size={14} strokeWidth={1.5} />
              </span>
            </a>

            {/* Headline */}
            <h1
              className="text-[40px] font-normal leading-tight tracking-tight text-[#111A4A] mb-6"
              style={{
                fontFamily: "var(--font-figtree), Figtree",
                fontSize: "50px",
                fontWeight: "500",
              }}
            >
              {t("heroTitle")}
            </h1>

            {/* Subheadline */}
            <p
              className="text-lg leading-6 text-[#111A4A] opacity-60 mt-0 mb-6"
              style={{ fontFamily: "var(--font-figtree), Figtree" }}
            >
              {t("heroSubtitle")}
            </p>
            <p className="mb-5 text-sm text-[#111A4A] opacity-40">
              PT AKADEMI KEUANGAN NUSANTARA
            </p>

            {/* Stats */}
            <div className="flex gap-8 mb-8">
              <div>
                <div className="text-3xl font-semibold text-[#156d95]">
                  {videos.length}+
                </div>
                <div className="text-sm text-[#6e6e6e]">{t("videosAvailable")}</div>
              </div>
              <div>
                <div className="text-3xl font-semibold text-[#156d95]">
                  {formatViewCount(
                    videos.reduce((acc, v) => acc + v.viewCount, 0),
                  )}
                </div>
                <div className="text-sm text-[#6e6e6e]">{t("totalViews")}</div>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => router.push("/login")}
              className="
                inline-flex items-center justify-center
                bg-[#156d95]
                text-white
                rounded-lg
                px-5 py-3
                text-sm sm:text-base
                font-medium
                w-fit
                transition-all hover:translate-x-1
              "
            >
              {t("startLearningFree")}
            </button>
          </motion.div>

          {/* RIGHT ANIMATION / FEATURED VIDEO */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="col-span-12 lg:col-span-6 flex items-center justify-center mt-6 md:mt-0"
          >
            <div className="relative w-full max-w-[520px] lg:max-w-[600px]">
              {videos.length > 0 ? (
                <div
                  className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl group cursor-pointer"
                  onClick={() => setSelectedVideo(videos[0])}
                >
                  <img
                    src={videos[0].thumbnail || "/images/video-placeholder.jpg"}
                    alt={videos[0].title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play
                        className="w-8 h-8 text-[#156d95] ml-1"
                        fill="#156d95"
                      />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                    <span className="text-xs text-white/70 uppercase tracking-wider font-mono">
                      {t("latestVideo")}
                    </span>
                    <h3 className="text-xl font-semibold text-white mt-1 line-clamp-2">
                      {locale === "en" && videos[0].title_en ? videos[0].title_en : videos[0].title}
                    </h3>
                  </div>
                </div>
              ) : (
                <div className="relative w-auto max-w-[420px] md:max-w-[520px] lg:max-w-[600px] h-auto">
                  <RightAnimationCard />
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* VIDEOS GRID SECTION */}
      <section id="videos" className="w-full py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8 md:px-12">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-end justify-between mb-10"
          >
            <div>
              <span className="text-xs uppercase tracking-tight font-mono text-[#6e6e6e]">
                {t("videoCollection")}
              </span>
              <h2
                className="text-3xl font-semibold text-[#111A4A] mt-2"
                style={{ fontFamily: "var(--font-figtree), Figtree" }}
              >
                {t("latestTradingVideos")}
              </h2>
            </div>
            <a
              href="https://www.youtube.com/@forexforbetterliving"
              className="hidden md:flex items-center gap-1 text-[#156d95] text-sm font-medium hover:gap-2 transition-all"
            >
              {t("seeAll")} <ChevronRight size={16} />
            </a>
          </motion.div>

          {/* Videos Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse"
                >
                  <div className="aspect-video bg-gray-200" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : videos.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[#6e6e6e] text-lg">{t("noVideos")}</p>
              <button
                onClick={() => router.push("/login")}
                className="mt-4 inline-flex items-center justify-center bg-[#156d95] text-white rounded-lg px-5 py-3 text-sm font-medium"
              >
                {t("loginToAccess")}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedVideo(video)}
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={video.thumbnail || "/images/video-placeholder.jpg"}
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center">
                        <Play
                          className="w-6 h-6 text-[#156d95] ml-0.5"
                          fill="#156d95"
                        />
                      </div>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-1 bg-black/70 text-white text-xs rounded-md font-mono">
                        {video.videoType === "YOUTUBE" ? "YouTube" : "Video"}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3
                      className="font-semibold text-[#111A4A] line-clamp-2 mb-2 group-hover:text-[#156d95] transition-colors"
                      style={{ fontFamily: "var(--font-figtree), Figtree" }}
                    >
                      {locale === "en" && video.title_en ? video.title_en : video.title}
                    </h3>
                    <p className="text-sm text-[#6e6e6e] line-clamp-2 mb-4">
                      {locale === "en" && video.description_en ? video.description_en : video.description || t("noDescription")}
                    </p>
                    <div className="flex items-center justify-between text-xs text-[#9ca3af]">
                      <span className="flex items-center gap-1">
                        <Eye size={14} />
                        {formatViewCount(video.viewCount)} views
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {new Date(video.createdAt).toLocaleDateString("id-ID")}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Mobile CTA */}
          <div className="mt-10 text-center md:hidden">
            <a
              href="#"
              className="inline-flex items-center gap-1 text-[#156d95] text-sm font-medium"
            >
              {t("seeAllVideos")} <ChevronRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="w-full py-20 bg-[#111A4A]">
        <div className="max-w-4xl mx-auto px-8 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="text-3xl md:text-4xl font-semibold text-white mb-4"
              style={{ fontFamily: "var(--font-figtree), Figtree" }}
            >
              {t("readyToStart")}
            </h2>
            <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
              {t("readyDescription")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push("/signup")}
                className="inline-flex items-center justify-center bg-[#156d95] text-white rounded-lg px-8 py-4 text-base font-medium hover:bg-[#0d5a7a] transition-colors"
              >
                {t("registerFree")}
              </button>
              <button
                onClick={() => router.push("/login")}
                className="inline-flex items-center justify-center bg-transparent border-2 border-white/30 text-white rounded-lg px-8 py-4 text-base font-medium hover:bg-white/10 transition-colors"
              >
                {t("login")}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* VIDEO MODAL */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-5xl bg-black rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-video">
              {selectedVideo.videoType === "YOUTUBE" ? (
                <iframe
                  src={getYouTubeEmbedUrl(selectedVideo.videoUrl)}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={selectedVideo.title}
                />
              ) : (
                <video
                  src={selectedVideo.videoUrl}
                  controls
                  className="w-full h-full"
                  poster={selectedVideo.thumbnail}
                  autoPlay
                />
              )}
            </div>
            <div className="p-6 bg-white">
              <h3
                className="text-xl font-semibold text-[#111A4A] mb-2"
                style={{ fontFamily: "var(--font-figtree), Figtree" }}
              >
                {locale === "en" && selectedVideo.title_en ? selectedVideo.title_en : selectedVideo.title}
              </h3>
              <p className="text-[#6e6e6e] mb-4">
                {locale === "en" && selectedVideo.description_en ? selectedVideo.description_en : selectedVideo.description || t("noDescription")}
              </p>
              <div className="flex items-center gap-4 text-sm text-[#9ca3af]">
                <span className="flex items-center gap-1">
                  <Eye size={16} />
                  {formatViewCount(selectedVideo.viewCount)} views
                </span>
                <span>•</span>
                <span>
                  {selectedVideo.author.name || selectedVideo.author.email}
                </span>
              </div>
            </div>
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
            >
              ✕
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};
