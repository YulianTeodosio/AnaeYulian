import React, { useState } from 'react';
import { Mail, X, Feather } from 'lucide-react';
import { Letter } from '../types';
import { BotanicalDivider, LilyIllustration, RoseIllustration, WaxSealStamp } from './FloralMotifs';
import { playPaperSound, playChimeSound } from '../utils/audio';

interface LettersSectionProps {
  letters: Letter[];
}

export const LettersSection: React.FC<LettersSectionProps> = ({ letters }) => {
  const [selectedLetter, setSelectedLetter] = useState<Letter | null>(null);

  const featuredLetter = letters.find((l) => l.isFeatured) || letters[0];
  const otherLetters = letters.filter((l) => l.id !== featuredLetter?.id);

  const handleOpenLetter = (letter: Letter) => {
    playPaperSound();
    playChimeSound();
    setSelectedLetter(letter);
  };

  const handleCloseLetter = () => {
    setSelectedLetter(null);
  };

  return (
    <section id="letters" className="py-12 md:py-20 px-4 md:px-8 max-w-5xl mx-auto scroll-mt-20">
      {/* Editorial Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 md:mb-16">
        <span className="font-script-romantic text-3xl md:text-4xl text-[#C88E96] block mb-1">
          Capítulo II
        </span>
        <h2 className="font-serif-editorial text-4xl md:text-5xl font-light text-[#1C1917] tracking-tight mb-4">
          Cartas & Mensagens
        </h2>
        <p className="font-sans-modern text-sm md:text-base text-[#78716C] leading-relaxed font-light mb-8">
          Palavras que não se desvanecem com o vento. Cartas seladas com cera, escritas para guardar a verdade do nosso amor.
        </p>
        <BotanicalDivider className="my-8" />
      </div>

      {/* Featured Master Letter: "Para ti, Ana." */}
      {featuredLetter && (
        <div className="mb-14">
          <div className="relative rounded-3xl p-1 bg-gradient-to-br from-[#E5B4B9]/40 via-white to-[#DDE5DC]/50 shadow-xl shadow-[#6B2D38]/10 max-w-3xl mx-auto">
            <article className="relative rounded-[22px] bg-[#FDFBF7] p-7 md:p-12 border border-[#E5B4B9]/30 overflow-hidden paper-texture">
              {/* Botanical watermark */}
              <div className="absolute -top-12 -right-12 opacity-15 pointer-events-none">
                <LilyIllustration className="w-56 h-56" />
              </div>

              {/* Envelope Header styling */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#E5B4B9]/30">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F7E7E8] text-[#A86B74] text-xs font-medium tracking-wider uppercase mb-2">
                    <Feather className="w-3 h-3 text-[#C88E96]" />
                    Carta Principal
                  </span>
                  <h3 className="font-serif-editorial text-3xl md:text-4xl font-normal text-[#1C1917]">
                    {featuredLetter.title}
                  </h3>
                  {featuredLetter.subtitle && (
                    <p className="text-xs md:text-sm text-[#78716C] font-light mt-0.5">
                      {featuredLetter.subtitle}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <span className="text-xs text-[#A8A29E] block">Data</span>
                    <span className="font-serif-editorial text-sm italic text-[#1C1917]">
                      {featuredLetter.date}
                    </span>
                  </div>

                  {/* Wax seal */}
                  <div
                    onClick={() => handleOpenLetter(featuredLetter)}
                    className="cursor-pointer transition-transform hover:scale-105 active:scale-95"
                    role="button"
                    tabIndex={0}
                    aria-label={`Abrir carta: ${featuredLetter.title}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') handleOpenLetter(featuredLetter);
                    }}
                  >
                    <WaxSealStamp text="A & Y" color={featuredLetter.waxSealColor || '#C88E96'} size={56} />
                  </div>
                </div>
              </div>

              {/* Excerpt preview */}
              <p className="font-serif-editorial text-lg md:text-xl text-[#44403C] italic leading-relaxed mb-6 font-light">
                “{featuredLetter.excerpt}”
              </p>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#E5B4B9]/20">
                <span className="font-script-romantic text-2xl text-[#C88E96]">
                  {featuredLetter.signature}
                </span>

                <button
                  onClick={() => handleOpenLetter(featuredLetter)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1C1917] text-[#FAF7F5] text-xs font-medium tracking-wide hover:bg-[#6B2D38] transition-all shadow-sm active:scale-95"
                >
                  <Mail className="w-3.5 h-3.5 text-[#F3D8DA]" />
                  <span>Ler carta completa</span>
                </button>
              </div>
            </article>
          </div>
        </div>
      )}

      {/* Other Letters Grid */}
      {otherLetters.length > 0 && (
        <div>
          <div className="text-center mb-8">
            <h4 className="font-serif-editorial text-2xl font-light text-[#1C1917] italic">
              Mais mensagens do coração
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherLetters.map((letter) => (
              <article
                key={letter.id}
                onClick={() => handleOpenLetter(letter)}
                className="apple-glass rounded-2xl p-6 border border-[#E5B4B9]/30 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-[#A8A29E] font-medium tracking-wider">
                      {letter.date}
                    </span>
                    <WaxSealStamp text="A&Y" color={letter.waxSealColor || '#8F9E8B'} size={40} />
                  </div>

                  <h4 className="font-serif-editorial text-2xl text-[#1C1917] mb-2 group-hover:text-[#6B2D38] transition-colors">
                    {letter.title}
                  </h4>

                  <p className="font-sans-modern text-sm text-[#78716C] leading-relaxed line-clamp-3 font-light mb-4">
                    {letter.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#E5B4B9]/20 text-xs">
                  <span className="font-script-romantic text-xl text-[#C88E96]">
                    {letter.signature}
                  </span>
                  <span className="text-[#C88E96] font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Abrir carta →
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* Full Letter Modal */}
      {selectedLetter && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md transition-opacity duration-300 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-letter-title"
        >
          <div className="relative w-full max-w-2xl max-h-[90vh] my-auto overflow-y-auto rounded-3xl bg-[#FDFBF7] border border-[#E5B4B9]/40 p-8 md:p-14 shadow-2xl paper-texture animate-in fade-in zoom-in-95 duration-200">
            {/* Close button */}
            <button
              onClick={handleCloseLetter}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/80 border border-[#E5B4B9]/30 text-[#78716C] hover:text-[#1C1917] hover:bg-[#F7E7E8] transition-all"
              aria-label="Fechar carta"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Letter top stamp */}
            <div className="text-center mb-8">
              <div className="inline-block mx-auto mb-3">
                <WaxSealStamp text="A & Y" color={selectedLetter.waxSealColor || '#C88E96'} size={58} />
              </div>
              <p className="font-sans-modern text-xs text-[#A86B74] tracking-widest uppercase">
                {selectedLetter.date}
              </p>
              <h3 id="modal-letter-title" className="font-serif-editorial text-3xl md:text-5xl font-normal text-[#1C1917] mt-2 mb-1">
                {selectedLetter.title}
              </h3>
              {selectedLetter.subtitle && (
                <p className="font-serif-editorial italic text-[#78716C] text-sm md:text-base">
                  {selectedLetter.subtitle}
                </p>
              )}
            </div>

            {/* Letter body paragraphs */}
            <div className="space-y-5 text-[#292524] font-serif-editorial text-lg md:text-xl leading-relaxed font-light mb-10">
              {selectedLetter.content.map((paragraph, idx) => (
                <p key={idx} className="indent-4 md:indent-6">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Letter Signature */}
            <div className="pt-8 border-t border-[#E5B4B9]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-[#8F9E8B]">
                <RoseIllustration className="w-6 h-6 opacity-80" />
                <span className="text-xs font-sans-modern text-[#A8A29E] tracking-wider">
                  Sempre guardado aqui
                </span>
              </div>

              <div className="text-right">
                <span className="font-script-romantic text-3xl md:text-4xl text-[#6B2D38] block">
                  {selectedLetter.signature}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
