import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Daftar Akun – Mulai Belajar Forex",
  description:
    "Buat akun Forex for Better Living gratis dan mulai belajar forex, trading, dan EA trading bersama mentor profesional.",
  path: "/signup",
  keywords: ["daftar kelas forex","daftar belajar trading"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
