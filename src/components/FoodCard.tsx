'use client';

import React from 'react';
import { Star, MapPin, Plus } from 'lucide-react';
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

  const subTitle = currentLang === 'mm' ? item.titleEn : item.titleMm;
  const stallName = currentLang === 'mm' ? item.stallNameMm : item.stallName;
  const desc = currentLang === 'mm' ? item.descMm : item.descEn;

  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-2xl border border-slate-200 overflow-hidden cursor-pointer flex flex-col justify-between hover:shadow-md hover:border-blue-200 transition-all duration-200"
    >
      {/* Visual Header */}
      <div className="relative h-40 bg-blue-50 flex items-center justify-center text-6xl group-hover:bg-blue-100 transition-colors">
        <span className="transform group-hover:scale-110 transition duration-300 select-none drop-shadow-sm">
          {item.emoji}
        </span>

        {/* Top Badges */}
        <span className="absolute top-3 left-3 bg-white text-blue-600 border border-blue-100 text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm">
          {item.tag}
        </span>
        <div className="absolute top-3 right-3 bg-white text-slate-700 text-[11px] font-bold px-2 py-0.5 rounded-md border border-slate-100 shadow-sm flex items-center gap-1">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <span>{item.rating}</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1 text-[10px] text-slate-500 font-medium mb-1">
            <MapPin className="w-3 h-3 text-blue-400" />
            <span className="truncate">{stallName}</span>
          </div>
          <h4 className="font-bold text-slate-900 text-sm leading-snug line-clamp-1 mb-0.5">
            {title}
          </h4>
          <p className="text-[11px] text-slate-400 line-clamp-1 mb-2">
            {subTitle}
          </p>
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {desc}
          </p>
        </div>

        {/* Price & Action */}
        <div className="mt-4 flex items-center justify-between">
          <div>
            <span className="text-lg font-black text-blue-600">฿{item.priceThb}</span>
            <span className="text-[11px] text-slate-400 ml-1.5 font-medium">
              ≈ {item.priceMmk.toLocaleString()} Ks
            </span>
          </div>

          <button className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-colors">
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
