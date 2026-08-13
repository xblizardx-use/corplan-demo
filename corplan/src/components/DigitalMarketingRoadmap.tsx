import React, { useState } from 'react';
import { 
  Share2, 
  Sparkles, 
  Calendar, 
  Users, 
  TrendingUp, 
  Target, 
  CheckCircle2, 
  Zap,
  Video,
  Send
} from 'lucide-react';
import { BusinessPlanData } from '../types';

interface DigitalMarketingRoadmapProps {
  plan: BusinessPlanData;
  theme?: 'warm-luxe' | 'dark-obsidian';
}

export const DigitalMarketingRoadmap: React.FC<DigitalMarketingRoadmapProps> = ({
  plan,
  theme = 'warm-luxe',
}) => {
  const isDark = theme === 'dark-obsidian';
  const cardBgClass = isDark
    ? 'bg-slate-900/90 border-slate-800 text-slate-100'
    : 'bg-white border-stone-200 text-stone-900 shadow-sm';

  const [activeWeek, setActiveWeek] = useState<number>(1);

  // Content calendar templates based on industry
  const contentPillars = [
    { type: 'Educate & Solution', ratio: '40%', desc: 'Konten edukasi masalah pelanggan & solusi produk' },
    { type: 'Behind The Scenes (BTS)', ratio: '30%', desc: 'Proses pembuatan, kebersihan, & value cerita pendiri' },
    { type: 'Social Proof & Review', ratio: '20%', desc: 'Testimoni jujur pelanggan, unboxing, & UGC' },
    { type: 'Direct Promo & Offer', ratio: '10%', desc: 'Diskon terbatas, bundling promo, & Call to Action (CTA)' },
  ];

  const weekContentIdeas = {
    1: [
      { day: 'Senin', platform: 'TikTok / Reels', title: 'Storytelling Lahirnya ' + plan.businessName, type: 'BTS' },
      { day: 'Rabu', platform: 'Instagram Carousel', title: '5 Masalah Utama yang Diselesaikan Produk Ini', type: 'Educate' },
      { day: 'Jumat', platform: 'TikTok Video', title: 'Uji Kualitas / Comparison vs Produk Biasa', type: 'Educate' },
      { day: 'Sabtu', platform: 'WhatsApp Story & IG', title: 'Promo Launching Diskon 20% Khusus Minggu Ini', type: 'Direct Promo' },
    ],
    2: [
      { day: 'Senin', platform: 'TikTok / Reels', title: 'Reaksi Pelanggan Pertama Kali Mencoba', type: 'Social Proof' },
      { day: 'Rabu', platform: 'Instagram Feed', title: 'Penjelasan Bahan Baku & Standar Higienis', type: 'BTS' },
      { day: 'Jumat', platform: 'TikTok Live', title: 'Tanya Jawab Langsung bersama Pendiri Usaha', type: 'Educate' },
      { day: 'Sabtu', platform: 'IG Story & Broadcast', title: 'Voucher Gratis Ongkir / Free Sample', type: 'Direct Promo' },
    ],
    3: [
      { day: 'Senin', platform: 'TikTok / Reels', title: 'Tutorial Penggunaan / Cara Nikmati Produk', type: 'Educate' },
      { day: 'Rabu', platform: 'Instagram Carousel', title: 'Kumpulan Review Jujur dari Micro Influencer', type: 'Social Proof' },
      { day: 'Jumat', platform: 'TikTok Video', title: 'Day in The Life: Kesibukan Packing Pesanan', type: 'BTS' },
      { day: 'Sabtu', platform: 'WhatsApp Blast', title: 'Bundling Hemat Akhir Bulan (Payday Offer)', type: 'Direct Promo' },
    ],
    4: [
      { day: 'Senin', platform: 'TikTok / Reels', title: 'Kisah dibalik Layar Pengiriman & QC Produk', type: 'BTS' },
      { day: 'Rabu', platform: 'Instagram Feed', title: 'Mitos vs Fakta Seputar Industri ' + plan.industry, type: 'Educate' },
      { day: 'Jumat', platform: 'TikTok / Reels', title: 'Kuis Berhadiah / Giveaway Komunitas', type: 'Social Proof' },
      { day: 'Sabtu', platform: 'IG Story', title: 'Reminder Stok Terbatas & Pre-Order Batch Berikutnya', type: 'Direct Promo' },
    ],
  };

  return (
    <div className={`${cardBgClass} rounded-2xl sm:rounded-3xl p-6 space-y-6 border`}>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 dark:border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-amber-500" />
            <h3 className="text-sm font-bold">
              Engine Strategi Pemasaran Digital & Kalender Konten 30-Hari
            </h3>
          </div>
          <p className="text-xs text-stone-500 dark:text-slate-400 mt-0.5">
            Rencana aksi pilar konten TikTok, Instagram Reels, & WhatsApp Marketing untuk {plan.businessName}
          </p>
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-300 flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5" />
          <span>Siap Pakai untuk Tim Marketing</span>
        </span>
      </div>

      {/* Target Buyer Persona Card */}
      <div className="p-4 rounded-2xl bg-stone-50 dark:bg-slate-800/60 border border-stone-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase text-amber-600 dark:text-amber-400 tracking-wider">
              TARGET BUYER PERSONA UTAMA
            </span>
            <h4 className="text-xs font-bold text-stone-900 dark:text-slate-100">
              {plan.marketAnalysis?.targetAudience || 'Masyarakat umum & profesional muda usia 20-40 tahun'}
            </h4>
            <p className="text-[11px] text-stone-500 dark:text-slate-400 mt-0.5">
              Fokus Saluran: TikTok (60%), Instagram Reels (30%), WhatsApp Business (10%)
            </p>
          </div>
        </div>
      </div>

      {/* Content Pillars Distribution */}
      <div className="space-y-2">
        <span className="text-[10px] font-extrabold uppercase text-stone-500 dark:text-slate-400 tracking-wider block">
          Distribusi Pilar Konten Sosial Media:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {contentPillars.map((p, idx) => (
            <div key={idx} className="p-3 rounded-2xl bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold text-stone-900 dark:text-slate-100">{p.type}</span>
                <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600">{p.ratio}</span>
              </div>
              <p className="text-[10px] text-stone-500 dark:text-slate-400 leading-tight">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 30-Day Calendar Tabs */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-extrabold uppercase text-stone-500 dark:text-slate-400 tracking-wider flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-amber-500" />
            <span>Jadwal Ide Konten Mingguan (4 Minggu):</span>
          </span>

          <div className="flex items-center gap-1">
            {[1, 2, 3, 4].map((w) => (
              <button
                key={w}
                onClick={() => setActiveWeek(w)}
                className={`px-3 py-1 rounded-xl text-xs font-black transition cursor-pointer border ${
                  activeWeek === w
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow'
                    : 'bg-stone-100 dark:bg-slate-800 text-stone-600 dark:text-slate-300 border-stone-200 dark:border-slate-700'
                }`}
              >
                Minggu {w}
              </button>
            ))}
          </div>
        </div>

        {/* Week Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-stone-100 dark:bg-slate-900 text-stone-600 dark:text-slate-400 font-bold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="px-4 py-2.5 rounded-l-xl">Hari</th>
                <th className="px-4 py-2.5">Platform</th>
                <th className="px-4 py-2.5">Judul / Konsep Konten</th>
                <th className="px-4 py-2.5 rounded-r-xl text-right">Kategori Pilar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 dark:divide-slate-800">
              {weekContentIdeas[activeWeek as keyof typeof weekContentIdeas]?.map((c, i) => (
                <tr key={i} className="hover:bg-stone-50 dark:hover:bg-slate-900/50 transition">
                  <td className="px-4 py-3 font-bold text-stone-900 dark:text-slate-100">{c.day}</td>
                  <td className="px-4 py-3 font-medium text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                    <Video className="w-3.5 h-3.5" />
                    <span>{c.platform}</span>
                  </td>
                  <td className="px-4 py-3 font-bold text-stone-800 dark:text-slate-200">{c.title}</td>
                  <td className="px-4 py-3 text-right">
                    <span className="px-2 py-0.5 rounded-md bg-stone-200 dark:bg-slate-700 text-stone-700 dark:text-slate-300 font-bold text-[10px]">
                      {c.type}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
