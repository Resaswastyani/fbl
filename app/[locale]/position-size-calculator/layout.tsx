import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Kalkulator Position Size & Lot Forex Gratis",
  description:
    "Hitung ukuran lot dan position size trading forex secara akurat berdasarkan modal, risiko, dan stop loss. Alat gratis untuk money management trading.",
  path: "/position-size-calculator",
  keywords: ["kalkulator lot forex","position size calculator","kalkulator forex","money management forex","menghitung lot trading"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
