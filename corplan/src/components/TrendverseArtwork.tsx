import React from 'react';

interface TrendverseArtworkProps {
  theme?: 'warm-luxe' | 'dark-obsidian';
}

export const TrendverseArtwork: React.FC<TrendverseArtworkProps> = ({ theme = 'warm-luxe' }) => {
  if (theme === 'dark-obsidian') {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-60">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[180px]" />
        <div className="absolute top-1/2 -right-40 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[180px]" />
        <div className="absolute -bottom-40 left-1/3 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[180px]" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Off-white / Warm Cream Neo-Brutalist background base */}
      <div className="absolute inset-0 bg-[#fbf9f4]" />

      {/* Subtle geometric dot grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.06]" 
        style={{
          backgroundImage: `radial-gradient(#0f172a 1.5px, transparent 1.5px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Playful Neo-Brutalist Soft Gradient Accents */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#fef08a]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-24 w-96 h-96 bg-[#bae6fd]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 left-1/4 w-96 h-96 bg-[#fbcfe8]/40 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
};
