import React from 'react';
import { BusinessPlanData } from '../types';
import { formatCurrency, calculateFinancials } from '../utils/financialCalculations';

interface PrintableDocumentProps {
  plan: BusinessPlanData;
}

export const PrintableDocument: React.FC<PrintableDocumentProps> = ({ plan }) => {
  const fin = calculateFinancials(plan.financialModel);
  const curr = plan.financialModel.currency;

  return (
    <div
      id="business-plan-document"
      className="fixed -left-[9999px] top-0 w-[800px] p-10 font-sans leading-normal pointer-events-none z-[-9999]"
      style={{
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
        backgroundColor: '#ffffff',
        color: '#0f172a',
      }}
    >
      {/* Header / Title */}
      <div
        className="pb-6 mb-8 flex justify-between items-end"
        style={{ borderBottom: '2px solid #0f172a' }}
      >
        <div>
          <span
            className="text-xs font-bold uppercase tracking-widest block mb-1"
            style={{ color: '#2563eb' }}
          >
            {plan.industry} • Business Plan Document
          </span>
          <h1
            className="text-3xl font-extrabold tracking-tight"
            style={{ color: '#0f172a' }}
          >
            {plan.businessName}
          </h1>
          <p className="text-sm italic mt-1" style={{ color: '#475569' }}>
            {plan.tagline}
          </p>
        </div>
        <div className="text-right text-xs" style={{ color: '#64748b' }}>
          <p>Tanggal: {plan.createdAt}</p>
          <p>CorPlan AI Consultant</p>
        </div>
      </div>

      {/* 1. Executive Summary */}
      <div className="mb-8">
        <h2
          className="text-lg font-bold pb-2 mb-3 uppercase tracking-wider"
          style={{ color: '#0f172a', borderBottom: '1px solid #e2e8f0' }}
        >
          1. Ringkasan Eksekutif (Executive Summary)
        </h2>
        <p
          className="text-sm leading-relaxed whitespace-pre-line"
          style={{ color: '#1e293b' }}
        >
          {plan.executiveSummary}
        </p>
      </div>

      {/* 2. Market Analysis */}
      <div className="mb-8">
        <h2
          className="text-lg font-bold pb-2 mb-3 uppercase tracking-wider"
          style={{ color: '#0f172a', borderBottom: '1px solid #e2e8f0' }}
        >
          2. Analisis Pasar & Industri
        </h2>

        <div className="mb-4">
          <h3 className="text-xs font-bold uppercase mb-1" style={{ color: '#334155' }}>
            Gambaran Industri
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: '#1e293b' }}>
            {plan.marketAnalysis.industryOverview}
          </p>
        </div>

        <div className="mb-4">
          <h3 className="text-xs font-bold uppercase mb-1" style={{ color: '#334155' }}>
            Target Pasar
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: '#1e293b' }}>
            {plan.marketAnalysis.targetAudience}
          </p>
        </div>

        {/* SWOT Table */}
        <div className="mb-4">
          <h3 className="text-xs font-bold uppercase mb-2" style={{ color: '#334155' }}>
            Analisis SWOT
          </h3>
          <table
            className="w-full text-xs border-collapse"
            style={{ border: '1px solid #cbd5e1' }}
          >
            <thead>
              <tr style={{ backgroundColor: '#f1f5f9', color: '#0f172a' }}>
                <th
                  className="p-2 text-left w-1/2"
                  style={{ border: '1px solid #cbd5e1' }}
                >
                  Strengths (Kekuatan)
                </th>
                <th
                  className="p-2 text-left w-1/2"
                  style={{ border: '1px solid #cbd5e1' }}
                >
                  Weaknesses (Kelemahan)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  className="p-2.5 align-top"
                  style={{ border: '1px solid #cbd5e1', color: '#1e293b' }}
                >
                  <ul className="list-disc list-inside space-y-1">
                    {plan.marketAnalysis.swot.strengths.map((s, idx) => (
                      <li key={idx}>{s}</li>
                    ))}
                  </ul>
                </td>
                <td
                  className="p-2.5 align-top"
                  style={{ border: '1px solid #cbd5e1', color: '#1e293b' }}
                >
                  <ul className="list-disc list-inside space-y-1">
                    {plan.marketAnalysis.swot.weaknesses.map((w, idx) => (
                      <li key={idx}>{w}</li>
                    ))}
                  </ul>
                </td>
              </tr>
              <tr style={{ backgroundColor: '#f1f5f9', color: '#0f172a' }}>
                <th
                  className="p-2 text-left"
                  style={{ border: '1px solid #cbd5e1' }}
                >
                  Opportunities (Peluang)
                </th>
                <th
                  className="p-2 text-left"
                  style={{ border: '1px solid #cbd5e1' }}
                >
                  Threats (Ancaman)
                </th>
              </tr>
              <tr>
                <td
                  className="p-2.5 align-top"
                  style={{ border: '1px solid #cbd5e1', color: '#1e293b' }}
                >
                  <ul className="list-disc list-inside space-y-1">
                    {plan.marketAnalysis.swot.opportunities.map((o, idx) => (
                      <li key={idx}>{o}</li>
                    ))}
                  </ul>
                </td>
                <td
                  className="p-2.5 align-top"
                  style={{ border: '1px solid #cbd5e1', color: '#1e293b' }}
                >
                  <ul className="list-disc list-inside space-y-1">
                    {plan.marketAnalysis.swot.threats.map((t, idx) => (
                      <li key={idx}>{t}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Marketing & Operations */}
      <div className="mb-8">
        <h2
          className="text-lg font-bold pb-2 mb-3 uppercase tracking-wider"
          style={{ color: '#0f172a', borderBottom: '1px solid #e2e8f0' }}
        >
          3. Strategi Pemasaran & Operasional
        </h2>
        <div className="mb-3">
          <h3 className="text-xs font-bold uppercase mb-1" style={{ color: '#334155' }}>
            Strategi Pemasaran
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: '#1e293b' }}>
            {plan.marketingAndOperations.marketingStrategy}
          </p>
        </div>
        <div className="mb-3">
          <h3 className="text-xs font-bold uppercase mb-1" style={{ color: '#334155' }}>
            Saluran Penjualan
          </h3>
          <p className="text-sm" style={{ color: '#1e293b' }}>
            {plan.marketingAndOperations.salesChannels.join(', ')}
          </p>
        </div>
        <div className="mb-3">
          <h3 className="text-xs font-bold uppercase mb-1" style={{ color: '#334155' }}>
            Rencana Operasional
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: '#1e293b' }}>
            {plan.marketingAndOperations.operationalPlan}
          </p>
        </div>
      </div>

      {/* 4. Financial Summary & Tables */}
      <div className="mb-8">
        <h2
          className="text-lg font-bold pb-2 mb-3 uppercase tracking-wider"
          style={{ color: '#0f172a', borderBottom: '1px solid #e2e8f0' }}
        >
          4. Proyeksi Keuangan
        </h2>

        {/* Summary Numbers */}
        <div className="grid grid-cols-4 gap-3 mb-4">
          <div
            className="p-3 rounded"
            style={{ border: '1px solid #cbd5e1', backgroundColor: '#f8fafc' }}
          >
            <span
              className="text-[10px] uppercase block font-semibold"
              style={{ color: '#64748b' }}
            >
              Total CapEx
            </span>
            <span className="text-sm font-bold" style={{ color: '#0f172a' }}>
              {formatCurrency(fin.totalCapex, curr)}
            </span>
          </div>
          <div
            className="p-3 rounded"
            style={{ border: '1px solid #cbd5e1', backgroundColor: '#f8fafc' }}
          >
            <span
              className="text-[10px] uppercase block font-semibold"
              style={{ color: '#64748b' }}
            >
              OpEx Bulanan
            </span>
            <span className="text-sm font-bold" style={{ color: '#0f172a' }}>
              {formatCurrency(fin.totalMonthlyOpex, curr)}
            </span>
          </div>
          <div
            className="p-3 rounded"
            style={{ border: '1px solid #cbd5e1', backgroundColor: '#f8fafc' }}
          >
            <span
              className="text-[10px] uppercase block font-semibold"
              style={{ color: '#64748b' }}
            >
              BEP Bulanan
            </span>
            <span className="text-sm font-bold" style={{ color: '#0f172a' }}>
              {formatCurrency(fin.bepRevenueMonthly, curr)}
            </span>
          </div>
          <div
            className="p-3 rounded"
            style={{ border: '1px solid #cbd5e1', backgroundColor: '#f8fafc' }}
          >
            <span
              className="text-[10px] uppercase block font-semibold"
              style={{ color: '#64748b' }}
            >
              Laba Bersih Th 1
            </span>
            <span className="text-sm font-bold" style={{ color: '#0f172a' }}>
              {formatCurrency(fin.year1NetProfit, curr)}
            </span>
          </div>
        </div>

        {/* 3-Year Projection Table */}
        <table
          className="w-full text-xs border-collapse mb-4"
          style={{ border: '1px solid #cbd5e1' }}
        >
          <thead>
            <tr style={{ backgroundColor: '#f1f5f9', color: '#0f172a' }}>
              <th
                className="p-2 text-left"
                style={{ border: '1px solid #cbd5e1' }}
              >
                Indikator Keuangan
              </th>
              <th
                className="p-2 text-right"
                style={{ border: '1px solid #cbd5e1' }}
              >
                Tahun 1
              </th>
              <th
                className="p-2 text-right"
                style={{ border: '1px solid #cbd5e1' }}
              >
                Tahun 2
              </th>
              <th
                className="p-2 text-right"
                style={{ border: '1px solid #cbd5e1' }}
              >
                Tahun 3
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                className="p-2 font-medium"
                style={{ border: '1px solid #cbd5e1', color: '#1e293b' }}
              >
                Pendapatan Kotor
              </td>
              <td
                className="p-2 text-right"
                style={{ border: '1px solid #cbd5e1', color: '#1e293b' }}
              >
                {formatCurrency(fin.threeYearSummary[0].revenue, curr)}
              </td>
              <td
                className="p-2 text-right"
                style={{ border: '1px solid #cbd5e1', color: '#1e293b' }}
              >
                {formatCurrency(fin.threeYearSummary[1].revenue, curr)}
              </td>
              <td
                className="p-2 text-right"
                style={{ border: '1px solid #cbd5e1', color: '#1e293b' }}
              >
                {formatCurrency(fin.threeYearSummary[2].revenue, curr)}
              </td>
            </tr>
            <tr>
              <td
                className="p-2 font-medium"
                style={{ border: '1px solid #cbd5e1', color: '#1e293b' }}
              >
                Laba Kotor
              </td>
              <td
                className="p-2 text-right"
                style={{ border: '1px solid #cbd5e1', color: '#1e293b' }}
              >
                {formatCurrency(fin.threeYearSummary[0].grossProfit, curr)}
              </td>
              <td
                className="p-2 text-right"
                style={{ border: '1px solid #cbd5e1', color: '#1e293b' }}
              >
                {formatCurrency(fin.threeYearSummary[1].grossProfit, curr)}
              </td>
              <td
                className="p-2 text-right"
                style={{ border: '1px solid #cbd5e1', color: '#1e293b' }}
              >
                {formatCurrency(fin.threeYearSummary[2].grossProfit, curr)}
              </td>
            </tr>
            <tr>
              <td
                className="p-2 font-medium"
                style={{ border: '1px solid #cbd5e1', color: '#1e293b' }}
              >
                Total OpEx
              </td>
              <td
                className="p-2 text-right"
                style={{ border: '1px solid #cbd5e1', color: '#1e293b' }}
              >
                {formatCurrency(fin.threeYearSummary[0].opex, curr)}
              </td>
              <td
                className="p-2 text-right"
                style={{ border: '1px solid #cbd5e1', color: '#1e293b' }}
              >
                {formatCurrency(fin.threeYearSummary[1].opex, curr)}
              </td>
              <td
                className="p-2 text-right"
                style={{ border: '1px solid #cbd5e1', color: '#1e293b' }}
              >
                {formatCurrency(fin.threeYearSummary[2].opex, curr)}
              </td>
            </tr>
            <tr style={{ backgroundColor: '#f8fafc', fontWeight: 'bold' }}>
              <td
                className="p-2"
                style={{ border: '1px solid #cbd5e1', color: '#0f172a' }}
              >
                Laba Bersih
              </td>
              <td
                className="p-2 text-right"
                style={{ border: '1px solid #cbd5e1', color: '#0f172a' }}
              >
                {formatCurrency(fin.threeYearSummary[0].netProfit, curr)}
              </td>
              <td
                className="p-2 text-right"
                style={{ border: '1px solid #cbd5e1', color: '#0f172a' }}
              >
                {formatCurrency(fin.threeYearSummary[1].netProfit, curr)}
              </td>
              <td
                className="p-2 text-right"
                style={{ border: '1px solid #cbd5e1', color: '#0f172a' }}
              >
                {formatCurrency(fin.threeYearSummary[2].netProfit, curr)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 5. Risk Management */}
      <div className="mb-6">
        <h2
          className="text-lg font-bold pb-2 mb-3 uppercase tracking-wider"
          style={{ color: '#0f172a', borderBottom: '1px solid #e2e8f0' }}
        >
          5. Manajemen Risiko & Mitigasi
        </h2>
        <table
          className="w-full text-xs border-collapse"
          style={{ border: '1px solid #cbd5e1' }}
        >
          <thead>
            <tr style={{ backgroundColor: '#f1f5f9', color: '#0f172a' }}>
              <th
                className="p-2 text-left w-1/3"
                style={{ border: '1px solid #cbd5e1' }}
              >
                Potensi Risiko
              </th>
              <th
                className="p-2 text-center w-1/6"
                style={{ border: '1px solid #cbd5e1' }}
              >
                Dampak
              </th>
              <th
                className="p-2 text-left w-1/2"
                style={{ border: '1px solid #cbd5e1' }}
              >
                Strategi Mitigasi
              </th>
            </tr>
          </thead>
          <tbody>
            {plan.riskManagement.map((r) => (
              <tr key={r.id}>
                <td
                  className="p-2 font-medium"
                  style={{ border: '1px solid #cbd5e1', color: '#1e293b' }}
                >
                  {r.risk}
                </td>
                <td
                  className="p-2 text-center font-bold"
                  style={{ border: '1px solid #cbd5e1', color: '#1e293b' }}
                >
                  {r.impact}
                </td>
                <td
                  className="p-2"
                  style={{ border: '1px solid #cbd5e1', color: '#1e293b' }}
                >
                  {r.mitigation}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div
        className="pt-4 text-center text-[10px]"
        style={{ borderTop: '1px solid #cbd5e1', color: '#94a3b8' }}
      >
        Disusun & diterbitkan menggunakan CorPlan Consultant Platform
      </div>
    </div>
  );
};
