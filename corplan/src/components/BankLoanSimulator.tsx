import React, { useState } from 'react';
import { 
  Building2, 
  DollarSign, 
  Calculator, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Award, 
  Percent, 
  Calendar,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { FinancialModel } from '../types';
import { calculateFinancials, formatCurrency } from '../utils/financialCalculations';

interface BankLoanSimulatorProps {
  financialModel: FinancialModel;
  businessName: string;
  theme?: 'warm-luxe' | 'dark-obsidian';
}

export const BankLoanSimulator: React.FC<BankLoanSimulatorProps> = ({
  financialModel,
  businessName,
  theme = 'warm-luxe',
}) => {
  const isDark = theme === 'dark-obsidian';
  const cardBgClass = isDark
    ? 'bg-slate-900/90 border-slate-800 text-slate-100'
    : 'bg-white border-stone-200 text-stone-900 shadow-sm';

  const fin = calculateFinancials(financialModel);
  const projectedNetMonthlyProfit = fin.baseMonthlyNetProfit;

  // Loan parameters
  const [loanAmount, setLoanAmount] = useState<number>(100000000); // 100 Juta
  const [tenureMonths, setTenureMonths] = useState<number>(36); // 3 Tahun
  const [loanType, setLoanType] = useState<'kur' | 'komersial' | 'investasi'>('kur');

  // Interest rate based on type
  const interestRateAnnual = loanType === 'kur' ? 6 : loanType === 'komersial' ? 11 : 9.5;

  // Monthly Interest Calculation (Flat vs Effective approximation for SME display)
  const monthlyRate = (interestRateAnnual / 100) / 12;
  const monthlyPrincipal = loanAmount / tenureMonths;
  const monthlyInterest = loanAmount * monthlyRate;
  const estimatedMonthlyInstallment = Math.round(monthlyPrincipal + monthlyInterest);
  const totalRepayment = Math.round(estimatedMonthlyInstallment * tenureMonths);
  const totalInterestPaid = totalRepayment - loanAmount;

  // DSCR (Debt Service Coverage Ratio) = Net Monthly Operating Cashflow / Monthly Loan Installment
  const dscr = estimatedMonthlyInstallment > 0 && projectedNetMonthlyProfit > 0
    ? (projectedNetMonthlyProfit / estimatedMonthlyInstallment).toFixed(2)
    : '0.00';

  const dscrNum = parseFloat(dscr);

  // Status Qualification
  const isEligible = dscrNum >= 1.3 && projectedNetMonthlyProfit > estimatedMonthlyInstallment;
  const isWarning = dscrNum >= 1.0 && dscrNum < 1.3;

  return (
    <div className={`${cardBgClass} rounded-2xl sm:rounded-3xl p-6 space-y-6 border`}>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 dark:border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-sm font-bold">
              Simulasi Kelayakan Kredit Bank & Subsidi KUR
            </h3>
          </div>
          <p className="text-xs text-stone-500 dark:text-slate-400 mt-0.5">
            Evaluasi Debt Service Coverage Ratio (DSCR) & estimasi angsuran kredit usaha untuk {businessName}
          </p>
        </div>

        <span className={`px-3 py-1 rounded-full text-xs font-black border flex items-center gap-1.5 ${
          isEligible 
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300' 
            : isWarning
            ? 'bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-300'
            : 'bg-rose-500/10 border-rose-500/30 text-rose-700 dark:text-rose-300'
        }`}>
          {isEligible ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
          <span>{isEligible ? 'Sangat Layak Kredit Bank' : isWarning ? 'Cukup Layak (Perlu Agunan Extra)' : 'Risiko Angsuran Tinggi'}</span>
        </span>
      </div>

      {/* Simulator Inputs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Loan Type */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-extrabold uppercase tracking-wider text-stone-500 dark:text-slate-400">
            Jenis Skema Kredit
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            <button
              onClick={() => setLoanType('kur')}
              className={`p-2 rounded-xl text-xs font-extrabold border text-center transition cursor-pointer ${
                loanType === 'kur'
                  ? 'bg-emerald-600 text-white border-emerald-700 shadow'
                  : 'bg-stone-50 dark:bg-slate-800 text-stone-700 dark:text-slate-300 border-stone-200 dark:border-slate-700'
              }`}
            >
              KUR (6%)
            </button>
            <button
              onClick={() => setLoanType('komersial')}
              className={`p-2 rounded-xl text-xs font-extrabold border text-center transition cursor-pointer ${
                loanType === 'komersial'
                  ? 'bg-emerald-600 text-white border-emerald-700 shadow'
                  : 'bg-stone-50 dark:bg-slate-800 text-stone-700 dark:text-slate-300 border-stone-200 dark:border-slate-700'
              }`}
            >
              Komersial (11%)
            </button>
            <button
              onClick={() => setLoanType('investasi')}
              className={`p-2 rounded-xl text-xs font-extrabold border text-center transition cursor-pointer ${
                loanType === 'investasi'
                  ? 'bg-emerald-600 text-white border-emerald-700 shadow'
                  : 'bg-stone-50 dark:bg-slate-800 text-stone-700 dark:text-slate-300 border-stone-200 dark:border-slate-700'
              }`}
            >
              Investasi (9.5%)
            </button>
          </div>
        </div>

        {/* Loan Amount */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-extrabold uppercase tracking-wider text-stone-500 dark:text-slate-400">
            Plafon Pinjaman: {formatCurrency(loanAmount)}
          </label>
          <input
            type="range"
            min="10000000"
            max="500000000"
            step="5000000"
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            className="w-full accent-emerald-600 cursor-pointer h-2 bg-stone-200 dark:bg-slate-800 rounded-lg"
          />
          <div className="flex justify-between text-[10px] text-stone-400 font-bold">
            <span>Rp 10 Jt</span>
            <span>Rp 250 Jt</span>
            <span>Rp 500 Jt</span>
          </div>
        </div>

        {/* Tenure Months */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-extrabold uppercase tracking-wider text-stone-500 dark:text-slate-400">
            Jangka Waktu (Tenor): {tenureMonths} Bulan ({Math.round(tenureMonths/12 * 10)/10} Thn)
          </label>
          <input
            type="range"
            min="12"
            max="60"
            step="6"
            value={tenureMonths}
            onChange={(e) => setTenureMonths(Number(e.target.value))}
            className="w-full accent-emerald-600 cursor-pointer h-2 bg-stone-200 dark:bg-slate-800 rounded-lg"
          />
          <div className="flex justify-between text-[10px] text-stone-400 font-bold">
            <span>12 Bsn</span>
            <span>36 Bsn</span>
            <span>60 Bsn</span>
          </div>
        </div>
      </div>

      {/* Metrics Result Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-slate-800/60 border border-stone-200 dark:border-slate-700">
          <span className="text-[10px] font-bold text-stone-500 dark:text-slate-400 uppercase tracking-wider block">
            Angsuran Bulanan
          </span>
          <p className="text-sm font-black text-emerald-600 dark:text-emerald-400 mt-1">
            {formatCurrency(estimatedMonthlyInstallment)}
          </p>
          <span className="text-[10px] text-stone-400">/ bulan</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-slate-800/60 border border-stone-200 dark:border-slate-700">
          <span className="text-[10px] font-bold text-stone-500 dark:text-slate-400 uppercase tracking-wider block">
            Rasio DSCR
          </span>
          <p className={`text-sm font-black mt-1 ${
            dscrNum >= 1.3 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'
          }`}>
            {dscr}x
          </p>
          <span className="text-[10px] text-stone-400">Standar Bank ≥ 1.3x</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-slate-800/60 border border-stone-200 dark:border-slate-700">
          <span className="text-[10px] font-bold text-stone-500 dark:text-slate-400 uppercase tracking-wider block">
            Total Bunga (Tenor)
          </span>
          <p className="text-sm font-black text-stone-800 dark:text-slate-200 mt-1">
            {formatCurrency(totalInterestPaid)}
          </p>
          <span className="text-[10px] text-stone-400">Bunga efektif: {interestRateAnnual}% p.a.</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-slate-800/60 border border-stone-200 dark:border-slate-700">
          <span className="text-[10px] font-bold text-stone-500 dark:text-slate-400 uppercase tracking-wider block">
            Laba Bersih Tersisa
          </span>
          <p className="text-sm font-black text-indigo-600 dark:text-indigo-400 mt-1">
            {formatCurrency(Math.max(0, projectedNetMonthlyProfit - estimatedMonthlyInstallment))}
          </p>
          <span className="text-[10px] text-stone-400">Setelah potong angsuran</span>
        </div>
      </div>

      {/* Bank Qualification Guidance Note */}
      <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs space-y-2">
        <div className="flex items-center gap-2 font-bold text-emerald-800 dark:text-emerald-300">
          <Award className="w-4 h-4 shrink-0" />
          <span>Rekomendasi Pengajuan Bank (BRI, Mandiri, BNI, BCA):</span>
        </div>
        <p className="text-stone-700 dark:text-slate-300 leading-relaxed text-[11px]">
          {isEligible 
            ? `Laba bersih operasional usaha Anda (${formatCurrency(projectedNetMonthlyProfit)}/bulan) sangat mencukupi untuk mengover angsuran pinjaman ${formatCurrency(estimatedMonthlyInstallment)}/bulan dengan Rasio DSCR aman ${dscr}x. Anda tergolong kandidat kuat penerima Subsidi KUR!`
            : `Angsuran bulanan (${formatCurrency(estimatedMonthlyInstallment)}) memakan sebagian besar laba operasional bersih. Disarankan memperpanjang tenor menjadi 48-60 bulan atau mengurangi plafon pinjaman agar DSCR berada di atas 1.30x.`
          }
        </p>
      </div>
    </div>
  );
};
