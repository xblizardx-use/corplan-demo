import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Target, 
  CheckCircle2, 
  TrendingUp, 
  AlertTriangle, 
  Edit3, 
  Save,
  Clock,
  Calendar,
  Plus,
  Trash2,
  Filter,
  Flag,
  Sparkles,
  ChevronRight,
  X,
  Check,
  Globe,
  GraduationCap,
  Briefcase,
  HelpCircle,
  Lightbulb,
  BookOpen
} from 'lucide-react';
import { BusinessPlanData, BusinessMilestone, Language } from '../types';
import { formatCurrency, calculateFinancials } from '../utils/financialCalculations';
import { GoogleTrafficInsightsView } from './GoogleTrafficInsightsView';
import { BeginnerGuideView } from './BeginnerGuideView';
import { NextStepsTaskTracker } from './NextStepsTaskTracker';

interface BusinessPlanViewProps {
  plan: BusinessPlanData;
  onUpdatePlan: (updated: BusinessPlanData) => void;
  language: Language;
  theme?: 'warm-luxe' | 'dark-obsidian';
  isEditMode?: boolean;
}

const DEFAULT_MILESTONES: BusinessMilestone[] = [
  { 
    id: 'ms-1', 
    title: 'Persiapan Legalitas & Setup Lokasi', 
    targetDate: 'Q1 2026', 
    description: 'Penyelesaian perizinan usaha (NIB/Halal), renovasi tempat, dan pengadaan perlengkapan operasional utama.', 
    status: 'Completed', 
    category: 'Peluncuran' 
  },
  { 
    id: 'ms-2', 
    title: 'Grand Opening & Kampanye Pemasaran', 
    targetDate: 'Q2 2026', 
    description: 'Peluncuran resmi ke publik, aktivasi promosi media sosial, dan program loyalitas pelanggan awal.', 
    status: 'In Progress', 
    category: 'Pemasaran' 
  },
  { 
    id: 'ms-3', 
    title: 'Pencapaian BEP & Stabilitas Arus Kas', 
    targetDate: 'Q3 2026', 
    description: 'Mencapai target volume penjualan bulanan terukur untuk menutup biaya operasional penuh.', 
    status: 'Upcoming', 
    category: 'Finansial' 
  },
  { 
    id: 'ms-4', 
    title: 'Inovasi Produk & Ekspansi Cabang Baru', 
    targetDate: 'Q4 2026', 
    description: 'Pengembangan lini produk turunan baru dan persiapan pembukaan outlet cabang kedua.', 
    status: 'Upcoming', 
    category: 'Operasional' 
  },
];

export const BusinessPlanView: React.FC<BusinessPlanViewProps> = ({
  plan,
  onUpdatePlan,
  language,
  theme = 'warm-luxe',
  isEditMode = false,
}) => {
  const [editedPlan, setEditedPlan] = useState<BusinessPlanData>(plan);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  
  // Milestone state & modal management
  const currentMilestones = plan.milestones && plan.milestones.length > 0 ? plan.milestones : DEFAULT_MILESTONES;
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingMilestoneId, setEditingMilestoneId] = useState<string | null>(null);

  // Form fields for new/edit milestone
  const [formTitle, setFormTitle] = useState('');
  const [formTargetDate, setFormTargetDate] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formStatus, setFormStatus] = useState<'Completed' | 'In Progress' | 'Upcoming'>('Upcoming');
  const [formCategory, setFormCategory] = useState<'Peluncuran' | 'Finansial' | 'Produk' | 'Pemasaran' | 'Operasional'>('Peluncuran');

  const [activeViewTab, setActiveViewTab] = useState<'proposal' | 'beginner' | 'google-traffic'>('proposal');

  useEffect(() => {
    setEditedPlan(plan);
  }, [plan]);

  const financials = calculateFinancials(plan.financialModel);
  const curr = plan.financialModel.currency;

  const handleSave = () => {
    onUpdatePlan(editedPlan);
  };

  const bepUnits = financials.bepRevenueMonthly > 0 ? Math.ceil(financials.bepRevenueMonthly / 18000) : 410;

  // Milestone helper functions
  const updateMilestones = (updatedList: BusinessMilestone[]) => {
    const updatedPlan = { ...plan, milestones: updatedList };
    setEditedPlan(updatedPlan);
    onUpdatePlan(updatedPlan);
  };

  const handleToggleStatus = (id: string) => {
    const updated = currentMilestones.map((ms) => {
      if (ms.id !== id) return ms;
      const nextStatus: 'Completed' | 'In Progress' | 'Upcoming' = 
        ms.status === 'Upcoming' ? 'In Progress' :
        ms.status === 'In Progress' ? 'Completed' : 'Upcoming';
      return { ...ms, status: nextStatus };
    });
    updateMilestones(updated);
  };

  const handleDeleteMilestone = (id: string) => {
    const updated = currentMilestones.filter((ms) => ms.id !== id);
    updateMilestones(updated);
  };

  const handleOpenAddModal = () => {
    setFormTitle('');
    setFormTargetDate(`Q${Math.floor(Math.random() * 4) + 1} 2026`);
    setFormDescription('');
    setFormStatus('Upcoming');
    setFormCategory('Peluncuran');
    setEditingMilestoneId(null);
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (ms: BusinessMilestone) => {
    setFormTitle(ms.title);
    setFormTargetDate(ms.targetDate);
    setFormDescription(ms.description);
    setFormStatus(ms.status);
    setFormCategory(ms.category || 'Peluncuran');
    setEditingMilestoneId(ms.id);
    setIsAddModalOpen(true);
  };

  const handleSaveMilestoneForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    if (editingMilestoneId) {
      // Edit mode
      const updated = currentMilestones.map((ms) => {
        if (ms.id === editingMilestoneId) {
          return {
            ...ms,
            title: formTitle,
            targetDate: formTargetDate || 'Q3 2026',
            description: formDescription,
            status: formStatus,
            category: formCategory,
          };
        }
        return ms;
      });
      updateMilestones(updated);
    } else {
      // Add mode
      const newMs: BusinessMilestone = {
        id: `ms-${Date.now()}`,
        title: formTitle,
        targetDate: formTargetDate || 'Q3 2026',
        description: formDescription,
        status: formStatus,
        category: formCategory,
      };
      updateMilestones([...currentMilestones, newMs]);
    }

    setIsAddModalOpen(false);
  };

  // Filter calculation
  const filteredMilestones = currentMilestones.filter((ms) => {
    if (filterStatus === 'All') return true;
    return ms.status === filterStatus;
  });

  const completedCount = currentMilestones.filter((m) => m.status === 'Completed').length;
  const inProgressCount = currentMilestones.filter((m) => m.status === 'In Progress').length;
  const totalCount = currentMilestones.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-fadeIn px-2 sm:px-0">
      
      {/* View Mode Navigation Bar */}
      <div className="bg-slate-900 text-white p-2 sm:p-2.5 rounded-2xl border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a] flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveViewTab('proposal')}
          className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 border-2 ${
            activeViewTab === 'proposal'
              ? 'bg-[#fef08a] text-slate-900 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]'
              : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5 text-slate-900" />
          <span>Dokumen Resmi (Investor/Bank)</span>
        </button>

        <button
          onClick={() => setActiveViewTab('beginner')}
          className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 border-2 ${
            activeViewTab === 'beginner'
              ? 'bg-[#bae6fd] text-slate-900 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]'
              : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5 text-blue-900" />
          <span>Panduan Pemula (Bahasa Sederhana)</span>
        </button>

        <button
          onClick={() => setActiveViewTab('google-traffic')}
          className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 border-2 ${
            activeViewTab === 'google-traffic'
              ? 'bg-[#dcfce7] text-slate-900 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]'
              : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
          }`}
        >
          <Globe className="w-3.5 h-3.5 text-emerald-600" />
          <span>Traffic & Tren Google Live</span>
        </button>
      </div>

      {activeViewTab === 'beginner' && (
        <BeginnerGuideView 
          guide={plan.beginnerGuide} 
          financialModel={plan.financialModel} 
          businessName={plan.businessName} 
          onSwitchToProfessional={() => setActiveViewTab('proposal')} 
        />
      )}

      {activeViewTab === 'google-traffic' && (
        <GoogleTrafficInsightsView 
          data={plan.googleTraffic} 
          businessName={plan.businessName} 
          industry={plan.industry} 
          currency={curr} 
        />
      )}

      {activeViewTab === 'proposal' && (
        <div className="space-y-6">
          <NextStepsTaskTracker plan={editedPlan} theme={theme} />

          {/* Outer Card Container */}
          <div className="bg-white border-2 border-slate-900 rounded-3xl p-4 sm:p-6 md:p-8 shadow-[6px_6px_0px_0px_#0f172a] space-y-6 sm:space-y-8 text-slate-900">
        
        {/* Document Header Tag */}
        <div className="space-y-3 pb-4 border-b-2 border-slate-900">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="bg-[#0f172a] text-white border-2 border-slate-900 px-3 py-1 rounded-lg text-[11px] sm:text-xs font-black shadow-[2px_2px_0px_0px_#0f172a] uppercase tracking-wider">
              PROPOSAL BANK
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveViewTab('beginner')}
                className="bg-[#bae6fd] text-slate-900 border border-slate-900 px-2.5 py-0.5 rounded-md text-[11px] font-black hover:bg-sky-200 transition"
              >
                🎓 Penjelasan Pemula
              </button>
              <span className="text-[11px] sm:text-xs font-extrabold text-slate-600 bg-slate-100 border border-slate-900 px-2 py-0.5 rounded-md">
                {plan.industry}
              </span>
            </div>
          </div>

          {isEditMode ? (
            <div className="space-y-3 pt-2">
              <input
                type="text"
                value={editedPlan.businessName}
                onChange={(e) => setEditedPlan({ ...editedPlan, businessName: e.target.value })}
                className="w-full font-black text-xl sm:text-2xl p-2.5 sm:p-3 border-2 border-slate-900 rounded-xl shadow-[2px_2px_0px_0px_#0f172a] focus:outline-none"
              />
              <input
                type="text"
                value={editedPlan.tagline}
                onChange={(e) => setEditedPlan({ ...editedPlan, tagline: e.target.value })}
                className="w-full text-xs font-bold p-2.5 border-2 border-slate-900 rounded-xl shadow-[2px_2px_0px_0px_#0f172a] focus:outline-none"
              />
            </div>
          ) : (
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight break-words">
                {plan.businessName}
              </h1>
              <p className="text-xs sm:text-sm font-bold text-slate-600 mt-1">
                {plan.industry}
              </p>
            </div>
          )}
        </div>

        {/* 1. EKSEKUTIF SUMMARY */}
        <div className="space-y-3">
          <span className="bg-[#fef08a] border-2 border-slate-900 px-3 py-1 rounded-xl text-xs sm:text-sm md:text-lg font-black text-slate-900 shadow-[2px_2px_0px_0px_#0f172a] inline-block">
            1. Eksekutif Summary
          </span>

          {isEditMode ? (
            <textarea
              value={editedPlan.executiveSummary}
              onChange={(e) => setEditedPlan({ ...editedPlan, executiveSummary: e.target.value })}
              rows={5}
              className="w-full text-xs font-semibold p-3 border-2 border-slate-900 rounded-xl shadow-[2px_2px_0px_0px_#0f172a] focus:outline-none"
            />
          ) : (
            <div className="bg-slate-50 border-2 border-slate-900 rounded-2xl p-3.5 sm:p-5 shadow-[2px_2px_0px_0px_#0f172a] text-xs sm:text-sm font-semibold leading-relaxed whitespace-pre-line text-slate-800">
              **{plan.businessName}** adalah entitas bisnis di sektor **{plan.industry}** yang dirancang untuk menjawab kebutuhan pasar. Modal awal disiapkan sebesar **{formatCurrency(plan.financialModel.initialCapital, curr)}**, bisnis ini memiliki proyeksi imbal hasil yang kokoh melalui efisiensi operasional dan strategi pemasaran terfokus.
              <br /><br />
              {plan.executiveSummary}
            </div>
          )}
        </div>

        {/* 2. METRIK FINANSIAL */}
        <div className="space-y-3">
          <span className="bg-[#fef08a] border-2 border-slate-900 px-3 py-1 rounded-xl text-xs sm:text-sm md:text-lg font-black text-slate-900 shadow-[2px_2px_0px_0px_#0f172a] inline-block">
            2. Metrik Finansial
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 pt-1">
            <div className="bg-[#dcfce7] border-2 border-slate-900 shadow-[2.5px_2.5px_0px_0px_#0f172a] rounded-2xl p-2.5 sm:p-4 text-center">
              <span className="text-[9px] sm:text-[10px] font-black uppercase text-slate-700 tracking-wider block truncate">INVESTASI</span>
              <span className="text-xs sm:text-sm md:text-base font-black text-slate-900 mt-0.5 sm:mt-1 block truncate" title={formatCurrency(plan.financialModel.initialCapital, curr)}>
                {formatCurrency(plan.financialModel.initialCapital, curr)}
              </span>
            </div>

            <div className="bg-[#dcfce7] border-2 border-slate-900 shadow-[2.5px_2.5px_0px_0px_#0f172a] rounded-2xl p-2.5 sm:p-4 text-center">
              <span className="text-[9px] sm:text-[10px] font-black uppercase text-slate-700 tracking-wider block truncate">BEP (BULAN)</span>
              <span className="text-xs sm:text-sm md:text-base font-black text-slate-900 mt-0.5 sm:mt-1 block">
                {bepUnits} Unit
              </span>
            </div>

            <div className="bg-[#dcfce7] border-2 border-slate-900 shadow-[2.5px_2.5px_0px_0px_#0f172a] rounded-2xl p-2.5 sm:p-4 text-center">
              <span className="text-[9px] sm:text-[10px] font-black uppercase text-slate-700 tracking-wider block truncate">MARGIN</span>
              <span className="text-xs sm:text-sm md:text-base font-black text-slate-900 mt-0.5 sm:mt-1 block">
                {Math.round(financials.baseGrossMarginPercent || 61)}%
              </span>
            </div>

            <div className="bg-[#dcfce7] border-2 border-slate-900 shadow-[2.5px_2.5px_0px_0px_#0f172a] rounded-2xl p-2.5 sm:p-4 text-center">
              <span className="text-[9px] sm:text-[10px] font-black uppercase text-slate-700 tracking-wider block truncate">PAYBACK</span>
              <span className="text-xs sm:text-sm md:text-base font-black text-slate-900 mt-0.5 sm:mt-1 block">
                7 Bulan
              </span>
            </div>
          </div>
        </div>

        {/* 3. ANALISIS PASAR */}
        <div className="space-y-3">
          <span className="bg-[#fef08a] border-2 border-slate-900 px-3 py-1 rounded-xl text-xs sm:text-sm md:text-lg font-black text-slate-900 shadow-[2px_2px_0px_0px_#0f172a] inline-block">
            3. Analisis Pasar
          </span>

          <p className="text-xs sm:text-sm font-semibold leading-relaxed text-slate-800">
            Pasar target difokuskan pada **{plan.marketAnalysis.targetAudience}**. Potensi penetrasi pasar diperkuat oleh nilai tambah unik perusahaan: "{plan.tagline}".
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 pt-2">
            <div className="bg-[#bae6fd] border-2 border-slate-900 shadow-[2.5px_2.5px_0px_0px_#0f172a] rounded-2xl p-3 text-center flex sm:block items-center justify-between sm:justify-center">
              <span className="text-[10px] sm:text-[11px] font-black uppercase text-slate-800 block">TAM (Total Addressable)</span>
              <span className="text-xs sm:text-sm font-black text-slate-900 mt-0.5 block">Rp 2.250.000.000</span>
            </div>
            <div className="bg-[#bae6fd] border-2 border-slate-900 shadow-[2.5px_2.5px_0px_0px_#0f172a] rounded-2xl p-3 text-center flex sm:block items-center justify-between sm:justify-center">
              <span className="text-[10px] sm:text-[11px] font-black uppercase text-slate-800 block">SAM (Serviceable)</span>
              <span className="text-xs sm:text-sm font-black text-slate-900 mt-0.5 block">Rp 450.000.000</span>
            </div>
            <div className="bg-[#bae6fd] border-2 border-slate-900 shadow-[2.5px_2.5px_0px_0px_#0f172a] rounded-2xl p-3 text-center flex sm:block items-center justify-between sm:justify-center">
              <span className="text-[10px] sm:text-[11px] font-black uppercase text-slate-800 block">SOM (Obtainable)</span>
              <span className="text-xs sm:text-sm font-black text-slate-900 mt-0.5 block">Rp 90.000.000</span>
            </div>
          </div>
        </div>

        {/* 4. SWOT MATRIKS */}
        <div className="space-y-3">
          <span className="bg-[#fef08a] border-2 border-slate-900 px-3 py-1 rounded-xl text-xs sm:text-sm md:text-lg font-black text-slate-900 shadow-[2px_2px_0px_0px_#0f172a] inline-block">
            4. SWOT Matriks
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {/* Strengths */}
            <div className="bg-[#dcfce7] border-2 border-slate-900 shadow-[2.5px_2.5px_0px_0px_#0f172a] rounded-2xl p-3.5 sm:p-4 space-y-2">
              <span className="text-xs font-black uppercase text-slate-900 block">S - KEKUATAN</span>
              <ul className="space-y-1 text-xs font-semibold text-slate-800 list-disc list-inside">
                {plan.marketAnalysis.swot.strengths.map((item, idx) => (
                  <li key={idx} className="leading-snug">{item}</li>
                ))}
              </ul>
            </div>

            {/* Weaknesses */}
            <div className="bg-[#ffe4e6] border-2 border-slate-900 shadow-[2.5px_2.5px_0px_0px_#0f172a] rounded-2xl p-3.5 sm:p-4 space-y-2">
              <span className="text-xs font-black uppercase text-slate-900 block">W - KELEMAHAN</span>
              <ul className="space-y-1 text-xs font-semibold text-slate-800 list-disc list-inside">
                {plan.marketAnalysis.swot.weaknesses.map((item, idx) => (
                  <li key={idx} className="leading-snug">{item}</li>
                ))}
              </ul>
            </div>

            {/* Opportunities */}
            <div className="bg-[#dbeafe] border-2 border-slate-900 shadow-[2.5px_2.5px_0px_0px_#0f172a] rounded-2xl p-3.5 sm:p-4 space-y-2">
              <span className="text-xs font-black uppercase text-slate-900 block">O - PELUANG</span>
              <ul className="space-y-1 text-xs font-semibold text-slate-800 list-disc list-inside">
                {plan.marketAnalysis.swot.opportunities.map((item, idx) => (
                  <li key={idx} className="leading-snug">{item}</li>
                ))}
              </ul>
            </div>

            {/* Threats */}
            <div className="bg-[#fef3c7] border-2 border-slate-900 shadow-[2.5px_2.5px_0px_0px_#0f172a] rounded-2xl p-3.5 sm:p-4 space-y-2">
              <span className="text-xs font-black uppercase text-slate-900 block">T - ANCAMAN</span>
              <ul className="space-y-1 text-xs font-semibold text-slate-800 list-disc list-inside">
                {plan.marketAnalysis.swot.threats.map((item, idx) => (
                  <li key={idx} className="leading-snug">{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 5. RISIKO & MITIGASI */}
        <div className="space-y-3">
          <span className="bg-[#fef08a] border-2 border-slate-900 px-3 py-1 rounded-xl text-xs sm:text-sm md:text-lg font-black text-slate-900 shadow-[2px_2px_0px_0px_#0f172a] inline-block">
            5. Risiko & Mitigasi
          </span>

          <div className="border-2 border-slate-900 shadow-[2.5px_2.5px_0px_0px_#0f172a] rounded-2xl overflow-x-auto bg-white scrollbar-thin">
            <table className="w-full min-w-[500px] sm:min-w-0 text-left text-xs font-semibold border-collapse">
              <thead>
                <tr className="bg-slate-100 border-b-2 border-slate-900 font-black text-slate-900">
                  <th className="p-2.5 sm:p-3 border-r-2 border-slate-900 w-1/3">Risiko</th>
                  <th className="p-2.5 sm:p-3 border-r-2 border-slate-900 w-20 sm:w-24">Level</th>
                  <th className="p-2.5 sm:p-3">Mitigasi</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-slate-900">
                {plan.riskManagement.map((row) => (
                  <tr key={row.id}>
                    <td className="p-2.5 sm:p-3 font-bold border-r-2 border-slate-900 leading-snug">{row.risk}</td>
                    <td className="p-2.5 sm:p-3 border-r-2 border-slate-900">
                      <span className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg border-2 border-slate-900 font-black text-[10px] sm:text-[11px] inline-block ${
                        row.impact === 'Tinggi' || row.impact === 'High'
                          ? 'bg-[#0f172a] text-white'
                          : 'bg-[#fde047] text-slate-900'
                      }`}>
                        {row.impact}
                      </span>
                    </td>
                    <td className="p-2.5 sm:p-3 leading-snug">{row.mitigation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 6. MILESTONE & TIMELINE USAHA */}
        <div className="space-y-4 pt-2 border-t-2 border-slate-900">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <span className="bg-[#fef08a] border-2 border-slate-900 px-3 py-1 rounded-xl text-xs sm:text-sm md:text-lg font-black text-slate-900 shadow-[2px_2px_0px_0px_#0f172a] inline-flex items-center gap-2 self-start">
              <Flag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-900" />
              <span>6. Milestone & Timeline Usaha</span>
            </span>

            <button
              onClick={handleOpenAddModal}
              className="bg-[#dcfce7] hover:bg-[#bbf7d0] border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] active:translate-x-0.5 active:translate-y-0.5 rounded-xl px-3.5 py-1.5 font-extrabold text-xs text-slate-900 transition flex items-center justify-center gap-1.5 cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>Tambah Milestone</span>
            </button>
          </div>

          {/* Progress Tracker Card */}
          <div className="bg-slate-50 border-2 border-slate-900 rounded-2xl p-3.5 sm:p-4 shadow-[2.5px_2.5px_0px_0px_#0f172a] space-y-3">
            <div className="flex items-center justify-between text-xs font-black text-slate-900 gap-2 flex-wrap">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span className="text-[11px] sm:text-xs">PROGRESS PENCAPAIAN TARGET</span>
              </div>
              <span className="bg-[#0f172a] text-white px-2 py-0.5 rounded-lg border border-slate-900 text-[10px] sm:text-[11px]">
                {completedCount} / {totalCount} Selesai ({progressPercent}%)
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-3 sm:h-3.5 bg-slate-200 border-2 border-slate-900 rounded-full overflow-hidden p-0.5">
              <div 
                className="h-full bg-[#dcfce7] border border-slate-900 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] font-extrabold pt-1 no-scrollbar">
              <span className="text-slate-500 mr-1 flex items-center gap-1 shrink-0">
                <Filter className="w-3 h-3" /> Filter:
              </span>
              {[
                { id: 'All', label: 'Semua' },
                { id: 'Completed', label: `Completed (${completedCount})` },
                { id: 'In Progress', label: `In Progress (${inProgressCount})` },
                { id: 'Upcoming', label: 'Upcoming' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilterStatus(tab.id)}
                  className={`px-2.5 py-1 rounded-lg border-2 border-slate-900 transition cursor-pointer shrink-0 text-[10px] sm:text-[11px] ${
                    filterStatus === tab.id
                      ? 'bg-[#fef08a] text-slate-900 shadow-[1px_1px_0px_0px_#0f172a]'
                      : 'bg-white hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Timeline Container */}
          <div className="relative pl-5 sm:pl-8 space-y-5 sm:space-y-6 pt-2 border-l-4 border-slate-900 ml-2.5 sm:ml-4">
            
            {filteredMilestones.length === 0 ? (
              <div className="bg-amber-50/50 border-2 border-dashed border-slate-400 rounded-2xl p-4 sm:p-6 text-center text-xs font-bold text-slate-500">
                Tidak ada milestone untuk filter status ini.
              </div>
            ) : (
              filteredMilestones.map((ms, index) => {
                const isCompleted = ms.status === 'Completed';
                const isInProgress = ms.status === 'In Progress';

                return (
                  <div key={ms.id || index} className="relative group">
                    
                    {/* Timeline Node Icon Badge */}
                    <button
                      onClick={() => handleToggleStatus(ms.id)}
                      title="Klik untuk ubah status milestone"
                      className={`absolute -left-[31px] sm:-left-[43px] top-1.5 w-7 h-7 sm:w-8 sm:h-8 rounded-xl border-2 border-slate-900 flex items-center justify-center shadow-[1.5px_1.5px_0px_0px_#0f172a] transition transform group-hover:scale-110 cursor-pointer ${
                        isCompleted
                          ? 'bg-[#dcfce7] text-slate-900'
                          : isInProgress
                          ? 'bg-[#fef08a] text-slate-900 animate-pulse'
                          : 'bg-white text-slate-500'
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3]" />
                      ) : isInProgress ? (
                        <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-900 stroke-[2.5]" />
                      ) : (
                        <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-500" />
                      )}
                    </button>

                    {/* Milestone Card */}
                    <div className="bg-white border-2 border-slate-900 rounded-2xl p-3.5 sm:p-5 shadow-[3px_3px_0px_0px_#0f172a] hover:bg-slate-50/50 transition space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        
                        {/* Target Date Pill & Category Tag */}
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="bg-[#0f172a] text-white border-2 border-slate-900 px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider shadow-[1px_1px_0px_0px_#0f172a]">
                            📅 {ms.targetDate}
                          </span>

                          {ms.category && (
                            <span className="bg-[#bae6fd] text-slate-900 border border-slate-900 px-2 py-0.5 rounded-md text-[10px] font-extrabold">
                              {ms.category}
                            </span>
                          )}
                        </div>

                        {/* Status Badge & Actions */}
                        <div className="flex items-center gap-1.5 self-end sm:self-auto">
                          <button
                            onClick={() => handleToggleStatus(ms.id)}
                            className={`px-2 py-0.5 rounded-lg border-2 border-slate-900 text-[10px] font-black cursor-pointer transition shadow-[1px_1px_0px_0px_#0f172a] ${
                              isCompleted
                                ? 'bg-[#dcfce7] text-slate-900'
                                : isInProgress
                                ? 'bg-[#fef08a] text-slate-900'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {ms.status === 'Completed' ? '✅ Selesai' : ms.status === 'In Progress' ? '⏳ Berjalan' : '🎯 Terencana'}
                          </button>

                          {/* Edit Milestone */}
                          <button
                            onClick={() => handleOpenEditModal(ms)}
                            className="p-1 bg-slate-100 hover:bg-amber-100 border border-slate-900 rounded-lg text-slate-800 transition cursor-pointer"
                            title="Edit Milestone"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>

                          {/* Delete Milestone */}
                          <button
                            onClick={() => handleDeleteMilestone(ms.id)}
                            className="p-1 bg-rose-50 hover:bg-rose-200 border border-slate-900 rounded-lg text-rose-700 transition cursor-pointer"
                            title="Hapus Milestone"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                      </div>

                      {/* Milestone Title & Description */}
                      <div>
                        <h4 className="text-xs sm:text-base font-black text-slate-900 break-words">
                          {ms.title}
                        </h4>
                        <p className="text-[11px] sm:text-xs font-semibold text-slate-600 mt-1 leading-relaxed">
                          {ms.description}
                        </p>
                      </div>

                    </div>

                  </div>
                );
              })
            )}

          </div>

        </div>

        {/* Save button if edit mode active */}
        {isEditMode && (
          <div className="pt-4 flex justify-end">
            <button
              onClick={handleSave}
              className="bg-[#dcfce7] hover:bg-[#bbf7d0] border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] rounded-xl px-6 py-2.5 font-black text-xs text-slate-900 cursor-pointer"
            >
              Simpan Perubahan
            </button>
          </div>
        )}

      </div>
        </div>
      )}

      {/* ADD / EDIT MILESTONE MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn overflow-y-auto">
          <div className="bg-white border-2 border-slate-900 rounded-3xl p-5 sm:p-8 max-w-lg w-full shadow-[8px_8px_0px_0px_#0f172a] space-y-4 sm:space-y-5 text-slate-900 my-auto max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b-2 border-slate-900 pb-3">
              <span className="bg-[#fef08a] border-2 border-slate-900 px-3 py-1 rounded-xl text-xs sm:text-sm font-black shadow-[2px_2px_0px_0px_#0f172a] flex items-center gap-1.5">
                <Flag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>{editingMilestoneId ? 'Edit Milestone' : 'Tambah Milestone Baru'}</span>
              </span>

              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 bg-slate-100 hover:bg-rose-100 border-2 border-slate-900 rounded-xl transition cursor-pointer"
              >
                <X className="w-4 h-4 text-slate-900" />
              </button>
            </div>

            <form onSubmit={handleSaveMilestoneForm} className="space-y-4 text-xs font-bold">
              
              {/* Judul */}
              <div className="space-y-1">
                <label className="block text-slate-700">JUDUL MILESTONE / TARGET</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Pembukaan Cabang Bandung / Rilis Versi 2.0"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full p-2.5 border-2 border-slate-900 rounded-xl shadow-[2px_2px_0px_0px_#0f172a] focus:outline-none"
                />
              </div>

              {/* Target Date & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-slate-700">TARGET WAKTU</label>
                  <input
                    type="text"
                    placeholder="mis. Q3 2026 atau September 2026"
                    value={formTargetDate}
                    onChange={(e) => setFormTargetDate(e.target.value)}
                    className="w-full p-2.5 border-2 border-slate-900 rounded-xl shadow-[2px_2px_0px_0px_#0f172a] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-slate-700">KATEGORI</label>
                  <select
                    value={formCategory}
                    onChange={(e: any) => setFormCategory(e.target.value)}
                    className="w-full p-2.5 border-2 border-slate-900 rounded-xl shadow-[2px_2px_0px_0px_#0f172a] focus:outline-none bg-white cursor-pointer"
                  >
                    <option value="Peluncuran">Peluncuran</option>
                    <option value="Finansial">Finansial</option>
                    <option value="Produk">Produk</option>
                    <option value="Pemasaran">Pemasaran</option>
                    <option value="Operasional">Operasional</option>
                  </select>
                </div>
              </div>

              {/* Status */}
              <div className="space-y-1">
                <label className="block text-slate-700">STATUS MILESTONE</label>
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                  {[
                    { id: 'Completed', label: '✅ Selesai' },
                    { id: 'In Progress', label: '⏳ Berjalan' },
                    { id: 'Upcoming', label: '🎯 Terencana' },
                  ].map((st) => (
                    <button
                      type="button"
                      key={st.id}
                      onClick={() => setFormStatus(st.id as any)}
                      className={`py-2 rounded-xl border-2 border-slate-900 text-[10px] sm:text-[11px] font-black transition cursor-pointer text-center ${
                        formStatus === st.id
                          ? 'bg-[#fef08a] shadow-[2px_2px_0px_0px_#0f172a]'
                          : 'bg-white hover:bg-slate-50'
                      }`}
                    >
                      {st.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Deskripsi */}
              <div className="space-y-1">
                <label className="block text-slate-700">DESKRIPSI & RINGKASAN STRATEGI</label>
                <textarea
                  rows={3}
                  placeholder="Rincian target, KPI penentu, dan hasil yang diharapkan..."
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full p-2.5 border-2 border-slate-900 rounded-xl shadow-[2px_2px_0px_0px_#0f172a] focus:outline-none"
                />
              </div>

              {/* Submit / Cancel Actions */}
              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 border-2 border-slate-900 rounded-xl text-slate-900 font-extrabold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#dcfce7] hover:bg-[#bbf7d0] border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] rounded-xl text-slate-900 font-black cursor-pointer"
                >
                  Simpan Milestone
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
