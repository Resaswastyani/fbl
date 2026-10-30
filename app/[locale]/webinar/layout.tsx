import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Webinar Trading Forex Gratis",
  description:
    "Ikuti webinar trading forex gratis bersama mentor Forex for Better Living. Belajar forex, strategi trading, dan cara memakai EA trading secara live.",
  path: "/webinar",
  keywords: ["webinar forex","webinar trading gratis","seminar forex","kelas forex gratis","belajar trading online"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
