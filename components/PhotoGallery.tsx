
import React, { useState, useEffect } from 'react';
import { GalleryItem } from '../types';

interface PhotoGalleryProps {
  onPhotosReady?: () => void;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ onPhotosReady }) => {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [timerStarted, setTimerStarted] = useState(false);

  useEffect(() => {
    if (images.length >= 6 && !timerStarted) {
      setTimerStarted(true);
      const timer = setTimeout(() => {
        if (onPhotosReady) onPhotosReady();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [images, timerStarted, onPhotosReady]);

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const newImages: GalleryItem[] = Array.from(files).map((file, index) => ({
        id: Date.now() + index,
        url: URL.createObjectURL(file),
        caption: file.name.split('.')[0] || 'Kỷ niệm mới'
      }));
      setImages(prev => [...newImages, ...prev]);
    }
  };

  return (
    <section id="gallery" className="py-20 px-4 max-w-6xl mx-auto min-h-[400px]">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-romantic text-rose-600 mb-4">Khoảnh Khắc Đôi Mình</h2>
        <p className="text-gray-600 mb-4 font-medium">
          Hãy tải lên ít nhất 6 tấm ảnh kỉ niệm đẹp nhất của chúng mình nhé! 🥰
        </p>
        
        <div className="flex flex-col items-center gap-4">
          <label className="cursor-pointer bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 px-8 rounded-full transition-all shadow-lg flex items-center gap-2 transform hover:scale-105 active:scale-95">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
            Tải ảnh kỉ niệm lên đây nè
            <input 
              type="file" 
              accept="image/*" 
              multiple 
              className="hidden" 
              onChange={handleUpload}
            />
          </label>
          {images.length > 0 && (
            <div className="flex flex-col items-center">
              <span className="text-rose-500 font-bold mb-2">Đã tải: {images.length}/6 ảnh</span>
              <button 
                onClick={() => { setImages([]); setTimerStarted(false); }}
                className="text-rose-400 hover:text-rose-600 text-sm underline transition-colors"
              >
                Xóa tất cả ảnh đã chọn
              </button>
            </div>
          )}
        </div>
      </div>

      {images.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-rose-200 rounded-3xl bg-rose-50/50">
          <div className="text-6xl mb-4 opacity-30">📸</div>
          <p className="text-rose-300 font-romantic text-2xl">Đang đợi những tấm hình của bạn...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
          {images.map((item) => (
            <div 
              key={item.id} 
              className="group relative bg-white p-3 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
            >
              <div className="aspect-[3/2] overflow-hidden rounded-lg">
                <img 
                  src={item.url} 
                  alt={item.caption} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="mt-4 text-center">
                <p className="text-rose-500 font-medium italic">"{item.caption}"</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default PhotoGallery;
