import React, { useState, useEffect } from 'react';
import { Sparkles, TrendingUp, X, ChevronRight, ShieldAlert } from 'lucide-react';
import { BusinessPlanData } from '../types';
import { calculateFinancials } from '../utils/financialCalculations';

interface InsightToastProps {
  plan: BusinessPlanData;
  onNavigateTab: (tabId: string) => void;
  theme?: 'warm-luxe' | 'dark-obsidian';
}

interface InsightAlert {
  id: string;
  type: 'risk' | 'opportunity' | 'financial';
  title: string;
  message: string;
  actionText: string;
  targetTab: string;
}

export const InsightToast: React.FC<InsightToastProps> = ({
  plan,
  onNavigateTab,
  theme = 'warm-luxe',
}) => {
  const isDark = theme === 'dark-obsidian';
  const [activeAlert, setActiveAlert] = useState<InsightAlert | null>(null);
  const [dismissedIds, setDismissedIds] = useState<string[]>([]);

  useEffect(() => {
    // Generate intelligent insights based on current plan state
    const finModel = plan.financialModel;
    if (!finModel) return;

    const fin = calculateFinancials(finModel);
    const swot = plan.marketAnalysis?.swot;
    const alerts: InsightAlert[] = [];

    const grossMargin = fin.baseGrossMarginPercent;
    const netProfit = fin.baseMonthlyNetProfit;
    const rev = fin.baseMonthlyRevenue;
    const netMargin = rev > 0 ? Math.round((netProfit / rev) * 100) : 0;
    const paybackStr = fin.paybackMonth || '6 Bulan';

    // Financial Risk alert: Low Net Margin
    if (netMargin < 12 && rev > 0) {
      alerts.push({
        id: 'low-net-margin',
        type: 'risk',
        title: 'Peringatan Margin Laba Bersih Low (<12%)',
        message: `Margin bersih bisnis saat ini (${netMargin}%) tergolong tipis dibanding rata-rata industri. Pertimbangkan menaikkan harga unit atau menekan OpEx.`,
        actionText: 'Simulasi Ulang Keuangan',
        targetTab: 'financials',
      });
    }

    // Opportunity Alert: Quick Break Even / Payback
    if (!paybackStr.includes('>') && rev > 0) {
      alerts.push({
        id: 'fast-bep',
        type: 'opportunity',
        title: `Peluang Akselerasi: Modal Kembali Dalam ${paybackStr}`,
        message: `Estimasi pengembalian modal (Payback Period) bisnis Anda relatif cepat (${paybackStr})! Ini sangat atraktif untuk investor dan pengajuan kredit bank.`,
        actionText: 'Lihat Pitch Deck Investor',
        targetTab: 'pitch',
      });
    }

    // Risk Alert: Threat count high
    if (swot?.threats && swot.threats.length >= 3) {
      alerts.push({
        id: 'high-threats',
        type: 'risk',
        title: 'Poin Ancaman Eksternal Tinggi',
        message: `Ditemukan ${swot.threats.length} poin ancaman pasar eksternal pada analisis SWOT. Siapkan strategi mitigasi risiko.`,
        actionText: 'Buka Matrix SWOT & Risiko',
        targetTab: 'matrix',
      });
    }

    // Select first non-dismissed alert
    const available = alerts.filter((a) => !dismissedIds.includes(a.id));
    if (available.length > 0) {
      const timer = setTimeout(() => {
        setActiveAlert(available[0]);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setActiveAlert(null);
    }
  }, [plan, dismissedIds]);

  if (!activeAlert) return null;

  const handleDismiss = () => {
    if (activeAlert) {
      setDismissedIds((prev) => [...prev, activeAlert.id]);
      setActiveAlert(null);
    }
  };

  const handleAction = () => {
    if (activeAlert) {
      onNavigateTab(activeAlert.targetTab);
      handleDismiss();
    }
  };

  const isRisk = activeAlert.type === 'risk';

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full px-4 animate-slideUp">
      <div className={`p-4 rounded-2xl border shadow-2xl backdrop-blur-xl relative flex items-start gap-3 transition-all duration-300 ${
        isDark 
          ? isRisk ? 'bg-rose-950/90 border-rose-500/40 text-rose-100 shadow-rose-900/30' : 'bg-emerald-950/90 border-emerald-500/40 text-emerald-100 shadow-emerald-900/30'
          : isRisk ? 'bg-rose-50/95 border-rose-300 text-rose-950 shadow-rose-900/10' : 'bg-emerald-50/95 border-emerald-300 text-emerald-950 shadow-emerald-900/10'
      }`}>
        
        <div className={`p-2 rounded-xl shrink-0 ${
          isRisk ? 'bg-rose-500/20 text-rose-600 dark:text-rose-400' : 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
        }`}>
          {isRisk ? <ShieldAlert className="w-5 h-5" /> : <TrendingUp className="w-5 h-5" />}
        </div>

        <div className="flex-1 pr-6">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-[10px] font-black uppercase tracking-wider opacity-80 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>AI Proactive Insight</span>
            </span>
          </div>

          <h4 className="text-xs font-black mb-1">{activeAlert.title}</h4>
          <p className="text-[11px] opacity-90 leading-snug mb-3">{activeAlert.message}</p>

          <button
            onClick={handleAction}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl flex items-center gap-1.5 transition cursor-pointer shadow-sm ${
              isRisk 
                ? 'bg-rose-600 hover:bg-rose-500 text-white' 
                : 'bg-emerald-600 hover:bg-emerald-500 text-white'
            }`}
          >
            <span>{activeAlert.actionText}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 p-1 rounded-lg opacity-60 hover:opacity-100 transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
};
