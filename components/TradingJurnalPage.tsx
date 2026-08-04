"use client";

import dynamic from "next/dynamic";
import { motion, AnimatePresence, Variants, TargetAndTransition } from "framer-motion";
import {
  ArrowUpRight,
  TrendingUp,
  TrendingDown,
  BookOpen,
  Calendar,
  DollarSign,
  BarChart3,
  ChevronRight,
  Plus,
  X,
  Search,
  Trash2,
  Target,
  Activity,
  ShoppingCart,
  CheckCircle2,
  Star,
  MessageCircle,
  ShieldCheck,
  Clock,
  FileText,
  Award,
  Settings,
  PieChart,
  Layers,
  Smile,
  Frown,
  Meh,
  Zap,
  CalendarDays,
  Percent,
  Wallet,
  ArrowDownRight,
  ArrowUpLeft,
  Trophy,
  Hash,
  Timer,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";

const RightAnimationCard = dynamic(() => import("./RightAnimationCard"), {
  ssr: false,
});

// ─── WA Config ────────────────────────────────────────
const WA_NUMBER = "6285187555440";
const WA_MESSAGE = encodeURIComponent(
  "Halo, saya ingin membeli FBL Trading Journal seharga Rp 99.000. Mohon info cara pembayarannya.",
);

// ─── Types ─────────────────────────────────────────────
interface TradeLogEntry {
  id: number;
  date: string;
  timeOpen: string;
  type: "BUY" | "SELL";
  lots: number;
  symbol: string;
  openPrice: number;
  closePrice: number;
  stopLoss: number;
  takeProfit: number;
  timeClose: string;
  duration: string;
  fees: number;
  swap: number;
  grossPnL: number;
  netPnL: number;
  pips: number;
  rr: string;
  setup: string;
  entryQuality: string;
  emotion: string;
  notes: string;
  result: "WIN" | "LOSS" | "BREAK EVEN";
}

interface MonthlyData {
  month: string;
  begBal: number;
  fundTxfr: number;
  grossProfit: number;
  grossLoss: number;
  taxFees: number;
  endBal: number;
  netProfit: number;
  netPercent: number;
  trades: number;
  winRate: number;
  avgWin: number;
  avgLoss: number;
  rr: string;
  pf: number;
  netRR: string;
}

interface StatByInstrument {
  instrument: string;
  netProfit: number;
  trades: number;
  winPercent: number;
  avgWin: number;
  avgLoss: number;
  best: number;
  worst: number;
}

interface AnalyticsItem {
  item: string;
  trades: number;
  winPercent: number;
  netPnL: number;
  avgPnL: number;
}

// ─── Mock Data ───────────────────────────────────────
const tradeLogData: TradeLogEntry[] = [
  {
    id: 1,
    date: "2026-06-03",
    timeOpen: "09:30",
    type: "BUY",
    lots: 0.01,
    symbol: "XAUUSD",
    openPrice: 2345.0,
    closePrice: 2350.0,
    stopLoss: 2335.0,
    takeProfit: 2360.0,
    timeClose: "11:45",
    duration: "2h 15m",
    fees: 0,
    swap: 0,
    grossPnL: 58,
    netPnL: 58,
    pips: 580,
    rr: "1:4",
    setup: "Momentum",
    entryQuality: "As Planned",
    emotion: "Confident",
    notes: "Breakout dari resistance daily",
    result: "WIN",
  },
  {
    id: 2,
    date: "2026-06-02",
    timeOpen: "14:20",
    type: "SELL",
    lots: 0.02,
    symbol: "EURUSD",
    openPrice: 1.085,
    closePrice: 1.082,
    stopLoss: 1.088,
    takeProfit: 1.08,
    timeClose: "16:30",
    duration: "2h 10m",
    fees: 0,
    swap: 0,
    grossPnL: 60,
    netPnL: 60,
    pips: 30,
    rr: "1:2",
    setup: "Trend Follow",
    entryQuality: "As Planned",
    emotion: "Calm",
    notes: "Follow downtrend H4",
    result: "WIN",
  },
  {
    id: 3,
    date: "2026-06-01",
    timeOpen: "08:15",
    type: "BUY",
    lots: 0.01,
    symbol: "GBPJPY",
    openPrice: 185.45,
    closePrice: 185.15,
    stopLoss: 185.0,
    takeProfit: 186.0,
    timeClose: "10:00",
    duration: "1h 45m",
    fees: 0,
    swap: 0,
    grossPnL: -30,
    netPnL: -30,
    pips: -30,
    rr: "1:1.5",
    setup: "Bounce",
    entryQuality: "Too Early",
    emotion: "Anxious",
    notes: "Support pecah",
    result: "LOSS",
  },
];

const monthlyData: MonthlyData[] = [
  {
    month: "Jan 2026",
    begBal: 50000,
    fundTxfr: 0,
    grossProfit: 120,
    grossLoss: 30,
    taxFees: 0,
    endBal: 50090,
    netProfit: 90,
    netPercent: 0.18,
    trades: 5,
    winRate: 60,
    avgWin: 40,
    avgLoss: 15,
    rr: "1:2.5",
    pf: 2.67,
    netRR: "1:2",
  },
  {
    month: "Feb 2026",
    begBal: 50090,
    fundTxfr: 0,
    grossProfit: 200,
    grossLoss: 80,
    taxFees: 0,
    endBal: 50210,
    netProfit: 120,
    netPercent: 0.24,
    trades: 8,
    winRate: 62.5,
    avgWin: 40,
    avgLoss: 20,
    rr: "1:2",
    pf: 2.5,
    netRR: "1:1.8",
  },
  {
    month: "Mar 2026",
    begBal: 50210,
    fundTxfr: 0,
    grossProfit: 150,
    grossLoss: 50,
    taxFees: 0,
    endBal: 50310,
    netProfit: 100,
    netPercent: 0.2,
    trades: 6,
    winRate: 66.7,
    avgWin: 37.5,
    avgLoss: 16.7,
    rr: "1:2.2",
    pf: 3.0,
    netRR: "1:2",
  },
  {
    month: "Apr 2026",
    begBal: 50310,
    fundTxfr: 0,
    grossProfit: 180,
    grossLoss: 60,
    taxFees: 0,
    endBal: 50430,
    netProfit: 120,
    netPercent: 0.24,
    trades: 7,
    winRate: 57.1,
    avgWin: 45,
    avgLoss: 20,
    rr: "1:2.25",
    pf: 2.25,
    netRR: "1:2",
  },
  {
    month: "May 2026",
    begBal: 50430,
    fundTxfr: 0,
    grossProfit: 100,
    grossLoss: 40,
    taxFees: 0,
    endBal: 50490,
    netProfit: 60,
    netPercent: 0.12,
    trades: 4,
    winRate: 75,
    avgWin: 33.3,
    avgLoss: 20,
    rr: "1:1.67",
    pf: 1.67,
    netRR: "1:1.5",
  },
  {
    month: "Jun 2026",
    begBal: 50490,
    fundTxfr: 0,
    grossProfit: 88,
    grossLoss: 0,
    taxFees: 0,
    endBal: 50578,
    netProfit: 88,
    netPercent: 0.17,
    trades: 3,
    winRate: 66.7,
    avgWin: 44,
    avgLoss: 0,
    rr: "1:3",
    pf: 0,
    netRR: "1:2",
  },
];

const instrumentStats: StatByInstrument[] = [
  {
    instrument: "XAUUSD",
    netProfit: 58,
    trades: 1,
    winPercent: 100,
    avgWin: 58,
    avgLoss: 0,
    best: 58,
    worst: 58,
  },
  {
    instrument: "EURUSD",
    netProfit: 60,
    trades: 1,
    winPercent: 100,
    avgWin: 60,
    avgLoss: 0,
    best: 60,
    worst: 60,
  },
  {
    instrument: "GBPJPY",
    netProfit: -30,
    trades: 1,
    winPercent: 0,
    avgWin: 0,
    avgLoss: 30,
    best: 0,
    worst: -30,
  },
  {
    instrument: "USDJPY",
    netProfit: 0,
    trades: 0,
    winPercent: 0,
    avgWin: 0,
    avgLoss: 0,
    best: 0,
    worst: 0,
  },
  {
    instrument: "GBPUSD",
    netProfit: 0,
    trades: 0,
    winPercent: 0,
    avgWin: 0,
    avgLoss: 0,
    best: 0,
    worst: 0,
  },
];

const emotionAnalytics: AnalyticsItem[] = [
  { item: "Confident", trades: 1, winPercent: 100, netPnL: 58, avgPnL: 58 },
  { item: "Calm", trades: 1, winPercent: 100, netPnL: 60, avgPnL: 60 },
  { item: "Anxious", trades: 1, winPercent: 0, netPnL: -30, avgPnL: -30 },
  { item: "Fear", trades: 0, winPercent: 0, netPnL: 0, avgPnL: 0 },
  { item: "Hope", trades: 0, winPercent: 0, netPnL: 0, avgPnL: 0 },
  { item: "Greed", trades: 0, winPercent: 0, netPnL: 0, avgPnL: 0 },
  { item: "Bored", trades: 0, winPercent: 0, netPnL: 0, avgPnL: 0 },
  { item: "Impulse", trades: 0, winPercent: 0, netPnL: 0, avgPnL: 0 },
];

const setupAnalytics: AnalyticsItem[] = [
  { item: "Momentum", trades: 1, winPercent: 100, netPnL: 58, avgPnL: 58 },
  { item: "Trend Follow", trades: 1, winPercent: 100, netPnL: 60, avgPnL: 60 },
  { item: "Bounce", trades: 1, winPercent: 0, netPnL: -30, avgPnL: -30 },
  { item: "Swing Trade", trades: 0, winPercent: 0, netPnL: 0, avgPnL: 0 },
  { item: "Bottom Fishing", trades: 0, winPercent: 0, netPnL: 0, avgPnL: 0 },
];

const entryQualityAnalytics: AnalyticsItem[] = [
  { item: "As Planned", trades: 2, winPercent: 100, netPnL: 118, avgPnL: 59 },
  { item: "Too Early", trades: 1, winPercent: 0, netPnL: -30, avgPnL: -30 },
  { item: "Too Late", trades: 0, winPercent: 0, netPnL: 0, avgPnL: 0 },
  { item: "Not In Plan", trades: 0, winPercent: 0, netPnL: 0, avgPnL: 0 },
  { item: "Drone Rules", trades: 0, winPercent: 0, netPnL: 0, avgPnL: 0 },
];

const dayPerformance: AnalyticsItem[] = [
  { item: "Monday", trades: 1, winPercent: 100, netPnL: 58, avgPnL: 58 },
  { item: "Tuesday", trades: 1, winPercent: 100, netPnL: 60, avgPnL: 60 },
  { item: "Wednesday", trades: 1, winPercent: 0, netPnL: -30, avgPnL: -30 },
  { item: "Thursday", trades: 0, winPercent: 0, netPnL: 0, avgPnL: 0 },
  { item: "Friday", trades: 0, winPercent: 0, netPnL: 0, avgPnL: 0 },
];

const topPairs = [
  { pair: "XAUUSD", netPnL: 58, trades: 1 },
  { pair: "EURUSD", netPnL: 60, trades: 1 },
  { pair: "GBPJPY", netPnL: -30, trades: 1 },
  { pair: "USDJPY", netPnL: 0, trades: 0 },
  { pair: "GBPUSD", netPnL: 0, trades: 0 },
];

const setupPerformance = [
  { setup: "Momentum", netPnL: 58, trades: 1, winPercent: 100 },
  { setup: "Trend Follow", netPnL: 60, trades: 1, winPercent: 100 },
  { setup: "Bounce", netPnL: -30, trades: 1, winPercent: 0 },
  { setup: "Swing Trade", netPnL: 0, trades: 0, winPercent: 0 },
  { setup: "Bottom Fishing", netPnL: 0, trades: 0, winPercent: 0 },
];

// ─── Animation Variants ───────────────────────────────
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const floatAnimation: TargetAndTransition = {
  y: [0, -10, 0],
  transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
};

const pulseAnimation: TargetAndTransition = {
  scale: [1, 1.05, 1],
  transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
};

// ─── Components ───────────────────────────────────────

const SectionCard = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <motion.div
    variants={itemVariants}
    className={`bg-white dark:bg-[#0a0a12] border border-[#e5e7eb] dark:border-white/10 rounded-xl p-5 shadow-sm ${className}`}
  >
    {children}
  </motion.div>
);

const StatBadge = ({
  label,
  value,
  icon: Icon,
  color,
}: {
  label: string;
  value: string;
  icon: any;
  color: string;
}) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ scale: 1.03 }}
    className="bg-white dark:bg-[#0a0a12] border border-[#e5e7eb] dark:border-white/10 rounded-xl p-4 shadow-sm"
  >
    <div className="flex items-center gap-3">
      <div className={`p-2 rounded-lg ${color}`}>
        <Icon size={18} strokeWidth={1.5} className="text-white" />
      </div>
      <div>
        <p
          className="text-xs text-[#6e6e6e] dark:text-gray-400"
          style={{ fontFamily: "var(--font-figtree), Figtree" }}
        >
          {label}
        </p>
        <p
          className="text-lg font-semibold text-[#111A4A] dark:text-white"
          style={{ fontFamily: "var(--font-figtree), Figtree" }}
        >
          {value}
        </p>
      </div>
    </div>
  </motion.div>
);

const FeatureItem = ({
  icon: Icon,
  text,
}: {
  icon: React.ElementType;
  text: string;
}) => (
  <motion.div
    variants={itemVariants}
    className="flex items-center gap-3 text-[#111A4A]/80 dark:text-gray-300"
  >
    <div className="w-8 h-8 rounded-full bg-[#dcfce7] dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
      <Icon size={16} className="text-[#166534] dark:text-green-400" strokeWidth={2} />
    </div>
    <span
      className="text-sm font-medium"
      style={{ fontFamily: "var(--font-figtree), Figtree" }}
    >
      {text}
    </span>
  </motion.div>
);

const TabButton = ({
  active,
  onClick,
  label,
  icon: Icon,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  icon: any;
}) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
      active
        ? "bg-[#111A4A] dark:bg-[#22d3a8] text-white dark:text-gray-900"
        : "bg-[#f3f4f6] dark:bg-gray-800 text-[#6e6e6e] dark:text-gray-400 hover:bg-[#e5e7eb] dark:hover:bg-gray-700"
    }`}
    style={{ fontFamily: "var(--font-figtree), Figtree" }}
  >
    <Icon size={16} />
    {label}
  </button>
);

const TableHeader = ({ children }: { children: React.ReactNode }) => (
  <th className="text-left text-xs font-medium text-[#6e6e6e] dark:text-gray-400 uppercase tracking-wider px-3 py-2 border-b border-[#e5e7eb] dark:border-gray-700 bg-[#fafafa] dark:bg-gray-800/50">
    {children}
  </th>
);

const TableCell = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <td
    className={`text-sm px-3 py-2 border-b border-[#f3f4f6] dark:border-gray-800 ${className}`}
    style={{ fontFamily: "var(--font-figtree), Figtree" }}
  >
    {children}
  </td>
);

export const TradingJournalPage = () => {
  const t = useTranslations("TradingJournal");
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<
    | "dashboard"
    | "tradelog"
    | "monthly"
    | "statistics"
    | "analytics"
    | "calendar"
    | "settings"
  >("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [showBuyCard, setShowBuyCard] = useState(true);

  // Dashboard calculations
  const totalTrades = tradeLogData.length;
  const winTrades = tradeLogData.filter((e) => e.result === "WIN").length;
  const lossTrades = tradeLogData.filter((e) => e.result === "LOSS").length;
  const totalPnL = tradeLogData.reduce((sum, e) => sum + e.netPnL, 0);
  const winRate =
    totalTrades > 0 ? Math.round((winTrades / totalTrades) * 100) : 0;
  const longPnL = tradeLogData
    .filter((e) => e.type === "BUY")
    .reduce((sum, e) => sum + e.netPnL, 0);
  const shortPnL = tradeLogData
    .filter((e) => e.type === "SELL")
    .reduce((sum, e) => sum + e.netPnL, 0);
  const maxProfit = Math.max(...tradeLogData.map((e) => e.netPnL));
  const maxLoss = Math.min(...tradeLogData.map((e) => e.netPnL));
  const avgWin =
    winTrades > 0
      ? tradeLogData
          .filter((e) => e.result === "WIN")
          .reduce((sum, e) => sum + e.netPnL, 0) / winTrades
      : 0;
  const avgLoss =
    lossTrades > 0
      ? tradeLogData
          .filter((e) => e.result === "LOSS")
          .reduce((sum, e) => sum + e.netPnL, 0) / lossTrades
      : 0;

  const filteredTrades = tradeLogData.filter(
    (entry) =>
      entry.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.setup.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleBuy = () => {
    window.open(`https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`, "_blank");
  };

  const renderDashboard = () => (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Top Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatBadge
          label="Capital"
          value="$50,000"
          icon={Wallet}
          color="bg-[#111A4A]"
        />
        <StatBadge
          label="Net P&L"
          value={`$${totalPnL.toFixed(2)}`}
          icon={DollarSign}
          color={totalPnL >= 0 ? "bg-[#166534]" : "bg-[#991b1b]"}
        />
        <StatBadge
          label="Win Rate"
          value={`${winRate}%`}
          icon={Percent}
          color="bg-[#156d95]"
        />
        <StatBadge
          label="Total Trades"
          value={totalTrades.toString()}
          icon={BarChart3}
          color="bg-[#6e6e6e]"
        />
      </div>

      {/* Performance Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SectionCard>
          <h3
            className="text-sm font-semibold text-[#111A4A] mb-4 flex items-center gap-2"
            style={{ fontFamily: "var(--font-figtree), Figtree" }}
          >
            <PieChart size={16} /> Overall Performance
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[#6e6e6e]">Long Net P&L:</span>
              <span className="font-medium text-[#111A4A]">${longPnL}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6e6e6e]">Short Net P&L:</span>
              <span className="font-medium text-[#111A4A]">${shortPnL}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6e6e6e]">Total Net P&L:</span>
              <span
                className={`font-medium ${totalPnL >= 0 ? "text-[#166534]" : "text-[#991b1b]"}`}
              >
                ${totalPnL}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6e6e6e]">Win Trades:</span>
              <span className="font-medium text-[#166534]">{winTrades}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6e6e6e]">Loss Trades:</span>
              <span className="font-medium text-[#991b1b]">{lossTrades}</span>
            </div>
          </div>
        </SectionCard>

        <SectionCard>
          <h3
            className="text-sm font-semibold text-[#111A4A] mb-4 flex items-center gap-2"
            style={{ fontFamily: "var(--font-figtree), Figtree" }}
          >
            <TrendingDown size={16} /> Drawdown & Streak
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[#6e6e6e]">Max Drawdown ($):</span>
              <span className="font-medium text-[#111A4A]">$58</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6e6e6e]">Max Drawdown %:</span>
              <span className="font-medium text-[#111A4A]">0.12%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6e6e6e]">Total Wins:</span>
              <span className="font-medium text-[#166534]">{winTrades}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6e6e6e]">Total Losses:</span>
              <span className="font-medium text-[#991b1b]">{lossTrades}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6e6e6e]">Max Profit Trade:</span>
              <span className="font-medium text-[#166534]">${maxProfit}</span>
            </div>
          </div>
        </SectionCard>

        <SectionCard>
          <h3
            className="text-sm font-semibold text-[#111A4A] mb-4 flex items-center gap-2"
            style={{ fontFamily: "var(--font-figtree), Figtree" }}
          >
            <Target size={16} /> Win Rate & Profit Stats
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[#6e6e6e]">Win Rate %:</span>
              <span className="font-medium text-[#111A4A]">{winRate}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6e6e6e]">Avg Win ($):</span>
              <span className="font-medium text-[#166534]">
                ${avgWin.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6e6e6e]">Avg Loss ($):</span>
              <span className="font-medium text-[#991b1b]">
                ${avgLoss.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6e6e6e]">Best Trade:</span>
              <span className="font-medium text-[#166534]">${maxProfit}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6e6e6e]">Worst Trade:</span>
              <span className="font-medium text-[#991b1b]">${maxLoss}</span>
            </div>
          </div>
        </SectionCard>

        <SectionCard>
          <h3
            className="text-sm font-semibold text-[#111A4A] mb-4 flex items-center gap-2"
            style={{ fontFamily: "var(--font-figtree), Figtree" }}
          >
            <Hash size={16} /> Statistics
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[#6e6e6e]">Largest Profit:</span>
              <span className="font-medium text-[#166534]">${maxProfit}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6e6e6e]">Largest Loss:</span>
              <span className="font-medium text-[#991b1b]">${maxLoss}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6e6e6e]">Avg Win/Trade:</span>
              <span className="font-medium text-[#111A4A]">
                ${avgWin.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6e6e6e]">Avg Loss/Trade:</span>
              <span className="font-medium text-[#111A4A]">
                ${avgLoss.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6e6e6e]">Expectancy:</span>
              <span className="font-medium text-[#111A4A]">
                ${(totalPnL / totalTrades).toFixed(2)}
              </span>
            </div>
          </div>
        </SectionCard>
      </div>

      {/* Top Pairs & Setup Performance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SectionCard>
          <h3
            className="text-sm font-semibold text-[#111A4A] mb-4 flex items-center gap-2"
            style={{ fontFamily: "var(--font-figtree), Figtree" }}
          >
            <Trophy size={16} /> Top Currency Pairs
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <TableHeader>Pair</TableHeader>
                  <TableHeader>Net P&L</TableHeader>
                  <TableHeader>Trades</TableHeader>
                </tr>
              </thead>
              <tbody>
                {topPairs.map((p) => (
                  <tr key={p.pair} className="hover:bg-[#fafafa]">
                    <TableCell>{p.pair}</TableCell>
                    <TableCell
                      className={
                        p.netPnL >= 0 ? "text-[#166534]" : "text-[#991b1b]"
                      }
                    >
                      ${p.netPnL}
                    </TableCell>
                    <TableCell>{p.trades}</TableCell>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        <SectionCard>
          <h3
            className="text-sm font-semibold text-[#111A4A] mb-4 flex items-center gap-2"
            style={{ fontFamily: "var(--font-figtree), Figtree" }}
          >
            <Zap size={16} /> Performance by Setup
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <TableHeader>Setup</TableHeader>
                  <TableHeader>Net P&L</TableHeader>
                  <TableHeader>Trades</TableHeader>
                  <TableHeader>Win%</TableHeader>
                </tr>
              </thead>
              <tbody>
                {setupPerformance.map((s) => (
                  <tr key={s.setup} className="hover:bg-[#fafafa]">
                    <TableCell>{s.setup}</TableCell>
                    <TableCell
                      className={
                        s.netPnL >= 0 ? "text-[#166534]" : "text-[#991b1b]"
                      }
                    >
                      ${s.netPnL}
                    </TableCell>
                    <TableCell>{s.trades}</TableCell>
                    <TableCell>{s.winPercent}%</TableCell>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      </div>
    </motion.div>
  );

  const renderTradeLog = () => (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6e6e6e]"
          />
          <input
            type="text"
            placeholder={`${t("date")} / ${t("instrument")}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-[#e5e7eb] rounded-lg text-sm focus:outline-none focus:border-[#156d95] text-[#111A4A]"
            style={{ fontFamily: "var(--font-figtree), Figtree" }}
          />
        </div>
      </div>
      <div className="overflow-x-auto bg-white border border-[#e5e7eb] rounded-xl shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr>
              <TableHeader>No</TableHeader>
              <TableHeader>Date</TableHeader>
              <TableHeader>Type</TableHeader>
              <TableHeader>Symbol</TableHeader>
              <TableHeader>Lots</TableHeader>
              <TableHeader>Open</TableHeader>
              <TableHeader>Close</TableHeader>
              <TableHeader>SL</TableHeader>
              <TableHeader>TP</TableHeader>
              <TableHeader>P&L</TableHeader>
              <TableHeader>Pips</TableHeader>
              <TableHeader>R:R</TableHeader>
              <TableHeader>Setup</TableHeader>
              <TableHeader>Emotion</TableHeader>
              <TableHeader>Result</TableHeader>
            </tr>
          </thead>
          <tbody>
            {filteredTrades.map((trade) => (
              <motion.tr
                key={trade.id}
                variants={itemVariants}
                whileHover={{ backgroundColor: "#fafafa" }}
                className="border-b border-[#f3f4f6]"
              >
                <TableCell>{trade.id}</TableCell>
                <TableCell>{trade.date}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${trade.type === "BUY" ? "bg-[#dcfce7] text-[#166534]" : "bg-[#fee2e2] text-[#991b1b]"}`}
                  >
                    {trade.type === "BUY" ? (
                      <ArrowUpLeft size={12} className="mr-1" />
                    ) : (
                      <ArrowDownRight size={12} className="mr-1" />
                    )}
                    {trade.type}
                  </span>
                </TableCell>
                <TableCell className="font-medium">{trade.symbol}</TableCell>
                <TableCell>{trade.lots}</TableCell>
                <TableCell>{trade.openPrice}</TableCell>
                <TableCell>{trade.closePrice}</TableCell>
                <TableCell>{trade.stopLoss}</TableCell>
                <TableCell>{trade.takeProfit}</TableCell>
                <TableCell
                  className={
                    trade.netPnL >= 0
                      ? "text-[#166534] font-medium"
                      : "text-[#991b1b] font-medium"
                  }
                >
                  {trade.netPnL > 0 ? "+" : ""}${trade.netPnL}
                </TableCell>
                <TableCell>{trade.pips}</TableCell>
                <TableCell>{trade.rr}</TableCell>
                <TableCell>{trade.setup}</TableCell>
                <TableCell>{trade.emotion}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      trade.result === "WIN"
                        ? "bg-[#dcfce7] text-[#166534]"
                        : trade.result === "LOSS"
                          ? "bg-[#fee2e2] text-[#991b1b]"
                          : "bg-[#f3f4f6] text-[#374151]"
                    }`}
                  >
                    {trade.result}
                  </span>
                </TableCell>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );

  const renderMonthly = () => (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      <SectionCard>
        <h3
          className="text-sm font-semibold text-[#111A4A] mb-4 flex items-center gap-2"
          style={{ fontFamily: "var(--font-figtree), Figtree" }}
        >
          <CalendarDays size={16} /> Monthly Performance Report
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <TableHeader>Month</TableHeader>
                <TableHeader>Beg. Bal</TableHeader>
                <TableHeader>Gross Profit</TableHeader>
                <TableHeader>Gross Loss</TableHeader>
                <TableHeader>End Bal</TableHeader>
                <TableHeader>Net Profit</TableHeader>
                <TableHeader>Net %</TableHeader>
                <TableHeader>Trades</TableHeader>
                <TableHeader>Win Rate</TableHeader>
                <TableHeader>Avg Win</TableHeader>
                <TableHeader>Avg Loss</TableHeader>
                <TableHeader>R:R</TableHeader>
                <TableHeader>P.F.</TableHeader>
              </tr>
            </thead>
            <tbody>
              {monthlyData.map((m) => (
                <motion.tr
                  key={m.month}
                  variants={itemVariants}
                  whileHover={{ backgroundColor: "#fafafa" }}
                  className="border-b border-[#f3f4f6]"
                >
                  <TableCell className="font-medium">{m.month}</TableCell>
                  <TableCell>${m.begBal.toLocaleString()}</TableCell>
                  <TableCell className="text-[#166534]">
                    ${m.grossProfit}
                  </TableCell>
                  <TableCell className="text-[#991b1b]">
                    ${m.grossLoss}
                  </TableCell>
                  <TableCell className="font-medium">
                    ${m.endBal.toLocaleString()}
                  </TableCell>
                  <TableCell
                    className={
                      m.netProfit >= 0
                        ? "text-[#166534] font-medium"
                        : "text-[#991b1b] font-medium"
                    }
                  >
                    {m.netProfit > 0 ? "+" : ""}${m.netProfit}
                  </TableCell>
                  <TableCell>{m.netPercent}%</TableCell>
                  <TableCell>{m.trades}</TableCell>
                  <TableCell>{m.winRate}%</TableCell>
                  <TableCell>${m.avgWin}</TableCell>
                  <TableCell>${m.avgLoss}</TableCell>
                  <TableCell>{m.rr}</TableCell>
                  <TableCell>{m.pf}</TableCell>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </motion.div>
  );

  const renderStatistics = () => (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      <SectionCard>
        <h3
          className="text-sm font-semibold text-[#111A4A] mb-4 flex items-center gap-2"
          style={{ fontFamily: "var(--font-figtree), Figtree" }}
        >
          <BarChart3 size={16} /> Trade Statistics by Instrument
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <TableHeader>Instrument</TableHeader>
                <TableHeader>Net Profit</TableHeader>
                <TableHeader>Trades</TableHeader>
                <TableHeader>Win%</TableHeader>
                <TableHeader>Avg Win</TableHeader>
                <TableHeader>Avg Loss</TableHeader>
                <TableHeader>Best</TableHeader>
                <TableHeader>Worst</TableHeader>
              </tr>
            </thead>
            <tbody>
              {instrumentStats.map((s) => (
                <motion.tr
                  key={s.instrument}
                  variants={itemVariants}
                  whileHover={{ backgroundColor: "#fafafa" }}
                  className="border-b border-[#f3f4f6]"
                >
                  <TableCell className="font-medium">{s.instrument}</TableCell>
                  <TableCell
                    className={
                      s.netProfit >= 0 ? "text-[#166534]" : "text-[#991b1b]"
                    }
                  >
                    ${s.netProfit}
                  </TableCell>
                  <TableCell>{s.trades}</TableCell>
                  <TableCell>{s.winPercent}%</TableCell>
                  <TableCell>${s.avgWin}</TableCell>
                  <TableCell>${s.avgLoss}</TableCell>
                  <TableCell className="text-[#166534]">${s.best}</TableCell>
                  <TableCell className="text-[#991b1b]">${s.worst}</TableCell>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </motion.div>
  );

  const renderAnalytics = () => (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      <SectionCard>
        <h3
          className="text-sm font-semibold text-[#111A4A] mb-4 flex items-center gap-2"
          style={{ fontFamily: "var(--font-figtree), Figtree" }}
        >
          <Smile size={16} /> Emotion Analysis
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <TableHeader>Emotion</TableHeader>
                <TableHeader>Trades</TableHeader>
                <TableHeader>Win%</TableHeader>
                <TableHeader>Net P&L</TableHeader>
                <TableHeader>Avg P&L</TableHeader>
              </tr>
            </thead>
            <tbody>
              {emotionAnalytics.map((e) => (
                <motion.tr
                  key={e.item}
                  variants={itemVariants}
                  whileHover={{ backgroundColor: "#fafafa" }}
                  className="border-b border-[#f3f4f6]"
                >
                  <TableCell className="font-medium">{e.item}</TableCell>
                  <TableCell>{e.trades}</TableCell>
                  <TableCell>{e.winPercent}%</TableCell>
                  <TableCell
                    className={
                      e.netPnL >= 0 ? "text-[#166534]" : "text-[#991b1b]"
                    }
                  >
                    ${e.netPnL}
                  </TableCell>
                  <TableCell>${e.avgPnL}</TableCell>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      <SectionCard>
        <h3
          className="text-sm font-semibold text-[#111A4A] mb-4 flex items-center gap-2"
          style={{ fontFamily: "var(--font-figtree), Figtree" }}
        >
          <Zap size={16} /> Setup Analysis
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <TableHeader>Setup</TableHeader>
                <TableHeader>Trades</TableHeader>
                <TableHeader>Win%</TableHeader>
                <TableHeader>Net P&L</TableHeader>
                <TableHeader>Avg P&L</TableHeader>
              </tr>
            </thead>
            <tbody>
              {setupAnalytics.map((s) => (
                <motion.tr
                  key={s.item}
                  variants={itemVariants}
                  whileHover={{ backgroundColor: "#fafafa" }}
                  className="border-b border-[#f3f4f6]"
                >
                  <TableCell className="font-medium">{s.item}</TableCell>
                  <TableCell>{s.trades}</TableCell>
                  <TableCell>{s.winPercent}%</TableCell>
                  <TableCell
                    className={
                      s.netPnL >= 0 ? "text-[#166534]" : "text-[#991b1b]"
                    }
                  >
                    ${s.netPnL}
                  </TableCell>
                  <TableCell>${s.avgPnL}</TableCell>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      <SectionCard>
        <h3
          className="text-sm font-semibold text-[#111A4A] mb-4 flex items-center gap-2"
          style={{ fontFamily: "var(--font-figtree), Figtree" }}
        >
          <CheckCircle2 size={16} /> Entry Quality
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <TableHeader>Quality</TableHeader>
                <TableHeader>Trades</TableHeader>
                <TableHeader>Win%</TableHeader>
                <TableHeader>Net P&L</TableHeader>
                <TableHeader>Avg P&L</TableHeader>
              </tr>
            </thead>
            <tbody>
              {entryQualityAnalytics.map((e) => (
                <motion.tr
                  key={e.item}
                  variants={itemVariants}
                  whileHover={{ backgroundColor: "#fafafa" }}
                  className="border-b border-[#f3f4f6]"
                >
                  <TableCell className="font-medium">{e.item}</TableCell>
                  <TableCell>{e.trades}</TableCell>
                  <TableCell>{e.winPercent}%</TableCell>
                  <TableCell
                    className={
                      e.netPnL >= 0 ? "text-[#166534]" : "text-[#991b1b]"
                    }
                  >
                    ${e.netPnL}
                  </TableCell>
                  <TableCell>${e.avgPnL}</TableCell>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      <SectionCard>
        <h3
          className="text-sm font-semibold text-[#111A4A] mb-4 flex items-center gap-2"
          style={{ fontFamily: "var(--font-figtree), Figtree" }}
        >
          <Calendar size={16} /> Performance by Day
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <TableHeader>Day</TableHeader>
                <TableHeader>Trades</TableHeader>
                <TableHeader>Win%</TableHeader>
                <TableHeader>Net P&L</TableHeader>
                <TableHeader>Avg P&L</TableHeader>
              </tr>
            </thead>
            <tbody>
              {dayPerformance.map((d) => (
                <motion.tr
                  key={d.item}
                  variants={itemVariants}
                  whileHover={{ backgroundColor: "#fafafa" }}
                  className="border-b border-[#f3f4f6]"
                >
                  <TableCell className="font-medium">{d.item}</TableCell>
                  <TableCell>{d.trades}</TableCell>
                  <TableCell>{d.winPercent}%</TableCell>
                  <TableCell
                    className={
                      d.netPnL >= 0 ? "text-[#166534]" : "text-[#991b1b]"
                    }
                  >
                    ${d.netPnL}
                  </TableCell>
                  <TableCell>${d.avgPnL}</TableCell>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </motion.div>
  );

  const renderCalendar = () => {
    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
    const firstDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1,
    ).getDay();
    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0,
    ).getDate();
    const tradeDates = tradeLogData.map((t) => new Date(t.date).getDate());

    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        <SectionCard>
          <h3
            className="text-sm font-semibold text-[#111A4A] mb-4 flex items-center gap-2"
            style={{ fontFamily: "var(--font-figtree), Figtree" }}
          >
            <CalendarDays size={16} /> Trading Calendar — {currentMonth}
          </h3>
          <div className="grid grid-cols-7 gap-1">
            {days.map((d) => (
              <div
                key={d}
                className="text-center text-xs font-medium text-[#6e6e6e] py-2"
              >
                {d}
              </div>
            ))}
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const hasTrade = tradeDates.includes(day);
              const isToday = day === currentDate.getDate();
              return (
                <motion.div
                  key={day}
                  variants={itemVariants}
                  whileHover={{ scale: 1.1 }}
                  className={`aspect-square flex items-center justify-center rounded-lg text-sm font-medium cursor-pointer ${
                    isToday
                      ? "bg-[#111A4A] text-white"
                      : hasTrade
                        ? "bg-[#dcfce7] text-[#166534] border border-[#bbf7d0]"
                        : "bg-[#f3f4f6] text-[#6e6e6e] hover:bg-[#e5e7eb]"
                  }`}
                >
                  {day}
                </motion.div>
              );
            })}
          </div>
        </SectionCard>
      </motion.div>
    );
  };

  const renderSettings = () => (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      <SectionCard>
        <h3
          className="text-sm font-semibold text-[#111A4A] mb-4 flex items-center gap-2"
          style={{ fontFamily: "var(--font-figtree), Figtree" }}
        >
          <Settings size={16} /> Account Settings
        </h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-[#6e6e6e]">Account Name:</span>
            <span className="font-medium text-[#111A4A]">
              My Trading Account
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#6e6e6e]">Account Currency:</span>
            <span className="font-medium text-[#111A4A]">USD</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#6e6e6e]">Starting Capital:</span>
            <span className="font-medium text-[#111A4A]">$50,000</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#6e6e6e]">Leverage:</span>
            <span className="font-medium text-[#111A4A]">1:100</span>
          </div>
        </div>
      </SectionCard>

      <SectionCard>
        <h3
          className="text-sm font-semibold text-[#111A4A] mb-4 flex items-center gap-2"
          style={{ fontFamily: "var(--font-figtree), Figtree" }}
        >
          <ShieldCheck size={16} /> Risk Settings
        </h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-[#6e6e6e]">Equity % to Risk:</span>
            <span className="font-medium text-[#111A4A]">1%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#6e6e6e]">Max Trades/Day:</span>
            <span className="font-medium text-[#111A4A]">20</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#6e6e6e]">Risk:Reward Min:</span>
            <span className="font-medium text-[#111A4A]">1:2</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#6e6e6e]">Default SL (pips):</span>
            <span className="font-medium text-[#111A4A]">20</span>
          </div>
        </div>
      </SectionCard>

      <SectionCard className="md:col-span-2">
        <h3
          className="text-sm font-semibold text-[#111A4A] mb-4 flex items-center gap-2"
          style={{ fontFamily: "var(--font-figtree), Figtree" }}
        >
          <Layers size={16} /> Trade Setup Definitions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            {
              setup: "Momentum",
              desc: "Trade following strong momentum breakouts",
            },
            {
              setup: "Trend Follow",
              desc: "Trading in direction of major trend",
            },
            { setup: "Bounce", desc: "Counter-trend bounce from key levels" },
            { setup: "Swing Trade", desc: "Multi-day position trading" },
            {
              setup: "Bottom Fishing",
              desc: "Buying at support / oversold levels",
            },
          ].map((s) => (
            <motion.div
              key={s.setup}
              variants={itemVariants}
              className="bg-[#fafafa] dark:bg-gray-800/50 rounded-lg p-3 border border-[#e5e7eb] dark:border-gray-700"
            >
              <p className="font-medium text-[#111A4A] dark:text-white text-sm">{s.setup}</p>
              <p className="text-xs text-[#6e6e6e] dark:text-gray-400 mt-1">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </SectionCard>
    </motion.div>
  );

  return (
    <section className="w-full pt-24 md:pt-32 pb-20 bg-white dark:bg-[#050508] transition-colors duration-500 min-h-screen text-[#111A4A] dark:text-gray-200">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-5 lg:gap-16 px-8 md:px-12">
        {/* ─── LEFT: MAIN CONTENT ─── */}
        <div className="col-span-12 lg:col-span-8 flex flex-col">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <a
              onClick={(e) => e.preventDefault()}
              className="flex items-center gap-1 text-[#6e6e6e] mb-4 cursor-pointer"
            >
              <span className="text-xs uppercase tracking-tight font-mono flex items-center gap-1 hover:text-[#202020] dark:hover:text-white">
                FBL Trading Journal <ArrowUpRight size={14} strokeWidth={1.5} />
              </span>
            </a>

            <h1
              className="text-[40px] font-normal leading-tight tracking-tight text-[#111A4A] dark:text-white mb-4"
              style={{
                fontFamily: "var(--font-figtree), Figtree",
                fontSize: "50px",
                fontWeight: "500",
              }}
            >
              FBL Trading Journal
            </h1>

            <p
              className="text-lg leading-6 text-[#111A4A] dark:text-gray-300 opacity-60 dark:opacity-80 mt-0 mb-6"
              style={{ fontFamily: "var(--font-figtree), Figtree" }}
            >
              {t("title")}
            </p>

            {/* Buy Card */}
            <AnimatePresence>
              {showBuyCard && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-gradient-to-br from-[#111A4A] to-[#156d95] rounded-2xl p-6 mb-8 text-white relative overflow-hidden"
                >
                  <motion.div
                    animate={{ x: [0, 100, 0], opacity: [0, 0.1, 0] }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-0 bg-white"
                    style={{ transform: "skewX(-20deg)" }}
                  />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Star
                          size={16}
                          className="text-yellow-400 fill-yellow-400"
                        />
                        <span className="text-sm font-medium text-white/80">
                          {t("featuredProduct")}
                        </span>
                      </div>
                      <button
                        onClick={() => setShowBuyCard(false)}
                        className="text-white/50 hover:text-white"
                      >
                        <X size={18} />
                      </button>
                    </div>
                    <div className="flex items-baseline gap-2 mb-4">
                      <span
                        className="text-4xl font-bold"
                        style={{ fontFamily: "var(--font-figtree), Figtree" }}
                      >
                        Rp 99.000
                      </span>
                      <span className="text-white/50 line-through text-lg">
                        Rp 299.000
                      </span>
                    </div>
                    <p className="text-sm text-white/70 mb-5">
                      {t("buyDesc")}
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      animate={pulseAnimation}
                      onClick={handleBuy}
                      className="w-full sm:w-auto inline-flex items-center justify-center bg-white text-[#111A4A] rounded-xl px-8 py-4 text-base font-semibold shadow-lg hover:shadow-xl transition-shadow"
                    >
                      <ShoppingCart size={20} className="mr-2" />
                      {t("buyNow")}
                      <MessageCircle
                        size={20}
                        className="ml-2 text-green-600"
                      />
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Features */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 gap-4 mb-8"
            >
              <FeatureItem icon={FileText} text="Dashboard & Trade Log" />
              <FeatureItem icon={BarChart3} text="Monthly Report" />
              <FeatureItem icon={PieChart} text="Statistics & Analytics" />
              <FeatureItem icon={CalendarDays} text="Trading Calendar" />
              <FeatureItem icon={Settings} text="Risk & Account Settings" />
              <FeatureItem icon={MessageCircle} text="Support via WhatsApp" />
            </motion.div>
          </motion.div>

          {/* Tabs */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-2 mb-6 overflow-x-auto pb-2"
          >
            <TabButton
              active={activeTab === "dashboard"}
              onClick={() => setActiveTab("dashboard")}
              label="Dashboard"
              icon={BarChart3}
            />
            <TabButton
              active={activeTab === "tradelog"}
              onClick={() => setActiveTab("tradelog")}
              label="Trade Log"
              icon={FileText}
            />
            <TabButton
              active={activeTab === "monthly"}
              onClick={() => setActiveTab("monthly")}
              label="Monthly"
              icon={CalendarDays}
            />
            <TabButton
              active={activeTab === "statistics"}
              onClick={() => setActiveTab("statistics")}
              label="Statistics"
              icon={PieChart}
            />
            <TabButton
              active={activeTab === "analytics"}
              onClick={() => setActiveTab("analytics")}
              label="Analytics"
              icon={Activity}
            />
            <TabButton
              active={activeTab === "calendar"}
              onClick={() => setActiveTab("calendar")}
              label="Calendar"
              icon={Calendar}
            />
            <TabButton
              active={activeTab === "settings"}
              onClick={() => setActiveTab("settings")}
              label="Settings"
              icon={Settings}
            />
          </motion.div>

          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === "dashboard" && renderDashboard()}
              {activeTab === "tradelog" && renderTradeLog()}
              {activeTab === "monthly" && renderMonthly()}
              {activeTab === "statistics" && renderStatistics()}
              {activeTab === "analytics" && renderAnalytics()}
              {activeTab === "calendar" && renderCalendar()}
              {activeTab === "settings" && renderSettings()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ─── RIGHT: SIDEBAR ─── */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          {/* Stats Summary */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 gap-3"
          >
            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-[#0a0a12] border border-[#e5e7eb] dark:border-white/10 rounded-xl p-4 shadow-sm"
            >
              <p className="text-xs text-[#6e6e6e] dark:text-gray-400 mb-1">Total Trades</p>
              <p
                className="text-xl font-bold text-[#111A4A] dark:text-white"
                style={{ fontFamily: "var(--font-figtree), Figtree" }}
              >
                {totalTrades}
              </p>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-[#0a0a12] border border-[#e5e7eb] dark:border-white/10 rounded-xl p-4 shadow-sm"
            >
              <p className="text-xs text-[#6e6e6e] dark:text-gray-400 mb-1">Win Rate</p>
              <p
                className="text-xl font-bold text-[#111A4A] dark:text-white"
                style={{ fontFamily: "var(--font-figtree), Figtree" }}
              >
                {winRate}%
              </p>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-[#0a0a12] border border-[#e5e7eb] dark:border-white/10 rounded-xl p-4 shadow-sm"
            >
              <p className="text-xs text-[#6e6e6e] dark:text-gray-400 mb-1">Net P&L</p>
              <p
                className={`text-xl font-bold ${totalPnL >= 0 ? "text-[#166534] dark:text-[#22d3a8]" : "text-[#991b1b] dark:text-red-400"}`}
                style={{ fontFamily: "var(--font-figtree), Figtree" }}
              >
                {totalPnL >= 0 ? "+" : ""}${totalPnL}
              </p>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-[#0a0a12] border border-[#e5e7eb] dark:border-white/10 rounded-xl p-4 shadow-sm"
            >
              <p className="text-xs text-[#6e6e6e] dark:text-gray-400 mb-1">Profit Factor</p>
              <p
                className="text-xl font-bold text-[#111A4A] dark:text-white"
                style={{ fontFamily: "var(--font-figtree), Figtree" }}
              >
                2.5
              </p>
            </motion.div>
          </motion.div>

          {/* Animation Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-center justify-center"
          >
            <motion.div
              animate={floatAnimation}
              className="relative w-auto max-w-[380px] h-auto"
            >
              <RightAnimationCard />
            </motion.div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="bg-[#111A4A] rounded-xl p-5 text-white"
          >
            <h3
              className="font-medium mb-3 flex items-center gap-2"
              style={{ fontFamily: "var(--font-figtree), Figtree" }}
            >
              <Activity size={18} /> Quick Overview
            </h3>
            <div className="space-y-2 text-sm text-white/70">
              <div className="flex justify-between">
                <span>Long Net P&L:</span>
                <span className="text-white">${longPnL}</span>
              </div>
              <div className="flex justify-between">
                <span>Short Net P&L:</span>
                <span className="text-white">${shortPnL}</span>
              </div>
              <div className="flex justify-between">
                <span>Max Drawdown:</span>
                <span className="text-white">$58</span>
              </div>
              <div className="flex justify-between">
                <span>Expectancy:</span>
                <span className="text-white">
                  ${(totalPnL / totalTrades).toFixed(2)}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Buy CTA Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-gradient-to-br from-[#156d95] to-[#111A4A] rounded-xl p-5 text-white"
          >
            <h3
              className="font-medium mb-2"
              style={{ fontFamily: "var(--font-figtree), Figtree" }}
            >
              Dapatkan Template Lengkap
            </h3>
            <p className="text-sm text-white/70 mb-4">
              {t("buyDesc")}
            </p>
            <div className="flex items-baseline gap-2 mb-4">
              <span
                className="text-2xl font-bold"
                style={{ fontFamily: "var(--font-figtree), Figtree" }}
              >
                Rp 99.000
              </span>
              <span className="text-white/50 line-through text-sm">
                Rp 299.000
              </span>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleBuy}
              className="w-full inline-flex items-center justify-center bg-white text-[#111A4A] rounded-lg px-4 py-3 text-sm font-semibold"
            >
              <MessageCircle size={18} className="mr-2 text-green-600" />
              {t("buyNow")}
            </motion.button>
          </motion.div>

          {/* Trust
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="bg-[#fafafa] border border-[#e5e7eb] rounded-xl p-5"
          >
            <div className="flex items-center gap-3 mb-3">
              <CheckCircle2 size={20} className="text-[#166534]" />
              <h4
                className="font-medium text-[#111A4A]"
                style={{ fontFamily: "var(--font-figtree), Figtree" }}
              >
                Garansi 7 Hari
              </h4>
            </div>
            <p
              className="text-sm text-[#6e6e6e]"
              style={{ fontFamily: "var(--font-figtree), Figtree" }}
            >
              Tidak puas? Uang kembali 100% dalam 7 hari setelah pembelian.
            </p>
          </motion.div> */}
        </div>
      </div>
    </section>
  );
};
