import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  Copy, 
  Check, 
  RefreshCw,
  Sliders,
  ShieldAlert,
  HeartHandshake,
  Briefcase,
  TrendingUp
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { ChatMessage, Language, ToneStyle } from '../types';

interface AIChatConsultantProps {
  businessName: string;
  industry: string;
  language: Language;
  theme?: 'warm-luxe' | 'dark-obsidian';
  toneStyle?: ToneStyle;
}

export const AIChatConsultant: React.FC<AIChatConsultantProps> = ({
  businessName,
  industry,
  language,
  theme = 'warm-luxe',
  toneStyle = 'casual',
}) => {
  const isDark = theme === 'dark-obsidian';
  const [currentTone, setCurrentTone] = useState<string>(toneStyle || 'casual');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: `Halo! Saya **CorPlan**, konsultan bisnis tingkat senior, analis keuangan, dan pakar strategi penggalangan dana Anda.

Saya siap membantu Anda menganalisis bisnis **${businessName || 'Anda'}** di sektor **${industry || 'Umum'}**.

Silakan tanyakan apa saja seputar:
- **Penyusunan Rencana Bisnis** & Evaluasi Model Monetisasi
- **Simulasi Proyeksi Keuangan** (CapEx, OpEx, BEP, Arus Kas)
- **Strategi Pitch Deck Investor** & Pertanyaan Calon Investor
- **Analisis SWOT, PESTEL & Manajemen Risiko**`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toneOptions = [
    { id: 'simple', label: 'Supportive Mentor', desc: 'Bahasa ramah & mudah untuk pemula', icon: HeartHandshake, color: 'emerald' },
    { id: 'casual', label: 'Conversational', desc: 'Santai, taktis & relevan Gen-Z', icon: TrendingUp, color: 'amber' },
    { id: 'formal', label: 'Analitis Formal', desc: 'Gaya korporat & perbankan resmi', icon: Briefcase, color: 'indigo' },
    { id: 'aggressive_vc', label: 'Aggressive Investor', desc: 'Kritis, menantang & tajam VC style', icon: ShieldAlert, color: 'rose' },
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (customText?: string) => {
    const textToSend = customText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!customText) setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.sender === 'user' ? 'user' : 'model',
            parts: [{ text: m.text }],
          })),
          businessContext: { businessName, industry, language },
          toneStyle: currentTone,
        }),
      });

      if (!response.ok) throw new Error('Gagal menghubungi AI Server');

      const data = await response.json();
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: data.text || 'Maaf, terjadi kendala teknis saat memproses tanggapan.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: `⚠️ **Gagal Mengirim Pesan:** ${err.message || 'Koneksi terputus'}. Pastikan koneksi internet Anda stabil.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const suggestedPrompts = [
    'Bagaimana cara meningkatkan marjin Laba Bersih bisnis saya?',
    'Buatkan 5 pertanyaan tersulit yang mungkin ditanyakan Investor.',
    'Berikan rekomendasi strategi saluran pemasaran paling efisien.',
    'Bagaimana menghitung ulang Break Even Point jika biaya sewa naik 20%?',
  ];

  const cardBgClass = isDark
    ? 'bg-[#0e111a]/90 border-white/10 text-slate-100 shadow-2xl'
    : 'bg-white/90 border-stone-200/90 text-[#181822] shadow-xl shadow-stone-900/5 backdrop-blur-2xl';

  return (
    <div className={`max-w-5xl mx-auto rounded-2xl sm:rounded-3xl border flex flex-col h-[650px] ${cardBgClass}`}>
      
      {/* Chat Header */}
      <div className="p-4 sm:p-5 border-b border-stone-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-stone-900 dark:text-slate-100">Konsultan Bisnis & AI Strategic Advisor</h2>
              <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-300">
                Mode Active: {toneOptions.find(t => t.id === currentTone)?.label}
              </span>
            </div>
            <p className="text-xs text-stone-500 dark:text-slate-400">Analisis interaktif real-time berbasis Google Gemini AI</p>
          </div>
        </div>

        <button
          onClick={() => setMessages([messages[0]])}
          className="p-2 text-stone-400 hover:text-stone-700 dark:hover:text-slate-200 transition rounded-full hover:bg-stone-100 dark:hover:bg-white/10 cursor-pointer"
          title="Reset Percakapan"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Dynamic Tone Adjustment Slider / Selector */}
      <div className="px-4 py-2.5 bg-stone-100/80 dark:bg-slate-900/60 border-b border-stone-200 dark:border-white/10 flex items-center gap-2 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-1.5 text-xs font-bold text-stone-600 dark:text-slate-400 shrink-0 mr-1">
          <Sliders className="w-3.5 h-3.5 text-amber-500" />
          <span>Gaya Respon AI:</span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {toneOptions.map((tone) => {
            const Icon = tone.icon;
            const isSelected = currentTone === tone.id;
            return (
              <button
                key={tone.id}
                onClick={() => setCurrentTone(tone.id)}
                className={`px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer border ${
                  isSelected
                    ? 'bg-[#12131a] text-white border-slate-900 shadow-md dark:bg-amber-500 dark:text-slate-950 dark:border-amber-400'
                    : 'bg-white dark:bg-slate-800 text-stone-600 dark:text-slate-300 border-stone-200 dark:border-slate-700 hover:border-amber-500/40'
                }`}
                title={tone.desc}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tone.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex items-start gap-3 ${m.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
              m.sender === 'user' 
                ? 'bg-[#12131a] text-white shadow-md' 
                : 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30'
            }`}>
              {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div className={`group relative max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
              m.sender === 'user'
                ? 'bg-[#12131a] text-white rounded-tr-none shadow-md'
                : isDark 
                  ? 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none' 
                  : 'bg-stone-100 border border-stone-200 text-stone-800 rounded-tl-none'
            }`}>
              <div className="markdown-body font-sans">
                <ReactMarkdown>{m.text}</ReactMarkdown>
              </div>

              <div className="flex items-center justify-between pt-2 mt-2 border-t border-stone-200/40 dark:border-white/10 text-[10px] text-stone-400 dark:text-slate-500">
                <span>{m.timestamp}</span>
                {m.sender === 'assistant' && (
                  <button
                    onClick={() => handleCopy(m.id, m.text)}
                    className="opacity-0 group-hover:opacity-100 transition flex items-center gap-1 hover:text-stone-700 dark:hover:text-slate-300"
                  >
                    {copiedId === m.id ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedId === m.id ? 'Tersalin' : 'Salin'}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center animate-pulse">
              <Bot className="w-4 h-4" />
            </div>
            <div className={`p-4 rounded-2xl text-xs flex items-center gap-2 ${
              isDark ? 'bg-slate-900 text-slate-400' : 'bg-stone-100 text-stone-600'
            }`}>
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
              <span>Memproses analisis AI...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts */}
      <div className="px-4 sm:px-6 py-2 border-t border-stone-200 dark:border-white/10 flex items-center gap-2 overflow-x-auto scrollbar-none">
        <span className="text-[10px] font-bold text-stone-400 dark:text-slate-500 shrink-0">REKOMENDASI:</span>
        {suggestedPrompts.map((p, i) => (
          <button
            key={i}
            onClick={() => handleSend(p)}
            className="text-[11px] font-medium bg-stone-100 dark:bg-white/5 hover:bg-stone-200 dark:hover:bg-white/10 text-stone-700 dark:text-slate-300 px-3 py-1.5 rounded-full border border-stone-200 dark:border-white/10 whitespace-nowrap transition shrink-0 cursor-pointer"
          >
            💡 {p}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div className="p-4 border-t border-stone-200 dark:border-white/10">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tanyakan analisis bisnis, proyeksi keuangan, atau strategi investor..."
            className={`flex-1 text-xs sm:text-sm px-4 py-3 rounded-full border focus:outline-none ${
              isDark 
                ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500' 
                : 'bg-white border-stone-300 text-stone-900 placeholder-stone-400'
            }`}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-3 bg-[#12131a] dark:bg-amber-500 hover:opacity-90 disabled:opacity-40 text-white rounded-full transition shadow-md cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

    </div>
  );
};
