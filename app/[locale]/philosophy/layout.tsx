import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Filosofi Trading – Trading for Better Living",
  description:
    "Filosofi Forex for Better Living: trading forex dengan disiplin, manajemen risiko, dan edukasi yang benar untuk membangun kehidupan finansial yang lebih baik.",
  path: "/philosophy",
  keywords: ["filosofi trading","psikologi trading","trading for living","mindset trader"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
