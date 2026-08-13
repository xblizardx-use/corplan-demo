import React, { useState } from 'react';
import { 
  BookOpen, 
  HelpCircle, 
  Lightbulb, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Calculator, 
  CheckCircle2, 
  GraduationCap,
  ArrowRight
} from 'lucide-react';
import { BeginnerGuide, FinancialModel } from '../types';

interface BeginnerGuideViewProps {
  guide?: BeginnerGuide;
  financialModel?: FinancialModel;
  businessName?: string;
  onSwitchToProfessional?: () => void;
}

export const BeginnerGuideView: React.FC<BeginnerGuideViewProps> = ({
  guide,
  financialModel,
  businessName = 'Bisnis Anda',
  onSwitchToProfessional,
}) => {
  const [openGlossaryIdx, setOpenGlossaryIdx] = useState<number | null>(0);
  const [openCalcIdx, setOpenCalcIdx] = useState<number | null>(0);

  // Default rich fallback guide for beginners
  const activeGuide: BeginnerGuide = guide || {
    simpleSummary: `Secara sederhana, **${businessName}** adalah usaha yang dirancang untuk menghasilkan keuntungan harian & bulanan yang stabil. Prinsip utamanya: kamu mengeluarkan modal awal untuk menyiapkan tempat & alat, lalu tiap bulan hasil penjualan produk akan dipakai untuk bayar biaya rutin (gaji, sewa, listrik), dan sisanya menjadi keuntungan bersih di kantong kamu!`,
    analogies: [
      {
        concept: 'CapEx (Modal Awal Peralatan)',
        plainExplanation: 'Uang yang cuma kamu keluarkan di awal untuk beli barang yang terpakai bertahun-tahun.',
        simpleAnalogy: 'Seperti beli kompor, gerobak, mesin kopi, atau renovasi toko di hari pertama.'
      },
      {
        concept: 'OpEx (Biaya Operasional Bulanan)',
        plainExplanation: 'Uang wajib yang harus dibayar tiap bulan agar toko tetap bisa buka.',
        simpleAnalogy: 'Seperti bayar uang sewa bulanan, tagihan listrik, internet, dan gaji karyawan.'
      },
      {
        concept: 'BEP / Break-Even Point (Titik Impas)',
        plainExplanation: 'Kondisi di mana jualan kamu pas-pasan menutup semua biaya bulanan, alias tidak rugi dan tidak untung.',
        simpleAnalogy: 'Kalau biaya bulanan kamu Rp 5 juta, dan kamu untung Rp 10.000 per porsi, kamu wajib jual 500 porsi per bulan supaya tidak nombok!'
      },
      {
        concept: 'Gross Margin (Margin Keuntungan Kotor)',
        plainExplanation: 'Persentase keuntungan murni dari satu porsi/unit setelah dikurangi bahan baku.',
        simpleAnalogy: 'Kamu jual es kopi harga Rp 18.000, modal bubuk kopi + susu + gelas hanya Rp 7.000. Untung kotor kamu Rp 11.000 (Margin 61%).'
      }
    ],
    calculationGuides: [
      {
        metricName: 'Cara Hitung Titik Impas (BEP Bulanan)',
        formulaSimple: 'BEP (Unit) = Total Biaya Rutin Bulanan ÷ Keuntungan Kotor Per Porsi',
        stepByStepExample: 'Langkah 1: Hitung Biaya Sewa + Gaji = Rp 4.500.000/bulan.\nLangkah 2: Hitung Untung Kotor per porsi = Harga Jual (Rp 18.000) - Bahan Baku (Rp 7.000) = Rp 11.000.\nLangkah 3: Bagi Rp 4.500.000 ÷ Rp 11.000 = 409,09. Artinya, kamu harus jual minimal 410 porsi per bulan agar tidak rugi!'
      },
      {
        metricName: 'Cara Hitung Payback Period (Kapan Balik Modal)',
        formulaSimple: 'Waktu Balik Modal = Total Modal Awal ÷ Keuntungan Bersih per Bulan',
        stepByStepExample: 'Jika Modal Awal kamu Rp 45.000.000 dan perkiraan Keuntungan Bersih setelah dikurangi semua biaya adalah Rp 6.500.000/bulan, maka Rp 45.000.000 ÷ Rp 6.500.000 = ±7 Bulan. Artinya di bulan ke-8 uang modal kamu sudah kembali 100%!'
      },
      {
        metricName: 'Cara Hitung TAM / SAM / SOM (Potensi Pembeli)',
        formulaSimple: 'TAM = Semua Orang | SAM = Orang di Kotamu | SOM = Target Realistis Tokomu',
        stepByStepExample: 'TAM: Ada 1.000.000 penikmat kopi di Indonesia.\nSAM: Ada 100.000 penikmat kopi di kota tempat tokomu buka.\nSOM: Tokomu menargetkan mengambil 5% pasar kota = 5.000 pelanggan setia per bulan!'
      }
    ],
    beginnerGlossary: [
      {
        term: 'TAM (Total Addressable Market)',
        simpleMeaning: 'Total seluruh potensi pembeli jika tidak ada pesaing sama sekali di seluruh wilayah.',
        whyItMatters: 'Membantu melihat seberapa raksasa potensi industri yang kamu masuki.'
      },
      {
        term: 'SAM (Serviceable Addressable Market)',
        simpleMeaning: 'Jumlah pembeli yang terjangkau oleh wilayah operasional atau kapasitas tokomu.',
        whyItMatters: 'Mencegah kamu terlalu berkhayal dan membuat target pasar lebih masuk akal.'
      },
      {
        term: 'SOM (Serviceable Obtainable Market)',
        simpleMeaning: 'Target pelanggan nyata yang realistis kamu dapatkan dalam 1-2 tahun pertama.',
        whyItMatters: 'Menjadi patokan utama membuat target penjualan harian & bulanan.'
      },
      {
        term: 'SWOT Analysis',
        simpleMeaning: 'Pemetaan Kekuatan (Strengths), Kelemahan (Weaknesses), Peluang (Opportunities), dan Ancaman (Threats).',
        whyItMatters: 'Agar kamu tahu keunggulan tokomu dan siap menghadapi risiko sebelum rugi.'
      },
      {
        term: 'PESTEL Analysis',
        simpleMeaning: 'Mengecek kondisi luar bisnis: Politik, Ekonomi, Sosial, Teknologi, Lingkungan, dan Hukum.',
        whyItMatters: 'Memastikan bisnismu tidak melanggar aturan hukum dan sesuai tren masa kini.'
      }
    ]
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Top Banner Mode Pemula */}
      <div className="bg-[#dbeafe] border-2 border-slate-900 rounded-3xl p-5 sm:p-6 shadow-[6px_6px_0px_0px_#0f172a] space-y-4">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="bg-[#fef08a] text-slate-900 border-2 border-slate-900 px-3 py-1 rounded-xl text-xs font-black shadow-[2px_2px_0px_0px_#0f172a] inline-flex items-center gap-1.5 uppercase">
              <GraduationCap className="w-4 h-4 text-slate-900" />
              <span>PANDUAN PEMULA BISNIS</span>
            </span>
            <span className="bg-blue-600 text-white text-[11px] font-extrabold px-2.5 py-0.5 rounded-lg border border-slate-900">
              Bahasa Santai & Sederhana
            </span>
          </div>

          {onSwitchToProfessional && (
            <button
              onClick={onSwitchToProfessional}
              className="bg-white hover:bg-slate-100 text-slate-900 border-2 border-slate-900 px-3.5 py-1.5 rounded-xl text-xs font-black shadow-[2px_2px_0px_0px_#0f172a] transition cursor-pointer flex items-center gap-1.5"
            >
              <span>Lihat Format Investor / Profesional</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Ringkasan Bisnis dalam Bahasa Sehari-Hari
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-slate-700 mt-1 leading-relaxed">
            Tidak perlu pusing dengan istilah keuangan yang rumit. Di bawah ini adalah penjelasan logis bisnis **{businessName}** dengan bahasa yang mudah dipahami siapa saja.
          </p>
        </div>

        {/* Executive Simple Summary Card */}
        <div className="bg-white border-2 border-slate-900 rounded-2xl p-4 sm:p-5 shadow-[3px_3px_0px_0px_#0f172a] text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed">
          <span className="text-amber-500 font-black block mb-1">💡 Inti Konsep Bisnis Ini:</span>
          {activeGuide.simpleSummary}
        </div>
      </div>

      {/* Analogies & Concepts Section */}
      <div className="bg-white border-2 border-slate-900 rounded-3xl p-5 sm:p-6 shadow-[6px_6px_0px_0px_#0f172a] space-y-4">
        <div className="border-b-2 border-slate-900 pb-3 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-500" />
          <h3 className="text-base sm:text-lg font-black text-slate-900">
            Analogi Istilah Bisnis (Memahami dengan Bayangan Warung/Toko)
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {activeGuide.analogies.map((item, idx) => (
            <div 
              key={idx} 
              className="bg-slate-50 border-2 border-slate-900 rounded-2xl p-4 shadow-[3px_3px_0px_0px_#0f172a] space-y-2 hover:bg-amber-50/40 transition"
            >
              <span className="bg-[#0f172a] text-white border border-slate-900 px-2.5 py-0.5 rounded-lg text-[11px] font-black inline-block uppercase">
                {item.concept}
              </span>
              <p className="text-xs font-extrabold text-slate-900">
                {item.plainExplanation}
              </p>
              <div className="bg-amber-100/70 border border-amber-300 rounded-xl p-2.5 text-[11px] font-semibold text-slate-800 leading-relaxed">
                <span className="font-black text-amber-900">💡 Analogi Toko: </span>
                {item.simpleAnalogy}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How to Calculate Step-by-Step */}
      <div className="bg-white border-2 border-slate-900 rounded-3xl p-5 sm:p-6 shadow-[6px_6px_0px_0px_#0f172a] space-y-4">
        <div className="border-b-2 border-slate-900 pb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-indigo-600" />
            <h3 className="text-base sm:text-lg font-black text-slate-900">
              Bagaimana Cara Menghitung Angkanya? (Panduan Langkah demi Langkah)
            </h3>
          </div>
          <span className="bg-[#fef08a] border border-slate-900 px-2.5 py-0.5 rounded-lg text-[10px] font-black text-slate-900">
            Paling Sering Ditanyakan
          </span>
        </div>

        <div className="space-y-3">
          {activeGuide.calculationGuides.map((calc, idx) => {
            const isOpen = openCalcIdx === idx;
            return (
              <div 
                key={idx} 
                className="bg-slate-50 border-2 border-slate-900 rounded-2xl overflow-hidden shadow-[3px_3px_0px_0px_#0f172a]"
              >
                <button
                  onClick={() => setOpenCalcIdx(isOpen ? null : idx)}
                  className="w-full text-left p-4 bg-white hover:bg-slate-50 transition flex items-center justify-between gap-3 font-black text-xs sm:text-sm text-slate-900 cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#fef08a] border border-slate-900 text-slate-900 text-[11px] font-black flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span>{calc.metricName}</span>
                  </span>
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {isOpen && (
                  <div className="p-4 border-t-2 border-slate-900 bg-slate-50 space-y-3 text-xs">
                    <div className="bg-[#dcfce7] border border-slate-900 p-3 rounded-xl font-mono font-bold text-slate-900">
                      📌 Rumus Sederhana: {calc.formulaSimple}
                    </div>

                    <div className="space-y-1.5 font-semibold text-slate-800 leading-relaxed whitespace-pre-line bg-white border border-slate-900 p-3 rounded-xl">
                      {calc.stepByStepExample}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Beginner Glossary */}
      <div className="bg-white border-2 border-slate-900 rounded-3xl p-5 sm:p-6 shadow-[6px_6px_0px_0px_#0f172a] space-y-4">
        <div className="border-b-2 border-slate-900 pb-3 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-emerald-600" />
          <h3 className="text-base sm:text-lg font-black text-slate-900">
            Glosarium & Kamus Istilah Bisnis Pemula
          </h3>
        </div>

        <div className="space-y-2.5">
          {activeGuide.beginnerGlossary.map((glo, idx) => {
            const isOpen = openGlossaryIdx === idx;
            return (
              <div 
                key={idx}
                className="bg-slate-50 border-2 border-slate-900 rounded-2xl p-3.5 shadow-[2px_2px_0px_0px_#0f172a] space-y-1.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-black text-xs sm:text-sm text-slate-900">
                    📚 {glo.term}
                  </span>
                  <span className="text-[10px] font-bold text-slate-500">
                    Artinya Apa?
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-800 leading-relaxed">
                  {glo.simpleMeaning}
                </p>
                <div className="bg-blue-50 border border-blue-200 p-2 rounded-lg text-[11px] font-medium text-slate-700">
                  <span className="font-bold text-blue-900">Mengapa Ini Penting? </span>
                  {glo.whyItMatters}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
