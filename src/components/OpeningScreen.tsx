import React from 'react';
import { ArrowRight, BookOpen, Heart } from 'lucide-react';
import { LilyIllustration, RoseIllustration, BabysBreathSprig } from './FloralMotifs';
import { playChimeSound } from '../utils/audio';

interface OpeningScreenProps {
  onOpenStory: () => void;
  partner1: string;
  partner2: string;
  subtitle: string;
}

export const OpeningScreen: React.FC<OpeningScreenProps> = ({
  onOpenStory,
  partner1,
  partner2,
  subtitle,
}) => {
  const handleOpen = () => {
    playChimeSound();
    onOpenStory();
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-between px-6 py-12 md:py-16 overflow-hidden bg-gradient-to-b from-[#FDFBF7] via-[#FAF7F5] to-[#F7E7E8]/40">
      {/* Delicate background ambient lights */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#F3D8DA]/30 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-24 w-80 h-80 rounded-full bg-[#DDE5DC]/35 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[500px] h-72 rounded-full bg-[#F4EBE1]/50 blur-3xl pointer-events-none" />

      {/* Centerpiece: Editorial Book Cover & Enhanced Botanical Composition */}
      <div className="relative z-10 max-w-xl w-full flex flex-col items-center text-center my-auto py-6">
        {/* Enhanced floating botanical lily cluster */}
        <div className="relative mb-6 flex items-center justify-center">
          <div className="absolute -left-14 -top-8 animate-soft-float">
            <LilyIllustration className="w-16 h-16 md:w-20 md:h-20 drop-shadow-sm" />
          </div>
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full p-1 bg-gradient-to-tr from-[#E5B4B9] via-white to-[#DDE5DC] shadow-lg shadow-[#6B2D38]/10 flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-[#FDFBF7] flex items-center justify-center">
              <RoseIllustration className="w-12 h-12 md:w-14 md:h-14" />
            </div>
          </div>
          <div className="absolute -right-14 -bottom-4 animate-soft-float" style={{ animationDelay: '1.5s' }}>
            <LilyIllustration className="w-16 h-16 md:w-18 md:h-18 transform scale-x-[-1] drop-shadow-sm" />
          </div>
        </div>

        {/* Delicate baby's breath sprig */}
        <div className="mb-4 opacity-80">
          <BabysBreathSprig className="w-24 h-8 text-[#8F9E8B]" />
        </div>

        {/* Editorial Titles */}
        <p className="font-script-romantic text-3xl md:text-4xl text-[#C88E96] mb-1 select-none">
          O nosso cantinho
        </p>

        <h1 className="font-serif-editorial text-5xl md:text-7xl font-light tracking-tight text-[#1C1917] mb-3">
          <span className="italic font-normal">{partner1}</span>
          <span className="text-[#C88E96] mx-3 text-4xl md:text-5xl font-light">&</span>
          <span className="italic font-normal">{partner2}</span>
        </h1>

        <p className="font-sans-modern text-sm md:text-base text-[#78716C] max-w-md mx-auto leading-relaxed mb-7 font-light px-4">
          {subtitle}
        </p>

        {/* Couple Real Photo (Ana & Yulian smiling together) in iconic Polaroid Frame */}
        <div className="relative mb-8 group cursor-pointer" onClick={handleOpen}>
          <div className="w-64 md:w-72 bg-white p-3 pb-8 md:p-3.5 md:pb-9 rounded-[2px] shadow-2xl shadow-[#6B2D38]/15 border border-stone-200/70 transform -rotate-1.5 group-hover:rotate-0 transition-all duration-500 ease-out">
            <div className="relative overflow-hidden aspect-[4/3] rounded-[1px] bg-stone-100 border border-stone-300/50">
              <img
                src="/assets/aistudio/IMG_5056_165775f7.jpeg"
                alt="Ana & Yulian juntos e sorridentes"
                className="w-full h-full object-cover object-center filter brightness-[1.02] contrast-[0.98] group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="pt-2.5 text-center">
              <span className="font-script-romantic text-2xl text-[#292524] group-hover:text-[#6B2D38] transition-colors flex items-center justify-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-[#C88E96] fill-current" />
                Ana & Yulian
              </span>
            </div>
          </div>
          {/* Subtle backing shadow card */}
          <div className="absolute -inset-1 rounded-[2px] bg-white/40 -z-10 transform rotate-2 pointer-events-none" />
        </div>

        {/* Open Button (Apple-style tactile feedback) */}
        <button
          onClick={handleOpen}
          aria-label="Abrir a história de Ana e Yulian"
          className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#1C1917] text-[#FAF7F5] font-sans-modern text-sm font-medium tracking-wide shadow-lg shadow-[#1C1917]/20 hover:bg-[#6B2D38] hover:shadow-xl hover:shadow-[#6B2D38]/25 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-300"
        >
          <BookOpen className="w-4 h-4 text-[#F3D8DA] transition-transform duration-300 group-hover:scale-110" />
          <span>Abrir o nosso mundo</span>
          <ArrowRight className="w-4 h-4 text-[#F3D8DA] transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>

      {/* Bottom Footer Note */}
      <div className="relative z-10 text-center text-xs text-[#A8A29E] tracking-wider font-light flex items-center justify-center gap-2">
        <span>Criado com amor</span>
        <span className="w-1 h-1 rounded-full bg-[#E5B4B9]" />
        <span>Para todo o sempre</span>
      </div>
    </div>
  );
};
