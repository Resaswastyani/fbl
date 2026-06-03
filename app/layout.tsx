import type React from "react";
import type { Metadata } from "next";
import { Figtree, Inter, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { NextIntlClientProvider } from "next-intl";
import "./globals.css";

import LayoutClient from "@/components/LayoutClient";
import { CartProvider } from "@/app/context/cart-context";
import CartDrawer from "@/components/cart/cart-drawer";

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
  title: "Forex for Better Living",
  description: "Created with v0",
  generator: "v0.app",
  icons: {
    icon: "/icon.svg",
  },
  verification: {
    google: "googlee3f2781a2b9fd80d",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = "id";
  const messages = (await import(`../messages/${locale}.json`)).default;

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${inter.variable} ${figtree.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <NextIntlClientProvider messages={messages} locale={locale}>
          <CartProvider>
            <LayoutClient>{children}</LayoutClient>
            <CartDrawer />
          </CartProvider>
        </NextIntlClientProvider>

        <Analytics />
      </body>
    </html>
  );
}
