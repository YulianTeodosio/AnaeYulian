import React, { useState } from 'react';
import { Heart, Plus, Sparkles } from 'lucide-react';
import { LoveNote } from '../types';
import { BotanicalDivider, LilyIllustration } from './FloralMotifs';

interface LoveNotesSectionProps {
  loveNotes: LoveNote[];
  onAddNote?: (text: string) => void;
}

export const LoveNotesSection: React.FC<LoveNotesSectionProps> = ({
  loveNotes,
  onAddNote,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newNoteText, setNewNoteText] = useState('');
  const [lovedItems, setLovedItems] = useState<Record<string, boolean>>({});

  const toggleLoved = (id: string) => {
    setLovedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;
    onAddNote?.(newNoteText.trim());
    setNewNoteText('');
    setIsAdding(false);
  };

  return (
    <section id="lovenotes" className="py-12 md:py-20 px-4 md:px-8 max-w-5xl mx-auto scroll-mt-20">
      {/* Editorial Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 md:mb-16">
        <span className="font-script-romantic text-3xl md:text-4xl text-[#C88E96] block mb-1">
          Capítulo III
        </span>
        <h2 className="font-serif-editorial text-4xl md:text-5xl font-light text-[#1C1917] tracking-tight mb-4">
          Coisas Que Amo em Ti
        </h2>
        <p className="font-sans-modern text-sm md:text-base text-[#78716C] leading-relaxed font-light mb-6">
          Não são apenas os grandes gestos, mas as infinitas pequenas coisas que fazem de ti a pessoa mais especial da minha vida.
        </p>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF7F5] border border-[#E5B4B9]/40 text-xs text-[#A86B74]">
          <Sparkles className="w-3.5 h-3.5 text-[#C88E96]" />
          <span>{loveNotes.length} pequenas razões guardadas com carinho</span>
        </div>

        <BotanicalDivider className="my-8" />
      </div>

      {/* Asymmetric / Organic Notes Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {loveNotes.map((note, index) => {
          const isLoved = !!lovedItems[note.id];
          const isHighlight = index % 5 === 0;

          return (
            <div
              key={note.id}
              className={`relative rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between ${
                isHighlight
                  ? 'bg-gradient-to-br from-[#F7E7E8]/90 via-[#FDFBF7] to-[#FAF7F5] border-[#E5B4B9]/50 shadow-md sm:col-span-2 lg:col-span-1'
                  : 'bg-white/80 border-[#E5B4B9]/30 shadow-sm hover:shadow-md'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-serif-editorial italic text-xs text-[#C88E96]">
                    Razão #{index + 1}
                  </span>
                  <button
                    onClick={() => toggleLoved(note.id)}
                    aria-label="Dar carinho a esta razão"
                    className="p-1 rounded-full text-[#A8A29E] hover:text-[#6B2D38] transition-colors"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 transition-transform duration-300 ${
                        isLoved ? 'text-[#C88E96] fill-[#C88E96] scale-110' : 'hover:scale-110'
                      }`}
                    />
                  </button>
                </div>

                <p className="font-serif-editorial text-xl md:text-2xl text-[#292524] leading-snug font-normal">
                  “{note.text}”
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-[#E5B4B9]/20 flex items-center justify-between text-[11px] text-[#A8A29E]">
                <span className="font-script-romantic text-base text-[#C88E96]">
                  com amor, Yulian
                </span>
                <LilyIllustration className="w-4 h-4 opacity-70" />
              </div>
            </div>
          );
        })}

        {/* Quick Add Card */}
        <div className="rounded-2xl border-2 border-dashed border-[#E5B4B9]/50 p-6 flex flex-col items-center justify-center text-center bg-white/30 hover:bg-white/60 transition-all min-h-[160px]">
          {isAdding ? (
            <form onSubmit={handleAddSubmit} className="w-full space-y-3">
              <textarea
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
                placeholder="Ex: A forma como me abraças ao acordar..."
                rows={3}
                className="w-full p-2.5 text-xs rounded-xl border border-[#E5B4B9]/40 bg-white focus:outline-none focus:ring-1 focus:ring-[#C88E96]"
                autoFocus
              />
              <div className="flex items-center justify-center gap-2">
                <button
                  type="submit"
                  className="px-3.5 py-1.5 rounded-full bg-[#1C1917] text-white text-xs font-medium hover:bg-[#6B2D38]"
                >
                  Guardar
                </button>
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-3.5 py-1.5 rounded-full bg-stone-200 text-stone-700 text-xs"
                >
                  Cancelar
                </button>
              </div>
            </form>
          ) : (
            <button
              onClick={() => setIsAdding(true)}
              className="flex flex-col items-center gap-2 text-[#78716C] hover:text-[#6B2D38] transition-colors p-4 w-full"
            >
              <div className="w-8 h-8 rounded-full bg-[#F7E7E8] flex items-center justify-center text-[#C88E96]">
                <Plus className="w-4 h-4" />
              </div>
              <span className="font-serif-editorial text-base font-normal">
                Escrever mais uma razão
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
