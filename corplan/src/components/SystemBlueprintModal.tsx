import React, { useState } from 'react';
import { 
  X, 
  FileText, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  Database, 
  Sparkles, 
  Copy, 
  Check, 
  Server, 
  Building2, 
  PieChart, 
  Calculator, 
  Landmark, 
  Swords, 
  Share2, 
  MessageSquare, 
  TrendingUp, 
  Zap, 
  Printer,
  CheckCircle2,
  FileSpreadsheet,
  Lock,
  Globe,
  DollarSign
} from 'lucide-react';

interface SystemBlueprintModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme?: 'warm-luxe' | 'dark-obsidian';
}

export const SystemBlueprintModal: React.FC<SystemBlueprintModalProps> = ({
  isOpen,
  onClose,
  theme = 'warm-luxe',
}) => {
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState<'overview' | 'features' | 'architecture' | 'data'>('overview');

  if (!isOpen) return null;

  const isDark = theme === 'dark-obsidian';

  const blueprintMarkdown = `# DOKUMEN BLUEPRINT PROPOSAL & SPESIFIKASI FITUR LENGKAP
## APPLICATION PLATFORM: CORPLAN AI ENTERPRISE SUITE
*Versi Sistem: 2.5 (Enterprise Production Standard)*
*Tanggal Penyusunan: 4 Agustus 2026*

---

## 1. RINGKASAN EKSEKUTIF (EXECUTIVE SUMMARY)

CorPlan AI Enterprise Suite adalah platform konsultan bisnis, proyeksi keuangan, dan investor pitch deck generator berbasis Artificial Intelligence (AI) yang dirancang khusus untuk memodernisasi cara UMKM, pendiri startup, dan pelaku usaha di Indonesia dalam menyusun dokumen perbankan, riset pasar, serta proposal investasi profesional.

### A. Visi & Misi Utama
- **Demokratisasi Akses Konsultasi Finansial**: Memberikan analisis bisnis, valuasi, dan proyeksi keuangan kelas dunia tanpa membutuhkan biaya jasa konsultan ratusan juta Rupiah.
- **Standar Baku Perbankan & Modal Ventura (VC)**: Menghasilkan dokumen proposal bisnis yang mematuhi standar Kredit Usaha Rakyat (KUR) bank BUMN (BRI, Mandiri, BNI, BCA) serta struktur Pitch Deck 12 Slide Modal Ventura global.
- **Ketersediaan Layanan Tanpa Henti (Zero Downtime Resiliency)**: Dilengkapi dengan mesin fallback otomatis yang memastikan pengguna tetap bisa menghasilkan draf proposal bisnis lengkap meskipun terjadi kendala jaringan atau batas kuota API AI.

---

## 2. DOKUMENTASI SPESIFIKASI FITUR LENGKAP (DETAILED FEATURE SPECIFICATIONS)

### 1. Proposal Bisnis AI (Bank & Commercial Proposal Generator)
- **Deskripsi**: Generator rencana bisnis otomatis 6 Bab yang mencakup seluruh aspek operasional dan keuangan perusahaan.
- **Bab Terstruktur**:
  1. Ringkasan Eksekutif (Executive Summary, Visi Misi, Proposisi Nilai)
  2. Analisis Industri & Riset Pasar (Ukuran Pasar TAM/SAM/SOM, Segmentasi Pelanggan)
  3. Strategi Pemasaran & Operasional (4P Marketing Mix, Workflow Operasional)
  4. Analisis Harga Pokok Produksi (CapEx, OpEx, COGS/HPP, Proyeksi Margin)
  5. Proyeksi Keuangan & Cash Flow (Laba Rugi, Break Even Point/BEP)
  6. Manajemen Risiko & Rencana Kontinjensi (Matriks Risiko, Mitigasi)
- **Fitur Tambahan**: Mode "Panduan Pemula" (Beginner Analogy Mode) yang menerjemahkan istilah teknis akuntansi menjadi penjelasan yang mudah dipahami.

### 2. Generator Pitch Deck Investor VC 12 Slide (Interactive Deck)
- **Deskripsi**: Generator slide presentasi interaktif untuk penggalangan dana (*fundraising*) dari investor angels dan Venture Capital.
- **Struktur Slide**:
  - Slide 1: Cover & Visi Perusahaan
  - Slide 2: Permasalahan Utama (*The Problem*)
  - Slide 3: Solusi Produk (*The Solution*)
  - Slide 4: Potensi Pasar (*TAM / SAM / SOM*)
  - Slide 5: Produk & Fitur Unggulan
  - Slide 6: Model Bisnis & Monetisasi
  - Slide 7: Traksi & Pencapaian Usaha
  - Slide 8: Strategi Pemasaran (*Go-To-Market*)
  - Slide 9: Analisis Pesaing & Keunggulan Kompetitif
  - Slide 10: Proyeksi Keuangan 3 Tahun
  - Slide 11: Tim Pendiri & Pengalaman
  - Slide 12: Nilai Penggalangan Dana (*The Ask*)
- **Fitur Spesifik**: Dilengkapi skrip naskah bicara presenter (*Presenter Speaker Notes*) otomatis di setiap slide.

### 3. Simulator Kelayakan Kredit Bank & KUR (Bank Loan Simulator)
- **Deskripsi**: Alat analisis simulasi pengajuan Kredit Usaha Rakyat (KUR) dan Kredit Komersial Bank.
- **Indikator Analisis**:
  - Skor Kelayakan Kredit (0 - 100%) berdasarkan rasio Debt Service Coverage Ratio (DSCR).
  - Estimasi angsuran bulanan pokok dan bunga.
  - Tabel Amortisasi Lengkap dengan pilihan tenor 12, 24, 36, 48, hingga 60 bulan.
  - Rekomendasi agunan/jaminan dan kelengkapan dokumen persyarakatan KUR.

### 4. Kalkulator HPP & Financial Spreadsheet Engine
- **Deskripsi**: Engine kalkulasi spreadsheet keuangan interaktif untuk menghitung kelayakan finansial secara rinci.
- **Formula Matematika Utama**:
  - **CapEx (Capital Expenditure)**: Total Investasi Awal = Pembelian Peralatan + Biaya Sewa Tempat + Renovasi + Legalitas.
  - **OpEx (Operational Expenditure)**: Biaya Operasional Bulanan = Gaji Pegawai + Sewa Bulanan + Utility + Pemasaran.
  - **HPP / COGS per Unit**: (Total Biaya Bahan Baku + Biaya Tenaga Kerja Langsung) / Jumlah Unit Diproduksi.
  - **Titik Impas (BEP) Unit**: Biaya Tetap Bulanan / (Harga Jual per Unit - Biaya Variabel per Unit).
  - **Titik Impas (BEP) Nominal**: BEP Unit x Harga Jual per Unit.

### 5. AI Valuation & Investor Scorecard
- **Deskripsi**: Penilaian estimasi harga perusahaan (Valuasi Pre-Money) untuk kebutuhan investasi saham.
- **Pendekatan Valuasi**:
  - Revenue Multiple Approach (Skala Omset Tahunan x Multiplier Industri)
  - Earnings / EBITDA Multiple Approach (Laba Bersih Tahunan x Multiplier EBITDA)
  - Indikator Kesiapan Investasi (*Investment Readiness Index*) & Payback Period.

### 6. Matriks Pesaing & Analisis Kompetitor
- **Deskripsi**: Pemetaan kekuatan pesaing di pasar lokal dan nasional.
- **Elemen Analisis**: Pesaing Langsung (*Direct*), Pesaing Tidak Langsung (*Indirect*), Estimasi Pangsa Pasar, Strategi Harga Pesaing, Kelemahan Pesaing, dan Formula Diferensiasi Usaha.

### 7. Google Market Trends & Traffic Analyzer
- **Deskripsi**: Analisis pencarian kata kunci konsumen di Google Indonesia.
- **Informasi Dihasilkan**: Estimasi volume pencarian bulanan, tren minat konsumen, topik populer terkait, serta simulasi proyeksi konversi penjualan dari trafik pencarian organik.

### 8. Kalender Pemasaran Digital 30 Hari (Content Engine)
- **Deskripsi**: Rangkaian jadwal eksekusi konten media sosial siap pakai selama 30 hari penuh (Instagram Reels, TikTok, Google Business) lengkap dengan caption, hashtag, dan call-to-action (CTA).

### 9. Matriks SWOT & Manajemen Risiko 4-Kuadran
- **Deskripsi**: Identifikasi Kekuatan (*Strengths*), Kelemahan (*Weaknesses*), Peluang (*Opportunities*), dan Ancaman (*Threats*) beserta matriks mitigasi risiko operasional, keuangan, dan pasar.

### 10. Checklis Legalitas & Formulir E-Form Digital
- **Deskripsi**: Panduan pemenuhan syarat legalitas usaha di Indonesia (NIB OSS, PIRT, Sertifikasi Halal BPJPH, HAKI Merek) dan formulir pengisian profil usaha.

### 11. Konsultan Bisnis AI Chatbot 24/7
- **Deskripsi**: Asisten AI interaktif dengan pemahaman konteks bisnis aktif pengguna, siap menjawab pertanyaan seputar operasional, perpajakan UMKM, dan negosiasi investor.

### 12. Modul Multi-Mata Uang & Multi-Bahasa
- **Deskripsi**: Dukungan penerjemahan dan konversi kurs finansial langsung (IDR, USD, EUR, SGD, JPY, GBP) dengan dukungan bahasa Indonesia dan Inggris.

---

## 3. ARSITEKTUR TEKNIS & PROTOKOL INTEGRASI (TECHNICAL ARCHITECTURE)

### A. Technology Stack
- **Frontend Layer**: React 18 SPA (Single Page Application), TypeScript, Tailwind CSS Neubrutalism UI Framework, Lucide React Icons.
- **Backend Protocol**: Custom Express Node.js Server (\`/server.ts\`) bertindak sebagai Secure API Proxy.
- **AI Engine SDK**: Google Gen AI SDK (\`@google/genai\`) memanfaatkan model \`gemini-2.5-flash\` dengan pengaturan JSON Schema enforcement.
- **Port Routing**: Port 3000 (Cloud Run / Container Nginx reverse proxy compliant).

### B. Arsitektur Komunikasi API & Resiliency Logic
1. Request dari browser pengguna dikirimkan ke endpoint Express backend (\`/api/generate-plan\`).
2. Server backend memproses prompt dan melakukan panggilan aman ke Google Gemini API tanpa pernah mengekspos API Key ke client.
3. Apabila terjadi kegagalan jaringan atau batas kuota API habis (HTTP Status 429), **Resiliency Fallback Engine** mengambil alih secara instan untuk menghasilkan struktur bisnis yang matematis dan presisi, memastikan sistem 100% selalu berfungsi (*zero downtime*).

---

## 4. TATA KELOLA DATA & KEAMANAN (DATA PRIVACY & STORAGE)

- **Local-First Storage**: Seluruh data bisnis pengguna disimpan secara lokal di memori browser (LocalStorage/State) untuk menjamin kerahasiaan penuh.
- **Tanpa Pengumpulan Data Sensitif**: Tidak ada informasi rahasia atau angka finansial perusahaan yang disimpan secara permanen di server eksternal.
- **Ekspor Serbaguna**: Dokumen dapat diekspor menjadi format Pitch Deck Interaktif, Cetak PDF Resmi, maupun file Teks Markdown (.md).

---
*Cetak Biru Proposal dikembangkan secara resmi oleh Tim Pengembang CorPlan AI Enterprise Suite.*`;

  const handleCopy = () => {
    navigator.clipboard.writeText(blueprintMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const formattedContent = blueprintMarkdown
      .replace(/# (.*)/g, '<h1 style="font-size: 22px; border-bottom: 2px solid #0f172a; padding-bottom: 6px; margin-top: 24px;">$1</h1>')
      .replace(/## (.*)/g, '<h2 style="font-size: 16px; color: #1e293b; margin-top: 20px; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px;">$1</h2>')
      .replace(/### (.*)/g, '<h3 style="font-size: 14px; color: #334155; margin-top: 14px;">$1</h3>')
      .replace(/\n\n/g, '<br/>');

    printWindow.document.write(`<!DOCTYPE html><html><head><title>Proposal Blueprint - CorPlan AI</title><style>body { font-family: 'Segoe UI', Arial, sans-serif; padding: 40px; color: #0f172a; line-height: 1.6; } .footer { margin-top: 30px; border-top: 2px solid #0f172a; text-align: center; font-size: 11px; color: #64748b; padding-top: 10px; }</style></head><body><div style="text-align:center;margin-bottom:20px;"><h1 style="border:none;margin-bottom:4px;">DOKUMEN PROPOSAL BLUEPRINT & SPESIFIKASI FITUR</h1><p><b>Platform CorPlan AI Enterprise Suite</b></p><span style="background:#fef08a;padding:2px 8px;font-weight:bold;border:1px solid #0f172a;border-radius:4px;font-size:11px;">Versi Enterprise 2.5</span></div><div>${formattedContent}</div><div class="footer"><p>© CorPlan AI Specification Proposal. Hak Cipta Dilindungi.</p></div><script>window.onload = function() { window.print(); }</script></body></html>`);
    printWindow.document.close();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className={`w-full max-w-5xl max-h-[92vh] rounded-2xl border-4 border-slate-900 shadow-[10px_10px_0px_0px_#0f172a] flex flex-col overflow-hidden transition-all ${
          isDark ? 'bg-[#0f172a] text-slate-100 border-white/20 shadow-[10px_10px_0px_0px_#000]' : 'bg-[#fbf9f4] text-slate-900'
        }`}
      >
        {/* Header Modal */}
        <div className={`p-4 sm:p-6 border-b-4 border-slate-900 dark:border-white/20 flex items-center justify-between gap-4 ${
          isDark ? 'bg-indigo-950' : 'bg-[#fef08a]'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-amber-300 border-2 border-slate-900 flex items-center justify-center font-black shadow-[2px_2px_0px_0px_#0f172a] shrink-0">
              <FileText className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                  Proposal Blueprint CorPlan AI
                </h2>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded border border-slate-900 bg-slate-900 text-amber-300 shadow-[1px_1px_0px_0px_#0f172a]">
                  Spesifikasi Lengkap
                </span>
              </div>
              <p className="text-xs sm:text-sm font-bold opacity-80">
                Dokumentasi Cetak Biru Arsitektur, Logika Finansial, & Katalog Modul Enterprise
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl border-2 border-slate-900 bg-white dark:bg-slate-800 hover:bg-rose-100 text-slate-900 dark:text-white flex items-center justify-center font-black shadow-[2px_2px_0px_0px_#0f172a] cursor-pointer shrink-0"
            title="Tutup Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section Navigation Tabs */}
        <div className={`p-2 border-b-2 border-slate-900 dark:border-white/20 flex items-center justify-between gap-2 overflow-x-auto scrollbar-none ${
          isDark ? 'bg-slate-900/90' : 'bg-white/90'
        }`}>
          <div className="flex items-center gap-1.5">
            {[
              { id: 'overview', label: '1. Ringkasan Eksekutif', icon: Sparkles },
              { id: 'features', label: '2. Spesifikasi Fitur Lengkap', icon: Layers },
              { id: 'architecture', label: '3. Arsitektur & AI Resiliency', icon: Cpu },
              { id: 'data', label: '4. Keamanan Data & Storage', icon: ShieldCheck },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeSection === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSection(tab.id as 'overview' | 'features' | 'architecture' | 'data')}
                  className={`px-3 py-1.5 rounded-xl border-2 border-slate-900 text-xs font-black flex items-center gap-1.5 transition cursor-pointer shrink-0 shadow-[1.5px_1.5px_0px_0px_#0f172a] ${
                    isActive 
                      ? 'bg-[#fef08a] text-slate-900' 
                      : isDark ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleCopy}
              className="px-2.5 py-1.5 rounded-xl border-2 border-slate-900 bg-white dark:bg-slate-800 hover:bg-slate-100 text-xs font-black text-slate-900 dark:text-white flex items-center gap-1 shadow-[2px_2px_0px_0px_#0f172a] cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copied ? 'Tersalin' : 'Salin Markdown'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-xl border-2 border-slate-900 bg-[#bfdbfe] hover:bg-[#93c5fd] text-xs font-black text-slate-900 flex items-center gap-1 shadow-[2px_2px_0px_0px_#0f172a] cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-slate-900" />
              <span>Cetak Cetak Biru (PDF)</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6 text-slate-800 dark:text-slate-200">
          
          {/* SECTION 1: OVERVIEW */}
          {activeSection === 'overview' && (
            <div className="space-y-4 animate-fadeIn">
              <div className={`p-4 sm:p-5 rounded-2xl border-3 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a] ${
                isDark ? 'bg-slate-800/90' : 'bg-[#fef08a]/80 text-slate-900'
              }`}>
                <h3 className="font-black text-lg sm:text-xl text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  <Building2 className="w-6 h-6 text-indigo-700 dark:text-amber-300" />
                  <span>Visi Proposisi Nilai & Latar Belakang CorPlan AI</span>
                </h3>
                <p className="text-xs sm:text-sm font-bold leading-relaxed">
                  CorPlan AI Enterprise Suite adalah platform konsultan bisnis terintegrasi yang dirancang untuk membantu UMKM, pendiri startup, dan profesional bisnis di Indonesia dalam menyusun dokumen perbankan, analisis pasar, kalkulasi HPP, serta Pitch Deck investor berstandar Modal Ventura (VC) secara otomatis.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className={`p-4 rounded-2xl border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] ${
                  isDark ? 'bg-slate-800' : 'bg-white'
                }`}>
                  <div className="w-9 h-9 rounded-xl bg-[#bfdbfe] border-2 border-slate-900 flex items-center justify-center font-black text-slate-900 mb-3 shadow-[2px_2px_0px_0px_#0f172a]">
                    1
                  </div>
                  <h4 className="font-black text-sm text-slate-900 dark:text-white mb-1.5">Standar Perbankan KUR</h4>
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 leading-normal">
                    Format proposal bisnis 6 Bab yang memenuhi kriteria pengajuan Kredit Usaha Rakyat (KUR) bank BUMN Indonesia (BRI, Mandiri, BNI, BCA).
                  </p>
                </div>

                <div className={`p-4 rounded-2xl border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] ${
                  isDark ? 'bg-slate-800' : 'bg-white'
                }`}>
                  <div className="w-9 h-9 rounded-xl bg-[#fef08a] border-2 border-slate-900 flex items-center justify-center font-black text-slate-900 mb-3 shadow-[2px_2px_0px_0px_#0f172a]">
                    2
                  </div>
                  <h4 className="font-black text-sm text-slate-900 dark:text-white mb-1.5">Pitch Deck VC Ready</h4>
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 leading-normal">
                    Generator 12 slide presentasi investor lengkap dengan Presenter Speaker Notes untuk kelancaran sesi penggalangan dana (*fundraising*).
                  </p>
                </div>

                <div className={`p-4 rounded-2xl border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] ${
                  isDark ? 'bg-slate-800' : 'bg-white'
                }`}>
                  <div className="w-9 h-9 rounded-xl bg-[#dcfce7] border-2 border-slate-900 flex items-center justify-center font-black text-slate-900 mb-3 shadow-[2px_2px_0px_0px_#0f172a]">
                    3
                  </div>
                  <h4 className="font-black text-sm text-slate-900 dark:text-white mb-1.5">Zero Downtime Resiliency</h4>
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 leading-normal">
                    Mesin fallback algoritmik otomatis yang menjamin ketersediaan proposal bisnis lengkap tanpa gangguan meskipun kuota API terbatas.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 2: CATALOG FITUR LENGKAP */}
          {activeSection === 'features' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-sm uppercase tracking-wider text-slate-600 dark:text-slate-400">
                  Rincian Spesifikasi Fitur Utama CorPlan (12 Modul)
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    num: '01',
                    title: 'Proposal Bisnis AI (Bank Standard 6 Bab)',
                    category: 'Core Planning',
                    badgeBg: 'bg-[#bfdbfe]',
                    icon: FileText,
                    items: [
                      'Bab 1: Ringkasan Eksekutif & Proposisi Nilai',
                      'Bab 2: Analisis Industri & Ukuran Pasar (TAM/SAM/SOM)',
                      'Bab 3: Strategi Pemasaran & Rencana Operasional',
                      'Bab 4: Kalkulasi HPP, CapEx, & OpEx',
                      'Bab 5: Proyeksi Keuangan & Cash Flow',
                      'Bab 6: Manajemen Risiko & Rencana Kontinjensi',
                      'Modul Khusus: Mode Analogis Pemula (Beginner Mode)'
                    ]
                  },
                  {
                    num: '02',
                    title: 'Pitch Deck Presentasi Investor (12 Slide VC)',
                    category: 'Fundraising',
                    badgeBg: 'bg-[#fef08a]',
                    icon: PieChart,
                    items: [
                      'Cover, Problem, Solution, Market TAM/SAM/SOM',
                      'Product Features, Business Model, Traction',
                      'Go-To-Market Strategy, Competitive Advantage',
                      'Financial Projections, Team, The Ask',
                      'Disertai Naskah Bicara Presenter (Speaker Notes)'
                    ]
                  },
                  {
                    num: '03',
                    title: 'Kalkulator HPP & Financial Spreadsheet Engine',
                    category: 'Finansial & Akuntansi',
                    badgeBg: 'bg-[#f5d0fe]',
                    icon: FileSpreadsheet,
                    items: [
                      'Estimasi Biaya Investasi Awal (CapEx)',
                      'Biaya Operasional Bulanan (OpEx)',
                      'Harga Pokok Produksi (HPP/COGS per unit)',
                      'Titik Impas Break-Even Point (BEP Unit & BEP Rupiah)',
                      'Kalkulasi Margin Kotor & Margin Bersih'
                    ]
                  },
                  {
                    num: '04',
                    title: 'KUR & Bank Loan Eligibility Simulator',
                    category: 'Perbankan',
                    badgeBg: 'bg-[#dcfce7]',
                    icon: Landmark,
                    items: [
                      'Skor Kelayakan Kredit Bank (0 - 100%)',
                      'Rasio Kemampuan Membayar (DSCR Ratio)',
                      'Simulasi Angsuran Bulanan Pokok & Bunga Efektif',
                      'Tabel Amortisasi Tenor 12 hingga 60 Bulan',
                      'Checklist Syarat KUR BRI, Mandiri, BNI, BCA'
                    ]
                  },
                  {
                    num: '05',
                    title: 'AI Valuasi Usaha & Investor Scorecard',
                    category: 'Valuasi',
                    badgeBg: 'bg-[#fed7aa]',
                    icon: Calculator,
                    items: [
                      'Valuasi Pre-Money Metode Revenue Multiple',
                      'Valuasi Metode EBITDA / Earnings Multiple',
                      'Indikator Kesiapan Investasi (Investment Readiness)',
                      'Proyeksi Return (Payback Period & Estimated IRR)'
                    ]
                  },
                  {
                    num: '06',
                    title: 'Analisis Pesaing & Kompetitor Market',
                    category: 'Riset Pasar',
                    badgeBg: 'bg-[#bfdbfe]',
                    icon: Swords,
                    items: [
                      'Pemetaan Pesaing Langsung (Direct Competitors)',
                      'Pemetaan Pesaing Tidak Langsung (Indirect)',
                      'Estimasi Pangsa Pasar & Strategi Harga Pesaing',
                      'Formula Keunggulan Diferensiasi Produk'
                    ]
                  },
                  {
                    num: '07',
                    title: 'Google Market Trends & Traffic Analyzer',
                    category: 'Digital Research',
                    badgeBg: 'bg-[#e9d5ff]',
                    icon: TrendingUp,
                    items: [
                      'Estimasi Volume Pencarian Kata Kunci Google',
                      'Tren Minat Topik Konsumen Indonesia',
                      'Simulasi Konversi Penjualan dari Trafik Organik'
                    ]
                  },
                  {
                    num: '08',
                    title: 'Digital Marketing & Kalender Konten 30 Hari',
                    category: 'Pemasaran Digital',
                    badgeBg: 'bg-[#bae6fd]',
                    icon: Share2,
                    items: [
                      'Strategi Channel (Instagram, TikTok, Google)',
                      'Jadwal Eksekusi Konten Harian 30 Hari',
                      'Caption, Hashtag Viral, & Call To Action (CTA)'
                    ]
                  },
                  {
                    num: '09',
                    title: 'Matriks SWOT & Manajemen Risiko 4-Kuadran',
                    category: 'Strategi',
                    badgeBg: 'bg-[#fecdd3]',
                    icon: ShieldCheck,
                    items: [
                      'Matriks Kekuatan, Kelemahan, Peluang, Ancaman',
                      'Identifikasi Dampak Risiko Operasional & Finansial',
                      'Rencana Langkah Mitigasi Konkrit'
                    ]
                  },
                  {
                    num: '10',
                    title: 'Checklist Legalitas & E-Form Digital',
                    category: 'Legalitas',
                    badgeBg: 'bg-[#d9f99d]',
                    icon: CheckCircle2,
                    items: [
                      'Checklist NIB OSS, PIRT, Halal BPJPH, HAKI',
                      'Validasi Data Profil Usaha & Kelengkapan Berkas'
                    ]
                  },
                  {
                    num: '11',
                    title: 'Konsultan Bisnis AI Chatbot 24/7',
                    category: 'AI Assistant',
                    badgeBg: 'bg-[#fed7aa]',
                    icon: MessageSquare,
                    items: [
                      'Konsultasi Interaktif Berbasis Konteks Bisnis Aktif',
                      'Saran Strategi Efisiensi Modal & Operasional'
                    ]
                  },
                  {
                    num: '12',
                    title: 'Multi-Currency & Multi-Language Support',
                    category: 'Utilitas Global',
                    badgeBg: 'bg-[#fef08a]',
                    icon: Globe,
                    items: [
                      'Mata Uang IDR, USD, EUR, SGD, JPY, GBP',
                      'Dukungan Bahasa Indonesia & Bahasa Inggris'
                    ]
                  }
                ].map((fitur) => {
                  const IconComp = fitur.icon;
                  return (
                    <div 
                      key={fitur.num}
                      className={`p-4 rounded-2xl border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] ${
                        isDark ? 'bg-slate-800' : 'bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-lg border-2 border-slate-900 ${fitur.badgeBg} flex items-center justify-center font-black text-slate-900 shadow-[1px_1px_0px_0px_#0f172a]`}>
                            <IconComp className="w-4 h-4 text-slate-900" />
                          </div>
                          <span className="text-xs font-black text-slate-900 dark:text-amber-300">
                            {fitur.num}. {fitur.title}
                          </span>
                        </div>
                        <span className="text-[10px] font-black px-2 py-0.5 rounded border border-slate-900 bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200">
                          {fitur.category}
                        </span>
                      </div>

                      <ul className="space-y-1 mt-3 pl-1">
                        {fitur.items.map((item, idx) => (
                          <li key={idx} className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-start gap-1.5">
                            <span className="text-indigo-600 dark:text-indigo-400 font-black">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* SECTION 3: ARCHITECTURE */}
          {activeSection === 'architecture' && (
            <div className="space-y-4 animate-fadeIn">
              <div className={`p-4 sm:p-5 rounded-2xl border-3 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a] ${
                isDark ? 'bg-slate-800' : 'bg-indigo-50/90'
              }`}>
                <h3 className="font-black text-lg text-slate-900 dark:text-indigo-300 mb-2 flex items-center gap-2">
                  <Server className="w-5 h-5 text-indigo-600 dark:text-indigo-300" />
                  <span>Spesifikasi Arsitektur Full-Stack & API Proxy</span>
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  Aplikasi dibangun menggunakan pola arsitektur Full-Stack terisolasi di mana Kunci API Gemini terlindungi dengan aman di server backend Node.js Express tanpa pernah bocor ke browser pengguna.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-bold">
                  <div className={`p-3 rounded-xl border-2 border-slate-900 ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
                    <span className="text-indigo-600 dark:text-indigo-400 font-black block mb-1">Frontend Layer</span>
                    <p className="text-slate-600 dark:text-slate-400">React 18, Vite, TypeScript, Tailwind CSS Neubrutalism Design, Recharts, Lucide Icons.</p>
                  </div>

                  <div className={`p-3 rounded-xl border-2 border-slate-900 ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
                    <span className="text-emerald-600 dark:text-emerald-400 font-black block mb-1">Backend Proxy Layer</span>
                    <p className="text-slate-600 dark:text-slate-400">Express Node.js Server (`/server.ts`) mendengarkan di Port 3000 untuk pengolahan request `/api/generate-plan`.</p>
                  </div>

                  <div className={`p-3 rounded-xl border-2 border-slate-900 ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
                    <span className="text-amber-600 dark:text-amber-400 font-black block mb-1">AI GenAI SDK</span>
                    <p className="text-slate-600 dark:text-slate-400">`@google/genai` TypeScript SDK memanggil model `gemini-2.5-flash` dengan JSON Response Schema enforcement.</p>
                  </div>

                  <div className={`p-3 rounded-xl border-2 border-slate-900 ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
                    <span className="text-rose-600 dark:text-rose-400 font-black block mb-1">Zero Downtime Fallback Engine</span>
                    <p className="text-slate-600 dark:text-slate-400">Algoritma fallback otomatis mengembalikan data proposal realistis saat kuota API habis atau HTTP 429.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 4: DATA & SECURITY */}
          {activeSection === 'data' && (
            <div className="space-y-4 animate-fadeIn">
              <div className={`p-4 sm:p-5 rounded-2xl border-3 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a] ${
                isDark ? 'bg-slate-800' : 'bg-emerald-50/90'
              }`}>
                <h3 className="font-black text-lg text-slate-900 dark:text-emerald-300 mb-2 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-emerald-600 dark:text-emerald-300" />
                  <span>Keamanan Data & Privasi Pengguna</span>
                </h3>
                <p className="text-xs sm:text-sm font-bold leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
                  CorPlan memprioritaskan keamanan data bisnis pengguna dengan mengadopsi model *Client-Side Local Storage*. Semua angka keuangan dan rencana rahasia perusahaan tersimpan di browser lokal Anda tanpa disimpan di database pihak ketiga.
                </p>

                <div className="flex flex-wrap gap-2 text-xs font-black">
                  <span className="px-3 py-1.5 bg-white dark:bg-slate-900 border-2 border-slate-900 rounded-xl shadow-[2px_2px_0px_0px_#0f172a] flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Privasi Lokal Terjamin</span>
                  </span>
                  <span className="px-3 py-1.5 bg-white dark:bg-slate-900 border-2 border-slate-900 rounded-xl shadow-[2px_2px_0px_0px_#0f172a] flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-amber-500" />
                    <span>Tanpa Registrasi Rumit</span>
                  </span>
                  <span className="px-3 py-1.5 bg-white dark:bg-slate-900 border-2 border-slate-900 rounded-xl shadow-[2px_2px_0px_0px_#0f172a] flex items-center gap-1.5">
                    <Printer className="w-4 h-4 text-indigo-600" />
                    <span>Ekspor PDF & Pitch Deck Lengkap</span>
                  </span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className={`p-4 border-t-2 border-slate-900 dark:border-white/20 flex items-center justify-between text-xs font-bold ${
          isDark ? 'bg-slate-900 text-slate-400' : 'bg-slate-100 text-slate-600'
        }`}>
          <span>CorPlan AI Enterprise Proposal Specification Blueprint v2.5</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 text-white rounded-xl font-bold border border-slate-700 hover:bg-slate-800 transition cursor-pointer"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};
