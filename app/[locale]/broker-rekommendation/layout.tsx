import { buildMetadata, JsonLd, pageArticleJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Rekomendasi Broker Forex Terpercaya & Teregulasi",
  description:
    "Daftar rekomendasi broker forex terpercaya dan teregulasi untuk trading forex dan EA trading: spread rendah, eksekusi cepat, dan deposit mudah.",
  path: "/broker-rekommendation",
  keywords: ["broker forex terpercaya","rekomendasi broker forex","broker forex teregulasi","broker untuk EA","broker trading indonesia"],
});

const articleJsonLd = pageArticleJsonLd({
  headline: "Rekomendasi Broker Forex Terpercaya & Teregulasi",
  description: "Daftar rekomendasi broker forex terpercaya dan teregulasi untuk trading forex dan EA trading: spread rendah, eksekusi cepat, dan deposit mudah.",
  path: "/broker-rekommendation",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={articleJsonLd} />
      {children}
    </>
  );
}
