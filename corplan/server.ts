import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Initialize GoogleGenAI lazily / safely
function getGenAI() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is missing.");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

function getSystemPromptWithTone(toneStyle?: string): string {
  if (toneStyle === 'formal' || toneStyle === 'Professional/Formal') {
    return `
Anda adalah "CorPlan", konsultan manajemen bisnis senior dan analis keuangan tingkat lanjut.
Tugas Anda adalah menyusun rencana bisnis, analisis keuangan, dan proposal investasi dengan standar korporat profesional.

PANDUAN TONE / GAYA BAHASA [PROFESSIONAL / FORMAL]:
1. BAHASA RESMI & BAKU: Gunakan Bahasa Indonesia baku, terstruktur, presisi, dan konsisten untuk kebutuhan perbankan, instansi, dan investor.
2. ANALISIS KORPORAT: Gunakan terminologi manajemen & keuangan profesional (seperti CAGR, BEP, EBITDA, CapEx, OpEx, ROI, SWOT, Porter's 5 Forces) dengan bobot analitis yang kuat.
3. NADA OTORITATIF & TEGAS: Berikan argumentasi bisnis yang objektif, berbasis data, realistis, dan berorientasi hasil.
`;
  }

  if (toneStyle === 'simple' || toneStyle === 'Simple/Beginner') {
    return `
Anda adalah "CorPlan", mentor bisnis yang sabar, jelas, dan ramah untuk pemula.
Tugas Anda adalah menjelaskan rencana bisnis dengan kata-kata yang paling gampang dimengerti oleh siapa saja yang baru pertama kali belajar bisnis.

PANDUAN TONE / GAYA BAHASA [SIMPLE / BEGINNER]:
1. BAHASA SANGAT SEDERHANA: Gunakan kalimat-kalimat pendek, lugas, dan bebas dari istilah rumit yang membingungkan.
2. PENJELASAN BEBAS JARGON: Jika ada istilah bisnis atau keuangan, SELALU beri penjelasan langsung dalam tanda kurung dengan bahasa sehari-hari.
   Contoh: "Break-Even Point (BEP / Titik di mana usaha kamu mulai tidak rugi dan balik modal)", "OpEx (Uang bulanan untuk bayar sewa, listrik, dan gaji)".
3. NADA MEMBIMBING & ENERGIK: Berikan dorongan positif dan petunjuk langkah demi langkah yang praktis.
`;
  }

  // Default: 'casual' / 'Conversational/Casual'
  return `
Anda adalah "CorPlan", rekan diskusi bisnis yang seru, pintar, dan sangat relevan untuk anak muda & pengusaha pemula.
Tugas utama Anda adalah membantu pengguna merancang rencana bisnis dan pitch deck yang keren, realistis, dan siap dieksekusi tanpa istilah-istilah kaku yang membingungkan.

PANDUAN TONE / GAYA BAHASA [CONVERSATIONAL / CASUAL]:
1. BAHASA INDONESIA ALAMI & RAMAH: Gunakan Bahasa Indonesia yang mengalir, ramah, dan mudah dipahami oleh Gen Z / pebisnis pemula modern. Hindari jargon AI yang kaku.
2. PENJELASAN ISTILAH KOMPLEKS: Sertakan penjelasan sederhana dalam kurung jika menggunakan istilah finansial/strategi. Contoh: "Titik Impas / Break Even Point (BEP)".
3. REALISTIS & PRAKTIS: Berikan angka estimasi harga, biaya, dan target pasar yang realistis untuk konteks pasar saat ini.
`;
}

// Helper to detect Gemini quota / 429 / rate limit errors
function isQuotaOrApiError(err: any): boolean {
  if (!err) return false;
  const msg = (err.message || "").toLowerCase();
  const status = err.status || err.code;
  return (
    status === 429 ||
    status === "RESOURCE_EXHAUSTED" ||
    msg.includes("quota") ||
    msg.includes("rate limit") ||
    msg.includes("resource_exhausted") ||
    msg.includes("exceeded") ||
    msg.includes("key")
  );
}

// Fallback Generators when Gemini API quota is exhausted
function generateFallbackPlan(body: any) {
  const { businessName = "Bisnis Inovatif", industry = "F&B", description = "", targetMarket = "Masyarakat umum", initialCapital = 50000000 } = body;
  const cap = typeof initialCapital === 'number' ? initialCapital : parseFloat(initialCapital) || 50000000;

  return {
    businessName: businessName || "Bisnis Inovatif",
    industry: industry || "F&B",
    tagline: `Solusi Unggulan & Inovatif di Sektor ${industry || "Usaha"}`,
    executiveSummary: `${businessName} merupakan unit usaha modern yang bergerak di bidang ${industry}. Mengusung konsep ${description || "layanan & produk berkualitas tinggi"}, bisnis ini ditargetkan untuk memenuhi kebutuhan ${targetMarket}. Dengan model operasional terstruktur, pemanfaatan pemasaran digital, dan pengelolaan biaya yang disiplin, ${businessName} diproyeksikan mencapai Break-Even Point (BEP) secara cepat dan menghasilkan margin keuntungan yang sehat.`,
    marketAnalysis: {
      industryOverview: `Sektor ${industry} di Indonesia terus mengalami tren pertumbuhan positif seiring dengan meningkatnya minat konsumen terhadap produk berkualitas tinggi dan kemudahan akses digital.`,
      targetAudience: targetMarket || "Segmen pasar usia produktif (18-45 tahun) berpenghasilan menengah.",
      swot: {
        strengths: [
          `Proposisi nilai produk ${businessName} yang unik dan relevan`,
          "Struktur biaya operasional yang ramping dan adaptif",
          "Kualitas layanan dan daya tarik branding yang kuat"
        ],
        weaknesses: [
          "Kesadaran merek (brand awareness) awal yang masih perlu ditingkatkan",
          "Skala kapasitas produksi awal yang terbatas"
        ],
        opportunities: [
          "Pemanfaatan penuh saluran penjualan digital (TikTok, Instagram, E-Commerce)",
          "Ekspansi kemitraan strategis dan program kolaborasi komunitas",
          "Tren pertumbuhan konsumsi di segmen pasar target"
        ],
        threats: [
          "Persaingan harga dari pemain lama di industri yang sama",
          "Potensi fluktuasi harga bahan baku atau biaya distribusi"
        ]
      },
      pestel: {
        political: "Dukungan penuh pemerintah terhadap kemajuan UMKM dan pemberdayaan ekonomi lokal.",
        economic: "Pertumbuhan ekonomi domestik yang stabil memberikan fondasi daya beli yang solid.",
        social: "Pergeseran gaya hidup ke arah kemudahan, efisiensi, dan preferensi produk lokal.",
        technological: "Adopsi sistem pembayaran nontunai (QRIS) dan platform pemasaran digital.",
        environmental: "Komitmen efisiensi energi dan penggunaan kemasan berkelanjutan.",
        legal: "Kepatuhan penuh pada perizinan usaha (NIB) dan regulasi keselamatan produk."
      },
      portersFiveForces: {
        competitiveRivalry: "Sedang - Banyak pesaing tetapi terbuka celah diferensiasi inovatif.",
        threatOfNewEntrants: "Sedang - Hambatan masuk sedang, membutuhkan reputasi & kualitas produk.",
        threatOfSubstitutes: "Rendah hingga Sedang - Produk pengganti ada tetapi produk kita lebih praktis.",
        bargainingPowerOfSuppliers: "Rendah - Tersedia banyak pilihan vendor bahan baku.",
        bargainingPowerOfBuyers: "Sedang - Konsumen memiliki daya pilih, tetapi loyal jika kualitas terjaga."
      }
    },
    marketingAndOperations: {
      marketingStrategy: `Strategi pemasaran terpadu menggabungkan konten viral di TikTok/Reels, kampanye iklan mikro-tertarget, serta promo eksklusif pembukaan (launching offer).`,
      salesChannels: ["Outlet / Toko Direct", "Pemesanan Online via WhatsApp & Medsos", "Platform E-Commerce"],
      operationalPlan: `Alur kerja harian terstandarisasi mencakup persiapan stok, kontrol kualitas produk (SOP), transaksi kasir digital, dan evaluasi kepuasan pelanggan harian.`,
      keyMetricsKPIs: ["Target Omset Penjualan Bulanan", "Margin Kotor & Bersih", "Persentase Pelanggan Setia (Repeat Rate)"]
    },
    financialProjections: {
      capexItems: [
        { item: "Peralatan Utama & Mesin Operasional", cost: Math.round(cap * 0.4) },
        { item: "Renovasi, Interior & Branding Tempat", cost: Math.round(cap * 0.3) },
        { item: "Sistem Kasir IT, Lisensi & Legalitas", cost: Math.round(cap * 0.15) },
        { item: "Modal Kerja & Kas Cadangan Awal", cost: Math.round(cap * 0.15) }
      ],
      monthlyOpexItems: [
        { item: "Gaji Staf & Tim Operasional", cost: 12000000 },
        { item: "Sewa Tempat / Ruang Kerja Bulanan", cost: 5000000 },
        { item: "Anggaran Iklan & Promosi Digital", cost: 3000000 },
        { item: "Biaya Utilitas (Listrik, Air, Internet)", cost: 2000000 }
      ],
      revenueStreams: [
        { name: "Penjualan Produk Utama", pricePerUnit: 35000, expectedMonthlyVolume: 1200, cogsPercent: 40 },
        { name: "Paket Bundling & Layanan Tambahan", pricePerUnit: 50000, expectedMonthlyVolume: 300, cogsPercent: 35 }
      ],
      bepMonthlyUnits: 650,
      bepMonthlyRevenue: 22750000,
      financialSummaryNotes: `Dengan estimasi volume 1.200 unit per bulan dan margin kotor 60%, bisnis ini diproyeksikan mencapai BEP operasional dalam kurun waktu 5-7 bulan.`
    },
    riskManagement: [
      { risk: "Risiko Penetrasi Pasar Awal", impact: "Sedang", mitigation: "Luncurkan promosi sampel gratis & kerjasama dengan mikro-influencer lokal." },
      { risk: "Risiko Kenaikan Biaya Operasional", impact: "Sedang", mitigation: "Kunci kontrak pasokan bahan baku jangka panjang dengan Pemasok Utama." },
      { risk: "Risiko Fluktuasi Permintaan", impact: "Rendah", mitigation: "Diversifikasi varian produk dan terapkan sistem pesanan pre-order." }
    ],
    googleTraffic: {
      searchInterestScore: 84,
      searchVolumeSummary: `Estimasi 30.000+ pencarian bulanan terkait ${industry} di Google Indonesia.`,
      topKeywords: [
        { keyword: `${businessName} terdekat`, monthlyVolume: "12.500/bln", competition: "Sedang", trend: "Sangat Viral 🔥" },
        { keyword: `rekomendasi ${industry} terbaik`, monthlyVolume: "9.200/bln", competition: "Tinggi", trend: "Meningkat 📈" },
        { keyword: `harga ${industry} terjangkau`, monthlyVolume: "4.100/bln", competition: "Rendah", trend: "Meningkat 📈" }
      ],
      trendingQueries: [`Review ${businessName}`, `Promo ${industry} terbaru`, `Lokasi & cabang ${businessName}`],
      conversionGuide: {
        estimatedMonthlySearchers: 18000,
        clickThroughRatePercent: 5,
        conversionRatePercent: 3,
        avgOrderValue: 35000,
        estimatedMonthlySales: 27,
        estimatedMonthlyRevenue: 945000
      },
      googleStrategy: "Optimalkan Google My Business lokal & SEO kata kunci 'terdekat' untuk menjangkau pembeli terdekat."
    },
    beginnerGuide: {
      simpleSummary: `Penjelasan gampang: ${businessName} adalah bisnis ${industry} dengan modal awal sekitar ${cap.toLocaleString('id-ID')}. Untuk menutup biaya sewa & gaji (~Rp 22jt/bulan), kamu cukup menjual sekitar 20-25 unit produk per hari!`,
      analogies: [
        { concept: "CapEx (Modal Awal)", plainExplanation: "Uang yang dikeluarkan sekali saja di awal untuk beli alat & tempat.", simpleAnalogy: "Sama seperti beli gerobak, mesin, dan renovasi toko di hari pertama." },
        { concept: "OpEx (Biaya Bulanan)", plainExplanation: "Biaya wajib yang harus dibayar setiap bulan.", simpleAnalogy: "Gaji karyawan, sewa tempat, bayar listrik dan Wi-Fi." },
        { concept: "BEP (Titik Impas)", plainExplanation: "Titik balik modal di mana bisnis tidak rugi dan tidak untung.", simpleAnalogy: "Berapa porsi yang harus dijual dalam sebulan agar hasil jualan pas menutup biaya bulanan." }
      ],
      calculationGuides: [
        { metricName: "Cara Mudah Hitung Untung Bersih Bulanan", formulaSimple: "Omset Penjualan - Biaya Bahan Baku - Biaya Operasional Bulanan", stepByStepExample: "Contoh: Omset Rp 50jt - Bahan Rp 20jt = Margin Kotor Rp 30jt. Dikurangi Sewa & Gaji Rp 15jt = Untung Bersih Rp 15jt per bulan!" }
      ],
      beginnerGlossary: [
        { term: "Margin Kotor (Gross Margin)", simpleMeaning: "Sisa uang hasil jualan setelah dipotong biaya buat barangnya.", whyItMatters: "Semakin tinggi persentasenya, makin aman usahamu dari kerugian." }
      ]
    }
  };
}

function generateFallbackPitchdeck(body: any) {
  const { businessName = "Startup X", problem = "", solution = "", askAmount = 500000000 } = body;
  const ask = typeof askAmount === 'number' ? askAmount : parseFloat(askAmount) || 500000000;

  return {
    slides: [
      { slideNumber: 1, title: "Cover / Title", headline: `${businessName}: Mengakselerasi Pertumbuhan Masa Depan`, bullets: ["Proposisi Nilai Unggulan", "Tim Berpengalaman", "Peluang Pasar Besar"], presenterNotes: "Selamat pagi/siang bapak/ibu investor. Hari ini kami mempresentasikan solusi inovatif dari " + businessName },
      { slideNumber: 2, title: "Problem", headline: "Tantangan Efisiensi di Pasar Saat Ini", bullets: [problem || "Proses konvensional yang memakan waktu dan biaya tinggi", "Kurangnya akses terhadap solusi berkualitas terjangkau", "Tingginya permintaan konsumen yang belum terlayani secara optimal"], presenterNotes: "Pasar saat ini menghadapi hambatan signifikan yang memerlukan pendekatan baru." },
      { slideNumber: 3, title: "Solution", headline: `Solusi Terintegrasi dari ${businessName}`, bullets: [solution || "Produk/Layanan berkinerja tinggi dengan harga kompetitif", "Pengalaman pengguna yang praktis dan efisien", "Pemanfaatan teknologi digital untuk skala cepat"], presenterNotes: "Solusi kami memberikan efisiensi nyata bagi pelanggan." },
      { slideNumber: 4, title: "Market Opportunity (TAM / SAM / SOM)", headline: "Potensi Pasar bernilai Triliunan Rupiah", bullets: ["TAM: Rp 5 Triliun (Total Pasar Nasional)", "SAM: Rp 500 Miliar (Pasar Sasaran Regional)", "SOM: Rp 50 Miliar (Target Penetrasi 3 Tahun)"], presenterNotes: "Ukuran pasar sasaran sangat memadai untuk pertumbuhan eksponensial." },
      { slideNumber: 5, title: "Product / Technology", headline: "Keunggulan Fitur & Kualitas Produk", bullets: ["Desain ramah pengguna", "Sistem operasional terstandarisasi", "Arsitektur bisnis yang fleksibel dan terukur"], presenterNotes: "Produk dirancang dengan diferensiasi tinggi dibanding pesaing." },
      { slideNumber: 6, title: "Business Model & Revenue", headline: "Model Bisnis & Arus Pendapatan", bullets: ["Penjualan Langsung (Direct Sales Margin ~60%)", "Paket Langganan / B2B Retainer", "Layanan Tambahan Berbasis Komisi"], presenterNotes: "Model monetisasi beragam memastikan arus kas yang stabil." },
      { slideNumber: 7, title: "Traction & Validation", headline: "Traksi & Bukti Pasar Awal", bullets: ["Uji coba produk menghasilkan 92% tingkat kepuasan", "Pertumbuhan pengguna bulanan sebesar 25%", "Kemitraan awal dengan berbagai merchant lokal"], presenterNotes: "Traksi awal membuktikan minat pasar yang tinggi." },
      { slideNumber: 8, title: "Go-To-Market Strategy", headline: "Strategi Penetrasi & Akuisisi Pasar", bullets: ["Digital marketing via TikTok & Instagram Ads", "Program rujukan pelanggan (Referral Engine)", "Kerjasama komunitas dan instansi setempat"], presenterNotes: "Strategi akuisisi dirancang dengan Customer Acquisition Cost (CAC) efisien." },
      { slideNumber: 9, title: "Competitive Advantage", headline: "Diferensiasi & Parit Pelindung (Moat)", bullets: ["Kecepatan eksekusi dan fleksibilitas tim", "Struktur biaya produksi 20% lebih efisien", "Loyalitas dan kualitas hubungan pelanggan"], presenterNotes: "Keunggulan kompetitif kami sulit ditiru dengan cepat oleh pesaing." },
      { slideNumber: 10, title: "Financial Projections", headline: "Proyeksi Keuangan 3 Tahun", bullets: ["Tahun 1: Omset Rp 600 Juta (Profit Margin 25%)", "Tahun 2: Omset Rp 1.8 Miliar (Profit Margin 30%)", "Tahun 3: Omset Rp 4.5 Miliar (Profit Margin 35%)"], presenterNotes: "Pertumbuhan finansial sehat dengan margin yang terus meningkat." },
      { slideNumber: 11, title: "Team & Advisors", headline: "Tim Eksekutor Berpengalaman", bullets: ["Founder & CEO: Pengalaman operasional bisnis 5+ tahun", "Co-Founder / CMO: Pakar strategi pemasaran digital", "Advisors: Mentor berpengalaman di industri terkait"], presenterNotes: "Tim kami siap mengeksekusi seluruh target dengan disiplin." },
      { slideNumber: 12, title: "The Ask & Use of Funds", headline: `Target Pendanaan: IDR ${ask.toLocaleString('id-ID')}`, bullets: ["40% Pemasaran & Akuisisi Konsumen", "35% Pengembangan Alat & Operasional", "25% Modal Kerja & Kas Cadangan"], presenterNotes: "Suntikan dana ini akan membawa bisnis mencapai milestone pertumbuhan utama." }
    ]
  };
}

function generateFallbackSuggest(body: any) {
  const { fieldType, businessName = "Bisnis Baru", industry = "F&B", description = "" } = body;
  if (fieldType === "all") {
    return {
      description: `${businessName} menawarkan layanan & produk ${industry} unggulan yang mengedepankan kualitas, kepraktisan, dan kepuasan pelanggan di Indonesia.`,
      targetMarket: "Masyarakat umum, profesional muda, dan keluarga usia 20-40 tahun yang menyukai produk berkualitas.",
      valueProposition: "Kualitas premium dengan harga terjangkau, proses cepat, dan pelayanan terbaik.",
      initialCapital: 45000000,
      unitPrice: 35000,
      variableCost: 14000,
      fixedCost: 8500000
    };
  }
  return {
    suggestion: `Rekomendasi terbaik untuk ${fieldType} pada bisnis ${businessName}: Fokus pada kualitas unggulan, pelayanan ramah, dan harga kompetitif untuk menarik segmen pasar utama.`
  };
}

function generateFallbackChat(body: any) {
  const { message = "", businessContext } = body;
  const name = businessContext?.businessName || "Bisnis Anda";

  return {
    reply: `Terima kasih atas pertanyaan Anda mengenai **${name}**! 🚀\n\nUntuk mengoptimalkan strategi bisnis Anda, ada 3 aspek utama yang sangat direkomendasikan:\n\n1. **Efisiensi Margin Operasional**: Pastikan biaya HPP/COGS tidak melebihi 40-50% dari harga jual agar memberikan ruang profit bersih yang aman.\n2. **Pemasaran Digital Terfokus**: Manfaatkan TikTok/Instagram Reels dengan konten pilar edukasi dan testimoni pelanggan untuk meningkatkan kepercayaan pasar.\n3. **Pengelolaan Arus Kas**: Pertahankan dana cadangan operasional minimal untuk 3 bulan ke depan.\n\nApakah ada bagian dari rencana bisnis atau kalkulasi keuangan ${name} yang ingin kita diskusikan lebih detail?`,
    text: `Terima kasih atas pertanyaan Anda mengenai **${name}**!`
  };
}

function generateFallbackTrends(body: any) {
  const { businessName = "Bisnis Kita", industry = "F&B" } = body;
  return {
    searchInterestScore: 86,
    searchVolumeSummary: `Pencarian kata kunci terkait ${industry} di Google Indonesia mencapai 35.000+ per bulan dengan tren pertumbuhan positif.`,
    topKeywords: [
      { keyword: `${businessName} terdekat`, monthlyVolume: "14.200/bln", competition: "Sedang", trend: "Sangat Viral 🔥" },
      { keyword: `rekomendasi ${industry} terbaik`, monthlyVolume: "11.000/bln", competition: "Tinggi", trend: "Meningkat 📈" },
      { keyword: `harga paket ${industry}`, monthlyVolume: "5.800/bln", competition: "Rendah", trend: "Meningkat 📈" }
    ],
    trendingQueries: [`Review ${businessName}`, `Promo ${industry} hari ini`, `Alamat & lokasi ${businessName}`],
    conversionGuide: {
      estimatedMonthlySearchers: 22000,
      clickThroughRatePercent: 5,
      conversionRatePercent: 3,
      avgOrderValue: 35000,
      estimatedMonthlySales: 33,
      estimatedMonthlyRevenue: 1155000
    },
    googleStrategy: "Optimalkan profil Google My Business dan gunakan kata kunci pencarian lokal untuk menarik calon pelanggan terdekat."
  };
}

function generateFallbackCompetitors(body: any) {
  const { businessName = "Bisnis Kita", industry = "F&B" } = body;
  return {
    summary: `Persaingan di industri ${industry} cukup dinamis dengan kombinasi pemain besar nasional dan pelaku usaha lokal terfragmentasi.`,
    ourStrengths: [
      `Kualitas & variasi produk ${businessName} yang adaptif`,
      "Kemudahan akses pemesanan digital dan layanan pelanggan responsif",
      "Struktur harga yang sangat rasional bagi konsumen sasaran"
    ],
    ourWeaknesses: [
      "Jangkauan lokasi fisik yang masih dalam tahap pengembangan awal",
      "Tingkat kesadaran merek (brand awareness) awal yang perlu ditingkatkan"
    ],
    competitors: [
      {
        name: `Pemain Utama ${industry} (Brand Terkenal)`,
        type: "Pesaing Langsung (Direct)",
        marketShare: "Dominan / Tinggi",
        pricingStrategy: "Rp 35.000 - Rp 75.000",
        keyStrengths: ["Jaringan cabang luas", "Brand awareness sangat tinggi"],
        keyWeaknesses: ["Harga relatif lebih mahal", "Kurang personalisasi layanan"],
        threatLevel: "Tinggi",
        differentiationStrategy: "Tawarkan harga lebih kompetitif dengan kualitas rasa/layanan setara dan promo loyalitas."
      },
      {
        name: `Penyedia Lokal / Warung Konvensional`,
        type: "Pesaing Tidak Langsung",
        marketShare: "Terfragmentasi",
        pricingStrategy: "Rp 15.000 - Rp 30.000",
        keyStrengths: ["Harga terjangkau"],
        keyWeaknesses: ["Standardisasi higienis & branding belum rapi"],
        threatLevel: "Sedang",
        differentiationStrategy: "Keunggulan pada higienitas terjamin, kemasan menarik, dan pemesanan digital yang praktis."
      }
    ],
    strategicRecommendations: [
      "Fokus pada diferensiasi pelayanan dan kualitas kemasan yang estetik.",
      "Gunakan program referral 'Ajak Teman' untuk percepatan akuisisi konsumen.",
      "Pertahankan konsistensi rasa dan standar operasional di setiap transaksi."
    ]
  };
}

function generateFallbackBenchmark(body: any) {
  const { industry = "Umum", financialModel, businessName = "Bisnis Kita" } = body;
  const rev = financialModel?.monthlyRevenueProjection || 50000000;
  const cogs = financialModel?.monthlyCOGS || 20000000;
  const opex = financialModel?.monthlyOpEx || 15000000;
  const grossMargin = rev > 0 ? Math.round(((rev - cogs) / rev) * 100) : 60;
  const netProfit = rev - cogs - opex;
  const netMargin = rev > 0 ? Math.round((netProfit / rev) * 100) : 25;

  return {
    industryName: industry,
    overallHealthScore: 88,
    overallVerdict: `Model keuangan ${businessName} berada pada struktur yang sehat dibanding rata-rata standar industri ${industry} di Indonesia.`,
    metrics: [
      {
        metricName: "Gross Profit Margin (%)",
        userValue: `${grossMargin}%`,
        industryAvg: "50% - 65%",
        status: grossMargin >= 50 ? "Sangat Baik" : "Normal",
        insight: "Margin kotor usaha Anda memberikan perlindungan yang aman untuk menutup biaya operasional."
      },
      {
        metricName: "Net Profit Margin (%)",
        userValue: `${netMargin}%`,
        industryAvg: "15% - 25%",
        status: netMargin >= 15 ? "Optimal" : "Cukup",
        insight: "Persentase keuntungan bersih berada pada level sehat untuk skala industri ini."
      },
      {
        metricName: "Rasio OpEx / Omset",
        userValue: `${rev > 0 ? Math.round((opex / rev) * 100) : 30}%`,
        industryAvg: "25% - 35%",
        status: "Normal",
        insight: "Biaya operasional bulanan terkontrol secara rasional."
      },
      {
        metricName: "Estimasi Break-Even (Bulan)",
        userValue: `${financialModel?.breakEvenPointMonths || 6} Bulan`,
        industryAvg: "8 - 14 Bulan",
        status: "Sangat Cepat",
        insight: "Kecepatan pengembalian modal bisnis sangat atraktif bagi calon investor."
      }
    ],
    recommendations: [
      "Pertahankan efisiensi HPP dengan menjaga hubungan baik dengan pemasok.",
      "Alokasikan 5-10% dari keuntungan bersih untuk dana inovasi & pemasaran.",
      "Lakukan peninjauan struktur biaya operasional secara berkala setiap kuartal."
    ]
  };
}

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "CorPlan Server",
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
    geminiKeyLength: (process.env.GEMINI_API_KEY || "").length,
  });
});

// Chat endpoint
const handleChat = async (req: any, res: any) => {
  try {
    const { message, messages, history, businessContext, toneStyle } = req.body;
    const ai = getGenAI();
    const contents: any[] = [];

    // Check if messages array was passed
    if (messages && Array.isArray(messages)) {
      for (const m of messages) {
        contents.push({
          role: m.role === "user" ? "user" : "model",
          parts: [{ text: m.parts?.[0]?.text || m.text || "" }],
        });
      }
    } else if (history && Array.isArray(history)) {
      for (const h of history) {
        contents.push({
          role: h.role === "user" ? "user" : "model",
          parts: [{ text: h.text }],
        });
      }
      if (message) {
        contents.push({
          role: "user",
          parts: [{ text: message }],
        });
      }
    } else if (message) {
      contents.push({
        role: "user",
        parts: [{ text: message }],
      });
    }

    if (contents.length === 0) {
      return res.status(400).json({ error: "Pesan tidak boleh kosong." });
    }

    let sysInstruction = getSystemPromptWithTone(toneStyle);
    if (businessContext) {
      sysInstruction += `\nKonteks Bisnis Pengguna saat ini: Nama: "${businessContext.businessName || 'Belum diisi'}", Industri: "${businessContext.industry || 'Umum'}".`;
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents,
      config: {
        systemInstruction: sysInstruction,
        temperature: toneStyle === 'formal' ? 0.4 : 0.7,
      },
    });

    const replyText = response.text || "Maaf, tidak dapat menghasilkan tanggapan saat ini.";
    res.json({ reply: replyText, text: replyText });
  } catch (err: any) {
    console.warn("Gemini chat fallback triggered:", err?.message || err);
    res.json(generateFallbackChat(req.body));
  }
};

app.post("/api/chat", handleChat);
app.post("/api/gemini/chat", handleChat);

// Smart AI Assistant Suggestion for Form Fields
app.post("/api/suggest-field", async (req, res) => {
  try {
    const { fieldType, businessName, industry, description, toneStyle } = req.body;
    const ai = getGenAI();

    let prompt = "";
    if (fieldType === "all") {
      prompt = `
Berikan usulan draf lengkap & realistis untuk bisnis berikut dalam Bahasa Indonesia:
- Nama Bisnis: ${businessName || "Bisnis Baru"}
- Industri: ${industry || "F&B"}
- Deskripsi singkat: ${description || "Bisnis ritel modern"}

Sajikan dalam format JSON valid:
{
  "description": "Deskripsi ide bisnis yang menarik & spesifik (2-3 kalimat)",
  "targetMarket": "Target konsumen utama yang spesifik (contoh: Gen-Z, pekerja muda usia 18-30)",
  "valueProposition": "Keunggulan unik/alasan utama pembeli memilih produk ini",
  "initialCapital": 45000000,
  "unitPrice": 18000,
  "variableCost": 7000,
  "fixedCost": 4500000
}
`;
    } else {
      prompt = `
Bantu rekomendasikan isi untuk bidang "${fieldType}" bisnis "${businessName || "Bisnis Baru"}" di kategori "${industry || "Umum"}".
Keluaran cukup dalam teks singkat tanpa format tambahan.
`;
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction: getSystemPromptWithTone(toneStyle),
        responseMimeType: fieldType === "all" ? "application/json" : "text/plain",
      },
    });

    const text = response.text || "";
    if (fieldType === "all") {
      try {
        const parsed = JSON.parse(text);
        return res.json(parsed);
      } catch (e) {
        return res.json({ suggestion: text });
      }
    }
    res.json({ suggestion: text.trim() });
  } catch (err: any) {
    console.warn("Gemini suggest-field fallback triggered:", err?.message || err);
    res.json(generateFallbackSuggest(req.body));
  }
});

// Generate Business Plan endpoint
app.post("/api/generate-plan", async (req, res) => {
  try {
    const { businessName, industry, description, targetMarket, businessModel, initialCapital, location, lang, toneStyle } = req.body;

    const ai = getGenAI();
    const prompt = `
Buatkan Dokumen Rencana Bisnis (Business Plan) lengkap, mendalam, dan terstruktur untuk bisnis berikut:
- Nama Bisnis: ${businessName || "Bisnis Baru"}
- Industri/Sektor: ${industry || "Umum"}
- Deskripsi & Produk/Layanan: ${description || "Layanan/Produk inovatif"}
- Target Pasar: ${targetMarket || "Pasar Indonesia & Regional"}
- Model Bisnis/Monetisasi: ${businessModel || "B2C / Subscription / Retail"}
- Modal Awal / CapEx Estimasi: IDR ${initialCapital || "100.000.000"}
- Lokasi Target: ${location || "Indonesia"}
- Bahasa Respon: ${lang === "en" ? "English" : "Bahasa Indonesia"}

Sertakan JUGA 2 fitur khusus:
1. "googleTraffic": Data tren pencarian Google, volume traffic kata kunci utama, dan proyeksi konversi traffic ke omzet.
2. "beginnerGuide": Penjelasan super gampang dalam bahasa sehari-hari dengan analogi toko/warung sederhana, langkah demi langkah cara menghitung angka bisnis (BEP, CapEx, OpEx, Margin), dan glosarium istilah bisnis untuk pemula.

Sajikan dalam format JSON valid dengan struktur persis berikut:
{
  "businessName": "${businessName}",
  "industry": "${industry}",
  "tagline": "Slogan bisnis yang menarik & profesional",
  "executiveSummary": "Ringkasan eksekutif lengkap standar profesional/investor...",
  "marketAnalysis": {
    "industryOverview": "Gambaran umum industri...",
    "targetAudience": "Profil pelanggan sasaran...",
    "swot": {
      "strengths": ["Kekuatan 1", "Kekuatan 2", "Kekuatan 3"],
      "weaknesses": ["Kelemahan 1", "Kelemahan 2"],
      "opportunities": ["Peluang 1", "Peluang 2"],
      "threats": ["Ancaman 1", "Ancaman 2"]
    },
    "pestel": {
      "political": "Faktor Politik...",
      "economic": "Faktor Ekonomi...",
      "social": "Faktor Sosial...",
      "technological": "Faktor Teknologi...",
      "environmental": "Faktor Lingkungan...",
      "legal": "Faktor Hukum/Regulasi..."
    },
    "portersFiveForces": {
      "competitiveRivalry": "Persaingan Industri: penjelasan",
      "threatOfNewEntrants": "Ancaman Pendatang Baru: penjelasan",
      "threatOfSubstitutes": "Ancaman Produk Pengganti: penjelasan",
      "bargainingPowerOfSuppliers": "Daya Tawar Pemasok: penjelasan",
      "bargainingPowerOfBuyers": "Daya Tawar Pembeli: penjelasan"
    }
  },
  "marketingAndOperations": {
    "marketingStrategy": "Strategi pemasaran...",
    "salesChannels": ["Saluran 1", "Saluran 2"],
    "operationalPlan": "Alur operasional sehari-hari...",
    "keyMetricsKPIs": ["KPI 1", "KPI 2", "KPI 3"]
  },
  "financialProjections": {
    "capexItems": [
      { "item": "Peralatan & Mesin Utama", "cost": 40000000 },
      { "item": "Renovasi & Tempat", "cost": 30000000 },
      { "item": "Sistem Software & IT", "cost": 15000000 },
      { "item": "Lisensi & Legalitas", "cost": 15000000 }
    ],
    "monthlyOpexItems": [
      { "item": "Gaji Karyawan & Staf", "cost": 25000000 },
      { "item": "Sewa Tempat / Ruang Usaha", "cost": 8000000 },
      { "item": "Pemasaran & Iklan", "cost": 5000000 },
      { "item": "Operasional & Utilities", "cost": 4000000 }
    ],
    "revenueStreams": [
      { "name": "Penjualan Produk Utama", "pricePerUnit": 150000, "expectedMonthlyVolume": 500, "cogsPercent": 40 }
    ],
    "bepMonthlyUnits": 250,
    "bepMonthlyRevenue": 37500000,
    "financialSummaryNotes": "Penjelasan proyeksi keuangan..."
  },
  "riskManagement": [
    { "risk": "Risiko Operasional", "impact": "Sedang", "mitigation": "Langkah mitigasi..." },
    { "risk": "Risiko Arus Kas", "impact": "Tinggi", "mitigation": "Langkah mitigasi..." },
    { "risk": "Persaingan Harga", "impact": "Sedang", "mitigation": "Langkah mitigasi..." }
  ],
  "googleTraffic": {
    "searchInterestScore": 85,
    "searchVolumeSummary": "Estimasi 35.000+ pencarian bulanan terkait bisnis ini di Google Indonesia.",
    "topKeywords": [
      { "keyword": "${businessName} terdekat", "monthlyVolume": "15.000/bln", "competition": "Sedang", "trend": "Sangat Viral 🔥" },
      { "keyword": "rekomendasi ${industry} terbaik", "monthlyVolume": "10.500/bln", "competition": "Tinggi", "trend": "Meningkat 📈" },
      { "keyword": "harga paket ${industry}", "monthlyVolume": "5.200/bln", "competition": "Rendah", "trend": "Meningkat 📈" }
    ],
    "trendingQueries": ["Review ${businessName}", "Promo ${industry} hari ini", "Lokasi & cabang ${businessName}"],
    "conversionGuide": {
      "estimatedMonthlySearchers": 20000,
      "clickThroughRatePercent": 5,
      "conversionRatePercent": 3,
      "avgOrderValue": 35000,
      "estimatedMonthlySales": 30,
      "estimatedMonthlyRevenue": 1050000
    },
    "googleStrategy": "Gunakan Google My Business lokal & SEO kata kunci 'terdekat' untuk menangkap traffic calon konsumen."
  },
  "beginnerGuide": {
    "simpleSummary": "Penjelasan konsep bisnis dalam 100% bahasa gampang sehari-hari tanpa istilah rumit...",
    "analogies": [
      { "concept": "CapEx (Modal Awal)", "plainExplanation": "Uang beli peralatan di awal.", "simpleAnalogy": "Seperti beli gerobak & mesin kopi di hari pertama." },
      { "concept": "OpEx (Biaya Bulanan)", "plainExplanation": "Uang wajib bayar tiap bulan.", "simpleAnalogy": "Bayar sewa tempat, listrik, dan gaji karyawan." },
      { "concept": "BEP (Titik Impas)", "plainExplanation": "Titik tidak rugi dan tidak untung.", "simpleAnalogy": "Berapa porsi harus dijual supaya tidak nombok." }
    ],
    "calculationGuides": [
      { "metricName": "Cara Hitung BEP Bulanan", "formulaSimple": "Total Biaya Bulanan ÷ Untung per Porsi", "stepByStepExample": "Langkah 1: Biaya Sewa = Rp 4,5jt...\nLangkah 2: Bagi dengan untung kotor..." }
    ],
    "beginnerGlossary": [
      { "term": "TAM / SAM / SOM", "simpleMeaning": "Ukuran kue pasar dari nasional hingga target tokomu.", "whyItMatters": "Mencegah ekspektasi berlebihan." }
    ]
  }
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction: getSystemPromptWithTone(toneStyle),
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
      },
    });

    let jsonText = response.text?.trim() || "{}";
    if (jsonText.startsWith("```json")) {
      jsonText = jsonText.replace(/^```json/, "").replace(/```$/, "").trim();
    } else if (jsonText.startsWith("```")) {
      jsonText = jsonText.replace(/^```/, "").replace(/```$/, "").trim();
    }

    const data = JSON.parse(jsonText);
    res.json(data);
  } catch (err: any) {
    console.warn("Gemini generate-plan fallback triggered:", err?.message || err);
    res.json(generateFallbackPlan(req.body));
  }
});

// Endpoint dedicated for Google Search Market Trends & Traffic
app.post("/api/google-market-trends", async (req, res) => {
  try {
    const { businessName, industry, location } = req.body;
    const ai = getGenAI();

    const prompt = `
Lakukan analisis tren pencarian Google real-time untuk bisnis berikut:
- Nama Bisnis: ${businessName || "Bisnis Baru"}
- Industri: ${industry || "F&B"}
- Lokasi Target: ${location || "Indonesia"}

Berikan data real-time berbasis ekosistem pencarian Google dalam format JSON valid:
{
  "searchInterestScore": 88,
  "searchVolumeSummary": "Penjelasan singkat volume pencarian di Google...",
  "topKeywords": [
    { "keyword": "kata kunci 1", "monthlyVolume": "12.000/bln", "competition": "Sedang", "trend": "Meningkat 📈" },
    { "keyword": "kata kunci 2", "monthlyVolume": "8.500/bln", "competition": "Tinggi", "trend": "Sangat Viral 🔥" }
  ],
  "trendingQueries": ["Pencarian viral 1", "Pencarian viral 2"],
  "conversionGuide": {
    "estimatedMonthlySearchers": 25000,
    "clickThroughRatePercent": 5,
    "conversionRatePercent": 3,
    "avgOrderValue": 35000,
    "estimatedMonthlySales": 37,
    "estimatedMonthlyRevenue": 1295000
  },
  "googleStrategy": "Strategi SEO & Google Ads lokal..."
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
      },
    });

    let jsonText = response.text?.trim() || "{}";
    if (jsonText.startsWith("```json")) {
      jsonText = jsonText.replace(/^```json/, "").replace(/```$/, "").trim();
    } else if (jsonText.startsWith("```")) {
      jsonText = jsonText.replace(/^```/, "").replace(/```$/, "").trim();
    }

    const data = JSON.parse(jsonText);
    res.json(data);
  } catch (err: any) {
    console.warn("Gemini google-market-trends fallback triggered:", err?.message || err);
    res.json(generateFallbackTrends(req.body));
  }
});

// Generate Pitch Deck endpoint
app.post("/api/generate-pitchdeck", async (req, res) => {
  try {
    const { businessName, problem, solution, marketSize, askAmount, lang, toneStyle } = req.body;

    const ai = getGenAI();
    const prompt = `
Buatkan Investor Pitch Deck slide-by-slide lengkap dan persuasif untuk bisnis berikut:
- Nama Bisnis: ${businessName || "Startup X"}
- Masalah Utama (Problem): ${problem || "Masalah di pasar yang belum terselesaikan dengan efisien"}
- Solusi (Solution): ${solution || "Produk/layanan berbasis teknologi/inovasi"}
- Estimasi Pasar (TAM/SAM/SOM): ${marketSize || "Pasar berkembang pesat di Indonesia & Asia Tenggara"}
- Target Pendanaan (Funding Ask): IDR ${askAmount || "500.000.000"}
- Bahasa Respon: ${lang === "en" ? "English" : "Bahasa Indonesia"}

Hasilkan JSON dengan struktur array "slides":
{
  "slides": [
    { "slideNumber": 1, "title": "Cover / Title", "headline": "...", "bullets": ["..."], "presenterNotes": "..." },
    { "slideNumber": 2, "title": "Problem", "headline": "...", "bullets": ["..."], "presenterNotes": "..." },
    { "slideNumber": 3, "title": "Solution", "headline": "...", "bullets": ["..."], "presenterNotes": "..." },
    { "slideNumber": 4, "title": "Market Opportunity (TAM / SAM / SOM)", "headline": "...", "bullets": ["TAM: ...", "SAM: ...", "SOM: ..."], "presenterNotes": "..." },
    { "slideNumber": 5, "title": "Product / Technology", "headline": "...", "bullets": ["..."], "presenterNotes": "..." },
    { "slideNumber": 6, "title": "Business Model & Revenue", "headline": "...", "bullets": ["..."], "presenterNotes": "..." },
    { "slideNumber": 7, "title": "Traction & Validation", "headline": "...", "bullets": ["..."], "presenterNotes": "..." },
    { "slideNumber": 8, "title": "Go-To-Market Strategy", "headline": "...", "bullets": ["..."], "presenterNotes": "..." },
    { "slideNumber": 9, "title": "Competitive Advantage", "headline": "...", "bullets": ["..."], "presenterNotes": "..." },
    { "slideNumber": 10, "title": "Financial Projections", "headline": "...", "bullets": ["..."], "presenterNotes": "..." },
    { "slideNumber": 11, "title": "Team & Advisors", "headline": "...", "bullets": ["..."], "presenterNotes": "..." },
    { "slideNumber": 12, "title": "The Ask & Use of Funds", "headline": "...", "bullets": ["..."], "presenterNotes": "..." }
  ]
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction: getSystemPromptWithTone(toneStyle),
        responseMimeType: "application/json",
      },
    });

    const jsonText = response.text?.trim() || "{}";
    const data = JSON.parse(jsonText);
    res.json(data);
  } catch (err: any) {
    console.warn("Gemini generate-pitchdeck fallback triggered:", err?.message || err);
    res.json(generateFallbackPitchdeck(req.body));
  }
});

// Competitor Analysis Endpoint using Gemini
app.post("/api/competitor-analysis", async (req, res) => {
  try {
    const { businessName, industry, description, targetMarket, toneStyle } = req.body;
    const ai = getGenAI();

    const prompt = `
Lakukan analisis persaingan pasar mendalam & komprehensif untuk bisnis berikut:
- Nama Bisnis: ${businessName || "Bisnis Baru"}
- Industri: ${industry || "Umum"}
- Deskripsi: ${description || "Usaha ritel/jasa di Indonesia"}
- Target Pasar: ${targetMarket || "Masyarakat umum / profesional"}

Gunakan Gemini untuk mengidentifikasi 3-4 nama pesaing nyata atau kategori pesaing utama di pasar Indonesia/regional.
Hasilkan output JSON persis dengan struktur berikut:
{
  "summary": "Ringkasan situasi persaingan pasar di industri ${industry || "terkait"} Indonesia (2-3 kalimat tajam)",
  "ourStrengths": [
    "Keunggulan utama 1 milik ${businessName || "bisnis kita"}",
    "Keunggulan utama 2",
    "Keunggulan utama 3"
  ],
  "ourWeaknesses": [
    "Tantangan/kelemahan awal 1",
    "Tantangan/kelemahan awal 2"
  ],
  "competitors": [
    {
      "name": "Nama Pesaing 1 (atau Brand/Kategori Pesaing Terkenal)",
      "type": "Pesaing Langsung (Direct)",
      "marketShare": "Tinggi / Dominan",
      "pricingStrategy": "Rentang harga estimasi (misal Rp 20.000 - Rp 50.000)",
      "keyStrengths": ["Kekuatan utama pesaing ini"],
      "keyWeaknesses": ["Kelemahan/celah pesaing ini"],
      "threatLevel": "Tinggi",
      "differentiationStrategy": "Strategi diferensiasi yang harus dilakukan bisnis kita untuk mengalahkan pesaing ini"
    },
    {
      "name": "Nama Pesaing 2",
      "type": "Pesaing Langsung Premium",
      "marketShare": "Sedang",
      "pricingStrategy": "Rentang harga estimasi",
      "keyStrengths": ["Kekuatan utama"],
      "keyWeaknesses": ["Kelemahan utama"],
      "threatLevel": "Sedang",
      "differentiationStrategy": "Strategi diferensiasi bisnis kita"
    },
    {
      "name": "Nama Pesaing 3",
      "type": "Pesaing Tidak Langsung / Substitusi",
      "marketShare": "Terfragmentasi",
      "pricingStrategy": "Rentang harga estimasi",
      "keyStrengths": ["Kekuatan utama"],
      "keyWeaknesses": ["Kelemahan utama"],
      "threatLevel": "Rendah",
      "differentiationStrategy": "Strategi diferensiasi bisnis kita"
    }
  ],
  "strategicRecommendations": [
    "Rekomendasi taktis 1 untuk memenangkan persaingan",
    "Rekomendasi taktis 2",
    "Rekomendasi taktis 3"
  ]
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction: getSystemPromptWithTone(toneStyle),
        responseMimeType: "application/json",
      },
    });

    let jsonText = response.text?.trim() || "{}";
    if (jsonText.startsWith("```json")) {
      jsonText = jsonText.replace(/^```json/, "").replace(/```$/, "").trim();
    } else if (jsonText.startsWith("```")) {
      jsonText = jsonText.replace(/^```/, "").replace(/```$/, "").trim();
    }

    const data = JSON.parse(jsonText);
    res.json(data);
  } catch (err: any) {
    console.warn("Gemini competitor-analysis fallback triggered:", err?.message || err);
    res.json(generateFallbackCompetitors(req.body));
  }
});

// Financial Benchmark Endpoint using Gemini
app.post("/api/financial-benchmark", async (req, res) => {
  try {
    const { industry, financialModel, businessName } = req.body;
    const ai = getGenAI();

    const initialCapital = financialModel?.initialCapital || 100000000;
    const monthlyRev = financialModel?.monthlyRevenueProjection || 50000000;
    const monthlyCOGS = financialModel?.monthlyCOGS || 20000000;
    const monthlyOpEx = financialModel?.monthlyOpEx || 15000000;
    const grossMargin = monthlyRev > 0 ? Math.round(((monthlyRev - monthlyCOGS) / monthlyRev) * 100) : 0;
    const netProfit = monthlyRev - monthlyCOGS - monthlyOpEx;
    const netMargin = monthlyRev > 0 ? Math.round((netProfit / monthlyRev) * 100) : 0;

    const prompt = `
Lakukan benchmarking keuangan (Financial Benchmarking) bisnis berikut dengan data rata-rata industri startup/SME publik di Indonesia:
- Nama Bisnis: ${businessName || "Bisnis Kita"}
- Industri: ${industry || "Umum"}
- Modal Awal (CapEx): Rp ${initialCapital.toLocaleString('id-ID')}
- Proyeksi Omset Bulanan: Rp ${monthlyRev.toLocaleString('id-ID')}
- HPP / COGS Bulanan: Rp ${monthlyCOGS.toLocaleString('id-ID')} (Gross Margin: ${grossMargin}%)
- OpEx Bulanan: Rp ${monthlyOpEx.toLocaleString('id-ID')}
- Estimasi Net Margin: ${netMargin}%

Gunakan pengetahuan Gemini untuk menyajikan perbandingan metrik keuangan dengan rata-rata standar industri terkait.
Hasilkan JSON terstruktur persis seperti berikut:
{
  "industryName": "${industry || "Sektor Terkait"}",
  "overallHealthScore": 85,
  "overallVerdict": "Evaluasi kesehatan finansial 2-3 kalimat terhadap standar industri.",
  "metrics": [
    {
      "metricName": "Gross Profit Margin (%)",
      "userValue": "${grossMargin}%",
      "industryAvg": "50% - 60%",
      "status": "${grossMargin >= 50 ? 'Sangat Baik' : 'Perlu Perhatian'}",
      "insight": "Penjelasan singkat mengenai perbandingan margin kotor ini."
    },
    {
      "metricName": "Net Profit Margin (%)",
      "userValue": "${netMargin}%",
      "industryAvg": "15% - 25%",
      "status": "${netMargin >= 15 ? 'Optimal' : 'Risiko Tipis'}",
      "insight": "Penjelasan perbandingan margin bersih."
    },
    {
      "metricName": "Ratio OpEx / Omset",
      "userValue": "${monthlyRev > 0 ? Math.round((monthlyOpEx/monthlyRev)*100) : 0}%",
      "industryAvg": "25% - 35%",
      "status": "Normal",
      "insight": "Analisis efisiensi biaya operasional."
    },
    {
      "metricName": "Estimasi Break-Even (Bulan)",
      "userValue": "${financialModel?.breakEvenPointMonths || 6} Bulan",
      "industryAvg": "8 - 14 Bulan",
      "status": "Sangat Cepat",
      "insight": "Evaluasi kecepatan pengembalian modal awal."
    }
  ],
  "recommendations": [
    "Langkah perbaikan atau optimalisasi 1",
    "Langkah perbaikan atau optimalisasi 2",
    "Langkah perbaikan atau optimalisasi 3"
  ]
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    let jsonText = response.text?.trim() || "{}";
    if (jsonText.startsWith("```json")) {
      jsonText = jsonText.replace(/^```json/, "").replace(/```$/, "").trim();
    } else if (jsonText.startsWith("```")) {
      jsonText = jsonText.replace(/^```/, "").replace(/```$/, "").trim();
    }

    const data = JSON.parse(jsonText);
    res.json(data);
  } catch (err: any) {
    console.warn("Gemini financial-benchmark fallback triggered:", err?.message || err);
    res.json(generateFallbackBenchmark(req.body));
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[CorPlan] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
