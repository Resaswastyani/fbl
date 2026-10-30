import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Disclaimer Risiko Trading Forex",
  description:
    "Pernyataan risiko dan disclaimer Forex for Better Living terkait aktivitas trading forex, EA trading, dan materi edukasi.",
  path: "/disclaimer",
  keywords: ["disclaimer forex","risiko trading forex"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
