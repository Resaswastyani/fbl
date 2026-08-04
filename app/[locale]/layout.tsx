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

export const metadata: Metadata = {
  title: {
    template: "%s | Forex for Better Living",
    default: "Forex for Better Living | Trading Automation & Education",
  },
  description: "Tingkatkan pengalaman dan profitabilitas trading Anda dengan Forex for Better Living (FBL). Menyediakan edukasi forex, robot trading (EA), dan indikator canggih untuk hasil trading yang lebih konsisten.",
  keywords: [
    "forex",
    "trading forex",
    "robot trading",
    "EA forex",
    "expert advisor",
    "edukasi forex",
    "indikator trading",
    "forex automation",
    "Forex for Better Living",
    "FBL",
    "Forex Class"
  ],
  authors: [{ name: "Forex for Better Living" }],
  creator: "Forex for Better Living",
  openGraph: {
    type: "website",
    locale: "id_ID",
    title: "Forex for Better Living | Trading Automation & Education",
    description: "Tingkatkan pengalaman dan profitabilitas trading Anda dengan Forex for Better Living (FBL). Menyediakan edukasi forex, robot trading (EA), dan indikator canggih.",
    siteName: "Forex for Better Living",
    images: [
      {
        url: "/icon.svg",
        width: 1200,
        height: 630,
        alt: "Forex for Better Living",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Forex for Better Living | Trading Automation & Education",
    description: "Tingkatkan pengalaman dan profitabilitas trading Anda dengan Forex for Better Living (FBL). Menyediakan edukasi forex, robot trading (EA), dan indikator canggih.",
    images: ["/icon.svg"],
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg", // Apple touch icon
  },
  verification: {
    google: "googlee3f2781a2b9fd80d",
  },
  alternates: {
    canonical: "/",
  },
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
