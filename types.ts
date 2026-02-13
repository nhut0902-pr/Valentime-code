
export interface GalleryItem {
  id: number;
  url: string;
  caption: string;
}

export enum AppSection {
  HERO = 'hero',
  GALLERY = 'gallery',
  SURPRISE = 'surprise',
  GREETING = 'greeting'
}
