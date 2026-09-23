'use client';

import React from 'react';
import { FoodItem } from '@/data/mockFoods';

interface FoodCardProps {
  item: FoodItem;
  currentLang: 'en' | 'mm' | 'th';
  onClick: () => void;
}

export default function FoodCard({ item, currentLang, onClick }: FoodCardProps) {
  const title =
    currentLang === 'mm'
      ? item.titleMm
      : currentLang === 'th'
      ? item.titleTh
      : item.titleEn;

  const desc = currentLang === 'mm' ? item.descMm : item.descEn;

  return (
    <div
      onClick={onClick}
      className="group flex flex-col cursor-pointer animate-fade-in-up"
    >
      {/* Sleek Minimalist Image Placeholder */}
      <div className="relative w-full aspect-[4/3] bg-zinc-100 rounded-3xl overflow-hidden mb-4 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-zinc-200/50">
        <div className="absolute inset-0 flex items-center justify-center text-7xl transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 select-none">
          {item.emoji}
        </div>
        
        {/* Subtle Rating */}
        <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-zinc-900 shadow-sm">
          ★ {item.rating}
        </div>
      </div>

      {/* Elegant Body */}
      <div className="px-1 flex flex-col flex-1">
        <div className="flex justify-between items-start gap-4 mb-2">
          <h4 className="font-semibold text-zinc-900 text-sm leading-tight line-clamp-2">
            {title}
          </h4>
          <span className="text-sm font-medium text-zinc-900 shrink-0">
            ฿{item.priceThb}
          </span>
        </div>
        
        <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-4 font-light">
          {desc}
        </p>

        <div className="mt-auto flex items-center justify-between border-t border-zinc-100 pt-3">
          <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold">
            {item.stallName}
          </span>
          <span className="text-[10px] text-zinc-400">
            {item.priceMmk.toLocaleString()} Ks
          </span>
        </div>
      </div>
    </div>
  );
}
