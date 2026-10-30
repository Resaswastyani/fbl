import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Jurnal Trading Forex Gratis",
  description:
    "Catat dan evaluasi setiap transaksi trading forex Anda dengan jurnal trading gratis untuk meningkatkan disiplin dan konsistensi profit.",
  path: "/Jurnal-trading",
  keywords: ["jurnal trading","trading journal","jurnal forex","evaluasi trading"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
