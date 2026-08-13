import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown, ChevronUp, ChevronDown, LayoutGrid } from 'lucide-react';

interface QuickScrollWidgetProps {
  theme?: 'warm-luxe' | 'dark-obsidian';
}

export const QuickScrollWidget: React.FC<QuickScrollWidgetProps> = ({ theme = 'warm-luxe' }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const scrollToWorkspace = () => {
    const el = document.getElementById('workspace-tabs');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({
        top: 600,
        behavior: 'smooth',
      });
    }
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  };

  return (
    <div className="fixed right-3 bottom-5 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 z-40 flex flex-col gap-2 items-end group">
      
      {/* Scroll Ke Atas / Up Button */}
      <button
        onClick={scrollToTop}
        className="group/btn relative bg-[#fef08a] hover:bg-[#fde047] text-slate-900 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] sm:shadow-[3px_3px_0px_0px_#0f172a] active:translate-x-0.5 active:translate-y-0.5 rounded-xl sm:rounded-2xl p-2 sm:p-3 transition-all duration-200 cursor-pointer flex items-center justify-center opacity-90 hover:opacity-100"
        title="Slide Ke Atas (Top)"
      >
        <ChevronUp className="w-4 h-4 sm:w-6 sm:h-6 text-slate-900 stroke-[3]" />
        
        {/* Hover Label Tooltip */}
        <span className="hidden sm:block absolute right-full mr-3 bg-slate-900 text-white text-[11px] font-black px-2.5 py-1 rounded-lg border-2 border-slate-900 shadow-[2px_2px_0px_0px_#fef08a] whitespace-nowrap opacity-0 group-hover/btn:opacity-100 transition-opacity pointer-events-none">
          Ke Atas ▲
        </span>
      </button>

      {/* Scroll Ke Dokumen / Workspace Center Button */}
      <button
        onClick={scrollToWorkspace}
        className="group/btn relative bg-[#bae6fd] hover:bg-[#7dd3fc] text-slate-900 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] sm:shadow-[3px_3px_0px_0px_#0f172a] active:translate-x-0.5 active:translate-y-0.5 rounded-xl sm:rounded-2xl p-2 sm:p-3 transition-all duration-200 cursor-pointer flex items-center justify-center opacity-90 hover:opacity-100"
        title="Slide Ke Dokumen"
      >
        <LayoutGrid className="w-4 h-4 sm:w-6 sm:h-6 text-slate-900 stroke-[2.5]" />
        
        {/* Hover Label Tooltip */}
        <span className="hidden sm:block absolute right-full mr-3 bg-slate-900 text-white text-[11px] font-black px-2.5 py-1 rounded-lg border-2 border-slate-900 shadow-[2px_2px_0px_0px_#bae6fd] whitespace-nowrap opacity-0 group-hover/btn:opacity-100 transition-opacity pointer-events-none">
          Dokumen 📄
        </span>
      </button>

      {/* Scroll Ke Bawah / Down Button */}
      <button
        onClick={scrollToBottom}
        className="group/btn relative bg-[#dcfce7] hover:bg-[#bbf7d0] text-slate-900 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] sm:shadow-[3px_3px_0px_0px_#0f172a] active:translate-x-0.5 active:translate-y-0.5 rounded-xl sm:rounded-2xl p-2 sm:p-3 transition-all duration-200 cursor-pointer flex items-center justify-center opacity-90 hover:opacity-100"
        title="Slide Ke Bawah (Bottom)"
      >
        <ChevronDown className="w-4 h-4 sm:w-6 sm:h-6 text-slate-900 stroke-[3]" />
        
        {/* Hover Label Tooltip */}
        <span className="hidden sm:block absolute right-full mr-3 bg-slate-900 text-white text-[11px] font-black px-2.5 py-1 rounded-lg border-2 border-slate-900 shadow-[2px_2px_0px_0px_#dcfce7] whitespace-nowrap opacity-0 group-hover/btn:opacity-100 transition-opacity pointer-events-none">
          Ke Bawah ▼
        </span>
      </button>

    </div>
  );
};
