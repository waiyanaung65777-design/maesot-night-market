'use client';

import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { FoodItem } from '@/data/mockFoods';

interface FoodModalProps {
  item: FoodItem | null;
  currentLang: 'en' | 'mm' | 'th';
  onClose: () => void;
}

export default function FoodModal({ item, currentLang, onClose }: FoodModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (item) {
      setIsVisible(true);
    } else {
      setTimeout(() => setIsVisible(false), 300);
    }
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, onClose]);

  if (!item && !isVisible) return null;
  
  // Guard against null item during exit animation
  const displayItem = item || ({} as FoodItem);

  const title =
    currentLang === 'mm'
      ? displayItem.titleMm
      : currentLang === 'th'
      ? displayItem.titleTh
      : displayItem.titleEn;

  const desc = currentLang === 'mm' ? displayItem.descMm : displayItem.descEn;
  const ingredients = currentLang === 'mm' ? displayItem.ingredientsMm : displayItem.ingredientsEn;

  return (
    <div className={`fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
      item ? 'bg-zinc-900/20 backdrop-blur-sm' : 'bg-transparent pointer-events-none'
    }`}>
      
      <div 
        className={`w-full sm:w-[500px] bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl relative transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          item ? 'translate-y-0' : 'translate-y-full sm:translate-y-12 sm:opacity-0'
        }`}
      >
        {/* Minimal Header */}
        <div className="relative h-64 bg-zinc-50 flex items-center justify-center text-8xl select-none">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white text-zinc-900 flex items-center justify-center shadow-sm hover:scale-105 transition-transform cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
          
          <span className="drop-shadow-sm animate-scale-up">{displayItem.emoji}</span>
          
          <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-[10px] font-bold text-zinc-900 shadow-sm">
            ★ {displayItem.rating} <span className="text-zinc-400 font-normal">({displayItem.reviewsCount})</span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          <div className="flex justify-between items-start gap-4 mb-6">
            <h3 className="text-2xl font-semibold text-zinc-900 leading-tight tracking-tight">
              {title}
            </h3>
            <span className="text-xl font-medium text-zinc-900">฿{displayItem.priceThb}</span>
          </div>

          <p className="text-sm text-zinc-500 font-light leading-relaxed mb-8">
            {desc}
          </p>

          {/* Minimal Info List */}
          <div className="space-y-4 mb-8">
            <div className="flex justify-between border-b border-zinc-100 pb-3">
              <span className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">Stall</span>
              <span className="text-sm text-zinc-900 font-medium">{displayItem.stallName}</span>
            </div>
            <div className="flex justify-between border-b border-zinc-100 pb-3">
              <span className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">Zone</span>
              <span className="text-sm text-zinc-900 font-medium">{displayItem.stallNo}</span>
            </div>
          </div>

          {/* Ingredients */}
          {ingredients && ingredients.length > 0 && (
            <div className="mb-8">
              <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold block mb-3">
                Key Ingredients
              </span>
              <div className="flex flex-wrap gap-2">
                {ingredients.map((ing, i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1.5 rounded-full bg-zinc-50 text-zinc-600 font-medium"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action */}
          <button
            onClick={onClose}
            className="w-full py-4 rounded-2xl bg-zinc-900 text-white font-semibold text-sm transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {currentLang === 'mm' ? 'ပိတ်မည်' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
}
