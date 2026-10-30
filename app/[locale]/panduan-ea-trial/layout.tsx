import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Panduan Free Trial EA Trading 30 Hari",
  description:
    "Panduan lengkap memasang dan mencoba EA trading (robot trading forex) gratis selama 30 hari di MT4/MT5, langkah demi langkah.",
  path: "/panduan-ea-trial",
  keywords: ["free trial EA","EA trading gratis","cara pasang EA MT4","cara pasang EA MT5","robot trading gratis"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
