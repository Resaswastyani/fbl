import type React from "react";
import type { Metadata } from "next";
import { Figtree, Inter, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import "@/app/globals.css";

import LayoutClient from "@/components/LayoutClient";
import { CartProvider } from "@/context/cart-context";
import CartDrawer from "@/components/cart/cart-drawer";
import { ThemeProvider } from "@/components/theme-provider";
import {
  SITE_URL,
  SITE_NAME,
  LEGAL_NAME,
  OG_IMAGE,
  BASE_KEYWORDS,
  SOCIAL_LINKS,
  absoluteUrl,
  JsonLd,
} from "@/lib/seo";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  weight: ["400", "500", "600"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  weight: ["400", "500", "600"],
});

const DEFAULT_TITLE =
  "Forex for Better Living | Edukasi Forex, Belajar Trading & EA Trading";
const DEFAULT_DESCRIPTION =
  "Belajar forex dan trading dari nol bersama Forex for Better Living (FBL). Edukasi forex terpercaya, kursus trading, mentor profesional, dan EA trading (robot trading forex MT4/MT5) untuk hasil yang lebih konsisten.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: `%s | ${SITE_NAME}`,
    default: DEFAULT_TITLE,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: BASE_KEYWORDS,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: LEGAL_NAME,
  category: "education",
  openGraph: {
    type: "website",
    locale: "id_ID",
    alternateLocale: ["en_US"],
    url: "/",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    siteName: SITE_NAME,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [OG_IMAGE],
  },
  icons: {
    icon: "/icon.svg",
    apple: "/logo-fbl.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Canonical diatur per halaman; jangan set "/" di sini karena akan diwarisi semua halaman
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "EducationalOrganization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      legalName: LEGAL_NAME,
      alternateName: "FBL",
      url: SITE_URL,
      logo: absoluteUrl("/logo-fbl.png"),
      image: absoluteUrl(OG_IMAGE),
      description: DEFAULT_DESCRIPTION,
      sameAs: SOCIAL_LINKS,
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+62-851-8755-5440",
        contactType: "customer service",
        areaServed: "ID",
        availableLanguage: ["Indonesian", "English"],
      },
      knowsAbout: ["Forex", "Trading Forex", "Edukasi Forex", "EA Trading", "Expert Advisor", "Robot Trading"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: "id-ID",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${inter.variable} ${figtree.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <JsonLd data={organizationJsonLd} />
        <NextIntlClientProvider messages={messages} locale={locale}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
            <CartProvider>
              <LayoutClient>{children}</LayoutClient>
              <CartDrawer />
            </CartProvider>
          </ThemeProvider>
        </NextIntlClientProvider>

        <Analytics />
      </body>
    </html>
  );
}
