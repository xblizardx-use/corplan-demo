import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Coffee, 
  Laptop, 
  Shirt
} from 'lucide-react';
import { Language } from '../types';

interface HeroBannerProps {
  onStartExploring: () => void;
  onNewPlanClick: () => void;
  onSelectPreset?: (presetType: 'kopi' | 'saas' | 'fashion') => void;
  language: Language;
  theme?: 'warm-luxe' | 'dark-obsidian';
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ 
  onStartExploring, 
  onNewPlanClick, 
  onSelectPreset,
  language,
  theme = 'warm-luxe' 
}) => {
  const isDark = theme === 'dark-obsidian';

  return (
    <section 
      id="welcome-section"
      className="relative my-4 sm:my-8 text-center space-y-6 sm:space-y-8 animate-fadeIn max-w-3xl mx-auto px-4"
    >
      {/* Top Badge Pill */}
      <div className="flex justify-center">
        <span className="bg-[#dcfce7] border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] rounded-full px-4 py-1.5 text-xs font-black text-slate-900 uppercase tracking-wide inline-flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-slate-900" />
          <span>AI-POWERED ENTERPRISE SUITE</span>
        </span>
      </div>

      {/* Hero Headline */}
      <div className="space-y-3">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15]">
          Ubah Ide Menjadi{' '}
          <span className="bg-[#fef08a] border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] px-3 py-0.5 rounded-xl text-slate-900 inline-block my-1">
            Proposal
          </span>{' '}
          Siap Investor
        </h1>

        <p className="text-sm sm:text-base font-semibold text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
          Hasilkan analisis keuangan, analisis pasar, matriks risiko, dan dokumen siap cetak hanya dalam hitungan detik.
        </p>
      </div>

      {/* Preset Quick Examples Box */}
      <div className="bg-white dark:bg-slate-900 border-2 border-slate-900 dark:border-white/20 shadow-[5px_5px_0px_0px_#0f172a] dark:shadow-[5px_5px_0px_0px_#334155] rounded-3xl p-5 sm:p-6 max-w-lg mx-auto space-y-4">
        <div className="text-xs font-black text-slate-900 dark:text-slate-100 uppercase tracking-wider">
          COBA CONTOH CEPAT (PRESETS):
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {/* Preset 1: Kedai Kopi */}
          <button
            onClick={() => onSelectPreset && onSelectPreset('kopi')}
            className="bg-[#fbcfe8] hover:bg-[#f472b6] border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_#0f172a] rounded-full px-4 py-2 font-black text-xs text-slate-900 transition flex items-center gap-1.5 cursor-pointer"
          >
            <Coffee className="w-3.5 h-3.5 text-slate-900 fill-slate-900/20" />
            <span>Kedai Kopi</span>
          </button>

          {/* Preset 2: SaaS B2B */}
          <button
            onClick={() => onSelectPreset && onSelectPreset('saas')}
            className="bg-[#bae6fd] hover:bg-[#7dd3fc] border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_#0f172a] rounded-full px-4 py-2 font-black text-xs text-slate-900 transition flex items-center gap-1.5 cursor-pointer"
          >
            <Laptop className="w-3.5 h-3.5 text-slate-900" />
            <span>SaaS B2B</span>
          </button>

          {/* Preset 3: Sustainable Fashion */}
          <button
            onClick={() => onSelectPreset && onSelectPreset('fashion')}
            className="bg-[#f5d0fe] hover:bg-[#e879f9] border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_#0f172a] rounded-full px-4 py-2 font-black text-xs text-slate-900 transition flex items-center gap-1.5 cursor-pointer"
          >
            <Shirt className="w-3.5 h-3.5 text-slate-900" />
            <span>Sustainable Fashion</span>
          </button>
        </div>
      </div>

      {/* Main Action Call To Action Button */}
      <div className="pt-2">
        <button
          onClick={onNewPlanClick}
          className="bg-[#c084fc] hover:bg-[#a855f7] border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_#0f172a] rounded-2xl py-4 px-8 font-black text-base sm:text-lg text-slate-900 flex items-center justify-center gap-3 transition w-full sm:w-auto mx-auto cursor-pointer"
        >
          <span>Mulai Buat Business Plan</span>
          <ArrowRight className="w-5 h-5 text-slate-900" />
        </button>
      </div>

    </section>
  );
};
