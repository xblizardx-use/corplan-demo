import React, { useState } from 'react';
import { 
  X, 
  Building2, 
  PieChart, 
  FileText, 
  ArrowLeft, 
  ArrowRight, 
  Wand2, 
  Gem
} from 'lucide-react';
import { BusinessPlanData, PitchDeckData, Language, ToneStyle } from '../types';

interface PlanGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlanGenerated: (plan: BusinessPlanData, deck?: PitchDeckData) => void;
  language: Language;
  presetData?: {
    name: string;
    industry: string;
    desc: string;
    target: string;
    valueProp: string;
    capital: string;
    price: string;
    varCost: string;
    fixedCost: string;
  } | null;
  toneStyle?: ToneStyle;
}

export const PlanGeneratorModal: React.FC<PlanGeneratorModalProps> = ({
  isOpen,
  onClose,
  onPlanGenerated,
  language,
  presetData,
  toneStyle = 'casual',
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form States
  const [businessName, setBusinessName] = useState(presetData?.name || 'Kopi Seduh Jiwa');
  const [industry, setIndustry] = useState(presetData?.industry || 'F&B (Makanan & Minuman)');
  const [description, setDescription] = useState(
    presetData?.desc || 'Kedai kopi kekinian berbasis Grab & Go menyajikan racikan kopi lokal premium dengan harga terjangkau.'
  );

  const [targetMarket, setTargetMarket] = useState(
    presetData?.target || 'Mahasiswa, pekerja kantoran, dan pengguna aplikasi ojek online usia 18-35 tahun.'
  );
  const [valueProposition, setValueProposition] = useState(
    presetData?.valueProp || 'Resep racikan unik gula aren murni, kemasan ramah lingkungan, dan lokasi strategis dekat kampus.'
  );

  const [initialCapital, setInitialCapital] = useState(presetData?.capital || '45000000');
  const [unitPrice, setUnitPrice] = useState(presetData?.price || '18000');
  const [variableCost, setVariableCost] = useState(presetData?.varCost || '7000');
  const [fixedCost, setFixedCost] = useState(presetData?.fixedCost || '4500000');

  const [selectedFormat, setSelectedFormat] = useState<'bank' | 'pitch' | 'eform'>('eform');

  const [isLoading, setIsLoading] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Quick Presets for Gen-Z & Pemula
  const QUICK_PRESETS = [
    {
      label: '☕ Kopi Kekinian',
      name: 'Seduh Kopi Jiwa',
      ind: 'F&B (Makanan & Minuman)',
      desc: 'Kedai kopi Grab & Go lokal menyajikan es kopi susu aren premium harga terjangkau.',
      target: 'Mahasiswa, pekerja muda, dan penikmat kopi usia 18-30 tahun.',
      valueProp: 'Biji kopi fresh roast lokal, varian rasa inovatif, paket bundling hemat.',
      capital: '45000000',
      price: '18000',
      varCost: '7000',
      fixedCost: '4500000',
    },
    {
      label: '👗 Thrift & Vintage Brand',
      name: 'RetroVibe Fashion',
      ind: 'Retail & Fashion',
      desc: 'Brand fashion kurasi baju vintage thrift pilihan berkondisi mulus & ramah kantong.',
      target: 'Anak muda Gen-Z, pecinta outfit OOTD, dan komunitas fashion berkelanjutan.',
      valueProp: 'Pakaian unik terbatas (one-of-a-kind), steam steril higienis, konten TikTok viral.',
      capital: '25000000',
      price: '85000',
      varCost: '35000',
      fixedCost: '3000000',
    },
    {
      label: '💻 Agensi Konten Sosmed',
      name: 'MediaSpark Creative',
      ind: 'Jasa & Agensi Kreatif',
      desc: 'Jasa kelola Instagram & TikTok lengkap dengan pembuatan video UGC dan strategi visual.',
      target: 'Pemilik UMKM, toko online, dan brand lokal yang butuh branding sosial media.',
      valueProp: 'Tim kreatif muda serba bisa, laporan analitik bulanan, garansi kenaikan followers.',
      capital: '15000000',
      price: '2500000',
      varCost: '500000',
      fixedCost: '3500000',
    },
    {
      label: '🥐 Bakery & Cake Shop',
      name: 'SweetBite Bakery',
      ind: 'F&B (Makanan & Minuman)',
      desc: 'Toko roti & pastry lembut tanpa pengawet dengan konsep hampers & birthday cake custom.',
      target: 'Ibu muda, pekerja kantoran, dan penyelenggara acara ulang tahun/event.',
      valueProp: 'Bahan butter impor premium, desain cake estetik, pengiriman aman same-day.',
      capital: '60000000',
      price: '35000',
      varCost: '14000',
      fixedCost: '5500000',
    },
  ];

  const applyPreset = (preset: typeof QUICK_PRESETS[0]) => {
    setBusinessName(preset.name);
    setIndustry(preset.ind);
    setDescription(preset.desc);
    setTargetMarket(preset.target);
    setValueProposition(preset.valueProp);
    setInitialCapital(preset.capital);
    setUnitPrice(preset.price);
    setVariableCost(preset.varCost);
    setFixedCost(preset.fixedCost);
  };

  const handleAutoFillWithAI = async () => {
    setIsSuggesting('all');
    setErrorMessage(null);
    try {
      const res = await fetch('/api/suggest-field', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fieldType: 'all',
          businessName: businessName || 'Bisnis Baru',
          industry,
          description,
          toneStyle,
        }),
      });
      const data = await res.json();
      if (data.description) setDescription(data.description);
      if (data.targetMarket) setTargetMarket(data.targetMarket);
      if (data.valueProposition) setValueProposition(data.valueProposition);
      if (data.initialCapital) setInitialCapital(String(data.initialCapital));
      if (data.unitPrice) setUnitPrice(String(data.unitPrice));
      if (data.variableCost) setVariableCost(String(data.variableCost));
      if (data.fixedCost) setFixedCost(String(data.fixedCost));
    } catch (e: any) {
      console.error(e);
      setErrorMessage('Gagal meminta saran AI. Silakan coba lagi.');
    } finally {
      setIsSuggesting(null);
    }
  };

  const handleSuggestSingleField = async (fieldType: string) => {
    setIsSuggesting(fieldType);
    setErrorMessage(null);
    try {
      const res = await fetch('/api/suggest-field', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fieldType,
          businessName,
          industry,
          description,
          toneStyle,
        }),
      });
      const data = await res.json();
      if (data.suggestion) {
        if (fieldType === 'description') setDescription(data.suggestion);
        if (fieldType === 'targetMarket') setTargetMarket(data.suggestion);
        if (fieldType === 'valueProposition') setValueProposition(data.suggestion);
      }
    } catch (e: any) {
      console.error(e);
    } finally {
      setIsSuggesting(null);
    }
  };

  React.useEffect(() => {
    if (presetData) {
      if (presetData.name) setBusinessName(presetData.name);
      if (presetData.industry) setIndustry(presetData.industry);
      if (presetData.desc) setDescription(presetData.desc);
      if (presetData.target) setTargetMarket(presetData.target);
      if (presetData.valueProp) setValueProposition(presetData.valueProp);
      if (presetData.capital) setInitialCapital(presetData.capital);
      if (presetData.price) setUnitPrice(presetData.price);
      if (presetData.varCost) setVariableCost(presetData.varCost);
      if (presetData.fixedCost) setFixedCost(presetData.fixedCost);
    }
  }, [presetData]);

  if (!isOpen) return null;

  const handleNextStep = () => {
    if (step === 1 && !businessName.trim()) {
      setErrorMessage('Harap isi Nama Bisnis / Brand.');
      return;
    }
    setErrorMessage(null);
    if (step < 4) setStep((prev) => (prev + 1) as any);
  };

  const handlePrevStep = () => {
    setErrorMessage(null);
    if (step > 1) setStep((prev) => (prev - 1) as any);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const capNum = parseFloat(initialCapital) || 45000000;
      const priceNum = parseFloat(unitPrice) || 18000;
      const varCostNum = parseFloat(variableCost) || 7000;
      const fixedCostNum = parseFloat(fixedCost) || 4500000;

      // Calculate BEP
      const marginPerUnit = priceNum - varCostNum;
      const bepUnits = marginPerUnit > 0 ? Math.ceil(fixedCostNum / marginPerUnit) : 400;

      // 1. Generate Business Plan
      const planRes = await fetch('/api/generate-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName,
          industry,
          description: `${description} Value Proposition: ${valueProposition}`,
          targetMarket,
          businessModel: 'Direct Sales & Retail',
          initialCapital: capNum,
          location: 'Indonesia',
          lang: language,
          toneStyle,
        }),
      });

      const planData = await planRes.json();
      if (!planRes.ok) throw new Error(planData.error || 'Gagal menghasilkan Rencana Bisnis');

      // 2. Format Business Plan Data
      const newPlan: BusinessPlanData = {
        id: `plan-${Date.now()}`,
        businessName: planData.businessName || businessName,
        industry: planData.industry || industry,
        tagline: planData.tagline || valueProposition || 'Inovasi Bisnis Berkelanjutan',
        executiveSummary: planData.executiveSummary || description,
        marketAnalysis: planData.marketAnalysis || {
          industryOverview: 'Industri tumbuh pesat dengan demand konsumen yang tinggi.',
          targetAudience: targetMarket,
          swot: {
            strengths: [valueProposition, 'Variasi produk menarik', 'Lokasi strategis'],
            weaknesses: ['Brand awareness awal masih terbatas', 'Kapasitas operasional tahap awal'],
            opportunities: ['Permintaan tinggi dari target pasar', 'Ekspansi saluran digital'],
            threats: ['Persaingan dengan pemain lama', 'Fluktuasi harga bahan baku'],
          },
          pestel: {
            political: 'Dukungan UMKM',
            economic: 'Daya beli stabil',
            social: 'Gaya hidup modern',
            technological: 'Pemesanan digital',
            environmental: 'Kemasan eco-friendly',
            legal: 'Sertifikasi & perizinan',
          },
          portersFiveForces: {
            competitiveRivalry: 'Sedang',
            threatOfNewEntrants: 'Sedang',
            threatOfSubstitutes: 'Rendah',
            bargainingPowerOfSuppliers: 'Sedang',
            bargainingPowerOfBuyers: 'Sedang',
          },
        },
        marketingAndOperations: planData.marketingAndOperations || {
          marketingStrategy: 'Promosi media sosial, influencer marketing, dan program loyalitas.',
          salesChannels: ['Direct Counter / Store', 'Online Food Delivery App'],
          operationalPlan: 'Standar Operasional Prosedur (SOP) terstruktur.',
          keyMetricsKPIs: [`BEP: ${bepUnits} Unit`, 'Gross Margin %', 'Penjualan Bulanan'],
        },
        financialModel: {
          currency: 'IDR',
          initialCapital: capNum,
          capexItems: [
            { id: '1', item: 'Peralatan Utama & Mesin', cost: Math.round(capNum * 0.5) },
            { id: '2', item: 'Renovasi & Branding Place', cost: Math.round(capNum * 0.3) },
            { id: '3', item: 'Modal Kerja Awal', cost: Math.round(capNum * 0.2) },
          ],
          opexItems: [
            { id: 'o1', item: 'Sewa Tempat & Utilitas', cost: fixedCostNum },
            { id: 'o2', item: 'Gaji Karyawan Operasional', cost: Math.round(fixedCostNum * 1.5) },
          ],
          revenueStreams: [
            { 
              id: 'r1', 
              name: 'Penjualan Produk Utama', 
              pricePerUnit: priceNum, 
              expectedMonthlyVolume: Math.max(bepUnits * 2, 800), 
              cogsPercent: Math.round((varCostNum / priceNum) * 100) 
            },
          ],
          monthlyGrowthRate: 5.0,
          taxRate: 0.5,
          financialSummaryNotes: `Estimasi BEP tercapai pada volume ${bepUnits} unit/bulan dengan gross margin menguntungkan.`,
        },
        riskManagement: [
          { id: 'r1', risk: 'Risiko Lonjakan Biaya Variabel', impact: 'Sedang', mitigation: 'Membuat kontrak pasokan jangka panjang dengan vendor utama.' },
          { id: 'r2', risk: 'Penetrasi Pasar Lambat', impact: 'Tinggi', mitigation: 'Gunakan strategi promosi agresif pada 2 bulan pertama.' },
        ],
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
      };

      // 3. Pitch Deck
      let newDeck: PitchDeckData | undefined;
      try {
        const deckRes = await fetch('/api/generate-pitchdeck', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            businessName,
            problem: description,
            solution: valueProposition,
            marketSize: targetMarket,
            askAmount: capNum,
            lang: language,
          }),
        });

        if (deckRes.ok) {
          const deckData = await deckRes.json();
          if (deckData.slides) {
            newDeck = {
              id: `deck-${Date.now()}`,
              businessName: planData.businessName || businessName,
              tagline: planData.tagline || valueProposition || 'Investor Presentation',
              targetAsk: capNum,
              currency: 'IDR',
              slides: deckData.slides.map((s: any, idx: number) => ({
                id: `s-${idx}`,
                slideNumber: s.slideNumber || idx + 1,
                title: s.title || `Slide ${idx + 1}`,
                headline: s.headline || '',
                bullets: s.bullets || [],
                presenterNotes: s.presenterNotes || '',
              })),
            };
          }
        }
      } catch (deckErr) {
        console.warn('Pitch deck fallback handled:', deckErr);
      }

      onPlanGenerated(newPlan, newDeck);
      onClose();
    } catch (err: any) {
      console.error('Error generating plan:', err);
      setErrorMessage(err.message || 'Gagal merancang proposal. Pastikan koneksi atau API Key Anda aktif.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border-2 border-slate-900 rounded-3xl w-full max-w-xl p-6 sm:p-8 shadow-[8px_8px_0px_0px_#0f172a] relative my-6 text-slate-900 animate-fadeIn">
        
        {/* Close Modal Button */}
        <button
          onClick={onClose}
          disabled={isLoading}
          className="absolute right-4 top-4 p-2 text-slate-900 rounded-xl bg-slate-100 hover:bg-slate-200 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {isLoading ? (
          /* Loading Animation View matching video 00:18 */
          <div className="py-12 px-4 text-center space-y-6">
            <div className="inline-block bg-[#bfdbfe] border-2 border-slate-900 p-5 rounded-2xl shadow-[4px_4px_0px_0px_#0f172a] animate-bounce">
              <Gem className="w-12 h-12 text-slate-900" />
            </div>

            <div className="inline-block bg-[#fef08a] border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] px-5 py-2 rounded-xl">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">Menyusun Plan...</h2>
            </div>

            <p className="text-xs sm:text-sm font-semibold text-slate-600 max-w-md mx-auto leading-relaxed">
              AI sedang menganalisis industri, melakukan perhitungan BEP, proyeksi finansial, dan merancang laporan.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            
            {/* Step Progress Indicator Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-slate-700">
                <span>
                  {step === 1 && 'LANGKAH 1 DARI 4: Konsep Bisnis'}
                  {step === 2 && 'LANGKAH 2 DARI 4: Target Pasar'}
                  {step === 3 && 'LANGKAH 3 DARI 4: Proyeksi Finansial'}
                  {step === 4 && 'LANGKAH 4 DARI 4: Target Output'}
                </span>
                <span>{step * 25}%</span>
              </div>
              <div className="w-full bg-slate-100 border-2 border-slate-900 rounded-full h-3 overflow-hidden shadow-[1px_1px_0px_0px_#0f172a]">
                <div 
                  className="bg-emerald-400 h-full transition-all duration-300" 
                  style={{ width: `${step * 25}%` }}
                />
              </div>
            </div>

            {/* Error Banner */}
            {errorMessage && (
              <div className="bg-rose-100 border-2 border-slate-900 text-rose-900 text-xs font-bold p-3 rounded-xl shadow-[2px_2px_0px_0px_#0f172a]">
                {errorMessage}
              </div>
            )}

            {/* STEP 1: Identitas & Konsep Bisnis */}
            {step === 1 && (
              <div className="space-y-5 animate-fadeIn">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="bg-[#fef08a] border-2 border-slate-900 rounded-xl w-10 h-10 font-black text-lg shadow-[2px_2px_0px_0px_#0f172a] flex items-center justify-center text-slate-900 shrink-0">
                      1
                    </div>
                    <h2 className="text-xl font-black text-slate-900">
                      Identitas & Konsep Bisnis
                    </h2>
                  </div>

                  {/* AI Auto-Fill Helper Button */}
                  <button
                    type="button"
                    onClick={handleAutoFillWithAI}
                    disabled={isSuggesting !== null}
                    className="bg-[#dcfce7] hover:bg-[#bbf7d0] border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] active:translate-x-0.5 active:translate-y-0.5 rounded-xl px-3 py-1.5 font-black text-xs text-slate-900 flex items-center gap-1.5 cursor-pointer transition"
                  >
                    <Wand2 className="w-3.5 h-3.5 text-slate-900" />
                    <span>{isSuggesting === 'all' ? 'Menyusun...' : '✨ Auto-Isi Semua via AI'}</span>
                  </button>
                </div>

                {/* Quick Presets Section */}
                <div className="bg-amber-50/70 border-2 border-slate-900 rounded-2xl p-3 shadow-[2px_2px_0px_0px_#0f172a] space-y-1.5">
                  <span className="text-[11px] font-black uppercase text-slate-700 tracking-wider block">
                    ⚡ ATAU PILIH DRAF BISNIS POPULER (1-KLIK)
                  </span>
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {QUICK_PRESETS.map((p, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => applyPreset(p)}
                        className="bg-white hover:bg-slate-100 border border-slate-900 px-2.5 py-1 rounded-xl text-xs font-bold text-slate-900 shrink-0 shadow-[1px_1px_0px_0px_#0f172a] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer transition"
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-extrabold text-slate-900 mb-1">
                      Nama Bisnis / Brand *
                    </label>
                    <input
                      type="text"
                      required
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="Contoh: Kopi Seduh Jiwa"
                      className="w-full bg-white border-2 border-slate-900 text-slate-900 text-sm font-semibold px-4 py-3 rounded-xl focus:outline-none focus:bg-amber-50/40 shadow-[2px_2px_0px_0px_#0f172a]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-900 mb-1">
                      Kategori / Industri *
                    </label>
                    <select
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      className="w-full bg-white border-2 border-slate-900 text-slate-900 text-sm font-semibold px-4 py-3 rounded-xl focus:outline-none focus:bg-amber-50/40 shadow-[2px_2px_0px_0px_#0f172a] cursor-pointer"
                    >
                      <option value="F&B (Makanan & Minuman)">F&B (Makanan & Minuman)</option>
                      <option value="SaaS & Teknologi B2B">SaaS & Teknologi B2B</option>
                      <option value="Retail & Fashion">Retail & Fashion</option>
                      <option value="Pendidikan & EdTech">Pendidikan & EdTech</option>
                      <option value="Kesehatan & Wellness">Kesehatan & Wellness</option>
                      <option value="Jasa & Agensi Kreatif">Jasa & Agensi Kreatif</option>
                    </select>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-extrabold text-slate-900">
                        Ide Bisnis Singkat (1-2 Kalimat) *
                      </label>
                      <button
                        type="button"
                        onClick={() => handleSuggestSingleField('description')}
                        disabled={isSuggesting !== null}
                        className="text-[11px] font-black text-slate-900 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Wand2 className="w-3 h-3 text-amber-500" />
                        <span>Saran AI</span>
                      </button>
                    </div>
                    <textarea
                      required
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Kedai kopi kekinian berbasis Grab & Go menyajikan racikan kopi lokal..."
                      className="w-full bg-white border-2 border-slate-900 text-slate-900 text-xs font-medium p-3 rounded-xl focus:outline-none focus:bg-amber-50/40 shadow-[2px_2px_0px_0px_#0f172a]"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="bg-[#d8b4fe] hover:bg-[#c084fc] border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] active:translate-x-0.5 active:translate-y-0.5 rounded-xl px-6 py-2.5 font-extrabold text-xs text-slate-900 flex items-center gap-2 cursor-pointer transition"
                  >
                    <span>Lanjut</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Target Pasar & Kompetisi */}
            {step === 2 && (
              <div className="space-y-5 animate-fadeIn">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="bg-[#fef08a] border-2 border-slate-900 rounded-xl w-10 h-10 font-black text-lg shadow-[2px_2px_0px_0px_#0f172a] flex items-center justify-center text-slate-900 shrink-0">
                      2
                    </div>
                    <h2 className="text-xl font-black text-slate-900">
                      Target Pasar & Keunggulan
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={handleAutoFillWithAI}
                    disabled={isSuggesting !== null}
                    className="bg-[#dcfce7] hover:bg-[#bbf7d0] border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] active:translate-x-0.5 active:translate-y-0.5 rounded-xl px-3 py-1.5 font-black text-xs text-slate-900 flex items-center gap-1.5 cursor-pointer transition"
                  >
                    <Wand2 className="w-3.5 h-3.5 text-slate-900" />
                    <span>{isSuggesting === 'all' ? 'Menyusun...' : '✨ AI Rekomendasi Pasar'}</span>
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-extrabold text-slate-900">
                        Target Pasar (Siapa Pembelinya?) *
                      </label>
                      <button
                        type="button"
                        onClick={() => handleSuggestSingleField('targetMarket')}
                        className="text-[11px] font-black text-slate-900 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Wand2 className="w-3 h-3 text-amber-500" />
                        <span>Saran AI</span>
                      </button>
                    </div>
                    <textarea
                      rows={2}
                      value={targetMarket}
                      onChange={(e) => setTargetMarket(e.target.value)}
                      placeholder="Mahasiswa, pekerja kantoran, dan pengguna aplikasi ojek online usia 18-35 tahun..."
                      className="w-full bg-white border-2 border-slate-900 text-slate-900 text-xs font-medium p-3 rounded-xl focus:outline-none focus:bg-amber-50/40 shadow-[2px_2px_0px_0px_#0f172a]"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-extrabold text-slate-900">
                        Keunggulan Utama / Unik (Value Proposition) *
                      </label>
                      <button
                        type="button"
                        onClick={() => handleSuggestSingleField('valueProposition')}
                        className="text-[11px] font-black text-slate-900 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Wand2 className="w-3 h-3 text-amber-500" />
                        <span>Saran AI</span>
                      </button>
                    </div>
                    <textarea
                      rows={3}
                      value={valueProposition}
                      onChange={(e) => setValueProposition(e.target.value)}
                      placeholder="Resep racikan unik gula aren murni, kemasan ramah lingkungan, dan lokasi strategis dekat kampus..."
                      className="w-full bg-white border-2 border-slate-900 text-slate-900 text-xs font-medium p-3 rounded-xl focus:outline-none focus:bg-amber-50/40 shadow-[2px_2px_0px_0px_#0f172a]"
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="bg-white hover:bg-slate-100 border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] active:translate-x-0.5 active:translate-y-0.5 rounded-xl px-6 py-2.5 font-extrabold text-xs text-slate-900 flex items-center gap-2 cursor-pointer transition"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Kembali</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="bg-[#d8b4fe] hover:bg-[#c084fc] border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] active:translate-x-0.5 active:translate-y-0.5 rounded-xl px-6 py-2.5 font-extrabold text-xs text-slate-900 flex items-center gap-2 cursor-pointer transition"
                  >
                    <span>Lanjut</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Proyeksi Dasar Keuangan */}
            {step === 3 && (
              <div className="space-y-5 animate-fadeIn">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="bg-[#fef08a] border-2 border-slate-900 rounded-xl w-10 h-10 font-black text-lg shadow-[2px_2px_0px_0px_#0f172a] flex items-center justify-center text-slate-900 shrink-0">
                      3
                    </div>
                    <h2 className="text-xl font-black text-slate-900">
                      Proyeksi Finansial Ringkas
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={handleAutoFillWithAI}
                    disabled={isSuggesting !== null}
                    className="bg-[#dcfce7] hover:bg-[#bbf7d0] border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] active:translate-x-0.5 active:translate-y-0.5 rounded-xl px-3 py-1.5 font-black text-xs text-slate-900 flex items-center gap-1.5 cursor-pointer transition"
                  >
                    <Wand2 className="w-3.5 h-3.5 text-slate-900" />
                    <span>{isSuggesting === 'all' ? 'Menghitung...' : '✨ Estimasi Angka Otomatis AI'}</span>
                  </button>
                </div>

                <div className="bg-slate-50 border-2 border-slate-900 rounded-2xl p-3 shadow-[2px_2px_0px_0px_#0f172a] text-xs font-semibold text-slate-700">
                  💡 <span className="font-bold text-slate-900">Tips Pemula:</span> Angka di bawah adalah estimasi acuan awal. AI akan menghitung ulang Break-Even Point (BEP) dan Laba-Rugi secara otomatis!
                </div>

                <div className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-extrabold text-slate-900 mb-0.5">
                      1. Modal Awal / Total Investasi (Rp) *
                    </label>
                    <p className="text-[11px] font-semibold text-slate-500 mb-1">
                      (Biaya beli alat, tempat, renovasi, dan kas pegangan awal)
                    </p>
                    <input
                      type="number"
                      value={initialCapital}
                      onChange={(e) => setInitialCapital(e.target.value)}
                      className="w-full bg-white border-2 border-slate-900 text-slate-900 text-sm font-semibold px-4 py-2.5 rounded-xl focus:outline-none shadow-[2px_2px_0px_0px_#0f172a]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-extrabold text-slate-900 mb-0.5">
                        2. Harga Jual / Porsi (Rp) *
                      </label>
                      <p className="text-[11px] font-semibold text-slate-500 mb-1">
                        (Harga per unit/porsi produk)
                      </p>
                      <input
                        type="number"
                        value={unitPrice}
                        onChange={(e) => setUnitPrice(e.target.value)}
                        className="w-full bg-white border-2 border-slate-900 text-slate-900 text-sm font-semibold px-4 py-2.5 rounded-xl focus:outline-none shadow-[2px_2px_0px_0px_#0f172a]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-slate-900 mb-0.5">
                        3. Modal Bahan / Porsi (Rp) *
                      </label>
                      <p className="text-[11px] font-semibold text-slate-500 mb-1">
                        (Biaya bahan baku per unit/porsi)
                      </p>
                      <input
                        type="number"
                        value={variableCost}
                        onChange={(e) => setVariableCost(e.target.value)}
                        className="w-full bg-white border-2 border-slate-900 text-slate-900 text-sm font-semibold px-4 py-2.5 rounded-xl focus:outline-none shadow-[2px_2px_0px_0px_#0f172a]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-900 mb-0.5">
                      4. Biaya Operasional Tetap / Bulan (Rp) *
                    </label>
                    <p className="text-[11px] font-semibold text-slate-500 mb-1">
                      (Sewa tempat, sewa WiFi, gaji pokok, dan tagihan listrik)
                    </p>
                    <input
                      type="number"
                      value={fixedCost}
                      onChange={(e) => setFixedCost(e.target.value)}
                      className="w-full bg-white border-2 border-slate-900 text-slate-900 text-sm font-semibold px-4 py-2.5 rounded-xl focus:outline-none shadow-[2px_2px_0px_0px_#0f172a]"
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="bg-white hover:bg-slate-100 border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] active:translate-x-0.5 active:translate-y-0.5 rounded-xl px-6 py-2.5 font-extrabold text-xs text-slate-900 flex items-center gap-2 cursor-pointer transition"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Kembali</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="bg-[#d8b4fe] hover:bg-[#c084fc] border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] active:translate-x-0.5 active:translate-y-0.5 rounded-xl px-6 py-2.5 font-extrabold text-xs text-slate-900 flex items-center gap-2 cursor-pointer transition"
                  >
                    <span>Lanjut</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Target Format Proposal */}
            {step === 4 && (
              <div className="space-y-5 animate-fadeIn">
                <div className="flex items-center gap-3">
                  <div className="bg-[#fef08a] border-2 border-slate-900 rounded-xl w-10 h-10 font-black text-lg shadow-[2px_2px_0px_0px_#0f172a] flex items-center justify-center text-slate-900 shrink-0">
                    4
                  </div>
                  <h2 className="text-xl font-black text-slate-900">
                    Target Format Proposal
                  </h2>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-900 mb-3">
                    Pilih Format Utama Dokumen *
                  </label>

                  <div className="space-y-3">
                    {/* Format Option 1: Bank & Kredit */}
                    <button
                      type="button"
                      onClick={() => setSelectedFormat('bank')}
                      className={`w-full border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] rounded-2xl p-4 flex items-center justify-center gap-3 transition cursor-pointer text-slate-900 font-extrabold ${
                        selectedFormat === 'bank' ? 'bg-[#bfdbfe]' : 'bg-white hover:bg-slate-50'
                      }`}
                    >
                      <Building2 className="w-5 h-5" />
                      <span>🏛️ Bank & Kredit</span>
                    </button>

                    {/* Format Option 2: Pitch Deck */}
                    <button
                      type="button"
                      onClick={() => setSelectedFormat('pitch')}
                      className={`w-full border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] rounded-2xl p-4 flex items-center justify-center gap-3 transition cursor-pointer text-slate-900 font-extrabold ${
                        selectedFormat === 'pitch' ? 'bg-[#fef08a]' : 'bg-white hover:bg-slate-50'
                      }`}
                    >
                      <PieChart className="w-5 h-5" />
                      <span>🎯 Pitch Deck</span>
                    </button>

                    {/* Format Option 3: E-Form Ready */}
                    <button
                      type="button"
                      onClick={() => setSelectedFormat('eform')}
                      className={`w-full border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] rounded-2xl p-4 flex items-center justify-center gap-3 transition cursor-pointer text-slate-900 font-extrabold ${
                        selectedFormat === 'eform' ? 'bg-[#dcfce7]' : 'bg-white hover:bg-slate-50'
                      }`}
                    >
                      <FileText className="w-5 h-5" />
                      <span>📝 E-Form Ready</span>
                    </button>
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="bg-white hover:bg-slate-100 border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] active:translate-x-0.5 active:translate-y-0.5 rounded-xl px-5 py-3 font-extrabold text-xs text-slate-900 flex items-center gap-2 cursor-pointer transition"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Kembali</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSubmit()}
                    className="bg-[#dcfce7] hover:bg-[#bbf7d0] border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a] active:translate-x-0.5 active:translate-y-0.5 rounded-2xl px-7 py-3 font-black text-sm text-slate-900 flex items-center justify-center gap-2 cursor-pointer transition"
                  >
                    <Wand2 className="w-4 h-4 text-slate-900" />
                    <span>Generate Plan</span>
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
