'use client';

import React from 'react';

interface FoodCardProps {
  item: any;
  currentLang: 'en' | 'mm' | 'th';
  onClick: () => void;
}

export default function FoodCard({ item, currentLang, onClick }: FoodCardProps) {
  const title = currentLang === 'mm' ? (item.name_mm || item.name_en) : (item.name_en || item.name_mm);
  const desc = item.description || '';
  const stallName = item.vendors?.store_name || 'Mae Sot Market';
  const priceThb = item.price || 0;
  const priceMmk = priceThb * 120;

  const isOutOfStock = item.is_available === false;
  const isStoreClosed = item.vendors?.is_open === false;

  return (
    <div
      onClick={onClick}
      className="group flex flex-col cursor-pointer animate-fade-in-up"
    >
      {/* Image */}
      <div className="relative w-full aspect-[4/3] bg-zinc-100 rounded-3xl overflow-hidden mb-4 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-zinc-200/50">
        {item.image_url ? (
          <img
            src={item.image_url}
            alt={title}
            className={`w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 ${isOutOfStock || isStoreClosed ? 'brightness-75' : ''}`}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-zinc-300 text-sm font-medium bg-zinc-50">
            No Image
          </div>
        )}

        {/* Status Badges */}
        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-zinc-900/80 backdrop-blur-sm text-white text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-xl border border-white/10">
              {currentLang === 'mm' ? 'ကုန်ပြီ / Out of Stock' : 'Out of Stock'}
            </span>
          </div>
        )}

        {!isOutOfStock && isStoreClosed && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-amber-600/90 backdrop-blur-sm text-white text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-xl border border-amber-400/20">
              {currentLang === 'mm' ? 'ယနေ့ ပိတ်သည်' : 'Today Closed'}
            </span>
          </div>
        )}

        {/* Category Tag */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-zinc-900 shadow-sm uppercase tracking-wider">
          {item.category || 'Food'}
        </div>
      </div>

      {/* Body */}
      <div className="px-1 flex flex-col flex-1">
        <div className="flex justify-between items-start gap-4 mb-2">
          <h4 className={`font-semibold text-sm leading-tight line-clamp-2 ${isOutOfStock ? 'text-zinc-400' : 'text-zinc-900'}`}>
            {title}
          </h4>
          <span className={`text-sm font-medium shrink-0 ${isOutOfStock ? 'text-zinc-400 line-through' : 'text-zinc-900'}`}>
            ฿{priceThb}
          </span>
        </div>

        {desc && (
          <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-4 font-light">
            {desc}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between border-t border-zinc-100 pt-3">
          <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold truncate max-w-[60%]">
            {stallName}
          </span>
          <span className="text-[10px] text-zinc-400">
            ~{priceMmk.toLocaleString()} Ks
          </span>
        </div>
      </div>
    </div>
  );
}
