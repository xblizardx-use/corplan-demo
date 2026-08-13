import React, { useState } from 'react';
import { 
  Building2, 
  PieChart, 
  FileText, 
  Calculator, 
  ShieldAlert, 
  MessageSquare,
  Swords,
  Printer,
  Download,
  Check,
  Copy,
  Edit3
} from 'lucide-react';
import { Language } from '../types';

export type TabType = 'plan' | 'pitch' | 'eform' | 'financials' | 'matrix' | 'competitors' | 'chat';

interface NavigationTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  language: Language;
  theme?: 'warm-luxe' | 'dark-obsidian';
  onPrintPDF?: () => void;
  onExportFormat?: (format: 'md' | 'json' | 'txt' | 'copy') => void;
  isEditMode?: boolean;
  onToggleEditMode?: () => void;
}

export const NavigationTabs: React.FC<NavigationTabsProps> = ({
  activeTab,
  onTabChange,
  language,
  theme = 'warm-luxe',
  onPrintPDF,
  onExportFormat,
  isEditMode = false,
  onToggleEditMode,
}) => {
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [copiedSuccess, setCopiedSuccess] = useState(false);

  const tabs = [
    {
      id: 'plan' as TabType,
      label: 'Proposal Bank',
      icon: Building2,
      activeBg: 'bg-[#bfdbfe]',
    },
    {
      id: 'pitch' as TabType,
      label: 'Pitch Deck',
      icon: PieChart,
      activeBg: 'bg-[#fef08a]',
    },
    {
      id: 'competitors' as TabType,
      label: 'Matriks Pesaing',
      icon: Swords,
      activeBg: 'bg-[#fed7aa]',
    },
    {
      id: 'eform' as TabType,
      label: 'E-Form',
      icon: FileText,
      activeBg: 'bg-[#dcfce7]',
    },
    {
      id: 'financials' as TabType,
      label: 'Keuangan',
      icon: Calculator,
      activeBg: 'bg-[#f5d0fe]',
    },
    {
      id: 'matrix' as TabType,
      label: 'SWOT & Risiko',
      icon: ShieldAlert,
      activeBg: 'bg-[#fbcfe8]',
    },
    {
      id: 'chat' as TabType,
      label: 'AI Chat',
      icon: MessageSquare,
      activeBg: 'bg-[#bae6fd]',
    },
  ];

  const handleExportOption = (fmt: 'md' | 'json' | 'txt' | 'copy') => {
    if (onExportFormat) onExportFormat(fmt);
    if (fmt === 'copy') {
      setCopiedSuccess(true);
      setTimeout(() => setCopiedSuccess(false), 1500);
    }
    setIsDownloadOpen(false);
  };

  return (
    <div className="sticky top-16 sm:top-20 z-30 py-3 bg-[#fbf9f4]/90 dark:bg-[#080b12]/90 backdrop-blur-md border-b-2 border-slate-900 dark:border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-3">
        
        {/* Navigation Tabs List */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none max-w-full">
          
          {/* Toggle Edit Button matching reference 00:19 */}
          {onToggleEditMode && (
            <button
              onClick={onToggleEditMode}
              className={`border-2 border-slate-900 shadow-[2.5px_2.5px_0px_0px_#0f172a] rounded-xl font-extrabold px-3 py-2 text-xs transition flex items-center gap-1.5 cursor-pointer shrink-0 ${
                isEditMode ? 'bg-[#fef08a] text-slate-900' : 'bg-white hover:bg-slate-100 text-slate-900'
              }`}
              title="Mode Edit Dokumen"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
          )}

          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`border-2 border-slate-900 shadow-[2.5px_2.5px_0px_0px_#0f172a] active:translate-x-0.5 active:translate-y-0.5 rounded-xl font-extrabold px-3.5 py-2 text-xs text-slate-900 transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
                  isActive ? tab.activeBg : 'bg-white hover:bg-slate-100'
                }`}
              >
                <Icon className="w-3.5 h-3.5 text-slate-900" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Action Toolbar Buttons: Cetak PDF & Unduh Dropdown matching reference 00:20 */}
        <div className="flex items-center gap-2 shrink-0">
          
          {/* Cetak PDF Button */}
          {onPrintPDF && (
            <button
              onClick={onPrintPDF}
              className="bg-[#fef08a] hover:bg-[#fde047] border-2 border-slate-900 shadow-[2.5px_2.5px_0px_0px_#0f172a] active:translate-x-0.5 active:translate-y-0.5 rounded-xl font-extrabold px-3.5 py-2 text-xs text-slate-900 transition flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-slate-900" />
              <span>Cetak PDF</span>
            </button>
          )}

          {/* Unduh Dropdown Button */}
          <div className="relative">
            <button
              onClick={() => setIsDownloadOpen(!isDownloadOpen)}
              className="bg-[#12131a] hover:bg-slate-800 text-white border-2 border-slate-900 shadow-[2.5px_2.5px_0px_0px_#0f172a] active:translate-x-0.5 active:translate-y-0.5 rounded-xl font-extrabold px-3.5 py-2 text-xs transition flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-white" />
              <span>Unduh v</span>
            </button>

            {/* Dropdown Menu matching video 00:40 */}
            {isDownloadOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border-2 border-slate-900 rounded-2xl shadow-[5px_5px_0px_0px_#0f172a] z-50 p-2 space-y-1 animate-fadeIn">
                <button
                  onClick={() => handleExportOption('md')}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-slate-900 hover:bg-amber-100/70 flex items-center justify-between cursor-pointer"
                >
                  <span>📄 Markdown (.md)</span>
                </button>
                <button
                  onClick={() => handleExportOption('json')}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-slate-900 hover:bg-amber-100/70 flex items-center justify-between cursor-pointer"
                >
                  <span>💾 JSON (.json)</span>
                </button>
                <button
                  onClick={() => handleExportOption('txt')}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-slate-900 hover:bg-amber-100/70 flex items-center justify-between cursor-pointer"
                >
                  <span>📝 Teks (.txt)</span>
                </button>
                <button
                  onClick={() => handleExportOption('copy')}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-slate-900 hover:bg-[#dcfce7] flex items-center justify-between cursor-pointer border-t border-slate-200 pt-2"
                >
                  <span>{copiedSuccess ? '✅ Tersalin!' : '📋 Salin Teks'}</span>
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
