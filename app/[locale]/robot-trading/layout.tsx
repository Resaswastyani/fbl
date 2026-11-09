import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "EA Trading & Robot Trading Forex MT4/MT5",
  description:
    "EA trading & robot trading forex MT4/MT5 dari FBL: manajemen risiko terukur, backtest transparan, dan free trial 30 hari untuk trading otomatis.",
  path: "/robot-trading",
  keywords: ["EA trading","robot trading","robot trading forex","EA forex terbaik","expert advisor MT4","expert advisor MT5","auto trading forex","EA gold","robot forex"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
