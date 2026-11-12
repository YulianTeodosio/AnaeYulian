import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, MapPin, Calendar } from 'lucide-react';
import { Photo } from '../types';

interface LightboxModalProps {
  photos: Photo[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  photos,
  currentIndex,
  onClose,
  onNavigate,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const photo = photos[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNavigate((currentIndex + 1) % photos.length);
      if (e.key === 'ArrowLeft') onNavigate((currentIndex - 1 + photos.length) % photos.length);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, photos.length, onClose, onNavigate]);

  if (!photo) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 backdrop-blur-xl transition-all duration-300"
      role="dialog"
      aria-modal="true"
      aria-label="Visualizador de fotografias em ecrã inteiro"
    >
      {/* Top Bar Controls */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4 md:p-6 bg-gradient-to-b from-black/80 via-black/40 to-transparent text-white">
        <div className="text-xs text-white/70 font-sans-modern tracking-wider">
          <span className="font-medium text-white">{currentIndex + 1}</span> / {photos.length}
        </div>

        <div className="flex items-center gap-3">
          {/* Zoom toggle */}
          <button
            onClick={() => setIsZoomed(!isZoomed)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/90 transition-colors cursor-pointer"
            aria-label={isZoomed ? 'Diminuir zoom' : 'Aumentar zoom'}
          >
            {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
          </button>

          {/* Close button */}
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/15 hover:bg-white/30 text-white transition-colors cursor-pointer"
            aria-label="Fechar ecrã inteiro"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Image Stage */}
      <div className="relative w-full h-full flex items-center justify-center p-4 md:p-12 overflow-hidden">
        {/* Polaroid frame inside lightbox */}
        <div
          className={`relative bg-white p-3 sm:p-4 pb-8 sm:pb-10 rounded-[3px] shadow-2xl transition-all duration-300 ease-out select-none border border-white/20 ${
            isZoomed ? 'scale-115 cursor-zoom-out' : 'scale-100 cursor-zoom-in'
          }`}
          onClick={() => setIsZoomed(!isZoomed)}
        >
          <img
            src={photo.url}
            alt={photo.title}
            className="max-h-[68vh] max-w-[88vw] object-contain rounded-[1px] border border-stone-300/60"
          />

          {/* Bottom title in Polaroid frame */}
          <div className="pt-3 text-center">
            <span className="font-script-romantic text-2xl sm:text-3xl text-[#292524] block">
              {photo.title}
            </span>
            {(photo.location || photo.date) && (
              <span className="text-[10px] tracking-widest uppercase text-[#A8A29E] font-sans-modern block mt-0.5">
                {photo.location ? `${photo.location}` : ''}
                {photo.location && photo.date ? ' · ' : ''}
                {photo.date || ''}
              </span>
            )}
          </div>
        </div>

        {/* Previous Button */}
        {photos.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((currentIndex - 1 + photos.length) % photos.length);
            }}
            className="absolute left-2 md:left-6 p-3 rounded-full bg-black/40 hover:bg-black/70 text-white/90 hover:text-white transition-all backdrop-blur-sm -translate-y-1/2 top-1/2 cursor-pointer"
            aria-label="Fotografia anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Next Button */}
        {photos.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((currentIndex + 1) % photos.length);
            }}
            className="absolute right-2 md:right-6 p-3 rounded-full bg-black/40 hover:bg-black/70 text-white/90 hover:text-white transition-all backdrop-blur-sm -translate-y-1/2 top-1/2 cursor-pointer"
            aria-label="Próxima fotografia"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
};
