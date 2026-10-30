import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Artikel Edukasi Forex & Trading",
  description:
    "Kumpulan artikel edukasi forex dan trading: belajar forex untuk pemula, analisa market, strategi trading, money management, dan tips menggunakan EA trading.",
  path: "/articles",
  keywords: ["artikel forex","edukasi forex","belajar forex untuk pemula","strategi trading forex","analisa forex","tips trading"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
