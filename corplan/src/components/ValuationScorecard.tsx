import React, { useState } from 'react';
import { 
  TrendingUp, 
  Sparkles, 
  Award, 
  Percent, 
  DollarSign, 
  PieChart, 
  Briefcase,
  Layers,
  ChevronRight,
  Info
} from 'lucide-react';
import { FinancialModel, BusinessPlanData } from '../types';
import { calculateFinancials, formatCurrency } from '../utils/financialCalculations';

interface ValuationScorecardProps {
  plan: BusinessPlanData;
  targetAsk?: number;
  theme?: 'warm-luxe' | 'dark-obsidian';
}

export const ValuationScorecard: React.FC<ValuationScorecardProps> = ({
  plan,
  targetAsk = 250000000, // Default 250 Juta
  theme = 'warm-luxe',
}) => {
  const isDark = theme === 'dark-obsidian';
  const cardBgClass = isDark
    ? 'bg-slate-900/90 border-slate-800 text-slate-100'
    : 'bg-white border-stone-200 text-stone-900 shadow-sm';

  const fin = calculateFinancials(plan.financialModel);
  const annualRevenue = fin.baseMonthlyRevenue * 12;
  const annualNetProfit = fin.baseMonthlyNetProfit * 12;

  // Valuation Parameters State
  const [revenueMultiple, setRevenueMultiple] = useState<number>(2.5); // 2.5x EV/Revenue
  const [discountRatePercent, setDiscountRatePercent] = useState<number>(15); // 15% WACC for DCF
  const [askAmount, setAskAmount] = useState<number>(targetAsk);

  // 1. Revenue Multiple Valuation
  const valRevenueMultiple = Math.round(annualRevenue * revenueMultiple);

  // 2. DCF Valuation (Simple 3-Year Cashflow Present Value)
  const yr1 = fin.threeYearSummary[0]?.netProfit || annualNetProfit;
  const yr2 = fin.threeYearSummary[1]?.netProfit || annualNetProfit * 1.25;
  const yr3 = fin.threeYearSummary[2]?.netProfit || annualNetProfit * 1.55;
  const r = discountRatePercent / 100;

  const pv1 = yr1 / (1 + r);
  const pv2 = yr2 / Math.pow(1 + r, 2);
  const pv3 = yr3 / Math.pow(1 + r, 3);
  const valDCF = Math.round(pv1 + pv2 + pv3 + (yr3 * 3) / Math.pow(1 + r, 3));

  // 3. Berkus Scorecard (Early Stage Qualitative)
  const valBerkus = Math.round(annualRevenue > 0 ? (annualRevenue * 2 + 100000000) : 300000000);

  // Blended Pre-Money Valuation
  const blendedPreMoneyValuation = Math.round((valRevenueMultiple * 0.4) + (valDCF * 0.4) + (valBerkus * 0.2));
  const postMoneyValuation = blendedPreMoneyValuation + askAmount;
  const investorEquityDilutionPercent = postMoneyValuation > 0
    ? Math.round((askAmount / postMoneyValuation) * 1000) / 10
    : 10;

  // Investor Readiness Score Calculation (0 - 100)
  let readinessScore = 50;
  if (fin.baseGrossMarginPercent >= 50) readinessScore += 15;
  if (fin.baseMonthlyNetProfit > 0) readinessScore += 15;
  if (plan.marketAnalysis?.swot?.strengths?.length >= 3) readinessScore += 10;
  if (plan.competitorAnalysis?.competitors?.length >= 2) readinessScore += 10;
  readinessScore = Math.min(98, readinessScore);

  return (
    <div className={`${cardBgClass} rounded-2xl sm:rounded-3xl p-6 space-y-6 border`}>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 dark:border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-500" />
            <h3 className="text-sm font-bold">
              Kalkulator Valuasi Bisnis & Investor Scorecard
            </h3>
          </div>
          <p className="text-xs text-stone-500 dark:text-slate-400 mt-0.5">
            Estimasi Pre-Money Valuation & Porsi Kepemilikan Saham (Dilution %) berbasis 3 metodologi finansial
          </p>
        </div>

        <div className="px-3.5 py-1.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center gap-2">
          <Award className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span className="text-xs font-black text-indigo-700 dark:text-indigo-300">
            Skor Investor Readiness: {readinessScore} / 100
          </span>
        </div>
      </div>

      {/* Main Pre-Money & Equity Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-900 to-slate-900 text-white shadow-lg space-y-1">
          <span className="text-[10px] font-extrabold uppercase text-indigo-300 tracking-wider">
            Pre-Money Valuation (Estimasi)
          </span>
          <p className="text-xl font-black text-amber-300">
            {formatCurrency(blendedPreMoneyValuation)}
          </p>
          <span className="text-[10px] text-indigo-200/80 block">
            Nilai awal bisnis sebelum mendapat pendanaan baru
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-stone-50 dark:bg-slate-800/60 border border-stone-200 dark:border-slate-700 space-y-1">
          <span className="text-[10px] font-bold text-stone-500 dark:text-slate-400 uppercase tracking-wider block">
            Post-Money Valuation
          </span>
          <p className="text-lg font-black text-stone-900 dark:text-slate-100">
            {formatCurrency(postMoneyValuation)}
          </p>
          <span className="text-[10px] text-stone-400 block">
            Pre-Money ({formatCurrency(blendedPreMoneyValuation)}) + Ask ({formatCurrency(askAmount)})
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-stone-50 dark:bg-slate-800/60 border border-stone-200 dark:border-slate-700 space-y-1">
          <span className="text-[10px] font-bold text-stone-500 dark:text-slate-400 uppercase tracking-wider block">
            Porsi Saham Investor (Equity Dilution)
          </span>
          <p className="text-lg font-black text-emerald-600 dark:text-emerald-400">
            {investorEquityDilutionPercent}% Saham
          </p>
          <span className="text-[10px] text-stone-400 block">
            Porsi kepemilikan saham yang dilepas untuk modal {formatCurrency(askAmount)}
          </span>
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-stone-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-stone-200 dark:border-slate-800">
        <div className="space-y-1.5">
          <label className="text-[11px] font-extrabold uppercase text-stone-600 dark:text-slate-400 flex items-center justify-between">
            <span>Multiple Industri (EV/Revenue):</span>
            <span className="text-indigo-600 font-black">{revenueMultiple}x</span>
          </label>
          <input
            type="range"
            min="1.0"
            max="6.0"
            step="0.5"
            value={revenueMultiple}
            onChange={(e) => setRevenueMultiple(Number(e.target.value))}
            className="w-full accent-indigo-600 cursor-pointer h-2 bg-stone-200 dark:bg-slate-800 rounded-lg"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-extrabold uppercase text-stone-600 dark:text-slate-400 flex items-center justify-between">
            <span>Target Suntikan Modal (Ask):</span>
            <span className="text-amber-600 font-black">{formatCurrency(askAmount)}</span>
          </label>
          <input
            type="range"
            min="50000000"
            max="1000000000"
            step="25000000"
            value={askAmount}
            onChange={(e) => setAskAmount(Number(e.target.value))}
            className="w-full accent-amber-600 cursor-pointer h-2 bg-stone-200 dark:bg-slate-800 rounded-lg"
          />
        </div>
      </div>

      {/* 3 Valuation Methodologies Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 space-y-1">
          <span className="text-[10px] font-black uppercase text-indigo-500">Metode 1: EV/Revenue</span>
          <p className="font-bold text-stone-900 dark:text-slate-100">{formatCurrency(valRevenueMultiple)}</p>
          <p className="text-[10px] text-stone-500 dark:text-slate-400">Berdasarkan omset tahunan ({formatCurrency(annualRevenue)}) × {revenueMultiple}x</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 space-y-1">
          <span className="text-[10px] font-black uppercase text-purple-500">Metode 2: DCF (Cashflow 3-Thn)</span>
          <p className="font-bold text-stone-900 dark:text-slate-100">{formatCurrency(valDCF)}</p>
          <p className="text-[10px] text-stone-500 dark:text-slate-400">Nilai sekarang (NPV) proyeksi arus kas bersih 3 tahun</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 space-y-1">
          <span className="text-[10px] font-black uppercase text-amber-500">Metode 3: Berkus Qualitative</span>
          <p className="font-bold text-stone-900 dark:text-slate-100">{formatCurrency(valBerkus)}</p>
          <p className="text-[10px] text-stone-500 dark:text-slate-400">Evaluasi aset kualitatif, kesiapan produk & tim pendiri</p>
        </div>
      </div>
    </div>
  );
};
