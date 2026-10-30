import type { Metadata } from "next";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.forexforbetterliving.com"
).replace(/\/$/, "");

export const SITE_NAME = "Forex for Better Living";
export const LEGAL_NAME = "PT. Akademi Keuangan Nusantara";
export const OG_IMAGE = "/og-image.png";

export const SOCIAL_LINKS = [
  "https://www.facebook.com/forexforbetterliving",
  "https://www.instagram.com/forexforbetterliving/",
  "https://www.tiktok.com/@forexforbetterliving",
  "https://www.youtube.com/@forexforbetterliving",
];

// Kata kunci utama yang ingin dimenangkan di Google
export const BASE_KEYWORDS = [
  "forex",
  "edukasi forex",
  "belajar forex",
  "trading forex",
  "trading",
  "belajar trading",
  "EA trading",
  "EA forex",
  "robot trading forex",
  "expert advisor",
  "kursus forex",
  "sekolah trading forex",
  "Forex for Better Living",
  "FBL",
];

type PageSeo = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
  noIndex?: boolean;
  absoluteTitle?: boolean;
  type?: "website" | "article";
};

export function buildMetadata({
  title,
  description,
  path,
  keywords = [],
  image = OG_IMAGE,
  noIndex = false,
  absoluteTitle = false,
  type = "website",
}: PageSeo): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords: Array.from(new Set([...keywords, ...BASE_KEYWORDS])),
    alternates: { canonical: path },
    openGraph: {
      type,
      locale: "id_ID",
      url: path,
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

// Halaman privat (dashboard, auth) jangan diindeks Google
export const noIndexMetadata: Metadata = {
  robots: { index: false, follow: false },
};

export function stripHtml(html: string, max = 160) {
  const text = html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
}

export function absoluteUrl(path: string) {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
