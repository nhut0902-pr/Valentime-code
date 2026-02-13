
import React, { useState, useEffect, useRef } from 'react';
import FloatingHearts from './components/FloatingHearts';
import PhotoGallery from './components/PhotoGallery';
import GreetingCard from './components/GreetingCard';
import { HeartIcon } from './constants';

const App: React.FC = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ top: 'auto', left: 'auto' });
  const [response, setResponse] = useState<string | null>(null);
  const [showGreeting, setShowGreeting] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);

  const moveNoButton = () => {
    const x = Math.random() * 80 + 10;
    const y = Math.random() * 80 + 10;
    setNoButtonPos({ top: `${y}%`, left: `${x}%` });
  };

  const handleYes = () => {
    setShowConfetti(true);
    setResponse("Aww! Tớ biết ngay mà, chúng mình đúng là cặp bài trùng luôn á! Chúc cậu Valentine siêu ngọt ngào nhé! ❤️");
    
    // Play Music
    if (audioRef.current) {
      audioRef.current.play().catch(err => console.log("Audio play failed:", err));
      setIsPlaying(true);
    }

    // Show greeting card section
    setShowGreeting(true);
    setTimeout(() => {
      const greetingSection = document.getElementById('greeting');
      if (greetingSection) {
        greetingSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 500);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
    }
  };

  const handlePhotosReady = () => {
    setShowGreeting(true);
    setTimeout(() => {
      const greetingSection = document.getElementById('greeting');
      if (greetingSection) {
        greetingSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <FloatingHearts />
      
      {/* Hidden Audio Player */}
      <audio 
        ref={audioRef} 
        src="https://res.cloudinary.com/dbvlpcefp/video/upload/v1770984501/d128d359666e94e3cf2f4fef56ba8069_vzujqt.mp4" 
        loop 
      />

      {/* Music Control Floating Button */}
      {isPlaying && (
        <button 
          onClick={toggleMute}
          className="fixed bottom-6 right-6 z-[70] bg-white/80 backdrop-blur-md p-3 rounded-full shadow-lg border border-rose-200 text-rose-500 hover:scale-110 transition-transform active:scale-95"
          title={isMuted ? "Bật nhạc" : "Tắt nhạc"}
        >
          {isMuted ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6L4.5 9h-2.25A.75.75 0 001.5 9.75v4.5c0 .414.336.75.75.75h2.25l4.5 3V6.75z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 animate-pulse">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
            </svg>
          )}
        </button>
      )}

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
          <div className="flex items-center gap-2 text-rose-600 font-bold text-xl">
            <HeartIcon />
            <span className="font-romantic text-2xl">Valentine's Love</span>
          </div>
          <div className="font-romantic text-rose-400 text-lg md:text-xl opacity-90 select-none">
            💕Made By Nhutcoder
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header id="hero" className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20 relative">
        <div className="mb-8">
          <div className="text-8xl">💝</div>
        </div>
        <h1 className="text-5xl md:text-7xl font-romantic text-rose-600 mb-6 drop-shadow-md">
          Chào bạn thân yêu!
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mb-12 leading-relaxed">
          Mùa Valentine này, có một người đang rất nhớ bạn và muốn dành tặng bạn những điều tuyệt vời nhất.
        </p>
        
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl relative max-w-lg w-full mb-12 border border-rose-100">
          <h3 className="text-2xl font-bold text-rose-500 mb-8">Bạn có đồng ý làm Valentine của mình không?</h3>
          <div className="flex flex-wrap justify-center gap-6 relative min-h-[60px]">
            <button 
              onClick={handleYes}
              className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 px-10 rounded-full shadow-lg transform hover:scale-110 transition-all active:scale-95"
            >
              Đồng Ý! ❤️
            </button>
            <button 
              onMouseEnter={moveNoButton}
              onClick={moveNoButton}
              style={noButtonPos.top !== 'auto' ? { position: 'fixed', ...noButtonPos, zIndex: 100 } : {}}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-3 px-10 rounded-full shadow-lg transition-all"
            >
              Không nha 😜
            </button>
          </div>
          {response && (
            <div className="mt-8 p-4 bg-green-50 text-green-700 rounded-xl font-medium animate-pulse">
              {response}
            </div>
          )}
        </div>

        <a href="#gallery" className="text-rose-400 cursor-pointer flex flex-col items-center gap-2 group mt-8">
          <span>Kéo xuống xem kỷ niệm</span>
          <svg className="w-8 h-8 transition-transform group-hover:translate-y-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </header>

      {/* Gallery Section */}
      <PhotoGallery onPhotosReady={handlePhotosReady} />

      {/* Personal Greeting Card Section */}
      <GreetingCard isVisible={showGreeting} />

      {/* Footer */}
      <footer className="py-12 bg-white text-center border-t border-rose-100 px-4">
        <div className="flex justify-center gap-4 mb-6">
          <span className="text-3xl">❤️</span>
          <span className="text-3xl">🌹</span>
          <span className="text-3xl">💍</span>
        </div>
        <p className="text-rose-500 font-romantic text-3xl mb-4">❤️ Made By Nhutcoder</p>
        
        <div className="mb-8 space-y-3">
          <p className="text-gray-600 font-medium">Liên hệ cho tớ tại:</p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-rose-500 font-medium">
            <a href="https://www.tiktok.com/@nhutcoder0902?_r=1&_t=ZS-93suhd4slG6" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-2">
              <span>TikTok</span>
            </a>
            <span className="hidden md:inline text-gray-300">|</span>
            <a href="https://www.facebook.com/share/1DZAXv6e7a/" target="_blank" rel="noopener noreferrer" className="hover:underline">
              <span>Facebook</span>
            </a>
            <span className="hidden md:inline text-gray-300">|</span>
            <a href="mailto:lamminhnhut09022011@gmail.com" className="hover:underline">
              <span>lamminhnhut09022011@gmail.com</span>
            </a>
          </div>
        </div>

        <p className="text-gray-500 font-romantic text-2xl mb-2">Chúc đôi ta mãi mãi hạnh phúc!</p>
        <p className="text-xs text-gray-400">©️ copyright by Nhutcoder</p>
      </footer>

      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-[60] flex items-center justify-center">
            <div className="absolute animate-ping text-6xl">❤️</div>
            <div className="absolute top-10 left-10 text-4xl">✨</div>
            <div className="absolute bottom-10 right-10 text-4xl">🎉</div>
            <div className="absolute top-20 right-20 text-5xl">💖</div>
        </div>
      )}
    </div>
  );
};

export default App;
