import { AppData } from '../types';
import { initialData } from '../data/defaultData';

const STORAGE_KEY = 'ana_yulian_world_data_v3';
const ADMIN_AUTH_KEY = 'ana_yulian_admin_session';

export function loadAppData(): AppData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialData;
    const parsed = JSON.parse(raw);
    return {
      couple: { ...initialData.couple, ...(parsed.couple || {}) },
      photos: parsed.photos || initialData.photos,
      letters: parsed.letters || initialData.letters,
      loveNotes: parsed.loveNotes || initialData.loveNotes,
    };
  } catch (err) {
    console.warn('Failed to parse saved data, fallback to defaults', err);
    return initialData;
  }
}

export function saveAppData(data: AppData): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (err) {
    console.error('Error saving app data', err);
    return false;
  }
}

export function resetToDefaultData(): AppData {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Error resetting app data', err);
  }
  return initialData;
}

export function exportDataAsJson(data: AppData): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `ana-e-yulian-memories-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
