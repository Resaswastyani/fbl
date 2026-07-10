"use client";

import { motion, AnimatePresence, animate } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  AreaChart,
  Area,
  LineChart,
  Line,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  ChevronDown,
  Cpu,
  Shield,
  AlertTriangle,
  BarChart3,
  ArrowUp,
  CandlestickChart,
  CheckCircle2,
} from "lucide-react";

const robots = [
  {
    id: "fbl_agresif2",
    name: "FBL_AO_XAUUSD_M1.Ex5 (Agresif 2)",
    startCapital: 100000,
    totalTrades: 40386,
    mode: "Regime Dependent",
    // Summary statistics from real data
    peakBalance: 8672134,
    worstDrawdown: 1.74,
    lowestMarginLevel: 457,
    avgHistoryQuality: 100,
    avgHighLow: 204,
    monthly: [
      { month: "Jan 25", profit: -522, maxDD: 0.52, peakBalance: 100000, marginLevel: 3838, historyQuality: 100, highLow: 203 },
      { month: "Feb 25", profit: -222, maxDD: 1.40, peakBalance: 100009, marginLevel: 1817, historyQuality: 100, highLow: 184 },
      { month: "Mar 25", profit: -281, maxDD: 0.60, peakBalance: 100000, marginLevel: 1945, historyQuality: 100, highLow: 270 },
      { month: "Apr 25", profit: -1494, maxDD: 1.74, peakBalance: 103975, marginLevel: 491, historyQuality: 100, highLow: 544 },
      { month: "Mei 25", profit: 71028, maxDD: 0.00, peakBalance: 177006, marginLevel: 499, historyQuality: 100, highLow: 315 },
      { month: "Jun 25", profit: 8288, maxDD: 0.31, peakBalance: 110493, marginLevel: 505, historyQuality: 100, highLow: 204 },
      { month: "Jul 25", profit: -368, maxDD: 0.62, peakBalance: 100752, marginLevel: 601, historyQuality: 100, highLow: 171 },
      { month: "Aug 25", profit: 3347, maxDD: 0.40, peakBalance: 103420, marginLevel: 583, historyQuality: 100, highLow: 172 },
      { month: "Sep 25", profit: 14643, maxDD: 0.00, peakBalance: 118912, marginLevel: 479, historyQuality: 100, highLow: 435 },
      { month: "Okt 25", profit: 951581, maxDD: 0.78, peakBalance: 1057329, marginLevel: 469, historyQuality: 100, highLow: 562 },
      { month: "Nov 25", profit: 36912, maxDD: 0.86, peakBalance: 158494, marginLevel: 464, historyQuality: 100, highLow: 317 },
      { month: "Des 25", profit: 10987, maxDD: 1.57, peakBalance: 111235, marginLevel: 499, historyQuality: 95, highLow: 387 },
      { month: "Jan 26", profit: 8142090, maxDD: 0.03, peakBalance: 7353822, marginLevel: 467, historyQuality: 100, highLow: 0 },
      { month: "Feb 26", profit: 8437838, maxDD: 0.00, peakBalance: 867066, marginLevel: 481, historyQuality: 100, highLow: 0 },
      { month: "Mar 26", profit: 4533523, maxDD: 0.00, peakBalance: 4651744, marginLevel: 466, historyQuality: 100, highLow: 0 },
      { month: "Apr 26", profit: 170629, maxDD: 0.79, peakBalance: 270680, marginLevel: 462, historyQuality: 100, highLow: 0 },
      { month: "Mei 26", profit: 155104, maxDD: 0.08, peakBalance: 260720, marginLevel: 479, historyQuality: 100, highLow: 0 },
    ],
    weekly: [
      { week: "W1 Jan 25", profit: -281, maxDD: 0.28, peakBalance: 100000, marginLevel: 3838, historyQuality: 100, highLow: 84 },
      { week: "W2 Jan 25", profit: -209, maxDD: 0.21, peakBalance: 100034, marginLevel: 1423, historyQuality: 100, highLow: 68 },
      { week: "W3 Jan 25", profit: -183, maxDD: 0.18, peakBalance: 100000, marginLevel: 3729, historyQuality: 100, highLow: 97 },
      { week: "W4 Jan 25", profit: -281, maxDD: 0.28, peakBalance: 100000, marginLevel: 3581, historyQuality: 100, highLow: 87 },
      { week: "W5 Feb 25", profit: -1197, maxDD: 1.43, peakBalance: 100031, marginLevel: 1813, historyQuality: 100, highLow: 114 },
      { week: "W6 Feb 25", profit: 5810, maxDD: 0.00, peakBalance: 106826, marginLevel: 588, historyQuality: 100, highLow: 82 },
      { week: "W7 Feb 25", profit: 77, maxDD: 0.18, peakBalance: 100509, marginLevel: 1264, historyQuality: 100, highLow: 76 },
      { week: "W8 Feb 25", profit: -100, maxDD: 0.45, peakBalance: 100070, marginLevel: 1290, historyQuality: 100, highLow: 124 },
      { week: "W9 Mar 25", profit: -352, maxDD: 0.45, peakBalance: 100000, marginLevel: 3465, historyQuality: 100, highLow: 72 },
      { week: "W10 Mar 25", profit: -349, maxDD: 0.45, peakBalance: 100000, marginLevel: 3410, historyQuality: 100, highLow: 124 },
      { week: "W11 Mar 25", profit: 1953, maxDD: 0.00, peakBalance: 101953, marginLevel: 6539, historyQuality: 100, highLow: 65 },
      { week: "W12 Mar 25", profit: -118, maxDD: 0.17, peakBalance: 100000, marginLevel: 1951, historyQuality: 100, highLow: 84 },
      { week: "W13 Apr 25", profit: -533, maxDD: 0.84, peakBalance: 100160, marginLevel: 1681, historyQuality: 100, highLow: 152 },
      { week: "W14 Apr 25", profit: -1515, maxDD: 1.71, peakBalance: 100000, marginLevel: 1724, historyQuality: 100, highLow: 288 },
      { week: "W15 Apr 25", profit: -302, maxDD: 1.00, peakBalance: 100011, marginLevel: 1891, historyQuality: 100, highLow: 164 },
      { week: "W16 Apr 25", profit: 1600, maxDD: 1.38, peakBalance: 103995, marginLevel: 519, historyQuality: 100, highLow: 240 },
      { week: "W17 Apr 25", profit: -312, maxDD: 0.36, peakBalance: 100890, marginLevel: 607, historyQuality: 100, highLow: 152 },
      { week: "W18 Mei 25", profit: 9587, maxDD: 0.00, peakBalance: 109690, marginLevel: 611, historyQuality: 100, highLow: 198 },
      { week: "W19 Mei 25", profit: 13174, maxDD: 0.17, peakBalance: 122325, marginLevel: 475, historyQuality: 100, highLow: 172 },
      { week: "W20 Mei 25", profit: -726, maxDD: 1.02, peakBalance: 101227, marginLevel: 614, historyQuality: 100, highLow: 161 },
      { week: "W21 Mei 25", profit: -498, maxDD: 0.63, peakBalance: 100040, marginLevel: 1147, historyQuality: 100, highLow: 151 },
      { week: "W22 Mei 25", profit: -170, maxDD: 0.34, peakBalance: 100074, marginLevel: 3033, historyQuality: 100, highLow: 101 },
      { week: "W23 Jun 25", profit: 2675, maxDD: 0.35, peakBalance: 103000, marginLevel: 588, historyQuality: 100, highLow: 104 },
      { week: "W24 Jun 25", profit: -177, maxDD: 0.84, peakBalance: 100036, marginLevel: 698, historyQuality: 100, highLow: 163 },
      { week: "W25 Jun 25", profit: 4383, maxDD: 0.20, peakBalance: 105893, marginLevel: 588, historyQuality: 100, highLow: 138 },
      { week: "W26 Jun 25", profit: 1724, maxDD: 0.21, peakBalance: 101666, marginLevel: 600, historyQuality: 100, highLow: 108 },
      { week: "W27 Jul 25", profit: -251, maxDD: 0.25, peakBalance: 100752, marginLevel: 601, historyQuality: 100, highLow: 118 },
      { week: "W28 Jul 25", profit: -393, maxDD: 0.40, peakBalance: 100000, marginLevel: 2993, historyQuality: 100, highLow: 86 },
      { week: "W29 Jul 25", profit: -1468, maxDD: 1.47, peakBalance: 100034, marginLevel: 2495, historyQuality: 100, highLow: 67 },
      { week: "W30 Jul 25", profit: -247, maxDD: 0.88, peakBalance: 100000, marginLevel: 1441, historyQuality: 100, highLow: 114 },
      { week: "W31 Jul 25", profit: -729, maxDD: 1.03, peakBalance: 100735, marginLevel: 601, historyQuality: 100, highLow: 96 },
      { week: "W32 Aug 25", profit: -202, maxDD: 0.16, peakBalance: 100062, marginLevel: 573, historyQuality: 100, highLow: 64 },
      { week: "W33 Aug 25", profit: 4458, maxDD: 0.18, peakBalance: 104976, marginLevel: 586, historyQuality: 100, highLow: 72 },
      { week: "W34 Aug 25", profit: -276, maxDD: 0.28, peakBalance: 100000, marginLevel: 2961, historyQuality: 100, highLow: 67 },
      { week: "W35 Aug 25", profit: 2597, maxDD: 0.00, peakBalance: 102597, marginLevel: 579, historyQuality: 100, highLow: 103 },
      { week: "W36 Sep 25", profit: 7312, maxDD: 0.00, peakBalance: 108847, marginLevel: 480, historyQuality: 100, highLow: 163 },
      { week: "W37 Sep 25", profit: -135, maxDD: 0.17, peakBalance: 101411, marginLevel: 534, historyQuality: 100, highLow: 95 },
      { week: "W38 Sep 25", profit: 2959, maxDD: 0.28, peakBalance: 105070, marginLevel: 538, historyQuality: 100, highLow: 81 },
      { week: "W39 Sep 25", profit: -144, maxDD: 0.72, peakBalance: 100451, marginLevel: 626, historyQuality: 100, highLow: 107 },
      { week: "W40 Sep 25", profit: -144, maxDD: 0.65, peakBalance: 101751, marginLevel: 514, historyQuality: 100, highLow: 134 },
      { week: "W41 Okt 25", profit: 14157, maxDD: 0.32, peakBalance: 116597, marginLevel: 466, historyQuality: 100, highLow: 175 },
      { week: "W42 Okt 25", profit: 125203, maxDD: 0.35, peakBalance: 231534, marginLevel: 460, historyQuality: 100, highLow: 371 },
      { week: "W43 Okt 25", profit: 315334, maxDD: 0.21, peakBalance: 423043, marginLevel: 476, historyQuality: 100, highLow: 377 },
      { week: "W44 Okt 25", profit: 67359, maxDD: 0.29, peakBalance: 168951, marginLevel: 468, historyQuality: 100, highLow: 223 },
      { week: "W45 Nov 25", profit: 3029, maxDD: 0.95, peakBalance: 104373, marginLevel: 486, historyQuality: 100, highLow: 102 },
      { week: "W46 Nov 25", profit: -511, maxDD: 1.15, peakBalance: 101410, marginLevel: 910, historyQuality: 100, highLow: 241 },
      { week: "W47 Nov 25", profit: -463, maxDD: 1.45, peakBalance: 102377, marginLevel: 476, historyQuality: 100, highLow: 135 },
      { week: "W48 Nov 25", profit: -153, maxDD: 0.58, peakBalance: 100000, marginLevel: 2495, historyQuality: 100, highLow: 187 },
      { week: "W49 Des 25", profit: -426, maxDD: 1.57, peakBalance: 101073, marginLevel: 542, historyQuality: 100, highLow: 101 },
      { week: "W50 Des 25", profit: -10, maxDD: 0.05, peakBalance: 103070, marginLevel: 639, historyQuality: 100, highLow: 183 },
      { week: "W51 Des 25", profit: -1158, maxDD: 1.16, peakBalance: 100158, marginLevel: 856, historyQuality: 100, highLow: 103 },
      { week: "W52 Des 25", profit: -997, maxDD: 1.31, peakBalance: 100189, marginLevel: 847, historyQuality: 83, highLow: 210 },
      { week: "W1 Jan 26", profit: -251, maxDD: 0.71, peakBalance: 104696, marginLevel: 638, historyQuality: 100, highLow: 0 },
      { week: "W2 Jan 26", profit: 17623, maxDD: 0.39, peakBalance: 117037, marginLevel: 502, historyQuality: 100, highLow: 0 },
      { week: "W3 Jan 26", profit: 45488, maxDD: 0.16, peakBalance: 147602, marginLevel: 463, historyQuality: 100, highLow: 0 },
      { week: "W4 Jan 26", profit: 6036038, maxDD: 0.00, peakBalance: 6049443, marginLevel: 465, historyQuality: 100, highLow: 0 },
      { week: "W5 Feb 26", profit: 8437838, maxDD: 0.00, peakBalance: 8672134, marginLevel: 481, historyQuality: 100, highLow: 0 },
      { week: "W6 Feb 26", profit: 184971, maxDD: 0.28, peakBalance: 286018, marginLevel: 464, historyQuality: 100, highLow: 0 },
      { week: "W7 Feb 26", profit: 28015, maxDD: 1.58, peakBalance: 131155, marginLevel: 466, historyQuality: 100, highLow: 0 },
      { week: "W8 Feb 26", profit: -443, maxDD: 0.66, peakBalance: 106408, marginLevel: 491, historyQuality: 100, highLow: 0 },
      { week: "W9 Mar 26", profit: 40398, maxDD: 0.02, peakBalance: 150692, marginLevel: 479, historyQuality: 100, highLow: 0 },
      { week: "W10 Mar 26", profit: -176, maxDD: 0.89, peakBalance: 100037, marginLevel: 742, historyQuality: 100, highLow: 0 },
      { week: "W11 Mar 26", profit: 279634, maxDD: 0.57, peakBalance: 378592, marginLevel: 469, historyQuality: 100, highLow: 0 },
      { week: "W12 Mar 26", profit: 1030224, maxDD: 0.63, peakBalance: 1133472, marginLevel: 476, historyQuality: 100, highLow: 0 },
      { week: "W13 Mar 26", profit: 87492, maxDD: 0.50, peakBalance: 186168, marginLevel: 468, historyQuality: 100, highLow: 0 },
      { week: "W1 Apr 26", profit: 43260, maxDD: 0.00, peakBalance: 145438, marginLevel: 473, historyQuality: 100, highLow: 0 },
      { week: "W2 Apr 26", profit: -950, maxDD: 0.98, peakBalance: 100053, marginLevel: 2130, historyQuality: 100, highLow: 0 },
      { week: "W3 Apr 26", profit: 15822, maxDD: 0.33, peakBalance: 117741, marginLevel: 500, historyQuality: 100, highLow: 0 },
      { week: "W4 Apr 26", profit: 4222, maxDD: 1.12, peakBalance: 105053, marginLevel: 476, historyQuality: 100, highLow: 0 },
      { week: "W1 Mei 26", profit: -853, maxDD: 1.71, peakBalance: 103178, marginLevel: 807, historyQuality: 100, highLow: 0 },
      { week: "W2 Mei 26", profit: -1012, maxDD: 1.27, peakBalance: 102529, marginLevel: 584, historyQuality: 100, highLow: 0 },
      { week: "W3 Mei 26", profit: 29319, maxDD: 0.52, peakBalance: 135588, marginLevel: 506, historyQuality: 100, highLow: 0 },
      { week: "W4 Mei 26", profit: 14427, maxDD: 0.92, peakBalance: 117031, marginLevel: 457, historyQuality: 100, highLow: 0 },
      { week: "W1 Jun 26", profit: 7427, maxDD: 0.00, peakBalance: 109425, marginLevel: 477, historyQuality: 100, highLow: 0 },
      { week: "W2 Jun 26", profit: 18654, maxDD: 0.00, peakBalance: 124092, marginLevel: 477, historyQuality: 100, highLow: 0 },
    ]
  }
];

const AnimatedNumber = ({ value, formatter }: { value: number, formatter: (val: number) => string }) => {
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    const controls = animate(0, value, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate(val) {
        node.textContent = formatter(val);
      },
    });

    return () => controls.stop();
  }, [value, formatter]);

  return <div ref={nodeRef} className="inline-block">{formatter(value)}</div>;
};

/* ============================================ */
/* BALANCE CHART                                */
/* ============================================ */
const BalanceChart = ({ robot, activeTab, formatCurrency, formatCompact, locale, t }: any) => {
  const chartData = activeTab === 'monthly' ? robot.monthly : robot.weekly;

  const balanceData = useMemo(() => {
    let currentBalance = robot.startCapital;
    return chartData.map((entry: any) => {
      currentBalance += entry.profit;
      return {
        name: activeTab === 'monthly' ? entry.month : entry.week,
        balance: currentBalance,
      };
    });
  }, [chartData, robot.startCapital, activeTab]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="h-[350px] sm:h-[450px] w-full bg-white border border-gray-100 rounded-2xl p-4 sm:p-8 shadow-xl mb-12"
    >
      <h3 className="text-xl font-bold text-[#111A4A] mb-6 text-center">
        {t("balanceCurve") || "Balance Curve"}
      </h3>
      <div className="h-[250px] sm:h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={balanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#156d95" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#156d95" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis
              dataKey="name"
              tick={{ fill: '#6b7280', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              dy={10}
              minTickGap={20}
            />
            <YAxis
              domain={['auto', 'auto']}
              tickFormatter={(val) => formatCompact(val)}
              tick={{ fill: '#6b7280', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              cursor={{ stroke: '#156d95', strokeWidth: 1, strokeDasharray: '3 3', fill: 'transparent' }}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
              formatter={(value: any) => [formatCurrency(value as number), t("balance") || "Balance"]}
            />
            <Area 
              type="monotone" 
              dataKey="balance" 
              stroke="#156d95" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorBalance)" 
              animationDuration={2500}
              activeDot={{ r: 6, fill: '#156d95', stroke: '#fff', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

/* ============================================ */
/* DRAWDOWN CHART                               */
/* ============================================ */
const DrawdownChart = ({ robot, activeTab, locale, t }: any) => {
  const chartData = activeTab === 'monthly' ? robot.monthly : robot.weekly;

  const drawdownData = useMemo(() => {
    return chartData.map((entry: any) => ({
      name: activeTab === 'monthly' ? entry.month : entry.week,
      maxDD: entry.maxDD,
    }));
  }, [chartData, activeTab]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="h-[350px] sm:h-[450px] w-full bg-white border border-gray-100 rounded-2xl p-4 sm:p-8 shadow-xl mb-12"
    >
      <h3 className="text-xl font-bold text-[#111A4A] mb-6 text-center">
        {t("drawdownCurve") || "Drawdown Curve"}
      </h3>
      <div className="h-[250px] sm:h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={drawdownData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="colorDrawdown" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.35}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0.02}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis
              dataKey="name"
              tick={{ fill: '#6b7280', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              dy={10}
              minTickGap={20}
            />
            <YAxis
              domain={[0, 'auto']}
              tickFormatter={(val) => `${val}%`}
              tick={{ fill: '#6b7280', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              reversed
            />
            <Tooltip
              cursor={{ stroke: '#ef4444', strokeWidth: 1, strokeDasharray: '3 3', fill: 'transparent' }}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
              formatter={(value: any) => [`${Number(value).toFixed(2)}%`, "Max DD"]}
            />
            <Area 
              type="monotone" 
              dataKey="maxDD" 
              stroke="#ef4444" 
              strokeWidth={2.5}
              fillOpacity={1} 
              fill="url(#colorDrawdown)" 
              animationDuration={2500}
              activeDot={{ r: 6, fill: '#ef4444', stroke: '#fff', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

/* ============================================ */
/* ADVANCED STATS GRID                          */
/* ============================================ */
const advStatItems = [
  { key: 'historyQuality', icon: CheckCircle2, color: 'text-emerald-500', bgColor: 'bg-emerald-50' },
  { key: 'maxDrawdown', icon: AlertTriangle, color: 'text-red-500', bgColor: 'bg-red-50' },
  { key: 'marginLevel', icon: Shield, color: 'text-amber-500', bgColor: 'bg-amber-50' },
  { key: 'peakBalance', icon: ArrowUp, color: 'text-blue-500', bgColor: 'bg-blue-50' },
  { key: 'highLowCandle', icon: BarChart3, color: 'text-purple-500', bgColor: 'bg-purple-50' },
];

const AdvancedStatsGrid = ({ robot, formatCurrency, formatNumber, t }: any) => {
  const statValues: Record<string, string> = {
    historyQuality: `${robot.avgHistoryQuality}%`,
    maxDrawdown: `${robot.worstDrawdown}%`,
    marginLevel: `${formatNumber(robot.lowestMarginLevel)}%`,
    peakBalance: formatCurrency(robot.peakBalance),
    highLowCandle: `${robot.avgHighLow}`,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className="mb-12"
    >
      <h3 className="text-xl font-bold text-[#111A4A] mb-6 text-center">
        {t("advStatsTitle") || "Advanced Statistics"}
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {advStatItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 * idx, type: "spring" as const, stiffness: 260, damping: 20 }}
              className="bg-white rounded-2xl p-5 shadow-md text-center border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-default"
            >
              <div className={`w-12 h-12 mx-auto mb-3 rounded-xl ${item.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <Icon size={22} className={item.color} />
              </div>
              <div className="text-lg sm:text-xl font-bold text-[#111A4A] leading-tight">
                {statValues[item.key]}
              </div>
              <div className="text-xs sm:text-sm text-gray-500 mt-1.5 leading-snug">
                {t(item.key)}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

/* ============================================ */
/* BACKTEST SECTION (MAIN)                      */
/* ============================================ */
const BacktestSection = () => {
  const t = useTranslations("RobotTrading");
  const locale = useLocale();
  const [activeTab, setActiveTab] = useState('monthly');
  const [selectedRobotId, setSelectedRobotId] = useState(robots[0].id);
  const [exchangeRate, setExchangeRate] = useState(15000); 

  useEffect(() => {
    fetch("https://api.exchangerate-api.com/v4/latest/USD")
      .then(res => res.json())
      .then(data => {
        if (data && data.rates && data.rates.IDR) {
          setExchangeRate(data.rates.IDR);
        }
      })
      .catch(err => console.error("Failed to fetch exchange rate", err));
  }, []);

  const activeRobot = robots.find(r => r.id === selectedRobotId) || robots[0];
  const chartData = activeTab === 'monthly' ? activeRobot.monthly : activeRobot.weekly;

  const totalProfit = chartData.reduce((acc, curr) => acc + curr.profit, 0);

  const formatCurrency = (val: number, minimumFractionDigits = 0) => {
    return new Intl.NumberFormat(locale === 'en' ? 'en-US' : 'id-ID', { minimumFractionDigits }).format(val) + " USDC";
  };

  const formatCompact = (val: number) => {
    return new Intl.NumberFormat(locale === 'en' ? 'en-US' : 'id-ID', { notation: "compact", maximumFractionDigits: 1 }).format(val) + " USDC";
  };

  const formatNumber = (val: number) => {
    return new Intl.NumberFormat(locale === 'en' ? 'en-US' : 'id-ID').format(val);
  };

  return (
    <section id="backtest" className="w-full py-16 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#111A4A] mb-4 text-center">
            {t("backtestPerfTitle")}
          </h2>
          <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
            {t("backtestPerfDesc")}
          </p>
        </motion.div>

        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <label className="text-sm font-semibold text-gray-700 whitespace-nowrap">
              {t("selectRobot")}:
            </label>
            <div className="relative w-full sm:w-64">
              <select
                value={selectedRobotId}
                onChange={(e) => setSelectedRobotId(e.target.value)}
                className="w-full appearance-none bg-white border border-gray-200 text-gray-700 py-2.5 px-4 pr-10 rounded-xl leading-tight focus:outline-none focus:ring-2 focus:ring-[#156d95] focus:border-transparent font-medium shadow-sm transition-all cursor-pointer"
              >
                {robots.map(robot => (
                  <option key={robot.id} value={robot.id}>{robot.name}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                <ChevronDown size={18} />
              </div>
            </div>
          </div>

          <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-200 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('monthly')}
              className={`flex-1 sm:flex-none px-6 py-2 rounded-lg font-medium transition-all text-sm ${activeTab === 'monthly' ? 'bg-[#156d95] text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              {t("monthlyCent")}
            </button>
            <button
              onClick={() => setActiveTab('weekly')}
              className={`flex-1 sm:flex-none px-6 py-2 rounded-lg font-medium transition-all text-sm ${activeTab === 'weekly' ? 'bg-[#156d95] text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              {t("weeklyCent")}
            </button>
          </div>
        </div>

        {/* PROFIT BAR CHART */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedRobotId}-${activeTab}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="h-[350px] sm:h-[450px] w-full bg-white border border-gray-100 rounded-2xl p-4 sm:p-8 shadow-xl mb-12"
          >
            <h3 className="text-xl font-bold text-[#111A4A] mb-6 text-center">
              {t("profitChart") || "Profit Chart"}
            </h3>
            <div className="h-[250px] sm:h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis
                    dataKey={activeTab === 'monthly' ? 'month' : 'week'}
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    dy={10}
                    minTickGap={20}
                  />
                  <YAxis
                    tickFormatter={(val) => formatCompact(val)}
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    cursor={{ fill: '#f9fafb' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                    formatter={(value: any) => [formatCurrency(value as number), t("profit") || "Profit"]}
                  />
                  <Bar dataKey="profit" radius={[4, 4, 4, 4]} maxBarSize={50} animationDuration={1000}>
                    {chartData.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={entry.profit >= 0 ? '#10b981' : '#ef4444'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* BALANCE CURVE */}
        <BalanceChart
          robot={activeRobot}
          activeTab={activeTab}
          formatCurrency={formatCurrency}
          formatCompact={formatCompact}
          locale={locale}
          t={t}
        />

        {/* DRAWDOWN CHART */}
        <DrawdownChart
          robot={activeRobot}
          activeTab={activeTab}
          locale={locale}
          t={t}
        />

        {/* BASIC STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-white rounded-xl p-5 shadow-md text-center border border-gray-100 hover:shadow-lg transition-all group">
            <div className="flex items-center justify-center mb-3 text-[#156d95] group-hover:scale-110 transition-transform"><DollarSign size={24} /></div>
            <div className="text-lg sm:text-xl font-bold text-[#111A4A]">
              <AnimatedNumber value={activeRobot.startCapital} formatter={(val) => formatCurrency(Math.floor(val))} />
            </div>
            <div className="text-xs sm:text-sm text-gray-500 mt-1">{t("startCapital")}</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="bg-white rounded-xl p-5 shadow-md text-center border border-gray-100 hover:shadow-lg transition-all group">
            <div className="flex items-center justify-center mb-3 text-green-500 group-hover:scale-110 transition-transform"><TrendingUp size={24} /></div>
            <div className={`text-lg sm:text-xl font-bold ${totalProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {totalProfit >= 0 ? '+' : ''}
              <AnimatedNumber value={totalProfit} formatter={(val) => formatCurrency(Math.floor(val))} />
            </div>
            <div className="text-xs sm:text-sm text-gray-500 mt-1">{t("totalProfit")}</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="bg-white rounded-xl p-5 shadow-md text-center border border-gray-100 hover:shadow-lg transition-all group">
            <div className="flex items-center justify-center mb-3 text-[#22d3ee] group-hover:scale-110 transition-transform"><Activity size={24} /></div>
            <div className="text-lg sm:text-xl font-bold text-[#111A4A]">
              <AnimatedNumber value={activeRobot.totalTrades} formatter={(val) => formatNumber(Math.floor(val)) + "+"} />
            </div>
            <div className="text-xs sm:text-sm text-gray-500 mt-1">{t("totalTrades")}</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="bg-white rounded-xl p-5 shadow-md text-center border border-gray-100 hover:shadow-lg transition-all group">
            <div className="flex items-center justify-center mb-3 text-purple-500 group-hover:scale-110 transition-transform"><Cpu size={24} /></div>
            <div className="text-base sm:text-lg font-bold text-[#111A4A] leading-tight mt-1">{activeRobot.name.split(' ')[0]}</div>
            <div className="text-xs sm:text-sm text-gray-500 mt-1">{t("mode")} / {activeRobot.mode}</div>
          </motion.div>
        </div>

        {/* ADVANCED STATS GRID */}
        <AdvancedStatsGrid
          robot={activeRobot}
          formatCurrency={formatCurrency}
          formatNumber={formatNumber}
          t={t}
        />
      </div>
    </section>
  )
}

export default function BacktestPage() {
  return (
    <main className="min-h-screen bg-white overflow-hidden pt-20 pb-20">
      <BacktestSection />
    </main>
  );
}
