'use client';

import React, { useEffect } from 'react';
import { X, MapPin, Clock, Flame, Star, Store } from 'lucide-react';
import { FoodItem } from '@/data/mockFoods';

interface FoodModalProps {
  item: FoodItem | null;
  currentLang: 'en' | 'mm' | 'th';
  onClose: () => void;
}

export default function FoodModal({ item, currentLang, onClose }: FoodModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  const title =
    currentLang === 'mm'
      ? item.titleMm
      : currentLang === 'th'
      ? item.titleTh
      : item.titleEn;

  const stallName = currentLang === 'mm' ? item.stallNameMm : item.stallName;
  const desc = currentLang === 'mm' ? item.descMm : item.descEn;
  const ingredients = currentLang === 'mm' ? item.ingredientsMm : item.ingredientsEn;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative animate-scale-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-slate-700 flex items-center justify-center shadow-sm transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Image Header */}
        <div className="relative h-48 bg-blue-50 flex items-center justify-center text-8xl select-none">
          <span>{item.emoji}</span>
          <div className="absolute bottom-4 left-4 flex gap-2">
            <span className="px-3 py-1 rounded-full bg-blue-500 text-white text-[11px] font-bold shadow-sm">
              {item.tag}
            </span>
            {item.spice !== 'None' && (
              <span className="px-3 py-1 rounded-full bg-red-500 text-white text-[11px] font-semibold flex items-center gap-1 shadow-sm">
                <Flame className="w-3 h-3" />
                <span>{item.spice}</span>
              </span>
            )}
          </div>
          <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-xs text-slate-700 font-bold flex items-center gap-1 shadow-sm">
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
            <span>{item.rating} ({item.reviewsCount} reviews)</span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold text-slate-900 leading-tight">{title}</h3>
              <p className="text-xs text-slate-500 mt-1">{item.titleEn} • {item.titleTh}</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-blue-600">฿{item.priceThb}</span>
              <p className="text-xs text-slate-400 font-medium mt-0.5">≈ {item.priceMmk.toLocaleString()} MMK</p>
            </div>
          </div>

          {/* Stall Details */}
          <div className="my-5 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-sm space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-slate-500 flex items-center gap-2">
                <Store className="w-4 h-4 text-blue-400" />
                <span className="font-medium">Stall (ဆိုင်အမည်):</span>
              </span>
              <span className="font-bold text-slate-800">{stallName}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-400" />
                <span className="font-medium">Location:</span>
              </span>
              <span className="font-bold text-slate-800">{item.stallNo}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-500" />
                <span className="font-medium">Hours:</span>
              </span>
              <span className="text-slate-800 font-medium">5:00 PM – 11:30 PM</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-slate-600 leading-relaxed mb-5">{desc}</p>

          {/* Ingredients */}
          <div className="mb-6">
            <span className="text-xs font-bold text-slate-900 block mb-2">
              Main Ingredients
            </span>
            <div className="flex flex-wrap gap-2">
              {ingredients.map((ing, i) => (
                <span
                  key={i}
                  className="text-xs px-3 py-1 rounded-lg bg-blue-50 text-blue-800 border border-blue-100 font-medium"
                >
                  {ing}
                </span>
              ))}
            </div>
          </div>

          {/* Action */}
          <button
            onClick={onClose}
            className="w-full py-3.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-bold text-sm transition shadow-sm shadow-blue-500/20"
          >
            Close (ပိတ်မည်)
          </button>
        </div>
      </div>
    </div>
  );
}
