export interface Photo {
  id: string;
  title: string;
  caption?: string;
  url: string;
  date?: string;
  location?: string;
  aspect?: 'portrait' | 'landscape' | 'square';
}

export interface Letter {
  id: string;
  title: string;
  subtitle?: string;
  date: string;
  excerpt: string;
  content: string[]; // array of paragraphs
  signature: string;
  waxSealColor?: string; // hex
  paperStyle?: 'cream' | 'blush' | 'parchment';
  isFeatured?: boolean;
}

export interface LoveNote {
  id: string;
  text: string;
  dateAdded?: string;
}

export interface AppData {
  couple: {
    partner1: string;
    partner2: string;
    subtitle: string;
    closingNote: string;
    closingAuthor: string;
  };
  photos: Photo[];
  letters: Letter[];
  loveNotes: LoveNote[];
}
