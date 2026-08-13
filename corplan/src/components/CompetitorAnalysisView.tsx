import React, { useState } from 'react';
import { 
  Users, 
  RefreshCw, 
  Sparkles, 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  TrendingUp, 
  Award, 
  Swords, 
  Target, 
  Zap,
  HelpCircle
} from 'lucide-react';
import { BusinessPlanData, CompetitorAnalysisData, CompetitorInfo, Currency } from '../types';
import { formatCurrency } from '../utils/financialCalculations';

interface CompetitorAnalysisViewProps {
  plan: BusinessPlanData;
  onUpdatePlan?: (updatedPlan: BusinessPlanData) => void;
  language?: string;
  theme?: 'warm-luxe' | 'dark-obsidian';
}

export const CompetitorAnalysisView: React.FC<CompetitorAnalysisViewProps> = ({
  plan,
  onUpdatePlan,
  language = 'id',
  theme = 'warm-luxe',
}) => {
  const [data, setData] = useState<CompetitorAnalysisData | undefined>(plan.competitorAnalysis);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCompetitorAnalysis = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/competitor-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName: plan.businessName,
          industry: plan.industry,
          description: plan.executiveSummary,
          targetMarket: plan.marketAnalysis.targetAudience,
        }),
      });

      if (res.ok) {
        const result: CompetitorAnalysisData = await res.json();
        if (result && result.competitors) {
          setData(result);
          if (onUpdatePlan) {
            onUpdatePlan({
              ...plan,
              competitorAnalysis: result,
            });
          }
        }
      } else {
        setError('Gagal mengambil analisis pesaing dari server AI.');
      }
    } catch (err) {
      console.error('Error fetching competitor analysis:', err);
      setError('Koneksi bermasalah saat menghubungi AI Gemini.');
    } finally {
      setIsLoading(false);
    }
  };

  // Fallback default data if none exists
  const analysis = data || {
    summary: `Analisis lanskap persaingan usaha ${plan.businessName} di industri ${plan.industry} Indonesia. Pesaing terdiri dari merek terkemuka yang dominan serta pemain independen lokal.`,
    ourStrengths: [
      `Diferensiasi produk & proposisi nilai unik milik ${plan.businessName}`,
      'Struktur biaya operasional efisien & penetapan harga fleksibel',
      'Responsivitas tinggi terhadap tren dan kebutuhan konsumen lokal'
    ],
    ourWeaknesses: [
      'Skala brand dan pangsa pasar dalam tahap pertumbuhan awal',
      'Jangkauan distribusi dan jumlah lokasi fisik masih terbatas'
    ],
    competitors: [
      {
        name: 'Pemain Utama / Franchise Nasional',
        type: 'Pesaing Langsung (Direct)',
        marketShare: 'Sangat Tinggi (Nasional)',
        pricingStrategy: 'Rp 20.000 - Rp 50.000',
        keyStrengths: ['Modal besar, brand awareness tinggi, jaringan outlet luas'],
        keyWeaknesses: ['Layanan kurang personal, biaya overhead operasional tinggi'],
        threatLevel: 'Tinggi' as const,
        differentiationStrategy: 'Fokus pada fleksibilitas layanan kustom, komunitas lokal, dan efisiensi harga.'
      },
      {
        name: 'Merek Premium / Global',
        type: 'Pesaing Langsung Premium',
        marketShare: 'Tinggi (Urban Tier-1)',
        pricingStrategy: 'Rp 50.000 - Rp 100.000',
        keyStrengths: ['Sensasi merek bergengsi, standar kualitas produk internasional'],
        keyWeaknesses: ['Harga terlampau mahal untuk konsumen segmen menengah ke bawah'],
        threatLevel: 'Sedang' as const,
        differentiationStrategy: 'Menyediakan kualitas sepadan dengan harga 30%-40% lebih terjangkau.'
      },
      {
        name: 'Pemain Lokal & Alternatif Substitusi',
        type: 'Pesaing Tidak Langsung',
        marketShare: 'Terfragmentasi',
        pricingStrategy: 'Rp 15.000 - Rp 30.000',
        keyStrengths: ['Harga sangat ekonomis, lokasi dekat dengan pemukiman'],
        keyWeaknesses: ['Kualitas belum terstandardisasi, variasi produk terbatas'],
        threatLevel: 'Rendah' as const,
        differentiationStrategy: 'Jaminan standar higienitas, pengalaman layanan modern, dan program loyalitas.'
      }
    ],
    strategicRecommendations: [
      'Gunakan strategi penetapan harga penetrasi pasar untuk menarik perhatian pengguna awal.',
      'Optimalkan pemasaran digital berbasis konten lokal & kampanye ulasan pelanggan.',
      'Pertahankan keunggulan layanan agar menciptakan retensi tinggi melebihi pesaing besar.'
    ]
  };

  return (
    <div className="space-y-6 text-slate-900 animate-fadeIn">
      
      {/* Top Header Card */}
      <div className="bg-white border-2 border-slate-900 rounded-3xl p-5 sm:p-6 shadow-[6px_6px_0px_0px_#0f172a] space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b-2 border-slate-900">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#fef08a] border-2 border-slate-900 flex items-center justify-center font-black shadow-[2.5px_2.5px_0px_0px_#0f172a]">
              <Swords className="w-6 h-6 text-slate-900" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-slate-900">
                  Analisis Pesaing & Matriks Kompetisi Pasar
                </h2>
                <span className="bg-[#bfdbfe] text-slate-900 border border-slate-900 px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider shadow-[1px_1px_0px_0px_#0f172a]">
                  Gemini AI Powered
                </span>
              </div>
              <p className="text-xs font-bold text-slate-600">
                Peta persaingan bisnis untuk <span className="text-slate-900 underline underline-offset-2 font-black">{plan.businessName}</span> di industri <span className="font-extrabold">{plan.industry}</span>
              </p>
            </div>
          </div>

          <button
            onClick={fetchCompetitorAnalysis}
            disabled={isLoading}
            className="px-4 py-2 bg-[#fef08a] hover:bg-[#fde047] text-slate-900 border-2 border-slate-900 rounded-xl text-xs font-black shadow-[3px_3px_0px_0px_#0f172a] flex items-center gap-2 transition cursor-pointer active:translate-x-0.5 active:translate-y-0.5"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span>{isLoading ? 'Menganalisis Pesaing...' : 'Analisis Ulang dengan Gemini'}</span>
          </button>
        </div>

        {error && (
          <div className="bg-rose-100 border-2 border-slate-900 text-rose-900 p-3 rounded-xl text-xs font-bold flex items-center gap-2">
            <XCircle className="w-4 h-4 text-rose-700" />
            <span>{error}</span>
          </div>
        )}

        {/* Executive Summary of Competition */}
        <div className="bg-slate-50 border-2 border-slate-900 p-4 rounded-2xl shadow-[3px_3px_0px_0px_#0f172a]">
          <span className="text-[11px] font-black uppercase tracking-wider text-slate-700 block mb-1">
            📌 Ringkasan Lanskap Persaingan Pasar
          </span>
          <p className="text-xs font-extrabold text-slate-800 leading-relaxed">
            {analysis.summary}
          </p>
        </div>

        {/* Our Strengths vs Weaknesses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Keunggulan Usaha Kita */}
          <div className="bg-[#dcfce7] border-2 border-slate-900 p-4 rounded-2xl shadow-[3px_3px_0px_0px_#0f172a] space-y-2">
            <h3 className="text-xs font-black uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>Keunggulan Kompetitif {plan.businessName}</span>
            </h3>
            <ul className="space-y-1.5">
              {analysis.ourStrengths.map((s, idx) => (
                <li key={idx} className="text-xs font-bold text-slate-900 flex items-start gap-2 bg-white/70 p-2 rounded-xl border border-slate-900/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Kelemahan / Tantangan Awal Kita */}
          <div className="bg-[#fbcfe8] border-2 border-slate-900 p-4 rounded-2xl shadow-[3px_3px_0px_0px_#0f172a] space-y-2">
            <h3 className="text-xs font-black uppercase tracking-wider text-rose-900 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-rose-700" />
              <span>Tantangan & Kelemahan Awal Kita</span>
            </h3>
            <ul className="space-y-1.5">
              {analysis.ourWeaknesses.map((w, idx) => (
                <li key={idx} className="text-xs font-bold text-slate-900 flex items-start gap-2 bg-white/70 p-2 rounded-xl border border-slate-900/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-600 mt-1.5 shrink-0" />
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Main Comparative Competitors Table */}
      <div className="bg-white border-2 border-slate-900 rounded-3xl p-5 sm:p-6 shadow-[6px_6px_0px_0px_#0f172a] space-y-4">
        <div className="flex items-center justify-between pb-3 border-b-2 border-slate-900">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-600" />
            <h3 className="text-base sm:text-lg font-black text-slate-900">
              Tabel Komparasi Profil Pesaing Pasar (Competitor Matrix)
            </h3>
          </div>
          <span className="text-xs font-black bg-slate-100 border border-slate-900 px-2.5 py-1 rounded-lg">
            {analysis.competitors.length} Pesaing Teridentifikasi
          </span>
        </div>

        {/* Responsive Table Wrapper */}
        <div className="overflow-x-auto border-2 border-slate-900 rounded-2xl shadow-[4px_4px_0px_0px_#0f172a]">
          <table className="w-full text-left border-collapse min-w-[750px]">
            <thead>
              <tr className="bg-[#fef08a] border-b-2 border-slate-900 text-[11px] font-black uppercase tracking-wider text-slate-900">
                <th className="p-3 border-r-2 border-slate-900">Nama Pesaing & Kategori</th>
                <th className="p-3 border-r-2 border-slate-900">Pangsa Pasar</th>
                <th className="p-3 border-r-2 border-slate-900">Strategi Harga</th>
                <th className="p-3 border-r-2 border-slate-900">Kekuatan Utama</th>
                <th className="p-3 border-r-2 border-slate-900">Kelemahan & Celah</th>
                <th className="p-3 border-r-2 border-slate-900">Tingkat Ancaman</th>
                <th className="p-3">Strategi Diferensiasi Kita</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-slate-900 text-xs font-bold">
              {analysis.competitors.map((comp, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                  
                  {/* Name & Type */}
                  <td className="p-3 border-r-2 border-slate-900 align-top">
                    <span className="font-black text-slate-900 block text-xs">{comp.name}</span>
                    <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-900 border border-slate-900 mt-1 inline-block">
                      {comp.type}
                    </span>
                  </td>

                  {/* Market Share */}
                  <td className="p-3 border-r-2 border-slate-900 align-top text-slate-800">
                    {comp.marketShare}
                  </td>

                  {/* Pricing Strategy */}
                  <td className="p-3 border-r-2 border-slate-900 align-top font-black text-slate-900">
                    {comp.pricingStrategy}
                  </td>

                  {/* Key Strengths */}
                  <td className="p-3 border-r-2 border-slate-900 align-top text-slate-700">
                    <ul className="list-disc list-inside space-y-1 text-[11px]">
                      {Array.isArray(comp.keyStrengths) ? comp.keyStrengths.map((ks, i) => (
                        <li key={i}>{ks}</li>
                      )) : <li>{comp.keyStrengths}</li>}
                    </ul>
                  </td>

                  {/* Key Weaknesses */}
                  <td className="p-3 border-r-2 border-slate-900 align-top text-slate-700">
                    <ul className="list-disc list-inside space-y-1 text-[11px]">
                      {Array.isArray(comp.keyWeaknesses) ? comp.keyWeaknesses.map((kw, i) => (
                        <li key={i}>{kw}</li>
                      )) : <li>{comp.keyWeaknesses}</li>}
                    </ul>
                  </td>

                  {/* Threat Level */}
                  <td className="p-3 border-r-2 border-slate-900 align-top">
                    <span className={`text-[10px] font-black px-2 py-1 rounded-md border border-slate-900 shadow-[1px_1px_0px_0px_#0f172a] ${
                      comp.threatLevel === 'Tinggi'
                        ? 'bg-rose-200 text-rose-900'
                        : comp.threatLevel === 'Sedang'
                        ? 'bg-amber-200 text-amber-900'
                        : 'bg-emerald-200 text-emerald-900'
                    }`}>
                      {comp.threatLevel === 'Tinggi' ? '⚠️ Tinggi' : comp.threatLevel === 'Sedang' ? '⚡ Sedang' : '✅ Rendah'}
                    </span>
                  </td>

                  {/* Differentiation Strategy */}
                  <td className="p-3 align-top text-slate-900 bg-emerald-50/50">
                    <p className="text-[11px] font-extrabold text-emerald-900 leading-snug">
                      💡 {comp.differentiationStrategy}
                    </p>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Strategic Recommendations Cards */}
      <div className="bg-white border-2 border-slate-900 rounded-3xl p-5 sm:p-6 shadow-[6px_6px_0px_0px_#0f172a] space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b-2 border-slate-900">
          <Target className="w-5 h-5 text-emerald-600" />
          <h3 className="text-base sm:text-lg font-black text-slate-900">
            Rekomendasi Taktis Memenangi Persaingan Pasar
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {analysis.strategicRecommendations.map((rec, i) => (
            <div key={i} className="bg-[#bae6fd] border-2 border-slate-900 p-4 rounded-2xl shadow-[3px_3px_0px_0px_#0f172a] space-y-1.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-blue-900 bg-white border border-slate-900 px-2 py-0.5 rounded shadow-[1px_1px_0px_0px_#0f172a]">
                Langkah {i + 1}
              </span>
              <p className="text-xs font-extrabold text-slate-900 leading-relaxed mt-1">
                {rec}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
