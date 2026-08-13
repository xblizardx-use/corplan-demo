import React, { useState } from 'react';
import { 
  Briefcase, 
  Sparkles, 
  Download, 
  Coins, 
  FolderOpen,
  Sun,
  Moon,
  Key,
  Sliders,
  TrendingUp,
  MoreVertical,
  Grid,
  FileText
} from 'lucide-react';
import { Currency, Language, BusinessPlanData, ToneStyle } from '../types';
import { WORLD_LANGUAGES, WORLD_CURRENCIES } from '../data/languagesAndCurrencies';

interface HeaderProps {
  currentPlan: BusinessPlanData;
  plansList: BusinessPlanData[];
  onSelectPlan: (plan: BusinessPlanData) => void;
  onNewPlanClick: () => void;
  onExportClick: () => void;
  language: Language;
  onSelectLanguage: (langCode: string) => void;
  currency: Currency;
  onSelectCurrency: (currCode: string) => void;
  theme: 'warm-luxe' | 'dark-obsidian';
  onToggleTheme: () => void;
  onOpenApiKeyModal?: () => void;
  onOpenFeaturesCatalog?: () => void;
  onOpenBlueprint?: () => void;
  toneStyle?: ToneStyle;
  saveStatus?: 'saved' | 'saving' | 'unsaved';
}

export const Header: React.FC<HeaderProps> = ({
  currentPlan,
  plansList,
  onSelectPlan,
  onNewPlanClick,
  onExportClick,
  language,
  onSelectLanguage,
  currency,
  onSelectCurrency,
  theme,
  onToggleTheme,
  onOpenApiKeyModal,
  onOpenFeaturesCatalog,
  onOpenBlueprint,
  saveStatus = 'saved',
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentLangObj = WORLD_LANGUAGES.find(l => l.code === language) || WORLD_LANGUAGES[0];
  const isDark = theme === 'dark-obsidian';

  return (
    <header className={`sticky top-0 z-40 transition-colors duration-300 border-b ${
      isDark 
        ? 'bg-[#080b12]/90 border-white/10 text-slate-100 shadow-2xl backdrop-blur-md' 
        : 'bg-[#fbf9f4]/95 border-slate-900 text-slate-900 shadow-sm backdrop-blur-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-3">
        
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="relative group">
            <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center font-extrabold text-slate-900 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] shrink-0 ${
              isDark 
                ? 'bg-indigo-500 text-white border-white/20' 
                : 'bg-[#fef08a]'
            }`}>
              <TrendingUp className="w-5 h-5 text-slate-900" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`font-black text-lg sm:text-2xl tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                CorPlan
              </span>
              
              {/* Save Status Indicator */}
              <span className={`text-[10px] font-black px-2 py-0.5 rounded-md border border-slate-900 flex items-center gap-1 shadow-[1px_1px_0px_0px_#0f172a] transition-all ${
                saveStatus === 'saving'
                  ? 'bg-amber-200 text-amber-900 border-slate-900'
                  : 'bg-[#dcfce7] text-slate-900 border-slate-900'
              }`}>
                {saveStatus === 'saving' ? (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-ping" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    <span>Saved ✓</span>
                  </>
                )}
              </span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 font-bold -mt-0.5">
              Business Plan Generator
            </p>
          </div>
        </div>

        {/* Plan Selector Dropdown */}
        <div className={`hidden md:flex items-center gap-2 rounded-xl px-3 py-1.5 border-2 border-slate-900 max-w-xs shadow-[2px_2px_0px_0px_#0f172a] ${
          isDark 
            ? 'bg-slate-900 border-white/20 text-slate-200' 
            : 'bg-white text-slate-900'
        }`}>
          <FolderOpen className="w-4 h-4 text-indigo-600 shrink-0" />
          <select 
            value={currentPlan.id}
            onChange={(e) => {
              const selected = plansList.find(p => p.id === e.target.value);
              if (selected) onSelectPlan(selected);
            }}
            className="bg-transparent text-xs font-bold focus:outline-none w-full cursor-pointer truncate"
          >
            {plansList.map((plan) => (
              <option key={plan.id} value={plan.id} className={isDark ? 'bg-[#0b0f19] text-slate-200' : 'bg-white text-slate-900'}>
                {plan.businessName} ({plan.industry})
              </option>
            ))}
          </select>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          
          {/* Tombol Fitur Catalog Button */}
          {onOpenFeaturesCatalog && (
            <button
              onClick={onOpenFeaturesCatalog}
              className="px-2.5 sm:px-3.5 py-1.5 rounded-xl border-2 border-slate-900 bg-[#fef08a] hover:bg-[#fde047] shadow-[2px_2px_0px_0px_#0f172a] active:translate-x-0.5 active:translate-y-0.5 text-xs font-black text-slate-900 flex items-center gap-1.5 transition cursor-pointer"
              title="Lihat Semua Fitur Aplikasi"
            >
              <Grid className="w-3.5 h-3.5 text-slate-900 shrink-0" />
              <span className="hidden sm:inline">Katalog Fitur</span>
              <span className="sm:hidden text-[11px]">Fitur</span>
            </button>
          )}

          {/* Settings & Tone AI Button */}
          {onOpenApiKeyModal && (
            <button
              onClick={onOpenApiKeyModal}
              className="hidden lg:flex px-2.5 sm:px-3.5 py-1.5 rounded-xl border-2 border-slate-900 bg-[#bfdbfe] hover:bg-[#93c5fd] shadow-[2px_2px_0px_0px_#0f172a] active:translate-x-0.5 active:translate-y-0.5 text-xs font-black text-slate-900 items-center gap-1.5 transition cursor-pointer"
              title="Pengaturan API Key & Tone AI"
            >
              <Sliders className="w-3.5 h-3.5 text-slate-900 shrink-0" />
              <span>Settings</span>
            </button>
          )}

          {/* Theme Switch Button */}
          <button
            onClick={onToggleTheme}
            className={`hidden sm:flex p-1.5 rounded-xl border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] transition-all ${
              isDark 
                ? 'bg-white/10 hover:bg-white/20 border-white/20 text-amber-300' 
                : 'bg-white hover:bg-slate-100 text-slate-900'
            }`}
            title={isDark ? 'Tukar ke Mode Bright Pop' : 'Tukar ke Mode Dark'}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Global Currency Selector Dropdown */}
          <div className={`hidden md:flex items-center border-2 border-slate-900 rounded-xl px-2.5 py-1.5 text-xs font-bold shadow-[2px_2px_0px_0px_#0f172a] ${
            isDark 
              ? 'bg-slate-900 border-white/20 text-slate-200' 
              : 'bg-white text-slate-900'
          }`}>
            <Coins className="w-3.5 h-3.5 text-indigo-600 shrink-0 mr-1" />
            <select
              value={currency}
              onChange={(e) => onSelectCurrency(e.target.value)}
              className="bg-transparent text-xs font-extrabold focus:outline-none cursor-pointer"
              title="Pilih Mata Uang"
            >
              {WORLD_CURRENCIES.map((c) => (
                <option key={c.code} value={c.code} className={isDark ? 'bg-[#0b0f19] text-slate-200' : 'bg-white text-slate-900'}>
                  {c.code} ({c.symbol})
                </option>
              ))}
            </select>
          </div>

          {/* Export Button */}
          <button
            onClick={onExportClick}
            className={`hidden sm:flex px-3 py-1.5 rounded-xl border-2 border-slate-900 text-xs font-black items-center gap-1.5 shadow-[2px_2px_0px_0px_#0f172a] active:translate-x-0.5 active:translate-y-0.5 transition-all ${
              isDark 
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-100 border-white/20' 
                : 'bg-white hover:bg-slate-100 text-slate-900'
            }`}
          >
            <Download className="w-3.5 h-3.5 text-slate-900 dark:text-slate-100" />
            <span>{language === 'id' ? 'Ekspor' : 'Export'}</span>
          </button>

          {/* New Plan Button */}
          <button
            onClick={onNewPlanClick}
            className={`px-3.5 sm:px-4 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer ${
              isDark 
                ? 'bg-indigo-600 hover:bg-indigo-500 text-white border-white/20' 
                : 'bg-[#fef08a] hover:bg-[#fde047] text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-slate-900 fill-slate-900 shrink-0" />
            <span>Mulai Buat</span>
          </button>

          {/* Three Dots Menu Button (Titik Tiga Kanan Atas) */}
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(prev => !prev)}
              className={`p-1.5 sm:p-2 rounded-xl border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] transition-all cursor-pointer ${
                isMenuOpen
                  ? 'bg-[#fef08a] text-slate-900 border-slate-900'
                  : isDark 
                    ? 'bg-slate-800 hover:bg-slate-700 text-white border-white/20' 
                    : 'bg-white hover:bg-slate-100 text-slate-900'
              }`}
              title="Menu Settingan & Katalog Fitur"
            >
              <MoreVertical className="w-5 h-5 text-slate-900 dark:text-slate-100" />
            </button>

            {/* Dropdown Menu Popover */}
            {isMenuOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setIsMenuOpen(false)} 
                />

                <div className={`absolute right-0 mt-2 w-72 sm:w-80 rounded-2xl border-3 border-slate-900 shadow-[6px_6px_0px_0px_#0f172a] z-50 overflow-hidden animate-fadeIn ${
                  isDark ? 'bg-[#0f172a] text-slate-100 border-white/20' : 'bg-white text-slate-900'
                }`}>
                  {/* Menu Header */}
                  <div className={`p-3 border-b-2 border-slate-900 dark:border-white/20 flex items-center justify-between ${
                    isDark ? 'bg-indigo-950/80' : 'bg-[#fef08a]'
                  }`}>
                    <span className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Sliders className="w-3.5 h-3.5 text-slate-900 dark:text-amber-300" />
                      <span>Pengaturan & Fitur</span>
                    </span>
                    <button 
                      onClick={() => setIsMenuOpen(false)}
                      className="w-6 h-6 rounded-lg border border-slate-900 bg-white text-slate-900 font-black text-xs flex items-center justify-center hover:bg-rose-100 cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="p-2 space-y-1">
                    
                    {/* Tombol Fitur Catalog Trigger Button */}
                    {onOpenFeaturesCatalog && (
                      <button
                        onClick={() => {
                          setIsMenuOpen(false);
                          onOpenFeaturesCatalog();
                        }}
                        className="w-full text-left p-2.5 rounded-xl border-2 border-slate-900 bg-[#fef08a] hover:bg-[#fde047] text-slate-900 font-extrabold text-xs flex items-center justify-between shadow-[2px_2px_0px_0px_#0f172a] active:translate-x-0.5 active:translate-y-0.5 transition cursor-pointer mb-2"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-slate-900 text-amber-300 flex items-center justify-center font-black shrink-0">
                            <Grid className="w-4 h-4 text-amber-300" />
                          </div>
                          <div>
                            <div className="font-black text-xs text-slate-900">🚀 Katalog Fitur Aplikasi</div>
                            <div className="text-[10px] font-bold text-slate-700">Daftar semua judul & penjelasannya</div>
                          </div>
                        </div>
                        <span className="text-[10px] font-black px-2 py-0.5 bg-slate-900 text-white rounded-md shrink-0">
                          Buka
                        </span>
                      </button>
                    )}

                    {/* Menu Divider */}
                    <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 px-2 pt-1 pb-0.5">
                      Opsi Pengaturan
                    </div>

                    {/* Settings & Tone AI */}
                    {onOpenApiKeyModal && (
                      <button
                        onClick={() => {
                          setIsMenuOpen(false);
                          onOpenApiKeyModal();
                        }}
                        className={`w-full text-left p-2 rounded-xl text-xs font-bold flex items-center gap-2.5 transition cursor-pointer ${
                          isDark ? 'hover:bg-slate-800 text-slate-200' : 'hover:bg-slate-100 text-slate-800'
                        }`}
                      >
                        <Sliders className="w-4 h-4 text-indigo-500 shrink-0" />
                        <span>Pengaturan API Key & Tone AI</span>
                      </button>
                    )}

                    {/* Proposal Blueprint & Cetak Biru */}
                    {onOpenBlueprint && (
                      <button
                        onClick={() => {
                          setIsMenuOpen(false);
                          onOpenBlueprint();
                        }}
                        className={`w-full text-left p-2 rounded-xl text-xs font-bold flex items-center gap-2.5 transition cursor-pointer ${
                          isDark ? 'hover:bg-slate-800 text-slate-200' : 'hover:bg-slate-100 text-slate-800'
                        }`}
                      >
                        <FileText className="w-4 h-4 text-amber-500 shrink-0" />
                        <span>📜 Proposal Blueprint & Spesifikasi Fitur</span>
                      </button>
                    )}

                    {/* Theme Toggle Item */}
                    <button
                      onClick={() => {
                        onToggleTheme();
                      }}
                      className={`w-full text-left p-2 rounded-xl text-xs font-bold flex items-center justify-between transition cursor-pointer ${
                        isDark ? 'hover:bg-slate-800 text-slate-200' : 'hover:bg-slate-100 text-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        {isDark ? <Sun className="w-4 h-4 text-amber-400 shrink-0" /> : <Moon className="w-4 h-4 text-indigo-600 shrink-0" />}
                        <span>Ganti Mode Tema</span>
                      </div>
                      <span className="text-[10px] font-black px-2 py-0.5 rounded border border-slate-900 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white">
                        {isDark ? 'Dark Obsidian' : 'Bright Pop'}
                      </span>
                    </button>

                    {/* Language Selector Item */}
                    <div className={`p-2 rounded-xl text-xs font-bold flex items-center justify-between ${
                      isDark ? 'bg-slate-800/50' : 'bg-slate-50'
                    }`}>
                      <div className="flex items-center gap-2">
                        <span className="text-base leading-none">{currentLangObj.flag}</span>
                        <span>Bahasa Aplikasi</span>
                      </div>
                      <select
                        value={language}
                        onChange={(e) => onSelectLanguage(e.target.value)}
                        className="bg-transparent text-xs font-extrabold focus:outline-none cursor-pointer border-b border-slate-900 dark:border-white/30"
                      >
                        {WORLD_LANGUAGES.map((l) => (
                          <option key={l.code} value={l.code} className={isDark ? 'bg-[#0b0f19] text-slate-200' : 'bg-white text-slate-900'}>
                            {l.code.toUpperCase()} - {l.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Currency Selector Item */}
                    <div className={`p-2 rounded-xl text-xs font-bold flex items-center justify-between ${
                      isDark ? 'bg-slate-800/50' : 'bg-slate-50'
                    }`}>
                      <div className="flex items-center gap-2">
                        <Coins className="w-4 h-4 text-indigo-500 shrink-0" />
                        <span>Mata Uang</span>
                      </div>
                      <select
                        value={currency}
                        onChange={(e) => onSelectCurrency(e.target.value)}
                        className="bg-transparent text-xs font-extrabold focus:outline-none cursor-pointer border-b border-slate-900 dark:border-white/30"
                      >
                        {WORLD_CURRENCIES.map((c) => (
                          <option key={c.code} value={c.code} className={isDark ? 'bg-[#0b0f19] text-slate-200' : 'bg-white text-slate-900'}>
                            {c.code} ({c.symbol})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Export Document Item */}
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        onExportClick();
                      }}
                      className={`w-full text-left p-2 rounded-xl text-xs font-bold flex items-center gap-2.5 transition cursor-pointer ${
                        isDark ? 'hover:bg-slate-800 text-slate-200' : 'hover:bg-slate-100 text-slate-800'
                      }`}
                    >
                      <Download className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Ekspor Dokumen & Teks</span>
                    </button>

                    {/* Plan Selector Item */}
                    <div className={`p-2 rounded-xl text-xs font-bold flex flex-col gap-1 ${
                      isDark ? 'bg-slate-800/50' : 'bg-slate-50'
                    }`}>
                      <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 text-[11px]">
                        <FolderOpen className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                        <span>Pilih Business Plan Aktif:</span>
                      </div>
                      <select 
                        value={currentPlan.id}
                        onChange={(e) => {
                          const selected = plansList.find(p => p.id === e.target.value);
                          if (selected) onSelectPlan(selected);
                          setIsMenuOpen(false);
                        }}
                        className="bg-transparent text-xs font-black focus:outline-none w-full cursor-pointer truncate border-b border-slate-900 dark:border-white/30 py-0.5"
                      >
                        {plansList.map((plan) => (
                          <option key={plan.id} value={plan.id} className={isDark ? 'bg-[#0b0f19] text-slate-200' : 'bg-white text-slate-900'}>
                            {plan.businessName} ({plan.industry})
                          </option>
                        ))}
                      </select>
                    </div>

                  </div>
                </div>
              </>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};
