import { BusinessPlanData, PitchDeckData } from '../types';

export const SAMPLE_BUSINESS_PLANS: BusinessPlanData[] = [
  {
    id: 'sample-kopi-nusantara',
    businessName: 'Kopi Nusantara Specialty Cafe',
    industry: 'Food & Beverage / Resto & Cafe',
    tagline: 'Cita Rasa Kopi Otentik Nusantara dengan Sentuhan Modern',
    createdAt: '2026-07-29',
    updatedAt: '2026-07-29',
    executiveSummary: 'Kopi Nusantara adalah jaringan cafe specialty coffee modern yang menyajikan biji kopi single-origin pilihan langsung dari petani lokal di Sumatra, Jawa, Bali, dan Toraja. Mengombinasikan pengalaman "third-wave coffee" dengan interior bertema kebudayaan Indonesia, Kopi Nusantara menargetkan segmen profesional muda, pekerja kreatif, serta mahasiswa urban yang menginginkan suasana kerja nyaman, kopi berkualitas tinggi, dan pastry artisanal.',
    marketAnalysis: {
      industryOverview: 'Industri kedai kopi Indonesia mengalami pertumbuhan pesat melebihi 12% per tahun, didorong oleh tren gaya hidup "ngopi", kerja remote (WFC), dan peningkatan konsumsi kopi per kapita nasional. Pasar kopi olahan bernilai lebih dari Rp 18 Triliun secara nasional.',
      targetAudience: 'Profesional muda berusia 22-40 tahun, freelancer/remote worker, mahasiswa, dan penikmat kopi spesialti dengan pengeluaran rata-rata Rp 45.000 - Rp 90.000 per kunjungan.',
      swot: {
        strengths: [
          'Direct sourcing langsung dari kelompok tani lokal (harga bahan baku lebih efisien)',
          'Variasi kopi single origin eksklusif dengan skor cupping 84+',
          'Lokasi strategis di kawasan bisnis dan kampus dengan desain interior instagramable'
        ],
        weaknesses: [
          'Ketergantungan pada fluktuasi pasokan biji kopi musiman',
          'Sensitivitas terhadap kenaikan harga sewa properti komersial'
        ],
        opportunities: [
          'Ekspansi lini produk Kopi Literan (RTD) dan biji kopi roasting untuk pasokan B2B / kantor',
          'Kemitraan waralaba (franchise) skala nasional di kota-kota berkembang'
        ],
        threats: [
          'Persaingan ketat dari kedai kopi kemasan murah dan jaringan internasional',
          'Perubahan tren preferensi konsumen F&B yang cepat'
        ]
      },
      pestel: {
        political: 'Dukungan pemerintah terhadap produk UMKM lokal dan industri ekonomi kreatif.',
        economic: 'Pertumbuhan kelas menengah urban yang meningkatkan daya beli belanja lifestyle.',
        social: 'Budaya nongkrong dan bekerja di cafe yang menjadi norma harian bagi gen-Z dan milenial.',
        technological: 'Adopsi POS digital, aplikasi loyalty, dan layanan kirim instan (GoFood, GrabFood, ShopeeFood).',
        environmental: 'Tuntutan kemasan ramah lingkungan (eco-cup, sedotan nabati, daur ulang ampas kopi).',
        legal: 'Sertifikasi Halal MUI, izin BPOM untuk produk kemasan, serta izin tempat usaha (PBG/NIB).'
      },
      portersFiveForces: {
        competitiveRivalry: 'Tinggi: Banyak pemain kedai kopi independen maupun jaringan nasional.',
        threatOfNewEntrants: 'Tinggi: Hambatan masuk relatif rendah untuk outlet tunggal.',
        threatOfSubstitutes: 'Sedang: Minuman Boba, teh kekinian, dan kopi saset instan.',
        bargainingPowerOfSuppliers: 'Rendah-Sedang: Kontak langsung ke banyak kelompok tani memberikan fleksibilitas.',
        bargainingPowerOfBuyers: 'Sedang: Konsumen peka harga tetapi loyal pada kualitas rasa dan suasana.'
      }
    },
    marketingAndOperations: {
      marketingStrategy: 'Menggunakan strategi pemasaran digital berfokus pada visual Instagram & TikTok, program keanggotaan loyalty app (Beli 9 Gratis 1), serta kolaborasi mingguan dengan komunitas lokal (workshop cupping, acoustic night).',
      salesChannels: [
        'Dine-in & Takeaway di outlet utama',
        'Pemesanan Online Delivery (GoFood, GrabFood, ShopeeFood)',
        'B2B Corporate Supply (Langganan Biji Kopi Sangrai & Event Catering)'
      ],
      operationalPlan: 'Buka jam 07.30 - 22.00 WIB setiap hari. Menggunakan mesin espresso komersial 2-group, sistem kasir POS cloud otomatis terintegrasi persediaan bahan baku, serta pelatihan barista terstandarisasi.',
      keyMetricsKPIs: [
        'Rata-rata Penjualan Harian (Cup/Day)',
        'Average Order Value (AOV) Rp 55.000',
        'Customer Retention Rate > 35%',
        'Persentase COGS < 38%'
      ]
    },
    financialModel: {
      currency: 'IDR',
      initialCapital: 350000000,
      capexItems: [
        { id: '1', item: 'Mesin Espresso Commercial 2-Group & Grinder', cost: 85000000 },
        { id: '2', item: 'Renovasi Interior & Furnitur Custom Cafe', cost: 110000000 },
        { id: '3', item: 'Sistem Kasir POS, Tablet, & Printer Kasir', cost: 12000000 },
        { id: '4', item: 'Sewa Tempat (DP 1 Tahun)', cost: 90000000 },
        { id: '5', item: 'Perizinan, Legalitas & Sertifikasi Halal', cost: 15000000 },
        { id: '6', item: 'Perlengkapan Dapur, Ice Maker & Kulkas', cost: 38000000 }
      ],
      opexItems: [
        { id: 'o1', item: 'Gaji Barista & Staf (6 Orang)', cost: 24000000 },
        { id: 'o2', item: 'Sewa Properti (Amortisasi Bulanan)', cost: 7500000 },
        { id: 'o3', item: 'Listrik, Air, Internet Dedicated 100Mbps', cost: 5500000 },
        { id: 'o4', item: 'Pemasaran, Meta Ads & Influencer', cost: 4500000 },
        { id: 'o5', item: 'Perawatan Alat & Kebersihan', cost: 2500000 }
      ],
      revenueStreams: [
        { id: 'r1', name: 'Kopi berbasis Espresso (Latte, Americano, Cappuccino)', pricePerUnit: 32000, expectedMonthlyVolume: 3200, cogsPercent: 32 },
        { id: 'r2', name: 'Manual Brew Single Origin & Cold Brew', pricePerUnit: 38000, expectedMonthlyVolume: 1200, cogsPercent: 28 },
        { id: 'r3', name: 'Pastry & Light Snacks (Croissant, Brownies)', pricePerUnit: 28000, expectedMonthlyVolume: 1800, cogsPercent: 42 }
      ],
      monthlyGrowthRate: 4.5,
      taxRate: 0.5,
      financialSummaryNotes: 'Proyeksi keuangan menunjukkan payback period tercapai dalam 10 bulan operasi dengan margin laba bersih rata-rata 24% setelah BEP.'
    },
    riskManagement: [
      { id: 'rm1', risk: 'Fluktuasi Harga Biji Kopi Hijau (Green Beans)', impact: 'Sedang', mitigation: 'Membuat kontrak pasokan jangka panjang (fixed price 6 bulan) dengan kelompok tani.' },
      { id: 'rm2', risk: 'Penurunan Traffic Pengunjung Karena Cuaca Musim Hujan', impact: 'Sedang', mitigation: 'Menggenjot promosi paket delivery bundel via kanal pesan antar digital.' },
      { id: 'rm3', risk: 'Turnover Barista & Staf Tinggi', impact: 'Tinggi', mitigation: 'Sistem insentif bonus berbasis KPI penjualan bulanan dan jalur karier terstruktur.' }
    ],
    milestones: [
      { id: 'ms1', title: 'Renovasi & Setup Outlet Flagship', targetDate: 'Q1 2026', description: 'Penyelesaian renovasi interior cafe, instalasi mesin espresso commercial, dan perizinan NIB/Halal.', status: 'Completed', category: 'Peluncuran' },
      { id: 'ms2', title: 'Grand Opening & Peluncuran Aplikasi Loyalty', targetDate: 'Q2 2026', description: 'Launching resmi outlet Flagship, promosi BOGO via GrabFood/GoFood, dan onboarding 1.000 member loyalty.', status: 'Completed', category: 'Pemasaran' },
      { id: 'ms3', title: 'Pencapaian Target BEP & Profitabilitas', targetDate: 'Q3 2026', description: 'Mencapai target penjualan 410 unit/bulan dengan arus kas operasional positif konstan.', status: 'In Progress', category: 'Finansial' },
      { id: 'ms4', title: 'Peluncuran Lini Produk Kopi Literan RTD', targetDate: 'Q4 2026', description: 'Distribusi Kopi Literan gula aren ke minimarket modern & kantor partner B2B.', status: 'Upcoming', category: 'Produk' },
      { id: 'ms5', title: 'Ekspansi Outlet ke-2 & Program Franchise', targetDate: 'Q1 2027', description: 'Membuka cabang baru di kawasan kampus dan menyusun standar SOP kemitraan waralaba.', status: 'Upcoming', category: 'Operasional' }
    ],
    googleTraffic: {
      searchInterestScore: 92,
      searchVolumeSummary: 'Estimasi 62.000+ pencarian bulanan terkait "kopi specialty terdekat" dan "cafe instagramable" di Google Indonesia.',
      topKeywords: [
        { keyword: 'kopi specialty terdekat', monthlyVolume: '22.400/bln', competition: 'Sedang', trend: 'Sangat Viral 🔥' },
        { keyword: 'cafe tempat nugas enak terdekat', monthlyVolume: '18.100/bln', competition: 'Tinggi', trend: 'Meningkat 📈' },
        { keyword: 'rekomendasi es kopi gula aren enak', monthlyVolume: '12.500/bln', competition: 'Tinggi', trend: 'Meningkat 📈' },
        { keyword: 'promo kopi nusantara hari ini', monthlyVolume: '9.000/bln', competition: 'Rendah', trend: 'Stabil ➡️' }
      ],
      trendingQueries: [
        'Kopi Nusantara Specialty Cafe lokasi & jam buka',
        'Menu rekomendasi Kopi Nusantara',
        'Review jujur Kopi Nusantara Cafe',
        'Cafe wifi kencang dekat kampus'
      ],
      conversionGuide: {
        estimatedMonthlySearchers: 35000,
        clickThroughRatePercent: 7,
        conversionRatePercent: 4,
        avgOrderValue: 45000,
        estimatedMonthlySales: 98,
        estimatedMonthlyRevenue: 4410000
      },
      googleStrategy: 'Optimalkan Google Maps (GMB) dengan foto estetis menu, review bintang 5, serta kampanye SEO lokal kata kunci "cafe WFC terdekat".'
    },
    beginnerGuide: {
      simpleSummary: 'Secara gampang, Kopi Nusantara adalah usaha cafe modern. Kamu keluar uang di awal untuk beli mesin kopi dan dekorasi toko (Modal Awal / CapEx). Lalu tiap bulan dari hasil jualan kopi, kamu bayar sewa tempat, listrik, dan gaji karyawan (Biaya Bulanan / OpEx). Sisa uang jualan setelah bayar itu semua adalah keuntungan bersih yang kamu kantongi!',
      analogies: [
        {
          concept: 'CapEx (Modal Awal Peralatan)',
          plainExplanation: 'Uang beli barang yang terpakai bertahun-tahun di awal buka.',
          simpleAnalogy: 'Beli mesin kopi Rp 85jt, meja kursi Rp 110jt, dan kulkas Rp 38jt.'
        },
        {
          concept: 'OpEx (Biaya Operasional Bulanan)',
          plainExplanation: 'Uang rutin yang wajib kamu bayar tiap bulan agar toko tetap bisa buka.',
          simpleAnalogy: 'Bayar gaji 6 barista (Rp 24jt/bln), sewa (Rp 7,5jt/bln), dan listrik/wifi (Rp 5,5jt/bln).'
        },
        {
          concept: 'BEP / Titik Impas',
          plainExplanation: 'Jumlah cup kopi yang harus terjual tiap bulan agar tidak nombok.',
          simpleAnalogy: 'Karena biaya bulanan kamu Rp 44 juta, kamu wajib jual minimal 410 cup per bulan agar bebas dari rugi!'
        }
      ],
      calculationGuides: [
        {
          metricName: 'Cara Hitung Margin Keuntungan Kotor (Gross Margin)',
          formulaSimple: 'Margin = (Harga Jual - Modal Bahan Baku) ÷ Harga Jual × 100%',
          stepByStepExample: 'Langkah 1: Kamu jual Cappuccino harga Rp 32.000.\nLangkah 2: Modal biji kopi + susu + gelas adalah Rp 10.240 (32%).\nLangkah 3: Untung kotor per gelas = Rp 21.760. Margin kamu = 68%!'
        },
        {
          metricName: 'Cara Hitung Kapan Balik Modal (Payback Period)',
          formulaSimple: 'Payback = Total Modal Awal ÷ Keuntungan Bersih per Bulan',
          stepByStepExample: 'Total Modal = Rp 350.000.000. Jika Keuntungan Bersih = Rp 35.000.000/bulan, maka Rp 350.000.000 ÷ Rp 35.000.000 = 10 Bulan untuk balik modal!'
        }
      ],
      beginnerGlossary: [
        {
          term: 'TAM (Total Potential Market)',
          simpleMeaning: 'Semua orang penikmat kopi di Indonesia.',
          whyItMatters: 'Mengetahui seberapa besar industri kopi nasional.'
        },
        {
          term: 'SOM (Target Realistis Tokomu)',
          simpleMeaning: 'Jumlah penikmat kopi di sekitar lokasi cafe kamu yang rajin mampir.',
          whyItMatters: 'Membuat target jualan harian yang masuk akal (misal 150 cup/hari).'
        }
      ]
    },
    competitorAnalysis: {
      summary: 'Lanskap persaingan bisnis Kopi Nusantara berada di pasar F&B kedai kopi spesialti yang tumbuh cepat. Pesaing terdiri dari jaringan kedai kopi nasional (Janji Jiwa, Kenangan) dan cafe independen lokal.',
      ourStrengths: [
        'Rantai pasok direct-sourcing biji kopi spesialti dari petani lokal',
        'Konsep tempat WFC-friendly dengan fasilitas wifi cepat & colokan listrik',
        'Penetapan harga kompetitif (Rp 28.000 - Rp 38.000) untuk kualitas single origin'
      ],
      ourWeaknesses: [
        'Brand awareness masih dalam tahap awal pertumbuhan',
        'Jumlah outlet fisik terbatas dibanding jaringan franchise raksasa'
      ],
      competitors: [
        {
          name: 'Kopi Kenangan / Janji Jiwa',
          type: 'Pesaing Langsung (Direct)',
          marketShare: 'Sangat Tinggi (Nasional)',
          pricingStrategy: 'Rp 18.000 - Rp 28.000',
          keyStrengths: ['Ribuan outlet, branding nasional kuat, aplikasi pesan-antar instan'],
          keyWeaknesses: ['Dominan konsep Grab-and-Go, fasilitas tempat duduk sangat terbatas'],
          threatLevel: 'Tinggi',
          differentiationStrategy: 'Menawarkan ruang tempat kerja (WFC) yang nyaman dengan kualitas kopi spesialti manual brew.'
        },
        {
          name: 'Starbucks / Fore Coffee',
          type: 'Pesaing Langsung Premium',
          marketShare: 'Tinggi (Urban Tier-1)',
          pricingStrategy: 'Rp 38.000 - Rp 65.000',
          keyStrengths: ['Ekosistem brand mewah global, lokasi strategis di mall & pusat perkantoran'],
          keyWeaknesses: ['Harga relatif mahal bagi segmen mahasiswa dan pekerja muda'],
          threatLevel: 'Sedang',
          differentiationStrategy: 'Penetapan harga 30-40% lebih terjangkau dengan cita rasa autentik Nusantara.'
        },
        {
          name: 'Cafe Independen Lokal',
          type: 'Pesaing Tidak Langsung',
          marketShare: 'Sedang (Lokal Area)',
          pricingStrategy: 'Rp 25.000 - Rp 35.000',
          keyStrengths: ['Konsep tempat estetik unik, basis komunitas lokal kuat'],
          keyWeaknesses: ['Sistem operasional dan standar kualitas bahan belum terstandardisasi'],
          threatLevel: 'Rendah',
          differentiationStrategy: 'Standardisasi rasa konsisten, kecepatan penyajian, serta program keanggotaan digital.'
        }
      ],
      strategicRecommendations: [
        'Fokus menguasai pasar lokal di radius 3km dari lokasi outlet dengan pemasaran Google Business Profile.',
        'Menyediakan paket bundling kopi + pastry untuk meningkatkan Average Order Value (AOV).',
        'Menggelar event workshop manual brew akhir pekan untuk membangun loyalitas komunitas.'
      ]
    }
  },
  {
    id: 'sample-edutech-saas',
    businessName: 'EduSkill AI Learning Platform',
    industry: 'SaaS / Education Technology',
    tagline: 'Platform Pelatihan Keterampilan Kerja Digital Berbasis AI Tutoring',
    createdAt: '2026-07-29',
    updatedAt: '2026-07-29',
    executiveSummary: 'EduSkill AI adalah platform EdTech berbasis B2C dan B2B yang menyediakan jalur pembelajaran adaptif untuk pengembangan keterampilan digital (Digital Marketing, Coding, Data Analytics, UI/UX). Dilengkapi asisten AI tutor interaktif yang mengevaluasi tugas secara real-time dan menyesuaikan materi sesuai kecepatan belajar setiap siswa.',
    marketAnalysis: {
      industryOverview: 'Pasar edtech dan upskilling di Indonesia bertumbuh pesat seiring program percepatan transformasi digital nasional dan bonus demografi.',
      targetAudience: 'Mahasiswa, fresh graduate, pencari kerja, serta perusahaan korporasi yang ingin meningkatkan kapasitas SDM (Employee Upskilling).',
      swot: {
        strengths: [
          'Teknologi AI tutor personal yang dapat diakses 24/7',
          'Sertifikasi yang diakui jaringan mitra perusahaan perekrut',
          'Biaya berlangganan terjangkau dengan skema freemium'
        ],
        weaknesses: [
          'Membutuhkan biaya awal investasi pengembangan produk & infrastruktur AI cloud',
          'Perlu membangun reputasi awal brand di tengah persaingan platform global'
        ],
        opportunities: [
          'Kerja sama dengan universitas dan program pemerintah',
          'Ekspansi ke pasar regional Asia Tenggara dengan bahasa Melayu & Inggris'
        ],
        threats: [
          'Kecepatan perkembangan AI yang menuntut pembaruan kurikulum konstan',
          'Pembajakan konten modul pembelajaran'
        ]
      },
      pestel: {
        political: 'Insentif pelatihan kerja digital dari kementerian ketenagakerjaan.',
        economic: 'Kebutuhan industri akan tenaga kerja berketerampilan tinggi (high-skill gap).',
        social: 'Kesadaran masyarakat akan pentingnya lifelong learning dan upskilling.',
        technological: 'Adopsi AI generative untuk pembuatan kuis dan evaluasi otomatis.',
        environmental: 'Model pembelajaran online 100% ramah lingkungan bebas kertas.',
        legal: 'Perlindungan data pribadi pengguna (UU PDP) dan hak cipta kurikulum.'
      },
      portersFiveForces: {
        competitiveRivalry: 'Tinggi: Coursera, Udemy, Ruangguru, HarukaEdu.',
        threatOfNewEntrants: 'Sedang: Dibutuhkan kredibilitas materi dan integrasi AI yang presisi.',
        threatOfSubstitutes: 'Tinggi: Tutorial gratis YouTube dan artikel blogs.',
        bargainingPowerOfSuppliers: 'Rendah: Banyak instruktur dan kreator materi independen.',
        bargainingPowerOfBuyers: 'Sedang: Pengguna bebas berpindah jika harga tidak sepadan.'
      }
    },
    marketingAndOperations: {
      marketingStrategy: 'Strategi Inbound Content Marketing via LinkedIn, YouTube, Webinar Karir Gratis bulanan, serta program rujukan (Referral Program - Dapatkan Akses 1 Bulan Gratis).',
      salesChannels: [
        'Penjualan Langsung B2C via Web & Mobile App (Subscription)',
        'Penjualan B2B Corporate Licensing (SaaS Enterprise)'
      ],
      operationalPlan: 'Pengembangan kurikulum rutin oleh pakar industri, pengelolaan infrastruktur cloud di AWS/GCP, serta layanan dukungan pengguna 24/7.',
      keyMetricsKPIs: [
        'Monthly Active Users (MAU)',
        'Customer Acquisition Cost (CAC) < Rp 120.000',
        'Customer Lifetime Value (LTV) > Rp 850.000',
        'Monthly Recurring Revenue (MRR)'
      ]
    },
    financialModel: {
      currency: 'IDR',
      initialCapital: 500000000,
      capexItems: [
        { id: '1', item: 'Pengembangan Platform Web & Mobile App (MVP)', cost: 180000000 },
        { id: '2', item: 'Integrasi AI Engine & Infrastruktur Cloud', cost: 120000000 },
        { id: '3', item: 'Produksi Modul & Konten Video Kursus Awal', cost: 130000000 },
        { id: '4', item: 'Legalitas PT, Brand Trademark & Syarat UU PDP', cost: 25000000 },
        { id: '5', item: 'Peralatan Kerja & Studio Rekaman', cost: 45000000 }
      ],
      opexItems: [
        { id: 'o1', item: 'Gaji Tim Core (Developer, UI/UX, Product)', cost: 45000000 },
        { id: 'o2', item: 'Sewa Server Cloud GCP/AWS & Token API AI', cost: 15000000 },
        { id: 'o3', item: 'Pemasaran Digital & Social Media Campaign', cost: 20000000 },
        { id: 'o4', item: 'Honor Instruktur Guest & Reviewer Tugas', cost: 10000000 },
        { id: 'o5', item: 'Operasional Kantor & Tools Kerja (Slack, Figma)', cost: 5000000 }
      ],
      revenueStreams: [
        { id: 'r1', name: 'Langganan B2C Pro Individual (Bulanan)', pricePerUnit: 199000, expectedMonthlyVolume: 800, cogsPercent: 15 },
        { id: 'r2', name: 'Langganan B2C Pro Individual (Tahunan)', pricePerUnit: 1490000, expectedMonthlyVolume: 120, cogsPercent: 12 },
        { id: 'r3', name: 'Lisensi Enterprise B2B (Per Pax / Tahun)', pricePerUnit: 2500000, expectedMonthlyVolume: 40, cogsPercent: 10 }
      ],
      monthlyGrowthRate: 8.0,
      taxRate: 0.5,
      financialSummaryNotes: 'Bisnis SaaS memiliki marjin kotor sangat tinggi (>80%). BEP dicapai saat pengguna aktif berlangganan B2C menyentuh 620 pengguna.'
    },
    riskManagement: [
      { id: 'rm1', risk: 'Biaya API AI dan Server Melonjak Tinggi', impact: 'Tinggi', mitigation: 'Menerapkan caching jawaban AI dan arsitektur model hybrid.' },
      { id: 'rm2', risk: 'Ketersetiaa/Churn Rate Pelanggan Tinggi', impact: 'Tinggi', mitigation: 'Program gamifikasi, sertifikat verifikasi LinkedIn, dan sistem kompartemen karir.' },
      { id: 'rm3', risk: 'Perubahan Algoritma/Model AI Global', impact: 'Sedang', mitigation: 'Menggunakan abstraksi API independen untuk kemudahan migrasi model.' }
    ],
    milestones: [
      { id: 'm1', title: 'Rilis Web & App MVP EduSkill AI', targetDate: 'Q1 2026', description: 'Peluncuran platform versi 1.0 dengan modul AI tutor interaktif dan 10 kursus digital.', status: 'Completed', category: 'Peluncuran' },
      { id: 'm2', title: 'Pencapaian 1.000 Monthly Active Users', targetDate: 'Q2 2026', description: 'Program promosi referral dan webinar karir untuk meningkatkan pengguna aktif terdaftar.', status: 'In Progress', category: 'Pemasaran' },
      { id: 'm3', title: 'Kemitraan Lisensi B2B Enterprise', targetDate: 'Q3 2026', description: 'Penandatanganan kontrak B2B upskilling dengan 5 perusahaan startup & korporasi.', status: 'Upcoming', category: 'Finansial' },
      { id: 'm4', title: 'Pengembangan Model AI Custom V2', targetDate: 'Q4 2026', description: 'Rilis fitur wawancara kerja simulasi AI & penilaian portofolio otomatis.', status: 'Upcoming', category: 'Produk' }
    ]
  }
];

export const SAMPLE_PITCH_DECKS: PitchDeckData[] = [
  {
    id: 'pitch-kopi-nusantara',
    businessName: 'Kopi Nusantara',
    tagline: 'Authentic Indonesian Coffee Experience, Modernized',
    targetAsk: 500000000,
    currency: 'IDR',
    slides: [
      {
        id: 's1',
        slideNumber: 1,
        title: 'Judul & Sampul',
        headline: 'Mengakselerasi Kedai Kopi Spesialti Berbasis Direct-Sourcing di Indonesia',
        bullets: [
          'Kopi Nusantara Specialty Cafe',
          'Penggalangan Dana Seed Round: Rp 500.000.000',
          'Disusun oleh Team Kopi Nusantara'
        ],
        presenterNotes: 'Sapa investor dengan hangat. Tekankan bahwa Indonesia adalah produsen kopi terbesar ke-4 di dunia namun konsumsi lokal baru bertumbuh pesat sekarang.'
      },
      {
        id: 's2',
        slideNumber: 2,
        title: 'Masalah (Problem)',
        headline: 'Penikmat Kopi Urban Mengalami Dilema Kualitas vs Harga',
        bullets: [
          'Kedai Kopi Internasional mahal (Rp 60k+/cup) dan rasa cenderung generik.',
          'Kopi saset/booth murah menggunakan bahan berkualitas rendah dan banyak gula tambahan.',
          'Petani lokal kesulitan menjual biji kopi spesialti dengan harga yang adil.'
        ],
        presenterNotes: 'Soroti rasa frustrasi konsumen milenial yang mencari tempat nyaman WFC tapi tetap menginginkan rasa kopi berkualitas tanpa harga yang menguras dompet.'
      },
      {
        id: 's3',
        slideNumber: 3,
        title: 'Solusi (Solution)',
        headline: 'Pengalaman Kopi "Third-Wave" Terjangkau dengan Rantai Pasok Langsung',
        bullets: [
          'Single Origin Coffee dengan skor cupping 84+ dari petani binaan langsung.',
          'Harga terjangkau (Rp 28.000 - Rp 38.000) dengan marjin COGS efisien.',
          'Suasana Cafe bertema nusantara modern yang optimal untuk bekerja & bersosialisasi.'
        ],
        presenterNotes: 'Jelaskan bagaimana rantai pasok direct-sourcing kami memangkas middleman dan menghasilkan marjin keuntungan yang sehat.'
      },
      {
        id: 's4',
        slideNumber: 4,
        title: 'Potensi Pasar (TAM / SAM / SOM)',
        headline: 'Pasar Konsumsi Kopi Indonesia Bernilai > Rp 18 Triliun',
        bullets: [
          'TAM: Rp 18,5 Triliun (Total Pasar Kedai Kopi & F&B Kopi Indonesia)',
          'SAM: Rp 3,2 Triliun (Pasar Kedai Kopi Spesialti Urban di Jabodetabek & Kota Besar)',
          'SOM: Rp 85 Miliar (Target Pangsa Pasar Kopi Nusantara dalam 3 Tahun)'
        ],
        presenterNotes: 'Tunjukkan grafik pertumbuhan konsumsi kopi per kapita Indonesia yang meningkat 2x lipat dalam 5 tahun terakhir.'
      },
      {
        id: 's5',
        slideNumber: 5,
        title: 'Model Bisnis & Monetisasi',
        headline: 'Tiga Sumber Pendapatan yang Kuat & Berkelanjutan',
        bullets: [
          'Dine-in & Takeaway Sales (Kopi & Pastry) - 65% Pendapatan',
          'Online Delivery App Order (GoFood, GrabFood, ShopeeFood) - 25% Pendapatan',
          'B2B Roasted Beans Supply & Event Catering - 10% Pendapatan'
        ],
        presenterNotes: 'Tekankan diversifikasi pendapatan B2C dan B2B kami untuk menjaga stabilitas arus kas.'
      },
      {
        id: 's6',
        slideNumber: 6,
        title: 'Traksi & Pencapaian Saat Ini',
        headline: 'Model Prototype Pertama Mencatatkan Arus Kas Positif dalam 4 Bulan',
        bullets: [
          '> 4.500 Cup Terjual per Bulan di Flagship Store 1',
          'Pendapatan Bulanan Bulanan Rp 165 Juta dengan Margin Net Profit 24%',
          'Rating 4.9/5 di Google Maps (>450 Ulasan Positif)'
        ],
        presenterNotes: 'Poin ini membuktikan bahwa konsep unit-economics kami sudah teruji dan siap di-scale ke lokasi baru.'
      },
      {
        id: 's7',
        slideNumber: 7,
        title: 'Strategi Pertumbuhan (Go-To-Market)',
        headline: 'Ekspansi Agresif 5 Outlet Baru dalam 18 Bulan Ke Depan',
        bullets: [
          'Pemilihan Lokasi Berbasis Data Traffic & Area Perkantoran/Kampus',
          'Digital Loyalty Program App & Community Engagement Event',
          'Kemitraan Kopi Literan Ready-to-Drink di Minimarket Modern'
        ],
        presenterNotes: 'Fokus ekspansi pada kluster kota Jabodetabek dan Bandung sebelum merambah ke luar Jawa.'
      },
      {
        id: 's8',
        slideNumber: 8,
        title: 'Proyeksi Keuangan (Financials)',
        headline: 'Target Omset Rp 4,8 Miliar di Tahun ke-3 dengan BEP 10 Bulan per Outlet',
        bullets: [
          'Tahun 1: Pendapatan Rp 1,9 Miliar | Net Profit Rp 420 Juta',
          'Tahun 2: Pendapatan Rp 3,4 Miliar | Net Profit Rp 810 Juta',
          'Tahun 3: Pendapatan Rp 4,8 Miliar | Net Profit Rp 1,2 Miliar'
        ],
        presenterNotes: 'Sampaikan proyeksi keuangan secara optimistis-realistis dengan asumsi kenaikan biaya operasional yang terukur.'
      },
      {
        id: 's9',
        slideNumber: 9,
        title: 'Tim & Pengalaman Kerja',
        headline: 'Dipimpin oleh Praktisi F&B & Barista Bersertifikat Internasional',
        bullets: [
          'CEO: Ex-Operations Manager Jaringan Cafe Terkemuka (8 Thn Pengalaman)',
          'Head Barista: Q-Grader Certified & Juara Manual Brew Regional',
          'CMO: Spesialis Marketing F&B Digital'
        ],
        presenterNotes: 'Perkenalkan keunggulan latar belakang tim pendiri yang saling melengkapi.'
      },
      {
        id: 's10',
        slideNumber: 10,
        title: 'Permintaan Pendanaan & Penggunaan Dana',
        headline: 'Membuka Seed Funding Rp 500.000.000 untuk 15% Kepemilikan Saham',
        bullets: [
          '60% - Fit-out & Fitur Peralatan Mesin 2 Outlet Baru',
          '25% - Pemasaran Digital & Launching Campaign',
          '15% - Cadangan Modal Kerja & Persediaan Bahan Baku'
        ],
        presenterNotes: 'Tutup dengan ajakan bertindak yang tegas dan undang investor untuk sesi Q&A atau mencicipi kopi sampel!'
      }
    ]
  }
];
