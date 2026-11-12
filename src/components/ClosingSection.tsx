import React from 'react';
import { Heart, ArrowUp, Sparkles } from 'lucide-react';
import { LilyIllustration, RoseIllustration, BabysBreathSprig } from './FloralMotifs';

interface ClosingSectionProps {
  closingNote?: string;
  closingAuthor?: string;
  onReturnToTop: () => void;
  onOpenCover: () => void;
}

export const ClosingSection: React.FC<ClosingSectionProps> = ({
  closingNote = 'To be continued…',
  closingAuthor = 'Com carinho, Yulian.',
  onReturnToTop,
  onOpenCover,
}) => {
  return (
    <footer className="relative py-20 md:py-32 px-6 text-center overflow-hidden bg-gradient-to-b from-transparent via-[#F7E7E8]/30 to-[#FDFBF7]">
      {/* Background floral accents */}
      <div className="max-w-xl mx-auto flex flex-col items-center relative z-10">
        {/* Subtle decorative floral cluster */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="animate-soft-float">
            <LilyIllustration className="w-12 h-12 drop-shadow-sm" />
          </div>
          <div className="w-14 h-14 rounded-full bg-white p-2 border border-[#E5B4B9]/40 shadow-sm flex items-center justify-center">
            <RoseIllustration className="w-9 h-9" />
          </div>
          <div className="animate-soft-float" style={{ animationDelay: '1.2s' }}>
            <LilyIllustration className="w-12 h-12 transform scale-x-[-1] drop-shadow-sm" />
          </div>
        </div>

        <BabysBreathSprig className="w-28 h-8 opacity-75 mb-6" />

        <p className="font-serif-editorial text-4xl md:text-5xl font-light text-[#1C1917] tracking-tight italic mb-3">
          {closingNote}
        </p>

        <p className="font-script-romantic text-3xl md:text-4xl text-[#6B2D38] mb-8 select-none">
          {closingAuthor}
        </p>

        <p className="font-sans-modern text-xs md:text-sm text-[#78716C] max-w-sm mx-auto leading-relaxed font-light mb-10">
          Este pequeno álbum continuará a crescer com cada novo dia, cada novo sorriso e cada novo abraço.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onReturnToTop}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 border border-[#E5B4B9]/40 text-xs font-medium text-[#78716C] hover:text-[#1C1917] hover:border-[#C88E96] transition-all shadow-sm active:scale-95"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>Voltar ao topo</span>
          </button>

          <button
            onClick={onOpenCover}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1C1917] text-[#FAF7F5] text-xs font-medium hover:bg-[#6B2D38] transition-all shadow-md active:scale-95"
          >
            <Heart className="w-3.5 h-3.5 text-[#F3D8DA] fill-current" />
            <span>Ver capa do livro</span>
          </button>
        </div>

        <div className="mt-12 flex flex-col items-center gap-2">
          <img
            src="/favicon.png"
            alt="Silhueta de Ana e Yulian"
            className="w-10 h-10 rounded-full border border-[#E5B4B9]/50 shadow-sm object-cover"
          />
          <div className="text-[11px] text-[#A8A29E] tracking-widest font-light">
            ANA & YULIAN © {new Date().getFullYear()} · NOSSO PEQUENO MUNDO
          </div>
        </div>
      </div>
    </footer>
  );
};
