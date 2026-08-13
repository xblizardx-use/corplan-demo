import React, { useState } from 'react';
import { 
  X, 
  Download, 
  FileText, 
  FileSpreadsheet, 
  Presentation, 
  CheckCircle2, 
  TrendingUp,
  Building2,
  Table,
  Sparkles,
  ShieldCheck,
  Code2,
  MonitorPlay
} from 'lucide-react';
import { BusinessPlanData, PitchDeckData, Language } from '../types';
import { 
  exportToMarkdown, 
  exportToText, 
  exportToDocx, 
  exportToPDF, 
  exportPitchDeckToMarkdown,
  exportPitchDeckToPptx,
  exportPitchDeckToPdf,
  exportFinancialModelToExcel
} from '../utils/exportUtils';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: BusinessPlanData;
  pitchDeck?: PitchDeckData;
  language: Language;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  plan,
  pitchDeck,
  language,
}) => {
  const [activeTab, setActiveTab] = useState<'investor' | 'bank'>('investor');
  const [isExporting, setIsExporting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewSlideIdx, setPreviewSlideIdx] = useState(0);

  // Business Plan PDF Document Live Preview state
  const [isDocPreviewOpen, setIsDocPreviewOpen] = useState(false);
  const [docPageIdx, setDocPageIdx] = useState(0);

  if (!isOpen) return null;

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => {
      setSuccessMsg(null);
      onClose();
    }, 2200);
  };

  // --- Handlers ---
  const handleExportPitchDeckPdf = () => {
    if (pitchDeck) {
      exportPitchDeckToPdf(pitchDeck);
      showSuccess('PDF Presentation Pitch Deck berhasil diunduh!');
    }
  };

  const handleExportPitchDeckPptx = async () => {
    if (pitchDeck) {
      setIsExporting(true);
      try {
        await exportPitchDeckToPptx(pitchDeck);
        showSuccess('Slide Presentasi PowerPoint (.pptx) berhasil diunduh!');
      } catch (err) {
        console.error(err);
      } finally {
        setIsExporting(false);
      }
    }
  };

  const handleExportExcelFinancials = () => {
    exportFinancialModelToExcel(plan);
    showSuccess('Model Keuangan Excel (.xlsx) berhasil diunduh!');
  };

  const handleExportPitchDeckMd = () => {
    if (pitchDeck) {
      exportPitchDeckToMarkdown(pitchDeck);
      showSuccess('Markdown Pitch Deck berhasil diunduh!');
    }
  };

  const handleExportPitchDeckJson = () => {
    if (pitchDeck) {
      const jsonStr = JSON.stringify({
        $schema: "https://json-schema.org/draft/2020-12/schema",
        title: "PitchDeckDataSchema",
        type: "object",
        metadata: {
          generatedAt: new Date().toISOString(),
          version: "1.0",
          application: "CorPlan Generator"
        },
        data: pitchDeck
      }, null, 2);

      const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `${pitchDeck.businessName.replace(/\s+/g, '_')}_PitchDeck_Schema.json`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showSuccess('Skema JSON Pitch Deck (.json) berhasil diunduh!');
    }
  };

  const handleExportPitchDeckSlideshow = () => {
    if (pitchDeck) {
      const slidesHtml = pitchDeck.slides.map((slide, idx) => `
        <div class="slide" id="slide-${idx + 1}">
          <div class="slide-header">
            <span class="slide-badge">SLIDE ${slide.slideNumber || (idx + 1)} DEK ${pitchDeck.slides.length}</span>
            <span class="slide-company">${pitchDeck.businessName}</span>
          </div>
          <div class="slide-body">
            <h2 class="slide-title">${slide.title}</h2>
            <h3 class="slide-subtitle">${slide.headline}</h3>
            ${slide.bullets && slide.bullets.length > 0 ? `
              <ul class="bullet-list">
                ${slide.bullets.map(b => `<li>${b}</li>`).join('')}
              </ul>
            ` : ''}
            ${slide.presenterNotes ? `
              <div class="presenter-notes">
                <strong>Catatan Presenter:</strong> ${slide.presenterNotes}
              </div>
            ` : ''}
          </div>
          <div class="slide-footer">
            <span>${pitchDeck.tagline || 'Pitch Presentation'}</span>
            <span>Target Pendanaan: ${pitchDeck.currency || 'IDR'} ${(pitchDeck.targetAsk || 0).toLocaleString()}</span>
          </div>
        </div>
      `).join('');

      const fullHtml = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${pitchDeck.businessName} - Standalone Slideshow Format</title>
  <style>
    * { box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background: #0b0f19; color: #f8fafc; margin: 0; padding: 20px; }
    .no-print { max-width: 960px; margin: 0 auto 20px; background: #1e293b; padding: 16px; border-radius: 16px; border: 1px solid #334155; text-align: center; }
    .no-print h1 { margin: 0 0 6px; font-size: 18px; color: #38bdf8; }
    .no-print p { margin: 0; font-size: 12px; color: #94a3b8; }
    .slide { background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%); color: #ffffff; width: 100%; max-width: 960px; min-height: 520px; margin: 24px auto; padding: 36px; border-radius: 20px; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.5); display: flex; flex-direction: column; justify-content: space-between; border: 1px solid rgba(255,255,255,0.12); page-break-after: always; }
    .slide-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid rgba(255,255,255,0.1); padding-bottom: 12px; }
    .slide-badge { font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; color: #818cf8; background: rgba(129,140,248,0.15); padding: 4px 10px; border-radius: 6px; border: 1px solid rgba(129,140,248,0.3); }
    .slide-company { font-size: 12px; font-weight: 700; color: #cbd5e1; }
    .slide-body { flex: 1; margin: 24px 0; display: flex; flex-direction: column; justify-content: center; }
    .slide-title { font-size: 26px; font-weight: 900; color: #f8fafc; margin: 0 0 8px; line-height: 1.2; }
    .slide-subtitle { font-size: 16px; font-weight: 700; color: #fbbf24; margin: 0 0 16px; }
    .bullet-list { margin-top: 12px; padding-left: 20px; font-size: 14px; color: #cbd5e1; line-height: 1.8; }
    .presenter-notes { margin-top: 16px; font-size: 12px; color: #94a3b8; background: rgba(255,255,255,0.05); padding: 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.08); }
    .slide-footer { display: flex; justify-content: space-between; align-items: center; font-size: 11px; color: #94a3b8; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 12px; }
    @media print {
      body { background: #ffffff; color: #000000; padding: 0; }
      .no-print { display: none; }
      .slide { background: #ffffff !important; color: #000000 !important; border: 1px solid #ddd !important; box-shadow: none !important; margin: 0; width: 100%; height: 100vh; page-break-after: always; }
      .slide-title { color: #000000 !important; }
      .slide-subtitle { color: #d97706 !important; }
      .bullet-list { color: #334155 !important; }
    }
  </style>
</head>
<body>
  <div class="no-print">
    <h1>${pitchDeck.businessName} - Pitch Deck Slideshow Presentation</h1>
    <p>Format slideshow mandiri siap digunakan di browser, diproyeksikan, atau dicetak ke PDF/Gambar.</p>
  </div>
  ${slidesHtml}
</body>
</html>`;

      const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `${pitchDeck.businessName.replace(/\s+/g, '_')}_Slideshow_Presentation.html`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showSuccess('Slideshow Presentasi (.html Image-Ready) berhasil diunduh!');
    }
  };

  const handleExportDocx = async () => {
    setIsExporting(true);
    try {
      await exportToDocx(plan);
      showSuccess('Dokumen Word Proposal Kredit (.docx) berhasil diunduh!');
    } catch (err) {
      console.error(err);
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportBankPdf = async () => {
    setIsExporting(true);
    try {
      await exportToPDF('business-plan-document', `${plan.businessName}_ProposalBank.pdf`);
      showSuccess('Dokumen Proposal PDF Formal berhasil diunduh!');
    } catch (err) {
      console.error(err);
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportMarkdown = () => {
    exportToMarkdown(plan);
    showSuccess('Dokumen Markdown Business Plan berhasil diunduh!');
  };

  const handleExportText = () => {
    exportToText(plan);
    showSuccess('Dokumen Text Business Plan berhasil diunduh!');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 text-slate-400 hover:text-white rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2.5 rounded-xl bg-slate-900 text-indigo-400 border border-slate-800">
            <Download className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100">Pusat Ekspor & Bundel Dokumen</h3>
            <p className="text-xs text-slate-400">Pilih paket ekspor yang disesuaikan untuk Investor atau Bank</p>
          </div>
        </div>

        {/* Success Alert */}
        {successMsg && (
          <div className="mb-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs p-3 rounded-xl flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Package Tabs */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-slate-900 border border-slate-800 rounded-xl mb-5">
          <button
            onClick={() => setActiveTab('investor')}
            className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'investor'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <TrendingUp className="w-4 h-4 text-indigo-300" />
            <span>Paket Investor</span>
          </button>

          <button
            onClick={() => setActiveTab('bank')}
            className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'bank'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Building2 className="w-4 h-4 text-emerald-300" />
            <span>Paket Bank & Kreditur</span>
          </button>
        </div>

        {/* --- TAB 1: PAKET INVESTOR --- */}
        {activeTab === 'investor' && (
          <div className="space-y-3">
            <div className="bg-indigo-500/10 border border-indigo-500/20 p-3 rounded-xl text-xs text-indigo-200 mb-3 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block text-indigo-300 mb-0.5">Susunan Khusus Pitching Investor:</span>
                Fokus pada Pitch Deck Lanskap, Unique Value Proposition, Proyeksi ROI, Target Ask Pendanaan & Model Keuangan Excel.
              </div>
            </div>

            {pitchDeck ? (
              <>
                <button
                  onClick={() => setIsPreviewOpen(true)}
                  className="w-full p-3.5 bg-indigo-600/20 hover:bg-indigo-600/30 border-2 border-indigo-500/40 text-indigo-200 text-xs font-bold rounded-xl flex items-center justify-between transition-all group cursor-pointer shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-indigo-400" />
                    <div className="text-left">
                      <span className="block text-indigo-100 font-extrabold text-xs">👁️ Lihat Mini-Preview Layout PDF Pitch Deck</span>
                      <span className="text-[10px] text-indigo-300 font-medium">Pratinjau visual 12 slide sebelum mengunduh PDF</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-black bg-indigo-500 text-white px-2 py-1 rounded-lg border border-indigo-400">
                    Preview
                  </span>
                </button>

                <button
                  onClick={handleExportPitchDeckPdf}
                  disabled={isExporting}
                  className="w-full p-3.5 bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 text-slate-200 text-xs font-semibold rounded-xl flex items-center justify-between transition-all group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Presentation className="w-5 h-5 text-rose-400" />
                    <div className="text-left">
                      <span className="block text-slate-100 font-bold">PDF Pitch Deck Presentation</span>
                      <span className="text-[10px] text-slate-400 font-normal">Format lanskap (A4 Presentation) siap dipresentasikan</span>
                    </div>
                  </div>
                  <Download className="w-4 h-4 text-slate-400 group-hover:text-indigo-400" />
                </button>

                <button
                  onClick={handleExportPitchDeckPptx}
                  disabled={isExporting}
                  className="w-full p-3.5 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 text-amber-200 text-xs font-semibold rounded-xl flex items-center justify-between transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Presentation className="w-5 h-5 text-amber-400" />
                    <div className="text-left">
                      <span className="block text-amber-200 font-bold">Microsoft PowerPoint (.pptx)</span>
                      <span className="text-[10px] text-amber-300/80 font-normal">Slide presentasi dapat langsung diedit di PowerPoint</span>
                    </div>
                  </div>
                  <Download className="w-4 h-4 text-amber-400" />
                </button>

                <button
                  onClick={handleExportPitchDeckSlideshow}
                  disabled={isExporting}
                  className="w-full p-3.5 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 text-cyan-200 text-xs font-semibold rounded-xl flex items-center justify-between transition-all group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <MonitorPlay className="w-5 h-5 text-cyan-400" />
                    <div className="text-left">
                      <span className="block text-cyan-200 font-bold">Format Slideshow Presentasi (.html Image-Ready)</span>
                      <span className="text-[10px] text-cyan-300/80 font-normal">Slideshow lanskap interaktif mandiri untuk layar & proyektor</span>
                    </div>
                  </div>
                  <Download className="w-4 h-4 text-cyan-400" />
                </button>

                <button
                  onClick={handleExportPitchDeckJson}
                  disabled={isExporting}
                  className="w-full p-3.5 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 text-purple-200 text-xs font-semibold rounded-xl flex items-center justify-between transition-all group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Code2 className="w-5 h-5 text-purple-400" />
                    <div className="text-left">
                      <span className="block text-purple-200 font-bold">Skema JSON Pitch Deck (.json Schema)</span>
                      <span className="text-[10px] text-purple-300/80 font-normal">Data skema terstruktur untuk software presentasi eksternal</span>
                    </div>
                  </div>
                  <Download className="w-4 h-4 text-purple-400" />
                </button>
              </>
            ) : null}

            <button
              onClick={handleExportExcelFinancials}
              disabled={isExporting}
              className="w-full p-3.5 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-200 text-xs font-semibold rounded-xl flex items-center justify-between transition-all group"
            >
              <div className="flex items-center gap-3">
                <Table className="w-5 h-5 text-emerald-400" />
                <div className="text-left">
                  <span className="block text-emerald-200 font-bold">Excel Financial Model (.xlsx)</span>
                  <span className="text-[10px] text-emerald-300/80 font-normal">Spreadsheet CapEx, OpEx, Revenue & Proyeksi 3 Tahun</span>
                </div>
              </div>
              <Download className="w-4 h-4 text-emerald-400" />
            </button>

            {pitchDeck && (
              <button
                onClick={handleExportPitchDeckMd}
                disabled={isExporting}
                className="w-full p-3.5 bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 text-slate-200 text-xs font-semibold rounded-xl flex items-center justify-between transition-all group"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-indigo-400" />
                  <div className="text-left">
                    <span className="block text-slate-100 font-bold">Pitch Deck Markdown (.md)</span>
                    <span className="text-[10px] text-slate-400 font-normal">Ringkasan slide presentasi + Catatan Presenter</span>
                  </div>
                </div>
                <Download className="w-4 h-4 text-slate-400 group-hover:text-indigo-400" />
              </button>
            )}
          </div>
        )}

        {/* --- TAB 2: PAKET BANK & KREDITUR --- */}
        {activeTab === 'bank' && (
          <div className="space-y-3">
            <div className="bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl text-xs text-emerald-200 mb-3 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block text-emerald-300 mb-0.5">Susunan Khusus Permohonan Kredit Bank (KUR/Komersial):</span>
                Proposal Usaha Lengkap, Analisis Kelayakan, BEP, Payback Period, Risiko & Agunan / Mitigasi Pinjaman.
              </div>
            </div>

            <button
              onClick={() => {
                setDocPageIdx(0);
                setIsDocPreviewOpen(true);
              }}
              className="w-full p-3.5 bg-emerald-600/20 hover:bg-emerald-600/30 border-2 border-emerald-500/40 text-emerald-200 text-xs font-bold rounded-xl flex items-center justify-between transition-all group cursor-pointer shadow-md"
            >
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                <div className="text-left">
                  <span className="block text-emerald-100 font-extrabold text-xs">👁️ Lihat Pratinjau Live PDF Business Plan Formal</span>
                  <span className="text-[10px] text-emerald-300 font-medium">Format dokumen cetak A4 perbankan & stempel formal</span>
                </div>
              </div>
              <span className="text-[10px] font-black bg-emerald-500 text-white px-2 py-1 rounded-lg border border-emerald-400">
                Preview Live
              </span>
            </button>

            <button
              onClick={handleExportDocx}
              disabled={isExporting}
              className="w-full p-3.5 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 text-indigo-200 text-xs font-semibold rounded-xl flex items-center justify-between transition-all group"
            >
              <div className="flex items-center gap-3">
                <FileSpreadsheet className="w-5 h-5 text-indigo-400" />
                <div className="text-left">
                  <span className="block text-indigo-200 font-bold">Microsoft Word Proposal (.docx)</span>
                  <span className="text-[10px] text-indigo-300/80 font-normal">Dokumen proposal bisnis formal yang dapat diedit di Word</span>
                </div>
              </div>
              <Download className="w-4 h-4 text-indigo-400" />
            </button>

            <button
              onClick={handleExportBankPdf}
              disabled={isExporting}
              className="w-full p-3.5 bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 text-slate-200 text-xs font-semibold rounded-xl flex items-center justify-between transition-all group"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-rose-400" />
                <div className="text-left">
                  <span className="block text-slate-100 font-bold">Dokumen Proposal PDF Formal</span>
                  <span className="text-[10px] text-slate-400 font-normal">Format cetak siap lampirkan ke berkas pengajuan kredit</span>
                </div>
              </div>
              <Download className="w-4 h-4 text-slate-400 group-hover:text-indigo-400" />
            </button>

            <button
              onClick={handleExportMarkdown}
              disabled={isExporting}
              className="w-full p-3.5 bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 text-slate-200 text-xs font-semibold rounded-xl flex items-center justify-between transition-all group"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-teal-400" />
                <div className="text-left">
                  <span className="block text-slate-100 font-bold">Markdown Proposal (.md)</span>
                  <span className="text-[10px] text-slate-400 font-normal">Format teks terstruktur dengan tabel Markdown</span>
                </div>
              </div>
              <Download className="w-4 h-4 text-slate-400 group-hover:text-indigo-400" />
            </button>

            <button
              onClick={handleExportText}
              disabled={isExporting}
              className="w-full p-3.5 bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 text-slate-200 text-xs font-semibold rounded-xl flex items-center justify-between transition-all group"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-slate-400" />
                <div className="text-left">
                  <span className="block text-slate-100 font-bold">Plain Text (.txt)</span>
                  <span className="text-[10px] text-slate-400 font-normal">Format teks polos kompatibel semua perangkat</span>
                </div>
              </div>
              <Download className="w-4 h-4 text-slate-400 group-hover:text-indigo-400" />
            </button>
          </div>
        )}

      </div>

      {/* --- PITCH DECK MINI-PREVIEW MODAL --- */}
      {isPreviewOpen && pitchDeck && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-lg flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
          <div className="bg-[#0b0f19] border-2 border-indigo-500/40 rounded-3xl w-full max-w-3xl p-5 sm:p-6 shadow-2xl relative flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Presentation className="w-5 h-5 text-indigo-400" />
                <h3 className="text-sm font-black text-white">Pratinjau Layout PDF Pitch Deck</h3>
                <span className="text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 px-2 py-0.5 rounded-full">
                  A4 Landscape Format
                </span>
              </div>
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-xl bg-slate-900 border border-slate-800 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Slide Navigation & Preview Container */}
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              <div className="flex items-center justify-between bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
                <span className="text-xs font-extrabold text-slate-300">
                  Slide {previewSlideIdx + 1} dari {pitchDeck.slides.length}: <span className="text-indigo-400 font-black">{pitchDeck.slides[previewSlideIdx]?.title}</span>
                </span>
                <div className="flex items-center gap-2">
                  <button
                    disabled={previewSlideIdx === 0}
                    onClick={() => setPreviewSlideIdx(prev => Math.max(0, prev - 1))}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 rounded-lg disabled:opacity-40 cursor-pointer border border-slate-700"
                  >
                    ← Sebelumnya
                  </button>
                  <button
                    disabled={previewSlideIdx === pitchDeck.slides.length - 1}
                    onClick={() => setPreviewSlideIdx(prev => Math.min(pitchDeck.slides.length - 1, prev + 1))}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 rounded-lg disabled:opacity-40 cursor-pointer border border-slate-700"
                  >
                    Selanjutnya →
                  </button>
                </div>
              </div>

              {/* Simulated Printable PDF Slide Frame */}
              {pitchDeck.slides[previewSlideIdx] && (
                <div className="bg-slate-900 border-2 border-slate-700 rounded-2xl p-6 sm:p-8 aspect-[16/10] flex flex-col justify-between shadow-2xl relative overflow-hidden text-white">
                  
                  {/* Decorative Slide Background Banner */}
                  <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-400" />

                  {/* Header */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">
                        {pitchDeck.slides[previewSlideIdx].title}
                      </span>
                      <span className="text-[10px] font-bold text-slate-500">
                        PITCH DECK PRESENTATION
                      </span>
                    </div>
                    <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight leading-snug">
                      {pitchDeck.slides[previewSlideIdx].headline}
                    </h2>
                  </div>

                  {/* Bullets List */}
                  <div className="my-4 space-y-2">
                    {pitchDeck.slides[previewSlideIdx].bullets.map((b, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs font-medium text-slate-200 bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/60">
                        <span className="w-2 h-2 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>

                  {/* Footer Notes */}
                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                    <span className="truncate max-w-md italic">
                      Catatan Presenter: {pitchDeck.slides[previewSlideIdx].presenterNotes || 'Tampilkan poin utama dengan penuh keyakinan.'}
                    </span>
                    <span className="font-extrabold text-indigo-400">
                      Hal. {previewSlideIdx + 1} / {pitchDeck.slides.length}
                    </span>
                  </div>

                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold rounded-xl transition cursor-pointer"
              >
                Tutup Pratinjau
              </button>
              <button
                onClick={() => {
                  setIsPreviewOpen(false);
                  handleExportPitchDeckPdf();
                }}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black rounded-xl transition flex items-center gap-2 shadow-lg shadow-indigo-600/30 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Konfirmasi & Download PDF Pitch Deck</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* --- BUSINESS PLAN PDF DOCUMENT LIVE PREVIEW MODAL --- */}
      {isDocPreviewOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-lg flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
          <div className="bg-[#0b0f19] border-2 border-emerald-500/40 rounded-3xl w-full max-w-3xl p-5 sm:p-6 shadow-2xl relative flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-400" />
                <h3 className="text-sm font-black text-white">Pratinjau Live PDF Business Plan Formal</h3>
                <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded-full">
                  A4 Vertical Format (Dokumen Resmi)
                </span>
              </div>
              <button
                onClick={() => setIsDocPreviewOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-xl bg-slate-900 border border-slate-800 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Document Page Navigation Bar */}
            <div className="py-3 flex items-center justify-between bg-slate-900 p-3 rounded-xl border border-slate-800 my-3">
              <span className="text-xs font-black text-emerald-400">
                Halaman {docPageIdx + 1} dari 3: <span className="text-slate-200">
                  {docPageIdx === 0 ? 'Halaman 1 - Cover & Ringkasan Eksekutif' : docPageIdx === 1 ? 'Halaman 2 - Pasar & Model Keuangan' : 'Halaman 3 - Risiko & Lembar Pengesahan'}
                </span>
              </span>
              <div className="flex items-center gap-2">
                <button
                  disabled={docPageIdx === 0}
                  onClick={() => setDocPageIdx(prev => Math.max(0, prev - 1))}
                  className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 rounded-lg disabled:opacity-40 cursor-pointer border border-slate-700"
                >
                  ← Hal. Sebelumnya
                </button>
                <button
                  disabled={docPageIdx === 2}
                  onClick={() => setDocPageIdx(prev => Math.min(2, prev + 1))}
                  className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 rounded-lg disabled:opacity-40 cursor-pointer border border-slate-700"
                >
                  Hal. Selanjutnya →
                </button>
              </div>
            </div>

            {/* Simulated Paper Document Container (White A4 Vertical Canvas) */}
            <div className="flex-1 overflow-y-auto bg-slate-950 p-4 rounded-2xl border border-slate-800 shadow-inner flex justify-center">
              
              <div className="bg-white text-slate-900 w-full max-w-xl min-h-[550px] p-6 sm:p-8 rounded-lg shadow-2xl border-2 border-slate-300 relative flex flex-col justify-between font-sans">
                
                {/* Official Letterhead Header Banner */}
                <div className="border-b-2 border-slate-900 pb-3 mb-4 flex items-start justify-between">
                  <div>
                    <span className="text-[9px] font-black tracking-widest text-emerald-700 uppercase block">
                      RANCANGAN PROPOSAL BISNIS FORMAL
                    </span>
                    <h1 className="text-lg font-black text-slate-900 uppercase tracking-tight">
                      {plan.businessName || 'PROPOSAL BISNIS'}
                    </h1>
                    <p className="text-[10px] font-bold text-slate-600">
                      Industri: {plan.industry} | Ditujukan Untuk: Bank & Investor
                    </p>
                  </div>
                  <div className="border border-slate-900 px-2 py-1 rounded bg-slate-100 text-right shrink-0">
                    <span className="text-[8px] font-black block text-slate-500 uppercase">STATUS DOKUMEN</span>
                    <span className="text-[9px] font-black text-emerald-800">DOKUMEN RESMI</span>
                  </div>
                </div>

                {/* PAGE 0: Cover & Executive Summary */}
                {docPageIdx === 0 && (
                  <div className="space-y-4 flex-1">
                    <div className="bg-emerald-50 border border-emerald-300 p-3 rounded-md">
                      <span className="text-[10px] font-black uppercase tracking-wider text-emerald-900 block mb-1">
                        I. RINGKASAN EKSEKUTIF (EXECUTIVE SUMMARY)
                      </span>
                      <p className="text-[11px] font-medium text-slate-800 leading-relaxed">
                        {plan.executiveSummary}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-900 block border-b border-slate-300 pb-1">
                        II. PROFIL & PROPOSISI NILAI UTAMA
                      </span>
                      <div className="grid grid-cols-2 gap-2 text-[10px] font-bold">
                        <div className="bg-slate-100 p-2 rounded border border-slate-200">
                          <span className="text-slate-500 block text-[8px] uppercase">Nama Usaha</span>
                          <span className="text-slate-900 font-extrabold">{plan.businessName}</span>
                        </div>
                        <div className="bg-slate-100 p-2 rounded border border-slate-200">
                          <span className="text-slate-500 block text-[8px] uppercase">Sektor Usaha</span>
                          <span className="text-slate-900 font-extrabold">{plan.industry}</span>
                        </div>
                      </div>
                    </div>

                    <div className="border border-slate-300 p-3 rounded bg-slate-50 space-y-1">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-900 block">
                        III. TARGET PASAR
                      </span>
                      <p className="text-[11px] text-slate-700 font-medium">
                        {plan.marketAnalysis?.targetAudience || 'Masyarakat & segmen konsumen potensial lokal.'}
                      </p>
                    </div>
                  </div>
                )}

                {/* PAGE 1: Market & Financial Tables */}
                {docPageIdx === 1 && (
                  <div className="space-y-4 flex-1">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-900 block border-b border-slate-300 pb-1 mb-2">
                        IV. RINGKASAN KEUANGAN & KEBUTUHAN MODAL
                      </span>
                      <div className="bg-slate-100 p-2 rounded border border-slate-300 mb-3 text-[10px] flex justify-between font-bold">
                        <span>ESTIMASI MODAL AWAL (CAPEX):</span>
                        <span className="text-emerald-700 font-black">
                          IDR {(plan.financialModel?.initialCapital || 0).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div>
                      <span className="text-[9px] font-black uppercase text-slate-700 block mb-1">
                        Tabel Komponen Investasi Peralatan (CapEx)
                      </span>
                      <table className="w-full text-left text-[9px] border-collapse border border-slate-400">
                        <thead>
                          <tr className="bg-slate-200 border-b border-slate-400 font-bold">
                            <th className="p-1 border.r border-slate-400">Item Barang</th>
                            <th className="p-1 text-right">Nilai Investasi (IDR)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {plan.financialModel?.capexItems?.slice(0, 4).map((item, idx) => (
                            <tr key={idx} className="border-b border-slate-300">
                              <td className="p-1 border-r border-slate-300">{item.item}</td>
                              <td className="p-1 text-right font-bold">IDR {item.cost.toLocaleString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div>
                      <span className="text-[9px] font-black uppercase text-slate-700 block mb-1">
                        Analisis SWOT Singkat
                      </span>
                      <div className="grid grid-cols-2 gap-2 text-[9px]">
                        <div className="bg-emerald-50 p-2 rounded border border-emerald-300">
                          <span className="font-bold text-emerald-900 block">Kekuatan (Strengths):</span>
                          <span>{plan.marketAnalysis?.swot?.strengths?.[0] || 'Keunggulan produk lokal'}</span>
                        </div>
                        <div className="bg-rose-50 p-2 rounded border border-rose-300">
                          <span className="font-bold text-rose-900 block">Peluang (Opportunities):</span>
                          <span>{plan.marketAnalysis?.swot?.opportunities?.[0] || 'Pasar bertumbuh pesat'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* PAGE 2: Risk & Authorization Stamps */}
                {docPageIdx === 2 && (
                  <div className="space-y-4 flex-1">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-900 block border-b border-slate-300 pb-1 mb-2">
                        V. MITIGASI RISIKO & PENGESAHAN DOKUMEN
                      </span>
                      <div className="space-y-1 text-[10px]">
                        {plan.riskManagement?.slice(0, 2).map((r, i) => (
                          <div key={i} className="bg-slate-100 p-2 rounded border border-slate-200">
                            <span className="font-bold text-slate-900 block">Risiko {i + 1}: {r.risk}</span>
                            <span className="text-slate-600">Mitigasi: {r.mitigation}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Official Authorization & Signature Block */}
                    <div className="border-t-2 border-slate-900 pt-4 mt-6">
                      <span className="text-[9px] font-black uppercase text-slate-500 block text-center mb-4">
                        LEMBAR PERSETUJUAN & PENGESAHAN PROPOSAL
                      </span>
                      <div className="grid grid-cols-2 gap-6 text-center text-[10px]">
                        <div className="space-y-12">
                          <span className="font-bold block">Pemohon / Pemilik Usaha,</span>
                          <div className="border-b border-slate-900 mx-4" />
                          <span className="font-extrabold text-slate-900 block">({plan.businessName})</span>
                        </div>
                        <div className="space-y-12">
                          <span className="font-bold block">Petugas Analis Kredit Bank,</span>
                          <div className="border-b border-slate-900 mx-4" />
                          <span className="font-extrabold text-slate-900 block">(Tanda Tangan & Stempel)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Document Footer */}
                <div className="border-t border-slate-300 pt-2 mt-4 flex items-center justify-between text-[8px] text-slate-500 font-bold">
                  <span>CorPlan Generator | PDF Dokumen Resmi Proposal</span>
                  <span>Halaman {docPageIdx + 1} dari 3</span>
                </div>

              </div>

            </div>

            {/* Modal Bottom Actions */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
              <button
                onClick={() => setIsDocPreviewOpen(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold rounded-xl transition cursor-pointer"
              >
                Tutup Pratinjau
              </button>
              <button
                onClick={() => {
                  setIsDocPreviewOpen(false);
                  handleExportBankPdf();
                }}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black rounded-xl transition flex items-center gap-2 shadow-lg shadow-emerald-600/30 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Konfirmasi & Download PDF Formal</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
