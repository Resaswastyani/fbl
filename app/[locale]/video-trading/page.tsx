import { VideoTradingPage } from "@/components/VideoTradingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Video Edukasi Trading Forex",
  description:
    "Koleksi video edukasi trading forex terlengkap dari para expert: belajar forex untuk pemula, analisa teknikal, strategi trading, dan tutorial EA trading.",
  path: "/video-trading",
  keywords: ["video trading", "video belajar forex", "tutorial trading forex", "video edukasi forex", "tutorial EA trading"],
});

export default function VideoTradingRoute() {
  return <VideoTradingPage />;
}
