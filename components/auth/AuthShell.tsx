"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";

// Warna dari logo FBL
export const BRAND = {
  blue: "#00A8D8",
  green: "#7CAA34",
  pink: "#EC2E7A",
  orange: "#F7941D",
  navy: "#0E1A3D",
};

// Kelas bersama untuk elemen form auth (input, tombol, link)
export const authInput =
  "h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-[15px] text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-[#00A8D8] focus:ring-4 focus:ring-[#00A8D8]/15 disabled:opacity-60 dark:bg-white/5 dark:border-white/10 dark:text-white";
export const authLabel = "text-sm font-medium text-slate-700 dark:text-gray-300";
export const authPrimaryButton =
  "inline-flex h-11 w-full items-center justify-center rounded-xl bg-[#0A86B3] px-4 text-[15px] font-semibold text-white shadow-sm transition hover:bg-[#08739A] focus:outline-none focus:ring-4 focus:ring-[#00A8D8]/25 disabled:opacity-60";
export const authSecondaryButton =
  "inline-flex h-11 w-full items-center justify-center gap-2.5 rounded-xl border border-slate-200 bg-white px-4 text-[15px] font-medium text-slate-800 transition hover:bg-slate-50 hover:border-slate-300 disabled:opacity-60 dark:bg-white/5 dark:border-white/10 dark:text-white dark:hover:bg-white/10";
export const authLink = "font-semibold text-[#0A86B3] hover:text-[#08739A] hover:underline underline-offset-4";

export function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z" />
      <path fill="#FBBC05" d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z" />
      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75z" />
    </svg>
  );
}

// Garis 4 warna logo
function BrandStripe({ className = "" }: { className?: string }) {
  return (
    <div className={`flex h-1 w-full overflow-hidden rounded-full ${className}`} aria-hidden>
      <span className="flex-1" style={{ background: BRAND.green }} />
      <span className="flex-1" style={{ background: BRAND.blue }} />
      <span className="flex-1" style={{ background: BRAND.pink }} />
      <span className="flex-1" style={{ background: BRAND.orange }} />
    </div>
  );
}

// Panel kanan: gambar promosi FBL (ditampilkan utuh, tidak dipotong)
function ImagePanel({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative hidden lg:flex items-center justify-center overflow-hidden bg-[#F4F7FA] dark:bg-[#0b0f17] p-8 xl:p-10">
      <div className="pointer-events-none absolute inset-x-0 top-0">
        <BrandStripe className="rounded-none h-1" />
      </div>
      <img
        src={src}
        alt={alt}
        className="max-h-[calc(100svh-5rem)] w-auto max-w-full rounded-2xl bg-white object-contain shadow-[0_20px_50px_-20px_rgba(15,23,42,0.25)] dark:brightness-90"
      />
    </div>
  );
}

export default function AuthShell({
  children,
  image,
  imageAlt,
  backHref = "/",
}: {
  children: React.ReactNode;
  image: string;
  imageAlt: string;
  backHref?: string;
}) {
  const t = useTranslations("AuthPanel");
  return (
    <div className="min-h-svh grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] bg-white dark:bg-[#050508]">
      <div className="relative flex flex-col px-5 py-6 sm:px-10 lg:px-14">
        <div className="flex items-center justify-between">
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("back")}
          </Link>
          <Link href="/" className="lg:hidden" aria-label="Forex for Better Living">
            <img src="/logo-fbl.png" alt="Forex for Better Living" className="h-8 w-auto dark:bg-white dark:rounded-md dark:px-1" />
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-[400px]">
            <BrandStripe className="mb-8 max-w-[72px]" />
            {children}
          </div>
        </div>
      </div>

      <ImagePanel src={image} alt={imageAlt} />
    </div>
  );
}
