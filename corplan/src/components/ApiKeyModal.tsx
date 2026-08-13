import React, { useState } from 'react';
import { Key, X, Check, Sliders, Building2, MessageSquare, Lightbulb, Sparkles } from 'lucide-react';
import { ToneStyle } from '../types';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiKey: string;
  onSaveApiKey: (key: string) => void;
  toneStyle?: ToneStyle;
  onSaveToneStyle?: (tone: ToneStyle) => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({
  isOpen,
  onClose,
  apiKey,
  onSaveApiKey,
  toneStyle = 'casual',
  onSaveToneStyle,
}) => {
  const [inputKey, setInputKey] = useState(apiKey || '');
  const [selectedTone, setSelectedTone] = useState<ToneStyle>(toneStyle);
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveApiKey(inputKey.trim());
    if (onSaveToneStyle) {
      onSaveToneStyle(selectedTone);
    }
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 800);
  };

  const TONE_OPTIONS: { id: ToneStyle; title: string; subtitle: string; desc: string; sample: string; icon: React.ReactNode; bg: string }[] = [
    {
      id: 'formal',
      title: 'Professional / Formal',
      subtitle: 'Investor & Corporate Standard',
      desc: 'Bahasa bisnis resmi, baku, terstruktur & presisi tinggi untuk perbankan, instansi, dan calon investor.',
      sample: 'Proyeksi tingkat pengembalian investasi (ROI) diperkirakan mencapai 32% dalam kurun waktu 18 bulan operasional.',
      icon: <Building2 className="w-4 h-4 text-slate-900" />,
      bg: 'bg-blue-50 hover:bg-blue-100/70 border-blue-900',
    },
    {
      id: 'casual',
      title: 'Conversational / Casual',
      subtitle: 'Modern & Gen-Z Friendly',
      desc: 'Bahasa ramah, santai, mengalir & relatable untuk pebisnis muda, startup, dan proyek kreatif modern.',
      sample: 'Prospek bisnisnya seru banget! Diperkirakan dalam 1.5 tahun modal awal kamu udah balik plus untung 32%.',
      icon: <MessageSquare className="w-4 h-4 text-slate-900" />,
      bg: 'bg-amber-50 hover:bg-amber-100/70 border-amber-900',
    },
    {
      id: 'simple',
      title: 'Simple / Beginner',
      subtitle: 'No Jargon & Step-by-Step',
      desc: 'Bahasa super sederhana, jelas, bebas istilah rumit dengan penjelasan langsung dalam kurung untuk pemula.',
      sample: 'Artinya: Dari tiap Rp 100rb yang kamu keluarkan, kamu dapat untung bersih Rp 32rb setelah 1.5 tahun.',
      icon: <Lightbulb className="w-4 h-4 text-slate-900" />,
      bg: 'bg-emerald-50 hover:bg-emerald-100/70 border-emerald-900',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="bg-white border-2 border-slate-900 rounded-3xl p-6 sm:p-7 max-w-xl w-full shadow-[6px_6px_0px_0px_#0f172a] relative space-y-6 my-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl border-2 border-slate-900 bg-slate-100 hover:bg-slate-200 text-slate-900 transition shadow-[2px_2px_0px_0px_#0f172a] cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="bg-[#fef08a] border-2 border-slate-900 px-3 py-1 rounded-xl text-base font-black shadow-[2px_2px_0px_0px_#0f172a] inline-flex items-center gap-2 text-slate-900">
              <Sliders className="w-4 h-4 text-slate-900" />
              <span>Pengaturan & Konfigurasi AI</span>
            </span>
          </div>
          <p className="text-xs font-semibold text-slate-600 pt-1">
            Atur Gemini API Key dan tentukan Gaya Bahasa (Tone) AI untuk seluruh proposal dan respon.
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          
          {/* SECTION 1: API Key */}
          <div className="space-y-2 border-2 border-slate-900 rounded-2xl p-4 bg-slate-50/60 shadow-[3px_3px_0px_0px_#0f172a]">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black uppercase text-slate-900 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-amber-600" />
                <span>Google Gemini API Key</span>
              </label>
              <span className="text-[10px] font-bold text-slate-500">Opsional (Menggunakan Server Key bawaan)</span>
            </div>
            <input
              type="password"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              placeholder="AIzaSy... (Kosongkan jika memakai API default)"
              className="w-full bg-white border-2 border-slate-900 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-900 placeholder-slate-400 shadow-[2px_2px_0px_0px_#0f172a] focus:outline-none focus:bg-amber-50/50"
            />
          </div>

          {/* SECTION 2: Tone Settings / Gaya Bahasa Component */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black uppercase text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                <span>Gaya Bahasa & Tone AI (Language Tone)</span>
              </label>
              <span className="text-[11px] font-extrabold bg-[#bae6fd] border border-slate-900 px-2 py-0.5 rounded-lg text-slate-900">
                Active: {selectedTone.toUpperCase()}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {TONE_OPTIONS.map((opt) => {
                const isSelected = selectedTone === opt.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => setSelectedTone(opt.id)}
                    className={`border-2 border-slate-900 rounded-2xl p-3.5 cursor-pointer transition-all duration-200 relative ${
                      isSelected
                        ? 'bg-[#fef08a] shadow-[4px_4px_0px_0px_#0f172a] -translate-y-0.5'
                        : `${opt.bg} shadow-[2px_2px_0px_0px_#0f172a] opacity-85 hover:opacity-100`
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="bg-white border-2 border-slate-900 rounded-xl p-2 shadow-[1.5px_1.5px_0px_0px_#0f172a] shrink-0">
                          {opt.icon}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs font-black text-slate-900">{opt.title}</h4>
                            <span className="text-[10px] font-extrabold text-slate-600 bg-white/80 border border-slate-900 px-1.5 py-0.2 rounded-md">
                              {opt.subtitle}
                            </span>
                          </div>
                          <p className="text-[11px] font-semibold text-slate-700 mt-0.5 leading-tight">
                            {opt.desc}
                          </p>
                        </div>
                      </div>

                      <div className={`w-5 h-5 rounded-full border-2 border-slate-900 flex items-center justify-center shrink-0 mt-0.5 ${
                        isSelected ? 'bg-slate-900 text-white' : 'bg-white'
                      }`}>
                        {isSelected && <Check className="w-3 h-3 text-white stroke-[3]" />}
                      </div>
                    </div>

                    {/* Live Sample Sentence */}
                    {isSelected && (
                      <div className="mt-2.5 pt-2 border-t border-slate-900/20 text-[11px] font-medium text-slate-800 italic bg-white/70 rounded-xl p-2 border border-slate-900/30">
                        💬 Contoh Output: &quot;{opt.sample}&quot;
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex items-center justify-end gap-3 pt-2 border-t-2 border-slate-900">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-white hover:bg-slate-100 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] active:translate-x-0.5 active:translate-y-0.5 rounded-xl font-extrabold text-xs text-slate-900 transition cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#dcfce7] hover:bg-[#bbf7d0] border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] active:translate-x-0.5 active:translate-y-0.5 rounded-xl font-black text-xs text-slate-900 transition flex items-center gap-1.5 cursor-pointer"
            >
              {isSaved ? <Check className="w-4 h-4 text-emerald-800 stroke-[3]" /> : null}
              <span>{isSaved ? 'Tersimpan & Terpasang!' : 'Simpan Pengaturan'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

