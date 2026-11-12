/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { AppData, Photo } from './types';
import { loadAppData, saveAppData, resetToDefaultData } from './services/storage';
import { OpeningScreen } from './components/OpeningScreen';
import { Navigation, SectionId } from './components/Navigation';
import { MemoriesGallery } from './components/MemoriesGallery';
import { LettersSection } from './components/LettersSection';
// Note: LoveNotesSection temporarily paused per user request; preserved for easy reactivation in future
import { LoveNotesSection } from './components/LoveNotesSection';
import { ClosingSection } from './components/ClosingSection';
import { LightboxModal } from './components/LightboxModal';
import { AdminModal } from './components/AdminModal';

export default function App() {
  const [appData, setAppData] = useState<AppData>(() => loadAppData());
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>('album');
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Lightbox state
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Ref to avoid scrollspy fighting with user click scroll
  const isManualScrollingRef = useRef(false);

  // Check URL query parameters (e.g. ?autostart=1 skips book cover for direct navigation)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('autostart') === '1') {
        setIsBookOpen(true);
      }
    }
  }, []);

  // Responsive Scrollspy: dynamically update active navbar section as user scrolls
  useEffect(() => {
    if (!isBookOpen) return;

    const sections: SectionId[] = ['album', 'letters'];

    const handleScroll = () => {
      if (isManualScrollingRef.current) return;

      const viewportOffset = window.innerHeight * 0.38;
      const scrollPos = window.scrollY + viewportOffset;

      for (let i = sections.length - 1; i >= 0; i--) {
        const id = sections[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial run
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isBookOpen]);

  // Update appData and persist
  const handleUpdateData = (newData: AppData) => {
    setAppData(newData);
    saveAppData(newData);
  };

  const handleResetDefaults = () => {
    const defaults = resetToDefaultData();
    setAppData(defaults);
  };

  const scrollToSection = (sectionId: SectionId) => {
    setActiveSection(sectionId);
    isManualScrollingRef.current = true;
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
    // Release manual scroll lock after smooth scroll animation completes
    setTimeout(() => {
      isManualScrollingRef.current = false;
    }, 850);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F5] text-[#1C1917] selection:bg-[#F3D8DA] selection:text-[#6B2D38]">
      {/* Cover / Welcome Screen */}
      {!isBookOpen ? (
        <OpeningScreen
          partner1={appData.couple.partner1}
          partner2={appData.couple.partner2}
          subtitle={appData.couple.subtitle}
          onOpenStory={() => setIsBookOpen(true)}
        />
      ) : (
        /* Inside The Story Book */
        <main className="relative pb-28 md:pb-20 pt-4 md:pt-16 animate-in fade-in duration-500">
          {/* Floating Navigation Dock with Scrollspy */}
          <Navigation
            activeSection={activeSection}
            onSelectSection={scrollToSection}
            onOpenAdmin={() => setIsAdminOpen(true)}
            soundEnabled={soundEnabled}
            onToggleSound={() => setSoundEnabled(!soundEnabled)}
            onReturnToCover={() => setIsBookOpen(false)}
          />

          {/* Chapter I: Álbum (O Nosso Álbum Polaroid) */}
          <MemoriesGallery
            photos={appData.photos}
            onOpenLightbox={(idx) => setLightboxIndex(idx)}
          />

          {/* Chapter II: Cartas & Mensagens (Para ti, Ana.) */}
          <LettersSection letters={appData.letters} />

          {/* Note: "Coisas que Amo em Ti" is temporarily hidden per user request, ready to be restored */}

          {/* Closing Section */}
          <ClosingSection
            closingNote={appData.couple.closingNote}
            closingAuthor={appData.couple.closingAuthor}
            onReturnToTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            onOpenCover={() => {
              window.scrollTo({ top: 0 });
              setIsBookOpen(false);
            }}
          />

          {/* Lightbox Modal */}
          {lightboxIndex !== null && (
            <LightboxModal
              photos={appData.photos}
              currentIndex={lightboxIndex}
              onClose={() => setLightboxIndex(null)}
              onNavigate={(newIdx) => setLightboxIndex(newIdx)}
            />
          )}

          {/* Clean Editorial Admin Modal */}
          <AdminModal
            isOpen={isAdminOpen}
            onClose={() => setIsAdminOpen(false)}
            appData={appData}
            onUpdateData={handleUpdateData}
            onResetDefaults={handleResetDefaults}
          />
        </main>
      )}
    </div>
  );
}
