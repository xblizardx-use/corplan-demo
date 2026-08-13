import React, { useState } from 'react';
import { 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  Zap, 
  Globe2, 
  Layers,
  GripVertical,
  Plus,
  Trash2,
  Move
} from 'lucide-react';
import { BusinessPlanData, Language } from '../types';

type SwotQuadrant = 'strengths' | 'weaknesses' | 'opportunities' | 'threats';

interface SwotRiskMatrixViewProps {
  plan: BusinessPlanData;
  onUpdatePlan: (updated: BusinessPlanData) => void;
  language: Language;
  theme?: 'warm-luxe' | 'dark-obsidian';
}

export const SwotRiskMatrixView: React.FC<SwotRiskMatrixViewProps> = ({
  plan,
  onUpdatePlan,
  language,
  theme = 'warm-luxe',
}) => {
  const isDark = theme === 'dark-obsidian';
  const swot = plan.marketAnalysis.swot;
  const pestel = plan.marketAnalysis.pestel;
  const porters = plan.marketAnalysis.portersFiveForces;

  const [dragOverQuadrant, setDragOverQuadrant] = useState<SwotQuadrant | null>(null);
  const [draggedInfo, setDraggedInfo] = useState<{ fromQuadrant: SwotQuadrant; index: number; text: string } | null>(null);
  const [newItemText, setNewItemText] = useState<{ [key in SwotQuadrant]?: string }>({});

  const cardBgClass = isDark
    ? 'bg-[#0e111a]/90 border-white/10 text-slate-100 shadow-2xl'
    : 'bg-white/90 border-stone-200/90 text-[#181822] shadow-xl shadow-stone-900/5 backdrop-blur-2xl';

  const subCardBgClass = isDark
    ? 'bg-slate-950/60 border-white/10 text-slate-200'
    : 'bg-white/90 border-stone-200/80 text-stone-800';

  // --- Drag & Drop Handlers ---
  const handleDragStart = (e: React.DragEvent, fromQuadrant: SwotQuadrant, index: number, text: string) => {
    const payload = JSON.stringify({ fromQuadrant, index, text });
    e.dataTransfer.setData('text/plain', payload);
    setDraggedInfo({ fromQuadrant, index, text });
  };

  const handleDragOver = (e: React.DragEvent, quadrant: SwotQuadrant) => {
    e.preventDefault();
    if (dragOverQuadrant !== quadrant) {
      setDragOverQuadrant(quadrant);
    }
  };

  const handleDragLeave = (e: React.DragEvent, quadrant: SwotQuadrant) => {
    e.preventDefault();
    if (dragOverQuadrant === quadrant) {
      setDragOverQuadrant(null);
    }
  };

  const handleDrop = (e: React.DragEvent, toQuadrant: SwotQuadrant) => {
    e.preventDefault();
    setDragOverQuadrant(null);

    let info = draggedInfo;
    if (!info) {
      try {
        const raw = e.dataTransfer.getData('text/plain');
        if (raw) {
          info = JSON.parse(raw);
        }
      } catch (err) {
        console.error(err);
      }
    }

    if (!info) return;

    const { fromQuadrant, index, text } = info;
    if (fromQuadrant === toQuadrant) {
      setDraggedInfo(null);
      return;
    }

    // Move item from source to target
    const sourceList = [...swot[fromQuadrant]];
    const targetList = [...swot[toQuadrant]];

    sourceList.splice(index, 1);
    targetList.push(text);

    const updatedSwot = {
      ...swot,
      [fromQuadrant]: sourceList,
      [toQuadrant]: targetList,
    };

    onUpdatePlan({
      ...plan,
      marketAnalysis: {
        ...plan.marketAnalysis,
        swot: updatedSwot,
      },
    });

    setDraggedInfo(null);
  };

  const handleAddItem = (quadrant: SwotQuadrant) => {
    const text = newItemText[quadrant]?.trim();
    if (!text) return;

    const updatedSwot = {
      ...swot,
      [quadrant]: [...swot[quadrant], text],
    };

    onUpdatePlan({
      ...plan,
      marketAnalysis: {
        ...plan.marketAnalysis,
        swot: updatedSwot,
      },
    });

    setNewItemText({ ...newItemText, [quadrant]: '' });
  };

  const handleDeleteItem = (quadrant: SwotQuadrant, idx: number) => {
    const updatedList = swot[quadrant].filter((_, i) => i !== idx);
    const updatedSwot = {
      ...swot,
      [quadrant]: updatedList,
    };

    onUpdatePlan({
      ...plan,
      marketAnalysis: {
        ...plan.marketAnalysis,
        swot: updatedSwot,
      },
    });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-16">
      
      {/* 1. SWOT QUADRANT MATRIX */}
      <div className={`${cardBgClass} rounded-2xl sm:rounded-3xl p-6 space-y-5 transition duration-300`}>
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 dark:border-white/10 pb-4">
          <div>
            <h2 className="text-base font-bold text-stone-900 dark:text-slate-100 flex items-center gap-2">
              <Zap className="w-5 h-5 text-indigo-500" />
              <span>Analisis Matrix SWOT (Interaktif)</span>
            </h2>
            <p className="text-xs text-stone-500 dark:text-slate-400 font-medium mt-0.5">
              Analisis faktor internal (Kekuatan & Kelemahan) dan eksternal (Peluang & Ancaman)
            </p>
          </div>

          <div className="bg-indigo-500/10 border border-indigo-500/30 text-indigo-700 dark:text-indigo-300 text-[11px] font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5">
            <Move className="w-3.5 h-3.5 text-indigo-500" />
            <span>Fitur Drag & Drop Aktif: Geser poin antar kuadran</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Strengths */}
          <div 
            onDragOver={(e) => handleDragOver(e, 'strengths')}
            onDragLeave={(e) => handleDragLeave(e, 'strengths')}
            onDrop={(e) => handleDrop(e, 'strengths')}
            className={`p-5 rounded-2xl sm:rounded-3xl shadow-lg transition-all border-2 ${
              dragOverQuadrant === 'strengths'
                ? 'bg-emerald-500/20 border-emerald-500 scale-[1.01] ring-4 ring-emerald-500/30'
                : 'bg-emerald-500/10 border-emerald-500/25'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-extrabold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Strengths (Kekuatan)</span>
              </span>
              <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-full">
                {swot.strengths.length} Poin
              </span>
            </div>

            <ul className="space-y-2 min-h-[80px]">
              {swot.strengths.map((item, i) => (
                <li 
                  key={i} 
                  draggable={true}
                  onDragStart={(e) => handleDragStart(e, 'strengths', i, item)}
                  className={`text-xs p-3 rounded-xl border font-medium flex items-center justify-between gap-2 transition cursor-grab active:cursor-grabbing hover:border-emerald-500/60 shadow-sm ${subCardBgClass}`}
                >
                  <div className="flex items-start gap-2">
                    <GripVertical className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                    <span>{item}</span>
                  </div>
                  <button
                    onClick={() => handleDeleteItem('strengths', i)}
                    className="p-1 text-stone-400 hover:text-rose-600 transition shrink-0 cursor-pointer"
                    title="Hapus poin"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-3 pt-2 border-t border-emerald-500/20 flex items-center gap-2">
              <input
                type="text"
                placeholder="+ Tambah kekuatan baru..."
                value={newItemText['strengths'] || ''}
                onChange={(e) => setNewItemText({ ...newItemText, strengths: e.target.value })}
                onKeyDown={(e) => e.key === 'Enter' && handleAddItem('strengths')}
                className="flex-1 bg-white dark:bg-slate-900 border border-emerald-500/30 rounded-xl px-3 py-1.5 text-xs text-stone-900 dark:text-slate-100 focus:outline-none font-medium"
              />
              <button
                onClick={() => handleAddItem('strengths')}
                className="p-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Weaknesses */}
          <div 
            onDragOver={(e) => handleDragOver(e, 'weaknesses')}
            onDragLeave={(e) => handleDragLeave(e, 'weaknesses')}
            onDrop={(e) => handleDrop(e, 'weaknesses')}
            className={`p-5 rounded-2xl sm:rounded-3xl shadow-lg transition-all border-2 ${
              dragOverQuadrant === 'weaknesses'
                ? 'bg-rose-500/20 border-rose-500 scale-[1.01] ring-4 ring-rose-500/30'
                : 'bg-rose-500/10 border-rose-500/25'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-extrabold text-rose-700 dark:text-rose-400 uppercase tracking-wider flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                <span>Weaknesses (Kelemahan)</span>
              </span>
              <span className="text-[10px] font-bold bg-rose-500/20 text-rose-800 dark:text-rose-300 px-2 py-0.5 rounded-full">
                {swot.weaknesses.length} Poin
              </span>
            </div>

            <ul className="space-y-2 min-h-[80px]">
              {swot.weaknesses.map((item, i) => (
                <li 
                  key={i} 
                  draggable={true}
                  onDragStart={(e) => handleDragStart(e, 'weaknesses', i, item)}
                  className={`text-xs p-3 rounded-xl border font-medium flex items-center justify-between gap-2 transition cursor-grab active:cursor-grabbing hover:border-rose-500/60 shadow-sm ${subCardBgClass}`}
                >
                  <div className="flex items-start gap-2">
                    <GripVertical className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                    <span>{item}</span>
                  </div>
                  <button
                    onClick={() => handleDeleteItem('weaknesses', i)}
                    className="p-1 text-stone-400 hover:text-rose-600 transition shrink-0 cursor-pointer"
                    title="Hapus poin"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-3 pt-2 border-t border-rose-500/20 flex items-center gap-2">
              <input
                type="text"
                placeholder="+ Tambah kelemahan baru..."
                value={newItemText['weaknesses'] || ''}
                onChange={(e) => setNewItemText({ ...newItemText, weaknesses: e.target.value })}
                onKeyDown={(e) => e.key === 'Enter' && handleAddItem('weaknesses')}
                className="flex-1 bg-white dark:bg-slate-900 border border-rose-500/30 rounded-xl px-3 py-1.5 text-xs text-stone-900 dark:text-slate-100 focus:outline-none font-medium"
              />
              <button
                onClick={() => handleAddItem('weaknesses')}
                className="p-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl transition cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Opportunities */}
          <div 
            onDragOver={(e) => handleDragOver(e, 'opportunities')}
            onDragLeave={(e) => handleDragLeave(e, 'opportunities')}
            onDrop={(e) => handleDrop(e, 'opportunities')}
            className={`p-5 rounded-2xl sm:rounded-3xl shadow-lg transition-all border-2 ${
              dragOverQuadrant === 'opportunities'
                ? 'bg-indigo-500/20 border-indigo-500 scale-[1.01] ring-4 ring-indigo-500/30'
                : 'bg-indigo-500/10 border-indigo-500/25'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-extrabold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider flex items-center gap-2">
                <Zap className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Opportunities (Peluang Pasar)</span>
              </span>
              <span className="text-[10px] font-bold bg-indigo-500/20 text-indigo-800 dark:text-indigo-300 px-2 py-0.5 rounded-full">
                {swot.opportunities.length} Poin
              </span>
            </div>

            <ul className="space-y-2 min-h-[80px]">
              {swot.opportunities.map((item, i) => (
                <li 
                  key={i} 
                  draggable={true}
                  onDragStart={(e) => handleDragStart(e, 'opportunities', i, item)}
                  className={`text-xs p-3 rounded-xl border font-medium flex items-center justify-between gap-2 transition cursor-grab active:cursor-grabbing hover:border-indigo-500/60 shadow-sm ${subCardBgClass}`}
                >
                  <div className="flex items-start gap-2">
                    <GripVertical className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-1.5" />
                    <span>{item}</span>
                  </div>
                  <button
                    onClick={() => handleDeleteItem('opportunities', i)}
                    className="p-1 text-stone-400 hover:text-rose-600 transition shrink-0 cursor-pointer"
                    title="Hapus poin"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-3 pt-2 border-t border-indigo-500/20 flex items-center gap-2">
              <input
                type="text"
                placeholder="+ Tambah peluang baru..."
                value={newItemText['opportunities'] || ''}
                onChange={(e) => setNewItemText({ ...newItemText, opportunities: e.target.value })}
                onKeyDown={(e) => e.key === 'Enter' && handleAddItem('opportunities')}
                className="flex-1 bg-white dark:bg-slate-900 border border-indigo-500/30 rounded-xl px-3 py-1.5 text-xs text-stone-900 dark:text-slate-100 focus:outline-none font-medium"
              />
              <button
                onClick={() => handleAddItem('opportunities')}
                className="p-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Threats */}
          <div 
            onDragOver={(e) => handleDragOver(e, 'threats')}
            onDragLeave={(e) => handleDragLeave(e, 'threats')}
            onDrop={(e) => handleDrop(e, 'threats')}
            className={`p-5 rounded-2xl sm:rounded-3xl shadow-lg transition-all border-2 ${
              dragOverQuadrant === 'threats'
                ? 'bg-amber-500/20 border-amber-500 scale-[1.01] ring-4 ring-amber-500/30'
                : 'bg-amber-500/10 border-amber-500/25'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-extrabold text-amber-700 dark:text-amber-400 uppercase tracking-wider flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Threats (Ancaman Eksternal)</span>
              </span>
              <span className="text-[10px] font-bold bg-amber-500/20 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded-full">
                {swot.threats.length} Poin
              </span>
            </div>

            <ul className="space-y-2 min-h-[80px]">
              {swot.threats.map((item, i) => (
                <li 
                  key={i} 
                  draggable={true}
                  onDragStart={(e) => handleDragStart(e, 'threats', i, item)}
                  className={`text-xs p-3 rounded-xl border font-medium flex items-center justify-between gap-2 transition cursor-grab active:cursor-grabbing hover:border-amber-500/60 shadow-sm ${subCardBgClass}`}
                >
                  <div className="flex items-start gap-2">
                    <GripVertical className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                    <span>{item}</span>
                  </div>
                  <button
                    onClick={() => handleDeleteItem('threats', i)}
                    className="p-1 text-stone-400 hover:text-rose-600 transition shrink-0 cursor-pointer"
                    title="Hapus poin"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-3 pt-2 border-t border-amber-500/20 flex items-center gap-2">
              <input
                type="text"
                placeholder="+ Tambah ancaman baru..."
                value={newItemText['threats'] || ''}
                onChange={(e) => setNewItemText({ ...newItemText, threats: e.target.value })}
                onKeyDown={(e) => e.key === 'Enter' && handleAddItem('threats')}
                className="flex-1 bg-white dark:bg-slate-900 border border-amber-500/30 rounded-xl px-3 py-1.5 text-xs text-stone-900 dark:text-slate-100 focus:outline-none font-medium"
              />
              <button
                onClick={() => handleAddItem('threats')}
                className="p-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl transition cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* 2. PESTEL ANALYSIS GRID */}
      {pestel && (
        <div className={`${cardBgClass} rounded-2xl sm:rounded-3xl p-6 space-y-4`}>
          <div className="border-b border-stone-200 dark:border-white/10 pb-3">
            <h2 className="text-base font-bold text-stone-900 dark:text-slate-100 flex items-center gap-2">
              <Globe2 className="w-5 h-5 text-cyan-500" />
              <span>Analisis Lingkungan Makro PESTEL</span>
            </h2>
            <p className="text-xs text-stone-500 dark:text-slate-400 font-medium mt-0.5">Faktor Politik, Ekonomi, Sosial, Teknologi, Lingkungan & Hukum</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className={`p-4 rounded-2xl border ${subCardBgClass}`}>
              <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 block mb-1">🏛️ Political (Politik)</span>
              <p className="text-xs font-medium leading-relaxed">{pestel.political}</p>
            </div>
            <div className={`p-4 rounded-2xl border ${subCardBgClass}`}>
              <span className="text-xs font-extrabold text-amber-600 dark:text-amber-400 block mb-1">📈 Economic (Ekonomi)</span>
              <p className="text-xs font-medium leading-relaxed">{pestel.economic}</p>
            </div>
            <div className={`p-4 rounded-2xl border ${subCardBgClass}`}>
              <span className="text-xs font-extrabold text-rose-600 dark:text-rose-400 block mb-1">👥 Social (Sosial)</span>
              <p className="text-xs font-medium leading-relaxed">{pestel.social}</p>
            </div>
            <div className={`p-4 rounded-2xl border ${subCardBgClass}`}>
              <span className="text-xs font-extrabold text-cyan-600 dark:text-cyan-400 block mb-1">💻 Technological (Teknologi)</span>
              <p className="text-xs font-medium leading-relaxed">{pestel.technological}</p>
            </div>
            <div className={`p-4 rounded-2xl border ${subCardBgClass}`}>
              <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 block mb-1">🌱 Environmental (Lingkungan)</span>
              <p className="text-xs font-medium leading-relaxed">{pestel.environmental}</p>
            </div>
            <div className={`p-4 rounded-2xl border ${subCardBgClass}`}>
              <span className="text-xs font-extrabold text-purple-600 dark:text-purple-400 block mb-1">⚖️ Legal (Hukum)</span>
              <p className="text-xs font-medium leading-relaxed">{pestel.legal}</p>
            </div>
          </div>
        </div>
      )}

      {/* 3. PORTER'S FIVE FORCES */}
      {porters && (
        <div className={`${cardBgClass} rounded-2xl sm:rounded-3xl p-6 space-y-4`}>
          <div className="border-b border-stone-200 dark:border-white/10 pb-3">
            <h2 className="text-base font-bold text-stone-900 dark:text-slate-100 flex items-center gap-2">
              <Layers className="w-5 h-5 text-amber-500" />
              <span>Porter's Five Forces (Persaingan Industri)</span>
            </h2>
            <p className="text-xs text-stone-500 dark:text-slate-400 font-medium mt-0.5">Analisis daya tawar dan intensitas persaingan industri</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className={`p-4 rounded-2xl border ${subCardBgClass}`}>
              <span className="text-xs font-extrabold text-stone-900 dark:text-white block mb-1">1. Ancaman Pendatang Baru</span>
              <p className="text-xs font-medium leading-relaxed">{porters.threatOfNewEntrants}</p>
            </div>
            <div className={`p-4 rounded-2xl border ${subCardBgClass}`}>
              <span className="text-xs font-extrabold text-stone-900 dark:text-white block mb-1">2. Daya Tawar Pemasok</span>
              <p className="text-xs font-medium leading-relaxed">{porters.bargainingPowerOfSuppliers}</p>
            </div>
            <div className={`p-4 rounded-2xl border ${subCardBgClass}`}>
              <span className="text-xs font-extrabold text-stone-900 dark:text-white block mb-1">3. Daya Tawar Pembeli</span>
              <p className="text-xs font-medium leading-relaxed">{porters.bargainingPowerOfBuyers}</p>
            </div>
            <div className={`p-4 rounded-2xl border ${subCardBgClass}`}>
              <span className="text-xs font-extrabold text-stone-900 dark:text-white block mb-1">4. Ancaman Produk Substitusi</span>
              <p className="text-xs font-medium leading-relaxed">{porters.threatOfSubstitutes}</p>
            </div>
            <div className={`p-4 rounded-2xl border ${subCardBgClass}`}>
              <span className="text-xs font-extrabold text-stone-900 dark:text-white block mb-1">5. Intensitas Persaingan</span>
              <p className="text-xs font-medium leading-relaxed">{porters.competitiveRivalry}</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
