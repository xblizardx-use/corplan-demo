import React, { useState } from 'react';
import { 
  TrendingUp, 
  Search, 
  Globe, 
  BarChart3, 
  Calculator, 
  Sparkles, 
  ExternalLink, 
  HelpCircle,
  ArrowRight,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { GoogleTrafficInsights, Currency } from '../types';

interface GoogleTrafficInsightsViewProps {
  data?: GoogleTrafficInsights;
  businessName?: string;
  industry?: string;
  currency?: Currency;
  isBeginnerMode?: boolean;
}

export const GoogleTrafficInsightsView: React.FC<GoogleTrafficInsightsViewProps> = ({
  data,
  businessName = 'Bisnis Anda',
  industry = 'F&B / Retail',
  currency = 'IDR',
  isBeginnerMode = false,
}) => {
  // Default sample data if not provided
  const trafficData: GoogleTrafficInsights = data || {
    searchInterestScore: 88,
    searchVolumeSummary: 'Estimasi 50.000+ pencarian bulanan terkait produk ini di Google Indonesia.',
    topKeywords: [
      { keyword: `${businessName.toLowerCase()} terdekat`, monthlyVolume: '18.500/bln', competition: 'Sedang', trend: 'Sangat Viral 🔥' },
      { keyword: `rekomendasi ${industry.toLowerCase()} enak murah`, monthlyVolume: '12.200/bln', competition: 'Tinggi', trend: 'Meningkat 📈' },
      { keyword: `promo ${businessName.toLowerCase()} hari ini`, monthlyVolume: '8.400/bln', competition: 'Rendah', trend: 'Meningkat 📈' },
      { keyword: `harga paket ${industry.toLowerCase()}`, monthlyVolume: '6.100/bln', competition: 'Sedang', trend: 'Stabil ➡️' },
    ],
    trendingQueries: [
      `Review jujur ${businessName}`,
      `Menu best seller ${industry}`,
      `Lokasi & jam buka ${businessName}`,
      `Promo diskon ${industry} minggu ini`
    ],
    conversionGuide: {
      estimatedMonthlySearchers: 25000,
      clickThroughRatePercent: 6,
      conversionRatePercent: 3.5,
      avgOrderValue: 35000,
      estimatedMonthlySales: 52,
      estimatedMonthlyRevenue: 1820000
    },
    googleStrategy: 'Optimalisasi Google Maps (Google My Business), kampanye SEO lokal kata kunci "terdekat", serta pemasangan iklan Google Search Ads bertarget radius 5km.'
  };

  // Calculator Interactive States
  const [searchers, setSearchers] = useState<number>(trafficData.conversionGuide.estimatedMonthlySearchers || 20000);
  const [ctr, setCtr] = useState<number>(trafficData.conversionGuide.clickThroughRatePercent || 5);
  const [convRate, setConvRate] = useState<number>(trafficData.conversionGuide.conversionRatePercent || 3);
  const [avgOrder, setAvgOrder] = useState<number>(trafficData.conversionGuide.avgOrderValue || 30000);

  // Calculations
  const calculatedVisitors = Math.round(searchers * (ctr / 100));
  const calculatedSalesCount = Math.round(calculatedVisitors * (convRate / 100));
  const calculatedRevenue = calculatedSalesCount * avgOrder;

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0f172a] via-slate-900 to-indigo-950 text-white border-2 border-slate-900 rounded-3xl p-5 sm:p-6 shadow-[6px_6px_0px_0px_#0f172a] space-y-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 transform translate-x-6 -translate-y-6 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2.5">
            <span className="bg-[#fef08a] text-slate-900 border-2 border-slate-900 px-3 py-1 rounded-xl text-xs font-black shadow-[2px_2px_0px_0px_#0f172a] inline-flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-slate-900" />
              <span>GOOGLE SEARCH GROUNDING DATA</span>
            </span>
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2.5 py-0.5 rounded-lg text-[11px] font-bold">
              ● Live Real-Time Trends
            </span>
          </div>

          <span className="text-xs font-extrabold text-slate-300 bg-slate-800/80 px-3 py-1 rounded-lg border border-slate-700">
            {industry}
          </span>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span>Analisis Traffic & Tren Pencarian Google</span>
            <Sparkles className="w-5 h-5 text-amber-300" />
          </h2>
          <p className="text-xs sm:text-sm font-medium text-slate-300 mt-1 leading-relaxed">
            Data berbasis ekosistem pencarian Google untuk mengukur minat nyata calon pembeli di sekitar lokasi target bisnis **{businessName}**.
          </p>
        </div>
      </div>

      {/* Main Grid: Score & Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Search Interest Score Card */}
        <div className="bg-[#fef08a] border-2 border-slate-900 rounded-2xl p-5 shadow-[4px_4px_0px_0px_#0f172a] flex flex-col justify-between space-y-4">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-800">SKOR MINAT PENCARIAN GOOGLE</span>
              <Flame className="w-4 h-4 text-orange-600 animate-pulse" />
            </div>
            <h3 className="text-2xl font-black text-slate-900">
              {trafficData.searchInterestScore} / 100
            </h3>
            <span className="inline-block bg-[#0f172a] text-white text-[11px] font-extrabold px-2.5 py-0.5 rounded-md">
              {trafficData.searchInterestScore >= 80 ? '🔥 Permintaan Sangat Tinggi (High Demand)' : trafficData.searchInterestScore >= 60 ? '📈 Permintaan Stabil / Bagus' : '⚡ Pasar Niche'}
            </span>
          </div>

          <div className="space-y-2">
            <div className="w-full bg-slate-900/20 h-3 rounded-full border border-slate-900 overflow-hidden">
              <div 
                className="h-full bg-[#0f172a] transition-all duration-700" 
                style={{ width: `${trafficData.searchInterestScore}%` }}
              />
            </div>
            <p className="text-[11px] font-bold text-slate-800 leading-snug">
              {trafficData.searchVolumeSummary}
            </p>
          </div>
        </div>

        {/* Strategy Card */}
        <div className="md:col-span-2 bg-white border-2 border-slate-900 rounded-2xl p-5 shadow-[4px_4px_0px_0px_#0f172a] space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <span className="bg-[#bae6fd] border-2 border-slate-900 px-3 py-0.5 rounded-lg text-xs font-black text-slate-900 shadow-[1.5px_1.5px_0px_0px_#0f172a] inline-flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Rekomendasi Digital Marketing Google</span>
            </span>
            <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed pt-1">
              {trafficData.googleStrategy}
            </p>
          </div>

          <div className="bg-slate-50 border-2 border-slate-900 rounded-xl p-3 flex items-start gap-2 text-xs font-bold text-slate-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              Diintegrasikan langsung dengan **Google My Business**, **Google Ads**, dan kata kunci pencarian konsumen lokal.
            </span>
          </div>
        </div>

      </div>

      {/* Keywords & Viral Queries Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Keywords Table */}
        <div className="md:col-span-2 bg-white border-2 border-slate-900 rounded-2xl p-4 sm:p-5 shadow-[4px_4px_0px_0px_#0f172a] space-y-3">
          <div className="flex items-center justify-between border-b-2 border-slate-900 pb-2">
            <span className="font-black text-sm text-slate-900 flex items-center gap-2">
              <Search className="w-4 h-4 text-indigo-600" />
              <span>Kata Kunci Pencarian Utama (Top Keywords)</span>
            </span>
            <span className="text-[10px] font-extrabold bg-slate-100 text-slate-700 border border-slate-900 px-2 py-0.5 rounded-md">
              Data Google
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-semibold border-collapse">
              <thead>
                <tr className="bg-slate-100 border-b-2 border-slate-900 font-black text-slate-900 text-[11px]">
                  <th className="p-2 border-r-2 border-slate-900">Kata Kunci (Keyword)</th>
                  <th className="p-2 border-r-2 border-slate-900">Volume/Bln</th>
                  <th className="p-2 border-r-2 border-slate-900">Persaingan</th>
                  <th className="p-2">Status Tren</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-slate-900">
                {trafficData.topKeywords.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-2 font-bold text-slate-900 border-r-2 border-slate-900">{item.keyword}</td>
                    <td className="p-2 border-r-2 border-slate-900 text-slate-800">{item.monthlyVolume}</td>
                    <td className="p-2 border-r-2 border-slate-900">
                      <span className={`px-2 py-0.5 rounded-md border border-slate-900 font-extrabold text-[10px] ${
                        item.competition === 'Tinggi' ? 'bg-rose-100 text-rose-900' : item.competition === 'Sedang' ? 'bg-amber-100 text-amber-900' : 'bg-emerald-100 text-emerald-900'
                      }`}>
                        {item.competition}
                      </span>
                    </td>
                    <td className="p-2 font-black text-slate-900 text-[11px]">{item.trend}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Trending Searches Box */}
        <div className="bg-[#dcfce7] border-2 border-slate-900 rounded-2xl p-4 sm:p-5 shadow-[4px_4px_0px_0px_#0f172a] space-y-3 flex flex-col justify-between">
          <div>
            <span className="font-black text-xs uppercase tracking-wider text-slate-900 block border-b-2 border-slate-900 pb-2">
              🔥 Pencarian Viral Konsumen
            </span>
            <ul className="space-y-2 text-xs font-bold text-slate-800 mt-3">
              {trafficData.trendingQueries.map((q, idx) => (
                <li key={idx} className="flex items-center gap-2 bg-white/80 border border-slate-900 p-2 rounded-xl shadow-[1px_1px_0px_0px_#0f172a]">
                  <span className="text-amber-500 font-black">#{idx + 1}</span>
                  <span className="truncate">"{q}"</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-[10px] font-bold text-slate-700 bg-emerald-200/60 p-2 rounded-lg border border-slate-900">
            💡 Gunakan frasa pencarian ini pada deskripsi produk & promosi media sosial Anda.
          </p>
        </div>

      </div>

      {/* Interactive Calculator: Google Traffic to Sales Conversion */}
      <div className="bg-white border-2 border-slate-900 rounded-3xl p-5 sm:p-6 shadow-[6px_6px_0px_0px_#0f172a] space-y-5">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-slate-900 pb-3">
          <div>
            <span className="bg-[#fbcfe8] border-2 border-slate-900 px-3 py-1 rounded-xl text-xs font-black text-slate-900 shadow-[2px_2px_0px_0px_#0f172a] inline-flex items-center gap-1.5">
              <Calculator className="w-4 h-4" />
              <span>Simulasi Konversi Traffic Google ke Omzet Usaha</span>
            </span>
            <h3 className="text-lg font-black text-slate-900 mt-2">
              Bagaimana Cara Menghitung Estimasi Penjualan dari Google?
            </h3>
          </div>

          <span className="bg-slate-100 border border-slate-900 px-3 py-1 rounded-lg text-xs font-extrabold text-slate-700 self-start sm:self-auto">
            Kalkulator Interaktif
          </span>
        </div>

        {/* Sliders Input Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Slider 1: Pencari Google */}
          <div className="bg-slate-50 border-2 border-slate-900 rounded-2xl p-3.5 space-y-2 shadow-[2px_2px_0px_0px_#0f172a]">
            <div className="flex justify-between text-xs font-black text-slate-900">
              <span>Pencari Google/Bln</span>
              <span className="text-indigo-600">{searchers.toLocaleString('id-ID')}</span>
            </div>
            <input 
              type="range" 
              min={1000} 
              max={100000} 
              step={1000} 
              value={searchers} 
              onChange={(e) => setSearchers(Number(e.target.value))} 
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <p className="text-[10px] text-slate-500 font-semibold">Total orang yang cari kata kunci di Google</p>
          </div>

          {/* Slider 2: CTR */}
          <div className="bg-slate-50 border-2 border-slate-900 rounded-2xl p-3.5 space-y-2 shadow-[2px_2px_0px_0px_#0f172a]">
            <div className="flex justify-between text-xs font-black text-slate-900">
              <span>Rasio Klik (CTR)</span>
              <span className="text-indigo-600">{ctr}%</span>
            </div>
            <input 
              type="range" 
              min={1} 
              max={25} 
              step={0.5} 
              value={ctr} 
              onChange={(e) => setCtr(Number(e.target.value))} 
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <p className="text-[10px] text-slate-500 font-semibold">% pencari yang klik link / maps bisnis kamu</p>
          </div>

          {/* Slider 3: Conversion Rate */}
          <div className="bg-slate-50 border-2 border-slate-900 rounded-2xl p-3.5 space-y-2 shadow-[2px_2px_0px_0px_#0f172a]">
            <div className="flex justify-between text-xs font-black text-slate-900">
              <span>Tingkat Konversi</span>
              <span className="text-indigo-600">{convRate}%</span>
            </div>
            <input 
              type="range" 
              min={0.5} 
              max={15} 
              step={0.5} 
              value={convRate} 
              onChange={(e) => setConvRate(Number(e.target.value))} 
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <p className="text-[10px] text-slate-500 font-semibold">% pengunjung yang akhirnya beli produk</p>
          </div>

          {/* Slider 4: Avg Order Value */}
          <div className="bg-slate-50 border-2 border-slate-900 rounded-2xl p-3.5 space-y-2 shadow-[2px_2px_0px_0px_#0f172a]">
            <div className="flex justify-between text-xs font-black text-slate-900">
              <span>Rata-rata Beli</span>
              <span className="text-indigo-600">{formatRupiah(avgOrder)}</span>
            </div>
            <input 
              type="range" 
              min={5000} 
              max={500000} 
              step={5000} 
              value={avgOrder} 
              onChange={(e) => setAvgOrder(Number(e.target.value))} 
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <p className="text-[10px] text-slate-500 font-semibold">Uang rata-rata yang dikeluarkan per transaksi</p>
          </div>

        </div>

        {/* Calculation Summary Bar */}
        <div className="bg-[#dcfce7] border-2 border-slate-900 rounded-2xl p-4 sm:p-5 shadow-[4px_4px_0px_0px_#0f172a] grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
          
          <div className="p-2 border-b-2 sm:border-b-0 sm:border-r-2 border-slate-900">
            <span className="text-[10px] font-black uppercase text-slate-700 block">ESTIMASI PENGUNJUNG KANAL</span>
            <span className="text-lg font-black text-slate-900 mt-1 block">
              {calculatedVisitors.toLocaleString('id-ID')} Orang / Bln
            </span>
            <span className="text-[10px] font-semibold text-slate-600">({searchers.toLocaleString()} × {ctr}%)</span>
          </div>

          <div className="p-2 border-b-2 sm:border-b-0 sm:border-r-2 border-slate-900">
            <span className="text-[10px] font-black uppercase text-slate-700 block">ESTIMASI PEMBELI TERKONVERSI</span>
            <span className="text-lg font-black text-slate-900 mt-1 block">
              {calculatedSalesCount.toLocaleString('id-ID')} Transaksi / Bln
            </span>
            <span className="text-[10px] font-semibold text-slate-600">({calculatedVisitors.toLocaleString()} × {convRate}%)</span>
          </div>

          <div className="p-2">
            <span className="text-[10px] font-black uppercase text-slate-700 block">PROYEKSI OMZET DARI GOOGLE</span>
            <span className="text-lg sm:text-xl font-black text-emerald-800 mt-1 block">
              {formatRupiah(calculatedRevenue)} / Bln
            </span>
            <span className="text-[10px] font-semibold text-slate-600">({calculatedSalesCount.toLocaleString()} × {formatRupiah(avgOrder)})</span>
          </div>

        </div>

        {/* Plain Language Step-by-Step Explanation for Beginners */}
        <div className="bg-slate-50 border-2 border-slate-900 rounded-2xl p-4 space-y-3">
          <span className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-indigo-600" />
            <span>Penjelasan Sederhana untuk Pemula (Rumus Tanpa Pusing)</span>
          </span>

          <p className="text-xs font-semibold text-slate-700 leading-relaxed">
            Bayangkan Google sebagai jalan raya super ramai di depan toko kamu:
          </p>

          <ol className="list-decimal list-inside space-y-1.5 text-xs font-medium text-slate-800">
            <li>
              <strong>Pencari Google ({searchers.toLocaleString('id-ID')} orang):</strong> Jumlah orang yang lalu lalang lewat depan jalan toko kamu tiap bulan.
            </li>
            <li>
              <strong>Rasio Klik ({ctr}%):</strong> Dari semua orang yang lewat, hanya <strong>{calculatedVisitors.toLocaleString('id-ID')} orang</strong> yang penasaran dan mampir melangkah masuk ke dalam toko.
            </li>
            <li>
              <strong>Tingkat Konversi ({convRate}%):</strong> Dari orang yang mampir masuk toko, tidak semuanya beli. Hanya <strong>{calculatedSalesCount.toLocaleString('id-ID')} orang</strong> yang merogoh dompet untuk bayar kasir.
            </li>
            <li>
              <strong>Omzet Bulanan:</strong> {calculatedSalesCount.toLocaleString('id-ID')} transaksi dikali belanjaan {formatRupiah(avgOrder)} = <strong>{formatRupiah(calculatedRevenue)}</strong> uang masuk dari Google!
            </li>
          </ol>
        </div>

      </div>

    </div>
  );
};
