import React, { useState } from 'react';
import { 
  X, 
  Search, 
  Sparkles, 
  Building2, 
  PieChart, 
  Swords, 
  FileText, 
  Calculator, 
  ShieldAlert, 
  MessageSquare, 
  TrendingUp, 
  Landmark, 
  Award, 
  Share2, 
  Download, 
  ArrowRight,
  Sliders,
  CheckCircle2,
  Grid,
  Layers
} from 'lucide-react';
import { TabType } from './NavigationTabs';

export interface FeatureItem {
  id: string;
  title: string;
  category: 'Utama' | 'Finansial & Valuasi' | 'Pemasaran & Riset' | 'Utilitas & AI';
  description: string;
  icon: React.ElementType;
  badgeBg: string;
  tabTarget?: TabType;
  actionType?: 'tab' | 'export' | 'generator' | 'apikey' | 'blueprint';
}

interface FeaturesCatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tab: TabType) => void;
  onOpenExport?: () => void;
  onOpenGenerator?: () => void;
  onOpenApiKeyModal?: () => void;
  onOpenBlueprint?: () => void;
  theme?: 'warm-luxe' | 'dark-obsidian';
}

export const FeaturesCatalogModal: React.FC<FeaturesCatalogModalProps> = ({
  isOpen,
  onClose,
  onSelectTab,
  onOpenExport,
  onOpenGenerator,
  onOpenApiKeyModal,
  onOpenBlueprint,
  theme = 'warm-luxe',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [hoveredFeatureId, setHoveredFeatureId] = useState<string | null>(null);

  if (!isOpen) return null;

  const isDark = theme === 'dark-obsidian';

  const features: FeatureItem[] = [
    {
      id: 'plan',
      title: 'Proposal Bisnis AI (Bank Proposal)',
      category: 'Utama',
      description: 'Penyusunan rencana bisnis komprehensif mencakup Ringkasan Eksekutif, Analisis Pasar, Strategi Pemasaran, HPP, & Proyeksi Keuangan lengkap.',
      icon: Building2,
      badgeBg: 'bg-[#bfdbfe]',
      tabTarget: 'plan',
      actionType: 'tab',
    },
    {
      id: 'pitch',
      title: 'Pitch Deck Presentasi Investor',
      category: 'Utama',
      description: 'Tampilan 12 slide pitch deck interaktif standar modal ventura (VC) lengkap dengan Catatan Presenter, TAM/SAM/SOM, dan Ask Funding.',
      icon: PieChart,
      badgeBg: 'bg-[#fef08a]',
      tabTarget: 'pitch',
      actionType: 'tab',
    },
    {
      id: 'competitors',
      title: 'Matriks Pesaing & Analisis Kompetitor',
      category: 'Pemasaran & Riset',
      description: 'Pemetaan kekuatan, kelemahan, tingkat ancaman, rentang harga, dan strategi diferensiasi pesaing langsung & tidak langsung.',
      icon: Swords,
      badgeBg: 'bg-[#fed7aa]',
      tabTarget: 'competitors',
      actionType: 'tab',
    },
    {
      id: 'eform',
      title: 'E-Form Formulir Bisnis Digital',
      category: 'Utama',
      description: 'Formulir isian digital untuk validasi legalitas NIB, verifikasi profil usaha, dan pengajuan dokumen perizinan bisnis.',
      icon: FileText,
      badgeBg: 'bg-[#dcfce7]',
      tabTarget: 'eform',
      actionType: 'tab',
    },
    {
      id: 'financials',
      title: 'Kalkulator Keuangan & HPP Spreadsheet',
      category: 'Finansial & Valuasi',
      description: 'Kalkulator spreadsheet interaktif untuk menghitung CapEx, OpEx, COGS, penetapan harga jual, dan Break-Even Point (BEP).',
      icon: Calculator,
      badgeBg: 'bg-[#f5d0fe]',
      tabTarget: 'financials',
      actionType: 'tab',
    },
    {
      id: 'kur-simulator',
      title: 'Bank Loan & KUR Eligibility Simulator',
      category: 'Finansial & Valuasi',
      description: 'Simulasi kelayakan pengajuan pinjaman bank & Kredit Usaha Rakyat (KUR) dilengkapi skor kelayakan dan estimasi cicilan bulanan.',
      icon: Landmark,
      badgeBg: 'bg-[#dcfce7]',
      tabTarget: 'financials',
      actionType: 'tab',
    },
    {
      id: 'valuation',
      title: 'AI Valuation & Investor Scorecard',
      category: 'Finansial & Valuasi',
      description: 'Hitung estimasi nilai valuasi usaha berdasarkan multiple pendapatan & laba bersih, serta indikator daya tarik investasi.',
      icon: Award,
      badgeBg: 'bg-[#fef08a]',
      tabTarget: 'financials',
      actionType: 'tab',
    },
    {
      id: 'digital-marketing',
      title: 'Digital Marketing & 30-Day Content Engine',
      category: 'Pemasaran & Riset',
      description: 'Strategi pemasaran digital terpadu dan ide kalender konten 30 hari untuk Instagram, TikTok, dan Google Business.',
      icon: Share2,
      badgeBg: 'bg-[#bfdbfe]',
      tabTarget: 'financials',
      actionType: 'tab',
    },
    {
      id: 'matrix',
      title: 'SWOT & Matriks Manajemen Risiko',
      category: 'Utama',
      description: 'Analisis Kekuatan, Kelemahan, Peluang, dan Ancaman (SWOT) serta matriks mitigasi risiko operasional dan pasar.',
      icon: ShieldAlert,
      badgeBg: 'bg-[#fbcfe8]',
      tabTarget: 'matrix',
      actionType: 'tab',
    },
    {
      id: 'chat',
      title: 'Konsultan AI Chat 24/7',
      category: 'Utilitas & AI',
      description: 'Asisten AI Konsultan Bisnis pribadi untuk diskusi strategi, rekomendasi operasional, dan pemecahan kendala usaha.',
      icon: MessageSquare,
      badgeBg: 'bg-[#bae6fd]',
      tabTarget: 'chat',
      actionType: 'tab',
    },
    {
      id: 'google-trends',
      title: 'Google Market Trends & Traffic Analyzer',
      category: 'Pemasaran & Riset',
      description: 'Riset volume pencarian kata kunci Google di Indonesia, tren topik viral, dan simulasi proyeksi potensi penjualan.',
      icon: TrendingUp,
      badgeBg: 'bg-[#e9d5ff]',
      tabTarget: 'plan',
      actionType: 'tab',
    },
    {
      id: 'generator',
      title: 'Generator Proposal Bisnis Instan AI',
      category: 'Utilitas & AI',
      description: 'Buat rencana bisnis baru dari nol menggunakan AI Generator atau pilih dari preset bisnis populer (Kopi, SaaS, Fashion).',
      icon: Sparkles,
      badgeBg: 'bg-[#fef08a]',
      actionType: 'generator',
    },
    {
      id: 'export',
      title: 'Ekspor Dokumen & Cetak PDF',
      category: 'Utilitas & AI',
      description: 'Cetak proposal ke format PDF resmi, atau ekspor ringkasan dalam format Markdown, JSON, dan salinan teks.',
      icon: Download,
      badgeBg: 'bg-[#e2e8f0]',
      actionType: 'export',
    },
    {
      id: 'apikey',
      title: 'Pengaturan API Key Gemini & Tone AI',
      category: 'Utilitas & AI',
      description: 'Sesuaikan Kunci API Gemini milik pribadi serta pilih gaya tutur kalimat AI (Formal, Conversational, atau Pemula).',
      icon: Sliders,
      badgeBg: 'bg-[#bfdbfe]',
      actionType: 'apikey',
    },
    {
      id: 'blueprint',
      title: 'Proposal Blueprint & Cetak Biru Sistem',
      category: 'Utilitas & AI',
      description: 'Dokumen cetak biru proposal resmi berisi arsitektur sistem, spesifikasi lengkap modul, integrasi AI, & mekanisme keamanan CorPlan.',
      icon: FileText,
      badgeBg: 'bg-[#fde047]',
      actionType: 'blueprint',
    },
  ];

  const categories = ['Semua', 'Utama', 'Finansial & Valuasi', 'Pemasaran & Riset', 'Utilitas & AI'];

  const filteredFeatures = features.filter(f => {
    const matchesSearch = f.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          f.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          f.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Semua' || f.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const activeHoveredFeature = features.find(f => f.id === hoveredFeatureId) || filteredFeatures[0] || features[0];

  const handleFeatureClick = (feature: FeatureItem) => {
    if (feature.actionType === 'export') {
      if (onOpenExport) onOpenExport();
    } else if (feature.actionType === 'generator') {
      if (onOpenGenerator) onOpenGenerator();
    } else if (feature.actionType === 'apikey') {
      if (onOpenApiKeyModal) onOpenApiKeyModal();
    } else if (feature.actionType === 'blueprint') {
      if (onOpenBlueprint) onOpenBlueprint();
    } else if (feature.tabTarget) {
      onSelectTab(feature.tabTarget);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className={`w-full max-w-4xl max-h-[90vh] rounded-2xl border-4 border-slate-900 shadow-[8px_8px_0px_0px_#0f172a] flex flex-col overflow-hidden transition-all ${
          isDark ? 'bg-[#0f172a] text-slate-100 border-white/20 shadow-[8px_8px_0px_0px_#000]' : 'bg-[#fbf9f4] text-slate-900'
        }`}
      >
        {/* Modal Header */}
        <div className={`p-5 sm:p-6 border-b-4 border-slate-900 dark:border-white/20 flex items-center justify-between gap-4 ${
          isDark ? 'bg-indigo-950/60' : 'bg-[#fef08a]'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-amber-300 border-2 border-slate-900 flex items-center justify-center font-black shadow-[2px_2px_0px_0px_#0f172a] shrink-0">
              <Layers className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-2">
                🚀 Katalog Fitur Aplikasi
              </h2>
              <p className="text-xs sm:text-sm font-bold opacity-80">
                Pilih salah satu fitur di bawah ini untuk langsung menuju ke halaman fitur tersebut
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl border-2 border-slate-900 bg-white dark:bg-slate-800 hover:bg-rose-100 text-slate-900 dark:text-white flex items-center justify-center font-black shadow-[2px_2px_0px_0px_#0f172a] active:translate-x-0.5 active:translate-y-0.5 transition cursor-pointer shrink-0"
            title="Tutup Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className={`p-4 border-b-2 border-slate-900 dark:border-white/20 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between ${
          isDark ? 'bg-slate-900/80' : 'bg-white/80'
        }`}>
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari fitur (contoh: KUR, Pitch Deck, HPP, SWOT, Valuation)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-xl border-2 border-slate-900 text-xs font-bold focus:outline-none shadow-[2px_2px_0px_0px_#0f172a] ${
                isDark ? 'bg-slate-800 text-white placeholder-slate-400 border-white/20' : 'bg-slate-50 text-slate-900 placeholder-slate-500'
              }`}
            />
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl border-2 border-slate-900 text-xs font-black shadow-[1.5px_1.5px_0px_0px_#0f172a] transition whitespace-nowrap cursor-pointer shrink-0 ${
                    isActive 
                      ? 'bg-[#fef08a] text-slate-900' 
                      : isDark ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-white hover:bg-slate-100 text-slate-800'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Live Feature Spotlight Banner on Hover */}
        {activeHoveredFeature && (
          <div className={`px-4 py-3 sm:px-6 sm:py-3.5 border-b-2 border-slate-900 dark:border-white/20 transition-all ${
            isDark ? 'bg-indigo-950/90 text-slate-100' : 'bg-[#fef08a]/90 text-slate-900'
          }`}>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl border-2 border-slate-900 bg-white flex items-center justify-center font-black text-slate-900 shadow-[2px_2px_0px_0px_#0f172a] shrink-0 mt-0.5">
                {React.createElement(activeHoveredFeature.icon, { className: 'w-4 h-4 text-slate-900' })}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-0.5">
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded border border-slate-900 bg-slate-900 text-amber-300 shadow-[1px_1px_0px_0px_#0f172a]">
                    Pratinjau Kursor: {activeHoveredFeature.category}
                  </span>
                  <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white truncate">
                    {activeHoveredFeature.title}
                  </h4>
                </div>
                <p className="text-xs font-bold opacity-90 leading-snug line-clamp-2">
                  {activeHoveredFeature.description}
                </p>
              </div>
              <button
                onClick={() => handleFeatureClick(activeHoveredFeature)}
                className="hidden sm:flex items-center gap-1 px-3 py-1.5 bg-slate-900 text-amber-300 rounded-xl border-2 border-slate-900 text-xs font-black shadow-[2px_2px_0px_0px_#0f172a] hover:bg-slate-800 transition cursor-pointer shrink-0"
              >
                <span>Buka</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Features Grid */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredFeatures.length === 0 ? (
            <div className="col-span-full py-12 text-center">
              <p className="text-sm font-bold opacity-70">
                Tidak ada fitur yang cocok dengan kata kunci &quot;{searchQuery}&quot;.
              </p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('Semua'); }}
                className="mt-3 px-4 py-2 bg-[#fef08a] border-2 border-slate-900 rounded-xl text-xs font-black text-slate-900 shadow-[2px_2px_0px_0px_#0f172a]"
              >
                Reset Pencarian
              </button>
            </div>
          ) : (
            filteredFeatures.map((feat) => {
              const IconComp = feat.icon;
              const isHovered = hoveredFeatureId === feat.id;

              return (
                <div
                  key={feat.id}
                  onClick={() => handleFeatureClick(feat)}
                  onMouseEnter={() => setHoveredFeatureId(feat.id)}
                  onMouseLeave={() => setHoveredFeatureId(null)}
                  className={`group border-3 border-slate-900 rounded-2xl p-4 sm:p-5 flex flex-col justify-between gap-3 shadow-[4px_4px_0px_0px_#0f172a] transition-all cursor-pointer relative ${
                    isHovered
                      ? 'bg-[#fef08a] text-slate-900 shadow-[7px_7px_0px_0px_#0f172a] -translate-x-1 -translate-y-1 scale-[1.01] z-10 border-slate-900'
                      : isDark 
                        ? 'bg-slate-800/90 border-white/20 text-slate-100 hover:border-amber-300' 
                        : 'bg-white text-slate-900 hover:bg-amber-50/60'
                  }`}
                >
                  <div>
                    {/* Top Row: Icon + Category Badge */}
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <div className={`w-10 h-10 rounded-xl border-2 border-slate-900 ${feat.badgeBg} flex items-center justify-center font-black text-slate-900 shadow-[2px_2px_0px_0px_#0f172a] shrink-0 group-hover:scale-110 transition-transform`}>
                        <IconComp className="w-5 h-5 text-slate-900" />
                      </div>
                      
                      <span className={`text-[10px] font-black px-2.5 py-1 rounded-lg border border-slate-900 shadow-[1px_1px_0px_0px_#0f172a] ${
                        isHovered ? 'bg-slate-900 text-amber-300' : 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200'
                      }`}>
                        {feat.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className={`font-black text-base sm:text-lg leading-snug break-words flex items-center gap-1.5 transition-colors ${
                      isHovered ? 'text-slate-900' : 'text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-amber-300'
                    }`}>
                      <span>{feat.title}</span>
                    </h3>

                    {/* Description */}
                    <p className={`text-xs font-semibold mt-2 leading-relaxed transition-colors ${
                      isHovered ? 'text-slate-950 font-extrabold' : 'text-slate-600 dark:text-slate-300'
                    }`}>
                      {feat.description}
                    </p>
                  </div>

                  {/* Bottom Trigger Action */}
                  <div className={`pt-2.5 border-t flex items-center justify-between text-xs font-black transition-transform ${
                    isHovered 
                      ? 'border-slate-900 text-slate-900 translate-x-1' 
                      : 'border-slate-200 dark:border-slate-700/60 text-indigo-600 dark:text-indigo-300 group-hover:translate-x-1'
                  }`}>
                    <span className="flex items-center gap-1 text-[11px]">
                      <CheckCircle2 className={`w-3.5 h-3.5 ${isHovered ? 'text-slate-900' : 'text-emerald-500'}`} />
                      <span>Klik untuk buka fitur</span>
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className={`p-4 border-t-2 border-slate-900 dark:border-white/20 flex items-center justify-between text-xs font-bold ${
          isDark ? 'bg-slate-900 text-slate-400' : 'bg-slate-100 text-slate-600'
        }`}>
          <span>Total {features.length} Fitur Unggulan CorPlan</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 text-white rounded-xl font-bold border border-slate-700 hover:bg-slate-800 transition cursor-pointer"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};
