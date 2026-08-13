import React, { useState, useEffect } from 'react';
import { 
  Presentation, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Edit3, 
  Plus, 
  Trash2, 
  X, 
  LogOut
} from 'lucide-react';
import { PitchDeckData, PitchSlide, Language } from '../types';
import { formatCurrency } from '../utils/financialCalculations';

interface PitchDeckViewProps {
  pitchDeck: PitchDeckData;
  onUpdateDeck: (updated: PitchDeckData) => void;
  language: Language;
  theme?: 'warm-luxe' | 'dark-obsidian';
  isEditMode?: boolean;
}

export const PitchDeckView: React.FC<PitchDeckViewProps> = ({
  pitchDeck,
  onUpdateDeck,
  language,
  theme = 'warm-luxe',
  isEditMode = false,
}) => {
  const [deck, setDeck] = useState<PitchDeckData>(pitchDeck);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isEditingSlide, setIsEditingSlide] = useState(isEditMode);

  useEffect(() => {
    setIsEditingSlide(isEditMode);
  }, [isEditMode]);

  const updateDeckState = (newDeck: PitchDeckData) => {
    setDeck(newDeck);
    onUpdateDeck(newDeck);
  };

  const activeSlide = deck.slides[currentSlideIndex] || deck.slides[0];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isFullscreen) {
        if (e.key === 'ArrowRight') handleNextSlide();
        if (e.key === 'ArrowLeft') handlePrevSlide();
        if (e.key === 'Escape') setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, deck.slides.length]);

  const handlePrevSlide = () => {
    setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : deck.slides.length - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlideIndex((prev) => (prev < deck.slides.length - 1 ? prev + 1 : 0));
  };

  const handleAddSlide = () => {
    const newSlide: PitchSlide = {
      id: Date.now().toString(),
      slideNumber: deck.slides.length + 1,
      title: 'Slide Baru',
      headline: 'Poin Kunci & Proposisi Utama',
      bullets: ['Poin diskusi pertama', 'Poin pendukung kedua', 'Keterangan tambahan'],
      presenterNotes: 'Catatan presenter untuk slide ini',
    };
    const updatedSlides = [...deck.slides, newSlide];
    updateDeckState({ ...deck, slides: updatedSlides });
    setCurrentSlideIndex(updatedSlides.length - 1);
  };

  const handleDeleteSlide = (index: number) => {
    if (deck.slides.length <= 1) return;
    const updatedSlides = deck.slides.filter((_, i) => i !== index);
    updateDeckState({ ...deck, slides: updatedSlides });
    setCurrentSlideIndex((prev) => (prev >= updatedSlides.length ? updatedSlides.length - 1 : prev));
  };

  const handleEditSlideTitle = (title: string) => {
    const updatedSlides = [...deck.slides];
    updatedSlides[currentSlideIndex] = { ...updatedSlides[currentSlideIndex], title };
    updateDeckState({ ...deck, slides: updatedSlides });
  };

  const handleEditSlideHeadline = (headline: string) => {
    const updatedSlides = [...deck.slides];
    updatedSlides[currentSlideIndex] = { ...updatedSlides[currentSlideIndex], headline };
    updateDeckState({ ...deck, slides: updatedSlides });
  };

  const handleEditBullet = (bulletIndex: number, text: string) => {
    const updatedSlides = [...deck.slides];
    const updatedBullets = [...updatedSlides[currentSlideIndex].bullets];
    updatedBullets[bulletIndex] = text;
    updatedSlides[currentSlideIndex] = { ...updatedSlides[currentSlideIndex], bullets: updatedBullets };
    updateDeckState({ ...deck, slides: updatedSlides });
  };

  const handleAddBullet = () => {
    const updatedSlides = [...deck.slides];
    const updatedBullets = [...updatedSlides[currentSlideIndex].bullets, 'Poin baru'];
    updatedSlides[currentSlideIndex] = { ...updatedSlides[currentSlideIndex], bullets: updatedBullets };
    updateDeckState({ ...deck, slides: updatedSlides });
  };

  const handleDeleteBullet = (bulletIndex: number) => {
    const updatedSlides = [...deck.slides];
    const updatedBullets = updatedSlides[currentSlideIndex].bullets.filter((_, i) => i !== bulletIndex);
    updatedSlides[currentSlideIndex] = { ...updatedSlides[currentSlideIndex], bullets: updatedBullets };
    updateDeckState({ ...deck, slides: updatedSlides });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-fadeIn px-2 sm:px-0">
      
      {/* Outer Card Container matching reference */}
      <div className="bg-white border-2 border-slate-900 rounded-3xl p-4 sm:p-6 md:p-8 shadow-[6px_6px_0px_0px_#0f172a] space-y-5 sm:space-y-6 text-slate-900">
        
        {/* Document Header Tag */}
        <div className="space-y-3 pb-4 border-b-2 border-slate-900">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="bg-[#0f172a] text-white border-2 border-slate-900 px-3 py-1 rounded-lg text-[11px] sm:text-xs font-black shadow-[2px_2px_0px_0px_#0f172a] uppercase tracking-wider">
              PITCH DECK
            </span>

            <button
              onClick={() => setIsFullscreen(true)}
              className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#fef08a] hover:bg-[#fde047] border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] active:translate-x-0.5 active:translate-y-0.5 rounded-xl font-extrabold text-[11px] sm:text-xs text-slate-900 flex items-center gap-1.5 sm:gap-2 cursor-pointer transition"
            >
              <Maximize2 className="w-3.5 h-3.5 text-slate-900" />
              <span>Simulasi Presentasi</span>
            </button>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight break-words">
              {deck.businessName}
            </h1>
            <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
              Target Ask: {formatCurrency(deck.targetAsk, deck.currency)}
            </p>
          </div>
        </div>

        {/* Executive Pitch Deck Metrics */}
        <div className="space-y-4 pt-1 sm:pt-2">
          
          {/* Market Potential Cards */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-slate-800 leading-relaxed">
              Potensi penetrasi pasar diperkuat oleh nilai tambah unik perusahaan.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
              <div className="bg-[#dcfce7] border-2 border-slate-900 shadow-[2.5px_2.5px_0px_0px_#0f172a] rounded-2xl p-3 sm:p-4 text-center flex sm:block items-center justify-between sm:justify-center">
                <span className="text-[10px] font-black uppercase text-slate-700 tracking-wider block">TOTAL MARKET</span>
                <span className="text-xs sm:text-sm md:text-base font-black text-slate-900 mt-0.5 sm:mt-1 block">Rp 2.250.000.000</span>
              </div>

              <div className="bg-[#dcfce7] border-2 border-slate-900 shadow-[2.5px_2.5px_0px_0px_#0f172a] rounded-2xl p-3 sm:p-4 text-center flex sm:block items-center justify-between sm:justify-center">
                <span className="text-[10px] font-black uppercase text-slate-700 tracking-wider block">SERVICEABLE</span>
                <span className="text-xs sm:text-sm md:text-base font-black text-slate-900 mt-0.5 sm:mt-1 block">Rp 450.000.000</span>
              </div>

              <div className="bg-[#dcfce7] border-2 border-slate-900 shadow-[2.5px_2.5px_0px_0px_#0f172a] rounded-2xl p-3 sm:p-4 text-center flex sm:block items-center justify-between sm:justify-center">
                <span className="text-[10px] font-black uppercase text-slate-700 tracking-wider block">OBTAINABLE</span>
                <span className="text-xs sm:text-sm md:text-base font-black text-slate-900 mt-0.5 sm:mt-1 block">Rp 90.000.000</span>
              </div>
            </div>
          </div>

          {/* Financial Highlights section */}
          <div className="space-y-2.5 pt-1 sm:pt-2">
            <span className="bg-[#fef08a] border-2 border-slate-900 px-3 py-1 rounded-xl text-xs sm:text-sm font-black text-slate-900 shadow-[2px_2px_0px_0px_#0f172a] inline-block">
              Financial Highlights
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
              <div className="bg-[#fbcfe8] border-2 border-slate-900 shadow-[2.5px_2.5px_0px_0px_#0f172a] rounded-2xl p-3 sm:p-4 text-center flex sm:block items-center justify-between sm:justify-center">
                <span className="text-[10px] font-black uppercase text-slate-800 tracking-wider block">GROSS MARGIN</span>
                <span className="text-base sm:text-xl font-black text-slate-900 mt-0.5 sm:mt-1 block">61%</span>
              </div>

              <div className="bg-[#fbcfe8] border-2 border-slate-900 shadow-[2.5px_2.5px_0px_0px_#0f172a] rounded-2xl p-3 sm:p-4 text-center flex sm:block items-center justify-between sm:justify-center">
                <span className="text-[10px] font-black uppercase text-slate-800 tracking-wider block">BREAK EVEN</span>
                <span className="text-base sm:text-xl font-black text-slate-900 mt-0.5 sm:mt-1 block">410 Unit</span>
              </div>

              <div className="bg-[#fbcfe8] border-2 border-slate-900 shadow-[2.5px_2.5px_0px_0px_#0f172a] rounded-2xl p-3 sm:p-4 text-center flex sm:block items-center justify-between sm:justify-center">
                <span className="text-[10px] font-black uppercase text-slate-800 tracking-wider block">PAYBACK</span>
                <span className="text-base sm:text-xl font-black text-slate-900 mt-0.5 sm:mt-1 block">7 Bulan</span>
              </div>
            </div>
          </div>

        </div>

        {/* Interactive Presentation Deck Stage */}
        <div className="pt-4 border-t-2 border-slate-900 space-y-4">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-slate-800">
              Interactive Deck ({deck.slides.length} Slides)
            </span>

            <button
              onClick={() => setIsEditingSlide(!isEditingSlide)}
              className="text-xs font-extrabold px-2.5 py-1 bg-slate-100 border-2 border-slate-900 shadow-[1.5px_1.5px_0px_0px_#0f172a] rounded-lg text-slate-900 hover:bg-slate-200 transition cursor-pointer"
            >
              {isEditingSlide ? 'Selesai Edit' : 'Edit Slide'}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 sm:gap-4">
            
            {/* Thumbnails Sidebar */}
            <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-y-auto max-h-none sm:max-h-[360px] pb-2 sm:pb-0 sm:pr-1 shrink-0 no-scrollbar">
              {deck.slides.map((s, idx) => (
                <button
                  key={s.id || idx}
                  onClick={() => setCurrentSlideIndex(idx)}
                  className={`min-w-[105px] sm:min-w-0 sm:w-full text-left p-2 sm:p-3 border-2 border-slate-900 rounded-xl transition cursor-pointer shrink-0 sm:shrink ${
                    idx === currentSlideIndex 
                      ? 'bg-[#fef08a] shadow-[2px_2px_0px_0px_#0f172a] font-extrabold' 
                      : 'bg-white hover:bg-slate-50'
                  }`}
                >
                  <span className="text-[9px] sm:text-[10px] font-black block text-slate-500 uppercase">Slide {idx + 1}</span>
                  <span className="text-[11px] sm:text-xs font-bold text-slate-900 truncate block">{s.title}</span>
                </button>
              ))}

              <button
                onClick={handleAddSlide}
                className="min-w-[100px] sm:min-w-0 sm:w-full py-2 px-2.5 bg-slate-100 hover:bg-slate-200 border-2 border-slate-900 rounded-xl text-[11px] sm:text-xs font-black text-slate-900 flex items-center justify-center gap-1 cursor-pointer shadow-[1.5px_1.5px_0px_0px_#0f172a] shrink-0 sm:shrink"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Slide Baru</span>
              </button>
            </div>

            {/* Slide Active Canvas */}
            <div className="sm:col-span-3 bg-slate-900 text-white border-2 border-slate-900 rounded-2xl p-4 sm:p-6 shadow-[4px_4px_0px_0px_#0f172a] flex flex-col justify-between min-h-[280px] sm:min-h-[340px]">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-700 pb-2 text-[10px] font-bold tracking-wider text-slate-400">
                  <span>SLIDE {currentSlideIndex + 1} OF {deck.slides.length}</span>
                  <span className="text-amber-300 font-black truncate max-w-[140px] sm:max-w-none">{deck.businessName}</span>
                </div>

                {isEditingSlide ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={activeSlide.title}
                      onChange={(e) => handleEditSlideTitle(e.target.value)}
                      className="w-full text-base sm:text-lg font-black bg-slate-800 border border-slate-600 px-3 py-1 rounded-lg text-white"
                    />
                    <input
                      type="text"
                      value={activeSlide.headline}
                      onChange={(e) => handleEditSlideHeadline(e.target.value)}
                      className="w-full text-xs font-semibold bg-slate-800 border border-slate-600 px-3 py-1 rounded-lg text-amber-300"
                    />
                  </div>
                ) : (
                  <div>
                    <h2 className="text-lg sm:text-2xl font-black text-white break-words">{activeSlide.title}</h2>
                    <p className="text-xs sm:text-sm font-bold text-amber-300 mt-1 break-words">{activeSlide.headline}</p>
                  </div>
                )}

                <div className="space-y-2 pt-2">
                  {activeSlide.bullets.map((b, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                      {isEditingSlide ? (
                        <div className="flex-1 flex items-center gap-2">
                          <input
                            type="text"
                            value={b}
                            onChange={(e) => handleEditBullet(bIdx, e.target.value)}
                            className="flex-1 text-xs bg-slate-800 border border-slate-600 px-2 py-1 rounded text-white"
                          />
                          <button onClick={() => handleDeleteBullet(bIdx)} className="text-rose-400 p-1">
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <p className="text-xs font-medium text-slate-200 leading-relaxed break-words">{b}</p>
                      )}
                    </div>
                  ))}

                  {isEditingSlide && (
                    <button onClick={handleAddBullet} className="text-xs font-bold text-emerald-400 flex items-center gap-1 mt-2">
                      <Plus className="w-3.5 h-3.5" />
                      <span>Tambah Poin</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800 mt-4">
                <button
                  onClick={handlePrevSlide}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <span className="text-[10px] sm:text-[11px] font-bold text-slate-400">
                  Slide {currentSlideIndex + 1} / {deck.slides.length}
                </span>

                <button
                  onClick={handleNextSlide}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>

      {/* FULLSCREEN SIMULATION MODE */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-[#0f172a] text-white flex flex-col justify-between p-4 sm:p-8 md:p-12 animate-fadeIn overflow-y-auto">
          <div className="flex items-center justify-between gap-2">
            <span className="bg-[#fef08a] text-slate-900 border-2 border-slate-900 px-2.5 py-1 rounded-xl text-[10px] sm:text-xs font-black shadow-[2px_2px_0px_0px_#0f172a] truncate">
              MODE SIMULASI PRESENTASI
            </span>

            <button
              onClick={() => setIsFullscreen(false)}
              className="px-3 py-1.5 bg-rose-500 hover:bg-rose-600 text-white font-extrabold text-[11px] sm:text-xs rounded-xl flex items-center gap-1.5 cursor-pointer shadow-[2px_2px_0px_0px_#0f172a] shrink-0"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Keluar (Esc)</span>
            </button>
          </div>

          <div className="max-w-4xl mx-auto w-full my-auto space-y-4 sm:space-y-6 py-6">
            <span className="text-[10px] sm:text-xs font-black text-amber-400 uppercase tracking-widest block">
              SLIDE {currentSlideIndex + 1} OF {deck.slides.length}
            </span>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight break-words">{activeSlide.title}</h1>
            <p className="text-sm sm:text-lg font-bold text-amber-300 break-words">{activeSlide.headline}</p>

            <div className="space-y-2.5 sm:space-y-3 pt-2 sm:pt-3">
              {activeSlide.bullets.map((b, idx) => (
                <div key={idx} className="flex items-start gap-2.5 sm:gap-3">
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-400 mt-1.5 sm:mt-2 shrink-0" />
                  <p className="text-sm sm:text-lg font-semibold text-slate-200 leading-relaxed break-words">{b}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs font-bold text-slate-400">
            <span className="truncate max-w-[150px] sm:max-w-none">{deck.businessName}</span>
            <div className="flex items-center gap-3 sm:gap-4">
              <button onClick={handlePrevSlide} className="p-1.5 sm:p-2 bg-slate-800 hover:bg-slate-700 rounded-lg">
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <span className="text-[11px] sm:text-xs">{currentSlideIndex + 1} / {deck.slides.length}</span>
              <button onClick={handleNextSlide} className="p-1.5 sm:p-2 bg-slate-800 hover:bg-slate-700 rounded-lg">
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
