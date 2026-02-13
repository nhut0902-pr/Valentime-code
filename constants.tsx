
import React from 'react';
import { GalleryItem } from './types';

export const GALLERY_ITEMS: GalleryItem[] = [
  { id: 1, url: 'https://picsum.photos/seed/love1/600/400', caption: 'Kỷ niệm lần đầu gặp gỡ' },
  { id: 2, url: 'https://picsum.photos/seed/love2/600/400', caption: 'Chuyến đi đáng nhớ của đôi mình' },
  { id: 3, url: 'https://picsum.photos/seed/love3/600/400', caption: 'Những nụ cười hạnh phúc nhất' },
  { id: 4, url: 'https://picsum.photos/seed/love4/600/400', caption: 'Mãi bên nhau bạn nhé!' },
  { id: 5, url: 'https://picsum.photos/seed/love5/600/400', caption: 'Cùng nhau đi khắp thế gian' },
  { id: 6, url: 'https://picsum.photos/seed/love6/600/400', caption: 'Valentine ấm áp' },
];

export const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.5 3c1.373 0 2.585.553 3.5 1.455A4.955 4.955 0 0115.5 3c2.786 0 5.25 2.322 5.25 5.25 0 3.924-2.438 7.11-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
  </svg>
);
