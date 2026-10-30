import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "EA Trading & Robot Trading Forex MT4/MT5",
  description:
    "EA trading dan robot trading forex dari Forex for Better Living: expert advisor MT4/MT5 dengan manajemen risiko terukur, backtest transparan, dan free trial 30 hari. Trading forex otomatis yang lebih konsisten.",
  path: "/robot-trading",
  keywords: ["EA trading","robot trading","robot trading forex","EA forex terbaik","expert advisor MT4","expert advisor MT5","auto trading forex","EA gold","robot forex"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
