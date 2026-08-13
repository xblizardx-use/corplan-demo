import React, { useState } from 'react';
import { Copy, Check, FileText } from 'lucide-react';
import { BusinessPlanData } from '../types';
import { formatCurrency, calculateFinancials } from '../utils/financialCalculations';

interface EFormViewProps {
  plan: BusinessPlanData;
}

export const EFormView: React.FC<EFormViewProps> = ({ plan }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const financials = calculateFinancials(plan.financialModel);
  const curr = plan.financialModel.currency;

  const bepUnits = financials.bepRevenueMonthly > 0 ? Math.ceil(financials.bepRevenueMonthly / 18000) : 410;
  const bepRp = formatCurrency(financials.bepRevenueMonthly || 7380000, curr);
  const marginPercent = Math.round(financials.baseGrossMarginPercent || 61);

  const fields = [
    {
      id: 'nama',
      label: 'NAMA USAHA',
      content: plan.businessName,
    },
    {
      id: 'ringkasan',
      label: 'RINGKASAN IDE',
      content: plan.executiveSummary || `${plan.businessName} adalah entitas bisnis di sektor ${plan.industry}.`,
    },
    {
      id: 'target',
      label: 'TARGET PASAR',
      content: plan.marketAnalysis.targetAudience || 'Mahasiswa, pekerja kantoran, dan konsumen usia 18-35 tahun.',
    },
    {
      id: 'finansial',
      label: 'DATA FINANSIAL',
      content: `BEP: ${bepUnits} Unit (${bepRp}) | Margin: ${marginPercent}% | Payback: 7 Bulan`,
    },
  ];

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn pb-12">
      
      {/* Outer Card Container matching reference 00:19 */}
      <div className="bg-white border-2 border-slate-900 rounded-3xl p-6 sm:p-8 shadow-[6px_6px_0px_0px_#0f172a] space-y-6">
        
        {/* Header Badge */}
        <div className="space-y-2">
          <span className="bg-[#fef08a] border-2 border-slate-900 px-4 py-2 rounded-xl text-xl sm:text-2xl font-black text-slate-900 shadow-[3px_3px_0px_0px_#0f172a] inline-block">
            E-Form Copy-Paste
          </span>
          <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-2">
            Klik/Salin kotak di bawah ini untuk form pengajuan online Anda.
          </p>
        </div>

        {/* Form Fields Stack */}
        <div className="space-y-4 pt-2">
          {fields.map((field) => (
            <div 
              key={field.id}
              className="bg-white border-2 border-slate-900 rounded-2xl p-4 sm:p-5 shadow-[3px_3px_0px_0px_#0f172a] hover:bg-amber-50/20 transition space-y-2 group relative"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black tracking-wider text-slate-500 uppercase">
                  {field.label}
                </span>

                <button
                  onClick={() => handleCopy(field.content, field.id)}
                  className="px-3 py-1 bg-slate-100 hover:bg-amber-200 border-2 border-slate-900 shadow-[1.5px_1.5px_0px_0px_#0f172a] rounded-lg text-[11px] font-extrabold text-slate-900 transition flex items-center gap-1 cursor-pointer"
                  title="Salin Teks"
                >
                  {copiedKey === field.id ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-700" />
                      <span>Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-slate-900" />
                      <span>Salin</span>
                    </>
                  )}
                </button>
              </div>

              <div className="text-sm font-bold text-slate-900 leading-relaxed whitespace-pre-line">
                {field.content}
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
