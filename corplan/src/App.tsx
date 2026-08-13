import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from './components/Header';
import { NavigationTabs, TabType } from './components/NavigationTabs';
import { HeroBanner } from './components/HeroBanner';
import { TrendverseArtwork } from './components/TrendverseArtwork';
import { MarketInsightPanel } from './components/MarketInsightPanel';
import { BusinessPlanView } from './components/BusinessPlanView';
import { EFormView } from './components/EFormView';
import { FinancialCalculatorView } from './components/FinancialCalculatorView';
import { PitchDeckView } from './components/PitchDeckView';
import { SwotRiskMatrixView } from './components/SwotRiskMatrixView';
import { CompetitorAnalysisView } from './components/CompetitorAnalysisView';
import { AIChatConsultant } from './components/AIChatConsultant';
import { PlanGeneratorModal } from './components/PlanGeneratorModal';
import { ExportModal } from './components/ExportModal';
import { ApiKeyModal } from './components/ApiKeyModal';
import { FeaturesCatalogModal } from './components/FeaturesCatalogModal';
import { SystemBlueprintModal } from './components/SystemBlueprintModal';
import { QuickScrollWidget } from './components/QuickScrollWidget';
import { InsightToast } from './components/InsightToast';
import { SAMPLE_BUSINESS_PLANS, SAMPLE_PITCH_DECKS } from './data/samplePlans';
import { BusinessPlanData, PitchDeckData, Language, Currency, ToneStyle } from './types';

export default function App() {
  const [plans, setPlans] = useState<BusinessPlanData[]>(SAMPLE_BUSINESS_PLANS);
  const [pitchDecks, setPitchDecks] = useState<PitchDeckData[]>(SAMPLE_PITCH_DECKS);
  
  const [currentPlan, setCurrentPlan] = useState<BusinessPlanData>(SAMPLE_BUSINESS_PLANS[0]);
  const [currentDeck, setCurrentDeck] = useState<PitchDeckData | undefined>(SAMPLE_PITCH_DECKS[0]);
  
  const [activeTab, setActiveTab] = useState<TabType>('plan');
  const [language, setLanguage] = useState<Language>('id');
  const [currency, setCurrency] = useState<Currency>('IDR');
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving'>('saved');

  // Tone Style State (Professional/Formal, Conversational/Casual, Simple/Beginner)
  const [toneStyle, setToneStyle] = useState<ToneStyle>(() => {
    return (localStorage.getItem('corplan_tone_style') as ToneStyle) || 'casual';
  });

  const handleSaveToneStyle = (newTone: ToneStyle) => {
    setToneStyle(newTone);
    localStorage.setItem('corplan_tone_style', newTone);
  };

  // Theme State
  const [theme, setTheme] = useState<'warm-luxe' | 'dark-obsidian'>('warm-luxe');

  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [isFeaturesCatalogOpen, setIsFeaturesCatalogOpen] = useState(false);
  const [isBlueprintOpen, setIsBlueprintOpen] = useState(false);
  const [apiKey, setApiKey] = useState('');

  const [isEditMode, setIsEditMode] = useState(false);
  const [presetConfig, setPresetConfig] = useState<any>(null);

  // Toggle theme
  const toggleTheme = () => {
    setTheme(prev => prev === 'warm-luxe' ? 'dark-obsidian' : 'warm-luxe');
  };

  // Handle plan select
  const handleSelectPlan = (plan: BusinessPlanData) => {
    setCurrentPlan(plan);
    const matchedDeck = pitchDecks.find(d => d.planId === plan.id || d.id.includes(plan.id));
    setCurrentDeck(matchedDeck || pitchDecks[0]);
  };

  // Update plan in state
  const handleUpdatePlan = (updatedPlan: BusinessPlanData) => {
    setSaveStatus('saving');
    setCurrentPlan(updatedPlan);
    setPlans(prev => prev.map(p => p.id === updatedPlan.id ? updatedPlan : p));
    setTimeout(() => setSaveStatus('saved'), 600);
  };

  // Update pitch deck in state
  const handleUpdateDeck = (updatedDeck: PitchDeckData) => {
    setSaveStatus('saving');
    setCurrentDeck(updatedDeck);
    setPitchDecks(prev => prev.map(d => d.id === updatedDeck.id ? updatedDeck : d));
    setTimeout(() => setSaveStatus('saved'), 600);
  };

  // Add generated new plan
  const handlePlanGenerated = (newPlan: BusinessPlanData, newDeck?: PitchDeckData) => {
    setPlans(prev => [newPlan, ...prev]);
    setCurrentPlan(newPlan);
    if (newDeck) {
      setPitchDecks(prev => [newDeck, ...prev]);
      setCurrentDeck(newDeck);
    }
    setActiveTab('plan');
  };

  // Preset Selection Handler matching video reference
  const handleSelectPreset = (presetType: 'kopi' | 'saas' | 'fashion') => {
    if (presetType === 'kopi') {
      setPresetConfig({
        name: 'Kopi Seduh Jiwa',
        industry: 'F&B (Makanan & Minuman)',
        desc: 'Kedai kopi kekinian berbasis Grab & Go menyajikan racikan kopi lokal premium dengan harga terjangkau.',
        target: 'Mahasiswa, pekerja kantoran, dan pengguna aplikasi ojek online usia 18-35 tahun.',
        valueProp: 'Resep racikan unik gula aren murni, kemasan ramah lingkungan, dan lokasi strategis dekat kampus.',
        capital: '45000000',
        price: '18000',
        varCost: '7000',
        fixedCost: '4500000',
      });
    } else if (presetType === 'saas') {
      setPresetConfig({
        name: 'CloudScale AI',
        industry: 'SaaS & Teknologi B2B',
        desc: 'Platform otomatisasi workflow AI dan manajemen tugas cerdas untuk efisiensi tim B2B.',
        target: 'Perusahaan Startup, Agensi Digital, dan Tim Enterprise skala menengah.',
        valueProp: 'Integrasi sistem kilat, perlindungan data terenkripsi, dan analitik produktivitas real-time.',
        capital: '120000000',
        price: '250000',
        varCost: '25000',
        fixedCost: '15000000',
      });
    } else {
      setPresetConfig({
        name: 'EcoThrift Apparel',
        industry: 'Retail & Fashion',
        desc: 'Brand pakaian kasual berbahan kain daur ulang katun organik ramah lingkungan.',
        target: 'Gen-Z & Milenial peduli lingkungan, pencinta fashion berkelanjutan.',
        valueProp: 'Zero-waste production, desain kekinian, dan transparansi jejak karbon produk.',
        capital: '85000000',
        price: '149000',
        varCost: '45000',
        fixedCost: '8000000',
      });
    }
    setIsGeneratorOpen(true);
  };

  // Handle language change
  const handleSelectLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  // Handle currency change
  const handleSelectCurrency = (curr: Currency) => {
    setCurrency(curr);
    const updatedPlan = {
      ...currentPlan,
      financialModel: {
        ...currentPlan.financialModel,
        currency: curr,
      }
    };
    handleUpdatePlan(updatedPlan);
  };

  // Handle Export format option
  const handleExportFormatOption = (fmt: 'md' | 'json' | 'txt' | 'copy') => {
    if (fmt === 'copy') {
      const copyText = `
NAMA USAHA: ${currentPlan.businessName}
RINGKASAN IDE: ${currentPlan.executiveSummary}
TARGET PASAR: ${currentPlan.marketAnalysis.targetAudience}
DATA FINANSIAL: Total Investasi ${currentPlan.financialModel.currency} ${currentPlan.financialModel.initialCapital}
      `.trim();
      navigator.clipboard.writeText(copyText);
    } else {
      setIsExportOpen(true);
    }
  };

  const isDark = theme === 'dark-obsidian';

  React.useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className={`min-h-screen font-sans selection:bg-[#fef08a] selection:text-slate-900 relative overflow-x-hidden transition-colors duration-300 ${
      isDark ? 'dark bg-[#080b12] text-slate-200' : 'bg-[#fbf9f4] text-slate-900'
    }`}>
      
      {/* Background Canvas Artwork */}
      <TrendverseArtwork theme={theme} />

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <Header
          currentPlan={currentPlan}
          plansList={plans}
          onSelectPlan={handleSelectPlan}
          onNewPlanClick={() => {
            setPresetConfig(null);
            setIsGeneratorOpen(true);
          }}
          onExportClick={() => setIsExportOpen(true)}
          language={language}
          onSelectLanguage={handleSelectLanguage}
          currency={currency}
          onSelectCurrency={handleSelectCurrency}
          theme={theme}
          onToggleTheme={toggleTheme}
          onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
          onOpenFeaturesCatalog={() => setIsFeaturesCatalogOpen(true)}
          onOpenBlueprint={() => setIsBlueprintOpen(true)}
          toneStyle={toneStyle}
          saveStatus={saveStatus}
        />

        {/* Hero Welcome Banner */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6">
          <HeroBanner 
            onStartExploring={() => {
              const el = document.getElementById('workspace-tabs');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            onNewPlanClick={() => {
              setPresetConfig(null);
              setIsGeneratorOpen(true);
            }}
            onSelectPreset={handleSelectPreset}
            language={language}
            theme={theme}
          />

          {/* Live Google Market Insight Panel */}
          <MarketInsightPanel
            businessName={currentPlan.businessName}
            industry={currentPlan.industry}
            initialData={currentPlan.googleTraffic}
            currency={currency}
            theme={theme}
          />

          {/* Navigation Toolbar */}
          <div id="workspace-tabs">
            <NavigationTabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
              language={language}
              theme={theme}
              onPrintPDF={() => window.print()}
              onExportFormat={handleExportFormatOption}
              isEditMode={isEditMode}
              onToggleEditMode={() => setIsEditMode(!isEditMode)}
            />
          </div>

          {/* Animated Tab Views */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              {activeTab === 'plan' && (
                <BusinessPlanView
                  plan={currentPlan}
                  onUpdatePlan={handleUpdatePlan}
                  language={language}
                  theme={theme}
                  isEditMode={isEditMode}
                />
              )}

              {activeTab === 'eform' && (
                <EFormView plan={currentPlan} />
              )}

              {activeTab === 'pitch' && currentDeck && (
                <PitchDeckView
                  pitchDeck={currentDeck}
                  onUpdateDeck={handleUpdateDeck}
                  language={language}
                  theme={theme}
                  isEditMode={isEditMode}
                />
              )}

              {activeTab === 'financials' && (
                <FinancialCalculatorView
                  financialModel={currentPlan.financialModel}
                  businessName={currentPlan.businessName}
                  industry={currentPlan.industry}
                  plan={currentPlan}
                  onUpdateFinancials={(updatedModel) => {
                    handleUpdatePlan({
                      ...currentPlan,
                      financialModel: updatedModel,
                    });
                  }}
                  language={language}
                  theme={theme}
                />
              )}

              {activeTab === 'matrix' && (
                <SwotRiskMatrixView
                  plan={currentPlan}
                  onUpdatePlan={handleUpdatePlan}
                  language={language}
                  theme={theme}
                />
              )}

              {activeTab === 'competitors' && (
                <CompetitorAnalysisView
                  plan={currentPlan}
                  onUpdatePlan={handleUpdatePlan}
                  language={language}
                  theme={theme}
                />
              )}

              {activeTab === 'chat' && (
                <AIChatConsultant
                  businessName={currentPlan.businessName}
                  industry={currentPlan.industry}
                  language={language}
                  theme={theme}
                  toneStyle={toneStyle}
                />
              )}
            </motion.div>
          </AnimatePresence>

        </main>

        {/* Footer */}
        <footer className="border-t-2 border-slate-900 bg-white/80 py-6 text-center text-xs font-bold text-slate-900 mt-auto">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span>CorPlan &copy; 2026. Business Plan Generator.</span>
            <div className="flex items-center gap-3">
              <span className="bg-[#fef08a] border-2 border-slate-900 px-2.5 py-0.5 rounded-lg shadow-[1px_1px_0px_0px_#0f172a]">
                Neo-Brutalist Edition
              </span>
              <span>•</span>
              <span>Google Gemini AI</span>
            </div>
          </div>
        </footer>
      </div>

      {/* AI Plan Generator Modal */}
      {isGeneratorOpen && (
        <PlanGeneratorModal
          isOpen={isGeneratorOpen}
          onClose={() => setIsGeneratorOpen(false)}
          onPlanGenerated={handlePlanGenerated}
          language={language}
          presetData={presetConfig}
          toneStyle={toneStyle}
        />
      )}

      {/* Set API Key & Tone Settings Modal */}
      {isApiKeyModalOpen && (
        <ApiKeyModal
          isOpen={isApiKeyModalOpen}
          onClose={() => setIsApiKeyModalOpen(false)}
          apiKey={apiKey}
          onSaveApiKey={(key) => setApiKey(key)}
          toneStyle={toneStyle}
          onSaveToneStyle={handleSaveToneStyle}
        />
      )}

      {/* Export Document Modal */}
      {isExportOpen && (
        <ExportModal
          isOpen={isExportOpen}
          onClose={() => setIsExportOpen(false)}
          plan={currentPlan}
          pitchDeck={currentDeck}
          language={language}
        />
      )}

      {/* Features Catalog Directory Modal */}
      <FeaturesCatalogModal
        isOpen={isFeaturesCatalogOpen}
        onClose={() => setIsFeaturesCatalogOpen(false)}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          const el = document.getElementById('workspace-tabs');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenExport={() => setIsExportOpen(true)}
        onOpenGenerator={() => {
          setPresetConfig(null);
          setIsGeneratorOpen(true);
        }}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        onOpenBlueprint={() => setIsBlueprintOpen(true)}
        theme={theme}
      />

      {/* System Proposal Blueprint Modal */}
      <SystemBlueprintModal
        isOpen={isBlueprintOpen}
        onClose={() => setIsBlueprintOpen(false)}
        theme={theme}
      />

      {/* Quick Floating Scroll Widget (Ke Atas & Ke Bawah) */}
      <QuickScrollWidget theme={theme} />

      {/* AI Proactive Risk & Growth Insight Toast Notification */}
      <InsightToast
        plan={currentPlan}
        onNavigateTab={(tabId) => setActiveTab(tabId as TabType)}
        theme={theme}
      />

    </div>
  );
}
