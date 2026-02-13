
import React, { useState, useEffect } from 'react';

const TypewriterText: React.FC<{ 
  lines: string[]; 
  delay: number; 
  start: boolean;
  onComplete?: () => void;
}> = ({ lines, delay, start, onComplete }) => {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  useEffect(() => {
    if (!start) return;

    if (currentLineIndex < lines.length) {
      if (currentCharIndex < lines[currentLineIndex].length) {
        const timeout = setTimeout(() => {
          setVisibleLines(prev => {
            const next = [...prev];
            if (!next[currentLineIndex]) next[currentLineIndex] = '';
            next[currentLineIndex] += lines[currentLineIndex][currentCharIndex];
            return next;
          });
          setCurrentCharIndex(prev => prev + 1);
        }, delay);
        return () => clearTimeout(timeout);
      } else {
        const lineTimeout = setTimeout(() => {
          setCurrentLineIndex(prev => prev + 1);
          setCurrentCharIndex(0);
        }, 400); // Pause between lines
        return () => clearTimeout(lineTimeout);
      }
    } else if (onComplete) {
      onComplete();
    }
  }, [start, currentLineIndex, currentCharIndex, lines, delay, onComplete]);

  return (
    <div className="space-y-2 md:space-y-4">
      {visibleLines.map((line, idx) => (
        <p key={idx} className={`${idx === 0 
          ? 'font-bold text-rose-600 text-xl md:text-2xl mb-2 md:mb-4' 
          : 'text-gray-800 text-sm md:text-lg leading-relaxed'}`}>
          {line}
          {idx === currentLineIndex && currentLineIndex < lines.length && (
            <span className="typewriter-cursor"></span>
          )}
        </p>
      ))}
    </div>
  );
};

const GreetingCard: React.FC<{ isVisible: boolean }> = ({ isVisible }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSignature, setShowSignature] = useState(false);

  const messageLines = [
    "Happy Valentine nhaaa 💖",
    "Cảm ơn bạn vì đã luôn xuất hiện đúng lúc.",
    "Món quà sinh nhật của bạn làm mình vui cực kỳ luôn á!",
    "Mình cảm nhận được sự quan tâm của bạn.",
    "Chúc bạn luôn hạnh phúc, cười thật nhiều.",
    "Mong đôi mình có thêm nhiều kỷ niệm đẹp 🥰"
  ];

  return (
    <section 
      id="greeting" 
      className={`py-20 md:py-32 px-4 bg-rose-200/50 min-h-screen flex flex-col items-center justify-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
    >
      <div className={`max-w-xl mx-auto text-center mb-10 md:mb-16 transition-opacity duration-500 ${isOpen ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
        <h2 className="text-3xl md:text-5xl font-romantic text-rose-600 mb-4 md:mb-6">Món Quà Bí Mật</h2>
        <p className="text-rose-500 font-bold animate-bounce text-lg md:text-2xl bg-white/50 py-2 px-6 rounded-full inline-block shadow-sm">
          ✨ Nhấn để mở nha! ✨
        </p>
      </div>

      <div className="book-container">
        <div className={`book ${isOpen ? 'is-open' : ''}`}>
          {/* Front Cover Part */}
          <div className="book-cover" onClick={() => setIsOpen(!isOpen)}>
            <div className="cover-front">
              <div className="heart-outline mb-8 md:mb-12"></div>
              <div className="mt-16 md:mt-20 text-white text-center px-4">
                <p className="font-romantic text-2xl md:text-3xl mb-2">For My Love</p>
                <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] opacity-80">Chạm để mở thiệp</p>
              </div>
            </div>
            <div className="cover-back">
               <div className="relative w-full h-full flex items-center justify-center">
                  <div className="text-rose-200 opacity-20 select-none">
                     <svg width="150" height="150" viewBox="0 0 200 200">
                        <path d="M100 40 C 100 40, 140 0, 180 40 C 220 80, 100 180, 100 180 C 100 180, -20 80, 20 40 C 60 0, 100 40, 100 40" 
                              fill="none" stroke="currentColor" strokeWidth="2" />
                     </svg>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                     <span className="text-rose-300 text-4xl md:text-6xl">💖</span>
                  </div>
               </div>
            </div>
          </div>

          {/* Right Page (Inside) */}
          <div className="book-page">
            <div className="font-romantic flex-grow">
              <TypewriterText 
                start={isOpen} 
                lines={messageLines} 
                delay={45} 
                onComplete={() => setShowSignature(true)}
              />
            </div>
            
            {showSignature && (
              <div className="mt-4 text-right animate-fade-in">
                <p className="text-rose-600 font-bold text-xl md:text-3xl font-romantic">
                  From Nhutcoder 💌
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-12 md:mt-20 flex flex-col items-center gap-4">
        {isOpen && (
          <button 
            onClick={() => setIsOpen(false)}
            className="text-rose-400 hover:text-rose-600 transition-colors font-medium flex items-center gap-2 bg-white/60 py-2 px-4 rounded-full shadow-sm"
          >
            <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            Đóng thiệp
          </button>
        )}
      </div>
    </section>
  );
};

export default GreetingCard;
