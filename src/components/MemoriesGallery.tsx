import React from 'react';
import { Maximize2, Heart } from 'lucide-react';
import { Photo } from '../types';
import { BotanicalDivider } from './FloralMotifs';

interface MemoriesGalleryProps {
  photos: Photo[];
  onOpenLightbox: (photoIndex: number) => void;
}

export const MemoriesGallery: React.FC<MemoriesGalleryProps> = ({
  photos,
  onOpenLightbox,
}) => {
  // Gentle organic rotations for the authentic Polaroid feel
  const getRotationClass = (index: number) => {
    const rotations = [
      '-rotate-1.5 hover:rotate-0',
      'rotate-1 hover:rotate-0',
      '-rotate-1 hover:rotate-0',
      'rotate-2 hover:rotate-0',
      '-rotate-2 hover:rotate-0',
      'rotate-1.5 hover:rotate-0',
    ];
    return rotations[index % rotations.length];
  };

  return (
    <section id="album" className="py-12 md:py-20 px-4 md:px-8 max-w-6xl mx-auto scroll-mt-20">
      {/* Editorial Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 md:mb-16">
        <span className="font-script-romantic text-3xl md:text-4xl text-[#C88E96] block mb-1">
          Capítulo I
        </span>
        <h2 className="font-serif-editorial text-4xl md:text-5xl font-light text-[#1C1917] tracking-tight mb-4">
          O Nosso Álbum Polaroid
        </h2>
        <p className="font-sans-modern text-sm md:text-base text-[#78716C] leading-relaxed font-light mb-8">
          Fotografias instantâneas dos nossos momentos. Cada memória guardada com a borda clássica, a luz natural e a pureza do nosso amor.
        </p>

        <BotanicalDivider className="my-6" />
      </div>

      {/* Polaroid / Instax Grid */}
      {photos.length === 0 ? (
        <div className="text-center py-16 px-4 rounded-3xl apple-glass border border-[#E5B4B9]/30">
          <p className="font-serif-editorial text-xl italic text-[#78716C] mb-2">
            Nenhuma fotografia adicionada ainda.
          </p>
          <p className="text-xs text-[#A8A29E]">
            Podes adicionar fotografias instantâneas no painel de edição (Admin).
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 sm:px-2">
          {photos.map((photo, index) => {
            const rotClass = getRotationClass(index);

            return (
              <div
                key={photo.id}
                className={`group relative transition-all duration-500 ease-out transform ${rotClass} hover:z-20 hover:scale-[1.03]`}
              >
                {/* Authentic Polaroid / Instax Frame */}
                <div
                  onClick={() => onOpenLightbox(index)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      onOpenLightbox(index);
                    }
                  }}
                  aria-label={`Ver polaroid: ${photo.title}`}
                  className="cursor-pointer bg-white p-3.5 pb-9 sm:p-4 sm:pb-11 rounded-[3px] shadow-[0_10px_25px_-5px_rgba(40,30,30,0.12),0_6px_12px_-4px_rgba(40,30,30,0.08)] group-hover:shadow-[0_22px_35px_-8px_rgba(40,30,30,0.22)] border border-stone-200/70 transition-shadow duration-500 flex flex-col"
                >
                  {/* Photo area with classic subtle inset film frame */}
                  <div className="relative overflow-hidden bg-stone-100 rounded-[1px] border border-stone-300/60 aspect-[4/5] w-full">
                    <img
                      src={photo.url}
                      alt={photo.title}
                      loading="lazy"
                      className="w-full h-full object-cover filter contrast-[1.02] brightness-[1.01] transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Subtle Polaroid glossy film reflection sheen on hover */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    {/* Discrete zoom hint on hover */}
                    <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <span className="p-1.5 rounded-full bg-black/40 backdrop-blur-md text-white/95 inline-flex items-center justify-center">
                        <Maximize2 className="w-3 h-3" />
                      </span>
                    </div>
                  </div>

                  {/* Classic Polaroid Chin (the famous wide white bottom border) */}
                  <div className="pt-3.5 sm:pt-4 px-1 text-center flex flex-col items-center justify-center min-h-[46px] select-none">
                    {/* Handwritten style Title */}
                    <span className="font-script-romantic text-2xl md:text-3xl text-[#292524] tracking-wide leading-tight group-hover:text-[#6B2D38] transition-colors truncate max-w-full">
                      {photo.title}
                    </span>

                    {/* Small handwritten date or location under title */}
                    {(photo.location || photo.date) && (
                      <span className="font-sans-modern text-[10px] tracking-widest uppercase text-[#A8A29E] mt-0.5 font-light">
                        {photo.location ? `${photo.location}` : ''}
                        {photo.location && photo.date ? ' · ' : ''}
                        {photo.date || ''}
                      </span>
                    )}
                  </div>
                </div>

                {/* Subtle paper tape accent on random polaroids for authentic scrapbooking charm */}
                {index % 4 === 1 && (
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-[#F3D8DA]/60 backdrop-blur-[1px] rotate-[-2deg] rounded-[1px] shadow-sm pointer-events-none border-t border-b border-white/40" />
                )}
                {index % 4 === 3 && (
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-14 h-4 bg-[#DDE5DC]/60 backdrop-blur-[1px] rotate-[1.5deg] rounded-[1px] shadow-sm pointer-events-none border-t border-b border-white/40" />
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
