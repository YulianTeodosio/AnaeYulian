import React, { useState } from 'react';
import {
  X,
  Lock,
  Plus,
  Trash2,
  Upload,
  Download,
  RotateCcw,
  Check,
  Image as ImageIcon,
  Mail,
  Settings,
  AlertCircle,
  Edit3,
  Undo2,
} from 'lucide-react';
import { AppData, Photo, Letter } from '../types';
import { verifyAdminPassword } from '../utils/date-helpers';
import { exportDataAsJson } from '../services/storage';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  appData: AppData;
  onUpdateData: (newData: AppData) => void;
  onResetDefaults: () => void;
}

type AdminTab = 'photos' | 'letters' | 'settings';

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  appData,
  onUpdateData,
  onResetDefaults,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<AdminTab>('photos');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  // Editing state for Photos (simplified for Polaroid, no description)
  const [editingPhotoId, setEditingPhotoId] = useState<string | null>(null);
  const [editPhotoTitle, setEditPhotoTitle] = useState('');
  const [editPhotoLocation, setEditPhotoLocation] = useState('');
  const [editPhotoDate, setEditPhotoDate] = useState('');
  const [editPhotoAspect, setEditPhotoAspect] = useState<'portrait' | 'landscape' | 'square'>('portrait');
  const [editPhotoUrl, setEditPhotoUrl] = useState('');

  // New photo form state
  const [newPhotoTitle, setNewPhotoTitle] = useState('');
  const [newPhotoLocation, setNewPhotoLocation] = useState('');
  const [newPhotoDate, setNewPhotoDate] = useState('');
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [newPhotoAspect, setNewPhotoAspect] = useState<'portrait' | 'landscape' | 'square'>('portrait');

  // Editing state for Letters
  const [editingLetterId, setEditingLetterId] = useState<string | null>(null);
  const [editLetterTitle, setEditLetterTitle] = useState('');
  const [editLetterSubtitle, setEditLetterSubtitle] = useState('');
  const [editLetterDate, setEditLetterDate] = useState('');
  const [editLetterContent, setEditLetterContent] = useState('');
  const [editLetterSignature, setEditLetterSignature] = useState('');
  const [editLetterSealColor, setEditLetterSealColor] = useState('#C88E96');

  // New letter form state
  const [newLetterTitle, setNewLetterTitle] = useState('');
  const [newLetterSubtitle, setNewLetterSubtitle] = useState('');
  const [newLetterDate, setNewLetterDate] = useState('Hoje');
  const [newLetterText, setNewLetterText] = useState('');
  const [newLetterSignature, setNewLetterSignature] = useState('Com todo o meu amor, Yulian');

  if (!isOpen) return null;

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyAdminPassword(passwordInput)) {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Palavra-passe incorreta. Tenta "anayulian".');
    }
  };

  const notifySaved = (msg = 'Guardado com sucesso!') => {
    setSaveSuccessMsg(msg);
    setTimeout(() => setSaveSuccessMsg(''), 2500);
  };

  // --- PHOTO HANDLERS ---
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, isEditing = false) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          if (isEditing) {
            setEditPhotoUrl(reader.result);
          } else {
            setNewPhotoUrl(reader.result);
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhotoTitle.trim() || !newPhotoUrl.trim()) {
      alert('Por favor indica um título para a Polaroid e escolhe uma fotografia.');
      return;
    }

    const created: Photo = {
      id: `p-${Date.now()}`,
      title: newPhotoTitle.trim(),
      url: newPhotoUrl.trim(),
      location: newPhotoLocation.trim() || undefined,
      date: newPhotoDate.trim() || undefined,
      aspect: newPhotoAspect,
    };

    onUpdateData({
      ...appData,
      photos: [created, ...appData.photos],
    });
    setNewPhotoTitle('');
    setNewPhotoLocation('');
    setNewPhotoDate('');
    setNewPhotoUrl('');
    notifySaved('Fotografia Polaroid adicionada.');
  };

  const startEditPhoto = (photo: Photo) => {
    setEditingPhotoId(photo.id);
    setEditPhotoTitle(photo.title);
    setEditPhotoLocation(photo.location || '');
    setEditPhotoDate(photo.date || '');
    setEditPhotoAspect(photo.aspect || 'portrait');
    setEditPhotoUrl(photo.url);
  };

  const cancelEditPhoto = () => {
    setEditingPhotoId(null);
  };

  const handleSaveEditPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPhotoId) return;

    const updatedPhotos = appData.photos.map((p) => {
      if (p.id === editingPhotoId) {
        return {
          ...p,
          title: editPhotoTitle.trim() || p.title,
          location: editPhotoLocation.trim() || undefined,
          date: editPhotoDate.trim() || undefined,
          aspect: editPhotoAspect,
          url: editPhotoUrl.trim() || p.url,
        };
      }
      return p;
    });

    onUpdateData({
      ...appData,
      photos: updatedPhotos,
    });
    setEditingPhotoId(null);
    notifySaved('Polaroid atualizada com sucesso!');
  };

  const handleDeletePhoto = (id: string) => {
    if (!confirm('Remover esta Polaroid do álbum?')) return;
    onUpdateData({
      ...appData,
      photos: appData.photos.filter((p) => p.id !== id),
    });
    if (editingPhotoId === id) setEditingPhotoId(null);
    notifySaved('Polaroid removida.');
  };

  // --- LETTERS HANDLERS ---
  const startEditLetter = (letter: Letter) => {
    setEditingLetterId(letter.id);
    setEditLetterTitle(letter.title);
    setEditLetterSubtitle(letter.subtitle || '');
    setEditLetterDate(letter.date);
    setEditLetterContent(letter.content.join('\n\n'));
    setEditLetterSignature(letter.signature);
    setEditLetterSealColor(letter.waxSealColor || '#C88E96');
  };

  const cancelEditLetter = () => {
    setEditingLetterId(null);
  };

  const handleSaveEditLetter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLetterId) return;

    const paragraphs = editLetterContent
      .split('\n\n')
      .map((p) => p.trim())
      .filter(Boolean);

    const firstParagraph = paragraphs[0] || '';
    const updatedExcerpt = firstParagraph.slice(0, 140) + (firstParagraph.length > 140 ? '...' : '');

    const updatedLetters = appData.letters.map((l) => {
      if (l.id === editingLetterId) {
        return {
          ...l,
          title: editLetterTitle.trim() || l.title,
          subtitle: editLetterSubtitle.trim() || undefined,
          date: editLetterDate.trim() || l.date,
          content: paragraphs.length > 0 ? paragraphs : l.content,
          excerpt: updatedExcerpt || l.excerpt,
          signature: editLetterSignature.trim() || l.signature,
          waxSealColor: editLetterSealColor,
        };
      }
      return l;
    });

    onUpdateData({
      ...appData,
      letters: updatedLetters,
    });
    setEditingLetterId(null);
    notifySaved('Carta atualizada com sucesso!');
  };

  const handleAddLetter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLetterTitle.trim() || !newLetterText.trim()) {
      alert('Preenche o título e o texto da carta.');
      return;
    }

    const paragraphs = newLetterText
      .split('\n\n')
      .map((p) => p.trim())
      .filter(Boolean);

    const created: Letter = {
      id: `letter-${Date.now()}`,
      title: newLetterTitle.trim(),
      subtitle: newLetterSubtitle.trim() || undefined,
      date: newLetterDate.trim() || 'Hoje',
      excerpt: (paragraphs[0] || '').slice(0, 110) + '...',
      content: paragraphs,
      signature: newLetterSignature.trim() || 'Com amor, Yulian',
      waxSealColor: '#C88E96',
      isFeatured: false,
    };

    onUpdateData({
      ...appData,
      letters: [created, ...appData.letters],
    });
    setNewLetterTitle('');
    setNewLetterSubtitle('');
    setNewLetterText('');
    notifySaved('Carta adicionada.');
  };

  const handleDeleteLetter = (id: string) => {
    if (!confirm('Remover esta carta?')) return;
    onUpdateData({
      ...appData,
      letters: appData.letters.filter((l) => l.id !== id),
    });
    if (editingLetterId === id) setEditingLetterId(null);
    notifySaved('Carta removida.');
  };

  // --- IMPORT / EXPORT JSON HANDLER ---
  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (parsed.couple && parsed.photos) {
            onUpdateData(parsed);
            notifySaved('Memórias importadas com sucesso!');
          } else {
            alert('Ficheiro inválido.');
          }
        } catch {
          alert('Erro ao ler ficheiro JSON.');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-title"
    >
      <div className="relative w-full max-w-3xl max-h-[92vh] my-auto overflow-hidden rounded-3xl bg-[#FDFBF7] border border-[#E5B4B9]/40 shadow-2xl flex flex-col">
        {/* Clean Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5B4B9]/25 bg-white/70">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#C88E96]" />
            <h2 id="admin-title" className="font-serif-editorial text-xl font-normal text-[#1C1917]">
              Painel de Edição — O Nosso Mundo
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-200/50 text-stone-600 transition-colors cursor-pointer"
            aria-label="Fechar painel de edição"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Feedback message */}
        {saveSuccessMsg && (
          <div className="bg-[#DDE5DC] border-b border-[#8F9E8B]/30 px-6 py-2.5 text-xs text-[#2E4A28] flex items-center gap-2 font-medium">
            <Check className="w-4 h-4 text-[#6E7F6B]" />
            <span>{saveSuccessMsg}</span>
          </div>
        )}

        {/* Content Area */}
        {!isAuthenticated ? (
          /* Password Screen */
          <div className="p-8 sm:p-12 text-center max-w-sm mx-auto my-auto">
            <div className="w-12 h-12 rounded-full bg-[#F7E7E8] text-[#C88E96] flex items-center justify-center mx-auto mb-4">
              <Lock className="w-5 h-5" />
            </div>

            <h3 className="font-serif-editorial text-2xl text-[#1C1917] mb-1">
              Olá, Yulian
            </h3>
            <p className="font-sans-modern text-xs text-[#78716C] mb-6">
              Digita a palavra-passe para editar polaroids, cartas e memórias.
            </p>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <input
                type="password"
                placeholder="Palavra-passe (ex: anayulian)"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#E5B4B9]/50 bg-white text-xs focus:outline-none focus:ring-1 focus:ring-[#C88E96]"
                autoFocus
              />

              {authError && (
                <p className="text-xs text-red-600 flex items-center justify-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {authError}
                </p>
              )}

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#1C1917] text-white text-xs font-medium hover:bg-[#6B2D38] transition-colors cursor-pointer"
              >
                Entrar
              </button>
            </form>
          </div>
        ) : (
          /* Logged In Minimal Tabs View (Updated: clean tabs without hidden/old sections) */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Minimal Clean Tabs */}
            <div className="flex items-center gap-1 sm:gap-2 px-4 sm:px-6 border-b border-[#E5B4B9]/25 bg-[#FAF7F5] text-xs">
              <button
                onClick={() => {
                  setActiveTab('photos');
                  setEditingPhotoId(null);
                }}
                className={`py-3 px-3.5 border-b-2 font-medium transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  activeTab === 'photos'
                    ? 'border-[#C88E96] text-[#6B2D38]'
                    : 'border-transparent text-stone-500 hover:text-stone-900'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                Álbum Polaroid ({appData.photos.length})
              </button>
              <button
                onClick={() => {
                  setActiveTab('letters');
                  setEditingLetterId(null);
                }}
                className={`py-3 px-3.5 border-b-2 font-medium transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  activeTab === 'letters'
                    ? 'border-[#C88E96] text-[#6B2D38]'
                    : 'border-transparent text-stone-500 hover:text-stone-900'
                }`}
              >
                <Mail className="w-3.5 h-3.5" />
                Cartas ({appData.letters.length})
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`py-3 px-3.5 border-b-2 font-medium transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  activeTab === 'settings'
                    ? 'border-[#C88E96] text-[#6B2D38]'
                    : 'border-transparent text-stone-500 hover:text-stone-900'
                }`}
              >
                <Settings className="w-3.5 h-3.5" />
                Ajustes
              </button>
            </div>

            {/* Tab Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              {/* TAB 1: ÁLBUM POLAROID */}
              {activeTab === 'photos' && (
                <div className="space-y-6">
                  {/* Photo Edit Mode Form */}
                  {editingPhotoId ? (
                    <div className="bg-[#FAF7F5] p-5 rounded-2xl border-2 border-[#C88E96]/50 shadow-sm animate-in fade-in duration-200">
                      <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#E5B4B9]/30">
                        <div className="flex items-center gap-2">
                          <Edit3 className="w-4 h-4 text-[#C88E96]" />
                          <h4 className="font-serif-editorial text-base text-[#1C1917] font-medium">
                            Editar Polaroid
                          </h4>
                        </div>
                        <button
                          type="button"
                          onClick={cancelEditPhoto}
                          className="text-xs text-stone-500 hover:text-stone-800 flex items-center gap-1 cursor-pointer"
                        >
                          <Undo2 className="w-3 h-3" />
                          Cancelar
                        </button>
                      </div>

                      <form onSubmit={handleSaveEditPhoto} className="space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-medium text-stone-600 mb-1">
                              Texto Escrito na Polaroid (Título)
                            </label>
                            <input
                              type="text"
                              required
                              value={editPhotoTitle}
                              onChange={(e) => setEditPhotoTitle(e.target.value)}
                              className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#C88E96]"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-[11px] font-medium text-stone-600 mb-1">
                                Local / Ocasião
                              </label>
                              <input
                                type="text"
                                placeholder="ex: De Mãos Dadas"
                                value={editPhotoLocation}
                                onChange={(e) => setEditPhotoLocation(e.target.value)}
                                className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#C88E96]"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-medium text-stone-600 mb-1">
                                Data
                              </label>
                              <input
                                type="text"
                                placeholder="ex: Nós"
                                value={editPhotoDate}
                                onChange={(e) => setEditPhotoDate(e.target.value)}
                                className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#C88E96]"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Photo Replacement */}
                        <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
                          <label className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#F7E7E8] text-[#6B2D38] text-xs font-medium hover:bg-[#F3D8DA] cursor-pointer transition-colors">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Trocar Imagem (Carregar)</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleFileUpload(e, true)}
                              className="hidden"
                            />
                          </label>
                          <input
                            type="text"
                            placeholder="Ou URL da imagem"
                            value={editPhotoUrl.startsWith('data:') ? 'Nova foto carregada' : editPhotoUrl}
                            onChange={(e) => setEditPhotoUrl(e.target.value)}
                            className="flex-1 w-full px-3 py-2 text-xs rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#C88E96]"
                          />
                        </div>

                        <div className="flex justify-end gap-2 pt-2">
                          <button
                            type="button"
                            onClick={cancelEditPhoto}
                            className="px-4 py-2 rounded-xl border border-stone-300 text-stone-700 text-xs font-medium hover:bg-stone-100 cursor-pointer"
                          >
                            Cancelar
                          </button>
                          <button
                            type="submit"
                            className="px-5 py-2 rounded-xl bg-[#6B2D38] text-white text-xs font-medium hover:bg-[#52222B] shadow-sm flex items-center gap-1.5 cursor-pointer"
                          >
                            <Check className="w-3.5 h-3.5" />
                            Guardar Polaroid
                          </button>
                        </div>
                      </form>
                    </div>
                  ) : null}

                  {/* Add New Polaroid Form */}
                  <form onSubmit={handleAddPhoto} className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E5B4B9]/30 space-y-3">
                    <h4 className="font-serif-editorial text-base text-[#1C1917] font-medium flex items-center gap-1.5">
                      <Plus className="w-4 h-4 text-[#C88E96]" />
                      Adicionar Nova Polaroid Instantânea
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <input
                          type="text"
                          required
                          placeholder="Texto na borda da Polaroid (ex: O nosso abraço)"
                          value={newPhotoTitle}
                          onChange={(e) => setNewPhotoTitle(e.target.value)}
                          className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-1 focus:ring-[#C88E96]"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Local / Ocasião (ex: Em Casa, Passeio)"
                          value={newPhotoLocation}
                          onChange={(e) => setNewPhotoLocation(e.target.value)}
                          className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-1 focus:ring-[#C88E96]"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-2">
                      <label className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#F7E7E8] text-[#6B2D38] text-xs font-medium hover:bg-[#F3D8DA] cursor-pointer transition-colors">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Carregar do Dispositivo</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, false)}
                          className="hidden"
                        />
                      </label>
                      <input
                        type="url"
                        placeholder="Ou cola aqui um URL da fotografia"
                        value={newPhotoUrl.startsWith('data:') ? 'Fotografia carregada com sucesso' : newPhotoUrl}
                        onChange={(e) => setNewPhotoUrl(e.target.value)}
                        className="flex-1 w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-1 focus:ring-[#C88E96]"
                      />
                      <button
                        type="submit"
                        className="w-full sm:w-auto px-5 py-2 rounded-xl bg-[#1C1917] text-white text-xs font-medium hover:bg-[#6B2D38] cursor-pointer transition-colors"
                      >
                        Adicionar Polaroid
                      </button>
                    </div>
                  </form>

                  {/* Polaroids List with Mini Polaroid Frame Preview */}
                  <div className="space-y-3">
                    <h5 className="text-xs font-semibold text-stone-700 uppercase tracking-wider">
                      Polaroids Atuais no Álbum ({appData.photos.length})
                    </h5>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                      {appData.photos.map((photo) => {
                        const isBeingEdited = editingPhotoId === photo.id;
                        return (
                          <div
                            key={photo.id}
                            className={`p-2.5 pb-3 rounded-lg border transition-all flex flex-col justify-between bg-white shadow-sm ${
                              isBeingEdited
                                ? 'border-[#C88E96] ring-2 ring-[#C88E96]/20'
                                : 'border-stone-200 hover:border-[#E5B4B9]'
                            }`}
                          >
                            <div>
                              {/* Mini polaroid preview */}
                              <div className="relative rounded-[1px] overflow-hidden aspect-[4/5] bg-stone-100 border border-stone-200 mb-2">
                                <img
                                  src={photo.url}
                                  alt={photo.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>

                              <div className="text-center px-1">
                                <h6 className="font-script-romantic text-xl text-[#1C1917] truncate leading-tight">
                                  {photo.title}
                                </h6>
                                {(photo.location || photo.date) && (
                                  <span className="text-[9px] tracking-wider uppercase text-[#A8A29E] block truncate">
                                    {photo.location ? `${photo.location} ` : ''}
                                    {photo.date || ''}
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center justify-center gap-2 pt-2 border-t border-stone-100 mt-2">
                              <button
                                type="button"
                                onClick={() => startEditPhoto(photo)}
                                className="inline-flex items-center gap-1 text-[11px] font-medium text-[#C88E96] hover:text-[#6B2D38] cursor-pointer"
                              >
                                <Edit3 className="w-3 h-3" />
                                <span>Editar</span>
                              </button>
                              <span className="text-stone-300">·</span>
                              <button
                                type="button"
                                onClick={() => handleDeletePhoto(photo.id)}
                                className="inline-flex items-center gap-1 text-[11px] font-medium text-red-500 hover:text-red-700 cursor-pointer"
                              >
                                <Trash2 className="w-3 h-3" />
                                <span>Remover</span>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: CARTAS / LETTERS */}
              {activeTab === 'letters' && (
                <div className="space-y-6">
                  {/* Letter Edit Mode Form */}
                  {editingLetterId ? (
                    <div className="bg-[#FAF7F5] p-5 rounded-2xl border-2 border-[#C88E96]/50 shadow-sm animate-in fade-in duration-200">
                      <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#E5B4B9]/30">
                        <div className="flex items-center gap-2">
                          <Edit3 className="w-4 h-4 text-[#C88E96]" />
                          <h4 className="font-serif-editorial text-base text-[#1C1917] font-medium">
                            Editar Carta
                          </h4>
                        </div>
                        <button
                          type="button"
                          onClick={cancelEditLetter}
                          className="text-xs text-stone-500 hover:text-stone-800 flex items-center gap-1 cursor-pointer"
                        >
                          <Undo2 className="w-3 h-3" />
                          Cancelar
                        </button>
                      </div>

                      <form onSubmit={handleSaveEditLetter} className="space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-medium text-stone-600 mb-1">
                              Título da Carta
                            </label>
                            <input
                              type="text"
                              required
                              value={editLetterTitle}
                              onChange={(e) => setEditLetterTitle(e.target.value)}
                              className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#C88E96]"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-medium text-stone-600 mb-1">
                              Subtítulo
                            </label>
                            <input
                              type="text"
                              value={editLetterSubtitle}
                              onChange={(e) => setEditLetterSubtitle(e.target.value)}
                              className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#C88E96]"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-medium text-stone-600 mb-1">
                              Data / Ocasião
                            </label>
                            <input
                              type="text"
                              value={editLetterDate}
                              onChange={(e) => setEditLetterDate(e.target.value)}
                              className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#C88E96]"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-medium text-stone-600 mb-1">
                              Assinatura
                            </label>
                            <input
                              type="text"
                              value={editLetterSignature}
                              onChange={(e) => setEditLetterSignature(e.target.value)}
                              className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#C88E96]"
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <label className="block text-[11px] font-medium text-stone-600">
                              Conteúdo da Carta
                            </label>
                            <span className="text-[10px] text-stone-400">
                              Separa parágrafos com uma linha em branco
                            </span>
                          </div>
                          <textarea
                            rows={8}
                            required
                            value={editLetterContent}
                            onChange={(e) => setEditLetterContent(e.target.value)}
                            className="w-full px-3 py-2 text-xs font-serif-editorial leading-relaxed rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#C88E96]"
                          />
                        </div>

                        <div className="flex justify-end gap-2 pt-2">
                          <button
                            type="button"
                            onClick={cancelEditLetter}
                            className="px-4 py-2 rounded-xl border border-stone-300 text-stone-700 text-xs font-medium hover:bg-stone-100 cursor-pointer"
                          >
                            Cancelar
                          </button>
                          <button
                            type="submit"
                            className="px-5 py-2 rounded-xl bg-[#6B2D38] text-white text-xs font-medium hover:bg-[#52222B] shadow-sm flex items-center gap-1.5 cursor-pointer"
                          >
                            <Check className="w-3.5 h-3.5" />
                            Guardar Carta
                          </button>
                        </div>
                      </form>
                    </div>
                  ) : null}

                  {/* Add New Letter Form */}
                  <form onSubmit={handleAddLetter} className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E5B4B9]/30 space-y-3">
                    <h4 className="font-serif-editorial text-base text-[#1C1917] font-medium flex items-center gap-1.5">
                      <Plus className="w-4 h-4 text-[#C88E96]" />
                      Escrever Nova Carta
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        required
                        placeholder="Título da carta (ex: Para o amor da minha vida)"
                        value={newLetterTitle}
                        onChange={(e) => setNewLetterTitle(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-1 focus:ring-[#C88E96]"
                      />
                      <input
                        type="text"
                        placeholder="Subtítulo curto (opcional)"
                        value={newLetterSubtitle}
                        onChange={(e) => setNewLetterSubtitle(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-1 focus:ring-[#C88E96]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Data (ex: Hoje & Sempre)"
                        value={newLetterDate}
                        onChange={(e) => setNewLetterDate(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-1 focus:ring-[#C88E96]"
                      />
                      <input
                        type="text"
                        placeholder="Assinatura (ex: Com todo o meu amor, Yulian)"
                        value={newLetterSignature}
                        onChange={(e) => setNewLetterSignature(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-1 focus:ring-[#C88E96]"
                      />
                    </div>

                    <textarea
                      required
                      rows={5}
                      placeholder="Escreve aqui o texto da carta (separa parágrafos com linha em branco)..."
                      value={newLetterText}
                      onChange={(e) => setNewLetterText(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-1 focus:ring-[#C88E96]"
                    />

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-[#1C1917] text-white text-xs font-medium hover:bg-[#6B2D38] cursor-pointer"
                      >
                        Guardar Nova Carta
                      </button>
                    </div>
                  </form>

                  {/* Letters list */}
                  <div className="space-y-3">
                    <h5 className="text-xs font-semibold text-stone-700 uppercase tracking-wider">
                      Cartas Guardadas ({appData.letters.length})
                    </h5>

                    <div className="space-y-2.5">
                      {appData.letters.map((letter) => (
                        <div
                          key={letter.id}
                          className="flex items-center justify-between p-3.5 rounded-2xl bg-white border border-stone-200 hover:border-[#E5B4B9] transition-all"
                        >
                          <div className="min-w-0 pr-3">
                            <div className="flex items-center gap-2">
                              <p className="font-serif-editorial font-medium text-sm text-stone-900 truncate">
                                {letter.title}
                              </p>
                              {letter.isFeatured && (
                                <span className="px-2 py-0.5 rounded-full bg-[#F7E7E8] text-[#C88E96] text-[10px] font-medium uppercase tracking-wider">
                                  Principal
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-stone-500 truncate mt-0.5">
                              {letter.date} {letter.subtitle ? `· ${letter.subtitle}` : ''}
                            </p>
                          </div>

                          <div className="flex items-center gap-2 flex-shrink-0">
                            <button
                              type="button"
                              onClick={() => startEditLetter(letter)}
                              className="px-3 py-1.5 rounded-xl border border-stone-200 hover:border-[#C88E96] text-[#C88E96] text-xs font-medium flex items-center gap-1 cursor-pointer"
                            >
                              <Edit3 className="w-3 h-3" />
                              <span>Editar</span>
                            </button>
                            {!letter.isFeatured && (
                              <button
                                type="button"
                                onClick={() => handleDeleteLetter(letter.id)}
                                className="p-1.5 text-stone-400 hover:text-red-600 rounded-lg transition-colors cursor-pointer"
                                aria-label={`Apagar ${letter.title}`}
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: AJUSTES & BACKUP */}
              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <div className="bg-white p-5 rounded-2xl border border-[#E5B4B9]/30 space-y-4">
                    <h4 className="font-serif-editorial text-base text-[#1C1917] font-medium">
                      Nomes & Subtítulo Principal
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-medium text-stone-600 mb-1">
                          Ela
                        </label>
                        <input
                          type="text"
                          value={appData.couple.partner1}
                          onChange={(e) =>
                            onUpdateData({
                              ...appData,
                              couple: { ...appData.couple, partner1: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#C88E96]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-stone-600 mb-1">
                          Ele
                        </label>
                        <input
                          type="text"
                          value={appData.couple.partner2}
                          onChange={(e) =>
                            onUpdateData({
                              ...appData,
                              couple: { ...appData.couple, partner2: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#C88E96]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-stone-600 mb-1">
                        Subtítulo da Capa
                      </label>
                      <input
                        type="text"
                        value={appData.couple.subtitle}
                        onChange={(e) =>
                          onUpdateData({
                            ...appData,
                            couple: { ...appData.couple, subtitle: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#C88E96]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-stone-100">
                      <div>
                        <label className="block text-[11px] font-medium text-stone-600 mb-1">
                          Mensagem Final de Encerramento
                        </label>
                        <input
                          type="text"
                          value={appData.couple.closingNote}
                          onChange={(e) =>
                            onUpdateData({
                              ...appData,
                              couple: { ...appData.couple, closingNote: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#C88E96]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-stone-600 mb-1">
                          Assinatura Final
                        </label>
                        <input
                          type="text"
                          value={appData.couple.closingAuthor}
                          onChange={(e) =>
                            onUpdateData({
                              ...appData,
                              couple: { ...appData.couple, closingAuthor: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#C88E96]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Backup */}
                  <div className="bg-white p-5 rounded-2xl border border-[#E5B4B9]/30 space-y-3">
                    <h4 className="font-serif-editorial text-base text-[#1C1917] font-medium">
                      Backup & Reposição
                    </h4>
                    <p className="text-xs text-stone-500 font-light">
                      Podes guardar um ficheiro JSON com todas as polaroids, cartas e edições para manter uma cópia segura.
                    </p>
                    <div className="flex flex-wrap gap-2.5 pt-1">
                      <button
                        type="button"
                        onClick={() => exportDataAsJson(appData)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1C1917] text-white text-xs font-medium hover:bg-[#6B2D38] cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Exportar Backup (JSON)</span>
                      </button>

                      <label className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-stone-300 bg-stone-50 text-stone-700 text-xs font-medium hover:bg-stone-100 cursor-pointer">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Importar Backup (JSON)</span>
                        <input type="file" accept=".json" onChange={handleImportJson} className="hidden" />
                      </label>

                      <button
                        type="button"
                        onClick={() => {
                          if (confirm('Restaurar o álbum para o conteúdo original com as fotos de Ana e Yulian?')) {
                            onResetDefaults();
                            notifySaved('Conteúdo reposto.');
                          }
                        }}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-red-200 text-red-600 text-xs font-medium hover:bg-red-50 cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Restaurar Predefinições</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
