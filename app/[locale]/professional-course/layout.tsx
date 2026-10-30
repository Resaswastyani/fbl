import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Kursus Forex Profesional – Belajar Trading Forex dari Nol",
  description:
    "Kursus forex dan kelas trading profesional dari dasar hingga mahir: analisa teknikal, money management, risk management, dan strategi trading konsisten bersama mentor berpengalaman.",
  path: "/professional-course",
  keywords: ["kursus forex","kelas trading","belajar forex dari nol","belajar trading forex","kursus trading online","sekolah forex","edukasi trading"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
