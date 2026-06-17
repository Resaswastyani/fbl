"use client";

import { motion, AnimatePresence, animate } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
import {
  ArrowUpRight,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  Cpu,
  Zap,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  Shield,
  Download,
  Play,
  FileText,
  Settings,
  X,
  Sparkles,
  Timer,
  Award,
  BarChart3,
  Eye,
  ArrowDownCircle,
  Lock,
  Unlock,
  Target,
  Gauge,
  Layers,
  MousePointerClick,
  MessageCircle,
  Users,
} from "lucide-react";

const robots = [
  {
    id: "fbl_agresif2",
    name: "FBL_AO_XAUUSD_M1.Ex5 (Agresif 2)",
    startCapital: 100000,
    totalTrades: 4500,
    mode: "Regime Dependent",
    monthly: [
      { month: "Jan 25", profit: -522 },
      { month: "Feb 25", profit: -222 },
      { month: "Mar 25", profit: -281 },
      { month: "Apr 25", profit: -1494 },
      { month: "Mei 25", profit: 71028 },
      { month: "Jun 25", profit: 8288 },
      { month: "Jul 25", profit: -368 },
      { month: "Aug 25", profit: 3347 },
      { month: "Sep 25", profit: 14643 },
      { month: "Okt 25", profit: 951581 },
      { month: "Nov 25", profit: 36912 },
      { month: "Des 25", profit: 10987 },
      { month: "Jan 26", profit: 8142090 },
      { month: "Feb 26", profit: 8437838 },
      { month: "Mar 26", profit: 4533523 },
      { month: "Apr 26", profit: 170629 },
      { month: "Mei 26", profit: 155104 },
    ],
    weekly: [
      { week: "W1 Jan 25", profit: -281 },
      { week: "W2 Jan 25", profit: -209 },
      { week: "W3 Jan 25", profit: -183 },
      { week: "W4 Jan 25", profit: -281 },
      { week: "W5 Feb 25", profit: -1197 },
      { week: "W6 Feb 25", profit: 5810 },
      { week: "W7 Feb 25", profit: 77 },
      { week: "W8 Feb 25", profit: -100 },
      { week: "W9 Mar 25", profit: -352 },
      { week: "W10 Mar 25", profit: -349 },
      { week: "W11 Mar 25", profit: 1953 },
      { week: "W12 Mar 25", profit: -118 },
      { week: "W13 Apr 25", profit: -533 },
      { week: "W14 Apr 25", profit: -1515 },
      { week: "W15 Apr 25", profit: -302 },
      { week: "W16 Apr 25", profit: 1600 },
      { week: "W17 Apr 25", profit: -312 },
      { week: "W18 Mei 25", profit: 9587 },
      { week: "W19 Mei 25", profit: 13174 },
      { week: "W20 Mei 25", profit: -726 },
      { week: "W21 Mei 25", profit: -498 },
      { week: "W22 Mei 25", profit: -170 },
      { week: "W23 Jun 25", profit: 2675 },
      { week: "W24 Jun 25", profit: -177 },
      { week: "W25 Jun 25", profit: 4383 },
      { week: "W26 Jun 25", profit: 1724 },
      { week: "W27 Jul 25", profit: -251 },
      { week: "W28 Jul 25", profit: -393 },
      { week: "W29 Jul 25", profit: -1468 },
      { week: "W30 Jul 25", profit: -247 },
      { week: "W31 Jul 25", profit: -729 },
      { week: "W32 Aug 25", profit: -202 },
      { week: "W33 Aug 25", profit: 4458 },
      { week: "W34 Aug 25", profit: -276 },
      { week: "W35 Aug 25", profit: 2597 },
      { week: "W36 Sep 25", profit: 7312 },
      { week: "W37 Sep 25", profit: -135 },
      { week: "W38 Sep 25", profit: 2959 },
      { week: "W39 Sep 25", profit: -144 },
      { week: "W40 Sep 25", profit: -144 },
      { week: "W41 Okt 25", profit: 14157 },
      { week: "W42 Okt 25", profit: 125203 },
      { week: "W43 Okt 25", profit: 315334 },
      { week: "W44 Okt 25", profit: 67359 },
      { week: "W45 Nov 25", profit: 3029 },
      { week: "W46 Nov 25", profit: -511 },
      { week: "W47 Nov 25", profit: -463 },
      { week: "W48 Nov 25", profit: -153 },
      { week: "W49 Des 25", profit: -426 },
      { week: "W50 Des 25", profit: -10 },
      { week: "W51 Des 25", profit: -1158 },
      { week: "W52 Des 25", profit: -997 },
      { week: "W1 Jan 26", profit: -251 },
      { week: "W2 Jan 26", profit: 17623 },
      { week: "W3 Jan 26", profit: 45488 },
      { week: "W4 Jan 26", profit: 6036038 },
      { week: "W5 Feb 26", profit: 8437838 },
      { week: "W6 Feb 26", profit: 184971 },
      { week: "W7 Feb 26", profit: 28015 },
      { week: "W8 Feb 26", profit: -443 },
      { week: "W9 Mar 26", profit: 40398 },
      { week: "W10 Mar 26", profit: -176 },
      { week: "W11 Mar 26", profit: 279634 },
      { week: "W12 Mar 26", profit: 1030224 },
      { week: "W13 Mar 26", profit: 87492 },
      { week: "W1 Apr 26", profit: 43260 },
      { week: "W2 Apr 26", profit: -950 },
      { week: "W3 Apr 26", profit: 15822 },
      { week: "W4 Apr 26", profit: 4222 },
      { week: "W1 Mei 26", profit: -853 },
      { week: "W2 Mei 26", profit: -1012 },
      { week: "W3 Mei 26", profit: 29319 },
      { week: "W4 Mei 26", profit: 14427 },
      { week: "W1 Jun 26", profit: 7427 },
      { week: "W2 Jun 26", profit: 18654 },
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

        <BalanceChart
          robot={activeRobot}
          activeTab={activeTab}
          formatCurrency={formatCurrency}
          formatCompact={formatCompact}
          locale={locale}
          t={t}
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
