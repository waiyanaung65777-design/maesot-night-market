'use client';

import React, { useEffect, useState, useRef } from 'react';

interface IntroSplashProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function IntroSplash({ isOpen, onClose }: IntroSplashProps) {
  const [isFading, setIsFading] = useState(false);
  const animRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    setIsFading(false);

    // Minimalist cinematic timing (2.5 seconds total)
    animRef.current = setTimeout(() => {
      setIsFading(true);
      setTimeout(() => {
        onClose();
      }, 800); // 800ms smooth fade out
    }, 2500);

    return () => {
      if (animRef.current) clearTimeout(animRef.current);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#09090b] transition-opacity duration-700 select-none ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative z-10 flex flex-col items-center text-center px-6 animate-blur-in">
        
        {/* Elegant typography */}
        <h1 className="text-4xl md:text-5xl font-light tracking-[0.2em] text-white/90 mb-3 uppercase">
          MaeSot
        </h1>
        <h2 className="text-xs md:text-sm font-semibold tracking-[0.3em] text-white/50 uppercase mb-8">
          Night Market
        </h2>

        {/* Minimalist expanding line */}
        <div className="w-px h-12 bg-gradient-to-b from-white/0 via-white/40 to-white/0 animate-scale-up origin-top"></div>
        
        <p className="mt-8 text-[10px] font-medium tracking-[0.2em] text-white/30 uppercase opacity-0 animate-fade-in" style={{ animationDelay: '1s' }}>
          ตลาดโต้รุ่งแม่สอด
        </p>

      </div>
    </div>
  );
}
