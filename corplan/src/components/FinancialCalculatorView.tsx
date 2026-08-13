import React, { useState } from 'react';
import { 
  Calculator, 
  Plus, 
  Trash2, 
  TrendingUp, 
  DollarSign, 
  BarChart2, 
  Sparkles,
  Award,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sliders
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  ComposedChart,
  Line,
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend 
} from 'recharts';
import { FinancialModel, CapexItem, OpexItem, RevenueStream, Language, BusinessPlanData } from '../types';
import { calculateFinancials, formatCurrency } from '../utils/financialCalculations';
import { BankLoanSimulator } from './BankLoanSimulator';
import { ValuationScorecard } from './ValuationScorecard';
import { DigitalMarketingRoadmap } from './DigitalMarketingRoadmap';

interface BenchmarkMetric {
  metricName: string;
  userValue: string;
  industryAvg: string;
  status: string;
  insight: string;
}

interface FinancialBenchmarkData {
  industryName: string;
  overallHealthScore: number;
  overallVerdict: string;
  metrics: BenchmarkMetric[];
  recommendations: string[];
}

interface FinancialCalculatorViewProps {
  financialModel: FinancialModel;
  onUpdateFinancials: (updated: FinancialModel) => void;
  language: Language;
  theme?: 'warm-luxe' | 'dark-obsidian';
  businessName?: string;
  industry?: string;
  plan?: BusinessPlanData;
}

export const FinancialCalculatorView: React.FC<FinancialCalculatorViewProps> = ({
  financialModel,
  onUpdateFinancials,
  language,
  theme = 'warm-luxe',
  businessName = 'Bisnis Baru',
  industry = 'Kuliner & F&B',
  plan,
}) => {
  const [model, setModel] = useState<FinancialModel>(financialModel);
  const [financialScenario, setFinancialScenario] = useState<'pessimistic' | 'base' | 'optimistic'>('base');

  // Adjust model based on scenario multiplier
  const adjustedModel: FinancialModel = {
    ...model,
    revenueStreams: model.revenueStreams.map((r) => {
      const volMult = financialScenario === 'pessimistic' ? 0.8 : financialScenario === 'optimistic' ? 1.3 : 1.0;
      const cogsMult = financialScenario === 'pessimistic' ? 1.15 : financialScenario === 'optimistic' ? 0.95 : 1.0;
      return {
        ...r,
        expectedMonthlyVolume: Math.round(r.expectedMonthlyVolume * volMult),
        cogsPercent: Math.min(95, Math.round(r.cogsPercent * cogsMult)),
      };
    }),
  };

  const fin = calculateFinancials(adjustedModel);
  const curr = model.currency;
  const isDark = theme === 'dark-obsidian';

  const [benchmarkData, setBenchmarkData] = useState<FinancialBenchmarkData | null>(null);
  const [isBenchmarking, setIsBenchmarking] = useState(false);
  const [benchmarkError, setBenchmarkError] = useState<string | null>(null);

  const handleRunBenchmark = async () => {
    setIsBenchmarking(true);
    setBenchmarkError(null);
    try {
      const response = await fetch('/api/financial-benchmark', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName,
          industry,
          financialModel: model,
        }),
      });

      if (!response.ok) throw new Error('Gagal mengambil data benchmark industri.');
      const data = await response.json();
      setBenchmarkData(data);
    } catch (err: any) {
      setBenchmarkError(err.message || 'Terjadi kendala saat memuat benchmarking.');
    } finally {
      setIsBenchmarking(false);
    }
  };

  const updateModel = (newModel: FinancialModel) => {
    setModel(newModel);
    onUpdateFinancials(newModel);
  };

  // Add CapEx Item
  const handleAddCapex = () => {
    const newItem: CapexItem = {
      id: Date.now().toString(),
      item: 'Peralatan / Renovasi Baru',
      cost: 10000000,
    };
    updateModel({
      ...model,
      capexItems: [...model.capexItems, newItem],
    });
  };

  // Delete CapEx Item
  const handleDeleteCapex = (id: string) => {
    updateModel({
      ...model,
      capexItems: model.capexItems.filter(c => c.id !== id),
    });
  };

  // Edit CapEx Item
  const handleEditCapex = (id: string, field: 'item' | 'cost', val: any) => {
    updateModel({
      ...model,
      capexItems: model.capexItems.map(c => c.id === id ? { ...c, [field]: val } : c),
    });
  };

  // Add OpEx Item
  const handleAddOpex = () => {
    const newItem: OpexItem = {
      id: Date.now().toString(),
      item: 'Biaya Operasional Tambahan',
      cost: 2000000,
    };
    updateModel({
      ...model,
      opexItems: [...model.opexItems, newItem],
    });
  };

  // Delete OpEx Item
  const handleDeleteOpex = (id: string) => {
    updateModel({
      ...model,
      opexItems: model.opexItems.filter(o => o.id !== id),
    });
  };

  // Edit OpEx Item
  const handleEditOpex = (id: string, field: 'item' | 'cost', val: any) => {
    updateModel({
      ...model,
      opexItems: model.opexItems.map(o => o.id === id ? { ...o, [field]: val } : o),
    });
  };

  // Add Revenue Stream
  const handleAddRevenue = () => {
    const newItem: RevenueStream = {
      id: Date.now().toString(),
      name: 'Produk / Layanan Baru',
      pricePerUnit: 100000,
      expectedMonthlyVolume: 100,
      cogsPercent: 40,
    };
    updateModel({
      ...model,
      revenueStreams: [...model.revenueStreams, newItem],
    });
  };

  // Delete Revenue Stream
  const handleDeleteRevenue = (id: string) => {
    updateModel({
      ...model,
      revenueStreams: model.revenueStreams.filter(r => r.id !== id),
    });
  };

  // Edit Revenue Stream
  const handleEditRevenue = (id: string, field: keyof RevenueStream, val: any) => {
    updateModel({
      ...model,
      revenueStreams: model.revenueStreams.map(r => r.id === id ? { ...r, [field]: val } : r),
    });
  };

  const cardBgClass = isDark
    ? 'bg-[#0e111a]/90 border-white/10 text-slate-100 shadow-2xl'
    : 'bg-white/90 border-stone-200/90 text-[#181822] shadow-xl shadow-stone-900/5 backdrop-blur-2xl';

  const subCardBgClass = isDark
    ? 'bg-white/[0.03] border-white/10 text-slate-300'
    : 'bg-stone-50/90 border-stone-200/80 text-stone-800';

  const inputClass = isDark
    ? 'bg-slate-950 border-slate-700 text-slate-100'
    : 'bg-white border-stone-300 text-stone-900';

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-16">
      
      {/* Scenario Stress Testing Bar */}
      <div className={`${cardBgClass} rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3`}>
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-amber-500" />
          <div>
            <h4 className="text-xs font-extrabold text-stone-900 dark:text-slate-100">
              Simulasi Skenario Stress Testing Finansial
            </h4>
            <p className="text-[10px] text-stone-500 dark:text-slate-400">
              Uji ketahanan arus kas & proyeksi pertumbuhan dalam berbagai kondisi pasar
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setFinancialScenario('pessimistic')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer border ${
              financialScenario === 'pessimistic'
                ? 'bg-rose-600 text-white border-rose-700 shadow-md'
                : 'bg-stone-100 dark:bg-slate-800 text-stone-600 dark:text-slate-300 border-stone-200 dark:border-slate-700'
            }`}
          >
            Skenario Pesimis (-20% Omset)
          </button>
          <button
            onClick={() => setFinancialScenario('base')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer border ${
              financialScenario === 'base'
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                : 'bg-stone-100 dark:bg-slate-800 text-stone-600 dark:text-slate-300 border-stone-200 dark:border-slate-700'
            }`}
          >
            Base Case (Normal)
          </button>
          <button
            onClick={() => setFinancialScenario('optimistic')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer border ${
              financialScenario === 'optimistic'
                ? 'bg-emerald-600 text-white border-emerald-700 shadow-md'
                : 'bg-stone-100 dark:bg-slate-800 text-stone-600 dark:text-slate-300 border-stone-200 dark:border-slate-700'
            }`}
          >
            Skenario Optimis (+30% Omset)
          </button>
        </div>
      </div>

      {/* Top Banner KPI Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className={`${cardBgClass} p-5 rounded-2xl sm:rounded-3xl hover:border-indigo-500/30 transition duration-300 relative overflow-hidden group`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500 dark:text-slate-400">Total Modal / CapEx</span>
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 group-hover:scale-110 transition-transform">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <span className="text-xl sm:text-2xl font-black text-stone-900 dark:text-white mt-2 block tracking-tight">
            {formatCurrency(fin.totalCapex, curr)}
          </span>
          <span className="text-[11px] text-stone-500 dark:text-slate-400 mt-1 block font-medium">
            Pengeluaran Modal Investasi Awal
          </span>
        </div>

        <div className={`${cardBgClass} p-5 rounded-2xl sm:rounded-3xl hover:border-amber-500/30 transition duration-300 relative overflow-hidden group`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500 dark:text-slate-400">OpEx Bulanan</span>
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-300 border border-amber-500/20 group-hover:scale-110 transition-transform">
              <Calculator className="w-4 h-4" />
            </div>
          </div>
          <span className="text-xl sm:text-2xl font-black text-amber-600 dark:text-amber-300 mt-2 block tracking-tight">
            {formatCurrency(fin.totalMonthlyOpex, curr)}
          </span>
          <span className="text-[11px] text-stone-500 dark:text-slate-400 mt-1 block font-medium">
            Total Biaya Operasional Tetap
          </span>
        </div>

        <div className={`${cardBgClass} p-5 rounded-2xl sm:rounded-3xl hover:border-indigo-500/30 transition duration-300 relative overflow-hidden group`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500 dark:text-slate-400">BEP Omset Bulanan</span>
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <span className="text-xl sm:text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-2 block tracking-tight">
            {formatCurrency(fin.bepRevenueMonthly, curr)}
          </span>
          <span className="text-[11px] text-indigo-600 dark:text-indigo-300 mt-1 block font-semibold">
            Titik Impas ({fin.bepUnits} unit/bln)
          </span>
        </div>

        <div className="bg-emerald-500/10 border border-emerald-500/20 p-5 rounded-2xl sm:rounded-3xl shadow-xl transition duration-300 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Laba Bersih Th 1</span>
            <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30 group-hover:scale-110 transition-transform">
              <BarChart2 className="w-4 h-4" />
            </div>
          </div>
          <span className="text-xl sm:text-2xl font-black text-emerald-800 dark:text-emerald-300 mt-2 block tracking-tight">
            {formatCurrency(fin.year1NetProfit, curr)}
          </span>
          <span className="text-[11px] text-emerald-700 dark:text-emerald-400/90 mt-1 block font-semibold">
            Estimasi ROI Th 1: <strong className="text-stone-900 dark:text-white">{fin.roiYear1}</strong>
          </span>
        </div>

      </div>

      {/* Interactive Growth & Rate Sliders */}
      <div className={`${cardBgClass} rounded-2xl sm:rounded-3xl p-6 space-y-4`}>
        <h3 className="text-xs font-bold text-stone-900 dark:text-slate-100 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Pengaturan Asumsi Simulasi Keuangan</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-1">
          
          <div className={`${subCardBgClass} p-3.5 rounded-2xl border`}>
            <div className="flex justify-between text-xs font-bold text-stone-800 dark:text-slate-200 mb-2">
              <span>Pertumbuhan Penjualan Bulanan</span>
              <span className="text-indigo-600 dark:text-indigo-400 font-extrabold">{model.monthlyGrowthRate}% / bln</span>
            </div>
            <input
              type="range"
              min="0"
              max="25"
              step="0.5"
              value={model.monthlyGrowthRate}
              onChange={(e) => updateModel({ ...model, monthlyGrowthRate: parseFloat(e.target.value) })}
              className="w-full accent-stone-900 dark:accent-indigo-500 h-2 rounded-lg cursor-pointer"
            />
          </div>

          <div className={`${subCardBgClass} p-3.5 rounded-2xl border`}>
            <div className="flex justify-between text-xs font-bold text-stone-800 dark:text-slate-200 mb-2">
              <span>Modal Awal Kas Disiapkan</span>
              <span className="text-indigo-600 dark:text-indigo-400 font-extrabold">{formatCurrency(model.initialCapital, curr)}</span>
            </div>
            <input
              type="number"
              value={model.initialCapital}
              onChange={(e) => updateModel({ ...model, initialCapital: parseFloat(e.target.value) || 0 })}
              className={`w-full border text-xs px-3 py-1.5 rounded-xl focus:outline-none font-semibold ${inputClass}`}
            />
          </div>

          <div className={`${subCardBgClass} p-3.5 rounded-2xl border`}>
            <div className="flex justify-between text-xs font-bold text-stone-800 dark:text-slate-200 mb-2">
              <span>Tarif Pajak Efektif (%)</span>
              <span className="text-indigo-600 dark:text-indigo-400 font-extrabold">{model.taxRate}%</span>
            </div>
            <input
              type="number"
              step="0.1"
              value={model.taxRate}
              onChange={(e) => updateModel({ ...model, taxRate: parseFloat(e.target.value) || 0 })}
              className={`w-full border text-xs px-3 py-1.5 rounded-xl focus:outline-none font-semibold ${inputClass}`}
            />
          </div>

        </div>
      </div>

      {/* Visual Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: 12-Month Projections */}
        <div className={`${cardBgClass} rounded-2xl sm:rounded-3xl p-6`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xs font-bold text-stone-900 dark:text-slate-100">Proyeksi Pendapatan vs Laba Bersih (12 Bulan)</h3>
              <p className="text-[11px] text-stone-500 dark:text-slate-400">Pertumbuhan finansial akumulatif tahun pertama</p>
            </div>
          </div>
          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={fin.monthlyProjection}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"} />
                <XAxis dataKey="month" stroke="#78716c" fontSize={11} />
                <YAxis stroke="#78716c" fontSize={10} tickFormatter={(v) => `${(v/1000000).toFixed(0)}M`} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: isDark ? '#0f172a' : '#ffffff', 
                    borderColor: isDark ? '#334155' : '#e7e5e4', 
                    borderRadius: '12px', 
                    color: isDark ? '#fff' : '#1c1917', 
                    fontSize: '12px' 
                  }}
                  formatter={(val: any) => [formatCurrency(Number(val), curr), '']}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Area type="monotone" dataKey="revenue" name="Pendapatan" stroke="#4f46e5" fillOpacity={1} fill="url(#colorRev)" strokeWidth={2} />
                <Area type="monotone" dataKey="netProfit" name="Laba Bersih" stroke="#10b981" fillOpacity={1} fill="url(#colorNet)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: 3-Year Revenue Growth Projection Visual Graph */}
        <div className={`${cardBgClass} rounded-2xl sm:rounded-3xl p-6`}>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-stone-900 dark:text-slate-100 flex items-center gap-1.5">
                <BarChart2 className="w-4 h-4 text-emerald-500" />
                <span>Proyeksi Pertumbuhan Pendapatan (Revenue Growth Projection)</span>
              </h3>
              <p className="text-[11px] text-stone-500 dark:text-slate-400">
                Visualisasi 3-Tahun: Pendapatan, Laba Kotor, & Tren Laba Bersih
              </p>
            </div>
            <div className="bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-xl text-[10px] font-black text-emerald-700 dark:text-emerald-300">
              Periode 3-Tahun Recharts
            </div>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={fin.threeYearSummary}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"} />
                <XAxis dataKey="year" stroke="#78716c" fontSize={11} fontWeight="bold" />
                <YAxis stroke="#78716c" fontSize={10} tickFormatter={(v) => `${(v/1000000).toFixed(0)}M`} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: isDark ? '#0f172a' : '#ffffff', 
                    borderColor: isDark ? '#334155' : '#e7e5e4', 
                    borderRadius: '12px', 
                    color: isDark ? '#fff' : '#1c1917', 
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}
                  formatter={(val: any) => [formatCurrency(Number(val), curr), '']}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="revenue" name="Pendapatan" fill="#4f46e5" radius={[6, 6, 0, 0]} />
                <Bar dataKey="grossProfit" name="Laba Kotor" fill="#0284c7" radius={[6, 6, 0, 0]} />
                <Line type="monotone" dataKey="netProfit" name="Laba Bersih" stroke="#10b981" strokeWidth={3} dot={{ r: 5, fill: '#10b981' }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 pt-3 border-t border-stone-200 dark:border-slate-800 grid grid-cols-3 gap-2 text-center text-[10px] font-bold text-stone-600 dark:text-slate-400">
            {fin.threeYearSummary.map((yr, idx) => (
              <div key={idx} className="p-1.5 rounded-lg bg-stone-100 dark:bg-slate-900 border border-stone-200 dark:border-slate-800">
                <span className="block text-stone-900 dark:text-slate-200 font-extrabold">{yr.year}</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-black">
                  {formatCurrency(yr.netProfit, curr)}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* GEMINI FINANCIAL BENCHMARKING TOOL */}
      <div className={`${cardBgClass} rounded-2xl sm:rounded-3xl p-6 relative overflow-hidden`}>
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 dark:border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-500" />
              <h3 className="text-sm font-bold text-stone-900 dark:text-slate-100">
                Benchmarking Keuangan AI (vs Standar Industri Startup)
              </h3>
            </div>
            <p className="text-xs text-stone-500 dark:text-slate-400 mt-0.5">
              Bandingkan rasio finansial {businessName} dengan data rata-rata publik industri {industry}
            </p>
          </div>

          <button
            onClick={handleRunBenchmark}
            disabled={isBenchmarking}
            className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-black rounded-xl shadow-lg shadow-indigo-600/25 flex items-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
          >
            {isBenchmarking ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Award className="w-4 h-4" />
            )}
            <span>{isBenchmarking ? 'Menganalisis Benchmark...' : 'Jalankan Financial Benchmark'}</span>
          </button>
        </div>

        {benchmarkError && (
          <div className="mt-4 p-3 bg-rose-500/10 border border-rose-500/30 text-rose-700 dark:text-rose-300 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{benchmarkError}</span>
          </div>
        )}

        {benchmarkData ? (
          <div className="mt-5 space-y-5 animate-fadeIn">
            {/* Health Score & Overall Verdict Banner */}
            <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex flex-col items-center justify-center font-black shadow-md shrink-0">
                  <span className="text-lg leading-none">{benchmarkData.overallHealthScore}</span>
                  <span className="text-[9px] uppercase tracking-wider text-indigo-200">/ 100</span>
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 block">
                    SKOR KESEHATAN FINANSIAL INDUSTRI
                  </span>
                  <h4 className="text-xs font-bold text-stone-900 dark:text-slate-100 mt-0.5">
                    Sektor: {benchmarkData.industryName}
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-slate-300 mt-1 leading-relaxed">
                    {benchmarkData.overallVerdict}
                  </p>
                </div>
              </div>
            </div>

            {/* Benchmark Metrics Comparison Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-stone-100 dark:bg-slate-900 text-stone-600 dark:text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="px-4 py-3 rounded-l-xl">Metrik Keuangan</th>
                    <th className="px-4 py-3 text-right">Nilai Model Anda</th>
                    <th className="px-4 py-3 text-right">Rata-rata Industri</th>
                    <th className="px-4 py-3 text-center">Status Ratio</th>
                    <th className="px-4 py-3 rounded-r-xl">Analisis Gemini</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 dark:divide-slate-800">
                  {benchmarkData.metrics.map((m, idx) => (
                    <tr key={idx} className="hover:bg-stone-50 dark:hover:bg-slate-900/50 transition">
                      <td className="px-4 py-3 font-bold text-stone-900 dark:text-slate-100">{m.metricName}</td>
                      <td className="px-4 py-3 text-right font-black text-indigo-600 dark:text-indigo-400">{m.userValue}</td>
                      <td className="px-4 py-3 text-right font-medium text-stone-500 dark:text-slate-400">{m.industryAvg}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black border ${
                          m.status.includes('Baik') || m.status.includes('Sangat') || m.status.includes('Optimal')
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300'
                            : 'bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-300'
                        }`}>
                          {m.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-stone-600 dark:text-slate-300 text-[11px] leading-snug">{m.insight}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Recommendations */}
            <div className="bg-stone-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-stone-200 dark:border-slate-800">
              <span className="text-[10px] font-black uppercase text-stone-500 dark:text-slate-400 tracking-wider block mb-2">
                💡 Rekomendasi Taktis Optimalisasi Finansial:
              </span>
              <ul className="space-y-1.5">
                {benchmarkData.recommendations.map((rec, i) => (
                  <li key={i} className="text-xs font-medium text-stone-800 dark:text-slate-200 flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="mt-4 p-8 bg-stone-50 dark:bg-slate-900/40 rounded-2xl border border-dashed border-stone-300 dark:border-slate-800 text-center space-y-2">
            <Award className="w-8 h-8 text-stone-400 dark:text-slate-600 mx-auto" />
            <p className="text-xs font-medium text-stone-600 dark:text-slate-400">
              Klik tombol di atas untuk membandingkan proyeksi laba, margin, dan modal usaha Anda dengan standar publik startup Indonesia.
            </p>
          </div>
        )}
      </div>

      {/* Feature 1: Bank Loan & KUR Eligibility Simulator */}
      <BankLoanSimulator
        financialModel={adjustedModel}
        businessName={businessName}
        theme={theme}
      />

      {/* Feature 2: AI Valuation & Investor Scorecard */}
      {plan && (
        <ValuationScorecard
          plan={{
            ...plan,
            financialModel: adjustedModel,
          }}
          theme={theme}
        />
      )}

      {/* Feature 3: Digital Marketing Strategy & 30-Day Content Engine */}
      {plan && (
        <DigitalMarketingRoadmap
          plan={plan}
          theme={theme}
        />
      )}

      {/* Spreadsheet Tables: CapEx, OpEx, Revenue Streams */}
      <div className="space-y-6">
        
        {/* Table 1: CapEx */}
        <div className={`${cardBgClass} rounded-2xl sm:rounded-3xl p-6`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-stone-900 dark:text-slate-100">1. Modal Investasi Awal (CapEx)</h3>
              <p className="text-xs text-stone-500 dark:text-slate-400">Pembelian aset, peralatan, renovasi & perizinan</p>
            </div>
            <button
              onClick={handleAddCapex}
              className="px-3.5 py-1.5 bg-stone-100 dark:bg-white/10 hover:bg-stone-200 dark:hover:bg-white/20 text-stone-800 dark:text-slate-200 border border-stone-300 dark:border-white/10 text-xs font-semibold rounded-full flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-indigo-500" />
              <span>Tambah Item CapEx</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-stone-800 dark:text-slate-300">
              <thead className="bg-stone-100 dark:bg-slate-900 text-stone-600 dark:text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="px-4 py-3 rounded-l-xl">Item Pengeluaran Modal</th>
                  <th className="px-4 py-3 text-right">Biaya / Value ({curr})</th>
                  <th className="px-4 py-3 text-center rounded-r-xl w-16">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 dark:divide-slate-800/60">
                {model.capexItems.map((item) => (
                  <tr key={item.id} className="hover:bg-stone-50 dark:hover:bg-slate-900/40 transition">
                    <td className="px-4 py-2.5">
                      <input
                        type="text"
                        value={item.item}
                        onChange={(e) => handleEditCapex(item.id, 'item', e.target.value)}
                        className={`w-full border rounded-lg px-2.5 py-1 text-xs focus:outline-none ${inputClass}`}
                      />
                    </td>
                    <td className="px-4 py-2.5 text-right">
                      <input
                        type="number"
                        value={item.cost}
                        onChange={(e) => handleEditCapex(item.id, 'cost', parseFloat(e.target.value) || 0)}
                        className={`w-40 border rounded-lg px-2.5 py-1 text-indigo-600 dark:text-indigo-400 font-bold text-xs text-right focus:outline-none ${inputClass}`}
                      />
                    </td>
                    <td className="px-4 py-2.5 text-center">
                      <button
                        onClick={() => handleDeleteCapex(item.id)}
                        className="p-1.5 text-stone-400 hover:text-rose-600 transition cursor-pointer"
                        title="Hapus"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-stone-300 dark:border-slate-800 font-bold text-stone-900 dark:text-slate-100">
                  <td className="px-4 py-3">Total Investasi CapEx</td>
                  <td className="px-4 py-3 text-right text-indigo-600 dark:text-indigo-400 text-sm">
                    {formatCurrency(fin.totalCapex, curr)}
                  </td>
                  <td className="px-4 py-3"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Table 2: OpEx */}
        <div className={`${cardBgClass} rounded-2xl sm:rounded-3xl p-6`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-stone-900 dark:text-slate-100">2. Biaya Operasional Bulanan (OpEx)</h3>
              <p className="text-xs text-stone-500 dark:text-slate-400">Sewa tempat, gaji tim, listrik, internet & pemasaran</p>
            </div>
            <button
              onClick={handleAddOpex}
              className="px-3.5 py-1.5 bg-stone-100 dark:bg-white/10 hover:bg-stone-200 dark:hover:bg-white/20 text-stone-800 dark:text-slate-200 border border-stone-300 dark:border-white/10 text-xs font-semibold rounded-full flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-amber-500" />
              <span>Tambah Item OpEx</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-stone-800 dark:text-slate-300">
              <thead className="bg-stone-100 dark:bg-slate-900 text-stone-600 dark:text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="px-4 py-3 rounded-l-xl">Komponen Biaya Operasional</th>
                  <th className="px-4 py-3 text-right">Biaya Bulanan ({curr})</th>
                  <th className="px-4 py-3 text-center rounded-r-xl w-16">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 dark:divide-slate-800/60">
                {model.opexItems.map((item) => (
                  <tr key={item.id} className="hover:bg-stone-50 dark:hover:bg-slate-900/40 transition">
                    <td className="px-4 py-2.5">
                      <input
                        type="text"
                        value={item.item}
                        onChange={(e) => handleEditOpex(item.id, 'item', e.target.value)}
                        className={`w-full border rounded-lg px-2.5 py-1 text-xs focus:outline-none ${inputClass}`}
                      />
                    </td>
                    <td className="px-4 py-2.5 text-right">
                      <input
                        type="number"
                        value={item.cost}
                        onChange={(e) => handleEditOpex(item.id, 'cost', parseFloat(e.target.value) || 0)}
                        className={`w-40 border rounded-lg px-2.5 py-1 text-amber-600 dark:text-amber-300 font-bold text-xs text-right focus:outline-none ${inputClass}`}
                      />
                    </td>
                    <td className="px-4 py-2.5 text-center">
                      <button
                        onClick={() => handleDeleteOpex(item.id)}
                        className="p-1.5 text-stone-400 hover:text-rose-600 transition cursor-pointer"
                        title="Hapus"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-stone-300 dark:border-slate-800 font-bold text-stone-900 dark:text-slate-100">
                  <td className="px-4 py-3">Total OpEx Bulanan</td>
                  <td className="px-4 py-3 text-right text-amber-600 dark:text-amber-300 text-sm">
                    {formatCurrency(fin.totalMonthlyOpex, curr)}
                  </td>
                  <td className="px-4 py-3"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Table 3: Revenue Streams */}
        <div className={`${cardBgClass} rounded-2xl sm:rounded-3xl p-6`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-stone-900 dark:text-slate-100">3. Sumber Pendapatan & HPP / COGS</h3>
              <p className="text-xs text-stone-500 dark:text-slate-400">Harga jual unit, estimasi volume per bulan, dan % HPP</p>
            </div>
            <button
              onClick={handleAddRevenue}
              className="px-3.5 py-1.5 bg-stone-100 dark:bg-white/10 hover:bg-stone-200 dark:hover:bg-white/20 text-stone-800 dark:text-slate-200 border border-stone-300 dark:border-white/10 text-xs font-semibold rounded-full flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-emerald-500" />
              <span>Tambah Stream Pendapatan</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-stone-800 dark:text-slate-300">
              <thead className="bg-stone-100 dark:bg-slate-900 text-stone-600 dark:text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="px-4 py-3 rounded-l-xl">Nama Produk / Layanan</th>
                  <th className="px-4 py-3 text-right">Harga Unit ({curr})</th>
                  <th className="px-4 py-3 text-right">Vol Bulanan</th>
                  <th className="px-4 py-3 text-right">COGS / HPP %</th>
                  <th className="px-4 py-3 text-right">Est. Omset Bulanan</th>
                  <th className="px-4 py-3 text-center rounded-r-xl w-16">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 dark:divide-slate-800/60">
                {model.revenueStreams.map((stream) => {
                  const estMonthlyRev = stream.pricePerUnit * stream.expectedMonthlyVolume;
                  return (
                    <tr key={stream.id} className="hover:bg-stone-50 dark:hover:bg-slate-900/40 transition">
                      <td className="px-4 py-2.5">
                        <input
                          type="text"
                          value={stream.name}
                          onChange={(e) => handleEditRevenue(stream.id, 'name', e.target.value)}
                          className={`w-full border rounded-lg px-2.5 py-1 text-xs focus:outline-none ${inputClass}`}
                        />
                      </td>
                      <td className="px-4 py-2.5 text-right">
                        <input
                          type="number"
                          value={stream.pricePerUnit}
                          onChange={(e) => handleEditRevenue(stream.id, 'pricePerUnit', parseFloat(e.target.value) || 0)}
                          className={`w-32 border rounded-lg px-2.5 py-1 text-xs text-right focus:outline-none ${inputClass}`}
                        />
                      </td>
                      <td className="px-4 py-2.5 text-right">
                        <input
                          type="number"
                          value={stream.expectedMonthlyVolume}
                          onChange={(e) => handleEditRevenue(stream.id, 'expectedMonthlyVolume', parseFloat(e.target.value) || 0)}
                          className={`w-24 border rounded-lg px-2.5 py-1 text-xs text-right focus:outline-none ${inputClass}`}
                        />
                      </td>
                      <td className="px-4 py-2.5 text-right">
                        <input
                          type="number"
                          value={stream.cogsPercent}
                          onChange={(e) => handleEditRevenue(stream.id, 'cogsPercent', parseFloat(e.target.value) || 0)}
                          className={`w-20 border rounded-lg px-2.5 py-1 text-xs text-right focus:outline-none ${inputClass}`}
                        />
                      </td>
                      <td className="px-4 py-2.5 text-right font-extrabold text-emerald-600 dark:text-emerald-400">
                        {formatCurrency(estMonthlyRev, curr)}
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        <button
                          onClick={() => handleDeleteRevenue(stream.id)}
                          className="p-1.5 text-stone-400 hover:text-rose-600 transition cursor-pointer"
                          title="Hapus"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
};
