import React from 'react';
import { Image as ImageIcon, Mail, Lock, Volume2, VolumeX } from 'lucide-react';

export type SectionId = 'album' | 'letters';

interface NavigationProps {
  activeSection: SectionId;
  onSelectSection: (section: SectionId) => void;
  onOpenAdmin: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onReturnToCover?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeSection,
  onSelectSection,
  onOpenAdmin,
  soundEnabled,
  onToggleSound,
  onReturnToCover,
}) => {
  const navItems: { id: SectionId; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'album', label: 'Álbum', icon: ImageIcon },
    { id: 'letters', label: 'Cartas', icon: Mail },
  ];

  return (
    <>
      {/* Mobile & Desktop Floating Bottom Dock with responsive active indicators */}
      <nav
        aria-label="Navegação Principal"
        className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2.5rem)] max-w-xs transition-all duration-300"
      >
        <div className="apple-glass rounded-full px-3 sm:px-4 py-2 sm:py-2.5 shadow-xl shadow-[#6B2D38]/10 flex items-center justify-between border border-[#E5B4B9]/40">
          <div className="flex items-center gap-1.5 sm:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectSection(item.id)}
                  aria-label={`Secção ${item.label}`}
                  className={`relative flex items-center gap-1.5 py-1.5 px-3.5 rounded-full transition-all duration-300 select-none cursor-pointer ${
                    isActive
                      ? 'text-[#6B2D38] font-semibold bg-[#F3D8DA]/85 shadow-sm scale-[1.02]'
                      : 'text-[#78716C] hover:text-[#1C1917] hover:bg-white/40 active:scale-95'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isActive ? 'stroke-[2.2]' : 'stroke-[1.8]'}`} />
                  <span className="text-xs tracking-tight">{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-1 pl-2 border-l border-[#E5B4B9]/40">
            {/* Sound Mute/Play Toggle */}
            <button
              onClick={onToggleSound}
              aria-label={soundEnabled ? 'Silenciar sons' : 'Ativar sons românticos'}
              title={soundEnabled ? 'Sons ativados' : 'Sons silenciados'}
              className="p-1.5 sm:p-2 rounded-full text-[#78716C] hover:text-[#6B2D38] hover:bg-[#F3D8DA]/40 transition-colors cursor-pointer"
            >
              {soundEnabled ? (
                <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C88E96]" />
              ) : (
                <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#A8A29E]" />
              )}
            </button>

            {/* Discreet Admin Lock */}
            <button
              onClick={onOpenAdmin}
              aria-label="Abrir painel de edição (Admin)"
              title="Gerir conteúdo (Admin)"
              className="p-1.5 sm:p-2 rounded-full text-[#A8A29E] hover:text-[#6B2D38] hover:bg-[#F3D8DA]/40 transition-colors cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Desktop Subtle Top Bar */}
      <header className="hidden md:flex fixed top-0 left-0 right-0 z-30 justify-between items-center px-8 py-3.5 apple-glass border-b border-[#E5B4B9]/20">
        <button
          onClick={onReturnToCover}
          className="flex items-center gap-2.5 text-left group cursor-pointer"
          aria-label="Voltar à capa"
        >
          <img
            src="/favicon.png"
            alt="Silhueta de Ana e Yulian"
            className="w-8 h-8 rounded-full border border-[#E5B4B9]/50 shadow-xs object-cover"
          />
          <div>
            <span className="font-serif-editorial text-lg tracking-tight font-medium text-[#1C1917] group-hover:text-[#6B2D38] transition-colors leading-none block">
              Ana & Yulian
            </span>
            <span className="block text-[11px] text-[#A8A29E] font-light mt-0.5">
              Our Little World
            </span>
          </div>
        </button>

        {/* Quick section links in topbar */}
        <div className="flex items-center gap-6 text-xs text-[#78716C]">
          <div className="flex items-center gap-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onSelectSection(item.id)}
                className={`transition-colors cursor-pointer ${
                  activeSection === item.id
                    ? 'text-[#6B2D38] font-semibold border-b border-[#6B2D38] pb-0.5'
                    : 'text-[#78716C] hover:text-[#1C1917]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <span className="font-serif-editorial italic text-sm text-[#C88E96]">
            “Onde o tempo guarda o amor.”
          </span>

          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#E5B4B9]/40 text-[#78716C] hover:text-[#6B2D38] hover:border-[#C88E96] transition-all text-[11px] cursor-pointer"
          >
            <Lock className="w-3 h-3 text-[#C88E96]" />
            <span>Editar Conteúdo</span>
          </button>
        </div>
      </header>
    </>
  );
};
