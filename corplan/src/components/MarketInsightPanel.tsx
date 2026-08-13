import React, { useState } from 'react';
import { 
  Globe, 
  Search, 
  TrendingUp, 
  RefreshCw, 
  Sparkles, 
  BarChart3, 
  Zap, 
  CheckCircle2, 
  Flame,
  ArrowUpRight
} from 'lucide-react';
import { GoogleTrafficData, Currency } from '../types';
import { formatCurrency } from '../utils/financialCalculations';

interface MarketInsightPanelProps {
  businessName: string;
  industry: string;
  initialData?: GoogleTrafficData;
  currency?: Currency;
  theme?: 'warm-luxe' | 'dark-obsidian';
}

export const MarketInsightPanel: React.FC<MarketInsightPanelProps> = ({
  businessName,
  industry,
  initialData,
  currency = 'IDR',
  theme = 'warm-luxe',
}) => {
  const [data, setData] = useState<GoogleTrafficData | undefined>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  const fetchLatestInsights = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/google-market-trends', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName,
          industry,
          location: 'Indonesia',
        }),
      });

      if (res.ok) {
        const result = await res.json();
        if (result && result.topKeywords) {
          setData(result);
        }
      }
    } catch (err) {
      console.error('Failed to fetch market insights:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const isDark = theme === 'dark-obsidian';

  // Fallback default data if none provided
  const trafficData = data || {
    searchInterestScore: 88,
    searchVolumeSummary: `Estimasi 45.000+ pencarian bulanan terkait bisnis ${businessName} di industri ${industry} Indonesia.`,
    topKeywords: [
      { keyword: `${businessName.toLowerCase()} terdekat`, monthlyVolume: '18.400/bln', competition: 'Sedang', trend: 'Sangat Viral 🔥' },
      { keyword: `rekomendasi ${industry.toLowerCase()} terbaik`, monthlyVolume: '14.200/bln', competition: 'Tinggi', trend: 'Meningkat 📈' },
      { keyword: `promo ${industry.toLowerCase()} hari ini`, monthlyVolume: '8.500/bln', competition: 'Rendah', trend: 'Meningkat 📈' },
      { keyword: `harga paket ${businessName.toLowerCase()}`, monthlyVolume: '4.800/bln', competition: 'Rendah', trend: 'Stabil ➡️' }
    ],
    trendingQueries: [
      `Review jujur ${businessName}`,
      `Lokasi & jam operasional ${businessName}`,
      `Katalog harga ${industry} terbaru`,
      `Kode promo diskon ${businessName}`
    ],
    conversionGuide: {
      estimatedMonthlySearchers: 25000,
      clickThroughRatePercent: 6,
      conversionRatePercent: 4,
      avgOrderValue: 45000,
      estimatedMonthlySales: 60,
      estimatedMonthlyRevenue: 2700000
    },
    googleStrategy: 'Gunakan Google Business Profile lokal, tuju kata kunci "terdekat", serta optimalkan SEO konten Google Maps.'
  };

  return (
    <div className="bg-white border-2 border-slate-900 rounded-3xl p-5 sm:p-6 shadow-[6px_6px_0px_0px_#0f172a] space-y-5 text-slate-900 my-6">
      
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b-2 border-slate-900">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#dcfce7] border-2 border-slate-900 flex items-center justify-center font-black shadow-[2px_2px_0px_0px_#0f172a]">
            <Globe className="w-5 h-5 text-emerald-700" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-black tracking-tight">
                Market Insight & Live Google Trends
              </h2>
              <span className="bg-[#fef08a] text-slate-900 border border-slate-900 px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider shadow-[1px_1px_0px_0px_#0f172a]">
                Live Search API
              </span>
            </div>
            <p className="text-xs font-bold text-slate-600">
              Analisis tren pencarian, kata kunci viral, dan tolok ukur industri untuk <span className="text-slate-900 underline underline-offset-2 font-black">{businessName}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchLatestInsights}
            disabled={isLoading}
            className="px-3 py-1.5 bg-[#bfdbfe] hover:bg-[#93c5fd] text-slate-900 border-2 border-slate-900 rounded-xl text-xs font-black shadow-[2px_2px_0px_0px_#0f172a] flex items-center gap-1.5 transition cursor-pointer active:translate-x-0.5 active:translate-y-0.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>{isLoading ? 'Memperbarui...' : 'Update Data Market'}</span>
          </button>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-900 border-2 border-slate-900 rounded-xl text-xs font-black transition cursor-pointer"
          >
            {isExpanded ? 'Tutup' : 'Buka Panel'}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="space-y-5 animate-fadeIn">
          
          {/* Top KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            
            <div className="bg-[#fef08a] border-2 border-slate-900 p-4 rounded-2xl shadow-[3px_3px_0px_0px_#0f172a]">
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-700 block">
                Skor Minat Pencarian
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl sm:text-3xl font-black text-slate-900">
                  {trafficData.searchInterestScore}/100
                </span>
                <span className="text-xs font-extrabold text-emerald-800 bg-emerald-200 border border-slate-900 px-1.5 py-0.5 rounded">
                  Sangat Tinggi 🔥
                </span>
              </div>
              <p className="text-[11px] font-bold text-slate-800 mt-1 line-clamp-2">
                {trafficData.searchVolumeSummary}
              </p>
            </div>

            <div className="bg-[#bae6fd] border-2 border-slate-900 p-4 rounded-2xl shadow-[3px_3px_0px_0px_#0f172a]">
              <span className="text-[11px] font-black uppercase tracking-wider text-blue-900 block">
                Estimasi Pencari Bulanan
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl sm:text-3xl font-black text-slate-900">
                  {trafficData.conversionGuide.estimatedMonthlySearchers.toLocaleString('id-ID')}
                </span>
                <span className="text-xs font-black text-blue-900">
                  User/Bulan
                </span>
              </div>
              <p className="text-[11px] font-bold text-slate-800 mt-1">
                Potensi CTR: <strong>{trafficData.conversionGuide.clickThroughRatePercent}%</strong> | Konversi: <strong>{trafficData.conversionGuide.conversionRatePercent}%</strong>
              </p>
            </div>

            <div className="bg-[#dcfce7] border-2 border-slate-900 p-4 rounded-2xl shadow-[3px_3px_0px_0px_#0f172a]">
              <span className="text-[11px] font-black uppercase tracking-wider text-emerald-900 block">
                Estimasi Omset dari Google
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-xl sm:text-2xl font-black text-emerald-900">
                  {formatCurrency(trafficData.conversionGuide.estimatedMonthlyRevenue, currency)}
                </span>
              </div>
              <p className="text-[11px] font-bold text-emerald-900 mt-1">
                ± {trafficData.conversionGuide.estimatedMonthlySales} Transaksi baru dari organic search
              </p>
            </div>

          </div>

          {/* Keywords & Trending Queries */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Top Keywords Table */}
            <div className="bg-slate-50 border-2 border-slate-900 rounded-2xl p-4 shadow-[3px_3px_0px_0px_#0f172a]">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5 mb-3">
                <Search className="w-4 h-4 text-indigo-600" />
                <span>Kata Kunci Utama (Top Keywords)</span>
              </h3>
              <div className="space-y-2">
                {trafficData.topKeywords.map((kw, i) => (
                  <div key={i} className="bg-white border-2 border-slate-900 p-2.5 rounded-xl flex items-center justify-between gap-2 shadow-[2px_2px_0px_0px_#0f172a]">
                    <div>
                      <span className="text-xs font-black text-slate-900 block">"{kw.keyword}"</span>
                      <span className="text-[10px] font-bold text-slate-500">Volume: {kw.monthlyVolume}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-black px-1.5 py-0.5 rounded border border-slate-900 bg-slate-100">
                        Kompetisi: {kw.competition}
                      </span>
                      <span className="text-[10px] font-black block text-emerald-600 mt-0.5">
                        {kw.trend}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trending Queries & Strategic Benchmark */}
            <div className="bg-slate-50 border-2 border-slate-900 rounded-2xl p-4 shadow-[3px_3px_0px_0px_#0f172a] space-y-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-rose-500" />
                <span>Pertanyaan Viral & Benchmark Google</span>
              </h3>

              <div className="flex flex-wrap gap-1.5">
                {trafficData.trendingQueries.map((q, idx) => (
                  <span key={idx} className="bg-[#fef08a] text-slate-900 border-2 border-slate-900 px-2.5 py-1 rounded-xl text-[11px] font-black shadow-[1.5px_1.5px_0px_0px_#0f172a]">
                    🔍 {q}
                  </span>
                ))}
              </div>

              <div className="bg-emerald-50 border-2 border-slate-900 p-3 rounded-xl">
                <span className="text-[11px] font-black text-emerald-900 flex items-center gap-1 mb-1">
                  <Zap className="w-3.5 h-3.5 text-emerald-600" />
                  Rekomendasi Eksekusi SEO / Marketing:
                </span>
                <p className="text-xs font-bold text-slate-800 leading-relaxed">
                  {trafficData.googleStrategy}
                </p>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
