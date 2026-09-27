'use client';

import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface FoodModalProps {
  item: any;
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
  
  const displayItem = item || {};

  const title = currentLang === 'mm' ? (displayItem.name_mm || displayItem.name_en) : (displayItem.name_en || displayItem.name_mm);
  const desc = displayItem.description || '';
  const stallName = displayItem.vendors?.store_name || 'Mae Sot Market';
  const stallZone = displayItem.vendors?.store_zone || '';
  const priceThb = displayItem.price || 0;
  const isOutOfStock = displayItem.is_available === false;
  const isStoreClosed = displayItem.vendors?.is_open === false;

  return (
    <div className={`fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
      item ? 'bg-zinc-900/40 backdrop-blur-sm' : 'bg-transparent pointer-events-none'
    }`}>
      
      <div 
        className={`w-full sm:w-[500px] bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl relative transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          item ? 'translate-y-0' : 'translate-y-full sm:translate-y-12 sm:opacity-0'
        }`}
      >
        {/* Minimal Header */}
        <div className="relative h-64 bg-zinc-100 flex items-center justify-center select-none overflow-hidden">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md text-zinc-900 flex items-center justify-center shadow-sm hover:scale-105 transition-transform cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
          
          {displayItem.image_url ? (
            <img src={displayItem.image_url} alt={title} className={`w-full h-full object-cover animate-fade-in ${isOutOfStock || isStoreClosed ? 'brightness-75' : ''}`} />
          ) : (
            <div className="text-zinc-300 font-medium">No Image</div>
          )}

          {/* Status Badge */}
          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-zinc-900/80 backdrop-blur-sm text-white text-sm font-black uppercase tracking-widest px-5 py-2.5 rounded-full shadow-xl border border-white/10">
                {currentLang === 'mm' ? 'ကုန်ပြီ / Out of Stock' : 'Out of Stock'}
              </span>
            </div>
          )}
          {!isOutOfStock && isStoreClosed && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-amber-600/90 backdrop-blur-sm text-white text-sm font-black uppercase tracking-widest px-5 py-2.5 rounded-full shadow-xl">
                {currentLang === 'mm' ? 'ယနေ့ ပိတ်သည်' : 'Today Closed'}
              </span>
            </div>
          )}
          
          <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-[10px] font-bold text-zinc-900 shadow-sm uppercase tracking-wider">
            {displayItem.category || 'Food'}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          <div className="flex justify-between items-start gap-4 mb-6">
            <h3 className="text-2xl font-semibold text-zinc-900 leading-tight tracking-tight">
              {title}
            </h3>
            <span className="text-xl font-medium text-zinc-900">฿{priceThb}</span>
          </div>

          {desc && (
            <p className="text-sm text-zinc-500 font-light leading-relaxed mb-8">
              {desc}
            </p>
          )}

          {/* Minimal Info List */}
          <div className="space-y-4 mb-8">
            <div className="flex justify-between border-b border-zinc-100 pb-3">
              <span className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">Stall</span>
              <span className="text-sm text-zinc-900 font-medium">{stallName}</span>
            </div>
            {stallZone && (
              <div className="flex justify-between border-b border-zinc-100 pb-3">
                <span className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">Zone</span>
                <span className="text-sm text-zinc-900 font-medium">{stallZone}</span>
              </div>
            )}
          </div>

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
