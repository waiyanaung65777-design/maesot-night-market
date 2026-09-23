'use client';

import React, { useEffect, useState, useRef } from 'react';

interface IntroSplashProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function IntroSplash({ isOpen, onClose }: IntroSplashProps) {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    setProgress(0);
    setIsFading(false);

    const DURATION = 2000; // Exact 2.0 seconds
    const startTime = performance.now();

    const updateFrame = (now: number) => {
      const elapsed = now - startTime;
      const currentProgress = Math.min(100, (elapsed / DURATION) * 100);
      setProgress(currentProgress);

      if (elapsed < DURATION) {
        animRef.current = requestAnimationFrame(updateFrame);
      } else {
        setProgress(100);
        setIsFading(true);
        setTimeout(() => {
          onClose();
        }, 500); // 500ms fade transition
      }
    };

    animRef.current = requestAnimationFrame(updateFrame);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-blue-500 transition-opacity duration-500 select-none ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Centerpiece Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-md animate-slide-up">
        
        {/* Modern App Icon */}
        <div className="w-24 h-24 bg-white rounded-3xl shadow-xl flex items-center justify-center text-5xl mb-6 relative" style={{ animation: 'pulse-fast 2s infinite' }}>
          🍜
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full border-2 border-white flex items-center justify-center text-xs shadow-sm">
            ✨
          </div>
        </div>

        {/* Clean Modern Typography */}
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-1">
          MaeSot Market
        </h1>
        <p className="text-blue-100 font-medium tracking-wide flex items-center justify-center gap-2 mb-8 text-sm">
          <span>မဲဆောက် ညဈေး</span>
          <span className="opacity-50">•</span>
          <span>ตลาดโต้รุ่งแม่สอด</span>
        </p>

        {/* Minimalist Progress Bar */}
        <div className="w-48 bg-blue-600/50 rounded-full h-1.5 overflow-hidden mb-8">
          <div
            className="h-full bg-white rounded-full transition-all duration-75 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
