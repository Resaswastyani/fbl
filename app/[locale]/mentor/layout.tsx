import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Mentor Trading Forex Profesional",
  description:
    "Kenali para mentor trading forex Forex for Better Living yang membimbing Anda belajar forex dan trading secara terarah, dari pemula hingga konsisten profit.",
  path: "/mentor",
  keywords: ["mentor forex","mentor trading","trader profesional indonesia","bimbingan trading forex"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
